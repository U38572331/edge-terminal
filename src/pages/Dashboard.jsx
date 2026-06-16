import React, { useState, useEffect } from 'react';
import StockChart from '../components/StockChart';
import { useLanguage } from '../contexts/LanguageContext';
import { getRelativeDate } from '../utils/dateHelpers';
import { ArrowUpRight, ArrowDownRight, Activity, Zap, Users } from 'lucide-react';

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
];

const Dashboard = () => {
  const { t } = useLanguage();
  const [trades, setTrades] = useState([]);
  const [selectedTrade, setSelectedTrade] = useState(null);

  useEffect(() => {
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
    <div className="fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="page-header" style={{ flexShrink: 0, marginBottom: '1.5rem' }}>
        <h1 className="page-title">{t.dashboard.title}</h1>
        <p className="text-muted">{t.dashboard.subtitle}</p>
      </div>

      <div className="bento-grid" style={{ flex: 1, minHeight: 0 }}>
        {/* KPI 1 */}
        <div className="bento-card kpi">
          <div className="kpi-title"><Activity size={16} /> Bullish Options Flow</div>
          <div className="kpi-value">$2.4B</div>
          <div className="kpi-trend text-up"><ArrowUpRight size={14} /> +12% from avg</div>
        </div>

        {/* KPI 2 */}
        <div className="bento-card kpi">
          <div className="kpi-title"><Zap size={16} /> Dark Pool Sweeps</div>
          <div className="kpi-value">$1.1B</div>
          <div className="kpi-trend text-up"><ArrowUpRight size={14} /> High Activity</div>
        </div>

        {/* KPI 3 */}
        <div className="bento-card kpi">
          <div className="kpi-title"><Users size={16} /> Insider Buy/Sell Ratio</div>
          <div className="kpi-value">4.2 : 1</div>
          <div className="kpi-trend text-up"><ArrowUpRight size={14} /> Strongly Bullish</div>
        </div>

        {/* Main Chart */}
        <div className="bento-card main-chart">
          {selectedTrade ? (
             <StockChart ticker={selectedTrade.ticker} height={400} markers={chartMarkers} />
          ) : (
             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
               <p className="text-muted">{t.dashboard.selectPrompt}</p>
             </div>
          )}
        </div>

        {/* Live Feed */}
        <div className="bento-card feed">
          <div className="feed-header">
            <Activity size={16} /> Live Feed
          </div>
          <div className="feed-list">
            {trades.map((row) => (
              <div 
                key={row.id}
                className={`feed-item ${selectedTrade?.id === row.id ? 'active' : ''}`}
                onClick={() => setSelectedTrade(row)}
              >
                <div className="feed-item-top">
                  <span style={{ fontWeight: 700 }}>{row.ticker}</span>
                  <span className={`badge ${row.type === 'Buy' ? 'badge-up' : 'badge-down'}`}>
                    {row.type === 'Buy' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {row.type}
                  </span>
                </div>
                <div className="feed-item-bottom">
                  <span className="text-muted">{row.politician}</span>
                  <span className="font-mono">{row.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
