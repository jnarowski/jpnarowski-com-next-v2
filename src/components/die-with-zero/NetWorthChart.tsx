"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell } from "recharts";
import type { YearlySnapshot } from "@/lib/die-with-zero-calculator";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

interface NetWorthChartProps {
  data: YearlySnapshot[];
}

const chartConfig = {
  netWorth: {
    label: "Net Worth",
  },
} satisfies ChartConfig;

export function NetWorthChart({ data }: NetWorthChartProps) {
  if (data.length === 0) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-muted/20 rounded-2xl border border-border">
        <p className="text-muted-foreground">
          Add income and expenses to see your projection
        </p>
      </div>
    );
  }

  // Format currency for display
  const formatCurrency = (value: number) => {
    const absValue = Math.abs(value);
    if (absValue >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    if (absValue >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value.toFixed(0)}`;
  };

  return (
    <ChartContainer config={chartConfig} className="h-[400px] w-full">
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="age"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          label={{
            value: "Age",
            position: "insideBottom",
            fontSize: 12,
            fontWeight: 700,
            offset: -15,
          }}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={formatCurrency}
          label={{
            value: "Net Worth",
            angle: -90,
            fontSize: 12,
            fontWeight: 700,
            position: "insideLeft",
            offset: -15,
          }}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              labelFormatter={(_, payload) => {
                if (payload?.[0]?.payload) {
                  const data = payload[0].payload as YearlySnapshot;
                  return `Age ${data.age} (${data.year})`;
                }
                return "";
              }}
              formatter={(value) => formatCurrency(value as number)}
            />
          }
        />
        <Bar dataKey="netWorth" radius={[4, 4, 0, 0]}>
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.netWorth >= 0 ? "hsl(142 76% 36%)" : "hsl(0 72% 51%)"}
            />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
