'use client'

import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { InputGroup } from '@/components/ui/input-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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
  // Parse number string with commas to actual number
  const parseNumber = (str: string): number => {
    if (str === '' || str === '-') return 0
    const cleaned = str.replace(/,/g, '')
    const num = parseFloat(cleaned)
    return isNaN(num) ? 0 : num
  }

  // Filter input to only allow numbers, commas, and decimals
  const filterNumericInput = (value: string): string => {
    return value.replace(/[^0-9,.-]/g, '')
  }

  // Filter for integers only (age fields)
  const filterIntegerInput = (value: string): string => {
    return value.replace(/[^0-9]/g, '')
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center p-4 bg-muted/30 rounded-xl border border-border">
      <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
        {/* Amount */}
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">
            Amount
          </label>
          <InputGroup
            type="text"
            prefix="$"
            value={entry.amount === 0 ? '' : entry.amount.toLocaleString('en-US')}
            onChange={(e) => {
              const filtered = filterNumericInput(e.target.value)
              onChange({ ...entry, amount: parseNumber(filtered) })
            }}
            className="h-9 text-sm"
            placeholder="10,000"
          />
        </div>

        {/* Frequency */}
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">
            Frequency
          </label>
          <Select
            value={entry.frequency}
            onValueChange={(value) =>
              onChange({
                ...entry,
                frequency: value as 'monthly' | 'annual',
              })
            }
          >
            <SelectTrigger className="h-9 text-sm bg-background">
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="annual">Annual</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Start Age */}
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">
            Start Age
          </label>
          <input
            type="text"
            value={entry.startAge === 0 ? '' : entry.startAge}
            onChange={(e) => {
              const filtered = filterIntegerInput(e.target.value)
              const num = filtered === '' ? 0 : Number(filtered)
              const clamped = Math.max(0, Math.min(100, num))
              onChange({ ...entry, startAge: clamped })
            }}
            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="40"
          />
        </div>

        {/* End Age */}
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">
            End Age
          </label>
          <input
            type="text"
            value={entry.endAge === 0 ? '' : entry.endAge}
            onChange={(e) => {
              const filtered = filterIntegerInput(e.target.value)
              const num = filtered === '' ? 0 : Number(filtered)
              const clamped = Math.max(0, Math.min(100, num))
              onChange({ ...entry, endAge: clamped })
            }}
            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="65"
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
