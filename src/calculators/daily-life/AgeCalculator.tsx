import { useState } from 'react';
import { Cake } from 'lucide-react';
import CalculatorShell from '../../components/CalculatorShell';
import { ResultCard, ResultGrid, EmptyState } from '../../components/CalculatorFields';

export default function AgeCalculator() {
  const today = new Date().toISOString().split('T')[0];
  const [birthDate, setBirthDate] = useState('1995-01-15');
  const [targetDate, setTargetDate] = useState(today);

  let result: {
    years: number;
    months: number;
    days: number;
    totalDays: number;
    totalMonths: number;
    totalWeeks: number;
    totalHours: number;
  } | null = null;

  const birth = new Date(birthDate);
  const target = new Date(targetDate);

  if (!isNaN(birth.getTime()) && !isNaN(target.getTime()) && target >= birth) {
    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    const totalMs = target.getTime() - birth.getTime();
    const totalDays = Math.floor(totalMs / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    const totalHours = Math.floor(totalMs / (1000 * 60 * 60));

    result = { years, months, days, totalDays, totalMonths, totalWeeks, totalHours };
  }

  return (
    <CalculatorShell
      name="Age Calculator"
      description="Calculate your exact age in years, months, and days. Enter your birth date and optionally a target date to find the precise time between two dates."
      category="daily-life"
      keywords={['age', 'birthday', 'date difference', 'years', 'days alive']}
      onReset={() => { setBirthDate('1995-01-15'); setTargetDate(today); }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label">Date of birth</label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="input"
          />
        </div>
        <div>
          <label className="label">Age at date</label>
          <input
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            className="input"
          />
        </div>
      </div>

      {result ? (
        <>
          <ResultGrid>
            <ResultCard
              label="Your age"
              value={`${result.years} yr ${result.months} mo ${result.days} d`}
              highlight
              icon={<Cake className="h-4 w-4" />}
            />
            <ResultCard label="Total months" value={`${result.totalMonths}`} />
            <ResultCard label="Total weeks" value={`${result.totalWeeks.toLocaleString()}`} />
            <ResultCard label="Total days" value={`${result.totalDays.toLocaleString()}`} />
          </ResultGrid>
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            That's approximately {result.totalHours.toLocaleString()} hours.
          </p>
        </>
      ) : (
        <EmptyState message="Enter your date of birth to calculate your age. The target date must be after your birth date." />
      )}
    </CalculatorShell>
  );
}
