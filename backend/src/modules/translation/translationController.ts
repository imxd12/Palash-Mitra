import { Request, Response } from 'express';
import { db } from '../../core/database/db';
import { languageRegistry } from '../../core/language/LanguageRegistry';
import { TranslationResult } from '../../core/language/ILanguageProvider';

export class TranslationQualityEngine {
  public static validate(result: TranslationResult): {
    isValid: boolean;
    confidence: number;
    warnings: string[];
    reviewRequired: boolean;
  } {
    const warnings: string[] = [];
    let confidence = result.confidence;

    if (!result.translatedText || result.translatedText.trim().length === 0) {
      warnings.push('Translation is empty');
      return { isValid: false, confidence: 0, warnings, reviewRequired: true };
    }

    if (result.sourceLang !== result.targetLang && result.translatedText.trim() === result.sourceText.trim()) {
      warnings.push('Untranslated terms detected. Vocabulary match missing in database.');
      confidence = Math.min(confidence, 0.4);
    }

    const forbiddenPatterns = [/गाली/i, /badword/i];
    for (const p of forbiddenPatterns) {
      if (p.test(result.sourceText) || p.test(result.translatedText)) {
        warnings.push('Inappropriate content flag detected');
        return { isValid: false, confidence: 0, warnings, reviewRequired: true };
      }
    }

    return {
      isValid: true,
      confidence: Number(confidence.toFixed(2)),
      warnings,
      reviewRequired: confidence < 0.8 || warnings.length > 0
    };
  }
}

export const translateText = (req: Request, res: Response): void => {
  const { text, sourceLang = 'hi', targetLang = 'sat' } = req.body;

  if (!text || typeof text !== 'string') {
    res.status(400).json({ success: false, message: 'Text is required for translation' });
    return;
  }

  const startTime = performance.now();

  try {
    const cleanSource = text.trim();

    // Check L1: Verified Database Translation Memory first
    const verifiedDbTerm = db.findOne('language_terms', t => 
      t.language_code === targetLang && 
      t.term_hi.toLowerCase() === cleanSource.toLowerCase() &&
      (t.verification_status === 'OFFICIALLY_APPROVED' || t.verification_status === 'LANGUAGE_EXPERT_VERIFIED')
    );

    let result: TranslationResult;

    if (verifiedDbTerm && sourceLang === 'hi') {
      result = {
        sourceText: text,
        sourceLang,
        targetLang,
        translatedText: verifiedDbTerm.term_target_script,
        transliterationLatin: verifiedDbTerm.term_target_latin,
        confidence: 0.99,
        confidenceLevel: 'HIGH',
        source: 'VERIFIED_MEMORY',
        reviewRequired: false
      };
    } else {
      // 5-Language Cross-Translation Router
      result = languageRegistry.translateCrossLanguage(cleanSource, sourceLang, targetLang);
    }

    const elapsedMs = Math.round(performance.now() - startTime);
    result.measuredLatencyMs = elapsedMs;

    // Quality check & validation
    const quality = TranslationQualityEngine.validate(result);
    result.warnings = quality.warnings;
    result.confidence = quality.confidence;
    result.reviewRequired = quality.reviewRequired;

    // Save translation event to database
    db.insert('translations', {
      sourceText: text,
      sourceLang,
      targetLang,
      translatedText: result.translatedText,
      transliterationLatin: result.transliterationLatin,
      confidence: result.confidence,
      source: result.source,
      latencyMs: elapsedMs
    });

    res.json({
      success: true,
      result
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'Translation error occurred',
      error: err.message
    });
  }
};

export const getTranslationHistory = (_req: Request, res: Response): void => {
  const history = db.find('translations').slice(-30).reverse();
  res.json({ success: true, count: history.length, history });
};
