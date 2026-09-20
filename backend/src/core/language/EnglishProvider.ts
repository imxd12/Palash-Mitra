import { ILanguageProvider, LanguageTerm, TranslationResult } from './ILanguageProvider';

export class EnglishProvider implements ILanguageProvider {
  public readonly code = 'en';
  public readonly nameEnglish = 'English';
  public readonly nameNative = 'English';
  public readonly nativeScript = 'Latin';
  public readonly isLowResource = false;
  public readonly supportedVoices = ['en-IN', 'en-US', 'en-GB'];

  private termsMap: Map<string, LanguageTerm> = new Map();

  constructor() {
    this.seedTerms();
  }

  private seedTerms() {
    const terms: LanguageTerm[] = [
      {
        hindi: 'नमस्ते',
        targetScript: 'Hello / Greetings',
        targetLatin: 'Hello',
        phoneticIpa: '/həˈloʊ/',
        meaningHindi: 'अभिवादन',
        category: 'CLASSROOM',
        verificationStatus: 'OFFICIALLY_APPROVED'
      },
      {
        hindi: 'भिन्न',
        targetScript: 'Fraction',
        targetLatin: 'Fraction',
        phoneticIpa: '/ˈfræk.ʃən/',
        meaningHindi: 'पूरी वस्तु का एक समान भाग',
        category: 'MATHEMATICS',
        grade: 4,
        verificationStatus: 'OFFICIALLY_APPROVED'
      },
      {
        hindi: 'अंश',
        targetScript: 'Numerator',
        targetLatin: 'Numerator',
        phoneticIpa: '/ˈnuː.mə.reɪ.tər/',
        meaningHindi: 'भिन्न में ऊपर की संख्या',
        category: 'MATHEMATICS',
        grade: 4,
        verificationStatus: 'OFFICIALLY_APPROVED'
      },
      {
        hindi: 'हर',
        targetScript: 'Denominator',
        targetLatin: 'Denominator',
        phoneticIpa: '/dɪˈnɒm.ɪ.neɪ.tər/',
        meaningHindi: 'भिन्न में नीचे की कुल संख्या',
        category: 'MATHEMATICS',
        grade: 4,
        verificationStatus: 'OFFICIALLY_APPROVED'
      },
      {
        hindi: 'आधा',
        targetScript: 'Half (1/2)',
        targetLatin: 'Half',
        phoneticIpa: '/hæf/',
        meaningHindi: 'दो बराबर भागों में से एक',
        category: 'MATHEMATICS',
        grade: 4,
        verificationStatus: 'OFFICIALLY_APPROVED'
      },
      {
        hindi: 'जोड़',
        targetScript: 'Addition',
        targetLatin: 'Addition',
        phoneticIpa: '/əˈdɪʃ.ən/',
        meaningHindi: 'संख्याओं को एकत्र करना',
        category: 'MATHEMATICS',
        grade: 1,
        verificationStatus: 'OFFICIALLY_APPROVED'
      },
      {
        hindi: 'घटाव',
        targetScript: 'Subtraction',
        targetLatin: 'Subtraction',
        phoneticIpa: '/səbˈtræk.ʃən/',
        meaningHindi: 'संख्याओं में से कम करना',
        category: 'MATHEMATICS',
        grade: 1,
        verificationStatus: 'OFFICIALLY_APPROVED'
      },
      {
        hindi: 'पौधा',
        targetScript: 'Plant',
        targetLatin: 'Plant',
        phoneticIpa: '/plænt/',
        meaningHindi: 'छोटा पादप',
        category: 'SCIENCE',
        grade: 3,
        verificationStatus: 'OFFICIALLY_APPROVED'
      },
      {
        hindi: 'पत्ता',
        targetScript: 'Leaf',
        targetLatin: 'Leaf',
        phoneticIpa: '/liːf/',
        meaningHindi: 'पौधे का हरा भाग',
        category: 'SCIENCE',
        grade: 3,
        verificationStatus: 'OFFICIALLY_APPROVED'
      },
      {
        hindi: 'जड़',
        targetScript: 'Root',
        targetLatin: 'Root',
        phoneticIpa: '/ruːt/',
        meaningHindi: 'पौधे का भूमिगत भाग',
        category: 'SCIENCE',
        grade: 3,
        verificationStatus: 'OFFICIALLY_APPROVED'
      },
      {
        hindi: 'पानी',
        targetScript: 'Water',
        targetLatin: 'Water',
        phoneticIpa: '/ˈwɔː.tər/',
        meaningHindi: 'जल',
        category: 'EVS',
        grade: 2,
        verificationStatus: 'OFFICIALLY_APPROVED'
      },
      {
        hindi: 'किताब खोलो',
        targetScript: 'Open your book',
        targetLatin: 'Open your book',
        phoneticIpa: '/ˈoʊ.pən jʊər bʊk/',
        meaningHindi: 'पुस्तक खोलने का निर्देश',
        category: 'CLASSROOM',
        verificationStatus: 'OFFICIALLY_APPROVED'
      },
      {
        hindi: 'बच्चों, आज हम भिन्न सीखेंगे',
        targetScript: 'Children, today we will learn fractions.',
        targetLatin: 'Children, today we will learn fractions.',
        phoneticIpa: '/ˈtʃɪl.drən təˈdeɪ wi wɪl lɜːrn ˈfræk.ʃənz/',
        meaningHindi: 'कक्षा का पाठ परिचय (भिन्न)',
        category: 'MATHEMATICS',
        grade: 4,
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
        targetLang: 'en',
        translatedText: match.targetScript,
        transliterationLatin: match.targetLatin,
        confidence: 0.99,
        confidenceLevel: 'HIGH',
        source: 'VERIFIED_MEMORY',
        reviewRequired: false
      };
    }

    return {
      sourceText: hindiText,
      sourceLang: 'hi',
      targetLang: 'en',
      translatedText: hindiText,
      transliterationLatin: hindiText,
      confidence: 0.65,
      confidenceLevel: 'MEDIUM',
      source: 'RULE_BASED',
      reviewRequired: false
    };
  }

  public toNativeScript(text: string): string {
    return text;
  }

  public toLatinScript(text: string): string {
    return text;
  }
}
