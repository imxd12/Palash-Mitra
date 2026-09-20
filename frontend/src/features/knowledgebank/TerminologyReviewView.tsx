import React, { useState, useEffect } from 'react';
import { useApp } from '../../core/context/AppContext';
import { api } from '../../core/api/client';
import { OlChikiText } from '../../components/OlChikiText';
import { speechBridge } from '../../core/speech/speechBridge';
import { BookOpen, Search, Filter, Plus, Edit2, CheckCircle2, Volume2, ShieldCheck, AlertCircle } from 'lucide-react';

export const TerminologyReviewView: React.FC = () => {
  const { targetLanguage, targetLanguageName, targetScript, speechSpeed } = useApp();

  const [terms, setTerms] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Edit / Add Modal
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editingTerm, setEditingTerm] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    termHi: '',
    targetScript: '',
    targetLatin: '',
    phoneticIpa: '',
    meaningHi: '',
    category: 'MATHEMATICS',
    grade: 4
  });
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  const fetchTerms = async () => {
    setIsLoading(true);
    try {
      const res = await api.get('/knowledge-bank/terms', { lang: targetLanguage });
      if (res?.terms) {
        setTerms(res.terms);
      }
    } catch (err) {
      console.error('Fetch terms error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTerms();
  }, [targetLanguage]);

  const handleOpenEdit = (term: any) => {
    setEditingTerm(term);
    setFormData({
      termHi: term.term_hi,
      targetScript: term.term_target_script,
      targetLatin: term.term_target_latin,
      phoneticIpa: term.phonetic_ipa || '',
      meaningHi: term.meaning_hi || '',
      category: term.category || 'MATHEMATICS',
      grade: term.grade || 4
    });
    setModalOpen(true);
  };

  const handleOpenNew = () => {
    setEditingTerm(null);
    setFormData({
      termHi: '',
      targetScript: '',
      targetLatin: '',
      phoneticIpa: '',
      meaningHi: '',
      category: 'MATHEMATICS',
      grade: 4
    });
    setModalOpen(true);
  };

  const handleSaveCorrection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.termHi || !formData.targetScript) return;

    try {
      const res = await api.post('/knowledge-bank/correct', {
        termHi: formData.termHi,
        correctedTargetScript: formData.targetScript,
        correctedTargetLatin: formData.targetLatin || formData.targetScript,
        phoneticIpa: formData.phoneticIpa,
        meaningHi: formData.meaningHi,
        category: formData.category,
        grade: formData.grade,
        lang: targetLanguage
      });

      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        setModalOpen(false);
        fetchTerms();
      }, 1200);
    } catch (err) {
      console.error('Save correction error:', err);
    }
  };

  // Filter terms
  const filteredTerms = terms.filter(t => {
    if (selectedCategory !== 'ALL' && t.category !== selectedCategory) return false;
    if (selectedStatus !== 'ALL' && t.verification_status !== selectedStatus) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        t.term_hi?.toLowerCase().includes(q) ||
        t.term_target_script?.toLowerCase().includes(q) ||
        t.term_target_latin?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'OFFICIALLY_APPROVED':
        return <span style={{ background: '#ECFDF5', color: '#065F46', padding: '3px 8px', borderRadius: 'var(--radius-full)', fontSize: '0.72rem', fontWeight: 700 }}>✓ शासन द्वारा स्वीकृत</span>;
      case 'LANGUAGE_EXPERT_VERIFIED':
        return <span style={{ background: '#F0F9FF', color: '#0369A1', padding: '3px 8px', borderRadius: 'var(--radius-full)', fontSize: '0.72rem', fontWeight: 700 }}>★ भाषा विशेषज्ञ सत्यापित</span>;
      case 'TEACHER_REVIEWED':
        return <span style={{ background: '#FFFBEB', color: '#B45309', padding: '3px 8px', borderRadius: 'var(--radius-full)', fontSize: '0.72rem', fontWeight: 700 }}>● शिक्षक द्वारा सुधारा गया</span>;
      default:
        return <span style={{ background: '#F1F5F9', color: '#64748B', padding: '3px 8px', borderRadius: 'var(--radius-full)', fontSize: '0.72rem', fontWeight: 700 }}>AI जनरेटेड (समीक्षा लंबित)</span>;
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.6rem' }}>📚</span>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary)' }}>
              भाषा ज्ञान बैंक व शिक्षक सुधार लूप (Language Knowledge Bank)
            </h1>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
            कम-संसाधन जनजातीय भाषाओं के लिए मानव-सत्यापित पाठ्यचर्या शब्दावली बैंक। शिक्षक का सुधार तुरंत स्मृति में शामिल होता है।
          </p>
        </div>

        <button onClick={handleOpenNew} className="btn btn-primary">
          <Plus size={16} />
          <span>नया शब्द / सुधार जोड़ें</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="card" style={{ marginBottom: '20px', padding: '16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <Search size={16} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              className="form-input"
              style={{ paddingLeft: '36px' }}
              placeholder="हिंदी या संथाली में खोजें..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          <div>
            <select className="form-select" value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
              <option value="ALL">सभी विषय (All Categories)</option>
              <option value="MATHEMATICS">गणित (Mathematics)</option>
              <option value="SCIENCE">विज्ञान (Science / EVS)</option>
              <option value="CLASSROOM">कक्षा निर्देश (Classroom)</option>
              <option value="EVS">पर्यावरण (Environment)</option>
            </select>
          </div>

          <div>
            <select className="form-select" value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)}>
              <option value="ALL">सभी सत्यापन स्थितियाँ (All Status)</option>
              <option value="OFFICIALLY_APPROVED">शासन स्वीकृत (Approved)</option>
              <option value="LANGUAGE_EXPERT_VERIFIED">विशेषज्ञ सत्यापित (Verified)</option>
              <option value="TEACHER_REVIEWED">शिक्षक द्वारा सुधारा गया (Reviewed)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Terms Table / Grid */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ background: 'var(--color-bg)', borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-muted)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                <th style={{ padding: '14px 18px' }}>हिंदी शब्द</th>
                <th style={{ padding: '14px 18px' }}>{targetLanguageName} लिपि</th>
                <th style={{ padding: '14px 18px' }}>रोमन / IPA उच्चारण</th>
                <th style={{ padding: '14px 18px' }}>श्रेणी व कक्षा</th>
                <th style={{ padding: '14px 18px' }}>सत्यापन स्थिति</th>
                <th style={{ padding: '14px 18px', textAlign: 'right' }}>क्रियाएँ</th>
              </tr>
            </thead>
            <tbody>
              {filteredTerms.map((t, idx) => (
                <tr key={t.id || idx} style={{ borderBottom: '1px solid var(--color-border)', transition: 'background 150ms' }}>
                  <td style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--color-text)' }}>
                    {t.term_hi}
                    {t.meaning_hi && (
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 400 }}>{t.meaning_hi}</div>
                    )}
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    <OlChikiText text={t.term_target_script} showLatin={false} size="md" />
                  </td>
                  <td style={{ padding: '14px 18px', color: 'var(--color-text)' }}>
                    <div style={{ fontWeight: 600 }}>{t.term_target_latin}</div>
                    {t.phonetic_ipa && <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{t.phonetic_ipa}</div>}
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    <span style={{ fontSize: '0.8rem', background: 'var(--color-bg)', padding: '2px 8px', borderRadius: '4px', color: 'var(--color-text)' }}>
                      {t.category || 'General'} • क.{t.grade || 4}
                    </span>
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    {getStatusBadge(t.verification_status)}
                  </td>
                  <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => speechBridge.speak(t.term_target_script, targetLanguage, speechSpeed === 'slow')}
                        className="btn btn-secondary"
                        style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                        title="उच्चारण सुनें"
                      >
                        <Volume2 size={13} />
                      </button>
                      <button
                        onClick={() => handleOpenEdit(t)}
                        className="btn btn-secondary"
                        style={{ padding: '4px 8px', fontSize: '0.75rem', color: 'var(--color-accent)' }}
                        title="सुधार दर्ज करें"
                      >
                        <Edit2 size={13} />
                        <span>सुधारें</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Add Modal */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '560px' }}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                {editingTerm ? 'शब्दावली में सुधार दर्ज करें' : 'नया पाठ्यचर्या शब्द जोड़ें'}
              </h3>
              <button onClick={() => setModalOpen(false)} style={{ border: 'none', background: 'transparent', fontSize: '1.4rem', cursor: 'pointer' }}>×</button>
            </div>
            <form onSubmit={handleSaveCorrection}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">हिंदी शब्द / पद *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.termHi}
                    onChange={e => setFormData({ ...formData, termHi: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">{targetLanguageName} अनुवाद ({targetScript}) *</label>
                  <input
                    type="text"
                    className="form-input font-ol-chiki"
                    value={formData.targetScript}
                    onChange={e => setFormData({ ...formData, targetScript: e.target.value })}
                    placeholder="e.g. ᱦᱟᱹᱴᱤᱧ"
                    required
                  />
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">रोमन लिप्यंतरण (Latin)</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.targetLatin}
                      onChange={e => setFormData({ ...formData, targetLatin: e.target.value })}
                      placeholder="e.g. Hāṭiñ"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">ध्वन्यात्मक रूप (IPA Phonetic)</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.phoneticIpa}
                      onChange={e => setFormData({ ...formData, phoneticIpa: e.target.value })}
                      placeholder="e.g. /ha.ʈiɲ/"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">हिंदी में अर्थ / व्याख्या</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.meaningHi}
                    onChange={e => setFormData({ ...formData, meaningHi: e.target.value })}
                  />
                </div>

                {saveSuccess && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#059669', fontSize: '0.9rem', fontWeight: 600 }}>
                    <CheckCircle2 size={16} />
                    <span>सुधार सफलतापूर्वक स्थानीय स्मृति में सहेजा गया और सिंक कतार में जोड़ा गया!</span>
                  </div>
                )}
              </div>

              <div className="modal-footer">
                <button type="button" onClick={() => setModalOpen(false)} className="btn btn-secondary">रद्द करें</button>
                <button type="submit" className="btn btn-primary">सुधार सहेजें (Save Correction)</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
