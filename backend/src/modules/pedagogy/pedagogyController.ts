import { Request, Response } from 'express';
import { aiServiceRouter, EducationalPromptContext } from '../../core/ai/AIService';
import { db } from '../../core/database/db';

export const generateSmartTeach = async (req: Request, res: Response): Promise<void> => {
  try {
    const ctx: EducationalPromptContext = {
      grade: parseInt(req.body.grade || '4', 10),
      subject: req.body.subject || 'Mathematics',
      topic: req.body.topic || 'Fractions',
      learningOutcome: req.body.learningOutcome,
      sourceLanguage: req.body.sourceLanguage || 'hi',
      targetLanguage: req.body.targetLanguage || 'sat',
      difficulty: req.body.difficulty || 'MEDIUM',
      localContext: req.body.localContext || 'VILLAGE',
      studentLevel: req.body.studentLevel || 'INTERMEDIATE',
      durationMinutes: parseInt(req.body.durationMinutes || '40', 10)
    };

    const lessonPack = await aiServiceRouter.generateSmartTeachPack(ctx);

    // Persist lesson into database
    const savedLesson = db.insert('lessons', {
      titleHi: `${ctx.topic} (कक्षा ${ctx.grade})`,
      titleSat: lessonPack.learningObjective.targetLang,
      grade: ctx.grade,
      subject: ctx.subject,
      topic: ctx.topic,
      targetLanguage: ctx.targetLanguage,
      contentJson: lessonPack,
      localContextType: ctx.localContext
    });

    res.json({
      success: true,
      lessonId: savedLesson.id,
      lessonPack
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Failed to generate Smart Teach lesson', error: err.message });
  }
};

export const explainAgain = async (req: Request, res: Response): Promise<void> => {
  try {
    const { grade = 4, subject = 'Mathematics', topic = 'Fractions', currentText = '', level = 'SIMPLER', targetLanguage = 'sat' } = req.body;
    const ctx: EducationalPromptContext = {
      grade: parseInt(grade, 10),
      subject,
      topic,
      targetLanguage
    };

    const explanation = await aiServiceRouter.explainAgain(ctx, currentText, level as any);
    res.json({ success: true, ...explanation });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Explain again failed', error: err.message });
  }
};

export const generateWorksheet = async (req: Request, res: Response): Promise<void> => {
  try {
    const ctx: EducationalPromptContext = {
      grade: parseInt(req.body.grade || '4', 10),
      subject: req.body.subject || 'Mathematics',
      topic: req.body.topic || 'Fractions',
      targetLanguage: req.body.targetLanguage || 'sat'
    };

    const provider = await aiServiceRouter.getActiveProvider();
    const worksheet = await provider.generateWorksheet(ctx, parseInt(req.body.count || '5', 10));

    const savedWorksheet = db.insert('worksheets', {
      grade: ctx.grade,
      subject: ctx.subject,
      topic: ctx.topic,
      instructionsBi: worksheet.bilingualInstructions,
      questionsJson: worksheet.exercises
    });

    res.json({ success: true, worksheetId: savedWorksheet.id, worksheet });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Worksheet generation failed', error: err.message });
  }
};

export const listLessons = (req: Request, res: Response): void => {
  const { grade, subject } = req.query;
  let lessons = db.find('lessons');

  if (grade) {
    const g = parseInt(grade as string, 10);
    lessons = lessons.filter(l => l.grade === g);
  }
  if (subject) {
    lessons = lessons.filter(l => l.subject?.toLowerCase() === (subject as string).toLowerCase());
  }

  res.json({ success: true, count: lessons.length, lessons: lessons.reverse() });
};

export const getLessonById = (req: Request, res: Response): void => {
  const { id } = req.params;
  const lesson = db.findOne('lessons', l => l.id === id);
  if (!lesson) {
    res.status(404).json({ success: false, message: 'Lesson not found' });
    return;
  }
  res.json({ success: true, lesson });
};
