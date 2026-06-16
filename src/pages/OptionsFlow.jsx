import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { getRelativeTime, getRandomAmount } from '../utils/dateHelpers';

const generateMockOptions = () => [
  { id: 1, time: getRelativeTime(-1), ticker: 'SPY', type: 'Dark Pool', strikeExp: '-', premium: `$${getRandomAmount(100, 200)}M`, details: 'Block Trade', isBullish: null },
  { id: 2, time: getRelativeTime(-3), ticker: 'NVDA', type: 'Call Sweep', strikeExp: '$120.00 | 6/21', premium: `$${getRandomAmount(5, 15)}M`, details: 'Ask Side, Vol > OI', isBullish: true },
  { id: 3, time: getRelativeTime(-8), ticker: 'TSLA', type: 'Put Sweep', strikeExp: '$170.00 | 5/17', premium: `$${getRandomAmount(2, 8)}M`, details: 'Bid Side, Urgency', isBullish: false },
  { id: 4, time: getRelativeTime(-15), ticker: 'QQQ', type: 'Dark Pool', strikeExp: '-', premium: `$${getRandomAmount(80, 150)}M`, details: 'Block Trade', isBullish: null },
  { id: 5, time: getRelativeTime(-22), ticker: 'AAPL', type: 'Call Block', strikeExp: '$190.00 | 7/19', premium: `$${getRandomAmount(1, 5)}M`, details: 'Floor Trade', isBullish: true },
  { id: 6, time: getRelativeTime(-35), ticker: 'AMD', type: 'Call Sweep', strikeExp: '$160.00 | 6/21', premium: `$${getRandomAmount(3, 8)}M`, details: 'Ask Side, Multi-exchange', isBullish: true },
  { id: 7, time: getRelativeTime(-45), ticker: 'META', type: 'Put Block', strikeExp: '$450.00 | 5/17', premium: `$${getRandomAmount(4, 9)}M`, details: 'Bid Side, High Vol', isBullish: false },
  { id: 8, time: getRelativeTime(-60), ticker: 'IWM', type: 'Dark Pool', strikeExp: '-', premium: `$${getRandomAmount(40, 60)}M`, details: 'Block Trade', isBullish: null },
];

const tickers = ['AAPL', 'MSFT', 'NVDA', 'GOOGL', 'AMZN', 'META', 'TSLA', 'SPY', 'QQQ', 'AMD'];
const types = ['Call Sweep', 'Put Sweep', 'Dark Pool', 'Call Block', 'Put Block'];

const OptionsFlow = () => {
  const { t } = useLanguage();
  const [flows, setFlows] = useState([]);

  useEffect(() => {
    // Initial data
    setFlows(generateMockOptions());

    // Simulated WebSocket streaming
    let idCounter = 100;
    const interval = setInterval(() => {
      const isCall = Math.random() > 0.5;
      const type = types[Math.floor(Math.random() * types.length)];
      const ticker = tickers[Math.floor(Math.random() * tickers.length)];
      
      let isBullish = null;
      if (type.includes('Call')) isBullish = true;
      if (type.includes('Put')) isBullish = false;

      const newFlow = {
        id: idCounter++,
        time: getRelativeTime(0),
        ticker: ticker,
        type: type,
        strikeExp: type === 'Dark Pool' ? '-' : `$${(Math.random() * 500).toFixed(0)} | 7/19`,
        premium: `$${getRandomAmount(1, type === 'Dark Pool' ? 150 : 20)}M`,
        details: type === 'Dark Pool' ? 'Block Trade' : (isCall ? 'Ask Side' : 'Bid Side'),
        isBullish: isBullish
      };

      setFlows(prev => [newFlow, ...prev].slice(0, 50)); // Keep max 50 items
    }, 5000); // New trade every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const getTypeStyle = (type, isBullish) => {
    if (type === 'Dark Pool') return { background: 'rgba(179, 136, 255, 0.1)', color: 'var(--accent-purple)', border: '1px solid var(--accent-purple)' };
    if (isBullish) return { background: 'rgba(34, 197, 94, 0.1)', color: 'var(--accent-up)', border: '1px solid var(--accent-up)' };
    if (isBullish === false) return { background: 'rgba(239, 68, 68, 0.1)', color: 'var(--accent-down)', border: '1px solid var(--accent-down)' };
    return { background: 'var(--bg-elevated)', color: 'var(--text-primary)' };
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '20px' }}>
      <div className="page-header" style={{ flexShrink: 0 }}>
        <h1 className="page-title">{t.options.title}</h1>
        <p className="text-muted">{t.options.subtitle}</p>
      </div>

      <div className="glass-panel" style={{ flex: 1, overflowY: 'auto' }}>
        {flows.length === 0 ? (
          <p style={{ padding: '20px' }}>{t.options.loading}</p>
        ) : (
          <table className="data-table" style={{ width: '100%' }}>
            <thead style={{ position: 'sticky', top: 0, background: 'var(--bg-elevated)', zIndex: 1 }}>
              <tr>
                <th>{t.options.table.time}</th>
                <th>{t.options.table.ticker}</th>
                <th>{t.options.table.type}</th>
                <th>{t.options.table.strikeExp}</th>
                <th>{t.options.table.premium}</th>
                <th>{t.options.table.details}</th>
              </tr>
            </thead>
            <tbody>
              {flows.map((row) => (
                <tr key={row.id}>
                  <td className="text-muted font-mono">{row.time}</td>
                  <td style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '1.1rem' }}>{row.ticker}</td>
                  <td>
                    <span style={{
                      ...getTypeStyle(row.type, row.isBullish),
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '0.85rem',
                      fontWeight: 600
                    }}>
                      {row.type}
                    </span>
                  </td>
                  <td className="font-mono">{row.strikeExp}</td>
                  <td className="font-mono" style={{ 
                    fontSize: '1.05rem', 
                    fontWeight: 700,
                    color: row.premium.includes('M') ? (parseFloat(row.premium.replace('$', '').replace('M', '')) > 10 ? '#FFD600' : 'inherit') : 'inherit'
                  }}>
                    {row.premium}
                  </td>
                  <td className="text-muted" style={{ fontSize: '0.9rem' }}>{row.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default OptionsFlow;
