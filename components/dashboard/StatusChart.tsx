
'use client';

import { PieChart, Pie, Cell } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartConfig = {
  pending: { label: "Pending", color: "var(--chart-3)" },
  paid: { label: "Paid", color: "var(--chart-2)" },
  preparing: { label: "Preparing", color: "var(--chart-2)" },
  ready: { label: "Ready", color: "var(--chart-1)" },
  completed: { label: "Completed", color: "var(--chart-1)" },
  cancelled: { label: "Cancelled", color: "var(--destructive)" },
} satisfies ChartConfig;

const StatusChart = ({ data }: { data: { status: string; count: number }[] }) => {
  if (data.length === 0) {
    return (
      <div className="rounded-md border border-border bg-card p-5">
        <h3 className="font-heading text-lg text-card-foreground">Orders by status</h3>
        <p className="mt-8 text-center text-sm text-muted-foreground">No orders yet.</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border border-border bg-card p-5">
      <h3 className="font-heading text-lg text-card-foreground">Orders by status</h3>
      <ChartContainer config={chartConfig} className="mt-2 h-64 w-full">
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          <Pie data={data} dataKey="count" nameKey="status" innerRadius={55} outerRadius={85} paddingAngle={2}>
            {data.map((entry) => (
              <Cell
                key={entry.status}
                fill={chartConfig[entry.status as keyof typeof chartConfig]?.color ?? "var(--chart-4)"}
              />
            ))}
          </Pie>
          <ChartLegend content={<ChartLegendContent />} />
        </PieChart>
      </ChartContainer>
    </div>
  );
};

export default StatusChart;