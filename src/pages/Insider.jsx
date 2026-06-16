import React, { useState, useEffect } from 'react';
import StockChart from '../components/StockChart';
import { useLanguage } from '../contexts/LanguageContext';
import { getRelativeDate } from '../utils/dateHelpers';

const generateMockInsiderTrades = () => [
  { id: 1, insider: 'Tim Cook', role: 'CEO', ticker: 'AAPL', type: 'Sell', date: getRelativeDate(0), amount: '$33.2M', parsedAmount: 33200000 },
  { id: 2, insider: 'Jensen Huang', role: 'CEO', ticker: 'NVDA', type: 'Sell', date: getRelativeDate(-1), amount: '$42.5M', parsedAmount: 42500000 },
  { id: 3, insider: 'Elon Musk', role: 'CEO', ticker: 'TSLA', type: 'Buy', date: getRelativeDate(-1), amount: '$100.0M', parsedAmount: 100000000 },
  { id: 4, insider: 'Mark Zuckerberg', role: 'CEO', ticker: 'META', type: 'Sell', date: getRelativeDate(-2), amount: '$15.8M', parsedAmount: 15800000 },
  { id: 5, insider: 'Satya Nadella', role: 'CEO', ticker: 'MSFT', type: 'Sell', date: getRelativeDate(-2), amount: '$22.1M', parsedAmount: 22100000 },
  { id: 6, insider: 'Lisa Su', role: 'CEO', ticker: 'AMD', type: 'Sell', date: getRelativeDate(-3), amount: '$8.5M', parsedAmount: 8500000 },
  { id: 7, insider: 'Andy Jassy', role: 'CEO', ticker: 'AMZN', type: 'Buy', date: getRelativeDate(-3), amount: '$5.0M', parsedAmount: 5000000 },
  { id: 8, insider: 'Sundar Pichai', role: 'CEO', ticker: 'GOOGL', type: 'Sell', date: getRelativeDate(-4), amount: '$12.4M', parsedAmount: 12400000 },
  { id: 9, insider: 'Alex Karp', role: 'CEO', ticker: 'PLTR', type: 'Sell', date: getRelativeDate(-5), amount: '$28.3M', parsedAmount: 28300000 },
  { id: 10, insider: 'Hock Tan', role: 'CEO', ticker: 'AVGO', type: 'Sell', date: getRelativeDate(-6), amount: '$18.9M', parsedAmount: 18900000 },
  { id: 11, insider: 'Jamie Dimon', role: 'CEO', ticker: 'JPM', type: 'Sell', date: getRelativeDate(-7), amount: '$150.0M', parsedAmount: 150000000 },
  { id: 12, insider: 'Brian Chesky', role: 'CEO', ticker: 'ABNB', type: 'Sell', date: getRelativeDate(-8), amount: '$14.2M', parsedAmount: 14200000 },
  { id: 13, insider: 'Marc Benioff', role: 'CEO', ticker: 'CRM', type: 'Sell', date: getRelativeDate(-9), amount: '$3.5M', parsedAmount: 3500000 },
  { id: 14, insider: 'Peter Thiel', role: 'Director', ticker: 'PLTR', type: 'Buy', date: getRelativeDate(-10), amount: '$45.0M', parsedAmount: 45000000 },
  { id: 15, insider: 'Cathie Wood', role: 'Director', ticker: 'RCHG', type: 'Buy', date: getRelativeDate(-11), amount: '$2.1M', parsedAmount: 2100000 },
  { id: 16, insider: 'Michael Dell', role: 'CEO', ticker: 'DELL', type: 'Sell', date: getRelativeDate(-12), amount: '$85.0M', parsedAmount: 85000000 },
  { id: 17, insider: 'Robyn Denholm', role: 'Chair', ticker: 'TSLA', type: 'Sell', date: getRelativeDate(-13), amount: '$52.0M', parsedAmount: 52000000 },
  { id: 18, insider: 'Reed Hastings', role: 'Chair', ticker: 'NFLX', type: 'Sell', date: getRelativeDate(-14), amount: '$21.4M', parsedAmount: 21400000 },
  { id: 19, insider: 'Bill Gates', role: '10% Owner', ticker: 'MSFT', type: 'Sell', date: getRelativeDate(-15), amount: '$250.0M', parsedAmount: 250000000 },
  { id: 20, insider: 'Warren Buffett', role: '10% Owner', ticker: 'OXY', type: 'Buy', date: getRelativeDate(-16), amount: '$120.5M', parsedAmount: 120500000 },
  { id: 21, insider: 'Shantanu Narayen', role: 'CEO', ticker: 'ADBE', type: 'Sell', date: getRelativeDate(-17), amount: '$11.2M', parsedAmount: 11200000 },
  { id: 22, insider: 'Doug McMillon', role: 'CEO', ticker: 'WMT', type: 'Sell', date: getRelativeDate(-18), amount: '$9.8M', parsedAmount: 9800000 },
  { id: 23, insider: 'Safra Catz', role: 'CEO', ticker: 'ORCL', type: 'Sell', date: getRelativeDate(-19), amount: '$45.3M', parsedAmount: 45300000 },
  { id: 24, insider: 'David Solomon', role: 'CEO', ticker: 'GS', type: 'Buy', date: getRelativeDate(-20), amount: '$2.5M', parsedAmount: 2500000 },
  { id: 25, insider: 'Charles Scharf', role: 'CEO', ticker: 'WFC', type: 'Buy', date: getRelativeDate(-21), amount: '$5.0M', parsedAmount: 5000000 },
  { id: 26, insider: 'Jane Fraser', role: 'CEO', ticker: 'C', type: 'Buy', date: getRelativeDate(-22), amount: '$1.2M', parsedAmount: 1200000 },
  { id: 27, insider: 'Gwynne Shotwell', role: 'President', ticker: 'TSLA', type: 'Sell', date: getRelativeDate(-23), amount: '$8.4M', parsedAmount: 8400000 },
  { id: 28, insider: 'Craig Federighi', role: 'SVP', ticker: 'AAPL', type: 'Sell', date: getRelativeDate(-24), amount: '$12.0M', parsedAmount: 12000000 },
  { id: 29, insider: 'Colette Kress', role: 'CFO', ticker: 'NVDA', type: 'Sell', date: getRelativeDate(-25), amount: '$18.2M', parsedAmount: 18200000 },
  { id: 30, insider: 'Ruth Porat', role: 'CFO', ticker: 'GOOGL', type: 'Sell', date: getRelativeDate(-26), amount: '$6.7M', parsedAmount: 6700000 }
];

const Insider = () => {
  const { t } = useLanguage();
  const [trades, setTrades] = useState([]);
  const [selectedTrade, setSelectedTrade] = useState(null);

  useEffect(() => {
    const data = generateMockInsiderTrades();
    setTimeout(() => {
      setTrades(data);
      if (data.length > 0) {
        setSelectedTrade(data[0]);
      }
    }, 600);
  }, []);

  const chartMarkers = selectedTrade ? [
    {
      time: selectedTrade.date,
      position: selectedTrade.type === 'Buy' ? 'belowBar' : 'aboveBar',
      color: selectedTrade.type === 'Buy' ? '#22C55E' : '#EF4444',
      shape: selectedTrade.type === 'Buy' ? 'arrowUp' : 'arrowDown',
      text: `${selectedTrade.type} by ${selectedTrade.insider} (${selectedTrade.role})`,
    }
  ] : [];

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '20px' }}>
      <div className="page-header" style={{ flexShrink: 0 }}>
        <h1 className="page-title">{t.insider.title}</h1>
        <p className="text-muted">{t.insider.subtitle}</p>
      </div>

      <div style={{ display: 'flex', gap: '20px', flex: 1, minHeight: 0 }}>
        <div className="glass-panel" style={{ flex: '1 1 40%', overflowY: 'auto', maxHeight: '100%' }}>
          {trades.length === 0 ? (
            <p style={{ padding: '20px' }}>{t.insider.loading}</p>
          ) : (
            <table className="data-table" style={{ width: '100%' }}>
              <thead style={{ position: 'sticky', top: 0, background: 'var(--bg-elevated)', zIndex: 1 }}>
                <tr>
                  <th>{t.insider.table.insider}</th>
                  <th>{t.insider.table.ticker}</th>
                  <th>{t.insider.table.transaction}</th>
                  <th>{t.insider.table.date}</th>
                  <th>{t.insider.table.amount}</th>
                </tr>
              </thead>
              <tbody>
                {trades.map((row) => (
                  <tr 
                    key={row.id} 
                    onClick={() => setSelectedTrade(row)}
                    style={{ 
                      cursor: 'pointer',
                      background: selectedTrade?.id === row.id ? 'rgba(94, 106, 210, 0.15)' : 'transparent',
                      borderLeft: selectedTrade?.id === row.id ? '3px solid var(--accent-blue)' : '3px solid transparent'
                    }}
                  >
                    <td style={{ fontWeight: 500 }}>
                      {row.insider} <span style={{ fontSize: '0.8em', color: 'var(--text-secondary)' }}>({row.role})</span>
                    </td>
                    <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{row.ticker}</td>
                    <td className={row.type === 'Buy' ? 'text-up' : 'text-down'} style={{ fontWeight: 600 }}>{row.type}</td>
                    <td>{row.date}</td>
                    <td className="font-mono" style={{ fontSize: '0.95rem' }}>{row.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        
        <div style={{ flex: '1 1 60%', display: 'flex', flexDirection: 'column' }}>
          {selectedTrade ? (
             <StockChart ticker={selectedTrade.ticker} height={450} markers={chartMarkers} />
          ) : (
             <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
               <p className="text-muted">{t.insider.selectPrompt}</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Insider;
