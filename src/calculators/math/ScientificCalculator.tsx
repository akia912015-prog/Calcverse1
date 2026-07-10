import { useState } from 'react';
import { Delete } from 'lucide-react';
import CalculatorShell from '../../components/CalculatorShell';

export default function ScientificCalculator() {
  const [display, setDisplay] = useState('0');

  const append = (val: string) => {
    setDisplay(display === '0' && !/[.+\-*/^()%]/.test(val) ? val : display + val);
  };

  const clear = () => setDisplay('0');
  const backspace = () => setDisplay(display.length > 1 ? display.slice(0, -1) : '0');

  const calculate = () => {
    try {
      let expr = display
        .replace(/π/g, 'Math.PI')
        .replace(/e/g, 'Math.E')
        .replace(/sin\(/g, 'Math.sin(')
        .replace(/cos\(/g, 'Math.cos(')
        .replace(/tan\(/g, 'Math.tan(')
        .replace(/log\(/g, 'Math.log10(')
        .replace(/ln\(/g, 'Math.log(')
        .replace(/√\(/g, 'Math.sqrt(')
        .replace(/\^/g, '**')
        .replace(/(\d+)!/g, (_, n) => factorial(parseInt(n)).toString());

      if (!/^[0-9MathPI.Esincoatlgqr+*/().\- ]+$/.test(expr)) return;
      // eslint-disable-next-line no-eval
      const result = eval(expr);
      setDisplay(String(result));
    } catch {
      setDisplay('Error');
    }
  };

  function factorial(n: number): number {
    if (n < 0 || n > 170) return NaN;
    let r = 1;
    for (let i = 2; i <= n; i++) r *= i;
    return r;
  }

  const buttons = [
    { label: 'sin(', action: () => append('sin(') },
    { label: 'cos(', action: () => append('cos(') },
    { label: 'tan(', action: () => append('tan(') },
    { label: 'π', action: () => append('π') },
    { label: 'log(', action: () => append('log(') },
    { label: 'ln(', action: () => append('ln(') },
    { label: '√(', action: () => append('√(') },
    { label: 'e', action: () => append('e') },
    { label: 'x²', action: () => append('^2') },
    { label: 'x^y', action: () => append('^') },
    { label: 'n!', action: () => append('!') },
    { label: '(', action: () => append('(') },
    { label: '7', action: () => append('7') },
    { label: '8', action: () => append('8') },
    { label: '9', action: () => append('9') },
    { label: '÷', action: () => append('/') },
    { label: '4', action: () => append('4') },
    { label: '5', action: () => append('5') },
    { label: '6', action: () => append('6') },
    { label: '×', action: () => append('*') },
    { label: '1', action: () => append('1') },
    { label: '2', action: () => append('2') },
    { label: '3', action: () => append('3') },
    { label: '−', action: () => append('-') },
    { label: '0', action: () => append('0') },
    { label: '.', action: () => append('.') },
    { label: ')', action: () => append(')') },
    { label: '+', action: () => append('+') },
  ];

  return (
    <CalculatorShell
      name="Scientific Calculator"
      description="A full-featured scientific calculator with trigonometric functions, logarithms, exponents, factorials, and constants. Perfect for advanced math and engineering."
      category="math"
      keywords={['scientific calculator', 'trigonometry', 'logarithm', 'exponent', 'factorial', 'sin', 'cos', 'tan']}
      onReset={clear}
    >
      <div className="mb-4 rounded-2xl bg-gray-900 p-5 dark:bg-black/40">
        <div className="text-right font-mono text-3xl font-medium text-white break-all">
          {display}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        <button onClick={clear} className="col-span-1 flex h-14 items-center justify-center rounded-xl bg-rose-50 text-rose-600 text-xl font-semibold transition-all active:scale-95 hover:bg-rose-100 dark:bg-rose-950/40 dark:text-rose-400 dark:hover:bg-rose-900/40">
          C
        </button>
        <button onClick={backspace} className="col-span-1 flex h-14 items-center justify-center rounded-xl bg-gray-100 text-gray-700 text-xl font-semibold transition-all active:scale-95 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
          <Delete className="h-5 w-5" />
        </button>
        <button onClick={() => setDisplay(String(-parseFloat(display)))} className="col-span-1 flex h-14 items-center justify-center rounded-xl bg-gray-100 text-gray-700 text-xl font-semibold transition-all active:scale-95 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
          ±
        </button>
        <button onClick={calculate} className="col-span-1 flex h-14 items-center justify-center rounded-xl bg-brand-600 text-white text-xl font-semibold transition-all active:scale-95 hover:bg-brand-700">
          =
        </button>
      </div>

      <div className="mt-2 grid grid-cols-4 gap-2">
        {buttons.map((btn) => (
          <button
            key={btn.label}
            onClick={btn.action}
            className={`flex h-12 items-center justify-center rounded-xl text-base font-semibold transition-all active:scale-95 ${
              /^[0-9.]$/.test(btn.label)
                ? 'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700'
                : 'bg-brand-50 text-brand-700 hover:bg-brand-100 dark:bg-brand-950/40 dark:text-brand-300 dark:hover:bg-brand-900/40'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </CalculatorShell>
  );
}
