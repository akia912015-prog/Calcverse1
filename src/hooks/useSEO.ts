import { useEffect } from 'react';

type Route = {
  path: string;
  title: string;
  description: string;
};

const ROUTES: Record<string, Omit<Route, 'path'>> = {
  '/': {
    title: 'CalcVerse — Free Online Calculators for Finance, Health, Daily Life & Math',
    description:
      'Free online calculators for finance, health, daily life, and math. Fast, accurate, and beautifully designed.',
  },
  '/category/finance': {
    title: 'Finance Calculators — Mortgage, Loan, Interest & More | CalcVerse',
    description:
      'Free finance calculators: mortgage payments, loans, compound interest, savings goals, tips, and tax.',
  },
  '/category/health': {
    title: 'Health Calculators — BMI, BMR, Body Fat & More | CalcVerse',
    description:
      'Free health calculators: BMI, BMR (calories), body fat percentage, daily water intake, and ideal weight.',
  },
  '/category/daily-life': {
    title: 'Daily Life Calculators — Age, Date, Percentage & More | CalcVerse',
    description:
      'Free daily life calculators: age, date difference, unit converter, percentage, and fuel cost.',
  },
  '/category/math': {
    title: 'Math Calculators — Scientific, Quadratic, GCD & More | CalcVerse',
    description:
      'Free math calculators: basic, scientific, quadratic equation solver, GCD/LCM, and triangle solver.',
  },
  '/search': {
    title: 'Search Calculators | CalcVerse',
    description: 'Search across all CalcVerse calculators.',
  },
};

const SITE_NAME = 'CalcVerse';

function buildTitle(title: string) {
  return title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
}

export function useSEO(path: string, overrides?: Partial<Route>) {
  useEffect(() => {
    const base = ROUTES[path] ?? {
      title: 'Calculator | CalcVerse',
      description: 'Free online calculator on CalcVerse.',
    };
    const meta = { ...base, ...overrides };
    document.title = buildTitle(meta.title);

    let descTag = document.querySelector('meta[name="description"]');
    if (!descTag) {
      descTag = document.createElement('meta');
      descTag.setAttribute('name', 'description');
      document.head.appendChild(descTag);
    }
    descTag.setAttribute('content', meta.description);

    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', buildTitle(meta.title));
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', meta.description);
  }, [path, overrides?.title, overrides?.description]);
}

export function setSEOForCalculator(name: string, description: string, category: string) {
  const title = `${name} — Free ${category} Calculator | CalcVerse`;
  document.title = title;
  const descTag =
    document.querySelector('meta[name="description"]') ||
    (() => {
      const m = document.createElement('meta');
      m.setAttribute('name', 'description');
      document.head.appendChild(m);
      return m;
    })();
  descTag.setAttribute('content', description);
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', title);
  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', description);
}
