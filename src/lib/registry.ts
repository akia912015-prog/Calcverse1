import {
  Calculator,
  Heart,
  Calendar,
  Sigma,
  type LucideIcon,
} from 'lucide-react';

export type CategoryId = 'finance' | 'health' | 'daily-life' | 'math';

export type Category = {
  id: CategoryId;
  name: string;
  slug: string;
  description: string;
  icon: LucideIcon;
  color: string;
  gradient: string;
};

export type CalculatorMeta = {
  slug: string;
  name: string;
  description: string;
  category: CategoryId;
  keywords: string[];
  component: React.LazyExoticComponent<React.ComponentType>;
};

export const CATEGORIES: Category[] = [
  {
    id: 'finance',
    name: 'Finance',
    slug: 'finance',
    description:
      'Plan your money with confidence — mortgages, loans, interest, savings, and more.',
    icon: Calculator,
    color: 'brand',
    gradient: 'from-brand-500 to-brand-700',
  },
  {
    id: 'health',
    name: 'Health',
    slug: 'health',
    description:
      'Understand your body — BMI, calorie needs, body fat, hydration, and ideal weight.',
    icon: Heart,
    color: 'rose',
    gradient: 'from-rose-500 to-rose-700',
  },
  {
    id: 'daily-life',
    name: 'Daily Life',
    slug: 'daily-life',
    description:
      'Everyday tools that save you time — age, dates, unit conversions, percentages.',
    icon: Calendar,
    color: 'accent',
    gradient: 'from-accent-400 to-accent-600',
  },
  {
    id: 'math',
    name: 'Math',
    slug: 'math',
    description:
      'Solve and explore — scientific calculator, quadratic equations, GCD/LCM, triangles.',
    icon: Sigma,
    color: 'blue',
    gradient: 'from-blue-500 to-blue-700',
  },
];

export const CATEGORY_MAP: Record<CategoryId, Category> = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c]),
) as Record<CategoryId, Category>;

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function categoryPath(slug: string) {
  return `/category/${slug}`;
}

export function calculatorPath(categorySlug: string, calcSlug: string) {
  return `/calculator/${categorySlug}/${calcSlug}`;
}

// Registry is populated by the registry index file to avoid circular imports.
export const CALCULATORS: CalculatorMeta[] = [];

export function registerCalculator(meta: CalculatorMeta) {
  CALCULATORS.push(meta);
}

export function getCalculator(
  categorySlug: string,
  calcSlug: string,
): CalculatorMeta | undefined {
  return CALCULATORS.find(
    (c) => c.category === (getCategoryBySlug(categorySlug)?.id ?? '') && c.slug === calcSlug,
  );
}

export function getCalculatorsByCategory(categoryId: CategoryId): CalculatorMeta[] {
  return CALCULATORS.filter((c) => c.category === categoryId);
}

export function searchCalculators(query: string): CalculatorMeta[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return CALCULATORS.filter((c) => {
    const haystack = [c.name, c.description, ...c.keywords, c.category].join(' ').toLowerCase();
    return haystack.includes(q);
  });
}
