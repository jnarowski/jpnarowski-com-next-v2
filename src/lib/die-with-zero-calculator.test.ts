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
})
