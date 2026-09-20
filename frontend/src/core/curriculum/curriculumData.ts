// JCERT / NEP 2020 Pedagogical Curriculum Registry & Grade-Subject Staging

export interface SubjectOption {
  id: string;
  name: string;
  hindiName: string;
  icon?: string;
}

export interface GradeCurriculum {
  grade: number;
  stageName: string;
  stageHindi: string;
  subjects: SubjectOption[];
  defaultSubject: string;
  topics: Record<string, string[]>;
}

export const CURRICULUM_DATA: Record<number, GradeCurriculum> = {
  // FOUNDATIONAL STAGE (कक्षा 1 - 2)
  // Strict NEP 2020 Rule: ONLY Foundational Literacy and Mathematics. NO EVS or Science!
  1: {
    grade: 1,
    stageName: 'Foundational Stage',
    stageHindi: 'बुनियादी चरण (कक्षा 1)',
    subjects: [
      { id: 'Foundational Literacy', name: 'Foundational Literacy (बुनियादी भाषा)', hindiName: 'बुनियादी भाषा व मौखिक विकास' },
      { id: 'Mathematics', name: 'Mathematics (गणित)', hindiName: 'गणित (संख्या ज्ञान 1-9)' }
    ],
    defaultSubject: 'Foundational Literacy',
    topics: {
      'Foundational Literacy': [
        'मेरा परिवार और मेरा गाँव (Family & Village)',
        'ध्वनि पहचान और मौखिक शब्दावली (Phonemic Awareness)',
        'चित्र वाचन और बातचीत (Picture Reading)',
        'सरल बालगीत और पहेलियाँ (Rhymes & Riddles)'
      ],
      'Mathematics': [
        'संख्याओं का जादू: 1 से 9 तक गिनती (Counting 1-9)',
        'मूर्त वस्तुओं को गिनना और जोड़ना (Addition with objects)',
        'आकृतियों की पहचान: गोल, चौकोर, तिकोना (Shapes)',
        'छोटा-बड़ा और हल्का-भारी की तुलना (Comparison)'
      ]
    }
  },
  2: {
    grade: 2,
    stageName: 'Foundational Stage',
    stageHindi: 'बुनियादी चरण (कक्षा 2)',
    subjects: [
      { id: 'Foundational Literacy', name: 'Foundational Literacy (बुनियादी भाषा)', hindiName: 'बुनियादी भाषा व पठन' },
      { id: 'Mathematics', name: 'Mathematics (गणित)', hindiName: 'गणित (जोड़-घटाव व स्थानीय मान)' }
    ],
    defaultSubject: 'Mathematics',
    topics: {
      'Foundational Literacy': [
        'हमारा सुंदर गाँव (Our Beautiful Village)',
        'वर्ण पहचान और संयुक्त अक्षर (Letters & Syllables)',
        'सरल वाक्य पठन और अभिव्यक्ति (Sentence Reading)',
        'लोकल कहानियों का मौखिक दोहराव (Folktale Retelling)'
      ],
      'Mathematics': [
        '2-अंकीय गिनती और स्थानीय मान (Place Value to 99)',
        'तीलियों और बंडलों से घटाव (2-Digit Subtraction)',
        'वस्तुओं के बराबर समूह बनाना (Grouping & Sharing)',
        'स्थानीय मापन: बित्ता, कदम और हाथ (Informal Measurement)'
      ]
    }
  },

  // PREPARATORY STAGE (कक्षा 3 - 5)
  // NEP 2020: Mathematics, EVS (पर्यावरण अध्ययन - आस पास), and Language
  3: {
    grade: 3,
    stageName: 'Preparatory Stage',
    stageHindi: 'तैयारी चरण (कक्षा 3)',
    subjects: [
      { id: 'Mathematics', name: 'Mathematics (गणित)', hindiName: 'गणित' },
      { id: 'EVS', name: 'EVS (पर्यावरण अध्ययन - आस पास)', hindiName: 'पर्यावरण अध्ययन (आस पास)' },
      { id: 'Language', name: 'Language (भाषा व साहित्य)', hindiName: 'भाषा व साहित्य' }
    ],
    defaultSubject: 'Mathematics',
    topics: {
      'Mathematics': [
        'समान समूहों का योग व गुणा (Repeated Addition & Multiplication)',
        'पहाड़ों का निर्माण: 2, 3, 4, 5 (Multiplication Tables)',
        '3-अंकीय संख्याओं का जोड़ व घटाव (3-Digit Operations)',
        'समय, दिन और कैलेंडर की समझ (Time & Calendar)'
      ],
      'EVS': [
        'पेड़-पौधे हमारे मित्र (Plants Around Us: Roots & Leaves)',
        'जल के स्थानीय स्रोत और संरक्षण (Water Conservation in Village)',
        'पशु-पक्षियों के आवास और भोजन (Animals & Habitats)',
        'गाँव का हाट-बाज़ार और सामुदायिक सेवक (Community Helpers)'
      ],
      'Language': [
        'मातृभाषा व हिंदी लोक कथाएं (Bilingual Folktales)',
        'पर्यावरण व प्रकृति पर कविताएं (Nature Poems)',
        'संज्ञा और सर्वनाम की पहचान (Grammar Basics)'
      ]
    }
  },
  4: {
    grade: 4,
    stageName: 'Preparatory Stage',
    stageHindi: 'तैयारी चरण (कक्षा 4)',
    subjects: [
      { id: 'Mathematics', name: 'Mathematics (गणित)', hindiName: 'गणित' },
      { id: 'EVS', name: 'EVS (पर्यावरण अध्ययन - आस पास)', hindiName: 'पर्यावरण अध्ययन (आस पास)' },
      { id: 'Language', name: 'Language (भाषा व साहित्य)', hindiName: 'भाषा व साहित्य' }
    ],
    defaultSubject: 'Mathematics',
    topics: {
      'Mathematics': [
        'हिस्सा और भिन्न की बुनियादी समझ (Fractions & Equal Parts)',
        'आधा (1/2), एक चौथाई (1/4) और तीन चौथाई (3/4) (Fraction Comparisons)',
        'लंबाई, वजन और धारिता का मापन (Measurement Units: kg, L, m)',
        'ज्यामितीय आकृतियों का परिमाप (Perimeter of Shapes)'
      ],
      'EVS': [
        'झारखंड की प्रकृति, जंगल व वन्यजीव (Forests of Jharkhand)',
        'जल चक्र और वर्षा (Water Cycle & Rain in Chota Nagpur)',
        'पारंपरिक खेती और फसल चक्र (Traditional Farming)',
        'स्वच्छता, रोग और प्राथमिक उपचार (Hygiene & Health)'
      ],
      'Language': [
        'बिरसा मुंडा और झारखंड के वीर (Tribal Heroes of Jharkhand)',
        'अनुच्छेद लेखन और पत्र लेखन (Paragraph Writing)',
        'मुहावरे और लोकोक्तियाँ (Idioms & Proverbs)'
      ]
    }
  },
  5: {
    grade: 5,
    stageName: 'Preparatory Stage',
    stageHindi: 'तैयारी चरण (कक्षा 5)',
    subjects: [
      { id: 'Mathematics', name: 'Mathematics (गणित)', hindiName: 'गणित' },
      { id: 'EVS', name: 'EVS (पर्यावरण अध्ययन - आस पास)', hindiName: 'पर्यावरण अध्ययन (आस पास)' },
      { id: 'Language', name: 'Language (भाषा व साहित्य)', hindiName: 'भाषा व साहित्य' }
    ],
    defaultSubject: 'Mathematics',
    topics: {
      'Mathematics': [
        'दशमलव और भिन्न का पारस्परिक रूपांतरण (Decimals & Fractions)',
        'क्षेत्रफल और आयतन की समझ (Area & Volume Basics)',
        'ऐकिक नियम और दैनिक हिसाब (Unitary Method)',
        'आंकड़ों का संकलन व पिक्टोग्राफ (Data Handling)'
      ],
      'EVS': [
        'बीजों का बिखराव और अंकुरण (Seed Dispersal & Germination)',
        'प्राकृतिक आपदाएं और उनसे बचाव (Disaster Preparedness)',
        'ऊर्जा के स्रोत: सौर ऊर्जा व जल ऊर्जा (Renewable Energy)',
        'हमारी ऐतिहासिक धरोहर व स्मारक (Cultural Heritage)'
      ],
      'Language': [
        'संवाद लेखन और नाटक मंचन (Dialogue & Drama)',
        'गद्यांश पठन और समझ (Reading Comprehension)',
        'पर्यायवाची और विलोम शब्द (Synonyms & Antonyms)'
      ]
    }
  },

  // MIDDLE STAGE (कक्षा 6 - 8)
  // NEP 2020: Mathematics, Science, Social Science, Language
  6: {
    grade: 6,
    stageName: 'Middle Stage',
    stageHindi: 'मध्य चरण (कक्षा 6)',
    subjects: [
      { id: 'Mathematics', name: 'Mathematics (गणित)', hindiName: 'गणित' },
      { id: 'Science', name: 'Science (विज्ञान)', hindiName: 'विज्ञान' },
      { id: 'Social Science', name: 'Social Science (सामाजिक विज्ञान)', hindiName: 'सामाजिक विज्ञान' },
      { id: 'Language', name: 'Language (भाषा)', hindiName: 'भाषा' }
    ],
    defaultSubject: 'Mathematics',
    topics: {
      'Mathematics': [
        'पूर्णांक और संख्या रेखा (Integers & Number Line)',
        'भिन्न और दशमलव संक्रियाएँ (Fraction & Decimal Operations)',
        'बीजगणित का परिचय (Introduction to Algebra)',
        'अनुपात और समानुपात (Ratio & Proportion)'
      ],
      'Science': [
        'भोजन के घटक और संतुलित आहार (Nutrients & Balanced Diet)',
        'पदार्थों का पृथक्करण (Separation of Substances)',
        'सजीवों की विशेषताएं और पर्यावास (Living Organisms & Habitats)',
        'प्रकाश, छाया और परावर्तन (Light & Shadows)'
      ],
      'Social Science': [
        'सौरमंडल में पृथ्वी (Earth in Solar System)',
        'आरंभिक मानव और पाषाण काल (Early Humans & Rock Art in Jharkhand)',
        'ग्रामीण और शहरी प्रशासन (Panchayat & Rural Governance)'
      ],
      'Language': [
        'व्याकरण: कारक व समास (Grammar)',
        'निबंध लेखन: पर्यावरण संरक्षण (Essay Writing)'
      ]
    }
  },
  7: {
    grade: 7,
    stageName: 'Middle Stage',
    stageHindi: 'मध्य चरण (कक्षा 7)',
    subjects: [
      { id: 'Mathematics', name: 'Mathematics (गणित)', hindiName: 'गणित' },
      { id: 'Science', name: 'Science (विज्ञान)', hindiName: 'विज्ञान' },
      { id: 'Social Science', name: 'Social Science (सामाजिक विज्ञान)', hindiName: 'सामाजिक विज्ञान' },
      { id: 'Language', name: 'Language (भाषा)', hindiName: 'भाषा' }
    ],
    defaultSubject: 'Mathematics',
    topics: {
      'Mathematics': [
        'परिमेय संख्याएँ (Rational Numbers)',
        'सरल समीकरण (Simple Equations)',
        'रेखाएं और कोण (Lines & Angles)',
        'त्रिभुज और उसके गुण (Triangles & Properties)'
      ],
      'Science': [
        'पादपों में पोषण और प्रकाश संश्लेषण (Nutrition in Plants)',
        'ऊष्मा और तापमान (Heat & Temperature)',
        'अम्ल, क्षारक और लवण (Acids, Bases & Salts)',
        'मौसम, जलवायु तथा अनुकूलन (Weather & Climate)'
      ],
      'Social Science': [
        'पर्यावरण के घटक (Environment & Biosphere)',
        'मध्यकालीन भारत और झारखंड के राजवंश (Regional History of Jharkhand)',
        'समानता और लोकतंत्र (Equality in Indian Democracy)'
      ],
      'Language': [
        'साहित्यिक विश्लेषण और व्याख्या (Literary Criticism)',
        'औपचारिक पत्र और आवेदन (Formal Letters)'
      ]
    }
  },
  8: {
    grade: 8,
    stageName: 'Middle Stage',
    stageHindi: 'मध्य चरण (कक्षा 8)',
    subjects: [
      { id: 'Mathematics', name: 'Mathematics (गणित)', hindiName: 'गणित' },
      { id: 'Science', name: 'Science (विज्ञान)', hindiName: 'विज्ञान' },
      { id: 'Social Science', name: 'Social Science (सामाजिक विज्ञान)', hindiName: 'सामाजिक विज्ञान' },
      { id: 'Language', name: 'Language (भाषा)', hindiName: 'भाषा' }
    ],
    defaultSubject: 'Mathematics',
    topics: {
      'Mathematics': [
        'एक चर वाले रैखिक समीकरण (Linear Equations)',
        'चतुर्भुजों को समझना (Understanding Quadrilaterals)',
        'वर्ग और वर्गमूल (Square & Square Roots)',
        'घातांक और घात (Exponents & Powers)'
      ],
      'Science': [
        'कोशिका: संरचना एवं प्रकार्य (Cell Structure & Functions)',
        'फसल उत्पादन एवं प्रबंध (Crop Production & Management)',
        'सूक्ष्मजीव: मित्र एवं शत्रु (Microorganisms)',
        'बल तथा दाब (Force & Pressure)'
      ],
      'Social Science': [
        'संसाधन एवं विकास: भूमि, मृदा, जल (Resources & Soil)',
        'भारतीय संविधान एवं धर्मनिरपेक्षता (Constitution of India)',
        'आदिवासी, दिकू और स्वर्ण युग की कल्पना (Tribal Movement in Jharkhand)'
      ],
      'Language': [
        'आदिवासी साहित्य और मौखिक परंपराएं (Indigenous Oral Traditions)',
        'संवाद और वाद-विवाद (Debate & Elocution)'
      ]
    }
  },

  // SECONDARY STAGE (कक्षा 9 - 10)
  9: {
    grade: 9,
    stageName: 'Secondary Stage',
    stageHindi: 'माध्यमिक चरण (कक्षा 9)',
    subjects: [
      { id: 'Mathematics', name: 'Mathematics (गणित)', hindiName: 'गणित' },
      { id: 'Science', name: 'Science (विज्ञान)', hindiName: 'विज्ञान' },
      { id: 'Social Science', name: 'Social Science (सामाजिक विज्ञान)', hindiName: 'सामाजिक विज्ञान' },
      { id: 'Hindi', name: 'Hindi (हिन्दी साहित्य)', hindiName: 'हिन्दी' },
      { id: 'English', name: 'English (English Literature)', hindiName: 'English' }
    ],
    defaultSubject: 'Mathematics',
    topics: {
      'Mathematics': [
        'संख्या पद्धति (Number Systems)',
        'बहुपद (Polynomials)',
        'निर्देशांक ज्यामिति (Coordinate Geometry)',
        'दो चरों वाले रैखिक समीकरण (Linear Equations in Two Variables)'
      ],
      'Science': [
        'हमारे आस-पास के पदार्थ (Matter in Surroundings)',
        'जीवन की मौलिक इकाई (Fundamental Unit of Life)',
        'गति एवं बल के नियम (Motion & Laws of Force)',
        'कार्य तथा ऊर्जा (Work & Energy)'
      ],
      'Social Science': [
        'भारत: आकार और स्थिति (India: Size & Location)',
        'लोकतंत्र क्या? लोकतंत्र क्यों? (What is Democracy?)',
        'पालमपुर गाँव की कहानी (Economics: Village Economy)'
      ],
      'Hindi': [
        'कबीर की साखियाँ व पद',
        'दो बैलों की कथा (प्रेमचंद)'
      ],
      'English': [
        'The Fun They Had',
        'The Sound of Music'
      ]
    }
  },
  10: {
    grade: 10,
    stageName: 'Secondary Stage',
    stageHindi: 'माध्यमिक चरण (कक्षा 10)',
    subjects: [
      { id: 'Mathematics', name: 'Mathematics (गणित)', hindiName: 'गणित' },
      { id: 'Science', name: 'Science (विज्ञान)', hindiName: 'विज्ञान' },
      { id: 'Social Science', name: 'Social Science (सामाजिक विज्ञान)', hindiName: 'सामाजिक विज्ञान' },
      { id: 'Hindi', name: 'Hindi (हिन्दी साहित्य)', hindiName: 'हिन्दी' },
      { id: 'English', name: 'English (English Literature)', hindiName: 'English' }
    ],
    defaultSubject: 'Mathematics',
    topics: {
      'Mathematics': [
        'वास्तविक संख्याएँ (Real Numbers)',
        'द्विघात समीकरण (Quadratic Equations)',
        'त्रिकोणमिति का परिचय (Introduction to Trigonometry)',
        'सांख्यिकी एवं प्रायिकता (Statistics & Probability)'
      ],
      'Science': [
        'रासायनिक अभिक्रियाएं एवं समीकरण (Chemical Reactions)',
        'जैव प्रक्रम: पोषण, श्वसन, उत्सर्जन (Life Processes)',
        'प्रकाश: परावर्तन तथा अपवर्तन (Light: Reflection & Refraction)',
        'विद्युत एवं धारा के चुंबकीय प्रभाव (Electricity & Magnetism)'
      ],
      'Social Science': [
        'भारत में राष्ट्रवाद (Nationalism in India)',
        'संसाधन एवं विकास (Resources & Development)',
        'राजनीतिक दल एवं लोकतंत्र की चुनौतियाँ (Political Parties)'
      ],
      'Hindi': [
        'नेताजी का चश्मा',
        'सूरदास के पद'
      ],
      'English': [
        'A Letter to God',
        'Nelson Mandela: Long Walk to Freedom'
      ]
    }
  }
};

// Helper: Get available subjects for a specific grade
export const getAvailableSubjectsForGrade = (grade: number): SubjectOption[] => {
  const g = CURRICULUM_DATA[grade] || CURRICULUM_DATA[4];
  return g.subjects;
};

// Helper: Check if a subject is permitted for this grade under NEP 2020
export const isSubjectAllowedForGrade = (grade: number, subjectId: string): boolean => {
  const subjects = getAvailableSubjectsForGrade(grade);
  const normalized = subjectId.toLowerCase();
  return subjects.some(s => s.id.toLowerCase() === normalized);
};

// Helper: Get fallback subject if current subject is invalid for the new grade
export const getDefaultSubjectForGrade = (grade: number): string => {
  const g = CURRICULUM_DATA[grade] || CURRICULUM_DATA[4];
  return g.defaultSubject;
};

// Helper: Get topics for a given grade and subject
export const getTopicsForGradeAndSubject = (grade: number, subject: string): string[] => {
  const g = CURRICULUM_DATA[grade] || CURRICULUM_DATA[4];
  
  // Find matching subject key
  const match = Object.keys(g.topics).find(key => key.toLowerCase() === subject.toLowerCase());
  if (match && g.topics[match]) {
    return g.topics[match];
  }
  
  // Fallback to first available subject's topics
  const firstKey = Object.keys(g.topics)[0];
  return g.topics[firstKey] || ['मूल अवधारणा (Core Concepts)'];
};

// Helper: Get default topic
export const getDefaultTopicForGradeAndSubject = (grade: number, subject: string): string => {
  const topics = getTopicsForGradeAndSubject(grade, subject);
  return topics[0] || 'मूल अवधारणा (Core Concepts)';
};
