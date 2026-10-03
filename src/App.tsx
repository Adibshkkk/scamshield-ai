import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { I18nProvider } from './i18n/I18nContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { ScenariosPage } from './pages/ScenariosPage';
import { SimulatorPage } from './pages/SimulatorPage';
import { DashboardPage } from './pages/DashboardPage';
import { QuizPage } from './pages/QuizPage';
import { LearningCenterPage } from './pages/LearningCenterPage';
import { SafetyResourcesPage } from './pages/SafetyResourcesPage';

export const App: React.FC = () => {
  return (
    <I18nProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-brand-500 selection:text-white">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/scenarios" element={<ScenariosPage />} />
              <Route path="/simulate/:scenarioId" element={<SimulatorPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/learn" element={<LearningCenterPage />} />
              <Route path="/safety" element={<SafetyResourcesPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </I18nProvider>
  );
};

export default App;
