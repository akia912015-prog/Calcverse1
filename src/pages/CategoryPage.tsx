import { ArrowRight } from 'lucide-react';
import { getCategoryBySlug, getCalculatorsByCategory, calculatorPath } from '../lib/registry';
import { navigate } from '../hooks/useRouter';
import { useSEO } from '../hooks/useSEO';

export default function CategoryPage({ slug }: { slug: string }) {
  const category = getCategoryBySlug(slug);

  useSEO(`/category/${slug}`, category ? {
    title: `${category.name} Calculators — Free Online Tools | CalcVerse`,
    description: category.description,
  } : undefined);

  if (!category) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="font-display text-2xl font-bold text-gray-900 dark:text-white">
          Category not found
        </h1>
        <button onClick={() => navigate('/')} className="btn-primary mt-6">
          Back home
        </button>
      </div>
    );
  }

  const calculators = getCalculatorsByCategory(category.id);

  return (
    <div>
      {/* Hero */}
      <section className={`relative overflow-hidden bg-gradient-to-br ${category.gradient}`}>
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/')}
            className="mb-4 text-sm font-medium text-white/80 transition-colors hover:text-white"
          >
            ← Home
          </button>
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/20 text-white backdrop-blur-sm">
              <category.icon className="h-8 w-8" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-extrabold text-white sm:text-4xl">
                {category.name} Calculators
              </h1>
              <p className="mt-1 max-w-2xl text-white/90">{category.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator grid */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {calculators.length === 0 ? (
          <div className="card p-12 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              Calculators coming soon to this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {calculators.map((calc) => (
              <button
                key={calc.slug}
                onClick={() => navigate(calculatorPath(category.slug, calc.slug))}
                className="card group flex flex-col p-6 text-left transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${category.gradient} text-white shadow-md`}
                  >
                    <category.icon className="h-6 w-6" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-300 transition-all group-hover:text-brand-500 group-hover:translate-x-1" />
                </div>
                <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white">
                  {calc.name}
                </h3>
                <p className="mt-1 flex-1 text-sm text-gray-500 dark:text-gray-400">
                  {calc.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {calc.keywords.slice(0, 3).map((kw) => (
                    <span
                      key={kw}
                      className="chip bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
