
'use client';

import { BarChart, Bar, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartConfig = {
  quantity: { label: "Sold", color: "var(--chart-1)" },
} satisfies ChartConfig;

const TopItemsChart = ({ data }: { data: { name: string; quantity: number }[] }) => {
  if (data.length === 0) {
    return (
      <div className="rounded-md border border-border bg-card p-5 lg:col-span-2">
        <h3 className="font-heading text-lg text-card-foreground">Top sellers</h3>
        <p className="mt-8 text-center text-sm text-muted-foreground">No orders yet.</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border border-border bg-card p-5 lg:col-span-2">
      <h3 className="font-heading text-lg text-card-foreground">Top sellers</h3>
      <ChartContainer config={chartConfig} className="mt-4 h-64 w-full">
        <BarChart data={data} layout="vertical" margin={{ left: 12 }}>
          <XAxis type="number" hide />
          <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} width={120} />
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          <Bar dataKey="quantity" fill="var(--color-quantity)" radius={[0, 6, 6, 0]} barSize={18} />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default TopItemsChart;