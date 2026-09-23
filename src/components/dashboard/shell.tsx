import { useState, type ReactNode } from "react";
import { X } from "lucide-react";
import { Sidebar } from "./sidebar";
import { DashboardHeader } from "./header";
import { type RangePreset } from "./date-range";
import { Button } from "@/components/ui/button";

export function DashboardShell({
  title,
  rangePreset,
  onRangeChange,
  children,
}: {
  title: string;
  rangePreset: RangePreset;
  onRangeChange: (p: RangePreset) => void;
  children: ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="h-screen overflow-hidden bg-canvas p-2 sm:p-2.5">
      <div className="relative flex h-full w-full overflow-hidden rounded-2xl border border-border bg-background">
        {/* Desktop sidebar */}
        <div className="hidden shrink-0 lg:block">
          <Sidebar />
        </div>

        {/* Mobile sidebar */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <div
              className="absolute inset-0 bg-foreground/30 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            <div className="relative h-full shadow-2xl">
              <Sidebar onNavigate={() => setMobileOpen(false)} />
              <Button
                variant="icon"
                size="icon"
                className="absolute right-3 top-3 size-8"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X className="size-4" />
              </Button>
            </div>
          </div>
        )}

        <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <DashboardHeader
            title={title}
            rangePreset={rangePreset}
            onRangeChange={onRangeChange}
            onOpenSidebar={() => setMobileOpen(true)}
          />
          <div className="min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-6 sm:py-7 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
