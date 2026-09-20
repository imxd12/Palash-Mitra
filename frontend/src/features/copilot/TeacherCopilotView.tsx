import React, { useState, useEffect } from 'react';
import { useApp } from '../../core/context/AppContext';
import { api } from '../../core/api/client';
import { speechBridge } from '../../core/speech/speechBridge';
import { VernacularText } from '../../components/OlChikiText';
import { getDefaultTopicForGradeAndSubject } from '../../core/curriculum/curriculumData';
import { Send, Volume2, Mic, MicOff, Sparkles, HelpCircle, Bot, Compass, RefreshCw } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'TEACHER' | 'COPILOT';
  text: string;
  targetLangText?: string;
  latin?: string;
  example?: string;
  timestamp: string;
}

interface QuickPrompt {
  id: string;
  icon: string;
  label: string;
  prompt: string;
  category: 'VILLAGE' | 'SIMPLER' | 'ACTIVITY' | 'VERNACULAR' | 'QUESTIONS' | 'GAME';
}

export const TeacherCopilotView: React.FC = () => {
  const {
    user,
    activeTeacher,
    targetLanguage,
    targetLanguageName,
    targetScript,
    sourceLanguage,
    selectedGrade,
    selectedSubject,
    speechSpeed
  } = useApp();

  const [inputQuery, setInputQuery] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [audioLatencyMs, setAudioLatencyMs] = useState<number | null>(null);

  const teacherDisplayName = activeTeacher?.name || user?.name || 'शिक्षक';
  const defaultTopic = getDefaultTopicForGradeAndSubject(selectedGrade, selectedSubject);

  const getWelcomeGreeting = () => {
    if (targetLanguage === 'hoc') {
      return {
        text: `जोहार ${teacherDisplayName} जी! मैं आपका "पलाश संगी (Palash Sangi)" हूँ — विद्यालयी AI शिक्षण सारथी। कक्षा ${selectedGrade} ${selectedSubject} (${defaultTopic}) हेतु पूर्णतः तैयार हूँ।`,
        targetLangText: '𑢹𑣉 𑣎𑣋𑣜: ᱡᱚᱦᱟᱨ! ᱟᱵᱩᱣᱟᱜ ᱯᱟᱞᱟᱥ ᱥᱟᱝᱜᱤ (Palash Sangi) ᱨᱮ ᱥᱟᱹᱜᱩᱱ ᱫᱟᱨᱟᱢ᱾ ᱟᱢ ᱡᱟᱦᱟᱸᱱᱟᱜ ᱜᱮ ᱠᱩᱞᱤ ᱫᱟᱲᱮᱭᱟᱜ-ᱟᱢ᱾',
        latin: 'Ho jagar: Johar! Abuwag Palash Sangi re sagun daram. Am jahang ge kuli daṛeyag-am.'
      };
    } else if (targetLanguage === 'unr') {
      return {
        text: `जोहार ${teacherDisplayName} जी! मैं आपका "पलाश संगी (Palash Sangi)" हूँ — मुंडारी एवं बहुभाषी शिक्षण सारथी। कक्षा ${selectedGrade} ${selectedSubject} में आपकी सहायता के लिए प्रस्तुत हूँ।`,
        targetLangText: 'ᱢᱩᱱᱰᱟᱨᱤ: ᱡᱚᱦᱟᱨ! ᱤᱧ ᱫᱚ ᱯᱟᱞᱟᱥ ᱥᱟᱝᱜᱤ (Palash Sangi) ᱠᱟᱹᱱᱟᱹᱧ᱾ ᱟᱢ ᱜᱟᱛᱮ ᱞᱮᱠᱟ ᱡᱟᱦᱟᱸᱱᱟᱜ ᱠᱩᱞᱤ ᱫᱟᱲᱮᱭᱟᱜ-ᱟᱢ᱾',
        latin: 'Mundari: Johar! Iñ do Palash Sangi kanañ. Am gate leka jahang kuli daṛeyag-am.'
      };
    } else if (targetLanguage === 'kru') {
      return {
        text: `जोहार ${teacherDisplayName} जी! मैं आपका "पलाश संगी (Palash Sangi)" हूँ — कुड़ुख़ एवं प्रादेशिक AI शिक्षण सारथी। कक्षा ${selectedGrade} ${selectedSubject} में पाठ्य-योजना व सरल उदाहरणों के लिए तैयार हूँ।`,
        targetLangText: 'कुड़ुख़ ती: जोहार! एन पलाश संगी (Palash Sangi) तलदन — नीमहै मास्टर संगी। कक्षा पाठ बुझुरना गने एन त्यार रदन।',
        latin: 'Kurukh ti: Johar! En Palash Sangi taldan — neemhai master sangi. Kaksha path bujhurna gane en tyar radan.'
      };
    } else if (targetLanguage === 'kyw') {
      return {
        text: `जोहार ${teacherDisplayName} जी! मैं आपका "पलाश संगी (Palash Sangi)" हूँ — कुड़मालि एवं क्षेत्रीय AI सारथी। कक्षा ${selectedGrade} ${selectedSubject} के पाठ को मातृभाषा व स्थानीय उदाहरणों से सजाएं।`,
        targetLangText: 'कुड़मालि ते: जोहार! हमि पलाश संगी (Palash Sangi) हेकि — राउरेकेर AI मास्टर संगी। गाँव-घरक उदाहरण आर पाठ बुझाबेक ले हाजिर।',
        latin: 'Kudmali te: Johar! Hami Palash Sangi heki — raureker AI master sangi. Gaon-gharak udaharan ar path bujhabek le hajir.'
      };
    } else if (targetLanguage === 'en') {
      return {
        text: `Johar ${teacherDisplayName}! I am "Palash Sangi (पलाश संगी)" — your Vernacular AI Pedagogical Companion, calibrated for Grade ${selectedGrade} ${selectedSubject} (${defaultTopic}).`,
        targetLangText: `Johar! Palash Sangi is ready to provide contextual tribal metaphors, FLN simplifications, and bilingual worksheets for your classroom.`,
        latin: 'Johar! Ready to assist with local pedagogy.'
      };
    } else if (targetLanguage === 'hi') {
      return {
        text: `जोहार ${teacherDisplayName} जी! मैं आपका "पलाश संगी (Palash Sangi)" हूँ — झारखंड प्राथमिक विद्यालयी AI शिक्षण सारथी। कक्षा ${selectedGrade} ${selectedSubject} (${defaultTopic}) हेतु तैयार हूँ।`,
        targetLangText: `जोहार! पलाश संगी में आपका स्वागत है। स्थानीय परिवेश, तीली-कंकड़ गतिविधियों और सरल उपमाओं के साथ अध्यापन को जीवंत बनाएं।`,
        latin: 'Johar! Palash Sangi mein aapka swagat hai.'
      };
    }

    // Default: Santhali (sat)
    return {
      text: `जोहार ${teacherDisplayName} जी! मैं आपका "पलाश संगी (Palash Sangi)" हूँ — शिक्षक AI सारथी। कक्षा ${selectedGrade} ${selectedSubject} (${defaultTopic}) के संदर्भ में तैयार हूँ।`,
      targetLangText: 'ᱡᱚᱦᱟᱨ! ᱤᱧ ᱫᱚ ᱯᱟᱞᱟᱥ ᱥᱟᱝᱜᱤ (Palash Sangi) — ᱢᱟᱪᱮᱛ ᱜᱚᱲᱚᱭᱤᱡ ᱠᱟᱹᱱᱟᱹᱧ᱾ ᱟᱢ ᱡᱟᱦᱟᱸᱱᱟᱜ ᱠᱩᱞᱤ ᱫᱟᱲᱮᱭᱟᱜ-ᱟᱢ᱾',
      latin: 'Johar! Iñ do Palash Sangi — macet goṛoyij kanañ.'
    };
  };

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const welcome = getWelcomeGreeting();
    return [
      {
        id: 'msg_init',
        sender: 'COPILOT',
        text: welcome.text,
        targetLangText: welcome.targetLangText,
        latin: welcome.latin,
        timestamp: '10:00 AM'
      }
    ];
  });

  // Re-sync welcome greeting when targetLanguage, grade, or teacher changes
  useEffect(() => {
    const welcome = getWelcomeGreeting();
    setMessages([
      {
        id: `msg_${Date.now()}`,
        sender: 'COPILOT',
        text: welcome.text,
        targetLangText: welcome.targetLangText,
        latin: welcome.latin,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [targetLanguage, selectedGrade, selectedSubject, teacherDisplayName]);

  // 6 Instant Pedagogical Quick Prompts
  const quickPrompts: QuickPrompt[] = [
    {
      id: 'village',
      icon: '🌿',
      label: 'स्थानीय उदाहरण दें',
      prompt: `कक्षा ${selectedGrade} ${selectedSubject} के टॉपिक "${defaultTopic}" को झारखंड के गाँव, खेत, सारंडा जंगल या हाट-बाज़ार के स्थानीय उदाहरण से समझाएं।`,
      category: 'VILLAGE'
    },
    {
      id: 'simpler',
      icon: '🔄',
      label: 'बच्चों को फिर से समझाएं',
      prompt: `कक्षा ${selectedGrade} के ऐसे बच्चों हेतु जो पहली बार सीख रहे हैं, टॉपिक "${defaultTopic}" को एकदम सरल और FLN आधारभूत स्तर पर फिर से समझाएं।`,
      category: 'SIMPLER'
    },
    {
      id: 'math_pebbles',
      icon: '🧮',
      label: 'कंकड़-तीली गतिविधि',
      prompt: `टॉपिक "${defaultTopic}" को कक्षा में कंकड़ (रोड़े), बाँस की तीलियों या इमली के बीजों की सहायता से कैसे मूर्त रूप से सिखाएं? गतिविधि बताएं।`,
      category: 'ACTIVITY'
    },
    {
      id: 'vernacular',
      icon: '🗣️',
      label: 'मातृभाषा में कहें',
      prompt: `टॉपिक "${defaultTopic}" के मुख्य विचार को ${targetLanguageName} (${targetScript}) में सरल वाक्य व सटीक स्थानीय शब्दावली के साथ प्रस्तुत करें।`,
      category: 'VERNACULAR'
    },
    {
      id: 'questions',
      icon: '📝',
      label: '3 त्वरित अभ्यास प्रश्न',
      prompt: `कक्षा ${selectedGrade} ${selectedSubject} के टॉपिक "${defaultTopic}" पर 3 त्वरित मौखिक या लिखित अभ्यास प्रश्न (उत्तर सहित) बनाएं।`,
      category: 'QUESTIONS'
    },
    {
      id: 'game',
      icon: '🎭',
      label: '5-मिनट कक्षा खेल',
      prompt: `कक्षा ${selectedGrade} के बच्चों की ऊर्जा और रुचि बढ़ाने के लिए टॉपिक "${defaultTopic}" पर आधारित 5 मिनट का एक रोचक कक्षा खेल बताएं।`,
      category: 'GAME'
    }
  ];

  const handleSend = async (queryText?: string, promptCategory?: QuickPrompt['category']) => {
    const textToSend = (queryText || inputQuery).trim();
    if (!textToSend) return;

    const teacherMsg: ChatMessage = {
      id: `t_${Date.now()}`,
      sender: 'TEACHER',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, teacherMsg]);
    setInputQuery('');
    setIsTyping(true);

    try {
      // Determine pedagogical intent
      let level: 'SIMPLER' | 'VILLAGE_EXAMPLE' | 'VISUAL' = 'SIMPLER';
      if (promptCategory === 'VILLAGE' || textToSend.includes('गाँव') || textToSend.includes('village') || textToSend.includes('उदाहरण') || textToSend.includes('परिवेश')) {
        level = 'VILLAGE_EXAMPLE';
      } else if (textToSend.includes('चित्र') || textToSend.includes('visual') || textToSend.includes('आरेख') || textToSend.includes('diagram')) {
        level = 'VISUAL';
      }

      // If user specifically requested 3 practice questions
      if (promptCategory === 'QUESTIONS' || textToSend.includes('3 त्वरित अभ्यास प्रश्न') || textToSend.includes('3 प्रश्न')) {
        try {
          const wsRes = await api.post('/pedagogy/worksheet', {
            grade: selectedGrade,
            subject: selectedSubject,
            topic: defaultTopic,
            targetLanguage,
            count: 3
          });

          if (wsRes.success && wsRes.worksheet?.exercises?.length > 0) {
            const qList = wsRes.worksheet.exercises.slice(0, 3).map((q: any, i: number) => 
              `${i + 1}. ${q.questionHi || q.questionText}\n   → सही उत्तर: ${q.correctAnswerHi || q.correctAnswer || 'उत्तर पर चर्चा करें'}`
            ).join('\n\n');

            const copilotMsg: ChatMessage = {
              id: `c_${Date.now()}`,
              sender: 'COPILOT',
              text: `📝 कक्षा ${selectedGrade} ${selectedSubject} (${defaultTopic}) हेतु 3 त्वरित अभ्यास प्रश्न:\n\n${qList}`,
              targetLangText: wsRes.worksheet.exercises[0]?.questionSat || wsRes.worksheet.exercises[0]?.questionTargetLang,
              example: `कक्षा सुझाव: छात्रों को जोड़ियों (Peer Learning) में इन प्रश्नों का मौखिक उत्तर देने को कहें।`,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, copilotMsg]);
            setIsTyping(false);
            return;
          }
        } catch {
          // Fallback to explainAgain below if worksheet generation errors
        }
      }

      // If user requested 5-minute game or pebble activity
      if (promptCategory === 'GAME' || textToSend.includes('खेल') || textToSend.includes('पहेली')) {
        const copilotMsg: ChatMessage = {
          id: `c_${Date.now()}`,
          sender: 'COPILOT',
          text: `🎭 5-मिनट कक्षा खेल — "बूझो तो जानें (${defaultTopic})"!\n\n1. शिक्षक एक कंकड़ या चाक अपने हाथ में छुपाएं।\n2. जो बच्चा ${defaultTopic} से जुड़ा एक सही शब्द या उदाहरण बोलेगा, वह चाक लेकर अगले साथी से प्रश्न पूछेगा।\n3. नियम: उत्तर छात्र अपनी मातृभाषा (${targetLanguageName}) या हिंदी दोनों में दे सकते हैं।\n4. परिणाम: सभी बच्चों की झिझक मिटेगी और 100% भागीदारी सुनिश्चित होगी।`,
          targetLangText: `${targetLanguageName} खेल निर्देश: ᱜᱟᱛᱮ ᱠᱚ ᱥᱟᱶ ᱱᱚᱣᱟ ᱜᱟᱛᱮ ᱮᱱᱮᱡ ᱯᱮ! ᱡᱟᱦᱟᱸᱭ ᱴᱷᱤᱠ ᱮ ᱢᱮᱱᱟ, ᱩᱱᱤ ᱫᱚ ᱫᱟᱣ ᱮ ᱧᱟᱢᱟ᱾`,
          example: `TLM की आवश्यकता नहीं — केवल उत्साह और ताली बजाकर प्रोत्साहन!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, copilotMsg]);
        setIsTyping(false);
        return;
      }

      if (promptCategory === 'ACTIVITY' || textToSend.includes('कंकड़') || textToSend.includes('तीली')) {
        const copilotMsg: ChatMessage = {
          id: `c_${Date.now()}`,
          sender: 'COPILOT',
          text: `🧮 कंकड़-तीली मूर्त गणित/विज्ञान गतिविधि (${defaultTopic}):\n\n1. प्रत्येक बेंच पर 10-10 कंकड़ और नीम/बाँस की 5 तीलियां रखें।\n2. बच्चों को कंकड़ों को 2 बराबर समूहों में बांटने को कहें (प्रत्येक ढेर = 1/2 आधा)।\n3. तीलियों की मदद से ज्यामितीय आकृतियां या संख्याओं के बंडल (दहाई-इकाई) बनवाएं।\n4. बच्चे अपने हाथों से छूकर और गिनकर संकल्पना को कभी नहीं भूलेंगे।`,
          targetLangText: `${targetLanguageName}: ᱫᱷᱤᱨᱤ ᱟᱨ ᱥᱤᱧᱡᱚ ᱫᱟᱨᱮ ᱰᱟᱹᱨ ᱛᱮ ᱞᱮᱠᱷᱟ ᱥᱮᱬᱟ ᱯᱮ᱾ ᱟᱯᱱᱟᱨ ᱛᱤ ᱛᱮ ᱡᱚᱴᱮᱫ ᱠᱟᱛᱮ ᱵᱩᱡᱷᱟᱹᱣ ᱞᱮᱠᱷᱟᱱ ᱟᱞᱜᱟ ᱜᱮᱭᱟ᱾`,
          example: `स्थानिक सामग्री (TLM): शून्य लागत, 100% पर्यावरण-अनुकूल`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, copilotMsg]);
        setIsTyping(false);
        return;
      }

      // Default to Explain Again AI Core
      const res = await api.post('/pedagogy/explain-again', {
        grade: selectedGrade,
        subject: selectedSubject,
        topic: defaultTopic,
        currentText: textToSend,
        level,
        targetLanguage
      });

      const copilotMsg: ChatMessage = {
        id: `c_${Date.now()}`,
        sender: 'COPILOT',
        text: res.explanationHindi || 'यहाँ आपके लिए पलाश संगी की व्याख्या प्रस्तुत है:',
        targetLangText: res.explanationTargetLang,
        example: res.example,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, copilotMsg]);
    } catch (err) {
      console.error('Copilot error:', err);
    } finally {
      setIsTyping(false);
    }
  };

  const handleMicClick = async () => {
    if (isListening) return;
    setIsListening(true);
    try {
      const result = await speechBridge.listenSpeech(sourceLanguage || 'hi');
      setInputQuery(result.text);
      setAudioLatencyMs(result.latencyMs);
    } catch (e) {
      console.warn('Speech recognition error:', e);
    } finally {
      setIsListening(false);
    }
  };

  const handlePlayVoice = async (text: string, lang: string) => {
    const latency = await speechBridge.speak(text, lang, speechSpeed === 'slow');
    setAudioLatencyMs(latency);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 170px)', minHeight: '620px' }}>
      {/* Header Bar */}
      <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.5rem' }}>🌺</span>
            <div>
              <h1 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-primary)', letterSpacing: '-0.02em', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                पलाश संगी (Palash Sangi) — शिक्षक AI सारथी
                <span className="badge badge-primary" style={{ fontSize: '0.68rem', fontWeight: 700, padding: '2px 8px' }}>
                  Pedagogical AI Co-Pilot
                </span>
              </h1>
            </div>
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontWeight: 600, color: 'var(--color-text)' }}>
              👨‍🏫 {teacherDisplayName}
            </span>
            <span>•</span>
            <span className="badge badge-primary" style={{ fontSize: '0.75rem' }}>
              कक्षा {selectedGrade} • {selectedSubject}
            </span>
            <span>•</span>
            <span>टॉपिक: <strong>{defaultTopic}</strong></span>
            <span>•</span>
            <span>मातृभाषा: <strong>{targetLanguageName}</strong> ({targetScript})</span>
            {speechSpeed === 'slow' && (
              <span className="badge badge-warning" style={{ fontSize: '0.72rem' }}>
                🐢 0.72x Slow Mode
              </span>
            )}
            {audioLatencyMs !== null && (
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                ⚡ {audioLatencyMs}ms
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 6 Quick Pedagogical Prompt Pills */}
      <div style={{ marginBottom: '12px' }}>
        <div style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Sparkles size={13} color="var(--color-accent)" />
          <span>त्वरित शिक्षण संकेत (Quick Pedagogical Prompts)</span>
        </div>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', scrollbarWidth: 'none' }}>
          {quickPrompts.map(qp => (
            <button
              key={qp.id}
              onClick={() => handleSend(qp.prompt, qp.category)}
              className="btn btn-secondary"
              style={{
                padding: '7px 13px',
                fontSize: '0.82rem',
                whiteSpace: 'nowrap',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                border: '1px solid var(--color-border)',
                background: 'var(--color-surface)',
                boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              title={qp.prompt}
            >
              <span>{qp.icon}</span>
              <span style={{ fontWeight: 600 }}>{qp.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Log */}
      <div
        className="card"
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          marginBottom: '12px',
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)'
        }}
      >
        {messages.map(m => (
          <div
            key={m.id}
            style={{
              alignSelf: m.sender === 'TEACHER' ? 'flex-end' : 'flex-start',
              maxWidth: '86%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: m.sender === 'TEACHER' ? 'flex-end' : 'flex-start'
            }}
          >
            <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span>
                {m.sender === 'TEACHER' ? `${teacherDisplayName} (आप)` : 'पलाश संगी (AI सारथी)'}
              </span>
              <span>•</span>
              <span>{m.timestamp}</span>
            </div>

            <div
              style={{
                background: m.sender === 'TEACHER' ? 'var(--color-primary)' : 'var(--color-surface)',
                color: m.sender === 'TEACHER' ? '#FFFFFF' : 'var(--color-text)',
                border: m.sender === 'TEACHER' ? 'none' : '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '14px 18px',
                boxShadow: m.sender === 'TEACHER' ? '0 2px 5px rgba(0,0,0,0.2)' : '0 1px 4px rgba(0,0,0,0.05)'
              }}
            >
              <div style={{ fontSize: '0.94rem', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                {m.text}
              </div>

              {/* Speaker button for Hindi/English response */}
              {m.sender === 'COPILOT' && (
                <div style={{ marginTop: '8px' }}>
                  <button
                    onClick={() => handlePlayVoice(m.text, sourceLanguage || 'hi')}
                    className="btn btn-secondary"
                    style={{ padding: '3px 9px', fontSize: '0.74rem', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
                    title="स्पष्ट आवाज में सुनें"
                  >
                    <Volume2 size={13} />
                    <span>व्याख्या सुनें</span>
                  </button>
                </div>
              )}

              {m.targetLangText && (
                <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid var(--color-border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-accent)', textTransform: 'uppercase' }}>
                      {targetLanguageName} अनुवाद ({targetScript})
                    </span>
                    <button
                      onClick={() => handlePlayVoice(m.targetLangText!, targetLanguage)}
                      className="btn btn-secondary"
                      style={{ padding: '3px 8px', fontSize: '0.74rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      <Volume2 size={12} />
                      <span>मातृभाषा ऑडियो</span>
                    </button>
                  </div>
                  <div style={{ marginTop: '4px' }}>
                    <VernacularText text={m.targetLangText} latin={m.latin} size="md" />
                  </div>
                </div>
              )}

              {m.example && (
                <div
                  style={{
                    marginTop: '10px',
                    background: 'var(--color-bg)',
                    borderLeft: '3px solid var(--color-accent)',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.85rem',
                    color: 'var(--color-text)',
                    fontWeight: 600
                  }}
                >
                  💡 {m.example}
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div
            style={{
              alignSelf: 'flex-start',
              background: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
              padding: '10px 16px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.85rem',
              color: 'var(--color-text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span>🌺</span>
            <span>पलाश संगी pedagogical AI सोच रहा है...</span>
          </div>
        )}
      </div>

      {/* Query Input Bar */}
      <div className="card" style={{ padding: '12px', background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button
            type="button"
            onClick={handleMicClick}
            className={`btn ${isListening ? 'btn-danger' : 'btn-secondary'}`}
            style={{
              padding: '10px 14px',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
            title="माइक से बोलें"
          >
            {isListening ? <MicOff size={16} /> : <Mic size={16} />}
            <span style={{ fontSize: '0.82rem' }}>{isListening ? 'सुन रहा हूँ...' : 'बोलें'}</span>
          </button>

          <input
            type="text"
            className="form-input"
            value={inputQuery}
            onChange={e => setInputQuery(e.target.value)}
            placeholder={isListening ? 'माइक में बोलिए (हिंदी, अंग्रेज़ी या संथाली)...' : `पलाश संगी से पूछें (उदा: 'सरल उदाहरण दो', 'तीली से कैसे सिखाएं', 'कक्षा खेल बताओ')...`}
            style={{ flex: 1 }}
          />

          <button
            type="submit"
            disabled={isTyping || !inputQuery.trim()}
            className="btn btn-primary"
            style={{ whiteSpace: 'nowrap', padding: '10px 18px', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Send size={15} />
            <span>पूछें</span>
          </button>
        </form>
      </div>
    </div>
  );
};
