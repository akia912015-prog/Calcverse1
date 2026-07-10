import { useState } from 'react';
import { Delete } from 'lucide-react';
import CalculatorShell from '../../components/CalculatorShell';

export default function BasicCalculator() {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');

  const append = (val: string) => {
    if (display === '0' && !/[.+\-*/%]/.test(val)) {
      setDisplay(val);
    } else {
      setDisplay(display + val);
    }
  };

  const setOp = (op: string) => {
    setExpression(display + ' ' + op + ' ');
    setDisplay('0');
  };

  const clear = () => {
    setDisplay('0');
    setExpression('');
  };

  const backspace = () => {
    setDisplay(display.length > 1 ? display.slice(0, -1) : '0');
  };

  const calculate = () => {
    try {
      const expr = expression + display;
      // Sanitize: only allow numbers, operators, and parentheses
      if (!/^[0-9+\-*/%.() ]+$/.test(expr)) return;
      // eslint-disable-next-line no-eval
      const result = eval(expr);
      setDisplay(String(result));
      setExpression('');
    } catch {
      setDisplay('Error');
      setExpression('');
    }
  };

  const buttons = [
    { label: 'C', action: clear, type: 'clear' },
    { label: '⌫', action: backspace, type: 'back' },
    { label: '%', action: () => setOp('%'), type: 'op' },
    { label: '÷', action: () => setOp('/'), type: 'op' },
    { label: '7', action: () => append('7'), type: 'num' },
    { label: '8', action: () => append('8'), type: 'num' },
    { label: '9', action: () => append('9'), type: 'num' },
    { label: '×', action: () => setOp('*'), type: 'op' },
    { label: '4', action: () => append('4'), type: 'num' },
    { label: '5', action: () => append('5'), type: 'num' },
    { label: '6', action: () => append('6'), type: 'num' },
    { label: '−', action: () => setOp('-'), type: 'op' },
    { label: '1', action: () => append('1'), type: 'num' },
    { label: '2', action: () => append('2'), type: 'num' },
    { label: '3', action: () => append('3'), type: 'num' },
    { label: '+', action: () => setOp('+'), type: 'op' },
    { label: '0', action: () => append('0'), type: 'num' },
    { label: '.', action: () => append('.'), type: 'num' },
    { label: '=', action: calculate, type: 'equals' },
  ];

  return (
    <CalculatorShell
      name="Basic Calculator"
      description="A simple, clean calculator for everyday arithmetic. Add, subtract, multiply, divide, and calculate percentages with a responsive button interface."
      category="math"
      keywords={['calculator', 'basic', 'arithmetic', 'add', 'subtract', 'multiply', 'divide']}
      onReset={clear}
    >
      {/* Display */}
      <div className="mb-4 rounded-2xl bg-gray-900 p-5 dark:bg-black/40">
        <div className="h-5 text-right text-sm text-gray-400">{expression || '\u00A0'}</div>
        <div className="mt-1 text-right font-mono text-4xl font-medium text-white">
          {display}
        </div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-4 gap-2">
        {buttons.map((btn) => {
          const styles: Record<string, string> = {
            num: 'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700',
            op: 'bg-brand-50 text-brand-700 hover:bg-brand-100 dark:bg-brand-950/40 dark:text-brand-300 dark:hover:bg-brand-900/40',
            clear: 'bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-950/40 dark:text-rose-400 dark:hover:bg-rose-900/40',
            back: 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700',
            equals: 'bg-brand-600 text-white hover:bg-brand-700 shadow-sm col-span-1',
          };
          return (
            <button
              key={btn.label}
              onClick={btn.action}
              className={`flex h-14 items-center justify-center rounded-xl text-xl font-semibold transition-all active:scale-95 ${styles[btn.type]}`}
            >
              {btn.label === '⌫' ? <Delete className="h-5 w-5" /> : btn.label}
            </button>
          );
        })}
      </div>
    </CalculatorShell>
  );
}
