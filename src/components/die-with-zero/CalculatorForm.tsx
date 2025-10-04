"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InputGroup } from "@/components/ui/input-group";
import { IncomeExpenseRow } from "./IncomeExpenseRow";
import type { CalculatorState } from "@/hooks/useUrlState";
import type { IncomeExpenseEntry } from "@/lib/die-with-zero-calculator";

interface CalculatorFormProps {
  state: CalculatorState;
  onChange: (state: CalculatorState) => void;
}

export function CalculatorForm({ state, onChange }: CalculatorFormProps) {
  // Format number with commas for display (allow empty string)
  const formatNumberForDisplay = (
    num: number,
    currentInput?: string
  ): string => {
    // If we have a current input and it's empty or just being typed, return it
    if (
      currentInput !== undefined &&
      (currentInput === "" || currentInput === "-")
    ) {
      return currentInput;
    }
    // If the number is 0 and we don't have explicit input, show empty
    if (num === 0 && currentInput === undefined) return "";
    return num.toLocaleString("en-US");
  };

  // Parse number string with commas to actual number
  const parseNumber = (str: string): number => {
    if (str === "" || str === "-") return 0;
    const cleaned = str.replace(/,/g, "");
    const num = parseFloat(cleaned);
    return isNaN(num) ? 0 : num;
  };

  // Filter input to only allow numbers, commas, and decimals
  const filterNumericInput = (value: string): string => {
    return value.replace(/[^0-9,.-]/g, "");
  };

  const handleAddIncome = () => {
    const newIncome: IncomeExpenseEntry = {
      amount: 5000,
      frequency: "monthly",
      startAge: state.currentAge,
      endAge: 65,
    };
    onChange({
      ...state,
      incomes: [...state.incomes, newIncome],
    });
  };

  const handleAddExpense = () => {
    const newExpense: IncomeExpenseEntry = {
      amount: 3000,
      frequency: "monthly",
      startAge: state.currentAge,
      endAge: 80,
    };
    onChange({
      ...state,
      expenses: [...state.expenses, newExpense],
    });
  };

  const handleUpdateIncome = (index: number, entry: IncomeExpenseEntry) => {
    const newIncomes = [...state.incomes];
    newIncomes[index] = entry;
    onChange({ ...state, incomes: newIncomes });
  };

  const handleRemoveIncome = (index: number) => {
    onChange({
      ...state,
      incomes: state.incomes.filter((_, i) => i !== index),
    });
  };

  const handleUpdateExpense = (index: number, entry: IncomeExpenseEntry) => {
    const newExpenses = [...state.expenses];
    newExpenses[index] = entry;
    onChange({ ...state, expenses: newExpenses });
  };

  const handleRemoveExpense = (index: number) => {
    onChange({
      ...state,
      expenses: state.expenses.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-8">
      {/* Core Inputs */}
      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <label className="text-sm font-medium mb-2 block">Current Age</label>
          <InputGroup
            type="text"
            value={state.currentAge === 0 ? "" : state.currentAge}
            onChange={(e) => {
              const filtered = filterNumericInput(e.target.value).replace(
                /[,.-]/g,
                ""
              );
              const num = filtered === "" ? 0 : Number(filtered);
              const clamped = Math.max(0, Math.min(100, num));
              onChange({ ...state, currentAge: clamped });
            }}
            className="h-12"
            placeholder="40"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Your current age (18-100)
          </p>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            Current Net Worth
          </label>
          <InputGroup
            type="text"
            prefix="$"
            value={
              state.netWorth === 0 ? "" : state.netWorth.toLocaleString("en-US")
            }
            onChange={(e) => {
              const filtered = filterNumericInput(e.target.value);
              onChange({ ...state, netWorth: parseNumber(filtered) });
            }}
            className="h-12"
            placeholder="1,000,000"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Total assets minus debts
          </p>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            Expected Interest Rate
          </label>
          <InputGroup
            type="text"
            suffix="%"
            value={state.interestRate === 0 ? "" : state.interestRate}
            onChange={(e) => {
              const filtered = filterNumericInput(e.target.value);
              onChange({
                ...state,
                interestRate: filtered === "" ? 0 : Number(filtered),
              });
            }}
            className="h-12"
            placeholder="5"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Annual return on investments (e.g., 5 for 5%)
          </p>
        </div>
      </div>

      {/* Income Streams */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">Income</h3>
          <Button onClick={handleAddIncome} size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Income
          </Button>
        </div>

        <div className="space-y-3">
          {state.incomes.length === 0 ? (
            <div className="p-8 text-center bg-muted/20 rounded-xl border border-dashed border-border">
              <p className="text-sm text-muted-foreground">
                No income streams yet. Click &quot;Add Income&quot; to get
                started.
              </p>
            </div>
          ) : (
            state.incomes.map((income, index) => (
              <IncomeExpenseRow
                key={index}
                entry={income}
                onChange={(entry) => handleUpdateIncome(index, entry)}
                onRemove={() => handleRemoveIncome(index)}
              />
            ))
          )}
        </div>
      </div>

      {/* Expense Streams */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">Expenses</h3>
          <Button onClick={handleAddExpense} size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Expense
          </Button>
        </div>

        <div className="space-y-3">
          {state.expenses.length === 0 ? (
            <div className="p-8 text-center bg-muted/20 rounded-xl border border-dashed border-border">
              <p className="text-sm text-muted-foreground">
                No expenses yet. Click &quot;Add Expense&quot; to get started.
              </p>
            </div>
          ) : (
            state.expenses.map((expense, index) => (
              <IncomeExpenseRow
                key={index}
                entry={expense}
                onChange={(entry) => handleUpdateExpense(index, entry)}
                onRemove={() => handleRemoveExpense(index)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
