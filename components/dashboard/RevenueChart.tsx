
'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const RevenueChart = ({ data }: { data: { date: string; revenue: number }[] }) => (
  <div className="rounded-md border border-border bg-card p-5">
    <h3 className="font-heading text-lg text-card-foreground">Revenue, last 7 days</h3>
    <ChartContainer config={chartConfig} className="mt-4 h-64 w-full">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="date" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} />
        <ChartTooltip
          content={<ChartTooltipContent formatter={(value) => `KSh ${value}`} />}
        />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="var(--color-revenue)"
          strokeWidth={2}
          dot={{ fill: "var(--color-revenue)", r: 3 }}
        />
      </LineChart>
    </ChartContainer>
  </div>
);

export default RevenueChart;