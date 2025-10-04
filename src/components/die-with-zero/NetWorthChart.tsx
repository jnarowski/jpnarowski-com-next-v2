'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import type { YearlySnapshot } from '@/lib/die-with-zero-calculator'

interface NetWorthChartProps {
  data: YearlySnapshot[]
}

export function NetWorthChart({ data }: NetWorthChartProps) {
  if (data.length === 0) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-muted/20 rounded-2xl border border-border">
        <p className="text-muted-foreground">
          Add income and expenses to see your projection
        </p>
      </div>
    )
  }

  // Format currency for display
  const formatCurrency = (value: number) => {
    const absValue = Math.abs(value)
    if (absValue >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`
    }
    if (absValue >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`
    }
    return `$${value.toFixed(0)}`
  }

  // Custom tooltip
  interface TooltipProps {
    active?: boolean
    payload?: Array<{
      payload: {
        age: number
        year: number
        netWorth: number
      }
    }>
  }

  const CustomTooltip = ({ active, payload }: TooltipProps) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium mb-1">Age {data.age}</p>
          <p className="text-sm text-muted-foreground">
            Year {data.year}
          </p>
          <p className={`text-lg font-bold ${data.netWorth >= 0 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
            {formatCurrency(data.netWorth)}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="age"
            stroke="hsl(var(--muted-foreground))"
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            label={{
              value: 'Age',
              position: 'insideBottom',
              offset: -10,
              style: { fill: 'hsl(var(--muted-foreground))' },
            }}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            tickFormatter={formatCurrency}
            label={{
              value: 'Net Worth',
              angle: -90,
              position: 'insideLeft',
              style: { fill: 'hsl(var(--muted-foreground))' },
            }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--muted))' }} />
          <Bar dataKey="netWorth" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.netWorth >= 0 ? 'hsl(142 76% 36%)' : 'hsl(0 72% 51%)'}
                className={entry.netWorth >= 0 ? 'fill-green-600 dark:fill-green-500' : 'fill-red-600 dark:fill-red-500'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
