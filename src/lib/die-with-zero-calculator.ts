/**
 * Die with Zero Financial Calculator - Core Calculation Logic
 *
 * This module implements monthly compound interest calculations to project
 * net worth over a user's lifetime based on income streams, expenses, and
 * expected interest rates.
 *
 * Mathematical Formula:
 * For each month, net worth is updated as:
 * 1. Add active income for the month
 * 2. Subtract active expenses for the month
 * 3. Apply monthly compound interest: NW = NW × (1 + r/12)
 *
 * Where r is the annual interest rate as a decimal (e.g., 0.05 for 5%)
 */

export interface IncomeExpenseEntry {
  amount: number; // Monthly or annual amount
  frequency: 'monthly' | 'annual';
  startAge: number;
  endAge: number;
}

export interface CalculatorInputs {
  currentAge: number;
  netWorth: number;
  interestRate: number; // Annual rate as percentage (e.g., 5 for 5%)
  incomes: IncomeExpenseEntry[];
  expenses: IncomeExpenseEntry[];
}

export interface MonthlySnapshot {
  month: number; // Month index from start
  age: number; // Age at this month
  year: number; // Calendar year
  netWorth: number;
}

export interface YearlySnapshot {
  year: number;
  age: number;
  netWorth: number; // Net worth at end of year
}

/**
 * Get the current month (0-11, where 0 = January)
 */
export function getCurrentMonth(): number {
  return new Date().getMonth();
}

/**
 * Get the current year
 */
export function getCurrentYear(): number {
  return new Date().getFullYear();
}

/**
 * Convert annual interest rate (percentage) to monthly rate (decimal)
 * Example: 5% annual → 0.05 / 12 = 0.004167 monthly
 */
export function getMonthlyRate(annualRatePercent: number): number {
  return annualRatePercent / 100 / 12;
}

/**
 * Convert an income/expense entry to monthly amount
 */
export function toMonthlyAmount(entry: IncomeExpenseEntry): number {
  if (entry.frequency === 'monthly') {
    return entry.amount;
  }
  return entry.amount / 12;
}

/**
 * Check if an income/expense entry is active at a given age
 */
export function isActiveAtAge(entry: IncomeExpenseEntry, age: number): boolean {
  return age >= entry.startAge && age <= entry.endAge;
}

/**
 * Apply compound interest for one month
 */
export function applyCompoundInterest(
  currentNetWorth: number,
  monthlyRate: number
): number {
  return currentNetWorth * (1 + monthlyRate);
}

/**
 * Calculate the age (with decimal precision) for a given month index
 * Example: currentAge=40, monthIndex=0 → 40.0
 *          currentAge=40, monthIndex=6 → 40.5
 */
export function getAgeForMonth(currentAge: number, monthIndex: number): number {
  return currentAge + monthIndex / 12;
}

/**
 * Get the calendar year for a given month index
 */
export function getYearForMonth(startYear: number, startMonth: number, monthIndex: number): number {
  const totalMonths = startMonth + monthIndex;
  return startYear + Math.floor(totalMonths / 12);
}

/**
 * Calculate active monthly income for a given age
 */
export function getActiveIncome(incomes: IncomeExpenseEntry[], age: number): number {
  return incomes
    .filter(income => isActiveAtAge(income, age))
    .reduce((sum, income) => sum + toMonthlyAmount(income), 0);
}

/**
 * Calculate active monthly expenses for a given age
 */
export function getActiveExpenses(expenses: IncomeExpenseEntry[], age: number): number {
  return expenses
    .filter(expense => isActiveAtAge(expense, age))
    .reduce((sum, expense) => sum + toMonthlyAmount(expense), 0);
}

/**
 * Calculate the relevant maximum age to project based on income/expense ranges
 * Returns the latest endAge from all entries, or age 100 as fallback
 */
export function getRelevantMaxAge(
  currentAge: number,
  incomes: IncomeExpenseEntry[],
  expenses: IncomeExpenseEntry[]
): number {
  const allEntries = [...incomes, ...expenses];

  if (allEntries.length === 0) {
    return 100; // Default to 100 if no entries
  }

  const maxEndAge = Math.max(...allEntries.map(entry => entry.endAge));

  // Add a small buffer (5 years) to show what happens after income/expenses end
  // But cap at 100
  return Math.min(maxEndAge + 5, 100);
}

/**
 * Main calculation function: Projects net worth month-by-month from current age to relevant max age
 *
 * Algorithm (Standard Financial Planning Approach):
 * 1. Start from current month/year (handles partial years)
 * 2. For each month until relevant max age:
 *    a. Apply monthly compound interest to beginning balance
 *    b. Add active income (occurs at end of period, doesn't earn interest this month)
 *    c. Subtract active expenses (occurs at end of period)
 *    d. Record snapshot
 * 3. Return all monthly snapshots
 *
 * This order matches industry-standard financial calculators and is more conservative
 * than applying interest after cash flows.
 */
export function calculateNetWorthProjection(
  inputs: CalculatorInputs
): MonthlySnapshot[] {
  const { currentAge, netWorth, interestRate, incomes, expenses } = inputs;

  const monthlyRate = getMonthlyRate(interestRate);
  const currentMonth = getCurrentMonth();
  const currentYear = getCurrentYear();

  const snapshots: MonthlySnapshot[] = [];
  let currentNetWorth = netWorth;

  const maxAge = getRelevantMaxAge(currentAge, incomes, expenses);
  const totalMonths = (maxAge - currentAge) * 12;

  for (let monthIndex = 0; monthIndex < totalMonths; monthIndex++) {
    const age = getAgeForMonth(currentAge, monthIndex);
    const year = getYearForMonth(currentYear, currentMonth, monthIndex);

    // Apply compound interest FIRST (to beginning balance)
    // This is the standard approach used by financial planners
    currentNetWorth = applyCompoundInterest(currentNetWorth, monthlyRate);

    // Add income for this month (doesn't earn interest until next month)
    const monthlyIncome = getActiveIncome(incomes, age);
    currentNetWorth += monthlyIncome;

    // Subtract expenses for this month
    const monthlyExpenses = getActiveExpenses(expenses, age);
    currentNetWorth -= monthlyExpenses;

    // Record snapshot
    snapshots.push({
      month: monthIndex,
      age: Math.floor(age),
      year,
      netWorth: currentNetWorth,
    });
  }

  return snapshots;
}

/**
 * Aggregate monthly snapshots into yearly snapshots for chart display
 * Takes the last month of each year as the year's net worth
 */
export function aggregateToYearly(monthly: MonthlySnapshot[]): YearlySnapshot[] {
  const yearlyMap = new Map<number, MonthlySnapshot>();

  // Group by age and keep the last snapshot for each age
  monthly.forEach(snapshot => {
    yearlyMap.set(snapshot.age, snapshot);
  });

  // Convert to array and sort by age
  return Array.from(yearlyMap.values())
    .map(snapshot => ({
      year: snapshot.year,
      age: snapshot.age,
      netWorth: snapshot.netWorth,
    }))
    .sort((a, b) => a.age - b.age);
}
