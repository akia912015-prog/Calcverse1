import { useState } from 'react';
import CalculatorShell from '../../components/CalculatorShell';
import { NumberInput, SelectInput, ResultCard, ResultGrid, EmptyState, parseNum } from '../../components/CalculatorFields';

function bmiCategory(bmi: number): { label: string; color: string } {
  if (bmi < 18.5) return { label: 'Underweight', color: 'text-blue-600 dark:text-blue-400' };
  if (bmi < 25) return { label: 'Normal weight', color: 'text-brand-600 dark:text-brand-400' };
  if (bmi < 30) return { label: 'Overweight', color: 'text-accent-600 dark:text-accent-400' };
  return { label: 'Obese', color: 'text-rose-600 dark:text-rose-400' };
}

export default function BMICalculator() {
  const [height, setHeight] = useState('170');
  const [weight, setWeight] = useState('70');
  const [unit, setUnit] = useState('metric');

  const h = parseNum(height);
  const w = parseNum(weight);

  let bmi: number | null = null;
  if (h !== null && w !== null && h > 0 && w > 0) {
    if (unit === 'metric') {
      bmi = w / Math.pow(h / 100, 2);
    } else {
      bmi = (w / Math.pow(h, 2)) * 703;
    }
  }

  const cat = bmi !== null ? bmiCategory(bmi) : null;

  return (
    <CalculatorShell
      name="BMI Calculator"
      description="Calculate your Body Mass Index (BMI) to assess whether your weight is in a healthy range for your height. Supports both metric and imperial units."
      category="health"
      keywords={['bmi', 'body mass index', 'weight', 'healthy weight', 'body composition']}
      onReset={() => { setHeight('170'); setWeight('70'); setUnit('metric'); }}
    >
      <div className="mb-5">
        <SelectInput
          label="Unit system"
          value={unit}
          onChange={setUnit}
          options={[
            { value: 'metric', label: 'Metric (cm, kg)' },
            { value: 'imperial', label: 'Imperial (in, lb)' },
          ]}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <NumberInput
          label="Height"
          value={height}
          onChange={setHeight}
          suffix={unit === 'metric' ? 'cm' : 'in'}
          placeholder={unit === 'metric' ? '170' : '67'}
        />
        <NumberInput
          label="Weight"
          value={weight}
          onChange={setWeight}
          suffix={unit === 'metric' ? 'kg' : 'lb'}
          placeholder={unit === 'metric' ? '70' : '154'}
        />
      </div>

      {bmi !== null && cat ? (
        <>
          <ResultGrid>
            <ResultCard label="Your BMI" value={bmi.toFixed(1)} highlight subtext={cat.label} />
            <ResultCard label="Category" value={cat.label} />
          </ResultGrid>
          <div className="mt-4">
            <div className="flex h-3 overflow-hidden rounded-full">
              <div className="flex-1 bg-blue-400" />
              <div className="flex-1 bg-brand-500" />
              <div className="flex-1 bg-accent-400" />
              <div className="flex-1 bg-rose-500" />
            </div>
            <div className="mt-1 flex justify-between text-xs text-gray-400">
              <span>Underweight</span>
              <span>Normal</span>
              <span>Overweight</span>
              <span>Obese</span>
            </div>
          </div>
          <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">
            BMI ranges: Underweight &lt; 18.5, Normal 18.5–24.9, Overweight 25–29.9, Obese 30+. BMI is a general indicator and doesn't account for muscle mass.
          </p>
        </>
      ) : (
        <EmptyState message="Enter your height and weight to calculate your BMI." />
      )}
    </CalculatorShell>
  );
}
