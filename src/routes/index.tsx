import { createFileRoute } from "@tanstack/react-router";
import {
  CircleUserRound,
  Command,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../components/ui/button";
import {
  SidebarNav,
  allSidebarItems,
  flattenNavItems,
  type NavItemData,
} from "../components/ui/dashboard-sidebar";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Webhooks | Acme Corp" },
      { name: "description", content: "Manage Acme Corp developer webhooks." },
      { property: "og:title", content: "Webhooks | Acme Corp" },
      { property: "og:description", content: "Manage Acme Corp developer webhooks." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [activeId, setActiveId] = useState("webhooks");
  const [activeWorkspace, setActiveWorkspace] = useState("Acme Corp");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const activeItem = flattenNavItems(allSidebarItems).find((item) => item.id === activeId);
  const activeTitle = activeItem?.title ?? "Dashboard";

  const handleSelect = (item: NavItemData) => {
    if (item.id === "search") {
      setSearchOpen(true);
      return;
    }
    setActiveId(item.id);
    setMobileOpen(false);
  };

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
      if (event.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  return (
    <div className="min-h-screen bg-canvas p-2.5">
      <div className="flex min-h-[calc(100vh-1.25rem)] w-full overflow-hidden rounded-2xl border border-border bg-background">
        <div className={`hidden shrink-0 overflow-hidden transition-[width,opacity] duration-300 md:block ${desktopOpen ? "w-[276px] opacity-100" : "w-0 opacity-0"}`}>
          <SidebarNav activeId={activeId} onSelect={handleSelect} activeWorkspace={activeWorkspace} onWorkspaceSelect={setActiveWorkspace} />
        </div>

        {mobileOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setMobileOpen(false)} aria-hidden="true" />
            <div className="relative h-full shadow-2xl">
              <SidebarNav activeId={activeId} onSelect={handleSelect} activeWorkspace={activeWorkspace} onWorkspaceSelect={setActiveWorkspace} />
              <Button variant="icon" size="icon" className="absolute right-3 top-3 size-8" onClick={() => setMobileOpen(false)} aria-label="Close menu"><X className="size-4" /></Button>
            </div>
          </div>
        )}

        <main className="min-w-0 flex-1">
          <header className="grid h-[60px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b border-border px-4 sm:h-[64px] sm:px-6">
            <Button variant="ghost" size="icon" className="size-8 p-0 md:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu className="size-4" /></Button>
            <div className="hidden items-center gap-5 md:flex">
              <Button variant="ghost" size="icon" className="size-8 p-0" onClick={() => setDesktopOpen((open) => !open)} aria-label={desktopOpen ? "Collapse sidebar" : "Expand sidebar"}>
                {desktopOpen ? <PanelLeftClose className="size-4 text-muted-foreground" strokeWidth={1.5} /> : <PanelLeftOpen className="size-4 text-muted-foreground" strokeWidth={1.5} />}
              </Button>
              <div className="flex min-w-0 items-center gap-2 text-sm">
                <span className="truncate text-muted-foreground">{activeWorkspace}</span>
                <span className="text-muted-foreground">/</span>
                <span className="font-semibold text-foreground">{activeTitle}</span>
              </div>
            </div>
            <p className="min-w-0 truncate text-sm font-semibold md:hidden">{activeTitle}</p>
            <div className="flex items-center gap-3 sm:gap-4">
              <label className="relative hidden sm:block">
                <span className="sr-only">Search</span>
                <Command className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground opacity-0" />
                <input ref={searchRef} readOnly onClick={() => setSearchOpen(true)} aria-label="Search dashboard" className="h-9 w-[180px] cursor-pointer rounded-lg border-0 bg-input px-3 text-xs text-foreground outline-none ring-ring placeholder:text-muted-foreground focus:ring-1 lg:w-[272px]" />
              </label>
              <Button variant="icon" size="icon" aria-label="Account menu"><CircleUserRound className="size-4" strokeWidth={1.5} /></Button>
            </div>
          </header>

          <section aria-label="Webhook dashboard" className="px-4 py-7 sm:px-8 sm:py-9 lg:px-9">
            <div className="mb-8 h-9 w-[204px] max-w-[58%] animate-pulse rounded-lg bg-muted" />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
              <div className="aspect-[1.7/0.8] rounded-xl border border-border bg-card sm:aspect-[1.7/0.8]" />
              <div className="aspect-[1.7/0.8] rounded-xl border border-border bg-card" />
            </div>
            <div className="mt-6 rounded-xl border border-border bg-card px-4 py-6 sm:px-6 sm:py-7">
              <div className="h-5 w-48 max-w-[52%] animate-pulse rounded-md bg-muted" />
              <div className="my-6 h-px bg-border" />
              <div className="space-y-4">
                {[0, 1, 2, 3].map((row) => <div key={row} className="h-[52px] animate-pulse rounded-lg bg-muted" />)}
              </div>
            </div>
          </section>
        </main>

        {searchOpen && (
          <div className="absolute inset-0 z-[60] flex items-start justify-center bg-background/70 px-4 pt-[15vh] backdrop-blur-sm">
            <div className="absolute inset-0" onClick={() => setSearchOpen(false)} aria-hidden="true" />
            <div className="relative w-full max-w-xl overflow-hidden rounded-xl border border-border bg-card shadow-2xl" role="dialog" aria-modal="true" aria-label="Search dashboard">
              <div className="flex items-center border-b border-border px-4">
                <Search className="mr-3 size-[18px] shrink-0 text-muted-foreground" strokeWidth={1.5} />
                <input autoFocus className="flex-1 bg-transparent py-4 text-sm text-foreground outline-none placeholder:text-muted-foreground" placeholder="Search projects, docs, or actions..." />
                <kbd className="hidden rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline-flex">ESC</kbd>
                <Button variant="ghost" size="icon" className="ml-2 size-8" onClick={() => setSearchOpen(false)} aria-label="Close search"><X className="size-4" /></Button>
              </div>
              <div className="flex flex-col items-center justify-center py-8">
                <Command className="mb-2 size-6 text-muted-foreground/40" strokeWidth={1.5} />
                <p className="text-[13px] font-medium text-muted-foreground">Type a command or search...</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
