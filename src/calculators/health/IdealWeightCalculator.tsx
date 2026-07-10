import { useState } from 'react';
import CalculatorShell from '../../components/CalculatorShell';
import { NumberInput, SelectInput, ResultCard, ResultGrid, EmptyState, parseNum } from '../../components/CalculatorFields';

export default function IdealWeightCalculator() {
  const [height, setHeight] = useState('170');
  const [gender, setGender] = useState('male');
  const [frame, setFrame] = useState('medium');

  const h = parseNum(height);

  // Devine formula (uses height in inches)
  let idealKg: number | null = null;
  let rangeLow: number | null = null;
  let rangeHigh: number | null = null;

  if (h !== null && h > 0) {
    const heightIn = h / 2.54;
    const inchesOver5ft = Math.max(0, heightIn - 60);
    if (gender === 'male') {
      idealKg = 50 + 2.3 * inchesOver5ft;
    } else {
      idealKg = 45.5 + 2.3 * inchesOver5ft;
    }
    // Frame adjustment
    const factor = frame === 'small' ? 0.9 : frame === 'large' ? 1.1 : 1;
    idealKg *= factor;
    // Healthy BMI range 18.5-24.9
    const heightM = h / 100;
    rangeLow = 18.5 * heightM * heightM;
    rangeHigh = 24.9 * heightM * heightM;
  }

  return (
    <CalculatorShell
      name="Ideal Weight Calculator"
      description="Find your ideal body weight using the Devine formula, adjusted for gender and frame size. Also shows a healthy weight range based on BMI."
      category="health"
      keywords={['ideal weight', 'devine formula', 'healthy weight', 'target weight', 'frame size']}
      onReset={() => { setHeight('170'); setGender('male'); setFrame('medium'); }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <SelectInput
          label="Gender"
          value={gender}
          onChange={setGender}
          options={[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }]}
        />
        <NumberInput label="Height" value={height} onChange={setHeight} suffix="cm" placeholder="170" />
        <SelectInput
          label="Frame size"
          value={frame}
          onChange={setFrame}
          options={[
            { value: 'small', label: 'Small' },
            { value: 'medium', label: 'Medium' },
            { value: 'large', label: 'Large' },
          ]}
        />
      </div>

      {idealKg !== null ? (
        <ResultGrid>
          <ResultCard label="Ideal weight" value={`${idealKg.toFixed(1)} kg`} highlight subtext={`(${(idealKg * 2.205).toFixed(1)} lb)`} />
          <ResultCard label="Healthy range" value={`${rangeLow!.toFixed(1)}–${rangeHigh!.toFixed(1)} kg`} subtext="Based on BMI 18.5–24.9" />
        </ResultGrid>
      ) : (
        <EmptyState message="Enter your height to calculate your ideal weight." />
      )}
    </CalculatorShell>
  );
}
