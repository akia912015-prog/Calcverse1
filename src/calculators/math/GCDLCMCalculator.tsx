import { useState } from 'react';
import CalculatorShell from '../../components/CalculatorShell';
import { NumberInput, ResultCard, ResultGrid, EmptyState, parseNum } from '../../components/CalculatorFields';

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    [a, b] = [b, a % b];
  }
  return a || 1;
}

export default function GCDLCMCalculator() {
  const [a, setA] = useState('12');
  const [b, setB] = useState('18');

  const numA = parseNum(a);
  const numB = parseNum(b);

  let gcdVal: number | null = null;
  let lcmVal: number | null = null;

  if (numA !== null && numB !== null && Number.isInteger(numA) && Number.isInteger(numB)) {
    gcdVal = gcd(numA, numB);
    lcmVal = Math.abs(numA * numB) / gcdVal;
  }

  return (
    <CalculatorShell
      name="GCD & LCM Calculator"
      description="Find the Greatest Common Divisor (GCD) and Least Common Multiple (LCM) of two integers. Useful for simplifying fractions, finding common denominators, and number theory."
      category="math"
      keywords={['gcd', 'lcm', 'greatest common divisor', 'least common multiple', 'factors', 'number theory']}
      onReset={() => { setA('12'); setB('18'); }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <NumberInput label="First number" value={a} onChange={setA} placeholder="12" hint="Must be an integer" />
        <NumberInput label="Second number" value={b} onChange={setB} placeholder="18" hint="Must be an integer" />
      </div>

      {gcdVal !== null && lcmVal !== null ? (
        <ResultGrid>
          <ResultCard label="GCD" value={String(gcdVal)} highlight subtext="Greatest Common Divisor" />
          <ResultCard label="LCM" value={String(lcmVal)} subtext="Least Common Multiple" />
        </ResultGrid>
      ) : (
        <EmptyState message="Enter two integers to find their GCD and LCM." />
      )}
    </CalculatorShell>
  );
}
