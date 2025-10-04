"use client";

import { useMemo } from "react";
import { Calculator } from "lucide-react";
import type {
  CalculatorInputs,
  IncomeExpenseEntry,
} from "@/lib/die-with-zero-calculator";
import {
  calculateNetWorthProjection,
  aggregateToYearly,
  getMonthlyRate,
  toMonthlyAmount,
} from "@/lib/die-with-zero-calculator";

interface CalculationBreakdownProps {
  inputs: CalculatorInputs;
}

export function CalculationBreakdown({ inputs }: CalculationBreakdownProps) {
  const { currentAge, netWorth, interestRate, incomes, expenses } = inputs;

  // Calculate key values for display
  const monthlyRate = getMonthlyRate(interestRate);
  const effectiveAnnualRate = Math.pow(1 + monthlyRate, 12) - 1;

  // Get first year calculations for example
  const firstYearProjection = useMemo(() => {
    const monthly = calculateNetWorthProjection(inputs);
    return monthly.slice(0, 12);
  }, [inputs]);

  // Calculate total income and expenses for first year
  const firstYearIncome = useMemo(() => {
    let total = 0;
    incomes.forEach((income) => {
      if (currentAge >= income.startAge && currentAge <= income.endAge) {
        total += toMonthlyAmount(income) * 12;
      }
    });
    return total;
  }, [incomes, currentAge]);

  const firstYearExpenses = useMemo(() => {
    let total = 0;
    expenses.forEach((expense) => {
      if (currentAge >= expense.startAge && currentAge <= expense.endAge) {
        total += toMonthlyAmount(expense) * 12;
      }
    });
    return total;
  }, [expenses, currentAge]);

  // Format numbers for display
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return (value * 100).toFixed(6) + "%";
  };

  return (
    <div className="border rounded-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="h-5 w-5 text-muted-foreground" />
        <div>
          <h3 className="text-xl font-semibold">Calculation Breakdown</h3>
          <p className="text-sm text-muted-foreground">
            Exact formulas and numbers for financial analyst verification
          </p>
        </div>
      </div>

      <div className="divide-y">
        <div className="pb-6">
          <div>
            <p className="font-semibold mb-3">The Setup:</p>
            <p>
              You are currently {currentAge} years old and have accumulated a
              net worth of {formatCurrency(netWorth)}. You expect your
              investments to generate an annual return of {interestRate}%, which
              compounds monthly at a rate of {formatPercent(monthlyRate)}.
            </p>

            {incomes.length > 0 && (
              <div className="mt-3">
                <p className="font-semibold">Your Income Streams:</p>
                <ul className="mt-1 ml-4 space-y-1">
                  {incomes.map((income, index) => (
                    <li key={index}>
                      Starting at age {income.startAge}, you will receive{" "}
                      {formatCurrency(income.amount)}{" "}
                      {income.frequency === "monthly"
                        ? "per month"
                        : "per year"}
                      {income.frequency === "annual" &&
                        ` (${formatCurrency(
                          toMonthlyAmount(income)
                        )} per month)`}
                      {income.endAge < 100
                        ? ` until age ${income.endAge}`
                        : " for the rest of your life"}
                      .
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {expenses.length > 0 && (
              <div className="mt-3">
                <p className="font-semibold">Your Expense Commitments:</p>
                <ul className="mt-1 ml-4 space-y-1">
                  {expenses.map((expense, index) => (
                    <li key={index}>
                      From age {expense.startAge}, you will spend{" "}
                      {formatCurrency(expense.amount)}{" "}
                      {expense.frequency === "monthly"
                        ? "per month"
                        : "per year"}
                      {expense.frequency === "annual" &&
                        ` (${formatCurrency(
                          toMonthlyAmount(expense)
                        )} per month)`}
                      {expense.endAge < 100
                        ? ` until age ${expense.endAge}`
                        : " for the rest of your life"}
                      .
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="py-6">
          <p className="font-semibold mb-2">
            How Your Wealth Evolves Each Month:
          </p>
          <ol className="text-sm space-y-2 ml-4">
            <li>
              1. Your existing wealth of {formatCurrency(netWorth)} earns{" "}
              {formatPercent(monthlyRate)} interest
            </li>
            {(() => {
              const activeIncome = incomes
                .filter(
                  (i) => currentAge >= i.startAge && currentAge <= i.endAge
                )
                .reduce((sum, i) => sum + toMonthlyAmount(i), 0);
              const activeExpenses = expenses
                .filter(
                  (e) => currentAge >= e.startAge && currentAge <= e.endAge
                )
                .reduce((sum, e) => sum + toMonthlyAmount(e), 0);

              return (
                <>
                  {activeIncome > 0 && (
                    <li>
                      2. You receive {formatCurrency(activeIncome)} in monthly
                      income
                    </li>
                  )}
                  {activeExpenses > 0 && (
                    <li>
                      {activeIncome > 0 ? "3" : "2"}. You pay{" "}
                      {formatCurrency(activeExpenses)} in monthly expenses
                    </li>
                  )}
                </>
              );
            })()}
            <li>
              Result: Your first month ends with{" "}
              {formatCurrency(firstYearProjection[0]?.netWorth || 0)}
            </li>
          </ol>
        </div>

        {(() => {
          const allProjections = calculateNetWorthProjection(inputs);
          const zeroPoint = allProjections.find((s) => s.netWorth <= 0);
          const finalProjection = allProjections[allProjections.length - 1];

          // Find key milestones
          const age65 = allProjections.find((s) => s.age === 65);
          const age75 = allProjections.find((s) => s.age === 75);
          const age85 = allProjections.find((s) => s.age === 85);

          return (
            <>
              <div className="py-6">
                <p className="font-semibold mb-2">
                  Key Milestones in Your Journey:
                </p>
                <ul className="text-sm space-y-1">
                  <li>
                    • After 1 year (age {currentAge + 1}):{" "}
                    {formatCurrency(firstYearProjection[11]?.netWorth || 0)}
                  </li>
                  {age65 && currentAge < 65 && (
                    <li>
                      • At retirement (age 65): {formatCurrency(age65.netWorth)}
                    </li>
                  )}
                  {age75 && currentAge < 75 && (
                    <li>• At age 75: {formatCurrency(age75.netWorth)}</li>
                  )}
                  {age85 && currentAge < 85 && (
                    <li>• At age 85: {formatCurrency(age85.netWorth)}</li>
                  )}
                  <li>
                    • At age 100: {formatCurrency(finalProjection.netWorth)}
                  </li>
                </ul>
              </div>

              <div className="py-6">
                <p className="font-semibold mb-2">The Bottom Line:</p>
                {zeroPoint ? (
                  <p className="text-sm">
                    Based on your current trajectory, your money will run out at
                    age {Math.floor(zeroPoint.age)}. This gives you{" "}
                    {Math.floor(zeroPoint.age) - currentAge} years of financial
                    runway. To extend this, you could reduce expenses by{" "}
                    {formatCurrency(
                      expenses
                        .filter(
                          (e) =>
                            zeroPoint.age >= e.startAge &&
                            zeroPoint.age <= e.endAge
                        )
                        .reduce((sum, e) => sum + toMonthlyAmount(e), 0) * 0.2
                    )}{" "}
                    per month, increase income, or improve your investment
                    returns.
                  </p>
                ) : (
                  <p className="text-sm">
                    Excellent news! Your money is projected to last your entire
                    lifetime. At age 100, you&apos;ll still have{" "}
                    {formatCurrency(finalProjection.netWorth)}.
                    {finalProjection.netWorth > netWorth * 2 &&
                      " You might want to consider increasing your spending to better enjoy your wealth during your lifetime - this aligns with the 'Die with Zero' philosophy."}
                  </p>
                )}
              </div>
            </>
          );
        })()}

        <div className="pt-6">
          <p className="font-semibold mb-2">Mathematical Problem Statement:</p>
          <div className="font-mono text-xs space-y-2">
            <p>Given:</p>
            <ul className="ml-4 space-y-1">
              <li>• Initial net worth (NW₀) = ${netWorth.toLocaleString()}</li>
              <li>• Current age = {currentAge}</li>
              <li>• Annual interest rate = {interestRate}%</li>
              <li>
                • Monthly rate (r) = {interestRate}% ÷ 12 ={" "}
                {(monthlyRate * 100).toFixed(4)}%
              </li>
              {incomes.length > 0 && (
                <li>• Income streams: {incomes.length} active</li>
              )}
              {expenses.length > 0 && (
                <li>• Expense streams: {expenses.length} active</li>
              )}
            </ul>
            <p className="mt-2">Monthly Formula:</p>
            <p className="ml-4">
              NW[n+1] = (NW[n] × (1 + {monthlyRate.toFixed(6)})) + Income[n] -
              Expenses[n]
            </p>
            <p className="mt-2">Find:</p>
            <p className="ml-4">
              1. Net worth at age 100 (NW[{`${(100 - currentAge) * 12}`}])
            </p>
            <p className="ml-4">2. Age when NW ≤ 0 (if applicable)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
