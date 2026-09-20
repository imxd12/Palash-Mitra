import { languageRegistry } from '../core/language/LanguageRegistry';
import { TranslationQualityEngine } from '../modules/translation/translationController';
import { SpeechService } from '../core/speech/SpeechService';
import { TemplateAndLocalAIProvider } from '../core/ai/AIService';
import { db } from '../core/database/db';
import { initialCurriculumSeed } from '../data/seedCurriculum';

async function runAllTests() {
  console.log('🧪 Starting PALASH MITRA Backend Unit & Integration Tests...\n');
  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string) {
    if (condition) {
      console.log(`  ✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${testName}`);
      failed++;
    }
  }

  // Test 1: Language Registry
  console.log('--- 1. Testing Pluggable Language Providers ---');
  const languages = languageRegistry.getSupportedLanguages();
  assert(languages.length >= 4, 'Supported languages count >= 4 (Hindi, Santhali, Ho, Mundari)');
  const satProvider = languageRegistry.getProvider('sat');
  assert(satProvider.nativeScript === 'Ol Chiki', 'Santhali provider uses authentic Ol Chiki script');

  // Test 2: Santhali Translation & Ol Chiki Script
  console.log('\n--- 2. Testing Ol Chiki Translation Memory ---');
  const fractionTrans = satProvider.translateTerm('भिन्न');
  assert(fractionTrans.translatedText === 'ᱦᱟᱹᱴᱤᱧ', 'Exact match for "भिन्न" -> "ᱦᱟᱹᱴᱤᱧ" (Ol Chiki)');
  assert(fractionTrans.transliterationLatin === 'Hāṭiñ', 'Transliteration Latin is "Hāṭiñ"');
  assert(fractionTrans.confidence >= 0.9, 'Confidence for verified term >= 0.90');

  // Test 3: Sentence Translation
  const sentenceTrans = satProvider.translateTerm('बच्चों, आज हम भिन्न सीखेंगे');
  assert(sentenceTrans.translatedText.includes('ᱦᱟᱹᱴᱤᱧ'), 'Classroom sentence translation contains Santhali Ol Chiki');

  // Test 4: Translation Quality Engine
  console.log('\n--- 3. Testing Translation Quality Engine ---');
  const validQuality = TranslationQualityEngine.validate(fractionTrans);
  assert(validQuality.isValid === true, 'Valid translation passes quality checks');
  assert(validQuality.reviewRequired === false, 'High confidence translation does not require manual review');

  // Test 5: Speech Latency Measurement
  console.log('\n--- 4. Testing Real-Time Voice Latency Measurement ---');
  const speechService = new SpeechService();
  const voiceRes = await speechService.processVoiceClassroom({
    transcriptText: 'नमस्ते',
    speaker: 'TEACHER',
    sourceLanguage: 'hi',
    targetLanguage: 'sat'
  });
  assert(voiceRes.latencyBreakdown.totalLatencyMs > 0, 'Total latency is recorded accurately in milliseconds');
  assert(voiceRes.latencyBreakdown.totalLatencyMs < 3000, 'Total latency is under 3000ms SLA target');
  assert(voiceRes.translatedText === 'ᱡᱚᱦᱟᱨ', 'Teacher greeting "नमस्ते" translated to "ᱡᱚᱦᱟᱨ"');

  // Test 6: AI Pedagogy & Smart Teach Pack Generator
  console.log('\n--- 5. Testing ✨ Smart Teach Engine ---');
  const aiProvider = new TemplateAndLocalAIProvider();
  const pack = await aiProvider.generateLessonPack({
    grade: 4,
    subject: 'Mathematics',
    topic: 'Fractions',
    targetLanguage: 'sat',
    localContext: 'VILLAGE'
  });
  assert(Boolean(pack.learningObjective.targetLang), 'Smart Teach generates bilingual learning objective');
  assert(pack.practiceQuestions.length >= 2, 'Smart Teach generates practice questions');
  assert(pack.flashcards.length >= 3, 'Smart Teach generates bilingual flashcards with phonetics');
  assert(pack.visualExplanation.steps.length >= 2, 'Smart Teach generates visual steps');

  // Test 7: Database Adapter & Curriculum Seeding
  console.log('\n--- 6. Testing Database & Curriculum Data ---');
  db.clear('curriculum');
  db.insertMany('curriculum', initialCurriculumSeed);
  const curCount = db.count('curriculum');
  assert(curCount === initialCurriculumSeed.length, `Seeded curriculum has ${curCount} items across Grades 1-10`);
  const grade4Cur = db.find('curriculum', c => c.grade === 4);
  assert(grade4Cur.length >= 2, 'Grade 4 has Mathematics and EVS curriculum items');

  console.log(`\n==================================================`);
  console.log(`Test Results: ${passed} Passed, ${failed} Failed`);
  console.log(`==================================================\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

runAllTests().catch(err => {
  console.error('Test execution error:', err);
  process.exit(1);
});
