import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const mockEarnings = [
  { id: 1, company: 'NVIDIA Corp', ticker: 'NVDA', date: '2026-08-25', estEPS: '$0.75', prevEPS: '$0.68', status: 'Upcoming' },
  { id: 2, company: 'Apple Inc', ticker: 'AAPL', date: '2026-07-28', estEPS: '$1.42', prevEPS: '$1.35', status: 'Upcoming' },
  { id: 3, company: 'Microsoft', ticker: 'MSFT', date: '2026-07-23', estEPS: '$2.90', prevEPS: '$2.85', status: 'Upcoming' },
  { id: 4, company: 'Broadcom', ticker: 'AVGO', date: '2026-09-02', estEPS: '$11.00', prevEPS: '$10.50', status: 'Upcoming' },
  { id: 5, company: 'Tesla Inc', ticker: 'TSLA', date: '2026-07-15', estEPS: '$0.55', prevEPS: '$0.45', status: 'Upcoming' },
  { id: 6, company: 'Meta Platforms', ticker: 'META', date: '2026-07-29', estEPS: '$4.50', prevEPS: '$4.30', status: 'Upcoming' },
  { id: 7, company: 'Alphabet Inc', ticker: 'GOOGL', date: '2026-07-21', estEPS: '$1.80', prevEPS: '$1.75', status: 'Upcoming' },
  { id: 8, company: 'Amazon.com', ticker: 'AMZN', date: '2026-08-01', estEPS: '$1.25', prevEPS: '$1.15', status: 'Upcoming' },
  { id: 9, company: 'AMD', ticker: 'AMD', date: '2026-08-04', estEPS: '$0.90', prevEPS: '$0.82', status: 'Upcoming' },
  { id: 10, company: 'Palantir Tech', ticker: 'PLTR', date: '2026-08-05', estEPS: '$0.10', prevEPS: '$0.08', status: 'Upcoming' },
  { id: 11, company: 'Salesforce', ticker: 'CRM', date: '2026-08-26', estEPS: '$2.45', prevEPS: '$2.30', status: 'Upcoming' },
  { id: 12, company: 'Adobe Inc', ticker: 'ADBE', date: '2026-09-15', estEPS: '$4.50', prevEPS: '$4.35', status: 'Upcoming' },
  { id: 13, company: 'Netflix Inc', ticker: 'NFLX', date: '2026-07-16', estEPS: '$5.10', prevEPS: '$4.80', status: 'Upcoming' },
  { id: 14, company: 'Intel Corp', ticker: 'INTC', date: '2026-07-23', estEPS: '$0.35', prevEPS: '$0.30', status: 'Upcoming' },
  { id: 15, company: 'Qualcomm', ticker: 'QCOM', date: '2026-07-29', estEPS: '$2.60', prevEPS: '$2.45', status: 'Upcoming' },
  { id: 16, company: 'Snowflake', ticker: 'SNOW', date: '2026-08-26', estEPS: '$0.20', prevEPS: '$0.14', status: 'Upcoming' },
  { id: 17, company: 'Super Micro', ticker: 'SMCI', date: '2026-08-06', estEPS: '$8.50', prevEPS: '$7.80', status: 'Upcoming' },
  { id: 18, company: 'CrowdStrike', ticker: 'CRWD', date: '2026-08-30', estEPS: '$0.85', prevEPS: '$0.75', status: 'Upcoming' },
  { id: 19, company: 'Palo Alto', ticker: 'PANW', date: '2026-08-18', estEPS: '$1.25', prevEPS: '$1.10', status: 'Upcoming' },
  { id: 20, company: 'Taiwan Semi', ticker: 'TSM', date: '2026-07-18', estEPS: '$1.45', prevEPS: '$1.35', status: 'Upcoming' },
  { id: 21, company: 'Costco', ticker: 'COST', date: '2026-09-24', estEPS: '$3.80', prevEPS: '$3.50', status: 'Upcoming' },
  { id: 22, company: 'JPMorgan', ticker: 'JPM', date: '2026-07-14', estEPS: '$4.10', prevEPS: '$3.90', status: 'Upcoming' },
  { id: 23, company: 'Visa Inc', ticker: 'V', date: '2026-07-21', estEPS: '$2.45', prevEPS: '$2.35', status: 'Upcoming' },
  { id: 24, company: 'Mastercard', ticker: 'MA', date: '2026-07-28', estEPS: '$3.50', prevEPS: '$3.30', status: 'Upcoming' },
  { id: 25, company: 'Eli Lilly', ticker: 'LLY', date: '2026-08-08', estEPS: '$2.80', prevEPS: '$2.50', status: 'Upcoming' },
  { id: 26, company: 'Novo Nordisk', ticker: 'NVO', date: '2026-08-10', estEPS: '$0.85', prevEPS: '$0.75', status: 'Upcoming' },
  { id: 27, company: 'Walmart', ticker: 'WMT', date: '2026-08-15', estEPS: '$1.65', prevEPS: '$1.55', status: 'Upcoming' },
  { id: 28, company: 'Exxon Mobil', ticker: 'XOM', date: '2026-07-26', estEPS: '$2.20', prevEPS: '$2.10', status: 'Upcoming' },
  { id: 29, company: 'Chevron', ticker: 'CVX', date: '2026-07-26', estEPS: '$3.10', prevEPS: '$2.95', status: 'Upcoming' },
  { id: 30, company: 'Home Depot', ticker: 'HD', date: '2026-08-13', estEPS: '$4.50', prevEPS: '$4.30', status: 'Upcoming' }
];

const Earnings = () => {
  const { t } = useLanguage();
  const [earnings, setEarnings] = useState([]);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setEarnings(mockEarnings);
    }, 400);
  }, []);

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1 className="page-title">{t.earnings.title}</h1>
        <p className="text-muted">{t.earnings.subtitle}</p>
      </div>

      <div className="glass-panel">
        <table className="data-table">
          <thead style={{ position: 'sticky', top: 0, background: 'var(--color-primary)', zIndex: 1 }}>
            <tr>
              <th>{t.earnings.table.company}</th>
              <th>{t.earnings.table.ticker}</th>
              <th>{t.earnings.table.date}</th>
              <th>{t.earnings.table.estEPS}</th>
              <th>{t.earnings.table.prevEPS}</th>
              <th>{t.earnings.table.status}</th>
            </tr>
          </thead>
          <tbody>
            {earnings.map((row) => (
              <tr key={row.id}>
                <td style={{ fontWeight: 500 }}>{row.company}</td>
                <td style={{ fontWeight: 700, color: 'var(--color-foreground)' }}>{row.ticker}</td>
                <td>{row.date}</td>
                <td className="font-mono" style={{ color: 'var(--color-on-primary)' }}>{row.estEPS}</td>
                <td className="text-muted font-mono">{row.prevEPS}</td>
                <td><span className="badge" style={{ background: 'var(--color-secondary)', color: 'var(--color-muted-text)', border: '1px solid var(--color-border)' }}>{row.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Earnings;
