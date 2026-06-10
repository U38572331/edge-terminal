import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Insider from './pages/Insider';
import OptionsFlow from './pages/OptionsFlow';
import Earnings from './pages/Earnings';
import Charts from './pages/Charts';
import Macro from './pages/Macro';
import { LanguageProvider } from './contexts/LanguageContext';
import './index.css';

function App() {
  return (
    <LanguageProvider>
      <HashRouter>
        <div className="app-container">
          <Sidebar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/insider" element={<Insider />} />
              <Route path="/options" element={<OptionsFlow />} />
              <Route path="/earnings" element={<Earnings />} />
              <Route path="/charts" element={<Charts />} />
              <Route path="/macro" element={<Macro />} />
            </Routes>
          </main>
        </div>
      </HashRouter>
    </LanguageProvider>
  );
}

export default App;
