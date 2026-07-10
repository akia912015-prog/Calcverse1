import { navigate } from '../hooks/useRouter';
import { CATEGORIES, categoryPath } from '../lib/registry';

export default function NotFoundPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <div className="font-display text-7xl font-extrabold text-brand-600 dark:text-brand-400">
        404
      </div>
      <h1 className="mt-4 font-display text-2xl font-bold text-gray-900 dark:text-white">
        Page not found
      </h1>
      <p className="mt-2 text-gray-500 dark:text-gray-400">
        The page you're looking for doesn't exist or has moved.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button onClick={() => navigate('/')} className="btn-primary">
          Back home
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => navigate(categoryPath(cat.slug))}
            className="btn-ghost"
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}
