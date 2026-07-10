import { useState } from 'react';
import CalculatorShell from '../../components/CalculatorShell';
import { NumberInput, ResultCard, ResultGrid, EmptyState, parseNum } from '../../components/CalculatorFields';

export default function QuadraticCalculator() {
  const [a, setA] = useState('1');
  const [b, setB] = useState('-3');
  const [c, setC] = useState('2');

  const numA = parseNum(a);
  const numB = parseNum(b);
  const numC = parseNum(c);

  let result:
    | { roots: string; discriminant: number; vertex: string; type: string }
    | null = null;

  if (numA !== null && numB !== null && numC !== null && numA !== 0) {
    const disc = numB * numB - 4 * numA * numC;
    const vertexX = -numB / (2 * numA);
    const vertexY = numA * vertexX * vertexX + numB * vertexX + numC;

    let roots: string;
    let type: string;

    if (disc > 0) {
      const r1 = (-numB + Math.sqrt(disc)) / (2 * numA);
      const r2 = (-numB - Math.sqrt(disc)) / (2 * numA);
      roots = `x₁ = ${r1.toFixed(4)}, x₂ = ${r2.toFixed(4)}`;
      type = 'Two real roots';
    } else if (disc === 0) {
      const r = -numB / (2 * numA);
      roots = `x = ${r.toFixed(4)}`;
      type = 'One real root (double)';
    } else {
      const real = (-numB / (2 * numA)).toFixed(4);
      const imag = (Math.sqrt(-disc) / (2 * numA)).toFixed(4);
      roots = `x₁ = ${real} + ${imag}i, x₂ = ${real} − ${imag}i`;
      type = 'Two complex roots';
    }

    result = {
      roots,
      discriminant: disc,
      vertex: `(${vertexX.toFixed(4)}, ${vertexY.toFixed(4)})}`,
      type,
    };
  }

  return (
    <CalculatorShell
      name="Quadratic Equation Solver"
      description="Solve any quadratic equation ax² + bx + c = 0. Enter the coefficients to find the roots, discriminant, and vertex of the parabola. Handles real and complex roots."
      category="math"
      keywords={['quadratic', 'equation', 'roots', 'discriminant', 'parabola', 'vertex', 'algebra']}
      onReset={() => { setA('1'); setB('-3'); setC('2'); }}
    >
      <div className="mb-4 text-center font-mono text-lg text-gray-600 dark:text-gray-400">
        {a || 'a'}x² + {b || 'b'}x + {c || 'c'} = 0
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <NumberInput label="Coefficient a" value={a} onChange={setA} placeholder="1" hint="Cannot be 0" />
        <NumberInput label="Coefficient b" value={b} onChange={setB} placeholder="-3" />
        <NumberInput label="Coefficient c" value={c} onChange={setC} placeholder="2" />
      </div>

      {result ? (
        <ResultGrid>
          <ResultCard label="Roots" value={result.roots} highlight subtext={result.type} />
          <ResultCard label="Discriminant" value={result.discriminant.toFixed(4)} subtext={result.discriminant > 0 ? 'Positive' : result.discriminant === 0 ? 'Zero' : 'Negative'} />
          <ResultCard label="Vertex" value={result.vertex} subtext="Minimum/maximum point" />
        </ResultGrid>
      ) : (
        <EmptyState message="Enter coefficients a, b, and c. Coefficient a must not be zero." />
      )}
    </CalculatorShell>
  );
}
