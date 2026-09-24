import type { FinanceConfig } from "./types";

/**
 * Default business rules straight from the ALKWITI mega prompt.
 * These are DEFAULTS only — every value is editable in Settings and persisted.
 */
export const DEFAULT_CONFIG: FinanceConfig = {
  founders: [
    { id: "shashank", name: "Shashank Space", salaryRate: 0.15 },
    { id: "mithrha", name: "Mithrha Ramakrishnan", salaryRate: 0.15 },
  ],
  china: {
    target: 250000,
    allocationRate: 0.4,
  },
  operational: {
    rateBeforeChina: 0.2,
    rateAfterChina: 0.3,
  },
  dubai: {
    target: 500000,
    rateBeforeChina: 0.1,
    rateAfterChina: 0.4,
  },
  currency: {
    default: "INR",
    usdInrRate: 83.5,
    rateUpdatedAt: "2026-09-23T00:00:00.000Z",
  },
};

const STORAGE_KEY = "alkwiti.finance.config.v1";

/** Deep-merge persisted config over defaults so new fields survive upgrades. */
function mergeConfig(base: FinanceConfig, patch: Partial<FinanceConfig> | null): FinanceConfig {
  if (!patch) return base;
  return {
    founders: (patch.founders ?? base.founders) as FinanceConfig["founders"],
    china: { ...base.china, ...patch.china },
    operational: { ...base.operational, ...patch.operational },
    dubai: { ...base.dubai, ...patch.dubai },
    currency: { ...base.currency, ...patch.currency },
  };
}

export function loadConfig(): FinanceConfig {
  if (typeof window === "undefined") return DEFAULT_CONFIG;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CONFIG;
    return mergeConfig(DEFAULT_CONFIG, JSON.parse(raw) as Partial<FinanceConfig>);
  } catch {
    return DEFAULT_CONFIG;
  }
}

export function saveConfig(config: FinanceConfig): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch {
    /* storage full or unavailable — ignore, config stays in memory */
  }
}

export function resetConfig(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}
