import React, { useState } from 'react';
import { useApp } from '../../core/context/AppContext';
import { Trophy, CheckCircle, ArrowRight, Play, Sparkles, Mic, WifiOff, Target, Edit3, X } from 'lucide-react';

interface SIHDemoControllerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: string) => void;
}

export const SIHDemoController: React.FC<SIHDemoControllerProps> = ({ isOpen, onClose, onNavigate }) => {
  const { toggleOffline, isOffline, setTargetLanguage } = useApp();

  const [currentStep, setCurrentStep] = useState<number>(1);

  if (!isOpen) return null;

  const demoSteps = [
    {
      step: 1,
      title: 'WOW #1: रियल-टाइम कक्षा वाक अनुवाद व लाइव लेटेंसी',
      description: 'जज हिंदी में बोलेंगे: "बच्चों, आज हम भिन्न सीखेंगे।" सिस्टम वाक-पहचान करेगा, ओल चिकी संथाली में अनुवाद करेगा और वास्तविक लेटेंसी (लक्ष्य < 3.0s) प्रदर्शित करेगा।',
      actionLabel: 'वाक अनुवाद कक्षा खोलें (Open Voice Classroom)',
      tab: 'voice',
      icon: <Mic size={20} color="var(--color-primary)" />,
      badge: 'WOW MOMENT 1'
    },
    {
      step: 2,
      title: 'WOW #2: हवाई जहाज़ मोड (100% ऑफ़लाइन कक्षा)',
      description: 'इंटरनेट बंद करें या ऑफ़लाइन मोड चालू करें। स्थानीय भाषा पैक से पाठ, द्विभाषी कार्यपत्रक और ओल चिकी अनुवाद बिना किसी नेटवर्क अनुरोध के निष्पादित होंगे।',
      actionLabel: isOffline ? 'ऑफ़लाइन पाठ खोलें (Open Offline Teach)' : 'हवाई जहाज़ मोड सक्षम करें (Toggle Airplane Mode)',
      tab: 'smartteach',
      icon: <WifiOff size={20} color="var(--color-offline)" />,
      badge: 'WOW MOMENT 2',
      onAction: () => {
        if (!isOffline) toggleOffline();
        onNavigate('smartteach');
      }
    },
    {
      step: 3,
      title: 'WOW #3: AI वैयक्तिकृत उपचारात्मक शिक्षण',
      description: 'छात्र "बिरसा मुर्मु" 2-अंकीय घटाव में बार-बार गलती कर रहा है। AI स्थानीय मान की कठिनाई को पहचान कर तीली-बंडल (काड़ा) आधारित मातृभाषा उपचारात्मक गतिविधि तैयार करता है।',
      actionLabel: 'उपचार योजना देखें (Open Remediation)',
      tab: 'remediation',
      icon: <Target size={20} color="#2563EB" />,
      badge: 'WOW MOMENT 3'
    },
    {
      step: 4,
      title: 'WOW #4: शिक्षक सुधार लूप व ज्ञान बैंक संवर्धन',
      description: 'कम-संसाधन एनएलपी में शिक्षक अनुवाद को सही करता है। यह सुधार तुरंत स्थानीय अनुवाद स्मृति में सहेजा जाता है और भविष्य के अनुवादों में वरीयता प्राप्त करता है।',
      actionLabel: 'भाषा बैंक व सुधार देखें (Open Knowledge Bank)',
      tab: 'knowledgebank',
      icon: <Edit3 size={20} color="var(--color-accent)" />,
      badge: 'WOW MOMENT 4'
    },
    {
      step: 5,
      title: 'WOW #5: ✨ स्मार्ट टीच (1-क्लिक संपूर्ण कक्षा पैक)',
      description: 'शिक्षक चुनता है: कक्षा 4 • गणित • भिन्न। सिस्टम 1-क्लिक में पाठ योजना, स्थानीय गाँव के उदाहरण, द्विभाषी कार्यपत्रक, सचित्र फ़्लैशकार्ड और क्विज़ तैयार करता है।',
      actionLabel: 'स्मार्ट टीच चलाएं (Run Smart Teach)',
      tab: 'smartteach',
      icon: <Sparkles size={20} color="var(--color-accent)" />,
      badge: 'WOW MOMENT 5'
    }
  ];

  const handleStepClick = (item: any) => {
    setCurrentStep(item.step);
    if (item.onAction) {
      item.onAction();
    } else {
      onNavigate(item.tab);
    }
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 1100 }}>
      <div className="modal-content" style={{ maxWidth: '680px' }}>
        {/* Header */}
        <div className="modal-header" style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, #2A6C58 100%)', color: '#FFFFFF', borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Trophy size={24} color="#FBBF24" />
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>🏆 SIH 2026 जूरी प्रदर्शन मोड (Demo Mode)</h2>
              <div style={{ fontSize: '0.78rem', opacity: 0.9 }}>
                5-7 मिनट का निर्देशित मूल्यांकन प्रवाह • समस्या विवरण PS-26042
              </div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#FFFFFF', fontSize: '1.5rem', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Body: 5 WOW Moments Steps */}
        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {demoSteps.map((item) => {
            const isCurrent = currentStep === item.step;

            return (
              <div
                key={item.step}
                style={{
                  border: isCurrent ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                  background: isCurrent ? 'var(--color-primary-subtle)' : '#FFFFFF',
                  borderRadius: 'var(--radius-md)',
                  padding: '16px',
                  transition: 'all 200ms ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {item.icon}
                    <span style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                      {item.title}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--color-accent)', background: 'var(--color-accent-subtle)', padding: '2px 8px', borderRadius: 'var(--radius-full)' }}>
                    {item.badge}
                  </span>
                </div>

                <p style={{ fontSize: '0.86rem', color: 'var(--color-text)', marginBottom: '12px', lineHeight: 1.5 }}>
                  {item.description}
                </p>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    onClick={() => handleStepClick(item)}
                    className={`btn ${isCurrent ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ padding: '6px 14px', fontSize: '0.82rem' }}
                  >
                    <Play size={13} />
                    <span>{item.actionLabel}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="modal-footer" style={{ background: '#F8FAFC' }}>
          <div style={{ fontSize: '0.78rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>*सभी लेटेंसी और ऑफ़लाइन गणनाएं वास्तविक हैं, कोई नकली डेटा नहीं।</span>
          </div>
          <button onClick={onClose} className="btn btn-secondary" style={{ padding: '6px 16px' }}>
            बंद करें
          </button>
        </div>
      </div>
    </div>
  );
};
