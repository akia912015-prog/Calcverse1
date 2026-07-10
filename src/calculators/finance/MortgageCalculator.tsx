import { useState } from 'react';
import { DollarSign } from 'lucide-react';
import CalculatorShell from '../../components/CalculatorShell';
import { NumberInput, ResultCard, ResultGrid, EmptyState, parseNum, formatCurrency, formatNumber } from '../../components/CalculatorFields';

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState('400000');
  const [downPayment, setDownPayment] = useState('80000');
  const [rate, setRate] = useState('6.5');
  const [years, setYears] = useState('30');

  const price = parseNum(homePrice);
  const down = parseNum(downPayment);
  const r = parseNum(rate);
  const y = parseNum(years);

  const principal = price !== null && down !== null ? price - down : null;
  const monthlyRate = r !== null ? r / 100 / 12 : null;
  const months = y !== null ? y * 12 : null;

  let monthlyPayment: number | null = null;
  let totalPaid: number | null = null;
  let totalInterest: number | null = null;

  if (principal !== null && monthlyRate !== null && months !== null && principal > 0 && months > 0) {
    if (monthlyRate === 0) {
      monthlyPayment = principal / months;
    } else {
      monthlyPayment =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
    }
    totalPaid = monthlyPayment * months;
    totalInterest = totalPaid - principal;
  }

  const hasResult = monthlyPayment !== null;

  return (
    <CalculatorShell
      name="Mortgage Calculator"
      description="Estimate your monthly mortgage payment including principal and interest. Enter your home price, down payment, interest rate, and loan term to see what you'll pay."
      category="finance"
      keywords={['mortgage', 'home loan', 'monthly payment', 'principal', 'interest', 'amortization']}
      onReset={() => { setHomePrice('400000'); setDownPayment('80000'); setRate('6.5'); setYears('30'); }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <NumberInput label="Home price" value={homePrice} onChange={setHomePrice} prefix="$" placeholder="400000" />
        <NumberInput label="Down payment" value={downPayment} onChange={setDownPayment} prefix="$" placeholder="80000" />
        <NumberInput label="Interest rate" value={rate} onChange={setRate} suffix="%" placeholder="6.5" step="0.1" />
        <NumberInput label="Loan term" value={years} onChange={setYears} suffix="yrs" placeholder="30" />
      </div>

      {hasResult ? (
        <>
          <ResultGrid>
            <ResultCard
              label="Monthly payment"
              value={formatCurrency(monthlyPayment!)}
              highlight
              icon={<DollarSign className="h-4 w-4" />}
            />
            <ResultCard label="Loan amount" value={formatCurrency(principal!)} />
            <ResultCard label="Total interest" value={formatCurrency(totalInterest!)} />
            <ResultCard
              label="Total paid"
              value={formatCurrency(totalPaid!)}
              subtext={`Over ${y} years`}
            />
          </ResultGrid>
          {down !== null && price !== null && price > 0 && (
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Your down payment is {formatNumber((down / price) * 100, 1)}% of the home price.
            </p>
          )}
        </>
      ) : (
        <EmptyState message="Enter your home price, down payment, interest rate, and loan term to calculate your monthly payment." />
      )}
    </CalculatorShell>
  );
}
