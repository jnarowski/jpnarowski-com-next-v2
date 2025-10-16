/**
 * Tax Calculator - Core calculation logic for federal tax burden estimation
 *
 * This module provides pure functions for calculating federal income tax
 * with support for various tax reduction strategies including business losses,
 * real estate professional status, and oil & gas investments.
 *
 * All calculations are based on 2025 federal tax brackets for single filers.
 *
 * DISCLAIMER: These are educational estimates only and should not be considered
 * tax, financial, or legal advice.
 *
 * ============================================================================
 * ANNUAL UPDATE INSTRUCTIONS FOR 2026 AND BEYOND
 * ============================================================================
 *
 * Each year, the IRS releases inflation-adjusted amounts, typically in October
 * or November for the following tax year. Follow these steps to update:
 *
 * 1. UPDATE TAX BRACKETS (Lines ~130-137)
 *    Source: IRS Revenue Procedure (e.g., Rev. Proc. 2025-XX)
 *    URL: https://www.irs.gov/newsroom (search "inflation adjustments")
 *
 *    Update TAX_BRACKETS_2025 to TAX_BRACKETS_2026:
 *    - All seven bracket thresholds typically increase 2-4% annually
 *    - Verify against official IRS publications, NOT third-party sites
 *    - Update the year in constant name and source documentation
 *
 * 2. UPDATE STANDARD DEDUCTION (Line ~144)
 *    Source: Same IRS Revenue Procedure
 *
 *    Update STANDARD_DEDUCTION_2025 to STANDARD_DEDUCTION_2026:
 *    - Single filer amount typically increases 2-4% annually
 *    - Note: Congress may override inflation adjustments (as in 2025)
 *    - Check for legislation like tax bills that may change amounts
 *
 * 3. UPDATE EXCESS BUSINESS LOSS LIMIT (Line ~155)
 *    Source: IRS Form 461 Instructions (draft usually available by Jan)
 *    URL: https://www.irs.gov/forms-pubs/about-form-461
 *
 *    Update EXCESS_BUSINESS_LOSS_LIMIT_2025:
 *    - Section 461(l) threshold indexed for inflation
 *    - Single filer amount (joint is typically 2x)
 *    - Verify the limitation is still active (scheduled through 2028)
 *
 * 4. VERIFY PASSIVE LOSS ALLOWANCE (Lines ~162-164)
 *    Source: IRC §469(i) and IRS Publication 925
 *
 *    These amounts rarely change but verify:
 *    - PASSIVE_LOSS_ALLOWANCE ($25,000) - unchanged since 1980s
 *    - PASSIVE_LOSS_PHASE_OUT_START ($100,000) - unchanged since 1980s
 *    - PASSIVE_LOSS_PHASE_OUT_END ($150,000) - unchanged since 1980s
 *
 * 5. VERIFY STRATEGY RULES
 *    - Real Estate Professional (§469(c)(7)): 750-hour rule rarely changes
 *    - Oil & Gas IDC (§263(c)): 70-85% range is stable
 *    - Working Interest Exception (§469(c)(3)): Verify still applies
 *
 * 6. CHECK FOR NEW LEGISLATION
 *    Major tax bills can override normal inflation adjustments:
 *    - Monitor www.congress.gov for tax legislation
 *    - Check IRS guidance after any major tax law changes
 *    - Popular changes: QBI deduction, SALT cap, bonus depreciation
 *
 * 7. UPDATE TESTS (tax-calculator.test.ts)
 *    - Update hard-coded expected values for new brackets/deductions
 *    - Recalculate expected tax amounts in test cases
 *    - Run: pnpm test src/lib/tax-calculator.test.ts
 *
 * 8. UPDATE DOCUMENTATION
 *    - Update all year references (2025 → 2026)
 *    - Update source citations with new Rev. Proc. numbers
 *    - Document any rule changes in commit message
 *
 * HELPFUL RESOURCES:
 * - IRS Newsroom: https://www.irs.gov/newsroom
 * - Revenue Procedures: https://www.irs.gov/privacy-disclosure/revenue-procedures
 * - Tax Foundation: https://taxfoundation.org (good summaries)
 * - IRS Forms: https://www.irs.gov/forms-instructions
 *
 * VERIFICATION CHECKLIST:
 * □ Updated all year references in constants
 * □ Updated all year references in comments
 * □ Verified against official IRS sources (not blogs)
 * □ Updated test file with new expected values
 * □ All tests passing (pnpm test)
 * □ Reviewed changes for accuracy
 * □ Updated DEFAULT_TAX_CALCULATOR_STATE if needed
 * □ Updated UI components if new fields added
 *
 * LAST UPDATED: October 2025 for Tax Year 2025
 * NEXT UPDATE DUE: October 2026 for Tax Year 2026
 */

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * Base income inputs for the tax calculator
 */
export interface TaxCalculatorInputs {
  /** Annual W-2 income (base salary) */
  w2Income: number;
  /** One-time phantom equity payout or similar compensation */
  phantomEquityPayout: number;
}

/**
 * Active business loss strategy parameters
 */
export interface BusinessLossStrategy {
  enabled: boolean;
  /** Total active business losses (Section 162) */
  lossAmount: number;
  /** Business income to offset against losses (for 461(l) calculation) */
  businessIncome?: number;
}

/**
 * Real Estate Professional (REP) strategy parameters
 */
export interface RealEstateProfessionalStrategy {
  enabled: boolean;
  /** Qualifies as Real Estate Professional (750+ hours, >50% of work time) */
  isREP: boolean;
  /** Total passive losses from real estate activities */
  passiveLosses: number;
  /** Active participation (for $25k allowance if not REP) */
  activeParticipation?: boolean;
}

/**
 * Oil & Gas investment strategy parameters
 */
export interface OilInvestmentStrategy {
  enabled: boolean;
  /** Total investment amount in oil/gas direct participation */
  investmentAmount: number;
  /** Intangible Drilling Costs percentage (typically 70-85%) */
  idcPercentage: number;
}

/**
 * Complete tax calculation inputs including all strategies
 */
export interface TaxCalculatorState {
  baseIncome: TaxCalculatorInputs;
  businessLoss: BusinessLossStrategy;
  realEstateProfessional: RealEstateProfessionalStrategy;
  oilInvestment: OilInvestmentStrategy;
}

/**
 * Tax bracket information for breakdown display
 */
export interface TaxBracket {
  rate: number;
  min: number;
  max: number | null; // null for highest bracket
  taxAmount: number;
  incomeInBracket: number;
}

/**
 * Results of strategy application
 */
export interface StrategyResult {
  name: string;
  enabled: boolean;
  deductionAmount: number;
  taxSavings: number;
  description: string;
  /** NOL carryforward amount (for business losses exceeding 461(l) limit) */
  nolCarryforward?: number;
}

/**
 * Comprehensive tax calculation result with full breakdown
 */
export interface TaxCalculationResult {
  // Total income
  totalIncome: number;

  // Baseline calculation (no strategies)
  baselineAGI: number;
  baselineTaxableIncome: number;
  baselineTax: number;
  baselineBrackets: TaxBracket[];

  // After strategies applied
  adjustedAGI: number;
  adjustedTaxableIncome: number;
  adjustedTax: number;
  adjustedBrackets: TaxBracket[];

  // Strategy details
  strategies: StrategyResult[];
  totalDeductions: number;
  totalTaxSavings: number;

  // Final results
  effectiveTaxRate: number;
  netProceeds: number;
}

// ============================================================================
// Constants
// ============================================================================

/**
 * 2025 Federal Tax Brackets for Single Filers
 * Source: IRS Revenue Procedure 2024-40 (Official 2025 Tax Year)
 * Updated: October 2025 to reflect official IRS brackets
 */
export const TAX_BRACKETS_2025 = [
  { rate: 0.10, min: 0, max: 11925 },
  { rate: 0.12, min: 11926, max: 48475 },
  { rate: 0.22, min: 48476, max: 103350 },
  { rate: 0.24, min: 103351, max: 197300 },
  { rate: 0.32, min: 197301, max: 250525 },
  { rate: 0.35, min: 250526, max: 626350 },
  { rate: 0.37, min: 626351, max: Infinity },
] as const;

/**
 * Standard deduction for single filers in 2025
 * Source: One Big Beautiful Bill Act (OBBB) enacted July 2025
 * Amount increased from initial $15,000 inflation adjustment to $15,750
 */
export const STANDARD_DEDUCTION_2025 = 15750;

/**
 * Excess Business Loss Limitation threshold for single filers in 2025
 * Source: IRC Section 461(l), indexed for inflation
 * Business losses exceeding this amount must be carried forward as NOLs
 */
export const EXCESS_BUSINESS_LOSS_LIMIT_2025 = 313000;

/**
 * Passive Activity Loss $25,000 Special Allowance (Section 469(i))
 * Available for active participation in rental real estate
 * Phases out between $100,000 and $150,000 MAGI
 */
export const PASSIVE_LOSS_ALLOWANCE = 25000;
export const PASSIVE_LOSS_PHASE_OUT_START = 100000;
export const PASSIVE_LOSS_PHASE_OUT_END = 150000;

/**
 * Default state for the tax calculator
 */
export const DEFAULT_TAX_CALCULATOR_STATE: TaxCalculatorState = {
  baseIncome: {
    w2Income: 200000,
    phantomEquityPayout: 500000,
  },
  businessLoss: {
    enabled: false,
    lossAmount: 0,
    businessIncome: 0,
  },
  realEstateProfessional: {
    enabled: false,
    isREP: false,
    passiveLosses: 0,
    activeParticipation: false,
  },
  oilInvestment: {
    enabled: false,
    investmentAmount: 0,
    idcPercentage: 80,
  },
};

// ============================================================================
// Core Calculation Functions
// ============================================================================

/**
 * Calculate federal income tax using progressive tax brackets
 *
 * @param taxableIncome - Income after deductions
 * @returns Object with total tax and bracket-by-bracket breakdown
 */
export function calculateFederalIncomeTax(taxableIncome: number): {
  totalTax: number;
  brackets: TaxBracket[];
} {
  // Cap taxable income at 0 (can't have negative tax)
  const income = Math.max(0, taxableIncome);

  let totalTax = 0;
  const brackets: TaxBracket[] = [];

  for (const bracket of TAX_BRACKETS_2025) {
    const bracketMin = bracket.min;
    const bracketMax = bracket.max;

    // Skip brackets we haven't reached yet
    if (income <= bracketMin) {
      break;
    }

    // Calculate income in this bracket
    const maxIncome = bracketMax === Infinity ? income : Math.min(income, bracketMax);
    const incomeInBracket = maxIncome - bracketMin;

    // Calculate tax for this bracket
    const taxAmount = incomeInBracket * bracket.rate;
    totalTax += taxAmount;

    brackets.push({
      rate: bracket.rate,
      min: bracketMin,
      max: bracketMax === Infinity ? null : bracketMax,
      taxAmount,
      incomeInBracket,
    });
  }

  return {
    totalTax: Math.max(0, totalTax),
    brackets,
  };
}

/**
 * Apply standard deduction to AGI
 *
 * @param agi - Adjusted Gross Income
 * @returns Taxable income after standard deduction
 */
export function applyStandardDeduction(agi: number): number {
  return Math.max(0, agi - STANDARD_DEDUCTION_2025);
}

/**
 * Apply active business loss deduction with Section 461(l) limitation
 *
 * Active trade or business losses (Section 162) can offset ordinary income,
 * but are subject to the Excess Business Loss limitation under Section 461(l).
 *
 * For 2025, losses exceeding $313,000 (single) or $626,000 (joint) cannot
 * offset non-business income and must be carried forward as NOLs.
 *
 * @param agi - Current Adjusted Gross Income
 * @param lossAmount - Total active business losses
 * @param businessIncome - Business income to offset (default 0 for W-2 only scenarios)
 * @param threshold - Section 461(l) threshold (defaults to 2025 single filer amount)
 * @returns Object with adjusted AGI, allowed deduction, and disallowed NOL carryforward
 */
export function applyBusinessLoss(
  agi: number,
  lossAmount: number,
  businessIncome: number = 0,
  threshold: number = EXCESS_BUSINESS_LOSS_LIMIT_2025
): {
  adjustedAGI: number;
  deductionAmount: number;
  nolCarryforward: number;
} {
  const loss = Math.max(0, lossAmount);
  const income = Math.max(0, businessIncome);

  // Calculate net business loss
  const netBusinessLoss = Math.max(0, loss - income);

  // Apply Section 461(l) limitation
  // Losses can only offset up to: business income + threshold amount
  const allowedDeduction = Math.min(netBusinessLoss, threshold);
  const nolCarryforward = Math.max(0, netBusinessLoss - threshold);

  const adjustedAGI = Math.max(0, agi - allowedDeduction);

  return {
    adjustedAGI,
    deductionAmount: allowedDeduction,
    nolCarryforward,
  };
}

/**
 * Apply Real Estate Professional passive loss deduction or $25k allowance
 *
 * Two paths for deducting rental real estate losses:
 *
 * 1. Real Estate Professional (REP): If qualified (750+ hours, >50% of work time,
 *    material participation), can deduct unlimited passive losses.
 *
 * 2. Active Participation: If not REP but actively participating (10%+ ownership,
 *    meaningful decisions), can deduct up to $25,000 of passive losses.
 *    This amount phases out between $100,000-$150,000 MAGI.
 *
 * @param agi - Current Adjusted Gross Income (used for phase-out calculation)
 * @param isREP - Whether taxpayer qualifies as Real Estate Professional
 * @param activeParticipation - Whether taxpayer actively participates (for $25k allowance)
 * @param passiveLosses - Total passive losses from real estate
 * @returns Object with adjusted AGI and deduction amount
 */
export function applyRealEstateProfessional(
  agi: number,
  isREP: boolean,
  activeParticipation: boolean,
  passiveLosses: number
): {
  adjustedAGI: number;
  deductionAmount: number;
} {
  const losses = Math.max(0, passiveLosses);

  // Path 1: Real Estate Professional - unlimited passive loss deduction
  if (isREP) {
    const deductionAmount = losses;
    const adjustedAGI = Math.max(0, agi - deductionAmount);
    return { adjustedAGI, deductionAmount };
  }

  // Path 2: Active Participation - $25,000 allowance with phase-out
  if (activeParticipation) {
    // Calculate phase-out
    let allowance = PASSIVE_LOSS_ALLOWANCE;

    if (agi > PASSIVE_LOSS_PHASE_OUT_START) {
      const phaseOutAmount = agi - PASSIVE_LOSS_PHASE_OUT_START;
      const phaseOutRange = PASSIVE_LOSS_PHASE_OUT_END - PASSIVE_LOSS_PHASE_OUT_START;
      const reduction = (phaseOutAmount / phaseOutRange) * PASSIVE_LOSS_ALLOWANCE;
      allowance = Math.max(0, PASSIVE_LOSS_ALLOWANCE - reduction);
    }

    // Apply the lesser of passive losses or available allowance
    const deductionAmount = Math.min(losses, allowance);
    const adjustedAGI = Math.max(0, agi - deductionAmount);
    return { adjustedAGI, deductionAmount };
  }

  // No qualification - no deduction
  return {
    adjustedAGI: agi,
    deductionAmount: 0,
  };
}

/**
 * Apply Oil & Gas investment deduction (Intangible Drilling Costs)
 *
 * Intangible Drilling Costs (IDC) are typically 70-85% of the total
 * investment and can be deducted in the year incurred for direct
 * participation in oil/gas partnerships.
 *
 * @param agi - Current Adjusted Gross Income
 * @param investmentAmount - Total investment in oil/gas direct participation
 * @param idcPercentage - Percentage of investment that qualifies as IDC (70-85)
 * @returns Object with adjusted AGI and deduction amount
 */
export function applyOilInvestment(
  agi: number,
  investmentAmount: number,
  idcPercentage: number
): {
  adjustedAGI: number;
  deductionAmount: number;
} {
  const investment = Math.max(0, investmentAmount);
  const percentage = Math.max(0, Math.min(100, idcPercentage)) / 100;

  const deductionAmount = investment * percentage;
  const adjustedAGI = Math.max(0, agi - deductionAmount);

  return {
    adjustedAGI,
    deductionAmount,
  };
}

/**
 * Calculate complete tax burden with all strategies applied
 *
 * This is the main calculation function that orchestrates all tax
 * calculations and strategy applications.
 *
 * @param state - Complete tax calculator state with all inputs and strategies
 * @returns Comprehensive result with before/after comparison and full breakdown
 */
export function calculateTaxBurden(
  state: TaxCalculatorState
): TaxCalculationResult {
  // Calculate total income
  const totalIncome = state.baseIncome.w2Income + state.baseIncome.phantomEquityPayout;

  // Baseline calculation (no strategies applied)
  const baselineAGI = totalIncome;
  const baselineTaxableIncome = applyStandardDeduction(baselineAGI);
  const baselineCalc = calculateFederalIncomeTax(baselineTaxableIncome);

  // Apply strategies in sequence
  let adjustedAGI = totalIncome;
  const strategies: StrategyResult[] = [];

  // Strategy 1: Business Loss (with Section 461(l) limitation)
  if (state.businessLoss.enabled && state.businessLoss.lossAmount > 0) {
    const beforeTax = calculateFederalIncomeTax(
      applyStandardDeduction(adjustedAGI)
    ).totalTax;

    const result = applyBusinessLoss(
      adjustedAGI,
      state.businessLoss.lossAmount,
      state.businessLoss.businessIncome || 0
    );
    adjustedAGI = result.adjustedAGI;

    const afterTax = calculateFederalIncomeTax(
      applyStandardDeduction(adjustedAGI)
    ).totalTax;

    const description = result.nolCarryforward > 0
      ? `Section 162 business losses: $${result.deductionAmount.toLocaleString()} deductible (§461(l) limit), $${result.nolCarryforward.toLocaleString()} NOL carryforward`
      : `Section 162 active trade or business losses of $${result.deductionAmount.toLocaleString()} reduce ordinary income`;

    strategies.push({
      name: 'Active Business Loss',
      enabled: true,
      deductionAmount: result.deductionAmount,
      taxSavings: beforeTax - afterTax,
      description,
      nolCarryforward: result.nolCarryforward,
    });
  }

  // Strategy 2: Real Estate Professional / Active Participation
  if (
    state.realEstateProfessional.enabled &&
    state.realEstateProfessional.passiveLosses > 0
  ) {
    const beforeTax = calculateFederalIncomeTax(
      applyStandardDeduction(adjustedAGI)
    ).totalTax;

    const result = applyRealEstateProfessional(
      adjustedAGI,
      state.realEstateProfessional.isREP,
      state.realEstateProfessional.activeParticipation || false,
      state.realEstateProfessional.passiveLosses
    );
    adjustedAGI = result.adjustedAGI;

    const afterTax = calculateFederalIncomeTax(
      applyStandardDeduction(adjustedAGI)
    ).totalTax;

    let description: string;
    if (state.realEstateProfessional.isREP) {
      description = `REP status allows $${result.deductionAmount.toLocaleString()} in passive loss deductions`;
    } else if (state.realEstateProfessional.activeParticipation && result.deductionAmount > 0) {
      description = `Active participation allows $${result.deductionAmount.toLocaleString()} passive loss deduction (§469(i) $25k allowance)`;
    } else if (state.realEstateProfessional.activeParticipation && result.deductionAmount === 0) {
      description = 'Active participation but passive losses phased out due to high AGI (>$150k)';
    } else {
      description = 'No REP or active participation status - passive losses not deductible';
    }

    strategies.push({
      name: 'Real Estate Professional',
      enabled: true,
      deductionAmount: result.deductionAmount,
      taxSavings: beforeTax - afterTax,
      description,
    });
  }

  // Strategy 3: Oil Investment
  if (
    state.oilInvestment.enabled &&
    state.oilInvestment.investmentAmount > 0
  ) {
    const beforeTax = calculateFederalIncomeTax(
      applyStandardDeduction(adjustedAGI)
    ).totalTax;

    const result = applyOilInvestment(
      adjustedAGI,
      state.oilInvestment.investmentAmount,
      state.oilInvestment.idcPercentage
    );
    adjustedAGI = result.adjustedAGI;

    const afterTax = calculateFederalIncomeTax(
      applyStandardDeduction(adjustedAGI)
    ).totalTax;

    strategies.push({
      name: 'Oil & Gas Investment',
      enabled: true,
      deductionAmount: result.deductionAmount,
      taxSavings: beforeTax - afterTax,
      description: `Intangible Drilling Costs (${state.oilInvestment.idcPercentage}% of $${state.oilInvestment.investmentAmount.toLocaleString()}) = $${result.deductionAmount.toLocaleString()} deduction`,
    });
  }

  // Calculate final adjusted tax
  const adjustedTaxableIncome = applyStandardDeduction(adjustedAGI);
  const adjustedCalc = calculateFederalIncomeTax(adjustedTaxableIncome);

  // Calculate totals
  const totalDeductions = strategies.reduce(
    (sum, s) => sum + s.deductionAmount,
    0
  );
  const totalTaxSavings = baselineCalc.totalTax - adjustedCalc.totalTax;
  const effectiveTaxRate = totalIncome > 0 ? adjustedCalc.totalTax / totalIncome : 0;
  const netProceeds = totalIncome - adjustedCalc.totalTax;

  return {
    totalIncome,
    baselineAGI,
    baselineTaxableIncome,
    baselineTax: baselineCalc.totalTax,
    baselineBrackets: baselineCalc.brackets,
    adjustedAGI,
    adjustedTaxableIncome,
    adjustedTax: adjustedCalc.totalTax,
    adjustedBrackets: adjustedCalc.brackets,
    strategies,
    totalDeductions,
    totalTaxSavings,
    effectiveTaxRate,
    netProceeds,
  };
}

// ============================================================================
// IMPORTANT DISCLAIMERS AND LIMITATIONS
// ============================================================================

/**
 * WHAT THIS CALCULATOR INCLUDES:
 * ✓ 2025 Federal income tax brackets (single filer)
 * ✓ Standard deduction
 * ✓ Section 461(l) excess business loss limitation ($313k)
 * ✓ Active business loss deductions (Section 162)
 * ✓ Real Estate Professional status (unlimited passive loss deduction)
 * ✓ $25,000 passive loss allowance with AGI phase-out (Section 469(i))
 * ✓ Oil & Gas IDC deductions (70-85% of investment)
 * ✓ Working interest exception (Section 469(c)(3))
 *
 * WHAT THIS CALCULATOR DOES NOT INCLUDE:
 * ✗ State income taxes (varies 0-13.3% by state)
 * ✗ Alternative Minimum Tax (AMT) - can apply at high incomes
 * ✗ Net Investment Income Tax (NIIT) - 3.8% surtax on investment income >$200k
 * ✗ Self-employment tax (15.3% on business income)
 * ✗ Qualified Business Income (QBI) deduction - 20% deduction under Section 199A
 * ✗ Itemized deductions (mortgage interest, SALT, charitable, medical)
 * ✗ Capital gains tax (0%, 15%, or 20% rates)
 * ✗ At-risk rules (Section 465) - limits losses to amount at risk
 * ✗ Basis limitations on partnership/S-corp losses
 * ✗ Medicare surtaxes on high earners
 * ✗ Payroll taxes (Social Security/Medicare)
 * ✗ Estimated tax payments and penalties
 * ✗ Tax credits (child tax credit, EV credit, etc.)
 * ✗ Bonus depreciation or Section 179 expensing
 * ✗ Like-kind exchanges (Section 1031)
 * ✗ Opportunity zone deferrals
 * ✗ NOL carryback/carryforward mechanics (only tracks current year)
 * ✗ Marriage/filing status variations (married joint, head of household, etc.)
 *
 * IMPORTANT ASSUMPTIONS:
 * - Single filer status (not married, head of household, etc.)
 * - W-2 income is NOT business income for 461(l) purposes
 * - Phantom equity is treated as ordinary W-2 income
 * - All business losses are from material participation activities
 * - Real estate losses are from rental activities with proper documentation
 * - Oil & Gas investments are working interests without liability protection
 * - No prior year NOL carryforwards
 * - No carryover passive losses from prior years
 * - Standard deduction used (not itemizing)
 * - Calendar year taxpayer
 *
 * QUALIFICATION REQUIREMENTS NOT VALIDATED:
 * The calculator takes user inputs at face value and does NOT verify:
 * - Real Estate Professional: 750+ hours AND >50% of work time AND material participation
 * - Active Participation: 10%+ ownership AND meaningful management decisions
 * - Working Interest: Direct participation without liability shield (not limited partner)
 * - Material Participation: Seven tests under Section 469(h)
 * - Business vs. Hobby: Profit motive and other factors
 * - Section 162 Trade or Business: Regular and continuous activity
 *
 * TAX ADVICE DISCLAIMER:
 * This calculator provides educational estimates only. It is NOT:
 * - Tax advice
 * - Financial advice
 * - Legal advice
 * - Investment advice
 * - Accounting services
 *
 * You SHOULD:
 * - Consult a licensed CPA or tax attorney for your specific situation
 * - Maintain detailed contemporaneous records for all deductions claimed
 * - Understand that aggressive tax positions may trigger IRS audits
 * - Consider state tax implications (not included in this calculator)
 * - Factor in AMT, NIIT, and other taxes not calculated here
 * - Verify all qualification requirements with a tax professional
 * - Make estimated tax payments to avoid penalties
 *
 * ACCURACY AND LIABILITY:
 * - Calculations are based on 2025 tax law as of October 2025
 * - Tax law changes frequently and calculations may become outdated
 * - No warranty is provided regarding accuracy or completeness
 * - Use at your own risk
 * - Developer assumes no liability for tax consequences of using this tool
 * - This tool is for educational and planning purposes only
 *
 * AUDIT RISK:
 * Aggressive use of tax strategies may increase audit risk. The IRS scrutinizes:
 * - Real Estate Professional status (extensive documentation required)
 * - Large business losses relative to income
 * - Passive activity loss claims
 * - Oil & Gas working interests
 * - Section 461(l) excess business loss calculations
 *
 * Always maintain contemporaneous records including:
 * - Time logs for real estate hours
 * - Meeting minutes and management decisions
 * - Partnership agreements and K-1s
 * - Investment prospectuses and subscription documents
 * - Business expense receipts and justifications
 * - Material participation documentation
 *
 * FOR PROFESSIONAL TAX ADVISORS:
 * This tool can be used for initial planning and client education, but should not
 * replace comprehensive tax software or manual calculations. Always verify:
 * 1. Client qualifies for all strategies under current law
 * 2. State tax implications are considered
 * 3. AMT and NIIT are calculated separately
 * 4. At-risk and basis limitations are checked
 * 5. Prior year carryforwards are accounted for
 * 6. Estimated tax payment requirements are met
 * 7. All required forms are prepared (Form 461, 8582, etc.)
 *
 * REFERENCES FOR TAX PROFESSIONALS:
 * - IRC §162: Trade or Business Expenses
 * - IRC §461(l): Excess Business Loss Limitation
 * - IRC §469: Passive Activity Losses and Credits
 * - IRC §469(c)(3): Working Interest Exception
 * - IRC §469(c)(7): Real Estate Professional
 * - IRC §469(i): $25,000 Passive Loss Allowance
 * - IRC §263(c): Intangible Drilling Costs
 * - Form 461: Limitation on Business Losses
 * - Form 8582: Passive Activity Loss Limitations
 * - IRS Publication 925: Passive Activity and At-Risk Rules
 * - IRS Publication 535: Business Expenses
 *
 * VERSION HISTORY:
 * - v1.0 (October 2025): Initial release
 *   - 2025 tax brackets and standard deduction
 *   - Section 461(l) excess business loss limitation
 *   - $25,000 passive loss allowance with phase-out
 *   - Real Estate Professional status
 *   - Oil & Gas IDC deductions
 */
