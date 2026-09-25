import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { DEFAULT_CONFIG, loadConfig, saveConfig } from "./config";
import { dedupeInvoices } from "./data-source";
import { fetchFinanceData } from "./server";
import type {
  CurrencyCode,
  ExpenseRecord,
  FinanceConfig,
  InvoiceRecord,
  SalaryPayment,
} from "./types";

interface FinanceState {
  config: FinanceConfig;
  updateConfig: (patch: Partial<FinanceConfig> | ((prev: FinanceConfig) => FinanceConfig)) => void;

  /** Active display currency (mirrors config.currency.default but toggled live). */
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;

  invoices: InvoiceRecord[];
  expenses: ExpenseRecord[];
  salaryPayments: SalaryPayment[];

  loading: boolean;
  error: string | null;
  source: { name: string; isSample: boolean };
  lastSyncedAt: Date | null;
  refresh: () => void;
}

const FinanceContext = createContext<FinanceState | null>(null);

export function FinanceProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<FinanceConfig>(DEFAULT_CONFIG);
  const [currency, setCurrency] = useState<CurrencyCode>(DEFAULT_CONFIG.currency.default);
  const [invoices, setInvoices] = useState<InvoiceRecord[]>([]);
  const [expenses, setExpenses] = useState<ExpenseRecord[]>([]);
  const [salaryPayments, setSalaryPayments] = useState<SalaryPayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<{ name: string; isSample: boolean }>({
    name: "Sample data",
    isSample: true,
  });
  const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(null);

  // Hydrate persisted config on the client (SSR-safe).
  useEffect(() => {
    const stored = loadConfig();
    setConfig(stored);
    setCurrency(stored.currency.default);
  }, []);

  const refresh = useCallback(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchFinanceData()
      .then((payload) => {
        if (cancelled) return;
        setInvoices(dedupeInvoices(payload.invoices));
        setExpenses(payload.expenses);
        setSalaryPayments(payload.salaryPayments);
        setSource(payload.source);
        setError(payload.warning ?? null);
        setLastSyncedAt(new Date());
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : "Failed to load financial data");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const cleanup = refresh();
    return cleanup;
  }, [refresh]);

  const updateConfig = useCallback<FinanceState["updateConfig"]>((patch) => {
    setConfig((prev) => {
      const next = typeof patch === "function" ? patch(prev) : { ...prev, ...patch };
      saveConfig(next);
      return next;
    });
  }, []);

  const value = useMemo<FinanceState>(
    () => ({
      config,
      updateConfig,
      currency,
      setCurrency,
      invoices,
      expenses,
      salaryPayments,
      loading,
      error,
      source,
      lastSyncedAt,
      refresh,
    }),
    [
      config,
      updateConfig,
      currency,
      invoices,
      expenses,
      salaryPayments,
      loading,
      error,
      source,
      lastSyncedAt,
      refresh,
    ],
  );

  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>;
}

export function useFinance(): FinanceState {
  const ctx = useContext(FinanceContext);
  if (!ctx) throw new Error("useFinance must be used within a FinanceProvider");
  return ctx;
}
