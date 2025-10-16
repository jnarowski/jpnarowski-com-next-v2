/**
 * Tax Calculator Tests
 *
 * Comprehensive unit tests for tax calculation functions
 */

import { describe, it, expect } from 'vitest';
import {
  calculateFederalIncomeTax,
  applyStandardDeduction,
  applyBusinessLoss,
  applyRealEstateProfessional,
  applyOilInvestment,
  calculateTaxBurden,
  STANDARD_DEDUCTION_2025,
  type TaxCalculatorState,
} from './tax-calculator';

describe('Tax Calculator - Core Functions', () => {
  describe('calculateFederalIncomeTax', () => {
    it('should calculate tax correctly for $1M income', () => {
      // Expected calculation based on 2025 brackets:
      // $11,600 × 10% = $1,160
      // ($47,150 - $11,600) × 12% = $4,266
      // ($100,525 - $47,150) × 22% = $11,742.50
      // ($191,950 - $100,525) × 24% = $21,942
      // ($243,725 - $191,950) × 32% = $16,568
      // ($609,350 - $243,725) × 35% = $127,968.75
      // ($1,000,000 - $609,350) × 37% = $144,540.50
      // Total: ~$328,187.75

      const result = calculateFederalIncomeTax(1000000);

      expect(result.totalTax).toBeGreaterThan(325000);
      expect(result.totalTax).toBeLessThan(331000);
      expect(result.brackets).toHaveLength(7); // All 7 brackets used
    });

    it('should calculate tax correctly for $500K income', () => {
      const result = calculateFederalIncomeTax(500000);

      expect(result.totalTax).toBeGreaterThan(140000);
      expect(result.totalTax).toBeLessThan(160000);
      expect(result.brackets.length).toBeGreaterThan(0);
    });

    it('should calculate tax correctly for $100K income', () => {
      const result = calculateFederalIncomeTax(100000);

      // Should use first 4 brackets
      expect(result.totalTax).toBeGreaterThan(15000);
      expect(result.totalTax).toBeLessThan(20000);
    });

    it('should return zero tax for zero income', () => {
      const result = calculateFederalIncomeTax(0);

      expect(result.totalTax).toBe(0);
      expect(result.brackets).toHaveLength(0);
    });

    it('should return zero tax for negative income', () => {
      const result = calculateFederalIncomeTax(-50000);

      expect(result.totalTax).toBe(0);
      expect(result.brackets).toHaveLength(0);
    });

    it('should include bracket breakdown', () => {
      const result = calculateFederalIncomeTax(200000);

      expect(result.brackets.length).toBeGreaterThan(0);
      expect(result.brackets[0]).toHaveProperty('rate');
      expect(result.brackets[0]).toHaveProperty('min');
      expect(result.brackets[0]).toHaveProperty('max');
      expect(result.brackets[0]).toHaveProperty('taxAmount');
      expect(result.brackets[0]).toHaveProperty('incomeInBracket');
    });
  });

  describe('applyStandardDeduction', () => {
    it('should reduce AGI by standard deduction', () => {
      const agi = 100000;
      const taxableIncome = applyStandardDeduction(agi);

      expect(taxableIncome).toBe(agi - STANDARD_DEDUCTION_2025);
      expect(taxableIncome).toBe(100000 - 15750);
    });

    it('should not return negative taxable income', () => {
      const agi = 10000; // Less than standard deduction
      const taxableIncome = applyStandardDeduction(agi);

      expect(taxableIncome).toBe(0);
    });
  });

  describe('applyBusinessLoss', () => {
    it('should reduce AGI by business loss amount', () => {
      const result = applyBusinessLoss(1000000, 200000);

      expect(result.adjustedAGI).toBe(800000);
      expect(result.deductionAmount).toBe(200000);
    });

    it('should handle zero loss', () => {
      const result = applyBusinessLoss(1000000, 0);

      expect(result.adjustedAGI).toBe(1000000);
      expect(result.deductionAmount).toBe(0);
    });

    it('should not return negative AGI', () => {
      const result = applyBusinessLoss(100000, 200000);

      expect(result.adjustedAGI).toBe(0);
      expect(result.deductionAmount).toBe(200000);
    });

    it('should handle negative loss input', () => {
      const result = applyBusinessLoss(1000000, -50000);

      expect(result.adjustedAGI).toBe(1000000);
      expect(result.deductionAmount).toBe(0);
    });
  });

  describe('applyRealEstateProfessional', () => {
    it('should apply passive losses when REP status is true', () => {
      const result = applyRealEstateProfessional(1000000, true, false, 150000);

      expect(result.adjustedAGI).toBe(850000);
      expect(result.deductionAmount).toBe(150000);
    });

    it('should NOT apply passive losses when REP status is false and no active participation', () => {
      const result = applyRealEstateProfessional(1000000, false, false, 150000);

      expect(result.adjustedAGI).toBe(1000000);
      expect(result.deductionAmount).toBe(0);
    });

    it('should apply $25k allowance with active participation (not REP)', () => {
      const result = applyRealEstateProfessional(80000, false, true, 30000);

      // AGI is under $100k, so full $25k allowance available
      expect(result.deductionAmount).toBe(25000); // Capped at $25k
      expect(result.adjustedAGI).toBe(55000); // 80k - 25k
    });

    it('should phase out $25k allowance between $100k-$150k AGI', () => {
      const result = applyRealEstateProfessional(125000, false, true, 30000);

      // AGI = $125k, halfway through phase-out range
      // Allowance = $25k - (($125k - $100k) / $50k * $25k) = $25k - $12.5k = $12.5k
      expect(result.deductionAmount).toBe(12500);
      expect(result.adjustedAGI).toBe(112500); // 125k - 12.5k
    });

    it('should fully phase out $25k allowance at $150k+ AGI', () => {
      const result = applyRealEstateProfessional(150000, false, true, 30000);

      expect(result.deductionAmount).toBe(0); // Fully phased out
      expect(result.adjustedAGI).toBe(150000); // No change
    });

    it('should handle zero passive losses', () => {
      const result = applyRealEstateProfessional(1000000, true, false, 0);

      expect(result.adjustedAGI).toBe(1000000);
      expect(result.deductionAmount).toBe(0);
    });

    it('should not return negative AGI', () => {
      const result = applyRealEstateProfessional(100000, true, false, 200000);

      expect(result.adjustedAGI).toBe(0);
      expect(result.deductionAmount).toBe(200000);
    });
  });

  describe('applyOilInvestment', () => {
    it('should calculate IDC deduction correctly with 80% IDC', () => {
      const result = applyOilInvestment(1000000, 300000, 80);

      expect(result.deductionAmount).toBe(240000); // 300K × 80%
      expect(result.adjustedAGI).toBe(760000);
    });

    it('should calculate IDC deduction correctly with 70% IDC', () => {
      const result = applyOilInvestment(1000000, 300000, 70);

      expect(result.deductionAmount).toBe(210000); // 300K × 70%
      expect(result.adjustedAGI).toBe(790000);
    });

    it('should calculate IDC deduction correctly with 85% IDC', () => {
      const result = applyOilInvestment(1000000, 300000, 85);

      expect(result.deductionAmount).toBe(255000); // 300K × 85%
      expect(result.adjustedAGI).toBe(745000);
    });

    it('should handle zero investment', () => {
      const result = applyOilInvestment(1000000, 0, 80);

      expect(result.deductionAmount).toBe(0);
      expect(result.adjustedAGI).toBe(1000000);
    });

    it('should cap IDC percentage at 100%', () => {
      const result = applyOilInvestment(1000000, 300000, 150);

      expect(result.deductionAmount).toBe(300000); // Capped at 100%
    });

    it('should handle negative IDC percentage', () => {
      const result = applyOilInvestment(1000000, 300000, -10);

      expect(result.deductionAmount).toBe(0);
      expect(result.adjustedAGI).toBe(1000000);
    });
  });
});

describe('Tax Calculator - Integration Tests', () => {
  describe('calculateTaxBurden - Baseline', () => {
    it('should calculate baseline tax with no strategies', () => {
      const state: TaxCalculatorState = {
        baseIncome: {
          w2Income: 200000,
          phantomEquityPayout: 500000,
        },
        businessLoss: {
          enabled: false,
          lossAmount: 0,
        },
        realEstateProfessional: {
          enabled: false,
          isREP: false,
          passiveLosses: 0,
        },
        oilInvestment: {
          enabled: false,
          investmentAmount: 0,
          idcPercentage: 80,
        },
      };

      const result = calculateTaxBurden(state);

      expect(result.totalIncome).toBe(700000);
      expect(result.baselineAGI).toBe(700000);
      expect(result.baselineTax).toBeGreaterThan(0);
      expect(result.adjustedTax).toBe(result.baselineTax); // No strategies
      expect(result.totalTaxSavings).toBe(0);
      expect(result.strategies).toHaveLength(0);
    });
  });

  describe('calculateTaxBurden - Single Strategies', () => {
    it('should apply business loss strategy correctly', () => {
      const state: TaxCalculatorState = {
        baseIncome: {
          w2Income: 200000,
          phantomEquityPayout: 800000,
        },
        businessLoss: {
          enabled: true,
          lossAmount: 200000,
        },
        realEstateProfessional: {
          enabled: false,
          isREP: false,
          passiveLosses: 0,
        },
        oilInvestment: {
          enabled: false,
          investmentAmount: 0,
          idcPercentage: 80,
        },
      };

      const result = calculateTaxBurden(state);

      expect(result.totalIncome).toBe(1000000);
      expect(result.adjustedAGI).toBe(800000); // 1M - 200K
      expect(result.adjustedTax).toBeLessThan(result.baselineTax);
      expect(result.totalTaxSavings).toBeGreaterThan(0);
      expect(result.strategies).toHaveLength(1);
      expect(result.strategies[0].name).toBe('Active Business Loss');
      expect(result.strategies[0].deductionAmount).toBe(200000);
    });

    it('should apply REP strategy when qualified', () => {
      const state: TaxCalculatorState = {
        baseIncome: {
          w2Income: 200000,
          phantomEquityPayout: 800000,
        },
        businessLoss: {
          enabled: false,
          lossAmount: 0,
        },
        realEstateProfessional: {
          enabled: true,
          isREP: true,
          passiveLosses: 150000,
        },
        oilInvestment: {
          enabled: false,
          investmentAmount: 0,
          idcPercentage: 80,
        },
      };

      const result = calculateTaxBurden(state);

      expect(result.adjustedAGI).toBe(850000); // 1M - 150K
      expect(result.totalTaxSavings).toBeGreaterThan(0);
      expect(result.strategies).toHaveLength(1);
      expect(result.strategies[0].name).toBe('Real Estate Professional');
      expect(result.strategies[0].deductionAmount).toBe(150000);
    });

    it('should NOT apply REP strategy when not qualified', () => {
      const state: TaxCalculatorState = {
        baseIncome: {
          w2Income: 200000,
          phantomEquityPayout: 800000,
        },
        businessLoss: {
          enabled: false,
          lossAmount: 0,
        },
        realEstateProfessional: {
          enabled: true,
          isREP: false, // Not qualified!
          passiveLosses: 150000,
        },
        oilInvestment: {
          enabled: false,
          investmentAmount: 0,
          idcPercentage: 80,
        },
      };

      const result = calculateTaxBurden(state);

      expect(result.adjustedAGI).toBe(1000000); // No change
      expect(result.totalTaxSavings).toBe(0);
      expect(result.strategies).toHaveLength(1);
      expect(result.strategies[0].deductionAmount).toBe(0);
    });

    it('should apply oil investment strategy correctly', () => {
      const state: TaxCalculatorState = {
        baseIncome: {
          w2Income: 200000,
          phantomEquityPayout: 800000,
        },
        businessLoss: {
          enabled: false,
          lossAmount: 0,
        },
        realEstateProfessional: {
          enabled: false,
          isREP: false,
          passiveLosses: 0,
        },
        oilInvestment: {
          enabled: true,
          investmentAmount: 300000,
          idcPercentage: 80,
        },
      };

      const result = calculateTaxBurden(state);

      expect(result.adjustedAGI).toBe(760000); // 1M - 240K
      expect(result.totalTaxSavings).toBeGreaterThan(0);
      expect(result.strategies).toHaveLength(1);
      expect(result.strategies[0].name).toBe('Oil & Gas Investment');
      expect(result.strategies[0].deductionAmount).toBe(240000);
    });
  });

  describe('calculateTaxBurden - Combined Strategies', () => {
    it('should apply multiple strategies cumulatively', () => {
      const state: TaxCalculatorState = {
        baseIncome: {
          w2Income: 200000,
          phantomEquityPayout: 800000,
        },
        businessLoss: {
          enabled: true,
          lossAmount: 200000,
        },
        realEstateProfessional: {
          enabled: true,
          isREP: true,
          passiveLosses: 150000,
        },
        oilInvestment: {
          enabled: true,
          investmentAmount: 300000,
          idcPercentage: 80,
        },
      };

      const result = calculateTaxBurden(state);

      expect(result.totalIncome).toBe(1000000);
      // 1M - 200K (business) - 150K (REP) - 240K (oil) = 410K
      expect(result.adjustedAGI).toBe(410000);
      expect(result.totalDeductions).toBe(590000);
      expect(result.totalTaxSavings).toBeGreaterThan(150000);
      expect(result.strategies).toHaveLength(3);
    });

    it('should calculate each strategy savings independently', () => {
      const state: TaxCalculatorState = {
        baseIncome: {
          w2Income: 200000,
          phantomEquityPayout: 300000,
        },
        businessLoss: {
          enabled: true,
          lossAmount: 100000,
        },
        realEstateProfessional: {
          enabled: true,
          isREP: true,
          passiveLosses: 50000,
        },
        oilInvestment: {
          enabled: false,
          investmentAmount: 0,
          idcPercentage: 80,
        },
      };

      const result = calculateTaxBurden(state);

      expect(result.strategies).toHaveLength(2);
      expect(result.strategies[0].taxSavings).toBeGreaterThan(0);
      expect(result.strategies[1].taxSavings).toBeGreaterThan(0);

      // Sum of individual savings should equal total savings
      const sumOfIndividualSavings = result.strategies.reduce(
        (sum, s) => sum + s.taxSavings,
        0
      );
      expect(Math.abs(sumOfIndividualSavings - result.totalTaxSavings)).toBeLessThan(1);
    });
  });

  describe('calculateTaxBurden - Edge Cases', () => {
    it('should handle income reduced to zero by strategies', () => {
      const state: TaxCalculatorState = {
        baseIncome: {
          w2Income: 100000,
          phantomEquityPayout: 0,
        },
        businessLoss: {
          enabled: true,
          lossAmount: 150000, // More than income
        },
        realEstateProfessional: {
          enabled: false,
          isREP: false,
          passiveLosses: 0,
        },
        oilInvestment: {
          enabled: false,
          investmentAmount: 0,
          idcPercentage: 80,
        },
      };

      const result = calculateTaxBurden(state);

      expect(result.adjustedAGI).toBe(0);
      expect(result.adjustedTax).toBe(0);
      expect(result.netProceeds).toBe(100000); // Original income
    });

    it('should calculate effective tax rate correctly', () => {
      const state: TaxCalculatorState = {
        baseIncome: {
          w2Income: 500000,
          phantomEquityPayout: 0,
        },
        businessLoss: {
          enabled: false,
          lossAmount: 0,
        },
        realEstateProfessional: {
          enabled: false,
          isREP: false,
          passiveLosses: 0,
        },
        oilInvestment: {
          enabled: false,
          investmentAmount: 0,
          idcPercentage: 80,
        },
      };

      const result = calculateTaxBurden(state);

      expect(result.effectiveTaxRate).toBeGreaterThan(0);
      expect(result.effectiveTaxRate).toBeLessThan(0.37); // Less than top bracket
      expect(result.effectiveTaxRate).toBe(result.adjustedTax / result.totalIncome);
    });

    it('should calculate net proceeds correctly', () => {
      const state: TaxCalculatorState = {
        baseIncome: {
          w2Income: 200000,
          phantomEquityPayout: 300000,
        },
        businessLoss: {
          enabled: false,
          lossAmount: 0,
        },
        realEstateProfessional: {
          enabled: false,
          isREP: false,
          passiveLosses: 0,
        },
        oilInvestment: {
          enabled: false,
          investmentAmount: 0,
          idcPercentage: 80,
        },
      };

      const result = calculateTaxBurden(state);

      expect(result.netProceeds).toBe(result.totalIncome - result.adjustedTax);
    });

    it('should handle zero income', () => {
      const state: TaxCalculatorState = {
        baseIncome: {
          w2Income: 0,
          phantomEquityPayout: 0,
        },
        businessLoss: {
          enabled: false,
          lossAmount: 0,
        },
        realEstateProfessional: {
          enabled: false,
          isREP: false,
          passiveLosses: 0,
        },
        oilInvestment: {
          enabled: false,
          investmentAmount: 0,
          idcPercentage: 80,
        },
      };

      const result = calculateTaxBurden(state);

      expect(result.totalIncome).toBe(0);
      expect(result.baselineTax).toBe(0);
      expect(result.adjustedTax).toBe(0);
      expect(result.effectiveTaxRate).toBe(0);
      expect(result.netProceeds).toBe(0);
    });
  });
});
