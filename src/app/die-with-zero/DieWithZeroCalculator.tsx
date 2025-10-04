'use client'

import { useMemo } from 'react'
import { Share2, Target, TrendingDown, Clock, Heart } from 'lucide-react'
import { CalculatorForm } from '@/components/die-with-zero/CalculatorForm'
import { NetWorthChart } from '@/components/die-with-zero/NetWorthChart'
import { Button } from '@/components/ui/button'
import { useUrlState } from '@/hooks/useUrlState'
import {
  calculateNetWorthProjection,
  aggregateToYearly,
} from '@/lib/die-with-zero-calculator'

export function DieWithZeroCalculator() {
  const { state, setState, isHydrated } = useUrlState()

  // Calculate projections
  const yearlyData = useMemo(() => {
    const monthlyProjection = calculateNetWorthProjection(state)
    return aggregateToYearly(monthlyProjection)
  }, [state])

  // Calculate when money runs out
  const runOutAge = useMemo(() => {
    const firstNegative = yearlyData.find((d) => d.netWorth < 0)
    return firstNegative ? firstNegative.age : null
  }, [yearlyData])

  // Share functionality
  const handleShare = async () => {
    const shareData = {
      title: 'Die with Zero Calculator - My Net Worth Projection',
      text: 'Check out my financial projection using the Die with Zero Calculator',
      url: window.location.href,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        // User cancelled or error occurred
        console.log('Share cancelled or failed')
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href)
        alert('Link copied to clipboard!')
      } catch (err) {
        console.error('Failed to copy:', err)
      }
    }
  }

  // Show loading state while hydrating
  if (!isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading calculator...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container-small mx-auto px-4 md:px-8">
        <div className="mb-16">
          <div className="flex items-start justify-between mb-12">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/20">
                <Target className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  Financial Philosophy
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Die with{' '}
                <span className="bg-gradient-to-r from-primary via-primary/70 to-primary/50 bg-clip-text text-transparent">
                  Zero
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
                A financial calculator inspired by Bill Perkins&apos; philosophy: maximize your life experiences
                by optimally spending your wealth over your lifetime, rather than hoarding it.
              </p>
            </div>
            <Button
              onClick={handleShare}
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg ml-6 flex-shrink-0"
              size="lg"
            >
              <Share2 className="h-5 w-5 mr-2" />
              Share This
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <TrendingDown className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">Spend Intentionally</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your wealth should be spent on experiences and helping others, not left unspent at the end of your life.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">Time is Finite</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your health, energy, and time to enjoy experiences decline with age. Plan accordingly.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">Live Fully</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Balance saving for the future with living today. Don&apos;t delay experiences that matter.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Calculator Inputs</h2>
          <CalculatorForm state={state} onChange={setState} />
        </div>

        {/* Chart */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Net Worth Projection</h2>

          {/* Summary Stats */}
          {yearlyData.length > 0 && (
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-primary/10 rounded-xl border border-primary/20">
                <p className="text-sm text-muted-foreground mb-1">
                  Starting Net Worth
                </p>
                <p className="text-2xl font-bold text-primary">
                  ${(yearlyData[0].netWorth / 1000000).toFixed(2)}M
                </p>
              </div>
              <div className="p-4 bg-primary/10 rounded-xl border border-primary/20">
                <p className="text-sm text-muted-foreground mb-1">
                  Projected at Age 100
                </p>
                <p
                  className={`text-2xl font-bold ${
                    yearlyData[yearlyData.length - 1].netWorth >= 0
                      ? 'text-green-600 dark:text-green-500'
                      : 'text-red-600 dark:text-red-500'
                  }`}
                >
                  $
                  {(
                    yearlyData[yearlyData.length - 1].netWorth / 1000000
                  ).toFixed(2)}
                  M
                </p>
              </div>
              <div className="p-4 bg-primary/10 rounded-xl border border-primary/20">
                <p className="text-sm text-muted-foreground mb-1">
                  Money Runs Out
                </p>
                <p
                  className={`text-2xl font-bold ${
                    runOutAge
                      ? 'text-red-600 dark:text-red-500'
                      : 'text-green-600 dark:text-green-500'
                  }`}
                >
                  {runOutAge ? `Age ${runOutAge}` : 'Never'}
                </p>
              </div>
            </div>
          )}

          <div className="p-6 bg-muted/20 rounded-2xl border border-border">
            <NetWorthChart data={yearlyData} />
          </div>
        </div>

        {/* Explanation */}
        <div className="mt-16 p-8 bg-muted/30 rounded-2xl border border-border">
          <h3 className="text-2xl font-bold mb-4">How It Works</h3>
          <div className="space-y-3 text-muted-foreground">
            <p>
              This calculator projects your net worth from your current age to age 100 using monthly
              compounding interest. Here&apos;s the formula:
            </p>
            <div className="bg-background rounded-lg p-4 font-mono text-sm">
              <p>For each month:</p>
              <p className="ml-4">1. Add active income</p>
              <p className="ml-4">2. Subtract active expenses</p>
              <p className="ml-4">
                3. Apply compound interest: NW = NW × (1 + r/12)
              </p>
            </div>
            <p>
              Where <strong>r</strong> is your annual interest rate as a decimal (e.g., 0.05 for 5%).
            </p>
            <p>
              The goal of &quot;Die with Zero&quot; is to optimize your spending to fully utilize your
              resources over your lifetime while maximizing life experiences. Use this tool to
              experiment with different scenarios.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
