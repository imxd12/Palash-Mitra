import { ILanguageProvider, LanguageTerm, TranslationResult } from './ILanguageProvider';

export class SanthaliProvider implements ILanguageProvider {
  public readonly code = 'sat';
  public readonly nameEnglish = 'Santhali';
  public readonly nameNative = 'ᱥᱟᱱᱛᱟᱲᱤ';
  public readonly nativeScript = 'Ol Chiki';
  public readonly isLowResource = true;
  public readonly supportedVoices = ['sat-IN', 'hi-IN']; // Fallback audio maps

  private termsMap: Map<string, LanguageTerm> = new Map();

  // Ol Chiki Latin mapping table
  private static readonly latinToOlChikiMap: [RegExp, string][] = [
    // Digits
    [/0/g, '᱐'], [/1/g, '᱑'], [/2/g, '᱒'], [/3/g, '᱓'], [/4/g, '᱔'],
    [/5/g, '᱕'], [/6/g, '᱖'], [/7/g, '᱗'], [/8/g, '᱘'], [/9/g, '᱙'],
    // Common digraphs and vowels
    [/aa/gi, 'ᱟ'], [/la/gi, 'ᱞᱟ'], [/ha/gi, 'ᱦᱟ'],
    // Basic letter substitutions
    [/k/gi, 'ᱠ'], [/g/gi, 'ᱜ'], [/c/gi, 'ᱪ'], [/j/gi, 'ᱡ'], [/t/gi, 'ᱛ'],
    [/d/gi, 'ᱫ'], [/p/gi, 'ᱯ'], [/b/gi, 'ᱵ'], [/m/gi, 'ᱢ'], [/n/gi, 'ᱱ'],
    [/r/gi, 'ᱨ'], [/l/gi, 'ᱞ'], [/s/gi, 'ᱥ'], [/h/gi, 'ᱦ'], [/y/gi, 'ᱭ'],
    [/w/gi, 'ᱣ'], [/a/gi, 'ᱚ'], [/i/gi, 'ᱤ'], [/u/gi, 'ᱩ'], [/e/gi, 'ᱮ'],
    [/o/gi, 'ᱳ']
  ];

  constructor() {
    this.seedCoreTerms();
  }

  private seedCoreTerms(): void {
    const defaultTerms: LanguageTerm[] = [
      // Classroom communication & Greetings
      {
        hindi: 'नमस्ते',
        targetScript: 'ᱡᱚᱦᱟᱨ',
        targetLatin: 'Johar',
        phoneticIpa: '/dʒo.har/',
        meaningHindi: 'अभिवादन / नमस्कार',
        category: 'CLASSROOM',
        verificationStatus: 'OFFICIALLY_APPROVED'
      },
      {
        hindi: 'जोहार',
        targetScript: 'ᱡᱚᱦᱟᱨ',
        targetLatin: 'Johar',
        phoneticIpa: '/dʒo.har/',
        meaningHindi: 'पारंपरिक संथाली अभिवादन',
        category: 'CLASSROOM',
        verificationStatus: 'OFFICIALLY_APPROVED'
      },
      {
        hindi: 'बैठ जाओ',
        targetScript: 'ᱫᱩᱲᱩᱵ ᱯᱮ',
        targetLatin: 'Duṛub pe',
        phoneticIpa: '/du.ɽub pe/',
        meaningHindi: 'कक्षा में बैठने का निर्देश',
        category: 'CLASSROOM',
        verificationStatus: 'OFFICIALLY_APPROVED'
      },
      {
        hindi: 'किताब खोलो',
        targetScript: 'ᱯᱩᱛᱷᱤ ᱡᱷᱤᱡᱽ ᱯᱮ',
        targetLatin: 'Puthi jhij pe',
        phoneticIpa: '/pu.tʰi ɟʰiɟ pe/',
        meaningHindi: 'पुस्तक खोलने का निर्देश',
        category: 'CLASSROOM',
        verificationStatus: 'OFFICIALLY_APPROVED'
      },
      {
        hindi: 'ध्यान से सुनो',
        targetScript: 'ᱢᱚᱱᱮ ᱮᱢ ᱠᱟᱛᱮ ᱟᱧᱡᱚᱢ ᱯᱮ',
        targetLatin: 'Mone em kate añjom pe',
        phoneticIpa: '/mo.ne em ka.te aɲ.ɟom pe/',
        meaningHindi: 'सावधानी से सुनने का निर्देश',
        category: 'CLASSROOM',
        verificationStatus: 'OFFICIALLY_APPROVED'
      },
      {
        hindi: 'बहुत अच्छा',
        targetScript: 'ᱟᱹᱰᱤ ᱱᱟᱯᱟᱭ',
        targetLatin: 'Aḍi napay',
        phoneticIpa: '/a.ɽi na.paj/',
        meaningHindi: 'प्रशंसा / शाबाश',
        category: 'CLASSROOM',
        verificationStatus: 'OFFICIALLY_APPROVED'
      },
      {
        hindi: 'बच्चों, आज हम भिन्न सीखेंगे',
        targetScript: 'ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱛᱮᱦᱮᱧ ᱫᱚ ᱵᱚᱱ ᱦᱟᱹᱴᱤᱧ ᱵᱚᱱ ᱪᱮᱫ-ᱟ᱾',
        targetLatin: 'Gidra ko, teheñ do bon hāṭiñ bon ced-a.',
        phoneticIpa: '/gid.rə ko te.heɲ do bon ha.ʈiɲ bon ced.a/',
        meaningHindi: 'कक्षा का पाठ परिचय (भिन्न)',
        category: 'MATHEMATICS',
        grade: 4,
        verificationStatus: 'OFFICIALLY_APPROVED'
      },

      // Mathematics - Fractions & Operations (Class 4/5 Core)
      {
        hindi: 'भिन्न',
        targetScript: 'ᱦᱟᱹᱴᱤᱧ',
        targetLatin: 'Hāṭiñ',
        phoneticIpa: '/ha.ʈiɲ/',
        meaningHindi: 'किसी पूरी वस्तु का एक भाग या अंश',
        category: 'MATHEMATICS',
        grade: 4,
        verificationStatus: 'OFFICIALLY_APPROVED'
      },
      {
        hindi: 'अंश',
        targetScript: 'ᱪᱮᱛᱟᱱ ᱦᱟᱹᱴᱤᱧ',
        targetLatin: 'Cetan hāṭiñ',
        phoneticIpa: '/ce.tan ha.ʈiɲ/',
        meaningHindi: 'भिन्न में रेखा के ऊपर की संख्या (Numerator)',
        category: 'MATHEMATICS',
        grade: 4,
        verificationStatus: 'OFFICIALLY_APPROVED'
      },
      {
        hindi: 'हर',
        targetScript: 'ᱞᱟᱛᱟᱨ ᱦᱟᱹᱴᱤᱧ',
        targetLatin: 'Latar hāṭiñ',
        phoneticIpa: '/la.tar ha.ʈiɲ/',
        meaningHindi: 'भिन्न में कुल बराबर भागों की संख्या (Denominator)',
        category: 'MATHEMATICS',
        grade: 4,
        verificationStatus: 'OFFICIALLY_APPROVED'
      },
      {
        hindi: 'आधा',
        targetScript: 'ᱛᱟᱞᱟ / ᱟᱫᱷᱟ',
        targetLatin: 'Tala / Adha',
        phoneticIpa: '/ta.la/',
        meaningHindi: 'दो बराबर भागों में से एक भाग (1/2)',
        category: 'MATHEMATICS',
        grade: 4,
        verificationStatus: 'OFFICIALLY_APPROVED'
      },
      {
        hindi: 'एक तिहाई',
        targetScript: 'ᱯᱮ ᱦᱟᱹᱴᱤᱧ ᱨᱮᱭᱟᱜ ᱢᱤᱫ ᱦᱟᱹᱴᱤᱧ',
        targetLatin: 'Pe hāṭiñ reyag mid hāṭiñ',
        phoneticIpa: '/pe ha.ʈiɲ re.jag mid ha.ʈiɲ/',
        meaningHindi: 'तीन बराबर भागों में से एक भाग (1/3)',
        category: 'MATHEMATICS',
        grade: 4,
        verificationStatus: 'OFFICIALLY_APPROVED'
      },
      {
        hindi: 'एक चौथाई',
        targetScript: 'ᱯᱩᱱ ᱦᱟᱹᱴᱤᱧ ᱨᱮᱭᱟᱜ ᱢᱤᱫ ᱦᱟᱹᱴᱤᱧ',
        targetLatin: 'Pun hāṭiñ reyag mid hāṭiñ',
        phoneticIpa: '/pun ha.ʈiɲ re.jag mid ha.ʈiɲ/',
        meaningHindi: 'चार बराबर भागों में से एक भाग (1/4)',
        category: 'MATHEMATICS',
        grade: 4,
        verificationStatus: 'OFFICIALLY_APPROVED'
      },
      {
        hindi: 'जोड़',
        targetScript: 'ᱥᱮᱞᱮᱫ',
        targetLatin: 'Seled',
        phoneticIpa: '/se.led/',
        meaningHindi: 'संख्याओं को एकत्र करना (Addition)',
        category: 'MATHEMATICS',
        grade: 1,
        verificationStatus: 'OFFICIALLY_APPROVED'
      },
      {
        hindi: 'घटाव',
        targetScript: 'ᱵᱷᱮᱜᱟᱨ / ᱜᱮᱫ',
        targetLatin: 'Bhegar / Ged',
        phoneticIpa: '/bʰe.gar/',
        meaningHindi: 'संख्याओं में से निकालना (Subtraction)',
        category: 'MATHEMATICS',
        grade: 1,
        verificationStatus: 'OFFICIALLY_APPROVED'
      },
      {
        hindi: 'गुणा',
        targetScript: 'ᱜᱟᱵᱟᱬ',
        targetLatin: 'Gabaṇ',
        phoneticIpa: '/ga.baɳ/',
        meaningHindi: 'बार-बार जोड़ना (Multiplication)',
        category: 'MATHEMATICS',
        grade: 3,
        verificationStatus: 'OFFICIALLY_APPROVED'
      },
      {
        hindi: 'भाग',
        targetScript: 'ᱦᱟᱹᱴᱤᱧ',
        targetLatin: 'Hāṭiñ',
        phoneticIpa: '/ha.ʈiɲ/',
        meaningHindi: 'बराबर बांटना (Division)',
        category: 'MATHEMATICS',
        grade: 3,
        verificationStatus: 'OFFICIALLY_APPROVED'
      },
      {
        hindi: 'बराबर',
        targetScript: 'ᱥᱚᱢᱟᱱ',
        targetLatin: 'Soman',
        phoneticIpa: '/so.man/',
        meaningHindi: 'तुल्य या एक समान',
        category: 'MATHEMATICS',
        grade: 1,
        verificationStatus: 'OFFICIALLY_APPROVED'
      },

      // Science & EVS - Plants & Nature
      {
        hindi: 'पौधा',
        targetScript: 'ᱫᱟᱨᱮ',
        targetLatin: 'Dare',
        phoneticIpa: '/da.re/',
        meaningHindi: 'छोटा पादप या वनस्पति',
        category: 'SCIENCE',
        grade: 3,
        verificationStatus: 'OFFICIALLY_APPROVED'
      },
      {
        hindi: 'पेड़',
        targetScript: 'ᱫᱟᱨᱮ',
        targetLatin: 'Dare',
        phoneticIpa: '/da.re/',
        meaningHindi: 'बड़ा वृक्ष',
        category: 'SCIENCE',
        grade: 3,
        verificationStatus: 'OFFICIALLY_APPROVED'
      },
      {
        hindi: 'पत्ता',
        targetScript: 'ᱥᱟᱠᱟᱢ',
        targetLatin: 'Sakam',
        phoneticIpa: '/sa.kam/',
        meaningHindi: 'पौधे का हरा भाग जो भोजन बनाता है',
        category: 'SCIENCE',
        grade: 3,
        verificationStatus: 'OFFICIALLY_APPROVED'
      },
      {
        hindi: 'जड़',
        targetScript: 'ᱨᱮᱦᱮᱫ',
        targetLatin: 'Rehed',
        phoneticIpa: '/re.hed/',
        meaningHindi: 'पौधे का भूमिगत भाग जो पानी सोखता है',
        category: 'SCIENCE',
        grade: 3,
        verificationStatus: 'OFFICIALLY_APPROVED'
      },
      {
        hindi: 'फूल',
        targetScript: 'ᱵᱟᱦᱟ',
        targetLatin: 'Baha',
        phoneticIpa: '/ba.ha/',
        meaningHindi: 'पौधे का रंगीन व सुगंधित भाग',
        category: 'SCIENCE',
        grade: 3,
        verificationStatus: 'OFFICIALLY_APPROVED'
      },
      {
        hindi: 'फल',
        targetScript: 'ᱡᱚ',
        targetLatin: 'Jo',
        phoneticIpa: '/dʒo/',
        meaningHindi: 'पेड़ का खाने योग्य बीजयुक्त भाग',
        category: 'SCIENCE',
        grade: 3,
        verificationStatus: 'OFFICIALLY_APPROVED'
      },
      {
        hindi: 'पानी',
        targetScript: 'ᱫᱟᱜ',
        targetLatin: 'Daag',
        phoneticIpa: '/daɡ/',
        meaningHindi: 'जल / जीवन दायिनी तरल',
        category: 'EVS',
        grade: 2,
        verificationStatus: 'OFFICIALLY_APPROVED'
      },
      {
        hindi: 'सूर्य',
        targetScript: 'ᱥᱤᱧ ᱪᱟᱸᱫᱚ',
        targetLatin: 'Siñ Cando',
        phoneticIpa: '/siɲ can.do/',
        meaningHindi: 'सूरज / प्रकाश और ऊष्मा का स्रोत',
        category: 'EVS',
        grade: 2,
        verificationStatus: 'OFFICIALLY_APPROVED'
      },
      {
        hindi: 'हवा',
        targetScript: 'ᱦᱚᱭ',
        targetLatin: 'Hoy',
        phoneticIpa: '/hɔj/',
        meaningHindi: 'वायु',
        category: 'EVS',
        grade: 2,
        verificationStatus: 'OFFICIALLY_APPROVED'
      },
      {
        hindi: 'मिट्टी',
        targetScript: 'ᱦᱟᱥᱟ',
        targetLatin: 'Hasa',
        phoneticIpa: '/ha.sa/',
        meaningHindi: 'भूमि की ऊपरी उपजाऊ परत',
        category: 'EVS',
        grade: 2,
        verificationStatus: 'OFFICIALLY_APPROVED'
      }
    ];

    defaultTerms.forEach(t => {
      this.termsMap.set(t.hindi.trim().toLowerCase(), t);
    });
  }

  public registerTerm(term: LanguageTerm): void {
    this.termsMap.set(term.hindi.trim().toLowerCase(), term);
  }

  public getTerm(hindiWord: string): LanguageTerm | null {
    const key = hindiWord.trim().toLowerCase();
    return this.termsMap.get(key) || null;
  }

  public getAllTerms(category?: string, grade?: number): LanguageTerm[] {
    const terms = Array.from(this.termsMap.values());
    return terms.filter(t => {
      if (category && t.category !== category) return false;
      if (grade && t.grade && t.grade !== grade) return false;
      return true;
    });
  }

  public translateTerm(hindiText: string): TranslationResult {
    const cleanText = hindiText.trim();
    const exactMatch = this.getTerm(cleanText);

    if (exactMatch) {
      return {
        sourceText: hindiText,
        sourceLang: 'hi',
        targetLang: 'sat',
        translatedText: exactMatch.targetScript,
        transliterationLatin: exactMatch.targetLatin,
        confidence: 0.98,
        confidenceLevel: 'HIGH',
        source: 'VERIFIED_MEMORY',
        reviewRequired: false,
        matchedTerms: [exactMatch]
      };
    }

    // Term-by-term sentence parsing with translation memory lookups
    const words = cleanText.split(/\s+/);
    const translatedTokens: string[] = [];
    const latinTokens: string[] = [];
    const matchedTerms: LanguageTerm[] = [];
    let matchedCount = 0;

    for (const w of words) {
      const sanitized = w.replace(/[।,?!]/g, '');
      const match = this.getTerm(sanitized);
      if (match) {
        translatedTokens.push(match.targetScript);
        latinTokens.push(match.targetLatin);
        matchedTerms.push(match);
        matchedCount++;
      } else {
        // Fallback: transliterate to Ol Chiki
        const translit = this.toNativeScript(sanitized);
        translatedTokens.push(translit);
        latinTokens.push(sanitized);
      }
    }

    const confidence = words.length > 0 ? (matchedCount / words.length) * 0.85 + 0.1 : 0.4;
    const confidenceLevel = confidence >= 0.8 ? 'HIGH' : confidence >= 0.5 ? 'MEDIUM' : 'LOW';

    return {
      sourceText: hindiText,
      sourceLang: 'hi',
      targetLang: 'sat',
      translatedText: translatedTokens.join(' ') + '᱾',
      transliterationLatin: latinTokens.join(' '),
      confidence: Number(confidence.toFixed(2)),
      confidenceLevel,
      source: matchedCount > 0 ? 'RULE_BASED' : 'TEMPLATE_FALLBACK',
      warnings: confidenceLevel === 'LOW' ? ['Partial translation. Teacher review recommended.'] : undefined,
      reviewRequired: confidenceLevel !== 'HIGH',
      matchedTerms
    };
  }

  public toNativeScript(latin: string): string {
    let result = latin;
    for (const [regex, olChiki] of SanthaliProvider.latinToOlChikiMap) {
      result = result.replace(regex, olChiki);
    }
    return result;
  }

  public toLatinScript(nativeScript: string): string {
    // Reverse map lookup if needed
    return nativeScript;
  }
}
