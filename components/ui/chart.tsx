'use client';

import * as React from "react";
import * as RechartsPrimitive from "recharts";
import { cn } from "@/lib/utils";

import type { TooltipProps } from "recharts";
import type { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";
import type { LegendProps } from "recharts";


export type ChartConfig = {
  [k: string]: {
    label?: React.ReactNode;
    color?: string;
  };
};

type ChartContextProps = { config: ChartConfig };
const ChartContext = React.createContext<ChartContextProps | null>(null);

type RechartTooltipEntry = {
  dataKey?: string | number;
  name?: string;
  color?: string;
  value?: string | number | Array<string | number> | undefined;
  payload?: Record<string, any>;
};

type ChartTooltipContentProps = {
  active?: boolean;
  payload?: RechartTooltipEntry[];
  className?: string;
  indicator?: "line" | "dot" | "dashed";
  hideLabel?: boolean;
  label?: React.ReactNode;
  labelFormatter?: (label: React.ReactNode, payload: RechartTooltipEntry[]) => React.ReactNode;
  formatter?: (value: any, name: any, item: RechartTooltipEntry, index: number, payload: Record<string, any>) => React.ReactNode;
};

type ChartLegendContentProps = {
  payload?: RechartTooltipEntry[];
};

function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) throw new Error("useChart must be used within a ChartContainer");
  return context;
}

function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}: React.ComponentProps<"div"> & {
  config: ChartConfig;
  children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"];
}) {
  const uniqueId = React.useId();
  const chartId = `chart-${id ?? uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line]:stroke-border/50 flex aspect-video justify-center text-xs",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

function ChartStyle({ id, config }: { id: string; config: ChartConfig }) {
  const colorConfig = Object.entries(config).filter(([, cfg]) => cfg.color);
  if (!colorConfig.length) return null;

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `[data-chart="${id}"] { ${colorConfig
          .map(([key, cfg]) => `--color-${key}: ${cfg.color};`)
          .join(" ")} }`,
      }}
    />
  );
}

const ChartTooltip = RechartsPrimitive.Tooltip;


function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  label,
  labelFormatter,
  formatter,
}: ChartTooltipContentProps) {
  const { config } = useChart();
  if (!active || !payload?.length) return null;

  return (
    <div className={cn("border-border/50 bg-background grid min-w-[10rem] gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl", className)}>
      {!hideLabel && (
        <p className="font-medium text-foreground">
          {labelFormatter ? labelFormatter(label, payload) : label}
        </p>
      )}
      <div className="grid gap-1.5">
        {payload.map((item: RechartTooltipEntry, i: number) => {
          const key = String(item.dataKey ?? item.name ?? i);
          const itemConfig = config[key];
          const color = item.color;
          return (
            <div key={i} className="flex w-full items-center gap-2">
              {!formatter && (
                <div
                  className={cn(
                    "shrink-0 rounded-md",
                    indicator === "dot" && "h-2.5 w-2.5",
                    indicator === "line" && "w-1 h-2.5",
                    indicator === "dashed" && "w-0 border-[1.5px] border-dashed h-2.5"
                  )}
                  style={{ backgroundColor: color, borderColor: color }}
                />
              )}
              <div className="flex flex-1 justify-between leading-none">
                <span className="text-muted-foreground">{itemConfig?.label ?? item.name}</span>
                <span className="font-mono font-medium text-foreground">
                  {formatter ? formatter(item.value, item.name, item, i, item.payload ?? {}) : item.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const ChartLegend = RechartsPrimitive.Legend;


function ChartLegendContent({ payload }: ChartLegendContentProps) {
  const { config } = useChart();
  if (!payload?.length) return null;

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
      {payload.map((item, index: number) => {
        const key = (item.dataKey as string) ?? (item.value as string) ?? String(index);
        const configKey = (item.value as string) ?? key;
        const itemConfig = config[configKey] ?? config[key];
        return (
          <div key={`${key}-${index}`} className="flex items-center gap-1.5">
            <div className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-xs capitalize text-muted-foreground">{itemConfig?.label ?? item.value}</span>
          </div>
        );
      })}
    </div>
  );
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
};