import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api/client';
import { localDb } from '../db/localDb';
import { speechBridge } from '../speech/speechBridge';
import {
  SubjectOption,
  getAvailableSubjectsForGrade,
  isSubjectAllowedForGrade,
  getDefaultSubjectForGrade,
  getTopicsForGradeAndSubject
} from '../curriculum/curriculumData';

export type AppTheme = 'light' | 'dark';
export type SpeechSpeed = 'normal' | 'slow';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'TEACHER' | 'SCHOOL_ADMIN' | 'DISTRICT_ADMIN' | 'LANGUAGE_EXPERT';
  schoolName: string;
  district: string;
  primaryLanguage: string;
  targetLanguages: string[];
}

export interface RegisteredLanguage {
  code: string;
  name: string;
  script: string;
  englishName: string;
  ttsLocale: string;
  rate: number;
  pitch: number;
  isCustom?: boolean;
}

export interface ActiveTeacher {
  id: string;
  employeeCode: string;
  name: string;
  designation: string;
  primarySubject: string;
  languagesSpoken: string[];
  assignedGrades: number[];
  phone?: string;
  isCurrentActive: boolean;
}

export interface AppContextType {
  user: UserProfile;
  setUser: (u: UserProfile) => void;
  activeTeacher: ActiveTeacher | null;
  setActiveTeacher: (t: ActiveTeacher | null) => void;
  theme: AppTheme;
  toggleTheme: () => void;
  isOffline: boolean;
  toggleOffline: () => void;
  sourceLanguage: string;
  setSourceLanguage: (code: string) => void;
  targetLanguage: string;
  setTargetLanguage: (code: string) => void;
  targetLanguageName: string;
  targetScript: string;
  registeredLanguages: RegisteredLanguage[];
  addLanguage: (lang: RegisteredLanguage) => void;
  selectedGrade: number;
  setSelectedGrade: (g: number) => void;
  selectedSection: string;
  setSelectedSection: (sec: string) => void;
  selectedSubject: string;
  setSelectedSubject: (s: string) => void;
  availableSubjects: SubjectOption[];
  currentGradeTopics: string[];
  speechSpeed: SpeechSpeed;
  setSpeechSpeed: (speed: SpeechSpeed) => void;
  pendingSyncCount: number;
  triggerSync: () => Promise<{ syncedCount: number }>;
  isSyncing: boolean;
}

const DEFAULT_LANGUAGES: RegisteredLanguage[] = [
  {
    code: 'sat',
    name: 'ᱥᱟᱱᱛᱟᱲᱤ (Santhali)',
    script: 'Ol Chiki (ᱚᱞ ᱪᱤᱠᱤ)',
    englishName: 'Santhali',
    ttsLocale: 'hi-IN',
    rate: 0.84,
    pitch: 0.98
  },
  {
    code: 'hoc',
    name: 'ᱦᱳ (Ho)',
    script: 'Warang Chiti (𑢹𑣉)',
    englishName: 'Ho',
    ttsLocale: 'hi-IN',
    rate: 0.86,
    pitch: 1.04
  },
  {
    code: 'unr',
    name: 'ᱢᱩᱱᱰᱟᱨᱤ (Mundari)',
    script: 'Mundari Bani / Devanagari',
    englishName: 'Mundari',
    ttsLocale: 'hi-IN',
    rate: 0.85,
    pitch: 1.02
  },
  {
    code: 'kyw',
    name: 'कुड़मालि (Kudmali)',
    script: 'Chis / Devanagari',
    englishName: 'Kudmali',
    ttsLocale: 'hi-IN',
    rate: 0.88,
    pitch: 1.0
  },
  {
    code: 'kru',
    name: 'कुड़ुख़ / उरांव (Kurukh)',
    script: 'Tolong Siki / Devanagari',
    englishName: 'Kurukh',
    ttsLocale: 'hi-IN',
    rate: 0.86,
    pitch: 1.02
  },
  {
    code: 'hi',
    name: 'हिन्दी (Hindi)',
    script: 'Devanagari (देवनागरी)',
    englishName: 'Hindi',
    ttsLocale: 'hi-IN',
    rate: 0.92,
    pitch: 1.0
  },
  {
    code: 'en',
    name: 'English',
    script: 'Latin',
    englishName: 'English',
    ttsLocale: 'en-IN',
    rate: 0.90,
    pitch: 1.0
  }
];

const defaultUser: UserProfile = {
  id: 'tr_jaipal_01',
  name: 'जयपाल मुंडा (Jaipal Munda)',
  email: 'jaipal.munda@jharkhand.gov.in',
  role: 'TEACHER',
  schoolName: 'उत्क्रमित मध्य विद्यालय, सारंडा',
  district: 'पश्चिमी सिंहभूम (West Singhbhum)',
  primaryLanguage: 'unr',
  targetLanguages: ['sat', 'hoc', 'unr', 'kru', 'kyw', 'hi', 'en']
};

const defaultActiveTeacher: ActiveTeacher = {
  id: 'tr_jaipal_01',
  employeeCode: 'JH-PRT-1042',
  name: 'जयपाल मुंडा (Jaipal Munda)',
  designation: 'सहायक शिक्षक (PRT)',
  primarySubject: 'Foundational Literacy & Numeracy (FLN)',
  languagesSpoken: ['unr', 'sat', 'hi'],
  assignedGrades: [1, 2],
  phone: '9431102841',
  isCurrentActive: true
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTeacher, setActiveTeacherState] = useState<ActiveTeacher | null>(() => {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('palash_active_teacher');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { return defaultActiveTeacher; }
      }
    }
    return defaultActiveTeacher;
  });

  const [user, setUser] = useState<UserProfile>(() => {
    if (activeTeacher) {
      return {
        ...defaultUser,
        id: activeTeacher.id,
        name: activeTeacher.name,
        primaryLanguage: activeTeacher.languagesSpoken?.[0] || 'unr'
      };
    }
    return defaultUser;
  });

  const setActiveTeacher = (t: ActiveTeacher | null) => {
    setActiveTeacherState(t);
    if (t) {
      localStorage.setItem('palash_active_teacher', JSON.stringify(t));
      setUser(prev => ({
        ...prev,
        id: t.id,
        name: t.name,
        primaryLanguage: t.languagesSpoken?.[0] || prev.primaryLanguage
      }));
      if (t.assignedGrades && t.assignedGrades.length > 0) {
        setSelectedGradeState(t.assignedGrades[0]);
      }
    } else {
      localStorage.removeItem('palash_active_teacher');
    }
  };

  const [theme, setTheme] = useState<AppTheme>(() => {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('palash_theme') as AppTheme;
      if (saved === 'light' || saved === 'dark') return saved;
    }
    return 'light';
  });

  const [registeredLanguages, setRegisteredLanguages] = useState<RegisteredLanguage[]>(() => {
    if (typeof localStorage !== 'undefined') {
      try {
        const saved = localStorage.getItem('palash_custom_languages');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            return [...DEFAULT_LANGUAGES, ...parsed];
          }
        }
      } catch (e) {
        console.warn('Could not parse stored languages:', e);
      }
    }
    return DEFAULT_LANGUAGES;
  });

  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [sourceLanguage, setSourceLanguage] = useState<string>('hi');
  const [targetLanguage, setTargetLanguage] = useState<string>('sat');
  const [selectedGrade, setSelectedGradeState] = useState<number>(() => {
    if (typeof localStorage !== 'undefined') {
      const savedTeacher = localStorage.getItem('palash_active_teacher');
      if (savedTeacher) {
        try {
          const parsed = JSON.parse(savedTeacher);
          if (parsed.assignedGrades && parsed.assignedGrades.length > 0) {
            return parsed.assignedGrades[0];
          }
        } catch (e) {}
      }
    }
    return defaultActiveTeacher.assignedGrades[0] || 1;
  });
  const [selectedSection, setSelectedSection] = useState<string>('A');
  const [selectedSubject, setSelectedSubjectState] = useState<string>('Mathematics');
  const [speechSpeed, setSpeechSpeed] = useState<SpeechSpeed>('normal');
  const [pendingSyncCount, setPendingSyncCount] = useState<number>(0);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  // Apply theme attribute on <html> element
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('palash_theme', theme);
    }
  }, [theme]);

  // Fetch active teacher from backend on mount
  useEffect(() => {
    const fetchActiveTeacher = async () => {
      try {
        const res = await api.get('/teachers/active');
        if (res?.teacher) {
          setActiveTeacher(res.teacher);
        }
      } catch (err) {
        console.warn('Fetch active teacher warning:', err);
      }
    };
    fetchActiveTeacher();
  }, []);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const addLanguage = (newLang: RegisteredLanguage) => {
    const exists = registeredLanguages.some(l => l.code.toLowerCase() === newLang.code.toLowerCase());
    if (exists) return;

    const updated = [...registeredLanguages, { ...newLang, isCustom: true }];
    setRegisteredLanguages(updated);

    // Save custom languages to localStorage
    const customOnes = updated.filter(l => l.isCustom);
    localStorage.setItem('palash_custom_languages', JSON.stringify(customOnes));

    // Register speech profile with speechBridge
    speechBridge.registerCustomLanguageSpeech(newLang.code, {
      ttsLocale: newLang.ttsLocale,
      rate: newLang.rate,
      pitch: newLang.pitch
    });
  };

  // When grade changes, automatically validate and enforce valid subjects per NEP 2020
  const setSelectedGrade = (newGrade: number) => {
    setSelectedGradeState(newGrade);
    if (!isSubjectAllowedForGrade(newGrade, selectedSubject)) {
      const fallback = getDefaultSubjectForGrade(newGrade);
      setSelectedSubjectState(fallback);
    }
  };

  const setSelectedSubject = (newSubject: string) => {
    setSelectedSubjectState(newSubject);
  };

  // Sync state with local database
  const refreshPendingSync = async () => {
    try {
      const items = await localDb.getPendingSyncItems();
      setPendingSyncCount(items.length);
    } catch (err) {
      console.warn('Could not read sync queue:', err);
    }
  };

  useEffect(() => {
    refreshPendingSync();
    const interval = setInterval(refreshPendingSync, 4000);
    return () => clearInterval(interval);
  }, []);

  const toggleOffline = () => {
    const next = !isOffline;
    setIsOffline(next);
    api.setSimulatedOffline(next);
  };

  const triggerSync = async () => {
    setIsSyncing(true);
    try {
      const items = await localDb.getPendingSyncItems();
      if (items.length === 0) {
        setIsSyncing(false);
        return { syncedCount: 0 };
      }

      const res = await api.post('/sync/queue', { queue: items });
      if (res?.acknowledgedIds?.length > 0) {
        await localDb.markSyncCompleted(res.acknowledgedIds);
      }
      await refreshPendingSync();
      setIsSyncing(false);
      return { syncedCount: res?.acknowledgedIds?.length || 0 };
    } catch (err) {
      setIsSyncing(false);
      return { syncedCount: 0 };
    }
  };

  // Dynamic language details based on registeredLanguages
  const currentLangObj = registeredLanguages.find(l => l.code === targetLanguage) || registeredLanguages[0];

  const availableSubjects = getAvailableSubjectsForGrade(selectedGrade);
  const currentGradeTopics = getTopicsForGradeAndSubject(selectedGrade, selectedSubject);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        activeTeacher,
        setActiveTeacher,
        theme,
        toggleTheme,
        isOffline,
        toggleOffline,
        sourceLanguage,
        setSourceLanguage,
        targetLanguage,
        setTargetLanguage,
        targetLanguageName: currentLangObj.name,
        targetScript: currentLangObj.script,
        registeredLanguages,
        addLanguage,
        selectedGrade,
        setSelectedGrade,
        selectedSection,
        setSelectedSection,
        selectedSubject,
        setSelectedSubject,
        availableSubjects,
        currentGradeTopics,
        speechSpeed,
        setSpeechSpeed,
        pendingSyncCount,
        triggerSync,
        isSyncing
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
