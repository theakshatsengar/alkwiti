import {
  Menu,
  RefreshCw,
  Check,
  AlertCircle,
  Sun,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { useFinance } from "@/lib/finance/store";
import { useTheme } from "@/lib/theme";
import { exchangeRateLabel } from "@/lib/finance/currency";
import { RANGE_PRESETS, type RangePreset } from "./date-range";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function DashboardHeader({
  title,
  rangePreset,
  onRangeChange,
  onOpenSidebar,
  desktopCollapsed,
  onToggleDesktopSidebar,
}: {
  title: string;
  rangePreset: RangePreset;
  onRangeChange: (p: RangePreset) => void;
  onOpenSidebar: () => void;
  desktopCollapsed: boolean;
  onToggleDesktopSidebar: () => void;
}) {
  const { currency, setCurrency, config, loading, error, source, lastSyncedAt, refresh } =
    useFinance();
  const { resolved, toggle } = useTheme();

  return (
    <header className="flex flex-col gap-3 border-b border-border px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:gap-4">
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        {/* Mobile: open the drawer */}
        <Button
          variant="ghost"
          size="icon"
          className="size-8 shrink-0 lg:hidden"
          onClick={onOpenSidebar}
          aria-label="Open menu"
        >
          <Menu className="size-4" />
        </Button>

        {/* Desktop: collapse / expand the sidebar */}
        <Button
          variant="ghost"
          size="icon"
          className="hidden size-8 shrink-0 lg:inline-flex"
          onClick={onToggleDesktopSidebar}
          aria-label={desktopCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={desktopCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {desktopCollapsed ? (
            <PanelLeftOpen className="size-4 text-muted-foreground" strokeWidth={1.5} />
          ) : (
            <PanelLeftClose className="size-4 text-muted-foreground" strokeWidth={1.5} />
          )}
        </Button>

        {/* Breadcrumb: Workspace / Page */}
        <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-2 text-sm">
          <span className="hidden truncate text-muted-foreground sm:inline">ALKWITI</span>
          <span className="hidden text-muted-foreground sm:inline">/</span>
          <span className="truncate font-semibold text-foreground">{title}</span>
        </nav>
      </div>

      <div className="flex flex-wrap items-center gap-2 lg:ml-auto">
        {/* Sync status */}
        <div
          className="hidden items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground sm:flex"
          title={exchangeRateLabel(config)}
        >
          {error ? (
            <AlertCircle className="size-3.5 text-destructive" />
          ) : (
            <Check className="size-3.5 text-success" />
          )}
          <span>
            {source.isSample ? "Sample data" : source.name}
            {lastSyncedAt && !error
              ? ` · ${lastSyncedAt.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}`
              : ""}
          </span>
        </div>

        {/* Date range */}
        <select
          value={rangePreset}
          onChange={(e) => onRangeChange(e.target.value as RangePreset)}
          aria-label="Date range"
          className="h-9 rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none ring-ring focus-visible:ring-2"
        >
          {RANGE_PRESETS.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>

        {/* Currency toggle */}
        <div
          className="flex h-9 items-center rounded-lg border border-border bg-background p-0.5"
          role="group"
          aria-label="Display currency"
        >
          {(["INR", "USD"] as const).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCurrency(c)}
              className={cn(
                "h-8 rounded-md px-2.5 text-xs font-semibold transition-colors",
                currency === c
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {c === "INR" ? "₹ INR" : "$ USD"}
            </button>
          ))}
        </div>

        <Button
          variant="icon"
          size="icon"
          className="size-9"
          onClick={toggle}
          aria-label={resolved === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          title={resolved === "dark" ? "Light mode" : "Dark mode"}
        >
          {resolved === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </Button>

        <Button
          variant="icon"
          size="icon"
          className="size-9"
          onClick={refresh}
          aria-label="Refresh data"
          disabled={loading}
        >
          <RefreshCw className={cn("size-4", loading && "animate-spin")} />
        </Button>
      </div>
    </header>
  );
}
