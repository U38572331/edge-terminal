import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Insider from './pages/Insider';
import OptionsFlow from './pages/OptionsFlow';
import Earnings from './pages/Earnings';
import Charts from './pages/Charts';
import Macro from './pages/Macro';
import { LanguageProvider } from './contexts/LanguageContext';
import './index.css';

const TickerBar = () => {
  return (
    <div className="ticker-bar">
      <span className="ticker-item"><span className="ticker-symbol">SPY</span> <span className="text-up" style={{ fontSize: '0.8rem' }}><TrendingUp size={12} /> 532.10 (+1.2%)</span></span>
      <span className="ticker-item"><span className="ticker-symbol">QQQ</span> <span className="text-up" style={{ fontSize: '0.8rem' }}><TrendingUp size={12} /> 460.50 (+0.8%)</span></span>
      <span className="ticker-item"><span className="ticker-symbol">VIX</span> <span className="text-down" style={{ fontSize: '0.8rem' }}><TrendingDown size={12} /> 12.40 (-5.1%)</span></span>
      <span className="ticker-item"><span className="ticker-symbol">BTC</span> <span className="text-up" style={{ fontSize: '0.8rem' }}><TrendingUp size={12} /> 67,400 (+2.4%)</span></span>
      <span className="ticker-item" style={{ marginLeft: 'auto', color: 'var(--color-muted-text)' }}><Activity size={12} /> Live Market Data (Mock)</span>
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <HashRouter>
        <div className="app-container" style={{ flexDirection: 'column' }}>
          <TickerBar />
          <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
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
        </div>
      </HashRouter>
    </LanguageProvider>
  );
}

export default App;
