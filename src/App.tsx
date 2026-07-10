import { useMemo } from 'react';
import Layout from './components/Layout';
import { useRouter } from './hooks/useRouter';
import { getCategoryBySlug } from './lib/registry';
import './lib/registry-index'; // side-effect: registers all calculators
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import CalculatorPage from './pages/CalculatorPage';
import SearchPage from './pages/SearchPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const { path } = useRouter();

  const page = useMemo(() => {
    // Home
    if (path === '/' || path === '') return <HomePage />;

    // Search: /search?q=...
    if (path === '/search' || path.startsWith('/search?')) {
      const query = path.includes('?q=') ? decodeURIComponent(path.split('?q=')[1]) : '';
      return <SearchPage query={query} />;
    }

    // Category: /category/:slug
    if (path.startsWith('/category/')) {
      const slug = path.replace('/category/', '');
      if (getCategoryBySlug(slug)) return <CategoryPage slug={slug} />;
      return <NotFoundPage />;
    }

    // Calculator: /calculator/:categorySlug/:calcSlug
    if (path.startsWith('/calculator/')) {
      const parts = path.replace('/calculator/', '').split('/');
      if (parts.length === 2) {
        return <CalculatorPage categorySlug={parts[0]} calcSlug={parts[1]} />;
      }
      return <NotFoundPage />;
    }

    return <NotFoundPage />;
  }, [path]);

  return <Layout>{page}</Layout>;
}

export default App;
