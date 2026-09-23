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
import { dedupeInvoices, type FinanceDataSource } from "./data-source";
import { SampleDataSource } from "./sample-data";
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

// Single place a real data source would be swapped in.
const dataSource: FinanceDataSource = new SampleDataSource();

export function FinanceProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<FinanceConfig>(DEFAULT_CONFIG);
  const [currency, setCurrency] = useState<CurrencyCode>(DEFAULT_CONFIG.currency.default);
  const [invoices, setInvoices] = useState<InvoiceRecord[]>([]);
  const [expenses, setExpenses] = useState<ExpenseRecord[]>([]);
  const [salaryPayments, setSalaryPayments] = useState<SalaryPayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
    Promise.all([
      dataSource.getInvoices(),
      dataSource.getExpenses(),
      dataSource.getSalaryPayments(),
    ])
      .then(([inv, exp, pay]) => {
        if (cancelled) return;
        setInvoices(dedupeInvoices(inv));
        setExpenses(exp);
        setSalaryPayments(pay);
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
      source: { name: dataSource.name, isSample: dataSource.isSample },
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
