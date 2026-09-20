import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../core/context/AppContext';
import { api } from '../../core/api/client';
import { speechBridge } from '../../core/speech/speechBridge';
import { VernacularText } from '../../components/OlChikiText';
import {
  getAvailableSubjectsForGrade,
  getTopicsForGradeAndSubject,
  getDefaultTopicForGradeAndSubject
} from '../../core/curriculum/curriculumData';
import {
  Sparkles,
  Volume2,
  VolumeX,
  Printer,
  CheckCircle,
  RefreshCw,
  BookOpen,
  Layers,
  Target,
  HelpCircle,
  Clock,
  Play,
  Pause,
  RotateCcw,
  Network,
  FlaskConical,
  BarChart2,
  ListOrdered,
  FileEdit,
  Sliders,
  CheckCircle2,
  TrendingUp,
  Layout,
  Award,
  FileText,
  Check,
  ChevronRight
} from 'lucide-react';

export const SmartTeachView: React.FC = () => {
  const {
    targetLanguage,
    targetLanguageName,
    targetScript,
    selectedGrade,
    setSelectedGrade,
    selectedSubject,
    setSelectedSubject,
    availableSubjects,
    speechSpeed
  } = useApp();

  const [topic, setTopic] = useState<string>(() => getDefaultTopicForGradeAndSubject(selectedGrade, selectedSubject));
  const [contextType, setContextType] = useState<string>('VILLAGE');
  const [duration, setDuration] = useState<number>(40);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lessonPack, setLessonPack] = useState<any | null>(null);

  // Consolidated 5 intuitive pedagogical workspaces
  const [activeWorkspace, setActiveWorkspace] = useState<'plan' | 'activity' | 'worksheet' | 'quiz' | 'blackboard'>('plan');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [speakingField, setSpeakingField] = useState<string | null>(null);

  // 40-Minute Lesson Pace Timer State
  const [timerSeconds, setTimerSeconds] = useState<number>(40 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [activeStage, setActiveStage] = useState<number>(1);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Interactive Village Experiment Simulator State
  const [simCutFraction, setSimCutFraction] = useState<number>(2); // 2, 3, 4, 8
  const [simLeafStage, setSimLeafStage] = useState<number>(1);

  // Live Quick Poll / Quiz State
  const [pollResponses, setPollResponses] = useState<{ [qIdx: number]: number | null }>({});

  // Teacher Diary & Reflection State
  const [reflectionNotes, setReflectionNotes] = useState<string>(() => {
    return localStorage.getItem(`palash_reflection_${selectedGrade}_${selectedSubject}`) || '';
  });
  const [reflectionSaved, setReflectionSaved] = useState<boolean>(false);

  // Available topics for currently selected grade & subject
  const topicsList = getTopicsForGradeAndSubject(selectedGrade, selectedSubject);

  const handleGradeChange = (newGrade: number) => {
    setSelectedGrade(newGrade);
    const validSubjects = getAvailableSubjectsForGrade(newGrade);
    const newSubject = validSubjects.some(s => s.id === selectedSubject)
      ? selectedSubject
      : validSubjects[0].id;
    const defaultT = getDefaultTopicForGradeAndSubject(newGrade, newSubject);
    setTopic(defaultT);
  };

  const handleSubjectChange = (newSubject: string) => {
    setSelectedSubject(newSubject);
    const defaultT = getDefaultTopicForGradeAndSubject(selectedGrade, newSubject);
    setTopic(defaultT);
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const res = await api.post('/pedagogy/smart-teach', {
        grade: selectedGrade,
        subject: selectedSubject,
        topic,
        localContext: contextType,
        targetLanguage,
        durationMinutes: duration
      });
      if (res?.lessonPack) {
        setLessonPack(res.lessonPack);
      }
    } catch (err) {
      console.error('Smart teach generation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Re-generate lesson pack when targetLanguage changes
  useEffect(() => {
    handleGenerate();
  }, [targetLanguage, selectedGrade, selectedSubject, topic]);

  // Audio Playback with field tracking
  const handlePlayAudio = async (text: string, fieldKey: string) => {
    if (isPlayingAudio && speakingField === fieldKey) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlayingAudio(false);
      setSpeakingField(null);
      return;
    }

    setIsPlayingAudio(true);
    setSpeakingField(fieldKey);
    await speechBridge.speak(text, targetLanguage, speechSpeed === 'slow');
    setIsPlayingAudio(false);
    setSpeakingField(null);
  };

  // Timer Tick Logic
  useEffect(() => {
    if (isTimerRunning) {
      timerIntervalRef.current = setInterval(() => {
        setTimerSeconds(prev => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            return 0;
          }
          const elapsed = 40 * 60 - prev;
          if (elapsed < 5 * 60) setActiveStage(1);
          else if (elapsed < 20 * 60) setActiveStage(2);
          else if (elapsed < 30 * 60) setActiveStage(3);
          else if (elapsed < 35 * 60) setActiveStage(4);
          else setActiveStage(5);
          return prev - 1;
        });
      }, 1000);
    } else if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isTimerRunning]);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleSaveReflection = () => {
    localStorage.setItem(`palash_reflection_${selectedGrade}_${selectedSubject}`, reflectionNotes);
    setReflectionSaved(true);
    setTimeout(() => setReflectionSaved(false), 2500);
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', paddingBottom: '60px' }}>
      {/* Header Banner */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.8rem', background: '#e0e7ff', padding: '6px 10px', borderRadius: '10px' }}>✨</span>
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-primary)', margin: 0 }}>
                स्मार्ट टीच (Smart Teach) - प्राथमिक द्विभाषी शिक्षण सारथी
              </h1>
              <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', margin: '4px 0 0 0' }}>
                झारखंड JCERT पाठ्यक्रम • कक्षा 1 से 5 • 7 क्षेत्रीय व जनजातीय भाषाएं • सचित्र पाठ, ऑडियो व श्यामपट्ट योजना
              </p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--color-surface)', padding: '6px 14px', borderRadius: '24px', border: '1px solid var(--color-border)' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>सक्रिय शिक्षण भाषा:</span>
          <strong style={{ fontSize: '0.86rem', color: 'var(--color-primary)' }}>{targetLanguageName} ({targetScript})</strong>
        </div>
      </div>

      {/* Curriculum Filter Control Bar */}
      <div className="card" style={{ marginBottom: '20px', padding: '16px 20px', background: 'var(--color-surface)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '14px', alignItems: 'flex-end' }}>
          {/* Grade Selector */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" style={{ fontSize: '0.78rem', fontWeight: 700 }}>कक्षा (Grade)</label>
            <select
              className="form-select"
              value={selectedGrade}
              onChange={e => handleGradeChange(parseInt(e.target.value, 10))}
            >
              {[1, 2, 3, 4, 5].map(g => (
                <option key={g} value={g}>कक्षा {g} (प्राथमिक)</option>
              ))}
            </select>
          </div>

          {/* Subject Selector */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" style={{ fontSize: '0.78rem', fontWeight: 700 }}>विषय (JCERT Subject)</label>
            <select
              className="form-select"
              value={selectedSubject}
              onChange={e => handleSubjectChange(e.target.value)}
            >
              {availableSubjects.map(sub => (
                <option key={sub.id} value={sub.id}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>

          {/* Topic Selector */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" style={{ fontSize: '0.78rem', fontWeight: 700 }}>पाठ का शीर्षक (Topic)</label>
            <select
              className="form-select"
              value={topic}
              onChange={e => setTopic(e.target.value)}
            >
              {topicsList.map((t, idx) => (
                <option key={idx} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Local Context */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" style={{ fontSize: '0.78rem', fontWeight: 700 }}>स्थानीय परिवेश (Context)</label>
            <select className="form-select" value={contextType} onChange={e => setContextType(e.target.value)}>
              <option value="VILLAGE">गाँव व समुदाय (Village)</option>
              <option value="AGRICULTURE">कृषि व खेत (Farming)</option>
              <option value="FOREST">जंगल व प्रकृति (Forest)</option>
              <option value="SCHOOL">कक्षा व खेल (Classroom)</option>
            </select>
          </div>

          {/* Action Trigger */}
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="btn btn-primary"
            style={{ height: '42px', padding: '0 20px', whiteSpace: 'nowrap', fontWeight: 700 }}
          >
            <Sparkles size={16} />
            <span>{isLoading ? 'जनरेट हो रहा है...' : 'पाठ तैयार करें'}</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {lessonPack ? (
        <div className="card" style={{ padding: '0', overflow: 'hidden', background: 'var(--color-surface)' }}>
          {/* Consolidated 5 Clean Pedagogical Tabs */}
          <div
            style={{
              display: 'flex',
              borderBottom: '2px solid var(--color-border)',
              background: 'var(--color-background)',
              padding: '6px 12px 0 12px',
              gap: '6px',
              overflowX: 'auto',
              scrollbarWidth: 'none'
            }}
          >
            {[
              { id: 'plan', label: '📖 पाठ योजना व व्याख्या', desc: 'उद्देश्य, परिवेशी हुक व द्विभाषी व्याख्या' },
              { id: 'activity', label: '🧪 गतिविधि, सिमुलेटर व समय', desc: 'प्रयोग सिमुलेटर व 40m पेस टाइमर' },
              { id: 'worksheet', label: '📝 कार्यपत्रक व शब्दावली', desc: 'प्रिंट कार्यपत्रक व ऑडियो फ़्लैशकार्ड' },
              { id: 'quiz', label: '🏆 त्वरित क्विज़ व समझ', desc: 'अभ्यास प्रश्न व लाइव कक्षा पोल' },
              { id: 'blackboard', label: '📓 शिक्षक डायरी व श्यामपट्ट', desc: '3-कॉलम बोर्ड प्लान व डायरी' }
            ].map(tab => {
              const isActive = activeWorkspace === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveWorkspace(tab.id as any)}
                  style={{
                    padding: '12px 18px',
                    border: 'none',
                    borderBottom: isActive ? '3px solid var(--color-primary)' : '3px solid transparent',
                    background: isActive ? 'var(--color-surface)' : 'transparent',
                    color: isActive ? 'var(--color-primary)' : 'var(--color-text-muted)',
                    fontWeight: isActive ? 800 : 600,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    borderRadius: '8px 8px 0 0',
                    transition: 'all 0.15s',
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '2px'
                  }}
                >
                  <span>{tab.label}</span>
                  <span style={{ fontSize: '0.7rem', opacity: isActive ? 0.9 : 0.6, fontWeight: 400 }}>
                    {tab.desc}
                  </span>
                </button>
              );
            })}
          </div>

          <div style={{ padding: '22px' }}>
            {/* ==================== WORKSPACE 1: PLAN & EXPLANATION ==================== */}
            {activeWorkspace === 'plan' && (
              <div>
                {/* Learning Objective & Prerequisites Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px', marginBottom: '20px' }}>
                  {/* Objective Card */}
                  <div style={{ background: 'var(--color-primary-subtle)', padding: '16px 18px', borderRadius: '12px', border: '1px solid var(--color-primary)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <h3 style={{ fontSize: '0.96rem', fontWeight: 800, color: 'var(--color-primary)', margin: 0 }}>
                        सीखने का मुख्य उद्देश्य (Learning Objective)
                      </h3>
                      <button
                        onClick={() => handlePlayAudio(lessonPack.learningObjective.targetLang, 'obj')}
                        className="btn btn-secondary"
                        style={{ padding: '4px 10px', fontSize: '0.76rem' }}
                      >
                        {isPlayingAudio && speakingField === 'obj' ? <VolumeX size={13} /> : <Volume2 size={13} />}
                        <span style={{ marginLeft: '4px' }}>सुनें</span>
                      </button>
                    </div>
                    <p style={{ fontSize: '0.94rem', fontWeight: 600, color: 'var(--color-text)', marginBottom: '8px', lineHeight: 1.5 }}>
                      {lessonPack.learningObjective.hindi}
                    </p>
                    <div style={{ borderTop: '1px dashed rgba(0,0,0,0.1)', paddingTop: '8px', color: 'var(--color-primary)' }}>
                      <VernacularText text={lessonPack.learningObjective.targetLang} size="md" />
                    </div>
                  </div>

                  {/* Prerequisites Card */}
                  <div style={{ background: 'var(--color-accent-subtle)', padding: '16px 18px', borderRadius: '12px', border: '1px solid var(--color-accent)' }}>
                    <h3 style={{ fontSize: '0.96rem', fontWeight: 800, color: 'var(--color-accent)', marginBottom: '8px' }}>
                      पूर्व-ज्ञान एवं तैयारी (Prerequisites)
                    </h3>
                    <ul style={{ paddingLeft: '20px', fontSize: '0.88rem', color: 'var(--color-text)', margin: 0, lineHeight: 1.6 }}>
                      {(lessonPack.prerequisites || []).map((p: string, idx: number) => (
                        <li key={idx}>{p}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Local Village Hook Card */}
                {lessonPack.localExample && (
                  <div style={{ marginBottom: '20px', padding: '16px 18px', background: 'var(--color-background)', border: '1px solid var(--color-border)', borderRadius: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                      <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--color-secondary)', margin: 0 }}>
                        🌾 स्थानीय परिवेश आधारित उदाहरण ({lessonPack.localExample.contextType})
                      </h3>
                      <button
                        onClick={() => handlePlayAudio(lessonPack.localExample.descriptionTargetLang, 'local_ex')}
                        className="btn btn-secondary"
                        style={{ padding: '4px 10px', fontSize: '0.76rem' }}
                      >
                        {isPlayingAudio && speakingField === 'local_ex' ? <VolumeX size={13} /> : <Volume2 size={13} />}
                        <span style={{ marginLeft: '4px' }}>सुनें</span>
                      </button>
                    </div>
                    <p style={{ fontSize: '0.92rem', color: 'var(--color-text)', marginBottom: '8px', lineHeight: 1.5 }}>
                      {lessonPack.localExample.descriptionHindi}
                    </p>
                    <div style={{ background: 'var(--color-surface)', padding: '10px 14px', borderRadius: '8px', border: '1px dashed var(--color-border)' }}>
                      <VernacularText text={lessonPack.localExample.descriptionTargetLang} size="md" />
                    </div>
                  </div>
                )}

                {/* Teacher Bilingual Explanation in 2 Tiers */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-primary)', margin: 0 }}>
                      कक्षा में शिक्षक की व्याख्या (Bilingual Teacher Explanation)
                    </h3>
                    <button
                      onClick={() => handlePlayAudio(lessonPack.teacherExplanation.targetLangScript, 'teacher_expl')}
                      className="btn btn-primary"
                      style={{ padding: '6px 14px', fontSize: '0.84rem', fontWeight: 700 }}
                    >
                      {isPlayingAudio && speakingField === 'teacher_expl' ? <VolumeX size={15} /> : <Volume2 size={15} />}
                      <span style={{ marginLeft: '6px' }}>{targetLanguageName} में पूरा पाठ सुनें</span>
                    </button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
                    {/* Hindi Explanation */}
                    <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', padding: '16px', borderRadius: '12px' }}>
                      <span style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                        हिन्दी शिक्षण व्याख्या (Hindi Explanation)
                      </span>
                      <p style={{ fontSize: '0.92rem', lineHeight: 1.6, color: 'var(--color-text)', marginTop: '8px' }}>
                        {lessonPack.teacherExplanation.originalHindi || lessonPack.teacherExplanation.hindi}
                      </p>
                      {lessonPack.teacherExplanation.simplerHindi && (
                        <div style={{ marginTop: '10px', background: 'var(--color-background)', padding: '8px 12px', borderRadius: '8px', fontSize: '0.85rem' }}>
                          <strong>सरल रूप: </strong> {lessonPack.teacherExplanation.simplerHindi}
                        </div>
                      )}
                    </div>

                    {/* Vernacular Explanation */}
                    <div style={{ background: 'var(--color-surface)', border: '2px solid var(--color-primary-subtle)', padding: '16px', borderRadius: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--color-primary)', textTransform: 'uppercase' }}>
                          {targetLanguageName} ({targetScript} Script)
                        </span>
                        <button
                          onClick={() => handlePlayAudio(lessonPack.teacherExplanation.targetLangScript, 'teacher_expl_card')}
                          className="btn btn-secondary"
                          style={{ padding: '3px 8px', fontSize: '0.74rem' }}
                        >
                          <Volume2 size={13} />
                        </button>
                      </div>
                      <VernacularText
                        text={lessonPack.teacherExplanation.targetLangScript}
                        latin={lessonPack.teacherExplanation.targetLangLatin}
                        size="lg"
                      />
                    </div>
                  </div>
                </div>

                {/* Concept Mind Map */}
                <div style={{ marginTop: '20px', background: 'var(--color-background)', borderRadius: '12px', padding: '18px', border: '1px solid var(--color-border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--color-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Network size={16} />
                      <span>अवधारणा माइंड मैप (Concept Relationship Flow)</span>
                    </h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                      मातृभाषा और राज्य पाठ्यक्रम का वैचारिक संबंध
                    </span>
                  </div>

                  <svg width="100%" height="160" viewBox="0 0 680 160" style={{ margin: '0 auto', display: 'block' }}>
                    <line x1="340" y1="35" x2="160" y2="105" stroke="var(--color-primary)" strokeWidth="2" strokeDasharray="4 4" />
                    <line x1="340" y1="35" x2="340" y2="105" stroke="var(--color-primary)" strokeWidth="2" strokeDasharray="4 4" />
                    <line x1="340" y1="35" x2="520" y2="105" stroke="var(--color-primary)" strokeWidth="2" strokeDasharray="4 4" />

                    <rect x="230" y="10" width="220" height="46" rx="8" fill="var(--color-primary)" />
                    <text x="340" y="32" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle">{topic}</text>
                    <text x="340" y="48" fill="rgba(255,255,255,0.85)" fontSize="9" textAnchor="middle">कक्षा {selectedGrade} • {selectedSubject}</text>

                    <rect x="70" y="95" width="180" height="50" rx="6" fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="1.5" />
                    <text x="160" y="116" fill="var(--color-text)" fontSize="10" fontWeight="bold" textAnchor="middle">१. बुनियादी पूर्वज्ञान</text>
                    <text x="160" y="132" fill="var(--color-primary)" fontSize="8.5" textAnchor="middle">मातृभाषा शब्दावली</text>

                    <rect x="250" y="95" width="180" height="50" rx="6" fill="var(--color-surface)" stroke="var(--color-primary)" strokeWidth="1.5" />
                    <text x="340" y="116" fill="var(--color-primary)" fontSize="10" fontWeight="bold" textAnchor="middle">२. स्थानीय गाँव संदर्भ</text>
                    <text x="340" y="132" fill="#10B981" fontSize="8.5" textAnchor="middle">प्रत्यक्ष अनुभव से जुड़ाव</text>

                    <rect x="430" y="95" width="180" height="50" rx="6" fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="1.5" />
                    <text x="520" y="116" fill="var(--color-text)" fontSize="10" fontWeight="bold" textAnchor="middle">३. व्यवहारिक प्रयोग</text>
                    <text x="520" y="132" fill="#F59E0B" fontSize="8.5" textAnchor="middle">FLN दक्षता अर्जन</text>
                  </svg>
                </div>
              </div>
            )}

            {/* ==================== WORKSPACE 2: ACTIVITIES & SIMULATOR ==================== */}
            {activeWorkspace === 'activity' && (
              <div>
                {/* Classroom Hands-On Activity Card */}
                {lessonPack.classroomActivity && (
                  <div className="card" style={{ padding: '18px', background: 'var(--color-surface)', border: '1px solid var(--color-border)', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Target size={18} color="var(--color-accent)" />
                        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-text)', margin: 0 }}>
                          कक्षा में करके सीखने वाली गतिविधि (Hands-on Activity)
                        </h3>
                      </div>
                      <button
                        onClick={() => handlePlayAudio(lessonPack.classroomActivity.instructionsTargetLang || lessonPack.classroomActivity.instructionsHindi, 'act')}
                        className="btn btn-secondary"
                        style={{ padding: '4px 10px', fontSize: '0.76rem' }}
                      >
                        {isPlayingAudio && speakingField === 'act' ? <VolumeX size={13} /> : <Volume2 size={13} />}
                        <span style={{ marginLeft: '4px' }}>निर्देश सुनें</span>
                      </button>
                    </div>

                    <div style={{ fontSize: '0.94rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '8px' }}>
                      शीर्षक: {lessonPack.classroomActivity.title}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px', marginBottom: '12px' }}>
                      <div style={{ background: 'var(--color-background)', padding: '12px', borderRadius: '8px' }}>
                        <strong style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>हिन्दी में निर्देश:</strong>
                        <p style={{ fontSize: '0.88rem', margin: '4px 0 0 0', lineHeight: 1.5 }}>
                          {lessonPack.classroomActivity.instructionsHindi}
                        </p>
                      </div>

                      <div style={{ background: 'var(--color-background)', padding: '12px', borderRadius: '8px' }}>
                        <strong style={{ fontSize: '0.78rem', color: 'var(--color-primary)' }}>{targetLanguageName} निर्देश:</strong>
                        <div style={{ marginTop: '4px' }}>
                          <VernacularText text={lessonPack.classroomActivity.instructionsTargetLang} size="md" />
                        </div>
                      </div>
                    </div>

                    {lessonPack.classroomActivity.materialsNeeded && (
                      <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                        <strong>आवश्यक स्थानीय सामग्री:</strong> {lessonPack.classroomActivity.materialsNeeded.join(', ')}
                      </div>
                    )}
                  </div>
                )}

                {/* Village Experiment Simulator & Pace Timer Side-by-Side */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                  {/* Village Simulator */}
                  <div className="card" style={{ padding: '18px', background: 'var(--color-surface)', border: '1px solid var(--color-border)', textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <FlaskConical size={18} color="var(--color-primary)" />
                        <h4 style={{ fontSize: '0.96rem', fontWeight: 800, margin: 0 }}>
                          गाँव प्रयोग सिमुलेटर (Interactive Simulator)
                        </h4>
                      </div>
                      <span className="badge badge-accent">डिजिटल लैब</span>
                    </div>

                    {selectedSubject.toLowerCase().includes('math') || topic.includes('भिन्न') || topic.includes('गिनती') ? (
                      <div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '10px' }}>
                          महुआ केक / रोटी को बराबर हिस्सों में काटें:
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '14px' }}>
                          {[2, 3, 4, 8].map(parts => (
                            <button
                              key={parts}
                              onClick={() => setSimCutFraction(parts)}
                              className={`btn ${simCutFraction === parts ? 'btn-primary' : 'btn-secondary'}`}
                              style={{ padding: '4px 10px', fontSize: '0.78rem' }}
                            >
                              1/{parts} भाग
                            </button>
                          ))}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
                          <svg width="170" height="170" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="44" fill="#F59E0B" opacity="0.25" stroke="#D97706" strokeWidth="3" />
                            {Array.from({ length: simCutFraction }).map((_, idx) => {
                              const angle = (idx * 360) / simCutFraction;
                              const rad = (angle * Math.PI) / 180;
                              const x2 = 50 + 44 * Math.cos(rad);
                              const y2 = 50 + 44 * Math.sin(rad);
                              return (
                                <line key={idx} x1="50" y1="50" x2={x2} y2={y2} stroke="#78350F" strokeWidth="2.5" />
                              );
                            })}
                            <circle cx="50" cy="50" r="5" fill="#78350F" />
                          </svg>
                        </div>

                        <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                          प्रत्येक हिस्सा = 1/{simCutFraction}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                          {simCutFraction === 2 ? 'संथाली: ᱛᱟᱞᱟ (Tala) • हो: ᱛᱟᱞᱟ' : `समान ${simCutFraction} बराबर भाग`}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '10px' }}>
                          साल / महुआ के पत्ते में शिरा विन्यास व भोजन निर्माण:
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '12px' }}>
                          <button onClick={() => setSimLeafStage(1)} className={`btn ${simLeafStage === 1 ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '4px 8px', fontSize: '0.74rem' }}>
                            १. धूप
                          </button>
                          <button onClick={() => setSimLeafStage(2)} className={`btn ${simLeafStage === 2 ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '4px 8px', fontSize: '0.74rem' }}>
                            २. जल
                          </button>
                          <button onClick={() => setSimLeafStage(3)} className={`btn ${simLeafStage === 3 ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '4px 8px', fontSize: '0.74rem' }}>
                            ३. भोजन
                          </button>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center', margin: '12px 0' }}>
                          <svg width="160" height="160" viewBox="0 0 100 100">
                            <path d="M 50 10 C 80 40 80 70 50 90 C 20 70 20 40 50 10 Z" fill={simLeafStage === 3 ? '#10B981' : '#34D399'} stroke="#047857" strokeWidth="2.5" />
                            <line x1="50" y1="10" x2="50" y2="90" stroke="#065F46" strokeWidth="2" />
                            <line x1="50" y1="30" x2="65" y2="25" stroke="#065F46" strokeWidth="1.5" />
                            <line x1="50" y1="30" x2="35" y2="25" stroke="#065F46" strokeWidth="1.5" />
                            <line x1="50" y1="50" x2="70" y2="45" stroke="#065F46" strokeWidth="1.5" />
                            <line x1="50" y1="50" x2="30" y2="45" stroke="#065F46" strokeWidth="1.5" />
                          </svg>
                        </div>

                        <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                          {simLeafStage === 1 ? '☀️ सूर्य की किरणें पत्ती पर गिरती हैं।' : simLeafStage === 2 ? '💧 जड़ से जल पत्ती तक पहुँचता है।' : '🍃 पत्ती भोजन तैयार करती है।'}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 40-Minute Lesson Pace Timer */}
                  <div className="card" style={{ padding: '18px', background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Clock size={18} color="var(--color-primary)" />
                        <h4 style={{ fontSize: '0.96rem', fontWeight: 800, margin: 0 }}>
                          ४०-मिनट पेस टाइमर (Lesson Delivery Timer)
                        </h4>
                      </div>

                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          onClick={() => setIsTimerRunning(!isTimerRunning)}
                          className={`btn ${isTimerRunning ? 'btn-accent' : 'btn-primary'}`}
                          style={{ padding: '4px 10px', fontSize: '0.78rem' }}
                        >
                          {isTimerRunning ? <Pause size={13} /> : <Play size={13} />}
                          <span style={{ marginLeft: '4px' }}>{isTimerRunning ? 'रोकें' : 'शुरू'}</span>
                        </button>
                        <button
                          onClick={() => {
                            setIsTimerRunning(false);
                            setTimerSeconds(40 * 60);
                            setActiveStage(1);
                          }}
                          className="btn btn-secondary"
                          style={{ padding: '4px 8px', fontSize: '0.78rem' }}
                        >
                          <RotateCcw size={13} />
                        </button>
                      </div>
                    </div>

                    <div style={{ textAlign: 'center', padding: '12px', background: 'var(--color-background)', borderRadius: '10px', marginBottom: '14px' }}>
                      <div style={{ fontSize: '2.6rem', fontWeight: 800, fontFamily: 'monospace', color: 'var(--color-primary)' }}>
                        {formatTimer(timerSeconds)}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                        वर्तमान चरण {activeStage} of 5
                      </div>
                    </div>

                    {/* Compact Step Progress */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {[
                        { step: 1, mins: '0-5m', title: 'हुक व पूर्वज्ञान', desc: 'मातृभाषा में परिवेशी कहानी' },
                        { step: 2, mins: '5-20m', title: 'मुख्य शिक्षण', desc: 'द्विभाषी अवधारणा प्रस्तुति' },
                        { step: 3, mins: '20-30m', title: 'समूह गतिविधि', desc: 'हाथों से प्रत्यक्ष प्रयोग' },
                        { step: 4, mins: '30-35m', title: 'त्वरित समझ जाँच', desc: 'क्विज़ व पोल' },
                        { step: 5, mins: '35-40m', title: 'निष्कर्ष व डायरी', desc: 'श्यामपट्ट सारांश' }
                      ].map(s => (
                        <div
                          key={s.step}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '6px 10px',
                            borderRadius: '6px',
                            background: activeStage === s.step ? 'var(--color-primary-subtle)' : 'transparent',
                            borderLeft: activeStage === s.step ? '3px solid var(--color-primary)' : '3px solid transparent',
                            fontSize: '0.78rem'
                          }}
                        >
                          <span style={{ fontWeight: activeStage === s.step ? 800 : 500 }}>
                            {s.step}. {s.title} ({s.mins})
                          </span>
                          <span style={{ color: 'var(--color-text-muted)', fontSize: '0.72rem' }}>{s.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Step-by-Step Visual Representation */}
                {lessonPack.visualExplanation && lessonPack.visualExplanation.steps && (
                  <div style={{ marginTop: '16px' }}>
                    <h4 style={{ fontSize: '0.96rem', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '12px' }}>
                      आरेखीय कदम (Step-by-Step Visual Representation)
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                      {lessonPack.visualExplanation.steps.map((st: any, idx: number) => (
                        <div key={idx} className="card" style={{ padding: '14px', background: 'var(--color-surface)', textAlign: 'center' }}>
                          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--color-primary)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px', fontWeight: 800, fontSize: '0.85rem' }}>
                            {st.stepNumber || idx + 1}
                          </div>
                          <div style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '4px' }}>
                            {st.hindi}
                          </div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--color-primary)' }}>
                            <VernacularText text={st.targetLang} size="md" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ==================== WORKSPACE 3: WORKSHEET & VOCABULARY ==================== */}
            {activeWorkspace === 'worksheet' && (
              <div>
                {/* Header Action */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-primary)', margin: 0 }}>
                      छात्र द्विभाषी कार्यपत्रक एवं शब्दावली फ़्लैशकार्ड
                    </h3>
                    <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', margin: '2px 0 0 0' }}>
                      प्रत्येक बच्चे के अभ्यास हेतु कार्यपत्रक प्रिंट करें व 4 ऑडियो फ़्लैशकार्ड से उच्चारण कराएं।
                    </p>
                  </div>
                  <button onClick={() => window.print()} className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px', fontSize: '0.84rem' }}>
                    <Printer size={15} />
                    <span>कार्यपत्रक प्रिंट करें</span>
                  </button>
                </div>

                {/* Printable Worksheet Card */}
                {lessonPack.worksheet && (
                  <div className="card" style={{ padding: '20px', background: 'var(--color-surface)', border: '1px solid var(--color-border)', marginBottom: '24px' }}>
                    <div style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '10px', marginBottom: '14px' }}>
                      <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-text)', margin: 0 }}>
                        {lessonPack.worksheet.title || `${topic} द्विभाषी अभ्यास कार्यपत्रक`}
                      </h4>
                      <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', margin: '4px 0 0 0' }}>
                        {lessonPack.worksheet.bilingualInstructions}
                      </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {(lessonPack.worksheet.exercises || []).map((ex: any, idx: number) => (
                        <div key={idx} style={{ paddingBottom: '12px', borderBottom: idx < lessonPack.worksheet.exercises.length - 1 ? '1px dashed var(--color-border)' : 'none' }}>
                          <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--color-text)' }}>
                            {ex.promptHindi}
                          </div>
                          <div style={{ fontSize: '0.86rem', color: 'var(--color-primary)', marginTop: '4px' }}>
                            <VernacularText text={ex.promptTargetLang} size="md" />
                          </div>
                          {ex.blankSpace && (
                            <div style={{ height: '35px', borderBottom: '1px solid #cbd5e1', marginTop: '8px' }}></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4 Audio Vocabulary Flashcards */}
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '14px' }}>
                    ४ द्विभाषी शब्दावली फ़्लैशकार्ड (Vernacular Audio Flashcards)
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                    {(lessonPack.flashcards || []).map((fc: any, idx: number) => (
                      <div
                        key={idx}
                        className="card"
                        style={{
                          padding: '16px',
                          background: 'var(--color-surface)',
                          border: '1px solid var(--color-border)',
                          borderRadius: '12px'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-text)' }}>
                            {fc.termHindi}
                          </span>
                          <button
                            onClick={() => handlePlayAudio(fc.termTargetScript || fc.termHindi, `fc_${idx}`)}
                            className="btn btn-secondary"
                            style={{ padding: '4px 8px', fontSize: '0.74rem' }}
                          >
                            <Volume2 size={13} />
                          </button>
                        </div>

                        <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid var(--color-border)' }}>
                          <div style={{ fontSize: '1.1rem', color: 'var(--color-primary)', fontWeight: 700 }}>
                            <VernacularText text={fc.termTargetScript || fc.termTargetLang} latin={fc.termTargetLatin} size="md" />
                          </div>
                          {fc.phonetic && (
                            <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)', fontFamily: 'monospace', marginTop: '2px' }}>
                              उच्चारण: {fc.phonetic}
                            </div>
                          )}
                          {fc.exampleSentence && (
                            <div style={{ fontSize: '0.78rem', color: 'var(--color-text)', marginTop: '6px', background: 'var(--color-background)', padding: '6px 8px', borderRadius: '6px' }}>
                              उदाहरण: {fc.exampleSentence}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Differentiated Instruction Guidance */}
                <div style={{ marginTop: '24px', background: 'var(--color-background)', padding: '16px', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: '10px' }}>
                    स्तरानुसार शिक्षण रणनीति (Differentiated Learning Tiers):
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px', fontSize: '0.84rem' }}>
                    <div style={{ background: 'var(--color-surface)', padding: '10px 14px', borderRadius: '8px' }}>
                      <strong style={{ color: '#ef4444' }}>स्तर 1 (बुनियादी सहारा):</strong>
                      <p style={{ margin: '4px 0 0 0', color: 'var(--color-text-muted)' }}>
                        कंकड़, तीली व पत्तों से प्रत्यक्ष गिनती कराएं। मातृभाषा में ही प्रश्न पूछें।
                      </p>
                    </div>
                    <div style={{ background: 'var(--color-surface)', padding: '10px 14px', borderRadius: '8px' }}>
                      <strong style={{ color: '#f59e0b' }}>स्तर 2 (कक्षा स्तर):</strong>
                      <p style={{ margin: '4px 0 0 0', color: 'var(--color-text-muted)' }}>
                        द्विभाषी कार्यपत्रक हल करवाएं। दोनों भाषाओं के शब्दों का मिलान कराएं।
                      </p>
                    </div>
                    <div style={{ background: 'var(--color-surface)', padding: '10px 14px', borderRadius: '8px' }}>
                      <strong style={{ color: '#10b981' }}>स्तर 3 (उन्नत / चुनौती):</strong>
                      <p style={{ margin: '4px 0 0 0', color: 'var(--color-text-muted)' }}>
                        गाँव के नए उदाहरण स्वयं बनाने को कहें व सहपाठियों को समझाने को कहें।
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ==================== WORKSPACE 4: ASSESSMENT & COMPREHENSION ==================== */}
            {activeWorkspace === 'quiz' && (
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '16px' }}>
                  त्वरित समझ जाँच एवं कक्षा पोल (Formative Comprehension & Poll)
                </h3>

                {/* Formative Practice Questions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                  {(lessonPack.practiceQuestions || []).map((q: any, qIdx: number) => (
                    <div key={qIdx} className="card" style={{ padding: '16px', background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                        <div>
                          <div style={{ fontSize: '0.94rem', fontWeight: 800, color: 'var(--color-text)' }}>
                            प्र. {qIdx + 1}: {q.questionHindi}
                          </div>
                          <div style={{ fontSize: '0.86rem', color: 'var(--color-primary)', marginTop: '4px' }}>
                            <VernacularText text={q.questionTargetLang} size="md" />
                          </div>
                        </div>
                        <button
                          onClick={() => handlePlayAudio(q.questionTargetLang || q.questionHindi, `q_${qIdx}`)}
                          className="btn btn-secondary"
                          style={{ padding: '4px 8px', fontSize: '0.74rem' }}
                        >
                          <Volume2 size={13} />
                        </button>
                      </div>

                      {/* Options */}
                      {q.optionsHindi && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px', marginTop: '10px' }}>
                          {q.optionsHindi.map((opt: string, oIdx: number) => {
                            const isSelected = pollResponses[qIdx] === oIdx;
                            const isCorrect = opt === q.correctAnswer;
                            return (
                              <button
                                key={oIdx}
                                onClick={() => setPollResponses(prev => ({ ...prev, [qIdx]: oIdx }))}
                                className="btn btn-secondary"
                                style={{
                                  padding: '8px 12px',
                                  textAlign: 'left',
                                  fontSize: '0.84rem',
                                  background: isSelected ? (isCorrect ? '#d1fae5' : '#fee2e2') : 'transparent',
                                  borderColor: isSelected ? (isCorrect ? '#10b981' : '#ef4444') : 'var(--color-border)',
                                  color: isSelected ? (isCorrect ? '#065f46' : '#991b1b') : 'var(--color-text)'
                                }}
                              >
                                <span>{String.fromCharCode(65 + oIdx)}. {opt}</span>
                                {q.optionsTargetLang && q.optionsTargetLang[oIdx] && (
                                  <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)' }}>
                                    <VernacularText text={q.optionsTargetLang[oIdx]} size="sm" />
                                  </div>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* Explanation Reveal */}
                      {pollResponses[qIdx] !== undefined && q.explanation && (
                        <div style={{ marginTop: '10px', padding: '8px 12px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.08)', fontSize: '0.82rem', color: '#065f46' }}>
                          <strong>सही उत्तर व्याख्या: </strong> {q.explanation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Cognitive Mastery Analytics Graph */}
                <div className="card" style={{ padding: '18px', background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <BarChart2 size={18} color="var(--color-primary)" />
                      <h4 style={{ fontSize: '0.96rem', fontWeight: 800, margin: 0 }}>
                        दक्षता संप्राप्ति एवं संज्ञानात्मक आरेख (Cognitive Mastery & Retention)
                      </h4>
                    </div>
                    <span className="badge badge-primary">NIPUN संरेखित</span>
                  </div>

                  <div style={{ width: '100%', height: '140px' }}>
                    <svg width="100%" height="100%" viewBox="0 0 600 130" preserveAspectRatio="none">
                      <line x1="40" y1="105" x2="580" y2="105" stroke="var(--color-border)" strokeWidth="1" />
                      {[
                        { level: 'स्मरण (Remember)', pct: 95, color: '#3B82F6' },
                        { level: 'समझ (Understand)', pct: 88, color: '#10B981' },
                        { level: 'अनुप्रयोग (Apply)', pct: 82, color: '#F59E0B' },
                        { level: 'विश्लेषण (Analyze)', pct: 74, color: '#8B5CF6' },
                        { level: 'मूल्यांकन (Evaluate)', pct: 68, color: '#EC4899' }
                      ].map((item, idx) => {
                        const x = 50 + idx * 110;
                        const barH = (item.pct / 100) * 80;
                        const y = 105 - barH;
                        return (
                          <g key={idx}>
                            <rect x={x} y={y} width="45" height={barH} rx="4" fill={item.color} />
                            <text x={x + 22} y={y - 5} fontSize="9" fontWeight="bold" fill="var(--color-text)" textAnchor="middle">{item.pct}%</text>
                            <text x={x + 22} y="120" fontSize="8" fill="var(--color-text-muted)" textAnchor="middle">{item.level.split(' ')[0]}</text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>
                </div>
              </div>
            )}

            {/* ==================== WORKSPACE 5: BLACKBOARD & DIARY ==================== */}
            {activeWorkspace === 'blackboard' && (
              <div>
                {/* Chalkboard 3-Column Summary */}
                <div
                  style={{
                    background: '#132a22',
                    color: '#e2f6ec',
                    padding: '24px',
                    borderRadius: '14px',
                    border: '6px solid #4a3728',
                    boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)',
                    marginBottom: '24px',
                    fontFamily: 'serif'
                  }}
                >
                  <div style={{ textAlign: 'center', borderBottom: '1px dashed #73bda8', paddingBottom: '8px', marginBottom: '16px' }}>
                    <div style={{ fontSize: '0.82rem', letterSpacing: '2px', color: '#a3e6cf' }}>
                      राजकीय प्राथमिक विद्यालय • श्यामपट्ट सारांश (Blackboard Plan)
                    </div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '4px 0', color: '#ffffff' }}>
                      कक्षा {selectedGrade} • {selectedSubject}: {topic}
                    </h3>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                    <div>
                      <h5 style={{ borderBottom: '1px solid #73bda8', paddingBottom: '4px', margin: '0 0 8px 0', color: '#fef08a' }}>
                        कॉलम 1: मुख्य शब्द
                      </h5>
                      <ul style={{ paddingLeft: '18px', margin: 0, fontSize: '0.9rem', lineHeight: 1.6 }}>
                        {(lessonPack.blackboardSummary?.keyTerms || (lessonPack.flashcards || []).slice(0, 3).map((f: any) => `${f.termHindi} (${f.termTargetScript || f.termTargetLang})`)).map((term: string, i: number) => (
                          <li key={i}>{term}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h5 style={{ borderBottom: '1px solid #73bda8', paddingBottom: '4px', margin: '0 0 8px 0', color: '#fef08a' }}>
                        कॉलम 2: गाँव का उदाहरण
                      </h5>
                      <p style={{ margin: 0, fontSize: '0.88rem', lineHeight: 1.5 }}>
                        {lessonPack.blackboardSummary?.villageExample || lessonPack.localExample?.descriptionHindi || 'गाँव के वास्तविक परिवेश से जुड़ाव।'}
                      </p>
                    </div>

                    <div>
                      <h5 style={{ borderBottom: '1px solid #73bda8', paddingBottom: '4px', margin: '0 0 8px 0', color: '#fef08a' }}>
                        कॉलम 3: अभ्यास नियम
                      </h5>
                      <p style={{ margin: 0, fontSize: '0.88rem', lineHeight: 1.5 }}>
                        {lessonPack.blackboardSummary?.actionRule || lessonPack.learningObjective?.hindi || 'प्रतिदिन अभ्यास व अवलोकन।'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Teacher Reflection Diary */}
                <div className="card" style={{ padding: '20px', background: 'var(--color-surface)', border: '1px solid var(--color-border)', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <FileEdit size={18} color="var(--color-primary)" />
                      <h4 style={{ fontSize: '1rem', fontWeight: 800, margin: 0 }}>
                        शिक्षक दैनंदिनी व अवलोकन टिप्पणी (Teacher Reflection Diary)
                      </h4>
                    </div>
                    {reflectionSaved && (
                      <span style={{ fontSize: '0.82rem', color: '#10b981', fontWeight: 700 }}>
                        सहेजा गया! ✓
                      </span>
                    )}
                  </div>

                  <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBottom: '10px' }}>
                    कक्षा समाप्त होने के बाद अपनी टिप्पणियां लिखें: किस बच्चे ने अधिक प्रगति की? किस शब्द में झिझक रही?
                  </p>

                  <textarea
                    className="form-input"
                    rows={5}
                    value={reflectionNotes}
                    onChange={e => setReflectionNotes(e.target.value)}
                    placeholder="उदा. आज बच्चों ने महुआ केक व कंकड़ उदाहरण से 1/2 भिन्न को तुरंत समझ लिया। शांति और सुनील ने संथाली में बहुत अच्छा उत्तर दिया। कल 1/4 का अभ्यास कराएंगे..."
                    style={{ width: '100%', fontSize: '0.88rem', lineHeight: 1.5, padding: '12px' }}
                  />

                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
                    <button onClick={handleSaveReflection} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 18px', fontSize: '0.85rem', fontWeight: 700 }}>
                      <CheckCircle2 size={16} />
                      <span>डायरी में सहेजें (Save Reflection)</span>
                    </button>
                  </div>
                </div>

                {/* Remediation Takeaways */}
                {lessonPack.remediationSuggestions && (
                  <div style={{ background: 'var(--color-background)', padding: '16px', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                    <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: '8px' }}>
                      धीमी गति से सीखने वाले बच्चों हेतु उपचारात्मक सुझाव (Remediation):
                    </h4>
                    <ul style={{ paddingLeft: '20px', margin: 0, fontSize: '0.86rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                      {lessonPack.remediationSuggestions.map((sug: string, idx: number) => (
                        <li key={idx}>{sug}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="card" style={{ padding: '60px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
          <Sparkles size={40} style={{ marginBottom: '12px', opacity: 0.5 }} />
          <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>पाठ योजना लोड हो रही है...</div>
          <p style={{ fontSize: '0.86rem', marginTop: '4px' }}>
            कृपया "पाठ तैयार करें" बटन पर क्लिक करें।
          </p>
        </div>
      )}
    </div>
  );
};
