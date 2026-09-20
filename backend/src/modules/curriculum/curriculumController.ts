import { Request, Response } from 'express';
import { db } from '../../core/database/db';
import { initialCurriculumSeed } from '../../data/seedCurriculum';

export const ensureSeedCurriculum = () => {
  if (db.count('curriculum') === 0) {
    db.insertMany('curriculum', initialCurriculumSeed);
  }
};

export const getCurriculum = (req: Request, res: Response): void => {
  const { grade, subject } = req.query;

  let items = db.find('curriculum');

  if (grade) {
    const gradeNum = parseInt(grade as string, 10);
    items = items.filter(c => c.grade === gradeNum);
  }

  if (subject) {
    items = items.filter(c => c.subject.toLowerCase() === (subject as string).toLowerCase());
  }

  res.json({
    success: true,
    count: items.length,
    curriculum: items
  });
};

export const getGradesAndSubjects = (_req: Request, res: Response): void => {
  const all = db.find('curriculum');

  const gradeSubjectMap: Record<number, string[]> = {};
  for (let g = 1; g <= 10; g++) {
    gradeSubjectMap[g] = [];
  }

  all.forEach(item => {
    if (!gradeSubjectMap[item.grade].includes(item.subject)) {
      gradeSubjectMap[item.grade].push(item.subject);
    }
  });

  res.json({
    success: true,
    grades: Object.keys(gradeSubjectMap).map(g => ({
      grade: parseInt(g, 10),
      subjects: gradeSubjectMap[parseInt(g, 10)]
    }))
  });
};

export const getCurriculumById = (req: Request, res: Response): void => {
  const { id } = req.params;
  const item = db.findOne('curriculum', c => c.id === id);
  if (!item) {
    res.status(404).json({ success: false, message: 'Curriculum item not found' });
    return;
  }
  res.json({ success: true, curriculum: item });
};
