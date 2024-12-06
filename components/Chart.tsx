"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export interface ChartData {
  month: string;
  payments: number;
  expenses: number;
}

interface Props {
  chartData: ChartData[];
}

const chartConfig = {
  payments: {
    label: "Payments",
    color: "#7F00FF",
  },
  expenses: {
    label: "Expenses",
    color: "#FF0000",
  },
};

export const ChartComponent: React.FC<Props> = ({ chartData }) => {
  return (
    <ChartContainer config={chartConfig} className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Bar
            dataKey="payments"
            fill="var(--color-payments)"
            radius={[4, 4, 0, 0]}
            label={{
              position: "top",
              fill: "hsl(var(--foreground))",
              fontSize: 12,
            }}
          />
          <Bar
            dataKey="expenses"
            fill="var(--color-expenses)"
            radius={[4, 4, 0, 0]}
            label={{
              position: "top",
              fill: "hsl(var(--foreground))",
              fontSize: 12,
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
