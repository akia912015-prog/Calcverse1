import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { searchCalculators, calculatorPath, getCategoryBySlug } from '../lib/registry';
import { navigate } from '../hooks/useRouter';

type Props = {
  initialValue?: string;
  autoFocus?: boolean;
  onNavigate?: () => void;
  variant?: 'header' | 'page';
};

export default function SearchBar({
  initialValue = '',
  autoFocus = false,
  onNavigate,
  variant = 'header',
}: Props) {
  const [query, setQuery] = useState(initialValue);
  const [results, setResults] = useState<ReturnType<typeof searchCalculators>>([]);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setResults(searchCalculators(query));
    setActiveIndex(-1);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const goToResult = (slug: string, categorySlug: string) => {
    navigate(calculatorPath(categorySlug, slug));
    setOpen(false);
    onNavigate?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open || results.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      const r = results[activeIndex];
      goToResult(r.slug, getCategoryBySlug(r.category)?.slug ?? '');
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const isPage = variant === 'page';

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <Search
          className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 ${
            isPage ? 'h-5 w-5 text-gray-400' : 'h-4 w-4 text-gray-400'
          }`}
        />
        <input
          type="text"
          value={query}
          autoFocus={autoFocus}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search calculators..."
          className={`input pl-11 ${query ? 'pr-10' : ''} ${
            isPage ? 'h-14 text-base' : ''
          }`}
          aria-label="Search calculators"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setResults([]);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {open && query && (
        <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl dark:border-gray-800 dark:bg-gray-900 animate-scale-in">
          {results.length === 0 ? (
            <div className="px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
              No calculators found for "{query}"
            </div>
          ) : (
            <ul className="max-h-80 overflow-y-auto py-1">
              {results.map((r, i) => {
                const cat = getCategoryBySlug(r.category);
                if (!cat) return null;
                return (
                  <li key={r.slug}>
                    <button
                      onClick={() => goToResult(r.slug, cat.slug)}
                      onMouseEnter={() => setActiveIndex(i)}
                      className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                        activeIndex === i
                          ? 'bg-brand-50 dark:bg-brand-950/40'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      <cat.icon className="h-4 w-4 shrink-0 text-brand-600 dark:text-brand-400" />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
                          {r.name}
                        </div>
                        <div className="truncate text-xs text-gray-500 dark:text-gray-400">
                          {cat.name}
                        </div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
