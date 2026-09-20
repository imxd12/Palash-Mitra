import { Request, Response } from 'express';
import { db } from '../../core/database/db';

export const getStudentProfile = (req: Request, res: Response): void => {
  const { id } = req.params;
  const student = db.findOne('students', s => s.id === id);
  if (!student) {
    res.status(404).json({ success: false, message: 'Student not found' });
    return;
  }

  const progress = db.find('student_progress', p => p.studentId === id);

  res.json({
    success: true,
    student,
    progress
  });
};

export const getRemediationHistory = (req: Request, res: Response): void => {
  const { studentId } = req.query;
  let list = db.find('student_progress');
  if (studentId) {
    list = list.filter(p => p.studentId === studentId);
  }
  res.json({ success: true, count: list.length, history: list });
};

interface DiagnosticTemplate {
  planTitle: string;
  rootCauseIdentified: string;
  pedagogicalGuidance: string;
  simplifiedExplanation: {
    hindi: string;
    targetScript: string;
    targetLatin: string;
  };
  handsOnActivity: {
    title: string;
    materials: string[];
    stepsHindi: string[];
    stepsTargetLang: string[];
  };
  scaffoldedPractice: Array<{ problem: string; hint: string; level: 'Concrete' | 'Pictorial' | 'Abstract' }>;
  reassessmentCheck: {
    question: string;
    answer: string;
  };
}

const TOPIC_TEMPLATES: Record<string, DiagnosticTemplate> = {
  subtraction: {
    planTitle: 'तीली-बंडल (काड़ा) विधि से स्थानीय घटाव उपचारात्मक योजना',
    rootCauseIdentified: 'स्थान-मान (Place Value) और दहाई से इकाई में बदलने (Borrowing) में अमूर्त संख्याओं का भ्रम।',
    pedagogicalGuidance: 'अमूर्त संख्याओं के बजाय तीली-बंडल (काड़ा) विधि और संथाली/हो/मुंडारी मातृभाषा में स्थानीय संदर्भ से अभ्यास कराएं।',
    simplifiedExplanation: {
      hindi: 'जब इकाई के पास पर्याप्त तीलियां नहीं होतीं, तो वह पड़ोस की दहाई से 1 बंडल (10 तीलियां) खोलकर मिला लेता है।',
      targetScript: 'ᱡᱚᱠᱷᱚᱱ ᱢᱤᱫᱟᱱ (इकाई) ᱴᱷᱮᱱ ᱠᱚᱢ ᱮᱞ ᱛᱟᱦᱮᱸᱱᱟ, ᱩᱱ ᱡᱚᱠᱷᱚᱱ ᱥᱩᱨ ᱨᱮᱭᱟᱜ ᱜᱮᱞᱟᱱ (दहाई) ᱠᱷᱚᱱ ᱑ ᱵᱤᱸᱰᱟᱹ (᱑᱐ ᱠᱟᱹᱰᱤ) ᱮ ᱦᱟᱛᱟᱣᱟ᱾',
      targetLatin: 'Jokhon midan then kom el tahena, un jokhon sur reyag gelan khon 1 binda (10 kadi) e hatawa.'
    },
    handsOnActivity: {
      title: 'काड़ा और तीली खेल (Kada & Sticks Activity)',
      materials: ['10-10 तीलियों के 5 बंडल (काड़ा / ᱵᱤᱸᱰᱟᱹ)', '20 खुली तीलियां (ᱠᱟᱹᱰᱤ)', 'गिनतारा या स्लेट'],
      stepsHindi: [
        '1. 32 को दर्शाने के लिए 3 बंडल (30) और 2 खुली तीलियां रखें।',
        '2. 32 में से 7 घटाने के लिए: 2 खुली तीलियों में से 7 नहीं निकल सकतीं।',
        '3. 1 बंडल खोलें -> अब हमारे पास 10 + 2 = 12 खुली तीलियां हो गईं।',
        '4. 12 में से 7 तीलियां निकालें = 5 बचीं।',
        '5. बचे हुए बंडल: 2 (20) + 5 खुली = 25!'
      ],
      stepsTargetLang: [
        '᱑. ᱓᱒ ᱩᱫᱩᱜ ᱞᱟᱹᱜᱤᱫ ᱓ ᱵᱤᱸᱰᱟᱹ (᱓᱐) ᱟᱨ ᱒ ᱠᱷᱩᱞᱟᱹ ᱠᱟᱹᱰᱤ ᱫᱚᱦᱚᱭ ᱯᱮ᱾',
        '᱒. ᱓᱒ ᱠᱷᱚᱱ ᱗ ᱵᱷᱮᱜᱟᱨ ᱞᱟᱹᱜᱤᱫ: ᱒ ᱠᱷᱩᱞᱟᱹ ᱠᱟᱹᱰᱤ ᱠᱷᱚᱱ ᱗ ᱵᱟᱝ ᱚᱰᱚᱠᱚᱜ-ᱟ᱾',
        '᱓. ᱑ ᱵᱤᱸᱰᱟᱹ ᱨᱟᱲᱟᱭ ᱯᱮ -> ᱱᱤᱛᱚᱜ ᱑᱐ + ᱒ = ᱑᱒ ᱠᱷᱩᱞᱟᱹ ᱠᱟᱹᱰᱤ ᱦᱩᱭ ᱮᱱᱟ᱾',
        '᱔. ᱑᱒ ᱠᱷᱚᱱ ᱗ ᱠᱟᱹᱰᱤ ᱚᱪᱚᱜ ᱢᱮ = ᱕ ᱥᱟᱨᱮᱡ ᱮᱱᱟ᱾',
        '᱕. ᱥᱟᱨᱮᱡ ᱵᱤᱸᱰᱟᱹ: ᱒ (᱒᱐) + ᱕ ᱠᱟᱹᱰᱤ = ᱒᱕!'
      ]
    },
    scaffoldedPractice: [
      { problem: '24 - 6 = ?', hint: '1 बंडल खोलो (10+4=14), 14 में से 6 घटाओ = 8, बंडल बचे 1 = 18', level: 'Concrete' },
      { problem: '43 - 8 = ?', hint: '1 बंडल खोलो (10+3=13), 13 में से 8 घटाओ = 5, बंडल बचे 3 = 35', level: 'Pictorial' },
      { problem: '52 - 17 = ?', hint: 'इकाई 12-7=5, दहाई 4-1=3, कुल 35', level: 'Abstract' }
    ],
    reassessmentCheck: {
      question: 'यदि आपके पास 32 महुआ के फल हैं और 7 खराब हो गए, तो कितने अच्छे फल बचे?',
      answer: '25'
    }
  },
  fraction: {
    planTitle: 'समान बंटवारा व रोटी/फल विधि से भिन्न (Fraction) उपचारात्मक योजना',
    rootCauseIdentified: 'भिन्न को दो अलग-अलग संख्याएं (ऊपर-नीचे) मान लेना, अंश और हर के परस्पर संबंध की स्पष्ट समझ न होना।',
    pedagogicalGuidance: 'स्थानीय मड़ुआ रोटी, केंदू या अमरूद को 2 और 4 बराबर टुकड़ों में काटकर बच्चों से हाथ से अनुभव कराएं।',
    simplifiedExplanation: {
      hindi: 'भिन्न का अर्थ है किसी एक पूरी वस्तु को बराबर भागों में बांटना। नीचे की संख्या (हर) बताती है कुल कितने टुकड़े हैं, ऊपर की संख्या (अंश) बताती है हमें कितने मिले।',
      targetScript: 'ᱡᱟᱦᱟᱸ ᱡᱤᱱᱤᱥ ᱵᱟᱨ ᱥᱚᱢᱟᱱ ᱦᱟᱹᱴᱤᱧ ᱞᱮᱠᱷᱟᱱ ᱚᱱᱟ ᱫᱚ ᱛᱟᱞᱟ (᱑/᱒) ᱠᱚ ᱢᱮᱛᱟᱜ-ᱟ᱾ ᱞᱟᱛᱟᱨ ᱮᱞ ᱫᱚ ᱡᱚᱛᱚ ᱦᱟᱹᱴᱤᱧ, ᱪᱮᱛᱟᱱ ᱮᱞ ᱫᱚ ᱟᱵᱚᱣᱟᱜ ᱦᱟᱹᱴᱤᱧ᱾',
      targetLatin: 'Jaha jinis bar soman hating lekhan ona do tala (1/2) ko metag-a. Latar el do joto hating, chetan el do abowag hating.'
    },
    handsOnActivity: {
      title: 'कागज की गोल रोटी मोड़ो खेल',
      materials: ['गोल कागज के 3 चकत्ते', 'रंगीन पेंसिल', 'कैंची'],
      stepsHindi: [
        '1. पहले कागज को बीच से ठीक बराबर मोड़ें -> 2 भाग बने। 1 भाग रंगें = 1/2 (आधा)।',
        '2. दूसरे कागज को दो बार मोड़ें -> 4 भाग बने। 1 भाग रंगें = 1/4 (चौथाई)।',
        '3. ध्यान से देखें: 2/4 और 1/2 दोनों बराबर आकार के हैं!'
      ],
      stepsTargetLang: [
        '᱑. ᱠᱟᱜᱚᱡᱽ ᱛᱟᱞᱟ ᱨᱮ ᱥᱚᱢᱟᱱ ᱯᱮ ᱞᱮᱵᱮᱫ ᱢᱮ -> ᱒ ᱦᱟᱹᱴᱤᱧ ᱵᱮᱱᱟᱣ ᱮᱱᱟ = ᱛᱟᱞᱟ (᱑/᱒)᱾',
        '᱒. ᱫᱚᱥᱟᱨ ᱠᱟᱜᱚᱡᱽ ᱵᱟᱨ ᱫᱷᱟᱣ ᱞᱮᱵᱮᱫ ᱢᱮ -> ᱔ ᱦᱟᱹᱴᱤᱧ = ᱑/᱔᱾',
        '᱓. ᱧᱮᱞ ᱢᱮ: ᱒/᱔ ᱟᱨ ᱑/᱒ ᱵᱟᱱᱟᱨ ᱥᱚᱢᱟᱱ ᱜᱮᱭᱟ!'
      ]
    },
    scaffoldedPractice: [
      { problem: '1 अमरुद को 4 दोस्तों में बराबर बांटा। प्रत्येक को कितना मिला?', hint: 'कुल 4 भाग, 1 मिला = 1/4', level: 'Concrete' },
      { problem: '2/4 और 1/2 में कौन बड़ा है?', hint: 'दोनों बिल्कुल बराबर हैं!', level: 'Pictorial' },
      { problem: '3/6 को सरलतम रूप में लिखें', hint: 'अंश और हर दोनों को 3 से भाग दें = 1/2', level: 'Abstract' }
    ],
    reassessmentCheck: {
      question: 'एक तरबूज के 4 बराबर टुकड़े किए गए। आपने 2 टुकड़े खाए। आपने तरबूज का कितना भाग खाया?',
      answer: '2/4 या 1/2 (आधा)'
    }
  },
  plant: {
    planTitle: 'गाँव के सखुआ और नीम पौधे से वनस्पति विज्ञान उपचारात्मक योजना',
    rootCauseIdentified: 'जड़ (Root) और तने (Stem) के परिवहन कार्य तथा पत्तियों द्वारा भोजन निर्माण में किताबी परिभाषा का रट्टा।',
    pedagogicalGuidance: 'विद्यालय प्रांगण में लगे पौधे का प्रत्यक्ष अवलोकन, रंगीन पानी में तने का प्रयोग कर मातृभाषा में चर्चा कराएं।',
    simplifiedExplanation: {
      hindi: 'जड़ें मिट्टी से पानी और खनिज चूसती हैं, तना उसे पत्तियों तक पहुँचाता है, और हरी पत्तियाँ धूप की मदद से पौधे का भोजन बनाती हैं।',
      targetScript: 'ᱨᱮᱦᱮᱫ ᱫᱚ ᱦᱟᱥᱟ ᱠᱷᱚᱱ ᱫᱟᱜ ᱮ ᱪᱮᱯᱮᱧ ᱨᱟᱠᱟᱵᱟ, ᱰᱟᱹᱨ ᱫᱚ ᱥᱟᱠᱟᱢ ᱴᱷᱮᱱ ᱮ ᱤᱫᱤᱭᱟ, ᱟᱨ ᱥᱟᱠᱟᱢ ᱫᱚ ᱵᱮᱲᱟ ᱛᱟᱨᱟᱥ ᱛᱮ ᱡᱚᱢᱟᱜ ᱮ ᱛᱮᱭᱟᱨᱟ᱾',
      targetLatin: 'Rehed do hasa khon dag e chepeñ rakaba, dar do sakam then e idiya, ar sakam do bera taras te jomag e teyara.'
    },
    handsOnActivity: {
      title: 'रंगीन पानी में तना प्रयोग (Stem Capillary Action)',
      materials: ['सफेद फूल या गुलदाउदी की टहनी', 'लाल या नीली स्याही वाला पानी', 'पारदर्शी गिलास'],
      stepsHindi: [
        '1. एक गिलास में पानी लेकर उसमें 5 बूँद लाल स्याही घोलें।',
        '2. ताजी टहनी को तिरछा काटकर 2 घंटे के लिए इस पानी में रखें।',
        '3. ध्यान से देखें: तने के अंदर से लाल रंग ऊपर पत्तियों और फूल तक चढ़ता हुआ दिखता है।'
      ],
      stepsTargetLang: [
        '᱑. ᱠᱟᱸᱪ ᱵᱟᱹᱴᱤ ᱨᱮ ᱫᱟᱜ ᱟᱨ ᱟᱨᱟᱜ ᱥᱤᱭᱟᱦᱤ ᱢᱮᱥᱟᱭ ᱯᱮ᱾',
        '᱒. ᱢᱤᱫ ᱥᱟᱠᱟᱢ ᱰᱟᱹᱨ ᱵᱟᱨ ᱜᱷᱚᱱᱴᱟ ᱞᱟᱹᱜᱤᱫ ᱚᱱᱟ ᱫᱟᱜ ᱨᱮ ᱛᱟᱦᱮᱸ ᱚᱪᱚᱣᱟᱜ ᱢᱮ᱾',
        '᱓. ᱧᱮᱞ ᱢᱮ: ᱰᱟᱹᱨ ᱛᱟᱞᱟ ᱛᱮ ᱟᱨᱟᱜ ᱫᱟᱜ ᱥᱟᱠᱟᱢ ᱥᱮᱱ ᱨᱟᱠᱟᱵ ᱠᱟᱱᱟ᱾'
      ]
    },
    scaffoldedPractice: [
      { problem: 'पौधे की रसोई किसे कहा जाता है और क्यों?', hint: 'पत्ती को, क्योंकि यह भोजन बनाती है', level: 'Concrete' },
      { problem: 'यदि पौधे की जड़ें काट दी जाएं तो क्या होगा?', hint: 'पौधे को पानी नहीं मिलेगा और वह सूख जाएगा', level: 'Pictorial' },
      { problem: 'प्रकाश संश्लेषण में कौन सी गैस पौधे अंदर लेते हैं?', hint: 'कार्बन डाइऑक्साइड (CO2)', level: 'Abstract' }
    ],
    reassessmentCheck: {
      question: 'पौधे का कौन सा भाग जमीन से पानी और पोषक तत्व खींचकर तने को देता है?',
      answer: 'जड़ (Root / Rehed)'
    }
  },
  phoneme: {
    planTitle: 'ध्वनि-मात्रा संरेखण व वर्ण-उच्चारण उपचारात्मक योजना',
    rootCauseIdentified: 'मातृभाषा (संथाली/हो/कुड़ुख) के स्वर-व्यंजन और हिंदी/अंग्रेजी की मानक वर्तनी के बीच ध्वनि संलक्षण का भ्रम।',
    pedagogicalGuidance: 'अक्षर कार्ड, दर्पण में मुख की मुद्रा देखकर उच्चारण और स्थानीय बाल-गीत की लय में अभ्यास।',
    simplifiedExplanation: {
      hindi: 'हर अक्षर की अपनी एक निश्चित आवाज होती है। जब हम अक्षर की आवाज को पहचान लेते हैं, तो शब्दों को जोड़कर पढ़ना बहुत आसान हो जाता है।',
      targetScript: 'ᱡᱚᱛᱚ ᱟᱠᱷᱚᱨ ᱨᱮᱭᱟᱜ ᱢᱤᱫ ᱵᱷᱮᱜᱟᱨ ᱥᱟᱰᱮ ᱢᱮᱱᱟᱜ-ᱟ᱾ ᱥᱟᱰᱮ ᱴᱷᱤᱠᱟᱹ ᱞᱮᱠᱷᱟᱱ ᱯᱟᱲᱦᱟᱣ ᱟᱹᱰᱤ ᱟᱞᱜᱟ ᱜᱮᱭᱟ᱾',
      targetLatin: 'Joto akhor reyag mid bhegar sade menag-a. Sade thika lekhan parhaw adi alga geya.'
    },
    handsOnActivity: {
      title: 'ध्वनि चुटकी और अक्षर मिलाओ खेल',
      materials: ['फ्लैशकार्ड', 'रेत की थाली (Sand Tray)'],
      stepsHindi: [
        '1. शिक्षक वर्ण की मूल ध्वनि बोलें (जैसे: क्... म्... ल्...)।',
        '2. छात्र रेत की थाली में अपनी उंगली से उस वर्ण को बनाएं।',
        '3. तीनों वर्णों को मिलाकर तेजी से बोलें: कमल!'
      ],
      stepsTargetLang: [
        '᱑. ᱜᱩᱨᱩᱡᱤ ᱥᱟᱰᱮ ᱮ ᱢᱮᱱᱟ (ᱡᱮᱞᱮᱠᱟ: ᱠ... ᱚ... ᱞ...)᱾',
        '᱒. ᱜᱤᱫᱽᱨᱟᱹ ᱜᱤᱛᱤᱞ ᱛᱷᱟᱹᱨᱤ ᱨᱮ ᱚᱱᱟ ᱟᱠᱷᱚᱨ ᱠᱚ ᱚᱞ-ᱟ᱾',
        '᱓. ᱡᱚᱛᱚ ᱥᱟᱰᱮ ᱡᱚᱲᱟᱣ ᱠᱟᱛᱮ ᱨᱚᱲ ᱢᱮ!'
      ]
    },
    scaffoldedPractice: [
      { problem: 'प + त + ंग को मिलाकर पढ़ें', hint: 'पतंग', level: 'Concrete' },
      { problem: 'नल में पहली और अंतिम ध्वनि कौन सी है?', hint: 'पहली न्, अंतिम ल्', level: 'Pictorial' },
      { problem: 'समान तुक वाले दो शब्द बताएं (जैसे: ताला - माला)', hint: 'काला, जाला', level: 'Abstract' }
    ],
    reassessmentCheck: {
      question: 'अक्षर "म", "ट", "र" को मिलाकर कौन सा सार्थक शब्द बनता है?',
      answer: 'मटर'
    }
  }
};

export const diagnoseAndRemediate = (req: Request, res: Response): void => {
  const { studentId, topic, errorPattern } = req.body;

  const student = studentId ? db.findOne('students', s => s.id === studentId) : null;
  const targetTopic = (topic || '2-अंकीय घटाव व स्थानीय मान').toLowerCase();

  let matchedKey = 'subtraction';
  if (targetTopic.includes('fraction') || targetTopic.includes('भिन्न') || targetTopic.includes('बांट')) {
    matchedKey = 'fraction';
  } else if (targetTopic.includes('plant') || targetTopic.includes('पौध') || targetTopic.includes('जड़')) {
    matchedKey = 'plant';
  } else if (targetTopic.includes('phoneme') || targetTopic.includes('अक्षर') || targetTopic.includes('मात्रा') || targetTopic.includes('वर्ण')) {
    matchedKey = 'phoneme';
  }

  const template = TOPIC_TEMPLATES[matchedKey] || TOPIC_TEMPLATES.subtraction;

  const diagnosis = {
    detectedTopic: topic || '2-अंकीय घटाव व स्थानीय मान (Subtraction & Place Value)',
    studentId: student ? student.id : studentId,
    studentName: student ? student.name : 'नामांकित विद्यार्थी',
    motherTongue: student ? student.motherTongue : 'sat',
    rootCauseIdentified: template.rootCauseIdentified,
    pedagogicalGuidance: template.pedagogicalGuidance
  };

  const remediationPlan = {
    planTitle: template.planTitle,
    topicCategory: matchedKey,
    simplifiedExplanation: template.simplifiedExplanation,
    handsOnActivity: template.handsOnActivity,
    scaffoldedPractice: template.scaffoldedPractice,
    reassessmentCheck: template.reassessmentCheck
  };

  // Record initial remediation status in DB
  if (studentId) {
    db.upsert('student_progress', {
      studentId,
      studentName: student?.name || 'Student',
      topic: diagnosis.detectedTopic,
      masteryScore: 0.35,
      attemptsCount: 1,
      mistakesSummary: errorPattern || template.rootCauseIdentified,
      needsRemediation: true,
      updatedAt: new Date().toISOString()
    }, p => p.studentId === studentId && p.topic === diagnosis.detectedTopic);
  }

  res.json({
    success: true,
    diagnosis,
    remediationPlan
  });
};

export const updateStudentMastery = (req: Request, res: Response): void => {
  const { studentId, topic, newScore, reassessmentPassed } = req.body;

  const existing = db.findOne('student_progress', p => p.studentId === studentId && p.topic === topic);
  const updated = db.upsert('student_progress', {
    studentId,
    topic,
    masteryScore: newScore !== undefined ? newScore : 0.88,
    attemptsCount: (existing ? (existing.attemptsCount || 1) : 0) + 1,
    needsRemediation: !reassessmentPassed,
    lastAssessmentAt: new Date().toISOString()
  }, p => p.studentId === studentId && p.topic === topic);

  res.json({ success: true, message: 'Student progress updated', progress: updated });
};
