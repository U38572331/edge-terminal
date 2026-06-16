import React, { useState, useEffect } from 'react';
import StockChart from '../components/StockChart';
import { useLanguage } from '../contexts/LanguageContext';
import { getRelativeDate } from '../utils/dateHelpers';

const generateMockTrades = () => [
  { id: 1, politician: 'Nancy Pelosi', ticker: 'NVDA', type: 'Buy', date: getRelativeDate(-1), amount: '$1.5M - $5M', parsedAmount: 5000000 },
  { id: 2, politician: 'Ro Khanna', ticker: 'AAPL', type: 'Buy', date: getRelativeDate(-2), amount: '$100K - $250K', parsedAmount: 250000 },
  { id: 3, politician: 'Tommy Tuberville', ticker: 'TSLA', type: 'Sell', date: getRelativeDate(-3), amount: '$500K - $1M', parsedAmount: 1000000 },
  { id: 4, politician: 'Mark Green', ticker: 'ET', type: 'Buy', date: getRelativeDate(-3), amount: '$250K - $500K', parsedAmount: 500000 },
  { id: 5, politician: 'Josh Gottheimer', ticker: 'MSFT', type: 'Buy', date: getRelativeDate(-4), amount: '$1M - $5M', parsedAmount: 5000000 },
  { id: 6, politician: 'Sheldon Whitehouse', ticker: 'JNJ', type: 'Sell', date: getRelativeDate(-5), amount: '$50K - $100K', parsedAmount: 100000 },
  { id: 7, politician: 'Nancy Pelosi', ticker: 'PANW', type: 'Buy', date: getRelativeDate(-6), amount: '$500K - $1M', parsedAmount: 1000000 },
  { id: 8, politician: 'Dan Meuser', ticker: 'GOOGL', type: 'Buy', date: getRelativeDate(-7), amount: '$100K - $250K', parsedAmount: 250000 },
  { id: 9, politician: 'Earl Blumenauer', ticker: 'AMZN', type: 'Sell', date: getRelativeDate(-8), amount: '$15K - $50K', parsedAmount: 50000 },
  { id: 10, politician: 'Ro Khanna', ticker: 'META', type: 'Buy', date: getRelativeDate(-9), amount: '$15K - $50K', parsedAmount: 50000 },
  { id: 11, politician: 'Kevin Hern', ticker: 'XOM', type: 'Buy', date: getRelativeDate(-10), amount: '$250K - $500K', parsedAmount: 500000 },
  { id: 12, politician: 'Virginia Foxx', ticker: 'PG', type: 'Buy', date: getRelativeDate(-11), amount: '$50K - $100K', parsedAmount: 100000 },
  { id: 13, politician: 'Michael McCaul', ticker: 'CSCO', type: 'Sell', date: getRelativeDate(-12), amount: '$100K - $250K', parsedAmount: 250000 },
  { id: 14, politician: 'Marjorie Taylor Greene', ticker: 'AMD', type: 'Buy', date: getRelativeDate(-13), amount: '$15K - $50K', parsedAmount: 50000 },
  { id: 15, politician: 'John Curtis', ticker: 'V', type: 'Buy', date: getRelativeDate(-14), amount: '$50K - $100K', parsedAmount: 100000 },
  { id: 16, politician: 'Diana Harshbarger', ticker: 'WMT', type: 'Buy', date: getRelativeDate(-15), amount: '$100K - $250K', parsedAmount: 250000 },
  { id: 17, politician: 'Greg Gianforte', ticker: 'JPM', type: 'Sell', date: getRelativeDate(-16), amount: '$500K - $1M', parsedAmount: 1000000 },
  { id: 18, politician: 'Debbie Wasserman Schultz', ticker: 'PEP', type: 'Buy', date: getRelativeDate(-17), amount: '$15K - $50K', parsedAmount: 50000 },
  { id: 19, politician: 'John Boozman', ticker: 'COST', type: 'Buy', date: getRelativeDate(-18), amount: '$50K - $100K', parsedAmount: 100000 },
  { id: 20, politician: 'Nancy Pelosi', ticker: 'AVGO', type: 'Buy', date: getRelativeDate(-19), amount: '$1M - $5M', parsedAmount: 5000000 },
  { id: 21, politician: 'Tom Malinowski', ticker: 'NFLX', type: 'Sell', date: getRelativeDate(-20), amount: '$100K - $250K', parsedAmount: 250000 },
  { id: 22, politician: 'Steve Cohen', ticker: 'DIS', type: 'Buy', date: getRelativeDate(-21), amount: '$15K - $50K', parsedAmount: 50000 },
  { id: 23, politician: 'Suzan DelBene', ticker: 'ADBE', type: 'Sell', date: getRelativeDate(-22), amount: '$500K - $1M', parsedAmount: 1000000 },
  { id: 24, politician: 'Ro Khanna', ticker: 'CRWD', type: 'Buy', date: getRelativeDate(-23), amount: '$50K - $100K', parsedAmount: 100000 },
  { id: 25, politician: 'Mark Green', ticker: 'OXY', type: 'Buy', date: getRelativeDate(-24), amount: '$100K - $250K', parsedAmount: 250000 },
  { id: 26, politician: 'Lois Frankel', ticker: 'QCOM', type: 'Sell', date: getRelativeDate(-25), amount: '$15K - $50K', parsedAmount: 50000 },
  { id: 27, politician: 'David Trone', ticker: 'UNH', type: 'Buy', date: getRelativeDate(-26), amount: '$250K - $500K', parsedAmount: 500000 },
  { id: 28, politician: 'Tommy Tuberville', ticker: 'BA', type: 'Sell', date: getRelativeDate(-27), amount: '$500K - $1M', parsedAmount: 1000000 },
  { id: 29, politician: 'Josh Gottheimer', ticker: 'INTC', type: 'Buy', date: getRelativeDate(-28), amount: '$100K - $250K', parsedAmount: 250000 },
  { id: 30, politician: 'Nancy Pelosi', ticker: 'AAPL', type: 'Buy', date: getRelativeDate(-29), amount: '$1M - $5M', parsedAmount: 5000000 },
];

const Dashboard = () => {
  const { t } = useLanguage();
  const [trades, setTrades] = useState([]);
  const [selectedTrade, setSelectedTrade] = useState(null);

  useEffect(() => {
    // Generate dynamic mock data on component mount
    const data = generateMockTrades();
    setTimeout(() => {
      setTrades(data);
      if (data.length > 0) {
        setSelectedTrade(data[0]);
      }
    }, 500);
  }, []);

  const chartMarkers = selectedTrade ? [
    {
      time: selectedTrade.date,
      position: selectedTrade.type === 'Buy' ? 'belowBar' : 'aboveBar',
      color: selectedTrade.type === 'Buy' ? '#22C55E' : '#EF4444',
      shape: selectedTrade.type === 'Buy' ? 'arrowUp' : 'arrowDown',
      text: `${selectedTrade.type} by ${selectedTrade.politician}`,
    }
  ] : [];

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '20px' }}>
      <div className="page-header" style={{ flexShrink: 0 }}>
        <h1 className="page-title">{t.dashboard.title}</h1>
        <p className="text-muted">{t.dashboard.subtitle}</p>
      </div>

      <div style={{ display: 'flex', gap: '20px', flex: 1, minHeight: 0 }}>
        {/* Left Side: Data Table */}
        <div className="glass-panel" style={{ flex: '1 1 40%', overflowY: 'auto', maxHeight: '100%' }}>
          {trades.length === 0 ? (
            <p style={{ padding: '20px' }}>{t.dashboard.loading}</p>
          ) : (
            <table className="data-table" style={{ width: '100%' }}>
              <thead style={{ position: 'sticky', top: 0, background: 'var(--bg-elevated)', zIndex: 1 }}>
                <tr>
                  <th>{t.dashboard.table.politician}</th>
                  <th>{t.dashboard.table.ticker}</th>
                  <th>{t.dashboard.table.transaction}</th>
                  <th>{t.dashboard.table.date}</th>
                  <th>{t.dashboard.table.amount}</th>
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
                    <td style={{ fontWeight: 500 }}>{row.politician}</td>
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
        
        {/* Right Side: Chart */}
        <div style={{ flex: '1 1 60%', display: 'flex', flexDirection: 'column' }}>
          {selectedTrade ? (
             <StockChart ticker={selectedTrade.ticker} height={450} markers={chartMarkers} />
          ) : (
             <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
               <p className="text-muted">{t.dashboard.selectPrompt}</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
