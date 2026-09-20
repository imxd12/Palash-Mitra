import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useApp } from '../../core/context/AppContext';
import { speechBridge } from '../../core/speech/speechBridge';
import { INDIGENOUS_GLYPHS, LetterGlyph, StrokeSegment } from './glyphPaths';
import {
  Volume2,
  RotateCcw,
  Award,
  CheckCircle2,
  Sparkles,
  Play,
  Eye,
  PenTool,
  Info,
  ChevronRight,
  TrendingUp,
  Sliders
} from 'lucide-react';

// Math utility: Perpendicular distance from point P to line segment VW
function distToSegmentSquared(
  px: number,
  py: number,
  vx: number,
  vy: number,
  wx: number,
  wy: number
): number {
  const l2 = (vx - wx) * (vx - wx) + (vy - wy) * (vy - wy);
  if (l2 === 0) return (px - vx) * (px - vx) + (py - vy) * (py - vy);
  let t = ((px - vx) * (wx - vx) + (py - vy) * (wy - vy)) / l2;
  t = Math.max(0, Math.min(1, t));
  const projX = vx + t * (wx - vx);
  const projY = vy + t * (wy - vy);
  return (px - projX) * (px - projX) + (py - projY) * (py - projY);
}

function distToSegment(
  px: number,
  py: number,
  vx: number,
  vy: number,
  wx: number,
  wy: number
): number {
  return Math.sqrt(distToSegmentSquared(px, py, vx, vy, wx, wy));
}

export const ScriptTracingView: React.FC = () => {
  const { theme } = useApp();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedGlyph, setSelectedGlyph] = useState<LetterGlyph>(INDIGENOUS_GLYPHS[0]);
  const [scriptFilter, setScriptFilter] = useState<'ALL' | 'Ol Chiki' | 'Warang Chiti' | 'Devanagari'>('ALL');
  const [activeStrokeIdx, setActiveStrokeIdx] = useState<number>(0);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [drawnPoints, setDrawnPoints] = useState<Array<{ x: number; y: number }>>([]);
  const [accuracyScore, setAccuracyScore] = useState<number | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string>('अक्षर की रूपरेखा पर उंगली या माउस फेरें');
  const [showGuidelines, setShowGuidelines] = useState<boolean>(true);
  const [showDirectionArrows, setShowDirectionArrows] = useState<boolean>(true);
  const [strokeColor, setStrokeColor] = useState<string>('#10B981'); // Vibrant emerald trace
  const [brushSize, setBrushSize] = useState<number>(14);
  const [isDemonstrating, setIsDemonstrating] = useState<boolean>(false);
  const demoAnimationFrameRef = useRef<number | null>(null);

  // Redraw canvas guidelines, reference font, and direction arrows
  const drawBackground = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Canvas background
    ctx.fillStyle = theme === 'dark' ? '#0A0F1D' : '#F8FAFC';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle grid paper pattern
    ctx.strokeStyle = theme === 'dark' ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.04)';
    ctx.lineWidth = 1;
    const step = 25;
    for (let x = 0; x < canvas.width; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    if (showGuidelines) {
      // Large ghost watermark of character
      ctx.font = 'bold 200px "Noto Sans Ol Chiki", "Noto Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = theme === 'dark' ? 'rgba(255, 255, 255, 0.07)' : 'rgba(0, 0, 0, 0.06)';
      ctx.fillText(selectedGlyph.char, canvas.width / 2, canvas.height / 2 + 10);

      // Render stroke segment paths and vectors
      selectedGlyph.strokes.forEach((stroke, sIdx) => {
        const isCurrent = sIdx === activeStrokeIdx;
        const pts = stroke.points;
        if (pts.length < 2) return;

        // Draw dotted stroke spine
        ctx.beginPath();
        const startX = (pts[0].x / 100) * canvas.width;
        const startY = (pts[0].y / 100) * canvas.height;
        ctx.moveTo(startX, startY);

        for (let i = 1; i < pts.length; i++) {
          const px = (pts[i].x / 100) * canvas.width;
          const py = (pts[i].y / 100) * canvas.height;
          ctx.lineTo(px, py);
        }

        ctx.strokeStyle = isCurrent
          ? 'rgba(16, 185, 129, 0.45)'
          : theme === 'dark'
          ? 'rgba(255, 255, 255, 0.15)'
          : 'rgba(15, 23, 42, 0.15)';
        ctx.lineWidth = isCurrent ? 8 : 4;
        ctx.setLineDash([6, 6]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Directional arrow
        if (showDirectionArrows && stroke.directionArrow) {
          const ax1 = (stroke.directionArrow.start.x / 100) * canvas.width;
          const ay1 = (stroke.directionArrow.start.y / 100) * canvas.height;
          const ax2 = (stroke.directionArrow.end.x / 100) * canvas.width;
          const ay2 = (stroke.directionArrow.end.y / 100) * canvas.height;

          // Arrow head
          const angle = Math.atan2(ay2 - ay1, ax2 - ax1);
          const arrowLen = 14;
          ctx.beginPath();
          ctx.moveTo(ax2, ay2);
          ctx.lineTo(
            ax2 - arrowLen * Math.cos(angle - Math.PI / 6),
            ay2 - arrowLen * Math.sin(angle - Math.PI / 6)
          );
          ctx.lineTo(
            ax2 - arrowLen * Math.cos(angle + Math.PI / 6),
            ay2 - arrowLen * Math.sin(angle + Math.PI / 6)
          );
          ctx.closePath();
          ctx.fillStyle = isCurrent ? '#10B981' : '#94A3B8';
          ctx.fill();
        }

        // Draw numbered start point indicator
        ctx.beginPath();
        ctx.arc(startX, startY, 11, 0, Math.PI * 2);
        ctx.fillStyle = isCurrent ? '#10B981' : '#64748B';
        ctx.fill();

        ctx.font = 'bold 11px sans-serif';
        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(String(stroke.strokeIndex), startX, startY);
      });
    }
  }, [selectedGlyph, theme, showGuidelines, showDirectionArrows, activeStrokeIdx]);

  useEffect(() => {
    drawBackground();
    setDrawnPoints([]);
    setAccuracyScore(null);
    setActiveStrokeIdx(0);
    setFeedbackMessage('स्ट्रोक १ से शुरू करें और बाण की दिशा में उंगली फेरें।');
  }, [selectedGlyph, theme, drawBackground]);

  // Touch and Mouse Event Handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (isDemonstrating) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    setIsDrawing(true);

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    setDrawnPoints(prev => [...prev, { x, y }]);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || isDemonstrating) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    setDrawnPoints(prev => {
      const len = prev.length;
      if (len > 0) {
        const p1 = prev[len - 1];
        // Smooth line connection
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(x, y);
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = brushSize;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
      }
      return [...prev, { x, y }];
    });
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    evaluatePrecisionAccuracy();
  };

  const handleClear = () => {
    if (demoAnimationFrameRef.current) {
      cancelAnimationFrame(demoAnimationFrameRef.current);
    }
    setIsDemonstrating(false);
    drawBackground();
    setDrawnPoints([]);
    setAccuracyScore(null);
    setFeedbackMessage('कैनवास साफ़ किया गया। नए सिरे से अभ्यास करें।');
  };

  // High-Precision Point-to-Segment Accuracy Calculation
  const evaluatePrecisionAccuracy = () => {
    const canvas = canvasRef.current;
    if (!canvas || drawnPoints.length < 8) {
      setAccuracyScore(null);
      setFeedbackMessage('कृपया पूरे स्ट्रोक को पूरा करें।');
      return;
    }

    const currentStroke = selectedGlyph.strokes[activeStrokeIdx] || selectedGlyph.strokes[0];
    const pts = currentStroke.points;
    if (pts.length < 2) return;

    const canvasW = canvas.width;
    const canvasH = canvas.height;
    const maxTolerance = canvasW * 0.12; // 12% pixel tolerance threshold

    let hitPoints = 0;
    let totalSamples = 0;

    // Sample along guide stroke segments
    for (let i = 0; i < pts.length - 1; i++) {
      const v = { x: (pts[i].x / 100) * canvasW, y: (pts[i].y / 100) * canvasH };
      const w = { x: (pts[i + 1].x / 100) * canvasW, y: (pts[i + 1].y / 100) * canvasH };

      // Subdivide segment into 6 inspection points
      for (let step = 0; step <= 6; step++) {
        const t = step / 6;
        const sampleX = v.x + t * (w.x - v.x);
        const sampleY = v.y + t * (w.y - v.y);
        totalSamples++;

        // Find minimum distance from this guide point to any drawn point
        let minDist = Infinity;
        for (let j = 0; j < drawnPoints.length; j++) {
          const d = Math.hypot(drawnPoints[j].x - sampleX, drawnPoints[j].y - sampleY);
          if (d < minDist) minDist = d;
        }

        if (minDist <= maxTolerance) {
          hitPoints++;
        }
      }
    }

    // Directionality Check: check if the first drawn points are near the start of the stroke
    const startGuide = { x: (pts[0].x / 100) * canvasW, y: (pts[0].y / 100) * canvasH };
    const distToStart = Math.hypot(drawnPoints[0].x - startGuide.x, drawnPoints[0].y - startGuide.y);
    const correctStartBonus = distToStart < canvasW * 0.15 ? 10 : -10;

    const rawCoverage = (hitPoints / Math.max(1, totalSamples)) * 100;
    const finalScore = Math.min(100, Math.max(30, Math.round(rawCoverage + correctStartBonus)));

    setAccuracyScore(finalScore);

    if (finalScore >= 80) {
      setFeedbackMessage('अद्भुत! स्ट्रोक शुद्ध और सटीक है। ⭐⭐⭐');
      speechBridge.speak(selectedGlyph.char, selectedGlyph.language === 'Ho' ? 'hoc' : 'sat');

      // Progress to next stroke if available
      if (activeStrokeIdx < selectedGlyph.strokes.length - 1) {
        setTimeout(() => {
          setActiveStrokeIdx(prev => prev + 1);
          setFeedbackMessage(`बहुत अच्छा! अब स्ट्रोक ${activeStrokeIdx + 2} का अभ्यास करें।`);
        }, 1200);
      }
    } else if (finalScore >= 60) {
      setFeedbackMessage('अच्छा प्रयास! स्ट्रोक को थोड़ा और रेखा के समीप रखें। ⭐⭐');
    } else {
      setFeedbackMessage('स्ट्रोक बाण की दिशा से विचलित हुआ। पुनः प्रयास करें। ⭐');
    }
  };

  // Multi-Stroke AI Demonstration with Glowing Particle Pen
  const handleDemonstration = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (demoAnimationFrameRef.current) {
      cancelAnimationFrame(demoAnimationFrameRef.current);
    }

    setIsDemonstrating(true);
    drawBackground();
    setFeedbackMessage('AI शिक्षक प्रदर्शन सक्रिय: स्ट्रोक अनुक्रम व दिशा ध्यान से देखें...');

    const allStrokes = selectedGlyph.strokes;
    let strokeIdx = 0;
    let segmentIndex = 0;
    let progress = 0;
    const speed = 0.034;

    const animate = () => {
      if (strokeIdx >= allStrokes.length) {
        setIsDemonstrating(false);
        setFeedbackMessage('AI प्रदर्शन पूर्ण हुआ! अब आप स्वयं अक्षर पर अनुरेखण करें।');
        speechBridge.speak(selectedGlyph.char, selectedGlyph.language === 'Ho' ? 'hoc' : 'sat');
        return;
      }

      const currentStroke = allStrokes[strokeIdx];
      const pts = currentStroke.points;

      if (segmentIndex >= pts.length - 1) {
        strokeIdx++;
        segmentIndex = 0;
        progress = 0;
        demoAnimationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      const p1 = pts[segmentIndex];
      const p2 = pts[segmentIndex + 1];

      const x1 = (p1.x / 100) * canvas.width;
      const y1 = (p1.y / 100) * canvas.height;
      const x2 = (p2.x / 100) * canvas.width;
      const y2 = (p2.y / 100) * canvas.height;

      const curX = x1 + progress * (x2 - x1);
      const curY = y1 + progress * (y2 - y1);

      // Draw glowing animated demo ink
      ctx.save();
      ctx.shadowBlur = 14;
      ctx.shadowColor = '#10B981';
      ctx.beginPath();
      ctx.arc(curX, curY, brushSize / 2, 0, Math.PI * 2);
      ctx.fillStyle = '#10B981';
      ctx.fill();
      ctx.restore();

      progress += speed;
      if (progress >= 1) {
        progress = 0;
        segmentIndex++;
      }

      demoAnimationFrameRef.current = requestAnimationFrame(animate);
    };

    demoAnimationFrameRef.current = requestAnimationFrame(animate);
  };

  return (
    <div>
      {/* Header Banner */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.6rem' }}>✍️</span>
            <h1 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--color-primary)', margin: 0 }}>
              अक्षर सेतु (Akshar Setu): उच्च-परिशुद्धता लिपि अनुरेखण (Precision Script Tracing)
            </h1>
          </div>
          <span className="badge badge-primary">FLN बुनियादी मातृभाषा लिपि अधिगम</span>
        </div>
        <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
          संथाली ओल चिकी एवं हो वारंग चिति अक्षरों को बहु-चरणीय स्ट्रोक दिशा, परिशुद्ध वेक्टर मिलान एवं AI प्रदर्शन के साथ सीखें।
        </p>
      </div>

      {/* Alphabet Reference Grid & Script Filter Card */}
      <div className="card" style={{ marginBottom: '20px', padding: '16px', background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.2rem' }}>🔤</span>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-text)' }}>
              जनजातीय वर्णमाला संदर्भ पत्रक (Clickable Alphabet Reference Cards)
            </span>
          </div>

          {/* Script Filter Tabs */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {[
              { id: 'ALL', label: 'सभी लिपियाँ' },
              { id: 'Ol Chiki', label: 'संथाली ओल चिकी' },
              { id: 'Warang Chiti', label: 'हो वारंग चिति' },
              { id: 'Devanagari', label: 'देवनागरी (मुंडारी/कुड़ुख़)' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setScriptFilter(tab.id as any)}
                className={`btn ${scriptFilter === tab.id ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '4px 10px', fontSize: '0.76rem' }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Clickable Alphabet Tiles */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '10px' }}>
          {INDIGENOUS_GLYPHS.filter(g => scriptFilter === 'ALL' || g.script.toLowerCase().includes(scriptFilter.toLowerCase())).map(g => {
            const isCurrent = selectedGlyph.id === g.id;
            return (
              <div
                key={g.id}
                onClick={() => {
                  setSelectedGlyph(g);
                  setActiveStrokeIdx(0);
                }}
                style={{
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-md)',
                  border: isCurrent ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                  background: isCurrent ? 'var(--color-primary-subtle)' : 'var(--color-bg)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: isCurrent ? 'var(--color-primary)' : 'var(--color-text)', lineHeight: 1 }}>
                  {g.char}
                </div>
                <div style={{ overflow: 'hidden' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-text)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                    {g.name.split('(')[0]}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                    {g.strokes.length} स्ट्रोक • {g.phoneticSound}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid-2" style={{ gap: '20px' }}>
        {/* Interactive Tracing Canvas Area */}
        <div className="card" style={{ padding: '16px', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-text)' }}>
                {selectedGlyph.name} ({selectedGlyph.script})
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                स्ट्रोक {activeStrokeIdx + 1} of {selectedGlyph.strokes.length}: {selectedGlyph.strokes[activeStrokeIdx]?.nameHi || 'पूर्ण स्ट्रोक'}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                onClick={handleDemonstration}
                disabled={isDemonstrating}
                className="btn btn-secondary"
                style={{ padding: '6px 10px', fontSize: '0.78rem', color: '#2563EB' }}
                title="AI प्रदर्शन देखें"
              >
                <Play size={14} />
                <span>प्रदर्शन (AI Demo)</span>
              </button>
              <button
                onClick={() => speechBridge.speak(selectedGlyph.char, selectedGlyph.language === 'Ho' ? 'hoc' : 'sat')}
                className="btn btn-secondary"
                style={{ padding: '6px 10px', fontSize: '0.78rem' }}
                title="ध्वनि सुनें"
              >
                <Volume2 size={14} />
                <span>उच्चारण</span>
              </button>
              <button
                onClick={handleClear}
                className="btn btn-secondary"
                style={{ padding: '6px 10px', fontSize: '0.78rem' }}
                title="मिटाएँ"
              >
                <RotateCcw size={14} />
                <span>साफ़ करें</span>
              </button>
            </div>
          </div>

          {/* Canvas Wrapper */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '460px',
              margin: '0 auto',
              aspectRatio: '1/1',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-md)',
              border: '2px solid var(--color-border)',
              touchAction: 'none'
            }}
          >
            <canvas
              ref={canvasRef}
              width={460}
              height={460}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              style={{
                width: '100%',
                height: '100%',
                display: 'block',
                cursor: 'crosshair'
              }}
            />
          </div>

          {/* Canvas Toolbar Controls */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '14px', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>स्याही रंग:</span>
              {['#10B981', '#3B82F6', '#F59E0B', '#EC4899'].map(c => (
                <button
                  key={c}
                  onClick={() => setStrokeColor(c)}
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: c,
                    border: strokeColor === c ? '2px solid var(--color-text)' : 'none',
                    cursor: 'pointer'
                  }}
                />
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--color-text-muted)', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={showGuidelines}
                  onChange={e => setShowGuidelines(e.target.checked)}
                />
                मार्गदर्शिका
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--color-text-muted)', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={showDirectionArrows}
                  onChange={e => setShowDirectionArrows(e.target.checked)}
                />
                दिशा बाण
              </label>
            </div>
          </div>
        </div>

        {/* Real-Time Precision Metrics & Feedback Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Real-time Accuracy Speedometer Dial */}
          <div className="card" style={{ padding: '18px', textAlign: 'center', background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                वेक्टर परिशुद्धता मीटर (Vector Precision Gauge)
              </span>
              <span style={{ fontSize: '0.78rem', color: accuracyScore && accuracyScore >= 80 ? '#10B981' : 'var(--color-text-muted)' }}>
                {accuracyScore !== null ? `${accuracyScore}% सटीकता` : 'चित्रण प्रतीक्षारत'}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '14px 0' }}>
              <div style={{ position: 'relative', width: '130px', height: '130px' }}>
                <svg width="130" height="130" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="var(--color-border)" strokeWidth="10" />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke={
                      accuracyScore === null
                        ? 'transparent'
                        : accuracyScore >= 80
                        ? '#10B981'
                        : accuracyScore >= 60
                        ? '#F59E0B'
                        : '#EF4444'
                    }
                    strokeWidth="10"
                    strokeDasharray={264}
                    strokeDashoffset={accuracyScore === null ? 264 : 264 - (264 * accuracyScore) / 100}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                    style={{ transition: 'stroke-dashoffset 400ms ease' }}
                  />
                </svg>
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text)' }}>
                    {accuracyScore !== null ? `${accuracyScore}%` : '--'}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)', marginTop: '-2px' }}>
                    सटीकता
                  </div>
                </div>
              </div>
            </div>

            {/* Stars Rating */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', fontSize: '1.4rem' }}>
              <span style={{ color: accuracyScore && accuracyScore >= 50 ? '#F59E0B' : '#94A3B8' }}>★</span>
              <span style={{ color: accuracyScore && accuracyScore >= 75 ? '#F59E0B' : '#94A3B8' }}>★</span>
              <span style={{ color: accuracyScore && accuracyScore >= 90 ? '#F59E0B' : '#94A3B8' }}>★</span>
            </div>

            <div
              style={{
                marginTop: '10px',
                padding: '8px 12px',
                background: 'var(--color-bg)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.84rem',
                fontWeight: 600,
                color: 'var(--color-text)'
              }}
            >
              {feedbackMessage}
            </div>
          </div>

          {/* Cultural Etymology & Pedagogy Card */}
          <div className="card" style={{ padding: '16px', background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '8px' }}>
              <Info size={16} />
              <span>सांस्कृतिक व्युत्पत्ति एवं अर्थ (Etymology & Meaning)</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text)', lineHeight: 1.5, margin: '0 0 10px 0' }}>
              {selectedGlyph.culturalMeaningHi}
            </p>
            <div style={{ padding: '8px 12px', background: 'var(--color-bg)', borderRadius: 'var(--radius-sm)', fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
              💡 <strong>शिक्षक टिप:</strong> {selectedGlyph.strokeHint}
            </div>
          </div>

          {/* Stroke Sequence Progression */}
          <div className="card" style={{ padding: '16px', background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>
              स्ट्रोक क्रम (Stroke Order Steps):
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {selectedGlyph.strokes.map((s, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveStrokeIdx(idx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    background: activeStrokeIdx === idx ? 'var(--color-primary-subtle)' : 'transparent',
                    border: activeStrokeIdx === idx ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
                    cursor: 'pointer',
                    transition: 'all 150ms'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      style={{
                        width: '22px',
                        height: '22px',
                        borderRadius: '50%',
                        background: activeStrokeIdx === idx ? 'var(--color-primary)' : 'var(--color-border)',
                        color: activeStrokeIdx === idx ? '#FFFFFF' : 'var(--color-text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.72rem',
                        fontWeight: 700
                      }}
                    >
                      {s.strokeIndex}
                    </span>
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text)' }}>
                      {s.nameHi}
                    </span>
                  </div>
                  {activeStrokeIdx === idx && (
                    <span style={{ fontSize: '0.72rem', color: 'var(--color-primary)', fontWeight: 700 }}>सक्रिय ✓</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
