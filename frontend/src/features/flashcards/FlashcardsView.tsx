import React, { useState } from 'react';
import { useApp } from '../../core/context/AppContext';
import { speechBridge } from '../../core/speech/speechBridge';
import { OlChikiText } from '../../components/OlChikiText';
import { Volume2, ChevronLeft, ChevronRight, RotateCw, Sparkles, Layers } from 'lucide-react';

interface Flashcard {
  id: string;
  category: string;
  hindi: string;
  targetScript: string;
  targetLatin: string;
  phonetic: string;
  meaning: string;
  exampleHi: string;
  exampleTarget: string;
  emoji: string;
}

export const FlashcardsView: React.FC = () => {
  const {
    targetLanguage,
    targetLanguageName,
    targetScript,
    selectedGrade,
    selectedSubject,
    speechSpeed
  } = useApp();

  const getLanguageCards = (lang: string): Flashcard[] => {
    if (lang === 'hoc') {
      return [
        {
          id: 'c1_ho',
          category: 'MATHEMATICS',
          hindi: 'भिन्न (Fraction)',
          targetScript: 'ᱦᱟᱹᱴᱤᱧ (𑢹𑣉)',
          targetLatin: 'Hating',
          phonetic: '/ha.tiŋ/',
          meaning: 'पूरी वस्तु का एक बराबर भाग',
          exampleHi: 'यह एक समान भिन्न है।',
          exampleTarget: 'ᱱᱮᱭᱟ ᱫᱚ ᱥᱚᱢᱟᱱ ᱦᱟᱹᱴᱤᱧ ᱛᱟᱱᱟ᱾',
          emoji: '🍕'
        },
        {
          id: 'c2_ho',
          category: 'MATHEMATICS',
          hindi: 'आधा (Half - 1/2)',
          targetScript: 'ᱛᱟᱞᱟ (Tala)',
          targetLatin: 'Tala',
          phonetic: '/ta.la/',
          meaning: 'दो बराबर भागों में से एक भाग',
          exampleHi: 'एक रोटी का आधा हिस्सा।',
          exampleTarget: 'ᱢᱤ ᱨᱩᱴᱤ ᱨᱮᱭᱟᱜ ᱛᱟᱞᱟ ᱦᱟᱹᱴᱤᱧ᱾',
          emoji: '🌗'
        },
        {
          id: 'c3_ho',
          category: 'SCIENCE',
          hindi: 'पेड़ / पौधा (Tree/Plant)',
          targetScript: 'ᱫᱟᱨᱩ (Daru)',
          targetLatin: 'Daru',
          phonetic: '/da.ru/',
          meaning: 'वनस्पति या वृक्ष',
          exampleHi: 'पेड़ हमें छाया और फल देते हैं।',
          exampleTarget: 'ᱫᱟᱨᱩ ᱟᱵᱩᱠᱮ ᱩᱢᱩᱞ ᱟᱨ ᱡᱚ ᱮᱢᱚᱜ-ᱟ᱾',
          emoji: '🌱'
        },
        {
          id: 'c4_ho',
          category: 'SCIENCE',
          hindi: 'पत्ता (Leaf)',
          targetScript: 'ᱥᱟᱠᱟᱢ (Sakam)',
          targetLatin: 'Sakam',
          phonetic: '/sa.kam/',
          meaning: 'पौधे का हरा अंग',
          exampleHi: 'पत्ता धूप में खाना बनाता है।',
          exampleTarget: 'ᱥᱟᱠᱟᱢ ᱥᱤᱧ ᱪᱟᱸᱫᱚ ᱨᱮ ᱡᱚᱢᱟᱜ ᱮ ᱵᱟᱭ-ᱟ᱾',
          emoji: '🍃'
        },
        {
          id: 'c5_ho',
          category: 'CLASSROOM',
          hindi: 'नमस्ते (Greetings)',
          targetScript: 'ᱡᱚᱦᱟᱨ (Johar)',
          targetLatin: 'Johar',
          phonetic: '/dʒo.har/',
          meaning: 'हो समुदाय का सम्मानजनक अभिवादन',
          exampleHi: 'सभी शिक्षकों और साथियों को जोहार।',
          exampleTarget: 'ᱡᱚᱛᱚ ᱢᱟᱪᱮᱛ ᱟᱨ ᱜᱟᱛᱮ ᱠᱚ ᱡᱚᱦᱟᱨ᱾',
          emoji: '🙏'
        }
      ];
    } else if (lang === 'unr') {
      return [
        {
          id: 'c1_unr',
          category: 'MATHEMATICS',
          hindi: 'भिन्न (Fraction)',
          targetScript: 'ᱦᱟᱹᱴᱤᱧ',
          targetLatin: 'Hating',
          phonetic: '/ha.tiɲ/',
          meaning: 'समान भाग में बांटना',
          exampleHi: 'चीज़ों को बराबर बांटना भिन्न कहलाता है।',
          exampleTarget: 'ᱡᱤᱱᱤᱥ ᱥᱚᱢᱟᱱ ᱦᱟᱹᱴᱤᱧ ᱜᱮ ᱦᱟᱹᱴᱤᱧ ᱛᱟᱱᱟ᱾',
          emoji: '🍕'
        },
        {
          id: 'c2_unr',
          category: 'MATHEMATICS',
          hindi: 'आधा (Half)',
          targetScript: 'ᱛᱟᱞᱟ (Tala)',
          targetLatin: 'Tala',
          phonetic: '/ta.la/',
          meaning: 'दो बराबर टुकड़ों में से एक',
          exampleHi: 'एक अमरुद का आधा हिस्सा।',
          exampleTarget: 'ᱢᱤᱫᱴᱟᱝ ᱡᱟᱹᱱᱩᱢ ᱨᱮᱭᱟᱜ ᱛᱟᱞᱟ ᱦᱟᱹᱴᱤᱧ᱾',
          emoji: '🌗'
        },
        {
          id: 'c3_unr',
          category: 'SCIENCE',
          hindi: 'पेड़ (Tree)',
          targetScript: 'ᱫᱟᱨᱩ (Daru)',
          targetLatin: 'Daru',
          phonetic: '/da.ru/',
          meaning: 'वृक्ष या पादप',
          exampleHi: 'पेड़ गाँव के रक्षक हैं।',
          exampleTarget: 'ᱫᱟᱨᱩ ᱦᱟᱛᱩ ᱨᱮᱭᱟᱜ ᱡᱤᱣᱤ ᱛᱟᱱᱟ᱾',
          emoji: '🌱'
        },
        {
          id: 'c4_unr',
          category: 'SCIENCE',
          hindi: 'जड़ (Root)',
          targetScript: 'ᱨᱮᱦᱮᱫ (Rehed)',
          targetLatin: 'Rehed',
          phonetic: '/re.hed/',
          meaning: 'पौधे का भूमिगत भाग जो पानी खींचता है',
          exampleHi: 'जड़ जमीन से पानी सोखती है।',
          exampleTarget: 'ᱨᱮᱦᱮᱫ ᱦᱟᱥᱟ ᱠᱷᱚᱱ ᱫᱟᱜ ᱮ ᱚᱨ-ᱟ᱾',
          emoji: '🪴'
        },
        {
          id: 'c5_unr',
          category: 'CLASSROOM',
          hindi: 'नमस्ते (Greetings)',
          targetScript: 'ᱡᱚᱦᱟᱨ',
          targetLatin: 'Johar',
          phonetic: '/dʒo.har/',
          meaning: 'मुंडारी पारंपरिक अभिवादन',
          exampleHi: 'सभी गुरुजनों को सादर जोहार।',
          exampleTarget: 'ᱡᱚᱛᱚ ᱢᱟᱪᱮᱛ ᱠᱚ ᱡᱚᱦᱟᱨ᱾',
          emoji: '🙏'
        }
      ];
    } else if (lang === 'en') {
      return [
        {
          id: 'c1_en',
          category: 'MATHEMATICS',
          hindi: 'भिन्न (Fraction)',
          targetScript: 'Fraction (1/2, 1/4)',
          targetLatin: 'Fraction',
          phonetic: '/ˈfræk.ʃən/',
          meaning: 'Equal numerical part of a whole unit',
          exampleHi: '1 अमरूद को 2 बच्चों में बांटना।',
          exampleTarget: 'A fraction denotes equal parts of a whole object.',
          emoji: '🍕'
        },
        {
          id: 'c2_en',
          category: 'MATHEMATICS',
          hindi: 'आधा (Half)',
          targetScript: 'Half (1/2)',
          targetLatin: 'Half',
          phonetic: '/hɑːf/',
          meaning: 'One of two equal parts',
          exampleHi: 'आधा हिस्सा।',
          exampleTarget: 'One half equals fifty percent of the total.',
          emoji: '🌗'
        },
        {
          id: 'c3_en',
          category: 'SCIENCE',
          hindi: 'पौधा (Plant)',
          targetScript: 'Plant / Flora',
          targetLatin: 'Plant',
          phonetic: '/plɑːnt/',
          meaning: 'Living organism absorbing water and sunlight',
          exampleHi: 'पौधे प्रकृति के मित्र हैं।',
          exampleTarget: 'Green plants synthesize food through photosynthesis.',
          emoji: '🌱'
        },
        {
          id: 'c4_en',
          category: 'SCIENCE',
          hindi: 'जड़ (Root)',
          targetScript: 'Root System',
          targetLatin: 'Root',
          phonetic: '/ruːt/',
          meaning: 'Underground anchor that draws moisture',
          exampleHi: 'जड़ पानी सोखती है।',
          exampleTarget: 'Roots anchor the tree firmly in the ground.',
          emoji: '🪴'
        },
        {
          id: 'c5_en',
          category: 'CLASSROOM',
          hindi: 'नमस्ते (Greetings)',
          targetScript: 'Greetings / Johar',
          targetLatin: 'Johar',
          phonetic: '/ˈɡriː.tɪŋz/',
          meaning: 'Respectful indigenous salute',
          exampleHi: 'सभी को जोहार।',
          exampleTarget: 'Johar to our respected teachers and peers.',
          emoji: '🙏'
        }
      ];
    } else if (lang === 'hi') {
      return [
        {
          id: 'c1_hi',
          category: 'MATHEMATICS',
          hindi: 'भिन्न (Fraction)',
          targetScript: 'भिन्न (Fraction)',
          targetLatin: 'Bhinn',
          phonetic: '/bʱɪn/',
          meaning: 'किसी पूरी वस्तु का बराबर भाग',
          exampleHi: 'यह एक समान भिन्न है।',
          exampleTarget: 'चीज़ों को बराबर बांटना भिन्न कहलाता है।',
          emoji: '🍕'
        },
        {
          id: 'c2_hi',
          category: 'MATHEMATICS',
          hindi: 'आधा (Half - 1/2)',
          targetScript: 'आधा (1/2)',
          targetLatin: 'Aadha',
          phonetic: '/aː.dʱaː/',
          meaning: 'दो बराबर भागों में से एक भाग',
          exampleHi: 'एक रोटी का आधा हिस्सा।',
          exampleTarget: 'एक रोटी के दो बराबर हिस्से 1/2 कहलाते हैं।',
          emoji: '🌗'
        },
        {
          id: 'c3_hi',
          category: 'MATHEMATICS',
          hindi: 'अंश (Numerator)',
          targetScript: 'अंश (Numerator)',
          targetLatin: 'Ansh',
          phonetic: '/ə̃ʃ/',
          meaning: 'भिन्न में ऊपर की संख्या जो लिए गए भागों को दर्शाती है',
          exampleHi: '3/4 में 3 अंश है।',
          exampleTarget: 'भिन्न में ऊपर की संख्या को अंश कहते हैं।',
          emoji: '🔺'
        },
        {
          id: 'c4_hi',
          category: 'SCIENCE',
          hindi: 'पेड़ / वृक्ष (Tree)',
          targetScript: 'पेड़ / वृक्ष',
          targetLatin: 'Ped',
          phonetic: '/peːɽ/',
          meaning: 'वनस्पति या पादप जो छाया और फल देते हैं',
          exampleHi: 'पेड़ हमारे सच्चे मित्र हैं।',
          exampleTarget: 'पेड़ हवा को शुद्ध करते हैं और वर्षा लाते हैं।',
          emoji: '🌱'
        },
        {
          id: 'c5_hi',
          category: 'SCIENCE',
          hindi: 'जड़ (Root)',
          targetScript: 'जड़ (Root)',
          targetLatin: 'Jad',
          phonetic: '/dʒəɽ/',
          meaning: 'पौधे का भूमिगत भाग जो पानी और खनिज सोखता है',
          exampleHi: 'जड़ जमीन से पानी सोखती है।',
          exampleTarget: 'जड़ें मिट्टी को मजबूती से जकड़े रखती हैं।',
          emoji: '🪴'
        },
        {
          id: 'c6_hi',
          category: 'CLASSROOM',
          hindi: 'नमस्ते / जोहार (Greetings)',
          targetScript: 'नमस्ते / जोहार',
          targetLatin: 'Namaste / Johar',
          phonetic: '/nə.məs.teː/',
          meaning: 'आदरपूर्ण पारंपरिक अभिवादन',
          exampleHi: 'सभी गुरुजनों को सादर प्रणाम।',
          exampleTarget: 'सभी शिक्षकों और सहपाठियों को सादर जोहार।',
          emoji: '🙏'
        }
      ];
    }

    // Default: Santhali (Ol Chiki)
    return [
      {
        id: 'c1_sat',
        category: 'MATHEMATICS',
        hindi: 'भिन्न (Fraction)',
        targetScript: 'ᱦᱟᱹᱴᱤᱧ',
        targetLatin: 'Hāṭiñ',
        phonetic: '/ha.ʈiɲ/',
        meaning: 'पूरी वस्तु का एक समान भाग',
        exampleHi: 'यह एक समान भिन्न है।',
        exampleTarget: 'ᱱᱚᱣᱟ ᱫᱚ ᱥᱚᱢᱟᱱ ᱦᱟᱹᱴᱤᱧ ᱠᱟᱱᱟ᱾',
        emoji: '🍕'
      },
      {
        id: 'c2_sat',
        category: 'MATHEMATICS',
        hindi: 'आधा (Half - 1/2)',
        targetScript: 'ᱛᱟᱞᱟ / ᱟᱫᱷᱟ',
        targetLatin: 'Tala / Adha',
        phonetic: '/ta.la/',
        meaning: 'दो बराबर भागों में से एक भाग',
        exampleHi: 'एक रोटी का आधा हिस्सा।',
        exampleTarget: 'ᱢᱤᱫᱴᱟᱝ ᱨᱩᱴᱤ ᱨᱮᱭᱟᱜ ᱛᱟᱞᱟ ᱦᱟᱹᱴᱤᱧ᱾',
        emoji: '🌗'
      },
      {
        id: 'c3_sat',
        category: 'MATHEMATICS',
        hindi: 'जोड़ (Addition)',
        targetScript: 'ᱥᱮᱞᱮᱫ',
        targetLatin: 'Seled',
        phonetic: '/se.led/',
        meaning: 'संख्याओं को एकत्र करना',
        exampleHi: 'दो और तीन को जोड़ें।',
        exampleTarget: 'ᱵᱟᱨ ᱟᱨ ᱯᱮ ᱥᱮᱞᱮᱫ ᱢᱮ᱾',
        emoji: '➕'
      },
      {
        id: 'c4_sat',
        category: 'SCIENCE',
        hindi: 'पौधा (Plant)',
        targetScript: 'ᱫᱟᱨᱮ',
        targetLatin: 'Dare',
        phonetic: '/da.re/',
        meaning: 'छोटा पादप या वृक्ष',
        exampleHi: 'पेड़ हमें छाया देते हैं।',
        exampleTarget: 'ᱫᱟᱨᱮ ᱫᱚ ᱩᱢᱩᱞ ᱮ ᱮᱢᱟᱵᱚᱱᱟ᱾',
        emoji: '🌱'
      },
      {
        id: 'c5_sat',
        category: 'SCIENCE',
        hindi: 'पत्ता (Leaf)',
        targetScript: 'ᱥᱟᱠᱟᱢ',
        targetLatin: 'Sakam',
        phonetic: '/sa.kam/',
        meaning: 'पौधे का हरा भाग',
        exampleHi: 'पत्ता हरा होता है।',
        exampleTarget: 'ᱥᱟᱠᱟᱢ ᱫᱚ ᱦᱟᱹᱨᱤᱭᱟᱹᱲ ᱜᱮᱭᱟ᱾',
        emoji: '🍃'
      },
      {
        id: 'c6_sat',
        category: 'CLASSROOM',
        hindi: 'नमस्ते (Greetings)',
        targetScript: 'ᱡᱚᱦᱟᱨ',
        targetLatin: 'Johar',
        phonetic: '/dʒo.har/',
        meaning: 'पारंपरिक संथाली अभिवादन',
        exampleHi: 'सभी शिक्षकों को जोहार।',
        exampleTarget: 'ᱡᱚᱛᱚ ᱢᱟᱪᱮᱛ ᱠᱚ ᱡᱚᱦᱟᱨ᱾',
        emoji: '🙏'
      }
    ];
  };

  const cards = getLanguageCards(targetLanguage);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const safeIndex = currentIndex >= cards.length ? 0 : currentIndex;
  const current = cards[safeIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handlePlayAudio = (text: string) => {
    speechBridge.speak(text, targetLanguage, speechSpeed === 'slow');
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.6rem' }}>📇</span>
            <h1 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--color-primary)', margin: 0 }}>
              सचित्र बहुभाषी फ़्लैशकार्ड (Vernacular Concept Cards)
            </h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="badge badge-primary">कक्षा {selectedGrade} • {selectedSubject}</span>
            <span className="badge badge-secondary">{targetLanguageName}</span>
          </div>
        </div>
        <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
          {targetLanguageName} लिपि ({targetScript}), सटीक ध्वन्यात्मक उच्चारण एवं ऑडियो के साथ अंतःक्रियात्मक कार्ड। कार्ड को पलटने के लिए क्लिक करें।
        </p>
      </div>

      {/* Main Flashcard Container */}
      <div style={{ maxWidth: '580px', margin: '0 auto', textAlign: 'center' }}>
        {/* Card Flip Wrapper */}
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          style={{
            background: 'var(--color-surface)',
            border: '2px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '40px 24px',
            minHeight: '340px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-md)',
            cursor: 'pointer',
            transition: 'all 200ms ease',
            position: 'relative'
          }}
        >
          <div style={{ position: 'absolute', top: '16px', right: '16px', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
            <RotateCw size={13} />
            <span>पलटने के लिए क्लिक करें</span>
          </div>

          <div style={{ fontSize: '3.6rem', marginBottom: '16px' }}>
            {current.emoji}
          </div>

          {!isFlipped ? (
            /* Front of Card */
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-accent)', textTransform: 'uppercase', marginBottom: '6px' }}>
                {current.category}
              </div>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-text)', margin: '4px 0' }}>
                {current.hindi}
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>
                अर्थ: {current.meaning}
              </p>
            </div>
          ) : (
            /* Back of Card */
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', marginBottom: '8px' }}>
                {targetLanguageName} ({targetScript})
              </div>
              <OlChikiText
                text={current.targetScript}
                latin={current.targetLatin}
                phonetic={current.phonetic}
                size="xl"
              />
              <div style={{ marginTop: '16px', background: 'var(--color-bg)', border: '1px solid var(--color-border)', padding: '10px 16px', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>उदाहरण वाक्य:</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-text)', marginTop: '2px' }}>
                  {current.exampleTarget}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Card Controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px', flexWrap: 'wrap', gap: '8px' }}>
          <button onClick={handlePrev} className="btn btn-secondary">
            <ChevronLeft size={18} />
            <span>पिछला</span>
          </button>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button
              onClick={(e) => { e.stopPropagation(); handlePlayAudio(current.targetScript); }}
              className="btn btn-primary"
              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
            >
              <Volume2 size={16} />
              <span>उच्चारण सुनें ({speechSpeed === 'slow' ? '0.72x Slow' : 'Play'})</span>
            </button>
            <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>
              {safeIndex + 1} / {cards.length}
            </span>
          </div>

          <button onClick={handleNext} className="btn btn-secondary">
            <span>अगला</span>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
