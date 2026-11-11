import React from 'react';
import { ProgressProvider, useProgress } from './context/ProgressContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { LessonPage } from './pages/LessonPage';
import { FinalProjectPage } from './pages/FinalProjectPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { LoadingScreen } from './components/common/LoadingScreen';

const AppContent: React.FC = () => {
  const { activeView, isLoading, loadingMessage, loadingSubMessage, handleLoadingComplete } = useProgress();

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
      {isLoading && (
        <LoadingScreen
          message={loadingMessage}
          subMessage={loadingSubMessage}
          onComplete={handleLoadingComplete}
        />
      )}

      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {activeView === 'home' && <Home />}
        {activeView === 'lesson' && <LessonPage />}
        {activeView === 'project' && <FinalProjectPage />}
        {activeView === 'resources' && <ResourcesPage />}
      </main>

      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ProgressProvider>
      <AppContent />
    </ProgressProvider>
  );
};

export default App;
