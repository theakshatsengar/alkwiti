import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { bucketize } from "@/lib/finance/engine";
import { convert, currencySymbol } from "@/lib/finance/currency";
import { useFinance } from "@/lib/finance/store";
import type { Granularity, InvoiceRecord, ExpenseRecord } from "@/lib/finance/types";
import { cn } from "@/lib/utils";

function GranularityToggle({
  value,
  onChange,
}: {
  value: Granularity;
  onChange: (g: Granularity) => void;
}) {
  return (
    <div className="flex items-center rounded-lg border border-border bg-background p-0.5">
      {(["weekly", "monthly"] as const).map((g) => (
        <button
          key={g}
          type="button"
          onClick={() => onChange(g)}
          className={cn(
            "h-7 rounded-md px-3 text-xs font-medium capitalize transition-colors",
            value === g
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {g}
        </button>
      ))}
    </div>
  );
}

export function RevenueChart({
  invoices,
  expenses,
  defaultGranularity = "monthly",
}: {
  invoices: InvoiceRecord[];
  expenses: ExpenseRecord[];
  defaultGranularity?: Granularity;
}) {
  const { currency, config } = useFinance();
  const [granularity, setGranularity] = useState<Granularity>(defaultGranularity);
  const rate = config.currency.usdInrRate;

  const data = useMemo(() => {
    return bucketize(invoices, expenses, granularity).map((b) => ({
      label: b.label,
      revenue: convert(b.alkwitiRevenue, currency, rate),
      product: convert(b.productSalesValue, currency, rate),
      order: convert(b.grossOrderValue, currency, rate),
    }));
  }, [invoices, expenses, granularity, currency, rate]);

  const sym = currencySymbol(currency);
  const fmtAxis = (v: number) =>
    `${sym}${new Intl.NumberFormat(currency === "INR" ? "en-IN" : "en-US", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(v)}`;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-foreground">Revenue trend</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Product value → order value → ALKWITI revenue
          </p>
        </div>
        <GranularityToggle value={granularity} onChange={setGranularity} />
      </div>

      <ResponsiveContainer width="100%" height={288}>
        <ComposedChart data={data} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
          <defs>
            <linearGradient id="fillOrder" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-chart-2)" stopOpacity={0.18} />
              <stop offset="100%" stopColor="var(--color-chart-2)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="fillProduct" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-chart-3)" stopOpacity={0.18} />
              <stop offset="100%" stopColor="var(--color-chart-3)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="var(--color-border)" />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }}
            minTickGap={16}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            width={64}
            tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }}
            tickFormatter={fmtAxis}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: "1px solid var(--color-border)",
              background: "var(--color-card)",
              fontSize: 12,
            }}
            formatter={(value: number, name) => [
              `${sym}${new Intl.NumberFormat(currency === "INR" ? "en-IN" : "en-US", {
                maximumFractionDigits: currency === "INR" ? 0 : 2,
              }).format(value)}`,
              name,
            ]}
          />
          <Legend
            verticalAlign="top"
            align="right"
            height={28}
            iconType="circle"
            wrapperStyle={{ fontSize: 12 }}
          />
          <Area
            type="monotone"
            dataKey="order"
            name="Gross order value"
            stroke="var(--color-chart-2)"
            fill="url(#fillOrder)"
            strokeWidth={1.5}
          />
          <Area
            type="monotone"
            dataKey="product"
            name="Product sales value"
            stroke="var(--color-chart-3)"
            fill="url(#fillProduct)"
            strokeWidth={1.5}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            name="ALKWITI revenue"
            stroke="var(--color-brand)"
            strokeWidth={2.5}
            dot={{ r: 2.5, fill: "var(--color-brand)" }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
