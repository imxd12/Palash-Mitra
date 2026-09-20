import { Request, Response } from 'express';
import { db } from '../../core/database/db';
import { v4 as uuidv4 } from 'uuid';

export interface TeacherProfile {
  id: string;
  employeeCode: string;
  name: string;
  designation: string;
  primarySubject: string;
  secondarySubject?: string;
  languagesSpoken: string[];
  assignedGrades: number[];
  assignedSections?: string[];
  phone?: string;
  email?: string;
  experienceYears?: number;
  joiningDate?: string;
  qualification?: string;
  isCurrentActive: boolean;
}

export const getTeachers = (_req: Request, res: Response): void => {
  const teachers = db.find('users', (u: any) => u.role === 'TEACHER');
  res.json({
    success: true,
    count: teachers.length,
    teachers
  });
};

export const getActiveTeacher = (_req: Request, res: Response): void => {
  let active = db.findOne('users', (u: any) => u.role === 'TEACHER' && u.isCurrentActive === true);
  if (!active) {
    const all = db.find('users', (u: any) => u.role === 'TEACHER');
    if (all.length > 0) {
      active = all[0];
      active.isCurrentActive = true;
      db.upsert('users', active, (u: any) => u.id === active.id);
    }
  }

  res.json({
    success: true,
    teacher: active || null
  });
};

export const setActiveTeacher = (req: Request, res: Response): void => {
  const { teacherId } = req.body;
  if (!teacherId) {
    res.status(400).json({ success: false, message: 'teacherId आवश्यक है।' });
    return;
  }

  const allTeachers = db.find('users', (u: any) => u.role === 'TEACHER');
  let selectedTeacher: any = null;

  allTeachers.forEach((t: any) => {
    if (t.id === teacherId) {
      t.isCurrentActive = true;
      selectedTeacher = t;
    } else {
      t.isCurrentActive = false;
    }
    db.upsert('users', t, (u: any) => u.id === t.id);
  });

  if (!selectedTeacher) {
    res.status(404).json({ success: false, message: 'शिक्षक नहीं मिला।' });
    return;
  }

  res.json({
    success: true,
    message: `वर्तमान कक्षा शिक्षक को "${selectedTeacher.name}" के रूप में सक्रिय किया गया।`,
    activeTeacher: selectedTeacher
  });
};

export const addTeacher = (req: Request, res: Response): void => {
  const {
    name,
    employeeCode,
    designation,
    primarySubject,
    secondarySubject,
    languagesSpoken,
    assignedGrades,
    assignedSections,
    phone,
    email,
    experienceYears,
    joiningDate,
    qualification
  } = req.body;

  if (!name || !name.trim()) {
    res.status(400).json({ success: false, message: 'शिक्षक का नाम आवश्यक है।' });
    return;
  }

  // Count existing to decide if first teacher is automatically active
  const existingTeachers = db.find('users', (u: any) => u.role === 'TEACHER');
  const isFirst = existingTeachers.length === 0;

  const newTeacher: TeacherProfile = {
    id: `tr_${uuidv4().slice(0, 8)}`,
    employeeCode: employeeCode?.trim() || `JH-ED-${Math.floor(1000 + Math.random() * 9000)}`,
    name: name.trim(),
    designation: designation?.trim() || 'सहायक शिक्षक (PRT)',
    primarySubject: primarySubject?.trim() || 'Foundational Learning',
    secondarySubject: secondarySubject?.trim() || '',
    languagesSpoken: Array.isArray(languagesSpoken) && languagesSpoken.length > 0 ? languagesSpoken : ['sat', 'hi'],
    assignedGrades: Array.isArray(assignedGrades) && assignedGrades.length > 0 ? assignedGrades.map(Number) : [1, 2, 3, 4],
    assignedSections: Array.isArray(assignedSections) ? assignedSections : ['A'],
    phone: phone?.trim() || '',
    email: email?.trim() || '',
    experienceYears: experienceYears ? Number(experienceYears) : undefined,
    joiningDate: joiningDate || new Date().toISOString().split('T')[0],
    qualification: qualification?.trim() || '',
    isCurrentActive: isFirst
  };

  db.insert('users', {
    ...newTeacher,
    role: 'TEACHER',
    schoolId: 'SCH_JH_SARANDA_01',
    createdAt: new Date().toISOString()
  });

  res.status(201).json({
    success: true,
    message: `शिक्षक ${newTeacher.name} को सफलतापूर्वक पंजीकृत किया गया।`,
    teacher: newTeacher
  });
};

export const updateTeacher = (req: Request, res: Response): void => {
  const { id } = req.params;
  const updates = req.body;

  const existing = db.findOne('users', (u: any) => u.id === id && u.role === 'TEACHER');
  if (!existing) {
    res.status(404).json({ success: false, message: 'शिक्षक प्रोफ़ाइल नहीं मिली।' });
    return;
  }

  const updatedTeacher = {
    ...existing,
    ...updates,
    id: existing.id,
    role: 'TEACHER',
    updatedAt: new Date().toISOString()
  };

  db.upsert('users', updatedTeacher, (u: any) => u.id === id);

  res.json({
    success: true,
    message: `शिक्षक ${updatedTeacher.name} का विवरण सफलतापूर्वक अपडेट किया गया।`,
    teacher: updatedTeacher
  });
};

export const deleteTeacher = (req: Request, res: Response): void => {
  const { id } = req.params;
  const existing = db.findOne('users', (u: any) => u.id === id && u.role === 'TEACHER');
  if (!existing) {
    res.status(404).json({ success: false, message: 'शिक्षक प्रोफ़ाइल नहीं मिली।' });
    return;
  }

  db.delete('users', id);

  // If deleted teacher was active, set another teacher active if available
  if (existing.isCurrentActive) {
    const remaining = db.find('users', (u: any) => u.role === 'TEACHER');
    if (remaining.length > 0) {
      remaining[0].isCurrentActive = true;
      db.upsert('users', remaining[0], (u: any) => u.id === remaining[0].id);
    }
  }

  res.json({
    success: true,
    message: `शिक्षक ${existing.name} को हटा दिया गया।`
  });
};
