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
  openGraph: {
    title: 'Die with Zero Calculator - Net Worth Projection Tool',
    description:
      'Plan your financial future with this free Die with Zero calculator. Visualize your net worth projection, track income and expenses, and optimize retirement spending.',
    type: 'website',
    images: [
      {
        url: '/experiments/die-with-zero/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Die with Zero Calculator - Net Worth Projection Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Die with Zero Calculator - Net Worth Projection Tool',
    description:
      'Free calculator to plan your financial future. Track income, expenses, and visualize your net worth over time.',
    images: ['/experiments/die-with-zero/opengraph-image'],
  },
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
