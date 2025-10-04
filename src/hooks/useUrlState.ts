'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import type { IncomeExpenseEntry } from '@/lib/die-with-zero-calculator'

export interface CalculatorState {
  currentAge: number
  netWorth: number
  interestRate: number
  incomes: IncomeExpenseEntry[]
  expenses: IncomeExpenseEntry[]
}

const defaultState: CalculatorState = {
  currentAge: 40,
  netWorth: 1000000,
  interestRate: 5,
  incomes: [
    { amount: 15000, frequency: 'monthly', startAge: 40, endAge: 65 },
  ],
  expenses: [
    { amount: 8000, frequency: 'monthly', startAge: 40, endAge: 100 },
  ],
}

/**
 * Encode state to base64 URL parameter
 */
function encodeState(state: CalculatorState): string {
  try {
    const json = JSON.stringify(state)
    return btoa(json)
  } catch {
    return ''
  }
}

/**
 * Decode base64 URL parameter to state
 */
function decodeState(encoded: string): CalculatorState | null {
  try {
    const json = atob(encoded)
    const parsed = JSON.parse(json)

    // Validate the structure
    if (
      typeof parsed.currentAge === 'number' &&
      typeof parsed.netWorth === 'number' &&
      typeof parsed.interestRate === 'number' &&
      Array.isArray(parsed.incomes) &&
      Array.isArray(parsed.expenses)
    ) {
      return parsed as CalculatorState
    }
    return null
  } catch {
    return null
  }
}

/**
 * Custom hook for managing calculator state in URL
 *
 * This hook:
 * 1. Reads state from URL on mount
 * 2. Provides state and setter
 * 3. Updates URL when state changes
 */
export function useUrlState() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [state, setState] = useState<CalculatorState>(defaultState)
  const [isHydrated, setIsHydrated] = useState(false)

  // Load state from URL on mount
  useEffect(() => {
    const stateParam = searchParams.get('state')

    if (stateParam) {
      const decoded = decodeState(stateParam)
      if (decoded) {
        setState(decoded)
      }
    }

    setIsHydrated(true)
  }, [searchParams])

  // Update URL when state changes (but only after hydration)
  useEffect(() => {
    if (!isHydrated) return

    const encoded = encodeState(state)
    const currentParams = new URLSearchParams(searchParams.toString())

    if (encoded) {
      currentParams.set('state', encoded)
    } else {
      currentParams.delete('state')
    }

    const newUrl = `${window.location.pathname}?${currentParams.toString()}`
    router.replace(newUrl, { scroll: false })
  }, [state, router, searchParams, isHydrated])

  return { state, setState, isHydrated }
}
