import { useState } from 'react';
import { Droplet } from 'lucide-react';
import CalculatorShell from '../../components/CalculatorShell';
import { NumberInput, ResultCard, ResultGrid, EmptyState, parseNum } from '../../components/CalculatorFields';

export default function WaterIntakeCalculator() {
  const [weight, setWeight] = useState('70');
  const [exerciseMin, setExerciseMin] = useState('30');

  const w = parseNum(weight);
  const ex = parseNum(exerciseMin);

  let waterOz: number | null = null;
  let waterMl: number | null = null;
  let glasses: number | null = null;

  if (w !== null && ex !== null && w > 0) {
    // Base: 0.5 oz per pound = 0.67 oz per kg, plus 12 oz per 30 min exercise
    const weightKg = w;
    const baseMl = weightKg * 33; // ~33ml per kg
    const exerciseMl = (ex / 30) * 350; // 350ml per 30 min
    waterMl = Math.round(baseMl + exerciseMl);
    waterOz = Math.round(waterMl / 29.5735);
    glasses = Math.round(waterMl / 250); // 250ml glass
  }

  return (
    <CalculatorShell
      name="Water Intake Calculator"
      description="Calculate how much water you should drink each day based on your body weight and exercise level. Stay hydrated with a personalized daily water goal."
      category="health"
      keywords={['water', 'hydration', 'daily water intake', 'drinking water', 'fluid needs']}
      onReset={() => { setWeight('70'); setExerciseMin('30'); }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <NumberInput label="Body weight" value={weight} onChange={setWeight} suffix="kg" placeholder="70" />
        <NumberInput label="Exercise (daily)" value={exerciseMin} onChange={setExerciseMin} suffix="min" placeholder="30" />
      </div>

      {waterMl !== null ? (
        <ResultGrid>
          <ResultCard label="Daily water goal" value={`${(waterMl / 1000).toFixed(1)} L`} highlight icon={<Droplet className="h-4 w-4" />} />
          <ResultCard label="In ounces" value={`${waterOz} oz`} />
          <ResultCard label="Glasses (250ml)" value={`${glasses} glasses`} />
        </ResultGrid>
      ) : (
        <EmptyState message="Enter your weight and daily exercise minutes to calculate your water intake." />
      )}
    </CalculatorShell>
  );
}
