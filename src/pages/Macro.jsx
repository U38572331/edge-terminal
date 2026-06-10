import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const mockMacroData = [
  { id: 1, indicator: 'US CPI (YoY)', value: '3.1%', previous: '3.2%', nextRelease: '2026-06-12', trend: 'down' },
  { id: 2, indicator: 'Fed Funds Rate', value: '4.50%', previous: '4.75%', nextRelease: '2026-06-16', trend: 'down' },
  { id: 3, indicator: 'US GDP Growth (QoQ)', value: '2.4%', previous: '2.1%', nextRelease: '2026-07-25', trend: 'up' },
  { id: 4, indicator: 'Unemployment Rate', value: '3.8%', previous: '3.9%', nextRelease: '2026-07-03', trend: 'down' },
  { id: 5, indicator: '10-Year Treasury Yield', value: '4.15%', previous: '4.20%', nextRelease: 'Live', trend: 'down' },
];

const Macro = () => {
  const { t } = useLanguage();
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setData(mockMacroData);
    }, 500);
  }, []);

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1 className="page-title">{t.macro.title}</h1>
        <p className="text-muted">{t.macro.subtitle}</p>
      </div>

      <div className="grid-dashboard">
        {data.map((item) => (
          <div key={item.id} className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>{item.indicator}</h3>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 700, lineHeight: 1 }}>{item.value}</span>
              <span className={item.trend === 'up' ? 'text-up' : 'text-down'} style={{ marginBottom: '5px' }}>
                {item.trend === 'up' ? '▲' : '▼'} {t.macro.from} {item.previous}
              </span>
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: 'auto' }}>
              {t.macro.nextRelease} {item.nextRelease}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Macro;
