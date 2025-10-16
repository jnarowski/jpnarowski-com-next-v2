import { Metadata } from 'next';
import { Suspense } from 'react';
import { TaxCalculatorContent } from '@/components/tax-calculator/TaxCalculatorContent';

export const metadata: Metadata = {
  title: 'Tax Burden Calculator - Model Phantom Equity & Tax Strategies | JP Narowski',
  description: 'Free tax calculator for estimating federal tax liability on large income events like phantom equity payouts. Model business losses, real estate professional status, and oil & gas investment strategies for 2025.',
  keywords: ['tax calculator', 'phantom equity', 'tax burden', 'business losses', 'real estate professional', 'oil and gas investments', 'tax strategies', '2025 taxes'],
  openGraph: {
    title: 'Financial Tax Burden Calculator - Model Your Tax Strategies',
    description: 'Estimate your federal tax liability on large income events. Model business losses, REP status, and oil & gas investments with transparent bracket-by-bracket calculations.',
    url: 'https://jpnarowski.com/tools/tax-calculator',
    siteName: 'JP Narowski',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Financial Tax Burden Calculator',
    description: 'Model tax strategies for phantom equity and large income events with transparent calculations.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

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
