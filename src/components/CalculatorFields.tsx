import { ReactNode } from 'react';

type NumberInputProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  suffix?: string;
  prefix?: string;
  min?: number;
  max?: number;
  step?: string;
  hint?: string;
};

export function NumberInput({
  label,
  value,
  onChange,
  placeholder,
  suffix,
  prefix,
  min,
  max,
  step,
  hint,
}: NumberInputProps) {
  return (
    <div>
      <label className="label">{label}</label>
      <div className="relative">
        {prefix && (
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
            {prefix}
          </span>
        )}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          className={`input ${prefix ? 'pl-8' : ''} ${suffix ? 'pr-12' : ''}`}
        />
        {suffix && (
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
            {suffix}
          </span>
        )}
      </div>
      {hint && <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">{hint}</p>}
    </div>
  );
}

type SelectInputProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  hint?: string;
};

export function SelectInput({ label, value, onChange, options, hint }: SelectInputProps) {
  return (
    <div>
      <label className="label">{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="input">
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {hint && <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">{hint}</p>}
    </div>
  );
}

type ResultCardProps = {
  label: string;
  value: string;
  subtext?: string;
  highlight?: boolean;
  icon?: ReactNode;
};

export function ResultCard({ label, value, subtext, highlight, icon }: ResultCardProps) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        highlight
          ? 'border-brand-200 bg-brand-50 dark:border-brand-800 dark:bg-brand-950/40'
          : 'border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900'
      }`}
    >
      <div className="flex items-center gap-2">
        {icon && <span className="text-brand-600 dark:text-brand-400">{icon}</span>}
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</span>
      </div>
      <div
        className={`mt-1 font-display font-bold ${
          highlight
            ? 'text-2xl text-brand-700 dark:text-brand-300'
            : 'text-xl text-gray-900 dark:text-white'
        }`}
      >
        {value}
      </div>
      {subtext && <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{subtext}</p>}
    </div>
  );
}

export function ResultGrid({ children }: { children: ReactNode }) {
  return <div className="mt-6 grid gap-3 sm:grid-cols-2">{children}</div>;
}

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="mt-6 rounded-xl border border-dashed border-gray-300 p-8 text-center dark:border-gray-700">
      <p className="text-sm text-gray-400 dark:text-gray-500">{message}</p>
    </div>
  );
}

export function parseNum(v: string): number | null {
  if (v === '' || v === '-') return null;
  const n = Number(v);
  return isNaN(n) ? null : n;
}

export function formatCurrency(n: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(n);
}

export function formatNumber(n: number, decimals = 2): string {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: decimals,
  }).format(n);
}
