import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Wallet, Package, ShoppingCart } from "lucide-react";
import { format, parseISO } from "date-fns";
import { DashboardShell } from "@/components/dashboard/shell";
import { KpiCard, SectionCard, useMoney } from "@/components/dashboard/primitives";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { usePeriodData } from "@/components/dashboard/use-period-data";
import type { RangePreset } from "@/components/dashboard/date-range";
import { bucketize } from "@/lib/finance/engine";
import type { Granularity } from "@/lib/finance/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/revenue")({
  head: () => ({ meta: [{ title: "Revenue · ALKWITI" }] }),
  component: RevenuePage,
});

const PAYMENT_TONE: Record<string, string> = {
  paid: "bg-success/12 text-success",
  partial: "bg-warning/15 text-warning-foreground",
  pending: "bg-muted text-muted-foreground",
  unknown: "bg-muted text-muted-foreground",
};

function RevenuePage() {
  const [preset, setPreset] = useState<RangePreset>("all");
  const [granularity, setGranularity] = useState<Granularity>("monthly");
  const data = usePeriodData(preset);
  const money = useMoney();

  const buckets = [...bucketize(data.currentInvoices, data.currentExpenses, granularity)].reverse();

  const invoicesSorted = [...data.currentInvoices].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <DashboardShell title="Revenue" rangePreset={preset} onRangeChange={setPreset}>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
        <KpiCard
          label="ALKWITI Revenue"
          amountInr={data.totals.alkwitiRevenue}
          icon={Wallet}
          delta={data.hasPrevious ? data.deltas.alkwitiRevenue : undefined}
          accent
        />
        <KpiCard
          label="Product Sales Value"
          amountInr={data.totals.productSalesValue}
          icon={Package}
          delta={data.hasPrevious ? data.deltas.productSalesValue : undefined}
        />
        <KpiCard
          label="Gross Order Value"
          amountInr={data.totals.grossOrderValue}
          icon={ShoppingCart}
          delta={data.hasPrevious ? data.deltas.grossOrderValue : undefined}
        />
      </div>

      <SectionCard title="" className="mt-4">
        <RevenueChart invoices={data.currentInvoices} expenses={data.currentExpenses} />
      </SectionCard>

      {/* Period breakdown */}
      <SectionCard
        title="Period breakdown"
        description="Compare revenue across periods"
        className="mt-4"
        action={
          <div className="flex items-center rounded-lg border border-border bg-background p-0.5">
            {(["weekly", "monthly"] as const).map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setGranularity(g)}
                className={cn(
                  "h-7 rounded-md px-3 text-xs font-medium capitalize transition-colors",
                  granularity === g
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {g}
              </button>
            ))}
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted-foreground">
                <th className="pb-2 font-medium">Period</th>
                <th className="pb-2 text-right font-medium">Product value</th>
                <th className="pb-2 text-right font-medium">Order value</th>
                <th className="pb-2 text-right font-medium">ALKWITI revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {buckets.map((b) => (
                <tr key={b.key}>
                  <td className="py-2.5 font-medium text-foreground">{b.label}</td>
                  <td className="py-2.5 text-right tabular-nums text-muted-foreground">
                    {money(b.productSalesValue, { compact: true })}
                  </td>
                  <td className="py-2.5 text-right tabular-nums text-muted-foreground">
                    {money(b.grossOrderValue, { compact: true })}
                  </td>
                  <td className="py-2.5 text-right font-semibold tabular-nums text-brand">
                    {money(b.alkwitiRevenue)}
                  </td>
                </tr>
              ))}
              {buckets.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-4 text-center text-muted-foreground">
                    No revenue in this range.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {/* Invoice ledger */}
      <SectionCard
        title="Invoice & order records"
        description="Imported from the connected data source"
        className="mt-4"
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted-foreground">
                <th className="pb-2 font-medium">Reference</th>
                <th className="pb-2 font-medium">Date</th>
                <th className="pb-2 font-medium">Customer</th>
                <th className="pb-2 font-medium">Product</th>
                <th className="pb-2 text-right font-medium">Product value</th>
                <th className="pb-2 text-right font-medium">Order value</th>
                <th className="pb-2 text-right font-medium">Revenue</th>
                <th className="pb-2 text-center font-medium">Payment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {invoicesSorted.map((i) => (
                <tr key={i.id}>
                  <td className="py-2.5 font-mono text-xs text-muted-foreground">{i.reference}</td>
                  <td className="py-2.5 whitespace-nowrap text-muted-foreground">
                    {format(parseISO(i.date), "d MMM yy")}
                  </td>
                  <td className="py-2.5">
                    <span className="font-medium text-foreground">{i.customer}</span>
                    {i.customerCountry && (
                      <span className="ml-1 text-xs text-muted-foreground">
                        · {i.customerCountry}
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 text-muted-foreground">{i.product}</td>
                  <td className="py-2.5 text-right tabular-nums text-muted-foreground">
                    {money(i.productSalesValue, { compact: true })}
                  </td>
                  <td className="py-2.5 text-right tabular-nums text-muted-foreground">
                    {money(i.grossOrderValue, { compact: true })}
                  </td>
                  <td className="py-2.5 text-right font-semibold tabular-nums text-foreground">
                    {money(i.alkwitiRevenue)}
                  </td>
                  <td className="py-2.5 text-center">
                    <span
                      className={cn(
                        "inline-flex rounded-full px-2 py-0.5 text-xs font-medium capitalize",
                        PAYMENT_TONE[i.paymentStatus],
                      )}
                    >
                      {i.paymentStatus}
                    </span>
                  </td>
                </tr>
              ))}
              {invoicesSorted.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-4 text-center text-muted-foreground">
                    No invoices in this range.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </DashboardShell>
  );
}
