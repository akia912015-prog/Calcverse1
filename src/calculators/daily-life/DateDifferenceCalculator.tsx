import { useState } from 'react';
import CalculatorShell from '../../components/CalculatorShell';
import { ResultCard, ResultGrid, EmptyState } from '../../components/CalculatorFields';

export default function DateDifferenceCalculator() {
  const today = new Date().toISOString().split('T')[0];
  const [date1, setDate1] = useState(today);
  const [date2, setDate2] = useState('2026-12-31');

  let result: {
    days: number;
    weeks: number;
    months: number;
    years: number;
    businessDays: number;
  } | null = null;

  const d1 = new Date(date1);
  const d2 = new Date(date2);

  if (!isNaN(d1.getTime()) && !isNaN(d2.getTime())) {
    const start = d1 < d2 ? d1 : d2;
    const end = d1 < d2 ? d2 : d1;
    const diffMs = end.getTime() - start.getTime();
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let dayDiff = end.getDate() - start.getDate();
    if (dayDiff < 0) {
      months--;
      const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
      dayDiff += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    // Count business days
    let businessDays = 0;
    const current = new Date(start);
    while (current <= end) {
      const day = current.getDay();
      if (day !== 0 && day !== 6) businessDays++;
      current.setDate(current.getDate() + 1);
    }

    result = {
      days,
      weeks: Math.floor(days / 7),
      months: years * 12 + months,
      years,
      businessDays,
    };
  }

  return (
    <CalculatorShell
      name="Date Difference Calculator"
      description="Calculate the time between two dates in days, weeks, months, and business days. Perfect for project planning, countdowns, and scheduling."
      category="daily-life"
      keywords={['date difference', 'days between dates', 'countdown', 'business days', 'date range']}
      onReset={() => { setDate1(today); setDate2('2026-12-31'); }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label">Start date</label>
          <input type="date" value={date1} onChange={(e) => setDate1(e.target.value)} className="input" />
        </div>
        <div>
          <label className="label">End date</label>
          <input type="date" value={date2} onChange={(e) => setDate2(e.target.value)} className="input" />
        </div>
      </div>

      {result ? (
        <ResultGrid>
          <ResultCard label="Total days" value={`${result.days.toLocaleString()}`} highlight />
          <ResultCard label="Total weeks" value={`${result.weeks.toLocaleString()}`} />
          <ResultCard label="Total months" value={`${result.months}`} />
          <ResultCard label="Business days" value={`${result.businessDays}`} subtext="Excluding weekends" />
        </ResultGrid>
      ) : (
        <EmptyState message="Select two dates to calculate the difference between them." />
      )}
    </CalculatorShell>
  );
}
