'use client'

import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { IncomeExpenseRow } from './IncomeExpenseRow'
import type { CalculatorState } from '@/hooks/useUrlState'
import type { IncomeExpenseEntry } from '@/lib/die-with-zero-calculator'

interface CalculatorFormProps {
  state: CalculatorState
  onChange: (state: CalculatorState) => void
}

export function CalculatorForm({ state, onChange }: CalculatorFormProps) {
  const handleAddIncome = () => {
    const newIncome: IncomeExpenseEntry = {
      amount: 5000,
      frequency: 'monthly',
      startAge: state.currentAge,
      endAge: 65,
    }
    onChange({
      ...state,
      incomes: [...state.incomes, newIncome],
    })
  }

  const handleAddExpense = () => {
    const newExpense: IncomeExpenseEntry = {
      amount: 3000,
      frequency: 'monthly',
      startAge: state.currentAge,
      endAge: 100,
    }
    onChange({
      ...state,
      expenses: [...state.expenses, newExpense],
    })
  }

  const handleUpdateIncome = (index: number, entry: IncomeExpenseEntry) => {
    const newIncomes = [...state.incomes]
    newIncomes[index] = entry
    onChange({ ...state, incomes: newIncomes })
  }

  const handleRemoveIncome = (index: number) => {
    onChange({
      ...state,
      incomes: state.incomes.filter((_, i) => i !== index),
    })
  }

  const handleUpdateExpense = (index: number, entry: IncomeExpenseEntry) => {
    const newExpenses = [...state.expenses]
    newExpenses[index] = entry
    onChange({ ...state, expenses: newExpenses })
  }

  const handleRemoveExpense = (index: number) => {
    onChange({
      ...state,
      expenses: state.expenses.filter((_, i) => i !== index),
    })
  }

  return (
    <div className="space-y-8">
      {/* Core Inputs */}
      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <label className="text-sm font-medium mb-2 block">
            Current Age
          </label>
          <input
            type="number"
            value={state.currentAge}
            onChange={(e) =>
              onChange({ ...state, currentAge: Number(e.target.value) })
            }
            className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="40"
            min="18"
            max="100"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Your current age (18-100)
          </p>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            Current Net Worth
          </label>
          <input
            type="number"
            value={state.netWorth}
            onChange={(e) =>
              onChange({ ...state, netWorth: Number(e.target.value) })
            }
            className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="1000000"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Total assets minus debts
          </p>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            Expected Interest Rate (%)
          </label>
          <input
            type="number"
            value={state.interestRate}
            onChange={(e) =>
              onChange({ ...state, interestRate: Number(e.target.value) })
            }
            className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="5"
            step="0.1"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Annual return on investments
          </p>
        </div>
      </div>

      {/* Income Streams */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">Income Streams</h3>
          <Button onClick={handleAddIncome} size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Income
          </Button>
        </div>

        <div className="space-y-3">
          {state.incomes.length === 0 ? (
            <div className="p-8 text-center bg-muted/20 rounded-xl border border-dashed border-border">
              <p className="text-sm text-muted-foreground">
                No income streams yet. Click &quot;Add Income&quot; to get started.
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
  )
}
