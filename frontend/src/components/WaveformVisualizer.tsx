import React from 'react';

interface WaveformVisualizerProps {
  isActive: boolean;
  speaker?: 'TEACHER' | 'STUDENT';
}

export const WaveformVisualizer: React.FC<WaveformVisualizerProps> = ({ isActive, speaker = 'TEACHER' }) => {
  if (!isActive) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '48px', color: '#94A3B8', fontSize: '0.85rem' }}>
        <span>माइक बटन दबाकर बोलना शुरू करें (Press Mic to Speak)</span>
      </div>
    );
  }

  const activeColor = speaker === 'TEACHER' ? 'var(--color-primary)' : 'var(--color-accent)';

  return (
    <div className="waveform-container">
      {[4, 12, 28, 42, 22, 38, 14, 30, 44, 20, 10].map((height, idx) => (
        <div
          key={idx}
          className="waveform-bar"
          style={{
            backgroundColor: activeColor,
            animationDelay: `${idx * 0.1}s`,
            height: `${height}px`
          }}
        />
      ))}
    </div>
  );
};
