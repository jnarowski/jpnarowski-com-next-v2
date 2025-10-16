import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type TaxCalculationResult, STANDARD_DEDUCTION_2025 } from '@/lib/tax-calculator';

interface CalculationBreakdownProps {
  result: TaxCalculationResult;
}

export function CalculationBreakdown({ result }: CalculationBreakdownProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercent = (rate: number) => {
    return `${(rate * 100).toFixed(0)}%`;
  };

  return (
    <div className="space-y-6">
      {/* Simplified Story Summary */}
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <CardTitle>Calculation Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3 text-sm leading-relaxed">
            <p>
              <span className="font-semibold">Starting with</span>{' '}
              {formatCurrency(result.totalIncome)} in total income...
            </p>

            {result.strategies.length > 0 ? (
              <>
                <div className="pl-4 border-l-2 border-primary/30 space-y-2">
                  {result.strategies.map((strategy, index) => (
                    <p key={index}>
                      <span className="font-medium text-primary">{strategy.name}:</span>{' '}
                      Reduces income by {formatCurrency(strategy.deductionAmount)},{' '}
                      saving <span className="font-semibold text-green-600 dark:text-green-400">{formatCurrency(strategy.taxSavings)}</span> in taxes
                    </p>
                  ))}
                </div>

                <p className="pt-2 border-t border-border">
                  <span className="font-semibold">Total tax savings:</span>{' '}
                  <span className="text-xl font-bold text-green-600 dark:text-green-400">
                    {formatCurrency(result.totalTaxSavings)}
                  </span>
                </p>

                <p>
                  <span className="font-semibold">Final tax:</span>{' '}
                  {formatCurrency(result.adjustedTax)} instead of{' '}
                  {formatCurrency(result.baselineTax)}
                </p>
              </>
            ) : (
              <p>
                <span className="font-semibold">No strategies applied.</span> Federal tax is{' '}
                {formatCurrency(result.baselineTax)}.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Calculations Accordion */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Calculation Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {/* Baseline Calculation */}
            <AccordionItem value="baseline">
              <AccordionTrigger className="text-left">
                <div className="flex-1">
                  <p className="font-semibold">Baseline Tax Calculation</p>
                  <p className="text-sm text-muted-foreground">
                    Tax without any strategies
                  </p>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Total Income (AGI)</span>
                      <span className="font-semibold">{formatCurrency(result.baselineAGI)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-red-600 dark:text-red-400">
                      <span>Less: Standard Deduction</span>
                      <span className="font-semibold">-{formatCurrency(STANDARD_DEDUCTION_2025)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-semibold border-t border-border pt-2">
                      <span>Taxable Income</span>
                      <span>{formatCurrency(result.baselineTaxableIncome)}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <p className="text-sm font-semibold mb-3">Tax Bracket Breakdown:</p>
                    <div className="space-y-2">
                      {result.baselineBrackets.map((bracket, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-3 gap-2 text-xs p-2 rounded bg-muted/30"
                        >
                          <span>{formatPercent(bracket.rate)} bracket</span>
                          <span className="text-right">
                            {formatCurrency(bracket.incomeInBracket)}
                          </span>
                          <span className="text-right font-semibold">
                            {formatCurrency(bracket.taxAmount)}
                          </span>
                        </div>
                      ))}
                      <div className="grid grid-cols-3 gap-2 text-sm font-bold p-2 rounded bg-primary/10 border-t-2 border-primary/20">
                        <span>Total Tax</span>
                        <span></span>
                        <span className="text-right">
                          {formatCurrency(result.baselineTax)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Strategy Details */}
            {result.strategies.map((strategy, index) => (
              <AccordionItem key={index} value={`strategy-${index}`}>
                <AccordionTrigger className="text-left">
                  <div className="flex-1">
                    <p className="font-semibold">{strategy.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Saves {formatCurrency(strategy.taxSavings)} in taxes
                    </p>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pt-4">
                    <p className="text-sm">{strategy.description}</p>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-1 p-3 rounded-lg bg-muted/30">
                        <p className="text-xs text-muted-foreground">Deduction Amount</p>
                        <p className="font-semibold">
                          {formatCurrency(strategy.deductionAmount)}
                        </p>
                      </div>
                      <div className="space-y-1 p-3 rounded-lg bg-green-500/10">
                        <p className="text-xs text-muted-foreground">Tax Savings</p>
                        <p className="font-semibold text-green-600 dark:text-green-400">
                          {formatCurrency(strategy.taxSavings)}
                        </p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}

            {/* Final Adjusted Calculation */}
            {result.strategies.length > 0 && (
              <AccordionItem value="adjusted">
                <AccordionTrigger className="text-left">
                  <div className="flex-1">
                    <p className="font-semibold">Final Tax Calculation</p>
                    <p className="text-sm text-muted-foreground">
                      After all strategies applied
                    </p>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Total Income (AGI)</span>
                        <span className="font-semibold">{formatCurrency(result.baselineAGI)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-red-600 dark:text-red-400">
                        <span>Less: Total Deductions</span>
                        <span className="font-semibold">-{formatCurrency(result.totalDeductions)}</span>
                      </div>
                      <div className="flex justify-between text-sm font-medium border-t border-border pt-2">
                        <span>Adjusted AGI</span>
                        <span className="font-semibold">{formatCurrency(result.adjustedAGI)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-red-600 dark:text-red-400">
                        <span>Less: Standard Deduction</span>
                        <span className="font-semibold">-{formatCurrency(STANDARD_DEDUCTION_2025)}</span>
                      </div>
                      <div className="flex justify-between text-sm font-semibold border-t border-border pt-2">
                        <span>Taxable Income</span>
                        <span>{formatCurrency(result.adjustedTaxableIncome)}</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <p className="text-sm font-semibold mb-3">Tax Bracket Breakdown:</p>
                      <div className="space-y-2">
                        {result.adjustedBrackets.map((bracket, index) => (
                          <div
                            key={index}
                            className="grid grid-cols-3 gap-2 text-xs p-2 rounded bg-muted/30"
                          >
                            <span>{formatPercent(bracket.rate)} bracket</span>
                            <span className="text-right">
                              {formatCurrency(bracket.incomeInBracket)}
                            </span>
                            <span className="text-right font-semibold">
                              {formatCurrency(bracket.taxAmount)}
                            </span>
                          </div>
                        ))}
                        <div className="grid grid-cols-3 gap-2 text-sm font-bold p-2 rounded bg-primary/10 border-t-2 border-primary/20">
                          <span>Final Tax</span>
                          <span></span>
                          <span className="text-right">
                            {formatCurrency(result.adjustedTax)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
