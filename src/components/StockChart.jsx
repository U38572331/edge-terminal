import React, { useEffect, useRef, useState } from 'react';
import { createChart, CandlestickSeries, createSeriesMarkers } from 'lightweight-charts';

const StockChart = ({ ticker, height = 500, markers = [] }) => {
  const chartContainerRef = useRef();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Use stringified markers to prevent infinite loops when default [] is used
  const markersString = JSON.stringify(markers);

  useEffect(() => {
    if (!ticker) return;
    
    let chart = null;
    let isMounted = true;
    
    const initChart = async () => {
      setLoading(true);
      setErrorMsg('');

      // Create chart instance
      chart = createChart(chartContainerRef.current, {
        layout: {
          background: { type: 'solid', color: 'transparent' },
          textColor: '#94A3B8',
          fontFamily: "'JetBrains Mono', monospace",
        },
        grid: {
          vertLines: { color: '#334155' },
          horzLines: { color: '#334155' },
        },
        width: chartContainerRef.current.clientWidth || 800,
        height: height,
      });

        const candleSeries = chart.addSeries(CandlestickSeries, {
          upColor: '#22C55E',
          downColor: '#EF4444',
          borderVisible: false,
          wickUpColor: '#22C55E',
          wickDownColor: '#EF4444',
        });

      try {
        // Fetch 5 years of data
        const res = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?range=5y&interval=1d`, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
          }
        });
        
        if (!res.ok) {
           throw new Error(`API returned status ${res.status}`);
        }
        
        const data = await res.json();
        
        if (!data.chart || !data.chart.result || data.chart.result.length === 0) {
           throw new Error("No data found for this ticker.");
        }
        
        const result = data.chart.result[0];
        const timestamps = result.timestamp || [];
        const quote = result.indicators.quote[0];
        
        if (timestamps.length === 0) {
           throw new Error("Empty data returned.");
        }

        const chartData = [];
        for (let index = 0; index < timestamps.length; index++) {
          const o = quote.open[index];
          const h = quote.high[index];
          const l = quote.low[index];
          const c = quote.close[index];
          
          if (
            o !== null && o !== undefined && !isNaN(o) &&
            h !== null && h !== undefined && !isNaN(h) &&
            l !== null && l !== undefined && !isNaN(l) &&
            c !== null && c !== undefined && !isNaN(c)
          ) {
            const date = new Date(timestamps[index] * 1000);
            const timeStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
            chartData.push({
              time: timeStr,
              open: o,
              high: h,
              low: l,
              close: c
            });
          }
        }

        // Remove duplicates and sort by string time
        const uniqueDataMap = new Map();
        chartData.forEach(item => {
          if (!uniqueDataMap.has(item.time)) {
             uniqueDataMap.set(item.time, item);
          }
        });
        
        const uniqueData = Array.from(uniqueDataMap.values()).sort((a, b) => a.time.localeCompare(b.time));
        
        if (uniqueData.length === 0) {
           throw new Error("No valid data points available.");
        }

        if (isMounted) {
          candleSeries.setData(uniqueData);
          
          const parsedMarkers = JSON.parse(markersString);
          if (parsedMarkers && parsedMarkers.length > 0) {
             const sortedMarkers = [...parsedMarkers].sort((a, b) => a.time.localeCompare(b.time));
             createSeriesMarkers(candleSeries, sortedMarkers);
          }
          
          chart.timeScale().fitContent();
        }
      } catch (err) {
        console.error("Failed to fetch chart data", err);
        if (isMounted) {
           setErrorMsg(`Failed to load chart for ${ticker}. Error: ${err.message}`);
        }
      } finally {
        if (isMounted) {
           setLoading(false);
        }
      }
    };

    initChart();

    const handleResize = () => {
      if (chart && chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      isMounted = false;
      window.removeEventListener('resize', handleResize);
      if (chart) {
         try {
           chart.remove();
         } catch(e) {}
      }
    };
  }, [ticker, markersString, height]);

  return (
    <div className="glass-panel" style={{ padding: '20px', minHeight: `${height + 40}px`, position: 'relative', width: '100%', boxSizing: 'border-box' }}>
      {loading && <p style={{ position: 'absolute', zIndex: 10, color: 'var(--accent-blue)', top: '20px', left: '20px', background: 'rgba(0,0,0,0.5)', padding: '5px' }}>Loading chart data...</p>}
      {errorMsg && !loading && (
        <div style={{ position: 'absolute', zIndex: 10, color: 'var(--accent-down)', top: '20px', left: '20px', background: 'rgba(0,0,0,0.5)', padding: '10px', borderRadius: '5px', border: '1px solid var(--accent-down)' }}>
          {errorMsg}
        </div>
      )}
      <div ref={chartContainerRef} style={{ width: '100%', height: `${height}px` }} />
    </div>
  );
};

export default StockChart;
