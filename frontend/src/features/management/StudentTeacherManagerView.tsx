import React, { useState, useEffect } from 'react';
import { useApp } from '../../core/context/AppContext';
import { api } from '../../core/api/client';
import {
  Users,
  UserPlus,
  GraduationCap,
  CheckCircle2,
  Trash2,
  Edit,
  Sparkles,
  Shield,
  Phone,
  BookOpen,
  MapPin,
  Calendar,
  AlertCircle,
  Search,
  Check,
  UserCheck,
  Award,
  IdCard,
  HeartPulse,
  Mail,
  Filter,
  Plus
} from 'lucide-react';

interface Student {
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
}

interface Teacher {
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
  qualification?: string;
  joiningDate?: string;
  isCurrentActive: boolean;
}

const ALL_LANG_OPTIONS = [
  { code: 'sat', name: 'ᱥᱟᱱᱛᱟᱲᱤ (Santhali)' },
  { code: 'hoc', name: 'ᱦᱳ (Ho)' },
  { code: 'unr', name: 'ᱢᱩᱱᱰᱟᱨᱤ (Mundari)' },
  { code: 'kyw', name: 'कुड़मालि (Kudmali)' },
  { code: 'kru', name: 'कुड़ुख़ (Kurukh)' },
  { code: 'hi', name: 'हिन्दी (Hindi)' },
  { code: 'en', name: 'English' }
];

export const DEFAULT_TEACHERS: Teacher[] = [
  {
    id: 'tr_jaipal_01',
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
    qualification: 'D.El.Ed, B.Ed (FLN Certified)',
    joiningDate: '2018-06-12',
    isCurrentActive: true
  },
  {
    id: 'tr_birsa_02',
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
    qualification: 'B.Sc (Maths), B.Ed (TET Qualified)',
    joiningDate: '2020-09-15',
    isCurrentActive: false
  },
  {
    id: 'tr_anjali_03',
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
    qualification: 'M.A (Literature), D.El.Ed',
    joiningDate: '2021-08-01',
    isCurrentActive: false
  }
];

export const StudentTeacherManagerView: React.FC = () => {
  const { selectedGrade, setSelectedGrade, selectedSection, setSelectedSection, setActiveTeacher: setGlobalActiveTeacher } = useApp();

  const [activeTab, setActiveTab] = useState<'students' | 'teachers'>('students');

  // Search queries
  const [studentSearchQuery, setStudentSearchQuery] = useState<string>('');
  const [teacherSearchQuery, setTeacherSearchQuery] = useState<string>('');

  // Students state
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoadingStudents, setIsLoadingStudents] = useState<boolean>(true);
  const [isAddStudentOpen, setIsAddStudentOpen] = useState<boolean>(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const [studentFormData, setStudentFormData] = useState({
    name: '',
    rollNumber: '',
    grade: selectedGrade,
    section: selectedSection,
    motherTongue: 'sat',
    gender: 'BOY' as 'BOY' | 'GIRL' | 'OTHER',
    category: 'ST' as 'ST' | 'SC' | 'OBC' | 'GEN',
    guardianName: '',
    guardianPhone: '',
    village: 'सारंडा / Saranda',
    apaarId: '',
    bloodGroup: 'B+',
    dob: '',
    cwsn: false
  });

  // Teachers state
  const [teachers, setTeachers] = useState<Teacher[]>(DEFAULT_TEACHERS);
  const [activeTeacher, setActiveTeacherLocal] = useState<Teacher | null>(DEFAULT_TEACHERS[0]);
  const [isLoadingTeachers, setIsLoadingTeachers] = useState<boolean>(true);
  const [isAddTeacherOpen, setIsAddTeacherOpen] = useState<boolean>(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);

  const [teacherFormData, setTeacherFormData] = useState({
    name: '',
    employeeCode: '',
    designation: 'सहायक शिक्षक (PRT)',
    primarySubject: 'Foundational Learning',
    secondarySubject: 'Mathematics',
    languagesSpoken: ['sat', 'hi'],
    assignedGrades: [selectedGrade],
    assignedSections: ['A', 'B'],
    phone: '',
    email: '',
    experienceYears: 5,
    qualification: 'B.Ed, D.El.Ed (JTET Qualified)',
    joiningDate: new Date().toISOString().split('T')[0]
  });

  const [notification, setNotification] = useState<string | null>(null);

  const showNotice = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // Fetch students filtered by grade & section
  const fetchStudents = async () => {
    setIsLoadingStudents(true);
    try {
      const res = await api.get('/students', { grade: selectedGrade, section: selectedSection });
      if (res?.students) {
        setStudents(res.students);
      }
    } catch (err) {
      console.error('Fetch students error:', err);
    } finally {
      setIsLoadingStudents(false);
    }
  };

  // Fetch all registered teachers
  const fetchTeachers = async () => {
    setIsLoadingTeachers(true);
    try {
      const res = await api.get('/teachers');
      if (res?.teachers && res.teachers.length > 0) {
        setTeachers(res.teachers);
        const cur = res.teachers.find((t: Teacher) => t.isCurrentActive);
        if (cur) {
          setActiveTeacherLocal(cur);
          setGlobalActiveTeacher(cur);
        }
      } else {
        setTeachers(DEFAULT_TEACHERS);
      }
    } catch (err) {
      console.error('Fetch teachers error:', err);
      setTeachers(DEFAULT_TEACHERS);
    } finally {
      setIsLoadingTeachers(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [selectedGrade, selectedSection]);

  useEffect(() => {
    fetchTeachers();
  }, []);

  // Set default grade/section on opening new student modal
  const handleOpenAddStudent = () => {
    const nextRoll = String(students.length + 1).padStart(2, '0');
    setStudentFormData({
      name: '',
      rollNumber: nextRoll,
      grade: selectedGrade,
      section: selectedSection,
      motherTongue: 'sat',
      gender: 'BOY',
      category: 'ST',
      guardianName: '',
      guardianPhone: '',
      village: 'सारंडा / Saranda',
      apaarId: '',
      bloodGroup: 'B+',
      dob: '',
      cwsn: false
    });
    setIsAddStudentOpen(true);
  };

  // Set student form for editing
  const handleOpenEditStudent = (s: Student) => {
    setEditingStudent(s);
    setStudentFormData({
      name: s.name,
      rollNumber: s.rollNumber,
      grade: s.grade,
      section: s.section,
      motherTongue: s.motherTongue,
      gender: s.gender,
      category: s.category,
      guardianName: s.guardianName,
      guardianPhone: s.guardianPhone || '',
      village: s.village,
      apaarId: s.apaarId || '',
      bloodGroup: s.bloodGroup || 'B+',
      dob: s.dob || '',
      cwsn: Boolean(s.cwsn)
    });
  };

  const handleSaveStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentFormData.name.trim()) return;

    try {
      if (editingStudent) {
        const res = await api.put(`/students/${editingStudent.id}`, studentFormData);
        if (res.success) {
          showNotice(res.message);
          setEditingStudent(null);
          fetchStudents();
        }
      } else {
        const res = await api.post('/students', studentFormData);
        if (res.success) {
          showNotice(res.message);
          setIsAddStudentOpen(false);
          fetchStudents();
        }
      }
    } catch (err: any) {
      console.error('Save student error:', err);
      showNotice(err.message || 'त्रुटि: विद्यार्थी सहेजा नहीं जा सका।');
    }
  };

  const handleDeleteStudent = async (id: string, name: string) => {
    if (window.confirm(`क्या आप विद्यार्थी "${name}" का रिकॉर्ड हटाना चाहते हैं?`)) {
      try {
        const res = await api.delete(`/students/${id}`);
        if (res.success) {
          showNotice(res.message);
          fetchStudents();
        }
      } catch (err) {
        console.error('Delete student error:', err);
      }
    }
  };

  // Teacher Handlers
  const handleOpenAddTeacher = () => {
    setTeacherFormData({
      name: '',
      employeeCode: `JH-PRT-${Math.floor(1000 + Math.random() * 9000)}`,
      designation: 'सहायक शिक्षक (PRT)',
      primarySubject: 'Foundational Learning',
      secondarySubject: 'Mathematics',
      languagesSpoken: ['sat', 'hi'],
      assignedGrades: [selectedGrade],
      assignedSections: ['A', 'B'],
      phone: '',
      email: '',
      experienceYears: 5,
      qualification: 'B.Ed, D.El.Ed (JTET Qualified)',
      joiningDate: new Date().toISOString().split('T')[0]
    });
    setIsAddTeacherOpen(true);
  };

  const handleOpenEditTeacher = (t: Teacher) => {
    setEditingTeacher(t);
    setTeacherFormData({
      name: t.name,
      employeeCode: t.employeeCode,
      designation: t.designation,
      primarySubject: t.primarySubject,
      secondarySubject: t.secondarySubject || '',
      languagesSpoken: t.languagesSpoken || ['sat', 'hi'],
      assignedGrades: t.assignedGrades || [1, 2, 3, 4],
      assignedSections: t.assignedSections || ['A'],
      phone: t.phone || '',
      email: t.email || '',
      experienceYears: t.experienceYears || 5,
      qualification: t.qualification || '',
      joiningDate: t.joiningDate || ''
    });
  };

  const handleSaveTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacherFormData.name.trim()) return;

    try {
      if (editingTeacher) {
        const res = await api.put(`/teachers/${editingTeacher.id}`, teacherFormData);
        if (res.success) {
          showNotice(res.message);
          setEditingTeacher(null);
          fetchTeachers();
        }
      } else {
        const res = await api.post('/teachers', teacherFormData);
        if (res.success) {
          showNotice(res.message);
          setIsAddTeacherOpen(false);
          fetchTeachers();
        }
      }
    } catch (err: any) {
      console.error('Save teacher error:', err);
      showNotice(err.message || 'त्रुटि: शिक्षक सहेजा नहीं जा सका।');
    }
  };

  const handleDeleteTeacher = async (id: string, name: string) => {
    if (window.confirm(`क्या आप शिक्षक "${name}" की प्रोफ़ाइल हटाना चाहते हैं?`)) {
      try {
        const res = await api.delete(`/teachers/${id}`);
        if (res.success) {
          showNotice(res.message);
          fetchTeachers();
        }
      } catch (err) {
        console.error('Delete teacher error:', err);
      }
    }
  };

  const handleSetActiveTeacher = async (t: Teacher) => {
    try {
      const res = await api.post('/teachers/active', { teacherId: t.id });
      if (res.success) {
        setActiveTeacherLocal(t);
        setGlobalActiveTeacher(t);
        showNotice(`सक्रिय शिक्षक: "${t.name}" निर्धारित किया गया!`);
        fetchTeachers();
      }
    } catch (err) {
      console.error('Set active teacher error:', err);
    }
  };

  const toggleLanguageSpoken = (code: string) => {
    setTeacherFormData(prev => {
      const exists = prev.languagesSpoken.includes(code);
      const updated = exists ? prev.languagesSpoken.filter(c => c !== code) : [...prev.languagesSpoken, code];
      return { ...prev, languagesSpoken: updated };
    });
  };

  const toggleAssignedGrade = (grade: number) => {
    setTeacherFormData(prev => {
      const exists = prev.assignedGrades.includes(grade);
      const updated = exists ? prev.assignedGrades.filter(g => g !== grade) : [...prev.assignedGrades, grade];
      return { ...prev, assignedGrades: updated };
    });
  };

  // Filter students based on search query
  const filteredStudents = students.filter(s => {
    if (!studentSearchQuery.trim()) return true;
    const q = studentSearchQuery.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.rollNumber.includes(q) ||
      s.guardianName.toLowerCase().includes(q) ||
      (s.apaarId && s.apaarId.includes(q))
    );
  });

  // Filter teachers based on search query
  const filteredTeachers = teachers.filter(t => {
    if (!teacherSearchQuery.trim()) return true;
    const q = teacherSearchQuery.toLowerCase();
    return (
      t.name.toLowerCase().includes(q) ||
      t.employeeCode.toLowerCase().includes(q) ||
      t.designation.toLowerCase().includes(q) ||
      t.primarySubject.toLowerCase().includes(q)
    );
  });

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.8rem' }}>👥</span>
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-primary)', margin: 0 }}>
                विद्यार्थी एवं शिक्षक प्रबंधन (Student & Teacher Portal)
              </h1>
              <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', margin: '2px 0 0' }}>
                वास्तविक कक्षा नामांकन, UDISE+ छात्र विवरण, शिक्षक प्रोफ़ाइल व सक्रिय कक्षा सत्र प्रबंधन।
              </p>
            </div>
          </div>

          {/* Tab Switcher: Students vs Teachers */}
          <div style={{ display: 'flex', background: 'var(--color-surface)', padding: '4px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
            <button
              onClick={() => setActiveTab('students')}
              className={`btn ${activeTab === 'students' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '6px 14px', fontSize: '0.84rem' }}
            >
              <GraduationCap size={15} />
              <span>विद्यार्थी सूची ({students.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('teachers')}
              className={`btn ${activeTab === 'teachers' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '6px 14px', fontSize: '0.84rem' }}
            >
              <Users size={15} />
              <span>शिक्षक सूची ({teachers.length})</span>
            </button>
          </div>
        </div>
      </div>

      {notification && (
        <div style={{ padding: '12px 16px', background: 'var(--color-bg)', border: '1px solid var(--color-primary)', borderRadius: 'var(--radius-md)', color: 'var(--color-text)', fontWeight: 600, fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
          <CheckCircle2 size={18} color="var(--color-primary)" />
          <span>{notification}</span>
        </div>
      )}

      {/* ======================= TAB 1: STUDENTS MANAGEMENT ======================= */}
      {activeTab === 'students' && (
        <div>
          {/* Grade & Section Filter Bar aligned with Class & Div */}
          <div className="card" style={{ marginBottom: '20px', padding: '14px 18px', background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                {/* Class / Grade Selector */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>कक्षा (Class):</label>
                  <select
                    value={selectedGrade}
                    onChange={e => setSelectedGrade(Number(e.target.value))}
                    className="input"
                    style={{ padding: '6px 10px', fontSize: '0.88rem', fontWeight: 700 }}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(g => (
                      <option key={g} value={g}>कक्षा {g}</option>
                    ))}
                  </select>
                </div>

                {/* Division / Section Selector */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>खंड (Div):</label>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {['A', 'B', 'C', 'D'].map(sec => (
                      <button
                        key={sec}
                        onClick={() => setSelectedSection(sec)}
                        className={`btn ${selectedSection === sec ? 'btn-primary' : 'btn-secondary'}`}
                        style={{ padding: '4px 10px', fontSize: '0.8rem', minWidth: '34px' }}
                      >
                        {sec}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Search in Class */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '4px 10px' }}>
                  <Search size={14} color="var(--color-text-muted)" />
                  <input
                    type="text"
                    value={studentSearchQuery}
                    onChange={e => setStudentSearchQuery(e.target.value)}
                    placeholder="नाम, रोल नं या APAAR ID से खोजें..."
                    style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '0.84rem', color: 'var(--color-text)', width: '180px' }}
                  />
                </div>
              </div>

              <button onClick={handleOpenAddStudent} className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.86rem' }}>
                <UserPlus size={16} />
                <span>+ नया विद्यार्थी नामांकित करें (Enroll Student)</span>
              </button>
            </div>
          </div>

          {/* Student Roster Table */}
          <div className="card" style={{ padding: '18px', background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <GraduationCap size={18} color="var(--color-primary)" />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, color: 'var(--color-text)' }}>
                  कक्षा {selectedGrade}-{selectedSection} नामांकित विद्यार्थी सूची ({filteredStudents.length})
                </h3>
              </div>
              <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                * उपस्थिति व उपचारात्मक शिक्षण में स्वतः सिंक
              </span>
            </div>

            {isLoadingStudents ? (
              <div style={{ padding: '30px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                डेटाबेस से विद्यार्थी लोड हो रहे हैं...
              </div>
            ) : filteredStudents.length === 0 ? (
              <div style={{ padding: '40px 20px', textAlign: 'center', background: 'var(--color-bg)', borderRadius: 'var(--radius-md)', border: '1px dashed var(--color-border)' }}>
                <div style={{ fontSize: '2.4rem', marginBottom: '10px' }}>🎓</div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '4px' }}>
                  कक्षा {selectedGrade}-{selectedSection} में कोई विद्यार्थी नामांकित नहीं है
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', maxWidth: '420px', margin: '0 auto 16px' }}>
                  शून्य फर्जी डेटा नीति लागू है। इस कक्षा में वास्तविक उपस्थिति व शिक्षण हेतु पहला विद्यार्थी नामांकित करें।
                </p>
                <button onClick={handleOpenAddStudent} className="btn btn-primary" style={{ padding: '8px 18px', fontSize: '0.88rem' }}>
                  <UserPlus size={16} />
                  <span>पहला विद्यार्थी जोड़ें</span>
                </button>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: 'var(--color-bg)', borderBottom: '2px solid var(--color-border)' }}>
                      <th style={{ padding: '10px' }}>रोल नं.</th>
                      <th style={{ padding: '10px' }}>विद्यार्थी का नाम</th>
                      <th style={{ padding: '10px' }}>मातृभाषा</th>
                      <th style={{ padding: '10px' }}>लिंग / वर्ग</th>
                      <th style={{ padding: '10px' }}>अभिभावक व संपर्क</th>
                      <th style={{ padding: '10px' }}>गाँव / टोला</th>
                      <th style={{ padding: '10px' }}>APAAR ID</th>
                      <th style={{ padding: '10px', textAlign: 'right' }}>क्रियाएं</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map(st => (
                      <tr key={st.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                        <td style={{ padding: '10px', fontWeight: 800, color: 'var(--color-primary)' }}>
                          {st.rollNumber}
                        </td>
                        <td style={{ padding: '10px', fontWeight: 700, color: 'var(--color-text)' }}>
                          {st.name}
                          {st.cwsn && (
                            <span className="badge badge-accent" style={{ marginLeft: '6px', fontSize: '0.68rem' }}>CWSN</span>
                          )}
                        </td>
                        <td style={{ padding: '10px' }}>
                          <span className="badge badge-secondary" style={{ fontSize: '0.72rem' }}>
                            {st.motherTongue}
                          </span>
                        </td>
                        <td style={{ padding: '10px', color: 'var(--color-text-muted)' }}>
                          {st.gender === 'BOY' ? 'छात्र' : st.gender === 'GIRL' ? 'छात्रा' : 'अन्य'} • {st.category}
                        </td>
                        <td style={{ padding: '10px', color: 'var(--color-text)' }}>
                          <div>{st.guardianName}</div>
                          {st.guardianPhone && (
                            <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)' }}>
                              📞 {(typeof localStorage !== 'undefined' && localStorage.getItem('palash_mask_student_pii') === 'false') || st.guardianPhone.length < 8
                                ? st.guardianPhone
                                : `${st.guardianPhone.slice(0, 4)}****${st.guardianPhone.slice(-2)}`}
                            </div>
                          )}
                        </td>
                        <td style={{ padding: '10px', color: 'var(--color-text-muted)' }}>
                          {st.village}
                        </td>
                        <td style={{ padding: '10px', color: 'var(--color-text-muted)', fontSize: '0.76rem' }}>
                          {st.apaarId
                            ? (typeof localStorage !== 'undefined' && localStorage.getItem('palash_mask_student_pii') === 'false')
                              ? st.apaarId
                              : `${st.apaarId.slice(0, 7)}****${st.apaarId.slice(-3)}`
                            : '—'}
                        </td>
                        <td style={{ padding: '10px', textAlign: 'right' }}>
                          <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                            <button
                              onClick={() => handleOpenEditStudent(st)}
                              className="btn btn-secondary"
                              style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                              title="विवरण संपादित करें"
                            >
                              <Edit size={13} />
                              <span>संपादित</span>
                            </button>
                            <button
                              onClick={() => handleDeleteStudent(st.id, st.name)}
                              className="btn btn-secondary"
                              style={{ padding: '4px 8px', fontSize: '0.75rem', color: 'var(--color-error)' }}
                              title="रिकॉर्ड हटाएं"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ======================= TAB 2: TEACHERS MANAGEMENT ======================= */}
      {activeTab === 'teachers' && (
        <div>
          {/* Active Teacher Announcement Card */}
          {activeTeacher && (
            <div className="card" style={{ marginBottom: '20px', padding: '16px 20px', background: 'var(--color-primary-subtle)', border: '1px solid var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--color-primary)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.2rem' }}>
                  {activeTeacher.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase' }}>
                    वर्तमान सक्रिय कक्षा शिक्षक (Presiding Active Teacher)
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '2px 0 0', color: 'var(--color-text)' }}>
                    {activeTeacher.name}
                  </h3>
                  <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                    कोड: {activeTeacher.employeeCode} • पद: {activeTeacher.designation} • मुख्य विषय: {activeTeacher.primarySubject}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span className="badge badge-primary" style={{ fontSize: '0.8rem', padding: '6px 12px' }}>
                  <UserCheck size={14} style={{ marginRight: '4px' }} />
                  सत्र सक्रिय
                </span>
                <button
                  onClick={() => handleOpenEditTeacher(activeTeacher)}
                  className="btn btn-secondary"
                  style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                >
                  <Edit size={14} />
                  <span>प्रोफ़ाइल संपादित करें</span>
                </button>
              </div>
            </div>
          )}

          {/* Teacher Controls Bar */}
          <div className="card" style={{ marginBottom: '20px', padding: '14px 18px', background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '6px 12px' }}>
                  <Search size={14} color="var(--color-text-muted)" />
                  <input
                    type="text"
                    value={teacherSearchQuery}
                    onChange={e => setTeacherSearchQuery(e.target.value)}
                    placeholder="शिक्षक नाम, कोड या विषय से खोजें..."
                    style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '0.86rem', color: 'var(--color-text)', width: '220px' }}
                  />
                </div>
              </div>

              <button onClick={handleOpenAddTeacher} className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.86rem' }}>
                <UserPlus size={16} />
                <span>+ नया शिक्षक पंजीकृत करें (Register Teacher)</span>
              </button>
            </div>
          </div>

          {/* Teacher Roster Cards Grid */}
          {isLoadingTeachers ? (
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
              शिक्षक डेटाबेस लोड हो रहा है...
            </div>
          ) : filteredTeachers.length === 0 ? (
            <div style={{ padding: '40px 20px', textAlign: 'center', background: 'var(--color-bg)', borderRadius: 'var(--radius-md)', border: '1px dashed var(--color-border)' }}>
              <div style={{ fontSize: '2.4rem', marginBottom: '10px' }}>👨‍🏫</div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '4px' }}>
                विद्यालय में कोई शिक्षक पंजीकृत नहीं है
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', maxWidth: '420px', margin: '0 auto 16px' }}>
                पलाश मित्र में वास्तविक शिक्षण सत्र संचालित करने हेतु प्रथम शिक्षक प्रोफ़ाइल जोड़ें।
              </p>
              <button onClick={handleOpenAddTeacher} className="btn btn-primary" style={{ padding: '8px 18px', fontSize: '0.88rem' }}>
                <UserPlus size={16} />
                <span>प्रथम शिक्षक जोड़ें</span>
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
              {filteredTeachers.map(t => {
                const isActive = t.isCurrentActive;
                return (
                  <div
                    key={t.id}
                    className="card"
                    style={{
                      padding: '18px',
                      background: 'var(--color-surface)',
                      border: isActive ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                      position: 'relative'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: isActive ? 'var(--color-primary)' : 'var(--color-surface-hover)', color: isActive ? '#FFFFFF' : 'var(--color-text)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.05rem', border: '1px solid var(--color-border)' }}>
                          {t.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <h4 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0, color: 'var(--color-text)' }}>
                            {t.name}
                          </h4>
                          <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                            {t.employeeCode} • {t.designation}
                          </div>
                        </div>
                      </div>

                      {isActive ? (
                        <span className="badge badge-primary" style={{ fontSize: '0.72rem' }}>
                          सक्रिय ✓
                        </span>
                      ) : (
                        <button
                          onClick={() => handleSetActiveTeacher(t)}
                          className="btn btn-secondary"
                          style={{ padding: '4px 10px', fontSize: '0.74rem' }}
                          title="सक्रिय शिक्षक के रूप में चुनें"
                        >
                          सक्रिय करें
                        </button>
                      )}
                    </div>

                    <div style={{ fontSize: '0.82rem', color: 'var(--color-text)', marginBottom: '8px', lineHeight: 1.5 }}>
                      <div><strong>मुख्य विषय:</strong> {t.primarySubject} {t.secondarySubject ? `• ${t.secondarySubject}` : ''}</div>
                      {t.phone && <div><strong>फ़ोन:</strong> {t.phone}</div>}
                      {t.email && <div><strong>ईमेल:</strong> {t.email}</div>}
                      {t.qualification && <div><strong>योग्यता:</strong> {t.qualification}</div>}
                    </div>

                    {/* Languages Spoken Chips */}
                    <div style={{ marginBottom: '12px' }}>
                      <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', fontWeight: 700, marginBottom: '4px', textTransform: 'uppercase' }}>
                        ज्ञात भाषाएँ (Languages):
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {t.languagesSpoken.map(lang => (
                          <span key={lang} className="badge badge-secondary" style={{ fontSize: '0.7rem' }}>
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Assigned Grades */}
                    <div style={{ marginBottom: '14px' }}>
                      <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', fontWeight: 700, marginBottom: '4px', textTransform: 'uppercase' }}>
                        आवंटित कक्षाएं:
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {t.assignedGrades.map(g => (
                          <span key={g} className="badge badge-primary" style={{ fontSize: '0.7rem' }}>
                            कक्षा {g}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', borderTop: '1px solid var(--color-border)', paddingTop: '10px' }}>
                      <button
                        onClick={() => handleOpenEditTeacher(t)}
                        className="btn btn-secondary"
                        style={{ padding: '4px 10px', fontSize: '0.76rem' }}
                      >
                        <Edit size={13} />
                        <span>संपादित</span>
                      </button>
                      <button
                        onClick={() => handleDeleteTeacher(t.id, t.name)}
                        className="btn btn-secondary"
                        style={{ padding: '4px 10px', fontSize: '0.76rem', color: 'var(--color-error)' }}
                      >
                        <Trash2 size={13} />
                        <span>हटाएं</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ======================= MODAL: ADD / EDIT STUDENT ======================= */}
      {(isAddStudentOpen || editingStudent) && (
        <div className="modal-overlay" style={{ zIndex: 1200, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(8px)', padding: '16px' }}>
          <div className="modal-content" style={{ maxWidth: '680px', maxHeight: '92vh', overflowY: 'auto', borderRadius: 'var(--radius-xl)', padding: '24px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)', border: '1px solid var(--color-border)' }}>
            
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)', paddingBottom: '16px', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'var(--color-primary-subtle)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>
                  🎓
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary)', margin: 0 }}>
                    {editingStudent ? 'विद्यार्थी विवरण संपादन (Edit Student Profile)' : 'नया विद्यार्थी नामांकन (Enroll New Student)'}
                  </h3>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                    {editingStudent ? `रोल नं. ${editingStudent.rollNumber} • कक्षा ${editingStudent.grade}-${editingStudent.section}` : `कक्षा ${selectedGrade}-${selectedSection} हेतु नया पंजीकरण`}
                  </div>
                </div>
              </div>
              <button
                onClick={() => { setIsAddStudentOpen(false); setEditingStudent(null); }}
                style={{ border: '1px solid var(--color-border)', background: 'var(--color-surface)', width: '32px', height: '32px', borderRadius: '50%', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)' }}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSaveStudent}>
              {/* SECTION 1: बुनियादी पहचान */}
              <div style={{ marginBottom: '18px', padding: '16px', background: 'var(--color-surface-hover)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>🏷️</span>
                  <span>1. व्यक्तिगत पहचान (Basic Identity)</span>
                </div>

                <div className="grid-2" style={{ gap: '12px', marginBottom: '12px' }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.82rem' }}>विद्यार्थी का पूरा नाम *</label>
                    <input
                      type="text"
                      required
                      className="input"
                      placeholder="उदा. छात्र / छात्रा का नाम"
                      value={studentFormData.name}
                      onChange={e => setStudentFormData({ ...studentFormData, name: e.target.value })}
                      style={{ fontSize: '0.9rem', padding: '8px 12px' }}
                    />
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.82rem' }}>क्रमांक (Roll Number) *</label>
                    <input
                      type="text"
                      required
                      className="input"
                      placeholder="उदा. 01"
                      value={studentFormData.rollNumber}
                      onChange={e => setStudentFormData({ ...studentFormData, rollNumber: e.target.value })}
                      style={{ fontSize: '0.9rem', padding: '8px 12px' }}
                    />
                  </div>
                </div>

                {/* Visual Gender Selection Chips */}
                <div style={{ marginBottom: '12px' }}>
                  <label className="form-label" style={{ fontSize: '0.82rem', marginBottom: '6px' }}>लिंग (Gender)</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {[
                      { id: 'BOY', label: '👦 छात्र (Boy)' },
                      { id: 'GIRL', label: '👧 छात्रा (Girl)' },
                      { id: 'OTHER', label: '🧑 अन्य (Other)' }
                    ].map(g => (
                      <button
                        type="button"
                        key={g.id}
                        onClick={() => setStudentFormData({ ...studentFormData, gender: g.id as any })}
                        className={`btn ${studentFormData.gender === g.id ? 'btn-primary' : 'btn-secondary'}`}
                        style={{ padding: '6px 14px', fontSize: '0.82rem', flex: 1 }}
                      >
                        {g.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Blood Group & DOB */}
                <div className="grid-2" style={{ gap: '12px' }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.82rem' }}>जन्म तिथि (DOB)</label>
                    <input
                      type="date"
                      className="input"
                      value={studentFormData.dob}
                      onChange={e => setStudentFormData({ ...studentFormData, dob: e.target.value })}
                      style={{ fontSize: '0.9rem', padding: '8px 12px' }}
                    />
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.82rem' }}>रक्त समूह (Blood Group)</label>
                    <select
                      className="input"
                      value={studentFormData.bloodGroup}
                      onChange={e => setStudentFormData({ ...studentFormData, bloodGroup: e.target.value })}
                      style={{ fontSize: '0.9rem', padding: '8px 12px' }}
                    >
                      {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-', 'अज्ञात'].map(bg => (
                        <option key={bg} value={bg}>{bg}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION 2: कक्षा व मातृभाषा */}
              <div style={{ marginBottom: '18px', padding: '16px', background: 'var(--color-surface-hover)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>🏫</span>
                  <span>2. कक्षा, वर्ग व मातृभाषा (Class & Vernacular Language)</span>
                </div>

                {/* Grade Selector Pills */}
                <div style={{ marginBottom: '12px' }}>
                  <label className="form-label" style={{ fontSize: '0.82rem', marginBottom: '6px' }}>कक्षा (Grade 1-10) *</label>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(g => (
                      <button
                        type="button"
                        key={g}
                        onClick={() => setStudentFormData({ ...studentFormData, grade: g })}
                        className={`btn ${studentFormData.grade === g ? 'btn-primary' : 'btn-secondary'}`}
                        style={{ padding: '4px 10px', fontSize: '0.78rem', minWidth: '36px' }}
                      >
                        कक्षा {g}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Section & Category */}
                <div className="grid-2" style={{ gap: '12px', marginBottom: '12px' }}>
                  <div>
                    <label className="form-label" style={{ fontSize: '0.82rem', marginBottom: '6px' }}>सेक्शन (Division) *</label>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      {['A', 'B', 'C', 'D'].map(sec => (
                        <button
                          type="button"
                          key={sec}
                          onClick={() => setStudentFormData({ ...studentFormData, section: sec })}
                          className={`btn ${studentFormData.section === sec ? 'btn-primary' : 'btn-secondary'}`}
                          style={{ padding: '6px 12px', fontSize: '0.82rem', flex: 1 }}
                        >
                          {sec}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="form-label" style={{ fontSize: '0.82rem', marginBottom: '6px' }}>सामाजिक वर्ग (Category)</label>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      {['ST', 'SC', 'OBC', 'GEN'].map(cat => (
                        <button
                          type="button"
                          key={cat}
                          onClick={() => setStudentFormData({ ...studentFormData, category: cat as any })}
                          className={`btn ${studentFormData.category === cat ? 'btn-primary' : 'btn-secondary'}`}
                          style={{ padding: '6px 10px', fontSize: '0.82rem', flex: 1 }}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Mother Tongue Selection Chips */}
                <div>
                  <label className="form-label" style={{ fontSize: '0.82rem', marginBottom: '6px' }}>मातृभाषा (Mother Tongue) *</label>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {ALL_LANG_OPTIONS.map(l => (
                      <button
                        type="button"
                        key={l.code}
                        onClick={() => setStudentFormData({ ...studentFormData, motherTongue: l.code })}
                        className={`btn ${studentFormData.motherTongue === l.code ? 'btn-primary' : 'btn-secondary'}`}
                        style={{ padding: '5px 11px', fontSize: '0.8rem' }}
                      >
                        {l.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* SECTION 3: अभिभावक व समावेशी शिक्षा (CWSN) */}
              <div style={{ marginBottom: '20px', padding: '16px', background: 'var(--color-surface-hover)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>🏡</span>
                  <span>3. अभिभावक, संपर्क व दिव्यांगता (Guardian & CWSN)</span>
                </div>

                <div className="grid-2" style={{ gap: '12px', marginBottom: '12px' }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.82rem' }}>अभिभावक का नाम</label>
                    <input
                      type="text"
                      className="input"
                      placeholder="पिता / माता / संरक्षक का नाम"
                      value={studentFormData.guardianName}
                      onChange={e => setStudentFormData({ ...studentFormData, guardianName: e.target.value })}
                      style={{ fontSize: '0.9rem', padding: '8px 12px' }}
                    />
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.82rem' }}>अभिभावक संपर्क नंबर (Phone)</label>
                    <input
                      type="tel"
                      className="input"
                      placeholder="10-अंकीय मोबाइल नंबर"
                      value={studentFormData.guardianPhone}
                      onChange={e => setStudentFormData({ ...studentFormData, guardianPhone: e.target.value })}
                      style={{ fontSize: '0.9rem', padding: '8px 12px' }}
                    />
                  </div>
                </div>

                <div className="grid-2" style={{ gap: '12px', marginBottom: '12px' }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.82rem' }}>गाँव / टोला (Village)</label>
                    <input
                      type="text"
                      className="input"
                      placeholder="उदा. सारंडा टोला"
                      value={studentFormData.village}
                      onChange={e => setStudentFormData({ ...studentFormData, village: e.target.value })}
                      style={{ fontSize: '0.9rem', padding: '8px 12px' }}
                    />
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.82rem' }}>APAAR ID / समग्र आईडी (वैकल्पिक)</label>
                    <input
                      type="text"
                      className="input"
                      placeholder="12-अंकीय APAAR संख्या"
                      value={studentFormData.apaarId}
                      onChange={e => setStudentFormData({ ...studentFormData, apaarId: e.target.value })}
                      style={{ fontSize: '0.9rem', padding: '8px 12px' }}
                    />
                  </div>
                </div>

                {/* Cute CWSN Switch Card */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: 'var(--color-surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', cursor: 'pointer' }} onClick={() => setStudentFormData({ ...studentFormData, cwsn: !studentFormData.cwsn })}>
                  <div>
                    <div style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--color-text)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span>♿</span>
                      <span>विशेष आवश्यकता वाले बच्चे (CWSN - Special Needs)</span>
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                      NEP 2020 समावेशी शिक्षा नीति के तहत विशेष सहायक शिक्षण मॉड्यूल सक्रिय करें
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={studentFormData.cwsn}
                    onChange={e => setStudentFormData({ ...studentFormData, cwsn: e.target.checked })}
                    style={{ width: '20px', height: '20px', accentColor: 'var(--color-primary)', cursor: 'pointer' }}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', paddingTop: '10px', borderTop: '1px solid var(--color-border)' }}>
                <button
                  type="button"
                  onClick={() => { setIsAddStudentOpen(false); setEditingStudent(null); }}
                  className="btn btn-secondary"
                  style={{ padding: '8px 18px' }}
                >
                  रद्द करें
                </button>
                <button type="submit" className="btn btn-primary" style={{ padding: '8px 22px', fontWeight: 700 }}>
                  <UserPlus size={16} />
                  <span>{editingStudent ? 'विद्यार्थी विवरण अपडेट करें' : 'विद्यार्थी नामांकित करें'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================= MODAL: ADD / EDIT TEACHER ======================= */}
      {(isAddTeacherOpen || editingTeacher) && (
        <div className="modal-overlay" style={{ zIndex: 1200, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(8px)', padding: '16px' }}>
          <div className="modal-content" style={{ maxWidth: '680px', maxHeight: '92vh', overflowY: 'auto', borderRadius: 'var(--radius-xl)', padding: '24px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)', border: '1px solid var(--color-border)' }}>
            
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)', paddingBottom: '16px', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'var(--color-accent-subtle)', color: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>
                  👩‍🏫
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary)', margin: 0 }}>
                    {editingTeacher ? 'शिक्षक प्रोफ़ाइल संपादन (Edit Teacher Profile)' : 'नया शिक्षक पंजीकरण (Register Teacher)'}
                  </h3>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                    {editingTeacher ? `कर्मचारी कोड: ${editingTeacher.employeeCode}` : 'विद्यालय शिक्षक संकाय में नया शिक्षक जोड़ें'}
                  </div>
                </div>
              </div>
              <button
                onClick={() => { setIsAddTeacherOpen(false); setEditingTeacher(null); }}
                style={{ border: '1px solid var(--color-border)', background: 'var(--color-surface)', width: '32px', height: '32px', borderRadius: '50%', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)' }}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSaveTeacher}>
              {/* SECTION 1: शिक्षक पहचान */}
              <div style={{ marginBottom: '18px', padding: '16px', background: 'var(--color-surface-hover)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>👤</span>
                  <span>1. शिक्षक पहचान व पद (Identity & Designation)</span>
                </div>

                <div className="grid-2" style={{ gap: '12px', marginBottom: '12px' }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.82rem' }}>शिक्षक का पूरा नाम *</label>
                    <input
                      type="text"
                      required
                      className="input"
                      placeholder="उदा. शिक्षक / शिक्षिका का नाम"
                      value={teacherFormData.name}
                      onChange={e => setTeacherFormData({ ...teacherFormData, name: e.target.value })}
                      style={{ fontSize: '0.9rem', padding: '8px 12px' }}
                    />
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.82rem' }}>कर्मचारी कोड (Employee ID) *</label>
                    <input
                      type="text"
                      required
                      className="input"
                      placeholder="उदा. JH-PRT-8821"
                      value={teacherFormData.employeeCode}
                      onChange={e => setTeacherFormData({ ...teacherFormData, employeeCode: e.target.value })}
                      style={{ fontSize: '0.9rem', padding: '8px 12px' }}
                    />
                  </div>
                </div>

                {/* Designation Visual Selector Chips */}
                <div style={{ marginBottom: '12px' }}>
                  <label className="form-label" style={{ fontSize: '0.82rem', marginBottom: '6px' }}>शिक्षक पद (Designation)</label>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {[
                      { id: 'सहायक शिक्षक (PRT)', label: '👩‍🏫 प्राथमिक शिक्षक (PRT)' },
                      { id: 'स्नातक शिक्षक (TGT)', label: '👨‍🏫 स्नातक शिक्षक (TGT)' },
                      { id: 'प्रधानाध्यापक (Headmaster)', label: '👔 प्रधानाध्यापक (HM)' },
                      { id: 'पारा शिक्षक (Para Teacher)', label: '🎒 पारा शिक्षक (Para)' }
                    ].map(d => (
                      <button
                        type="button"
                        key={d.id}
                        onClick={() => setTeacherFormData({ ...teacherFormData, designation: d.id })}
                        className={`btn ${teacherFormData.designation === d.id ? 'btn-primary' : 'btn-secondary'}`}
                        style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid-2" style={{ gap: '12px' }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.82rem' }}>मोबाइल नंबर (Phone)</label>
                    <input
                      type="tel"
                      className="input"
                      placeholder="10-अंकीय मोबाइल नंबर"
                      value={teacherFormData.phone}
                      onChange={e => setTeacherFormData({ ...teacherFormData, phone: e.target.value })}
                      style={{ fontSize: '0.9rem', padding: '8px 12px' }}
                    />
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.82rem' }}>ईमेल (Email Address)</label>
                    <input
                      type="email"
                      className="input"
                      placeholder="teacher@jharkhand.gov.in"
                      value={teacherFormData.email}
                      onChange={e => setTeacherFormData({ ...teacherFormData, email: e.target.value })}
                      style={{ fontSize: '0.9rem', padding: '8px 12px' }}
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2: विषय व मातृभाषाएं */}
              <div style={{ marginBottom: '18px', padding: '16px', background: 'var(--color-surface-hover)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>📚</span>
                  <span>2. शिक्षण विषय व भाषाएं (Subjects & Languages)</span>
                </div>

                <div className="grid-2" style={{ gap: '12px', marginBottom: '12px' }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.82rem' }}>प्राथमिक विषय (Primary Subject) *</label>
                    <select
                      className="input"
                      value={teacherFormData.primarySubject}
                      onChange={e => setTeacherFormData({ ...teacherFormData, primarySubject: e.target.value })}
                      style={{ fontSize: '0.9rem', padding: '8px 12px' }}
                    >
                      <option value="Foundational Learning">बुनियादी भाषा व गणित (FLN)</option>
                      <option value="Mathematics">गणित (Mathematics)</option>
                      <option value="Environmental Studies">पर्यावरण अध्ययन (EVS)</option>
                      <option value="Science">विज्ञान (Science)</option>
                      <option value="Social Studies">सामाजिक अध्ययन (SST)</option>
                      <option value="Languages">मातृभाषा शिक्षण (Vernacular)</option>
                    </select>
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.82rem' }}>द्वितीयक विषय (Secondary Subject)</label>
                    <input
                      type="text"
                      className="input"
                      placeholder="उदा. गणित / भाषा"
                      value={teacherFormData.secondarySubject}
                      onChange={e => setTeacherFormData({ ...teacherFormData, secondarySubject: e.target.value })}
                      style={{ fontSize: '0.9rem', padding: '8px 12px' }}
                    />
                  </div>
                </div>

                {/* Spoken Languages Multi-select Chips */}
                <div>
                  <label className="form-label" style={{ fontSize: '0.82rem', marginBottom: '6px' }}>शिक्षक द्वारा बोली जाने वाली भाषाएँ (Multi-select)</label>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {ALL_LANG_OPTIONS.map(l => {
                      const isSelected = teacherFormData.languagesSpoken.includes(l.code);
                      return (
                        <button
                          type="button"
                          key={l.code}
                          onClick={() => toggleLanguageSpoken(l.code)}
                          className={`btn ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
                          style={{ padding: '5px 12px', fontSize: '0.8rem' }}
                        >
                          {isSelected ? '✓ ' : '+ '}{l.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* SECTION 3: कक्षा आवंटन व सक्रिय शिक्षक स्विच */}
              <div style={{ marginBottom: '20px', padding: '16px', background: 'var(--color-surface-hover)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>🏫</span>
                  <span>3. कक्षा आवंटन व सत्र स्थिति (Class Assignment & Session)</span>
                </div>

                {/* Assigned Grades Chips */}
                <div style={{ marginBottom: '14px' }}>
                  <label className="form-label" style={{ fontSize: '0.82rem', marginBottom: '6px' }}>आवंटित कक्षाएं (Assigned Grades 1-10)</label>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(g => {
                      const isSelected = teacherFormData.assignedGrades.includes(g);
                      return (
                        <button
                          type="button"
                          key={g}
                          onClick={() => toggleAssignedGrade(g)}
                          className={`btn ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
                          style={{ padding: '4px 10px', fontSize: '0.78rem', minWidth: '36px' }}
                        >
                          {isSelected ? '✓ ' : ''}कक्षा {g}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid-2" style={{ gap: '12px', marginBottom: '14px' }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.82rem' }}>शैक्षणिक योग्यता (Qualification)</label>
                    <input
                      type="text"
                      className="input"
                      placeholder="उदा. B.Ed, D.El.Ed (JTET)"
                      value={teacherFormData.qualification}
                      onChange={e => setTeacherFormData({ ...teacherFormData, qualification: e.target.value })}
                      style={{ fontSize: '0.9rem', padding: '8px 12px' }}
                    />
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.82rem' }}>अनुभव (वर्ष / Years)</label>
                    <input
                      type="number"
                      min="0"
                      max="40"
                      className="input"
                      value={teacherFormData.experienceYears}
                      onChange={e => setTeacherFormData({ ...teacherFormData, experienceYears: Number(e.target.value) })}
                      style={{ fontSize: '0.9rem', padding: '8px 12px' }}
                    />
                  </div>
                </div>

                {/* Active Teacher Switch Card */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'var(--color-surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-primary-light)' }}>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span>🌟</span>
                      <span>सक्रिय कक्षा शिक्षक बनाएं (Set as Active Teacher)</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                      वर्तमान में कक्षा उपस्थिति व पठन सत्र इस शिक्षक के नाम से संचालित होंगे
                    </div>
                  </div>
                  <span className="badge badge-primary" style={{ padding: '4px 10px', fontSize: '0.76rem' }}>
                    सत्र सक्रिय
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', paddingTop: '10px', borderTop: '1px solid var(--color-border)' }}>
                <button
                  type="button"
                  onClick={() => { setIsAddTeacherOpen(false); setEditingTeacher(null); }}
                  className="btn btn-secondary"
                  style={{ padding: '8px 18px' }}
                >
                  रद्द करें
                </button>
                <button type="submit" className="btn btn-primary" style={{ padding: '8px 22px', fontWeight: 700 }}>
                  <UserPlus size={16} />
                  <span>{editingTeacher ? 'शिक्षक प्रोफ़ाइल अपडेट करें' : 'शिक्षक पंजीकृत करें'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
