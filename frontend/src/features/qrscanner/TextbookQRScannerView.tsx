import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../core/context/AppContext';
import { OlChikiText } from '../../components/OlChikiText';
import { QrCode, Camera, Sparkles, BookOpen, CheckCircle2, ArrowRight, Printer, RefreshCw } from 'lucide-react';

interface TextbookChapter {
  qrCode: string;
  grade: number;
  subject: string;
  chapterNumber: number;
  chapterTitleHi: string;
  chapterTitleTarget: string;
  learningOutcome: string;
  villageContextActivity: string;
  keywords: string[];
}

export const TextbookQRScannerView: React.FC<{ onNavigate: (tab: string) => void }> = ({ onNavigate }) => {
  const { setSelectedGrade, setSelectedSubject, targetLanguage, targetLanguageName } = useApp();

  const [activeTab, setActiveTab] = useState<'PRESETS' | 'CAMERA'>('PRESETS');
  const [scannedChapter, setScannedChapter] = useState<TextbookChapter | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const jcertChapters: TextbookChapter[] = [
    {
      qrCode: 'JCERT-MATH-C4-CH05',
      grade: 4,
      subject: 'Mathematics',
      chapterNumber: 5,
      chapterTitleHi: 'भिन्न की समझ (Understanding Fractions)',
      chapterTitleTarget: 'ᱦᱟᱹᱴᱤᱧ ᱨᱮᱭᱟᱜ ᱵᱩᱡᱷᱟᱹᱣ (Hatiñ Reyag Bujhau)',
      learningOutcome: 'विद्यार्थी किसी वस्तु के समान भागों (1/2, 1/4) को पहचान कर मातृभाषा में व्यक्त कर सकेंगे।',
      villageContextActivity: 'अमरूद या रोटी को 4 दोस्तों में बराबर बांटने की गतिविधि।',
      keywords: ['ᱦᱟᱹᱴᱤᱧ (भिन्न)', 'ᱛᱟᱞᱟ (आधा)', 'ᱥᱚᱢᱟᱱ (बराबर)']
    },
    {
      qrCode: 'JCERT-EVS-C3-CH03',
      grade: 3,
      subject: 'Science',
      chapterNumber: 3,
      chapterTitleHi: 'हमारे आस-पास के पेड़-पौधे (Plants Around Us)',
      chapterTitleTarget: 'ᱟᱵᱚ ᱥᱩᱨ-ᱥᱩᱯᱩᱨ ᱨᱮᱱᱟᱜ ᱫᱟᱨᱮ-ᱱᱟᱹᱲᱤ (Dare-Naṛi)',
      learningOutcome: 'विद्यार्थी पौधे के मुख्य अंगों (जड़, तना, पत्ती, फूल) की पहचान व उपयोग समझ सकेंगे।',
      villageContextActivity: 'विद्यालय परिसर से 3 प्रकार के गिरे हुए पत्ते इकट्ठा कर अवलोकन करना।',
      keywords: ['ᱫᱟᱨᱮ (पेड़)', 'ᱨᱮᱦᱮᱫ (जड़)', 'ᱥᱟᱠᱟᱢ (पत्ती)', 'ᱵᱟᱦᱟ (फूल)']
    },
    {
      qrCode: 'JCERT-LANG-C2-CH01',
      grade: 2,
      subject: 'Foundational Literacy',
      chapterNumber: 1,
      chapterTitleHi: 'हमारी वर्णमाला और परिवेशीय शब्द (Alphabet & Nature)',
      chapterTitleTarget: 'ᱟᱵᱚᱣᱟᱜ ᱚᱞ ᱪᱤᱠᱤ ᱟᱨ ᱟᱹᱲᱟᱹ (Akshar & Words)',
      learningOutcome: 'विद्यार्थी बुनियादी ध्वनियों को पहचान कर चित्रों के साथ संबंध स्थापित कर सकेंगे।',
      villageContextActivity: 'कंकड़ व तीलियों की सहायता से अक्षरों की आकृति बनाना।',
      keywords: ['ᱚ (Ol)', 'ᱛ (Ot)', 'ᱜ (Ag)', 'ᱝ (Ang)']
    }
  ];

  // Start Camera Stream when CAMERA tab is active
  useEffect(() => {
    let stream: MediaStream | null = null;
    if (activeTab === 'CAMERA') {
      if (navigator.mediaDevices?.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ video: { facingMode: 'environment' } })
          .then(s => {
            stream = s;
            if (videoRef.current) {
              videoRef.current.srcObject = s;
            }
          })
          .catch(err => {
            console.warn('Camera stream warning:', err);
            setCameraError('कैमरा अनुमति उपलब्ध नहीं है। कृपया नीचे दिए गए पाठ्यपुस्तक QR कोड पर क्लिक करें।');
          });
      } else {
        setCameraError('इस ब्राउज़र में कैमरा स्कैनर समर्थित नहीं है।');
      }
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [activeTab]);

  const handleSelectChapter = (ch: TextbookChapter) => {
    setScannedChapter(ch);
    setSelectedGrade(ch.grade);
    setSelectedSubject(ch.subject);
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1.6rem' }}>📷</span>
          <h1 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--color-primary)', margin: 0 }}>
            JCERT पाठ्यपुस्तक QR कोड स्कैनर व पाठ मैपर (Textbook QR Mapper)
          </h1>
        </div>
        <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
          झारखंड राज्य पाठ्यपुस्तक (JCERT) के पन्नों पर छपे QR कोड को स्कैन करें और तुरंत संबंधित पाठ योजना, ओल चिकी सामग्री एवं वर्कशीट प्राप्त करें।
        </p>
      </div>

      <div className="grid-2" style={{ gap: '20px', alignItems: 'flex-start' }}>
        {/* Left Column: Scanner Interface */}
        <div className="card" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          {/* Mode Tabs */}
          <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--color-border)', paddingBottom: '12px', marginBottom: '16px' }}>
            <button
              onClick={() => setActiveTab('PRESETS')}
              className={`btn ${activeTab === 'PRESETS' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ flex: 1 }}
            >
              <QrCode size={15} />
              <span>JCERT पाठ्यपुस्तक QR सूची</span>
            </button>
            <button
              onClick={() => setActiveTab('CAMERA')}
              className={`btn ${activeTab === 'CAMERA' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ flex: 1 }}
            >
              <Camera size={15} />
              <span>लाइव कैमरा स्कैनर</span>
            </button>
          </div>

          {activeTab === 'PRESETS' ? (
            <div>
              <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBottom: '12px' }}>
                परीक्षण हेतु किसी भी राज्य पाठ्यपुस्तक QR कोड पर क्लिक करें:
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {jcertChapters.map(ch => (
                  <div
                    key={ch.qrCode}
                    onClick={() => handleSelectChapter(ch)}
                    style={{
                      background: scannedChapter?.qrCode === ch.qrCode ? 'var(--color-bg)' : 'transparent',
                      border: scannedChapter?.qrCode === ch.qrCode ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-md)',
                      padding: '14px',
                      cursor: 'pointer',
                      transition: 'all 150ms ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <span className="badge badge-primary" style={{ fontSize: '0.74rem' }}>
                        कक्षा {ch.grade} • {ch.subject}
                      </span>
                      <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--color-text-muted)' }}>
                        {ch.qrCode}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--color-text)', marginTop: '4px' }}>
                      पाठ {ch.chapterNumber}: {ch.chapterTitleHi}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--color-accent)', fontWeight: 600, marginTop: '2px' }}>
                      {ch.chapterTitleTarget}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '10px 0' }}>
              {cameraError ? (
                <div style={{ padding: '20px', background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', color: 'var(--color-text)' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📷</div>
                  <p style={{ fontSize: '0.88rem' }}>{cameraError}</p>
                  <button onClick={() => setActiveTab('PRESETS')} className="btn btn-primary" style={{ marginTop: '10px' }}>
                    पाठ्यपुस्तक सूची पर लौटें
                  </button>
                </div>
              ) : (
                <div style={{ position: 'relative', width: '100%', height: '260px', background: '#000', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                  <video ref={videoRef} autoPlay playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, border: '2px dashed #10B981', margin: '30px', pointerEvents: 'none' }} />
                  <div style={{ position: 'absolute', bottom: '12px', left: 0, right: 0, textAlign: 'center', color: '#FFF', fontSize: '0.78rem', background: 'rgba(0,0,0,0.6)', padding: '4px 0' }}>
                    QR कोड को कैमरे के सामने रखें
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Instant Mapped Lesson & Pedagogical Actions */}
        <div className="card" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <div className="card-header">
            <h2 className="card-title" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BookOpen size={18} color="var(--color-primary)" />
              <span>पाठ्यपुस्तक पाठ मैपिंग (Mapped Lesson Details)</span>
            </h2>
          </div>

          {!scannedChapter ? (
            <div style={{ textAlign: 'center', padding: '40px 16px', color: 'var(--color-text-muted)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '12px' }}>📖</div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text)' }}>
                पाठ्यपुस्तक QR कोड चुनें या स्कैन करें
              </h3>
              <p style={{ fontSize: '0.85rem', maxWidth: '320px', margin: '6px auto 0' }}>
                बाईं ओर से किसी भी JCERT पाठ पर क्लिक करें। पूरा द्विभाषी पाठ पैकेज तुरंत लोड हो जाएगा।
              </p>
            </div>
          ) : (
            <div>
              {/* Success Badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981', fontSize: '0.88rem', fontWeight: 700, marginBottom: '14px' }}>
                <CheckCircle2 size={18} />
                <span>QR कोड मान्यता प्राप्त: JCERT राज्य पाठ्यचर्या से मैप किया गया ✓</span>
              </div>

              {/* Title & Outcomes */}
              <div style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', padding: '16px', borderRadius: 'var(--radius-md)', marginBottom: '16px' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-accent)', textTransform: 'uppercase' }}>
                  कक्षा {scannedChapter.grade} • {scannedChapter.subject}
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-text)', margin: '4px 0 8px' }}>
                  पाठ {scannedChapter.chapterNumber}: {scannedChapter.chapterTitleHi}
                </h3>
                <div style={{ fontSize: '1rem', color: 'var(--color-primary)', fontWeight: 700, marginBottom: '10px' }}>
                  {scannedChapter.chapterTitleTarget}
                </div>

                <div style={{ fontSize: '0.85rem', color: 'var(--color-text)', marginTop: '8px', borderTop: '1px dashed var(--color-border)', paddingTop: '8px' }}>
                  🎯 <strong>अधिगम प्रतिफल (Learning Outcome):</strong> {scannedChapter.learningOutcome}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text)', marginTop: '6px' }}>
                  🌾 <strong>स्थानीय परिवेश गतिविधि:</strong> {scannedChapter.villageContextActivity}
                </div>
              </div>

              {/* Key Vernacular Terms */}
              <div style={{ marginBottom: '18px' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '8px' }}>
                  प्रमुख पाठ्यचर्या शब्दावली ({targetLanguageName}):
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {scannedChapter.keywords.map((kw, idx) => (
                    <span
                      key={idx}
                      style={{
                        background: 'var(--color-bg)',
                        border: '1px solid var(--color-border)',
                        padding: '4px 10px',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.85rem',
                        fontWeight: 600
                      }}
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Instant Action Gateway */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <button
                  onClick={() => onNavigate('smartteach')}
                  className="btn btn-primary"
                  style={{ padding: '10px', justifyContent: 'center' }}
                >
                  <Sparkles size={16} />
                  <span>स्मार्ट टीच शुरू करें</span>
                </button>

                <button
                  onClick={() => onNavigate('fluency')}
                  className="btn btn-secondary"
                  style={{ padding: '10px', justifyContent: 'center' }}
                >
                  <span>🗣️ वाचन अभ्यास</span>
                </button>

                <button
                  onClick={() => onNavigate('worksheets')}
                  className="btn btn-secondary"
                  style={{ padding: '10px', justifyContent: 'center' }}
                >
                  <Printer size={15} />
                  <span>कार्यपत्रक प्रिंट करें</span>
                </button>

                <button
                  onClick={() => onNavigate('flashcards')}
                  className="btn btn-secondary"
                  style={{ padding: '10px', justifyContent: 'center' }}
                >
                  <span>📇 फ़्लैशकार्ड देखें</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
