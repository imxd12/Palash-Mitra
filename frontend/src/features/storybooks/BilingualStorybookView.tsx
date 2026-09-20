import React, { useState, useEffect } from 'react';
import { useApp } from '../../core/context/AppContext';
import { speechBridge } from '../../core/speech/speechBridge';
import { VernacularText } from '../../components/OlChikiText';
import { FOLKLORE_STORIES, FolkloreStory, StoryScene } from './folkloreStoriesData';
import {
  BookOpen,
  Volume2,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Sparkles,
  Award,
  Clock,
  Filter,
  CheckCircle2,
  BookMarked
} from 'lucide-react';

export const BilingualStorybookView: React.FC = () => {
  const { targetLanguage, targetLanguageName, targetScript, speechSpeed } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentStoryIndex, setCurrentStoryIndex] = useState<number>(0);
  const [currentSceneIndex, setCurrentSceneIndex] = useState<number>(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [highlightedWordIndex, setHighlightedWordIndex] = useState<number>(-1);

  // Filter stories by category
  const filteredStories = selectedCategory === 'all'
    ? FOLKLORE_STORIES
    : FOLKLORE_STORIES.filter(s => s.category === selectedCategory);

  const activeStory: FolkloreStory = filteredStories[currentStoryIndex] || filteredStories[0] || FOLKLORE_STORIES[0];
  const activeScene: StoryScene = activeStory.scenes[currentSceneIndex] || activeStory.scenes[0];

  // Resolve target text for active language
  const targetScriptText = activeScene.targetScriptMap[targetLanguage] ||
    activeScene.targetScriptMap['sat'] ||
    activeScene.hindiText;

  const targetLatinText = activeScene.targetLatinMap[targetLanguage] ||
    activeScene.targetLatinMap['sat'] ||
    '';

  // Audio narration with simulated word-by-word karaoke highlight
  const handlePlayAudio = async () => {
    if (isPlayingAudio) return;
    setIsPlayingAudio(true);

    const words = targetScriptText.split(' ');
    const totalDurationMs = words.length * (speechSpeed === 'slow' ? 480 : 340);
    const intervalMs = totalDurationMs / Math.max(1, words.length);

    let currentW = 0;
    const interval = setInterval(() => {
      setHighlightedWordIndex(currentW);
      currentW++;
      if (currentW >= words.length) {
        clearInterval(interval);
      }
    }, intervalMs);

    await speechBridge.speak(targetScriptText, targetLanguage, speechSpeed === 'slow');

    clearInterval(interval);
    setHighlightedWordIndex(-1);
    setIsPlayingAudio(false);
  };

  const handleNextScene = () => {
    if (currentSceneIndex < activeStory.scenes.length - 1) {
      setCurrentSceneIndex(prev => prev + 1);
      setHighlightedWordIndex(-1);
    } else if (currentStoryIndex < filteredStories.length - 1) {
      setCurrentStoryIndex(prev => prev + 1);
      setCurrentSceneIndex(0);
      setHighlightedWordIndex(-1);
    }
  };

  const handlePrevScene = () => {
    if (currentSceneIndex > 0) {
      setCurrentSceneIndex(prev => prev - 1);
      setHighlightedWordIndex(-1);
    }
  };

  return (
    <div>
      {/* Header Banner */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.6rem' }}>📖</span>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-primary)', margin: 0 }}>
              पलाश बाल कथा: सचित्र द्विभाषी लोककथाएँ (Illustrated Folklore Stories)
            </h1>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
            झारखंड के वनों, पर्वों, वीरों एवं पशु-पक्षियों की २० लोककथाएँ — कराओके ऑडियो व {targetLanguageName} अनुवाद सहित।
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="badge badge-primary">
            <BookMarked size={14} />
            <span>कुल २० पूर्ण कथाएँ उपलब्ध</span>
          </span>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '16px', scrollbarWidth: 'none' }}>
        {[
          { id: 'all', label: 'सभी कथाएँ (All 20 Stories)' },
          { id: 'nature', label: '🌿 प्रकृति व वन (Nature)' },
          { id: 'heroes', label: '🏹 वीर गाथाएँ (Heroes)' },
          { id: 'festivals', label: '🌺 पर्व व त्योहार (Festivals)' },
          { id: 'fables', label: '🦊 नीति कथाएँ (Fables)' }
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => {
              setSelectedCategory(cat.id);
              setCurrentStoryIndex(0);
              setCurrentSceneIndex(0);
            }}
            className={`btn ${selectedCategory === cat.id ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '6px 14px', fontSize: '0.82rem', whiteSpace: 'nowrap' }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Story Selector Cards Carousel */}
      <div className="card" style={{ marginBottom: '20px', padding: '12px 16px', background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
            कथा सूची ({filteredStories.length} कथाएँ उपलब्ध):
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: 600 }}>
            कथा {currentStoryIndex + 1} of {filteredStories.length}
          </span>
        </div>

        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '6px', scrollbarWidth: 'thin' }}>
          {filteredStories.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => {
                setCurrentStoryIndex(idx);
                setCurrentSceneIndex(0);
                setHighlightedWordIndex(-1);
              }}
              className={`btn ${currentStoryIndex === idx ? 'btn-primary' : 'btn-secondary'}`}
              style={{
                padding: '8px 14px',
                textAlign: 'left',
                minWidth: '200px',
                borderRadius: 'var(--radius-md)',
                border: currentStoryIndex === idx ? '2px solid var(--color-primary)' : '1px solid var(--color-border)'
              }}
            >
              <div style={{ fontSize: '0.7rem', opacity: 0.85, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={11} />
                <span>{s.estimatedDurationMin} मिनट • {s.categoryNameHi}</span>
              </div>
              <div style={{ fontSize: '0.86rem', fontWeight: 700, marginTop: '3px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {s.titleHi}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Story Scene Display */}
      <div className="card" style={{ padding: '24px', background: 'var(--color-surface)', border: '2px solid var(--color-primary-subtle)', marginBottom: '20px' }}>
        {/* Story Title & Scene Progress Indicator */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', flexWrap: 'wrap', gap: '10px', borderBottom: '1px solid var(--color-border)', paddingBottom: '12px' }}>
          <div>
            <div style={{ fontSize: '0.78rem', color: 'var(--color-accent)', fontWeight: 700, textTransform: 'uppercase' }}>
              {activeStory.categoryNameHi} • {activeStory.estimatedDurationMin} मिनट कथा
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-text)', margin: '4px 0 0 0' }}>
              {activeStory.titleHi}
            </h2>
          </div>

          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            {activeStory.scenes.map((_, sIdx) => (
              <button
                key={sIdx}
                onClick={() => {
                  setCurrentSceneIndex(sIdx);
                  setHighlightedWordIndex(-1);
                }}
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: currentSceneIndex === sIdx ? 'var(--color-primary)' : 'var(--color-bg)',
                  color: currentSceneIndex === sIdx ? '#FFFFFF' : 'var(--color-text)',
                  border: '1px solid var(--color-border)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {sIdx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Scene Illustration Box */}
        <div
          style={{
            height: '140px',
            background: 'var(--color-bg)',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3.8rem',
            letterSpacing: '14px',
            marginBottom: '20px',
            border: '1px solid var(--color-border)'
          }}
        >
          {activeScene.imageEmoji}
        </div>

        {/* Dual Language Narration Cards */}
        <div className="grid-2" style={{ gap: '16px', marginBottom: '20px' }}>
          {/* Hindi Scene Text */}
          <div style={{ padding: '16px', borderRadius: 'var(--radius-md)', background: 'var(--color-bg)', border: '1px solid var(--color-border)' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
              हिन्दी मूल कथा (Hindi)
            </span>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--color-text)', marginTop: '8px', fontWeight: 500 }}>
              "{activeScene.hindiText}"
            </p>
          </div>

          {/* Vernacular Language Scene Text with Karaoke Highlight */}
          <div style={{ padding: '16px', borderRadius: 'var(--radius-md)', background: 'var(--color-surface)', border: '2px solid var(--color-primary-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase' }}>
                {targetLanguageName} ({targetScript} Script)
              </span>
              <button
                onClick={handlePlayAudio}
                disabled={isPlayingAudio}
                className="btn btn-primary"
                style={{ padding: '5px 12px', fontSize: '0.8rem' }}
              >
                <Volume2 size={15} />
                <span>{isPlayingAudio ? 'सुनाया जा रहा है...' : 'बोलकर सुनाएं (Read Aloud)'}</span>
              </button>
            </div>

            {/* Karaoke Word-by-Word Rendering */}
            <div style={{ fontSize: '1.2rem', lineHeight: 1.7, color: 'var(--color-text)', marginTop: '8px' }}>
              {targetScriptText.split(' ').map((word, wIdx) => (
                <span
                  key={wIdx}
                  style={{
                    display: 'inline-block',
                    marginRight: '6px',
                    padding: '2px 4px',
                    borderRadius: 'var(--radius-sm)',
                    background: highlightedWordIndex === wIdx ? '#10B981' : 'transparent',
                    color: highlightedWordIndex === wIdx ? '#FFFFFF' : 'inherit',
                    transition: 'all 120ms'
                  }}
                >
                  {word}
                </span>
              ))}
            </div>

            {targetLatinText && (
              <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginTop: '8px', fontStyle: 'italic' }}>
                {targetLatinText}
              </div>
            )}
          </div>
        </div>

        {/* Vocabulary Chips in Scene */}
        {activeScene.keyWords.length > 0 && (
          <div style={{ marginBottom: '18px', padding: '12px 16px', background: 'var(--color-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginRight: '10px' }}>
              दृश्य शब्दावली (Key Scene Vocabulary):
            </span>
            <div style={{ display: 'inline-flex', gap: '8px', flexWrap: 'wrap', marginTop: '4px' }}>
              {activeScene.keyWords.map((kw, kIdx) => (
                <span
                  key={kIdx}
                  onClick={() => speechBridge.speak(kw.wordTarget, targetLanguage)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-primary)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    color: 'var(--color-text)'
                  }}
                  title="क्लिक करके उच्चारण सुनें"
                >
                  {kw.wordHi} = <strong>{kw.wordTarget}</strong> 🔊
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Moral Lesson Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--color-border)', paddingTop: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', maxWidth: '600px' }}>
            <Award size={18} color="var(--color-accent)" />
            <div style={{ fontSize: '0.86rem', color: 'var(--color-text)', fontWeight: 600 }}>
              💡 <strong>कथा की सीख (Moral):</strong> {activeStory.moralHi}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handlePrevScene}
              disabled={currentSceneIndex === 0}
              className="btn btn-secondary"
              style={{ padding: '8px 14px', fontSize: '0.82rem' }}
            >
              <ChevronLeft size={16} />
              <span>पिछला दृश्य</span>
            </button>
            <button
              onClick={handleNextScene}
              className="btn btn-primary"
              style={{ padding: '8px 16px', fontSize: '0.82rem' }}
            >
              <span>{currentSceneIndex === activeStory.scenes.length - 1 ? 'अगली कथा' : 'अगला दृश्य'}</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
