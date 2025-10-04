import { Suspense } from 'react'
import { DieWithZeroCalculator } from './DieWithZeroCalculator'

export const metadata = {
  title: 'Die with Zero Calculator - Financial Planning Tool',
  description:
    'Plan your financial future with this Die with Zero calculator. Visualize how long your savings will last based on income, expenses, and investment returns.',
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
