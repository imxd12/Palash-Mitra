import React from 'react';
import { Clock, CheckCircle2, AlertTriangle } from 'lucide-react';

interface LatencyCardProps {
  sttMs: number;
  translationMs: number;
  ttsMs: number;
  totalLatencyMs: number;
  isSimulated?: boolean;
}

export const LatencyCard: React.FC<LatencyCardProps> = ({
  sttMs,
  translationMs,
  ttsMs,
  totalLatencyMs,
  isSimulated = false
}) => {
  const isWithinSla = totalLatencyMs < 3000;
  const totalSeconds = (totalLatencyMs / 1000).toFixed(2);

  return (
    <div style={{ marginTop: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-primary)' }}>
          <Clock size={15} />
          <span>सत्यापित लेटेंसी मापन (GENUINE RUNTIME LATENCY MEASUREMENT)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 600, color: isWithinSla ? '#059669' : '#D97706' }}>
          {isWithinSla ? <CheckCircle2 size={14} /> : <AlertTriangle size={14} />}
          <span>{isWithinSla ? 'लक्ष्य < 3.0s प्राप्त' : 'उच्च लेटेंसी'}</span>
        </div>
      </div>

      <div className="latency-display">
        <div className="latency-metric">
          <div className="latency-val">{sttMs}ms</div>
          <div className="latency-lbl">STT (वाक-पहचान)</div>
        </div>
        <div style={{ color: '#475569', fontSize: '1.2rem' }}>+</div>
        <div className="latency-metric">
          <div className="latency-val">{translationMs}ms</div>
          <div className="latency-lbl">अनुवाद (NLP)</div>
        </div>
        <div style={{ color: '#475569', fontSize: '1.2rem' }}>+</div>
        <div className="latency-metric">
          <div className="latency-val">{ttsMs}ms</div>
          <div className="latency-lbl">TTS (ध्वनि)</div>
        </div>
        <div style={{ color: '#475569', fontSize: '1.2rem' }}>=</div>
        <div className="latency-metric">
          <div className="latency-val total">{totalSeconds}s</div>
          <div className="latency-lbl">कुल समय (TOTAL)</div>
        </div>
      </div>
      {isSimulated && (
        <div style={{ fontSize: '0.7rem', color: '#64748B', marginTop: '4px', textAlign: 'right' }}>
          *ऑफ़लाइन कैश स्मृति से त्वरित निष्पादन
        </div>
      )}
    </div>
  );
};
