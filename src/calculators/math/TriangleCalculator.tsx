import { useState } from 'react';
import { Triangle } from 'lucide-react';
import CalculatorShell from '../../components/CalculatorShell';
import { NumberInput, SelectInput, ResultCard, ResultGrid, EmptyState, parseNum, formatNumber } from '../../components/CalculatorFields';

type SolveMode = 'sas' | 'sss' | 'asa';

export default function TriangleCalculator() {
  const [mode, setMode] = useState<SolveMode>('sas');
  const [a, setA] = useState('5');
  const [b, setB] = useState('7');
  const [c, setC] = useState('45');

  const numA = parseNum(a);
  const numB = parseNum(b);
  const numC = parseNum(c);

  let result: { area: number; perimeter: number; missing: string } | null = null;

  if (numA !== null && numB !== null && numC !== null) {
    if (mode === 'sas') {
      // Two sides and included angle (C is angle in degrees between sides A and B)
      const angleRad = (numC * Math.PI) / 180;
      const sideC = Math.sqrt(numA * numA + numB * numB - 2 * numA * numB * Math.cos(angleRad));
      const area = 0.5 * numA * numB * Math.sin(angleRad);
      result = {
        area,
        perimeter: numA + numB + sideC,
        missing: `Third side = ${formatNumber(sideC, 4)}`,
      };
    } else if (mode === 'sss') {
      // Three sides — Heron's formula
      const s = (numA + numB + numC) / 2;
      const area = Math.sqrt(s * (s - numA) * (s - numB) * (s - numC));
      if (!isNaN(area) && area > 0) {
        result = {
          area,
          perimeter: numA + numB + numC,
          missing: 'All sides known',
        };
      }
    } else if (mode === 'asa') {
      // A and B are angles (degrees), C is the side between them
      const angleA = (numA * Math.PI) / 180;
      const angleB = (numB * Math.PI) / 180;
      const angleCRad = Math.PI - angleA - angleB;
      if (angleCRad > 0) {
        const sideA = (numC * Math.sin(angleA)) / Math.sin(angleCRad);
        const sideB = (numC * Math.sin(angleB)) / Math.sin(angleCRad);
        const area = 0.5 * sideA * sideB * Math.sin(angleCRad);
        result = {
          area,
          perimeter: sideA + sideB + numC,
          missing: `Sides: ${formatNumber(sideA, 4)}, ${formatNumber(sideB, 4)}`,
        };
      }
    }
  }

  const labels: Record<SolveMode, [string, string, string]> = {
    sas: ['Side a', 'Side b', 'Angle C (°)'],
    sss: ['Side a', 'Side b', 'Side c'],
    asa: ['Angle A (°)', 'Angle B (°)', 'Side c (between)'],
  };

  return (
    <CalculatorShell
      name="Triangle Solver"
      description="Solve triangles by entering known sides and angles. Supports SAS (two sides + included angle), SSS (three sides), and ASA (two angles + included side). Calculates area and perimeter."
      category="math"
      keywords={['triangle', 'geometry', 'area', 'perimeter', 'heron', 'trigonometry', 'sas', 'sss', 'asa']}
      onReset={() => { setMode('sas'); setA('5'); setB('7'); setC('45'); }}
    >
      <div className="mb-5">
        <SelectInput
          label="Solve method"
          value={mode}
          onChange={(v) => setMode(v as SolveMode)}
          options={[
            { value: 'sas', label: 'SAS — Two sides + included angle' },
            { value: 'sss', label: 'SSS — Three sides' },
            { value: 'asa', label: 'ASA — Two angles + included side' },
          ]}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <NumberInput label={labels[mode][0]} value={a} onChange={setA} placeholder="5" />
        <NumberInput label={labels[mode][1]} value={b} onChange={setB} placeholder="7" />
        <NumberInput label={labels[mode][2]} value={c} onChange={setC} placeholder="45" />
      </div>

      {result ? (
        <ResultGrid>
          <ResultCard label="Area" value={`${formatNumber(result.area, 4)}`} highlight icon={<Triangle className="h-4 w-4" />} />
          <ResultCard label="Perimeter" value={formatNumber(result.perimeter, 4)} />
          <ResultCard label="Additional info" value={result.missing} />
        </ResultGrid>
      ) : (
        <EmptyState message="Enter the known values to solve the triangle. Make sure the values form a valid triangle." />
      )}
    </CalculatorShell>
  );
}
