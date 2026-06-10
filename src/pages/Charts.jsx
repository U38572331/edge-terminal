import React, { useState, useEffect } from 'react';
import StockChart from '../components/StockChart';
import { useLanguage } from '../contexts/LanguageContext';

const Charts = () => {
  const { t } = useLanguage();
  const [ticker, setTicker] = useState('AAPL');
  const [inputTicker, setInputTicker] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (!inputTicker.trim()) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const res = await fetch(`https://query2.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(inputTicker)}&quotesCount=6&newsCount=0`);
        const data = await res.json();
        if (data && data.quotes) {
          // Filter out non-equity if needed, or just map them
          const validQuotes = data.quotes.filter(q => q.symbol && q.shortname);
          setSuggestions(validQuotes);
        }
      } catch (err) {
        console.error("Autocomplete failed", err);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [inputTicker]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (inputTicker.trim()) {
      setTicker(inputTicker.trim().toUpperCase());
      setShowSuggestions(false);
      setInputTicker('');
    }
  };

  const selectSuggestion = (symbol) => {
    setTicker(symbol);
    setShowSuggestions(false);
    setInputTicker('');
  };

  return (
    <div className="fade-in">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="page-title">{t.charts.title}</h1>
          <p className="text-muted">{t.charts.subtitle}</p>
          
          <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
            {['AAPL', 'NVDA', 'TSM', 'TSLA', 'MSFT', 'META', 'GOOGL', 'AMZN', 'AMD', 'SPY', '^GSPC', 'AVGO', 'CRWD', 'PLTR', 'PANW', 'SMCI', 'SNOW', 'COST', 'LLY', 'NVO', 'INTC', 'QCOM', 'V', 'JPM', 'CRM', 'NFLX', 'WMT'].map(t => (
              <button 
                key={t}
                onClick={() => { setInputTicker(t); setTicker(t); }}
                style={{
                  background: ticker === t ? 'var(--accent-blue)' : 'var(--bg-panel)',
                  border: `1px solid ${ticker === t ? 'var(--accent-blue)' : 'var(--border-color)'}`,
                  color: ticker === t ? '#fff' : 'var(--text-secondary)',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.85rem'
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        
        <div style={{ position: 'relative' }}>
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px' }}>
            <input 
              type="text" 
              value={inputTicker} 
              onChange={(e) => {
                setInputTicker(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              placeholder={t.charts.searchPlaceholder}
              style={{
                padding: '10px 16px',
                background: 'var(--bg-panel-solid)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                width: '300px',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocusCapture={(e) => e.target.style.borderColor = 'var(--accent-blue)'}
              onBlurCapture={(e) => e.target.style.borderColor = 'var(--border-color)'}
            />
            <button 
              type="submit"
              style={{
                padding: '10px 20px',
                background: 'var(--accent-blue)',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              {t.charts.loadButton}
            </button>
          </form>

          {/* Autocomplete Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              width: '300px',
              background: 'var(--bg-panel-solid)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              marginTop: '5px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
              zIndex: 100,
              overflow: 'hidden'
            }}>
              {suggestions.map((sugg, idx) => (
                <div 
                  key={idx}
                  onClick={() => selectSuggestion(sugg.symbol)}
                  style={{
                    padding: '10px 15px',
                    borderBottom: idx === suggestions.length - 1 ? 'none' : '1px solid rgba(116, 177, 190, 0.1)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    transition: 'background 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                  onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{ fontWeight: 'bold', color: 'var(--accent-blue)' }}>{sugg.symbol}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{sugg.shortname}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <StockChart ticker={ticker} height={500} />
    </div>
  );
};

export default Charts;
