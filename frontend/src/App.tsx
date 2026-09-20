import React, { useState } from 'react';
import { AppProvider } from './core/context/AppContext';
import { Navbar } from './components/Navbar';
import { TeacherDashboard } from './features/dashboard/TeacherDashboard';
import { AttendanceView } from './features/attendance/AttendanceView';
import { SmartTeachView } from './features/smartteach/SmartTeachView';
import { VoiceClassroomView } from './features/voiceclassroom/VoiceClassroomView';
import { TeacherCopilotView } from './features/copilot/TeacherCopilotView';
import { WorksheetGeneratorView } from './features/worksheets/WorksheetGeneratorView';
import { FlashcardsView } from './features/flashcards/FlashcardsView';
import { RemediationView } from './features/remediation/RemediationView';
import { TerminologyReviewView } from './features/knowledgebank/TerminologyReviewView';
import { ContentPackManagerView } from './features/contentpacks/ContentPackManagerView';
import { AdminPortalView } from './features/admin/AdminPortalView';
import { SettingsView } from './features/settings/SettingsView';
import { SIHDemoController } from './features/demo/SIHDemoController';

// New Next-Level Software Innovations
import { OralReadingFluencyView } from './features/fluency/OralReadingFluencyView';
import { ScriptTracingView } from './features/scripttracing/ScriptTracingView';
import { TextbookQRScannerView } from './features/qrscanner/TextbookQRScannerView';
import { BilingualStorybookView } from './features/storybooks/BilingualStorybookView';
import { ExamGeneratorView } from './features/exam/ExamGeneratorView';
import { StudentTeacherManagerView } from './features/management/StudentTeacherManagerView';
import { MdmRationView } from './features/mdm/MdmRationView';

const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isDemoModalOpen, setIsDemoModalOpen] = useState<boolean>(false);

  return (
    <div className="app-container">
      {/* Top Responsive Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenDemo={() => setIsDemoModalOpen(true)}
      />

      {/* Main View Area */}
      <main className="main-content">
        {activeTab === 'dashboard' && (
          <TeacherDashboard
            onNavigate={(tab) => setActiveTab(tab)}
            onOpenSmartTeach={() => setActiveTab('smartteach')}
          />
        )}

        {activeTab === 'attendance' && (
          <AttendanceView onNavigate={(tab) => setActiveTab(tab)} />
        )}

        {activeTab === 'management' && <StudentTeacherManagerView />}

        {activeTab === 'mdm' && <MdmRationView />}

        {activeTab === 'smartteach' && <SmartTeachView />}

        {activeTab === 'fluency' && <OralReadingFluencyView />}

        {activeTab === 'tracing' && <ScriptTracingView />}

        {activeTab === 'qrscanner' && (
          <TextbookQRScannerView onNavigate={(tab) => setActiveTab(tab)} />
        )}

        {activeTab === 'storybooks' && <BilingualStorybookView />}

        {activeTab === 'copilot' && <TeacherCopilotView />}

        {activeTab === 'voice' && <VoiceClassroomView />}

        {activeTab === 'worksheets' && <WorksheetGeneratorView />}

        {activeTab === 'exams' && <ExamGeneratorView />}

        {activeTab === 'flashcards' && <FlashcardsView />}

        {activeTab === 'remediation' && <RemediationView />}

        {activeTab === 'knowledgebank' && <TerminologyReviewView />}

        {activeTab === 'contentpacks' && <ContentPackManagerView />}

        {activeTab === 'admin' && <AdminPortalView />}

        {activeTab === 'settings' && <SettingsView />}
      </main>

      {/* SIH Demo Mode Guided Walkthrough Modal */}
      <SIHDemoController
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onNavigate={(tab) => {
          setActiveTab(tab);
          setIsDemoModalOpen(false);
        }}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
