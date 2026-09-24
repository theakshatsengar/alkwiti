import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { RotateCcw, Database, Sun, Moon, Monitor } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/shell";
import { SectionCard } from "@/components/dashboard/primitives";
import { Button } from "@/components/ui/button";
import type { RangePreset } from "@/components/dashboard/date-range";
import { useFinance } from "@/lib/finance/store";
import { DEFAULT_CONFIG, resetConfig } from "@/lib/finance/config";
import { exchangeRateLabel } from "@/lib/finance/currency";
import type { CurrencyCode } from "@/lib/finance/types";
import { useTheme, type ThemeMode } from "@/lib/theme";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings · ALKWITI" }] }),
  component: SettingsPage,
});

/** A labelled numeric input that edits a percentage (stored as a 0..1 fraction). */
function PercentField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (fraction: number) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <div className="mt-1.5 flex items-center gap-2">
        <input
          type="number"
          min={0}
          max={100}
          step={0.5}
          value={Math.round(value * 1000) / 10}
          onChange={(e) => onChange((Number(e.target.value) || 0) / 100)}
          className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none ring-ring focus-visible:ring-2"
        />
        <span className="text-sm text-muted-foreground">%</span>
      </div>
    </label>
  );
}

function MoneyField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <div className="mt-1.5 flex items-center gap-2">
        <span className="text-sm text-muted-foreground">₹</span>
        <input
          type="number"
          min={0}
          step={1000}
          value={value}
          onChange={(e) => onChange(Number(e.target.value) || 0)}
          className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none ring-ring focus-visible:ring-2"
        />
      </div>
    </label>
  );
}

function TextField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none ring-ring focus-visible:ring-2"
      />
    </label>
  );
}

function SettingsPage() {
  const [preset, setPreset] = useState<RangePreset>("all");
  const { config, updateConfig, currency, setCurrency, source } = useFinance();
  const { mode, setMode } = useTheme();

  const resetAll = () => {
    resetConfig();
    updateConfig(() => DEFAULT_CONFIG);
    setCurrency(DEFAULT_CONFIG.currency.default);
  };

  return (
    <DashboardShell title="Settings" rangePreset={preset} onRangeChange={setPreset}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="max-w-2xl text-sm text-muted-foreground">
          These values drive every calculation. Nothing is hard-coded in the interface. Changes are
          saved to this browser.
        </p>
        <Button variant="outline" size="sm" onClick={resetAll}>
          <RotateCcw className="size-3.5" /> Reset defaults
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Founders */}
        <SectionCard title="Founders" description="Names and salary allocation rates">
          <div className="space-y-5">
            {config.founders.map((f, idx) => (
              <div key={f.id} className="grid gap-3 sm:grid-cols-2">
                <TextField
                  label={`Founder ${idx + 1} name`}
                  value={f.name}
                  onChange={(name) =>
                    updateConfig((prev) => {
                      const founders = [...prev.founders] as typeof prev.founders;
                      founders[idx] = { ...founders[idx]!, name };
                      return { ...prev, founders };
                    })
                  }
                />
                <PercentField
                  label="Salary allocation"
                  value={f.salaryRate}
                  onChange={(salaryRate) =>
                    updateConfig((prev) => {
                      const founders = [...prev.founders] as typeof prev.founders;
                      founders[idx] = { ...founders[idx]!, salaryRate };
                      return { ...prev, founders };
                    })
                  }
                />
              </div>
            ))}
          </div>
        </SectionCard>

        {/* China */}
        <SectionCard title="China industrial visit" description="Target and allocation">
          <div className="grid gap-3 sm:grid-cols-2">
            <MoneyField
              label="Target"
              value={config.china.target}
              onChange={(target) => updateConfig((p) => ({ ...p, china: { ...p.china, target } }))}
            />
            <PercentField
              label="Allocation"
              value={config.china.allocationRate}
              onChange={(allocationRate) =>
                updateConfig((p) => ({ ...p, china: { ...p.china, allocationRate } }))
              }
            />
          </div>
        </SectionCard>

        {/* Operational */}
        <SectionCard title="Operational expenses" description="Dynamic allocation, gated on China goal">
          <div className="grid gap-3 sm:grid-cols-2">
            <PercentField
              label="Before China"
              value={config.operational.rateBeforeChina}
              onChange={(rateBeforeChina) =>
                updateConfig((p) => ({
                  ...p,
                  operational: { ...p.operational, rateBeforeChina },
                }))
              }
            />
            <PercentField
              label="After China"
              value={config.operational.rateAfterChina}
              onChange={(rateAfterChina) =>
                updateConfig((p) => ({
                  ...p,
                  operational: { ...p.operational, rateAfterChina },
                }))
              }
            />
          </div>
        </SectionCard>

        {/* Dubai */}
        <SectionCard title="Dubai incorporation" description="Target and dynamic allocation">
          <div className="grid gap-3 sm:grid-cols-3">
            <MoneyField
              label="Target"
              value={config.dubai.target}
              onChange={(target) => updateConfig((p) => ({ ...p, dubai: { ...p.dubai, target } }))}
            />
            <PercentField
              label="Before China"
              value={config.dubai.rateBeforeChina}
              onChange={(rateBeforeChina) =>
                updateConfig((p) => ({ ...p, dubai: { ...p.dubai, rateBeforeChina } }))
              }
            />
            <PercentField
              label="After China"
              value={config.dubai.rateAfterChina}
              onChange={(rateAfterChina) =>
                updateConfig((p) => ({ ...p, dubai: { ...p.dubai, rateAfterChina } }))
              }
            />
          </div>
        </SectionCard>

        {/* Currency */}
        <SectionCard title="Currency" description="Display currency and exchange rate">
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-foreground">Default display currency</span>
              <select
                value={currency}
                onChange={(e) => {
                  const c = e.target.value as CurrencyCode;
                  setCurrency(c);
                  updateConfig((p) => ({ ...p, currency: { ...p.currency, default: c } }));
                }}
                className="mt-1.5 h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none ring-ring focus-visible:ring-2"
              >
                <option value="INR">₹ INR</option>
                <option value="USD">$ USD</option>
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-medium text-foreground">USD/INR rate</span>
              <div className="mt-1.5 flex items-center gap-2">
                <span className="text-sm text-muted-foreground">₹</span>
                <input
                  type="number"
                  min={1}
                  step={0.01}
                  value={config.currency.usdInrRate}
                  onChange={(e) =>
                    updateConfig((p) => ({
                      ...p,
                      currency: {
                        ...p.currency,
                        usdInrRate: Number(e.target.value) || p.currency.usdInrRate,
                        rateUpdatedAt: new Date().toISOString(),
                      },
                    }))
                  }
                  className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none ring-ring focus-visible:ring-2"
                />
              </div>
            </label>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">{exchangeRateLabel(config)}</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            INR is the source-of-truth currency. USD is a display conversion only — underlying
            values and history are never modified.
          </p>
        </SectionCard>

        {/* Appearance */}
        <SectionCard title="Appearance" description="Light, dark, or match your system">
          <div className="grid grid-cols-3 gap-2">
            {(
              [
                { value: "light", label: "Light", icon: Sun },
                { value: "dark", label: "Dark", icon: Moon },
                { value: "system", label: "System", icon: Monitor },
              ] as { value: ThemeMode; label: string; icon: typeof Sun }[]
            ).map((opt) => {
              const Icon = opt.icon;
              const active = mode === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setMode(opt.value)}
                  aria-pressed={active}
                  className={cn(
                    "flex flex-col items-center gap-2 rounded-xl border px-3 py-4 text-sm font-medium transition-colors",
                    active
                      ? "border-brand/40 bg-brand/[0.06] text-foreground"
                      : "border-border bg-background text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Icon className={cn("size-5", active && "text-brand")} strokeWidth={1.75} />
                  {opt.label}
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            The quick toggle in the header switches between light and dark. Choose System to follow
            your operating system automatically.
          </p>
        </SectionCard>

        {/* Data source */}
        <SectionCard title="Data source" description="Where financial records come from">
          <div className="flex items-start gap-3 rounded-xl border border-border bg-background p-3">
            <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground">
              <Database className="size-4" />
            </span>
            <div>
              <p className="text-sm font-medium text-foreground">
                {source.name}
                {source.isSample && (
                  <span className="ml-2 rounded-full bg-warning/15 px-2 py-0.5 text-xs font-medium text-warning-foreground">
                    Sample
                  </span>
                )}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                The dashboard reads invoices and expenses through a pluggable data-source layer. A
                live source (Google Sheets, Excel, an API, or an MCP connection) can be added later
                without changing the interface. No data is entered or invoiced inside the dashboard.
              </p>
            </div>
          </div>
        </SectionCard>
      </div>
    </DashboardShell>
  );
}
