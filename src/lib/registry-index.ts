import { lazy } from 'react';
import { registerCalculator } from './registry';

// Finance
registerCalculator({
  slug: 'mortgage',
  name: 'Mortgage Calculator',
  description:
    'Estimate your monthly mortgage payment including principal and interest. Enter your home price, down payment, interest rate, and loan term to see what you\'ll pay.',
  category: 'finance',
  keywords: ['mortgage', 'home loan', 'monthly payment', 'principal', 'interest', 'amortization'],
  component: lazy(() => import('../calculators/finance/MortgageCalculator')),
});

registerCalculator({
  slug: 'loan',
  name: 'Loan Calculator',
  description:
    'Calculate monthly payments and total interest for any personal or auto loan. Enter the loan amount, annual interest rate, and term in months.',
  category: 'finance',
  keywords: ['loan', 'personal loan', 'auto loan', 'monthly payment', 'interest', 'amortization'],
  component: lazy(() => import('../calculators/finance/LoanCalculator')),
});

registerCalculator({
  slug: 'compound-interest',
  name: 'Compound Interest Calculator',
  description:
    'See how your money grows with compound interest. Enter your initial investment, monthly contribution, annual rate, and time horizon to project your future balance.',
  category: 'finance',
  keywords: ['compound interest', 'investment', 'savings', 'growth', 'annuity', 'future value'],
  component: lazy(() => import('../calculators/finance/CompoundInterestCalculator')),
});

registerCalculator({
  slug: 'tip',
  name: 'Tip Calculator',
  description:
    'Quickly calculate tip and split the bill. Enter the bill amount, choose a tip percentage, and set the number of people to see what each person owes.',
  category: 'finance',
  keywords: ['tip', 'gratuity', 'bill split', 'restaurant', 'dining'],
  component: lazy(() => import('../calculators/finance/TipCalculator')),
});

registerCalculator({
  slug: 'tax',
  name: 'Income Tax Calculator',
  description:
    'Estimate your federal and state income tax. Enter your annual income and marginal tax rate to see your take-home pay and effective tax rate.',
  category: 'finance',
  keywords: ['tax', 'income tax', 'federal tax', 'state tax', 'take home pay', 'marginal rate'],
  component: lazy(() => import('../calculators/finance/TaxCalculator')),
});

registerCalculator({
  slug: 'savings-goal',
  name: 'Savings Goal Calculator',
  description:
    'Figure out how long it will take to reach your savings goal. Enter your target amount, current savings, monthly contribution, and expected interest rate.',
  category: 'finance',
  keywords: ['savings', 'goal', 'target', 'future value', 'financial planning', 'savings plan'],
  component: lazy(() => import('../calculators/finance/SavingsGoalCalculator')),
});

// Health
registerCalculator({
  slug: 'bmi',
  name: 'BMI Calculator',
  description:
    'Calculate your Body Mass Index (BMI) to assess whether your weight is in a healthy range for your height. Supports both metric and imperial units.',
  category: 'health',
  keywords: ['bmi', 'body mass index', 'weight', 'healthy weight', 'body composition'],
  component: lazy(() => import('../calculators/health/BMICalculator')),
});

registerCalculator({
  slug: 'bmr',
  name: 'BMR & Calorie Calculator',
  description:
    'Calculate your Basal Metabolic Rate (BMR) and daily calorie needs (TDEE). Uses the Mifflin-St Jeor equation and activity multipliers for accurate results.',
  category: 'health',
  keywords: ['bmr', 'calories', 'tdee', 'metabolism', 'daily calorie needs', 'mifflin st jeor'],
  component: lazy(() => import('../calculators/health/BMRCalculator')),
});

registerCalculator({
  slug: 'body-fat',
  name: 'Body Fat Calculator',
  description:
    'Estimate your body fat percentage using the U.S. Navy method. Enter your neck, waist, and (for women) hip measurements along with your height.',
  category: 'health',
  keywords: ['body fat', 'body fat percentage', 'navy method', 'body composition', 'fitness'],
  component: lazy(() => import('../calculators/health/BodyFatCalculator')),
});

registerCalculator({
  slug: 'water-intake',
  name: 'Water Intake Calculator',
  description:
    'Calculate how much water you should drink each day based on your body weight and exercise level. Stay hydrated with a personalized daily water goal.',
  category: 'health',
  keywords: ['water', 'hydration', 'daily water intake', 'drinking water', 'fluid needs'],
  component: lazy(() => import('../calculators/health/WaterIntakeCalculator')),
});

registerCalculator({
  slug: 'ideal-weight',
  name: 'Ideal Weight Calculator',
  description:
    'Find your ideal body weight using the Devine formula, adjusted for gender and frame size. Also shows a healthy weight range based on BMI.',
  category: 'health',
  keywords: ['ideal weight', 'devine formula', 'healthy weight', 'target weight', 'frame size'],
  component: lazy(() => import('../calculators/health/IdealWeightCalculator')),
});

// Daily Life
registerCalculator({
  slug: 'age',
  name: 'Age Calculator',
  description:
    'Calculate your exact age in years, months, and days. Enter your birth date and optionally a target date to find the precise time between two dates.',
  category: 'daily-life',
  keywords: ['age', 'birthday', 'date difference', 'years', 'days alive'],
  component: lazy(() => import('../calculators/daily-life/AgeCalculator')),
});

registerCalculator({
  slug: 'date-difference',
  name: 'Date Difference Calculator',
  description:
    'Calculate the time between two dates in days, weeks, months, and business days. Perfect for project planning, countdowns, and scheduling.',
  category: 'daily-life',
  keywords: ['date difference', 'days between dates', 'countdown', 'business days', 'date range'],
  component: lazy(() => import('../calculators/daily-life/DateDifferenceCalculator')),
});

registerCalculator({
  slug: 'unit-converter',
  name: 'Unit Converter',
  description:
    'Convert between metric and imperial units for length, weight, volume, and temperature. Fast, accurate conversions for everyday use.',
  category: 'daily-life',
  keywords: ['unit converter', 'metric', 'imperial', 'length', 'weight', 'volume', 'temperature'],
  component: lazy(() => import('../calculators/daily-life/UnitConverterCalculator')),
});

registerCalculator({
  slug: 'percentage',
  name: 'Percentage Calculator',
  description:
    'Calculate percentages easily: find X% of a number, determine what percentage one number is of another, or calculate percentage change between two values.',
  category: 'daily-life',
  keywords: ['percentage', 'percent', 'percent change', 'ratio', 'proportion'],
  component: lazy(() => import('../calculators/daily-life/PercentageCalculator')),
});

registerCalculator({
  slug: 'fuel-cost',
  name: 'Fuel Cost Calculator',
  description:
    'Calculate fuel costs for any trip. Enter the distance, your vehicle\'s fuel efficiency, and fuel price to see total fuel used and cost.',
  category: 'daily-life',
  keywords: ['fuel', 'gas', 'fuel cost', 'trip cost', 'mpg', 'fuel efficiency', 'driving'],
  component: lazy(() => import('../calculators/daily-life/FuelCostCalculator')),
});

// Math
registerCalculator({
  slug: 'basic-calculator',
  name: 'Basic Calculator',
  description:
    'A simple, clean calculator for everyday arithmetic. Add, subtract, multiply, divide, and calculate percentages with a responsive button interface.',
  category: 'math',
  keywords: ['calculator', 'basic', 'arithmetic', 'add', 'subtract', 'multiply', 'divide'],
  component: lazy(() => import('../calculators/math/BasicCalculator')),
});

registerCalculator({
  slug: 'scientific-calculator',
  name: 'Scientific Calculator',
  description:
    'A full-featured scientific calculator with trigonometric functions, logarithms, exponents, factorials, and constants. Perfect for advanced math and engineering.',
  category: 'math',
  keywords: ['scientific calculator', 'trigonometry', 'logarithm', 'exponent', 'factorial', 'sin', 'cos', 'tan'],
  component: lazy(() => import('../calculators/math/ScientificCalculator')),
});

registerCalculator({
  slug: 'quadratic',
  name: 'Quadratic Equation Solver',
  description:
    'Solve any quadratic equation ax² + bx + c = 0. Enter the coefficients to find the roots, discriminant, and vertex of the parabola. Handles real and complex roots.',
  category: 'math',
  keywords: ['quadratic', 'equation', 'roots', 'discriminant', 'parabola', 'vertex', 'algebra'],
  component: lazy(() => import('../calculators/math/QuadraticCalculator')),
});

registerCalculator({
  slug: 'gcd-lcm',
  name: 'GCD & LCM Calculator',
  description:
    'Find the Greatest Common Divisor (GCD) and Least Common Multiple (LCM) of two integers. Useful for simplifying fractions, finding common denominators, and number theory.',
  category: 'math',
  keywords: ['gcd', 'lcm', 'greatest common divisor', 'least common multiple', 'factors', 'number theory'],
  component: lazy(() => import('../calculators/math/GCDLCMCalculator')),
});

registerCalculator({
  slug: 'triangle',
  name: 'Triangle Solver',
  description:
    'Solve triangles by entering known sides and angles. Supports SAS (two sides + included angle), SSS (three sides), and ASA (two angles + included side). Calculates area and perimeter.',
  category: 'math',
  keywords: ['triangle', 'geometry', 'area', 'perimeter', 'heron', 'trigonometry', 'sas', 'sss', 'asa'],
  component: lazy(() => import('../calculators/math/TriangleCalculator')),
});
