import { useState } from 'react';
import CalculatorShell from '../../components/CalculatorShell';
import { NumberInput, SelectInput, ResultCard, ResultGrid, EmptyState, parseNum, formatCurrency } from '../../components/CalculatorFields';

export default function TaxCalculator() {
  const [income, setIncome] = useState('75000');
  const [rate, setRate] = useState('22');
  const [state, setState] = useState('none');

  const stateRates: Record<string, number> = {
    none: 0,
    ca: 9.3,
    tx: 0,
    ny: 6.85,
    fl: 0,
    wa: 0,
    or: 9.9,
  };

  const inc = parseNum(income);
  const r = parseNum(rate);
  const sr = stateRates[state] ?? 0;

  let federalTax: number | null = null;
  let stateTax: number | null = null;
  let takeHome: number | null = null;
  let effectiveRate: number | null = null;

  if (inc !== null && r !== null && inc > 0) {
    federalTax = inc * (r / 100);
    stateTax = inc * (sr / 100);
    takeHome = inc - federalTax - stateTax;
    effectiveRate = ((federalTax + stateTax) / inc) * 100;
  }

  return (
    <CalculatorShell
      name="Income Tax Calculator"
      description="Estimate your federal and state income tax. Enter your annual income and marginal tax rate to see your take-home pay and effective tax rate."
      category="finance"
      keywords={['tax', 'income tax', 'federal tax', 'state tax', 'take home pay', 'marginal rate']}
      onReset={() => { setIncome('75000'); setRate('22'); setState('none'); }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <NumberInput label="Annual income" value={income} onChange={setIncome} prefix="$" placeholder="75000" />
        <NumberInput label="Marginal tax rate" value={rate} onChange={setRate} suffix="%" placeholder="22" step="0.1" />
        <SelectInput
          label="State"
          value={state}
          onChange={setState}
          options={[
            { value: 'none', label: 'No state tax' },
            { value: 'ca', label: 'California (~9.3%)' },
            { value: 'tx', label: 'Texas (0%)' },
            { value: 'ny', label: 'New York (~6.85%)' },
            { value: 'fl', label: 'Florida (0%)' },
            { value: 'wa', label: 'Washington (0%)' },
            { value: 'or', label: 'Oregon (~9.9%)' },
          ]}
        />
      </div>

      {takeHome !== null ? (
        <ResultGrid>
          <ResultCard label="Take-home pay" value={formatCurrency(takeHome)} highlight subtext={`Effective rate: ${effectiveRate!.toFixed(1)}%`} />
          <ResultCard label="Federal tax" value={formatCurrency(federalTax!)} />
          <ResultCard label="State tax" value={formatCurrency(stateTax!)} subtext={state === 'none' ? 'No state income tax' : undefined} />
          <ResultCard label="Total tax" value={formatCurrency(federalTax! + stateTax!)} />
        </ResultGrid>
      ) : (
        <EmptyState message="Enter your annual income and tax rate to estimate your taxes." />
      )}
    </CalculatorShell>
  );
}
