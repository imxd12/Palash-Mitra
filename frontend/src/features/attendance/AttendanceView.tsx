import React, { useState, useEffect } from 'react';
import { useApp } from '../../core/context/AppContext';
import { api } from '../../core/api/client';
import {
  Users,
  Calendar,
  Check,
  X,
  Clock,
  Download,
  CheckCircle2,
  AlertCircle,
  Utensils,
  FileSpreadsheet,
  Printer,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  BarChart2,
  Lock,
  History,
  ShieldCheck
} from 'lucide-react';

interface AttendanceRecord {
  studentId: string;
  rollNumber: string;
  name: string;
  motherTongue: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED';
}

interface CalendarDay {
  date: string;
  day: number;
  dayOfWeek: number;
  isSunday: boolean;
  isHoliday: boolean;
  isRecorded: boolean;
  totalStudents: number;
  presentCount: number;
  absentCount: number;
  attendancePercentage: number;
  mdmCount: number;
  teacherName?: string;
}

export interface AttendanceViewProps {
  onNavigate?: (tab: string) => void;
}

export const AttendanceView: React.FC<AttendanceViewProps> = ({ onNavigate }) => {
  const { selectedGrade, setSelectedGrade, selectedSection, setSelectedSection } = useApp();

  const [viewMode, setViewMode] = useState<'register' | 'calendar' | 'history'>('register');

  const todayStr = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState<string>(todayStr);
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [isMdmModalOpen, setIsMdmModalOpen] = useState<boolean>(false);

  // Calendar Heatmap State
  const [calYear, setCalYear] = useState<number>(new Date().getFullYear());
  const [calMonth, setCalMonth] = useState<number>(new Date().getMonth() + 1); // 1-12
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([]);
  const [calendarMetrics, setCalendarMetrics] = useState({
    workingDays: 0,
    averageAttendance: 0,
    totalMealsServed: 0
  });

  // History State
  const [historyRecords, setHistoryRecords] = useState<any[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState<boolean>(false);

  // Fetch register for selected date
  const fetchAttendance = async () => {
    setIsLoading(true);
    try {
      const res = await api.get('/attendance', {
        grade: selectedGrade,
        section: selectedSection,
        date: selectedDate
      });
      if (res?.attendance?.records) {
        setRecords(res.attendance.records);
        setIsLocked(Boolean(res.attendance.isLocked));
      }
    } catch (err) {
      console.error('Fetch attendance error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch calendar heatmap
  const fetchCalendar = async () => {
    try {
      const res = await api.get('/attendance/calendar', {
        grade: selectedGrade,
        section: selectedSection,
        year: calYear,
        month: calMonth
      });
      if (res?.calendarDays) {
        setCalendarDays(res.calendarDays);
        setCalendarMetrics({
          workingDays: res.workingDaysRecorded,
          averageAttendance: res.averageAttendance,
          totalMealsServed: res.totalMealsServed
        });
      }
    } catch (err) {
      console.error('Fetch calendar error:', err);
    }
  };

  // Fetch past recorded history
  const fetchHistory = async () => {
    setIsLoadingHistory(true);
    try {
      const res = await api.get('/attendance/history', {
        grade: selectedGrade,
        section: selectedSection
      });
      if (res?.history) {
        setHistoryRecords(res.history);
      }
    } catch (err) {
      console.error('Fetch history error:', err);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, [selectedGrade, selectedSection, selectedDate]);

  useEffect(() => {
    if (viewMode === 'calendar') {
      fetchCalendar();
    } else if (viewMode === 'history') {
      fetchHistory();
    }
  }, [viewMode, selectedGrade, selectedSection, calYear, calMonth]);

  const handleStatusChange = (studentId: string, newStatus: 'PRESENT' | 'ABSENT' | 'LATE') => {
    setRecords(prev => prev.map(r => (r.studentId === studentId ? { ...r, status: newStatus } : r)));
  };

  const handleMarkAllPresent = () => {
    setRecords(prev => prev.map(r => ({ ...r, status: 'PRESENT' })));
  };

  const handleClearAll = () => {
    setRecords(prev => prev.map(r => ({ ...r, status: 'ABSENT' })));
  };

  const handleSave = async () => {
    try {
      const res = await api.post('/attendance', {
        grade: selectedGrade,
        section: selectedSection,
        date: selectedDate,
        records
      });

      setSaveMessage('उपस्थिति रजिस्टर सफलतापूर्वक सहेजा गया और लॉक कर दिया गया!');
      setIsLocked(true);
      setTimeout(() => setSaveMessage(null), 3000);
      fetchCalendar();
    } catch (err) {
      console.error('Save attendance error:', err);
    }
  };

  const handleExportCSV = () => {
    const headers = 'क्रमांक (Roll),नाम (Name),मातृभाषा (Mother Tongue),स्थिति (Status)\n';
    const rows = records
      .map(r => `${r.rollNumber},"${r.name}",${r.motherTongue},${r.status}`)
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Attendance_Class_${selectedGrade}${selectedSection}_${selectedDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Calculations
  const presentCount = records.filter(r => r.status === 'PRESENT' || r.status === 'LATE').length;
  const absentCount = records.filter(r => r.status === 'ABSENT').length;
  const lateCount = records.filter(r => r.status === 'LATE').length;
  const totalCount = records.length;
  const attendancePercentage = totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 0;

  // MDM Government Calculations
  const isPrimary = selectedGrade <= 5;
  const ricePerChildKg = isPrimary ? 0.10 : 0.15;
  const dalPerChildKg = isPrimary ? 0.02 : 0.03;
  const vegPerChildKg = isPrimary ? 0.05 : 0.075;
  const oilPerChildKg = isPrimary ? 0.005 : 0.0075;
  const cookingCostRate = isPrimary ? 5.45 : 8.17; // Rs per child per day

  const totalRiceKg = (presentCount * ricePerChildKg).toFixed(2);
  const totalDalKg = (presentCount * dalPerChildKg).toFixed(2);
  const totalVegKg = (presentCount * vegPerChildKg).toFixed(2);
  const totalOilKg = (presentCount * oilPerChildKg).toFixed(3);
  const totalCookingCost = (presentCount * cookingCostRate).toFixed(2);

  // Month navigation
  const monthNames = [
    'जनवरी (January)', 'फ़रवरी (February)', 'मार्च (March)', 'अप्रैल (April)',
    'मई (May)', 'जून (June)', 'जुलाई (July)', 'अगस्त (August)',
    'सितंबर (September)', 'अक्टूबर (October)', 'नवंबर (November)', 'दिसंबर (December)'
  ];

  const handlePrevMonth = () => {
    if (calMonth === 1) {
      setCalMonth(12);
      setCalYear(prev => prev - 1);
    } else {
      setCalMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (calMonth === 12) {
      setCalMonth(1);
      setCalYear(prev => prev + 1);
    } else {
      setCalMonth(prev => prev + 1);
    }
  };

  return (
    <div>
      {/* Header Banner */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.6rem' }}>📋</span>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-primary)', margin: 0 }}>
              स्मार्ट डिजिटल उपस्थिति एवं कैलेंडर स्ट्रेंथ रजिस्टर
            </h1>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
            दैनिक कक्षा उपस्थिति, कैलेंडर स्ट्रेंथ हीटमैप, मध्याह्न भोजन (MDM) गणना व सरकारी ऑडिट ट्रेल।
          </p>
        </div>

        {/* View Mode Switcher */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setViewMode('register')}
            className={`btn ${viewMode === 'register' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '0.84rem' }}
          >
            <span>दैनिक रजिस्टर (Register)</span>
          </button>
          <button
            onClick={() => setViewMode('calendar')}
            className={`btn ${viewMode === 'calendar' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '0.84rem' }}
          >
            <Calendar size={15} />
            <span>कैलेंडर स्ट्रेंथ चार्ट (Calendar Mode)</span>
          </button>
          <button
            onClick={() => setViewMode('history')}
            className={`btn ${viewMode === 'history' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '0.84rem' }}
          >
            <History size={15} />
            <span>इतिहास व ऑडिट (History)</span>
          </button>
          <button
            onClick={() => {
              if (onNavigate) {
                onNavigate('mdm');
              }
            }}
            className="btn btn-secondary"
            style={{ padding: '8px 14px', fontSize: '0.84rem', color: '#b45309', background: '#fef3c7', borderColor: '#fde68a', fontWeight: 700 }}
          >
            <Utensils size={15} />
            <span>🍲 MDM राशन पर्ची (Ration Slips)</span>
          </button>
        </div>
      </div>

      {/* Grade & Section Selector Bar */}
      <div className="card" style={{ marginBottom: '20px', padding: '14px 16px', background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" style={{ fontSize: '0.78rem' }}>कक्षा (Grade)</label>
              <select
                className="form-select"
                value={selectedGrade}
                onChange={e => setSelectedGrade(parseInt(e.target.value, 10))}
                style={{ minWidth: '120px', padding: '6px 10px', fontSize: '0.85rem' }}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(g => (
                  <option key={g} value={g}>कक्षा {g}</option>
                ))}
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" style={{ fontSize: '0.78rem' }}>अनुभाग (Section)</label>
              <select
                className="form-select"
                value={selectedSection}
                onChange={e => setSelectedSection(e.target.value)}
                style={{ minWidth: '110px', padding: '6px 10px', fontSize: '0.85rem' }}
              >
                <option value="A">अनुभाग A</option>
                <option value="B">अनुभाग B</option>
                <option value="C">अनुभाग C</option>
              </select>
            </div>

            {viewMode === 'register' && (
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ fontSize: '0.78rem' }}>दिनांक (Date)</label>
                <input
                  type="date"
                  className="form-input"
                  value={selectedDate}
                  onChange={e => setSelectedDate(e.target.value)}
                  style={{ padding: '6px 10px', fontSize: '0.85rem' }}
                />
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button onClick={() => setIsMdmModalOpen(true)} className="btn btn-accent" style={{ padding: '8px 12px', fontSize: '0.82rem' }}>
              <Utensils size={14} />
              <span>🍲 MDM पर्ची</span>
            </button>
            <button onClick={handleExportCSV} className="btn btn-secondary" style={{ padding: '8px 12px', fontSize: '0.82rem' }}>
              <Download size={14} />
              <span>CSV निर्यात</span>
            </button>
          </div>
        </div>
      </div>

      {saveMessage && (
        <div style={{ padding: '12px 16px', background: 'var(--color-bg)', border: '1px solid var(--color-primary)', borderRadius: 'var(--radius-md)', color: 'var(--color-text)', fontWeight: 600, fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
          <CheckCircle2 size={18} color="var(--color-primary)" />
          <span>{saveMessage}</span>
        </div>
      )}

      {/* VIEW 1: DAILY REGISTER MODE */}
      {viewMode === 'register' && (
        <div>
          {/* Quick Metrics */}
          <div className="grid-4" style={{ marginBottom: '20px' }}>
            <div className="card" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>नामांकित विद्यार्थी</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-primary)', marginTop: '2px' }}>
                {totalCount} छात्र
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>कक्षा {selectedGrade}-{selectedSection}</div>
            </div>

            <div className="card" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 600 }}>उपस्थित (Present)</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#10B981', marginTop: '2px' }}>
                {presentCount} छात्र
              </div>
              <div style={{ fontSize: '0.72rem', color: '#10B981' }}>{attendancePercentage}% उपस्थिति दर</div>
            </div>

            <div className="card" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-error)', fontWeight: 600 }}>अनुपस्थित (Absent)</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-error)', marginTop: '2px' }}>
                {absentCount} छात्र
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>देर से आए: {lateCount}</div>
            </div>

            <div
              className="card"
              onClick={() => setIsMdmModalOpen(true)}
              style={{ background: 'var(--color-surface)', border: '2px solid var(--color-accent)', padding: '16px', cursor: 'pointer' }}
            >
              <div style={{ fontSize: '0.75rem', color: 'var(--color-accent)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Utensils size={13} />
                <span>MDM मध्याह्न भोजन</span>
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-accent)', marginTop: '2px' }}>
                {presentCount} थाली
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>राशन पर्ची देखें 👆</div>
            </div>
          </div>

          {/* Quick Mark Toolbar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={handleMarkAllPresent} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                <Check size={14} />
                <span>सभी उपस्थित (All Present)</span>
              </button>
              <button onClick={handleClearAll} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                <X size={14} />
                <span>रिक्त करें</span>
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {isLocked && (
                <span className="badge badge-primary" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Lock size={12} />
                  <span>दिन का आधिकारिक रिकॉर्ड लॉक है</span>
                </span>
              )}
              <button onClick={handleSave} className="btn btn-primary" style={{ padding: '8px 18px', fontSize: '0.85rem' }}>
                <ShieldCheck size={16} />
                <span>उपस्थिति दर्ज करें व सहेजें (Lock Today)</span>
              </button>
            </div>
          </div>

          {/* Records Table */}
          <div className="card" style={{ padding: 0, overflow: 'hidden', border: '1px solid var(--color-border)' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.86rem' }}>
                <thead>
                  <tr style={{ background: 'var(--color-bg)', borderBottom: '2px solid var(--color-border)' }}>
                    <th style={{ padding: '12px 16px' }}>क्रमांक</th>
                    <th style={{ padding: '12px 16px' }}>विद्यार्थी का नाम</th>
                    <th style={{ padding: '12px 16px' }}>मातृभाषा</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center' }}>उपस्थिति स्थिति (Status)</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map(r => (
                    <tr key={r.studentId} style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--color-primary)' }}>
                        {r.rollNumber}
                      </td>
                      <td style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--color-text)' }}>
                        {r.name}
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <span className="badge badge-secondary">
                          {r.motherTongue.toUpperCase()}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                        <div style={{ display: 'inline-flex', gap: '4px', background: 'var(--color-bg)', padding: '3px', borderRadius: 'var(--radius-md)' }}>
                          <button
                            onClick={() => handleStatusChange(r.studentId, 'PRESENT')}
                            className={`btn ${r.status === 'PRESENT' ? 'btn-primary' : 'btn-secondary'}`}
                            style={{
                              padding: '4px 12px',
                              fontSize: '0.78rem',
                              background: r.status === 'PRESENT' ? '#10B981' : 'transparent',
                              borderColor: r.status === 'PRESENT' ? '#10B981' : 'transparent',
                              color: r.status === 'PRESENT' ? '#FFFFFF' : 'var(--color-text)'
                            }}
                          >
                            उपस्थित (P)
                          </button>
                          <button
                            onClick={() => handleStatusChange(r.studentId, 'LATE')}
                            className={`btn ${r.status === 'LATE' ? 'btn-accent' : 'btn-secondary'}`}
                            style={{
                              padding: '4px 12px',
                              fontSize: '0.78rem',
                              background: r.status === 'LATE' ? '#F59E0B' : 'transparent',
                              borderColor: r.status === 'LATE' ? '#F59E0B' : 'transparent',
                              color: r.status === 'LATE' ? '#FFFFFF' : 'var(--color-text)'
                            }}
                          >
                            विलंब (L)
                          </button>
                          <button
                            onClick={() => handleStatusChange(r.studentId, 'ABSENT')}
                            className={`btn ${r.status === 'ABSENT' ? 'btn-secondary' : 'btn-secondary'}`}
                            style={{
                              padding: '4px 12px',
                              fontSize: '0.78rem',
                              background: r.status === 'ABSENT' ? 'var(--color-error)' : 'transparent',
                              borderColor: r.status === 'ABSENT' ? 'var(--color-error)' : 'transparent',
                              color: r.status === 'ABSENT' ? '#FFFFFF' : 'var(--color-text)'
                            }}
                          >
                            अनुपस्थित (A)
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: CALENDAR STRENGTH HEATMAP MODE */}
      {viewMode === 'calendar' && (
        <div>
          {/* Month Header Controller */}
          <div className="card" style={{ marginBottom: '20px', padding: '14px 18px', background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button onClick={handlePrevMonth} className="btn btn-secondary" style={{ padding: '6px 10px' }}>
                  <ChevronLeft size={16} />
                </button>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-text)' }}>
                  {monthNames[calMonth - 1]} {calYear}
                </div>
                <button onClick={handleNextMonth} className="btn btn-secondary" style={{ padding: '6px 10px' }}>
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* Summary Pills */}
              <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                  कार्य दिवस: <strong>{calendarMetrics.workingDays} दिन</strong>
                </div>
                <div style={{ fontSize: '0.82rem', color: calendarMetrics.workingDays > 0 ? '#10B981' : 'var(--color-text-muted)' }}>
                  मासिक औसत उपस्थिति: <strong>{calendarMetrics.workingDays > 0 ? `${calendarMetrics.averageAttendance}%` : '— (डेटा प्रतीक्षित)'}</strong>
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--color-accent)' }}>
                  कुल परोसी गई MDM थालियाँ: <strong>{calendarMetrics.totalMealsServed}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Daily Strength Bar Chart (SVG) */}
          <div className="card" style={{ marginBottom: '20px', padding: '16px', background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--color-text)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <TrendingUp size={16} color="var(--color-primary)" />
                <span>दैनिक छात्र उपस्थिति रुझान (Daily Student Strength Chart - %):</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', fontSize: '0.72rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }}></span>
                  उत्कृष्ट (≥85%)
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F59E0B' }}></span>
                  मध्यम (70-84%)
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#EF4444' }}></span>
                  कम (&lt;70%)
                </span>
              </div>
            </div>

            {/* SVG Responsive Bar Graph */}
            <div style={{ width: '100%', height: '140px', overflowX: 'auto' }}>
              <svg width="100%" height="100%" viewBox="0 0 700 130" preserveAspectRatio="none">
                <line x1="0" y1="110" x2="700" y2="110" stroke="var(--color-border)" strokeWidth="1" />
                <line x1="0" y1="30" x2="700" y2="30" stroke="var(--color-border)" strokeDasharray="3 3" strokeWidth="1" />
                {calendarDays.map((d, i) => {
                  const x = (i / Math.max(1, calendarDays.length)) * 680 + 10;
                  const isEffective = d.isRecorded && !d.isSunday;
                  const barH = isEffective ? Math.max(8, (d.attendancePercentage / 100) * 80) : 0;
                  const y = 110 - barH;
                  const color = d.attendancePercentage >= 85 ? '#10B981' : d.attendancePercentage >= 70 ? '#F59E0B' : '#EF4444';

                  return (
                    <g key={d.date} style={{ cursor: 'pointer' }} onClick={() => { setSelectedDate(d.date); setViewMode('register'); }}>
                      {isEffective && (
                        <rect x={x} y={y} width="14" height={barH} rx="3" fill={color} opacity={0.88} />
                      )}
                      <text x={x + 7} y="124" fontSize="8" fill={d.isRecorded ? 'var(--color-text)' : 'var(--color-text-muted)'} textAnchor="middle">{d.day}</text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Calendar Month Grid */}
          <div className="card" style={{ padding: '16px', background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', textAlign: 'center', marginBottom: '8px' }}>
              {['रवि (Sun)', 'सोम (Mon)', 'मंगल (Tue)', 'बुध (Wed)', 'गुरु (Thu)', 'शुक्र (Fri)', 'शनि (Sat)'].map((w, idx) => (
                <div key={idx} style={{ fontSize: '0.78rem', fontWeight: 700, color: idx === 0 ? 'var(--color-error)' : 'var(--color-text-muted)', padding: '6px 0' }}>
                  {w}
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
              {/* Blank offset for first day */}
              {Array.from({ length: calendarDays[0]?.dayOfWeek || 0 }).map((_, idx) => (
                <div key={`offset_${idx}`} style={{ minHeight: '80px', background: 'transparent' }} />
              ))}

              {/* Day Cells */}
              {calendarDays.map(d => {
                const isSelected = d.date === selectedDate;
                const statusColor = d.attendancePercentage >= 85
                  ? '#10B981'
                  : d.attendancePercentage >= 70
                  ? '#F59E0B'
                  : '#EF4444';

                return (
                  <div
                    key={d.date}
                    onClick={() => {
                      setSelectedDate(d.date);
                      setViewMode('register');
                    }}
                    style={{
                      minHeight: '85px',
                      padding: '8px',
                      borderRadius: 'var(--radius-md)',
                      background: isSelected ? 'var(--color-primary-subtle)' : d.isSunday ? 'var(--color-bg)' : 'var(--color-surface)',
                      border: isSelected ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'all 150ms'
                    }}
                    title={d.isSunday ? 'रविवार अवकाश' : d.isRecorded ? `दिनांक ${d.date}: ${d.presentCount}/${d.totalStudents} उपस्थित (${d.attendancePercentage}%)` : `दिनांक ${d.date}: उपस्थिति दर्ज नहीं हुई`}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.88rem', fontWeight: 800, color: d.isSunday ? 'var(--color-error)' : 'var(--color-text)' }}>
                        {d.day}
                      </span>
                      {d.isRecorded && !d.isSunday && (
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: statusColor }} />
                      )}
                    </div>

                    {d.isSunday ? (
                      <div style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)', textAlign: 'center' }}>
                        रविवार अवकाश
                      </div>
                    ) : d.isRecorded ? (
                      <div>
                        <div style={{ fontSize: '0.78rem', fontWeight: 700, color: statusColor }}>
                          {d.presentCount}/{d.totalStudents} छात्र
                        </div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)' }}>
                          {d.attendancePercentage}% • {d.mdmCount} भोजन
                        </div>
                      </div>
                    ) : (
                      <div style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)', textAlign: 'center', opacity: 0.6 }}>
                        — दर्ज नहीं
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: HISTORICAL AUDIT MODE */}
      {viewMode === 'history' && (
        <div className="card" style={{ padding: 0, overflow: 'hidden', border: '1px solid var(--color-border)' }}>
          <div style={{ padding: '14px 18px', background: 'var(--color-bg)', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-text)' }}>
              विगत उपस्थिति पंजी रजिस्टर (Past Recorded Attendance Audit)
            </span>
            <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
              कुल {historyRecords.length} रिकॉर्ड दर्ज
            </span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.86rem' }}>
              <thead>
                <tr style={{ background: 'var(--color-surface)', borderBottom: '2px solid var(--color-border)' }}>
                  <th style={{ padding: '12px 16px' }}>दिनांक (Date)</th>
                  <th style={{ padding: '12px 16px' }}>कक्षा व अनुभाग</th>
                  <th style={{ padding: '12px 16px' }}>उपस्थित / कुल छात्र</th>
                  <th style={{ padding: '12px 16px' }}>उपस्थिति %</th>
                  <th style={{ padding: '12px 16px' }}>MDM संख्या</th>
                  <th style={{ padding: '12px 16px' }}>कक्षा शिक्षक</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right' }}>कार्रवाई</th>
                </tr>
              </thead>
              <tbody>
                {historyRecords.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ padding: '32px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                      अभी तक कोई ऐतिहासिक उपस्थिति रिकॉर्ड नहीं मिला है।
                    </td>
                  </tr>
                ) : (
                  historyRecords.map((h, idx) => {
                    const pct = Math.round((h.presentCount / Math.max(1, h.totalStudents)) * 100);
                    return (
                      <tr key={idx} style={{ borderBottom: '1px solid var(--color-border)' }}>
                        <td style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--color-primary)' }}>
                          {h.date}
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          कक्षा {h.grade}-{h.section}
                        </td>
                        <td style={{ padding: '12px 16px', fontWeight: 600 }}>
                          {h.presentCount} / {h.totalStudents}
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          <span style={{ color: pct >= 85 ? '#10B981' : '#F59E0B', fontWeight: 700 }}>
                            {pct}%
                          </span>
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          {h.mdmEligibleCount} थालियाँ
                        </td>
                        <td style={{ padding: '12px 16px', color: 'var(--color-text-muted)' }}>
                          {h.teacherName || 'राजेश मुर्मु'}
                        </td>
                        <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                          <button
                            onClick={() => {
                              setSelectedDate(h.date);
                              setViewMode('register');
                            }}
                            className="btn btn-secondary"
                            style={{ padding: '4px 10px', fontSize: '0.78rem' }}
                          >
                            रजिस्टर खोलें
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MDM Kitchen Ration Modal */}
      {isMdmModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '560px' }}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                🍲 दैनिक मध्याह्न भोजन (MDM) रसोई पर्ची
              </h3>
              <button onClick={() => setIsMdmModalOpen(false)} style={{ border: 'none', background: 'transparent', fontSize: '1.4rem', cursor: 'pointer' }}>×</button>
            </div>
            <div className="modal-body">
              <div style={{ background: 'var(--color-bg)', padding: '14px', borderRadius: 'var(--radius-md)', marginBottom: '16px', border: '1px solid var(--color-border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span>दिनांक: <strong>{selectedDate}</strong></span>
                  <span>कक्षा: <strong>{selectedGrade}-{selectedSection}</strong></span>
                  <span>लाभार्थी छात्र: <strong style={{ color: 'var(--color-accent)' }}>{presentCount}</strong></span>
                </div>
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', marginBottom: '16px' }}>
                <thead>
                  <tr style={{ background: 'var(--color-surface)', borderBottom: '2px solid var(--color-border)' }}>
                    <th style={{ padding: '8px' }}>सामग्री</th>
                    <th style={{ padding: '8px' }}>प्रति छात्र मानक</th>
                    <th style={{ padding: '8px', textAlign: 'right' }}>कुल आवश्यक मात्रा</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '8px' }}>चावल (Rice)</td>
                    <td style={{ padding: '8px' }}>{ricePerChildKg * 1000} ग्राम</td>
                    <td style={{ padding: '8px', textAlign: 'right', fontWeight: 700 }}>{totalRiceKg} कि.ग्रा.</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '8px' }}>दाल (Pulses)</td>
                    <td style={{ padding: '8px' }}>{dalPerChildKg * 1000} ग्राम</td>
                    <td style={{ padding: '8px', textAlign: 'right', fontWeight: 700 }}>{totalDalKg} कि.ग्रा.</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '8px' }}>हरी सब्ज़ियाँ (Vegetables)</td>
                    <td style={{ padding: '8px' }}>{vegPerChildKg * 1000} ग्राम</td>
                    <td style={{ padding: '8px', textAlign: 'right', fontWeight: 700 }}>{totalVegKg} कि.ग्रा.</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '8px' }}>खाद्य तेल (Cooking Oil)</td>
                    <td style={{ padding: '8px' }}>{oilPerChildKg * 1000} ग्राम</td>
                    <td style={{ padding: '8px', textAlign: 'right', fontWeight: 700 }}>{totalOilKg} कि.ग्रा.</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px', fontWeight: 700 }}>दैनिक कुकिंग लागत (Cooking Cost)</td>
                    <td style={{ padding: '8px' }}>₹{cookingCostRate} / छात्र</td>
                    <td style={{ padding: '8px', textAlign: 'right', fontWeight: 800, color: 'var(--color-accent)' }}>₹{totalCookingCost}</td>
                  </tr>
                </tbody>
              </table>

              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', borderTop: '1px solid var(--color-border)', paddingTop: '10px' }}>
                * झारखंड राज्य मध्याह्न भोजन प्राधिकरण के प्राथमिक विद्यालय पोषण मानकों के अनुसार संगणित।
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={() => window.print()} className="btn btn-secondary">
                <Printer size={15} />
                <span>प्रिंट निकालें</span>
              </button>
              <button onClick={() => setIsMdmModalOpen(false)} className="btn btn-primary">बंद करें</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
