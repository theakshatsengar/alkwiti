import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type ThemeMode = "light" | "dark" | "system";
/** The resolved theme actually applied to the document. */
export type ResolvedTheme = "light" | "dark";

const STORAGE_KEY = "alkwiti.theme.v1";

interface ThemeState {
  /** The user's preference (may be "system"). */
  mode: ThemeMode;
  /** The concrete theme currently applied. */
  resolved: ResolvedTheme;
  setMode: (mode: ThemeMode) => void;
  /** Convenience toggle between light and dark (ignores system). */
  toggle: () => void;
}

const ThemeContext = createContext<ThemeState | null>(null);

function systemPrefersDark(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function resolve(mode: ThemeMode): ResolvedTheme {
  if (mode === "system") return systemPrefersDark() ? "dark" : "light";
  return mode;
}

/** Apply/remove the `.dark` class the design tokens key off of. */
function applyTheme(resolved: ResolvedTheme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.toggle("dark", resolved === "dark");
  root.style.colorScheme = resolved;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>("light");
  const [resolved, setResolved] = useState<ResolvedTheme>("light");

  // Hydrate the stored preference on the client (SSR renders light).
  useEffect(() => {
    let stored: ThemeMode = "light";
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
      if (raw === "light" || raw === "dark" || raw === "system") stored = raw;
    } catch {
      /* ignore */
    }
    setModeState(stored);
    const r = resolve(stored);
    setResolved(r);
    applyTheme(r);
  }, []);

  // Follow the OS when in "system" mode.
  useEffect(() => {
    if (mode !== "system" || typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      const r = resolve("system");
      setResolved(r);
      applyTheme(r);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [mode]);

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next);
    const r = resolve(next);
    setResolved(r);
    applyTheme(r);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = useCallback(() => {
    setMode(resolve(mode) === "dark" ? "light" : "dark");
  }, [mode, setMode]);

  const value = useMemo<ThemeState>(
    () => ({ mode, resolved, setMode, toggle }),
    [mode, resolved, setMode, toggle],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeState {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
