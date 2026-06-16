import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, LineChart, Calendar, TerminalSquare, Globe, Users, Activity } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Sidebar = () => {
  const { t, lang, toggleLanguage } = useLanguage();

  return (
    <aside className="sidebar" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="brand">
        <TerminalSquare className="brand-icon" size={28} />
        {t.brand}
      </div>
      <nav className="sidebar-content" style={{ flex: 1 }}>
        <NavLink to="/dashboard" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <LayoutDashboard size={20} /> {t.nav.dashboard}
        </NavLink>
        <NavLink to="/insider" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Users size={20} /> {t.nav.insider}
        </NavLink>
        <NavLink to="/options" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Activity size={20} /> {t.nav.options}
        </NavLink>
        <NavLink to="/earnings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Calendar size={20} /> {t.nav.earnings}
        </NavLink>
        <NavLink to="/charts" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <LineChart size={20} /> {t.nav.charts}
        </NavLink>
        <NavLink to="/macro" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Globe size={20} /> {t.nav.macro}
        </NavLink>
      </nav>
      <div style={{ padding: '20px', WebkitAppRegion: 'no-drag' }}>
        <button 
          onClick={toggleLanguage}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '10px',
            background: 'var(--color-secondary)',
            color: 'var(--color-foreground)',
            border: '1px solid var(--color-border)',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            transition: 'background var(--transition-speed) var(--easing)',
            fontFamily: 'var(--font-family)',
          }}
          onMouseOver={(e) => e.currentTarget.style.background = 'var(--color-muted-bg)'}
          onMouseOut={(e) => e.currentTarget.style.background = 'var(--color-secondary)'}
        >
          <Globe size={18} />
          {lang === 'zh' ? 'Switch to English' : '切換至中文'}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
