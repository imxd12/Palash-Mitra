import { config } from '../../config';
import { db } from '../database/db';
import { languageRegistry } from '../language/LanguageRegistry';
import { resolveCurriculumTemplate } from './curriculumTemplates';

export interface EducationalPromptContext {
  grade: number;
  subject: string;
  topic: string;
  learningOutcome?: string;
  sourceLanguage?: string;
  targetLanguage?: string;
  difficulty?: 'EASY' | 'MEDIUM' | 'HARD' | 'CHALLENGE';
  localContext?: 'GENERIC' | 'VILLAGE' | 'AGRICULTURE' | 'FOREST' | 'SCHOOL';
  studentLevel?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  durationMinutes?: number;
}

export interface SmartTeachLessonPack {
  metadata: {
    grade: number;
    subject: string;
    topic: string;
    targetLanguage: string;
    generatedAt: string;
    provider: string;
    isOfflineGenerated: boolean;
  };
  learningObjective: {
    hindi: string;
    targetLang: string;
  };
  prerequisites: string[];
  introduction: {
    hindi: string;
    targetLang: string;
  };
  teacherExplanation: {
    originalHindi: string;
    simplerHindi: string;
    targetLangScript: string;
    targetLangLatin: string;
  };
  localExample: {
    contextType: string;
    descriptionHindi: string;
    descriptionTargetLang: string;
  };
  classroomActivity: {
    title: string;
    instructionsHindi: string;
    instructionsTargetLang: string;
    materialsNeeded: string[];
  };
  visualExplanation: {
    diagramType: string;
    steps: Array<{ stepNumber: number; hindi: string; targetLang: string }>;
  };
  practiceQuestions: Array<{
    id: string;
    questionHindi: string;
    questionTargetLang: string;
    optionsHindi?: string[];
    optionsTargetLang?: string[];
    correctAnswer: string;
    explanation: string;
  }>;
  worksheet: {
    title: string;
    bilingualInstructions: string;
    exercises: Array<{ promptHindi: string; promptTargetLang: string; blankSpace: boolean }>;
  };
  flashcards: Array<{
    termHindi: string;
    termTargetScript: string;
    termTargetLatin: string;
    phonetic: string;
    exampleSentence: string;
  }>;
  quiz: Array<{
    question: string;
    options: string[];
    correctIndex: number;
  }>;
  homework: {
    taskHindi: string;
    taskTargetLang: string;
    observationPrompt: string;
  };
  remediationSuggestions: string[];
  blackboardSummary?: {
    keyTerms: string[];
    villageExample: string;
    actionRule: string;
  };
}

export interface IAIProvider {
  readonly name: string;
  isAvailable(): Promise<boolean>;
  generateLessonPack(ctx: EducationalPromptContext): Promise<SmartTeachLessonPack>;
  explainAgain(ctx: EducationalPromptContext, currentText: string, level: 'SIMPLER' | 'VILLAGE_EXAMPLE' | 'VISUAL'): Promise<{
    explanationHindi: string;
    explanationTargetLang: string;
    example: string;
  }>;
  generateWorksheet(ctx: EducationalPromptContext, questionCount: number): Promise<any>;
  generateAdaptiveQuestions(ctx: EducationalPromptContext, count: number): Promise<any[]>;
}

export class TemplateAndLocalAIProvider implements IAIProvider {
  public readonly name = 'Template & Local AI Provider (Offline Capable)';

  public async isAvailable(): Promise<boolean> {
    return true;
  }

  public async generateLessonPack(ctx: EducationalPromptContext): Promise<SmartTeachLessonPack> {
    const targetLang = (ctx.targetLanguage || 'sat').toLowerCase();

    // Contextual village-rooted templates based on Grade and Subject
    const topicLower = (ctx.topic || '').toLowerCase();
    const subjectLower = (ctx.subject || '').toLowerCase();
    const isPlants = topicLower.includes('plant') || topicLower.includes('पौधा') || topicLower.includes('पेड़') || subjectLower.includes('science') || subjectLower.includes('evs');
    const isLiteracy = subjectLower.includes('literacy') || subjectLower.includes('भाषा') || topicLower.includes('गाँव') || topicLower.includes('परिवार');

    // Language-specific dictionaries for Math (Fractions/Numbers)
    const mathLangMap: Record<string, any> = {
      sat: {
        objTarget: `ᱦᱟᱹᱴᱤᱧ ᱨᱮᱭᱟᱜ ᱢᱩᱬᱩᱛ ᱠᱟᱛᱷᱟ ᱵᱩᱡᱷᱟᱹᱣ ᱠᱟᱛᱮ ᱫᱤᱱᱟᱹᱢ ᱡᱤᱭᱚᱱ ᱨᱮ ᱵᱮᱵᱷᱟᱨ ᱫᱟᱲᱮᱭᱟᱜ-ᱟ ᱠᱚ᱾`,
        introTarget: `ᱛᱮᱦᱮᱧ ᱫᱚ ᱵᱚᱱ ᱢᱤᱫᱴᱟᱝ ᱨᱟᱹᱥᱠᱟᱹ ᱠᱟᱛᱷᱟ ᱛᱮ ᱦᱟᱹᱴᱤᱧ (भिन्न) ᱵᱟᱵᱚᱛ ᱵᱚᱱ ᱪᱮᱫ-ᱟ᱾`,
        explTargetScript: `ᱡᱚᱠᱷᱚᱱ ᱢᱤᱫᱴᱟᱝ ᱯᱩᱨᱟᱹ ᱡᱤᱱᱤᱥ ᱥᱚᱢᱟᱱ ᱦᱟᱹᱴᱤᱧ ᱨᱮ ᱵᱚᱱ ᱦᱟᱹᱴᱤᱧᱟ, ᱚᱱᱟ ᱜᱮ ᱦᱟᱹᱴᱤᱧ ᱠᱚ ᱢᱮᱛᱟᱜ-ᱟ᱾`,
        explTargetLatin: `Jokhon midtang pura jinis soman hatiñ re bon hatiña, ona ge hatiñ ko metag-a.`,
        localExDescTarget: `ᱟᱹᱛᱩ ᱨᱮ ᱡᱚᱠᱷᱚᱱ ᱠᱷᱮᱛ ᱵᱚᱱ ᱦᱟᱹᱴᱤᱧᱟ ᱥᱮ ᱢᱤᱫᱴᱟᱝ ᱡᱟᱹᱱᱩᱢ ᱯᱩᱱ ᱜᱟᱛᱮ ᱛᱟᱞᱟ ᱨᱮ ᱥᱚᱢᱟᱱ ᱵᱚᱱ ᱦᱟᱹᱴᱤᱧᱟ᱾`,
        activityTitle: 'ᱠᱟᱜᱚᱡᱽ ᱯᱮᱴᱮᱡ ᱠᱟᱛᱮ ᱦᱟᱹᱴᱤᱧ ᱵᱮᱱᱟᱣ',
        instructionsTargetLang: 'ᱢᱤᱫᱴᱟᱝ ᱥᱟᱠᱟᱢ ᱦᱟᱛᱟᱣ ᱯᱮ᱾ ᱛᱟᱞᱟ ᱨᱮ ᱯᱮᱴᱮᱡ ᱠᱟᱛᱮ ᱵᱟᱨ ᱦᱟᱹᱴᱤᱧ (᱑/᱒) ᱵᱮᱱᱟᱣ ᱯᱮ᱾',
        steps: [
          { stepNumber: 1, hindi: 'पूरी एक वस्तु (1)', targetLang: 'ᱯᱩᱨᱟᱹ ᱢᱤᱫ ᱡᱤᱱᱤᱥ (᱑)' },
          { stepNumber: 2, hindi: 'दो बराबर भाग (1/2 और 1/2)', targetLang: 'ᱵᱟᱨ ᱥᱚᱢᱟᱱ ᱦᱟᱹᱴᱤᱧ (᱑/᱒ ᱟᱨ ᱑/᱒)' },
          { stepNumber: 3, hindi: 'चार बराबर भाग (1/4 प्रत्येक)', targetLang: 'ᱯᱩᱱ ᱥᱚᱢᱟᱱ ᱦᱟᱹᱴᱤᱧ (᱑/᱔ ᱡᱚᱛᱚ)' }
        ],
        q1: 'ᱢᱤᱫᱴᱟᱝ ᱥᱮᱣ ᱵᱟᱨ ᱥᱚᱢᱟᱱ ᱦᱟᱹᱴᱤᱧ ᱨᱮ ᱜᱮᱫ ᱞᱮᱠᱷᱟᱱ ᱢᱤᱫ ᱦᱟᱹᱴᱤᱧ ᱫᱚ ᱪᱮᱫ ᱠᱚ ᱢᱮᱛᱟᱜ-ᱟ?',
        q1Opts: ['ᱯᱩᱱ ᱦᱟᱹᱴᱤᱧ ᱨᱮᱭᱟᱜ ᱢᱤᱫ (᱑/᱔)', 'ᱛᱟᱞᱟ / ᱟᱫᱷᱟ (᱑/᱒)', 'ᱯᱩᱨᱟᱹ (᱑)', 'ᱯᱮ ᱦᱟᱹᱴᱤᱧ (᱓/᱔)'],
        q2: 'ᱦᱟᱹᱴᱤᱧ ᱓/᱔ ᱨᱮ ᱪᱮᱛᱟᱱ ᱦᱟᱹᱴᱤᱧ (अंश) ᱫᱚ ᱚᱠᱟ ᱮᱞ ᱠᱟᱱᱟ?',
        q2Opts: ['᱓', '᱔', '᱗', '᱑'],
        worksheetInstr: 'ᱡᱚᱛᱚ ᱠᱩᱠᱞᱤ ᱢᱚᱱᱮ ᱮᱢ ᱠᱟᱛᱮ ᱯᱟᱲᱦᱟᱣ ᱯᱮ ᱟᱨ ᱛᱮᱞᱟ ᱚᱞ ᱯᱮ᱾',
        wPrompts: [
          '᱑. ᱪᱤᱛᱟᱹᱨ ᱧᱮᱞ ᱠᱟᱛᱮ ᱦᱟᱹᱴᱤᱧ ᱮᱞ ᱚᱞ ᱯᱮ:',
          '᱒. ᱑/᱒ ᱟᱨ ᱒/᱔ ᱨᱮ ᱪᱮᱫ ᱥᱟᱹᱜᱟᱹᱭ ᱢᱮᱱᱟᱜ-ᱟ?',
          '᱓. ᱟᱢᱟᱜ ᱟᱹᱛᱩ ᱨᱮᱭᱟᱜ ᱵᱟᱨᱭᱟ ᱫᱟᱹᱭᱠᱟᱹ ᱚᱞ ᱢᱮ ᱡᱟᱦᱟᱸᱨᱮ ᱥᱚᱢᱟᱱ ᱦᱟᱹᱴᱤᱧ ᱦᱩᱭᱩᱜ-ᱟ:'
        ],
        flashcards: [
          { termHindi: 'भिन्न', termTargetScript: 'ᱦᱟᱹᱴᱤᱧ', termTargetLatin: 'Hāṭiñ', phonetic: '/ha.ʈiɲ/', exampleSentence: 'ᱱᱚᱣᱟ ᱫᱚ ᱥᱚᱢᱟᱱ ᱦᱟᱹᱴᱤᱧ ᱠᱟᱱᱟ᱾' },
          { termHindi: 'अंश', termTargetScript: 'ᱪᱮᱛᱟᱱ ᱦᱟᱹᱴᱤᱧ', termTargetLatin: 'Cetan hāṭiñ', phonetic: '/ce.tan ha.ʈiɲ/', exampleSentence: 'ᱪᱮᱛᱟᱱ ᱦᱟᱹᱴᱤᱧ ᱫᱚ ᱟᱝᱥᱚ ᱠᱟᱱᱟ᱾' },
          { termHindi: 'हर', termTargetScript: 'ᱞᱟᱛᱟᱨ ᱦᱟᱹᱴᱤᱧ', termTargetLatin: 'Latar hāṭiñ', phonetic: '/la.tar ha.ʈiɲ/', exampleSentence: 'ᱞᱟᱛᱟᱨ ᱦᱟᱹᱴᱤᱧ ᱫᱚ ᱡᱚᱛᱚ ᱦᱟᱹᱴᱤᱧ ᱞᱮᱠᱷᱟ᱾' },
          { termHindi: 'आधा', termTargetScript: 'ᱛᱟᱞᱟ', termTargetLatin: 'Tala', phonetic: '/ta.la/', exampleSentence: 'ᱢᱤᱫᱴᱟᱝ ᱨᱩᱴᱤ ᱨᱮᱭᱟᱜ ᱛᱟᱞᱟ᱾' }
        ],
        taskTargetLang: 'ᱚᱲᱟᱜ ᱨᱮ ᱢᱤᱫᱴᱟᱝ ᱨᱩᱴᱤ ᱯᱩᱱ ᱥᱚᱢᱟᱱ ᱦᱟᱹᱴᱤᱧ ᱨᱮ ᱜᱮᱫ ᱠᱟᱛᱮ ᱧᱮᱞ ᱯᱮ ᱟᱨ ᱦᱟᱹᱴᱤᱧ ᱮᱞ ᱚᱞ ᱢᱮ᱾'
      },
      hoc: {
        objTarget: `𑢹𑣉 𑣎𑣋𑣜: ᱦᱟᱹᱴᱤᱧ (Hating) ᱨᱮᱭᱟᱜ ᱢᱩᱬᱩᱛ ᱠᱟᱛᱷᱟ ᱵᱩᱡᱷᱟᱹᱣ ᱠᱟᱛᱮ ᱫᱤᱱᱟᱹᱢ ᱡᱤᱭᱚᱱ ᱨᱮ ᱵᱮᱵᱷᱟᱨ ᱫᱟᱲᱮᱭᱟᱜ-ᱟ ᱠᱚ᱾`,
        introTarget: `ᱛᱮᱦᱮᱧ ᱫᱚ ᱟᱵᱩ ᱢᱤᱫ ᱨᱟᱹᱥᱠᱟᱹ ᱠᱟᱛᱷᱟ ᱛᱮ ᱦᱟᱹᱴᱤᱧ (Fractions) ᱪᱮᱫᱚᱜ-ᱟ ᱵᱚᱱ᱾`,
        explTargetScript: `ᱡᱟᱦᱟᱸ ᱡᱤᱱᱤᱥ ᱵᱟᱨ ᱦᱚᱲ ᱛᱟᱞᱟ ᱨᱮ ᱥᱚᱢᱟᱱ ᱮᱢ ᱦᱟᱹᱴᱤᱧ ᱞᱮᱠᱷᱟᱱ ᱚᱱᱟ ᱦᱟᱹᱴᱤᱧ (Hating) ᱠᱚ ᱢᱮᱱᱟ᱾ ᱑/᱒ = ᱛᱟᱞᱟ (आधा)᱾`,
        explTargetLatin: `Jaha jinis bar hor tala re soman em hating lekhan ona hating ko mena. 1/2 = tala.`,
        localExDescTarget: `ᱦᱟᱛᱩ ᱨᱮ ᱵᱟᱨ ᱵᱚᱭᱦᱟ ᱢᱤᱫᱴᱟᱝ ᱠᱷᱮᱛ ᱥᱚᱢᱟᱱ ᱠᱤᱱ ᱥᱤ-ᱭᱟ᱾ ᱢᱤᱫ ᱦᱚᱲᱟᱜ ᱦᱟᱹᱴᱤᱧ ᱑/᱒ ᱛᱟᱱᱟ᱾`,
        activityTitle: 'कागज़ मोड़कर 1/2 भाग बनाना (Ho: Tala)',
        instructionsTargetLang: 'ᱢᱤ ᱠᱟᱜᱚᱡᱽ ᱦᱟᱛᱟᱣ ᱯᱮ᱾ ᱛᱟᱞᱟ ᱨᱮ ᱯᱮᱴᱮᱡ ᱠᱟᱛᱮ ᱵᱟᱨ ᱦᱟᱹᱴᱤᱧ (᱑/᱒) ᱵᱟᱭ ᱯᱮ᱾',
        steps: [
          { stepNumber: 1, hindi: 'पूरी एक वस्तु (1)', targetLang: 'ᱢᱤᱫ ᱯᱩᱨᱟᱹ ᱡᱤᱱᱤᱥ (1)' },
          { stepNumber: 2, hindi: 'दो बराबर भाग (1/2 और 1/2)', targetLang: 'ᱵᱟᱨ ᱥᱚᱢᱟᱱ ᱦᱟᱹᱴᱤᱧ - ᱛᱟᱞᱟ (1/2)' },
          { stepNumber: 3, hindi: 'चार बराबर भाग (1/4 प्रत्येक)', targetLang: 'ᱯᱩᱱ ᱥᱚᱢᱟᱱ ᱦᱟᱹᱴᱤᱧ (1/4 ᱡᱚᱛᱚ)' }
        ],
        q1: 'ᱢᱤᱫᱴᱟᱝ ᱥᱮᱣ ᱵᱟᱨ ᱥᱚᱢᱟᱱ ᱦᱟᱹᱴᱤᱧ ᱨᱮ ᱜᱮᱫ ᱞᱮᱠᱷᱟᱱ ᱢᱤᱫ ᱦᱟᱹᱴᱤᱧ ᱫᱚ ᱪᱮᱫ ᱠᱚ ᱢᱮᱱᱟ?',
        q1Opts: ['ᱯᱩᱱ ᱦᱟᱹᱴᱤᱧ ᱨᱮᱭᱟᱜ ᱢᱤᱫ (1/4)', 'ᱛᱟᱞᱟ / आधा (1/2)', 'ᱯᱩᱨᱟᱹ (1)', 'ᱯᱮ ᱦᱟᱹᱴᱤᱧ (3/4)'],
        q2: 'ᱦᱟᱹᱴᱤᱧ 3/4 ᱨᱮ ᱪᱮᱛᱟᱱ ᱦᱟᱹᱴᱤᱧ (अंश) ᱫᱚ ᱚᱠᱟ ᱮᱞ ᱛᱟᱱᱟ?',
        q2Opts: ['3', '4', '7', '1'],
        worksheetInstr: 'ᱡᱚᱛᱚ ᱠᱩᱠᱞᱤ ᱢᱚᱱᱮ ᱮᱢ ᱠᱟᱛᱮ ᱯᱟᱲᱦᱟᱣ ᱯᱮ ᱟᱨ ᱛᱮᱞᱟ ᱚᱞ ᱯᱮ (Ho Classroom):',
        wPrompts: [
          '1. ᱪᱤᱛᱟᱹᱨ ᱧᱮᱞ ᱠᱟᱛᱮ ᱦᱟᱹᱴᱤᱧ ᱮᱞ ᱚᱞ ᱯᱮ (Write fraction):',
          '2. 1/2 ᱟᱨ 2/4 ᱨᱮ ᱪᱮᱫ ᱥᱟᱹᱜᱟᱹᱭ ᱢᱮᱱᱟᱜ-ᱟ?',
          '3. ᱟᱢᱟᱜ ᱦᱟᱛᱩ ᱨᱮᱭᱟᱜ ᱵᱟᱨᱭᱟ ᱫᱟᱹᱭᱠᱟᱹ ᱚᱞ ᱢᱮ ᱡᱟᱦᱟᱸᱨᱮ ᱥᱚᱢᱟᱱ ᱦᱟᱹᱴᱤᱧ ᱦᱩᱭᱩᱜ-ᱟ:'
        ],
        flashcards: [
          { termHindi: 'भिन्न', termTargetScript: 'ᱦᱟᱹᱴᱤᱧ (𑢹𑣉)', termTargetLatin: 'Hating', phonetic: '/ha.tiŋ/', exampleSentence: 'ᱱᱮᱭᱟ ᱫᱚ ᱥᱚᱢᱟᱱ ᱦᱟᱹᱴᱤᱧ ᱛᱟᱱᱟ᱾' },
          { termHindi: 'आधा', termTargetScript: 'ᱛᱟᱞᱟ (Tala)', termTargetLatin: 'Tala', phonetic: '/ta.la/', exampleSentence: 'ᱢᱤ ᱨᱩᱴᱤ ᱨᱮᱭᱟᱜ ᱛᱟᱞᱟ ᱦᱟᱹᱴᱤᱧ᱾' },
          { termHindi: 'अंश', termTargetScript: 'ᱪᱮᱛᱟᱱ ᱦᱟᱹᱴᱤᱧ', termTargetLatin: 'Cetan hating', phonetic: '/ce.tan ha.tiŋ/', exampleSentence: 'ᱪᱮᱛᱟᱱ ᱦᱟᱹᱴᱤᱧ ᱫᱚ ᱟᱝᱥᱚ ᱛᱟᱱᱟ᱾' },
          { termHindi: 'हर', termTargetScript: 'ᱞᱟᱛᱟᱨ ᱦᱟᱹᱴᱤᱧ', termTargetLatin: 'Latar hating', phonetic: '/la.tar ha.tiŋ/', exampleSentence: 'ᱞᱟᱛᱟᱨ ᱦᱟᱹᱴᱤᱧ ᱫᱚ ᱡᱚᱛᱚ ᱦᱟᱹᱴᱤᱧ᱾' }
        ],
        taskTargetLang: 'ᱚᱲᱟᱜ ᱨᱮ ᱢᱤ ᱨᱩᱴᱤ ᱯᱩᱱ ᱥᱚᱢᱟᱱ ᱦᱟᱹᱴᱤᱧ ᱨᱮ ᱠᱮᱪᱟᱜ ᱠᱟᱛᱮ ᱧᱮᱞ ᱯᱮ ᱟᱨ ᱮᱞ ᱚᱞ ᱢᱮ᱾'
      },
      unr: {
        objTarget: `ᱢᱩᱱᱰᱟᱨᱤ: ᱦᱟᱹᱴᱤᱧ ᱨᱮᱭᱟᱜ ᱢᱩᱬᱩᱛ ᱠᱟᱛᱷᱟ ᱵᱩᱡᱷᱟᱹᱣ ᱠᱟᱛᱮ ᱫᱤᱱᱟᱹᱢ ᱡᱤᱭᱚᱱ ᱨᱮ ᱵᱮᱵᱷᱟᱨ ᱫᱟᱲᱮᱭᱟᱜ-ᱟ ᱠᱚ᱾`,
        introTarget: `ᱛᱮᱦᱮᱧ ᱫᱚ ᱟᱵᱩ ᱢᱤᱫ ᱨᱟᱹᱥᱠᱟᱹ ᱠᱟᱹᱦᱱᱤ ᱛᱮ ᱦᱟᱹᱴᱤᱧ (भिन्न) ᱵᱚᱱ ᱪᱮᱫ-ᱟ᱾`,
        explTargetScript: `ᱡᱟᱦᱟᱸᱱ ᱪᱤᱡ ᱜᱟᱛᱮ ᱠᱚ ᱥᱟᱶ ᱵᱟᱨᱟᱵᱟᱹᱨᱤ ᱦᱟᱹᱴᱤᱧ ᱞᱮᱨᱮ ᱚᱱᱟ ᱜᱮ ᱦᱟᱹᱴᱤᱧ ᱠᱚ ᱢᱮᱛᱟᱜ-ᱟ᱾ ᱑/᱒ ᱢᱮᱱᱞᱮᱠᱷᱟᱱ ᱛᱟᱞᱟ (आधा)᱾`,
        explTargetLatin: `Jahan cij gate ko saw barabari hating lere ona ge hating ko metag-a. 1/2 menlekhan tala.`,
        localExDescTarget: `ᱦᱟᱛᱩ ᱨᱮ ᱯᱮ ᱦᱚᱲ ᱢᱤᱫᱴᱟᱝ ᱵᱟᱹᱫᱽ ᱥᱚᱢᱟᱱ ᱠᱚ ᱦᱟᱹᱴᱤᱧᱟ, ᱡᱚᱛᱚ ᱦᱚᱲᱟᱜ ᱑/᱓ ᱦᱟᱹᱴᱤᱧ ᱛᱟᱱᱟ᱾`,
        activityTitle: 'कागज़ को मोड़कर समान हिस्से बनाना (Mundari: Tala)',
        instructionsTargetLang: 'ᱢᱤᱫᱴᱟᱝ ᱠᱟᱜᱚᱡᱽ ᱦᱟᱛᱟᱣ ᱠᱟᱛᱮ ᱛᱟᱞᱟ ᱨᱮ ᱛᱚᱯᱟᱜ ᱞᱮᱠᱷᱟᱱ ᱵᱟᱨ ᱦᱟᱹᱴᱤᱧ (᱑/᱒) ᱦᱩᱭᱩᱜ-ᱟ᱾',
        steps: [
          { stepNumber: 1, hindi: 'पूरी एक वस्तु (1)', targetLang: 'ᱢᱤᱫ ᱯᱩᱨᱟᱹ ᱪᱤᱡ (1)' },
          { stepNumber: 2, hindi: 'दो बराबर भाग (1/2 और 1/2)', targetLang: 'ᱵᱟᱨ ᱥᱚᱢᱟᱱ ᱦᱟᱹᱴᱤᱧ (1/2 ᱛᱟᱞᱟ)' },
          { stepNumber: 3, hindi: 'चार बराबर भाग (1/4 प्रत्येक)', targetLang: 'ᱯᱩᱱ ᱥᱚᱢᱟᱱ ᱦᱟᱹᱴᱤᱧ (1/4)' }
        ],
        q1: 'ᱢᱤᱫᱴᱟᱝ ᱡᱟᱹᱱᱩᱢ ᱵᱟᱨ ᱥᱚᱢᱟᱱ ᱦᱟᱹᱴᱤᱧ ᱨᱮ ᱜᱮᱫ ᱞᱮᱠᱷᱟᱱ ᱢᱤᱫ ᱦᱟᱹᱴᱤᱧ ᱫᱚ ᱪᱮᱫ ᱠᱚ ᱢᱮᱛᱟᱜ-ᱟ?',
        q1Opts: ['1/4 (एक चौथाई)', 'ᱛᱟᱞᱟ / आधा (1/2)', 'ᱯᱩᱨᱟᱹ (1)', '3/4 (तीन चौथाई)'],
        q2: 'ᱦᱟᱹᱴᱤᱧ 3/4 ᱨᱮ ᱪᱮᱛᱟᱱ ᱮᱞ ᱫᱚ ᱪᱮᱫ ᱠᱟᱱᱟ?',
        q2Opts: ['3', '4', '7', '1'],
        worksheetInstr: 'ᱢᱩᱱᱰᱟᱨᱤ ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱠᱚ: ᱡᱚᱛᱚ ᱠᱩᱠᱞᱤ ᱢᱚᱱᱮ ᱮᱢ ᱠᱟᱛᱮ ᱯᱟᱲᱦᱟᱣ ᱯᱮ ᱟᱨ ᱛᱮᱞᱟ ᱚᱞ ᱯᱮ:',
        wPrompts: [
          '1. ᱪᱤᱛᱟᱹᱨ ᱧᱮᱞ ᱠᱟᱛᱮ ᱦᱟᱹᱴᱤᱧ ᱮᱞ ᱚᱞ ᱯᱮ (Fraction):',
          '2. 1/2 ᱟᱨ 2/4 ᱨᱮ ᱪᱮᱫ ᱥᱟᱹᱜᱟᱹᱭ ᱢᱮᱱᱟᱜ-ᱟ?',
          '3. ᱟᱢᱟᱜ ᱦᱟᱛᱩ ᱨᱮ ᱡᱤᱱᱤᱥ ᱵᱟᱨᱟᱵᱟᱹᱨᱤ ᱦᱟᱹᱴᱤᱧ ᱨᱮᱭᱟᱜ ᱵᱟᱨᱭᱟ ᱫᱟᱹᱭᱠᱟᱹ ᱚᱞ ᱢᱮ:'
        ],
        flashcards: [
          { termHindi: 'भिन्न', termTargetScript: 'ᱦᱟᱹᱴᱤᱧ', termTargetLatin: 'Hating', phonetic: '/ha.tiɲ/', exampleSentence: 'ᱡᱤᱱᱤᱥ ᱥᱚᱢᱟᱱ ᱦᱟᱹᱴᱤᱧ ᱜᱮ ᱦᱟᱹᱴᱤᱧ ᱛᱟᱱᱟ᱾' },
          { termHindi: 'आधा', termTargetScript: 'ᱛᱟᱞᱟ (Tala)', termTargetLatin: 'Tala', phonetic: '/ta.la/', exampleSentence: 'ᱢᱤᱫᱴᱟᱝ ᱡᱟᱹᱱᱩᱢ ᱨᱮᱭᱟᱜ ᱛᱟᱞᱟ ᱦᱟᱹᱴᱤᱧ᱾' },
          { termHindi: 'अंश', termTargetScript: 'ᱪᱮᱛᱟᱱ ᱮᱞ', termTargetLatin: 'Cetan el', phonetic: '/ce.tan el/', exampleSentence: 'ᱪᱮᱛᱟᱱ ᱮᱞ ᱫᱚ ᱟᱝᱥᱚ᱾' },
          { termHindi: 'हर', termTargetScript: 'ᱞᱟᱛᱟᱨ ᱮᱞ', termTargetLatin: 'Latar el', phonetic: '/la.tar el/', exampleSentence: 'ᱞᱟᱛᱟᱨ ᱮᱞ ᱫᱚ ᱦᱚᱨᱚ᱾' }
        ],
        taskTargetLang: 'ᱚᱲᱟᱜ ᱨᱮ ᱢᱤᱫᱴᱟᱝ ᱨᱩᱴᱤ ᱯᱩᱱ ᱥᱚᱢᱟᱱ ᱦᱟᱹᱴᱤᱧ ᱨᱮ ᱦᱟᱹᱴᱤᱧ ᱠᱟᱛᱮ ᱮᱞ ᱚᱞ ᱢᱮ᱾'
      },
      en: {
        objTarget: `Students will comprehend the core concept of fractions and apply them to daily equal-sharing problems.`,
        introTarget: `Today we will explore fractions through an enjoyable real-world village sharing scenario.`,
        explTargetScript: `When a whole object is partitioned into equal parts, each part is called a fraction (e.g., 1/2 is one of two equal halves).`,
        explTargetLatin: `When a whole object is partitioned into equal parts, each part is called a fraction.`,
        localExDescTarget: `Village context: Dividing a farmland plot equally among siblings or sharing one guava equally among four peers (1/4 each).`,
        activityTitle: 'Paper Folding for Equal Halves and Quarters',
        instructionsTargetLang: 'Take a square paper sheet. Fold it along the center crease to form two congruent halves (1/2 each).',
        steps: [
          { stepNumber: 1, hindi: 'पूरी एक वस्तु (1)', targetLang: 'One complete whole unit (1)' },
          { stepNumber: 2, hindi: 'दो बराबर भाग (1/2 और 1/2)', targetLang: 'Two equal halves (1/2 and 1/2)' },
          { stepNumber: 3, hindi: 'चार बराबर भाग (1/4 प्रत्येक)', targetLang: 'Four equal quarters (1/4 each)' }
        ],
        q1: 'If an apple is cut into two equal parts, what is each part called?',
        q1Opts: ['One quarter (1/4)', 'One half (1/2)', 'Whole (1)', 'Three quarters (3/4)'],
        q2: 'In fraction 3/4, which number represents the Numerator?',
        q2Opts: ['3', '4', '7', '1'],
        worksheetInstr: 'Read each problem carefully and write your answers in your workbook:',
        wPrompts: [
          '1. Observe the shaded area in the diagram and write the fraction:',
          '2. What is the equivalence relationship between 1/2 and 2/4?',
          '3. Write two real-world examples from your locality where equal partitioning is practiced:'
        ],
        flashcards: [
          { termHindi: 'भिन्न', termTargetScript: 'Fraction (1/2, 1/4)', termTargetLatin: 'Fraction', phonetic: '/ˈfræk.ʃən/', exampleSentence: 'A fraction denotes equal parts of a whole object.' },
          { termHindi: 'आधा', termTargetScript: 'Half (1/2)', termTargetLatin: 'Half', phonetic: '/hɑːf/', exampleSentence: 'One half equals fifty percent of the total.' },
          { termHindi: 'अंश', termTargetScript: 'Numerator (Top)', termTargetLatin: 'Numerator', phonetic: '/ˈnjuː.mə.reɪ.tər/', exampleSentence: 'The numerator indicates parts taken.' },
          { termHindi: 'हर', termTargetScript: 'Denominator (Bottom)', termTargetLatin: 'Denominator', phonetic: '/dɪˈnɒm.ɪ.neɪ.tər/', exampleSentence: 'The denominator denotes total equal parts.' }
        ],
        taskTargetLang: 'Cut a flatbread (roti) or fruit into 4 equal quarters with your family and document the fraction notation.'
      },
      hi: {
        objTarget: `विद्यार्थी भिन्न की बुनियादी अवधारणा को समझ सकेंगे और दैनिक जीवन में वस्तुओं को बराबर बांटने में उपयोग कर सकेंगे।`,
        introTarget: `आज हम एक रोचक गाँव के उदाहरण से भिन्न (Fractions) के बारे में सीखेंगे।`,
        explTargetScript: `जब किसी पूरी वस्तु को बराबर भागों में बांटा जाता है, तो प्रत्येक भाग को भिन्न कहते हैं। ऊपर की संख्या अंश और नीचे की हर होती है।`,
        explTargetLatin: `Jab kisi puri vastu ko barabar bhagon mein banta jata hai, to pratyek bhag ko bhinn kahte hain.`,
        localExDescTarget: `गाँव में जब खेत की जुताई 3 भाइयों में बराबर बांटी जाती है (1/3) या 1 अमरूद को 4 दोस्तों में बराबर बांटा जाता है (1/4)।`,
        activityTitle: 'कागज़ मोड़कर भिन्न बनाना',
        instructionsTargetLang: 'एक चौकोर कागज़ लें। इसे बीच से मोड़कर दो बराबर हिस्से (1/2) करें और रेखांकित करें।',
        steps: [
          { stepNumber: 1, hindi: 'पूरी एक वस्तु (1)', targetLang: 'पूरी एक वस्तु (1)' },
          { stepNumber: 2, hindi: 'दो बराबर भाग (1/2 और 1/2)', targetLang: 'दो बराबर भाग - आधा (1/2 और 1/2)' },
          { stepNumber: 3, hindi: 'चार बराबर भाग (1/4 प्रत्येक)', targetLang: 'चार बराबर भाग - एक चौथाई (1/4 प्रत्येक)' }
        ],
        q1: 'यदि एक सेब को दो बराबर भागों में काटा जाए, तो एक भाग क्या कहलाएगा?',
        q1Opts: ['एक चौथाई (1/4)', 'आधा (1/2)', 'पूरा (1)', 'तीन चौथाई (3/4)'],
        q2: 'भिन्न 3/4 में अंश (Numerator) कौन सी संख्या है?',
        q2Opts: ['3', '4', '7', '1'],
        worksheetInstr: 'सभी प्रश्नों को ध्यान से पढ़ें और उत्तर अपनी अभ्यास पुस्तिका में लिखें:',
        wPrompts: [
          '1. चित्र देखकर रेखांकित भाग की भिन्न लिखिए:',
          '2. 1/2 और 2/4 में क्या संबंध है?',
          '3. अपने गाँव के 2 ऐसे उदाहरण लिखिए जहाँ आप चीज़ों को बराबर बांटते हैं:'
        ],
        flashcards: [
          { termHindi: 'भिन्न', termTargetScript: 'भिन्न (Fractions)', termTargetLatin: 'Bhinn', phonetic: '/bʱɪn/', exampleSentence: 'पूरी वस्तु का बराबर हिस्सा भिन्न कहलाता है।' },
          { termHindi: 'आधा', termTargetScript: 'आधा (1/2)', termTargetLatin: 'Aadha', phonetic: '/aː.dʱaː/', exampleSentence: 'एक रोटी के दो बराबर टुकड़ों में से एक आधा है।' },
          { termHindi: 'अंश', termTargetScript: 'अंश (Numerator)', termTargetLatin: 'Ansh', phonetic: '/ə̃ʃ/', exampleSentence: 'भिन्न में ऊपर की संख्या को अंश कहते हैं।' },
          { termHindi: 'हर', termTargetScript: 'हर (Denominator)', termTargetLatin: 'Har', phonetic: '/ɦəɾ/', exampleSentence: 'भिन्न में नीचे की कुल भागों की संख्या हर कहलाती है।' }
        ],
        taskTargetLang: 'घर में एक रोटी या फल को 4 बराबर भागों में काटकर परिवार के साथ देखें। प्रत्येक हिस्से को भिन्न में लिखें।'
      },
      kru: {
        objTarget: `कुड़ुख़: भिन्न (हिसै) गही बुनियादी कत्थन बुझुरना अरा रोज़मर्रा जिंदगी नू बराबर बांटना सीखना।`,
        introTarget: `इन्ना नाम पद्दा गही कत्था ती भिन्न (हिसै) गही बारे नू सिखेगे बरदम।`,
        explTargetScript: `जब एका गोट्टा वस्तु गही बराबर हिसै मनि, तबे ओन्द हिसै गही भिन्न कत्थी। १/२ मनि एका आधा (मझिया)।`,
        explTargetLatin: `Jab eka gotta vastu gahi barabar hisai mani, tabe ond hisai gahi bhinn katthi. 1/2 mani eka aadha.`,
        localExDescTarget: `पद्दा नू जब तीन जोड़ा जोक खेत जोति ओन्द हिसै १/३ मनि अरा अम्बरूद चार संगे नू बांटी।`,
        activityTitle: 'कागज़ मोड़कर बराबर हिस्सा बनाना',
        instructionsTargetLang: 'ओन्द कागज़ धरा। मझिया ती मोड़ेरके दुई बराबर हिसै (१/२) नन्हा।',
        steps: [
          { stepNumber: 1, hindi: 'पूरी एक वस्तु (1)', targetLang: 'ओन्द गोट्टा वस्तु (1)' },
          { stepNumber: 2, hindi: 'दो बराबर भाग (1/2 और 1/2)', targetLang: 'दुई बराबर हिसै (1/2 मझिया)' },
          { stepNumber: 3, hindi: 'चार बराबर भाग (1/4 प्रत्येक)', targetLang: 'चार बराबर हिसै (1/4 प्रत्येक)' }
        ],
        q1: 'यदि ओन्द सेब दुई बराबर हिसै नू कटिया, तबे ओन्द हिसै एका कहारी?',
        q1Opts: ['एक चौथाई (1/4)', 'आधा (1/2)', 'गोट्टा (1)', 'तीन चौथाई (3/4)'],
        q2: 'भिन्न 3/4 नू मेया संख्या (अंश) एका हिके?',
        q2Opts: ['3', '4', '7', '1'],
        worksheetInstr: 'कुड़ुख़ पड़ू: सप्पै सवाल ध्यान ती पढ़ा अरा उत्तर रंगा:',
        wPrompts: [
          '1. चित्र एरके हिसै संख्या टूंड़ा:',
          '2. 1/2 अरा 2/4 नू एका संबंध रई?',
          '3. तमहै पद्दा नू बराबर बांटेक दुई उदाहरण टूंड़ा:'
        ],
        flashcards: [
          { termHindi: 'भिन्न', termTargetScript: 'हिसै (भिन्न)', termTargetLatin: 'Hisai', phonetic: '/hi.sai/', exampleSentence: 'गोट्टा चीज गही बराबर हिसै भिन्न हिके।' },
          { termHindi: 'आधा', termTargetScript: 'मझिया (1/2)', termTargetLatin: 'Majhiya', phonetic: '/mədʒʱ.i.jaː/', exampleSentence: 'ओन्द रोटी गही मझिया हिसै।' },
          { termHindi: 'अंश', termTargetScript: 'मेया संख्या', termTargetLatin: 'Meya sankhya', phonetic: '/me.jaː/', exampleSentence: 'भिन्न नू मेया संख्या अंश हिके।' },
          { termHindi: 'हर', termTargetScript: 'किच्चा संख्या', termTargetLatin: 'Kiccha sankhya', phonetic: '/kɪtʃ.tʃʰaː/', exampleSentence: 'भिन्न नू किच्चा कुल संख्या हर हिके।' }
        ],
        taskTargetLang: 'एड़पा नू ओन्द रोटी चार बराबर हिसै नू बांटके परिवार संगे एरा अरा कॉपी नू टूंड़ा।'
      },
      kyw: {
        objTarget: `कुड़मालि: भिन्न (बांट/हिंसा) केर बुनियादी ज्ञान बुझिके रोज़मर्रा जिनगी महान बराबर बांटेक सीखेक।`,
        introTarget: `आइझ हामरा गाँव केर उदाहरण लेय के भिन्न (Fractions) सिखे लागली।`,
        explTargetScript: `जखन कनो पूरा जिनिस के बराबर भाग महान बांइटा जाये, तखन प्रतेक भाग के भिन्न कहल जाये। १/२ माने आधा (माझि)।`,
        explTargetLatin: `Jokhon kono pura jinis ke barabar bhaag mahan baintal jaaye, tokhon protek bhaag ke bhinn kohol jaaye. 1/2 maane aadha.`,
        localExDescTarget: `गाँव महान जखन खेत केर जुताई ३ भाई महान बराबर बांइटा जाये (१/३) वा १ अमरूद ४ संगी महान बराबर बांइटा जाये (१/४)।`,
        activityTitle: 'कागज़ मोड़िके बराबर हिस्सा बनावेक',
        instructionsTargetLang: 'एकटा चउकोर कागज़ लेवा। माझि महान मोड़िके दुइ बराबर हिस्सा (१/२) करा।',
        steps: [
          { stepNumber: 1, hindi: 'पूरी एक वस्तु (1)', targetLang: 'गोट्टा एक वस्तु (1)' },
          { stepNumber: 2, hindi: 'दो बराबर भाग (1/2 और 1/2)', targetLang: 'दुइ बराबर भाग - आधा (1/2)' },
          { stepNumber: 3, hindi: 'चार बराबर भाग (1/4 प्रत्येक)', targetLang: 'चार बराबर भाग - एक चौथाई (1/4)' }
        ],
        q1: 'जदि एकटा सेब दुइ बराबर भाग महान काटला जाये, तबे एक भाग काहा कहल जाय?',
        q1Opts: ['एक चौथाई (1/4)', 'आधा (1/2)', 'गोट्टा (1)', 'तीन चौथाई (3/4)'],
        q2: 'भिन्न 3/4 महान ऊपर केर संख्या (अंश) कउन टा हेके?',
        q2Opts: ['3', '4', '7', '1'],
        worksheetInstr: 'सभे सवाल मन दियान से पढ़ा आर उत्तर आपन खाता महान लिखा:',
        wPrompts: [
          '1. छबि देखिके भिन्न संख्या लिखा:',
          '2. 1/2 आर 2/4 महान काहा संबंध हेके?',
          '3. आपन गाँव केर दुइटा एहेन उदाहरण लिखा जहां जिनिस बराबर बांइटा जाये:'
        ],
        flashcards: [
          { termHindi: 'भिन्न', termTargetScript: 'भिन्न (बांट/हिंसा)', termTargetLatin: 'Bhinn', phonetic: '/bʱɪn/', exampleSentence: 'गोट्टा वस्तु केर बराबर हिंसा भिन्न हेके।' },
          { termHindi: 'आधा', termTargetScript: 'आधा (माझि - 1/2)', termTargetLatin: 'Aadha', phonetic: '/aː.dʱaː/', exampleSentence: 'एक रोटी केर दुइ बराबर टुकड़ा केर एकटा आधा हेके।' },
          { termHindi: 'अंश', termTargetScript: 'अंश (ऊपर केर संख्या)', termTargetLatin: 'Ansh', phonetic: '/ə̃ʃ/', exampleSentence: 'भिन्न महान ऊपर केर संख्या के अंश कहल जाये।' },
          { termHindi: 'हर', termTargetScript: 'हर (नीचे केर संख्या)', termTargetLatin: 'Har', phonetic: '/ɦəɾ/', exampleSentence: 'भिन्न महान नीचे केर कुल संख्या के हर कहल जाये।' }
        ],
        taskTargetLang: 'घर महान एक रोटी ४ बराबर भाग महान काटिके परिवार संग देखा आर भिन्न संख्या लिखा।'
      }
    };

    // Language-specific dictionaries for Science / EVS (Plants & Nature)
    const plantLangMap: Record<string, any> = {
      sat: {
        objTarget: `ᱫᱟᱨᱮ ᱨᱮᱭᱟᱜ ᱦᱟᱹᱴᱤᱧ ᱠᱚ (ᱨᱮᱦᱮᱫ, ᱥᱟᱠᱟᱢ, ᱵᱟᱦᱟ, ᱡᱚ) ᱪᱤᱱᱦᱟᱹᱣ ᱟᱨ ᱠᱟᱹᱢᱤ ᱵᱟᱰᱟᱭ᱾`,
        introTarget: `ᱛᱮᱦᱮᱧ ᱫᱚ ᱵᱚᱱ ᱟᱵᱚ ᱟᱹᱛᱩ ᱨᱮᱭᱟᱜ ᱫᱟᱨᱮ-ᱱᱟᱹᱲᱤ ᱵᱟᱵᱚᱛ ᱵᱚᱱ ᱪᱮᱫ-ᱟ᱾`,
        explTargetScript: `ᱫᱟᱨᱮ ᱫᱚ ᱟᱵᱚᱨᱤᱱ ᱜᱟᱛᱮ ᱠᱟᱱᱟ ᱠᱚ᱾ ᱨᱮᱦᱮᱫ ᱫᱚ ᱦᱟᱥᱟ ᱠᱷᱚᱱ ᱫᱟᱜ ᱮ ᱚᱨ-ᱟ ᱟᱨ ᱥᱟᱠᱟᱢ ᱫᱚ ᱥᱤᱧ ᱪᱟᱸᱫᱚ ᱨᱮ ᱡᱚᱢᱟᱜ ᱮ ᱵᱮᱱᱟᱣᱟ᱾`,
        explTargetLatin: `Dare do aborin gate kana ko. Rehed do hasa khon daag e or-a ar sakam do siñ cando re jomag e benawa.`,
        localExDescTarget: `ᱟᱹᱛᱩ ᱨᱮᱭᱟᱜ ᱥᱟᱨᱡᱚᱢ ᱫᱟᱨᱮ ᱧᱮᱞ ᱠᱟᱛᱮ ᱚᱱᱟ ᱨᱮᱭᱟᱜ ᱨᱮᱦᱮᱫ ᱟᱨ ᱥᱟᱠᱟᱢ ᱠᱚ ᱩᱭᱦᱟᱹᱨ ᱧᱮᱞ᱾`,
        activityTitle: 'पेड़-पत्ती संकलन व अवलोकन',
        instructionsTargetLang: 'ᱚᱲᱟᱜ ᱵᱟᱦᱨᱮ ᱥᱮᱱ ᱠᱟᱛᱮ ᱓ ᱞᱮᱠᱟᱱ ᱧᱩᱨ ᱟᱠᱟᱱ ᱥᱟᱠᱟᱢ ᱡᱟᱣᱨᱟᱭ ᱯᱮ ᱟᱨ ᱧᱮᱞ ᱯᱮ᱾',
        steps: [
          { stepNumber: 1, hindi: 'जड़: जमीन से जल व खनिज खींचना', targetLang: 'ᱨᱮᱦᱮᱫ: ᱦᱟᱥᱟ ᱠᱷᱚᱱ ᱫᱟᱜ ᱚᱨ' },
          { stepNumber: 2, hindi: 'तना: पौधे को सीधा खड़ा रखना व रस पहुँचाना', targetLang: 'ᱰᱟᱹᱨ: ᱫᱟᱨᱮ ᱥᱚᱡᱷᱮ ᱫᱚᱦᱚ ᱟᱨ ᱫᱟᱜ ᱥᱮᱴᱮᱨ' },
          { stepNumber: 3, hindi: 'पत्ती: सूर्य प्रकाश में भोजन बनाना', targetLang: 'ᱥᱟᱠᱟᱢ: ᱥᱤᱧ ᱪᱟᱸᱫᱚ ᱨᱮ ᱡᱚᱢᱟᱜ ᱵᱮᱱᱟᱣ' }
        ],
        q1: 'ᱫᱟᱨᱮ ᱨᱮᱭᱟᱜ ᱚᱠᱟ ᱦᱟᱹᱴᱤᱧ ᱦᱟᱥᱟ ᱵᱷᱤᱛᱨᱤ ᱨᱮ ᱛᱟᱦᱮᱸᱱᱟ?',
        q1Opts: ['ᱥᱟᱠᱟᱢ', 'ᱨᱮᱦᱮᱫ', 'ᱵᱟᱦᱟ', 'ᱰᱟᱹᱨ'],
        q2: 'ᱥᱟᱠᱟᱢ ᱫᱚ ᱪᱮᱫ ᱠᱟᱹᱢᱤ ᱞᱟᱹᱜᱤᱫ ᱡᱚᱢᱟᱜ ᱮ ᱵᱮᱱᱟᱣᱟ?',
        q2Opts: ['ᱥᱤᱧ ᱪᱟᱸᱫᱚ ᱟᱨ ᱫᱟᱜ', 'ᱦᱚᱭ', 'ᱫᱷᱤᱨᱤ', 'ᱩᱢᱩᱞ'],
        worksheetInstr: 'ᱫᱟᱨᱮ-ᱱᱟᱹᱲᱤ ᱠᱩᱠᱞᱤ: ᱡᱚᱛᱚ ᱠᱩᱠᱞᱤ ᱢᱚᱱᱮ ᱮᱢ ᱠᱟᱛᱮ ᱯᱟᱲᱦᱟᱣ ᱯᱮ ᱟᱨ ᱛᱮᱞᱟ ᱚᱞ ᱯᱮ:',
        wPrompts: [
          '᱑. ᱫᱟᱨᱮ ᱨᱮᱭᱟᱜ ᱨᱮᱦᱮᱫ ᱪᱮᱫ ᱠᱟᱹᱢᱤ ᱮᱫ-ᱟ?',
          '᱒. ᱥᱟᱠᱟᱢ ᱪᱮᱫ ᱞᱮᱠᱟᱛᱮ ᱡᱚᱢᱟᱜ ᱮ ᱵᱮᱱᱟᱣᱟ?',
          '᱓. ᱟᱢᱟᱜ ᱟᱹᱛᱩ ᱨᱮ ᱢᱮᱱᱟᱜ ᱵᱟᱨᱭᱟ ᱢᱟᱨᱟᱝ ᱫᱟᱨᱮ ᱨᱮᱭᱟᱜ ᱧᱩᱛᱩᱢ ᱚᱞ ᱢᱮ:'
        ],
        flashcards: [
          { termHindi: 'पौधा', termTargetScript: 'ᱫᱟᱨᱮ', termTargetLatin: 'Dare', phonetic: '/da.re/', exampleSentence: 'ᱫᱟᱨᱮ ᱫᱚ ᱦᱟᱹᱨᱤᱭᱟᱹᱲ ᱜᱮᱭᱟ᱾' },
          { termHindi: 'पत्ता', termTargetScript: 'ᱥᱟᱠᱟᱢ', termTargetLatin: 'Sakam', phonetic: '/sa.kam/', exampleSentence: 'ᱫᱟᱨᱮ ᱨᱮ ᱥᱟᱠᱟᱢ ᱢᱮᱱᱟᱜ-ᱟ᱾' },
          { termHindi: 'जड़', termTargetScript: 'ᱨᱮᱦᱮᱫ', termTargetLatin: 'Rehed', phonetic: '/re.hed/', exampleSentence: 'ᱨᱮᱦᱮᱫ ᱫᱚ ᱦᱟᱥᱟ ᱵᱷᱤᱛᱨᱤ ᱨᱮ ᱛᱟᱦᱮᱸᱱᱟ᱾' },
          { termHindi: 'पानी', termTargetScript: 'ᱫᱟᱜ', termTargetLatin: 'Daag', phonetic: '/daɡ/', exampleSentence: 'ᱫᱟᱨᱮ ᱨᱮ ᱫᱟᱜ ᱫᱩᱞ ᱢᱮ᱾' }
        ],
        taskTargetLang: 'ᱚᱲᱟᱜ ᱥᱩᱨ ᱨᱮᱭᱟᱜ ᱵᱟᱨ ᱞᱮᱠᱟᱱ ᱫᱟᱨᱮ ᱥᱟᱠᱟᱢ ᱠᱷᱟᱛᱟ ᱨᱮ ᱞᱟᱴᱷᱟᱭ ᱢᱮ ᱟᱨ ᱧᱩᱛᱩᱢ ᱚᱞ ᱢᱮ᱾'
      },
      hoc: {
        objTarget: `𑢹𑣉 𑣎𑣋𑣜: ᱫᱟᱨᱩ (Daru) ᱨᱮᱭᱟᱜ ᱦᱟᱹᱴᱤᱧ ᱠᱚ (ᱨᱮᱦᱮᱫ, ᱥᱟᱠᱟᱢ, ᱵᱟᱦᱟ, ᱡᱚ) ᱪᱤᱱᱦᱟᱹᱣ ᱟᱨ ᱠᱟᱹᱢᱤ ᱵᱟᱰᱟᱭ᱾`,
        introTarget: `ᱛᱮᱦᱮᱧ ᱫᱚ ᱟᱵᱩ ᱦᱟᱛᱩ ᱨᱮᱭᱟᱜ ᱥᱟᱨᱡᱚᱢ ᱟᱨ ᱢᱟᱛᱠᱚᱢ ᱫᱟᱨᱩ ᱵᱟᱵᱚᱛ ᱵᱚᱱ ᱪᱮᱫ-ᱟ᱾`,
        explTargetScript: `ᱫᱟᱨᱩ ᱫᱚ ᱟᱵᱩᱣᱟᱜ ᱡᱤᱣᱤ ᱜᱟᱛᱮ ᱛᱟᱱᱟ᱾ ᱨᱮᱦᱮᱫ ᱫᱚ ᱦᱟᱥᱟ ᱠᱷᱚᱱ ᱫᱟᱜ ᱮ ᱦᱟᱛᱟᱣᱟ ᱟᱨ ᱥᱟᱠᱟᱢ ᱡᱚᱢᱟᱜ ᱮ ᱵᱟᱭ-ᱟ᱾`,
        explTargetLatin: `Daru do abuwag jiwi gate tana. Rehed do hasa khon daag e hatawa ar sakam jomag e bay-a.`,
        localExDescTarget: `ᱦᱟᱛᱩ ᱨᱮ ᱥᱟᱨᱡᱚᱢ ᱟᱨ ᱢᱟᱛᱠᱚᱢ ᱫᱟᱨᱩ: ᱨᱮᱦᱮᱫ ᱦᱟᱥᱟ ᱠᱮᱴᱮᱡ ᱛᱮ ᱥᱟᱵ ᱫᱚᱦᱚᱭᱟ ᱟᱨ ᱥᱟᱠᱟᱢ ᱡᱤᱣᱤ ᱦᱚᱭ ᱮᱢᱚᱜ-ᱟ᱾`,
        activityTitle: 'पेड़-पत्तियों का अवलोकन (Ho: Sakam)',
        instructionsTargetLang: 'ᱦᱟᱛᱩ ᱵᱟᱦᱨᱮ ᱥᱮᱱ ᱠᱟᱛᱮ ᱥᱟᱨᱡᱚᱢ ᱟᱨ ᱢᱟᱛᱠᱚᱢ ᱥᱟᱠᱟᱢ ᱧᱮᱞ ᱯᱮ᱾',
        steps: [
          { stepNumber: 1, hindi: 'जड़: जमीन से जल व खनिज खींचना', targetLang: 'ᱨᱮᱦᱮᱫ: ᱦᱟᱥᱟ ᱠᱷᱚᱱ ᱫᱟᱜ ᱦᱟᱛᱟᱣ (Rehed)' },
          { stepNumber: 2, hindi: 'तना: पौधे को सहारा देना', targetLang: 'ᱰᱟᱹᱨ: ᱫᱟᱨᱩ ᱥᱚᱡᱷᱮ ᱫᱚᱦᱚ (Daar)' },
          { stepNumber: 3, hindi: 'पत्ती: भोजन तैयार करना', targetLang: 'ᱥᱟᱠᱟᱢ: ᱥᱤᱧ ᱪᱟᱸᱫᱚ ᱨᱮ ᱡᱚᱢᱟᱜ ᱵᱟᱭ (Sakam)' }
        ],
        q1: 'ᱫᱟᱨᱩ ᱨᱮᱭᱟᱜ ᱚᱠᱟ ᱦᱟᱹᱴᱤᱧ ᱦᱟᱥᱟ ᱵᱷᱤᱛᱨᱤ ᱨᱮ ᱛᱟᱦᱮᱸᱱᱟ?',
        q1Opts: ['ᱥᱟᱠᱟᱢ (Leaf)', 'ᱨᱮᱦᱮᱫ (Root)', 'ᱵᱟᱦᱟ (Flower)', 'ᱰᱟᱹᱨ (Stem)'],
        q2: 'ᱥᱟᱠᱟᱢ ᱫᱚ ᱪᱮᱫ ᱜᱚᱲᱚ ᱛᱮ ᱡᱚᱢᱟᱜ ᱮ ᱵᱟᱭ-ᱟ?',
        q2Opts: ['ᱥᱤᱧ ᱪᱟᱸᱫᱚ ᱟᱨ ᱫᱟᱜ', 'ᱦᱚᱭ', 'ᱫᱷᱤᱨᱤ', 'ᱩᱢᱩᱞ'],
        worksheetInstr: 'ᱦᱳ ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱠᱚ: ᱡᱚᱛᱚ ᱠᱩᱠᱞᱤ ᱢᱚᱱᱮ ᱮᱢ ᱠᱟᱛᱮ ᱯᱟᱲᱦᱟᱣ ᱯᱮ ᱟᱨ ᱛᱮᱞᱟ ᱚᱞ ᱯᱮ:',
        wPrompts: [
          '1. ᱫᱟᱨᱩ ᱨᱮᱭᱟᱜ ᱨᱮᱦᱮᱫ ᱪᱮᱫ ᱠᱟᱹᱢᱤ ᱮᱫ-ᱟ?',
          '2. ᱥᱟᱠᱟᱢ ᱪᱮᱫ ᱞᱮᱠᱟᱛᱮ ᱡᱚᱢᱟᱜ ᱮ ᱵᱟᱭ-ᱟ?',
          '3. ᱟᱢᱟᱜ ᱦᱟᱛᱩ ᱨᱮ ᱢᱮᱱᱟᱜ ᱵᱟᱨᱭᱟ ᱫᱟᱨᱩ ᱨᱮᱭᱟᱜ ᱧᱩᱛᱩᱢ ᱚᱞ ᱢᱮ:'
        ],
        flashcards: [
          { termHindi: 'पेड़ / पौधा', termTargetScript: 'ᱫᱟᱨᱩ (Daru)', termTargetLatin: 'Daru', phonetic: '/da.ru/', exampleSentence: 'ᱫᱟᱨᱩ ᱟᱵᱩᱠᱮ ᱩᱢᱩᱞ ᱟᱨ ᱡᱚ ᱮᱢᱚᱜ-ᱟ᱾' },
          { termHindi: 'पत्ता', termTargetScript: 'ᱥᱟᱠᱟᱢ (Sakam)', termTargetLatin: 'Sakam', phonetic: '/sa.kam/', exampleSentence: 'ᱥᱟᱠᱟᱢ ᱥᱤᱧ ᱪᱟᱸᱫᱚ ᱨᱮ ᱡᱚᱢᱟᱜ ᱮ ᱵᱟᱭ-ᱟ᱾' },
          { termHindi: 'जड़', termTargetScript: 'ᱨᱮᱦᱮᱫ (Rehed)', termTargetLatin: 'Rehed', phonetic: '/re.hed/', exampleSentence: 'ᱨᱮᱦᱮᱫ ᱦᱟᱥᱟ ᱠᱷᱚᱱ ᱫᱟᱜ ᱮ ᱦᱟᱛᱟᱣᱟ᱾' },
          { termHindi: 'फूल', termTargetScript: 'ᱵᱟᱦᱟ (Baha)', termTargetLatin: 'Baha', phonetic: '/ba.ha/', exampleSentence: 'ᱵᱟᱦᱟ ᱟᱹᱰᱤ ᱪᱮᱦᱨᱟ ᱧᱮᱞᱚᱜ-ᱟ᱾' }
        ],
        taskTargetLang: 'ᱦᱟᱛᱩ ᱥᱩᱨ ᱨᱮᱭᱟᱜ ᱵᱟᱨ ᱞᱮᱠᱟᱱ ᱫᱟᱨᱩ ᱥᱟᱠᱟᱢ ᱠᱷᱟᱛᱟ ᱨᱮ ᱞᱟᱴᱷᱟᱭ ᱢᱮ᱾'
      },
      unr: {
        objTarget: `ᱢᱩᱱᱰᱟᱨᱤ: ᱫᱟᱨᱩ ᱨᱮᱭᱟᱜ ᱦᱟᱹᱴᱤᱧ ᱠᱚ (ᱨᱮᱦᱮᱫ, ᱥᱟᱠᱟᱢ, ᱵᱟᱦᱟ, ᱡᱚ) ᱪᱤᱱᱦᱟᱹᱣ ᱟᱨ ᱠᱟᱹᱢᱤ ᱵᱟᱰᱟᱭ᱾`,
        introTarget: `ᱛᱮᱦᱮᱧ ᱫᱚ ᱟᱵᱩ ᱦᱟᱛᱩ ᱨᱮᱭᱟᱜ ᱫᱟᱨᱩ-ᱱᱟᱹᱲᱤ ᱵᱟᱵᱚᱛ ᱵᱚᱱ ᱪᱮᱫ-ᱟ᱾`,
        explTargetScript: `ᱫᱟᱨᱩ ᱟᱵᱩᱣᱟᱜ ᱢᱟᱨᱟᱝ ᱜᱟᱛᱮ ᱛᱟᱱᱟ᱾ ᱨᱮᱦᱮᱫ ᱫᱚ ᱫᱟᱜ ᱮ ᱚᱨ-ᱟ ᱟᱨ ᱥᱟᱠᱟᱢ ᱫᱚ ᱥᱤᱧ ᱪᱟᱸᱫᱚ ᱨᱮ ᱡᱚᱢᱟᱜ ᱮ ᱵᱮᱱᱟᱣᱟ᱾`,
        explTargetLatin: `Daru abuwag marang gate tana. Rehed do daag e or-a ar sakam do siñ cando re jomag e benawa.`,
        localExDescTarget: `ᱦᱟᱛᱩ ᱨᱮ ᱢᱟᱛᱠᱚᱢ ᱟᱨ ᱠᱚᱨᱚᱧᱡᱽ ᱫᱟᱨᱩ ᱨᱮᱭᱟᱜ ᱨᱮᱦᱮᱫ ᱫᱟᱜ ᱦᱟᱛᱟᱣᱟ ᱟᱨ ᱥᱟᱠᱟᱢ ᱡᱚᱢᱟᱜ ᱵᱮᱱᱟᱣᱟ᱾`,
        activityTitle: 'मुंडारी: पत्ती व जड़ का निरीक्षण',
        instructionsTargetLang: 'ᱦᱟᱛᱩ ᱨᱮ ᱢᱟᱛᱠᱚᱢ ᱟᱨ ᱥᱟᱨᱡᱚᱢ ᱥᱟᱠᱟᱢ ᱡᱟᱣᱨᱟ ᱠᱟᱛᱮ ᱧᱮᱞ ᱯᱮ᱾',
        steps: [
          { stepNumber: 1, hindi: 'जड़: जल सोखना', targetLang: 'ᱨᱮᱦᱮᱫ: ᱦᱟᱥᱟ ᱠᱷᱚᱱ ᱫᱟᱜ ᱚᱨ' },
          { stepNumber: 2, hindi: 'तना: सहारा देना', targetLang: 'ᱰᱟᱹᱨ: ᱫᱟᱨᱩ ᱠᱮᱴᱮᱡ ᱫᱚᱦᱚ' },
          { stepNumber: 3, hindi: 'पत्ती: खाना बनाना', targetLang: 'ᱥᱟᱠᱟᱢ: ᱥᱤᱧ ᱪᱟᱸᱫᱚ ᱨᱮ ᱡᱚᱢᱟᱜ ᱵᱮᱱᱟᱣ' }
        ],
        q1: 'ᱫᱟᱨᱩ ᱨᱮᱭᱟᱜ ᱚᱠᱟ ᱦᱟᱹᱴᱤᱧ ᱦᱟᱥᱟ ᱵᱷᱤᱛᱨᱤ ᱨᱮ ᱛᱟᱦᱮᱸᱱᱟ?',
        q1Opts: ['ᱥᱟᱠᱟᱢ', 'ᱨᱮᱦᱮᱫ', 'ᱵᱟᱦᱟ', 'ᱰᱟᱹᱨ'],
        q2: 'ᱥᱟᱠᱟᱢ ᱪᱮᱫ ᱜᱚᱲᱚ ᱛᱮ ᱡᱚᱢᱟᱜ ᱮ ᱵᱮᱱᱟᱣᱟ?',
        q2Opts: ['ᱥᱤᱧ ᱪᱟᱸᱫᱚ ᱟᱨ ᱫᱟᱜ', 'ᱦᱚᱭ', 'ᱫᱷᱤᱨᱤ', 'ᱩᱢᱩᱞ'],
        worksheetInstr: 'ᱢᱩᱱᱰᱟᱨᱤ: ᱡᱚᱛᱚ ᱠᱩᱠᱞᱤ ᱢᱚᱱᱮ ᱮᱢ ᱠᱟᱛᱮ ᱯᱟᱲᱦᱟᱣ ᱯᱮ ᱟᱨ ᱛᱮᱞᱟ ᱚᱞ ᱯᱮ:',
        wPrompts: [
          '1. ᱫᱟᱨᱩ ᱨᱮᱭᱟᱜ ᱨᱮᱦᱮᱫ ᱪᱮᱫ ᱠᱟᱹᱢᱤ ᱮᱫ-ᱟ?',
          '2. ᱥᱟᱠᱟᱢ ᱪᱮᱫ ᱞᱮᱠᱟᱛᱮ ᱡᱚᱢᱟᱜ ᱮ ᱵᱮᱱᱟᱣᱟ?',
          '3. ᱟᱢᱟᱜ ᱦᱟᱛᱩ ᱨᱮ ᱢᱮᱱᱟᱜ ᱵᱟᱨᱭᱟ ᱫᱟᱨᱩ ᱨᱮᱭᱟᱜ ᱧᱩᱛᱩᱢ ᱚᱞ ᱢᱮ:'
        ],
        flashcards: [
          { termHindi: 'पेड़', termTargetScript: 'ᱫᱟᱨᱩ (Daru)', termTargetLatin: 'Daru', phonetic: '/da.ru/', exampleSentence: 'ᱫᱟᱨᱩ ᱦᱟᱛᱩ ᱨᱮᱭᱟᱜ ᱡᱤᱣᱤ ᱛᱟᱱᱟ᱾' },
          { termHindi: 'जड़', termTargetScript: 'ᱨᱮᱦᱮᱫ (Rehed)', termTargetLatin: 'Rehed', phonetic: '/re.hed/', exampleSentence: 'ᱨᱮᱦᱮᱫ ᱦᱟᱥᱟ ᱠᱷᱚᱱ ᱫᱟᱜ ᱮ ᱚᱨ-ᱟ᱾' },
          { termHindi: 'पत्ता', termTargetScript: 'ᱥᱟᱠᱟᱢ (Sakam)', termTargetLatin: 'Sakam', phonetic: '/sa.kam/', exampleSentence: 'ᱥᱟᱠᱟᱢ ᱥᱤᱧ ᱪᱟᱸᱫᱚ ᱨᱮ ᱡᱚᱢᱟᱜ ᱵᱮᱱᱟᱣᱟ᱾' },
          { termHindi: 'जल', termTargetScript: 'ᱫᱟᱜ (Daag)', termTargetLatin: 'Daag', phonetic: '/daɡ/', exampleSentence: 'ᱫᱟᱨᱩ ᱫᱚ ᱫᱟᱜ ᱛᱮ ᱦᱟᱨᱟᱜ-ᱟ᱾' }
        ],
        taskTargetLang: 'ᱦᱟᱛᱩ ᱥᱩᱨ ᱨᱮᱭᱟᱜ ᱫᱟᱨᱩ ᱥᱟᱠᱟᱢ ᱠᱷᱟᱛᱟ ᱨᱮ ᱞᱟᱴᱷᱟᱭ ᱢᱮ ᱟᱨ ᱧᱩᱛᱩᱢ ᱚᱞ ᱢᱮ᱾'
      },
      en: {
        objTarget: `Identify main parts of a plant (roots, stem, leaves, flower, fruit) and explain their vital physiological functions.`,
        introTarget: `Today we will discover the wonder of plants and trees using examples from our school and village surroundings.`,
        explTargetScript: `Plants are our life-sustaining companions. Roots absorb water and soil nutrients, while green leaves synthesize nutrition under sunlight.`,
        explTargetLatin: `Plants are our life-sustaining companions. Roots absorb water and soil nutrients, while green leaves synthesize nutrition under sunlight.`,
        localExDescTarget: `Observing the sacred Sal and Mahua trees in Jharkhand groves: deep roots conserve topsoil and prevent soil erosion.`,
        activityTitle: 'Fallen Leaves Collection and Leaf Vein Rubbing',
        instructionsTargetLang: 'Walk outside safely, gather 3 different varieties of fallen leaves, and study their shapes and vein patterns.',
        steps: [
          { stepNumber: 1, hindi: 'जड़: जमीन से जल व खनिज खींचना', targetLang: 'Roots: Draw water & mineral nutrients from soil' },
          { stepNumber: 2, hindi: 'तना: पौधे को सहारा देना', targetLang: 'Stem: Supports the tree & transports fluid sap' },
          { stepNumber: 3, hindi: 'पत्ती: सूर्य प्रकाश में भोजन बनाना', targetLang: 'Leaves: Produce plant food via photosynthesis' }
        ],
        q1: 'Which organ of a plant remains underground to absorb moisture?',
        q1Opts: ['Leaf', 'Root', 'Flower', 'Bark'],
        q2: 'What elements are vital for green leaves to prepare food?',
        q2Opts: ['Sunlight and Water', 'Only Air', 'Stones', 'Shade'],
        worksheetInstr: 'Read all botany questions attentively and record your deductions in your notebook:',
        wPrompts: [
          '1. Describe the key function of root hairs in absorbing ground water:',
          '2. Why are leaves called the biological kitchen of a plant?',
          '3. Name two local trees in your region that provide medicinal benefits:'
        ],
        flashcards: [
          { termHindi: 'पौधा', termTargetScript: 'Plant / Flora', termTargetLatin: 'Plant', phonetic: '/plɑːnt/', exampleSentence: 'Green plants synthesize food through photosynthesis.' },
          { termHindi: 'जड़', termTargetScript: 'Root System', termTargetLatin: 'Root', phonetic: '/ruːt/', exampleSentence: 'Roots anchor the tree firmly in the ground.' },
          { termHindi: 'पत्ता', termTargetScript: 'Green Leaf', termTargetLatin: 'Leaf', phonetic: '/liːf/', exampleSentence: 'Leaves absorb sunlight using chlorophyll pigments.' },
          { termHindi: 'पानी', termTargetScript: 'Water (H2O)', termTargetLatin: 'Water', phonetic: '/ˈwɔː.tər/', exampleSentence: 'Plants require clean water for cellular transport.' }
        ],
        taskTargetLang: 'Collect two distinct fallen leaves from near your home, press them in your workbook, and label their parts.'
      },
      hi: {
        objTarget: `पौधे के मुख्य अंगों (जड़, तना, पत्ती, फूल, फल) की पहचान और कार्य को समझना।`,
        introTarget: `आज हम अपने गाँव व विद्यालय के आस-पास पाए जाने वाले पेड़-पौधों के बारे में जानेंगे।`,
        explTargetScript: `पौधे हमारे सच्चे मित्र हैं। जड़ जमीन से पानी और पोषक तत्व खींचती है, और हरी पत्तियां धूप में भोजन बनाती हैं।`,
        explTargetLatin: `Paudhe hamare sacche mitra hain. Jad jameen se paani sokhti hai aur pattiyan dhoop mein bhojan banati hain.`,
        localExDescTarget: `गाँव के जामुन, साल (सखुआ) या महुआ के पेड़ को देखकर उसकी जड़ों और पत्तों का अवलोकन करना।`,
        activityTitle: 'पेड़-पत्ती संकलन व अवलोकन',
        instructionsTargetLang: 'कक्षा के बाहर जाकर 3 प्रकार के गिरे हुए पत्ते इकट्ठा करें और उनकी बनावट व शिराओं को देखें।',
        steps: [
          { stepNumber: 1, hindi: 'जड़: जमीन से जल व खनिज खींचना', targetLang: 'जड़: जमीन के भीतर जाकर पानी व खनिज सोखती है' },
          { stepNumber: 2, hindi: 'तना: पौधे को सहारा देना', targetLang: 'तना: पौधे को सीधा खड़ा रखता है और भोजन-पानी पहुँचाता है' },
          { stepNumber: 3, hindi: 'पत्ती: सूर्य प्रकाश में भोजन बनाना', targetLang: 'पत्ती: सूर्य के प्रकाश व पानी से भोजन तैयार करती है' }
        ],
        q1: 'पौधे का कौन सा भाग जमीन के अंदर रहकर पानी सोखता है?',
        q1Opts: ['पत्ती', 'जड़', 'फूल', 'तना'],
        q2: 'पत्तियां किसके सहयोग से पौधे के लिए भोजन बनाती हैं?',
        q2Opts: ['सूर्य का प्रकाश और पानी', 'केवल हवा', 'पत्थर', 'छाया'],
        worksheetInstr: 'सभी प्रश्नों को ध्यान से पढ़ें और उत्तर अपनी अभ्यास पुस्तिका में लिखें:',
        wPrompts: [
          '1. पौधे में जड़ का मुख्य कार्य क्या है?',
          '2. पत्तियों को पौधे की रसोई क्यों कहा जाता है?',
          '3. अपने गाँव में पाए जाने वाले किन्हीं दो उपयोगी वृक्षों के नाम व उपयोग लिखें:'
        ],
        flashcards: [
          { termHindi: 'पौधा', termTargetScript: 'पौधा / वृक्ष', termTargetLatin: 'Paudha', phonetic: '/pɔː.dʱaː/', exampleSentence: 'पौधे हमें शुद्ध हवा, छाया और फल प्रदान करते हैं।' },
          { termHindi: 'जड़', termTargetScript: 'जड़ (Root)', termTargetLatin: 'Jad', phonetic: '/dʒəɽ/', exampleSentence: 'जड़ जमीन से पानी और खनिज लवण सोखती है।' },
          { termHindi: 'पत्ता', termTargetScript: 'पत्ती (Leaf)', termTargetLatin: 'Patti', phonetic: '/pət̪.tiː/', exampleSentence: 'हरी पत्तियां सूर्य के प्रकाश में भोजन तैयार करती हैं।' },
          { termHindi: 'पानी', termTargetScript: 'जल / पानी', termTargetLatin: 'Paani', phonetic: '/paː.niː/', exampleSentence: 'पौधे को जीवित रहने के लिए नियमित पानी चाहिए।' }
        ],
        taskTargetLang: 'घर के पास से 2 अलग-अलग पेड़ों की पत्तियां अपनी कॉपी में चिपकाएं और उनके नाम हिंदी व स्थानीय भाषा में लिखें।'
      }
    };

    const isFractions = topicLower.includes('fraction') || topicLower.includes('भिन्न') || topicLower.includes('आधा') || topicLower.includes('अंश');

    if (!isPlants && !isFractions) {
      const { dict: curDict, diagramType } = resolveCurriculumTemplate(ctx);
      return {
        metadata: {
          grade: ctx.grade,
          subject: ctx.subject,
          topic: ctx.topic,
          targetLanguage: targetLang,
          generatedAt: new Date().toISOString(),
          provider: this.name,
          isOfflineGenerated: true
        },
        learningObjective: {
          hindi: curDict.objHindi,
          targetLang: curDict.objTarget
        },
        prerequisites: curDict.prerequisites || ['पूर्व कक्षा के बुनियादी शब्दों और परिवेश की समझ'],
        introduction: {
          hindi: curDict.introHindi,
          targetLang: curDict.introTarget
        },
        teacherExplanation: {
          originalHindi: curDict.explHindi,
          simplerHindi: curDict.explSimplerHindi,
          targetLangScript: curDict.explTargetScript,
          targetLangLatin: curDict.explTargetLatin
        },
        localExample: {
          contextType: ctx.localContext || 'VILLAGE',
          descriptionHindi: curDict.localExDescHindi,
          descriptionTargetLang: curDict.localExDescTarget
        },
        classroomActivity: {
          title: curDict.activityTitle,
          instructionsHindi: curDict.instructionsHindi,
          instructionsTargetLang: curDict.instructionsTargetLang,
          materialsNeeded: curDict.materialsNeeded || ['कक्षा सामग्री', 'कॉपी व पेंसिल']
        },
        visualExplanation: {
          diagramType: diagramType || 'CONCEPT_DIAGRAM',
          steps: curDict.steps
        },
        practiceQuestions: [
          {
            id: 'q1',
            questionHindi: curDict.q1Hindi,
            questionTargetLang: curDict.q1,
            optionsHindi: curDict.q1OptsHindi,
            optionsTargetLang: curDict.q1Opts,
            correctAnswer: curDict.q1Ans,
            explanation: curDict.q1Explanation
          },
          {
            id: 'q2',
            questionHindi: curDict.q2Hindi,
            questionTargetLang: curDict.q2,
            optionsHindi: curDict.q2OptsHindi,
            optionsTargetLang: curDict.q2Opts,
            correctAnswer: curDict.q2Ans,
            explanation: curDict.q2Explanation
          }
        ],
        worksheet: {
          title: curDict.worksheetTitle || `कक्षा ${ctx.grade} ${ctx.subject}: ${ctx.topic} कार्यपत्रक`,
          bilingualInstructions: curDict.worksheetInstr,
          exercises: (curDict.wPrompts || []).map((p: string, idx: number) => ({
            promptHindi: (curDict.wPromptsHindi && curDict.wPromptsHindi[idx]) || p,
            promptTargetLang: p,
            blankSpace: true
          }))
        },
        flashcards: curDict.flashcards,
        quiz: curDict.quiz || [
          {
            question: curDict.q1Hindi,
            options: curDict.q1OptsHindi || ['हाँ', 'नहीं'],
            correctIndex: 0
          }
        ],
        homework: {
          taskHindi: 'घर में परिवार के बुजुर्गों से इस विषय पर चर्चा करें व कॉपी में लिखें।',
          taskTargetLang: curDict.taskTargetLang,
          observationPrompt: 'अगली कक्षा में अपने अनुभव शिक्षक के साथ साझा करें।'
        },
        remediationSuggestions: [
          'कमजोर विद्यार्थियों को अमूर्त अवधारणाओं के बजाय वास्तविक स्थानीय वस्तुओं (कंकर, पत्ते, बीज) से अभ्यास कराएं।',
          `मातृभाषा (${targetLang.toUpperCase()}) में स्थानीय परिवेश के शब्दों का प्रयोग करके अवधारणा स्पष्ट करें।`
        ],
        blackboardSummary: curDict.blackboardSummary
      };
    }

    // Select suitable template dictionary for fractions or plants
    const dict = isPlants 
      ? (plantLangMap[targetLang] || plantLangMap['sat'])
      : (mathLangMap[targetLang] || mathLangMap['sat']);

    return {
      metadata: {
        grade: ctx.grade,
        subject: ctx.subject,
        topic: ctx.topic,
        targetLanguage: targetLang,
        generatedAt: new Date().toISOString(),
        provider: this.name,
        isOfflineGenerated: true
      },
      learningObjective: {
        hindi: isPlants 
          ? 'पौधे के मुख्य अंगों (जड़, तना, पत्ती, फूल, फल) की पहचान और कार्य समझना।'
          : `विद्यार्थी ${ctx.topic} की बुनियादी अवधारणा को समझ सकेंगे और दैनिक जीवन में उपयोग कर सकेंगे।`,
        targetLang: dict.objTarget
      },
      prerequisites: isPlants
        ? ['आस-पास के पेड़-पौधों को देखना व पहचानना', 'पेड़ से मिलने वाले फल-फूलों का अनुभव']
        : ['संख्याओं की बुनियादी पहचान', 'वस्तुओं को बराबर गिनना और समूह बनाना'],
      introduction: {
        hindi: isPlants
          ? 'आज हम अपने गाँव व विद्यालय के आस-पास पाए जाने वाले पेड़-पौधों के बारे में जानेंगे।'
          : `आज हम एक मजेदार उदाहरण से ${ctx.topic} के बारे में जानेंगे।`,
        targetLang: dict.introTarget
      },
      teacherExplanation: {
        originalHindi: isPlants
          ? 'पौधे हमारे मित्र हैं। जड़ जमीन से पानी सोखती है और पत्तियां धूप में भोजन बनाती हैं।'
          : 'जब किसी पूरी वस्तु को बराबर भागों में बांटा जाता है, तो प्रत्येक भाग को भिन्न कहते हैं।',
        simplerHindi: isPlants
          ? 'जैसे हम मुँह से खाना खाते हैं, वैसे पेड़ जड़ से पानी और पत्तियों से धूप लेते हैं।'
          : 'जैसे एक रोटी को दो बच्चों में आधा-आधा बराबर बांटना।',
        targetLangScript: dict.explTargetScript,
        targetLangLatin: dict.explTargetLatin
      },
      localExample: {
        contextType: ctx.localContext || 'VILLAGE',
        descriptionHindi: isPlants
          ? 'गाँव के जामुन या साल (सखुआ) के पेड़ को देखकर उसकी जड़ों और पत्तों का अवलोकन करना।'
          : 'गाँव में जब खेत की जुताई होती है या अमरूद को 4 दोस्तों में बराबर बांटा जाता है।',
        descriptionTargetLang: dict.localExDescTarget
      },
      classroomActivity: {
        title: dict.activityTitle,
        instructionsHindi: isPlants
          ? 'कक्षा के बाहर जाकर 3 प्रकार के गिरे हुए पत्ते इकट्ठा करें और उनकी बनावट देखें।'
          : 'एक चौकोर कागज़ लें। इसे बीच से मोड़कर दो बराबर हिस्से (1/2) करें।',
        instructionsTargetLang: dict.instructionsTargetLang,
        materialsNeeded: isPlants ? ['पेड़ के पत्ते', 'रंग/पेंसिल', 'कॉपी'] : ['रंगीन कागज़', 'स्केल', 'पेंसिल']
      },
      visualExplanation: {
        diagramType: isPlants ? 'PLANT_ANATOMY' : 'FRACTION_BAR',
        steps: dict.steps
      },
      practiceQuestions: [
        {
          id: 'q1',
          questionHindi: isPlants ? 'पौधे का कौन सा भाग जमीन के अंदर रहता है?' : 'यदि एक सेब को दो बराबर भागों में काटा जाए, तो एक भाग क्या कहलाएगा?',
          questionTargetLang: dict.q1,
          optionsHindi: isPlants ? ['पत्ती', 'जड़', 'फूल', 'तना'] : ['एक चौथाई (1/4)', 'आधा (1/2)', 'पूरा (1)', 'तीन चौथाई (3/4)'],
          optionsTargetLang: dict.q1Opts,
          correctAnswer: isPlants ? 'जड़' : 'आधा (1/2)',
          explanation: isPlants ? 'जड़ जमीन से पानी और पोषक तत्व खींचती है।' : 'किसी वस्तु के दो बराबर भागों में से प्रत्येक 1/2 होता है।'
        },
        {
          id: 'q2',
          questionHindi: isPlants ? 'पत्तियों का हरा रंग किसके कारण भोजन बनाने में मदद करता है?' : 'भिन्न 3/4 में अंश (Numerator) कौन सी संख्या है?',
          questionTargetLang: dict.q2,
          optionsHindi: isPlants ? ['सूर्य का प्रकाश और पानी', 'केवल हवा', 'पत्थर', 'छाया'] : ['3', '4', '7', '1'],
          optionsTargetLang: dict.q2Opts,
          correctAnswer: isPlants ? 'सूर्य का प्रकाश और पानी' : '3',
          explanation: isPlants ? 'पत्तियां धूप और पानी से भोजन तैयार करती हैं।' : 'ऊपर वाली संख्या को अंश कहते हैं।'
        }
      ],
      worksheet: {
        title: `कक्षा ${ctx.grade} ${ctx.subject}: ${ctx.topic} द्विभाषी कार्यपत्रक`,
        bilingualInstructions: dict.worksheetInstr,
        exercises: [
          { promptHindi: isPlants ? '1. पौधे में जड़ का मुख्य कार्य क्या है?' : '1. चित्र देखकर रेखांकित भाग की भिन्न लिखिए:', promptTargetLang: dict.wPrompts[0], blankSpace: true },
          { promptHindi: isPlants ? '2. पत्तियों को पौधे की रसोई क्यों कहा जाता है?' : '2. 1/2 और 2/4 में क्या संबंध है?', promptTargetLang: dict.wPrompts[1], blankSpace: true },
          { promptHindi: isPlants ? '3. अपने गाँव के 2 उपयोगी वृक्षों के नाम लिखें:' : '3. अपने गाँव के 2 ऐसे उदाहरण लिखिए जहाँ आप चीज़ों को बराबर बांटते हैं:', promptTargetLang: dict.wPrompts[2], blankSpace: true }
        ]
      },
      flashcards: dict.flashcards,
      quiz: [
        {
          question: isPlants ? 'पौधे को जीवित रहने के लिए क्या चाहिए?' : '1/2 + 1/2 मिलकर क्या बनता है?',
          options: isPlants ? ['पानी और धूप', 'केवल अंधेरा', 'केवल प्लास्टिक', 'कुछ नहीं'] : ['1 पूरा', '2', '1/4', '0'],
          correctIndex: 0
        },
        {
          question: isPlants ? 'पेड़ की कौन सी चीज़ हम फल के रूप में खाते हैं?' : 'भिन्न 2/5 में हर (Denominator) क्या है?',
          options: isPlants ? ['आम/अमरूद', 'जड़', 'पत्ते', 'लकड़ी'] : ['5', '2', '10', '3'],
          correctIndex: 0
        }
      ],
      homework: {
        taskHindi: isPlants 
          ? 'घर के पास से 2 अलग-अलग पेड़ों की पत्तियां अपनी कॉपी में चिपकाएं और उनके नाम लिखें।'
          : 'घर में एक रोटी या फल को 4 बराबर भागों में काटकर परिवार के साथ देखें। प्रत्येक हिस्से को भिन्न में लिखें।',
        taskTargetLang: dict.taskTargetLang,
        observationPrompt: 'अगली कक्षा में अपने अनुभव शिक्षक के साथ साझा करें।'
      },
      remediationSuggestions: [
        'कमजोर विद्यार्थियों को अमूर्त संख्याओं के बजाय तीलियों या बीजों से समूह बनाकर सिखाएं।',
        `मातृभाषा (${targetLang.toUpperCase()}) में स्थानीय परिवेश के शब्दों का प्रयोग करके वास्तविक वस्तुओं से अभ्यास कराएं।`
      ]
    };
  }

  public async explainAgain(ctx: EducationalPromptContext, currentText: string, level: 'SIMPLER' | 'VILLAGE_EXAMPLE' | 'VISUAL') {
    const targetLang = (ctx.targetLanguage || 'sat').toLowerCase();
    const topic = (ctx.topic || '').toLowerCase();
    const isPlants = topic.includes('plant') || topic.includes('पौधा') || topic.includes('पेड़') || (ctx.subject || '').toLowerCase().includes('science') || (ctx.subject || '').toLowerCase().includes('evs');

    if (isPlants) {
      if (targetLang === 'hoc') {
        if (level === 'SIMPLER') {
          return {
            explanationHindi: `पौधे हमारे सच्चे मित्र हैं। जड़ जमीन से पानी और खनिज सोखती है, और पत्तियां धूप से भोजन बनाती हैं।`,
            explanationTargetLang: `ᱫᱟᱨᱩ ᱫᱚ ᱟᱵᱩᱣᱟᱜ ᱡᱤᱣᱤ ᱜᱟᱛᱮ ᱛᱟᱱᱟ᱾ ᱨᱮᱦᱮᱫ ᱫᱚ ᱦᱟᱥᱟ ᱠᱷᱚᱱ ᱫᱟᱜ ᱮ ᱦᱟᱛᱟᱣᱟ ᱟᱨ ᱥᱟᱠᱟᱢ ᱡᱚᱢᱟᱜ ᱮ ᱵᱟᱭ-ᱟ᱾`,
            example: `ᱫᱟᱨᱩ (पेड़) = ᱨᱮᱦᱮᱫ (जड़) + ᱥᱟᱠᱟᱢ (पत्ती) + ᱵᱟᱦᱟ (फूल)`
          };
        } else if (level === 'VILLAGE_EXAMPLE') {
          return {
            explanationHindi: `गाँव में साल (सरजोम) और महुआ (मातकोम) के पेड़ देखें: जड़ें मिट्टी को जकड़ कर रखती हैं और पत्तियां हवा को शुद्ध करती हैं।`,
            explanationTargetLang: `ᱦᱟᱛᱩ ᱨᱮ ᱥᱟᱨᱡᱚᱢ ᱟᱨ ᱢᱟᱛᱠᱚᱢ ᱫᱟᱨᱩ: ᱨᱮᱦᱮᱫ ᱦᱟᱥᱟ ᱠᱮᱴᱮᱡ ᱛᱮ ᱥᱟᱵ ᱫᱚᱦᱚᱭᱟ ᱟᱨ ᱥᱟᱠᱟᱢ ᱡᱤᱣᱤ ᱦᱚᱭ ᱮᱢᱚᱜ-ᱟ᱾`,
            example: `सरजोम (साल) वृक्ष गाँव को शीतल छाया और शुद्ध वायु प्रदान करता है।`
          };
        } else {
          return {
            explanationHindi: `चित्र द्वारा समझ: जड़ -> तना -> पत्ती -> फूल और फल। जड़ें नीचे पानी पीती हैं और पत्तियां ऊपर भोजन पकाती हैं।`,
            explanationTargetLang: `ᱪᱤᱛᱟᱹᱨ: [ ᱨᱮᱦᱮᱫ (Rehed) ] -> [ ᱰᱟᱹᱨ (Daar) ] -> [ ᱥᱟᱠᱟᱢ (Sakam) ] -> [ ᱡᱚ (Joo) ]`,
            example: `[ 🌿 जड़ें ] -> [ 🪵 तना ] -> [ 🍃 पत्ती ] -> [ 🍎 फल ]`
          };
        }
      } else if (targetLang === 'unr') {
        if (level === 'SIMPLER') {
          return {
            explanationHindi: `पौधे हमारे जीवन के रक्षक हैं। जड़ें भूमि से जल खींचती हैं और पत्तियां सूर्य प्रकाश में खाना बनाती हैं।`,
            explanationTargetLang: `ᱫᱟᱨᱩ ᱟᱵᱩᱣᱟᱜ ᱢᱟᱨᱟᱝ ᱜᱟᱛᱮ ᱛᱟᱱᱟ᱾ ᱨᱮᱦᱮᱫ ᱫᱚ ᱫᱟᱜ ᱮ ᱚᱨ-ᱟ ᱟᱨ ᱥᱟᱠᱟᱢ ᱫᱚ ᱥᱤᱧ ᱪᱟᱸᱫᱚ ᱨᱮ ᱡᱚᱢᱟᱜ ᱮ ᱵᱮᱱᱟᱣᱟ᱾`,
            example: `ᱫᱟᱨᱩ (Daru) = ᱨᱮᱦᱮᱫ (Roots) + ᱥᱟᱠᱟᱢ (Leaves)`
          };
        } else if (level === 'VILLAGE_EXAMPLE') {
          return {
            explanationHindi: `गाँव के अखड़ा और बगीचे में महुआ और करंज के वृक्ष देखें। जड़ें जमीन के जल को सुरक्षित रखती हैं।`,
            explanationTargetLang: `ᱦᱟᱛᱩ ᱨᱮ ᱢᱟᱛᱠᱚᱢ ᱟᱨ ᱠᱚᱨᱚᱧᱡᱽ ᱫᱟᱨᱩ ᱨᱮᱭᱟᱜ ᱨᱮᱦᱮᱫ ᱫᱟᱜ ᱦᱟᱛᱟᱣᱟ ᱟᱨ ᱥᱟᱠᱟᱢ ᱡᱚᱢᱟᱜ ᱵᱮᱱᱟᱣᱟ᱾`,
            example: `गाँव का बगीचा = जीवनदायिनी शुद्ध वायु और छाया`
          };
        } else {
          return {
            explanationHindi: `चित्र द्वारा समझ: पौधे का भूमिगत अंग जड़ कहलाता है और वायवीय अंग तना व पत्तियां।`,
            explanationTargetLang: `ᱪᱤᱛᱟᱹᱨ: [ ᱨᱮᱦᱮᱫ (Rehed) ] -> [ ᱰᱟᱹᱨ (Daar) ] -> [ ᱥᱟᱠᱟᱢ (Sakam) ] -> [ ᱵᱟᱦᱟ (Baha) ]`,
            example: `[ भूमिगत जड़ ] -> [ तना ] -> [ हरी पत्तियां ]`
          };
        }
      } else if (targetLang === 'kru') {
        if (level === 'SIMPLER') {
          return {
            explanationHindi: `पौधे हमारे सच्चे मित्र हैं। जड़ जमीन से पानी सोखती है और पत्तियां धूप में भोजन बनाती हैं।`,
            explanationTargetLang: `मन-मसान नमहै दाऊ संगी तली। जड़ खेखेल ती अम ओन्ना, आर अतंग बिरी पचे ओना-ओखना कमआना।`,
            example: `मन (पेड़) = जड़ (जड़) + अतंग (पत्ती) + पूंप (फूल)`
          };
        } else if (level === 'VILLAGE_EXAMPLE') {
          return {
            explanationHindi: `गाँव के अखड़ा और जंगल में साल और महुआ के पेड़ देखें: जड़ें भूमि के जल को रोकती हैं और पत्तियां हवा को शुद्ध करती हैं।`,
            explanationTargetLang: `पद्दारनू करंज अरा महुवा मन: जड़ खेखेल ता अमन सम्भड़आना अरा अतंग दाऊ बेयसी चीई।`,
            example: `करंज अरा महुवा = पद्दा ता जीउ-जान`
          };
        } else {
          return {
            explanationHindi: `चित्र द्वारा समझ: जड़ -> तना -> पत्ती -> फूल और फल।`,
            explanationTargetLang: `चित्र ती बुझुरना: [ जड़ (जड़) ] -> [ डांड़ (तना) ] -> [ अतंग (पत्ती) ] -> [ पूंप/खंजपा (फूल/फल) ]`,
            example: `[ 🌿 जड़ ] -> [ 🪵 डांड़ ] -> [ 🍃 अतंग ] -> [ 🍎 खंजपा ]`
          };
        }
      } else if (targetLang === 'kyw') {
        if (level === 'SIMPLER') {
          return {
            explanationHindi: `गाछ-बिरिछ हमराकेर साँचा सङ्गी हेके। जड़ माटी ले पानि टाने आउर पात रइद ले खाना बनावे।`,
            explanationTargetLang: `गाछ-बिरिछ हमराकेर साँचा सङ्गी हेके। जड़ माटी ले पानि टाने आउर पात रइद ले खाना बनावे।`,
            example: `गाछ (पेड़) = जड़ + डार (डाली) + पात (पत्ता)`
          };
        } else if (level === 'VILLAGE_EXAMPLE') {
          return {
            explanationHindi: `गाँवेक साखुवा आर महुवा गाछ देखल: जड़ माटी के धइर राखे आर पात शीतल बतास देवे।`,
            explanationTargetLang: `गाँवेक साखुवा आर महुवा गाछ: जड़ माटी के बांधि राखे आर पात निर्मल बतास देवे।`,
            example: `साखुवा गाछ = गाँवेक प्राण`
          };
        } else {
          return {
            explanationHindi: `चितिरे बुझा: जड़ -> डांड़ -> पात -> फूल आर फल।`,
            explanationTargetLang: `चितिरे बुझा: [ जड़ ] -> [ डांड़ ] -> [ पात ] -> [ फल ]`,
            example: `[ 🌿 जड़ ] -> [ 🪵 डांड़ ] -> [ 🍃 पात ] -> [ 🍎 फल ]`
          };
        }
      } else if (targetLang === 'kru') {
        if (level === 'SIMPLER') {
          return {
            explanationHindi: `कुड़ुख़ में समझें: किसी पूरी चीज़ को साथियों में बराबर-बराबर बांटना ही भिन्न है। जैसे 1 अमरुद को 2 बच्चों में बांटना (1/2 = आधका)।`,
            explanationTargetLang: `कुड़ुख़ ती: एन्द्राना हों संगी-जोहार गुठी मंझी बांटे नन्ना गने भिन्न बानर। १/२ मने आधका (आधा)।`,
            example: `1/2 = आधा हिस्सा (कुड़ुख़: आधका / Adhka)`
          };
        } else if (level === 'VILLAGE_EXAMPLE') {
          return {
            explanationHindi: `गाँव का उदाहरण: 1 टोकरी महुआ 3 परिवारों में बराबर बांटने पर हर परिवार को 1/3 हिस्सा मिलेगा।`,
            explanationTargetLang: `पद्दा ता उदाहरण: १ दोउरा महुवा ३ घोरनू बराबर बांटके, जोंक-जोंक १/३ हिस्सा खखरो।`,
            example: `1 टोकरी महुआ = 3 बराबर हिस्से = प्रत्येक को 1/3`
          };
        } else {
          return {
            explanationHindi: `चित्र द्वारा समझ: एक गोल रोटी को बीच से आधा काटने पर 2 बराबर भाग बनते हैं (1/2 + 1/2 = 1)।`,
            explanationTargetLang: `चित्र ती: १ गोल रोटिन मंझी ती कोच्चा ले २ भाग मनि (1/2 + 1/2 = 1)।`,
            example: `[ ◯ ] -> [ ◐ (1/2) | ◑ (1/2) ] = 1`
          };
        }
      } else if (targetLang === 'kyw') {
        if (level === 'SIMPLER') {
          return {
            explanationHindi: `कुड़मालि में समझें: कोनो चीज के सङ्गी-साथी माँझे बराबर बाँटबाइ भिन्न हेके। १/२ माने आधा भाग।`,
            explanationTargetLang: `कुड़मालि ते: कोनो चीज के बराबर बाँटबाइ भिन्न हेके। १/२ माने आधा बाँटा (1/2 = आधा)।`,
            example: `1/2 = आधा बाँटा (कुड़मालि: Tala/Adha)`
          };
        } else if (level === 'VILLAGE_EXAMPLE') {
          return {
            explanationHindi: `गाँवक उदाहरण: जब ३ भाई मिलि के १ खेत बराबर चास करे, तबे हर भाई केर हिस्सा १/३ हवे।`,
            explanationTargetLang: `गाँवक उदाहरण: ३ भाई मिलि के १ खेत बराबर चास करे, तबे सबकर हिस्सा १/३ हेके।`,
            example: `1 खेत = 3 बराबर हिस्सा = 1/3 प्रत्येक`
          };
        } else {
          return {
            explanationHindi: `चितिरे बुझा: १ गोल रोटी के माँझे काटल ले २ बराबर बाँटा बने (1/2 + 1/2 = 1)।`,
            explanationTargetLang: `चितिरे बुझा: [ ◯ ] -> [ ◐ (1/2) | ◑ (1/2) ] = 1 पूरा`,
            example: `[ ◯ ] -> [ ◐ | ◑ ] (1/2 + 1/2 = 1)`
          };
        }
      } else if (targetLang === 'en') {
        if (level === 'SIMPLER') {
          return {
            explanationHindi: `पौधे हमारे जीवन के आधार हैं। जड़ें भूमि से जल खींचती हैं और पत्तियां सूर्य प्रकाश में खाना बनाती हैं।`,
            explanationTargetLang: `Plants are our vital friends. Roots absorb water and minerals from soil, while green leaves prepare nourishment under sunlight.`,
            example: `Plant Anatomy = Roots (Water) + Stem (Transport) + Leaves (Food)`
          };
        } else if (level === 'VILLAGE_EXAMPLE') {
          return {
            explanationHindi: `गाँव के खेतों व वनों में साल और महुआ के पेड़ मिट्टी को बहने से रोकते हैं और शुद्ध वायु देते हैं।`,
            explanationTargetLang: `In village sacred groves (Jaherthan), Sal and Mahua tree roots anchor deep soil preventing erosion while leaves breathe clean air.`,
            example: `Sal & Mahua trees sustain Jharkhand village ecology and ground water table.`
          };
        } else {
          return {
            explanationHindi: `चित्र द्वारा समझ: जड़ -> तना -> पत्ती -> फूल और फल।`,
            explanationTargetLang: `Visual Diagram: [ Roots (Underground) ] ---> [ Stem (Trunk) ] ---> [ Leaves (Solar Kitchen) ] ---> [ Fruit ]`,
            example: `Diagram: Roots absorb H2O -> Xylem carries sap -> Leaves conduct photosynthesis`
          };
        }
      } else if (targetLang === 'hi') {
        if (level === 'SIMPLER') {
          return {
            explanationHindi: `पौधे हमारे सच्चे मित्र हैं। जड़ जमीन से पानी सोखती है और पत्तियां धूप में भोजन बनाती हैं।`,
            explanationTargetLang: `पौधे हमारे सच्चे मित्र हैं। जड़ें भूमि से जल व खनिज खींचती हैं और पत्तियां सूर्य के प्रकाश में भोजन तैयार करती हैं।`,
            example: `पौधा = जड़ (भूमिगत) + तना (सहारा) + पत्ती (रसोई)`
          };
        } else if (level === 'VILLAGE_EXAMPLE') {
          return {
            explanationHindi: `गाँव के जाहेरथान व खेतों में साल और महुआ के पेड़ मिट्टी को बहने से रोकते हैं और शीतल छाया देते हैं।`,
            explanationTargetLang: `गाँव के खेतों और जंगलों में साल (सखुआ) व महुआ के वृक्ष देखें: इनकी जड़ें मिट्टी को जकड़े रखती हैं और पत्तियां हवा को शुद्ध बनाती हैं।`,
            example: `साल व महुआ = गाँव की प्राणवायु और जल संरक्षण के आधार`
          };
        } else {
          return {
            explanationHindi: `चित्र द्वारा समझ: जड़ें जमीन के नीचे पानी सोखती हैं और पत्तियां ऊपर सूर्य से ऊर्जा लेती हैं।`,
            explanationTargetLang: `चित्र द्वारा संरचना: [ जड़ें (भूमिगत जल अवशोषण) ] ---> [ तना (रस परिवहन) ] ---> [ पत्तियां (भोजन निर्माण) ]`,
            example: `[ 🌿 जड़ें ] -> [ 🪵 तना ] -> [ 🍃 पत्ती ] -> [ 🍎 फल ]`
          };
        }
      } else {
        // Santhali default
        if (level === 'SIMPLER') {
          return {
            explanationHindi: `पौधे हमारे सच्चे मित्र हैं। जड़ जमीन से पानी सोखती है और पत्तियां धूप में भोजन बनाती हैं।`,
            explanationTargetLang: `ᱫᱟᱨᱮ ᱫᱚ ᱟᱵᱚᱨᱤᱱ ᱥᱟᱹᱨᱤ ᱜᱟᱛᱮ ᱠᱟᱱᱟ ᱠᱚ᱾ ᱨᱮᱦᱮᱫ ᱫᱚ ᱦᱟᱥᱟ ᱠᱷᱚᱱ ᱫᱟᱜ ᱮ ᱚᱨ-ᱟ ᱟᱨ ᱥᱟᱠᱟᱢ ᱫᱚ ᱥᱤᱧ ᱪᱟᱸᱫᱚ ᱨᱮ ᱡᱚᱢᱟᱜ ᱮ ᱵᱮᱱᱟᱣᱟ᱾`,
            example: `ᱫᱟᱨᱮ (Dare) = ᱨᱮᱦᱮᱫ (Roots) + ᱰᱟᱹᱨ (Stem) + ᱥᱟᱠᱟᱢ (Leaves)`
          };
        } else if (level === 'VILLAGE_EXAMPLE') {
          return {
            explanationHindi: `गाँव के जाहेरथान में सरजोम (साल) का पेड़ देखें: जड़ें गहरी जाकर पानी खींचती हैं और हरी पत्तियां शीतल हवा देती हैं।`,
            explanationTargetLang: `ᱟᱹᱛᱩ ᱨᱮ ᱡᱟᱦᱮᱨᱛᱷᱟᱱ ᱨᱮ ᱥᱟᱨᱡᱚᱢ ᱫᱟᱨᱮ ᱧᱮᱞ ᱯᱮ: ᱨᱮᱦᱮᱫ ᱜᱟᱹᱦᱤᱨ ᱦᱟᱥᱟ ᱠᱷᱚᱱ ᱫᱟᱜ ᱮ ᱚᱨ-ᱟ ᱟᱨ ᱥᱟᱠᱟᱢ ᱨᱮᱭᱟᱲ ᱦᱚᱭ ᱮᱢᱚᱜ-ᱟ᱾`,
            example: `ᱥᱟᱨᱡᱚᱢ ᱫᱟᱨᱮ = ᱟᱹᱛᱩ ᱨᱮᱭᱟᱜ ᱡᱤᱣᱤ`
          };
        } else {
          return {
            explanationHindi: `चित्र द्वारा समझ: जड़ें जमीन के नीचे पानी सोखती हैं और पत्तियां ऊपर सूर्य से ऊर्जा लेती हैं।`,
            explanationTargetLang: `ᱪᱤᱛᱟᱹᱨ ᱛᱮ ᱵᱩᱡᱷᱟᱹᱣ: [ ᱨᱮᱦᱮᱫ (Roots) ] -> [ ᱰᱟᱹᱨ (Stem) ] -> [ ᱥᱟᱠᱟᱢ (Leaves) ] -> [ ᱵᱟᱦᱟ ᱟᱨ ᱡᱚ (Flower & Fruit) ]`,
            example: `[ 🌿 ᱨᱮᱦᱮᱫ ] -> [ 🪵 ᱰᱟᱹᱨ ] -> [ 🍃 ᱥᱟᱠᱟᱢ ] -> [ 🍎 ᱡᱚ ]`
          };
        }
      }
    }

    // Default: Mathematics / Fractions / General
    if (targetLang === 'hoc') {
      if (level === 'SIMPLER') {
        return {
          explanationHindi: `इसे बहुत सरल शब्दों में समझें: किसी भी वस्तु को जब हम साथियों में बराबर-बराबर बांटते हैं, तो प्रत्येक भाग को भिन्न कहते हैं।`,
          explanationTargetLang: `𑢹𑣉 𑣎𑣋𑣜 ᱛᱮ: ᱡᱟᱦᱟᱸ ᱡᱤᱱᱤᱥ ᱵᱟᱨ ᱦᱚᱲ ᱛᱟᱞᱟ ᱨᱮ ᱥᱚᱢᱟᱱ ᱮᱢ ᱦᱟᱹᱴᱤᱧ ᱞᱮᱠᱷᱟᱱ ᱚᱱᱟ ᱦᱟᱹᱴᱤᱧ (Hating) ᱠᱚ ᱢᱮᱱᱟ᱾ ᱑/᱒ = ᱛᱟᱞᱟ (आधा)᱾`,
          example: `1/2 = आधा हिस्सा (हो भाषा: Tala / ᱛᱟᱞᱟ)`
        };
      } else if (level === 'VILLAGE_EXAMPLE') {
        return {
          explanationHindi: `गाँव का उदाहरण: जब 2 भाई मिलकर एक खेत में बराबर जुताई करते हैं, तो प्रत्येक भाई 1/2 हिस्सा जोतता है।`,
          explanationTargetLang: `ᱦᱟᱛᱩ ᱨᱮᱭᱟᱜ ᱫᱟᱹᱭᱠᱟᱹ: ᱦᱟᱛᱩ ᱨᱮ ᱵᱟᱨ ᱵᱚᱭᱦᱟ ᱢᱤᱫᱴᱟᱝ ᱠᱷᱮᱛ ᱥᱚᱢᱟᱱ ᱠᱤᱱ ᱥᱤ-ᱭᱟ᱾ ᱢᱤᱫ ᱦᱚᱲᱟᱜ ᱦᱟᱹᱴᱤᱧ ᱑/᱒ ᱦᱩᱭᱩᱜ-ᱟ᱾`,
          example: `1 खेत = 2 बराबर हिस्से = 1/2 + 1/2`
        };
      } else {
        return {
          explanationHindi: `चित्र द्वारा समझ: एक गोल रोटी के 2 टुकड़े करें। एक टुकड़ा = 1/2, दोनों मिलकर = 1 पूरी रोटी।`,
          explanationTargetLang: `ᱪᱤᱛᱟᱹᱨ: ᱢᱤᱫᱴᱟᱝ ᱜᱩᱞ ᱨᱩᱴᱤ ᱛᱟᱞᱟ ᱨᱮ ᱦᱟᱹᱴᱤᱧ ᱞᱮᱠᱷᱟᱱ ᱵᱟᱨ ᱦᱟᱹᱴᱤᱧ ᱦᱩᱭᱩᱜ-ᱟ (1/2 + 1/2 = 1)᱾`,
          example: `[ ◯ ] -> [ ◐ | ◑ ] (1/2 + 1/2 = 1)`
        };
      }
    } else if (targetLang === 'unr') {
      if (level === 'SIMPLER') {
        return {
          explanationHindi: `मुंडारी में समझें: किसी पूरी वस्तु को बराबर भागों में बांटना ही भिन्न कहलाता है। जैसे 1 अमरुद को 2 बच्चों में बांटना।`,
          explanationTargetLang: `ᱢᱩᱱᱰᱟᱨᱤ ᱛᱮ: ᱡᱟᱦᱟᱸᱱ ᱪᱤᱡ ᱜᱟᱛᱮ ᱠᱚ ᱥᱟᱶ ᱵᱟᱨᱟᱵᱟᱹᱨᱤ ᱦᱟᱹᱴᱤᱧ ᱞᱮᱨᱮ ᱚᱱᱟ ᱜᱮ ᱦᱟᱹᱴᱤᱧ ᱠᱚ ᱢᱮᱛᱟᱜ-ᱟ᱾ ᱑/᱒ ᱢᱮᱱᱞᱮᱠᱷᱟᱱ ᱛᱟᱞᱟ (आधा)᱾`,
          example: `1/2 = आधा हिस्सा (मुंडारी: Tala / ᱛᱟᱞᱟ)`
        };
      } else if (level === 'VILLAGE_EXAMPLE') {
        return {
          explanationHindi: `गाँव का उदाहरण: धान के खेत में जब 3 साथी मिलकर काम बांटते हैं, तो प्रत्येक का काम 1/3 हिस्सा होता है।`,
          explanationTargetLang: `ᱦᱟᱛᱩ ᱨᱮᱭᱟᱜ ᱫᱟᱹᱭᱠᱟᱹ: ᱦᱟᱛᱩ ᱨᱮ ᱯᱮ ᱦᱚᱲ ᱢᱤᱫᱴᱟᱝ ᱵᱟᱹᱫᱽ ᱥᱚᱢᱟᱱ ᱠᱚ ᱦᱟᱹᱴᱤᱧᱟ, ᱡᱚᱛᱚ ᱦᱚᱲᱟᱜ ᱑/᱓ ᱦᱟᱹᱴᱤᱧ᱾`,
          example: `1 खेत = 3 बराबर हिस्से = 1/3 + 1/3 + 1/3`
        };
      } else {
        return {
          explanationHindi: `चित्र द्वारा समझ: एक गोल रोटी को बीच से आधा काटने पर 2 बराबर भाग बनते हैं।`,
          explanationTargetLang: `ᱪᱤᱛᱟᱹᱨ: ᱜᱩᱞᱟᱹᱭ ᱨᱩᱴᱤ ᱛᱟᱞᱟ ᱨᱮ ᱠᱮᱪᱟᱜ ᱞᱮᱠᱷᱟᱱ ᱵᱟᱨ ᱦᱟᱹᱴᱤᱧ ᱦᱩᱭᱩᱜ-ᱟ (1/2 + 1/2 = 1)᱾`,
          example: `[ ◯ ] -> [ ◐ | ◑ ] (1/2 + 1/2 = 1)`
        };
      }
    } else if (targetLang === 'en') {
      if (level === 'SIMPLER') {
        return {
          explanationHindi: `इसे बहुत सरल शब्दों में समझें: किसी भी चीज़ को जब हम दोस्तों के बीच बराबर-बराबर बांटते हैं, तो वही भिन्न कहलाता है।`,
          explanationTargetLang: `In simplest terms: When a whole item is partitioned into equal shares, each share is a fraction. For example, sharing 1 guava equally between 2 learners gives 1/2 each.`,
          example: `1/2 = One half share (Equal parts: 1/2 + 1/2 = 1)`
        };
      } else if (level === 'VILLAGE_EXAMPLE') {
        return {
          explanationHindi: `गाँव का उदाहरण: धान के खेत में जब 3 भाई मिलकर बराबर जुताई का हिस्सा बांटते हैं, तो हर भाई का हिस्सा 1/3 होता है।`,
          explanationTargetLang: `Village Context: When 3 siblings jointly plow an agricultural plot with equal responsibility, each individual plows exactly 1/3 of the field.`,
          example: `1 Plot = 3 equal sections = 1/3 each`
        };
      } else {
        return {
          explanationHindi: `चित्र द्वारा समझ: एक गोल रोटी के चित्र को बीच से काटकर 2 टुकड़े बनाएं। एक टुकड़ा = 1/2, दोनों मिलकर = 1 पूरी रोटी।`,
          explanationTargetLang: `Visual Representation: Cut a circular disk into 2 equal semicircles. Each semicircle represents 1/2, summing up to 1 whole.`,
          example: `[ ◯ Full ] -> [ ◐ (1/2) | ◑ (1/2) ] = 1`
        };
      }
    } else if (targetLang === 'hi') {
      if (level === 'SIMPLER') {
        return {
          explanationHindi: `इसे बहुत सरल शब्दों में समझें: किसी भी वस्तु को जब हम साथियों में बराबर-बराबर बांटते हैं, तो प्रत्येक भाग को भिन्न कहते हैं। जैसे 1 अमरूद को 2 बच्चों में बांटना।`,
          explanationTargetLang: `भिन्न का अर्थ है बराबर बांटना: जब किसी वस्तु के समान टुकड़े किए जाते हैं, तो प्रत्येक टुकड़ा भिन्न कहलाता है। जैसे 1/2 का अर्थ है दो बराबर हिस्सों में से एक (आधा)।`,
          example: `1/2 = आधा हिस्सा (समान भाग: 1/2 + 1/2 = 1 पूरा)`
        };
      } else if (level === 'VILLAGE_EXAMPLE') {
        return {
          explanationHindi: `गाँव का उदाहरण: जब 3 भाई मिलकर एक खेत में बराबर जुताई करते हैं, तो प्रत्येक भाई 1/3 हिस्सा जोतता है।`,
          explanationTargetLang: `गाँव का दैनिक उदाहरण: खेत की जुताई या 1 टोकरी महुआ 4 परिवारों में बराबर बांटना (प्रत्येक को 1/4 हिस्सा)।`,
          example: `1 खेत = 3 बराबर हिस्से = 1/3 + 1/3 + 1/3`
        };
      } else {
        return {
          explanationHindi: `चित्र द्वारा समझ: एक गोल रोटी के चित्र को बीच से काटकर 2 टुकड़े बनाएं। एक टुकड़ा = 1/2, दोनों मिलकर = 1 पूरी रोटी।`,
          explanationTargetLang: `चित्र द्वारा समझ: [ ◯ पूरी 1 रोटी ] ---> बीच से काटा ---> [ ◐ (1/2) | ◑ (1/2) ] = 1 पूरा`,
          example: `[ ◯ ] -> [ ◐ (1/2) | ◑ (1/2) ] = 1`
        };
      }
    }

    // Santhali default
    if (level === 'SIMPLER') {
      return {
        explanationHindi: `इसे बहुत सरल शब्दों में समझें: किसी भी चीज़ को जब हम दोस्तों के बीच बराबर-बराबर बांटते हैं, तो वही भिन्न कहलाता है। जैसे 1 अमरूद को 2 दोस्तों में बांटना।`,
        explanationTargetLang: `ᱱᱚᱣᱟ ᱫᱚ ᱟᱹᱰᱤ ᱟᱞᱜᱟ ᱛᱮ ᱵᱩᱡᱷᱟᱹᱣ ᱢᱮ: ᱡᱟᱦᱟᱸᱱᱟᱜ ᱜᱮ ᱜᱟᱛᱮ ᱠᱚ ᱛᱟᱞᱟ ᱨᱮ ᱥᱚᱢᱟᱱ-ᱥᱚᱢᱟᱱ ᱵᱚᱱ ᱦᱟᱹᱴᱤᱧᱟ, ᱚᱱᱟ ᱜᱮ ᱦᱟᱹᱴᱤᱧ ᱠᱟᱱᱟ᱾ ᱡᱮᱞᱮᱠᱟ ᱑ ᱡᱟᱹᱱᱩᱢ ᱵᱟᱨ ᱦᱚᱲ ᱛᱟᱞᱟ ᱨᱮ ᱦᱟᱹᱴᱤᱧ᱾`,
        example: `1/2 = आधा हिस्सा (तुल्य संथाली: ᱛᱟᱞᱟ / ᱟᱫᱷᱟ)`
      };
    } else if (level === 'VILLAGE_EXAMPLE') {
      return {
        explanationHindi: `गाँव का उदाहरण: धान के खेत में जब 3 भाई मिलकर बराबर जुताई का हिस्सा बांटते हैं, तो हर भाई का हिस्सा 1/3 होता है।`,
        explanationTargetLang: `ᱟᱹᱛᱩ ᱨᱮᱭᱟᱜ ᱫᱟᱹᱭᱠᱟᱹ: ᱦᱳᱲᱳ ᱠᱷᱮᱛ ᱨᱮ ᱡᱚᱠᱷᱚᱱ ᱯᱮ ᱵᱚᱭᱦᱟ ᱥᱚᱢᱟᱱ ᱦᱟᱹᱴᱤᱧ ᱠᱟᱛᱮ ᱠᱚ ᱥᱤ-ᱭᱟ, ᱩᱱ ᱡᱚᱠᱷᱚᱱ ᱡᱚᱛᱚ ᱵᱚᱭᱦᱟ ᱦᱟᱜ ᱦᱟᱹᱴᱤᱧ ᱫᱚ ᱑/᱓ ᱦᱩᱭᱩᱜ-ᱟ᱾`,
        example: `1 खेत = 3 हिस्से = प्रत्येक को 1/3`
      };
    } else {
      return {
        explanationHindi: `चित्र द्वारा समझ: एक गोल रोटी के चित्र को बीच से काटकर 2 टुकड़े बनाएं। एक टुकड़ा = 1/2, दोनों मिलकर = 1 पूरी रोटी।`,
        explanationTargetLang: `ᱪᱤᱛᱟᱹᱨ ᱛᱮ ᱵᱩᱡᱷᱟᱹᱣ: ᱢᱤᱫᱴᱟᱝ ᱜᱩᱞᱟᱹᱭ ᱨᱩᱴᱤ ᱪᱤᱛᱟᱹᱨ ᱛᱟᱞᱟ ᱨᱮ ᱜᱮᱫ ᱠᱟᱛᱮ ᱵᱟᱨ ᱴᱩᱠᱨᱟᱹ ᱵᱮᱱᱟᱣ ᱯᱮ᱾ ᱢᱤᱫ ᱴᱩᱠᱨᱟᱹ = ᱑/᱒, ᱵᱟᱱᱟᱨ ᱢᱮᱥᱟ ᱠᱟᱛᱮ = ᱑ ᱯᱩᱨᱟᱹ ᱨᱩᱴᱤ᱾`,
        example: `[ ◯ ] -> [ ◐ | ◑ ] (1/2 + 1/2 = 1)`
      };
    }
  }

  public async generateWorksheet(ctx: EducationalPromptContext, questionCount: number) {
    const pack = await this.generateLessonPack(ctx);
    return pack.worksheet;
  }

  public async generateAdaptiveQuestions(ctx: EducationalPromptContext, count: number) {
    const pack = await this.generateLessonPack(ctx);
    return pack.practiceQuestions.slice(0, count);
  }
}

export class CloudAIProvider implements IAIProvider {
  public readonly name = 'Cloud AI Provider (Gemini / IndicTrans2)';

  public async isAvailable(): Promise<boolean> {
    return Boolean(config.geminiApiKey && config.geminiApiKey.trim().length > 5);
  }

  public async generateLessonPack(ctx: EducationalPromptContext): Promise<SmartTeachLessonPack> {
    // If key is configured, could invoke remote LLM, else fallback cleanly
    const fallback = new TemplateAndLocalAIProvider();
    return fallback.generateLessonPack(ctx);
  }

  public async explainAgain(ctx: EducationalPromptContext, currentText: string, level: 'SIMPLER' | 'VILLAGE_EXAMPLE' | 'VISUAL') {
    const fallback = new TemplateAndLocalAIProvider();
    return fallback.explainAgain(ctx, currentText, level);
  }

  public async generateWorksheet(ctx: EducationalPromptContext, questionCount: number) {
    const fallback = new TemplateAndLocalAIProvider();
    return fallback.generateWorksheet(ctx, questionCount);
  }

  public async generateAdaptiveQuestions(ctx: EducationalPromptContext, count: number) {
    const fallback = new TemplateAndLocalAIProvider();
    return fallback.generateAdaptiveQuestions(ctx, count);
  }
}

export class AIServiceRouter {
  private cloudProvider: CloudAIProvider;
  private localProvider: TemplateAndLocalAIProvider;

  constructor() {
    this.cloudProvider = new CloudAIProvider();
    this.localProvider = new TemplateAndLocalAIProvider();
  }

  public async getActiveProvider(): Promise<IAIProvider> {
    const isCloudAvail = await this.cloudProvider.isAvailable();
    if (isCloudAvail) {
      return this.cloudProvider;
    }
    return this.localProvider;
  }

  public async generateSmartTeachPack(ctx: EducationalPromptContext): Promise<SmartTeachLessonPack> {
    const provider = await this.getActiveProvider();
    const pack = await provider.generateLessonPack(ctx);

    // Record AI session in database
    db.insert('ai_sessions', {
      feature: 'SMART_TEACH',
      promptContext: ctx,
      provider: provider.name,
      status: 'SUCCESS'
    });

    return pack;
  }

  public async explainAgain(ctx: EducationalPromptContext, currentText: string, level: 'SIMPLER' | 'VILLAGE_EXAMPLE' | 'VISUAL') {
    const provider = await this.getActiveProvider();
    return provider.explainAgain(ctx, currentText, level);
  }
}

export const aiServiceRouter = new AIServiceRouter();
