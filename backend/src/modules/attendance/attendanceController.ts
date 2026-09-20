import { Request, Response } from 'express';
import { db } from '../../core/database/db';

export interface StudentAttendanceRecord {
  studentId: string;
  rollNumber: string;
  name: string;
  motherTongue: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED';
  remarks?: string;
}

export interface ClassDailyAttendance {
  id?: string;
  grade: number;
  section: string;
  date: string; // YYYY-MM-DD
  teacherId?: string;
  teacherName?: string;
  totalStudents: number;
  presentCount: number;
  absentCount: number;
  lateCount: number;
  mdmEligibleCount: number; // Mid-day meal headcount
  records: StudentAttendanceRecord[];
  submittedAt: string;
  isLocked: boolean;
}

// Fetch enrolled students from real DB (Zero mock data - strictly user enrolled)
export const getStudentsForClass = (grade: number, section: string) => {
  const students = db.find('students', (s: any) => s.grade === grade && (s.section === section || !s.section));
  return students.sort((a: any, b: any) => parseInt(a.rollNumber || '0', 10) - parseInt(b.rollNumber || '0', 10));
};

export const getAttendance = (req: Request, res: Response): void => {
  const grade = parseInt(req.query.grade as string || '4', 10);
  const section = (req.query.section as string || 'A').toUpperCase();
  const date = (req.query.date as string) || new Date().toISOString().split('T')[0];

  // Look for existing attendance record for this exact class and date
  const existing = db.findOne('attendance', (a: any) => 
    a.grade === grade && a.section === section && a.date === date
  );

  if (existing) {
    res.json({
      success: true,
      isRecorded: true,
      attendance: existing
    });
    return;
  }

  // If not yet recorded, load current roster ready for attendance marking
  const students = getStudentsForClass(grade, section);
  const initialRecords: StudentAttendanceRecord[] = students.map((s: any) => ({
    studentId: s.id,
    rollNumber: s.rollNumber,
    name: s.name,
    motherTongue: s.motherTongue,
    status: 'PRESENT'
  }));

  res.json({
    success: true,
    isRecorded: false,
    attendance: {
      grade,
      section,
      date,
      totalStudents: initialRecords.length,
      presentCount: initialRecords.length,
      absentCount: 0,
      lateCount: 0,
      mdmEligibleCount: initialRecords.length,
      records: initialRecords,
      isLocked: false
    }
  });
};

export const recordAttendance = (req: Request, res: Response): void => {
  const { grade, section, date, records, teacherId, teacherName } = req.body;

  if (!grade || !section || !date || !Array.isArray(records)) {
    res.status(400).json({ success: false, message: 'grade, section, date, and records are required.' });
    return;
  }

  const presentCount = records.filter((r: StudentAttendanceRecord) => r.status === 'PRESENT' || r.status === 'LATE').length;
  const absentCount = records.filter((r: StudentAttendanceRecord) => r.status === 'ABSENT').length;
  const lateCount = records.filter((r: StudentAttendanceRecord) => r.status === 'LATE').length;

  const attendancePayload: ClassDailyAttendance = {
    grade: parseInt(grade, 10),
    section: section.toUpperCase(),
    date,
    teacherId: teacherId || 'tr_active',
    teacherName: teacherName || 'कक्षा शिक्षक (Class Teacher)',
    totalStudents: records.length,
    presentCount,
    absentCount,
    lateCount,
    mdmEligibleCount: presentCount,
    records,
    submittedAt: new Date().toISOString(),
    isLocked: true
  };

  // Upsert ensuring exactly one official record per class per date
  const saved = db.upsert('attendance', attendancePayload, (a: any) => 
    a.grade === attendancePayload.grade && 
    a.section === attendancePayload.section && 
    a.date === attendancePayload.date
  );

  res.json({
    success: true,
    message: `कक्षा ${grade}-${section} की दिनांक ${date} की उपस्थिति सफलतापूर्वक सहेजी गई।`,
    attendance: saved
  });
};

export const getAttendanceSummary = (req: Request, res: Response): void => {
  const all = db.find('attendance');
  const today = new Date().toISOString().split('T')[0];
  const todayRecords = all.filter((a: any) => a.date === today);

  let totalStudents = 0;
  let presentCount = 0;
  let mdmCount = 0;

  todayRecords.forEach((a: any) => {
    totalStudents += a.totalStudents || 0;
    presentCount += a.presentCount || 0;
    mdmCount += a.mdmEligibleCount || 0;
  });

  const percent = totalStudents > 0 ? Math.round((presentCount / totalStudents) * 100) : 0;

  res.json({
    success: true,
    summary: {
      date: today,
      classesRecordedToday: todayRecords.length,
      totalStudentsToday: totalStudents,
      presentToday: presentCount,
      attendancePercentage: percent,
      midDayMealCount: mdmCount
    }
  });
};

// Calendar Strength Heatmap: Daily breakdown across the selected month
export const getAttendanceCalendar = (req: Request, res: Response): void => {
  const grade = req.query.grade ? parseInt(req.query.grade as string, 10) : undefined;
  const section = req.query.section ? (req.query.section as string).toUpperCase() : undefined;
  const year = parseInt(req.query.year as string || String(new Date().getFullYear()), 10);
  const month = parseInt(req.query.month as string || String(new Date().getMonth() + 1), 10); // 1-12

  const monthStr = String(month).padStart(2, '0');
  const prefix = `${year}-${monthStr}`;

  // Find all attendance records for this month
  const monthRecords = db.find('attendance', (a: any) => 
    a.date.startsWith(prefix) &&
    (!grade || a.grade === grade) &&
    (!section || a.section === section)
  );

  // Total days in this month
  const daysInMonth = new Date(year, month, 0).getDate();
  const calendarDays = [];

  let totalDaysRecorded = 0;
  let aggregatePercent = 0;
  let totalMealsServed = 0;

  for (let day = 1; day <= daysInMonth; day++) {
    const dayStr = String(day).padStart(2, '0');
    const dateStr = `${prefix}-${dayStr}`;
    const dayOfWeek = new Date(year, month - 1, day).getDay(); // 0 = Sunday
    const isSunday = dayOfWeek === 0;

    const record = monthRecords.find((r: any) => r.date === dateStr);

    if (record) {
      const pct = record.totalStudents > 0 
        ? Math.round((record.presentCount / record.totalStudents) * 100) 
        : 0;
      totalDaysRecorded++;
      aggregatePercent += pct;
      totalMealsServed += record.mdmEligibleCount || 0;

      calendarDays.push({
        date: dateStr,
        day,
        dayOfWeek,
        isSunday,
        isHoliday: isSunday,
        isRecorded: true,
        totalStudents: record.totalStudents || 0,
        presentCount: record.presentCount || 0,
        absentCount: record.absentCount || 0,
        attendancePercentage: pct,
        mdmCount: record.mdmEligibleCount || 0,
        teacherName: record.teacherName || 'कक्षा शिक्षक'
      });
    } else {
      // Clean non-recorded day with zero artificial metrics
      calendarDays.push({
        date: dateStr,
        day,
        dayOfWeek,
        isSunday,
        isHoliday: isSunday,
        isRecorded: false,
        totalStudents: 0,
        presentCount: 0,
        absentCount: 0,
        attendancePercentage: 0,
        mdmCount: 0,
        teacherName: ''
      });
    }
  }

  const averageAttendance = totalDaysRecorded > 0 ? Math.round(aggregatePercent / totalDaysRecorded) : 0;

  res.json({
    success: true,
    year,
    month,
    grade,
    section,
    workingDaysRecorded: totalDaysRecorded,
    averageAttendance,
    totalMealsServed,
    calendarDays
  });
};

// Historical attendance registers list
export const getAttendanceHistory = (req: Request, res: Response): void => {
  const grade = req.query.grade ? parseInt(req.query.grade as string, 10) : undefined;
  const section = req.query.section ? (req.query.section as string).toUpperCase() : undefined;

  let records = db.find('attendance');
  if (grade) {
    records = records.filter((r: any) => r.grade === grade);
  }
  if (section) {
    records = records.filter((r: any) => r.section === section);
  }

  records.sort((a: any, b: any) => (a.date > b.date ? -1 : 1));

  res.json({
    success: true,
    totalRecords: records.length,
    history: records.slice(0, 30) // Recent 30 entries
  });
};
