import { useState } from 'react';
import { ArrowLeftRight } from 'lucide-react';
import CalculatorShell from '../../components/CalculatorShell';
import { SelectInput, EmptyState, formatNumber } from '../../components/CalculatorFields';

type Unit = { label: string; value: string; factor: number };

const LENGTH: Unit[] = [
  { label: 'Millimeters', value: 'mm', factor: 0.001 },
  { label: 'Centimeters', value: 'cm', factor: 0.01 },
  { label: 'Meters', value: 'm', factor: 1 },
  { label: 'Kilometers', value: 'km', factor: 1000 },
  { label: 'Inches', value: 'in', factor: 0.0254 },
  { label: 'Feet', value: 'ft', factor: 0.3048 },
  { label: 'Yards', value: 'yd', factor: 0.9144 },
  { label: 'Miles', value: 'mi', factor: 1609.344 },
];

const WEIGHT: Unit[] = [
  { label: 'Milligrams', value: 'mg', factor: 0.001 },
  { label: 'Grams', value: 'g', factor: 1 },
  { label: 'Kilograms', value: 'kg', factor: 1000 },
  { label: 'Ounces', value: 'oz', factor: 28.3495 },
  { label: 'Pounds', value: 'lb', factor: 453.592 },
  { label: 'Tons (metric)', value: 't', factor: 1000000 },
];

const TEMP_UNITS = ['Celsius', 'Fahrenheit', 'Kelvin'] as const;

const VOLUME: Unit[] = [
  { label: 'Milliliters', value: 'ml', factor: 0.001 },
  { label: 'Liters', value: 'l', factor: 1 },
  { label: 'Cups', value: 'cup', factor: 0.236588 },
  { label: 'Pints (US)', value: 'pt', factor: 0.473176 },
  { label: 'Gallons (US)', value: 'gal', factor: 3.78541 },
];

const CATEGORIES = {
  length: { label: 'Length', units: LENGTH },
  weight: { label: 'Weight', units: WEIGHT },
  volume: { label: 'Volume', units: VOLUME },
  temperature: { label: 'Temperature', units: [] },
} as const;

type CatKey = keyof typeof CATEGORIES;

export default function UnitConverterCalculator() {
  const [category, setCategory] = useState<CatKey>('length');
  const [value, setValue] = useState('1');
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('ft');

  // For temperature
  const [fromTemp, setFromTemp] = useState<'Celsius' | 'Fahrenheit' | 'Kelvin'>('Celsius');
  const [toTemp, setToTemp] = useState<'Celsius' | 'Fahrenheit' | 'Kelvin'>('Fahrenheit');

  let result: number | null = null;
  const v = parseFloat(value);

  if (!isNaN(v)) {
    if (category === 'temperature') {
      // Convert to Celsius first
      let celsius: number;
      if (fromTemp === 'Celsius') celsius = v;
      else if (fromTemp === 'Fahrenheit') celsius = (v - 32) * (5 / 9);
      else celsius = v - 273.15;

      if (toTemp === 'Celsius') result = celsius;
      else if (toTemp === 'Fahrenheit') result = celsius * (9 / 5) + 32;
      else result = celsius + 273.15;
    } else {
      const units = CATEGORIES[category].units;
      const from = units.find((u) => u.value === fromUnit);
      const to = units.find((u) => u.value === toUnit);
      if (from && to) {
        result = (v * from.factor) / to.factor;
      }
    }
  }

  const currentUnits = CATEGORIES[category].units;

  return (
    <CalculatorShell
      name="Unit Converter"
      description="Convert between metric and imperial units for length, weight, volume, and temperature. Fast, accurate conversions for everyday use."
      category="daily-life"
      keywords={['unit converter', 'metric', 'imperial', 'length', 'weight', 'volume', 'temperature']}
      onReset={() => { setCategory('length'); setValue('1'); setFromUnit('m'); setToUnit('ft'); setFromTemp('Celsius'); setToTemp('Fahrenheit'); }}
    >
      <div className="mb-5">
        <SelectInput
          label="Category"
          value={category}
          onChange={(v) => {
            setCategory(v as CatKey);
            if (v === 'length') { setFromUnit('m'); setToUnit('ft'); }
            else if (v === 'weight') { setFromUnit('kg'); setToUnit('lb'); }
            else if (v === 'volume') { setFromUnit('l'); setToUnit('gal'); }
          }}
          options={Object.entries(CATEGORIES).map(([k, v]) => ({ value: k, label: v.label }))}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label">From</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="input"
              placeholder="1"
            />
            {category === 'temperature' ? (
              <select
                value={fromTemp}
                onChange={(e) => setFromTemp(e.target.value as typeof fromTemp)}
                className="input w-36"
              >
                {TEMP_UNITS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            ) : (
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="input w-36"
              >
                {currentUnits.map((u) => (
                  <option key={u.value} value={u.value}>{u.label}</option>
                ))}
              </select>
            )}
          </div>
        </div>
        <div>
          <label className="label">To</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={result !== null ? formatNumber(result, 6) : ''}
              readOnly
              className="input bg-gray-50 dark:bg-gray-800"
              placeholder="Result"
            />
            {category === 'temperature' ? (
              <select
                value={toTemp}
                onChange={(e) => setToTemp(e.target.value as typeof toTemp)}
                className="input w-36"
              >
                {TEMP_UNITS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            ) : (
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="input w-36"
              >
                {currentUnits.map((u) => (
                  <option key={u.value} value={u.value}>{u.label}</option>
                ))}
              </select>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={() => {
          if (category === 'temperature') {
            setFromTemp(toTemp);
            setToTemp(fromTemp);
          } else {
            setFromUnit(toUnit);
            setToUnit(fromUnit);
          }
        }}
        className="btn-ghost mt-4 text-sm"
      >
        <ArrowLeftRight className="h-4 w-4" />
        Swap units
      </button>

      {result === null && value && (
        <EmptyState message="Enter a value to convert." />
      )}
    </CalculatorShell>
  );
}
