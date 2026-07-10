import { useState } from 'react';
import { Moon, Sun, Menu, X, Calculator } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { navigate } from '../hooks/useRouter';
import { CATEGORIES, categoryPath } from '../lib/registry';
import SearchBar from './SearchBar';

export default function Header() {
  const { theme, toggle } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const go = (path: string) => {
    navigate(path);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200/80 bg-white/80 backdrop-blur-lg dark:border-gray-800/80 dark:bg-gray-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <button
          onClick={() => go('/')}
          className="flex shrink-0 items-center gap-2"
          aria-label="CalcVerse home"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white shadow-sm shadow-brand-600/30">
            <Calculator className="h-5 w-5" />
          </div>
          <span className="font-display text-lg font-bold tracking-tight text-gray-900 dark:text-white">
            Calc<span className="text-brand-600 dark:text-brand-400">Verse</span>
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => go(categoryPath(cat.slug))}
              className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
            >
              {cat.name}
            </button>
          ))}
        </nav>

        {/* Search (desktop) */}
        <div className="ml-auto hidden max-w-xs flex-1 md:block">
          <SearchBar />
        </div>

        <div className="ml-auto flex items-center gap-1 md:ml-2">
          <button
            onClick={toggle}
            className="rounded-lg p-2.5 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="rounded-lg p-2.5 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-gray-200 bg-white px-4 py-4 dark:border-gray-800 dark:bg-gray-950 md:hidden animate-fade-in">
          <div className="mb-4">
            <SearchBar onNavigate={() => setMobileOpen(false)} />
          </div>
          <nav className="flex flex-col gap-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => go(categoryPath(cat.slug))}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                <cat.icon className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                {cat.name}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
