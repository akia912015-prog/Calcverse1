import { useState } from 'react';
import CalculatorShell from '../../components/CalculatorShell';
import { NumberInput, SelectInput, ResultCard, ResultGrid, EmptyState, parseNum } from '../../components/CalculatorFields';

export default function BodyFatCalculator() {
  const [waist, setWaist] = useState('85');
  const [neck, setNeck] = useState('38');
  const [hip, setHip] = useState('95');
  const [height, setHeight] = useState('170');
  const [gender, setGender] = useState('male');

  const w = parseNum(waist);
  const n = parseNum(neck);
  const hp = parseNum(hip);
  const h = parseNum(height);

  let bodyFat: number | null = null;
  if (w !== null && n !== null && h !== null && h > 0 && w > 0 && n > 0) {
    if (gender === 'male') {
      if (w > n) {
        bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) - 450;
      }
    } else {
      if (hp !== null && hp > 0 && w + hp > n) {
        bodyFat =
          495 / (1.29579 - 0.35004 * Math.log10(w + hp - n) + 0.221 * Math.log10(h)) - 450;
      }
    }
  }

  function category(bf: number): string {
    if (gender === 'male') {
      if (bf < 6) return 'Essential fat';
      if (bf < 14) return 'Athletic';
      if (bf < 18) return 'Fitness';
      if (bf < 25) return 'Average';
      return 'Above average';
    } else {
      if (bf < 14) return 'Essential fat';
      if (bf < 21) return 'Athletic';
      if (bf < 25) return 'Fitness';
      if (bf < 32) return 'Average';
      return 'Above average';
    }
  }

  return (
    <CalculatorShell
      name="Body Fat Calculator"
      description="Estimate your body fat percentage using the U.S. Navy method. Enter your neck, waist, and (for women) hip measurements along with your height."
      category="health"
      keywords={['body fat', 'body fat percentage', 'navy method', 'body composition', 'fitness']}
      onReset={() => { setWaist('85'); setNeck('38'); setHip('95'); setHeight('170'); setGender('male'); }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <SelectInput
          label="Gender"
          value={gender}
          onChange={setGender}
          options={[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }]}
        />
        <NumberInput label="Height" value={height} onChange={setHeight} suffix="cm" placeholder="170" />
        <NumberInput label="Neck circumference" value={neck} onChange={setNeck} suffix="cm" placeholder="38" />
        <NumberInput label="Waist circumference" value={waist} onChange={setWaist} suffix="cm" placeholder="85" />
        {gender === 'female' && (
          <NumberInput label="Hip circumference" value={hip} onChange={setHip} suffix="cm" placeholder="95" />
        )}
      </div>

      {bodyFat !== null && bodyFat > 0 ? (
        <ResultGrid>
          <ResultCard label="Body fat" value={`${bodyFat.toFixed(1)}%`} highlight subtext={category(bodyFat)} />
          <ResultCard label="Category" value={category(bodyFat)} />
        </ResultGrid>
      ) : (
        <EmptyState message="Enter your measurements to estimate your body fat percentage. Waist must be larger than neck." />
      )}
    </CalculatorShell>
  );
}
