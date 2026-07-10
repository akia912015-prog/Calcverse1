import { ArrowRight, Sparkles, Zap, ShieldCheck, Heart } from 'lucide-react';
import { CATEGORIES, categoryPath, CALCULATORS, calculatorPath, CATEGORY_MAP } from '../lib/registry';
import { navigate } from '../hooks/useRouter';
import { useSEO } from '../hooks/useSEO';
import SearchBar from '../components/SearchBar';

export default function HomePage() {
  useSEO('/');

  const featured = CALCULATORS.slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-brand-200/30 blur-3xl dark:bg-brand-900/20" />
          <div className="absolute right-0 top-20 h-[300px] w-[300px] rounded-full bg-accent-200/20 blur-3xl dark:bg-accent-900/10" />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-700 dark:border-brand-800 dark:bg-brand-950/40 dark:text-brand-300">
              <Sparkles className="h-4 w-4" />
              20+ free calculators, no signup required
            </div>
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
              Calculate anything,
              <br />
              <span className="bg-gradient-to-r from-brand-600 to-accent-500 bg-clip-text text-transparent">
                beautifully
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
              Finance, health, daily life, and math — all in one place. Fast, accurate, and
              designed to be a joy to use.
            </p>

            <div className="mx-auto mt-8 max-w-xl">
              <SearchBar variant="page" />
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                Instant results
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                Private — runs in your browser
              </span>
              <span className="flex items-center gap-1.5">
                <Heart className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                Free forever
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white">
            Browse by category
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((cat) => {
            const count = CALCULATORS.filter((c) => c.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => navigate(categoryPath(cat.slug))}
                className="card group relative overflow-hidden p-6 text-left transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <div
                  className={`absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br ${cat.gradient} opacity-10 transition-transform group-hover:scale-150`}
                />
                <div
                  className={`relative mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${cat.gradient} text-white shadow-lg`}
                >
                  <cat.icon className="h-6 w-6" />
                </div>
                <h3 className="relative font-display text-lg font-bold text-gray-900 dark:text-white">
                  {cat.name}
                </h3>
                <p className="relative mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {cat.description}
                </p>
                <div className="relative mt-4 flex items-center gap-1.5 text-sm font-medium text-brand-600 dark:text-brand-400">
                  {count} calculators
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Featured calculators */}
      {featured.length > 0 && (
        <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white">
              Popular calculators
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((calc) => {
              const cat = CATEGORY_MAP[calc.category];
              return (
                <button
                  key={calc.slug}
                  onClick={() => navigate(calculatorPath(cat.slug, calc.slug))}
                  className="card group flex items-start gap-4 p-5 text-left transition-all hover:shadow-lg hover:-translate-y-0.5"
                >
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${cat.gradient} text-white shadow`}
                  >
                    <cat.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-brand-600 dark:text-brand-400">
                        {cat.name}
                      </span>
                    </div>
                    <h3 className="mt-0.5 font-semibold text-gray-900 dark:text-white">
                      {calc.name}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
                      {calc.description}
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 shrink-0 text-gray-300 transition-all group-hover:text-brand-500 group-hover:translate-x-1" />
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* Stats / trust */}
      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="card grid grid-cols-2 gap-6 p-8 sm:grid-cols-4">
          {[
            { label: 'Calculators', value: `${CALCULATORS.length}+` },
            { label: 'Categories', value: `${CATEGORIES.length}` },
            { label: 'Cost', value: 'Free' },
            { label: 'Signup', value: 'None' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-3xl font-extrabold text-brand-600 dark:text-brand-400">
                {s.value}
              </div>
              <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
