import { useState } from 'react';
import CalculatorShell from '../../components/CalculatorShell';
import { NumberInput, ResultCard, ResultGrid, EmptyState, parseNum, formatCurrency } from '../../components/CalculatorFields';

export default function TipCalculator() {
  const [bill, setBill] = useState('50');
  const [tipPct, setTipPct] = useState('18');
  const [people, setPeople] = useState('1');

  const b = parseNum(bill);
  const t = parseNum(tipPct);
  const p = parseNum(people);

  let tipAmount: number | null = null;
  let total: number | null = null;
  let perPerson: number | null = null;

  if (b !== null && t !== null && p !== null && p > 0) {
    tipAmount = b * (t / 100);
    total = b + tipAmount;
    perPerson = total / p;
  }

  const presets = [10, 15, 18, 20, 25];

  return (
    <CalculatorShell
      name="Tip Calculator"
      description="Quickly calculate tip and split the bill. Enter the bill amount, choose a tip percentage, and set the number of people to see what each person owes."
      category="finance"
      keywords={['tip', 'gratuity', 'bill split', 'restaurant', 'dining']}
      onReset={() => { setBill('50'); setTipPct('18'); setPeople('1'); }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <NumberInput label="Bill amount" value={bill} onChange={setBill} prefix="$" placeholder="50" />
        <NumberInput label="Number of people" value={people} onChange={setPeople} placeholder="1" min={1} />
      </div>

      <div className="mt-5">
        <label className="label">Tip percentage</label>
        <div className="flex flex-wrap gap-2">
          {presets.map((p) => (
            <button
              key={p}
              onClick={() => setTipPct(String(p))}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
                tipPct === String(p)
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {p}%
            </button>
          ))}
          <input
            type="number"
            value={tipPct}
            onChange={(e) => setTipPct(e.target.value)}
            className="input w-20"
            placeholder="18"
          />
        </div>
      </div>

      {perPerson !== null ? (
        <ResultGrid>
          <ResultCard label="Tip amount" value={formatCurrency(tipAmount!)} />
          <ResultCard label="Total bill" value={formatCurrency(total!)} />
          <ResultCard label="Per person" value={formatCurrency(perPerson)} highlight subtext={`Split ${people} way${people !== '1' ? 's' : ''}`} />
        </ResultGrid>
      ) : (
        <EmptyState message="Enter the bill amount and tip percentage to calculate your tip." />
      )}
    </CalculatorShell>
  );
}
