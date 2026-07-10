import { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { searchCalculators, CATEGORY_MAP, calculatorPath } from '../lib/registry';
import { navigate } from '../hooks/useRouter';
import { useSEO } from '../hooks/useSEO';
import SearchBar from '../components/SearchBar';

export default function SearchPage({ query }: { query: string }) {
  useSEO('/search');
  const [searchQuery] = useState(query);
  const results = searchCalculators(searchQuery);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-6 font-display text-2xl font-bold text-gray-900 dark:text-white">
        Search Calculators
      </h1>
      <SearchBar initialValue={query} autoFocus variant="page" />

      <div className="mt-8">
        {searchQuery && (
          <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
            {results.length} result{results.length !== 1 ? 's' : ''} for "{searchQuery}"
          </p>
        )}
        {searchQuery && results.length === 0 ? (
          <div className="card p-12 text-center">
            <SearchIcon className="mx-auto h-10 w-10 text-gray-300 dark:text-gray-600" />
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              No calculators found. Try a different search term.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {results.map((r) => {
              const cat = CATEGORY_MAP[r.category];
              return (
                <button
                  key={r.slug}
                  onClick={() => navigate(calculatorPath(cat.slug, r.slug))}
                  className="card group flex w-full items-center gap-4 p-5 text-left transition-all hover:shadow-md hover:-translate-y-0.5"
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
                    <h3 className="font-semibold text-gray-900 dark:text-white">{r.name}</h3>
                    <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                      {r.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
