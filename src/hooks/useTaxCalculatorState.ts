'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  type TaxCalculatorState,
  DEFAULT_TAX_CALCULATOR_STATE,
} from '@/lib/tax-calculator';

/**
 * Encode state to base64 URL parameter
 */
function encodeState(state: TaxCalculatorState): string {
  try {
    const json = JSON.stringify(state);
    return btoa(json);
  } catch {
    return '';
  }
}

/**
 * Decode base64 URL parameter to state
 */
function decodeState(encoded: string): TaxCalculatorState | null {
  try {
    const json = atob(encoded);
    const parsed = JSON.parse(json);

    // Validate the structure
    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      typeof parsed.baseIncome === 'object' &&
      typeof parsed.baseIncome.w2Income === 'number' &&
      typeof parsed.baseIncome.phantomEquityPayout === 'number' &&
      typeof parsed.businessLoss === 'object' &&
      typeof parsed.businessLoss.enabled === 'boolean' &&
      typeof parsed.realEstateProfessional === 'object' &&
      typeof parsed.realEstateProfessional.enabled === 'boolean' &&
      typeof parsed.oilInvestment === 'object' &&
      typeof parsed.oilInvestment.enabled === 'boolean'
    ) {
      return parsed as TaxCalculatorState;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Custom hook for managing tax calculator state in URL
 *
 * This hook:
 * 1. Reads state from URL on mount
 * 2. Provides state and setter
 * 3. Updates URL when state changes (for easy scenario sharing)
 * 4. Returns isHydrated flag to handle SSR/client hydration
 */
export function useTaxCalculatorState() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [state, setStateInternal] =
    useState<TaxCalculatorState>(DEFAULT_TAX_CALCULATOR_STATE);
  const [isHydrated, setIsHydrated] = useState(false);
  const [shouldSyncToUrl, setShouldSyncToUrl] = useState(false);

  // Load state from URL on mount
  useEffect(() => {
    const stateParam = searchParams.get('state');

    if (stateParam) {
      const decoded = decodeState(stateParam);
      if (decoded) {
        setStateInternal(decoded);
        setShouldSyncToUrl(true);
      }
    }

    setIsHydrated(true);
  }, [searchParams]);

  // Custom setState that enables URL syncing
  const setState = (
    newState:
      | TaxCalculatorState
      | ((prev: TaxCalculatorState) => TaxCalculatorState)
  ) => {
    setStateInternal(newState);
    setShouldSyncToUrl(true);
  };

  // Update URL when state changes (but only if sync is enabled)
  useEffect(() => {
    if (!isHydrated || !shouldSyncToUrl) return;

    const encoded = encodeState(state);
    const currentParams = new URLSearchParams(searchParams.toString());

    if (encoded) {
      currentParams.set('state', encoded);
    } else {
      currentParams.delete('state');
    }

    const newUrl = `${window.location.pathname}?${currentParams.toString()}`;
    router.replace(newUrl, { scroll: false });
  }, [state, router, searchParams, isHydrated, shouldSyncToUrl]);

  return { state, setState, isHydrated };
}
