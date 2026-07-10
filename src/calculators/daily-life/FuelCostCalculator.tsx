import { useState } from 'react';
import { Fuel } from 'lucide-react';
import CalculatorShell from '../../components/CalculatorShell';
import { NumberInput, SelectInput, ResultCard, ResultGrid, EmptyState, parseNum, formatCurrency, formatNumber } from '../../components/CalculatorFields';

export default function FuelCostCalculator() {
  const [distance, setDistance] = useState('500');
  const [efficiency, setEfficiency] = useState('8');
  const [price, setPrice] = useState('3.5');
  const [unit, setUnit] = useState('metric');

  const d = parseNum(distance);
  const eff = parseNum(efficiency);
  const p = parseNum(price);

  let fuelUsed: number | null = null;
  let totalCost: number | null = null;
  let costPerKm: number | null = null;

  if (d !== null && eff !== null && p !== null && eff > 0) {
    if (unit === 'metric') {
      // efficiency in L/100km
      fuelUsed = (d * eff) / 100;
      totalCost = fuelUsed * p;
      costPerKm = totalCost / d;
    } else {
      // efficiency in mpg, price in $/gal
      fuelUsed = d / eff;
      totalCost = fuelUsed * p;
      costPerKm = totalCost / d;
    }
  }

  return (
    <CalculatorShell
      name="Fuel Cost Calculator"
      description="Calculate fuel costs for any trip. Enter the distance, your vehicle's fuel efficiency, and fuel price to see total fuel used and cost."
      category="daily-life"
      keywords={['fuel', 'gas', 'fuel cost', 'trip cost', 'mpg', 'fuel efficiency', 'driving']}
      onReset={() => { setDistance('500'); setEfficiency('8'); setPrice('3.5'); setUnit('metric'); }}
    >
      <div className="mb-5">
        <SelectInput
          label="Measurement system"
          value={unit}
          onChange={setUnit}
          options={[
            { value: 'metric', label: 'Metric (km, L/100km, $/L)' },
            { value: 'imperial', label: 'Imperial (miles, mpg, $/gal)' },
          ]}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <NumberInput
          label="Distance"
          value={distance}
          onChange={setDistance}
          suffix={unit === 'metric' ? 'km' : 'mi'}
          placeholder="500"
        />
        <NumberInput
          label="Fuel efficiency"
          value={efficiency}
          onChange={setEfficiency}
          suffix={unit === 'metric' ? 'L/100km' : 'mpg'}
          placeholder="8"
        />
        <NumberInput
          label="Fuel price"
          value={price}
          onChange={setPrice}
          prefix="$"
          suffix={unit === 'metric' ? '/L' : '/gal'}
          placeholder="3.5"
          step="0.01"
        />
      </div>

      {totalCost !== null ? (
        <ResultGrid>
          <ResultCard label="Total fuel cost" value={formatCurrency(totalCost)} highlight icon={<Fuel className="h-4 w-4" />} />
          <ResultCard label="Fuel used" value={formatNumber(fuelUsed!, 2)} subtext={unit === 'metric' ? 'liters' : 'gallons'} />
          <ResultCard label="Cost per distance" value={formatCurrency(costPerKm!)} subtext={unit === 'metric' ? 'per km' : 'per mile'} />
        </ResultGrid>
      ) : (
        <EmptyState message="Enter your trip details to calculate fuel costs." />
      )}
    </CalculatorShell>
  );
}
