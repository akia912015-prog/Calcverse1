import { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import CalculatorShell from '../../components/CalculatorShell';
import { NumberInput, SelectInput, ResultCard, ResultGrid, EmptyState, parseNum, formatCurrency } from '../../components/CalculatorFields';

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState('10000');
  const [rate, setRate] = useState('7');
  const [years, setYears] = useState('10');
  const [contribution, setContribution] = useState('200');
  const [freq, setFreq] = useState('12');

  const p = parseNum(principal);
  const r = parseNum(rate);
  const y = parseNum(years);
  const c = parseNum(contribution);
  const f = parseNum(freq);

  let finalAmount: number | null = null;
  let totalContributions: number | null = null;
  let interestEarned: number | null = null;

  if (p !== null && r !== null && y !== null && c !== null && f !== null && f > 0 && y > 0) {
    const mr = r / 100 / f;
    const periods = f * y;
    // Compound principal
    const principalGrowth = p * Math.pow(1 + mr, periods);
    // Future value of contributions (ordinary annuity)
    const contributionGrowth = mr === 0 ? c * periods : c * ((Math.pow(1 + mr, periods) - 1) / mr);
    finalAmount = principalGrowth + contributionGrowth;
    totalContributions = p + c * periods;
    interestEarned = finalAmount - totalContributions;
  }

  return (
    <CalculatorShell
      name="Compound Interest Calculator"
      description="See how your money grows with compound interest. Enter your initial investment, monthly contribution, annual rate, and time horizon to project your future balance."
      category="finance"
      keywords={['compound interest', 'investment', 'savings', 'growth', 'annuity', 'future value']}
      onReset={() => { setPrincipal('10000'); setRate('7'); setYears('10'); setContribution('200'); setFreq('12'); }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <NumberInput label="Initial investment" value={principal} onChange={setPrincipal} prefix="$" placeholder="10000" />
        <NumberInput label="Monthly contribution" value={contribution} onChange={setContribution} prefix="$" placeholder="200" />
        <NumberInput label="Annual interest rate" value={rate} onChange={setRate} suffix="%" placeholder="7" step="0.1" />
        <NumberInput label="Years" value={years} onChange={setYears} suffix="yrs" placeholder="10" />
        <SelectInput
          label="Compounding frequency"
          value={freq}
          onChange={setFreq}
          options={[
            { value: '1', label: 'Annually' },
            { value: '4', label: 'Quarterly' },
            { value: '12', label: 'Monthly' },
            { value: '365', label: 'Daily' },
          ]}
        />
      </div>

      {finalAmount !== null ? (
        <ResultGrid>
          <ResultCard label="Final balance" value={formatCurrency(finalAmount)} highlight icon={<TrendingUp className="h-4 w-4" />} />
          <ResultCard label="Total contributions" value={formatCurrency(totalContributions!)} />
          <ResultCard label="Interest earned" value={formatCurrency(interestEarned!)} subtext={`Over ${years} years`} />
        </ResultGrid>
      ) : (
        <EmptyState message="Enter your investment details to see how compound interest grows your money." />
      )}
    </CalculatorShell>
  );
}
