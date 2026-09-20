import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { db } from '../../core/database/db';
import { signToken, AuthenticatedRequest } from '../../core/security/jwt';

// Seed demo users if none exist
export const ensureSeedUsers = () => {
  if (db.count('users') === 0) {
    // School seed
    const school = db.insert('schools', {
      code: 'JH-RNC-042',
      name: 'Utkramit Madhya Vidyalaya, Khunti',
      district: 'Khunti',
      block: 'Murhu',
      cluster: 'Torpa',
      isActive: true
    });

    const salt = bcrypt.genSaltSync(10);
    const defaultPassword = bcrypt.hashSync('palash123', salt);

    // 1. School Admin
    db.insert('users', {
      schoolId: school.id,
      name: 'Rameshwar Mahato',
      email: 'headmaster@palash.jharkhand.gov.in',
      phone: '9876543211',
      role: 'SCHOOL_ADMIN',
      passwordHash: defaultPassword,
      primaryLanguage: 'hi',
      targetLanguages: ['sat', 'hoc'],
      isActive: true
    });

    // 3. Language Expert
    db.insert('users', {
      schoolId: school.id,
      name: 'Dr. Jaipal Singh Munda',
      email: 'expert@palash.jharkhand.gov.in',
      phone: '9876543212',
      role: 'LANGUAGE_EXPERT',
      passwordHash: defaultPassword,
      primaryLanguage: 'sat',
      targetLanguages: ['sat', 'hoc', 'unr'],
      isActive: true
    });

    // 4. District Admin
    db.insert('users', {
      schoolId: school.id,
      name: 'District Education Officer (Khunti)',
      email: 'admin@palash.jharkhand.gov.in',
      phone: '9876543213',
      role: 'DISTRICT_ADMIN',
      passwordHash: defaultPassword,
      primaryLanguage: 'hi',
      targetLanguages: ['sat', 'hoc', 'unr'],
      isActive: true
    });

    // 5. Teacher 1 (Active): Jaipal Munda
    db.insert('users', {
      id: 'tr_jaipal_01',
      schoolId: school.id,
      employeeCode: 'JH-PRT-1042',
      name: 'जयपाल मुंडा (Jaipal Munda)',
      designation: 'सहायक शिक्षक (PRT - FLN)',
      primarySubject: 'गणित व भाषा (Math & Vernacular)',
      secondarySubject: 'पर्यावरण अध्ययन (EVS)',
      languagesSpoken: ['sat', 'hoc', 'unr', 'hi'],
      assignedGrades: [1, 2],
      assignedSections: ['A', 'B'],
      phone: '9431102941',
      email: 'jaipal.munda@jharkhand.gov.in',
      experienceYears: 8,
      joiningDate: '2018-06-12',
      qualification: 'D.El.Ed, B.Ed (FLN Certified)',
      isCurrentActive: true,
      role: 'TEACHER',
      passwordHash: defaultPassword,
      primaryLanguage: 'sat',
      targetLanguages: ['sat', 'hoc', 'unr'],
      isActive: true
    });

    // 6. Teacher 2: Birsa Purty
    db.insert('users', {
      id: 'tr_birsa_02',
      schoolId: school.id,
      employeeCode: 'JH-TGT-2085',
      name: 'बिरसा पूर्ति (Birsa Purty)',
      designation: 'प्रशिक्षित स्नातक शिक्षक (TGT - Math/Science)',
      primarySubject: 'गणित व विज्ञान (Mathematics & Science)',
      secondarySubject: 'हो भाषा व संस्कृति (Ho Language & Culture)',
      languagesSpoken: ['hoc', 'hi', 'en'],
      assignedGrades: [3, 4, 5],
      assignedSections: ['A', 'B'],
      phone: '9431872145',
      email: 'birsa.purty@jharkhand.gov.in',
      experienceYears: 6,
      joiningDate: '2020-09-15',
      qualification: 'B.Sc (Maths), B.Ed (TET Qualified)',
      isCurrentActive: false,
      role: 'TEACHER',
      passwordHash: defaultPassword,
      primaryLanguage: 'hoc',
      targetLanguages: ['hoc', 'hi', 'en'],
      isActive: true
    });

    // 7. Teacher 3: Anjali Tudu
    db.insert('users', {
      id: 'tr_anjali_03',
      schoolId: school.id,
      employeeCode: 'JH-PRT-3190',
      name: 'अंजली टुडू (Anjali Tudu)',
      designation: 'सहायक शिक्षिका (PRT - Early FLN)',
      primarySubject: 'भाषा व बाल साहित्य (Language & Early FLN)',
      secondarySubject: 'संथाली ओल चिकी (Ol Chiki Script)',
      languagesSpoken: ['sat', 'kyw', 'hi', 'en'],
      assignedGrades: [1, 2, 3],
      assignedSections: ['A'],
      phone: '9431548820',
      email: 'anjali.tudu@jharkhand.gov.in',
      experienceYears: 5,
      joiningDate: '2021-08-01',
      qualification: 'M.A (Literature), D.El.Ed',
      isCurrentActive: false,
      role: 'TEACHER',
      passwordHash: defaultPassword,
      primaryLanguage: 'sat',
      targetLanguages: ['sat', 'kyw', 'hi', 'en'],
      isActive: true
    });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email) {
    res.status(400).json({ success: false, message: 'Email is required' });
    return;
  }

  // Quick fallback for demo accounts if password matches or for instant one-click login
  const user = db.findOne('users', u => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    res.status(401).json({ success: false, message: 'Invalid credentials. User not found.' });
    return;
  }

  const isValid = password ? bcrypt.compareSync(password, user.passwordHash) || password === 'palash123' : true;
  if (!isValid) {
    res.status(401).json({ success: false, message: 'Invalid password.' });
    return;
  }

  const school = user.schoolId ? db.findOne('schools', s => s.id === user.schoolId) : null;

  const token = signToken({
    userId: user.id,
    email: user.email,
    role: user.role,
    schoolId: user.schoolId,
    name: user.name
  });

  res.json({
    success: true,
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      primaryLanguage: user.primaryLanguage,
      targetLanguages: user.targetLanguages,
      school: school ? { id: school.id, name: school.name, district: school.district, block: school.block } : null
    }
  });
};

export const getMe = (req: AuthenticatedRequest, res: Response): void => {
  if (!req.user) {
    res.status(401).json({ success: false, message: 'Not authenticated' });
    return;
  }
  const user = db.findOne('users', u => u.id === req.user?.userId);
  if (!user) {
    res.status(404).json({ success: false, message: 'User not found' });
    return;
  }
  const school = user.schoolId ? db.findOne('schools', s => s.id === user.schoolId) : null;

  res.json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      school: school ? { id: school.id, name: school.name, district: school.district } : null
    }
  });
};

export const listDemoAccounts = (_req: Request, res: Response): void => {
  const users = db.find('users');
  res.json({
    success: true,
    accounts: users.map(u => ({
      name: u.name,
      email: u.email,
      role: u.role,
      hint: 'Password: palash123 (or single-click demo login)'
    }))
  });
};
