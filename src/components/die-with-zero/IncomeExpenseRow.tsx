'use client'

import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { IncomeExpenseEntry } from '@/lib/die-with-zero-calculator'

interface IncomeExpenseRowProps {
  entry: IncomeExpenseEntry
  onChange: (entry: IncomeExpenseEntry) => void
  onRemove: () => void
}

export function IncomeExpenseRow({
  entry,
  onChange,
  onRemove,
}: IncomeExpenseRowProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center p-4 bg-muted/30 rounded-xl border border-border">
      <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
        {/* Amount */}
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">
            Amount
          </label>
          <input
            type="number"
            value={entry.amount}
            onChange={(e) =>
              onChange({ ...entry, amount: Number(e.target.value) })
            }
            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="10000"
          />
        </div>

        {/* Frequency */}
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">
            Frequency
          </label>
          <select
            value={entry.frequency}
            onChange={(e) =>
              onChange({
                ...entry,
                frequency: e.target.value as 'monthly' | 'annual',
              })
            }
            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="monthly">Monthly</option>
            <option value="annual">Annual</option>
          </select>
        </div>

        {/* Start Age */}
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">
            Start Age
          </label>
          <input
            type="number"
            value={entry.startAge}
            onChange={(e) =>
              onChange({ ...entry, startAge: Number(e.target.value) })
            }
            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="40"
            min="18"
            max="100"
          />
        </div>

        {/* End Age */}
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">
            End Age
          </label>
          <input
            type="number"
            value={entry.endAge}
            onChange={(e) =>
              onChange({ ...entry, endAge: Number(e.target.value) })
            }
            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="65"
            min="18"
            max="100"
          />
        </div>
      </div>

      {/* Remove Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onRemove}
        className="text-muted-foreground hover:text-destructive h-8 w-8 p-0"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}
