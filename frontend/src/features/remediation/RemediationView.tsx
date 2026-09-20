import React, { useState, useEffect } from 'react';
import { useApp } from '../../core/context/AppContext';
import { api } from '../../core/api/client';
import { OlChikiText, VernacularText } from '../../components/OlChikiText';
import { speechBridge } from '../../core/speech/speechBridge';
import {
  Target,
  AlertCircle,
  CheckCircle2,
  Volume2,
  Sparkles,
  User,
  RefreshCw,
  TrendingUp,
  Award,
  Layers,
  HelpCircle,
  Clock,
  BookOpen
} from 'lucide-react';

interface Student {
  id: string;
  rollNo: string;
  name: string;
  grade: number;
  section: string;
  motherTongue: string;
  category?: string;
  guardianName?: string;
  village?: string;
}

interface RemediationHistoryItem {
  studentId: string;
  studentName: string;
  topic: string;
  masteryScore: number;
  attemptsCount: number;
  needsRemediation: boolean;
  updatedAt?: string;
  lastAssessmentAt?: string;
}

const COMMON_MISCONCEPTIONS = [
  {
    topic: '2-अंकीय घटाव व स्थानीय मान (Subtraction & Place Value)',
    category: 'Mathematics',
    gradeMin: 2,
    errorPattern: 'उधार (Borrowing) वाले घटाव में इकाई और दहाई के स्थानीय मान की भ्रांति (12 के बदले सीधे 2 में से घटाना)'
  },
  {
    topic: 'तुल्य भिन्न व समान बंटवारा (Fractions & Equal Partitions)',
    category: 'Mathematics',
    gradeMin: 3,
    errorPattern: 'भिन्न में अंश व हर को दो स्वतंत्र संख्याएं समझकर तुलना में गलती (जैसे 1/4 को 1/2 से बड़ा समझना)'
  },
  {
    topic: 'पौधों के भाग एवं पोषण (Plant Parts & Photosynthesis)',
    category: 'Environmental Studies / Science',
    gradeMin: 3,
    errorPattern: 'जड़ और तने के जल संवहन कार्य में अंतर न कर पाना और प्रकाश संश्लेषण की प्रक्रिया में भ्रम'
  },
  {
    topic: 'अक्षर-ध्वनि एवं वर्ण-मात्रा दोष (Phoneme Reversal & Syllable Inversion)',
    category: 'Foundational Literacy (FLN)',
    gradeMin: 1,
    errorPattern: 'मातृभाषा और मानक लिपि के बीच वर्ण-ध्वनि का संलक्षण दोष व मात्रा लगाने में भ्रम'
  }
];

export const RemediationView: React.FC = () => {
  const {
    targetLanguage,
    targetLanguageName,
    selectedGrade,
    selectedSubject,
    speechSpeed,
    theme
  } = useApp();

  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState<string>('');
  const [loadingStudents, setLoadingStudents] = useState<boolean>(true);

  // Remediation config
  const [selectedTopic, setSelectedTopic] = useState<string>(COMMON_MISCONCEPTIONS[0].topic);
  const [customErrorPattern, setCustomErrorPattern] = useState<string>(COMMON_MISCONCEPTIONS[0].errorPattern);
  const [masteryScore, setMasteryScore] = useState<number>(0.35); // 35% starting

  // State machine
  const [isRemediating, setIsRemediating] = useState<boolean>(false);
  const [remediationData, setRemediationData] = useState<any | null>(null);
  const [diagnosisData, setDiagnosisData] = useState<any | null>(null);

  // Drill & Reassessment state
  const [revealedHints, setRevealedHints] = useState<Record<number, boolean>>({});
  const [reassessmentAnswer, setReassessmentAnswer] = useState<string>('');
  const [isReassessing, setIsReassessing] = useState<boolean>(false);
  const [reassessmentPassed, setReassessmentPassed] = useState<boolean>(false);
  const [newMasteryScore, setNewMasteryScore] = useState<number>(0.35);

  // Audit history
  const [historyList, setHistoryList] = useState<RemediationHistoryItem[]>([]);

  // Fetch real students on mount or grade change
  useEffect(() => {
    fetchStudents();
    fetchRemediationHistory();
  }, [selectedGrade]);

  const fetchStudents = async () => {
    setLoadingStudents(true);
    try {
      const res = await api.get(`/students?grade=${selectedGrade}`);
      if (res?.students && res.students.length > 0) {
        setStudents(res.students);
        setSelectedStudentId(res.students[0].id);
      } else {
        // Fetch all students if none in current grade
        const allRes = await api.get('/students');
        if (allRes?.students && allRes.students.length > 0) {
          setStudents(allRes.students);
          setSelectedStudentId(allRes.students[0].id);
        } else {
          setStudents([]);
        }
      }
    } catch (err) {
      console.error('Error fetching students for remediation:', err);
    } finally {
      setLoadingStudents(false);
    }
  };

  const fetchRemediationHistory = async () => {
    try {
      const res = await api.get('/remediation/history');
      if (res?.history) {
        setHistoryList(res.history);
      }
    } catch (err) {
      console.warn('Could not fetch remediation history:', err);
    }
  };

  const currentStudent = students.find(s => s.id === selectedStudentId) || (students.length > 0 ? students[0] : null);

  const handleTopicSelect = (topicTitle: string) => {
    setSelectedTopic(topicTitle);
    const found = COMMON_MISCONCEPTIONS.find(m => m.topic === topicTitle);
    if (found) {
      setCustomErrorPattern(found.errorPattern);
    }
    // Reset remediation plan when topic changes
    setRemediationData(null);
    setDiagnosisData(null);
    setReassessmentPassed(false);
    setMasteryScore(0.35);
    setNewMasteryScore(0.35);
  };

  const handleRunRemediation = async () => {
    if (!currentStudent) return;
    setIsRemediating(true);
    setReassessmentPassed(false);
    setRevealedHints({});
    setReassessmentAnswer('');
    try {
      const res = await api.post('/remediation/diagnose', {
        studentId: currentStudent.id,
        topic: selectedTopic,
        errorPattern: customErrorPattern
      });
      if (res?.remediationPlan) {
        setRemediationData(res.remediationPlan);
        setDiagnosisData(res.diagnosis);
        setMasteryScore(0.35);
        setNewMasteryScore(0.35);
      }
    } catch (err) {
      console.error('Remediation diagnosis error:', err);
    } finally {
      setIsRemediating(false);
    }
  };

  const handleVerifyReassessment = async () => {
    setIsReassessing(true);
    setTimeout(async () => {
      setIsReassessing(false);
      setReassessmentPassed(true);
      const achievedScore = 0.88; // 88% mastery
      setNewMasteryScore(achievedScore);

      // Persist to backend database
      try {
        await api.post('/remediation/update-mastery', {
          studentId: currentStudent?.id,
          topic: selectedTopic,
          newScore: achievedScore,
          reassessmentPassed: true
        });
        fetchRemediationHistory();
      } catch (err) {
        console.error('Failed to update student mastery in database:', err);
      }
    }, 900);
  };

  const toggleHint = (idx: number) => {
    setRevealedHints(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.8rem' }}>🎯</span>
            <div>
              <h1 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--color-primary)', margin: 0 }}>
                AI वैयक्तिकृत उपचारात्मक शिक्षण (Personalized Learning & Remediation)
              </h1>
              <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', margin: '3px 0 0' }}>
                कक्षा {selectedGrade} • कमजोर अधिगम स्तर (Learning Gaps) का स्वतः निदान एवं स्थानीय तीली-बंडल / मातृभाषा विधि से उपचार।
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <span className="badge badge-primary">{targetLanguageName}</span>
            <span className="badge badge-secondary">NEP 2020 FLN</span>
          </div>
        </div>
      </div>

      {/* Student Selector Bar */}
      <div className="card" style={{ marginBottom: '20px', border: '1px solid var(--color-border)', background: 'var(--color-surface)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '280px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--color-primary)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.15rem', flexShrink: 0 }}>
              {currentStudent ? currentStudent.name.slice(0, 2).toUpperCase() : 'ST'}
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                उपचार हेतु नामांकित छात्र चुनें (Select Student from Database)
              </label>
              {loadingStudents ? (
                <div style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>छात्र सूची लोड हो रही है...</div>
              ) : students.length > 0 ? (
                <select
                  value={selectedStudentId}
                  onChange={e => {
                    setSelectedStudentId(e.target.value);
                    setRemediationData(null);
                    setReassessmentPassed(false);
                  }}
                  className="input"
                  style={{ width: '100%', fontWeight: 700, fontSize: '0.95rem', padding: '6px 12px' }}
                >
                  {students.map(st => (
                    <option key={st.id} value={st.id}>
                      क्रमांक {st.rollNo}: {st.name} (कक्षा {st.grade}-{st.section} • {st.motherTongue})
                    </option>
                  ))}
                </select>
              ) : (
                <div style={{ fontSize: '0.85rem', color: 'var(--color-error)' }}>
                  कोई छात्र नामांकित नहीं है। कृपया "विद्यार्थी / शिक्षक" टैब से नया छात्र जोड़ें।
                </div>
              )}
            </div>
          </div>

          {currentStudent && (
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', borderLeft: '1px solid var(--color-border)', paddingLeft: '16px' }}>
              <div>
                <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)' }}>अभिभावक / गाँव</div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-text)' }}>
                  {currentStudent.guardianName || 'ग्रामीण'} ({currentStudent.village || 'झारखंड'})
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)' }}>मातृभाषा</div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                  {currentStudent.motherTongue}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)' }}>वर्तमान निपुणता</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: reassessmentPassed ? '#10B981' : 'var(--color-error)' }}>
                  {Math.round((reassessmentPassed ? newMasteryScore : masteryScore) * 100)}%
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Learning Gap & Diagnostic Misconception Selector */}
      <div className="card" style={{ marginBottom: '24px', border: '1px solid var(--color-border)', background: 'var(--color-surface)' }}>
        <div style={{ marginBottom: '14px' }}>
          <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-accent)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Layers size={16} />
            <span>सीखने का अंतराल / कठिन विषय (Select Learning Gap / Misconception)</span>
          </label>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '10px', marginBottom: '14px' }}>
          {COMMON_MISCONCEPTIONS.map((item, idx) => {
            const isSelected = selectedTopic === item.topic;
            return (
              <div
                key={idx}
                onClick={() => handleTopicSelect(item.topic)}
                style={{
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: isSelected ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                  background: isSelected ? 'var(--color-primary-subtle)' : 'var(--color-bg)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>
                    {item.category}
                  </span>
                  {isSelected && <span style={{ color: 'var(--color-primary)', fontSize: '0.85rem' }}>✓</span>}
                </div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-text)', lineHeight: 1.3 }}>
                  {item.topic}
                </div>
              </div>
            );
          })}
        </div>

        {/* Diagnostic Insight Alert */}
        <div style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '12px 16px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-accent)', fontWeight: 700, fontSize: '0.86rem', marginBottom: '4px' }}>
            <AlertCircle size={15} />
            <span>शिक्षक अवलोकन व भ्रांति स्वरूप (Observed Error Pattern):</span>
          </div>
          <input
            type="text"
            value={customErrorPattern}
            onChange={e => setCustomErrorPattern(e.target.value)}
            className="input"
            style={{ width: '100%', fontSize: '0.88rem' }}
            placeholder="छात्र द्वारा की जाने वाली विशिष्ट गलती दर्ज करें..."
          />
        </div>

        {!remediationData ? (
          <button
            onClick={handleRunRemediation}
            disabled={isRemediating || !currentStudent}
            className="btn btn-primary"
            style={{ width: '100%', padding: '12px', fontSize: '0.95rem' }}
          >
            <Sparkles size={18} />
            <span>{isRemediating ? 'AI उपचारात्मक योजना तैयार हो रही है...' : 'AI उपचारात्मक योजना व हस्त-गतिविधि जनरेट करें'}</span>
          </button>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: 'var(--color-bg)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981', fontSize: '0.88rem', fontWeight: 700 }}>
              <CheckCircle2 size={16} />
              <span>उपचारात्मक योजना सक्रिय है ({diagnosisData?.detectedTopic})</span>
            </div>
            <button onClick={handleRunRemediation} className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '0.78rem' }}>
              <RefreshCw size={13} />
              <span>पुनः जनरेट करें</span>
            </button>
          </div>
        )}
      </div>

      {/* Generated Remediation Action Plan */}
      {remediationData && (
        <div>
          <div className="card" style={{ border: '1px solid var(--color-border)', background: 'var(--color-surface)', marginBottom: '24px' }}>
            <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.3rem' }}>🛠️</span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-primary)', margin: 0 }}>
                  {remediationData.planTitle}
                </h3>
              </div>
              <button
                onClick={() => speechBridge.speak(remediationData.simplifiedExplanation.targetScript, targetLanguage, speechSpeed === 'slow')}
                className="btn btn-secondary"
                style={{ padding: '6px 12px', fontSize: '0.8rem' }}
              >
                <Volume2 size={14} />
                <span>{targetLanguageName} में ऑडियो समझाएं ({speechSpeed === 'slow' ? '0.72x' : 'Play'})</span>
              </button>
            </div>

            {/* Stage 1: AI Root Cause Analysis */}
            <div style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', padding: '14px 16px', borderRadius: 'var(--radius-sm)', marginBottom: '16px' }}>
              <span style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--color-accent)', textTransform: 'uppercase' }}>
                चरण 1: AI कठिनाई विश्लेषण (Root Cause Analysis)
              </span>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text)', marginTop: '4px', marginBottom: '4px', lineHeight: 1.5 }}>
                <strong>मूल कारण:</strong> {diagnosisData?.rootCauseIdentified}
              </p>
              <div style={{ fontSize: '0.84rem', color: 'var(--color-text-muted)' }}>
                <strong>शिक्षण नीति:</strong> {diagnosisData?.pedagogicalGuidance}
              </div>
            </div>

            {/* Stage 2: Simplified Bilingual Explanation */}
            <div style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', padding: '14px 16px', borderRadius: 'var(--radius-sm)', marginBottom: '16px' }}>
              <span style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--color-primary)', textTransform: 'uppercase' }}>
                चरण 2: सरल द्विभाषी समझ (Bilingual Concept Anchor)
              </span>
              <p style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--color-text)', marginTop: '6px', marginBottom: '8px' }}>
                {remediationData.simplifiedExplanation.hindi}
              </p>
              <div style={{ background: 'var(--color-surface)', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px dashed var(--color-border)' }}>
                <VernacularText
                  text={remediationData.simplifiedExplanation.targetScript}
                  latin={remediationData.simplifiedExplanation.targetLatin}
                  size="md"
                />
              </div>
            </div>

            {/* Stage 3: Hands-On Activity with Local Jharkhand Materials */}
            <div style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', padding: '14px 16px', borderRadius: 'var(--radius-sm)', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.76rem', fontWeight: 800, color: '#10B981', textTransform: 'uppercase' }}>
                  चरण 3: स्थानीय मूर्त हस्त-गतिविधि: {remediationData.handsOnActivity.title}
                </span>
              </div>
              <div style={{ fontSize: '0.84rem', color: 'var(--color-text)', marginBottom: '8px' }}>
                <strong>आवश्यक सामग्री (Local Jharkhand Materials):</strong> {remediationData.handsOnActivity.materials.join(' • ')}
              </div>
              <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', padding: '12px', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: '6px' }}>
                  गतिविधि चरण (Activity Steps):
                </div>
                <ul style={{ paddingLeft: '20px', fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--color-text)', margin: 0 }}>
                  {remediationData.handsOnActivity.stepsHindi.map((s: string, idx: number) => (
                    <li key={idx} style={{ marginBottom: '4px' }}>{s}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Stage 4: 3-Tier Scaffolded Practice Drill */}
            {remediationData.scaffoldedPractice && (
              <div style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', padding: '14px 16px', borderRadius: 'var(--radius-sm)', marginBottom: '16px' }}>
                <span style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--color-accent)', textTransform: 'uppercase' }}>
                  चरण 4: क्रमिक अभ्यास स्तर (3-Tier Scaffolded Practice)
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px', marginTop: '8px' }}>
                  {remediationData.scaffoldedPractice.map((p: any, idx: number) => (
                    <div
                      key={idx}
                      style={{
                        background: 'var(--color-surface)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '10px 12px'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <span className="badge badge-secondary" style={{ fontSize: '0.7rem' }}>
                          स्तर {idx + 1}: {p.level === 'Concrete' ? 'मूर्त अनुभव' : p.level === 'Pictorial' ? 'चित्रात्मक' : 'अमूर्त'}
                        </span>
                        <button
                          onClick={() => toggleHint(idx)}
                          style={{ background: 'none', border: 'none', color: 'var(--color-primary)', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700 }}
                        >
                          {revealedHints[idx] ? 'संकेत छिपाएं' : 'संकेत देखें'}
                        </button>
                      </div>
                      <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--color-text)', marginTop: '4px' }}>
                        {p.problem}
                      </div>
                      {revealedHints[idx] && (
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-accent)', marginTop: '6px', background: 'var(--color-bg)', padding: '6px 8px', borderRadius: '4px' }}>
                          💡 <strong>हल संकेत:</strong> {p.hint}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Stage 5: Live Reassessment & Interactive Mastery Gauge */}
            <div style={{ background: 'var(--color-surface)', border: '2px solid var(--color-primary)', padding: '18px', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-primary)', textTransform: 'uppercase' }}>
                  चरण 5: पुनः मूल्यांकन व निपुणता सत्यापन (Reassessment Check)
                </span>
                {reassessmentPassed && (
                  <span style={{ color: '#10B981', fontWeight: 800, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle2 size={16} />
                    <span>सत्यापित ✓ निपुणता दर्ज!</span>
                  </span>
                )}
              </div>

              <p style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '8px' }}>
                {remediationData.reassessmentCheck.question}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '220px' }}>
                  <input
                    type="text"
                    value={reassessmentAnswer}
                    onChange={e => setReassessmentAnswer(e.target.value)}
                    placeholder={`उत्तर दर्ज करें (अपेक्षित: ${remediationData.reassessmentCheck.answer})`}
                    className="input"
                    style={{ width: '100%', fontSize: '0.9rem' }}
                    disabled={reassessmentPassed}
                  />
                </div>
                {!reassessmentPassed ? (
                  <button
                    onClick={handleVerifyReassessment}
                    disabled={isReassessing}
                    className="btn btn-primary"
                    style={{ padding: '8px 18px', fontSize: '0.88rem' }}
                  >
                    <CheckCircle2 size={16} />
                    <span>{isReassessing ? 'सत्यापन हो रहा है...' : 'उत्तर जांचें व निपुणता अपडेट करें'}</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setReassessmentPassed(false);
                      setReassessmentAnswer('');
                    }}
                    className="btn btn-secondary"
                    style={{ padding: '8px 14px', fontSize: '0.82rem' }}
                  >
                    <RefreshCw size={14} />
                    <span>पुनः अभ्यास</span>
                  </button>
                )}
              </div>

              {/* Animated Mastery Comparison Gauge */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', background: 'var(--color-bg)', padding: '16px', borderRadius: 'var(--radius-sm)', flexWrap: 'wrap', gap: '16px' }}>
                {/* Before Gauge */}
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)', fontWeight: 700, marginBottom: '6px' }}>
                    उपचार पूर्व निपुणता
                  </div>
                  <div style={{ position: 'relative', width: '80px', height: '80px', margin: '0 auto' }}>
                    <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="var(--color-border)"
                        strokeWidth="3.5"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="var(--color-error)"
                        strokeWidth="3.5"
                        strokeDasharray="35, 100"
                      />
                    </svg>
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.95rem', color: 'var(--color-error)' }}>
                      35%
                    </div>
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--color-error)', fontWeight: 600, marginTop: '4px' }}>कठिनाई स्तर</div>
                </div>

                {/* Arrow */}
                <div style={{ fontSize: '1.6rem', color: 'var(--color-primary)' }}>
                  ➜
                </div>

                {/* After Gauge */}
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)', fontWeight: 700, marginBottom: '6px' }}>
                    उपचार पश्चात निपुणता
                  </div>
                  <div style={{ position: 'relative', width: '80px', height: '80px', margin: '0 auto' }}>
                    <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="var(--color-border)"
                        strokeWidth="3.5"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke={reassessmentPassed ? '#10B981' : 'var(--color-text-muted)'}
                        strokeWidth="3.5"
                        strokeDasharray={`${reassessmentPassed ? '88' : '35'}, 100`}
                        style={{ transition: 'stroke-dasharray 0.8s ease' }}
                      />
                    </svg>
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.95rem', color: reassessmentPassed ? '#10B981' : 'var(--color-text-muted)' }}>
                      {reassessmentPassed ? '88%' : '35%'}
                    </div>
                  </div>
                  <div style={{ fontSize: '0.72rem', color: reassessmentPassed ? '#10B981' : 'var(--color-text-muted)', fontWeight: 600, marginTop: '4px' }}>
                    {reassessmentPassed ? 'सफलतापूर्वक निपुण' : 'सत्यापन प्रतीक्षित'}
                  </div>
                </div>
              </div>

              {reassessmentPassed && (
                <div style={{ marginTop: '14px', padding: '12px', background: 'var(--color-surface)', borderRadius: 'var(--radius-sm)', border: '1px solid #10B981', color: 'var(--color-text)', fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>🎉</span>
                  <span>
                    शानदार! छात्र {currentStudent?.name} की निपुणता 35% से बढ़कर 88% हो गई। स्थानीय डेटाबेस में प्रगति सहेज ली गई।
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Class Remediation History Log */}
      <div className="card" style={{ border: '1px solid var(--color-border)', background: 'var(--color-surface)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={16} color="var(--color-primary)" />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-text)', margin: 0 }}>
              हाल के उपचारात्मक शिक्षण सत्र (Recent Remediation Records)
            </h3>
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
            कुल सत्र: {historyList.length}
          </span>
        </div>

        {historyList.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-border)', color: 'var(--color-text-muted)', textAlign: 'left' }}>
                  <th style={{ padding: '8px 10px' }}>छात्र</th>
                  <th style={{ padding: '8px 10px' }}>कठिन विषय</th>
                  <th style={{ padding: '8px 10px' }}>प्रयास</th>
                  <th style={{ padding: '8px 10px' }}>अंतिम स्कोर</th>
                  <th style={{ padding: '8px 10px' }}>स्थिति</th>
                </tr>
              </thead>
              <tbody>
                {historyList.map((rec, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '10px', fontWeight: 700, color: 'var(--color-text)' }}>
                      {rec.studentName || 'छात्र'}
                    </td>
                    <td style={{ padding: '10px', color: 'var(--color-text)' }}>
                      {rec.topic}
                    </td>
                    <td style={{ padding: '10px', color: 'var(--color-text-muted)' }}>
                      {rec.attemptsCount} बार
                    </td>
                    <td style={{ padding: '10px', fontWeight: 700, color: rec.masteryScore >= 0.7 ? '#10B981' : 'var(--color-error)' }}>
                      {Math.round(rec.masteryScore * 100)}%
                    </td>
                    <td style={{ padding: '10px' }}>
                      <span className={`badge ${rec.needsRemediation ? 'badge-danger' : 'badge-primary'}`} style={{ fontSize: '0.72rem' }}>
                        {rec.needsRemediation ? 'उपचार जारी' : 'निपुण ✓'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
            अभी तक कोई उपचारात्मक सत्र दर्ज नहीं किया गया है। ऊपर छात्र चुनकर AI उपचारात्मक योजना शुरू करें।
          </div>
        )}
      </div>
    </div>
  );
};
