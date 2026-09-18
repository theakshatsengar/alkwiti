import { Moon, Sun } from "lucide-react";
import { Button } from "../components/ui/button";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="icon"
      size="icon"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? (
        <Sun className="size-4 stroke-[1.5]" strokeWidth={1.5} />
      ) : (
        <Moon className="size-4 stroke-[1.5]" strokeWidth={1.5} />
      )}
    </Button>
  );
}