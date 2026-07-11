import { Calculator } from 'lucide-react';
import { CATEGORIES, categoryPath } from '../lib/registry';
import { navigate } from '../hooks/useRouter';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <button onClick={() => navigate('/')} className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white">
                <Calculator className="h-5 w-5" />
              </div>
              <span className="font-display text-lg font-bold text-gray-900 dark:text-white">
                Calc<span className="text-brand-600 dark:text-brand-400">Verse</span>
              </span>
            </button>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              Free, fast, and accurate calculators for everyday life.
            </p>
          </div>

          {CATEGORIES.map((cat) => (
            <div key={cat.id}>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                {cat.name}
              </h3>
              <ul className="mt-3 space-y-2">
                <li>
                  <button
                    onClick={() => navigate(categoryPath(cat.slug))}
                    className="text-sm text-gray-500 transition-colors hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-400"
                  >
                    All {cat.name} calculators
                  </button>
                </li>
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-gray-200 pt-6 dark:border-gray-800">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Calctra. Built for the web. Results are for
            informational purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
}
