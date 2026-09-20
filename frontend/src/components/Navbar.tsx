import React, { useState, useEffect, useRef } from 'react';
import { useApp, ActiveTeacher } from '../core/context/AppContext';
import { api } from '../core/api/client';
import {
  Wifi,
  WifiOff,
  RefreshCw,
  Trophy,
  Globe,
  Sun,
  Moon,
  Menu,
  X,
  Home,
  Sparkles,
  Mic,
  FileText,
  Layers,
  Target,
  BookOpen,
  Download,
  BarChart2,
  CalendarCheck,
  Settings,
  PenTool,
  QrCode,
  Volume2,
  Users,
  ChevronDown,
  Search,
  Check,
  Compass,
  ArrowRight,
  ArrowLeft,
  UserCheck,
  Utensils
} from 'lucide-react';

export interface NavTool {
  id: string;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  category: 'classroom' | 'pedagogy' | 'assessment' | 'admin';
  quickPill?: boolean;
}

export interface NavCategory {
  id: 'classroom' | 'pedagogy' | 'assessment' | 'admin';
  name: string;
  shortName: string;
  icon: string;
  description: string;
}

export const NAV_CATEGORIES: NavCategory[] = [
  {
    id: 'classroom',
    name: 'कक्षा प्रबंधन',
    shortName: 'प्रबंधन',
    icon: '🏫',
    description: 'दैनिक उपस्थिति, नामांकन व शिक्षक प्रोफ़ाइल'
  },
  {
    id: 'pedagogy',
    name: 'शिक्षण व FLN',
    shortName: 'FLN शिक्षण',
    icon: '✨',
    description: 'द्विभाषी पाठ, अक्षर सेतु, वाचन प्रवाह व AI सारथी'
  },
  {
    id: 'assessment',
    name: 'मूल्यांकन व अभ्यास',
    shortName: 'मूल्यांकन',
    icon: '📝',
    description: 'कार्यपत्रक, परीक्षा पत्र, फ़्लैशकार्ड व उपचारात्मक शिक्षण'
  },
  {
    id: 'admin',
    name: 'प्रशासन व साधन',
    shortName: 'प्रशासन',
    icon: '⚙️',
    description: 'जनजातीय भाषा बैंक, ऑफ़लाइन पैक व सेटिंग्स'
  }
];

export const NAV_ITEMS: NavTool[] = [
  // Pillar 1: कक्षा प्रबंधन
  {
    id: 'dashboard',
    label: 'मुख्य डैशबोर्ड',
    sublabel: 'दैनिक उपस्थिति व कक्षा प्रगति सारांश',
    icon: <Home size={16} />,
    category: 'classroom',
    quickPill: true
  },
  {
    id: 'attendance',
    label: 'दैनिक उपस्थिति',
    sublabel: 'स्मार्ट कैलेंडर व शक्ति ट्रैकिंग',
    icon: <CalendarCheck size={16} />,
    category: 'classroom',
    quickPill: true
  },
  {
    id: 'management',
    label: 'विद्यार्थी / शिक्षक',
    sublabel: 'नामांकन, कक्षा/वर्ग व प्रोफ़ाइल प्रबंधन',
    icon: <Users size={16} />,
    category: 'classroom',
    quickPill: true
  },
  {
    id: 'mdm',
    label: 'मध्याह्न भोजन (MDM)',
    sublabel: 'दैनिक राशन पर्ची, स्टॉक व कुक गाइड',
    icon: <Utensils size={16} />,
    category: 'classroom',
    quickPill: true
  },

  // Pillar 2: शिक्षण व FLN
  {
    id: 'smartteach',
    label: 'स्मार्ट टीच',
    sublabel: 'द्विभाषी सचित्र पाठ व ब्लैकबोर्ड योजना',
    icon: <Sparkles size={16} />,
    category: 'pedagogy',
    quickPill: true
  },
  {
    id: 'tracing',
    label: 'अक्षर सेतु',
    sublabel: 'ओल चिकी व देवनागरी वर्ण अनुरेखण',
    icon: <PenTool size={16} />,
    category: 'pedagogy',
    quickPill: true
  },
  {
    id: 'fluency',
    label: 'वाचन प्रवाह (FLN)',
    sublabel: 'रियल-टाइम माइक्रोफ़ोन वाचन मूल्यांकन',
    icon: <Volume2 size={16} />,
    category: 'pedagogy',
    quickPill: true
  },
  {
    id: 'copilot',
    label: 'पलाश संगी (AI)',
    sublabel: 'मातृभाषा शिक्षण व कक्षा सहायक AI',
    icon: <Sparkles size={16} />,
    category: 'pedagogy',
    quickPill: true
  },
  {
    id: 'storybooks',
    label: 'बाल कथा संकलन',
    sublabel: '20 सचित्र द्विभाषी ऑडियो लोक कथाएं',
    icon: <BookOpen size={16} />,
    category: 'pedagogy'
  },
  {
    id: 'voice',
    label: 'वाक अनुवाद',
    sublabel: 'लाइव माइक्रोफ़ोन द्विभाषी कक्षा अनुवाद',
    icon: <Mic size={16} />,
    category: 'pedagogy'
  },

  // Pillar 3: मूल्यांकन व अभ्यास
  {
    id: 'worksheets',
    label: 'कार्यपत्रक (Worksheets)',
    sublabel: 'कक्षा 1-10 हेतु प्रिंटेबल अभ्यास पत्र',
    icon: <FileText size={16} />,
    category: 'assessment'
  },
  {
    id: 'exams',
    label: 'परीक्षा प्रश्नपत्र',
    sublabel: 'ब्लूप्रिंट आधारित द्विभाषी प्रश्नपत्र',
    icon: <FileText size={16} />,
    category: 'assessment'
  },
  {
    id: 'flashcards',
    label: 'फ़्लैशकार्ड',
    sublabel: 'स्पेस रिपीटिशन शब्दावली अभ्यास',
    icon: <Layers size={16} />,
    category: 'assessment'
  },
  {
    id: 'remediation',
    label: 'उपचारात्मक शिक्षण',
    sublabel: 'व्यक्तिगत शिक्षण अंतर पहचान व निदान',
    icon: <Target size={16} />,
    category: 'assessment'
  },
  {
    id: 'qrscanner',
    label: 'पाठ्यपुस्तक QR',
    sublabel: 'JCERT/NCERT पुस्तक कोड से सीधा पाठ',
    icon: <QrCode size={16} />,
    category: 'assessment'
  },

  // Pillar 4: प्रशासन व साधन
  {
    id: 'knowledgebank',
    label: 'जनजातीय भाषा बैंक',
    sublabel: 'सत्यापित शब्दावली व सामुदायिक शब्दकोश',
    icon: <BookOpen size={16} />,
    category: 'admin'
  },
  {
    id: 'contentpacks',
    label: 'ऑफ़लाइन भाषा पैक',
    sublabel: 'बिना इंटरनेट संचालन हेतु स्थानीय कैशे',
    icon: <Download size={16} />,
    category: 'admin'
  },
  {
    id: 'admin',
    label: 'प्रशासनिक एनालिटिक्स',
    sublabel: 'सत्र, ब्लॉक व जिला स्तरीय शिक्षण रिपोर्ट',
    icon: <BarChart2 size={16} />,
    category: 'admin'
  },
  {
    id: 'settings',
    label: 'सेटिंग्स व डेटा नियंत्रण',
    sublabel: 'आवाज ट्रेबल इक्वलाइज़र व फ़ैक्ट्री रीसेट',
    icon: <Settings size={16} />,
    category: 'admin'
  }
];

export const ALL_SYSTEM_TEACHERS = [
  {
    id: 'tr_jaipal_01',
    employeeCode: 'JH-PRT-1042',
    name: 'जयपाल मुंडा (Jaipal Munda)',
    designation: 'सहायक शिक्षक (PRT - FLN)',
    primarySubject: 'गणित व भाषा (Math & Vernacular)',
    languagesSpoken: ['sat', 'hoc', 'unr', 'hi'],
    assignedGrades: [1, 2],
    phone: '9431102941'
  },
  {
    id: 'tr_birsa_02',
    employeeCode: 'JH-TGT-2085',
    name: 'बिरसा पूर्ति (Birsa Purty)',
    designation: 'प्रशिक्षित स्नातक शिक्षक (TGT - Math/Sci)',
    primarySubject: 'गणित व विज्ञान (Mathematics & Science)',
    languagesSpoken: ['hoc', 'hi', 'en'],
    assignedGrades: [3, 4, 5],
    phone: '9431872145'
  },
  {
    id: 'tr_anjali_03',
    employeeCode: 'JH-PRT-3190',
    name: 'अंजली टुडू (Anjali Tudu)',
    designation: 'सहायक शिक्षिका (PRT - Early FLN)',
    primarySubject: 'भाषा व बाल साहित्य (Language & Early FLN)',
    languagesSpoken: ['sat', 'kyw', 'hi', 'en'],
    assignedGrades: [1, 2, 3],
    phone: '9431548820'
  }
];

interface NavbarProps {
  onOpenDemo: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDemo, activeTab, setActiveTab }) => {
  const {
    theme,
    toggleTheme,
    isOffline,
    toggleOffline,
    targetLanguage,
    setTargetLanguage,
    pendingSyncCount,
    triggerSync,
    isSyncing,
    registeredLanguages,
    activeTeacher,
    setActiveTeacher
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isPaletteOpen, setIsPaletteOpen] = useState<boolean>(false);
  const [paletteSearch, setPaletteSearch] = useState<string>('');
  const [paletteCategory, setPaletteCategory] = useState<string>('all');
  const [isTeacherMenuOpen, setIsTeacherMenuOpen] = useState<boolean>(false);

  // Real-time step trail tracking opened pages in current session
  const [pageHistory, setPageHistory] = useState<string[]>(() => [activeTab]);

  useEffect(() => {
    setPageHistory(prev => {
      if (prev.length === 0) return [activeTab];
      if (prev[prev.length - 1] === activeTab) return prev;
      const updated = [...prev, activeTab];
      return updated.slice(-4); // Keep last 4 steps for optimal compactness
    });
  }, [activeTab]);

  const handleHistoryStepClick = (tabId: string, index: number) => {
    setActiveTab(tabId);
    setPageHistory(prev => prev.slice(0, index + 1));
  };

  const handleGoBack = () => {
    if (pageHistory.length > 1) {
      const prevTab = pageHistory[pageHistory.length - 2];
      setActiveTab(prevTab);
      setPageHistory(prev => prev.slice(0, prev.length - 1));
    }
  };

  const handleRootClick = () => {
    setActiveTab('dashboard');
    setPageHistory(['dashboard']);
    setOpenDropdown(null);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const teacherMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
      if (teacherMenuRef.current && !teacherMenuRef.current.contains(event.target as Node)) {
        setIsTeacherMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcut: Ctrl+K or Cmd+K to launch all tools palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsPaletteOpen(prev => !prev);
      } else if (e.key === 'Escape') {
        setIsPaletteOpen(false);
        setOpenDropdown(null);
        setIsTeacherMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Auto focus search on palette open
  useEffect(() => {
    if (isPaletteOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    } else {
      setPaletteSearch('');
    }
  }, [isPaletteOpen]);

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setOpenDropdown(null);
    setIsMobileMenuOpen(false);
    setIsPaletteOpen(false);
    setIsTeacherMenuOpen(false);
  };

  const handleSelectTeacher = async (teacher: typeof ALL_SYSTEM_TEACHERS[0]) => {
    const fullTeacher: ActiveTeacher = {
      id: teacher.id,
      employeeCode: teacher.employeeCode,
      name: teacher.name,
      designation: teacher.designation,
      primarySubject: teacher.primarySubject,
      languagesSpoken: teacher.languagesSpoken,
      assignedGrades: teacher.assignedGrades,
      phone: teacher.phone,
      isCurrentActive: true
    };

    setActiveTeacher(fullTeacher);
    setIsTeacherMenuOpen(false);

    try {
      await api.post('/teachers/active', { teacherId: teacher.id });
    } catch (err) {
      console.warn('Set active teacher API warning:', err);
    }
  };

  const activeTool = NAV_ITEMS.find(item => item.id === activeTab) || NAV_ITEMS[0];
  const activeCategory = NAV_CATEGORIES.find(cat => cat.id === activeTool.category);

  // Filter tools for Command Palette
  const filteredTools = NAV_ITEMS.filter(item => {
    const matchesCat = paletteCategory === 'all' || item.category === paletteCategory;
    const query = paletteSearch.toLowerCase().trim();
    if (!query) return matchesCat;

    const matchesQuery =
      item.label.toLowerCase().includes(query) ||
      item.sublabel.toLowerCase().includes(query) ||
      item.id.toLowerCase().includes(query);

    return matchesCat && matchesQuery;
  });

  return (
    <header className="app-header" ref={dropdownRef}>
      {/* Top Primary Bar */}
      <div className="header-inner">
        {/* Brand Logo & Mobile Trigger */}
        <div className="header-brand-group">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="hamburger-btn"
            aria-label="नेविगेशन मेनू खोलें"
          >
            <Menu size={20} />
          </button>

          <div className="brand-badge" onClick={() => handleNavClick('dashboard')}>
            <div className="brand-logo">🌺</div>
            <div className="brand-titles">
              <div className="brand-name">
                पलाश मित्र
                <span className="brand-tag">JHARKHAND</span>
              </div>
              <div className="brand-tagline">VERNACULAR PEDAGOGY OS • NEP 2020</div>
            </div>
          </div>
        </div>

        {/* Global Controls & Status Clusters */}
        <div className="header-actions">
          {/* Cluster 1: Context & Pedagogy Controls */}
          <div className="header-cluster-context">
            {/* Quick Launcher Trigger (Ctrl+K) */}
            <button
              onClick={() => setIsPaletteOpen(true)}
              className="nav-all-tools-btn"
              title="सभी 18 साधन खोजें व खोलें (Ctrl+K)"
            >
              <Search size={14} />
              <span className="all-tools-text">साधन खोजें</span>
              <kbd className="kbd-shortcut">Ctrl K</kbd>
            </button>

            {/* Language Matrix Selector */}
            <div className="lang-select-pill" title="सक्रिय शिक्षण व अनुवाद भाषा">
              <Globe size={15} color="var(--color-primary)" />
              <select
                value={targetLanguage}
                onChange={e => setTargetLanguage(e.target.value)}
                className="lang-native-select"
              >
                {registeredLanguages.map(l => (
                  <option key={l.code} value={l.code}>
                    {l.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Interactive Active Teacher Selector Pill with Popover */}
            <div className="teacher-picker-wrapper" ref={teacherMenuRef}>
              <button
                type="button"
                onClick={() => setIsTeacherMenuOpen(prev => !prev)}
                className={`teacher-picker-btn ${isTeacherMenuOpen ? 'open' : ''}`}
                title="शिक्षक बदलें (क्लिक करें)"
                aria-expanded={isTeacherMenuOpen}
              >
                <span className="teacher-avatar-icon">
                  {activeTeacher?.name?.includes('अंजली') ? '👩‍🏫' : '👨‍🏫'}
                </span>
                <div className="teacher-picker-meta">
                  <span className="teacher-name-text">
                    {activeTeacher ? activeTeacher.name.split(' ')[0] : 'जयपाल'}
                  </span>
                  <span className="teacher-badge-tag">
                    {activeTeacher?.designation?.includes('TGT') ? 'TGT' : 'PRT'}
                  </span>
                </div>
                <ChevronDown size={13} className={`teacher-chevron ${isTeacherMenuOpen ? 'rotated' : ''}`} />
              </button>

              {/* Teacher Switcher Popover Card */}
              {isTeacherMenuOpen && (
                <div className="teacher-popover-card">
                  <div className="popover-header">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--color-text)' }}>
                        👨‍🏫 सक्रिय शिक्षक चयन
                      </div>
                      <span className="badge badge-primary" style={{ fontSize: '0.68rem', padding: '2px 7px' }}>
                        3 शिक्षक पंजीकृत
                      </span>
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)', marginTop: '3px' }}>
                      शिक्षक बदलते ही डैशबोर्ड, कक्षा आवंटन व AI सारथी स्वतः अपडेट होंगे
                    </div>
                  </div>

                  <div className="teacher-list-body">
                    {ALL_SYSTEM_TEACHERS.map(t => {
                      const isCurrent = activeTeacher?.id === t.id || (activeTeacher && activeTeacher.name.includes(t.name.split(' ')[0]));
                      return (
                        <div
                          key={t.id}
                          onClick={() => handleSelectTeacher(t)}
                          className={`teacher-option-card ${isCurrent ? 'active' : ''}`}
                        >
                          <div className="teacher-option-avatar">
                            {t.id === 'tr_anjali_03' ? '👩‍🏫' : '👨‍🏫'}
                          </div>
                          <div className="teacher-option-info">
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <span className="teacher-option-name">{t.name}</span>
                              {isCurrent && (
                                <span className="active-pill-badge">✓ सक्रिय</span>
                              )}
                            </div>
                            <div className="teacher-option-designation">
                              {t.employeeCode} • {t.designation}
                            </div>
                            <div className="teacher-option-grades">
                              <span className="grade-label">आवंटित:</span>
                              {t.assignedGrades.map(g => (
                                <span key={g} className="grade-chip">कक्षा {g}</span>
                              ))}
                              <span className="subject-hint">• {t.primarySubject}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="popover-footer">
                    <button
                      onClick={() => {
                        setIsTeacherMenuOpen(false);
                        handleNavClick('management');
                      }}
                      className="btn-manage-link"
                    >
                      <span>विद्यार्थी व शिक्षक प्रबंधन खोलें</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Cluster 2: System Utilities */}
          <div className="header-cluster-system">
            {/* Pure Black & White Theme Switcher */}
            <button
              onClick={toggleTheme}
              className="theme-toggle-btn"
              title={theme === 'light' ? 'डार्क / ब्लैक मोड सक्रिय करें' : 'लाइट / वाइट मोड सक्रिय करें'}
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon size={17} /> : <Sun size={17} color="#FBBF24" />}
            </button>

            {/* Sync Button */}
            <button
              onClick={triggerSync}
              disabled={isSyncing || pendingSyncCount === 0 || isOffline}
              className="btn btn-secondary sync-pill-btn"
              title={pendingSyncCount > 0 ? `${pendingSyncCount} क्रियाएं कतार में हैं` : 'क्लाउड से सिंक है'}
            >
              <RefreshCw size={13} className={isSyncing ? 'spin-anim' : ''} />
              <span className="sync-text">सिंक {pendingSyncCount > 0 && `(${pendingSyncCount})`}</span>
            </button>

            {/* Offline / Online Status Pill */}
            <div
              onClick={toggleOffline}
              className={`status-pill ${isOffline ? 'offline' : 'online'}`}
              title="क्लिक करके ऑफ़लाइन / ऑनलाइन मोड बदलें"
            >
              {isOffline ? <WifiOff size={13} /> : <Wifi size={13} />}
              <span className="status-dot"></span>
              <span className="status-text">{isOffline ? 'ऑफ़लाइन' : 'ऑनलाइन'}</span>
            </div>

            {/* SIH Demo Mode Launcher */}
            <button onClick={onOpenDemo} className="btn btn-sih-demo" title="Smart India Hackathon 2024 जूरी लाइव डेमो खोलें">
              <Trophy size={14} color="#F59E0B" />
              <span className="demo-btn-text">SIH DEMO</span>
            </button>
          </div>
        </div>
      </div>

      {/* Offline Alert Banner */}
      {isOffline && (
        <div className="offline-banner">
          <WifiOff size={15} />
          <span>● ऑफ़लाइन मोड: स्थानीय 5-भाषा पैक सक्रिय है। बिना इंटरनेट के पाठ, उपस्थिति व अनुवाद उपलब्ध हैं।</span>
        </div>
      )}

      {/* Desktop Unified Slim Sub-Bar: Real-Time Step Trail (Left) + 4 Pillar Dropdowns (Right) */}
      <div className="compact-subnav-bar">
        {/* Left: Real-Time Session Step Trail */}
        <div className="history-trail-flow">
          {pageHistory.length > 1 && (
            <button
              type="button"
              onClick={handleGoBack}
              className="btn-history-back"
              title="पिछले पृष्ठ पर वापस जाएं"
            >
              <ArrowLeft size={12} />
              <span>वापस</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleRootClick}
            className="history-root-btn"
            title="मुख्य डैशबोर्ड पर जाएं"
          >
            <span>🌺 पलाश मित्र</span>
          </button>

          {pageHistory.map((stepTabId, idx) => {
            const tool = NAV_ITEMS.find(i => i.id === stepTabId);
            if (!tool) return null;
            const isCurrent = activeTab === stepTabId;
            const isLast = idx === pageHistory.length - 1;

            return (
              <React.Fragment key={`${stepTabId}-${idx}`}>
                <span className="history-trail-chevron">›</span>
                <button
                  type="button"
                  onClick={() => handleHistoryStepClick(stepTabId, idx)}
                  className={`history-step-pill ${isCurrent || isLast ? 'active' : ''}`}
                  title={`${idx + 1}. ${tool.label} — ${tool.sublabel}`}
                >
                  <span className="step-badge">{idx + 1}</span>
                  <span className="step-icon">{tool.icon}</span>
                  <span className="step-name">{tool.label}</span>
                  {(isCurrent || isLast) && <span className="step-live-indicator" title="वर्तमान सक्रिय पृष्ठ">● सक्रिय</span>}
                </button>
              </React.Fragment>
            );
          })}
        </div>

        {/* Right: 4 Pillar Dropdowns */}
        <div className="nav-dropdown-group compact">
          {NAV_CATEGORIES.map(category => {
            const itemsInCat = NAV_ITEMS.filter(i => i.category === category.id);
            const isCatActive = activeTool.category === category.id;
            const isOpen = openDropdown === category.id;

            return (
              <div key={category.id} className="nav-dropdown-wrapper">
                <button
                  type="button"
                  className={`nav-dropdown-trigger compact ${isCatActive ? 'has-active' : ''} ${isOpen ? 'open' : ''}`}
                  onClick={() => setOpenDropdown(isOpen ? null : category.id)}
                  aria-expanded={isOpen}
                >
                  <span className="cat-icon">{category.icon}</span>
                  <span className="cat-name">{category.name}</span>
                  <span className="cat-count">({itemsInCat.length})</span>
                  <ChevronDown size={13} className={`dropdown-chevron ${isOpen ? 'rotated' : ''}`} />
                </button>

                {/* Dropdown Floating Card */}
                {isOpen && (
                  <div className="nav-dropdown-card">
                    <div className="dropdown-card-header">
                      <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--color-primary)' }}>
                        {category.icon} {category.name}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)' }}>
                        {category.description}
                      </div>
                    </div>

                    <div className="dropdown-items-list">
                      {itemsInCat.map(tool => {
                        const isToolActive = activeTab === tool.id;
                        return (
                          <div
                            key={tool.id}
                            className={`dropdown-tool-item ${isToolActive ? 'active' : ''}`}
                            onClick={() => handleNavClick(tool.id)}
                          >
                            <div className="tool-icon-box">{tool.icon}</div>
                            <div className="tool-info">
                              <div className="tool-name">
                                {tool.label}
                                {isToolActive && <Check size={14} color="var(--color-primary)" />}
                              </div>
                              <div className="tool-sub">{tool.sublabel}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Real-Time Step Trail (Visible on Screens < 992px) */}
      <div className="mobile-step-trail">
        {pageHistory.length > 1 && (
          <button
            type="button"
            onClick={handleGoBack}
            className="mobile-back-btn"
            title="पिछला पृष्ठ"
          >
            <ArrowLeft size={13} />
            <span>वापस</span>
          </button>
        )}
        <button
          type="button"
          onClick={handleRootClick}
          className="mobile-root-btn"
          title="डैशबोर्ड"
        >
          🌺
        </button>
        <div className="mobile-steps-scroll">
          {pageHistory.map((stepTabId, idx) => {
            const tool = NAV_ITEMS.find(i => i.id === stepTabId);
            if (!tool) return null;
            const isCurrent = activeTab === stepTabId;
            const isLast = idx === pageHistory.length - 1;

            return (
              <React.Fragment key={`mob-${stepTabId}-${idx}`}>
                <span className="mobile-step-sep">›</span>
                <button
                  type="button"
                  onClick={() => handleHistoryStepClick(stepTabId, idx)}
                  className={`mobile-step-pill ${isCurrent || isLast ? 'active' : ''}`}
                >
                  <span className="mob-badge">{idx + 1}</span>
                  <span className="mob-label">{tool.label}</span>
                  {(isCurrent || isLast) && <span className="mob-dot">●</span>}
                </button>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Command Palette / All 18 Tools Search Modal (Ctrl+K) */}
      {isPaletteOpen && (
        <div className="palette-overlay" onClick={() => setIsPaletteOpen(false)}>
          <div className="palette-modal" onClick={e => e.stopPropagation()}>
            {/* Search Input Bar */}
            <div className="palette-search-bar">
              <Search size={20} color="var(--color-primary)" />
              <input
                ref={searchInputRef}
                type="text"
                value={paletteSearch}
                onChange={e => setPaletteSearch(e.target.value)}
                placeholder="साधन या सुविधा खोजें... (उदा. उपस्थिति, अक्षर, वाचन, परीक्षा, कार्यपत्रक, सेटिंग्स)"
                className="palette-search-input"
              />
              {paletteSearch && (
                <button
                  onClick={() => setPaletteSearch('')}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}
                >
                  <X size={18} />
                </button>
              )}
              <span className="palette-esc-badge">ESC</span>
            </div>

            {/* Category Filter Pills */}
            <div className="palette-cat-pills">
              <button
                className={`palette-filter-pill ${paletteCategory === 'all' ? 'active' : ''}`}
                onClick={() => setPaletteCategory('all')}
              >
                सभी 18 साधन
              </button>
              {NAV_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  className={`palette-filter-pill ${paletteCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setPaletteCategory(cat.id)}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.shortName}</span>
                  <span className="count-badge">{NAV_ITEMS.filter(i => i.category === cat.id).length}</span>
                </button>
              ))}
            </div>

            {/* Results Grid */}
            <div className="palette-grid">
              {filteredTools.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--color-text-muted)' }}>
                  <Search size={36} style={{ margin: '0 auto 12px', opacity: 0.4 }} />
                  <p style={{ fontWeight: 600 }}>कोई साधन नहीं मिला</p>
                  <p style={{ fontSize: '0.82rem' }}>कृपया दूसरा खोज शब्द आज़माएं</p>
                </div>
              ) : (
                filteredTools.map(tool => {
                  const isCurrent = activeTab === tool.id;
                  const cat = NAV_CATEGORIES.find(c => c.id === tool.category);
                  return (
                    <div
                      key={tool.id}
                      className={`palette-tool-card ${isCurrent ? 'active-card' : ''}`}
                      onClick={() => handleNavClick(tool.id)}
                    >
                      <div className="palette-card-top">
                        <div className="card-icon">{tool.icon}</div>
                        <span className="card-cat-badge">{cat?.name}</span>
                        {isCurrent && (
                          <span className="active-badge">
                            <Check size={12} /> सक्रिय
                          </span>
                        )}
                      </div>
                      <div className="card-title">{tool.label}</div>
                      <div className="card-sub">{tool.sublabel}</div>
                      <div className="card-action">
                        <span>खोलें</span>
                        <ArrowRight size={13} />
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Modal Footer */}
            <div className="palette-footer">
              <div>
                <span>नेविगेट करने हेतु क्लिक करें या </span>
                <kbd className="kbd-shortcut">ESC</kbd>
                <span> दबाकर बंद करें</span>
              </div>
              <div style={{ fontWeight: 700, color: 'var(--color-primary)' }}>
                झारखंड एडु-टेक • PALASH MITRA
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Slide-Out Drawer */}
      {isMobileMenuOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="mobile-drawer" onClick={e => e.stopPropagation()}>
            <div className="drawer-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.4rem' }}>🌺</span>
                <div>
                  <span style={{ fontWeight: 800, color: 'var(--color-primary)', fontSize: '1.05rem', display: 'block' }}>
                    पलाश मित्र
                  </span>
                  <span style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                    झारखंड • VERNACULAR OS
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ background: 'transparent', border: 'none', color: 'var(--color-text)', cursor: 'pointer' }}
                aria-label="मेनू बंद करें"
              >
                <X size={22} />
              </button>
            </div>

            {/* Mobile Active Teacher Quick Switcher Card */}
            <div style={{ margin: '14px 16px 6px', padding: '12px', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '12px' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <UserCheck size={13} color="var(--color-primary)" />
                <span>सक्रिय कक्षा शिक्षक (Active Teacher)</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {ALL_SYSTEM_TEACHERS.map(t => {
                  const isCurrent = activeTeacher?.id === t.id || (activeTeacher && activeTeacher.name.includes(t.name.split(' ')[0]));
                  return (
                    <button
                      key={t.id}
                      onClick={() => handleSelectTeacher(t)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 10px',
                        borderRadius: '8px',
                        border: isCurrent ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
                        background: isCurrent ? 'var(--color-primary-subtle)' : 'transparent',
                        cursor: 'pointer',
                        textAlign: 'left'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '1.1rem' }}>{t.id === 'tr_anjali_03' ? '👩‍🏫' : '👨‍🏫'}</span>
                        <div>
                          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-text)' }}>
                            {t.name.split(' ')[0]}
                          </div>
                          <div style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)' }}>
                            {t.employeeCode} • {t.designation.split(' ')[0]}
                          </div>
                        </div>
                      </div>
                      {isCurrent && (
                        <span style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                          ✓ सक्रिय
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Categorized Modules in Drawer */}
            <div className="drawer-content-scroll">
              {NAV_CATEGORIES.map(cat => {
                const catItems = NAV_ITEMS.filter(i => i.category === cat.id);
                return (
                  <div key={cat.id} className="drawer-cat-block">
                    <div className="drawer-cat-title">
                      <span>{cat.icon}</span>
                      <span>{cat.name}</span>
                    </div>
                    <div className="drawer-cat-items">
                      {catItems.map(item => (
                        <button
                          key={item.id}
                          className={`drawer-nav-item ${activeTab === item.id ? 'active' : ''}`}
                          onClick={() => handleNavClick(item.id)}
                        >
                          <div className="drawer-item-icon">{item.icon}</div>
                          <div className="drawer-item-text">
                            <div className="drawer-item-label">{item.label}</div>
                            <div className="drawer-item-sub">{item.sublabel}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: 'auto', borderTop: '1px solid var(--color-border)', padding: '16px' }}>
              <button
                onClick={() => {
                  onOpenDemo();
                  setIsMobileMenuOpen(false);
                }}
                className="btn btn-sih-demo"
                style={{ width: '100%', justifyContent: 'center', padding: '10px' }}
              >
                <Trophy size={16} color="#F59E0B" />
                <span>🏆 SIH जूरी लाइव डेमो मोड</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
