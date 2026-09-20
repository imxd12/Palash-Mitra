import { ILanguageProvider, TranslationResult } from './ILanguageProvider';
import { EnglishProvider } from './EnglishProvider';
import { HindiProvider } from './HindiProvider';
import { SanthaliProvider } from './SanthaliProvider';
import { HoProvider } from './HoProvider';
import { MundariProvider } from './MundariProvider';

export class LanguageRegistry {
  private static instance: LanguageRegistry;
  private providers: Map<string, ILanguageProvider> = new Map();

  private constructor() {
    this.register(new EnglishProvider());
    this.register(new HindiProvider());
    this.register(new SanthaliProvider());
    this.register(new HoProvider());
    this.register(new MundariProvider());
  }

  public static getInstance(): LanguageRegistry {
    if (!LanguageRegistry.instance) {
      LanguageRegistry.instance = new LanguageRegistry();
    }
    return LanguageRegistry.instance;
  }

  public register(provider: ILanguageProvider): void {
    this.providers.set(provider.code.toLowerCase(), provider);
  }

  public getProvider(code: string): ILanguageProvider {
    const p = this.providers.get(code.toLowerCase());
    if (!p) {
      const fallback = this.providers.get('sat');
      if (fallback) return fallback;
      throw new Error(`Language provider '${code}' not found in registry.`);
    }
    return p;
  }

  public getSupportedLanguages(): Array<{
    code: string;
    nameEnglish: string;
    nameNative: string;
    nativeScript: string;
    isLowResource: boolean;
  }> {
    return Array.from(this.providers.values()).map(p => ({
      code: p.code,
      nameEnglish: p.nameEnglish,
      nameNative: p.nameNative,
      nativeScript: p.nativeScript,
      isLowResource: p.isLowResource
    }));
  }

  // Cross-Language Bidirectional Translation Router (5 x 5 Matrix)
  public translateCrossLanguage(text: string, sourceLang: string, targetLang: string): TranslationResult {
    const src = sourceLang.toLowerCase();
    const tgt = targetLang.toLowerCase();

    if (src === tgt) {
      return {
        sourceText: text,
        sourceLang,
        targetLang,
        translatedText: text,
        transliterationLatin: text,
        confidence: 1.0,
        confidenceLevel: 'HIGH',
        source: 'VERIFIED_MEMORY',
        reviewRequired: false
      };
    }

    const cleanText = text.trim();

    // Direct path if source is Hindi
    if (src === 'hi') {
      const targetProvider = this.getProvider(tgt);
      return targetProvider.translateTerm(cleanText);
    }

    // Direct path if target is Hindi
    if (tgt === 'hi') {
      const sourceProvider = this.getProvider(src);
      // Search source provider terms to find Hindi equivalent
      const allTerms = sourceProvider.getAllTerms();
      const match = allTerms.find(t => 
        t.targetScript.toLowerCase() === cleanText.toLowerCase() ||
        t.targetLatin.toLowerCase() === cleanText.toLowerCase()
      );
      if (match) {
        return {
          sourceText: text,
          sourceLang,
          targetLang: 'hi',
          translatedText: match.hindi,
          transliterationLatin: match.hindi,
          confidence: 0.98,
          confidenceLevel: 'HIGH',
          source: 'VERIFIED_MEMORY',
          reviewRequired: false
        };
      }
    }

    // Pivot through Hindi / English
    // Step 1: Translate source -> Hindi
    let pivotHindi = cleanText;
    const sourceProvider = this.getProvider(src);
    const sourceMatch = sourceProvider.getAllTerms().find(t =>
      t.targetScript.toLowerCase() === cleanText.toLowerCase() ||
      t.targetLatin.toLowerCase() === cleanText.toLowerCase() ||
      t.hindi.toLowerCase() === cleanText.toLowerCase()
    );
    if (sourceMatch) {
      pivotHindi = sourceMatch.hindi;
    }

    // Step 2: Translate Hindi -> Target
    const targetProvider = this.getProvider(tgt);
    const targetResult = targetProvider.translateTerm(pivotHindi);

    return {
      ...targetResult,
      sourceText: text,
      sourceLang,
      targetLang
    };
  }
}

export const languageRegistry = LanguageRegistry.getInstance();
