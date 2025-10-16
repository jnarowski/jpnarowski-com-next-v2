import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingDown, DollarSign, Percent } from 'lucide-react';
import { type TaxCalculationResult } from '@/lib/tax-calculator';

interface TaxSummaryProps {
  result: TaxCalculationResult;
}

export function TaxSummary({ result }: TaxSummaryProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return `${(value * 100).toFixed(1)}%`;
  };

  return (
    <div className="space-y-6">
      {/* Main Summary Card */}
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
        <CardHeader>
          <CardTitle className="text-2xl">Tax Calculation Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Income</p>
              <p className="text-3xl font-bold">{formatCurrency(result.totalIncome)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Net Proceeds (After Tax)</p>
              <p className="text-3xl font-bold text-primary">
                {formatCurrency(result.netProceeds)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Tax Without Strategies */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Tax (No Strategies)</p>
                <p className="text-xl font-bold">{formatCurrency(result.baselineTax)}</p>
              </div>
              <div className="rounded-full bg-red-100 dark:bg-red-900/20 p-2">
                <DollarSign className="h-4 w-4 text-red-600 dark:text-red-400" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Baseline federal tax liability
            </p>
          </CardContent>
        </Card>

        {/* Tax With Strategies */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Tax (Optimized)</p>
                <p className="text-xl font-bold">{formatCurrency(result.adjustedTax)}</p>
              </div>
              <div className="rounded-full bg-blue-100 dark:bg-blue-900/20 p-2">
                <DollarSign className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              After applying strategies
            </p>
          </CardContent>
        </Card>

        {/* Total Tax Savings */}
        <Card className="border-2 border-green-500/20 bg-green-500/5">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Tax Savings</p>
                <p className="text-xl font-bold text-green-600 dark:text-green-400">
                  {formatCurrency(result.totalTaxSavings)}
                </p>
              </div>
              <div className="rounded-full bg-green-100 dark:bg-green-900/20 p-2">
                <TrendingDown className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Reduction from strategies
            </p>
          </CardContent>
        </Card>

        {/* Effective Tax Rate */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Effective Tax Rate</p>
                <p className="text-xl font-bold">
                  {formatPercent(result.effectiveTaxRate)}
                </p>
              </div>
              <div className="rounded-full bg-purple-100 dark:bg-purple-900/20 p-2">
                <Percent className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Overall tax burden percentage
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Active Strategies */}
      {result.strategies.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Active Strategies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {result.strategies.map((strategy, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between p-3 rounded-lg bg-muted/30"
                >
                  <div className="flex-1">
                    <p className="font-medium">{strategy.name}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {strategy.description}
                    </p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                      {formatCurrency(strategy.taxSavings)}
                    </p>
                    <p className="text-xs text-muted-foreground">saved</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
