import { Suspense, useEffect } from 'react';
import { getCalculator, getCategoryBySlug } from '../lib/registry';
import { navigate } from '../hooks/useRouter';
import { setSEOForCalculator } from '../hooks/useSEO';

export default function CalculatorPage({
  categorySlug,
  calcSlug,
}: {
  categorySlug: string;
  calcSlug: string;
}) {
  const category = getCategoryBySlug(categorySlug);
  const calc = getCalculator(categorySlug, calcSlug);

  useEffect(() => {
    if (calc && category) {
      setSEOForCalculator(calc.name, calc.description, category.name);
    }
  }, [calc, category]);

  if (!category || !calc) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="font-display text-2xl font-bold text-gray-900 dark:text-white">
          Calculator not found
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          The calculator you're looking for doesn't exist.
        </p>
        <button onClick={() => navigate('/')} className="btn-primary mt-6">
          Back home
        </button>
      </div>
    );
  }

  const CalcComponent = calc.component;

  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="card animate-pulse p-8">
            <div className="h-8 w-48 rounded-lg bg-gray-200 dark:bg-gray-800" />
            <div className="mt-4 h-4 w-72 rounded bg-gray-200 dark:bg-gray-800" />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="h-12 rounded-xl bg-gray-200 dark:bg-gray-800" />
              <div className="h-12 rounded-xl bg-gray-200 dark:bg-gray-800" />
            </div>
          </div>
        </div>
      }
    >
      <CalcComponent />
    </Suspense>
  );
}
