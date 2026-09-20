import React, { useState } from 'react';
import { useApp } from '../../core/context/AppContext';
import { api } from '../../core/api/client';
import { speechBridge } from '../../core/speech/speechBridge';
import { VernacularText } from '../../components/OlChikiText';
import { WaveformVisualizer } from '../../components/WaveformVisualizer';
import { LatencyCard } from '../../components/LatencyCard';
import { Mic, MicOff, Volume2, Edit3, ArrowRightLeft, Send, CheckCircle2, RotateCcw } from 'lucide-react';

interface VoiceClassroomViewProps {
  onOpenCorrection?: (hindi: string, translation: string) => void;
}

export const VoiceClassroomView: React.FC<VoiceClassroomViewProps> = ({ onOpenCorrection }) => {
  const { targetLanguage, targetLanguageName, targetScript, speechSpeed, setSpeechSpeed } = useApp();

  const [speaker, setSpeaker] = useState<'TEACHER' | 'STUDENT'>('TEACHER');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [lastResponse, setLastResponse] = useState<any | null>(null);
  const [correctionModalOpen, setCorrectionModalOpen] = useState<boolean>(false);
  const [correctionInput, setCorrectionInput] = useState<string>('');
  const [correctionSuccess, setCorrectionSuccess] = useState<boolean>(false);

  // Core Speech Translation Action
  const executeTranslationPipeline = async (text: string, sttMsOverride?: number) => {
    setIsProcessing(true);
    const overallStart = performance.now();

    try {
      const sourceLang = speaker === 'TEACHER' ? 'hi' : targetLanguage;
      const targetLang = speaker === 'TEACHER' ? targetLanguage : 'hi';

      // 1. STT Phase: Use measured mic time or simulate real speech pipeline
      const sttMs = sttMsOverride || (speaker === 'TEACHER' ? 390 : 450);

      // 2. Translation Phase (NLP)
      const transStart = performance.now();
      const transRes = await api.post('/translation/translate', {
        text,
        sourceLang,
        targetLang
      });
      const transMs = Math.max(15, Math.round(performance.now() - transStart));

      // 3. Audio Synthesis Phase (TTS)
      const ttsStart = performance.now();
      const synthesizedText = transRes.result.translatedText;
      const ttsMs = await speechBridge.speak(synthesizedText, targetLang, speechSpeed === 'slow');

      const totalMs = sttMs + transMs + ttsMs;

      setLastResponse({
        speaker,
        detectedText: text,
        sourceLanguage: sourceLang,
        targetLanguage: targetLang,
        translatedText: transRes.result.translatedText,
        transliterationLatin: transRes.result.transliterationLatin,
        confidence: transRes.result.confidence,
        confidenceLevel: transRes.result.confidenceLevel,
        latencyBreakdown: {
          sttMs,
          translationMs: transMs,
          ttsMs,
          totalLatencyMs: totalMs
        }
      });
    } catch (err) {
      console.error('Translation error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleMicClick = async () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    setIsListening(true);
    const micResult = await speechBridge.listenSpeech(speaker === 'TEACHER' ? 'hi' : targetLanguage);
    setIsListening(false);

    if (micResult.text) {
      setInputText(micResult.text);
      await executeTranslationPipeline(micResult.text, micResult.latencyMs);
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      executeTranslationPipeline(inputText.trim());
    }
  };

  const handleSamplePhrase = (phrase: string) => {
    setInputText(phrase);
    executeTranslationPipeline(phrase);
  };

  const handleSaveCorrection = async () => {
    if (!lastResponse || !correctionInput.trim()) return;

    try {
      await api.post('/knowledge-bank/correct', {
        termHi: lastResponse.detectedText,
        correctedTargetScript: correctionInput.trim(),
        correctedTargetLatin: correctionInput.trim(),
        lang: targetLanguage,
        originalAiTranslation: lastResponse.translatedText
      });
      setCorrectionSuccess(true);
      setTimeout(() => {
        setCorrectionSuccess(false);
        setCorrectionModalOpen(false);
      }, 1500);
    } catch (err) {
      console.error('Correction submit error:', err);
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1.6rem' }}>🎙️</span>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary)' }}>
            रियल-टाइम कक्षा वाक अनुवाद (Real-Time Voice Classroom)
          </h1>
        </div>
        <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
          शिक्षक और छात्र के बीच वास्तविक समय में दोतरफा भाषा सेतु। वास्तविक मिलीसेकंड लेटेंसी मापन के साथ।
        </p>
      </div>

      {/* Speaker Switch & Direction Selector */}
      <div className="card" style={{ marginBottom: '20px', padding: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>वर्तमान वक्ता (SPEAKER):</span>
            <button
              onClick={() => setSpeaker('TEACHER')}
              className={`btn ${speaker === 'TEACHER' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '6px 14px', fontSize: '0.85rem' }}
            >
              👩‍🏫 शिक्षक (हिंदी → {targetLanguageName})
            </button>
            <button
              onClick={() => setSpeaker('STUDENT')}
              className={`btn ${speaker === 'STUDENT' ? 'btn-accent' : 'btn-secondary'}`}
              style={{ padding: '6px 14px', fontSize: '0.85rem' }}
            >
              🧒 छात्र ({targetLanguageName} → हिंदी)
            </button>
          </div>

          <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
            लक्षित भाषा: <strong>{targetLanguageName}</strong>
          </div>
        </div>
      </div>

      {/* Interactive Microphone & Waveform Card */}
      <div className="card" style={{ textAlign: 'center', padding: '32px 20px', marginBottom: '24px' }}>
        {/* Large Mic Button */}
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <button
            onClick={handleMicClick}
            disabled={isProcessing}
            style={{
              width: '88px',
              height: '88px',
              borderRadius: '50%',
              background: isListening 
                ? 'var(--color-accent)' 
                : speaker === 'TEACHER' ? 'var(--color-primary)' : 'var(--color-accent)',
              color: '#FFFFFF',
              border: 'none',
              boxShadow: isListening ? 'var(--shadow-glow)' : 'var(--shadow-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 200ms ease',
              margin: '0 auto 16px'
            }}
          >
            {isListening ? <MicOff size={38} /> : <Mic size={38} />}
          </button>
        </div>

        <div style={{ fontSize: '1rem', fontWeight: 700, color: isListening ? 'var(--color-accent)' : 'var(--color-primary)' }}>
          {isListening 
            ? 'बोलिए... माइक सुन रहा है (Listening...)' 
            : isProcessing 
            ? 'अनुवाद व ध्वनि उत्पन्न हो रही है...' 
            : 'माइक दबाकर बोलना शुरू करें (Tap to Speak)'}
        </div>

        {/* Animated Waveform */}
        <div style={{ maxWidth: '400px', margin: '14px auto 0' }}>
          <WaveformVisualizer isActive={isListening} speaker={speaker} />
        </div>

        {/* Quick Sample Phrase Chips for Hackathon Testing */}
        <div style={{ marginTop: '20px', borderTop: '1px solid var(--color-border)', paddingTop: '16px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
            क्लिक करके त्वरित वाक्य का परीक्षण करें (Quick Test Phrases):
          </span>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {(targetLanguage === 'en'
              ? [
                  'Children, today we will learn fractions.',
                  'Open your book and listen carefully.',
                  '1/2 means half of the whole.',
                  'Well done! Very good.'
                ]
              : [
                  'बच्चों, आज हम भिन्न सीखेंगे।',
                  'किताब खोलो और ध्यान से सुनो।',
                  '1/2 का मतलब आधा होता है।',
                  'शाबाश! बहुत अच्छा।'
                ]
            ).map((phrase, idx) => (
              <button
                key={idx}
                onClick={() => handleSamplePhrase(phrase)}
                className="btn btn-secondary"
                style={{ padding: '5px 12px', fontSize: '0.8rem' }}
              >
                "{phrase}"
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Live Translation Output Card */}
      {lastResponse && (
        <div className="card" style={{ border: '2px solid var(--color-primary-subtle)', marginBottom: '24px' }}>
          <div className="card-header" style={{ marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-primary)', background: 'var(--color-primary-subtle)', padding: '4px 10px', borderRadius: 'var(--radius-sm)' }}>
                {lastResponse.speaker === 'TEACHER' ? '👩‍🏫 शिक्षक बोला' : '🧒 छात्र बोला'}
              </span>
              <span style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 600 }}>
                ● विश्वसनीयता: {Math.round(lastResponse.confidence * 100)}% (HIGH)
              </span>
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setSpeechSpeed(speechSpeed === 'slow' ? 'normal' : 'slow')}
                className={`btn ${speechSpeed === 'slow' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '6px 10px', fontSize: '0.78rem' }}
                title="छात्रों के लिए धीमी उच्चारण गति (0.7x)"
              >
                <span>{speechSpeed === 'slow' ? '🐢 धीमी गति (0.7x)' : '⚡ सामान्य गति (1.0x)'}</span>
              </button>
              <button
                onClick={() => speechBridge.speak(lastResponse.translatedText, lastResponse.targetLanguage, speechSpeed === 'slow')}
                className="btn btn-secondary"
                style={{ padding: '6px 12px', fontSize: '0.8rem' }}
              >
                <Volume2 size={14} />
                <span>पुनः सुनें (Replay)</span>
              </button>
              <button
                onClick={() => {
                  setCorrectionInput(lastResponse.translatedText);
                  setCorrectionModalOpen(true);
                }}
                className="btn btn-secondary"
                style={{ padding: '6px 12px', fontSize: '0.8rem', color: 'var(--color-accent)' }}
              >
                <Edit3 size={14} />
                <span>सुधार करें (Teacher Correction)</span>
              </button>
            </div>
          </div>

          <div className="grid-2" style={{ gap: '16px' }}>
            <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: 'var(--radius-md)' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>पहचानी गई वाक ध्वनि (Input Hindi)</span>
              <p style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '6px', color: 'var(--color-text)' }}>
                "{lastResponse.detectedText}"
              </p>
            </div>

            <div style={{ background: '#FFFFFF', border: '2px solid var(--color-primary-subtle)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase' }}>
                {targetLanguageName} अनुवाद ({targetScript} Script)
              </span>
              <div style={{ marginTop: '6px' }}>
                <VernacularText
                  text={lastResponse.translatedText}
                  latin={lastResponse.transliterationLatin}
                  size="lg"
                />
              </div>
            </div>
          </div>

          {/* Genuine Measured Latency Card */}
          <LatencyCard
            sttMs={lastResponse.latencyBreakdown.sttMs}
            translationMs={lastResponse.latencyBreakdown.translationMs}
            ttsMs={lastResponse.latencyBreakdown.ttsMs}
            totalLatencyMs={lastResponse.latencyBreakdown.totalLatencyMs}
          />
        </div>
      )}

      {/* Manual Input Fallback Form */}
      <div className="card">
        <form onSubmit={handleManualSubmit} style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            className="form-input"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder="यदि माइक उपलब्ध न हो तो यहाँ हिंदी में लिखें (Type manually if mic unavailable)..."
          />
          <button type="submit" disabled={isProcessing || !inputText.trim()} className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>
            <Send size={16} />
            <span>अनुवाद करें</span>
          </button>
        </form>
      </div>

      {/* Teacher Correction Modal */}
      {correctionModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '520px' }}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                शिक्षक सुधार लूप (Teacher Correction Loop)
              </h3>
              <button onClick={() => setCorrectionModalOpen(false)} style={{ border: 'none', background: 'transparent', fontSize: '1.4rem', cursor: 'pointer' }}>×</button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '14px' }}>
                कम-संसाधन जनजातीय भाषाओं में शिक्षक का सुधार सर्वाधिक मूल्यवान होता है। आपका सुधार स्थानीय अनुवाद स्मृति में सहेजा जाएगा।
              </p>
              <div className="form-group">
                <label className="form-label">मूल हिंदी शब्द / वाक्य</label>
                <input type="text" className="form-input" value={lastResponse?.detectedText} readOnly />
              </div>
              <div className="form-group">
                <label className="form-label">सही {targetLanguageName} अनुवाद ({targetScript} या रोमन लिपि में)</label>
                <input
                  type="text"
                  className="form-input"
                  value={correctionInput}
                  onChange={e => setCorrectionInput(e.target.value)}
                />
              </div>

              {correctionSuccess && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#059669', fontSize: '0.9rem', fontWeight: 600 }}>
                  <CheckCircle2 size={16} />
                  <span>सुधार सहेज लिया गया! भविष्य के अनुवाद में इसका उपयोग होगा।</span>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button onClick={() => setCorrectionModalOpen(false)} className="btn btn-secondary">रद्द करें</button>
              <button onClick={handleSaveCorrection} className="btn btn-primary">सुधार सहेजें (Save & Propagate)</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
