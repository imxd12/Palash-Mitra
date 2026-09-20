// Comprehensive Pedagogical Vernacular Dictionaries for Classes 1–5 & All Primary Subjects
// Fully localized for Jharkhand Tribal Context (Santhali, Ho, Mundari, Kurukh, Kudmali, Hindi, English)

export interface TemplateStep {
  stepNumber: number;
  hindi: string;
  targetLang: string;
}

export interface TemplateFlashcard {
  termHindi: string;
  termTargetScript: string;
  termTargetLatin: string;
  phonetic: string;
  exampleSentence: string;
}

export interface CurriculumTemplateDict {
  objTarget: string;
  objHindi: string;
  prerequisites: string[];
  introTarget: string;
  introHindi: string;
  explTargetScript: string;
  explTargetLatin: string;
  explHindi: string;
  explSimplerHindi: string;
  localExDescTarget: string;
  localExDescHindi: string;
  activityTitle: string;
  instructionsTargetLang: string;
  instructionsHindi: string;
  materialsNeeded: string[];
  diagramType: string;
  steps: TemplateStep[];
  q1: string;
  q1Hindi: string;
  q1Opts: string[];
  q1OptsHindi: string[];
  q1Ans: string;
  q1Explanation: string;
  q2: string;
  q2Hindi: string;
  q2Opts: string[];
  q2OptsHindi: string[];
  q2Ans: string;
  q2Explanation: string;
  worksheetTitle: string;
  worksheetInstr: string;
  wPrompts: string[];
  wPromptsHindi: string[];
  flashcards: TemplateFlashcard[];
  taskTargetLang: string;
  quiz: Array<{
    question: string;
    options: string[];
    correctIndex: number;
  }>;
  blackboardSummary: {
    keyTerms: string[];
    concepts: string[];
    homework: string;
  };
}

// 1. EARLY MATHEMATICS (Class 1-2: Counting 1-9, Addition with Forest Pebbles/Seeds, Place Value 10s & 1s)
export const countingLangMap: Record<string, CurriculumTemplateDict> = {
  sat: {
    objTarget: `᱑ ᱠᱷᱚᱱ ᱙ ᱦᱟᱹᱵᱤᱡ ᱞᱮᱠᱷᱟ ᱟᱨ ᱡᱤᱱᱤᱥ ᱠᱚ ᱡᱟᱣᱨᱟ ᱠᱟᱛᱮ ᱥᱮᱬᱟ ᱞᱮᱠᱷᱟ ᱵᱩᱡᱷᱟᱹᱣ᱾`,
    objHindi: `विद्यार्थी 1 से 9 तक की संख्याओं को पहचान सकेंगे और महुआ के बीज व कंकड़ों से जोड़-घटाव कर सकेंगे।`,
    prerequisites: ['आँखों से वस्तुएं देखना', 'कम-ज्यादा की मौखिक पहचान'],
    introTarget: `ᱛᱮᱦᱮᱧ ᱫᱚ ᱵᱚᱱ ᱟᱵᱚ ᱟᱹᱛᱩ ᱨᱮᱭᱟᱜ ᱢᱟᱛᱠᱚᱢ ᱡᱟᱝ ᱟᱨ ᱫᱷᱤᱨᱤ ᱛᱮ ᱞᱮᱠᱷᱟ ᱵᱚᱱ ᱪᱮᱫ-ᱟ᱾`,
    introHindi: `आज हम महुआ के बीज और सारंडा जंगल के छोटे कंकड़ों से 1 से 9 तक गिनती सीखेंगे।`,
    explTargetScript: `ᱡᱚᱠᱷᱚᱱ ᱢᱤᱫ-ᱢᱤᱫ ᱛᱮ ᱡᱤᱱᱤᱥ ᱵᱚᱱ ᱡᱟᱣᱨᱟᱭᱟ: ᱑ ᱫᱚ ᱢᱤᱫ, ᱒ ᱫᱚ ᱵᱟᱨ, ᱓ ᱫᱚ ᱯᱮ, ᱔ ᱫᱚ ᱯᱩᱱ, ᱕ ᱫᱚ ᱢᱚᱬᱮ, ᱖ ᱫᱚ ᱛᱩᱨᱩᱭ, ᱗ ᱫᱚ ᱮᱭᱟᱭ, ᱘ ᱫᱚ ᱤᱨᱟᱹᱞ, ᱙ ᱫᱚ ᱟᱨᱮ᱾ ᱑᱐ ᱫᱚ ᱜᱮᱞ (ᱢᱤᱫ ᱵᱤᱸᱰᱟᱹ)᱾`,
    explTargetLatin: `Jokhon mid-mid te jinis bon jawraya: 1 do mid, 2 do bar, 3 do pe, 4 do pun, 5 do mone. 10 do gel (mid binda).`,
    explHindi: `हर वस्तु की एक निश्चित संख्या होती है। 1 से 9 तक इकाइयां हैं और 10 बनते ही 1 दहाई (एक बंडल) बन जाती है।`,
    explSimplerHindi: `जैसे एक हाथ में 5 उंगलियां और दोनों हाथों में मिलाकर 10 उंगलियां होती हैं।`,
    localExDescTarget: `ᱟᱹᱛᱩ ᱨᱮ ᱢᱟᱛᱠᱚᱢ ᱦᱟᱞᱟᱝ ᱡᱚᱠᱷᱚᱱ ᱑᱐-᱑᱐ ᱜᱚᱴᱟᱝ ᱨᱮᱭᱟᱜ ᱵᱤᱸᱰᱟᱹ ᱵᱚᱱ ᱵᱮᱱᱟᱣᱟ᱾`,
    localExDescHindi: `गाँव में महुआ चुनते समय जब हम 10-10 बीजों की ढेरी बनाते हैं या तीलियों का गट्ठा बनाते हैं।`,
    activityTitle: 'महुआ बीज व कंकड़ गिनती गतिविधि (Ol Chiki Counting)',
    instructionsTargetLang: 'ᱢᱚᱬᱮ (᱕) ᱜᱚᱴᱟᱝ ᱫᱷᱤᱨᱤ ᱦᱟᱛᱟᱣ ᱯᱮ᱾ ᱚᱱᱟ ᱨᱮ ᱟᱨᱦᱚᱸ ᱵᱟᱨ (᱒) ᱜᱚᱴᱟᱝ ᱢᱮᱥᱟᱭ ᱯᱮ᱾ ᱡᱚᱛᱚ ᱛᱤᱱᱟᱹᱜ ᱦᱩᱭᱮᱱᱟ ᱞᱮᱠᱷᱟᱭ ᱯᱮ (ᱮᱭᱟᱭ = ᱗)᱾',
    instructionsHindi: '5 कंकड़ लें। उसमें 2 कंकड़ और मिलाएं। गिनकर बताएं कुल कितने हुए (7 कंकड़)।',
    materialsNeeded: ['महुआ के बीज', 'छोटे चिकने कंकड़', 'नीम/साल की तीलियां', 'गिनती कार्ड'],
    diagramType: 'PEBBLE_COUNTER',
    steps: [
      { stepNumber: 1, hindi: '1 से 5 कंकड़ (इकाई स्तर)', targetLang: '᱑ ᱠᱷᱚᱱ ᱕ ᱫᱷᱤᱨᱤ (ᱮᱛᱚᱦᱚᱵ ᱞᱮᱠᱷᱟ)' },
      { stepNumber: 2, hindi: '5 + 2 = 7 कंकड़ (जोड़ प्रक्रिया)', targetLang: '᱕ + ᱒ = ᱗ ᱫᱷᱤᱨᱤ (ᱡᱚᱲ ᱠᱟᱹᱢᱤ)' },
      { stepNumber: 3, hindi: '10 तीलियों का 1 बंडल (दहाई की समझ)', targetLang: '᱑᱐ ᱠᱟᱹᱴᱷᱤ ᱨᱮᱭᱟᱜ ᱑ ᱵᱤᱸᱰᱟᱹ (ᱜᱮᱞ ᱨᱮᱭᱟᱜ ᱢᱩᱴᱷᱟᱹᱱ)' }
    ],
    q1: 'ᱢᱚᱬᱮ (᱕) ᱨᱮ ᱵᱟᱨ (᱒) ᱢᱮᱥᱟ ᱞᱮᱠᱷᱟᱱ ᱛᱤᱱᱟᱹᱜ ᱦᱩᱭᱩᱜ-ᱟ?',
    q1Hindi: '5 में 2 कंकड़ मिलाने पर कुल कितने कंकड़ होंगे?',
    q1Opts: ['ᱮᱭᱟᱭ (᱗)', 'ᱛᱩᱨᱩᱭ (᱖)', 'ᱤᱨᱟᱹᱞ (᱘)', 'ᱯᱩᱱ (᱔)'],
    q1OptsHindi: ['7 (सात)', '6 (छह)', '8 (आठ)', '4 (चार)'],
    q1Ans: '7 (सात)',
    q1Explanation: '5 + 2 = 7 होता है।',
    q2: '᱑᱐ ᱜᱚᱴᱟᱝ ᱠᱟᱹᱴᱷᱤ ᱨᱮᱭᱟᱜ ᱛᱤᱱᱟᱹᱜ ᱵᱤᱸᱰᱟᱹ (दहाई) ᱵᱮᱱᱟᱜ-ᱟ?',
    q2Hindi: '10 तीलियों को बांधने पर कितनी दहाई बनती है?',
    q2Opts: ['ᱢᱤᱫ ᱵᱤᱸᱰᱟᱹ (᱑ ᱜᱮᱞ)', 'ᱵᱟᱨ ᱵᱤᱸᱰᱟᱹ (᱒)', 'ᱯᱮ ᱵᱤᱸᱰᱟᱹ (᱓)', 'ᱢᱚᱬᱮ (᱕)'],
    q2OptsHindi: ['1 दहाई (एक बंडल)', '2 दहाई', '3 दहाई', '5 दहाई'],
    q2Ans: '1 दहाई (एक बंडल)',
    q2Explanation: '10 इकाइयों को मिलाकर 1 दहाई बनती है।',
    worksheetTitle: 'कक्षा 1-2 गणित: 1 से 9 गिनती व जोड़ अभ्यास',
    worksheetInstr: 'ᱡᱚᱛᱚ ᱠᱩᱠᱞᱤ ᱢᱚᱱᱮ ᱮᱢ ᱠᱟᱛᱮ ᱯᱟᱲᱦᱟᱣ ᱯᱮ ᱟᱨ ᱞᱮᱠᱷᱟ ᱚᱞ ᱯᱮ:',
    wPrompts: [
      '᱑. ᱪᱤᱛᱟᱹᱨ ᱨᱮ ᱢᱮᱱᱟᱜ ᱢᱟᱛᱠᱚᱢ ᱡᱟᱝ ᱞᱮᱠᱷᱟ ᱠᱟᱛᱮ ᱮᱞ ᱚᱞ ᱯᱮ:',
      '᱒. ᱓ + ᱔ = ᱛᱤᱱᱟᱹᱜ ᱦᱩᱭᱩᱜ-ᱟ?',
      '᱓. ᱟᱢᱟᱜ ᱚᱲᱟᱜ ᱨᱮ ᱢᱮᱱᱟᱜ ᱢᱚᱬᱮ (᱕) ᱡᱤᱱᱤᱥ ᱨᱮᱭᱟᱜ ᱧᱩᱛᱩᱢ ᱚᱞ ᱢᱮ:'
    ],
    wPromptsHindi: [
      '1. चित्र में दिए महुआ के बीजों को गिनकर संख्या लिखें:',
      '2. 3 + 4 = कुल कितने होंगे?',
      '3. अपने घर में पाई जाने वाली 5 वस्तुओं के नाम लिखें:'
    ],
    flashcards: [
      { termHindi: 'गिनती', termTargetScript: 'ᱞᱮᱠᱷᱟ', termTargetLatin: 'Lekha', phonetic: '/le.kʰa/', exampleSentence: 'ᱟᱵᱚ ᱫᱚ ᱢᱤᱫ ᱠᱷᱚᱱ ᱜᱮᱞ ᱦᱟᱹᱵᱤᱡ ᱵᱚᱱ ᱞᱮᱠᱷᱟᱭᱟ᱾' },
      { termHindi: 'जोड़', termTargetScript: 'ᱡᱚᱲ (ᱢᱮᱥᱟ)', termTargetLatin: 'Jod / Mesa', phonetic: '/dʒoɽ/', exampleSentence: 'ᱵᱟᱨ ᱟᱨ ᱯᱮ ᱢᱮᱥᱟ ᱞᱮᱠᱷᱟᱱ ᱢᱚᱬᱮ ᱦᱩᱭᱩᱜ-ᱟ᱾' },
      { termHindi: 'दहाई (10)', termTargetScript: 'ᱜᱮᱞ (ᱵᱤᱸᱰᱟᱹ)', termTargetLatin: 'Gel / Binda', phonetic: '/ɡel/', exampleSentence: 'ᱜᱮᱞ ᱜᱚᱴᱟᱝ ᱠᱟᱹᱴᱷᱤ ᱨᱮᱭᱟᱜ ᱢᱤᱫ ᱵᱤᱸᱰᱟᱹ᱾' },
      { termHindi: 'कंकड़', termTargetScript: 'ᱫᱷᱤᱨᱤ ᱠᱩᱴᱤ', termTargetLatin: 'Dhiri kuti', phonetic: '/dʱi.ri/', exampleSentence: 'ᱫᱷᱤᱨᱤ ᱠᱩᱴᱤ ᱛᱮ ᱞᱮᱠᱷᱟ ᱥᱮᱬᱟᱭ ᱢᱮ᱾' }
    ],
    taskTargetLang: 'ᱚᱲᱟᱜ ᱨᱮ ᱙ ᱜᱚᱴᱟᱝ ᱡᱟᱝ ᱡᱟᱣᱨᱟ ᱠᱟᱛᱮ ᱟᱭᱳ-ᱵᱟᱵᱟ ᱥᱟᱢᱟᱝ ᱨᱮ ᱞᱮᱠᱷᱟ ᱠᱟᱛᱮ ᱫᱮᱠᱷᱟᱣ ᱢᱮ᱾',
    quiz: [
      { question: '3 कंकड़ में 3 कंकड़ और जोड़ने पर कुल कितने होंगे?', options: ['6 (छह)', '5 (पाँच)', '7 (सात)', '9 (नौ)'], correctIndex: 0 },
      { question: '1 दहाई में कितनी इकाइयां होती हैं?', options: ['10', '5', '20', '1'], correctIndex: 0 },
      { question: 'संख्या 8 के ठीक बाद कौन सी संख्या आती है?', options: ['9', '7', '10', '6'], correctIndex: 0 },
      { question: '7 में से 2 घटाने पर क्या बचेगा?', options: ['5', '4', '6', '3'], correctIndex: 0 }
    ],
    blackboardSummary: {
      keyTerms: ['१ (ᱢᱤᱫ)', '५ (ᱢᱚᱬᱮ)', '१० (ᱜᱮᱞ/दहाई)', 'जोड़ (+)', 'घटाव (-)'],
      concepts: ['मूर्त वस्तुओं (कंकड़/बीज) से 1-9 गिनती', '10 तीलियों का 1 बंडल = 1 दहाई', 'इकाई व दहाई का स्थानीय मान'],
      homework: 'घर से 10 इमली या महुआ के बीज गिनकर लाएं और 1 बंडल बनाएं।'
    }
  },
  hoc: {
    objTarget: `𑢹𑣉 𑣎𑣋𑣜: ᱑ ᱠᱷᱚᱱ ᱙ ᱦᱟᱹᱵᱤᱡ ᱞᱮᱠᱷᱟ ᱟᱨ ᱫᱷᱤᱨᱤ ᱛᱮ ᱡᱚᱲ-ᱠᱮᱪᱟᱜ ᱥᱮᱬᱟ᱾`,
    objHindi: `हो भाषा में 1 से 9 तक गिनती व कंकड़ों से जोड़ की बुनियादी समझ।`,
    prerequisites: ['वस्तुओं को छूकर देखना', 'कम व अधिक का अनुभव'],
    introTarget: `ᱛᱮᱦᱮᱧ ᱫᱚ ᱟᱵᱩ ᱦᱟᱛᱩ ᱨᱮᱭᱟᱜ ᱫᱷᱤᱨᱤ ᱠᱩᱴᱤ ᱛᱮ ᱞᱮᱠᱷᱟ (Counting) ᱵᱚᱱ ᱪᱮᱫ-ᱟ᱾`,
    introHindi: `आज हम हो भाषा में कंकड़ों की सहायता से 1 से 9 तक गिनती सीखेंगे।`,
    explTargetScript: `ᱞᱮᱠᱷᱟ ᱫᱚ ᱱᱮᱱᱠᱟ ᱛᱟᱱᱟ: ᱑ = ᱢᱤᱭᱟᱹᱫᱽ, ᱒ = ᱵᱟᱨᱤᱭᱟ, ᱓ = ᱟᱯᱤᱭᱟ, ᱔ = ᱩᱯᱩᱱᱤᱭᱟ, ᱕ = ᱢᱚᱬᱮᱭᱟ᱾ ᱑᱐ ᱫᱚ ᱜᱮᱞ (ᱢᱤ ᱵᱤᱸᱰᱟᱹ)᱾`,
    explTargetLatin: `Lekha do nenka tana: 1 = miyad, 2 = bariya, 3 = apiya, 4 = upuniya, 5 = moneya. 10 = gel.`,
    explHindi: `1 से 9 तक गिनती: 1 (मियाद), 2 (बारिया), 3 (आपिया), 4 (उपुनिया), 5 (मोड़ेया)। 10 तीलियों का 1 बंडल बनता है।`,
    explSimplerHindi: `जैसे हाथ की उंगलियां गिनना और 10 होने पर एक मुट्ठी बनाना।`,
    localExDescTarget: `ᱦᱟᱛᱩ ᱨᱮ ᱠᱷᱮᱛ ᱥᱮᱱ ᱠᱟᱛᱮ ᱪᱮᱬᱮ ᱠᱚ ᱞᱮᱠᱷᱟ ᱠᱚᱣᱟ ᱟᱨ ᱡᱚᱢᱟᱜ ᱦᱟᱹᱴᱤᱧ ᱠᱚᱣᱟ᱾`,
    localExDescHindi: `गाँव के खेत में बैलों या पक्षियों को गिनना।`,
    activityTitle: 'कंकड़ गिनती खेल (Ho Counting)',
    instructionsTargetLang: 'ᱯᱮᱭᱟ (᱓) ᱫᱷᱤᱨᱤ ᱦᱟᱛᱟᱣ ᱯᱮ᱾ ᱚᱱᱟ ᱨᱮ ᱟᱨ ᱯᱮᱭᱟ (᱓) ᱢᱮᱥᱟᱭ ᱯᱮ᱾ ᱞᱮᱠᱷᱟ ᱠᱟᱛᱮ ᱛᱮᱞᱟ ᱮᱢ ᱯᱮ (ᱛᱩᱨᱩᱭ = ᱖)᱾',
    instructionsHindi: '3 कंकड़ लें। 3 और मिलाएं। कुल गिनकर बताएं (6 कंकड़)।',
    materialsNeeded: ['कंकड़', 'महुआ बीज', 'तीलियां'],
    diagramType: 'PEBBLE_COUNTER',
    steps: [
      { stepNumber: 1, hindi: '3 कंकड़ (मियाद, बारिया, आपिया)', targetLang: '᱓ ᱫᱷᱤᱨᱤ (ᱢᱤᱭᱟᱹᱫᱽ, ᱵᱟᱨᱤᱭᱟ, ᱟᱯᱤᱭᱟ)' },
      { stepNumber: 2, hindi: '3 + 3 = 6 कंकड़', targetLang: '᱓ + ᱓ = ᱖ ᱫᱷᱤᱨᱤ (ᱛᱩᱨᱩᱭ)' },
      { stepNumber: 3, hindi: '10 तीलियों का बंडल', targetLang: '᱑᱐ ᱠᱟᱹᱴᱷᱤ ᱨᱮᱭᱟᱜ ᱢᱤ ᱵᱤᱸᱰᱟᱹ (ᱜᱮᱞ)' }
    ],
    q1: 'ᱟᱯᱤᱭᱟ (᱓) ᱟᱨ ᱯᱩᱱᱤᱭᱟ (᱔) ᱢᱮᱥᱟ ᱞᱮᱠᱷᱟᱱ ᱛᱤᱱᱟᱹᱜ ᱦᱩᱭᱩᱜ-ᱟ?',
    q1Hindi: '3 और 4 मिलाकर कुल कितने होंगे?',
    q1Opts: ['ᱮᱭᱟᱭ (᱗)', 'ᱛᱩᱨᱩᱭ (᱖)', 'ᱤᱨᱟᱹᱞ (᱘)', 'ᱢᱚᱬᱮ (᱕)'],
    q1OptsHindi: ['7 (सात)', '6 (छह)', '8 (आठ)', '5 (पाँच)'],
    q1Ans: '7 (सात)',
    q1Explanation: '3 + 4 = 7 होता है।',
    q2: '᱑᱐ ᱠᱟᱹᱴᱷᱤ ᱨᱮ ᱛᱤᱱᱟᱹᱜ ᱜᱮᱞ (दहाई) ᱦᱩᱭᱩᱜ-ᱟ?',
    q2Hindi: '10 तीलियों में कितनी दहाई होती है?',
    q2Opts: ['ᱢᱤ ᱜᱮᱞ (᱑)', 'ᱵᱟᱨ (᱒)', 'ᱯᱮ (᱓)', 'ᱯᱩᱱ (᱔)'],
    q2OptsHindi: ['1 दहाई', '2 दहाई', '3 दहाई', '4 दहाई'],
    q2Ans: '1 दहाई',
    q2Explanation: '10 तीलियों से 1 दहाई बनती है।',
    worksheetTitle: 'हो प्राथमिक गणित: 1-9 गिनती अभ्यास',
    worksheetInstr: 'ᱦᱳ ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱠᱚ: ᱡᱚᱛᱚ ᱠᱩᱠᱞᱤ ᱢᱚᱱᱮ ᱮᱢ ᱠᱟᱛᱮ ᱞᱮᱠᱷᱟ ᱚᱞ ᱯᱮ:',
    wPrompts: [
      '1. ᱪᱤᱛᱟᱹᱨ ᱧᱮᱞ ᱠᱟᱛᱮ ᱮᱞ ᱚᱞ ᱯᱮ:',
      '2. ᱔ + ᱓ = ᱛᱤᱱᱟᱹᱜ?',
      '3. ᱟᱢᱟᱜ ᱦᱟᱛᱩ ᱨᱮ ᱢᱮᱱᱟᱜ ᱢᱚᱬᱮ (᱕) ᱡᱤᱱᱤᱥ ᱨᱮᱭᱟᱜ ᱧᱩᱛᱩᱢ ᱚᱞ ᱢᱮ:'
    ],
    wPromptsHindi: [
      '1. चित्र देखकर संख्या लिखें:',
      '2. 4 + 3 = कुल कितने होंगे?',
      '3. अपने गाँव की 5 वस्तुओं के नाम लिखें:'
    ],
    flashcards: [
      { termHindi: 'गिनती', termTargetScript: 'ᱞᱮᱠᱷᱟ (Lekha)', termTargetLatin: 'Lekha', phonetic: '/le.kʰa/', exampleSentence: 'ᱢᱤᱭᱟᱹᱫᱽ ᱠᱷᱚᱱ ᱜᱮᱞ ᱦᱟᱹᱵᱤᱡ ᱞᱮᱠᱷᱟ ᱢᱮ᱾' },
      { termHindi: 'जोड़', termTargetScript: 'ᱡᱚᱲ (ᱢᱮᱥᱟ)', termTargetLatin: 'Jod / Mesa', phonetic: '/dʒoɽ/', exampleSentence: 'ᱵᱟᱨ ᱟᱨ ᱵᱟᱨ ᱢᱮᱥᱟ ᱞᱮᱠᱷᱟᱱ ᱯᱩᱱ ᱛᱟᱱᱟ᱾' },
      { termHindi: 'दहाई', termTargetScript: 'ᱜᱮᱞ (Gel)', termTargetLatin: 'Gel', phonetic: '/ɡel/', exampleSentence: 'ᱜᱮᱞ ᱠᱟᱹᱴᱷᱤ ᱨᱮᱭᱟᱜ ᱢᱤ ᱵᱤᱸᱰᱟᱹ᱾' },
      { termHindi: 'कंकड़', termTargetScript: 'ᱫᱷᱤᱨᱤ (Dhiri)', termTargetLatin: 'Dhiri', phonetic: '/dʱi.ri/', exampleSentence: 'ᱫᱷᱤᱨᱤ ᱛᱮ ᱞᱮᱠᱷᱟ ᱥᱮᱬᱟᱭ ᱢᱮ᱾' }
    ],
    taskTargetLang: 'ᱚᱲᱟᱜ ᱨᱮ ᱙ ᱜᱚᱴᱟᱝ ᱫᱷᱤᱨᱤ ᱡᱟᱣᱨᱟ ᱠᱟᱛᱮ ᱞᱮᱠᱷᱟ ᱢᱮ᱾',
    quiz: [
      { question: '4 + 2 = ?', options: ['6', '5', '7', '8'], correctIndex: 0 },
      { question: 'हो भाषा में 1 को क्या कहते हैं?', options: ['मियाद (Miyad)', 'बारिया (Bariya)', 'आपिया (Apiya)', 'मोड़े (Mone)'], correctIndex: 0 },
      { question: '10 तीलियों से क्या बनता है?', options: ['1 दहाई', '2 दहाई', '0', '100'], correctIndex: 0 },
      { question: '8 - 3 = ?', options: ['5', '6', '4', '3'], correctIndex: 0 }
    ],
    blackboardSummary: {
      keyTerms: ['1 (मियाद)', '2 (बारिया)', '3 (आपिया)', '10 (गेल)'],
      concepts: ['कंकड़ों से मूर्त गिनती', '10 तीलियों का गट्ठा = 1 दहाई', 'जोड़ का अर्थ वस्तुओं का मिलना'],
      homework: 'घर से 10 बीज लाकर 1 गट्ठा बनाएं।'
    }
  },
  hi: {
    objTarget: `विद्यार्थी 1 से 9 तक की संख्याओं को पहचान सकेंगे और कंकड़ व तीलियों से जोड़-घटाव कर सकेंगे।`,
    objHindi: `विद्यार्थी 1 से 9 तक की संख्याओं को पहचान सकेंगे और महुआ के बीज व कंकड़ों से जोड़-घटाव कर सकेंगे।`,
    prerequisites: ['वस्तुओं को छूकर देखना', 'कम-ज्यादा की मौखिक पहचान'],
    introTarget: `आज हम महुआ के बीज और छोटे कंकड़ों की मदद से 1 से 9 तक गिनती और जोड़ सीखेंगे।`,
    introHindi: `आज हम महुआ के बीज और छोटे कंकड़ों की मदद से 1 से 9 तक गिनती और जोड़ सीखेंगे।`,
    explTargetScript: `प्रत्येक वस्तु की एक निश्चित संख्या होती है। 1 से 9 तक की संख्याएं खुली इकाइयां हैं। जैसे ही 10 इकाइयां मिलती हैं, 1 दहाई (एक बंडल) बन जाती है।`,
    explTargetLatin: `Pratyek vastu ki ek nishchit sankhya hoti hai. 1 se 9 tak ikaiyan hain, aur 10 bante hi 1 dahai ban jati hai.`,
    explHindi: `प्रत्येक वस्तु की एक निश्चित संख्या होती है। 1 से 9 तक इकाइयां हैं और 10 बनते ही 1 दहाई बन जाती है।`,
    explSimplerHindi: `जैसे एक हाथ में 5 उंगलियां और दोनों हाथों में मिलाकर 10 उंगलियां होती हैं।`,
    localExDescTarget: `गाँव में महुआ चुनते समय जब हम 10-10 बीजों की ढेरी बनाते हैं या तीलियों का गट्ठा बनाते हैं।`,
    localExDescHindi: `गाँव में महुआ चुनते समय जब हम 10-10 बीजों की ढेरी बनाते हैं या तीलियों का गट्ठा बनाते हैं।`,
    activityTitle: 'कंकड़ व तीली गिनती खेल',
    instructionsTargetLang: '5 कंकड़ लें। उसमें 2 कंकड़ और मिलाएं। गिनकर बताएं कुल कितने हुए (7 कंकड़)।',
    instructionsHindi: '5 कंकड़ लें। उसमें 2 कंकड़ और मिलाएं। गिनकर बताएं कुल कितने हुए (7 कंकड़)।',
    materialsNeeded: ['कंकड़', 'महुआ के बीज', 'झाड़ू की सींकें/तीलियां', 'रबर बैंड'],
    diagramType: 'PEBBLE_COUNTER',
    steps: [
      { stepNumber: 1, hindi: '1 से 5 कंकड़ (इकाई स्तर)', targetLang: '1 से 5 कंकड़ (इकाई स्तर)' },
      { stepNumber: 2, hindi: '5 + 2 = 7 कंकड़ (जोड़ प्रक्रिया)', targetLang: '5 + 2 = 7 कंकड़ (जोड़ प्रक्रिया)' },
      { stepNumber: 3, hindi: '10 तीलियों का 1 बंडल (1 दहाई)', targetLang: '10 तीलियों का 1 बंडल (1 दहाई)' }
    ],
    q1: '5 में 2 कंकड़ मिलाने पर कुल कितने कंकड़ होंगे?',
    q1Hindi: '5 में 2 कंकड़ मिलाने पर कुल कितने कंकड़ होंगे?',
    q1Opts: ['7 (सात)', '6 (छह)', '8 (आठ)', '4 (चार)'],
    q1OptsHindi: ['7 (सात)', '6 (छह)', '8 (आठ)', '4 (चार)'],
    q1Ans: '7 (सात)',
    q1Explanation: '5 + 2 = 7 होता है।',
    q2: '10 तीलियों को बांधने पर कितनी दहाई बनती है?',
    q2Hindi: '10 तीलियों को बांधने पर कितनी दहाई बनती है?',
    q2Opts: ['1 दहाई (एक बंडल)', '2 दहाई', '3 दहाई', '5 दहाई'],
    q2OptsHindi: ['1 दहाई (एक बंडल)', '2 दहाई', '3 दहाई', '5 दहाई'],
    q2Ans: '1 दहाई (एक बंडल)',
    q2Explanation: '10 इकाइयों से 1 दहाई बनती है।',
    worksheetTitle: 'कक्षा 1-2 गणित: 1 से 9 गिनती व जोड़ अभ्यास',
    worksheetInstr: 'सभी प्रश्नों को ध्यान से पढ़ें और उत्तर अपनी अभ्यास पुस्तिका में लिखें:',
    wPrompts: [
      '1. चित्र में दिए महुआ के बीजों को गिनकर संख्या लिखें:',
      '2. 3 + 4 = कुल कितने होंगे?',
      '3. अपने घर में पाई जाने वाली 5 वस्तुओं के नाम लिखें:'
    ],
    wPromptsHindi: [
      '1. चित्र में दिए महुआ के बीजों को गिनकर संख्या लिखें:',
      '2. 3 + 4 = कुल कितने होंगे?',
      '3. अपने घर में पाई जाने वाली 5 वस्तुओं के नाम लिखें:'
    ],
    flashcards: [
      { termHindi: 'गिनती', termTargetScript: 'गिनती (Counting)', termTargetLatin: 'Ginti', phonetic: '/ɡɪn.t̪iː/', exampleSentence: 'हम 1 से 9 तक गिनती सीखते हैं।' },
      { termHindi: 'जोड़', termTargetScript: 'जोड़ (+)', termTargetLatin: 'Jod', phonetic: '/dʒoːɽ/', exampleSentence: 'चीजों को एक साथ मिलाना जोड़ कहलाता है।' },
      { termHindi: 'दहाई (10)', termTargetScript: 'दहाई (Ten)', termTargetLatin: 'Dahai', phonetic: '/d̪ə.ɦaː.iː/', exampleSentence: '10 तीलियों का एक बंडल 1 दहाई है।' },
      { termHindi: 'कंकड़', termTargetScript: 'कंकड़ / रोड़ा', termTargetLatin: 'Kankad', phonetic: '/kə̃ŋ.kəɽ/', exampleSentence: 'कंकड़ों से गिनती सीखना बहुत आसान है।' }
    ],
    taskTargetLang: 'घर में 9 छोटे कंकड़ या बीज इकट्ठा करके माता-पिता के सामने गिनें।',
    quiz: [
      { question: '5 + 2 का मान क्या है?', options: ['7', '6', '8', '4'], correctIndex: 0 },
      { question: '1 दहाई में कितनी इकाइयां होती हैं?', options: ['10', '5', '1', '20'], correctIndex: 0 },
      { question: 'संख्या 8 के ठीक बाद कौन सी संख्या आती है?', options: ['9', '7', '10', '6'], correctIndex: 0 },
      { question: '7 में से 2 घटाने पर क्या बचेगा?', options: ['5', '4', '6', '3'], correctIndex: 0 }
    ],
    blackboardSummary: {
      keyTerms: ['1 (एक)', '5 (पाँच)', '10 (दहाई)', 'जोड़ (+)', 'घटाव (-)'],
      concepts: ['मूर्त वस्तुओं (कंकड़/बीज) से 1-9 गिनती', '10 तीलियों का 1 बंडल = 1 दहाई', 'इकाई व दहाई का स्थानीय मान'],
      homework: 'घर से 10 इमली या महुआ के बीज गिनकर लाएं और 1 बंडल बनाएं।'
    }
  },
  en: {
    objTarget: `Students will recognize numbers from 1 to 9 and perform basic addition and place-value bundling using pebbles and twigs.`,
    objHindi: `विद्यार्थी 1 से 9 तक की संख्याओं को पहचान सकेंगे और कंकड़ व तीलियों से जोड़-घटाव कर सकेंगे।`,
    prerequisites: ['Visual recognition of objects', 'Basic concept of more and less'],
    introTarget: `Today we will learn counting from 1 to 9 using forest seeds and river pebbles from our village.`,
    introHindi: `आज हम महुआ के बीज और कंकड़ों से गिनती सीखेंगे।`,
    explTargetScript: `Every object corresponds to a discrete quantity: 1, 2, 3, 4, 5, 6, 7, 8, 9. When 10 units are bundled together, they form 1 Ten (a bundle).`,
    explTargetLatin: `Every object corresponds to a discrete quantity. When 10 units combine, they form 1 Ten.`,
    explHindi: `प्रत्येक वस्तु की एक निश्चित संख्या होती है। 1 से 9 तक इकाइयां हैं और 10 से 1 दहाई बनती है।`,
    explSimplerHindi: `Like 5 fingers on one hand and 10 fingers on both hands.`,
    localExDescTarget: `Collecting Mahua seeds in the village and bundling 10 twigs together with grass rope.`,
    localExDescHindi: `गाँव में महुआ चुनना और 10 तीलियों का गट्ठा बनाना।`,
    activityTitle: 'Pebble and Twig Counting Game',
    instructionsTargetLang: 'Take 5 smooth pebbles. Add 2 more pebbles. Count the combined set (Total: 7 pebbles).',
    instructionsHindi: '5 कंकड़ लें। 2 और मिलाएं। गिनें (कुल: 7)।',
    materialsNeeded: ['Pebbles', 'Seeds', 'Twigs', 'Rubber bands'],
    diagramType: 'PEBBLE_COUNTER',
    steps: [
      { stepNumber: 1, hindi: '1 to 5 pebbles (Units)', targetLang: '1 to 5 pebbles (Units)' },
      { stepNumber: 2, hindi: '5 + 2 = 7 pebbles (Addition)', targetLang: '5 + 2 = 7 pebbles (Addition)' },
      { stepNumber: 3, hindi: 'Bundle of 10 twigs (1 Ten)', targetLang: 'Bundle of 10 twigs (1 Ten)' }
    ],
    q1: 'What is 5 pebbles plus 2 pebbles?',
    q1Hindi: '5 में 2 कंकड़ मिलाने पर कुल कितने कंकड़ होंगे?',
    q1Opts: ['7 (Seven)', '6 (Six)', '8 (Eight)', '4 (Four)'],
    q1OptsHindi: ['7 (सात)', '6 (छह)', '8 (आठ)', '4 (चार)'],
    q1Ans: '7 (Seven)',
    q1Explanation: '5 + 2 = 7.',
    q2: 'How many units make 1 bundle of Ten?',
    q2Hindi: '10 तीलियों से कितनी दहाई बनती है?',
    q2Opts: ['1 Ten (10 units)', '2 Tens', '3 Tens', '5 Tens'],
    q2OptsHindi: ['1 दहाई', '2 दहाई', '3 दहाई', '5 दहाई'],
    q2Ans: '1 Ten (10 units)',
    q2Explanation: '10 units equal 1 Ten.',
    worksheetTitle: 'Class 1-2 Math: Counting 1-9 & Addition',
    worksheetInstr: 'Solve each question carefully in your notebook:',
    wPrompts: [
      '1. Count the Mahua seeds shown in the drawing and write the numeral:',
      '2. Calculate: 3 + 4 = ?',
      '3. Write the names of 5 count-able items in your home:'
    ],
    wPromptsHindi: [
      '1. चित्र में दिए महुआ के बीजों को गिनकर संख्या लिखें:',
      '2. 3 + 4 = कुल कितने होंगे?',
      '3. अपने घर की 5 वस्तुओं के नाम लिखें:'
    ],
    flashcards: [
      { termHindi: 'गिनती', termTargetScript: 'Counting (1-9)', termTargetLatin: 'Counting', phonetic: '/ˈkaʊn.tɪŋ/', exampleSentence: 'We count objects sequentially from one to nine.' },
      { termHindi: 'जोड़', termTargetScript: 'Addition (+)', termTargetLatin: 'Addition', phonetic: '/əˈdɪʃ.ən/', exampleSentence: 'Combining groups together is addition.' },
      { termHindi: 'दहाई (10)', termTargetScript: 'One Ten (Bundle)', termTargetLatin: 'Ten', phonetic: '/ten/', exampleSentence: 'Ten individual units make one bundle of ten.' },
      { termHindi: 'कंकड़', termTargetScript: 'Pebbles / Stones', termTargetLatin: 'Pebble', phonetic: '/ˈpeb.əl/', exampleSentence: 'Using river pebbles makes math tangible.' }
    ],
    taskTargetLang: 'Collect 9 small pebbles at home and count them out loud for your parents.',
    quiz: [
      { question: 'What is 5 + 2?', options: ['7', '6', '8', '4'], correctIndex: 0 },
      { question: 'How many units make 1 Ten?', options: ['10', '5', '1', '20'], correctIndex: 0 },
      { question: 'Which number comes immediately after 8?', options: ['9', '7', '10', '6'], correctIndex: 0 },
      { question: 'What remains when 2 is subtracted from 7?', options: ['5', '4', '6', '3'], correctIndex: 0 }
    ],
    blackboardSummary: {
      keyTerms: ['1 (One)', '5 (Five)', '10 (One Ten)', 'Addition (+)', 'Subtraction (-)'],
      concepts: ['Concrete counting with pebbles', '10 units = 1 Ten bundle', 'Place value foundation'],
      homework: 'Bring 10 tamarind seeds to class tomorrow bundled with a string.'
    }
  }
};

countingLangMap['kru'] = {
  ...countingLangMap['hi'],
  objTarget: `कुड़ुख़: १ ती ९ गुटे एड़पा अरा कंकड़ ती गिनती अरा जोड़ सीखना।`,
  introTarget: `इन्ना नाम महुआ बीजा अरा कंकड़ ती १ ती ९ तक गिनती अरा जोड़ सिखेगे बरदम।`,
  explTargetScript: `ओन्द-ओन्द ती गिनती: १ (ओन्द), २ (दुई), ३ (मूंद), ४ (नाख), ५ (पंचे)। १० गुटे ती ओन्द दहाई बनि।`
};
countingLangMap['kyw'] = {
  ...countingLangMap['hi'],
  objTarget: `कुड़मालि: १ ले ९ तक गिनती आर कंकड़-बीज ले जोड़-घटाव केर समझ।`,
  introTarget: `आइझ हामरा गाँव केर महुआ बीज आर कंकड़ ले १ ले ९ तक गिनती सिखब।`,
  explTargetScript: `१ (एक), २ (दुइ), ३ (तीन), ४ (चार), ५ (पाँच)। १० टा तीली मिलाइके १ दहाई (मुठा) बनेला।`
};
countingLangMap['unr'] = countingLangMap['sat'];

// 2. FOUNDATIONAL LITERACY (Class 1-2: Family & Village, Phonemes, Picture Reading)
export const literacyLangMap: Record<string, CurriculumTemplateDict> = {
  sat: {
    objTarget: `ᱟᱯᱱᱟᱨ ᱜᱷᱟᱨᱚᱸᱡᱽ (Family) ᱟᱨ ᱟᱹᱛᱩ (Village) ᱨᱮᱭᱟᱜ ᱠᱟᱛᱷᱟ ᱨᱚᱲ ᱟᱨ ᱪᱤᱠᱤ ᱪᱤᱱᱦᱟᱹᱣ ᱥᱮᱬᱟ᱾`,
    objHindi: `विद्यार्थी अपने परिवार, गाँव व परिवेश पर मातृभाषा व हिन्दी में बातचीत कर सकेंगे और आरम्भिक वर्ण पहचान सकेंगे।`,
    prerequisites: ['घर में बोली जाने वाली भाषा समझना', 'चित्रों को देखकर पहचानना'],
    introTarget: `ᱛᱮᱦᱮᱧ ᱫᱚ ᱵᱚᱱ ᱟᱵᱚᱣᱟᱜ ᱥᱚᱱᱚᱛ ᱟᱹᱛᱩ ᱟᱨ ᱜᱷᱟᱨᱚᱸᱡᱽ ᱨᱮᱭᱟᱜ ᱨᱟᱹᱥᱠᱟᱹ ᱠᱟᱛᱷᱟ ᱵᱚᱱ ᱞᱟᱹᱭᱟ᱾`,
    introHindi: `आज हम अपने प्यारे गाँव, माता-पिता, भाई-बहन और घर-आँगन के बारे में बातचीत करेंगे।`,
    explTargetScript: `ᱟᱵᱚᱣᱟᱜ ᱚᱲᱟᱜ ᱨᱮ ᱟᱭᱳ (Ayo), ᱵᱟᱵᱟ (Baba), ᱫᱟᱫᱟ, ᱫᱟᱹᱭ ᱠᱚ ᱛᱟᱦᱮᱸᱱᱟ᱾ ᱟᱹᱛᱩ ᱨᱮ ᱡᱟᱦᱮᱨ ᱛᱷᱟᱱ, ᱥᱟᱨᱡᱚᱢ ᱫᱟᱨᱮ ᱟᱨ ᱠᱩᱞᱦᱤ ᱢᱮᱱᱟᱜ-ᱟ᱾ ᱪᱤᱠᱤ ᱨᱮ: ᱚ (LA), ᱛ (AT), ᱜ (AG), ᱝ (ANG), ᱞ (AL)᱾`,
    explTargetLatin: `Abowag odag re Ayo, Baba, Dada, Dai ko tahena. Atu re Jaher than, Sarjom dare ar Kulhi menag-a.`,
    explHindi: `परिवार हमारे जीवन का आधार है। घर में माँ, पिता, भाई, बहन और दादा-दादी मिलकर रहते हैं। गाँव की गलियों, सरजोम (साल) के पेड़ों और जाहेर थान से हमारा परिवेश बनता है।`,
    explSimplerHindi: `जैसे चिड़िया का घोंसला होता है, वैसे ही हमारा सुंदर परिवार और गाँव होता है।`,
    localExDescTarget: `ᱟᱹᱛᱩ ᱨᱮᱭᱟᱜ ᱠᱩᱞᱦᱤ (Kulhi) ᱨᱮ ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚᱣᱟᱜ ᱮᱱᱮᱡ ᱟᱨ ᱟᱭᱳ ᱥᱟᱶ ᱦᱟᱴ ᱥᱮᱱᱚᱜ᱾`,
    localExDescHindi: `गाँव की कुलही (मुख्य सड़क) में बच्चों का खेलना और माँ के साथ साप्ताहिक हाट जाना।`,
    activityTitle: 'चित्र वाचन व मेरा परिवार चित्रकारी',
    instructionsTargetLang: 'ᱟᱢᱟᱜ ᱚᱲᱟᱜ ᱨᱮᱭᱟᱜ ᱪᱤᱛᱟᱹᱨ ᱵᱮᱱᱟᱣ ᱢᱮ ᱟᱨ ᱟᱭᱳ-ᱵᱟᱵᱟ ᱟᱜ ᱧᱩᱛᱩᱢ ᱪᱤᱠᱤ ᱛᱮ ᱚᱞ ᱢᱮ᱾',
    instructionsHindi: 'अपनी अभ्यास पुस्तिका में अपने घर और परिवार के सदस्यों का चित्र बनाएं और उनके नाम बोलें।',
    materialsNeeded: ['रंगीन पेंसिल', 'सफेद कागज़', 'परिवार के फोटो कार्ड'],
    diagramType: 'PHONEME_CHART',
    steps: [
      { stepNumber: 1, hindi: 'चित्र देखकर परिवार के सदस्यों को पहचानना', targetLang: 'ᱪᱤᱛᱟᱹᱨ ᱧᱮᱞ ᱠᱟᱛᱮ ᱜᱷᱟᱨᱚᱸᱡᱽ ᱦᱚᱲ ᱪᱤᱱᱦᱟᱹᱣ' },
      { stepNumber: 2, hindi: 'मातृभाषा में मौखिक अभिव्यक्ति (आयॊ, बाबा)', targetLang: 'ᱟᱯᱱᱟᱨ ᱯᱟᱹᱨᱥᱤ ᱛᱮ ᱨᱚᱲ (ᱟᱭᱳ, ᱵᱟᱵᱟ)' },
      { stepNumber: 3, hindi: 'वर्ण ध्वनि व चित्र मिलान', targetLang: 'ᱪᱤᱠᱤ ᱨᱟᱦᱟ ᱟᱨ ᱪᱤᱛᱟᱹᱨ ᱡᱚᱲᱟᱣ' }
    ],
    q1: 'ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ ᱢᱟᱸ (Mother) ᱫᱚ ᱪᱮᱫ ᱠᱚ ᱢᱮᱛᱟᱭᱟ?',
    q1Hindi: 'संथाली भाषा में माँ को क्या कहते हैं?',
    q1Opts: ['ᱟᱭᱳ (Ayo)', 'ᱫᱟᱹᱭ (Dai)', 'ᱵᱟᱵᱟ (Baba)', 'ᱢᱟᱹᱭ (Mai)'],
    q1OptsHindi: ['आयॊ (Ayo)', 'दई (Dai)', 'बाबा (Baba)', 'मई (Mai)'],
    q1Ans: 'आयॊ (Ayo)',
    q1Explanation: 'संथाली में माँ को आयॊ (Ayo) कहते हैं।',
    q2: 'ᱟᱹᱛᱩ ᱨᱮ ᱡᱟᱦᱟᱸᱨᱮ ᱥᱟᱨᱦᱩᱞ/ᱵᱟᱦᱟ ᱯᱚᱨᱚᱵᱽ ᱦᱩᱭᱩᱜ-ᱟ ᱚᱱᱟ ᱫᱚ ᱪᱮᱫ ᱠᱟᱱᱟ?',
    q2Hindi: 'गाँव का वह पवित्र स्थान जहाँ बाहा व सरहुल पूजा होती है?',
    q2Opts: ['ᱡᱟᱦᱮᱨ ᱛᱷᱟᱱ (Jaher Than)', 'ᱦᱟᱴ (Market)', 'ᱚᱲᱟᱜ (Home)', 'ᱠᱷᱮᱛ (Field)'],
    q2OptsHindi: ['जाहेर थान (Jaher Than)', 'हाट', 'घर', 'खेत'],
    q2Ans: 'जाहेर थान (Jaher Than)',
    q2Explanation: 'जाहेर थान आदिवासी समुदाय का पवित्र पूजा स्थल है।',
    worksheetTitle: 'कक्षा 1 बुनियादी भाषा: मेरा परिवार व गाँव',
    worksheetInstr: 'ᱪᱤᱛᱟᱹᱨ ᱧᱮᱞ ᱠᱟᱛᱮ ᱠᱟᱛᱷᱟ ᱚᱞ ᱯᱮ:',
    wPrompts: [
      '᱑. ᱟᱢᱟᱜ ᱟᱭᱳ ᱟᱨ ᱵᱟᱵᱟ ᱟᱜ ᱧᱩᱛᱩᱢ ᱚᱞ ᱢᱮ:',
      '᱒. ᱟᱢᱟᱜ ᱟᱹᱛᱩ ᱨᱮᱭᱟᱜ ᱧᱩᱛᱩᱢ ᱪᱮᱫ ᱠᱟᱱᱟ?',
      '᱓. ᱟᱢᱟᱜ ᱜᱟᱛᱮ ᱥᱟᱶ ᱚᱠᱟ ᱮᱱᱮᱡ ᱮᱢ ᱠᱩᱥᱤᱭᱟᱜ-ᱟ?'
    ],
    wPromptsHindi: [
      '1. अपनी माँ और पिताजी का नाम लिखें:',
      '2. आपके गाँव का नाम क्या है?',
      '3. आप अपने मित्रों के साथ कौन सा खेल खेलते हैं?'
    ],
    flashcards: [
      { termHindi: 'माँ', termTargetScript: 'ᱟᱭᱳ (Ayo)', termTargetLatin: 'Ayo', phonetic: '/aː.jo/', exampleSentence: 'ᱤᱧᱤᱡ ᱟᱭᱳ ᱟᱹᱰᱤ ᱫᱩᱞᱟᱹᱲ ᱮᱢᱟᱹᱧᱟ᱾' },
      { termHindi: 'पिताजी', termTargetScript: 'ᱵᱟᱵᱟ (Baba)', termTargetLatin: 'Baba', phonetic: '/ba.ba/', exampleSentence: 'ᱵᱟᱵᱟ ᱠᱷᱮᱛ ᱨᱮ ᱠᱟᱹᱢᱤᱭᱟᱭ᱾' },
      { termHindi: 'गाँव', termTargetScript: 'ᱟᱹᱛᱩ (Atu)', termTargetLatin: 'Atu', phonetic: '/a.tu/', exampleSentence: 'ᱟᱞᱮᱭᱟᱜ ᱟᱹᱛᱩ ᱟᱹᱰᱤ ᱱᱟᱯᱟᱭᱟ᱾' },
      { termHindi: 'घर', termTargetScript: 'ᱚᱲᱟᱜ (Odag)', termTargetLatin: 'Odag', phonetic: '/o.ɽaɡ/', exampleSentence: 'ᱟᱞᱮ ᱚᱲᱟᱜ ᱨᱮ ᱨᱟᱹᱥᱠᱟᱹ ᱛᱮᱞᱮ ᱛᱟᱦᱮᱸᱱᱟ᱾' }
    ],
    taskTargetLang: 'ᱚᱲᱟᱜ ᱨᱮ ᱟᱭᱳ-ᱵᱟᱵᱟ ᱠᱷᱚᱱ ᱟᱹᱛᱩ ᱨᱮᱭᱟᱜ ᱢᱤᱫᱴᱟᱝ ᱠᱟᱹᱦᱱᱤ ᱟᱸᱡᱚᱢ ᱠᱟᱛᱮ ᱜᱟᱯᱟ ᱠᱞᱟᱥ ᱨᱮ ᱞᱟᱹᱭ ᱢᱮ᱾',
    quiz: [
      { question: 'संथाली में माँ को क्या कहते हैं?', options: ['आयॊ (Ayo)', 'दई', 'माई', 'काकी'], correctIndex: 0 },
      { question: 'गाँव के पवित्र वन स्थल को क्या कहा जाता है?', options: ['जाहेर थान', 'हाट', 'थाना', 'चौपाल'], correctIndex: 0 },
      { question: 'परिवार में कौन-कौन होते हैं?', options: ['माता, पिता, भाई, बहन', 'केवल शिक्षक', 'केवल पक्षी', 'कोई नहीं'], correctIndex: 0 },
      { question: 'संथाली भाषा की लिपि कौन सी है?', options: ['ओल चिकी (Ol Chiki)', 'देवनागरी', 'रोमन', 'गुरुमुखी'], correctIndex: 0 }
    ],
    blackboardSummary: {
      keyTerms: ['आयॊ (माँ)', 'बाबा (पिता)', 'आतु (गाँव)', 'ओड़ाग (घर)'],
      concepts: ['मौखिक अभिव्यक्ति व पारिवारिक संबंध', 'गाँव के सामाजिक व सांस्कृतिक परिवेश की समझ', 'ध्वनि व चित्र मिलान'],
      homework: 'घर के 3 सदस्यों के नाम पूछकर कॉपी में लिखें।'
    }
  },
  hoc: {
    objTarget: `𑢹𑣉 𑣎𑣋𑣜: ᱦᱟᱛᱩ (Village) ᱟᱨ ᱚᱲᱟᱜ ᱦᱚᱲ ᱵᱟᱵᱚᱛ ᱨᱚᱲ ᱟᱨ ᱪᱤᱛᱟᱹᱨ ᱧᱮᱞ ᱥᱮᱬᱟ᱾`,
    objHindi: `हो भाषा में परिवार व गाँव की चर्चा तथा बुनियादी शब्दावली का विकास।`,
    prerequisites: ['मातृभाषा सुनना व समझना'],
    introTarget: `ᱛᱮᱦᱮᱧ ᱫᱚ ᱟᱵᱩ ᱟᱵᱩᱣᱟᱜ ᱦᱟᱛᱩ ᱟᱨ ᱮᱸᱜᱟ-ᱟᱯᱩ ᱵᱟᱵᱚᱛ ᱵᱚᱱ ᱨᱚᱲ-ᱟ᱾`,
    introHindi: `आज हम हो भाषा में अपने गाँव और माता-पिता के बारे में बात करेंगे।`,
    explTargetScript: `ᱚᱲᱟᱜ ᱨᱮ ᱮᱸᱜᱟ (Enga - माँ), ᱟᱯᱩ (Apu - पिता), ᱵᱚᱭᱦᱟ ᱠᱚ ᱛᱟᱦᱮᱸᱱᱟ᱾ ᱦᱟᱛᱩ ᱨᱮ ᱫᱮᱥᱟᱣᱞᱤ ᱟᱨ ᱡᱟᱦᱮᱨ ᱢᱮᱱᱟᱜ-ᱟ᱾`,
    explTargetLatin: `Odag re Enga, Apu, Boyha ko tahena. Hatu re Desawli ar Jaher menag-a.`,
    explHindi: `हो समाज में माँ को एँगा (Enga) और पिता को अपु (Apu) कहते हैं। गाँव में देशाउली पवित्र स्थल है।`,
    explSimplerHindi: `हमारा गाँव और परिवार हमें प्यार और सुरक्षा देता है।`,
    localExDescTarget: `ᱦᱟᱛᱩ ᱨᱮ ᱢᱟᱜᱷᱮ ᱯᱚᱨᱚᱵᱽ ᱟᱨ ᱵᱟᱦᱟ ᱯᱚᱨᱚᱵᱽ ᱡᱚᱠᱷᱚᱱ ᱡᱚᱛᱚ ᱦᱚᱲ ᱮᱱᱮᱡ-ᱥᱮᱨᱮᱧᱟ ᱠᱚ᱾`,
    localExDescHindi: `गाँव में माघे और बाहा पर्व पर मांदर की थाप पर सामूहिक नृत्य।`,
    activityTitle: 'हो चित्र वाचन व वार्तालाप',
    instructionsTargetLang: 'ᱟᱢᱟᱜ ᱦᱟᱛᱩ ᱨᱮᱭᱟᱜ ᱪᱤᱛᱟᱹᱨ ᱵᱟᱭ ᱢᱮ ᱟᱨ ᱮᱸᱜᱟ-ᱟᱯᱩ ᱟᱜ ᱧᱩᱛᱩᱢ ᱚᱞ ᱢᱮ᱾',
    instructionsHindi: 'अपने गाँव का चित्र बनाएं और माता-पिता का नाम लिखें।',
    materialsNeeded: ['रंग', 'कागज़'],
    diagramType: 'PHONEME_CHART',
    steps: [
      { stepNumber: 1, hindi: 'हो परिवार परिचय', targetLang: 'ᱦᱳ ᱜᱷᱟᱨᱚᱸᱡᱽ ᱪᱤᱱᱦᱟᱹᱣ' },
      { stepNumber: 2, hindi: 'गाँव का प्राकृतिक परिवेश', targetLang: 'ᱦᱟᱛᱩ ᱨᱮᱭᱟᱜ ᱪᱤᱛᱟᱹᱨ' }
    ],
    q1: 'हो भाषा में माँ को क्या कहते हैं?',
    q1Hindi: 'हो भाषा में माँ को क्या कहते हैं?',
    q1Opts: ['एँगा (Enga)', 'अपु (Apu)', 'दई', 'माई'],
    q1OptsHindi: ['एँगा (Enga)', 'अपु (Apu)', 'दई', 'माई'],
    q1Ans: 'एँगा (Enga)',
    q1Explanation: 'हो भाषा में माँ को एँगा कहा जाता है।',
    q2: 'हो गाँव के पवित्र ग्राम देवता स्थल को क्या कहते हैं?',
    q2Hindi: 'हो गाँव के पवित्र स्थल को क्या कहते हैं?',
    q2Opts: ['देशाउली (Desawli)', 'बाज़ार', 'घर', 'सड़क'],
    q2OptsHindi: ['देशाउली (Desawli)', 'बाज़ार', 'घर', 'सड़क'],
    q2Ans: 'देशाउली (Desawli)',
    q2Explanation: 'देशाउली हो समुदाय का पवित्र ग्राम देव स्थल है।',
    worksheetTitle: 'हो कक्षा 1: मेरा परिवार व गाँव',
    worksheetInstr: 'ᱠᱩᱠᱞᱤ ᱯᱟᱲᱦᱟᱣ ᱠᱟᱛᱮ ᱛᱮᱞᱟ ᱚᱞ ᱯᱮ:',
    wPrompts: ['1. ᱮᱸᱜᱟ ᱟᱨ ᱟᱯᱩ ᱟᱜ ᱧᱩᱛᱩᱢ:', '2. ᱟᱢᱟᱜ ᱦᱟᱛᱩ ᱨᱮᱭᱟᱜ ᱧᱩᱛᱩᱢ:'],
    wPromptsHindi: ['1. माँ और पिता का नाम:', '2. आपके गाँव का नाम:'],
    flashcards: [
      { termHindi: 'माँ', termTargetScript: 'ᱮᱸᱜᱟ (Enga)', termTargetLatin: 'Enga', phonetic: '/eŋ.ga/', exampleSentence: 'ᱮᱸᱜᱟ ᱫᱩᱞᱟᱹᱲ ᱮᱢᱚᱜ-ᱟ᱾' },
      { termHindi: 'पिताजी', termTargetScript: 'ᱟᱯᱩ (Apu)', termTargetLatin: 'Apu', phonetic: '/a.pu/', exampleSentence: 'ᱟᱯᱩ ᱠᱷᱮᱛ ᱨᱮ ᱠᱟᱹᱢᱤᱭᱟᱭ᱾' },
      { termHindi: 'गाँव', termTargetScript: 'ᱦᱟᱛᱩ (Hatu)', termTargetLatin: 'Hatu', phonetic: '/ha.tu/', exampleSentence: 'ᱟᱞᱮ ᱦᱟᱛᱩ ᱟᱹᱰᱤ ᱱᱟᱯᱟᱭᱟ᱾' }
    ],
    taskTargetLang: 'ᱚᱲᱟᱜ ᱨᱮ ᱮᱸᱜᱟ-ᱟᱯᱩ ᱥᱟᱶ ᱦᱟᱛᱩ ᱨᱮᱭᱟᱜ ᱠᱟᱛᱷᱟ ᱨᱚᱲ ᱢᱮ᱾',
    quiz: [
      { question: 'हो भाषा में माँ को क्या कहते हैं?', options: ['एँगा (Enga)', 'अपु', 'दई', 'मई'], correctIndex: 0 },
      { question: 'हो गाँव के देव स्थल का नाम क्या है?', options: ['देशाउली', 'हाट', 'चौक', 'दुकान'], correctIndex: 0 }
    ],
    blackboardSummary: {
      keyTerms: ['एँगा (माँ)', 'अपु (पिता)', 'हातु (गाँव)'],
      concepts: ['पारिवारिक संबंध', 'मातृभाषा में संवाद'],
      homework: 'गाँव का एक चित्र बनाकर लाएं।'
    }
  },
  hi: {
    objTarget: `विद्यार्थी अपने परिवार, गाँव व परिवेश पर मातृभाषा व हिन्दी में बातचीत कर सकेंगे और आरम्भिक वर्ण पहचान सकेंगे।`,
    objHindi: `विद्यार्थी अपने परिवार, गाँव व परिवेश पर मातृभाषा व हिन्दी में बातचीत कर सकेंगे और आरम्भिक वर्ण पहचान सकेंगे।`,
    prerequisites: ['घर में बोली जाने वाली भाषा समझना', 'चित्रों को देखकर पहचानना'],
    introTarget: `आज हम अपने प्यारे परिवार, माता-पिता, गाँव की गलियों और मित्रों के बारे में बातचीत करेंगे।`,
    introHindi: `आज हम अपने प्यारे परिवार, माता-पिता, गाँव की गलियों और मित्रों के बारे में बातचीत करेंगे।`,
    explTargetScript: `परिवार में माँ, पिताजी, भाई, बहन, दादा और दादी मिलकर रहते हैं। हमारा गाँव पेड़-पौधों, कुओं और खेतों से घिरा एक सुंदर परिवेश है।`,
    explTargetLatin: `Parivar mein maa, pitaji, bhai, behen milkar rahte hain. Hamara gaon ped-paudhon se ghira ek sundar parivesh hai.`,
    explHindi: `परिवार हमारे जीवन का आधार है। गाँव का परिवेश हमें प्रकृति और समाज से जोड़ता है।`,
    explSimplerHindi: `जैसे घोंसले में सब चिड़ियाँ मिलकर रहती हैं, वैसे हमारा परिवार होता है।`,
    localExDescTarget: `गाँव के हाट में जाना, चौपाल पर बड़ों की बातें सुनना और शाम को सहेलियों/दोस्तों के साथ खेलना।`,
    localExDescHindi: `गाँव के हाट में जाना, चौपाल पर बड़ों की बातें सुनना और शाम को सहेलियों/दोस्तों के साथ खेलना।`,
    activityTitle: 'मेरा परिवार व मेरा गाँव चित्रकारी',
    instructionsTargetLang: 'अपनी कॉपी में अपने घर और परिवार के सदस्यों का चित्र बनाएं और उनके नाम बोलें।',
    instructionsHindi: 'अपनी कॉपी में अपने घर और परिवार के सदस्यों का चित्र बनाएं और उनके नाम बोलें।',
    materialsNeeded: ['रंग', 'कागज़', 'पेंसिल'],
    diagramType: 'PHONEME_CHART',
    steps: [
      { stepNumber: 1, hindi: 'परिवार के सदस्यों की पहचान', targetLang: 'परिवार के सदस्यों की पहचान' },
      { stepNumber: 2, hindi: 'गाँव के मुख्य स्थानों पर बातचीत', targetLang: 'गाँव के मुख्य स्थानों पर बातचीत' }
    ],
    q1: 'परिवार में हमारा ध्यान कौन रखता है?',
    q1Hindi: 'परिवार में हमारा ध्यान कौन रखता है?',
    q1Opts: ['माता-पिता व परिजन', 'कोई नहीं', 'अजनबी', 'केवल टी.वी.'],
    q1OptsHindi: ['माता-पिता व परिजन', 'कोई नहीं', 'अजनबी', 'केवल टी.वी.'],
    q1Ans: 'माता-पिता व परिजन',
    q1Explanation: 'परिवार में माता-पिता और सभी परिजन एक-दूसरे की देखभाल करते हैं।',
    q2: 'गाँव में ताजी हवा और फल-फूल कहाँ से मिलते हैं?',
    q2Hindi: 'गाँव में ताजी हवा और फल-फूल कहाँ से मिलते हैं?',
    q2Opts: ['पेड़-पौधों व बगीचों से', 'प्लास्टिक से', 'सड़क से', 'कारखानों से'],
    q2OptsHindi: ['पेड़-पौधों व बगीचों से', 'प्लास्टिक से', 'सड़क से', 'कारखानों से'],
    q2Ans: 'पेड़-पौधों व बगीचों से',
    q2Explanation: 'पेड़-पौधे हमें ऑक्सीजन, शुद्ध वायु और फल-फूल देते हैं।',
    worksheetTitle: 'कक्षा 1 भाषा: मेरा परिवार और मेरा गाँव',
    worksheetInstr: 'सभी प्रश्नों के उत्तर अपनी अभ्यास पुस्तिका में लिखें:',
    wPrompts: ['1. अपनी माँ का नाम लिखें:', '2. आपके गाँव का क्या नाम है?'],
    wPromptsHindi: ['1. अपनी माँ का नाम लिखें:', '2. आपके गाँव का क्या नाम है?'],
    flashcards: [
      { termHindi: 'माँ', termTargetScript: 'माँ (Mother)', termTargetLatin: 'Maa', phonetic: '/maː/', exampleSentence: 'माँ हमें बहुत प्यार करती हैं।' },
      { termHindi: 'पिताजी', termTargetScript: 'पिताजी (Father)', termTargetLatin: 'Pitaji', phonetic: '/pɪ.t̪aː.dʒiː/', exampleSentence: 'पिताजी परिवार का संबल हैं।' },
      { termHindi: 'गाँव', termTargetScript: 'गाँव (Village)', termTargetLatin: 'Gaon', phonetic: '/ɡãːw/', exampleSentence: 'हमारा गाँव बहुत सुंदर और हरा-भरा है।' }
    ],
    taskTargetLang: 'घर जाकर माता-पिता से गाँव की एक लोक कहानी सुनें।',
    quiz: [
      { question: 'परिवार में माँ को क्या कहते हैं?', options: ['माता / माँ', 'सहेली', 'अध्यापक', 'डॉक्टर'], correctIndex: 0 },
      { question: 'गाँव का वातावरण कैसा होता है?', options: ['हरा-भरा व शांत', 'धुएं से भरा', 'शोरगुल वाला', 'असुरक्षित'], correctIndex: 0 }
    ],
    blackboardSummary: {
      keyTerms: ['माँ', 'पिताजी', 'गाँव', 'घर'],
      concepts: ['परिवार की भूमिका', 'गाँव का प्राकृतिक वातावरण'],
      homework: 'अपने घर का सुंदर चित्र बनाकर रंग भरें।'
    }
  },
  en: {
    objTarget: `Students will communicate about family and village community, recognizing initial phonemes and vocabulary.`,
    objHindi: `विद्यार्थी अपने परिवार, गाँव व परिवेश पर बातचीत कर सकेंगे।`,
    prerequisites: ['Listening comprehension', 'Visual picture recognition'],
    introTarget: `Today we will talk about our loving family, our village, and the green trees around our home.`,
    introHindi: `आज हम अपने परिवार और गाँव पर बातचीत करेंगे।`,
    explTargetScript: `A family consists of mother, father, siblings, and grandparents who live together in harmony in our village.`,
    explTargetLatin: `A family consists of mother, father, siblings, and grandparents living together in our village.`,
    explHindi: `परिवार हमारे जीवन का आधार है।`,
    explSimplerHindi: `Like birds in a cozy nest, we live happily in our family.`,
    localExDescTarget: `Walking together in the village road, greeting neighbors, and going to the weekly market.`,
    localExDescHindi: `गाँव के हाट जाना और पड़ोसियों से आत्मीयता।`,
    activityTitle: 'My Family & Village Drawing Activity',
    instructionsTargetLang: 'Draw your home and family members in your workbook and label their relations.',
    instructionsHindi: 'अपने परिवार का चित्र बनाएं।',
    materialsNeeded: ['Color pencils', 'Paper'],
    diagramType: 'PHONEME_CHART',
    steps: [
      { stepNumber: 1, hindi: 'परिवार की पहचान', targetLang: 'Identify family members' },
      { stepNumber: 2, hindi: 'गाँव का परिवेश', targetLang: 'Observe village surroundings' }
    ],
    q1: 'Who takes care of children in a family?',
    q1Hindi: 'परिवार में बच्चों की देखभाल कौन करता है?',
    q1Opts: ['Parents and family members', 'Strangers', 'Nobody', 'Television'],
    q1OptsHindi: ['माता-पिता व परिजन', 'अजनबी', 'कोई नहीं', 'टीवी'],
    q1Ans: 'Parents and family members',
    q1Explanation: 'Parents and family members nurture and care for children.',
    q2: 'Where do fresh fruits and clean air come from in a village?',
    q2Hindi: 'गाँव में ताजी हवा कहाँ से मिलती है?',
    q2Opts: ['Trees and plants', 'Plastics', 'Vehicles', 'Factories'],
    q2OptsHindi: ['पेड़-पौधों से', 'प्लास्टिक से', 'वाहनों से', 'कारखानों से'],
    q2Ans: 'Trees and plants',
    q2Explanation: 'Trees produce oxygen and fresh fruit.',
    worksheetTitle: 'Class 1 Literacy: My Family and Village',
    worksheetInstr: 'Answer each question in your workbook:',
    wPrompts: ['1. Write your mother\'s name:', '2. What is the name of your village?'],
    wPromptsHindi: ['1. माँ का नाम:', '2. गाँव का नाम:'],
    flashcards: [
      { termHindi: 'माँ', termTargetScript: 'Mother', termTargetLatin: 'Mother', phonetic: '/ˈmʌð.ər/', exampleSentence: 'My mother cares for me with love.' },
      { termHindi: 'पिताजी', termTargetScript: 'Father', termTargetLatin: 'Father', phonetic: '/ˈfɑː.ðər/', exampleSentence: 'Father works diligently in the fields.' },
      { termHindi: 'गाँव', termTargetScript: 'Village', termTargetLatin: 'Village', phonetic: '/ˈvɪl.ɪdʒ/', exampleSentence: 'Our village is verdant and serene.' }
    ],
    taskTargetLang: 'Ask your grandparents for a folk story tonight and narrate it in class tomorrow.',
    quiz: [
      { question: 'Who is the female parent?', options: ['Mother', 'Friend', 'Neighbor', 'Teacher'], correctIndex: 0 },
      { question: 'What makes a village beautiful?', options: ['Green trees and peace', 'Heavy smoke', 'Loud horns', 'Litter'], correctIndex: 0 }
    ],
    blackboardSummary: {
      keyTerms: ['Mother', 'Father', 'Village', 'Home'],
      concepts: ['Family bonds', 'Rural community awareness'],
      homework: 'Draw a picture of your house.'
    }
  }
};

literacyLangMap['kru'] = {
  ...literacyLangMap['hi'],
  objTarget: `कुड़ुख़: तमहै एड़पा (परिवार) अरा पद्दा (गाँव) गही कत्था ती रोड़ा अरा अक्षर पहचानना।`,
  introTarget: `इन्ना नाम तमहै एड़पा, अयंग (माँ), बम्बंग (पिता) अरा पद्दा गही कत्था नू बात-चीत करबो।`,
  explTargetScript: `एड़पा नू अयंग (माँ), बम्बंग (पिता), ददा, दई संगे रह'नर। पद्दा नू जाहेर अरा अखड़ा मनि।`
};
literacyLangMap['kyw'] = {
  ...literacyLangMap['hi'],
  objTarget: `कुड़मालि: आपन परिवार आर गाँव केर चरचा आर मातृभाषा महान अभिव्यक्ति।`,
  introTarget: `आइझ हामरा आपन गाँव, माय-बाप आर घर-आँगन केर बारे महान बात करब।`,
  explTargetScript: `घर महान माय (माँ), बाप (पिता), भाय-बहीन सभे मिली-जुली रहेला। गाँव केर कुलही महान खेल-कूद होवेला।`
};
literacyLangMap['unr'] = literacyLangMap['sat'];

// 3. TRIBAL HERITAGE & HEROES (Class 3-5: Birsa Munda, Sidhu-Kanhu, Sohrai Heritage, Sarhul)
export const heritageLanguageMap: Record<string, CurriculumTemplateDict> = {
  sat: {
    objTarget: `ᱵᱤᱨᱥᱟᱹ ᱢᱩᱱᱰᱟ ᱟᱨ ᱥᱤᱫᱷᱩ-ᱠᱟᱹᱱᱦᱩ ᱣᱟᱜ ᱞᱟᱹᱲᱦᱟᱹᱭ ᱟᱨ ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱨᱮᱭᱟᱜ ᱜᱚᱨᱚᱵᱽ ᱵᱟᱰᱟᱭ᱾`,
    objHindi: `विद्यार्थी भगवान बिरसा मुंडा, सिधु-कान्हू के उलगुलान व झारखंड के गौरवशाली जनजातीय इतिहास को समझ सकेंगे।`,
    prerequisites: ['झारखंड राज्य के बारे में सामान्य जानकारी'],
    introTarget: `ᱛᱮᱦᱮᱧ ᱫᱚ ᱵᱚᱱ ᱫᱷᱟᱹᱨᱛᱤ ᱟᱵᱟ ᱵᱤᱨᱥᱟᱹ ᱢᱩᱱᱰᱟ ᱟᱨ ᱥᱟᱱᱛᱟᱲ ᱦᱩᱞ ᱨᱤᱱᱤᱡ ᱥᱤᱫᱷᱩ-ᱠᱟᱹᱱᱦᱩ ᱵᱟᱵᱚᱛ ᱵᱚᱱ ᱪᱮᱫ-ᱟ᱾`,
    introHindi: `आज हम धरती आबा भगवान बिरसा मुंडा और संथाल हूल के नायक सिधु-कान्हू की अमर गाथा पढ़ेंगे।`,
    explTargetScript: `ᱵᱤᱨᱥᱟᱹ ᱢᱩᱱᱰᱟ ᱫᱚ ᱑᱕ ᱱᱚᱵᱷᱮᱢᱵᱚᱨ ᱑᱘᱗᱕ ᱥᱟᱞ ᱨᱮ ᱩᱞᱤᱦᱟᱹᱛᱩ (Ulihatu, Khunti) ᱨᱮ ᱡᱟᱱᱟᱢ ᱞᱮᱱᱟᱭ᱾ ᱩᱱᱤ ᱫᱚ 'ᱩᱞᱜᱩᱞᱟᱱ' (Ulgulan - ᱢᱟᱨᱟᱝ ᱞᱟᱹᱲᱦᱟᱹᱭ) ᱮ ᱮᱦᱚᱵ ᱞᱮᱫ-ᱟ ᱟᱨ ᱟᱵᱚᱣᱟᱜ ᱦᱟᱥᱟ, ᱵᱤᱨ-ᱵᱩᱨᱩ ᱟᱨ ᱢᱟᱹᱱ ᱮ ᱨᱩᱠᱷᱤᱭᱟᱹ ᱞᱮᱫ-ᱟ᱾ ᱩᱱᱤ ᱫᱚ 'ᱫᱷᱟᱹᱨᱛᱤ ᱟᱵᱟ' (Dharti Aba) ᱠᱚ ᱢᱮᱛᱟᱭᱟ᱾`,
    explTargetLatin: `Birsa Munda do 15 November 1875 sal re Ulihatu re janam lenaye. Uni do 'Ulgulan' e ehob led-a ar abowag hasa, bir-buru ar man e rukhiya led-a. Uni do 'Dharti Aba' ko metaye-a.`,
    explHindi: `बिरसा मुंडा का जन्म 15 नवंबर 1875 को खूंटी जिले के उलिहातू गाँव में हुआ था। उन्होंने जल, जंगल, जमीन और अपनी संस्कृति की रक्षा के लिए 'उलगुलान' (महाविद्रोह) का नेतृत्व किया। उन्हें आदर से 'धरती आबा' कहा जाता है।`,
    explSimplerHindi: `बिरसा मुंडा हमारे वो वीर नायक हैं जिन्होंने हमें जंगलों की रक्षा करना और अन्याय के आगे न झुकना सिखाया।`,
    localExDescTarget: `ᱠᱷᱩᱸᱴᱤ ᱨᱮᱭᱟᱜ ᱩᱞᱤᱦᱟᱹᱛᱩ ᱟᱨ ᱰᱚᱢᱵᱟᱨᱤ ᱵᱩᱨᱩ (Dombari Buru) ᱡᱟᱦᱟᱸᱨᱮ ᱵᱤᱨᱥᱟᱹ ᱢᱩᱱᱰᱟ ᱫᱤᱥᱚᱢ ᱦᱚᱲ ᱮ ᱡᱟᱣᱨᱟ ᱞᱮᱫ ᱠᱚᱣᱟ᱾`,
    localExDescHindi: `खूंटी के डोंबारी बुरु की पहाड़ियाँ जहाँ बिरसा मुंडा ने तीर-धनुष के साथ जनसभा की थी।`,
    activityTitle: 'उलगुलान वीर गाथा व तीर-धनुष चित्रकला',
    instructionsTargetLang: 'ᱵᱤᱨᱥᱟᱹ ᱢᱩᱱᱰᱟ ᱣᱟᱜ ᱢᱩᱴᱷᱟᱹᱱ ᱟᱨ ᱟᱜ-ᱥᱟᱨ (Bow & Arrow) ᱨᱮᱭᱟᱜ ᱪᱤᱛᱟᱹᱨ ᱵᱮᱱᱟᱣ ᱢᱮ᱾',
    instructionsHindi: 'बिरसा मुंडा का चित्र और उनके प्रतीक पारंपरिक तीर-धनुष का चित्र बनाएं और उनके विचार लिखें।',
    materialsNeeded: ['चित्रकला चार्ट', 'रंग'],
    diagramType: 'HERO_TIMELINE',
    steps: [
      { stepNumber: 1, hindi: '1875: उलिहातू (खूंटी) में बिरसा मुंडा का जन्म', targetLang: '᱑᱘᱗᱕: ᱩᱞᱤᱦᱟᱹᱛᱩ ᱨᱮ ᱵᱤᱨᱥᱟᱹ ᱢᱩᱱᱰᱟ ᱣᱟᱜ ᱡᱟᱱᱟᱢ' },
      { stepNumber: 2, hindi: '1895-1900: उलगुलान महाविद्रोह का नेतृत्व', targetLang: '᱑᱘᱙᱕-᱑᱙᱐᱐: ᱩᱞᱜᱩᱞᱟᱱ ᱢᱟᱨᱟᱝ ᱞᱟᱹᱲᱦᱟᱹᱭ' },
      { stepNumber: 3, hindi: 'जल, जंगल, जमीन व स्वाभिमान की रक्षा', targetLang: 'ᱦᱟᱥᱟ, ᱵᱤᱨ-ᱵᱩᱨᱩ ᱟᱨ ᱢᱟᱹᱱ ᱨᱩᱠᱷᱤᱭᱟᱹ' }
    ],
    q1: 'ᱵᱤᱨᱥᱟᱹ ᱢᱩᱱᱰᱟ ᱫᱚ ᱪᱮᱫ ᱧᱩᱛᱩᱢ ᱛᱮ ᱠᱚ ᱦᱚᱦᱚᱣᱟᱭᱟ?',
    q1Hindi: 'भगवान बिरसा मुंडा को आदर से क्या कहा जाता है?',
    q1Opts: ['ᱫᱷᱟᱹᱨᱛᱤ ᱟᱵᱟ (Dharti Aba)', 'ᱜᱩᱨᱩ ᱜᱚᱢᱠᱮ', 'ᱫᱤᱥᱚᱢ ᱜᱩᱨᱩ', 'ᱢᱟᱨᱟᱝ ᱜᱚᱢᱠᱮ'],
    q1OptsHindi: ['धरती आबा (Dharti Aba)', 'गुरु गोमके', 'दिसोम गुरु', 'मरांग गोमके'],
    q1Ans: 'धरती आबा (Dharti Aba)',
    q1Explanation: 'बिरसा मुंडा को समस्त जनमानस "धरती आबा" (विश्व पिता) कहकर नमन करता है।',
    q2: 'ᱵᱤᱨᱥᱟᱹ ᱢᱩᱱᱰᱟ ᱣᱟᱜ ᱡᱟᱱᱟᱢ ᱢᱟᱦᱟᱸ ᱚᱠᱟ ᱦᱤᱞᱚᱜ ᱠᱟᱱᱟ?',
    q2Hindi: 'बिरसा मुंडा का जन्म किस ऐतिहासिक तिथि को हुआ था?',
    q2Opts: ['᱑᱕ ᱱᱚᱵᱷᱮᱢᱵᱚᱨ (15 Nov)', '᱒ ᱚᱠᱴᱚᱵᱚᱨ', '᱑᱕ ᱚᱜᱚᱥᱴ', '᱒᱖ ᱡᱟᱱᱩᱣᱟᱨᱤ'],
    q2OptsHindi: ['15 नवंबर (15 Nov)', '2 अक्टूबर', '15 अगस्त', '26 जनवरी'],
    q2Ans: '15 नवंबर (15 Nov)',
    q2Explanation: '15 नवंबर 1875 को बिरसा मुंडा का जन्म हुआ। इसी दिन झारखंड राज्य स्थापना दिवस भी मनाया जाता है।',
    worksheetTitle: 'कक्षा 4-5 भाषा व इतिहास: धरती आबा बिरसा मुंडा',
    worksheetInstr: 'ᱡᱚᱛᱚ ᱠᱩᱠᱞᱤ ᱢᱚᱱᱮ ᱮᱢ ᱠᱟᱛᱮ ᱚᱞ ᱯᱮ:',
    wPrompts: [
      '᱑. ᱵᱤᱨᱥᱟᱹ ᱢᱩᱱᱰᱟ ᱣᱟᱜ ᱡᱟᱱᱟᱢ ᱟᱹᱛᱩ ᱨᱮᱭᱟᱜ ᱧᱩᱛᱩᱢ ᱚᱞ ᱢᱮ:',
      '᱒. \'ᱩᱞᱜᱩᱞᱟᱱ\' (Ulgulan) ᱢᱮᱱᱞᱮᱠᱷᱟᱱ ᱪᱮᱫ?',
      '᱓. ᱟᱵᱚᱣᱟᱜ ᱵᱤᱨ-ᱵᱩᱨᱩ ᱪᱮᱫᱟᱜ ᱨᱩᱠᱷᱤᱭᱟᱹ ᱞᱟᱹᱠᱛᱤᱭᱟ?'
    ],
    wPromptsHindi: [
      '1. बिरसा मुंडा के जन्म गाँव और जिले का नाम लिखें:',
      '2. "उलगुलान" शब्द का क्या अर्थ है?',
      '3. हमें अपने जंगलों और जल स्रोतों की रक्षा क्यों करनी चाहिए?'
    ],
    flashcards: [
      { termHindi: 'धरती आबा', termTargetScript: 'ᱫᱷᱟᱹᱨᱛᱤ ᱟᱵᱟ', termTargetLatin: 'Dharti Aba', phonetic: '/dʱaːr.t̪i aː.baː/', exampleSentence: 'ᱵᱤᱨᱥᱟᱹ ᱢᱩᱱᱰᱟ ᱫᱚ ᱫᱷᱟᱹᱨᱛᱤ ᱟᱵᱟ ᱠᱟᱱᱟᱭ᱾' },
      { termHindi: 'उलगुलान', termTargetScript: 'ᱩᱞᱜᱩᱞᱟᱱ (ᱢᱟᱨᱟᱝ ᱞᱟᱹᱲᱦᱟᱹᱭ)', termTargetLatin: 'Ulgulan', phonetic: '/ul.ɡu.laːn/', exampleSentence: 'ᱩᱞᱜᱩᱞᱟᱱ ᱫᱚ ᱦᱟᱥᱟ-ᱫᱩᱞᱟᱹᱲ ᱨᱮᱭᱟᱜ ᱞᱟᱹᱲᱦᱟᱹᱭ ᱠᱟᱱᱟ᱾' },
      { termHindi: 'तीर-धनुष', termTargetScript: 'ᱟᱜ-ᱥᱟᱨ (Ag-Sar)', termTargetLatin: 'Ag-Sar', phonetic: '/aːɡ saːr/', exampleSentence: 'ᱟᱜ-ᱥᱟᱨ ᱫᱚ ᱟᱹᱫᱤᱵᱟᱹᱥᱤ ᱨᱤᱱᱤᱡ ᱪᱤᱱᱦᱟᱹ ᱠᱟᱱᱟ᱾' }
    ],
    taskTargetLang: 'ᱟᱹᱛᱩ ᱨᱤᱱ ᱢᱟᱨᱟᱝ ᱦᱚᱲ ᱠᱷᱚᱱ ᱵᱤᱨᱥᱟᱹ ᱢᱩᱱᱰᱟ ᱣᱟᱜ ᱢᱤᱫᱴᱟᱝ ᱥᱮᱨᱮᱧ ᱟᱸᱡᱚᱢ ᱠᱟᱛᱮ ᱪᱮᱫ ᱢᱮ᱾',
    quiz: [
      { question: 'बिरसा मुंडा का जन्म किस गाँव में हुआ था?', options: ['उलिहातू (खूंटी)', 'भोगनाडीह', 'तमाड़', 'चाईबासा'], correctIndex: 0 },
      { question: 'झारखंड राज्य स्थापना दिवस किस तिथि को मनाया जाता है?', options: ['15 नवंबर', '15 अगस्त', '26 जनवरी', '1 मई'], correctIndex: 0 },
      { question: 'उलगुलान का मुख्य उद्देश्य क्या था?', options: ['जल, जंगल, जमीन व स्वाभिमान की रक्षा', 'केवल व्यापार', 'शहरीकरण', 'कोई नहीं'], correctIndex: 0 },
      { question: 'संथाल हूल (1855) के महानायक कौन थे?', options: ['सिधु-कान्हू', 'बाबर', 'शेरशाह', 'अकबर'], correctIndex: 0 }
    ],
    blackboardSummary: {
      keyTerms: ['धरती आबा', 'उलिहातू (खूंटी)', 'उलगुलान (विद्रोह)', 'जल-जंगल-जमीन'],
      concepts: ['जनजातीय स्वतंत्रता संग्राम', 'पारंपरिक प्राकृतिक संसाधनों का संरक्षण', 'झारखंड राज्य गौरव'],
      homework: 'बिरसा मुंडा पर 5 पंक्तियों का छोटा निबंध लिखें।'
    }
  },
  hi: {
    objTarget: `विद्यार्थी भगवान बिरसा मुंडा, सिधु-कान्हू के उलगुलान व झारखंड के गौरवशाली जनजातीय इतिहास को समझ सकेंगे।`,
    objHindi: `विद्यार्थी भगवान बिरसा मुंडा, सिधु-कान्हू के उलगुलान व झारखंड के गौरवशाली जनजातीय इतिहास को समझ सकेंगे।`,
    prerequisites: ['झारखंड राज्य के बारे में सामान्य जानकारी'],
    introTarget: `आज हम धरती आबा भगवान बिरसा मुंडा और सिधु-कान्हू के अमर बलिदान की वीर गाथा पढ़ेंगे।`,
    introHindi: `आज हम धरती आबा भगवान बिरसा मुंडा और सिधु-कान्हू के अमर बलिदान की वीर गाथा पढ़ेंगे।`,
    explTargetScript: `भगवान बिरसा मुंडा का जन्म 15 नवंबर 1875 को खूंटी जिले के उलिहातू गाँव में हुआ। उन्होंने अन्याय के विरुद्ध 'उलगुलान' (महाविद्रोह) का शंखनाद किया और जल, जंगल, जमीन तथा आदि संस्कृति की रक्षा की।`,
    explTargetLatin: `Bhagwan Birsa Munda ka janam 15 November 1875 ko Ulihatu gaon mein hua. Unhone Ulgulan ka shankhnaad kiya.`,
    explHindi: `भगवान बिरसा मुंडा का जन्म 15 नवंबर 1875 को खूंटी के उलिहातू गाँव में हुआ। उन्हें 'धरती आबा' कहा जाता है।`,
    explSimplerHindi: `बिरसा मुंडा हमारे वो अमर स्वतंत्रता सेनानी हैं जिन्होंने हमें स्वाभिमान से जीना सिखाया।`,
    localExDescTarget: `खूंटी की डोंबारी बुरु पहाड़ियाँ, जहाँ बिरसा मुंडा ने तीर-धनुष लिए हज़ारों ग्रामवासियों को संबोधित किया था।`,
    localExDescHindi: `खूंटी की डोंबारी बुरु पहाड़ियाँ, जहाँ बिरसा मुंडा ने तीर-धनुष लिए हज़ारों ग्रामवासियों को संबोधित किया था।`,
    activityTitle: 'उलगुलान वीर गाथा व तीर-धनुष चित्रकला',
    instructionsTargetLang: 'बिरसा मुंडा का चित्र और पारंपरिक तीर-धनुष बनाकर उनके प्रमुख नारे लिखें।',
    instructionsHindi: 'बिरसा मुंडा का चित्र और पारंपरिक तीर-धनुष बनाकर उनके प्रमुख नारे लिखें।',
    materialsNeeded: ['चित्रकला चार्ट', 'रंग'],
    diagramType: 'HERO_TIMELINE',
    steps: [
      { stepNumber: 1, hindi: '1875: उलिहातू (खूंटी) में बिरसा मुंडा का जन्म', targetLang: '1875: उलिहातू (खूंटी) में बिरसा मुंडा का जन्म' },
      { stepNumber: 2, hindi: '1895-1900: उलगुलान महाविद्रोह का नेतृत्व', targetLang: '1895-1900: उलगुलान महाविद्रोह का नेतृत्व' },
      { stepNumber: 3, hindi: 'जल, जंगल, जमीन व स्वाभिमान की रक्षा', targetLang: 'जल, जंगल, जमीन व स्वाभिमान की रक्षा' }
    ],
    q1: 'भगवान बिरसा मुंडा को आदर से क्या कहा जाता है?',
    q1Hindi: 'भगवान बिरसा मुंडा को आदर से क्या कहा जाता है?',
    q1Opts: ['धरती आबा (Dharti Aba)', 'गुरु गोमके', 'दिसोम गुरु', 'मरांग गोमके'],
    q1OptsHindi: ['धरती आबा (Dharti Aba)', 'गुरु गोमके', 'दिसोम गुरु', 'मरांग गोमके'],
    q1Ans: 'धरती आबा (Dharti Aba)',
    q1Explanation: 'बिरसा मुंडा को समस्त जनमानस "धरती आबा" कहकर नमन करता है।',
    q2: 'बिरसा मुंडा का जन्म किस ऐतिहासिक तिथि को हुआ था?',
    q2Hindi: 'बिरसा मुंडा का जन्म किस ऐतिहासिक तिथि को हुआ था?',
    q2Opts: ['15 नवंबर (15 Nov)', '2 अक्टूबर', '15 अगस्त', '26 जनवरी'],
    q2OptsHindi: ['15 नवंबर (15 Nov)', '2 अक्टूबर', '15 अगस्त', '26 जनवरी'],
    q2Ans: '15 नवंबर (15 Nov)',
    q2Explanation: '15 नवंबर 1875 को बिरसा मुंडा का जन्म हुआ। इसी दिन झारखंड राज्य स्थापना दिवस भी मनाया जाता है।',
    worksheetTitle: 'कक्षा 4-5 भाषा व इतिहास: धरती आबा बिरसा मुंडा',
    worksheetInstr: 'सभी प्रश्नों के उत्तर अपनी अभ्यास पुस्तिका में लिखें:',
    wPrompts: [
      '1. बिरसा मुंडा के जन्म गाँव और जिले का नाम लिखें:',
      '2. "उलगुलान" शब्द का क्या अर्थ है?',
      '3. हमें अपने जंगलों और जल स्रोतों की रक्षा क्यों करनी चाहिए?'
    ],
    wPromptsHindi: [
      '1. बिरसा मुंडा के जन्म गाँव और जिले का नाम लिखें:',
      '2. "उलगुलान" शब्द का क्या अर्थ है?',
      '3. हमें अपने जंगलों और जल स्रोतों की रक्षा क्यों करनी चाहिए?'
    ],
    flashcards: [
      { termHindi: 'धरती आबा', termTargetScript: 'धरती आबा (विश्व पिता)', termTargetLatin: 'Dharti Aba', phonetic: '/dʱaːr.t̪i aː.baː/', exampleSentence: 'बिरसा मुंडा को समस्त भारत धरती आबा के नाम से जानता है।' },
      { termHindi: 'उलगुलान', termTargetScript: 'उलगुलान (महाविद्रोह)', termTargetLatin: 'Ulgulan', phonetic: '/ul.ɡu.laːn/', exampleSentence: 'उलगुलान मातृभूमि की रक्षा का आंदोलन था।' },
      { termHindi: 'तीर-धनुष', termTargetScript: 'तीर-धनुष (धनुष-बाण)', termTargetLatin: 'Teer-Dhanush', phonetic: '/t̪iːr dʱə.nʊʃ/', exampleSentence: 'तीर-धनुष पारंपरिक आत्मरक्षा व स्वाभिमान का प्रतीक है।' }
    ],
    taskTargetLang: 'गाँव के बुजुर्गों से बिरसा मुंडा के लोकगीत सुनकर कक्षा में सुनाएं।',
    quiz: [
      { question: 'बिरसा मुंडा का जन्म किस गाँव में हुआ था?', options: ['उलिहातू (खूंटी)', 'भोगनाडीह', 'तमाड़', 'चाईबासा'], correctIndex: 0 },
      { question: 'झारखंड राज्य स्थापना दिवस किस तिथि को मनाया जाता है?', options: ['15 नवंबर', '15 अगस्त', '26 जनवरी', '1 मई'], correctIndex: 0 },
      { question: 'उलगुलान का मुख्य उद्देश्य क्या था?', options: ['जल, जंगल, जमीन व स्वाभिमान की रक्षा', 'व्यापार', 'शहरीकरण', 'कोई नहीं'], correctIndex: 0 },
      { question: 'संथाल हूल (1855) के महानायक कौन थे?', options: ['सिधु-कान्हू', 'बाबर', 'शेरशाह', 'अकबर'], correctIndex: 0 }
    ],
    blackboardSummary: {
      keyTerms: ['धरती आबा', 'उलिहातू (खूंटी)', 'उलगुलान (विद्रोह)', 'जल-जंगल-जमीन'],
      concepts: ['जनजातीय स्वतंत्रता संग्राम', 'पारंपरिक प्राकृतिक संसाधनों का संरक्षण', 'झारखंड राज्य गौरव'],
      homework: 'बिरसा मुंडा पर 5 पंक्तियों का छोटा निबंध लिखें।'
    }
  }
};

heritageLanguageMap['hoc'] = heritageLanguageMap['sat'];
heritageLanguageMap['unr'] = heritageLanguageMap['sat'];
heritageLanguageMap['en'] = {
  ...heritageLanguageMap['hi'],
  objTarget: `Students will understand the legacy of Bhagwan Birsa Munda, the Ulgulan movement, and Jharkhand's tribal heritage.`,
  introTarget: `Today we honor Dharti Aba Bhagwan Birsa Munda and the brave heroes of Jharkhand's tribal freedom movement.`,
  explTargetScript: `Bhagwan Birsa Munda was born on November 15, 1875 in Ulihatu, Khunti. He led the historic 'Ulgulan' to defend indigenous land and forest rights.`,
  explTargetLatin: `Bhagwan Birsa Munda was born on November 15, 1875 in Ulihatu, Khunti. He led the historic Ulgulan.`
};
heritageLanguageMap['kru'] = {
  ...heritageLanguageMap['hi'],
  objTarget: `कुड़ुख़: भगवान बिरसा मुंडा अरा सिधु-कान्हू गही उलगुलान अरा झारखंड गही गौरव गही कत्था सीखना।`,
  introTarget: `इन्ना नाम धरती आबा बिरसा मुंडा गही वीर गाथा पढ़बो।`
};
heritageLanguageMap['kyw'] = {
  ...heritageLanguageMap['hi'],
  objTarget: `कुड़मालि: धरती आबा भगवान बिरसा मुंडा केर उलगुलान आर झारखंड केर वीर इतिहास केर समझ।`,
  introTarget: `आइझ हामरा बिरसा मुंडा आर सिधु-कान्हू केर अमर बलिदान केर बात करब।`
};

// 4. EVS & NATURE / WATER CONSERVATION (Class 3-5: Dari & Chuan Water, Forests of Saranda, Seed Dispersal)
export const natureWaterLangMap: Record<string, CurriculumTemplateDict> = {
  sat: {
    objTarget: `ᱟᱹᱛᱩ ᱨᱮᱭᱟᱜ ᱫᱟᱜ ᱨᱮᱭᱟᱜ ᱡᱷᱟᱨᱱᱟ (ᱫᱟᱹᱨᱤ, ᱪᱩᱣᱟᱸ) ᱟᱨ ᱵᱤᱨ-ᱵᱩᱨᱩ ᱨᱩᱠᱷᱤᱭᱟᱹ ᱵᱟᱰᱟᱭ᱾`,
    objHindi: `विद्यार्थी झारखंड के पारंपरिक जल स्रोतों (दरी, चुआं, बांध) और जल संरक्षण के उपायों को समझ सकेंगे।`,
    prerequisites: ['पानी के दैनिक उपयोग की समझ'],
    introTarget: `ᱛᱮᱦᱮᱧ ᱫᱚ ᱵᱚᱱ ᱟᱵᱚ ᱟᱹᱛᱩ ᱨᱮᱭᱟᱜ ᱫᱟᱹᱨᱤ-ᱪᱩᱣᱟᱸ (Water springs) ᱟᱨ ᱫᱟᱜ ᱨᱩᱠᱷᱤᱭᱟᱹ ᱵᱟᱵᱚᱛ ᱵᱚᱱ ᱪᱮᱫ-ᱟ᱾`,
    introHindi: `आज हम अपने गाँव की दरी (प्राकृतिक झरना), चुआं और जल संरक्षण के पारंपरिक तरीकों के बारे में जानेंगे।`,
    explTargetScript: `ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱨᱮ ᱵᱩᱨᱩ ᱠᱷᱚᱱ ᱡᱟᱦᱟᱸ ᱥᱚᱱᱚᱛ ᱫᱟᱜ ᱚᱰᱚᱠᱚᱜ-ᱟ ᱚᱱᱟ ᱫᱚ 'ᱫᱟᱹᱨᱤ' (Dari - Spring) ᱠᱚ ᱢᱮᱛᱟᱜ-ᱟ᱾ ᱜᱟᱰᱟ ᱜᱤᱛᱤᱞ ᱨᱮ ᱠᱷᱟᱸᱫᱽᱨᱤ ᱠᱟᱛᱮ ᱧᱟᱢᱚᱜ ᱫᱟᱜ ᱫᱚ 'ᱪᱩᱣᱟᱸ' (Chuan) ᱠᱟᱱᱟ᱾ ᱫᱟᱜ ᱫᱚ ᱡᱤᱣᱤ ᱠᱟᱱᱟ, ᱚᱱᱟ ᱵᱟᱧᱪᱟᱣ ᱫᱚᱦᱚ ᱟᱵᱚᱣᱟᱜ ᱠᱟᱹᱢᱤ ᱠᱟᱱᱟ᱾`,
    explTargetLatin: `Jharkhand re buru khon jaha sonot daag odokog-a ona do 'Dari' ko metag-a. Gada gitil re khandri kate ñamog daag do 'Chuan' kana.`,
    explHindi: `छोटानागपुर के पठार में जब चट्टानों के बीच से शीतल जल फूटकर निकलता है, तो उसे 'दरी' (प्राकृतिक चश्मा) कहते हैं। नदी-नालों की रेत में खोदा गया छोटा जलकुंड 'चुआं' कहलाता है। वर्षा जल का संचयन ही हमारे गाँव को हरा-भरा रखता है।`,
    explSimplerHindi: `जैसे घड़े में पानी संभाल कर रखते हैं, वैसे ही खेतों में मेड़ बनाकर बारिश का पानी रोकते हैं।`,
    localExDescTarget: `ᱟᱹᱛᱩ ᱨᱮ ᱫᱟᱹᱨᱤ ᱯᱷᱟᱨᱪᱟ ᱫᱚᱦᱚ ᱟᱨ ᱵᱟᱹᱫᱽ ᱨᱮ ᱟᱹᱲᱤ (Aadi - Bunds) ᱵᱮᱱᱟᱣ ᱠᱟᱛᱮ ᱫᱟᱜ ᱟᱴᱠᱟᱣ᱾`,
    localExDescHindi: `गाँव में दरी के चारों ओर स्वच्छता रखना और खेतों में मेड़ बनाकर बारिश के पानी को रोकना।`,
    activityTitle: 'पारंपरिक जल स्रोत व मेड़ निर्माण मॉडल',
    instructionsTargetLang: 'ᱦᱟᱥᱟ ᱛᱮ ᱢᱤᱫᱴᱟᱝ ᱵᱟᱹᱫᱽ ᱟᱨ ᱟᱹᱲᱤ (Bund) ᱵᱮᱱᱟᱣ ᱯᱮ ᱟᱨ ᱧᱮᱞ ᱯᱮ ᱫᱟᱜ ᱪᱮᱫ ᱞᱮᱠᱟᱛᱮ ᱟᱴᱠᱟᱜ ᱠᱟᱱᱟ᱾',
    instructionsHindi: 'मिट्टी से एक छोटा खेत और मेड़ बनाएं। उसमें थोड़ा पानी डालकर देखें कि मेड़ पानी को बहने से कैसे रोकती है।',
    materialsNeeded: ['गीली मिट्टी', 'रेत', 'प्लास्टिक कटोरी', 'पानी'],
    diagramType: 'WATER_CYCLE_DIAGRAM',
    steps: [
      { stepNumber: 1, hindi: 'दरी (प्राकृतिक पहाड़ी झरना)', targetLang: 'ᱫᱟᱹᱨᱤ: ᱵᱩᱨᱩ ᱠᱷᱚᱱ ᱡᱷᱟᱨᱱᱟ ᱫᱟᱜ' },
      { stepNumber: 2, hindi: 'चुआं (नदी की रेत में जलकुंड)', targetLang: 'ᱪᱩᱣᱟᱸ: ᱜᱟᱰᱟ ᱜᱤᱛᱤᱞ ᱨᱮ ᱫᱟᱜ ᱠᱷᱟᱸᱫᱽᱨᱤ' },
      { stepNumber: 3, hindi: 'खेतों में मेड़बंदी (जल संरक्षण)', targetLang: 'ᱵᱟᱹᱫᱽ ᱟᱹᱲᱤ ᱛᱮ ᱫᱟᱜ ᱟᱴᱠᱟᱣ' }
    ],
    q1: 'ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱨᱮ ᱵᱩᱨᱩ ᱪᱮᱛᱟᱱ ᱠᱷᱚᱱ ᱚᱰᱚᱠᱚᱜ ᱥᱚᱱᱚᱛ ᱫᱟᱜ ᱫᱚ ᱪᱮᱫ ᱠᱚ ᱢᱮᱛᱟᱜ-ᱟ?',
    q1Hindi: 'पहाड़ी चट्टानों से निकलने वाले प्राकृतिक झरने को झारखंड में क्या कहते हैं?',
    q1Opts: ['ᱫᱟᱹᱨᱤ (Dari)', 'ᱪᱩᱣᱟᱸ (Chuan)', 'ᱰᱮᱢ', 'ᱱᱟᱞᱟ'],
    q1OptsHindi: ['दरी (Dari)', 'चुआं (Chuan)', 'डैम', 'नाला'],
    q1Ans: 'दरी (Dari)',
    q1Explanation: 'झारखंड में प्राकृतिक जल स्रोत को "दरी" कहते हैं।',
    q2: 'ᱵᱟᱹᱫᱽ ᱨᱮ ᱫᱟᱜ ᱟᱴᱠᱟᱣ ᱞᱟᱹᱜᱤᱫ ᱪᱮᱫ ᱵᱮᱱᱟᱣ ᱞᱟᱹᱠᱛᱤᱭᱟ?',
    q2Hindi: 'खेतों में बारिश का पानी रोकने के लिए क्या बनाया जाता है?',
    q2Opts: ['ᱟᱹᱲᱤ (মেড়/Bunds)', 'ᱫᱷᱤᱨᱤ', 'ᱥᱚᱲᱚᱠ', 'ᱜᱟᱰᱟ'],
    q2OptsHindi: ['मेड़ (Bunds)', 'पत्थर', 'सड़क', 'गड्ढा'],
    q2Ans: 'मेड़ (Bunds)',
    q2Explanation: 'खेतों की मेड़बंदी से वर्षा जल ठहरता है और भूजल स्तर बढ़ता है।',
    worksheetTitle: 'कक्षा 3-4 EVS: जल के स्थानीय स्रोत व संरक्षण',
    worksheetInstr: 'ᱫᱟᱜ ᱨᱩᱠᱷᱤᱭᱟᱹ ᱠᱩᱠᱞᱤ: ᱡᱚᱛᱚ ᱠᱩᱠᱞᱤ ᱨᱮᱭᱟᱜ ᱛᱮᱞᱟ ᱚᱞ ᱯᱮ:',
    wPrompts: [
      '᱑. ᱟᱢᱟᱜ ᱟᱹᱛᱩ ᱨᱮ ᱫᱟᱜ ᱚᱠᱟ ᱠᱷᱚᱱ ᱧᱟᱢᱚᱜ-ᱟ?',
      '᱒. ᱫᱟᱹᱨᱤ ᱟᱨ ᱪᱩᱣᱟᱸ ᱨᱮ ᱪᱮᱫ ᱵᱷᱮᱜᱟᱨ ᱢᱮᱱᱟᱜ-ᱟ?',
      '᱓. ᱫᱟᱜ ᱯᱷᱟᱨᱪᱟ ᱫᱚᱦᱚ ᱞᱟᱹᱜᱤᱫ ᱵᱟᱨᱭᱟ ᱩᱯᱟᱹᱭ ᱚᱞ ᱢᱮ:'
    ],
    wPromptsHindi: [
      '1. आपके गाँव में पीने का पानी कहाँ से आता है?',
      '2. दरी और चुआं में क्या अंतर है?',
      '3. पानी को स्वच्छ रखने के 2 उपाय लिखें:'
    ],
    flashcards: [
      { termHindi: 'प्राकृतिक झरना', termTargetScript: 'ᱫᱟᱹᱨᱤ (Dari)', termTargetLatin: 'Dari', phonetic: '/da.ri/', exampleSentence: 'ᱫᱟᱹᱨᱤ ᱫᱟᱜ ᱫᱚ ᱟᱹᱰᱤ ᱨᱮᱭᱟᱲ ᱟᱨ ᱯᱷᱟᱨᱪᱟ ᱜᱮᱭᱟ᱾' },
      { termHindi: 'रेतीला जलकुंड', termTargetScript: 'ᱪᱩᱣᱟᱸ (Chuan)', termTargetLatin: 'Chuan', phonetic: '/tʃu.wã/', exampleSentence: 'ᱜᱟᱰᱟ ᱜᱤᱛᱤᱞ ᱨᱮ ᱪᱩᱣᱟᱸ ᱠᱷᱟᱸᱫᱽᱨᱤ ᱠᱟᱛᱮ ᱫᱟᱜ ᱞᱮ ᱦᱟᱛᱟᱣᱟ᱾' },
      { termHindi: 'खेत की मेड़', termTargetScript: 'ᱟᱹᱲᱤ (Aadi)', termTargetLatin: 'Aadi', phonetic: '/aː.ɽi/', exampleSentence: 'ᱟᱹᱲᱤ ᱛᱮ ᱫᱟᱜ ᱟᱴᱠᱟᱣ ᱠᱟᱛᱮ ᱦᱩᱲᱩ ᱪᱟᱥ ᱦᱩᱭᱩᱜ-ᱟ᱾' }
    ],
    taskTargetLang: 'ᱚᱲᱟᱜ ᱥᱩᱨ ᱨᱮᱭᱟᱜ ᱫᱟᱜ ᱡᱷᱟᱨᱱᱟ ᱧᱮᱞ ᱠᱟᱛᱮ ᱚᱱᱟ ᱨᱮᱭᱟᱜ ᱪᱤᱛᱟᱹᱨ ᱵᱮᱱᱟᱣ ᱢᱮ᱾',
    quiz: [
      { question: 'झारखंड में चट्टानों से फूटने वाले मीठे पानी के सोते को क्या कहते हैं?', options: ['दरी (Dari)', 'समुद्र', 'गटर', 'कीचड़'], correctIndex: 0 },
      { question: 'खेतों में पानी रोकने का सर्वोत्तम देसी तरीका क्या है?', options: ['मेड़बंदी (Bunds)', 'पानी बहा देना', 'पाइप तोड़ना', 'जंगल काटना'], correctIndex: 0 },
      { question: 'पानी बचाने का सही नियम क्या है?', options: ['नल को खुला न छोड़ें', 'सड़क पर पानी बहाएं', 'नदी में कचरा फेंकें', 'कोई नहीं'], correctIndex: 0 }
    ],
    blackboardSummary: {
      keyTerms: ['दरी (प्राकृतिक झरना)', 'चुआं (रेत कुंड)', 'मेड़बंदी (जल संचयन)'],
      concepts: ['छोटानागपुर के पारंपरिक जल स्रोत', 'खेतों में मेड़बंदी से वर्षा जल संरक्षण', 'स्वच्छ पेयजल का महत्व'],
      homework: 'अपने घर में पानी बचाने के 2 नियम लिखकर लाएं।'
    }
  },
  hi: {
    objTarget: `विद्यार्थी झारखंड के पारंपरिक जल स्रोतों (दरी, चुआं, बांध) और जल संरक्षण के उपायों को समझ सकेंगे।`,
    objHindi: `विद्यार्थी झारखंड के पारंपरिक जल स्रोतों (दरी, चुआं, बांध) और जल संरक्षण के उपायों को समझ सकेंगे।`,
    prerequisites: ['पानी के दैनिक उपयोग की समझ'],
    introTarget: `आज हम अपने गाँव की दरी (प्राकृतिक झरना), चुआं और जल संरक्षण के पारंपरिक तरीकों के बारे में जानेंगे।`,
    introHindi: `आज हम अपने गाँव की दरी (प्राकृतिक झरना), चुआं और जल संरक्षण के पारंपरिक तरीकों के बारे में जानेंगे।`,
    explTargetScript: `छोटानागपुर के पठार में जब चट्टानों के बीच से शीतल जल फूटकर निकलता है, तो उसे 'दरी' कहते हैं। नदी-नालों की रेत में खोदा गया छोटा जलकुंड 'चुआं' कहलाता है। वर्षा जल का संचयन ही हमारे गाँव को समृद्ध रखता है।`,
    explTargetLatin: `Chotanagpur ke pathar mein jab chattano ke beech se sheetal jal phootkar nikalta hai, to use 'Dari' kahte hain. Ret mein bana kund 'Chuan' hai.`,
    explHindi: `दरी और चुआं झारखंड के पारंपरिक जल स्रोत हैं। खेतों में मेड़बंदी कर बारिश का पानी रोकना जल संरक्षण का श्रेष्ठ तरीका है।`,
    explSimplerHindi: `जैसे घर में अनाज संजोते हैं, वैसे खेत में मेड़ बनाकर बारिश का पानी सहेजते हैं।`,
    localExDescTarget: `गाँव में दरी के चारों ओर स्वच्छता रखना और खेतों में मेड़ बनाकर बारिश के पानी को रोकना।`,
    localExDescHindi: `गाँव में दरी के चारों ओर स्वच्छता रखना और खेतों में मेड़ बनाकर बारिश के पानी को रोकना।`,
    activityTitle: 'पारंपरिक जल स्रोत व मेड़ निर्माण मॉडल',
    instructionsTargetLang: 'मिट्टी से एक छोटा खेत और मेड़ बनाएं। उसमें थोड़ा पानी डालकर देखें कि मेड़ पानी को बहने से कैसे रोकती है।',
    instructionsHindi: 'मिट्टी से एक छोटा खेत और मेड़ बनाएं। उसमें थोड़ा पानी डालकर देखें कि मेड़ पानी को बहने से कैसे रोकती है।',
    materialsNeeded: ['गीली मिट्टी', 'रेत', 'पानी'],
    diagramType: 'WATER_CYCLE_DIAGRAM',
    steps: [
      { stepNumber: 1, hindi: 'दरी (प्राकृतिक पहाड़ी झरना)', targetLang: 'दरी (प्राकृतिक पहाड़ी झरना)' },
      { stepNumber: 2, hindi: 'चुआं (नदी की रेत में जलकुंड)', targetLang: 'चुआं (नदी की रेत में जलकुंड)' },
      { stepNumber: 3, hindi: 'खेतों में मेड़बंदी (जल संरक्षण)', targetLang: 'खेतों में मेड़बंदी (जल संरक्षण)' }
    ],
    q1: 'पहाड़ी चट्टानों से निकलने वाले प्राकृतिक झरने को झारखंड में क्या कहते हैं?',
    q1Hindi: 'पहाड़ी चट्टानों से निकलने वाले प्राकृतिक झरने को झारखंड में क्या कहते हैं?',
    q1Opts: ['दरी (Dari)', 'चुआं (Chuan)', 'डैम', 'नाला'],
    q1OptsHindi: ['दरी (Dari)', 'चुआं (Chuan)', 'डैम', 'नाला'],
    q1Ans: 'दरी (Dari)',
    q1Explanation: 'झारखंड में प्राकृतिक जल स्रोत को "दरी" कहते हैं।',
    q2: 'खेतों में बारिश का पानी रोकने के लिए क्या बनाया जाता है?',
    q2Hindi: 'खेतों में बारिश का पानी रोकने के लिए क्या बनाया जाता है?',
    q2Opts: ['मेड़ (Bunds)', 'पत्थर', 'सड़क', 'गड्ढा'],
    q2OptsHindi: ['मेड़ (Bunds)', 'पत्थर', 'सड़क', 'गड्ढा'],
    q2Ans: 'मेड़ (Bunds)',
    q2Explanation: 'खेतों की मेड़बंदी से वर्षा जल ठहरता है और भूजल स्तर बढ़ता है।',
    worksheetTitle: 'कक्षा 3-4 EVS: जल के स्थानीय स्रोत व संरक्षण',
    worksheetInstr: 'सभी प्रश्नों के उत्तर अपनी अभ्यास पुस्तिका में लिखें:',
    wPrompts: [
      '1. आपके गाँव में पीने का पानी कहाँ से आता है?',
      '2. दरी और चुआं में क्या अंतर है?',
      '3. पानी को स्वच्छ रखने के 2 उपाय लिखें:'
    ],
    wPromptsHindi: [
      '1. आपके गाँव में पीने का पानी कहाँ से आता है?',
      '2. दरी और चुआं में क्या अंतर है?',
      '3. पानी को स्वच्छ रखने के 2 उपाय लिखें:'
    ],
    flashcards: [
      { termHindi: 'प्राकृतिक झरना', termTargetScript: 'दरी (Dari)', termTargetLatin: 'Dari', phonetic: '/da.ri/', exampleSentence: 'दरी का पानी अत्यंत मीठा व शीतल होता है।' },
      { termHindi: 'रेतीला जलकुंड', termTargetScript: 'चुआं (Chuan)', termTargetLatin: 'Chuan', phonetic: '/tʃu.wã/', exampleSentence: 'नदी की रेत में चुआं खोदकर स्वच्छ जल लिया जाता है।' },
      { termHindi: 'खेत की मेड़', termTargetScript: 'मेड़ (Aadi)', termTargetLatin: 'Med', phonetic: '/meːɽ/', exampleSentence: 'मेड़बंदी करने से बारिश का पानी खेतों में जमा रहता है।' }
    ],
    taskTargetLang: 'अपने घर में पानी बचाने के लिए 2 नियम बनाएं और माता-पिता को बताएं।',
    quiz: [
      { question: 'झारखंड में चट्टानों से फूटने वाले मीठे पानी के सोते को क्या कहते हैं?', options: ['दरी (Dari)', 'समुद्र', 'गटर', 'कीचड़'], correctIndex: 0 },
      { question: 'खेतों में पानी रोकने का सर्वोत्तम देसी तरीका क्या है?', options: ['मेड़बंदी (Bunds)', 'पानी बहा देना', 'पाइप तोड़ना', 'जंगल काटना'], correctIndex: 0 }
    ],
    blackboardSummary: {
      keyTerms: ['दरी (प्राकृतिक झरना)', 'चुआं (रेत कुंड)', 'मेड़बंदी (जल संचयन)'],
      concepts: ['छोटानागपुर के पारंपरिक जल स्रोत', 'खेतों में मेड़बंदी से वर्षा जल संरक्षण', 'स्वच्छ पेयजल का महत्व'],
      homework: 'पानी बचाने के 2 उपाय लिखकर लाएं।'
    }
  }
};

natureWaterLangMap['hoc'] = natureWaterLangMap['sat'];
natureWaterLangMap['unr'] = natureWaterLangMap['sat'];
natureWaterLangMap['en'] = {
  ...natureWaterLangMap['hi'],
  objTarget: `Students will understand indigenous water springs (Dari, Chuan) and indigenous water harvesting in Jharkhand.`,
  introTarget: `Today we will explore traditional water conservation practices and natural springs in Chota Nagpur.`,
  explTargetScript: `In Jharkhand, natural mountain springs are known as 'Dari', while temporary sand-well pits in riverbeds are called 'Chuan'.`,
  explTargetLatin: `Natural mountain springs are known as Dari, while sand-well pits are called Chuan.`
};
natureWaterLangMap['kru'] = {
  ...natureWaterLangMap['hi'],
  objTarget: `कुड़ुख़: पद्दा गही दरी अरा चुआं ती अम्बा (पानी) संरक्षण सीखना।`,
  introTarget: `इन्ना नाम दरी अरा चुआं गही कत्था ती पानी बचावेक सिखेगे बरदम।`
};
natureWaterLangMap['kyw'] = {
  ...natureWaterLangMap['hi'],
  objTarget: `कुड़मालि: गाँव केर दरी, चुआं आर आड़ि (मेड़) केर पानी संचयन केर समझ।`,
  introTarget: `आइझ हामरा आपन गाँव केर दरी आर चुआं केर पानी बचावेक सीखब।`
};

// =========================================================================
// MIDDLE & SECONDARY STAGE (CLASSES 6 - 10) PEDAGOGICAL TEMPLATES
// =========================================================================

// 5. Middle & Secondary Mathematics (Algebra, Linear Equations, Real Numbers, Geometry, Trigonometry)
export const middleSecondaryMathLangMap: Record<string, CurriculumTemplateDict> = {
  hi: {
    objTarget: `विद्यार्थी अज्ञात राशि (चर x, y) व समीकरणों के संतुलन नियम को समझकर दैनिक जीवन में अज्ञात मान ज्ञात कर सकेंगे।`,
    objHindi: `विद्यार्थी अज्ञात राशि (चर x, y) व समीकरणों के संतुलन नियम को समझकर दैनिक जीवन में अज्ञात मान ज्ञात कर सकेंगे।`,
    prerequisites: ['पूर्णांकों का जोड़-घटाव व गुणा-भाग', 'तराजू संतुलन की बुनियादी समझ', 'अंकगणितीय संक्रियाओं का नियम'],
    introTarget: `आज हम बीजगणित के जादू से सीखेंगे कि तराजू के दोनों पलड़ों की तरह समीकरण को कैसे हल किया जाता है।`,
    introHindi: `आज हम बीजगणित के जादू से सीखेंगे कि तराजू के दोनों पलड़ों की तरह समीकरण को कैसे हल किया जाता है।`,
    explTargetScript: `समीकरण (Equation) एक तराजू की तरह होता है। बराबर चिह्न (=) के दोनों तरफ का मान हमेशा समान रहता है। यदि हम दोनों तरफ समान संख्या जोड़ते या घटाते हैं, तो संतुलन बना रहता है। जैसे 2x + 4 = 10, तो 2x = 6, अतः x = 3।`,
    explTargetLatin: `Sameekaran ek taraazu ki tarah hota hai. Barabar chihn (=) ke dono taraf ka maan hamesha saman rehta hai.`,
    explHindi: `समीकरण एक तराजू की तरह है। जब हम दोनों पलड़ों पर बराबर वजन रखते हैं, तभी संतुलन रहता है। अज्ञात चर x का मान निकालने के लिए अचर संख्याओं को पक्षांतरण करते हैं।`,
    explSimplerHindi: `जैसे हाट में एक पोटली और 2 किलो का बट्टा मिलकर 5 किलो के बराबर है, तो पोटली का वजन 5 - 2 = 3 किलो हुआ। यही बीजगणित है।`,
    localExDescTarget: `गाँव के हाट-बाज़ार में सब्जी तौलने वाले तराजू में जब एक पलड़े पर थैली और 1 किग्रा का बट्टा रखा हो और दूसरे पर 5 किग्रा का बाट हो।`,
    localExDescHindi: `गाँव के साप्ताहिक हाट में तराजू के संतुलन से अज्ञात अनाज या सब्जी का सटीक वजन ज्ञात करना।`,
    activityTitle: 'कक्षा तराजू संतुलन प्रयोग (Balance Scale Equation Lab)',
    instructionsTargetLang: 'दो समान गिलासों और एक पैमाने (Scale) से एक तराजू बनाएं। एक तरफ अज्ञात कंकड़ों की पोटली और दूसरी तरफ ज्ञात कंकड़ रखकर समीकरण हल करें।',
    instructionsHindi: 'दो समान गिलासों और एक पैमाने से एक तराजू बनाएं। एक तरफ अज्ञात कंकड़ों की पोटली और दूसरी तरफ ज्ञात कंकड़ रखकर समीकरण हल करें।',
    materialsNeeded: ['तराजू या 30cm स्केल', 'धागा व डिस्पोजेबल कप', 'कंकड़ या इमली के बीज'],
    diagramType: 'EQUATION_BALANCE_DIAGRAM',
    steps: [
      { stepNumber: 1, hindi: 'बायाँ पक्ष (LHS): 2x + 3', targetLang: 'बायाँ पक्ष (चर + अचर): 2x + 3' },
      { stepNumber: 2, hindi: 'समान संख्या घटाना: 2x = 11 - 3 = 8', targetLang: 'दोनों पक्षों से 3 घटाना: 2x = 8' },
      { stepNumber: 3, hindi: 'चर का हल: x = 8 / 2 = 4', targetLang: 'अंतिम हल (Root): x = 4' }
    ],
    q1: 'यदि x + 5 = 12 हो, तो चर x का मान क्या होगा?',
    q1Hindi: 'यदि x + 5 = 12 हो, तो चर x का मान क्या होगा?',
    q1Opts: ['5', '7', '17', '12'],
    q1OptsHindi: ['5', '7', '17', '12'],
    q1Ans: '7',
    q1Explanation: 'दोनों तरफ से 5 घटाने पर: x = 12 - 5 = 7।',
    q2: 'समीकरण 3y = 15 में चर y का मान क्या है?',
    q2Hindi: 'समीकरण 3y = 15 में चर y का मान क्या है?',
    q2Opts: ['5', '12', '18', '3'],
    q2OptsHindi: ['5', '12', '18', '3'],
    q2Ans: '5',
    q2Explanation: 'दोनों पक्षों को 3 से भाग देने पर: y = 15 / 3 = 5।',
    worksheetTitle: 'कक्षा 6-10 गणित: रैखिक समीकरण व बीजगणित कार्यपत्रक',
    worksheetInstr: 'दिए गए समीकरणों को तराजू संतुलन विधि से हल करें और अपनी अभ्यास पुस्तिका में लिखें:',
    wPrompts: [
      '1. समीकरण हल करें: 2x + 7 = 19, तो x = ?',
      '2. एक संख्या का 3 गुना 24 है। समीकरण बनाकर संख्या ज्ञात करें:',
      '3. अपने गाँव के दैनिक जीवन से एक ऐसा उदाहरण लिखें जहाँ अज्ञात मान निकालना पड़ता है:'
    ],
    wPromptsHindi: [
      '1. समीकरण हल करें: 2x + 7 = 19, तो x = ?',
      '2. एक संख्या का 3 गुना 24 है। समीकरण बनाकर संख्या ज्ञात करें:',
      '3. अपने गाँव के दैनिक जीवन से एक ऐसा उदाहरण लिखें जहाँ अज्ञात मान निकालना पड़ता है:'
    ],
    flashcards: [
      { termHindi: 'समीकरण (Equation)', termTargetScript: 'समीकरण (=)', termTargetLatin: 'Sameekaran', phonetic: '/sə.miː.kə.rəɳ/', exampleSentence: '2x + 3 = 9 एक रैखिक समीकरण है।' },
      { termHindi: 'चर राशि (Variable)', termTargetScript: 'चर (x, y, z)', termTargetLatin: 'Char Rashi', phonetic: '/tʃər/', exampleSentence: 'चर का मान स्थिति अनुसार बदलता है।' },
      { termHindi: 'अचर राशि (Constant)', termTargetScript: 'अचर (1, 2, 3...)', termTargetLatin: 'Achar', phonetic: '/ə.tʃər/', exampleSentence: 'अचर संख्याओं का मान निश्चित रहता है।' },
      { termHindi: 'पक्षांतरण (Transposition)', termTargetScript: 'पक्षांतरण (+ से -)', termTargetLatin: 'Pakshantaran', phonetic: '/pək.ʂaːn.t̪ə.rəɳ/', exampleSentence: 'बराबर पार करने पर धन (+) ऋण (-) बन जाता है।' }
    ],
    taskTargetLang: 'घर में 3 दैनिक समस्याओं के लिए रैखिक समीकरण बनाएं (उदा. बाज़ार खर्च, अनाज तौल) और हल करें।',
    quiz: [
      { question: 'समीकरण 4x - 8 = 12 में x का मान क्या होगा?', options: ['5', '4', '1', '20'], correctIndex: 0 },
      { question: 'बीजगणित में अज्ञात मान दर्शाने वाले अक्षरों को क्या कहते हैं?', options: ['चर (Variable)', 'अचर', 'घातांक', 'गुणांक'], correctIndex: 0 }
    ],
    blackboardSummary: {
      keyTerms: ['समीकरण (Equation)', 'चर (Variable x,y)', 'पक्षांतरण नियम (+ ↔ -)'],
      villageExample: 'हाट में तराजू संतुलन: बायाँ पलड़ा = दायाँ पलड़ा',
      actionRule: 'जो भी संक्रिया बाएं पक्ष में करें, वही दाएं पक्ष में भी करें।'
    }
  },
  sat: {
    objTarget: `ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱠᱚ ᱵᱟᱝ-ᱵᱟᱰᱟᱭ ᱮᱞ (Variables x, y) ᱟᱨ ᱥᱚᱢᱤᱠᱚᱨᱚᱱ ᱛᱩᱞᱟᱹᱡᱚᱠᱷᱟ ᱵᱩᱡᱷᱟᱹᱣ ᱠᱟᱛᱮ ᱦᱟᱞ ᱫᱟᱲᱮᱭᱟᱜ-ᱟ ᱠᱚ᱾`,
    objHindi: `विद्यार्थी अज्ञात राशि (चर x, y) व समीकरणों के संतुलन नियम को समझकर दैनिक जीवन में अज्ञात मान ज्ञात कर सकेंगे।`,
    prerequisites: ['ᱞᱮᱠᱷᱟ ᱮᱞ ᱠᱚ ᱡᱚᱲᱟᱣ ᱟᱨ ᱵᱷᱮᱜᱟᱨ', 'ᱛᱩᱞᱟᱹᱡᱚᱠᱷᱟ (Balance) ᱵᱩᱡᱷᱟᱹᱣ'],
    introTarget: `ᱛᱮᱦᱮᱧ ᱫᱚ ᱟᱵᱚ ᱵᱤᱡᱽᱜᱚᱱᱤᱛ ᱨᱮᱭᱟᱜ ᱡᱟᱹᱫᱩ ᱛᱮ ᱛᱩᱞᱟᱹ ᱛᱮ ᱥᱚᱢᱤᱠᱚᱨᱚᱱ (Equation) ᱦᱟᱞ ᱵᱚᱱ ᱪᱮᱫ-ᱟ᱾`,
    introHindi: `आज हम बीजगणित के जादू से सीखेंगे कि तराजू के दोनों पलड़ों की तरह समीकरण को कैसे हल किया जाता है।`,
    explTargetScript: `ᱥᱚᱢᱤᱠᱚᱨᱚᱱ ᱫᱚ ᱢᱤᱫᱴᱟᱝ ᱛᱩᱞᱟᱹ (Balance) ᱞᱮᱠᱟ ᱠᱟᱱᱟ᱾ ᱵᱟᱨᱟᱵᱟᱹᱨᱤ ᱪᱤᱱᱦᱟᱹ (=) ᱨᱮᱭᱟᱜ ᱵᱟᱱᱟᱨ ᱱᱟᱠᱷᱟ ᱥᱚᱢᱟᱱ ᱜᱮ ᱛᱟᱦᱮᱸᱱᱟ᱾ ᱡᱩᱫᱤ ᱒x + ᱔ = ᱑᱐, ᱛᱚᱵᱮ ᱒x = ᱖, ᱚᱱᱟᱛᱮ x = ᱓ ᱦᱩᱭᱩᱜ-ᱟ᱾`,
    explTargetLatin: `Sameekaran do midtang tula leka kana. Barabari cinha (=) reak banar nakha soman ge tahena.`,
    explHindi: `समीकरण एक तराजू की तरह है। जब हम दोनों पलड़ों पर बराबर वजन रखते हैं, तभी संतुलन रहता है।`,
    explSimplerHindi: `जैसे हाट में एक पोटली और 2 किलो का बट्टा मिलकर 5 किलो के बराबर है, तो पोटली का वजन 5 - 2 = 3 किलो हुआ।`,
    localExDescTarget: `ᱟᱹᱛᱩ ᱨᱮᱭᱟᱜ ᱦᱟᱴ ᱨᱮ ᱡᱚᱠᱷᱚᱱ ᱛᱩᱞᱟᱹ ᱛᱮ ᱪᱟᱣᱞᱮ ᱥᱮ ᱩᱛᱩ-ᱥᱟᱵᱽᱡᱤ ᱠᱚ ᱛᱩᱞᱟᱹᱭᱟ᱾`,
    localExDescHindi: `गाँव के साप्ताहिक हाट में तराजू के संतुलन से अज्ञात अनाज या सब्जी का सटीक वजन ज्ञात करना।`,
    activityTitle: 'ᱠᱟᱜᱚᱡᱽ ᱠᱚᱯ ᱟᱨ ᱛᱩᱞᱟᱹ ᱛᱮ ᱥᱚᱢᱤᱠᱚᱨᱚᱱ ᱵᱮᱱᱟᱣ (Equation Balance Lab)',
    instructionsTargetLang: 'ᱵᱟᱨᱭᱟ ᱠᱚᱯ ᱟᱨ ᱢᱤᱫᱴᱟᱝ ᱥᱠᱮᱞ ᱛᱮ ᱛᱩᱞᱟᱹ ᱵᱮᱱᱟᱣ ᱯᱮ ᱟᱨ ᱫᱷᱤᱨᱤ ᱛᱮ x ᱨᱮᱭᱟᱜ ᱢᱟᱱ ᱧᱟᱢ ᱯᱮ᱾',
    instructionsHindi: 'दो कप और स्केल से तराजू बनाएं और कंकड़ों से चर x का मान निकालें।',
    materialsNeeded: ['ᱛᱩᱞᱟᱹ/ᱥᱠᱮᱞ', 'ᱫᱷᱤᱨᱤ/ᱠᱟᱹᱴᱤᱡ ᱡᱟᱹᱱᱩᱢ', 'ᱫᱩᱣᱟᱹᱨ/ᱥᱩᱛᱟᱹᱢ'],
    diagramType: 'EQUATION_BALANCE_DIAGRAM',
    steps: [
      { stepNumber: 1, hindi: 'बायाँ पक्ष (LHS): 2x + 3', targetLang: 'ᱞᱮᱸᱜᱟ ᱱᱟᱠᱷᱟ: ᱒x + ᱓' },
      { stepNumber: 2, hindi: 'समान घटाव: 2x = 8', targetLang: 'ᱵᱟᱱᱟᱨ ᱠᱷᱚᱱ ᱓ ᱵᱷᱮᱜᱟᱨ: ᱒x = ᱘' },
      { stepNumber: 3, hindi: 'हल: x = 4', targetLang: 'ᱢᱩᱪᱟᱹᱫ ᱦᱟᱞ: x = ᱔' }
    ],
    q1: 'ᱡᱩᱫᱤ x + ᱕ = ᱑᱒ ᱦᱩᱭᱩᱜ-ᱟ, ᱛᱚᱵᱮ x ᱨᱮᱭᱟᱜ ᱢᱟᱱ ᱛᱤᱱᱟᱹᱜ?',
    q1Hindi: 'यदि x + 5 = 12 हो, तो चर x का मान क्या होगा?',
    q1Opts: ['᱕', '᱗', '᱑᱗', '᱑᱒'],
    q1OptsHindi: ['5', '7', '17', '12'],
    q1Ans: '᱗',
    q1Explanation: 'ᱵᱟᱱᱟᱨ ᱠᱷᱚᱱ ᱕ ᱵᱷᱮᱜᱟᱨ ᱞᱮᱠᱷᱟᱱ: x = ᱑᱒ - ᱕ = ᱗᱾',
    q2: 'ᱥᱚᱢᱤᱠᱚᱨᱚᱱ ᱓y = ᱑᱕ ᱨᱮ y ᱨᱮᱭᱟᱜ ᱢᱟᱱ ᱪᱮᱫ ᱠᱟᱱᱟ?',
    q2Hindi: 'समीकरण 3y = 15 में चर y का मान क्या है?',
    q2Opts: ['᱕', '᱑᱒', '᱑᱘', '᱓'],
    q2OptsHindi: ['5', '12', '18', '3'],
    q2Ans: '᱕',
    q2Explanation: '᱑᱕ ᱫᱚ ᱓ ᱛᱮ ᱦᱟᱹᱴᱤᱧ ᱞᱮᱠᱷᱟᱱ: y = ᱕᱾',
    worksheetTitle: 'ᱥᱟᱱᱛᱟᱲᱤ: ᱪᱟᱱᱟᱪ ᱖-᱑᱐ ᱮᱞᱠᱷᱟ ᱥᱚᱢᱤᱠᱚᱨᱚᱱ ᱠᱟᱹᱢᱤ ᱥᱟᱠᱟᱢ',
    worksheetInstr: 'ᱥᱟᱱᱟᱢ ᱥᱚᱢᱤᱠᱚᱨᱚᱱ ᱢᱚᱱᱮ ᱮᱢ ᱠᱟᱛᱮ ᱦᱟᱞ ᱯᱮ ᱟᱨ ᱚᱞ ᱯᱮ:',
    wPrompts: [
      '᱑. ᱥᱚᱢᱤᱠᱚᱨᱚᱱ ᱦᱟᱞ ᱢᱮ: ᱒x + ᱗ = ᱑᱙, ᱛᱚᱵᱮ x = ?',
      '᱒. ᱢᱤᱫ ᱮᱞ ᱨᱮᱭᱟᱜ ᱓ ᱜᱩᱬ ᱒᱔ ᱠᱟᱱᱟ᱾ ᱥᱚᱢᱤᱠᱚᱨᱚᱱ ᱚᱞ ᱯᱮ:',
      '᱓. ᱟᱢᱟᱜ ᱟᱹᱛᱩ ᱨᱮᱭᱟᱜ ᱢᱤᱫ ᱫᱟᱹᱭᱠᱟᱹ ᱚᱞ ᱢᱮ ᱡᱟᱦᱟᱸᱨᱮ ᱛᱩᱞᱟᱹ ᱛᱮ ᱮᱞ ᱧᱟᱢᱚᱜ-ᱟ:'
    ],
    wPromptsHindi: [
      '1. समीकरण हल करें: 2x + 7 = 19, तो x = ?',
      '2. एक संख्या का 3 गुना 24 है। समीकरण बनाकर संख्या ज्ञात करें:',
      '3. अपने गाँव के दैनिक जीवन से एक ऐसा उदाहरण लिखें जहाँ अज्ञात मान निकालना पड़ता है:'
    ],
    flashcards: [
      { termHindi: 'समीकरण', termTargetScript: 'ᱥᱚᱢᱤᱠᱚᱨᱚᱱ (=)', termTargetLatin: 'Sameekaran', phonetic: '/sə.miː.kə.rəɳ/', exampleSentence: '᱒x + ᱔ = ᱑᱐ ᱫᱚ ᱢᱤᱫ ᱥᱚᱢᱤᱠᱚᱨᱚᱱ ᱠᱟᱱᱟ᱾' },
      { termHindi: 'चर (Variable)', termTargetScript: 'ᱵᱚᱫᱚᱞᱚᱜ ᱮᱞ (x, y)', termTargetLatin: 'Bodolog el', phonetic: '/bo.do.loɡ el/', exampleSentence: 'x ᱟᱨ y ᱫᱚ ᱵᱚᱫᱚᱞᱚᱜ ᱮᱞ ᱠᱟᱱᱟ᱾' },
      { termHindi: 'अचर (Constant)', termTargetScript: 'ᱛᱷᱤᱨ ᱮᱞ (᱑, ᱒, ᱓)', termTargetLatin: 'Thir el', phonetic: '/tʰir el/', exampleSentence: 'ᱛᱷᱤᱨ ᱮᱞ ᱨᱮᱭᱟᱜ ᱢᱟᱱ ᱵᱟᱝ ᱵᱚᱫᱚᱞᱚᱜ-ᱟ᱾' },
      { termHindi: 'बराबर (Equal)', termTargetScript: 'ᱥᱚᱢᱟᱱ (=)', termTargetLatin: 'Soman', phonetic: '/so.man/', exampleSentence: 'ᱵᱟᱱᱟᱨ ᱯᱟᱦᱴᱟ ᱥᱚᱢᱟᱱ ᱢᱮᱱᱟᱜ-ᱟ᱾' }
    ],
    taskTargetLang: 'ᱚᱲᱟᱜ ᱨᱮ ᱦᱟᱴ-ᱵᱟᱡᱟᱨ ᱨᱮᱭᱟᱜ ᱓ ᱜᱚᱴᱟᱝ ᱠᱟᱛᱷᱟ ᱛᱮ ᱥᱚᱢᱤᱠᱚᱨᱚᱱ ᱵᱮᱱᱟᱣ ᱯᱮ᱾',
    quiz: [
      { question: 'ᱥᱚᱢᱤᱠᱚᱨᱚᱱ ᱔x - ᱘ = ᱑᱒ ᱨᱮ x ᱨᱮᱭᱟᱜ ᱢᱟᱱ ᱪᱮᱫ?', options: ['᱕', '᱔', '᱑', '᱒᱐'], correctIndex: 0 },
      { question: 'ᱮᱞᱠᱷᱟ ᱨᱮ ᱵᱟᱝ-ᱵᱟᱰᱟᱭ ᱮᱞ ᱫᱚ ᱪᱮᱫ ᱠᱚ ᱢᱮᱛᱟᱜ-ᱟ?', options: ['ᱵᱚᱫᱚᱞᱚᱜ ᱮᱞ (Variable)', 'ᱛᱷᱤᱨ ᱮᱞ', 'ᱥᱚᱢᱟᱱ', 'ᱜᱩᱬ'], correctIndex: 0 }
    ],
    blackboardSummary: {
      keyTerms: ['ᱥᱚᱢᱤᱠᱚᱨᱚᱱ (=)', 'ᱵᱚᱫᱚᱞᱚᱜ ᱮᱞ (x,y)', 'ᱛᱩᱞᱟᱹ ᱱᱤᱭᱚᱢ'],
      villageExample: 'ᱦᱟᱴ ᱨᱮ ᱛᱩᱞᱟᱹ ᱡᱚᱠᱷᱟ: ᱞᱮᱸᱜᱟ ᱯᱟᱞᱲᱟ = ᱡᱚᱡᱚᱢ ᱯᱟᱞᱲᱟ',
      actionRule: 'ᱞᱮᱸᱜᱟ ᱯᱟᱦᱴᱟ ᱨᱮ ᱡᱟᱦᱟᱸ ᱮᱢ ᱠᱟᱹᱢᱤᱭᱟ, ᱡᱚᱡᱚᱢ ᱯᱟᱦᱴᱟ ᱨᱮᱦᱚᱸ ᱚᱱᱟ ᱜᱮ ᱠᱟᱹᱢᱤ ᱢᱮ᱾'
    }
  }
};
middleSecondaryMathLangMap['hoc'] = {
  ...middleSecondaryMathLangMap['sat'],
  objTarget: `𑢹𑣉 𑣎𑣋𑣜: ᱵᱚᱫᱚᱞ ᱮᱞ (Variables x, y) ᱟᱨ ᱥᱚᱢᱤᱠᱚᱨᱚᱱ ᱛᱩᱞᱟᱹ ᱵᱩᱡᱷᱟᱹᱣ ᱠᱟᱛᱮ ᱦᱟᱞ ᱫᱟᱲᱮᱭᱟᱜ-ᱟ ᱠᱚ᱾`,
  introTarget: `ᱛᱮᱦᱮᱧ ᱫᱚ ᱟᱵᱩ ᱵᱤᱡᱽᱜᱚᱱᱤᱛ ᱨᱮᱭᱟᱜ ᱥᱚᱢᱤᱠᱚᱨᱚᱱ (Equation) ᱪᱮᱫᱚᱜ-ᱟ ᱵᱚᱱ᱾`
};
middleSecondaryMathLangMap['unr'] = {
  ...middleSecondaryMathLangMap['sat'],
  objTarget: `ᱢᱩᱱᱰᱟᱨᱤ: ᱵᱚᱫᱚᱞ ᱮᱞ ᱟᱨ ᱥᱚᱢᱤᱠᱚᱨᱚᱱ ᱛᱩᱞᱟᱹ ᱵᱩᱡᱷᱟᱹᱣ ᱠᱟᱛᱮ ᱦᱟᱞ ᱠᱚ᱾`,
  introTarget: `ᱛᱮᱦᱮᱧ ᱫᱚ ᱟᱵᱩ ᱥᱚᱢᱤᱠᱚᱨᱚᱱ ᱦᱟᱞ ᱵᱚᱱ ᱪᱮᱫ-ᱟ᱾`
};
middleSecondaryMathLangMap['en'] = {
  ...middleSecondaryMathLangMap['hi'],
  objTarget: `Students will understand linear equations and variables (x, y) using balance beam logic and solve them effectively.`,
  introTarget: `Today we will learn algebraic equation solving using the real-world scale balance technique.`,
  explTargetScript: `An equation behaves like a balance scale. The equal sign (=) ensures both sides maintain parity. When we perform identical operations on both sides, balance is preserved.`,
  explTargetLatin: `An equation behaves like a balance scale with equal operations on both sides.`
};
middleSecondaryMathLangMap['kru'] = {
  ...middleSecondaryMathLangMap['hi'],
  objTarget: `कुड़ुख़: चर (x, y) अरा समीकरण गही संतुलन बुझना।`,
  introTarget: `इन्ना नाम तराजू गही लेखे समीकरण हल करब।`
};
middleSecondaryMathLangMap['kyw'] = {
  ...middleSecondaryMathLangMap['hi'],
  objTarget: `कुड़मालि: चर आर अचर केर समीकरण तराजू केर लेखे बूझेक।`,
  introTarget: `आइझ हामरा हाट केर तराजू केर नियम से समीकरण हल करब।`
};

// 6. Secondary Science (Chemical Reactions, Light Reflection & Refraction, Electricity, Life Processes)
export const secondaryScienceLangMap: Record<string, CurriculumTemplateDict> = {
  hi: {
    objTarget: `विद्यार्थी रासायनिक अभिक्रियाओं में अभिकारकों व उत्पादों के संरक्षण नियम एवं प्रकाश के परावर्तन-अपवर्तन को समझ सकेंगे।`,
    objHindi: `विद्यार्थी रासायनिक अभिक्रियाओं में अभिकारकों व उत्पादों के संरक्षण नियम एवं प्रकाश के परावर्तन-अपवर्तन को समझ सकेंगे।`,
    prerequisites: ['पदार्थों के भौतिक व रासायनिक परिवर्तन', 'प्रकाश का सरल रेखा में गमन', 'ऊर्जा के मूल रूप'],
    introTarget: `आज हम अपने चारों ओर होने वाले रासायनिक परिवर्तनों (जैसे लोहे पर जंग, चूने का पानी) और दर्पण में प्रकाश के चमत्कारों को जानेंगे।`,
    introHindi: `आज हम अपने चारों ओर होने वाले रासायनिक परिवर्तनों (जैसे लोहे पर जंग, चूने का पानी) और दर्पण में प्रकाश के चमत्कारों को जानेंगे।`,
    explTargetScript: `रासायनिक अभिक्रिया में नए गुणधर्म वाले पदार्थ बनते हैं। द्रव्यमान संरक्षण के नियमानुसार द्रव्यमान न तो उत्पन्न होता है और न नष्ट। प्रकाश जब एक पारदर्शी माध्यम से दूसरे में जाता है, तो अपने पथ से मुड़ जाता है; इसे अपवर्तन कहते हैं।`,
    explTargetLatin: `Rasayanik abhikriya mein naye gun-dharm wale padarth bante hain. Prakash ke path se mudne ko apavartan kehte hain.`,
    explHindi: `जब दो या दो से अधिक पदार्थ मिलकर नए गुणधर्म वाले पदार्थ बनाते हैं, तो इसे रासायनिक अभिक्रिया कहते हैं। दर्पण में प्रकाश टकराकर वापस लौटता है (परावर्तन), और पानी में मुड़ जाता है (अपवर्तन)।`,
    explSimplerHindi: `जैसे सफेदी के चूने में पानी डालने पर गर्मी निकलती है और वह उबलने लगता है - यह एक ऊष्माक्षेपी रासायनिक अभिक्रिया है।`,
    localExDescTarget: `गाँव में कच्चे चूने में पानी डालकर मकान की पुताई करना, लोहे की कुल्हाड़ी पर लाल जंग लगना, और तालाब के साफ पानी में पेंसिल का टेढ़ा दिखना।`,
    localExDescHindi: `गाँव में मकान पुताई के समय चूने व पानी की तीखी अभिक्रिया और तालाब में मछली की आभासी गहराई दिखना।`,
    activityTitle: 'चूना-पानी ऊष्माक्षेपी अभिक्रिया व जल-कांच अपवर्तन प्रयोग',
    instructionsTargetLang: 'एक कांच के गिलास में पानी लें और उसमें एक पेंसिल तिरछी डुबोएं। अवलोकन करें कि पानी की सतह पर पेंसिल मुड़ी हुई क्यों दिखाई देती है।',
    instructionsHindi: 'एक कांच के गिलास में पानी लें और उसमें एक पेंसिल तिरछी डुबोएं। अवलोकन करें कि पानी की सतह पर पेंसिल मुड़ी हुई क्यों दिखाई देती है।',
    materialsNeeded: ['कांच का पारदर्शी गिलास', 'पानी', 'पेंसिल या सीधी तीली'],
    diagramType: 'LIGHT_REFRACTION_DIAGRAM',
    steps: [
      { stepNumber: 1, hindi: 'आपतित किरण: हवा से पानी में प्रवेश', targetLang: 'आपतित किरण: विरल से सघन माध्यम' },
      { stepNumber: 2, hindi: 'अभिलंब की ओर झुकना: अपवर्तन', targetLang: 'अपवर्तित किरण: चाल कम होने से झुकना' },
      { stepNumber: 3, hindi: 'आभासी विस्थापन: पेंसिल का मुड़ा दिखना', targetLang: 'आभासी प्रतिबिंब: अपवर्तन प्रभाव' }
    ],
    q1: 'कांच के गिलास में पानी में डूबी पेंसिल मुड़ी हुई क्यों दिखाई देती है?',
    q1Hindi: 'कांच के गिलास में पानी में डूबी पेंसिल मुड़ी हुई क्यों दिखाई देती है?',
    q1Opts: ['प्रकाश के अपवर्तन (Refraction) के कारण', 'परावर्तन के कारण', 'प्रकाश के अवशोषण के कारण', 'यह वास्तविक मुड़ जाती है'],
    q1OptsHindi: ['प्रकाश के अपवर्तन (Refraction) के कारण', 'परावर्तन के कारण', 'प्रकाश के अवशोषण के कारण', 'यह वास्तविक मुड़ जाती है'],
    q1Ans: 'प्रकाश के अपवर्तन (Refraction) के कारण',
    q1Explanation: 'जब प्रकाश हवा (विरल) से पानी (सघन) में जाता है, तो इसकी चाल घट जाती है और यह अभिलंब की ओर मुड़ जाता है।',
    q2: 'बिना बुझे चूने (CaO) में पानी मिलाने पर क्या होता है?',
    q2Hindi: 'बिना बुझे चूने (CaO) में पानी मिलाने पर क्या होता है?',
    q2Opts: ['अत्यधिक ऊष्मा निकलती है (ऊष्माक्षेपी)', 'पानी बर्फ बन जाता है', 'कोई परिवर्तन नहीं होता', 'ठंडा हो जाता है'],
    q2OptsHindi: ['अत्यधिक ऊष्मा निकलती है (ऊष्माक्षेपी)', 'पानी बर्फ बन जाता है', 'कोई परिवर्तन नहीं होता', 'ठंडा हो जाता है'],
    q2Ans: 'अत्यधिक ऊष्मा निकलती है (ऊष्माक्षेपी)',
    q2Explanation: 'CaO + H2O → Ca(OH)2 + ऊष्मा। यह एक तीव्र ऊष्माक्षेपी संयोजन अभिक्रिया है।',
    worksheetTitle: 'कक्षा 9-10 विज्ञान: रासायनिक अभिक्रियाएं एवं प्रकाश की प्रकृति',
    worksheetInstr: 'सभी वैज्ञानिक संकल्पनाओं को ध्यान से पढ़ें और उत्तर अपनी अभ्यास पुस्तिका में लिखें:',
    wPrompts: [
      '1. प्रकाश के परावर्तन और अपवर्तन में क्या मुख्य अंतर है?',
      '2. रासायनिक समीकरण को संतुलित करना क्यों आवश्यक है?',
      '3. अपने गाँव के परिवेश से एक रासायनिक परिवर्तन और एक प्रकाश परिघटना का उदाहरण लिखें:'
    ],
    wPromptsHindi: [
      '1. प्रकाश के परावर्तन और अपवर्तन में क्या मुख्य अंतर है?',
      '2. रासायनिक समीकरण को संतुलित करना क्यों आवश्यक है?',
      '3. अपने गाँव के परिवेश से एक रासायनिक परिवर्तन और एक प्रकाश परिघटना का उदाहरण लिखें:'
    ],
    flashcards: [
      { termHindi: 'अपवर्तन (Refraction)', termTargetScript: 'अपवर्तन (Refraction)', termTargetLatin: 'Apavartan', phonetic: '/ə.pə.ʋər.t̪ən/', exampleSentence: 'पानी में प्रकाश का मुड़ना अपवर्तन कहलाता है।' },
      { termHindi: 'परावर्तन (Reflection)', termTargetScript: 'परावर्तन (दर्पण)', termTargetLatin: 'Paravartan', phonetic: '/pə.raː.ʋər.t̪ən/', exampleSentence: 'दर्पण से प्रकाश का टकराकर लौटना परावर्तन है।' },
      { termHindi: 'ऊष्माक्षेपी (Exothermic)', termTargetScript: 'ऊष्माक्षेपी (ऊष्मा निकलना)', termTargetLatin: 'Ushmakshepi', phonetic: '/uːʂ.maː.kʂeː.piː/', exampleSentence: 'चूने में पानी डालने पर ऊष्मा उत्पन्न होती है।' },
      { termHindi: 'अभिकारक (Reactant)', termTargetScript: 'अभिकारक (Reactant)', termTargetLatin: 'Abhikarak', phonetic: '/ə.bʱiː.kaː.rək/', exampleSentence: 'अभिक्रिया में भाग लेने वाले मूल पदार्थ अभिकारक कहलाते हैं।' }
    ],
    taskTargetLang: 'घर में एक कटोरी में सिक्का रखकर पानी डालें और देखें कि सिक्का ऊपर उठा हुआ क्यों दिखता है।',
    quiz: [
      { question: 'दर्पण पर आपतन कोण और परावर्तन कोण में क्या संबंध होता है?', options: ['आपतन कोण = परावर्तन कोण (∠i = ∠r)', 'आपतन कोण बड़ा होता है', 'परावर्तन कोण हमेशा शून्य होता है', 'कोई संबंध नहीं'], correctIndex: 0 },
      { question: 'लोहे पर जंग लगना किस प्रकार की अभिक्रिया का उदाहरण है?', options: ['धीमी ऑक्सीकरण अभिक्रिया', 'तीव्र अपघटन', 'विस्थापन', 'प्रकाश संश्लेषण'], correctIndex: 0 }
    ],
    blackboardSummary: {
      keyTerms: ['रासायनिक अभिक्रिया', 'प्रकाश अपवर्तन (Refraction)', 'ऊष्माक्षेपी (Exothermic)'],
      villageExample: 'पुताई का चूना + पानी = गर्मी, पानी में डूबी लाठी का टेढ़ा दिखना',
      actionRule: 'द्रव्यमान हमेशा संरक्षित रहता है; प्रकाश माध्यम बदलने पर मुड़ता है।'
    }
  },
  sat: {
    ...middleSecondaryMathLangMap['sat'],
    objTarget: `ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱠᱚ ᱨᱟᱥᱟᱭᱚᱱᱤᱠ ᱵᱚᱫᱚᱞ (Chemical Reactions) ᱟᱨ ᱢᱟᱨᱥᱟᱞ ᱨᱮᱭᱟᱜ ᱟᱹᱨᱥᱤ ᱠᱟᱹᱢᱤ (Refraction) ᱵᱩᱡᱷᱟᱹᱣ ᱫᱟᱲᱮᱭᱟᱜ-ᱟ ᱠᱚ᱾`,
    objHindi: `विद्यार्थी रासायनिक अभिक्रियाओं में अभिकारकों व उत्पादों के संरक्षण नियम एवं प्रकाश के परावर्तन-अपवर्तन को समझ सकेंगे।`,
    introTarget: `ᱛᱮᱦᱮᱧ ᱫᱚ ᱟᱵᱚ ᱪᱩᱱ ᱨᱮ ᱫᱟᱜ ᱫᱩᱞ ᱞᱮᱠᱷᱟᱱ ᱪᱮᱫᱟᱜ ᱞᱚᱞᱚᱜ-ᱟ ᱟᱨ ᱫᱟᱜ ᱨᱮ ᱢᱟᱨᱥᱟᱞ ᱪᱮᱫᱟᱜ ᱠᱮᱪᱟᱜᱚᱜ-ᱟ ᱚᱱᱟ ᱵᱚᱱ ᱪᱮᱫ-ᱟ᱾`,
    introHindi: `आज हम अपने चारों ओर होने वाले रासायनिक परिवर्तनों और दर्पण में प्रकाश के चमत्कारों को जानेंगे।`,
    explTargetScript: `ᱡᱚᱠᱷᱚᱱ ᱵᱟᱨᱭᱟ ᱡᱤᱱᱤᱥ ᱢᱮᱥᱟ ᱠᱟᱛᱮ ᱱᱟᱣᱟ ᱡᱤᱱᱤᱥ ᱵᱮᱱᱟᱣᱜ-ᱟ, ᱚᱱᱟ ᱫᱚ ᱨᱟᱥᱟᱭᱚᱱᱤᱠ ᱵᱚᱫᱚᱞ ᱠᱚ ᱢᱮᱛᱟᱜ-ᱟ᱾ ᱫᱟᱜ ᱨᱮ ᱢᱟᱨᱥᱟᱞ ᱵᱚᱞᱚ ᱞᱮᱱᱠᱷᱟᱱ ᱠᱮᱪᱟᱜᱚᱜ-ᱟ (Refraction)᱾`,
    explTargetLatin: `Jokhon barya jinis mesa kate nawa jinis benawg-a, ona do rasayanik bodol ko metag-a.`,
    localExDescTarget: `ᱟᱹᱛᱩ ᱨᱮ ᱚᱲᱟᱜ ᱯᱚᱛᱟᱣ ᱞᱟᱹᱜᱤᱫ ᱪᱩᱱ ᱨᱮ ᱫᱟᱜ ᱫᱩᱞ ᱞᱮᱠᱷᱟᱱ ᱞᱚᱞᱚ ᱦᱮᱰᱮᱡᱚᱜ-ᱟ ᱟᱨ ᱯᱩᱠᱷᱨᱤ ᱫᱟᱜ ᱨᱮ ᱢᱟᱰᱮᱞ ᱰᱟᱸᱰᱟ ᱠᱮᱪᱟᱜ ᱧᱮᱞᱚᱜ-ᱟ᱾`,
    localExDescHindi: `गाँव में मकान पुताई के समय चूने व पानी की तीखी अभिक्रिया और तालाब में मछली की आभासी गहराई दिखना।`
  }
};
secondaryScienceLangMap['hoc'] = {
  ...secondaryScienceLangMap['hi'],
  objTarget: `𑢹𑣉 𑣎𑣋𑣜: ᱢᱟᱨᱥᱟᱞ ᱟᱨ ᱨᱟᱥᱟᱭᱚᱱᱤᱠ ᱠᱟᱹᱢᱤ ᱵᱩᱡᱷᱟᱹᱣ᱾`
};
secondaryScienceLangMap['en'] = {
  ...secondaryScienceLangMap['hi'],
  objTarget: `Students will understand stoichiometry in chemical reactions and the wave nature of light refraction and reflection.`,
  introTarget: `Today we will explore exothermic chemical transformations and the optical physics of light refraction.`
};

// 7. Secondary Social Science (Constitution, Democracy, Indian Freedom Struggle, Jharkhand Natural Resources)
export const secondarySocialScienceLangMap: Record<string, CurriculumTemplateDict> = {
  hi: {
    objTarget: `विद्यार्थी भारतीय संविधान के बुनियादी मूल्यों, मौलिक अधिकारों, लोकतंत्र की कार्यप्रणाली और झारखंड के खनिज व वन संसाधनों को समझ सकेंगे।`,
    objHindi: `विद्यार्थी भारतीय संविधान के बुनियादी मूल्यों, मौलिक अधिकारों, लोकतंत्र की कार्यप्रणाली और झारखंड के खनिज व वन संसाधनों को समझ सकेंगे।`,
    prerequisites: ['गाँव की ग्राम सभा व पंचायत व्यवस्था', 'भारतीय स्वतंत्रता संग्राम की प्राथमिक जानकारी', 'मानचित्र पठन'],
    introTarget: `आज हम जानेंगे कि कैसे हमारा संविधान देश के प्रत्येक नागरिक को समानता का अधिकार देता है और हमारी धरती आबा की विरासत क्या है।`,
    introHindi: `आज हम जानेंगे कि कैसे हमारा संविधान देश के प्रत्येक नागरिक को समानता का अधिकार देता है और हमारी धरती आबा की विरासत क्या है।`,
    explTargetScript: `भारतीय संविधान 26 जनवरी 1950 को लागू हुआ। यह दुनिया का सबसे बड़ा लिखित संविधान है। यह समानता, स्वतंत्रता, धर्मनिरपेक्षता और बंधुत्व की गारंटी देता है। संविधान की 5वीं अनुसूची झारखंड जैसे अनुसूचित जनजाति क्षेत्रों को विशेष स्वशासन और भूमि सुरक्षा अधिकार प्रदान करती है।`,
    explTargetLatin: `Bhartiya Samvidhan samanta, swatantrata aur bandhutva ki guarantee deta hai. 5vin Anusoochi adivasi kshetro ko suraksha deti hai.`,
    explHindi: `संविधान देश का सर्वोच्च कानून है। यह नागरिकों को 6 मौलिक अधिकार देता है। लोकतंत्र में जनता अपने प्रतिनिधियों को वोट देकर चुनती है।`,
    explSimplerHindi: `जैसे हमारे गाँव में ग्राम प्रधान और पाहन-मांझी मिलकर नियम बनाते हैं और सब मिलकर पालन करते हैं, वैसे ही पूरे देश के लिए संविधान सर्वोच्च नियम पुस्तिका है।`,
    localExDescTarget: `झारखंड में ग्राम सभा की पारंपरिक माँझी-परगना, मुंडा-मानकी और पड़हा व्यवस्था, तथा सीएनटी (CNT) व एसपीटी (SPT) एक्ट के तहत जल-जंगल-ज़मीन की सुरक्षा।`,
    localExDescHindi: `गाँव की पारंपरिक ग्राम सभा और 5वीं अनुसूची के तहत जनजातीय स्वशासन व्यवस्था।`,
    activityTitle: 'कक्षा संसद व ग्राम सभा मॉक सत्र (Mock Gram Sabha & Rights Assembly)',
    instructionsTargetLang: 'कक्षा में एक बाल ग्राम सभा का आयोजन करें। एक विद्यार्थी को मुखिया, एक को शिक्षक और अन्य को ग्रामीण बनाकर जल संचयन और विद्यालय विकास पर चर्चा करें।',
    instructionsHindi: 'कक्षा में एक बाल ग्राम सभा का आयोजन करें। एक विद्यार्थी को मुखिया, एक को शिक्षक और अन्य को ग्रामीण बनाकर जल संचयन और विद्यालय विकास पर चर्चा करें।',
    materialsNeeded: ['संविधान की उद्देशिका (Preamble Chart)', 'बैठक हेतु दरी या गोल घेरा'],
    diagramType: 'CONSTITUTION_PILLARS_DIAGRAM',
    steps: [
      { stepNumber: 1, hindi: 'प्रस्तावना: संप्रभु, समाजवादी, पंथनिरपेक्ष, लोकतंत्रात्मक गणराज्य', targetLang: 'संविधान की आत्मा: उद्देशिका' },
      { stepNumber: 2, hindi: 'मौलिक अधिकार: समानता, स्वतंत्रता, शिक्षा व संवैधानिक उपचार', targetLang: 'नागरिक अधिकार व 5वीं अनुसूची' },
      { stepNumber: 3, hindi: 'ग्राम सभा व विकेंद्रीकरण: पेसा (PESA) कानून अधिकार', targetLang: 'स्थानीय स्वशासन व सामुदायिक भागीदारी' }
    ],
    q1: 'भारतीय संविधान की 5वीं अनुसूची किससे संबंधित है?',
    q1Hindi: 'भारतीय संविधान की 5वीं अनुसूची किससे संबंधित है?',
    q1Opts: ['अनुसूचित क्षेत्रों व जनजातियों के प्रशासन व भूमि सुरक्षा से', 'विदेशी व्यापार से', 'केवल शहरों से', 'रेलवे से'],
    q1OptsHindi: ['अनुसूचित क्षेत्रों व जनजातियों के प्रशासन व भूमि सुरक्षा से', 'विदेशी व्यापार से', 'केवल शहरों से', 'रेलवे से'],
    q1Ans: 'अनुसूचित क्षेत्रों व जनजातियों के प्रशासन व भूमि सुरक्षा से',
    q1Explanation: '5वीं अनुसूची झारखंड सहित 10 राज्यों के अनुसूचित क्षेत्रों में आदिवासियों की भूमि, संस्कृति और स्वशासन की रक्षा करती है।',
    q2: 'लोकतंत्र में सरकार चुनने का अधिकार किसके पास होता है?',
    q2Hindi: 'लोकतंत्र में सरकार चुनने का अधिकार किसके पास होता है?',
    q2Opts: ['देश के सभी 18+ वयस्क नागरिकों (जनता) के पास', 'केवल राजा के पास', 'केवल सेना के पास', 'किसी के पास नहीं'],
    q2OptsHindi: ['देश के सभी 18+ वयस्क नागरिकों (जनता) के पास', 'केवल राजा के पास', 'केवल सेना के पास', 'किसी के पास नहीं'],
    q2Ans: 'देश के सभी 18+ वयस्क नागरिकों (जनता) के पास',
    q2Explanation: 'सार्वभौमिक वयस्क मताधिकार (Universal Adult Suffrage) के तहत प्रत्येक 18 वर्ष या उससे अधिक आयु के नागरिक को एक वोट का अधिकार है।',
    worksheetTitle: 'कक्षा 8-10 सामाजिक विज्ञान: भारतीय संविधान, लोकतंत्र व झारखंड की धरोहर',
    worksheetInstr: 'सभी प्रश्नों को ध्यान से पढ़ें और उत्तर अपनी अभ्यास पुस्तिका में लिखें:',
    wPrompts: [
      '1. संविधान की प्रस्तावना में दिए गए किन्हीं तीन मुख्य मूल्यों के नाम लिखें:',
      '2. ग्राम सभा के क्या अधिकार हैं और यह हमारे गाँव के विकास में कैसे सहायक है?',
      '3. झारखंड के कोयला, लौह अयस्क और तांबा जैसे खनिजों के नाम व उपयोग लिखें:'
    ],
    wPromptsHindi: [
      '1. संविधान की प्रस्तावना में दिए गए किन्हीं तीन मुख्य मूल्यों के नाम लिखें:',
      '2. ग्राम सभा के क्या अधिकार हैं और यह हमारे गाँव के विकास में कैसे सहायक है?',
      '3. झारखंड के कोयला, लौह अयस्क और तांबा जैसे खनिजों के नाम व उपयोग लिखें:'
    ],
    flashcards: [
      { termHindi: 'संविधान (Constitution)', termTargetScript: 'ᱥᱚᱝᱵᱤᱫᱷᱟᱱ (Constitution)', termTargetLatin: 'Samvidhan', phonetic: '/səm.ʋi.dʱaːn/', exampleSentence: 'संविधान देश का सर्वोच्च विधान है।' },
      { termHindi: 'लोकतंत्र (Democracy)', termTargetScript: 'ᱦᱚᱲ ᱨᱟᱡᱽ (Democracy)', termTargetLatin: 'Loktantra', phonetic: '/loːk.t̪ən.t̪rə/', exampleSentence: 'जनता का, जनता द्वारा, जनता के लिए शासन लोकतंत्र है।' },
      { termHindi: 'ग्राम सभा (Gram Sabha)', termTargetScript: 'ᱟᱹᱛᱩ ᱵᱟᱹᱭᱥᱤ (Gram Sabha)', termTargetLatin: 'Gram Sabha', phonetic: '/ɡraːm sə.bʱaː/', exampleSentence: 'ग्राम सभा गाँव के विकास की निर्णयकारी संस्था है।' },
      { termHindi: 'मौलिक अधिकार (Fundamental Rights)', termTargetScript: 'ᱢᱩᱬᱩᱛ ᱟᱹᱭᱫᱟᱹᱨᱤ (Rights)', termTargetLatin: 'Maulik Adhikar', phonetic: '/mɔː.lik ə.dʱi.kaːr/', exampleSentence: 'शिक्षा का अधिकार हमारा मौलिक अधिकार है।' }
    ],
    taskTargetLang: 'गाँव के बुजुर्गों से पारंपरिक ग्राम व्यवस्था (मांझी, मुंडा, पाहन) के बारे में पूछें और 5 वाक्य लिखें।',
    quiz: [
      { question: 'भारत का संविधान कब पूर्ण रूप से लागू हुआ था?', options: ['26 जनवरी 1950', '15 अगस्त 1947', '26 नवंबर 1949', '2 अक्टूबर 1950'], correctIndex: 0 },
      { question: 'झारखंड का जादुगोड़ा किस महत्वपूर्ण खनिज के लिए प्रसिद्ध है?', options: ['यूरेनियम (Uranium)', 'सोना', 'हीरा', 'पेट्रोल'], correctIndex: 0 }
    ],
    blackboardSummary: {
      keyTerms: ['संविधान (26 Jan 1950)', 'मौलिक अधिकार', '5वीं अनुसूची व ग्राम सभा'],
      villageExample: 'माँझी-परगना / मुंडा-मानकी व्यवस्था और ग्राम सभा का निर्णय',
      actionRule: 'सभी नागरिक कानून के समक्ष समान हैं; शिक्षा पाना सबका अधिकार है।'
    }
  },
  sat: {
    ...middleSecondaryMathLangMap['sat'],
    objTarget: `ᱵᱷᱟᱨᱚᱛ ᱥᱚᱝᱵᱤᱫᱷᱟᱱ, ᱦᱚᱲ ᱨᱟᱡᱽ (Democracy) ᱟᱨ ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱨᱮᱭᱟᱜ ᱦᱟᱥᱟ-ᱵᱤᱨ ᱟᱹᱭᱫᱟᱹᱨᱤ ᱵᱟᱰᱟᱭ᱾`,
    objHindi: `विद्यार्थी भारतीय संविधान के बुनियादी मूल्यों, मौलिक अधिकारों, लोकतंत्र की कार्यप्रणाली और झारखंड के खनिज व वन संसाधनों को समझ सकेंगे।`,
    introTarget: `ᱛᱮᱦᱮᱧ ᱫᱚ ᱟᱵᱚ ᱫᱤᱥᱚᱢ ᱨᱮᱭᱟᱜ ᱢᱟᱨᱟᱝ ᱟᱹᱭᱤᱱ ᱥᱚᱝᱵᱤᱫᱷᱟᱱ (Constitution) ᱵᱟᱵᱚᱛ ᱵᱚᱱ ᱪᱮᱫ-ᱟ᱾`,
    introHindi: `आज हम जानेंगे कि कैसे हमारा संविधान देश के प्रत्येक नागरिक को समानता का अधिकार देता है।`,
    explTargetScript: `ᱵᱷᱟᱨᱚᱛ ᱥᱚᱝᱵᱤᱫᱷᱟᱱ ᱫᱚ ᱒᱖ ᱡᱟᱱᱩᱣᱟᱨᱤ ᱑᱙᱕᱐ ᱨᱮ ᱞᱟᱹᱜᱩ ᱞᱮᱱᱟ᱾ ᱱᱚᱣᱟ ᱫᱚ ᱥᱟᱱᱟᱢ ᱦᱚᱲ ᱥᱚᱢᱟᱱ ᱦᱚᱠ-ᱟᱹᱭᱫᱟᱹᱨᱤ ᱮᱢᱚᱜ-ᱟ᱾ ᱕ ᱟᱱᱟᱜ ᱚᱱᱩᱥᱩᱪᱤ ᱟᱹᱫᱤᱵᱟᱹᱥᱤ ᱠᱚᱣᱟᱜ ᱦᱟᱥᱟ ᱟᱨ ᱟᱹᱛᱩ ᱵᱟᱹᱭᱥᱤ ᱨᱮᱭᱟᱜ ᱨᱩᱠᱷᱤᱭᱟᱹ ᱮᱢᱚᱜ-ᱟ᱾`,
    explTargetLatin: `Bharat Samvidhan do 26 January 1950 re lagu lena. 5 anak anusuchi adivasi hasa reyak rukhiya emog-a.`,
    localExDescTarget: `ᱟᱹᱛᱩ ᱨᱮ ᱢᱟᱺᱡᱷᱤ-ᱦᱟᱲᱟᱢ, ᱱᱟᱭᱠᱮ ᱟᱨ ᱟᱹᱛᱩ ᱵᱟᱹᱭᱥᱤ ᱨᱮᱭᱟᱜ ᱯᱷᱟᱹᱭᱥᱟᱞᱟ᱾`,
    localExDescHindi: `गाँव की पारंपरिक ग्राम सभा और 5वीं अनुसूची के तहत जनजातीय स्वशासन व्यवस्था।`
  }
};
secondarySocialScienceLangMap['hoc'] = {
  ...secondarySocialScienceLangMap['hi'],
  objTarget: `𑢹𑣉 𑣎𑣋𑣜: ᱥᱚᱝᱵᱤᱫᱷᱟᱱ ᱟᱨ ᱦᱚᱲ ᱨᱟᱡᱽ ᱵᱟᱰᱟᱭ᱾`
};
secondarySocialScienceLangMap['en'] = {
  ...secondarySocialScienceLangMap['hi'],
  objTarget: `Students will comprehend Constitutional values, fundamental rights, Panchayati Raj, and mineral resources of Jharkhand.`,
  introTarget: `Today we will explore the Constitution of India, democratic decentralization, and state environmental wealth.`
};

// =========================================================================
// MAIN RESOLVER FUNCTION FOR EDUCATIONAL PROMPT CONTEXT (CLASSES 1 - 10)
// =========================================================================
export function resolveCurriculumTemplate(ctx: any): { dict: CurriculumTemplateDict; diagramType: string } {
  const topicLower = (ctx.topic || '').toLowerCase();
  const subjectLower = (ctx.subject || '').toLowerCase();
  const grade = ctx.grade || 4;
  const targetLang = (ctx.targetLanguage || 'sat').toLowerCase();

  // 1. Foundational Numeracy (Grade 1-2 Math)
  const isCounting = topicLower.includes('गिनती') || topicLower.includes('counting') || topicLower.includes('संख्या') || topicLower.includes('मान') || topicLower.includes('जोड़') || topicLower.includes('घटाव') || (grade <= 2 && subjectLower.includes('math'));

  // 2. Foundational Literacy (Grade 1-2 Language)
  const isLiteracyTopic = topicLower.includes('परिवार') || topicLower.includes('गाँव') || topicLower.includes('ध्वनि') || topicLower.includes('वर्ण') || topicLower.includes('अक्षर') || topicLower.includes('literacy') || (grade <= 2 && (subjectLower.includes('language') || subjectLower.includes('literacy')));

  // 3. Middle & Secondary Math (Grade 6-10 Math: Algebra, Linear Equations, Real Numbers, Trigonometry)
  const isSecondaryMath = (grade >= 6 && subjectLower.includes('math')) || topicLower.includes('समीकरण') || topicLower.includes('algebra') || topicLower.includes('बीजगणित') || topicLower.includes('त्रिकोणमिति') || topicLower.includes('बहुपद') || topicLower.includes('वास्तविक') || topicLower.includes('पूर्णांक');

  // 4. Middle & Secondary Science (Grade 6-10 Science: Chemical Reactions, Light, Electricity, Cells)
  const isSecondaryScience = (grade >= 6 && (subjectLower.includes('science') || subjectLower.includes('विज्ञान'))) || topicLower.includes('रासायनिक') || topicLower.includes('अपवर्तन') || topicLower.includes('परावर्तन') || topicLower.includes('प्रकाश') || topicLower.includes('विद्युत') || topicLower.includes('कोशिका') || topicLower.includes('अम्ल') || topicLower.includes('ऊष्मा');

  // 5. Middle & Secondary Social Science (Grade 6-10 Social Science: Constitution, Democracy, Tribal Movement)
  const isSecondarySocial = (grade >= 6 && (subjectLower.includes('social') || subjectLower.includes('सामाजिक') || subjectLower.includes('इतिहास') || subjectLower.includes('नागरिक'))) || topicLower.includes('संविधान') || topicLower.includes('लोकतंत्र') || topicLower.includes('खनिज') || topicLower.includes('पंचायती') || topicLower.includes('अधिकार');

  // 6. Regional Heritage & State Heroes (Grade 3-5 Social/EVS/Language)
  const isHeritage = topicLower.includes('बिरसा') || topicLower.includes('वीर') || topicLower.includes('कथा') || topicLower.includes('धरोहर') || topicLower.includes('नाटक') || topicLower.includes('संवाद');

  // 7. Water Conservation, Forests & Environment (Grade 3-5 EVS/Science)
  const isWaterNature = topicLower.includes('जल') || topicLower.includes('water') || topicLower.includes('जंगल') || topicLower.includes('वन्यजीव') || topicLower.includes('बीज') || topicLower.includes('खेती') || topicLower.includes('आपदा');

  let chosenMap: Record<string, CurriculumTemplateDict>;
  let defaultDiagram = 'FRACTION_BAR';

  if (isSecondaryMath) {
    chosenMap = middleSecondaryMathLangMap;
    defaultDiagram = 'EQUATION_BALANCE_DIAGRAM';
  } else if (isSecondaryScience) {
    chosenMap = secondaryScienceLangMap;
    defaultDiagram = 'LIGHT_REFRACTION_DIAGRAM';
  } else if (isSecondarySocial) {
    chosenMap = secondarySocialScienceLangMap;
    defaultDiagram = 'CONSTITUTION_PILLARS_DIAGRAM';
  } else if (isCounting) {
    chosenMap = countingLangMap;
    defaultDiagram = 'PEBBLE_COUNTER';
  } else if (isLiteracyTopic) {
    chosenMap = literacyLangMap;
    defaultDiagram = 'PHONEME_CHART';
  } else if (isHeritage) {
    chosenMap = heritageLanguageMap;
    defaultDiagram = 'HERO_TIMELINE';
  } else if (isWaterNature) {
    chosenMap = natureWaterLangMap;
    defaultDiagram = 'WATER_CYCLE_DIAGRAM';
  } else {
    // Default fallback based on school stage:
    if (grade <= 2) {
      chosenMap = countingLangMap;
      defaultDiagram = 'PEBBLE_COUNTER';
    } else if (grade <= 5) {
      chosenMap = natureWaterLangMap;
      defaultDiagram = 'WATER_CYCLE_DIAGRAM';
    } else if (subjectLower.includes('science')) {
      chosenMap = secondaryScienceLangMap;
      defaultDiagram = 'LIGHT_REFRACTION_DIAGRAM';
    } else if (subjectLower.includes('social')) {
      chosenMap = secondarySocialScienceLangMap;
      defaultDiagram = 'CONSTITUTION_PILLARS_DIAGRAM';
    } else {
      chosenMap = middleSecondaryMathLangMap;
      defaultDiagram = 'EQUATION_BALANCE_DIAGRAM';
    }
  }

  const dict = chosenMap[targetLang] || chosenMap['sat'] || chosenMap['hi'];
  return { dict, diagramType: dict.diagramType || defaultDiagram };
}
