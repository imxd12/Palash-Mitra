import express from 'express';
import cors from 'cors';
import { config } from './config';
import { authenticate } from './core/security/rbac';

// Controllers
import * as authCtrl from './modules/auth/authController';
import * as curriculumCtrl from './modules/curriculum/curriculumController';
import * as transCtrl from './modules/translation/translationController';
import * as voiceCtrl from './modules/voice/voiceController';
import * as pedCtrl from './modules/pedagogy/pedagogyController';
import * as remCtrl from './modules/remediation/remediationController';
import * as kbCtrl from './modules/knowledgebank/knowledgeBankController';
import * as packCtrl from './modules/contentpack/contentPackController';
import * as syncCtrl from './modules/sync/syncController';
import * as analyticsCtrl from './modules/analytics/analyticsController';
import * as attendanceCtrl from './modules/attendance/attendanceController';
import * as studentCtrl from './modules/attendance/studentController';
import * as teacherCtrl from './modules/attendance/teacherController';
import * as mdmCtrl from './modules/mdm/mdmController';
import * as systemCtrl from './modules/system/systemController';
import { languageRegistry } from './core/language/LanguageRegistry';

export const createApp = () => {
  const app = express();

  // Middleware
  app.use(cors({ origin: '*' }));
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));

  // Auto-seed required tables on startup
  authCtrl.ensureSeedUsers();
  curriculumCtrl.ensureSeedCurriculum();
  kbCtrl.ensureSeedTerminology();

  const api = express.Router();

  // 1. Auth & Users
  api.post('/auth/login', authCtrl.login);
  api.get('/auth/me', authenticate as any, authCtrl.getMe as any);
  api.get('/auth/demo-accounts', authCtrl.listDemoAccounts);

  // 2. Languages
  api.get('/languages', (_req, res) => {
    res.json({ success: true, languages: languageRegistry.getSupportedLanguages() });
  });

  // 3. Curriculum Engine
  api.get('/curriculum', curriculumCtrl.getCurriculum);
  api.get('/curriculum/grades-subjects', curriculumCtrl.getGradesAndSubjects);
  api.get('/curriculum/:id', curriculumCtrl.getCurriculumById);

  // 4. Translation & Memory
  api.post('/translation/translate', transCtrl.translateText);
  api.get('/translation/history', transCtrl.getTranslationHistory);

  // 5. Real-Time Voice Classroom & Pronunciation
  api.post('/voice/process', voiceCtrl.processVoice);
  api.get('/voice/pronounce', voiceCtrl.getPronunciation);
  api.get('/voice/audio-stream', voiceCtrl.audioStream);

  // 6. Pedagogy & Smart Teach
  api.post('/pedagogy/smart-teach', pedCtrl.generateSmartTeach);
  api.post('/pedagogy/explain-again', pedCtrl.explainAgain);
  api.post('/pedagogy/worksheet', pedCtrl.generateWorksheet);
  api.get('/pedagogy/lessons', pedCtrl.listLessons);
  api.get('/pedagogy/lessons/:id', pedCtrl.getLessonById);

  // 7. Student Progress & Remediation
  api.get('/remediation/student/:id', remCtrl.getStudentProfile);
  api.get('/remediation/history', remCtrl.getRemediationHistory);
  api.post('/remediation/diagnose', remCtrl.diagnoseAndRemediate);
  api.post('/remediation/update-mastery', remCtrl.updateStudentMastery);

  // 8. Language Knowledge Bank & Teacher Corrections
  api.get('/knowledge-bank/terms', kbCtrl.listTerms);
  api.post('/knowledge-bank/correct', kbCtrl.submitTeacherCorrection as any);
  api.put('/knowledge-bank/terms/:id/status', authenticate as any, kbCtrl.updateVerificationStatus as any);

  // 9. Content Packs & Manifest Diff
  api.get('/content-packs', packCtrl.listContentPacks);
  api.get('/content-packs/:packId/download', packCtrl.downloadPackData);
  api.post('/content-packs/check-diff', packCtrl.checkPackDiff);

  // 11. Daily Class Attendance & Calendar Heatmap
  api.get('/attendance', attendanceCtrl.getAttendance);
  api.post('/attendance', attendanceCtrl.recordAttendance);
  api.get('/attendance/summary', attendanceCtrl.getAttendanceSummary);
  api.get('/attendance/calendar', attendanceCtrl.getAttendanceCalendar);
  api.get('/attendance/history', attendanceCtrl.getAttendanceHistory);

  // 12. Student Management
  api.get('/students', studentCtrl.getStudents);
  api.post('/students', studentCtrl.addStudent);
  api.put('/students/:id', studentCtrl.updateStudent);
  api.delete('/students/:id', studentCtrl.deleteStudent);

  // 13. Teacher Management & Active Classroom Session
  api.get('/teachers', teacherCtrl.getTeachers);
  api.get('/teachers/active', teacherCtrl.getActiveTeacher);
  api.post('/teachers/active', teacherCtrl.setActiveTeacher);
  api.post('/teachers', teacherCtrl.addTeacher);
  api.put('/teachers/:id', teacherCtrl.updateTeacher);
  api.delete('/teachers/:id', teacherCtrl.deleteTeacher);

  // 14. Mid-Day Meal (MDM) Kitchen Ration Slip Management
  api.get('/mdm/slips', mdmCtrl.getSlips);
  api.post('/mdm/slips', mdmCtrl.createSlip);
  api.delete('/mdm/slips/:id', mdmCtrl.deleteSlip);
  api.get('/mdm/inventory', mdmCtrl.getInventory);
  api.get('/mdm/ai-audit', mdmCtrl.getAiAudit);

  // 15. District & AI Evaluation Analytics
  api.get('/analytics/district-overview', analyticsCtrl.getDistrictOverview);
  api.get('/analytics/ai-evaluation', analyticsCtrl.getAiEvaluationMetrics);
  api.get('/analytics/health', analyticsCtrl.getSystemHealth);

  // 16. System Administration & Complete Factory Data Wipe
  api.post('/system/reset-data', systemCtrl.resetAllData);

  app.use(config.apiPrefix, api);

  // Base status check
  app.get('/', (_req, res) => {
    res.json({
      name: 'PALASH MITRA API Server',
      problemStatement: 'SIH PS-26042',
      status: 'ONLINE',
      version: '1.0.0',
      apiDocs: `${config.apiPrefix}/analytics/health`
    });
  });

  return app;
};
