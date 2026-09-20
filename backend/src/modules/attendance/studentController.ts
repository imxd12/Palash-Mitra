import { Request, Response } from 'express';
import { db } from '../../core/database/db';
import { v4 as uuidv4 } from 'uuid';

export interface StudentProfile {
  id: string;
  name: string;
  rollNumber: string;
  grade: number;
  section: string;
  motherTongue: string;
  gender: 'BOY' | 'GIRL' | 'OTHER';
  category: 'ST' | 'SC' | 'OBC' | 'GEN';
  guardianName: string;
  guardianPhone?: string;
  village: string;
  apaarId?: string;
  bloodGroup?: string;
  dob?: string;
  cwsn?: boolean;
  enrollmentDate: string;
  createdAt: string;
  updatedAt?: string;
}

export const getStudents = (req: Request, res: Response): void => {
  const grade = req.query.grade ? parseInt(req.query.grade as string, 10) : undefined;
  const section = req.query.section ? (req.query.section as string).toUpperCase() : undefined;

  let students = db.find('students');
  if (grade !== undefined && !isNaN(grade)) {
    students = students.filter((s: any) => s.grade === grade);
  }
  if (section) {
    students = students.filter((s: any) => s.section === section);
  }

  students.sort((a: any, b: any) => {
    if (a.grade !== b.grade) return a.grade - b.grade;
    return parseInt(a.rollNumber || '0', 10) - parseInt(b.rollNumber || '0', 10);
  });

  res.json({
    success: true,
    count: students.length,
    students
  });
};

export const addStudent = (req: Request, res: Response): void => {
  const {
    name,
    rollNumber,
    grade,
    section,
    motherTongue,
    gender,
    guardianName,
    guardianPhone,
    category,
    village,
    apaarId,
    bloodGroup,
    dob,
    cwsn
  } = req.body;

  if (!name || !name.trim() || !grade) {
    res.status(400).json({ success: false, message: 'विद्यार्थी का नाम और कक्षा आवश्यक हैं।' });
    return;
  }

  const parsedGrade = parseInt(grade, 10);
  const parsedSection = (section || 'A').toUpperCase().trim();
  const formattedRoll = String(rollNumber || '01').padStart(2, '0').trim();

  // Check duplicate roll number in same class & section
  const existing = db.findOne('students', (s: any) => 
    s.grade === parsedGrade && 
    s.section === parsedSection && 
    String(s.rollNumber).trim() === formattedRoll
  );

  if (existing) {
    res.status(400).json({
      success: false,
      message: `कक्षा ${parsedGrade}-${parsedSection} में क्रमांक (Roll No.) ${formattedRoll} पहले से नामांकित है।`
    });
    return;
  }

  const newStudent: StudentProfile = {
    id: `std_${uuidv4().slice(0, 8)}`,
    name: name.trim(),
    rollNumber: formattedRoll,
    grade: parsedGrade,
    section: parsedSection,
    motherTongue: motherTongue || 'sat',
    gender: gender || 'BOY',
    guardianName: guardianName?.trim() || 'अभिभावक',
    guardianPhone: guardianPhone?.trim() || '',
    category: category || 'ST',
    village: village?.trim() || 'झारखंड',
    apaarId: apaarId?.trim() || '',
    bloodGroup: bloodGroup?.trim() || '',
    dob: dob || '',
    cwsn: Boolean(cwsn),
    enrollmentDate: new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString()
  };

  db.insert('students', newStudent);

  res.status(201).json({
    success: true,
    message: `${newStudent.name} को कक्षा ${parsedGrade}-${parsedSection} में क्रमांक ${formattedRoll} पर नामांकित किया गया।`,
    student: newStudent
  });
};

export const updateStudent = (req: Request, res: Response): void => {
  const { id } = req.params;
  const updates = req.body;

  const existing = db.findOne('students', (s: any) => s.id === id);
  if (!existing) {
    res.status(404).json({ success: false, message: 'विद्यार्थी नहीं मिला।' });
    return;
  }

  const parsedGrade = updates.grade !== undefined ? parseInt(updates.grade, 10) : existing.grade;
  const parsedSection = updates.section !== undefined ? updates.section.toUpperCase().trim() : existing.section;
  const formattedRoll = updates.rollNumber !== undefined ? String(updates.rollNumber).padStart(2, '0').trim() : existing.rollNumber;

  // Check duplicate roll number in class if roll or grade or section is changing
  if (
    (parsedGrade !== existing.grade || parsedSection !== existing.section || formattedRoll !== existing.rollNumber)
  ) {
    const duplicate = db.findOne('students', (s: any) =>
      s.id !== id &&
      s.grade === parsedGrade &&
      s.section === parsedSection &&
      String(s.rollNumber).trim() === formattedRoll
    );
    if (duplicate) {
      res.status(400).json({
        success: false,
        message: `कक्षा ${parsedGrade}-${parsedSection} में क्रमांक ${formattedRoll} किसी अन्य विद्यार्थी का है।`
      });
      return;
    }
  }

  const updated: StudentProfile = {
    ...existing,
    ...updates,
    grade: parsedGrade,
    section: parsedSection,
    rollNumber: formattedRoll,
    updatedAt: new Date().toISOString()
  };

  db.upsert('students', updated, (s: any) => s.id === id);

  res.json({
    success: true,
    message: `${updated.name} का विवरण सफलतापूर्वक अपडेट किया गया।`,
    student: updated
  });
};

export const deleteStudent = (req: Request, res: Response): void => {
  const { id } = req.params;

  const existing = db.findOne('students', (s: any) => s.id === id);
  if (!existing) {
    res.status(404).json({ success: false, message: 'विद्यार्थी नहीं मिला।' });
    return;
  }

  db.delete('students', id);

  res.json({
    success: true,
    message: `विद्यार्थी ${existing.name} (क्रमांक: ${existing.rollNumber}) का रिकॉर्ड सफलतापूर्वक हटा दिया गया।`
  });
};
