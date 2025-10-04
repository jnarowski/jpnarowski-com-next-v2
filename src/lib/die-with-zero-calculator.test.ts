import { describe, it, expect } from 'vitest'
import {
  getMonthlyRate,
  toMonthlyAmount,
  isActiveAtAge,
  applyCompoundInterest,
  getAgeForMonth,
  getActiveIncome,
  getActiveExpenses,
  calculateNetWorthProjection,
  aggregateToYearly,
  type IncomeExpenseEntry,
  type CalculatorInputs,
} from './die-with-zero-calculator'

describe('Die with Zero Calculator', () => {
  describe('getMonthlyRate', () => {
    it('should convert annual percentage to monthly decimal rate', () => {
      expect(getMonthlyRate(12)).toBeCloseTo(0.01, 5) // 12% annual = 1% monthly
      expect(getMonthlyRate(6)).toBeCloseTo(0.005, 5) // 6% annual = 0.5% monthly
      expect(getMonthlyRate(0)).toBe(0) // 0% annual = 0% monthly
    })
  })

  describe('toMonthlyAmount', () => {
    it('should return monthly amount unchanged', () => {
      const entry: IncomeExpenseEntry = {
        amount: 5000,
        frequency: 'monthly',
        startAge: 30,
        endAge: 65,
      }
      expect(toMonthlyAmount(entry)).toBe(5000)
    })

    it('should convert annual to monthly amount', () => {
      const entry: IncomeExpenseEntry = {
        amount: 120000,
        frequency: 'annual',
        startAge: 30,
        endAge: 65,
      }
      expect(toMonthlyAmount(entry)).toBe(10000)
    })
  })

  describe('isActiveAtAge', () => {
    const entry: IncomeExpenseEntry = {
      amount: 5000,
      frequency: 'monthly',
      startAge: 30,
      endAge: 65,
    }

    it('should return true for age within range', () => {
      expect(isActiveAtAge(entry, 30)).toBe(true)
      expect(isActiveAtAge(entry, 50)).toBe(true)
      expect(isActiveAtAge(entry, 65)).toBe(true)
    })

    it('should return false for age outside range', () => {
      expect(isActiveAtAge(entry, 29)).toBe(false)
      expect(isActiveAtAge(entry, 29.9)).toBe(false)
      expect(isActiveAtAge(entry, 66)).toBe(false)
    })
  })

  describe('applyCompoundInterest', () => {
    it('should apply monthly compound interest correctly', () => {
      const principal = 100000
      const monthlyRate = 0.005 // 0.5% per month = 6% annual

      const result = applyCompoundInterest(principal, monthlyRate)
      expect(result).toBeCloseTo(100500, 2)
    })

    it('should handle zero interest rate', () => {
      const principal = 100000
      const result = applyCompoundInterest(principal, 0)
      expect(result).toBe(100000)
    })

    it('should handle negative interest rate', () => {
      const principal = 100000
      const monthlyRate = -0.01 // -1% per month
      const result = applyCompoundInterest(principal, monthlyRate)
      expect(result).toBeCloseTo(99000, 2)
    })
  })

  describe('getAgeForMonth', () => {
    it('should calculate age with decimal precision', () => {
      expect(getAgeForMonth(40, 0)).toBe(40)
      expect(getAgeForMonth(40, 6)).toBe(40.5)
      expect(getAgeForMonth(40, 12)).toBe(41)
      expect(getAgeForMonth(40, 18)).toBe(41.5)
    })
  })

  describe('getActiveIncome', () => {
    const incomes: IncomeExpenseEntry[] = [
      { amount: 5000, frequency: 'monthly', startAge: 30, endAge: 65 },
      { amount: 24000, frequency: 'annual', startAge: 35, endAge: 50 }, // $2000/month
    ]

    it('should sum active income streams', () => {
      expect(getActiveIncome(incomes, 30)).toBe(5000) // Only first income
      expect(getActiveIncome(incomes, 35)).toBe(7000) // Both incomes (5000 + 2000)
      expect(getActiveIncome(incomes, 50)).toBe(7000) // Both incomes
      expect(getActiveIncome(incomes, 51)).toBe(5000) // Only first income
      expect(getActiveIncome(incomes, 66)).toBe(0) // No incomes
    })
  })

  describe('getActiveExpenses', () => {
    const expenses: IncomeExpenseEntry[] = [
      { amount: 3000, frequency: 'monthly', startAge: 30, endAge: 100 },
      { amount: 12000, frequency: 'annual', startAge: 40, endAge: 60 }, // $1000/month
    ]

    it('should sum active expense streams', () => {
      expect(getActiveExpenses(expenses, 30)).toBe(3000) // Only first expense
      expect(getActiveExpenses(expenses, 40)).toBe(4000) // Both expenses (3000 + 1000)
      expect(getActiveExpenses(expenses, 60)).toBe(4000) // Both expenses
      expect(getActiveExpenses(expenses, 61)).toBe(3000) // Only first expense
    })
  })

  describe('calculateNetWorthProjection', () => {
    it('should project net worth with no income or expenses', () => {
      const inputs: CalculatorInputs = {
        currentAge: 40,
        netWorth: 100000,
        interestRate: 6, // 6% annual
        incomes: [],
        expenses: [],
      }

      const result = calculateNetWorthProjection(inputs)

      // Should have 60 years * 12 months = 720 snapshots
      expect(result.length).toBe((100 - 40) * 12)

      // First month should have interest applied
      const firstMonth = result[0]
      expect(firstMonth.month).toBe(0)
      expect(firstMonth.age).toBe(40)
      expect(firstMonth.netWorth).toBeGreaterThan(100000)

      // Net worth should grow over time with compound interest
      const lastMonth = result[result.length - 1]
      expect(lastMonth.netWorth).toBeGreaterThan(firstMonth.netWorth)
    })

    it('should handle income without expenses', () => {
      const inputs: CalculatorInputs = {
        currentAge: 40,
        netWorth: 100000,
        interestRate: 5,
        incomes: [
          { amount: 10000, frequency: 'monthly', startAge: 40, endAge: 65 },
        ],
        expenses: [],
      }

      const result = calculateNetWorthProjection(inputs)

      // Net worth should increase significantly with income
      const firstYear = result[11] // End of first year
      expect(firstYear.netWorth).toBeGreaterThan(200000) // At least 100k + 12*10k

      // After retirement (age 65+), only interest should apply
      const ageSnapshots = result.filter(s => s.age === 65)
      const age66Snapshots = result.filter(s => s.age === 66)
      if (age66Snapshots.length > 0 && ageSnapshots.length > 0) {
        const netWorthAt65 = ageSnapshots[ageSnapshots.length - 1].netWorth
        const netWorthAt66 = age66Snapshots[age66Snapshots.length - 1].netWorth
        // Should only grow by interest, not by income
        expect(netWorthAt66).toBeGreaterThan(netWorthAt65)
        expect(netWorthAt66).toBeLessThan(netWorthAt65 * 1.06) // Less than 6% growth
      }
    })

    it('should handle expenses without income', () => {
      const inputs: CalculatorInputs = {
        currentAge: 40,
        netWorth: 500000,
        interestRate: 3,
        incomes: [],
        expenses: [
          { amount: 5000, frequency: 'monthly', startAge: 40, endAge: 100 },
        ],
      }

      const result = calculateNetWorthProjection(inputs)

      // Net worth should decrease over time
      const firstMonth = result[0]
      const oneYear = result[11]
      expect(oneYear.netWorth).toBeLessThan(firstMonth.netWorth)

      // Eventually should approach zero or go negative
      const lastMonth = result[result.length - 1]
      expect(lastMonth.netWorth).toBeLessThan(500000)
    })

    it('should handle complex scenario with multiple income and expense streams', () => {
      const inputs: CalculatorInputs = {
        currentAge: 40,
        netWorth: 1000000,
        interestRate: 5,
        incomes: [
          { amount: 15000, frequency: 'monthly', startAge: 40, endAge: 65 }, // Salary
          { amount: 36000, frequency: 'annual', startAge: 50, endAge: 100 }, // Rental income
        ],
        expenses: [
          { amount: 8000, frequency: 'monthly', startAge: 40, endAge: 65 }, // Living expenses
          { amount: 60000, frequency: 'annual', startAge: 65, endAge: 100 }, // Retirement expenses
        ],
      }

      const result = calculateNetWorthProjection(inputs)

      // Net worth should be positive throughout
      const allPositive = result.every(s => s.netWorth > 0)
      expect(allPositive).toBe(true)

      // Net worth should increase during working years (40-65)
      const at40 = result[0]
      const at65Snapshots = result.filter(s => s.age === 65)
      if (at65Snapshots.length > 0) {
        const at65 = at65Snapshots[at65Snapshots.length - 1]
        expect(at65.netWorth).toBeGreaterThan(at40.netWorth)
      }
    })

    it('should allow net worth to go negative', () => {
      const inputs: CalculatorInputs = {
        currentAge: 40,
        netWorth: 10000,
        interestRate: 0,
        incomes: [],
        expenses: [
          { amount: 1000, frequency: 'monthly', startAge: 40, endAge: 100 },
        ],
      }

      const result = calculateNetWorthProjection(inputs)

      // Should eventually go negative
      const negativeSnapshots = result.filter(s => s.netWorth < 0)
      expect(negativeSnapshots.length).toBeGreaterThan(0)
    })

    it('should handle zero interest rate', () => {
      const inputs: CalculatorInputs = {
        currentAge: 40,
        netWorth: 100000,
        interestRate: 0,
        incomes: [
          { amount: 5000, frequency: 'monthly', startAge: 40, endAge: 65 },
        ],
        expenses: [
          { amount: 3000, frequency: 'monthly', startAge: 40, endAge: 65 },
        ],
      }

      const result = calculateNetWorthProjection(inputs)

      // With 0% interest, net worth change should be exactly income - expenses
      // Monthly change = 5000 - 3000 = 2000
      const twelfthMonth = result[11] // Month 11 is the 12th month (0-indexed)

      // After 12 months: 100000 + 12 * 2000 = 124000
      expect(twelfthMonth.netWorth).toBeCloseTo(124000, -2) // Allow some rounding
      expect(twelfthMonth.age).toBe(40)
    })

    it('should produce realistic results for high-income scenario', () => {
      // Scenario: 40-year-old with $1M earning $15k/month
      // This demonstrates compound growth when income > expenses
      const inputs: CalculatorInputs = {
        currentAge: 40,
        netWorth: 1000000,
        interestRate: 5, // 5% annual return
        incomes: [
          { amount: 15000, frequency: 'monthly', startAge: 40, endAge: 65 }, // Working income
        ],
        expenses: [
          { amount: 8000, frequency: 'monthly', startAge: 40, endAge: 100 }, // Living expenses
        ],
      }

      const result = calculateNetWorthProjection(inputs)

      // Verify the projection makes sense
      const at40 = result[0]
      const at65Snapshots = result.filter(s => s.age === 65)
      const at100Snapshots = result.filter(s => s.age === 99) // Last full year

      expect(at40.netWorth).toBeGreaterThan(1000000) // Should grow from first month

      // At 65 (retirement), should have accumulated significant wealth
      if (at65Snapshots.length > 0) {
        const at65 = at65Snapshots[at65Snapshots.length - 1]
        expect(at65.netWorth).toBeGreaterThan(2000000) // Should have more than doubled
        expect(at65.netWorth).toBeLessThan(20000000) // But not unrealistically high
      }

      // At 99, wealth may still be positive due to compound interest
      // (Investment returns exceed expenses in this scenario)
      if (at100Snapshots.length > 0) {
        const at99 = at100Snapshots[at100Snapshots.length - 1]
        // With good returns, wealth can continue growing even in retirement
        expect(at99.netWorth).toBeGreaterThan(0) // Should be positive
        expect(at99.netWorth).toBeLessThan(100000000) // But not absurdly high
      }
    })

    it('should produce realistic results for retirement drawdown scenario', () => {
      // Scenario with no interest to demonstrate pure drawdown
      const inputs: CalculatorInputs = {
        currentAge: 65,
        netWorth: 2000000,
        interestRate: 0, // No returns, pure drawdown
        incomes: [],
        expenses: [
          { amount: 8000, frequency: 'monthly', startAge: 65, endAge: 100 }, // Retirement spending
        ],
      }

      const result = calculateNetWorthProjection(inputs)

      const at65 = result[0]
      const at75Snapshots = result.filter(s => s.age === 75)
      const at90Snapshots = result.filter(s => s.age === 90)

      // Should decline linearly with no returns
      if (at75Snapshots.length > 0) {
        const at75 = at75Snapshots[at75Snapshots.length - 1]
        // After 10 years: 2M - (10 years * 12 months * $8k) = 2M - $960k = ~$1.04M
        expect(at75.netWorth).toBeLessThan(at65.netWorth)
        expect(at75.netWorth).toBeGreaterThan(900000)
      }

      // Should be depleted or very low by age 90
      if (at90Snapshots.length > 0) {
        const at90 = at90Snapshots[at90Snapshots.length - 1]
        // After 25 years: 2M - (25 * 12 * $8k) = 2M - $2.4M = negative
        expect(at90.netWorth).toBeLessThan(0) // Should be in debt
      }
    })
  })

  describe('aggregateToYearly', () => {
    it('should aggregate monthly snapshots to yearly', () => {
      const monthly = [
        { month: 0, age: 40, year: 2025, netWorth: 100000 },
        { month: 11, age: 40, year: 2025, netWorth: 105000 },
        { month: 12, age: 41, year: 2026, netWorth: 110000 },
        { month: 23, age: 41, year: 2026, netWorth: 115000 },
        { month: 24, age: 42, year: 2027, netWorth: 120000 },
      ]

      const yearly = aggregateToYearly(monthly)

      expect(yearly.length).toBe(3) // Ages 40, 41, 42
      expect(yearly[0].age).toBe(40)
      expect(yearly[0].netWorth).toBe(105000) // Last snapshot for age 40
      expect(yearly[1].age).toBe(41)
      expect(yearly[1].netWorth).toBe(115000) // Last snapshot for age 41
      expect(yearly[2].age).toBe(42)
      expect(yearly[2].netWorth).toBe(120000)
    })

    it('should handle empty input', () => {
      const yearly = aggregateToYearly([])
      expect(yearly.length).toBe(0)
    })
  })

  describe('Exact Manual Calculations - Order of Operations Verification', () => {
    it('should match exact manual calculations for simple accumulation scenario', () => {
      // Scenario: $100,000 starting, +$5,000 income, -$3,000 expenses, 6% annual (0.5% monthly)
      // Verifies the STANDARD order: Interest FIRST, then cash flows
      const inputs: CalculatorInputs = {
        currentAge: 40,
        netWorth: 100000,
        interestRate: 6, // 6% annual = 0.5% monthly
        incomes: [
          { amount: 5000, frequency: 'monthly', startAge: 40, endAge: 100 },
        ],
        expenses: [
          { amount: 3000, frequency: 'monthly', startAge: 40, endAge: 100 },
        ],
      }

      const result = calculateNetWorthProjection(inputs)

      // Manual calculation with STANDARD order (interest first):
      // Month 0: (100000 × 1.005) + 5000 - 3000 = 100500 + 5000 - 3000 = 102500
      expect(result[0].netWorth).toBeCloseTo(102500, 2)

      // Month 1: (102500 × 1.005) + 5000 - 3000 = 103012.50 + 5000 - 3000 = 105012.50
      expect(result[1].netWorth).toBeCloseTo(105012.5, 2)

      // Month 2: (105012.50 × 1.005) + 5000 - 3000 = 105537.56 + 5000 - 3000 = 107537.56
      expect(result[2].netWorth).toBeCloseTo(107537.56, 2)

      // Month 11 (end of first year):
      // Working through all 12 months gives us: 130838.91
      expect(result[11].netWorth).toBeCloseTo(130838.91, 2)
    })

    it('should match exact manual calculations for pure compound interest (no cash flows)', () => {
      // Scenario: $100,000 starting, no income/expenses, 6% annual
      // This verifies compound interest formula: FV = PV × (1 + r)^n
      const inputs: CalculatorInputs = {
        currentAge: 40,
        netWorth: 100000,
        interestRate: 6,
        incomes: [],
        expenses: [],
      }

      const result = calculateNetWorthProjection(inputs)

      // After 12 months at 0.5% monthly: 100000 × (1.005)^12 = 106,167.78
      expect(result[11].netWorth).toBeCloseTo(106167.78, 2)

      // After 24 months: 100000 × (1.005)^24 = 112,715.98
      expect(result[23].netWorth).toBeCloseTo(112715.98, 2)

      // After 120 months (10 years): 100000 × (1.005)^120 = 181,939.67
      expect(result[119].netWorth).toBeCloseTo(181939.67, 2)
    })

    it('should match exact manual calculations for retirement drawdown', () => {
      // Scenario: $1,000,000 starting, no income, -$5,000/month expenses, 5% annual
      const inputs: CalculatorInputs = {
        currentAge: 65,
        netWorth: 1000000,
        interestRate: 5, // 5% annual = 0.4167% monthly (5/12 = 0.41667%)
        incomes: [],
        expenses: [
          { amount: 5000, frequency: 'monthly', startAge: 65, endAge: 100 },
        ],
      }

      const result = calculateNetWorthProjection(inputs)

      // Month 0: (1000000 × 1.00416667) - 5000 = 1004166.67 - 5000 = 999166.67
      expect(result[0].netWorth).toBeCloseTo(999166.67, 2)

      // Month 1: (999166.67 × 1.00416667) - 5000 = 1003330.35 - 5000 = 998329.86
      expect(result[1].netWorth).toBeCloseTo(998329.86, 2)

      // Month 12 (after 1 year):
      // Formula: Each month we apply interest then subtract $5000
      // After 13 iterations: 988891.65
      expect(result[12].netWorth).toBeCloseTo(988891.65, 2)
    })

    it('should handle zero interest rate with exact precision', () => {
      // With 0% interest, the calculation should be purely linear
      const inputs: CalculatorInputs = {
        currentAge: 40,
        netWorth: 100000,
        interestRate: 0,
        incomes: [
          { amount: 5000, frequency: 'monthly', startAge: 40, endAge: 65 },
        ],
        expenses: [
          { amount: 3000, frequency: 'monthly', startAge: 40, endAge: 65 },
        ],
      }

      const result = calculateNetWorthProjection(inputs)

      // With 0% interest: NW = NW × 1.0 + 5000 - 3000 = NW + 2000
      // Month 0: 100000 + 2000 = 102000
      expect(result[0].netWorth).toBe(102000)

      // Month 1: 102000 + 2000 = 104000
      expect(result[1].netWorth).toBe(104000)

      // Month 11: 100000 + (12 × 2000) = 124000
      expect(result[11].netWorth).toBe(124000)

      // After 25 years (300 months): 100000 + (300 × 2000) = 700000
      expect(result[299].netWorth).toBe(700000)
    })

    it('should correctly handle annual vs monthly frequency conversion', () => {
      // Test that annual income of $60,000 equals monthly income of $5,000
      const inputsAnnual: CalculatorInputs = {
        currentAge: 40,
        netWorth: 100000,
        interestRate: 0, // Use 0% to make comparison easier
        incomes: [
          { amount: 60000, frequency: 'annual', startAge: 40, endAge: 65 },
        ],
        expenses: [],
      }

      const inputsMonthly: CalculatorInputs = {
        currentAge: 40,
        netWorth: 100000,
        interestRate: 0,
        incomes: [
          { amount: 5000, frequency: 'monthly', startAge: 40, endAge: 65 },
        ],
        expenses: [],
      }

      const resultAnnual = calculateNetWorthProjection(inputsAnnual)
      const resultMonthly = calculateNetWorthProjection(inputsMonthly)

      // Results should be identical at every month
      expect(resultAnnual[0].netWorth).toBe(resultMonthly[0].netWorth)
      expect(resultAnnual[11].netWorth).toBe(resultMonthly[11].netWorth)
      expect(resultAnnual[59].netWorth).toBe(resultMonthly[59].netWorth)
    })

    it('should demonstrate the difference from non-standard order of operations', () => {
      // This test documents the difference between standard and non-standard approaches
      const inputs: CalculatorInputs = {
        currentAge: 40,
        netWorth: 100000,
        interestRate: 6,
        incomes: [
          { amount: 5000, frequency: 'monthly', startAge: 40, endAge: 100 },
        ],
        expenses: [
          { amount: 3000, frequency: 'monthly', startAge: 40, endAge: 100 },
        ],
      }

      const result = calculateNetWorthProjection(inputs)

      // Standard approach (current implementation): 102500.00 after first month
      expect(result[0].netWorth).toBeCloseTo(102500, 2)

      // Non-standard approach would give: 102510.00 after first month
      // (income + expenses first, then interest)
      // We verify we're NOT getting the non-standard result
      expect(result[0].netWorth).not.toBeCloseTo(102510, 2)

      // After 12 months, standard: 130838.91
      expect(result[11].netWorth).toBeCloseTo(130838.91, 2)

      // Non-standard would give: 129267.53
      expect(result[11].netWorth).not.toBeCloseTo(129267.53, 2)
    })

    it('should produce mathematically consistent results over multiple years', () => {
      // Test that the formula produces consistent year-over-year growth
      const inputs: CalculatorInputs = {
        currentAge: 40,
        netWorth: 100000,
        interestRate: 5,
        incomes: [
          { amount: 10000, frequency: 'monthly', startAge: 40, endAge: 65 },
        ],
        expenses: [
          { amount: 6000, frequency: 'monthly', startAge: 40, endAge: 65 },
        ],
      }

      const result = calculateNetWorthProjection(inputs)

      // Net monthly cash flow: +4000
      // Monthly rate: 5/12 = 0.4167%

      // Verify growth is positive and consistent
      for (let i = 1; i < 60; i++) {
        // Check first 5 years
        expect(result[i].netWorth).toBeGreaterThan(result[i - 1].netWorth)
      }

      // Verify the monthly increase includes both cash flow and interest
      const month0 = result[0].netWorth
      const month1 = result[1].netWorth

      // Month 1 should be roughly: (month0 × 1.00416667) + 4000
      const expectedMonth1 = month0 * 1.0041667 + 4000
      expect(month1).toBeCloseTo(expectedMonth1, 2)
    })

    it('should correctly handle age-based income/expense activation', () => {
      // Test that income/expenses turn on and off at the right ages
      const inputs: CalculatorInputs = {
        currentAge: 40,
        netWorth: 100000,
        interestRate: 0, // Use 0% to isolate cash flow effects
        incomes: [
          { amount: 10000, frequency: 'monthly', startAge: 40, endAge: 45 }, // 5 years
        ],
        expenses: [
          { amount: 5000, frequency: 'monthly', startAge: 45, endAge: 50 }, // 5 years
        ],
      }

      const result = calculateNetWorthProjection(inputs)

      // Ages 40-44: +10000/month income, no expenses
      // Month 0 (age 40): 100000 + 10000 = 110000
      expect(result[0].netWorth).toBe(110000)
      expect(result[0].age).toBe(40)

      // Month 59 (still age 44): should still be accumulating
      expect(result[59].netWorth).toBeGreaterThan(110000)

      // Month 60 (age 45): income stops (endAge is inclusive), expenses start
      // At month 60, age = 40 + 60/12 = 45.0
      // Income is active up to age 45 (inclusive), so month 60 should have income
      // But we need to find the exact transition point
      const age45Months = result.filter(s => s.age === 45)
      const lastIncomeMonth = age45Months[age45Months.length - 1]

      // After income stops and expenses start, net worth should decline
      const age46Months = result.filter(s => s.age === 46)
      if (age46Months.length > 0) {
        const firstExpenseOnlyMonth = age46Months[0]
        expect(firstExpenseOnlyMonth.netWorth).toBeLessThan(lastIncomeMonth.netWorth)
      }
    })
  })
})
