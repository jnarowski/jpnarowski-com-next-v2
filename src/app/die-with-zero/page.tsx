import { Suspense } from 'react'
import { DieWithZeroCalculator } from './DieWithZeroCalculator'

export const metadata = {
  title: 'Die with Zero Calculator - Net Worth Projection & Retirement Planning Tool',
  description:
    'Free Die with Zero calculator to project your net worth from your current age to 100. Plan retirement spending, track income streams, and visualize when your money runs out. Based on Bill Perkins\' Die with Zero philosophy.',
  keywords: [
    'die with zero calculator',
    'retirement calculator',
    'net worth projection',
    'financial independence',
    'retirement planning',
    'Bill Perkins',
    'compound interest calculator',
    'retirement spending plan',
  ],
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      }
    >
      <DieWithZeroCalculator />
    </Suspense>
  )
}
