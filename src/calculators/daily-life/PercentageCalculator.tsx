import { useState } from 'react';
import { Percent } from 'lucide-react';
import CalculatorShell from '../../components/CalculatorShell';
import { NumberInput, SelectInput, ResultCard, ResultGrid, EmptyState, parseNum, formatNumber } from '../../components/CalculatorFields';

export default function PercentageCalculator() {
  const [mode, setMode] = useState('of');
  const [a, setA] = useState('20');
  const [b, setB] = useState('150');

  const numA = parseNum(a);
  const numB = parseNum(b);

  let result: number | null = null;
  let label = '';

  if (numA !== null && numB !== null) {
    switch (mode) {
      case 'of':
        result = (numA / 100) * numB;
        label = `${numA}% of ${numB}`;
        break;
      case 'isWhat':
        if (numB !== 0) {
          result = (numA / numB) * 100;
          label = `${numA} is what % of ${numB}`;
        }
        break;
      case 'change':
        if (numA !== 0) {
          result = ((numB - numA) / numA) * 100;
          label = `Change from ${numA} to ${numB}`;
        }
        break;
    }
  }

  return (
    <CalculatorShell
      name="Percentage Calculator"
      description="Calculate percentages easily: find X% of a number, determine what percentage one number is of another, or calculate percentage change between two values."
      category="daily-life"
      keywords={['percentage', 'percent', 'percent change', 'ratio', 'proportion']}
      onReset={() => { setMode('of'); setA('20'); setB('150'); }}
    >
      <div className="mb-5">
        <SelectInput
          label="Calculation type"
          value={mode}
          onChange={setMode}
          options={[
            { value: 'of', label: 'X% of Y' },
            { value: 'isWhat', label: 'X is what % of Y' },
            { value: 'change', label: '% change from X to Y' },
          ]}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <NumberInput
          label={mode === 'change' ? 'Original value (X)' : mode === 'of' ? 'Percentage (X)' : 'Value (X)'}
          value={a}
          onChange={setA}
          suffix={mode === 'of' ? '%' : ''}
          placeholder="20"
        />
        <NumberInput
          label={mode === 'change' ? 'New value (Y)' : 'Value (Y)'}
          value={b}
          onChange={setB}
          placeholder="150"
        />
      </div>

      {result !== null ? (
        <ResultGrid>
          <ResultCard
            label="Result"
            value={mode === 'of' ? formatNumber(result, 2) : `${formatNumber(result, 2)}%`}
            highlight
            icon={<Percent className="h-4 w-4" />}
          />
          <ResultCard label="Calculation" value={label} />
        </ResultGrid>
      ) : (
        <EmptyState message="Enter values to calculate the percentage." />
      )}
    </CalculatorShell>
  );
}
