import { useState } from 'react';
import { Flame } from 'lucide-react';
import CalculatorShell from '../../components/CalculatorShell';
import { NumberInput, SelectInput, ResultCard, ResultGrid, EmptyState, parseNum } from '../../components/CalculatorFields';

export default function BMRCalculator() {
  const [age, setAge] = useState('30');
  const [height, setHeight] = useState('170');
  const [weight, setWeight] = useState('70');
  const [gender, setGender] = useState('male');
  const [activity, setActivity] = useState('1.55');

  const a = parseNum(age);
  const h = parseNum(height);
  const w = parseNum(weight);

  let bmr: number | null = null;
  if (a !== null && h !== null && w !== null && a > 0 && h > 0 && w > 0) {
    // Mifflin-St Jeor Equation
    bmr = 10 * w + 6.25 * h - 5 * a + (gender === 'male' ? 5 : -161);
  }

  const tdee = bmr !== null ? bmr * parseFloat(activity) : null;

  const activityLevels = [
    { value: '1.2', label: 'Sedentary (little exercise)' },
    { value: '1.375', label: 'Lightly active (1-3 days/week)' },
    { value: '1.55', label: 'Moderately active (3-5 days/week)' },
    { value: '1.725', label: 'Very active (6-7 days/week)' },
    { value: '1.9', label: 'Extra active (physical job)' },
  ];

  return (
    <CalculatorShell
      name="BMR & Calorie Calculator"
      description="Calculate your Basal Metabolic Rate (BMR) and daily calorie needs (TDEE). Uses the Mifflin-St Jeor equation and activity multipliers for accurate results."
      category="health"
      keywords={['bmr', 'calories', 'tdee', 'metabolism', 'daily calorie needs', 'mifflin st jeor']}
      onReset={() => { setAge('30'); setHeight('170'); setWeight('70'); setGender('male'); setActivity('1.55'); }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <SelectInput
          label="Gender"
          value={gender}
          onChange={setGender}
          options={[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }]}
        />
        <NumberInput label="Age" value={age} onChange={setAge} suffix="yrs" placeholder="30" />
        <NumberInput label="Height" value={height} onChange={setHeight} suffix="cm" placeholder="170" />
        <NumberInput label="Weight" value={weight} onChange={setWeight} suffix="kg" placeholder="70" />
      </div>

      <div className="mt-5">
        <SelectInput label="Activity level" value={activity} onChange={setActivity} options={activityLevels} />
      </div>

      {bmr !== null && tdee !== null ? (
        <ResultGrid>
          <ResultCard label="BMR (at rest)" value={`${Math.round(bmr)} cal/day`} highlight icon={<Flame className="h-4 w-4" />} />
          <ResultCard label="TDEE (maintenance)" value={`${Math.round(tdee)} cal/day`} subtext="Calories to maintain weight" />
          <ResultCard label="Weight loss" value={`${Math.round(tdee - 500)} cal/day`} subtext="~1 lb/week loss" />
          <ResultCard label="Weight gain" value={`${Math.round(tdee + 500)} cal/day`} subtext="~1 lb/week gain" />
        </ResultGrid>
      ) : (
        <EmptyState message="Enter your details to calculate your daily calorie needs." />
      )}
    </CalculatorShell>
  );
}
