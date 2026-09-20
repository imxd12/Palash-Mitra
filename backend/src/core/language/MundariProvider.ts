import { ILanguageProvider, LanguageTerm, TranslationResult } from './ILanguageProvider';

export class MundariProvider implements ILanguageProvider {
  public readonly code = 'unr';
  public readonly nameEnglish = 'Mundari';
  public readonly nameNative = 'ᱢᱩᱱᱰᱟᱨᱤ / मुंडारी';
  public readonly nativeScript = 'Mundari Bani / Latin';
  public readonly isLowResource = true;
  public readonly supportedVoices = ['hi-IN'];

  private termsMap: Map<string, LanguageTerm> = new Map();

  constructor() {
    this.seedTerms();
  }

  private seedTerms() {
    const terms: LanguageTerm[] = [
      // Classroom & Greetings
      {
        hindi: 'नमस्ते',
        targetScript: 'ᱡᱚᱦᱟᱨ',
        targetLatin: 'Johar',
        phoneticIpa: '/dʒo.har/',
        meaningHindi: 'पारंपरिक मुंडारी अभिवादन',
        category: 'CLASSROOM',
        verificationStatus: 'OFFICIALLY_APPROVED'
      },
      {
        hindi: 'जोहार',
        targetScript: 'ᱡᱚᱦᱟᱨ',
        targetLatin: 'Johar',
        phoneticIpa: '/dʒo.har/',
        meaningHindi: 'अभिवादन',
        category: 'CLASSROOM',
        verificationStatus: 'OFFICIALLY_APPROVED'
      },
      {
        hindi: 'किताब खोलो',
        targetScript: 'ᱯᱩᱛᱷᱤ ᱯᱷᱟᱸᱫᱟᱭ ᱯᱮ',
        targetLatin: 'Puthi phanday pe',
        phoneticIpa: '/pu.tʰi pʰan.daj pe/',
        meaningHindi: 'किताब खोलने का निर्देश',
        category: 'CLASSROOM',
        verificationStatus: 'OFFICIALLY_APPROVED'
      },
      {
        hindi: 'बैठ जाओ',
        targetScript: 'ᱫᱩᱵᱩᱲ ᱯᱮ',
        targetLatin: 'Dubuṛ pe',
        phoneticIpa: '/du.buɽ pe/',
        meaningHindi: 'बैठने का निर्देश',
        category: 'CLASSROOM',
        verificationStatus: 'OFFICIALLY_APPROVED'
      },
      {
        hindi: 'शाबाश',
        targetScript: 'ᱟᱹᱰᱤ ᱵᱮᱥ',
        targetLatin: 'Aḍi bes',
        phoneticIpa: '/a.ɽi bes/',
        meaningHindi: 'बहुत अच्छा',
        category: 'CLASSROOM',
        verificationStatus: 'OFFICIALLY_APPROVED'
      },
      {
        hindi: 'बच्चों, आज हम भिन्न सीखेंगे',
        targetScript: 'ᱦᱚᱱ ᱠᱚ, ᱛᱤᱥᱤᱝ ᱫᱚ ᱵᱩ ᱦᱟᱹᱴᱤᱧ ᱵᱩ ᱪᱮᱫ-ᱟ᱾',
        targetLatin: 'Hon ko, tisiñ do bu hatiñ bu ced-a.',
        phoneticIpa: '/hon ko ti.siɲ do bu ha.tiɲ bu ced.a/',
        meaningHindi: 'कक्षा 4 मुंडारी पाठ परिचय',
        category: 'MATHEMATICS',
        grade: 4,
        verificationStatus: 'OFFICIALLY_APPROVED'
      },

      // Mathematics
      {
        hindi: 'भिन्न',
        targetScript: 'ᱦᱟᱹᱴᱤᱧ',
        targetLatin: 'Hatiñ',
        phoneticIpa: '/ha.tiɲ/',
        meaningHindi: 'भाग या हिस्सा',
        category: 'MATHEMATICS',
        grade: 4,
        verificationStatus: 'OFFICIALLY_APPROVED'
      },
      {
        hindi: 'अंश',
        targetScript: 'ᱪᱮᱛᱟᱱ ᱦᱟᱹᱴᱤᱧ',
        targetLatin: 'Cetan hatiñ',
        phoneticIpa: '/ce.tan ha.tiɲ/',
        meaningHindi: 'ऊपर का भाग',
        category: 'MATHEMATICS',
        grade: 4,
        verificationStatus: 'OFFICIALLY_APPROVED'
      },
      {
        hindi: 'हर',
        targetScript: 'ᱞᱟᱛᱟᱨ ᱦᱟᱹᱴᱤᱧ',
        targetLatin: 'Latar hatiñ',
        phoneticIpa: '/la.tar ha.tiɲ/',
        meaningHindi: 'नीचे का भाग',
        category: 'MATHEMATICS',
        grade: 4,
        verificationStatus: 'OFFICIALLY_APPROVED'
      },
      {
        hindi: 'आधा',
        targetScript: 'ᱛᱟᱞᱟ',
        targetLatin: 'Tala',
        phoneticIpa: '/ta.la/',
        meaningHindi: 'आधा हिस्सा',
        category: 'MATHEMATICS',
        grade: 4,
        verificationStatus: 'OFFICIALLY_APPROVED'
      },
      {
        hindi: 'जोड़',
        targetScript: 'ᱢᱮᱥᱟ',
        targetLatin: 'Mesa',
        phoneticIpa: '/me.sa/',
        meaningHindi: 'जोड़ना',
        category: 'MATHEMATICS',
        grade: 1,
        verificationStatus: 'OFFICIALLY_APPROVED'
      },
      {
        hindi: 'घटाव',
        targetScript: 'ᱜᱮᱫ / ᱚᱰᱚᱠ',
        targetLatin: 'Ged / Odok',
        phoneticIpa: '/ged/',
        meaningHindi: 'घटाना',
        category: 'MATHEMATICS',
        grade: 1,
        verificationStatus: 'OFFICIALLY_APPROVED'
      },

      // Science & Nature
      {
        hindi: 'पानी',
        targetScript: 'ᱫᱟᱜ',
        targetLatin: 'Daah',
        phoneticIpa: '/daːh/',
        meaningHindi: 'जल',
        category: 'EVS',
        grade: 2,
        verificationStatus: 'OFFICIALLY_APPROVED'
      },
      {
        hindi: 'पेड़',
        targetScript: 'ᱫᱟᱨᱩ',
        targetLatin: 'Daru',
        phoneticIpa: '/da.ru/',
        meaningHindi: 'पेड़ / वृक्ष',
        category: 'SCIENCE',
        grade: 3,
        verificationStatus: 'OFFICIALLY_APPROVED'
      },
      {
        hindi: 'पौधा',
        targetScript: 'ᱫᱟᱨᱩ',
        targetLatin: 'Daru',
        phoneticIpa: '/da.ru/',
        meaningHindi: 'पौधा',
        category: 'SCIENCE',
        grade: 3,
        verificationStatus: 'OFFICIALLY_APPROVED'
      },
      {
        hindi: 'पत्ता',
        targetScript: 'ᱥᱟᱠᱟᱢ',
        targetLatin: 'Sakam',
        phoneticIpa: '/sa.kam/',
        meaningHindi: 'पत्ता',
        category: 'SCIENCE',
        grade: 3,
        verificationStatus: 'OFFICIALLY_APPROVED'
      },
      {
        hindi: 'जड़',
        targetScript: 'ᱨᱮᱦᱮᱫ',
        targetLatin: 'Rehed',
        phoneticIpa: '/re.hed/',
        meaningHindi: 'जड़',
        category: 'SCIENCE',
        grade: 3,
        verificationStatus: 'OFFICIALLY_APPROVED'
      },
      {
        hindi: 'फूल',
        targetScript: 'ᱵᱟᱦᱟ',
        targetLatin: 'Baha',
        phoneticIpa: '/ba.ha/',
        meaningHindi: 'फूल',
        category: 'SCIENCE',
        grade: 3,
        verificationStatus: 'OFFICIALLY_APPROVED'
      }
    ];

    terms.forEach(t => this.termsMap.set(t.hindi.trim().toLowerCase(), t));
  }

  public getTerm(hindiWord: string): LanguageTerm | null {
    return this.termsMap.get(hindiWord.trim().toLowerCase()) || null;
  }

  public getAllTerms(): LanguageTerm[] {
    return Array.from(this.termsMap.values());
  }

  public translateTerm(hindiText: string): TranslationResult {
    const clean = hindiText.trim();
    const match = this.getTerm(clean);

    if (match) {
      return {
        sourceText: hindiText,
        sourceLang: 'hi',
        targetLang: 'unr',
        translatedText: match.targetScript,
        transliterationLatin: match.targetLatin,
        confidence: 0.98,
        confidenceLevel: 'HIGH',
        source: 'VERIFIED_MEMORY',
        reviewRequired: false
      };
    }

    const words = clean.split(/\s+/);
    const translatedTokens: string[] = [];
    const latinTokens: string[] = [];
    let matchCount = 0;

    for (const w of words) {
      const sanitized = w.replace(/[।,?!]/g, '');
      const m = this.getTerm(sanitized);
      if (m) {
        translatedTokens.push(m.targetScript);
        latinTokens.push(m.targetLatin);
        matchCount++;
      } else {
        translatedTokens.push(w);
        latinTokens.push(w);
      }
    }

    const confidence = words.length > 0 ? (matchCount / words.length) * 0.85 + 0.1 : 0.4;
    return {
      sourceText: hindiText,
      sourceLang: 'hi',
      targetLang: 'unr',
      translatedText: translatedTokens.join(' ') + '᱾',
      transliterationLatin: latinTokens.join(' '),
      confidence: Number(confidence.toFixed(2)),
      confidenceLevel: confidence >= 0.8 ? 'HIGH' : confidence >= 0.5 ? 'MEDIUM' : 'LOW',
      source: matchCount > 0 ? 'RULE_BASED' : 'TEMPLATE_FALLBACK',
      reviewRequired: confidence < 0.8
    };
  }

  public toNativeScript(text: string): string {
    return text;
  }

  public toLatinScript(text: string): string {
    return text;
  }
}
