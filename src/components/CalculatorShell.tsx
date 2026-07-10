import { useState, useEffect, ReactNode } from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { navigate } from '../hooks/useRouter';
import {
  CATEGORY_MAP,
  categoryPath,
  calculatorPath,
  getCalculatorsByCategory,
  type CategoryId,
  type CalculatorMeta,
} from '../lib/registry';

type Props = {
  name: string;
  description: string;
  category: CategoryId;
  keywords: string[];
  children: ReactNode;
  onReset?: () => void;
};

export default function CalculatorShell({
  name,
  description,
  category,
  keywords,
  children,
  onReset,
}: Props) {
  const cat = CATEGORY_MAP[category];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <button
          onClick={() => navigate('/')}
          className="hover:text-brand-600 dark:hover:text-brand-400"
        >
          Home
        </button>
        <span>/</span>
        <button
          onClick={() => navigate(categoryPath(cat.slug))}
          className="hover:text-brand-600 dark:hover:text-brand-400"
        >
          {cat.name}
        </button>
        <span>/</span>
        <span className="truncate text-gray-700 dark:text-gray-300">{name}</span>
      </nav>

      {/* Back button (mobile) */}
      <button
        onClick={() => navigate(categoryPath(cat.slug))}
        className="mb-4 flex items-center gap-1.5 text-sm font-medium text-gray-600 transition-colors hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-400 lg:hidden"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to {cat.name}
      </button>

      {/* Header */}
      <div className="mb-8">
        <div className="mb-3 flex items-center gap-3">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${cat.gradient} text-white shadow-lg`}
          >
            <cat.icon className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
              {name}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">{cat.name} Calculator</p>
          </div>
        </div>
        <p className="max-w-2xl text-gray-600 dark:text-gray-400">{description}</p>
      </div>

      {/* Calculator body */}
      <div className="card p-6 sm:p-8 animate-fade-in">
        {children}

        {onReset && (
          <div className="mt-6 border-t border-gray-200 pt-4 dark:border-gray-800">
            <button onClick={onReset} className="btn-ghost text-sm">
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>
          </div>
        )}
      </div>

      {/* SEO keywords */}
      <div className="mt-8 flex flex-wrap gap-2">
        {keywords.map((kw) => (
          <span
            key={kw}
            className="chip bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
          >
            {kw}
          </span>
        ))}
      </div>

      {/* Related calculators */}
      <RelatedCalculators category={category} currentName={name} />
    </div>
  );
}

function RelatedCalculators({
  category,
  currentName,
}: {
  category: CategoryId;
  currentName: string;
}) {
  const [related, setRelated] = useState<CalculatorMeta[]>([]);

  useEffect(() => {
    const all = getCalculatorsByCategory(category).filter((c) => c.name !== currentName);
    setRelated(all.slice(0, 4));
  }, [category, currentName]);

  if (related.length === 0) return null;

  const cat = CATEGORY_MAP[category];

  return (
    <div className="mt-10">
      <h2 className="mb-4 font-display text-lg font-bold text-gray-900 dark:text-white">
        Other {cat.name} Calculators
      </h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {related.map((r) => (
          <button
            key={r.slug}
            onClick={() => navigate(calculatorPath(cat.slug, r.slug))}
            className="card flex items-center gap-3 p-4 text-left transition-all hover:shadow-md hover:-translate-y-0.5"
          >
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${cat.gradient} text-white`}
            >
              <cat.icon className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                {r.name}
              </div>
              <div className="truncate text-xs text-gray-500 dark:text-gray-400">
                {r.description}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
