import React, { useState, useEffect } from 'react';
import { useApp } from '../../core/context/AppContext';
import { api } from '../../core/api/client';
import { VernacularText } from '../../components/OlChikiText';
import { getTopicsForGradeAndSubject, getDefaultTopicForGradeAndSubject } from '../../core/curriculum/curriculumData';
import { Printer, RefreshCw, Sparkles, Download, CheckCircle2 } from 'lucide-react';

export const WorksheetGeneratorView: React.FC = () => {
  const {
    selectedGrade,
    setSelectedGrade,
    selectedSubject,
    setSelectedSubject,
    availableSubjects,
    targetLanguage,
    targetLanguageName,
    targetScript
  } = useApp();

  const [topic, setTopic] = useState<string>(() => getDefaultTopicForGradeAndSubject(selectedGrade, selectedSubject));
  const [questionCount, setQuestionCount] = useState<number>(4);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [worksheet, setWorksheet] = useState<any | null>(null);

  const topicsList = getTopicsForGradeAndSubject(selectedGrade, selectedSubject);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const res = await api.post('/pedagogy/worksheet', {
        grade: selectedGrade,
        subject: selectedSubject,
        topic,
        count: questionCount,
        targetLanguage
      });
      if (res?.worksheet) {
        setWorksheet(res.worksheet);
      }
    } catch (err) {
      console.error('Worksheet error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGenerate();
  }, [selectedGrade, selectedSubject, targetLanguage]);

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.6rem' }}>📝</span>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary)' }}>
              द्विभाषी कार्यपत्रक जनरेटर (Bilingual Worksheet Generator)
            </h1>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
            JCERT पाठ्यक्रमानुसार स्वतः तैयार मुद्रण-योग्य अभ्यास पत्र — {targetLanguageName} ({targetScript})।
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => window.print()} className="btn btn-primary">
            <Printer size={16} />
            <span>मुद्रण / PDF प्रिंट (Print)</span>
          </button>
        </div>
      </div>

      {/* Generator Controls */}
      <div className="card no-print" style={{ marginBottom: '24px', background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', alignItems: 'flex-end' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">कक्षा (Grade)</label>
            <select
              className="form-select"
              value={selectedGrade}
              onChange={e => setSelectedGrade(parseInt(e.target.value, 10))}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(g => (
                <option key={g} value={g}>
                  कक्षा {g} {g <= 2 ? '(बुनियादी - भाषा व गणित)' : g <= 5 ? '(तैयारी चरण)' : '(उच्च प्राथमिक)'}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">विषय (Subject - JCERT)</label>
            <select
              className="form-select"
              value={selectedSubject}
              onChange={e => setSelectedSubject(e.target.value)}
            >
              {availableSubjects.map(sub => (
                <option key={sub.id} value={sub.id}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">पाठ का शीर्षक (Topic)</label>
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

          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="btn btn-primary"
            style={{ height: '42px', padding: '0 20px', whiteSpace: 'nowrap' }}
          >
            <RefreshCw size={16} className={isLoading ? 'spin-anim' : ''} />
            <span>{isLoading ? 'बनाया जा रहा है...' : 'नया कार्यपत्रक बनाएं'}</span>
          </button>
        </div>
      </div>

      {/* Printable Sheet View */}
      {worksheet && (
        <div
          className="card print-paper"
          style={{
            background: '#FFFFFF',
            color: '#0F172A',
            border: '1px solid #CBD5E1',
            padding: '36px',
            maxWidth: '820px',
            margin: '0 auto',
            boxShadow: 'var(--shadow-md)'
          }}
        >
          {/* Header */}
          <div style={{ textAlign: 'center', borderBottom: '2px solid #0F172A', paddingBottom: '14px', marginBottom: '18px' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              झारखंड प्राथमिक शिक्षा परिषद • JCERT द्विभाषी कार्यपत्रक
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, margin: '6px 0 2px' }}>
              {worksheet.title}
            </h2>
            <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#475569' }}>
              कक्षा: {selectedGrade} • विषय: {selectedSubject} • मातृभाषा: {targetLanguageName} ({targetScript})
            </div>
          </div>

          {/* Student details bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', borderBottom: '1px solid #94A3B8', paddingBottom: '12px', marginBottom: '20px', fontSize: '0.88rem' }}>
            <div><strong>विद्यार्थी का नाम:</strong> __________________</div>
            <div><strong>अनुक्रमांक (Roll):</strong> _______</div>
            <div style={{ textAlign: 'right' }}><strong>दिनांक:</strong> {new Date().toLocaleDateString('hi-IN')}</div>
          </div>

          <div style={{ background: '#F8FAFC', padding: '10px 14px', borderRadius: '4px', borderLeft: '4px solid #0F172A', marginBottom: '24px', fontSize: '0.82rem' }}>
            <strong>निर्देश:</strong> {worksheet.bilingualInstructions}
          </div>

          {/* Exercises */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            {worksheet.exercises?.map((ex: any, idx: number) => (
              <div key={idx} style={{ paddingBottom: '18px', borderBottom: '1px dashed #CBD5E1' }}>
                <div style={{ fontSize: '0.96rem', fontWeight: 700, color: '#0F172A', marginBottom: '4px' }}>
                  {ex.promptHindi}
                </div>
                <div style={{ marginLeft: '16px', marginBottom: '12px' }}>
                  <VernacularText text={ex.promptTargetLang} size="md" color="#1E3A8A" />
                </div>
                {ex.blankSpace && (
                  <div
                    style={{
                      height: '75px',
                      border: '1px solid #94A3B8',
                      borderRadius: '4px',
                      background: '#FAFAFA',
                      marginTop: '8px'
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Teacher feedback note */}
          <div style={{ marginTop: '36px', paddingTop: '16px', borderTop: '1px solid #94A3B8', display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
            <div>शिक्षक की टिप्पणी व हस्ताक्षर: ___________________</div>
            <div>ग्रेड / अंक: [ ______ / 10 ]</div>
          </div>
        </div>
      )}
    </div>
  );
};
