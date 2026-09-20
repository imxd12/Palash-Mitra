import { Request, Response } from 'express';
import { db } from '../../core/database/db';
import { v4 as uuidv4 } from 'uuid';

export interface MdmRationSlip {
  id: string;
  slipNumber: string;
  date: string; // YYYY-MM-DD
  grade: number; // 0 for All Grades Consolidated (1-5) or 1..5
  section: string;
  beneficiaryCount: number; // Number of students served
  mealType: string;
  menuDay: string;
  isSpecialNutritionDay: boolean; // Egg / Seasonal fruit day (Mon, Wed, Fri)
  specialNutritionItem: string;
  
  // Quantitative allocations (kg or units)
  riceKg: number;
  dalKg: number;
  vegKg: number;
  oilKg: number;
  saltSpicesKg: number;
  specialNutritionCount: number;
  
  // Financial allocations (INR)
  cookingCostPerChild: number;
  totalCookingCost: number;
  specialNutritionCost: number;
  totalMealCost: number;
  
  // Buffer Stock Remaining
  bufferStockRiceKg: number;
  bufferStockDalKg: number;
  bufferStockOilKg: number;
  
  // Signatures & Verification
  cookName: string;
  cookAcknowledged: boolean;
  verifiedByTeacherName: string;
  teacherEmployeeCode: string;
  notes?: string;
  
  createdAt: string;
  updatedAt: string;
}

// Jharkhand Government Primary School MDM Norms (per child per day)
const PRIMARY_NORMS = {
  riceKg: 0.10, // 100 grams
  dalKg: 0.02,  // 20 grams
  vegKg: 0.05,  // 50 grams
  oilKg: 0.005, // 5 grams
  saltSpicesKg: 0.003, // 3 grams
  cookingCostRate: 5.45, // ₹5.45 / child
  eggFruitCostRate: 6.00 // ₹6.00 / child
};

// Default Jharkhand Weekly MDM Menu Table
export const JHARKHAND_WEEKLY_MDM_MENU: Record<number, { dayHindi: string; menu: string; isEggDay: boolean; item: string }> = {
  1: { dayHindi: 'सोमवार (Monday)', menu: 'चावल, दाल, सोयाबीन बड़ी व मौसमी सब्जी + उबला अंडा / केला', isEggDay: true, item: 'उबला अंडा / केला' },
  2: { dayHindi: 'मंगलवार (Tuesday)', menu: 'चावल, चना दाल व हरी मौसमी सब्जी', isEggDay: false, item: 'हरी ताजी सब्जी' },
  3: { dayHindi: 'बुधवार (Wednesday)', menu: 'पौष्टिक खिचड़ी, चोखा व पापड़ + उबला अंडा / मौसमी फल', isEggDay: true, item: 'उबला अंडा / मौसमी फल' },
  4: { dayHindi: 'गुरुवार (Thursday)', menu: 'चावल, दाल व आलू-सोयाबीन सब्जी', isEggDay: false, item: 'सोयाबीन सब्जी' },
  5: { dayHindi: 'शुक्रवार (Friday)', menu: 'चावल, दाल, पालक/हरी पत्तेदार सब्जी + उबला अंडा / मौसमी फल', isEggDay: true, item: 'उबला अंडा / फल' },
  6: { dayHindi: 'शनिवार (Saturday)', menu: 'पुलाव / तहरी, दाल व मौसमी सब्जी अचार', isEggDay: false, item: 'सब्जी अचार' },
  0: { dayHindi: 'रविवार (Sunday)', menu: 'साप्ताहिक अवकाश (Sunday Closed)', isEggDay: false, item: 'कोई भोजन नहीं' }
};

// Initial realistic buffer stock (Starting safety balance in school kitchen)
let currentInventory = {
  riceKg: 68.5,
  dalKg: 18.2,
  oilKg: 6.5,
  saltSpicesKg: 4.0,
  eggsFruitCount: 45,
  lastRestockedDate: '2026-09-10'
};

// Seed realistic recent slips if database table is empty
const seedInitialSlipsIfEmpty = () => {
  const existing = db.find('mdm_slips');
  if (existing.length === 0) {
    const initialSlips: MdmRationSlip[] = [
      {
        id: 'slip_mdm_01',
        slipNumber: 'MDM-20260916-01',
        date: '2026-09-16',
        grade: 0, // Consolidated
        section: 'A',
        beneficiaryCount: 16,
        mealType: 'पौष्टिक खिचड़ी, चोखा व उबला अंडा',
        menuDay: 'बुधवार (Wednesday)',
        isSpecialNutritionDay: true,
        specialNutritionItem: 'उबला अंडा / मौसमी फल',
        riceKg: 1.60,
        dalKg: 0.32,
        vegKg: 0.80,
        oilKg: 0.08,
        saltSpicesKg: 0.05,
        specialNutritionCount: 16,
        cookingCostPerChild: 5.45,
        totalCookingCost: 87.20,
        specialNutritionCost: 96.00,
        totalMealCost: 183.20,
        bufferStockRiceKg: 68.5,
        bufferStockDalKg: 18.2,
        bufferStockOilKg: 6.5,
        cookName: 'शांति सोरेन (रसोइया)',
        cookAcknowledged: true,
        verifiedByTeacherName: 'जयपाल मुंडा (PRT - FLN)',
        teacherEmployeeCode: 'JH-PRT-1042',
        notes: 'सभी 16 उपस्थित बच्चों को गरम पौष्टिक मध्याह्न भोजन वितरित किया गया।',
        createdAt: '2026-09-16T12:30:00.000Z',
        updatedAt: '2026-09-16T12:30:00.000Z'
      },
      {
        id: 'slip_mdm_02',
        slipNumber: 'MDM-20260917-01',
        date: '2026-09-17',
        grade: 0,
        section: 'A',
        beneficiaryCount: 15,
        mealType: 'चावल, दाल व आलू-सोयाबीन सब्जी',
        menuDay: 'गुरुवार (Thursday)',
        isSpecialNutritionDay: false,
        specialNutritionItem: 'सोयाबीन सब्जी',
        riceKg: 1.50,
        dalKg: 0.30,
        vegKg: 0.75,
        oilKg: 0.075,
        saltSpicesKg: 0.045,
        specialNutritionCount: 0,
        cookingCostPerChild: 5.45,
        totalCookingCost: 81.75,
        specialNutritionCost: 0,
        totalMealCost: 81.75,
        bufferStockRiceKg: 67.0,
        bufferStockDalKg: 17.9,
        bufferStockOilKg: 6.425,
        cookName: 'पार्वती मुर्मू (रसोइया)',
        cookAcknowledged: true,
        verifiedByTeacherName: 'जयपाल मुंडा (PRT - FLN)',
        teacherEmployeeCode: 'JH-PRT-1042',
        notes: 'भोजन की गुणवत्ता व स्वच्छता का पूर्ण निरीक्षण किया गया।',
        createdAt: '2026-09-17T12:20:00.000Z',
        updatedAt: '2026-09-17T12:20:00.000Z'
      }
    ];

    initialSlips.forEach(s => db.insert('mdm_slips', s));
  }
};

// 1. GET /api/v1/mdm/slips
export const getSlips = (req: Request, res: Response): void => {
  seedInitialSlipsIfEmpty();
  const dateQuery = req.query.date as string;
  const gradeQuery = req.query.grade ? parseInt(req.query.grade as string, 10) : undefined;

  let slips = db.find('mdm_slips');

  if (dateQuery) {
    slips = slips.filter((s: MdmRationSlip) => s.date === dateQuery);
  }
  if (gradeQuery !== undefined && gradeQuery !== 0) {
    slips = slips.filter((s: MdmRationSlip) => s.grade === gradeQuery || s.grade === 0);
  }

  // Sort descending by date
  slips.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

  res.json({
    success: true,
    totalSlips: slips.length,
    slips,
    inventory: currentInventory
  });
};

// 2. POST /api/v1/mdm/slips
export const createSlip = (req: Request, res: Response): void => {
  const {
    date = new Date().toISOString().split('T')[0],
    grade = 0,
    section = 'A',
    beneficiaryCount = 16,
    mealType,
    menuDay,
    isSpecialNutritionDay,
    specialNutritionItem,
    cookName = 'शांति सोरेन (रसोइया)',
    verifiedByTeacherName = 'जयपाल मुंडा (PRT)',
    teacherEmployeeCode = 'JH-PRT-1042',
    notes
  } = req.body;

  const count = Math.max(1, parseInt(beneficiaryCount, 10) || 1);
  const dateObj = new Date(date);
  const dayOfWeek = isNaN(dateObj.getTime()) ? 1 : dateObj.getDay();
  const scheduleDay = JHARKHAND_WEEKLY_MDM_MENU[dayOfWeek] || JHARKHAND_WEEKLY_MDM_MENU[1];

  const resolvedMenuDay = menuDay || scheduleDay.dayHindi;
  const resolvedMealType = mealType || scheduleDay.menu;
  const resolvedIsEggDay = isSpecialNutritionDay !== undefined ? Boolean(isSpecialNutritionDay) : scheduleDay.isEggDay;
  const resolvedEggItem = specialNutritionItem || (resolvedIsEggDay ? scheduleDay.item : 'नहीं');

  // Exact calculations per government guidelines
  const riceKg = parseFloat((count * PRIMARY_NORMS.riceKg).toFixed(2));
  const dalKg = parseFloat((count * PRIMARY_NORMS.dalKg).toFixed(3));
  const vegKg = parseFloat((count * PRIMARY_NORMS.vegKg).toFixed(2));
  const oilKg = parseFloat((count * PRIMARY_NORMS.oilKg).toFixed(3));
  const saltSpicesKg = parseFloat((count * PRIMARY_NORMS.saltSpicesKg).toFixed(3));
  const specialNutritionCount = resolvedIsEggDay ? count : 0;

  const totalCookingCost = parseFloat((count * PRIMARY_NORMS.cookingCostRate).toFixed(2));
  const specialNutritionCost = resolvedIsEggDay ? parseFloat((count * PRIMARY_NORMS.eggFruitCostRate).toFixed(2)) : 0;
  const totalMealCost = parseFloat((totalCookingCost + specialNutritionCost).toFixed(2));

  // Deduct from current inventory
  currentInventory.riceKg = Math.max(0, parseFloat((currentInventory.riceKg - riceKg).toFixed(2)));
  currentInventory.dalKg = Math.max(0, parseFloat((currentInventory.dalKg - dalKg).toFixed(2)));
  currentInventory.oilKg = Math.max(0, parseFloat((currentInventory.oilKg - oilKg).toFixed(2)));
  if (resolvedIsEggDay) {
    currentInventory.eggsFruitCount = Math.max(0, currentInventory.eggsFruitCount - count);
  }

  const slipSerial = Math.floor(1000 + Math.random() * 9000);
  const dateFormatted = date.replace(/-/g, '');
  const slipNumber = `MDM-${dateFormatted}-${slipSerial}`;

  const newSlip: MdmRationSlip = {
    id: uuidv4(),
    slipNumber,
    date,
    grade: parseInt(grade, 10) || 0,
    section: (section || 'A').toUpperCase(),
    beneficiaryCount: count,
    mealType: resolvedMealType,
    menuDay: resolvedMenuDay,
    isSpecialNutritionDay: resolvedIsEggDay,
    specialNutritionItem: resolvedEggItem,
    riceKg,
    dalKg,
    vegKg,
    oilKg,
    saltSpicesKg,
    specialNutritionCount,
    cookingCostPerChild: PRIMARY_NORMS.cookingCostRate,
    totalCookingCost,
    specialNutritionCost,
    totalMealCost,
    bufferStockRiceKg: currentInventory.riceKg,
    bufferStockDalKg: currentInventory.dalKg,
    bufferStockOilKg: currentInventory.oilKg,
    cookName,
    cookAcknowledged: true,
    verifiedByTeacherName,
    teacherEmployeeCode,
    notes: notes || 'मध्याह्न भोजन प्राधिकरण, झारखंड सरकार के दिशानिर्देशों अनुसार दैनिक राशन पर्ची निर्गत।',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  db.insert('mdm_slips', newSlip);

  // Log in system audit logs
  db.insert('audit_logs', {
    action: 'MDM_SLIP_CREATED',
    slipNumber,
    beneficiaryCount: count,
    verifiedBy: verifiedByTeacherName,
    timestamp: new Date().toISOString()
  });

  res.status(201).json({
    success: true,
    message: 'MDM राशन पर्ची सफलतापूर्वक तैयार व दर्ज कर ली गई है।',
    slip: newSlip,
    remainingInventory: currentInventory
  });
};

// 3. DELETE /api/v1/mdm/slips/:id
export const deleteSlip = (req: Request, res: Response): void => {
  const { id } = req.params;
  const slip = db.findOne('mdm_slips', (s: any) => s.id === id || s.slipNumber === id);

  if (!slip) {
    res.status(404).json({ success: false, error: 'पर्ची नहीं मिली (Slip not found).' });
    return;
  }

  // Restore inventory buffer
  currentInventory.riceKg = parseFloat((currentInventory.riceKg + slip.riceKg).toFixed(2));
  currentInventory.dalKg = parseFloat((currentInventory.dalKg + slip.dalKg).toFixed(2));
  currentInventory.oilKg = parseFloat((currentInventory.oilKg + slip.oilKg).toFixed(2));

  db.delete('mdm_slips', slip.id);

  db.insert('audit_logs', {
    action: 'MDM_SLIP_DELETED',
    slipNumber: slip.slipNumber,
    deletedBy: 'Teacher / School Admin',
    timestamp: new Date().toISOString()
  });

  res.json({
    success: true,
    message: `पर्ची क्रमांक ${slip.slipNumber} सफलतापूर्वक हटा दी गई है और राशन स्टॉक पुनर्स्थापित कर दिया गया है।`,
    deletedId: slip.id,
    restoredInventory: currentInventory
  });
};

// 4. GET /api/v1/mdm/inventory
export const getInventory = (_req: Request, res: Response): void => {
  const lowStockThresholdRice = 15.0; // kg
  const lowStockThresholdDal = 5.0;   // kg

  const alerts = [];
  if (currentInventory.riceKg < lowStockThresholdRice) {
    alerts.push({
      type: 'WARNING',
      message: `चावल का बफर स्टॉक केवल ${currentInventory.riceKg} किग्रा बचा है (न्यूनतम 3-दिन सुरक्षा सीमा: 15 किग्रा)। तत्काल ब्लॉक शिक्षा कार्यालय (BEEO) को मांग पत्र भेजें।`
    });
  }
  if (currentInventory.dalKg < lowStockThresholdDal) {
    alerts.push({
      type: 'WARNING',
      message: `दाल का स्टॉक ${currentInventory.dalKg} किग्रा है। आगामी 2 दिनों में पुनः आपूर्ति अपेक्षित है।`
    });
  }

  res.json({
    success: true,
    inventory: currentInventory,
    norms: PRIMARY_NORMS,
    alerts,
    weeklyMenu: JHARKHAND_WEEKLY_MDM_MENU
  });
};

// 5. GET /api/v1/mdm/ai-audit
export const getAiAudit = (_req: Request, res: Response): void => {
  seedInitialSlipsIfEmpty();
  const slips = db.find('mdm_slips');

  const totalBeneficiaries = slips.reduce((sum: number, s: any) => sum + (s.beneficiaryCount || 0), 0);
  const totalRiceUsed = slips.reduce((sum: number, s: any) => sum + (s.riceKg || 0), 0);
  const totalDalUsed = slips.reduce((sum: number, s: any) => sum + (s.dalKg || 0), 0);
  const totalCost = slips.reduce((sum: number, s: any) => sum + (s.totalMealCost || 0), 0);
  const eggFruitDaysCount = slips.filter((s: any) => s.isSpecialNutritionDay).length;

  const complianceScore = Math.min(100, Math.round(92 + (eggFruitDaysCount > 0 ? 6 : 0)));

  res.json({
    success: true,
    audit: {
      complianceScore,
      totalMealsLogged: slips.length,
      totalBeneficiaries,
      totalRiceUsedKg: parseFloat(totalRiceUsed.toFixed(2)),
      totalDalUsedKg: parseFloat(totalDalUsed.toFixed(2)),
      totalExpenditureInr: parseFloat(totalCost.toFixed(2)),
      eggFruitDistributionRate: slips.length > 0 ? Math.round((eggFruitDaysCount / slips.length) * 100) : 100,
      nutritionalCompliance: {
        caloriePerChildTargetKcal: 450,
        proteinPerChildTargetGrams: 12.0,
        status: 'पूर्णतः मानक अनुरूप (100% Compliant)'
      },
      aiSuggestions: [
        'झारखंड मध्याह्न भोजन प्राधिकरण के निर्देशानुसार सोमवार, बुधवार व शुक्रवार को अंडा/मौसमी फल वितरण नियमित रखें।',
        'स्थानीय हाट-बाज़ार से हरी मौसमी सब्जियाँ क्रय कर ताज़ा पोषण सुनिश्चित करें।',
        'रसोई में स्वच्छ पेय जल व हाथ धोने के साबुन की सतत उपलब्धता रखें।'
      ]
    }
  });
};
