// Advanced Vector Stroke Coordinates & Multi-Segment Directional Metadata for Indigenous Scripts
// Supports Santhali Ol Chiki, Ho Warang Chiti & Tribal Phonetics

export interface StrokeSegment {
  strokeIndex: number;
  nameHi: string;
  points: Array<{ x: number; y: number }>; // Normalized 0-100 coordinates
  directionArrow?: { start: { x: number; y: number }; end: { x: number; y: number } };
}

export interface LetterGlyph {
  id: string;
  char: string;
  name: string;
  script: string;
  language: string;
  phoneticSound: string;
  strokeHint: string;
  culturalMeaningHi: string;
  guidePoints: Array<{ x: number; y: number }>; // Normalized 0-100 coordinates for flat matching
  strokes: StrokeSegment[]; // Multi-stroke sequence for precision tracing
}

export const INDIGENOUS_GLYPHS: LetterGlyph[] = [
  {
    id: 'ol_ot',
    char: 'ᱛ',
    name: 'At / Ot (अत्)',
    script: 'Ol Chiki (ᱚᱞ ᱪᱤᱠᱤ)',
    language: 'Santhali',
    phoneticSound: 'ot',
    strokeHint: 'स्ट्रोक १: ऊपर से नीचे बायाँ वक्र; स्ट्रोक २: बीच से क्षैतिज रेखा',
    culturalMeaningHi: 'पृथ्वी या भूमि (Ot Haso) से प्रेरित ध्वनि।',
    guidePoints: [
      { x: 30, y: 25 },
      { x: 50, y: 20 },
      { x: 70, y: 35 },
      { x: 65, y: 65 },
      { x: 45, y: 78 },
      { x: 30, y: 60 },
      { x: 25, y: 45 },
      { x: 75, y: 45 }
    ],
    strokes: [
      {
        strokeIndex: 1,
        nameHi: 'बाहरी लूप वक्र (Top to Bottom Loop)',
        points: [
          { x: 35, y: 25 },
          { x: 55, y: 20 },
          { x: 70, y: 35 },
          { x: 65, y: 65 },
          { x: 45, y: 78 },
          { x: 28, y: 60 },
          { x: 25, y: 45 }
        ],
        directionArrow: { start: { x: 35, y: 25 }, end: { x: 55, y: 20 } }
      },
      {
        strokeIndex: 2,
        nameHi: 'मध्य सेतु रेखा (Crossbar)',
        points: [
          { x: 25, y: 45 },
          { x: 50, y: 45 },
          { x: 75, y: 45 }
        ],
        directionArrow: { start: { x: 25, y: 45 }, end: { x: 75, y: 45 } }
      }
    ]
  },
  {
    id: 'ol_la',
    char: 'ᱚ',
    name: 'La / Ol (अ / ओल)',
    script: 'Ol Chiki (ᱚᱞ ᱪᱤᱠᱤ)',
    language: 'Santhali',
    phoneticSound: 'ol',
    strokeHint: 'स्ट्रोक १: ऊपर से शुरू करके दक्षिणावर्त पूर्ण अंडाकार वृत्त बनाएं',
    culturalMeaningHi: 'लिखने की क्रिया (Ol) तथा खुली आंख की आकृति से प्रेरित।',
    guidePoints: [
      { x: 50, y: 20 },
      { x: 30, y: 35 },
      { x: 25, y: 55 },
      { x: 35, y: 75 },
      { x: 55, y: 80 },
      { x: 75, y: 65 },
      { x: 75, y: 40 },
      { x: 55, y: 20 }
    ],
    strokes: [
      {
        strokeIndex: 1,
        nameHi: 'पूर्ण अंडाकार वृत्त (Clockwise Oval)',
        points: [
          { x: 50, y: 20 },
          { x: 30, y: 35 },
          { x: 25, y: 55 },
          { x: 35, y: 75 },
          { x: 55, y: 80 },
          { x: 75, y: 65 },
          { x: 75, y: 40 },
          { x: 50, y: 20 }
        ],
        directionArrow: { start: { x: 50, y: 20 }, end: { x: 30, y: 35 } }
      }
    ]
  },
  {
    id: 'ol_ag',
    char: 'ᱜ',
    name: 'Ag (अग्)',
    script: 'Ol Chiki (ᱚᱞ ᱪᱤᱠᱤ)',
    language: 'Santhali',
    phoneticSound: 'ag',
    strokeHint: 'स्ट्रोक १: ऊपर से खड़ी रेखा नीचे; स्ट्रोक २: नीचे से दायाँ झुकाव',
    culturalMeaningHi: 'अनाज ओसाने वाले सूप (Hataq) की आकृति से प्रेरित।',
    guidePoints: [
      { x: 35, y: 20 },
      { x: 35, y: 55 },
      { x: 35, y: 80 },
      { x: 55, y: 80 },
      { x: 70, y: 65 },
      { x: 70, y: 40 }
    ],
    strokes: [
      {
        strokeIndex: 1,
        nameHi: 'ऊर्ध्वाधर आधार रेखा (Vertical Stem)',
        points: [
          { x: 35, y: 20 },
          { x: 35, y: 55 },
          { x: 35, y: 80 }
        ],
        directionArrow: { start: { x: 35, y: 20 }, end: { x: 35, y: 80 } }
      },
      {
        strokeIndex: 2,
        nameHi: 'निचला दक्षिणावर्त हुक (Bottom Loop)',
        points: [
          { x: 35, y: 80 },
          { x: 55, y: 80 },
          { x: 70, y: 65 },
          { x: 70, y: 40 }
        ],
        directionArrow: { start: { x: 35, y: 80 }, end: { x: 70, y: 40 } }
      }
    ]
  },
  {
    id: 'ol_ang',
    char: 'ᱝ',
    name: 'Ang (अंग्)',
    script: 'Ol Chiki (ᱚᱞ ᱪᱤᱠᱤ)',
    language: 'Santhali',
    phoneticSound: 'ang',
    strokeHint: 'स्ट्रोक १: ऊपरी आयताकार लूप; स्ट्रोक २: दाईं ओर तिरछी पूँछ रेखा',
    culturalMeaningHi: 'हवा में उड़ते पक्षी की छवि व नासिका ध्वनि।',
    guidePoints: [
      { x: 40, y: 25 },
      { x: 60, y: 25 },
      { x: 60, y: 50 },
      { x: 40, y: 50 },
      { x: 40, y: 25 },
      { x: 50, y: 55 },
      { x: 68, y: 80 }
    ],
    strokes: [
      {
        strokeIndex: 1,
        nameHi: 'ऊपरी लूप (Upper Loop)',
        points: [
          { x: 40, y: 25 },
          { x: 60, y: 25 },
          { x: 60, y: 50 },
          { x: 40, y: 50 },
          { x: 40, y: 25 }
        ],
        directionArrow: { start: { x: 40, y: 25 }, end: { x: 60, y: 25 } }
      },
      {
        strokeIndex: 2,
        nameHi: 'तिरछी पाद रेखा (Diagonal Tail)',
        points: [
          { x: 50, y: 50 },
          { x: 58, y: 65 },
          { x: 68, y: 80 }
        ],
        directionArrow: { start: { x: 50, y: 50 }, end: { x: 68, y: 80 } }
      }
    ]
  },
  {
    id: 'ol_al',
    char: 'ᱞ',
    name: 'Al (अल्)',
    script: 'Ol Chiki (ᱚᱞ ᱪᱤᱠᱤ)',
    language: 'Santhali',
    phoneticSound: 'al',
    strokeHint: 'स्ट्रोक १: ऊपर से नीचे झुकी रेखा; स्ट्रोक २: नीचे अर्धवृत्त वक्र',
    culturalMeaningHi: 'हल (Nahel) की नोक की आकृति से विकसित अक्षर।',
    guidePoints: [
      { x: 40, y: 20 },
      { x: 40, y: 60 },
      { x: 50, y: 78 },
      { x: 65, y: 78 },
      { x: 75, y: 60 },
      { x: 75, y: 40 }
    ],
    strokes: [
      {
        strokeIndex: 1,
        nameHi: 'खड़ी रेखा व निचला घुमाव (Stem & Hook)',
        points: [
          { x: 40, y: 20 },
          { x: 40, y: 60 },
          { x: 50, y: 78 },
          { x: 65, y: 78 },
          { x: 75, y: 60 },
          { x: 75, y: 40 }
        ],
        directionArrow: { start: { x: 40, y: 20 }, end: { x: 40, y: 60 } }
      }
    ]
  },
  {
    id: 'ol_aa',
    char: 'ᱟ',
    name: 'Aak (आक्)',
    script: 'Ol Chiki (ᱚᱞ ᱪᱤᱠᱤ)',
    language: 'Santhali',
    phoneticSound: 'aa',
    strokeHint: 'स्ट्रोक १: बायाँ अर्धवृत्त; स्ट्रोक २: दाईं ओर खड़ी रेखा',
    culturalMeaningHi: 'पहाड़ और खुले आकाश की गूँज।',
    guidePoints: [
      { x: 30, y: 30 },
      { x: 45, y: 20 },
      { x: 55, y: 35 },
      { x: 45, y: 50 },
      { x: 30, y: 40 },
      { x: 70, y: 20 },
      { x: 70, y: 80 }
    ],
    strokes: [
      {
        strokeIndex: 1,
        nameHi: 'बायाँ घुमावदार चाप (Left Arch)',
        points: [
          { x: 30, y: 35 },
          { x: 45, y: 20 },
          { x: 55, y: 35 },
          { x: 45, y: 50 },
          { x: 30, y: 45 }
        ],
        directionArrow: { start: { x: 30, y: 35 }, end: { x: 45, y: 20 } }
      },
      {
        strokeIndex: 2,
        nameHi: 'दाईं खड़ी डंडी (Right Pillar)',
        points: [
          { x: 70, y: 20 },
          { x: 70, y: 50 },
          { x: 70, y: 80 }
        ],
        directionArrow: { start: { x: 70, y: 20 }, end: { x: 70, y: 80 } }
      }
    ]
  },
  {
    id: 'ol_ak',
    char: 'ᱠ',
    name: 'Ak (अक्)',
    script: 'Ol Chiki (ᱚᱞ ᱪᱤᱠᱤ)',
    language: 'Santhali',
    phoneticSound: 'ak',
    strokeHint: 'स्ट्रोक १: मध्य खड़ी रेखा; स्ट्रोक २: बायाँ वक्र; स्ट्रोक ३: दायाँ वक्र',
    culturalMeaningHi: 'हंसिया (Kapi) और कृषि उपकरण की ध्वनि।',
    guidePoints: [
      { x: 50, y: 15 },
      { x: 50, y: 85 },
      { x: 30, y: 35 },
      { x: 48, y: 45 },
      { x: 70, y: 55 },
      { x: 70, y: 75 }
    ],
    strokes: [
      {
        strokeIndex: 1,
        nameHi: 'मध्य दंड (Vertical Spine)',
        points: [
          { x: 50, y: 15 },
          { x: 50, y: 50 },
          { x: 50, y: 85 }
        ],
        directionArrow: { start: { x: 50, y: 15 }, end: { x: 50, y: 85 } }
      },
      {
        strokeIndex: 2,
        nameHi: 'बायाँ पंख वक्र (Left Wing)',
        points: [
          { x: 30, y: 35 },
          { x: 40, y: 30 },
          { x: 50, y: 45 }
        ],
        directionArrow: { start: { x: 30, y: 35 }, end: { x: 50, y: 45 } }
      },
      {
        strokeIndex: 3,
        nameHi: 'दायाँ निचला वक्र (Right Flange)',
        points: [
          { x: 50, y: 45 },
          { x: 68, y: 55 },
          { x: 70, y: 75 }
        ],
        directionArrow: { start: { x: 50, y: 45 }, end: { x: 70, y: 75 } }
      }
    ]
  },
  {
    id: 'ho_var',
    char: '𑢹',
    name: 'Warang Chiti - H (हो)',
    script: 'Warang Chiti (𑢹𑣉)',
    language: 'Ho',
    phoneticSound: 'ho',
    strokeHint: 'स्ट्रोक १: बायीं खड़ी रेखा; स्ट्रोक २: दाईं खड़ी रेखा; स्ट्रोक ३: मध्य सेतु',
    culturalMeaningHi: 'लाको बोदरा द्वारा पुनर्जीवित हो जनजाति की पवित्र लिपि।',
    guidePoints: [
      { x: 30, y: 20 },
      { x: 30, y: 80 },
      { x: 30, y: 50 },
      { x: 70, y: 50 },
      { x: 70, y: 20 },
      { x: 70, y: 80 }
    ],
    strokes: [
      {
        strokeIndex: 1,
        nameHi: 'बायीं खड़ी रेखा (Left Post)',
        points: [
          { x: 30, y: 20 },
          { x: 30, y: 50 },
          { x: 30, y: 80 }
        ],
        directionArrow: { start: { x: 30, y: 20 }, end: { x: 30, y: 80 } }
      },
      {
        strokeIndex: 2,
        nameHi: 'मध्य क्षैतिज रेखा (Bridge)',
        points: [
          { x: 30, y: 50 },
          { x: 50, y: 50 },
          { x: 70, y: 50 }
        ],
        directionArrow: { start: { x: 30, y: 50 }, end: { x: 70, y: 50 } }
      },
      {
        strokeIndex: 3,
        nameHi: 'दाईं खड़ी रेखा (Right Post)',
        points: [
          { x: 70, y: 20 },
          { x: 70, y: 50 },
          { x: 70, y: 80 }
        ],
        directionArrow: { start: { x: 70, y: 20 }, end: { x: 70, y: 80 } }
      }
    ]
  },
  {
    id: 'ho_o',
    char: '𑣉',
    name: 'Warang Chiti - O (ओ)',
    script: 'Warang Chiti (𑢹𑣉)',
    language: 'Ho',
    phoneticSound: 'oo',
    strokeHint: 'स्ट्रोक १: मध्य गोल वृत्त; स्ट्रोक २: दाईं ओर बिंदु चिह्न',
    culturalMeaningHi: 'पूर्ण सूर्य और प्रकृति के चक्र का प्रतीक।',
    guidePoints: [
      { x: 48, y: 25 },
      { x: 28, y: 50 },
      { x: 48, y: 75 },
      { x: 68, y: 50 },
      { x: 48, y: 25 },
      { x: 78, y: 50 }
    ],
    strokes: [
      {
        strokeIndex: 1,
        nameHi: 'मध्य चक्र (Center Circle)',
        points: [
          { x: 48, y: 25 },
          { x: 28, y: 50 },
          { x: 48, y: 75 },
          { x: 68, y: 50 },
          { x: 48, y: 25 }
        ],
        directionArrow: { start: { x: 48, y: 25 }, end: { x: 28, y: 50 } }
      },
      {
        strokeIndex: 2,
        nameHi: 'दाईं बिंदु रेखा (Side Accent)',
        points: [
          { x: 74, y: 48 },
          { x: 80, y: 50 }
        ],
        directionArrow: { start: { x: 74, y: 48 }, end: { x: 80, y: 50 } }
      }
    ]
  },
  {
    id: 'ho_ong',
    char: '𑣗',
    name: 'Warang Chiti - Ang (अंग)',
    script: 'Warang Chiti (𑢹𑣉)',
    language: 'Ho',
    phoneticSound: 'ang',
    strokeHint: 'स्ट्रोक १: ऊपरी तिरछी रेखा; स्ट्रोक २: नीचे की ओर त्रिकोण पाद',
    culturalMeaningHi: 'पर्वत शिखर की अनुगूंज।',
    guidePoints: [
      { x: 50, y: 20 },
      { x: 30, y: 75 },
      { x: 70, y: 75 },
      { x: 50, y: 20 }
    ],
    strokes: [
      {
        strokeIndex: 1,
        nameHi: 'त्रिकोण आकृति (Triangular Glyph)',
        points: [
          { x: 50, y: 20 },
          { x: 30, y: 75 },
          { x: 70, y: 75 },
          { x: 50, y: 20 }
        ],
        directionArrow: { start: { x: 50, y: 20 }, end: { x: 30, y: 75 } }
      }
    ]
  },
  {
    id: 'dev_aa',
    char: 'अ',
    name: 'स्वर - अ (Devanagari A)',
    script: 'Devanagari (देवनागरी)',
    language: 'Mundari / Hindi',
    phoneticSound: 'a',
    strokeHint: 'स्ट्रोक १: ऊपरी वक्र; स्ट्रोक २: निचला वक्र; स्ट्रोक ३: मध्य सेतु; स्ट्रोक ४: खड़ी रेखा; स्ट्रोक ५: शिरोरेखा',
    culturalMeaningHi: 'मुंडारी एवं क्षेत्रीय भाषाओं की बुनियादी स्वर ध्वनि।',
    guidePoints: [
      { x: 30, y: 30 },
      { x: 48, y: 30 },
      { x: 38, y: 45 },
      { x: 52, y: 65 },
      { x: 30, y: 70 },
      { x: 40, y: 48 },
      { x: 65, y: 48 },
      { x: 65, y: 20 },
      { x: 65, y: 80 },
      { x: 55, y: 20 },
      { x: 75, y: 20 }
    ],
    strokes: [
      {
        strokeIndex: 1,
        nameHi: 'ऊपरी वक्र (Upper Arch)',
        points: [
          { x: 30, y: 30 },
          { x: 48, y: 25 },
          { x: 40, y: 48 }
        ],
        directionArrow: { start: { x: 30, y: 30 }, end: { x: 48, y: 25 } }
      },
      {
        strokeIndex: 2,
        nameHi: 'निचला वक्र (Lower Arch)',
        points: [
          { x: 40, y: 48 },
          { x: 52, y: 65 },
          { x: 30, y: 75 }
        ],
        directionArrow: { start: { x: 40, y: 48 }, end: { x: 52, y: 65 } }
      },
      {
        strokeIndex: 3,
        nameHi: 'मध्य सेतु रेखा (Center Bridge)',
        points: [
          { x: 40, y: 48 },
          { x: 65, y: 48 }
        ],
        directionArrow: { start: { x: 40, y: 48 }, end: { x: 65, y: 48 } }
      },
      {
        strokeIndex: 4,
        nameHi: 'खड़ी पाई (Vertical Spine)',
        points: [
          { x: 65, y: 20 },
          { x: 65, y: 80 }
        ],
        directionArrow: { start: { x: 65, y: 20 }, end: { x: 65, y: 80 } }
      },
      {
        strokeIndex: 5,
        nameHi: 'शिरोरेखा (Top Header Line)',
        points: [
          { x: 55, y: 20 },
          { x: 78, y: 20 }
        ],
        directionArrow: { start: { x: 55, y: 20 }, end: { x: 78, y: 20 } }
      }
    ]
  },
  {
    id: 'ol_ak',
    char: 'ᱠ',
    name: 'Ak (अक् - कुल्हाड़ी)',
    script: 'Ol Chiki (ᱚᱞ ᱪᱤᱠᱤ)',
    language: 'Santhali',
    phoneticSound: 'ak',
    strokeHint: 'स्ट्रोक १: खड़ी पाई; स्ट्रोक २: बायां त्रिकोण (कुल्हाड़ी की आकृति)',
    culturalMeaningHi: 'कुल्हाड़ी (Kapi / Ak) की आकृति से प्रेरित सशक्त ध्वनि।',
    guidePoints: [
      { x: 50, y: 20 },
      { x: 50, y: 80 },
      { x: 50, y: 40 },
      { x: 30, y: 30 },
      { x: 30, y: 50 },
      { x: 50, y: 40 }
    ],
    strokes: [
      {
        strokeIndex: 1,
        nameHi: 'मुख्य ऊर्ध्वाधर दंड (Main Stem)',
        points: [
          { x: 50, y: 20 },
          { x: 50, y: 80 }
        ],
        directionArrow: { start: { x: 50, y: 20 }, end: { x: 50, y: 80 } }
      },
      {
        strokeIndex: 2,
        nameHi: 'बायाँ त्रिकोणीय फलक (Blade Loop)',
        points: [
          { x: 50, y: 35 },
          { x: 28, y: 28 },
          { x: 28, y: 52 },
          { x: 50, y: 45 }
        ],
        directionArrow: { start: { x: 50, y: 35 }, end: { x: 28, y: 28 } }
      }
    ]
  },
  {
    id: 'ol_aj',
    char: 'ᱡ',
    name: 'Aj (अज् - पक्षी उड़ान)',
    script: 'Ol Chiki (ᱚᱞ ᱪᱤᱠᱤ)',
    language: 'Santhali',
    phoneticSound: 'aj',
    strokeHint: 'स्ट्रोक १: ऊपर से नीचे सर्पिलाकार वक्र; स्ट्रोक २: निचला घुमाव',
    culturalMeaningHi: 'आकाश में उड़ते पंछी (Cere) के पंखों की गति से प्रेरित।',
    guidePoints: [
      { x: 30, y: 25 },
      { x: 60, y: 25 },
      { x: 45, y: 50 },
      { x: 65, y: 70 },
      { x: 35, y: 75 }
    ],
    strokes: [
      {
        strokeIndex: 1,
        nameHi: 'ऊपरी विंग वक्र (Upper Wing Arch)',
        points: [
          { x: 30, y: 28 },
          { x: 60, y: 25 },
          { x: 45, y: 50 }
        ],
        directionArrow: { start: { x: 30, y: 28 }, end: { x: 60, y: 25 } }
      },
      {
        strokeIndex: 2,
        nameHi: 'निचली पूँछ वक्र (Lower Tail Swirl)',
        points: [
          { x: 45, y: 50 },
          { x: 68, y: 68 },
          { x: 35, y: 75 }
        ],
        directionArrow: { start: { x: 45, y: 50 }, end: { x: 68, y: 68 } }
      }
    ]
  },
  {
    id: 'ol_am',
    char: 'ᱢ',
    name: 'Am (अम् - चेहरा/मुख)',
    script: 'Ol Chiki (ᱚᱞ ᱪᱤᱠᱤ)',
    language: 'Santhali',
    phoneticSound: 'am',
    strokeHint: 'स्ट्रोक १: पूर्ण गोल चेहरा वृत्त; स्ट्रोक २: दाहिना विस्तार',
    culturalMeaningHi: 'मानव मुख (Med / Muh) व आत्म-पहचान का प्रतीक।',
    guidePoints: [
      { x: 40, y: 30 },
      { x: 60, y: 30 },
      { x: 60, y: 60 },
      { x: 40, y: 60 },
      { x: 40, y: 30 },
      { x: 60, y: 60 },
      { x: 75, y: 75 }
    ],
    strokes: [
      {
        strokeIndex: 1,
        nameHi: 'मुख वृत्त (Face Circle)',
        points: [
          { x: 45, y: 30 },
          { x: 62, y: 30 },
          { x: 62, y: 58 },
          { x: 38, y: 58 },
          { x: 38, y: 30 },
          { x: 45, y: 30 }
        ],
        directionArrow: { start: { x: 45, y: 30 }, end: { x: 62, y: 30 } }
      },
      {
        strokeIndex: 2,
        nameHi: 'दाहिनी ओर प्रक्षेप (Exit Stroke)',
        points: [
          { x: 62, y: 58 },
          { x: 75, y: 75 }
        ],
        directionArrow: { start: { x: 62, y: 58 }, end: { x: 75, y: 75 } }
      }
    ]
  },
  {
    id: 'ho_singi',
    char: '𑣝',
    name: 'Singi (वारंग चिति - सूर्य)',
    script: 'Warang Chiti (𑢹𑣉)',
    language: 'Ho',
    phoneticSound: 'singi',
    strokeHint: 'स्ट्रोक १: केंद्रीय ऊर्जा चक्र; स्ट्रोक २: किरण दंड',
    culturalMeaningHi: 'हो संस्कृति के सर्वोच्च प्रतीक सिंगबोंगा (सूर्य देव) की आकृति।',
    guidePoints: [
      { x: 50, y: 25 },
      { x: 35, y: 45 },
      { x: 50, y: 65 },
      { x: 65, y: 45 },
      { x: 50, y: 25 }
    ],
    strokes: [
      {
        strokeIndex: 1,
        nameHi: 'सौर चक्र (Solar Ring)',
        points: [
          { x: 50, y: 25 },
          { x: 32, y: 45 },
          { x: 50, y: 65 },
          { x: 68, y: 45 },
          { x: 50, y: 25 }
        ],
        directionArrow: { start: { x: 50, y: 25 }, end: { x: 32, y: 45 } }
      }
    ]
  },
  {
    id: 'dev_ka',
    char: 'क',
    name: 'Ka (क - कमल / कौवा)',
    script: 'Devanagari (देवनागरी)',
    language: 'Mundari / Kurukh / Hindi',
    phoneticSound: 'ka',
    strokeHint: 'स्ट्रोक १: खड़ी पाई; स्ट्रोक २: बायाँ लूप; स्ट्रोक ३: दायाँ हुक; स्ट्रोक ४: शिरोरेखा',
    culturalMeaningHi: 'कुड़ुख़ व मुंडारी वर्णमाला का पहला स्पर्श व्यंजन।',
    guidePoints: [
      { x: 50, y: 20 },
      { x: 50, y: 80 },
      { x: 30, y: 45 },
      { x: 50, y: 45 },
      { x: 70, y: 55 }
    ],
    strokes: [
      {
        strokeIndex: 1,
        nameHi: 'खड़ी पाई (Vertical Stem)',
        points: [
          { x: 50, y: 20 },
          { x: 50, y: 80 }
        ],
        directionArrow: { start: { x: 50, y: 20 }, end: { x: 50, y: 80 } }
      },
      {
        strokeIndex: 2,
        nameHi: 'बायाँ पूर्ण वृत्त (Left Loop)',
        points: [
          { x: 50, y: 35 },
          { x: 30, y: 42 },
          { x: 35, y: 58 },
          { x: 50, y: 52 }
        ],
        directionArrow: { start: { x: 50, y: 35 }, end: { x: 30, y: 42 } }
      },
      {
        strokeIndex: 3,
        nameHi: 'दायाँ खुला हुक (Right Hook)',
        points: [
          { x: 50, y: 45 },
          { x: 68, y: 45 },
          { x: 70, y: 65 }
        ],
        directionArrow: { start: { x: 50, y: 45 }, end: { x: 68, y: 45 } }
      },
      {
        strokeIndex: 4,
        nameHi: 'शिरोरेखा (Top Bar)',
        points: [
          { x: 25, y: 20 },
          { x: 75, y: 20 }
        ],
        directionArrow: { start: { x: 25, y: 20 }, end: { x: 75, y: 20 } }
      }
    ]
  }
];
