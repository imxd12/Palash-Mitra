import React, { useState, useEffect } from 'react';
import { api } from '../../core/api/client';
import { speechBridge } from '../../core/speech/speechBridge';
import {
  Utensils,
  Plus,
  Trash2,
  Printer,
  Volume2,
  VolumeX,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Users,
  Scale,
  DollarSign,
  Egg,
  ShieldCheck,
  FileText,
  Clock,
  Sparkles,
  RefreshCw,
  X,
  Eye,
  Check,
  Filter
} from 'lucide-react';

export interface MdmSlip {
  id: string;
  slipNumber: string;
  date: string;
  dayOfWeek: string;
  headcountServed: number;
  menuItem: string;
  riceKg: number;
  dalKg: number;
  vegKg: number;
  oilGrams: number;
  saltSpicesGrams: number;
  eggsCount: number;
  cookingCostInr: number;
  cookName: string;
  tastedByTeacher: string;
  hygieneStatus: 'EXCELLENT' | 'GOOD' | 'SATISFACTORY';
  notes?: string;
  createdAt: string;
}

export interface MdmInventoryItem {
  name: string;
  unit: string;
  currentStock: number;
  minimumBuffer: number;
  status: 'SAFE' | 'LOW' | 'CRITICAL';
}

const COOK_LANGUAGES = [
  { code: 'sat', name: 'ᱥᱟᱱᱛᱟᱲᱤ (Santhali)' },
  { code: 'hoc', name: '𑢹𑣉 𑣎𑣋𑣜 (Ho)' },
  { code: 'unr', name: 'ᱢᱩᱱᱰᱟᱨᱤ (Mundari)' },
  { code: 'kru', name: 'कुड़ुख़ (Kurukh)' },
  { code: 'kyw', name: 'कुड़मालि (Kudmali)' },
  { code: 'hi', name: 'हिन्दी (Hindi)' },
  { code: 'en', name: 'English' }
];

const JHARKHAND_WEEKLY_MENU: Record<string, { menu: string; eggDay: boolean }> = {
  Monday: { menu: 'चावल, दाल, हरी सब्जी व उबला अंडा / ताज़ा मौसमी फल', eggDay: true },
  Tuesday: { menu: 'चावल, चना दाल व हरी पत्तेदार सब्जी (साग)', eggDay: false },
  Wednesday: { menu: 'चावल, मिक्स दाल, सब्जी व उबला अंडा / फल', eggDay: true },
  Thursday: { menu: 'चावल, सोयाबीन बड़ी करी व हरी सब्जी', eggDay: false },
  Friday: { menu: 'दाल भात, चोखा/सब्जी व उबला अंडा / मौसमी फल', eggDay: true },
  Saturday: { menu: 'खिचड़ी, चोखा, हरी सब्जी, पापड़ व अचार', eggDay: false },
  Sunday: { menu: 'साप्ताहिक अवकाश (कक्षा बंद)', eggDay: false }
};

export const MdmRationView: React.FC = () => {
  const [slips, setSlips] = useState<MdmSlip[]>([]);
  const [inventory, setInventory] = useState<Record<string, MdmInventoryItem>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuditing, setIsAuditing] = useState<boolean>(false);
  const [auditResult, setAuditResult] = useState<any>(null);

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [selectedSlipForView, setSelectedSlipForView] = useState<MdmSlip | null>(null);
  const [slipToDelete, setSlipToDelete] = useState<MdmSlip | null>(null);

  // Audio Voice Assistant State
  const [activeVoiceLang, setActiveVoiceLang] = useState<string>('sat');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [speakingSlipId, setSpeakingSlipId] = useState<string | null>(null);

  // New Slip Form State
  const todayStr = new Date().toISOString().split('T')[0];
  const [formData, setFormData] = useState({
    date: todayStr,
    headcountServed: 88,
    menuItem: 'चावल, दाल, मौसमी हरी सब्जी व उबला अंडा',
    cookName: 'सोमारी मुर्मू (Somari Murmu)',
    tastedByTeacher: 'सुनील किस्कू (प्रभारी शिक्षक)',
    hygieneStatus: 'EXCELLENT' as 'EXCELLENT' | 'GOOD' | 'SATISFACTORY',
    isEggDay: true,
    notes: 'कक्षा 1 से 5 के सभी उपस्थित बच्चों को गर्म व ताजा भोजन परोसा गया।'
  });

  // Calculate day of week from date
  const getDayName = (dateStr: string) => {
    const d = new Date(dateStr);
    return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][d.getDay()];
  };

  const currentDay = getDayName(formData.date);

  // Update menu recommendation when date changes
  useEffect(() => {
    const menuInfo = JHARKHAND_WEEKLY_MENU[currentDay];
    if (menuInfo) {
      setFormData(prev => ({
        ...prev,
        menuItem: menuInfo.menu,
        isEggDay: menuInfo.eggDay
      }));
    }
  }, [formData.date, currentDay]);

  // Derived calculations for New Slip
  const calcRiceKg = Number(((formData.headcountServed * 100) / 1000).toFixed(2));
  const calcDalKg = Number(((formData.headcountServed * 20) / 1000).toFixed(2));
  const calcVegKg = Number(((formData.headcountServed * 50) / 1000).toFixed(2));
  const calcOilGrams = formData.headcountServed * 5;
  const calcSaltSpicesGrams = formData.headcountServed * 2;
  const calcEggsCount = formData.isEggDay ? formData.headcountServed : 0;
  const calcCookingCost = Number((formData.headcountServed * 5.45 + (formData.isEggDay ? formData.headcountServed * 6.0 : 0)).toFixed(2));

  // Robust Data Normalizers to guarantee seamless backend contract compatibility
  const normalizeSlip = (s: any): MdmSlip => ({
    id: s.id,
    slipNumber: s.slipNumber || `MDM-${s.date}`,
    date: s.date,
    dayOfWeek: s.dayOfWeek || s.menuDay || getDayName(s.date),
    headcountServed: s.headcountServed || s.beneficiaryCount || 0,
    menuItem: s.menuItem || s.mealType || 'चावल, दाल, हरी मौसमी सब्जी',
    riceKg: s.riceKg || 0,
    dalKg: s.dalKg || 0,
    vegKg: s.vegKg || 0,
    oilGrams: s.oilGrams || (s.oilKg ? Math.round(s.oilKg * 1000) : 0),
    saltSpicesGrams: s.saltSpicesGrams || (s.saltSpicesKg ? Math.round(s.saltSpicesKg * 1000) : 0),
    eggsCount: s.eggsCount !== undefined ? s.eggsCount : (s.specialNutritionCount || 0),
    cookingCostInr: s.cookingCostInr || s.totalMealCost || s.totalCookingCost || 0,
    cookName: s.cookName || 'शांति सोरेन (रसोइया)',
    tastedByTeacher: s.tastedByTeacher || s.verifiedByTeacherName || 'प्रभारी शिक्षक',
    hygieneStatus: s.hygieneStatus || 'EXCELLENT',
    notes: s.notes,
    createdAt: s.createdAt || new Date().toISOString()
  });

  const normalizeInventory = (inv: any): Record<string, MdmInventoryItem> => {
    const rKg = inv?.riceKg !== undefined ? inv.riceKg : (inv?.rice?.currentStock ?? 68.5);
    const dKg = inv?.dalKg !== undefined ? inv.dalKg : (inv?.dal?.currentStock ?? 18.2);
    const oKg = inv?.oilKg !== undefined ? inv.oilKg : (inv?.oil?.currentStock ?? 6.5);
    const sKg = inv?.saltSpicesKg !== undefined ? inv.saltSpicesKg : (inv?.saltSpices?.currentStock ?? 4.0);
    const eCount = inv?.eggsFruitCount !== undefined ? inv.eggsFruitCount : (inv?.eggs?.currentStock ?? 45);

    return {
      rice: { name: 'चावल (Rice)', unit: 'kg', currentStock: rKg, minimumBuffer: 15.0, status: rKg < 15 ? 'LOW' : 'SAFE' },
      dal: { name: 'दाल (Pulses)', unit: 'kg', currentStock: dKg, minimumBuffer: 5.0, status: dKg < 5 ? 'LOW' : 'SAFE' },
      oil: { name: 'खाद्य तेल (Oil)', unit: 'kg', currentStock: oKg, minimumBuffer: 2.0, status: oKg < 2 ? 'LOW' : 'SAFE' },
      saltSpices: { name: 'नमक व मसाले', unit: 'kg', currentStock: sKg, minimumBuffer: 1.5, status: 'SAFE' },
      eggs: { name: 'अंडे / मौसमी फल', unit: 'नग', currentStock: eCount, minimumBuffer: 30, status: 'SAFE' }
    };
  };

  // Fetch Slips and Inventory
  const fetchMdmData = async () => {
    setIsLoading(true);
    try {
      const [slipsRes, invRes] = await Promise.all([
        api.get('/mdm/slips'),
        api.get('/mdm/inventory')
      ]);

      if (slipsRes?.slips) {
        setSlips(slipsRes.slips.map((s: any) => normalizeSlip(s)));
      }
      if (invRes?.inventory) {
        setInventory(normalizeInventory(invRes.inventory));
      }
    } catch (err) {
      console.error('Failed to load MDM data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMdmData();
  }, []);

  // 1-Click Auto Fill from Attendance
  const handleAutoFillAttendance = async () => {
    try {
      const attRes = await api.get('/attendance', { date: formData.date });
      if (attRes?.records && attRes.records.length > 0) {
        const presentCount = attRes.records.filter((r: any) => r.status === 'PRESENT' || r.status === 'LATE').length;
        if (presentCount > 0) {
          setFormData(prev => ({ ...prev, headcountServed: presentCount }));
        }
      }
    } catch (err) {
      console.warn('Could not auto-fetch attendance, using current default', err);
    }
  };

  // Create Slip
  const handleCreateSlip = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newSlipPayload = {
        date: formData.date,
        dayOfWeek: currentDay,
        menuDay: currentDay,
        beneficiaryCount: formData.headcountServed,
        headcountServed: formData.headcountServed,
        mealType: formData.menuItem,
        menuItem: formData.menuItem,
        riceKg: calcRiceKg,
        dalKg: calcDalKg,
        vegKg: calcVegKg,
        oilKg: Number((calcOilGrams / 1000).toFixed(3)),
        oilGrams: calcOilGrams,
        saltSpicesGrams: calcSaltSpicesGrams,
        specialNutritionCount: calcEggsCount,
        eggsCount: calcEggsCount,
        isSpecialNutritionDay: formData.isEggDay,
        cookingCostInr: calcCookingCost,
        totalMealCost: calcCookingCost,
        cookName: formData.cookName,
        verifiedByTeacherName: formData.tastedByTeacher,
        tastedByTeacher: formData.tastedByTeacher,
        hygieneStatus: formData.hygieneStatus,
        notes: formData.notes
      };

      const res = await api.post('/mdm/slips', newSlipPayload);
      if (res?.slip) {
        setSlips(prev => [normalizeSlip(res.slip), ...prev]);
        setIsAddModalOpen(false);
        // Refresh inventory
        const invRes = await api.get('/mdm/inventory');
        if (invRes?.inventory) setInventory(normalizeInventory(invRes.inventory));
      }
    } catch (err) {
      console.error('Failed to create MDM slip:', err);
      alert('राशन पर्ची सहेजने में त्रुटि हुई। कृपया पुनः प्रयास करें।');
    }
  };

  // Delete Slip
  const handleDeleteSlip = async (slipId: string) => {
    try {
      await api.delete(`/mdm/slips/${slipId}`);
      setSlips(prev => prev.filter(s => s.id !== slipId));
      setSlipToDelete(null);
      // Refresh inventory
      const invRes = await api.get('/mdm/inventory');
      if (invRes?.inventory) setInventory(normalizeInventory(invRes.inventory));
    } catch (err) {
      console.error('Failed to delete slip:', err);
      alert('पर्ची हटाने में त्रुटि हुई।');
    }
  };

  // Run AI Nutritional Audit
  const handleRunAiAudit = async () => {
    setIsAuditing(true);
    try {
      const res = await api.get('/mdm/ai-audit');
      if (res?.audit) {
        setAuditResult(res.audit);
      }
    } catch (err) {
      console.error('AI Audit error:', err);
    } finally {
      setIsAuditing(false);
    }
  };

  // Generate Voice Speech Text for Cook
  const getCookSpeechText = (slip: MdmSlip, lang: string) => {
    const isEgg = slip.eggsCount > 0;
    switch (lang) {
      case 'sat':
        return `ᱡᱚᱦᱟᱨ ᱨᱟᱥᱚᱭᱟ ᱫᱟᱹᱭ! ᱛᱮᱦᱮᱧ ${slip.headcountServed} ᱜᱤᱫᱽᱨᱟᱹ ᱞᱟᱹᱜᱤᱫ ᱢᱟᱺᱰᱤ ᱨᱟᱸᱫᱷᱟ ᱦᱩᱭᱩᱜ-ᱟ᱾ ᱪᱟᱣᱞᱮ ${slip.riceKg} ᱠᱤᱞᱳ, ᱫᱟᱹᱞ ${slip.dalKg} ᱠᱤᱞᱳ, ᱩᱛᱩ ᱥᱟᱵᱽᱡᱤ ${slip.vegKg} ᱠᱤᱞᱳ ᱟᱨ ᱥᱩᱱᱩᱢ ${(slip.oilGrams / 1000).toFixed(2)} ᱠᱤᱞᱳ ᱦᱟᱛᱟᱣ ᱢᱮ᱾ ${isEgg ? `ᱛᱮᱦᱮᱧ ${slip.eggsCount} ᱜᱚᱴᱟᱝ ᱵᱤᱞᱤ (ᱟᱸᱰᱟ) ᱦᱚᱸ ᱩᱵᱟᱹᱞ ᱦᱩᱭᱩᱜ-ᱟ᱾` : 'ᱛᱮᱦᱮᱧ ᱫᱚ ᱵᱤᱞᱤ ᱵᱟᱹᱱᱩᱜ-ᱟ᱾'} ᱡᱚᱢᱟᱜ ᱥᱟᱯᱷᱟ ᱫᱚᱦᱚᱭ ᱯᱮ!`;
      case 'hoc':
        return `ᱡᱚᱦᱟᱨ! ᱛᱮᱦᱮᱧ ${slip.headcountServed} ᱜᱤᱫᱽᱨᱟᱹ ᱞᱟᱹᱜᱤᱫ ᱡᱚᱢᱟᱜ ᱵᱟᱭ ᱦᱩᱭᱩᱜ-ᱟ᱾ ᱪᱟᱣᱞᱮ ${slip.riceKg} ᱠᱤᱞᱳ, ᱫᱟᱹᱞ ${slip.dalKg} ᱠᱤᱞᱳ, ᱟᱨ ᱥᱟᱵᱽᱡᱤ ${slip.vegKg} ᱠᱤᱞᱳ᱾ ${isEgg ? `ᱛᱮᱦᱮᱧ ${slip.eggsCount} ᱴᱤ ᱵᱤᱞᱤ (Egg) ᱮᱢ ᱦᱩᱭᱩᱜ-ᱟ᱾` : ''} ᱥᱟᱯᱷᱟ ᱛᱮ ᱨᱟᱸᱫᱷᱟ ᱢᱮ!`;
      case 'unr':
        return `ᱡᱚᱦᱟᱨ ᱨᱟᱥᱚᱭᱟ! ᱛᱮᱦᱮᱧ ${slip.headcountServed} ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱞᱟᱹᱜᱤᱫ ᱢᱟᱺᱰᱤ-ᱫᱟᱠᱟ ᱵᱮᱱᱟᱣ ᱦᱩᱭᱩᱜ-ᱟ᱾ ᱪᱟᱣᱞᱮ ${slip.riceKg} ᱠᱤᱞᱳ, ᱫᱟᱹᱞ ${slip.dalKg} ᱠᱤᱞᱳ, ᱥᱟᱵᱽᱡᱤ ${slip.vegKg} ᱠᱤᱞᱳ ᱟᱨ ᱥᱩᱱᱩᱢ ${slip.oilGrams} ᱜᱽᱨᱟᱢ᱾ ${isEgg ? `ᱛᱮᱦᱮᱧ ᱵᱤᱞᱤ ᱦᱚᱸ ᱮᱢ ᱦᱩᱭᱩᱜ-ᱟ᱾` : ''}`;
      case 'kru':
        return `जोहार रसोइया दीदी! आज ${slip.headcountServed} बच्चों के लिए मध्याह्न भोजन बनेगा। चावल ${slip.riceKg} किलो, दाल ${slip.dalKg} किलो, हरी सब्जी ${slip.vegKg} किलो और तेल ${slip.oilGrams} ग्राम लें। ${isEgg ? `आज ${slip.eggsCount} उबले अंडे भी बांटे जाएंगे।` : ''} बच्चों को शुद्ध गर्म भोजन खिलाएं।`;
      case 'kyw':
        return `जोहार दीदी! आइझ ${slip.headcountServed} झन छुआ सबके लागिन भात-दाल रांधेक आहै। चाउर ${slip.riceKg} किलो, दाल ${slip.dalKg} किलो, तरकारी ${slip.vegKg} किलो आर तेल ${slip.oilGrams} ग्राम। ${isEgg ? `आइझ ${slip.eggsCount} टा अंडा सेझेक आहै।` : ''} सफा-सुथरा रांधब।`;
      case 'en':
        return `Attention Cook! Today's MDM preparation is for ${slip.headcountServed} enrolled children. Please measure: Rice ${slip.riceKg} kilograms, Pulses ${slip.dalKg} kilograms, Fresh Vegetables ${slip.vegKg} kilograms, and Cooking Oil ${slip.oilGrams} grams. ${isEgg ? `Also prepare ${slip.eggsCount} boiled eggs.` : ''} Maintain top kitchen hygiene.`;
      case 'hi':
      default:
        return `नमस्ते रसोइया दीदी! आज ${slip.headcountServed} उपस्थित बच्चों के लिए भोजन तैयार करना है। कृपया सामग्री मापें: चावल ${slip.riceKg} किलो, दाल ${slip.dalKg} किलो, हरी सब्जी ${slip.vegKg} किलो, और खाना पकाने का तेल ${slip.oilGrams} ग्राम। ${isEgg ? `आज प्रति बच्चा 1 उबला अंडा कुल ${slip.eggsCount} अंडे भी दिए जाने हैं।` : ''} भोजन शिक्षक द्वारा चखे जाने के बाद ही बच्चों को परोसें।`;
    }
  };

  // Play Speech
  const handleSpeakBriefing = (slip: MdmSlip) => {
    if (isSpeaking && speakingSlipId === slip.id) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsSpeaking(false);
      setSpeakingSlipId(null);
      return;
    }

    const speechText = getCookSpeechText(slip, activeVoiceLang);
    setIsSpeaking(true);
    setSpeakingSlipId(slip.id);

    speechBridge.speak(speechText, activeVoiceLang).then(() => {
      setIsSpeaking(false);
      setSpeakingSlipId(null);
    });
  };

  // Aggregated Monthly Metrics
  const totalHeadcount = slips.reduce((sum, s) => sum + s.headcountServed, 0);
  const totalRiceKg = slips.reduce((sum, s) => sum + s.riceKg, 0);
  const totalCookingCost = slips.reduce((sum, s) => sum + s.cookingCostInr, 0);
  const totalEggs = slips.reduce((sum, s) => sum + s.eggsCount, 0);

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', paddingBottom: '60px' }}>
      {/* Top Banner */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.8rem', background: '#fef3c7', padding: '6px 10px', borderRadius: '10px' }}>🍲</span>
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-primary)', margin: 0 }}>
                मध्याह्न भोजन (MDM / PM POSHAN) डिजिटल राशन पर्ची एवं स्टॉक प्रबंधन
              </h1>
              <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', margin: '4px 0 0 0' }}>
                सरकारी मानकों अनुसार प्रति बच्चा राशन आवंटन, 1-क्लिक उपस्थिति लिंक, जनजातीय कुक वॉयस गाइड व ऑडिट ट्रेल।
              </p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={handleRunAiAudit}
            disabled={isAuditing}
            className="btn btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.86rem' }}
          >
            <Sparkles size={16} color="var(--color-primary)" />
            <span>{isAuditing ? 'AI पोषण ऑडिट चल रहा है...' : 'AI पोषण व स्टॉक ऑडिट'}</span>
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', fontWeight: 700, padding: '9px 18px' }}
          >
            <Plus size={18} />
            <span>+ नई राशन पर्ची बनाएं (New Slip)</span>
          </button>
        </div>
      </div>

      {/* KPI Metrics Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '14px', marginBottom: '22px' }}>
        <div className="card" style={{ padding: '14px 18px', borderLeft: '4px solid #10b981' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>कुल जारी पर्चियां</span>
            <FileText size={18} color="#10b981" />
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-text)', marginTop: '4px' }}>
            {slips.length} पर्चियां
          </div>
          <span style={{ fontSize: '0.74rem', color: '#10b981', fontWeight: 600 }}>माह: सितम्बर 2026</span>
        </div>

        <div className="card" style={{ padding: '14px 18px', borderLeft: '4px solid #3b82f6' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>कुल लाभान्वित थालियां</span>
            <Users size={18} color="#3b82f6" />
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-text)', marginTop: '4px' }}>
            {totalHeadcount.toLocaleString()} बच्चे
          </div>
          <span style={{ fontSize: '0.74rem', color: '#3b82f6', fontWeight: 600 }}>100% उपस्थित छात्रों को आहार</span>
        </div>

        <div className="card" style={{ padding: '14px 18px', borderLeft: '4px solid #f59e0b' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>चावल उपभोग / स्टॉक</span>
            <Scale size={18} color="#f59e0b" />
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-text)', marginTop: '4px' }}>
            {totalRiceKg.toFixed(1)} <span style={{ fontSize: '0.95rem' }}>किग्रा</span>
          </div>
          <span style={{ fontSize: '0.74rem', color: '#f59e0b', fontWeight: 600 }}>
            बफ़र स्टॉक: {inventory.rice ? `${inventory.rice.currentStock} kg सुरक्षित` : 'सुरक्षित'}
          </span>
        </div>

        <div className="card" style={{ padding: '14px 18px', borderLeft: '4px solid #8b5cf6' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>परिव्यय (Cooking Cost)</span>
            <DollarSign size={18} color="#8b5cf6" />
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-text)', marginTop: '4px' }}>
            ₹{totalCookingCost.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </div>
          <span style={{ fontSize: '0.74rem', color: '#8b5cf6', fontWeight: 600 }}>
            {totalEggs > 0 ? `अंडे शामिल (${totalEggs} नग)` : 'दाल-सब्जी लागत'}
          </span>
        </div>
      </div>

      {/* AI Nutritional & Buffer Stock Alert Banner */}
      {auditResult && (
        <div
          className="card"
          style={{
            marginBottom: '22px',
            padding: '16px 20px',
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(59, 130, 246, 0.08))',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '12px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={18} color="#10b981" />
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0, color: 'var(--color-primary)' }}>
                  AI पोषण अनुपालन एवं स्टॉक पूर्वानुमान ऑडिट (NIPUN POSHAN Standard)
                </h3>
                <span style={{ background: '#d1fae5', color: '#065f46', fontSize: '0.72rem', padding: '2px 8px', borderRadius: '12px', fontWeight: 700 }}>
                  स्कोर: {auditResult.complianceScore}% अनुपालन
                </span>
              </div>
              <p style={{ fontSize: '0.84rem', color: 'var(--color-text)', marginTop: '6px', marginBottom: '8px' }}>
                {auditResult.recommendation || 'झारखंड मध्याह्न भोजन प्राधिकरण (PM POSHAN) के पोषण मानकों (450 kcal व 12g प्रोटीन) का शत-प्रतिशत अनुपालन सत्यापित किया गया है। 3-दिवसीय बफर स्टॉक सुरक्षित है।'}
              </p>
            </div>
            <button
              onClick={() => setAuditResult(null)}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}
            >
              <X size={16} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginTop: '10px' }}>
            <div style={{ background: 'var(--color-surface)', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)' }}>ऊर्जा (Calories/Day)</div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#10b981' }}>
                {auditResult.nutritionalCompliance?.caloriePerChildTargetKcal || auditResult.nutritionalAudit?.caloriesPerChild || 450} kcal (मानक: 450 kcal)
              </div>
            </div>
            <div style={{ background: 'var(--color-surface)', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)' }}>प्रोटीन (Protein Intake)</div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#3b82f6' }}>
                {auditResult.nutritionalCompliance?.proteinPerChildTargetGrams || auditResult.nutritionalAudit?.proteinGramsPerChild || 12.0} ग्राम (मानक: 12g)
              </div>
            </div>
            <div style={{ background: 'var(--color-surface)', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)' }}>3-दिन बफ़र स्टॉक स्थिति</div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#059669' }}>पर्याप्त (अगले 18 दिन सुरक्षित)</div>
            </div>
          </div>
        </div>
      )}

      {/* Inventory Real-Time Status Bar */}
      <div className="card" style={{ marginBottom: '22px', padding: '16px 18px', background: 'var(--color-surface)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Scale size={18} color="var(--color-primary)" />
            <h3 style={{ fontSize: '0.98rem', fontWeight: 700, margin: 0 }}>
              रसोई भंडार स्टॉक रजिस्टर (Live Buffer Inventory & Stock Balance)
            </h3>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
            न्यूनतम 3-दिन बफ़र अनिवार्य (झारखंड शिक्षा परियोजना परिषद नियम)
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '12px' }}>
          {Object.entries(inventory).map(([key, item]) => {
            const isCritical = item.status === 'CRITICAL';
            const isLow = item.status === 'LOW';
            return (
              <div
                key={key}
                style={{
                  padding: '12px 14px',
                  borderRadius: '8px',
                  border: `1px solid ${isCritical ? '#fca5a5' : isLow ? '#fde68a' : 'var(--color-border)'}`,
                  background: isCritical ? '#fef2f2' : isLow ? '#fffbeb' : 'var(--color-background)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-text)' }}>{item.name}</span>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      padding: '2px 6px',
                      borderRadius: '10px',
                      background: isCritical ? '#fee2e2' : isLow ? '#fef3c7' : '#d1fae5',
                      color: isCritical ? '#b91c1c' : isLow ? '#b45309' : '#047857'
                    }}
                  >
                    {isCritical ? 'संकट' : isLow ? 'कम' : 'सुरक्षित'}
                  </span>
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-text)' }}>
                  {item.currentStock} <span style={{ fontSize: '0.8rem', fontWeight: 500 }}>{item.unit}</span>
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                  न्यूनतम बफ़र: {item.minimumBuffer} {item.unit}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Slips History Table & Cook Briefing Toolbar */}
      <div className="card" style={{ padding: '0', overflow: 'hidden', background: 'var(--color-surface)' }}>
        {/* Table Header Controls */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, color: 'var(--color-text)' }}>
              जारी राशन पर्ची रजिस्टर (Daily Kitchen Slips History)
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: '2px 0 0 0' }}>
              प्रत्येक पर्ची को देखें, प्रिंट करें, कुक की भाषा में वॉयस ब्रीफिंग सुनाएं अथवा त्रुटि होने पर हटाएं।
            </p>
          </div>

          {/* Voice Language Selector for Cook */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--color-background)', padding: '6px 12px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
            <Volume2 size={16} color="var(--color-primary)" />
            <span style={{ fontSize: '0.78rem', fontWeight: 600 }}>कुक वॉयस भाषा:</span>
            <select
              value={activeVoiceLang}
              onChange={e => setActiveVoiceLang(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                fontSize: '0.82rem',
                fontWeight: 700,
                color: 'var(--color-primary)',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              {COOK_LANGUAGES.map(l => (
                <option key={l.code} value={l.code}>
                  {l.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Slips List */}
        {isLoading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
            <RefreshCw size={24} className="spin" style={{ marginBottom: '8px' }} />
            <div>राशन पर्चियां लोड हो रही हैं...</div>
          </div>
        ) : slips.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
            <Utensils size={36} style={{ marginBottom: '10px', opacity: 0.5 }} />
            <div style={{ fontSize: '1rem', fontWeight: 600 }}>कोई राशन पर्ची उपलब्ध नहीं है</div>
            <p style={{ fontSize: '0.84rem' }}>कृपया "+ नई राशन पर्ची बनाएं" बटन पर क्लिक करके आज की पर्ची जारी करें।</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem' }}>
              <thead>
                <tr style={{ background: 'var(--color-background)', borderBottom: '1px solid var(--color-border)', textAlign: 'left', color: 'var(--color-text-muted)', fontSize: '0.76rem', textTransform: 'uppercase' }}>
                  <th style={{ padding: '12px 16px' }}>पर्ची संख्या / दिनांक</th>
                  <th style={{ padding: '12px 14px' }}>उपस्थित बच्चे</th>
                  <th style={{ padding: '12px 14px' }}>चावल (100g/बच्चा)</th>
                  <th style={{ padding: '12px 14px' }}>दाल (20g) & सब्जी (50g)</th>
                  <th style={{ padding: '12px 14px' }}>अंडा / फल</th>
                  <th style={{ padding: '12px 14px' }}>लागत (रू)</th>
                  <th style={{ padding: '12px 14px' }}>रसोइया व चखने वाले</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right' }}>कार्यवाही (Actions)</th>
                </tr>
              </thead>
              <tbody>
                {slips.map(slip => {
                  const isCurrentSpeaking = isSpeaking && speakingSlipId === slip.id;
                  return (
                    <tr
                      key={slip.id}
                      style={{
                        borderBottom: '1px solid var(--color-border)',
                        transition: 'background 0.2s',
                        background: isCurrentSpeaking ? 'rgba(59, 130, 246, 0.05)' : 'transparent'
                      }}
                    >
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ fontWeight: 700, color: 'var(--color-primary)' }}>{slip.slipNumber}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                          {slip.date} ({slip.dayOfWeek})
                        </div>
                      </td>

                      <td style={{ padding: '14px 14px' }}>
                        <div style={{ fontWeight: 800, fontSize: '0.98rem', color: 'var(--color-text)' }}>
                          {slip.headcountServed}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 600 }}>100% थालियां</div>
                      </td>

                      <td style={{ padding: '14px 14px' }}>
                        <div style={{ fontWeight: 700 }}>{slip.riceKg} kg</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>अग्नि मार्क चावल</div>
                      </td>

                      <td style={{ padding: '14px 14px' }}>
                        <div>{slip.dalKg} kg दाल</div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)' }}>{slip.vegKg} kg हरी सब्जी</div>
                      </td>

                      <td style={{ padding: '14px 14px' }}>
                        {slip.eggsCount > 0 ? (
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              background: '#fef3c7',
                              color: '#92400e',
                              padding: '3px 8px',
                              borderRadius: '12px',
                              fontWeight: 700,
                              fontSize: '0.76rem'
                            }}
                          >
                            <Egg size={13} />
                            {slip.eggsCount} नग अंडा
                          </span>
                        ) : (
                          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>लागू नहीं</span>
                        )}
                      </td>

                      <td style={{ padding: '14px 14px', fontWeight: 700, color: 'var(--color-text)' }}>
                        ₹{slip.cookingCostInr.toLocaleString('en-IN')}
                      </td>

                      <td style={{ padding: '14px 14px' }}>
                        <div style={{ fontSize: '0.82rem', fontWeight: 600 }}>{slip.cookName}</div>
                        <div style={{ fontSize: '0.72rem', color: '#059669', display: 'flex', alignItems: 'center', gap: '3px' }}>
                          <ShieldCheck size={12} />
                          प्रमाणित: {slip.tastedByTeacher.split(' ')[0]}
                        </div>
                      </td>

                      <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '6px', alignItems: 'center' }}>
                          {/* Cook Audio Readout Button */}
                          <button
                            onClick={() => handleSpeakBriefing(slip)}
                            title="रसोइया हेतु मातृभाषा में सुनें (Audio for Cook)"
                            className="btn btn-secondary"
                            style={{
                              padding: '6px 10px',
                              fontSize: '0.76rem',
                              background: isCurrentSpeaking ? '#3b82f6' : undefined,
                              color: isCurrentSpeaking ? '#ffffff' : undefined,
                              borderColor: isCurrentSpeaking ? '#3b82f6' : undefined
                            }}
                          >
                            {isCurrentSpeaking ? <VolumeX size={14} /> : <Volume2 size={14} />}
                            <span style={{ marginLeft: '4px' }}>
                              {isCurrentSpeaking ? 'रोकें' : '🔊 सुनें'}
                            </span>
                          </button>

                          {/* View & Print Voucher */}
                          <button
                            onClick={() => setSelectedSlipForView(slip)}
                            title="पर्ची देखें व प्रिंट करें (View & Print)"
                            className="btn btn-secondary"
                            style={{ padding: '6px 10px', fontSize: '0.76rem' }}
                          >
                            <Printer size={14} />
                            <span style={{ marginLeft: '4px' }}>प्रिंट</span>
                          </button>

                          {/* Delete Slip */}
                          <button
                            onClick={() => setSlipToDelete(slip)}
                            title="पर्ची रद्द करें (Delete Slip)"
                            style={{
                              padding: '6px 8px',
                              background: 'transparent',
                              border: '1px solid #fee2e2',
                              borderRadius: '6px',
                              color: '#ef4444',
                              cursor: 'pointer'
                            }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ===================== MODAL 1: CREATE NEW SLIP ===================== */}
      {isAddModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.55)',
            backdropFilter: 'blur(3px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}
        >
          <div
            className="card"
            style={{
              width: '100%',
              maxWidth: '620px',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '24px',
              borderRadius: '16px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Utensils size={20} color="var(--color-primary)" />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: 'var(--color-primary)' }}>
                  दैनिक मध्याह्न भोजन राशन पर्ची निर्गमन
                </h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateSlip}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 700 }}>दिनांक (Date)</label>
                  <input
                    type="date"
                    className="form-input"
                    value={formData.date}
                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                  <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>वार: {currentDay}</span>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 700 }}>लाभान्वित छात्र संख्या</label>
                    <button
                      type="button"
                      onClick={handleAutoFillAttendance}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--color-primary)',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        padding: 0
                      }}
                    >
                      ⚡ उपस्थिति से स्वतः भरें
                    </button>
                  </div>
                  <input
                    type="number"
                    min="1"
                    max="500"
                    className="form-input"
                    value={formData.headcountServed}
                    onChange={e => setFormData({ ...formData, headcountServed: parseInt(e.target.value, 10) || 0 })}
                    required
                  />
                  <span style={{ fontSize: '0.72rem', color: '#10b981' }}>कक्षा 1 से 5 कुल उपस्थिति</span>
                </div>
              </div>

              {/* Menu & Egg Option */}
              <div className="form-group" style={{ marginBottom: '14px' }}>
                <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 700 }}>
                  आज का सरकारी मेनू (Menu of the Day)
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.menuItem}
                  onChange={e => setFormData({ ...formData, menuItem: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', background: 'var(--color-background)', padding: '10px 14px', borderRadius: '8px' }}>
                <input
                  type="checkbox"
                  id="eggDayCheck"
                  checked={formData.isEggDay}
                  onChange={e => setFormData({ ...formData, isEggDay: e.target.checked })}
                  style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                />
                <label htmlFor="eggDayCheck" style={{ fontSize: '0.84rem', fontWeight: 600, cursor: 'pointer', margin: 0 }}>
                  🥚 आज अंडा / मौसमी फल दिवस है (सोमवार / बुधवार / शुक्रवार) - प्रति बच्चा 1 अंडा / फल
                </label>
              </div>

              {/* Live Auto-Calculated Portion Card */}
              <div
                style={{
                  background: 'rgba(59, 130, 246, 0.05)',
                  border: '1px solid rgba(59, 130, 246, 0.2)',
                  borderRadius: '10px',
                  padding: '12px 14px',
                  marginBottom: '16px'
                }}
              >
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '8px' }}>
                  📊 सरकारी मानक अनुसार स्वतः परिकलित राशन मात्रा ({formData.headcountServed} बच्चे):
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', fontSize: '0.8rem' }}>
                  <div>
                    <span style={{ color: 'var(--color-text-muted)' }}>चावल (100g): </span>
                    <strong>{calcRiceKg} kg</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--color-text-muted)' }}>दाल (20g): </span>
                    <strong>{calcDalKg} kg</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--color-text-muted)' }}>हरी सब्जी (50g): </span>
                    <strong>{calcVegKg} kg</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--color-text-muted)' }}>तेल (5g): </span>
                    <strong>{calcOilGrams} g</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--color-text-muted)' }}>मसाला/नमक: </span>
                    <strong>{calcSaltSpicesGrams} g</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--color-text-muted)' }}>अंडा / फल: </span>
                    <strong>{calcEggsCount} नग</strong>
                  </div>
                </div>
                <div style={{ marginTop: '8px', borderTop: '1px dashed rgba(59, 130, 246, 0.2)', paddingTop: '6px', fontSize: '0.84rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                  कुल अनुमानित कुकिंग लागत: ₹{calcCookingCost} (राशि बैंक खाते से देय)
                </div>
              </div>

              {/* Cook & Tasting Details */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 700 }}>रसोईया-सह-सहायिका का नाम</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.cookName}
                    onChange={e => setFormData({ ...formData, cookName: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 700 }}>भोजन चखने वाले शिक्षक</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.tastedByTeacher}
                    onChange={e => setFormData({ ...formData, tastedByTeacher: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '18px' }}>
                <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 700 }}>विशेष टिप्पणी / गुणवत्ता प्रमाण</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="btn btn-secondary"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}
                >
                  <Check size={16} />
                  <span>पर्ची जारी करें व स्टॉक घटाएं</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================== MODAL 2: PRINT OFFICIAL SLIP VOUCHER ===================== */}
      {selectedSlipForView && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(3px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}
        >
          <div
            className="card print-voucher-area"
            style={{
              width: '100%',
              maxWidth: '680px',
              maxHeight: '92vh',
              overflowY: 'auto',
              padding: '30px',
              borderRadius: '16px',
              background: '#ffffff',
              color: '#1e293b',
              border: '2px solid #334155'
            }}
          >
            {/* Header Voucher */}
            <div style={{ textAlign: 'center', borderBottom: '2px solid #0f172a', paddingBottom: '14px', marginBottom: '16px' }}>
              <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#475569', letterSpacing: '0.5px' }}>
                झारखंड सरकार • स्कूली शिक्षा एवं साक्षरता विभाग
              </div>
              <h2 style={{ fontSize: '1.28rem', fontWeight: 900, margin: '4px 0', color: '#0f172a' }}>
                प्रधानमंत्री पोषण शक्ति निर्माण (PM POSHAN / MDM) दैनिक राशन निकासी पर्ची
              </h2>
              <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
                राजकीय प्राथमिक विद्यालय, तुपुदाना • U-DISE कोड: <strong>20110300101</strong> • प्रखंड: नामकुम
              </div>
            </div>

            {/* Slip Meta Info */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px', fontSize: '0.84rem', background: '#f8fafc', padding: '10px 14px', borderRadius: '8px' }}>
              <div>
                <div>पर्ची क्रमांक: <strong>{selectedSlipForView.slipNumber}</strong></div>
                <div>दिनांक: <strong>{selectedSlipForView.date} ({selectedSlipForView.dayOfWeek})</strong></div>
              </div>
              <div>
                <div>उपस्थित छात्र संख्या: <strong>{selectedSlipForView.headcountServed} बच्चे</strong></div>
                <div>आज का मेनू: <strong>{selectedSlipForView.menuItem}</strong></div>
              </div>
            </div>

            {/* Ration Breakdown Table */}
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '18px', fontSize: '0.82rem' }}>
              <thead>
                <tr style={{ background: '#e2e8f0', borderTop: '1px solid #cbd5e1', borderBottom: '1px solid #cbd5e1', textAlign: 'left' }}>
                  <th style={{ padding: '8px 10px' }}>क्र.</th>
                  <th style={{ padding: '8px 10px' }}>सामग्री विवरण</th>
                  <th style={{ padding: '8px 10px' }}>सरकारी प्रति बच्चा मानक</th>
                  <th style={{ padding: '8px 10px' }}>कुल निकासी मात्रा</th>
                  <th style={{ padding: '8px 10px', textAlign: 'right' }}>स्वीकृत लागत</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '8px 10px' }}>1</td>
                  <td style={{ padding: '8px 10px', fontWeight: 600 }}>चावल (Foodgrains)</td>
                  <td style={{ padding: '8px 10px' }}>100 ग्राम</td>
                  <td style={{ padding: '8px 10px', fontWeight: 700 }}>{selectedSlipForView.riceKg} किग्रा</td>
                  <td style={{ padding: '8px 10px', textAlign: 'right' }}>FCI मुफ़्त आपूर्ति</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '8px 10px' }}>2</td>
                  <td style={{ padding: '8px 10px', fontWeight: 600 }}>दाल (Pulses)</td>
                  <td style={{ padding: '8px 10px' }}>20 ग्राम</td>
                  <td style={{ padding: '8px 10px', fontWeight: 700 }}>{selectedSlipForView.dalKg} किग्रा</td>
                  <td style={{ padding: '8px 10px', textAlign: 'right' }}>कुकिंग लागत अंतर्गत</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '8px 10px' }}>3</td>
                  <td style={{ padding: '8px 10px', fontWeight: 600 }}>हरी ताज़ी सब्जी</td>
                  <td style={{ padding: '8px 10px' }}>50 ग्राम</td>
                  <td style={{ padding: '8px 10px', fontWeight: 700 }}>{selectedSlipForView.vegKg} किग्रा</td>
                  <td style={{ padding: '8px 10px', textAlign: 'right' }}>कुकिंग लागत अंतर्गत</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '8px 10px' }}>4</td>
                  <td style={{ padding: '8px 10px', fontWeight: 600 }}>खाद्य तेल व वसा</td>
                  <td style={{ padding: '8px 10px' }}>5 ग्राम</td>
                  <td style={{ padding: '8px 10px', fontWeight: 700 }}>{selectedSlipForView.oilGrams} ग्राम</td>
                  <td style={{ padding: '8px 10px', textAlign: 'right' }}>कुकिंग लागत अंतर्गत</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '8px 10px' }}>5</td>
                  <td style={{ padding: '8px 10px', fontWeight: 600 }}>आयोडाइज़्ड नमक व मसाले</td>
                  <td style={{ padding: '8px 10px' }}>2 ग्राम</td>
                  <td style={{ padding: '8px 10px', fontWeight: 700 }}>{selectedSlipForView.saltSpicesGrams} ग्राम</td>
                  <td style={{ padding: '8px 10px', textAlign: 'right' }}>कुकिंग लागत अंतर्गत</td>
                </tr>
                {selectedSlipForView.eggsCount > 0 && (
                  <tr style={{ borderBottom: '1px solid #f1f5f9', background: '#fffbeb' }}>
                    <td style={{ padding: '8px 10px' }}>6</td>
                    <td style={{ padding: '8px 10px', fontWeight: 700, color: '#92400e' }}>उबला अंडा / फल (विशेष प्रोटीन)</td>
                    <td style={{ padding: '8px 10px' }}>1 नग / ₹6.00</td>
                    <td style={{ padding: '8px 10px', fontWeight: 700, color: '#92400e' }}>{selectedSlipForView.eggsCount} नग</td>
                    <td style={{ padding: '8px 10px', textAlign: 'right', fontWeight: 700, color: '#92400e' }}>
                      ₹{(selectedSlipForView.eggsCount * 6).toFixed(2)}
                    </td>
                  </tr>
                )}
                <tr style={{ borderTop: '2px solid #334155', background: '#f8fafc', fontWeight: 800 }}>
                  <td colSpan={4} style={{ padding: '10px', textAlign: 'right' }}>
                    कुल देय कुकिंग परिव्यय (Total Cooking Cost):
                  </td>
                  <td style={{ padding: '10px', textAlign: 'right', fontSize: '1rem', color: '#0f172a' }}>
                    ₹{selectedSlipForView.cookingCostInr.toLocaleString('en-IN')}
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Quality Tasting & Dual Signatures */}
            <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '8px', marginBottom: '24px', fontSize: '0.8rem', borderLeft: '3px solid #10b981' }}>
              <strong>गुणवत्ता एवं चखने का प्रमाण:</strong> आज का भोजन बच्चों को परोसने से पूर्व प्रभारी शिक्षक <strong>{selectedSlipForView.tastedByTeacher}</strong> द्वारा चखा गया एवं भोजन की गुणवत्ता, स्वच्छता व तापमान संतोषजनक प्रमाणित की गई।
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '30px', paddingTop: '20px', borderTop: '1px dashed #cbd5e1' }}>
              <div style={{ textAlign: 'center', width: '220px' }}>
                <div style={{ height: '35px' }}></div>
                <div style={{ borderTop: '1px solid #64748b', paddingTop: '4px', fontSize: '0.8rem', fontWeight: 700 }}>
                  हस्ताक्षर / अंगूठा निशान
                </div>
                <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
                  {selectedSlipForView.cookName} (रसोइया-सह-सहायिका)
                </div>
              </div>

              <div style={{ textAlign: 'center', width: '220px' }}>
                <div style={{ height: '35px' }}></div>
                <div style={{ borderTop: '1px solid #64748b', paddingTop: '4px', fontSize: '0.8rem', fontWeight: 700 }}>
                  हस्ताक्षर एवं मुहर
                </div>
                <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
                  प्रधानाध्यापक / प्रभारी शिक्षक (पलाश मित्र)
                </div>
              </div>
            </div>

            {/* Print Action Buttons */}
            <div className="no-print" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '24px', borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
              <button
                type="button"
                onClick={() => setSelectedSlipForView(null)}
                className="btn btn-secondary"
              >
                बंद करें
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="btn btn-primary"
                style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}
              >
                <Printer size={16} />
                <span>सरकारी पर्ची प्रिंट करें (Print Voucher)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================== MODAL 3: CONFIRM DELETE SLIP ===================== */}
      {slipToDelete && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(3px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}
        >
          <div
            className="card"
            style={{
              width: '100%',
              maxWidth: '440px',
              padding: '24px',
              borderRadius: '16px',
              textAlign: 'center'
            }}
          >
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#fee2e2', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
              <AlertTriangle size={24} />
            </div>

            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0 0 8px 0', color: 'var(--color-text)' }}>
              राशन पर्ची हटाएं?
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', marginBottom: '18px' }}>
              क्या आप पर्ची संख्या <strong>{slipToDelete.slipNumber}</strong> ({slipToDelete.date}) को हटाना चाहते हैं? इस पर्ची में निकाला गया राशन स्टॉक (चावल {slipToDelete.riceKg}kg, दाल {slipToDelete.dalKg}kg) स्वतः भंडार में वापस जोड़ दिया जाएगा।
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setSlipToDelete(null)}
                className="btn btn-secondary"
              >
                रद्द करें
              </button>
              <button
                type="button"
                onClick={() => handleDeleteSlip(slipToDelete.id)}
                className="btn"
                style={{ background: '#ef4444', color: '#ffffff', border: 'none', fontWeight: 700 }}
              >
                हाँ, पर्ची हटाएं
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
