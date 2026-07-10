import { useState } from 'react';
import { Target } from 'lucide-react';
import CalculatorShell from '../../components/CalculatorShell';
import { NumberInput, ResultCard, ResultGrid, EmptyState, parseNum, formatCurrency } from '../../components/CalculatorFields';

export default function SavingsGoalCalculator() {
  const [goal, setGoal] = useState('50000');
  const [current, setCurrent] = useState('5000');
  const [monthly, setMonthly] = useState('500');
  const [rate, setRate] = useState('4');

  const g = parseNum(goal);
  const c = parseNum(current);
  const m = parseNum(monthly);
  const r = parseNum(rate);

  let monthsNeeded: number | null = null;
  let totalContributed: number | null = null;
  let interestEarned: number | null = null;

  if (g !== null && c !== null && m !== null && r !== null && g > 0 && m > 0) {
    const mr = r / 100 / 12;
    if (mr === 0) {
      monthsNeeded = Math.max(0, (g - c) / m);
    } else {
      // Solve for n: c*(1+mr)^n + m*((1+mr)^n - 1)/mr = g
      // => (1+mr)^n = (g*mr + m) / (c*mr + m)
      const ratio = (g * mr + m) / (c * mr + m);
      if (ratio > 1) {
        monthsNeeded = Math.log(ratio) / Math.log(1 + mr);
      } else {
        monthsNeeded = 0;
      }
    }
    monthsNeeded = Math.ceil(monthsNeeded);
    totalContributed = c + m * monthsNeeded;
    interestEarned = g - totalContributed;
  }

  const years = monthsNeeded !== null ? Math.floor(monthsNeeded / 12) : null;
  const remMonths = monthsNeeded !== null ? monthsNeeded % 12 : null;

  return (
    <CalculatorShell
      name="Savings Goal Calculator"
      description="Figure out how long it will take to reach your savings goal. Enter your target amount, current savings, monthly contribution, and expected interest rate."
      category="finance"
      keywords={['savings', 'goal', 'target', 'future value', 'financial planning', 'savings plan']}
      onReset={() => { setGoal('50000'); setCurrent('5000'); setMonthly('500'); setRate('4'); }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <NumberInput label="Savings goal" value={goal} onChange={setGoal} prefix="$" placeholder="50000" />
        <NumberInput label="Current savings" value={current} onChange={setCurrent} prefix="$" placeholder="5000" />
        <NumberInput label="Monthly contribution" value={monthly} onChange={setMonthly} prefix="$" placeholder="500" />
        <NumberInput label="Annual interest rate" value={rate} onChange={setRate} suffix="%" placeholder="4" step="0.1" />
      </div>

      {monthsNeeded !== null ? (
        <ResultGrid>
          <ResultCard
            label="Time to reach goal"
            value={years! > 0 ? `${years} yr ${remMonths} mo` : `${monthsNeeded} months`}
            highlight
            icon={<Target className="h-4 w-4" />}
          />
          <ResultCard label="Total contributions" value={formatCurrency(totalContributed!)} />
          <ResultCard label="Interest earned" value={formatCurrency(interestEarned!)} />
          <ResultCard label="Goal amount" value={formatCurrency(g!)} />
        </ResultGrid>
      ) : (
        <EmptyState message="Enter your savings goal and contribution details to see how long it will take." />
      )}
    </CalculatorShell>
  );
}
