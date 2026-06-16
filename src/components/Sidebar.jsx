import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, LineChart, CalendarDays, ActivitySquare, TerminalSquare, Globe, UserCheck, Flame } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Sidebar = () => {
  const { t, lang, toggleLanguage } = useLanguage();

  const navItems = [
    { path: '/dashboard', label: t.nav.dashboard, icon: <LayoutDashboard size={20} /> },
    { path: '/insider', label: t.nav.insider, icon: <UserCheck size={20} /> },
    { path: '/options', label: t.nav.options, icon: <Flame size={20} /> },
    { path: '/earnings', label: t.nav.earnings, icon: <CalendarDays size={20} /> },
    { path: '/charts', label: t.nav.charts, icon: <LineChart size={20} /> },
    { path: '/macro', label: t.nav.macro, icon: <ActivitySquare size={20} /> },
  ];

  return (
    <aside className="sidebar" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="brand">
        <TerminalSquare className="brand-icon" size={28} />
        {t.brand}
      </div>
      <nav className="sidebar-content" style={{ flex: 1 }}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
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
            background: 'var(--bg-elevated)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            transition: 'background var(--transition-speed) var(--easing)',
            fontFamily: 'var(--font-family)',
          }}
          onMouseOver={(e) => e.currentTarget.style.background = 'rgba(94, 106, 210, 0.2)'}
          onMouseOut={(e) => e.currentTarget.style.background = 'var(--bg-elevated)'}
        >
          <Globe size={18} />
          {lang === 'zh' ? 'Switch to English' : '切換至中文'}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
