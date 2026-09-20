export interface CurriculumItem {
  id?: string;
  grade: number;
  subject: string;
  chapterNumber: number;
  chapterTitle: string;
  topic: string;
  competency: string;
  learningOutcome: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
}

export const initialCurriculumSeed: CurriculumItem[] = [
  // Grade 1 - Foundational Numeracy & Literacy
  {
    grade: 1,
    subject: 'Mathematics',
    chapterNumber: 1,
    chapterTitle: 'संख्याओं का जादू (Numbers 1-9)',
    topic: 'वस्तुओं को गिनना और जोड़ना (Counting and Addition)',
    competency: 'मूर्त वस्तुओं की सहायता से 1 से 9 तक की संख्याओं को पहचानना व गिनना',
    learningOutcome: 'विद्यार्थी स्थानीय परिवेश की वस्तुओं (कंकड़, पत्तियां, तीलियां) को गिनकर योग कर सकेंगे',
    difficulty: 'EASY'
  },
  {
    grade: 1,
    subject: 'Foundational Literacy',
    chapterNumber: 1,
    chapterTitle: 'मेरा परिवार और मेरा गाँव (Family & Village)',
    topic: 'पारिवारिक संबंध और दैनिक शब्दावली (Bilingual Vocabulary)',
    competency: 'मातृभाषा और हिंदी के समानार्थक शब्दों की मौखिक पहचान',
    learningOutcome: 'बच्चे अपने परिवेश और परिवार के सदस्यों के नाम मातृभाषा व हिंदी में आत्मविश्वास से बोल सकेंगे',
    difficulty: 'EASY'
  },

  // Grade 2 - Mathematics & Foundational Literacy (NEP 2020 Foundational Stage: No EVS/Science)
  {
    grade: 2,
    subject: 'Mathematics',
    chapterNumber: 2,
    chapterTitle: 'गिनती और घटाव (Counting & Subtraction)',
    topic: '2-अंकीय घटाव (2-Digit Subtraction)',
    competency: 'स्थानीय मान की समझ और 20 तक की संख्याओं का घटाव',
    learningOutcome: 'विद्यार्थी बंडलों और तीलियों के माध्यम से घटाव की संक्रिया को समझा सकेंगे',
    difficulty: 'MEDIUM'
  },
  {
    grade: 2,
    subject: 'Foundational Literacy',
    chapterNumber: 2,
    chapterTitle: 'हमारा सुंदर गाँव (Our Village & Surroundings)',
    topic: 'सरल वाक्य पठन और मौखिक अभिव्यक्ति (Sentence Reading)',
    competency: 'स्थानीय मातृभाषा और हिंदी में 2-3 वाक्यों की मौखिक अभिव्यक्ति',
    learningOutcome: 'विद्यार्थी अपने गाँव, पेड़-पौधों और जल स्रोतों के बारे में मातृभाषा में आत्मविश्वास से बता सकेंगे',
    difficulty: 'EASY'
  },

  // Grade 3 - Science / EVS & Mathematics
  {
    grade: 3,
    subject: 'Science',
    chapterNumber: 3,
    chapterTitle: 'पेड़-पौधे हमारे मित्र (Plants Around Us)',
    topic: 'पौधे के अंग और उनके कार्य (Parts of a Plant)',
    competency: 'जड़, तना, पत्ती, फूल और फल की पहचान और पौधों की पोषण प्रक्रिया की समझ',
    learningOutcome: 'विद्यार्थी स्थानीय पेड़-पौधों (साल, महुआ, पलाश, जामुन) के अंगों को मातृभाषा में पहचान सकेंगे',
    difficulty: 'MEDIUM'
  },
  {
    grade: 3,
    subject: 'Mathematics',
    chapterNumber: 4,
    chapterTitle: 'गुणा का कमाल (Multiplication Concepts)',
    topic: 'समान समूहों का योग (Repeated Addition)',
    competency: 'गुणा को बार-बार जोड़ने की प्रक्रिया के रूप में समझना',
    learningOutcome: 'विद्यार्थी 2, 3, 4 और 5 के पहाड़ों को स्थानीय वस्तुओं के समूहों से बना सकेंगे',
    difficulty: 'MEDIUM'
  },

  // Grade 4 - Mathematics (Core SIH Demo Target)
  {
    grade: 4,
    subject: 'Mathematics',
    chapterNumber: 5,
    chapterTitle: 'हिस्सा और भिन्न (Fractions & Equal Parts)',
    topic: 'भिन्न की अवधारणा (Introduction to Fractions)',
    competency: 'पूरी वस्तु के बराबर हिस्सों (1/2, 1/3, 1/4) को समझना तथा अंश व हर की पहचान',
    learningOutcome: 'विद्यार्थी किसी वस्तु या समूह को बराबर बांटकर भिन्न के रूप में व्यक्त कर सकेंगे',
    difficulty: 'MEDIUM'
  },
  {
    grade: 4,
    subject: 'EVS',
    chapterNumber: 4,
    chapterTitle: 'झारखंड की प्रकृति और जंगल (Forests of Jharkhand)',
    topic: 'वन, वन्यजीव और हमारा समुदाय (Forests & Community)',
    competency: 'जंगल से मिलने वाले प्राकृतिक संसाधनों और सामुदायिक संरक्षण के तरीकों की समझ',
    learningOutcome: 'विद्यार्थी वन संरक्षण में ग्राम समुदाय की भूमिका पर विचार साझा कर सकेंगे',
    difficulty: 'MEDIUM'
  },

  // Grade 5 - Science & Mathematics
  {
    grade: 5,
    subject: 'Science',
    chapterNumber: 2,
    chapterTitle: 'जल चक्र और वर्षा (Water Cycle)',
    topic: 'वाष्पीकरण और संघनन (Evaporation and Condensation)',
    competency: 'सूर्य की गर्मी से जल के वाष्प बनने और बादलों से वर्षा होने की वैज्ञानिक प्रक्रिया समझना',
    learningOutcome: 'विद्यार्थी जल चक्र के विभिन्न चरणों को आरेख बनाकर मातृभाषा में समझा सकेंगे',
    difficulty: 'MEDIUM'
  },
  {
    grade: 5,
    subject: 'Mathematics',
    chapterNumber: 6,
    chapterTitle: 'दशमलव और मापन (Decimals & Measurement)',
    topic: 'लंबाई, भार और धारिता का मापन (Measurement Units)',
    competency: 'मीटर, सेंटीमीटर, किलोग्राम और लीटर के दैनिक जीवन में अनुप्रयोग की समझ',
    learningOutcome: 'विद्यार्थी स्थानीय हाट-बाज़ार में उपयोग होने वाली मापन इकाइयों का सही उपयोग कर सकेंगे',
    difficulty: 'HARD'
  },

  // Grade 6 to 10 - Middle & Secondary Foundations
  {
    grade: 6,
    subject: 'Science',
    chapterNumber: 1,
    chapterTitle: 'भोजन के घटक (Components of Food)',
    topic: 'कार्बोहाइड्रेट, प्रोटीन, वसा और विटामिन (Nutrients)',
    competency: 'संतुलित आहार और स्थानीय बाजरा/रागी/दालों में उपस्थित पोषक तत्वों की पहचान',
    learningOutcome: 'विद्यार्थी स्थानीय पौष्टिक खाद्य पदार्थों से संतुलित थाली की योजना बना सकेंगे',
    difficulty: 'MEDIUM'
  },
  {
    grade: 7,
    subject: 'Science',
    chapterNumber: 4,
    chapterTitle: 'ऊष्मा और ताप (Heat & Temperature)',
    topic: 'चालन, संवहन और विकिरण (Heat Transfer)',
    competency: 'दैनिक जीवन में ऊष्मा स्थानांतरण के उदाहरणों का वैज्ञानिक विश्लेषण',
    learningOutcome: 'विद्यार्थी मिट्टी के घड़े में पानी ठंडा रहने के सिद्धांत को समझा सकेंगे',
    difficulty: 'HARD'
  },
  {
    grade: 8,
    subject: 'Mathematics',
    chapterNumber: 2,
    chapterTitle: 'एक चर वाले रैखिक समीकरण (Linear Equations in One Variable)',
    topic: 'समीकरण हल करना (Solving Simple Equations)',
    competency: 'दैनिक जीवन की समस्याओं को बीजगणितीय समीकरण में बदलना व हल करना',
    learningOutcome: 'विद्यार्थी बाज़ार के क्रय-विक्रय की परिस्थितियों को समीकरण बनाकर हल कर सकेंगे',
    difficulty: 'HARD'
  },
  {
    grade: 9,
    subject: 'Science',
    chapterNumber: 5,
    chapterTitle: 'जीवन की मौलिक इकाई (The Fundamental Unit of Life)',
    topic: 'कोशिका संरचना और कार्य (Cell Structure and Organelles)',
    competency: 'पादप कोशिका और जंतु कोशिका के बीच अंतर की सूक्ष्मदर्शीय समझ',
    learningOutcome: 'विद्यार्थी प्याज की झिल्ली की कोशिका का अवलोकन कर नामांकित चित्र बना सकेंगे',
    difficulty: 'CHALLENGE'
  },
  {
    grade: 10,
    subject: 'Mathematics',
    chapterNumber: 8,
    chapterTitle: 'त्रिकोणमिति का परिचय (Introduction to Trigonometry)',
    topic: 'त्रिकोणमितीय अनुपात (Trigonometric Ratios)',
    competency: 'समकोण त्रिभुज में कोणों और भुजाओं के संबंधों का अनुप्रयोग',
    learningOutcome: 'विद्यार्थी किसी पेड़ या मीनार की ऊंचाई ज्ञात करने में त्रिकोणमिति का प्रयोग कर सकेंगे',
    difficulty: 'CHALLENGE'
  }
];
