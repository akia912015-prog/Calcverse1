import { useState } from 'react';
import { DollarSign } from 'lucide-react';
import CalculatorShell from '../../components/CalculatorShell';
import { NumberInput, ResultCard, ResultGrid, EmptyState, parseNum, formatCurrency } from '../../components/CalculatorFields';

export default function LoanCalculator() {
  const [amount, setAmount] = useState('25000');
  const [rate, setRate] = useState('7.5');
  const [months, setMonths] = useState('60');

  const a = parseNum(amount);
  const r = parseNum(rate);
  const m = parseNum(months);

  let monthly: number | null = null;
  let total: number | null = null;
  let interest: number | null = null;

  if (a !== null && r !== null && m !== null && a > 0 && m > 0) {
    const mr = r / 100 / 12;
    if (mr === 0) {
      monthly = a / m;
    } else {
      monthly = (a * mr * Math.pow(1 + mr, m)) / (Math.pow(1 + mr, m) - 1);
    }
    total = monthly * m;
    interest = total - a;
  }

  return (
    <CalculatorShell
      name="Loan Calculator"
      description="Calculate monthly payments and total interest for any personal or auto loan. Enter the loan amount, annual interest rate, and term in months."
      category="finance"
      keywords={['loan', 'personal loan', 'auto loan', 'monthly payment', 'interest', 'amortization']}
      onReset={() => { setAmount('25000'); setRate('7.5'); setMonths('60'); }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <NumberInput label="Loan amount" value={amount} onChange={setAmount} prefix="$" placeholder="25000" />
        <NumberInput label="Interest rate" value={rate} onChange={setRate} suffix="%" placeholder="7.5" step="0.1" />
        <NumberInput label="Term" value={months} onChange={setMonths} suffix="months" placeholder="60" />
      </div>

      {monthly !== null ? (
        <ResultGrid>
          <ResultCard label="Monthly payment" value={formatCurrency(monthly)} highlight icon={<DollarSign className="h-4 w-4" />} />
          <ResultCard label="Total interest" value={formatCurrency(interest!)} />
          <ResultCard label="Total paid" value={formatCurrency(total!)} subtext={`Over ${months} months`} />
        </ResultGrid>
      ) : (
        <EmptyState message="Enter the loan amount, interest rate, and term to calculate your monthly payment." />
      )}
    </CalculatorShell>
  );
}
