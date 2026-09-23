import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { useFinance } from "@/lib/finance/store";
import { formatMoney } from "@/lib/finance/currency";
import type { KpiDelta } from "@/lib/finance/types";
import { cn } from "@/lib/utils";

/** Hook: format an INR-base amount in the active display currency. */
export function useMoney() {
  const { currency, config } = useFinance();
  return (inr: number, opts?: { compact?: boolean; decimals?: number }) =>
    formatMoney(inr, currency, config.currency.usdInrRate, opts);
}

export function DeltaBadge({
  delta,
  invert = false,
}: {
  delta: KpiDelta;
  /** When true, a decrease is "good" (green) — e.g. expenses. */
  invert?: boolean;
}) {
  if (delta.changePct === null) {
    return <span className="text-xs text-muted-foreground">no prior period</span>;
  }
  const up = delta.change >= 0;
  const good = invert ? !up : up;
  const Icon = up ? ArrowUpRight : ArrowDownRight;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 text-xs font-medium",
        good ? "text-success" : "text-destructive",
      )}
    >
      <Icon className="size-3.5" />
      {Math.abs(delta.changePct * 100).toFixed(1)}%
    </span>
  );
}

export function KpiCard({
  label,
  amountInr,
  icon: Icon,
  delta,
  invertDelta = false,
  accent = false,
  compact = false,
}: {
  label: string;
  amountInr: number;
  icon: LucideIcon;
  delta?: KpiDelta | undefined;
  invertDelta?: boolean;
  accent?: boolean;
  compact?: boolean;
}) {
  const money = useMoney();
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card p-4 transition-shadow hover:shadow-[0_20px_50px_-24px_rgba(17,17,17,0.28)] sm:p-5",
        accent && "border-brand/30 bg-brand/[0.04]",
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
        <span
          className={cn(
            "grid size-8 place-items-center rounded-lg",
            accent ? "bg-brand/15 text-brand" : "bg-muted text-muted-foreground",
          )}
        >
          <Icon className="size-4" strokeWidth={1.75} />
        </span>
      </div>
      <p className="mt-3 text-2xl font-semibold tracking-tight text-foreground tabular-nums">
        {money(amountInr, { compact })}
      </p>
      {delta && (
        <div className="mt-1.5 flex items-center gap-1.5">
          <DeltaBadge delta={delta} invert={invertDelta} />
          <span className="text-xs text-muted-foreground">vs prev.</span>
        </div>
      )}
    </div>
  );
}

/** Branded progress bar with label + values. */
export function GoalBar({
  value,
  tone = "brand",
}: {
  /** 0..1 */
  value: number;
  tone?: "brand" | "success" | "warning" | "destructive";
}) {
  const pct = Math.max(0, Math.min(1, value)) * 100;
  const bg =
    tone === "success"
      ? "bg-success"
      : tone === "warning"
        ? "bg-warning"
        : tone === "destructive"
          ? "bg-destructive"
          : "bg-brand";
  return (
    <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
      <div
        className={cn("h-full rounded-full transition-[width] duration-500", bg)}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export function SectionCard({
  title,
  description,
  action,
  children,
  className,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("rounded-2xl border border-border bg-card p-4 sm:p-6", className)}>
      {(title || action) && (
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            {title && <h2 className="text-base font-semibold text-foreground">{title}</h2>}
            {description && <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}
