'use client';

import { useMemo, Suspense } from 'react';
import { Share2, Calculator, AlertTriangle, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TaxCalculatorForm } from '@/components/tax-calculator/TaxCalculatorForm';
import { TaxSummary } from '@/components/tax-calculator/TaxSummary';
import { CalculationBreakdown } from '@/components/tax-calculator/CalculationBreakdown';
import { StrategyEducation } from '@/components/tax-calculator/StrategyEducation';
import { useTaxCalculatorState } from '@/hooks/useTaxCalculatorState';
import { calculateTaxBurden } from '@/lib/tax-calculator';

function TaxCalculatorContent() {
  const { state, setState, isHydrated } = useTaxCalculatorState();

  // Calculate tax burden
  const result = useMemo(() => {
    return calculateTaxBurden(state);
  }, [state]);

  // Share functionality
  const handleShare = async () => {
    const shareData = {
      title: 'Financial Tax Burden Calculator',
      text: 'Check out my tax calculation scenario using this calculator',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (_err) {
        // User cancelled or error occurred
        console.log('Share cancelled or failed');
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      } catch (_err) {
        console.error('Failed to copy:', _err);
      }
    }
  };

  // Show loading state while hydrating
  if (!isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading calculator...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="flex items-start justify-between gap-6 mb-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/20">
                <Calculator className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  Tax Strategy Calculator
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Financial Tax Burden{' '}
                <span className="bg-gradient-to-r from-primary via-primary/70 to-primary/50 bg-clip-text text-transparent">
                  Calculator
                </span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                Estimate your federal tax liability on large income events like
                phantom equity payouts. Model the impact of various tax reduction
                strategies including business losses, real estate professional
                status, and oil & gas investments.
              </p>
            </div>
            <Button
              onClick={handleShare}
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg flex-shrink-0"
              size="lg"
            >
              <Share2 className="h-5 w-5 mr-2" />
              Share
            </Button>
          </div>

          {/* Top Disclaimer */}
          <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-yellow-900 dark:text-yellow-200 mb-1">
                Educational Estimates Only - Not Tax Advice
              </p>
              <p className="text-xs text-yellow-800 dark:text-yellow-300 leading-relaxed">
                This calculator provides educational estimates and should not be
                considered tax, financial, or legal advice. Consult qualified
                professionals before making tax decisions.
              </p>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-border">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
              <Briefcase className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-bold mb-1">Multiple Strategies</h3>
            <p className="text-sm text-muted-foreground">
              Model business losses, REP status, and oil/gas investments
            </p>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-border">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
              <Calculator className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-bold mb-1">Transparent Math</h3>
            <p className="text-sm text-muted-foreground">
              Detailed bracket-by-bracket breakdown for CPA verification
            </p>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-border">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
              <Share2 className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-bold mb-1">Scenario Sharing</h3>
            <p className="text-sm text-muted-foreground">
              URL-based state for easy sharing with advisors
            </p>
          </div>
        </div>

        {/* Calculator Form */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Calculator Inputs</h2>
          <TaxCalculatorForm state={state} onChange={setState} />
        </div>

        {/* Tax Summary */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Tax Summary</h2>
          <TaxSummary result={result} />
        </div>

        {/* Calculation Breakdown */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Calculation Details</h2>
          <CalculationBreakdown result={result} />
        </div>

        {/* Strategy Education */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Learn About Tax Strategies</h2>
          <StrategyEducation />
        </div>

        {/* Comprehensive Disclaimer Footer */}
        <div className="mt-16 space-y-4 p-6 rounded-xl bg-muted/30 border border-border">
          <h3 className="text-sm font-bold text-foreground">
            Important Disclaimer
          </h3>

          <div className="space-y-3 text-xs text-muted-foreground leading-relaxed">
            <p>
              <strong>Not Professional Advice:</strong> This calculator is
              provided for educational and informational purposes only and should
              not be considered tax, financial, or legal advice. The calculations
              are based on simplified assumptions and may not reflect actual tax
              liability.
            </p>

            <p>
              <strong>2025 Tax Year Only:</strong> This calculator uses 2025
              federal tax brackets and standard deduction for single filers. Tax
              laws change frequently. State income taxes, Alternative Minimum Tax
              (AMT), Net Investment Income Tax (NIIT), and other factors are not
              included.
            </p>

            <p>
              <strong>Accuracy Limitations:</strong> Individual tax situations
              vary greatly. Many factors not considered in this calculator can
              significantly impact your actual tax liability, including but not
              limited to: itemized deductions, credits, phase-outs, AMT, NIIT,
              state taxes, and specific qualification requirements for strategies.
            </p>

            <p>
              <strong>Strategy Complexity:</strong> The tax strategies presented
              here have strict qualification requirements and complex rules. Real
              Estate Professional status, material participation, active vs.
              passive loss classifications, and oil & gas investments all require
              careful documentation and professional guidance.
            </p>

            <p>
              <strong>Consult Professionals:</strong> Before making any financial
              or tax decisions, we strongly recommend consulting with qualified
              tax professionals (CPAs, enrolled agents), financial advisors, and
              legal counsel who can evaluate your specific situation. This is
              especially critical for high-income events and complex tax
              strategies.
            </p>

            <p>
              <strong>No Guarantee:</strong> Past performance and mathematical
              projections do not guarantee future results. The creators of this
              calculator are not responsible for any financial decisions made
              based on its output.
            </p>
          </div>

          <div className="pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground">
              © 2025 Tax Calculator. For educational purposes only. Always
              consult qualified professionals for tax advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TaxCalculatorPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground">Loading calculator...</p>
        </div>
      }
    >
      <TaxCalculatorContent />
    </Suspense>
  );
}
