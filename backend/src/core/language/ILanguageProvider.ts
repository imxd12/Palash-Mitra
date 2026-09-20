export interface LanguageTerm {
  id?: string;
  hindi: string;
  targetScript: string;   // e.g. Ol Chiki for Santhali
  targetLatin: string;    // Romanized transliteration
  phoneticIpa?: string;
  meaningHindi?: string;
  subject?: string;
  grade?: number;
  category?: 'MATHEMATICS' | 'SCIENCE' | 'EVS' | 'CLASSROOM' | 'GENERAL' | 'LITERACY';
  audioRef?: string;
  verificationStatus: 'AI_GENERATED' | 'TEACHER_REVIEWED' | 'LANGUAGE_EXPERT_VERIFIED' | 'OFFICIALLY_APPROVED';
}

export interface TranslationResult {
  sourceText: string;
  sourceLang: string;
  targetLang: string;
  translatedText: string;         // Native script (e.g. Ol Chiki)
  transliterationLatin?: string; // Latin script for teachers who can't read Ol Chiki
  confidence: number;            // 0.0 to 1.0 honest score
  confidenceLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  source: 'VERIFIED_MEMORY' | 'RULE_BASED' | 'CLOUD_AI' | 'LOCAL_AI' | 'TEMPLATE_FALLBACK';
  warnings?: string[];
  reviewRequired: boolean;
  matchedTerms?: LanguageTerm[];
  measuredLatencyMs?: number;
}

export interface ILanguageProvider {
  readonly code: string;
  readonly nameEnglish: string;
  readonly nameNative: string;
  readonly nativeScript: string;
  readonly isLowResource: boolean;
  readonly supportedVoices: string[];
  
  getTerm(hindiWord: string): LanguageTerm | null;
  getAllTerms(category?: string, grade?: number): LanguageTerm[];
  translateTerm(hindiText: string): TranslationResult;
  toNativeScript(latinOrDevanagari: string): string;
  toLatinScript(nativeScript: string): string;
}
