import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  Boxes,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  CircleUserRound,
  Command,
  CreditCard,
  Grid2X2,
  Inbox,
  KeyRound,
  LogOut,
  Menu,
  PanelLeftClose,
  Search,
  Settings,
  UsersRound,
  Webhook,
  X,
} from "lucide-react";
import { useRef, useState, type ComponentType } from "react";
import { Button } from "../components/ui/button";

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

type NavItem = {
  label: string;
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  badge?: string;
  chevron?: boolean;
};

const mainItems: NavItem[] = [
  { label: "Home", icon: Grid2X2 },
  { label: "Inbox", icon: Inbox, badge: "12" },
  { label: "Analytics", icon: Activity },
];

const workspaceItems: NavItem[] = [
  { label: "Projects", icon: Boxes, chevron: true },
  { label: "Calendar", icon: CalendarDays },
  { label: "Team", icon: UsersRound, chevron: true },
  { label: "Customers", icon: CircleUserRound, chevron: true },
  { label: "Finance", icon: CreditCard },
];

function NavRow({ item, active, onSelect }: { item: NavItem; active?: boolean; onSelect: () => void }) {
  const Icon = item.icon;
  return (
    <Button
      variant="nav"
      size="default"
      onClick={onSelect}
      className={active ? "bg-accent text-foreground hover:bg-accent" : undefined}
      aria-current={active ? "page" : undefined}
    >
      <Icon className="mr-3 size-4 shrink-0" strokeWidth={1.5} />
      <span className="min-w-0 flex-1 truncate">{item.label}</span>
      {item.badge && <span className="rounded-full bg-secondary px-1.5 py-0.5 text-[10px] text-secondary-foreground">{item.badge}</span>}
      {item.chevron && <ChevronRight className="size-3.5 shrink-0" strokeWidth={1.5} />}
    </Button>
  );
}

function Sidebar({ active, setActive, close }: { active: string; setActive: (value: string) => void; close?: () => void }) {
  const select = (label: string) => {
    setActive(label);
    close?.();
  };

  return (
    <aside className="flex h-full w-[276px] shrink-0 flex-col border-r border-border bg-card px-3.5 py-5 sm:px-4">
      <div className="mb-7 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-2">
        <div className="grid size-9 shrink-0 place-items-center rounded-md bg-primary text-sm font-semibold text-primary-foreground">A</div>
        <div className="min-w-0 leading-tight">
          <p className="truncate text-sm font-semibold text-foreground">Acme Corp</p>
          <p className="mt-0.5 truncate text-xs text-muted-foreground">Pro Plan</p>
        </div>
        <ChevronDown className="size-3.5 text-muted-foreground" strokeWidth={1.5} />
      </div>

      <nav aria-label="Workspace navigation" className="flex min-h-0 flex-1 flex-col">
        <Button variant="nav" size="default" onClick={() => select("Search")} className="mb-1">
          <Search className="mr-3 size-4" strokeWidth={1.5} />
          Search
        </Button>
        {mainItems.map((item) => <NavRow key={item.label} item={item} active={active === item.label} onSelect={() => select(item.label)} />)}

        <p className="mb-2 mt-5 px-3 text-[11px] font-semibold uppercase text-muted-foreground/70">Workspace</p>
        {workspaceItems.map((item) => <NavRow key={item.label} item={item} active={active === item.label} onSelect={() => select(item.label)} />)}

        <p className="mb-2 mt-5 px-3 text-[11px] font-semibold uppercase text-muted-foreground/70">Developers</p>
        <NavRow item={{ label: "API Keys", icon: KeyRound }} active={active === "API Keys"} onSelect={() => select("API Keys")} />
        <NavRow item={{ label: "Webhooks", icon: Webhook }} active={active === "Webhooks"} onSelect={() => select("Webhooks")} />

        <div className="mt-auto border-t border-border pt-4">
          <NavRow item={{ label: "Settings", icon: Settings }} active={active === "Settings"} onSelect={() => select("Settings")} />
          <NavRow item={{ label: "Log out", icon: LogOut }} onSelect={() => select("Log out")} />
        </div>
      </nav>
    </aside>
  );
}

function Index() {
  const [active, setActive] = useState("Webhooks");
  const [mobileOpen, setMobileOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  return (
    <div className="min-h-screen bg-card p-0 sm:bg-background sm:p-2.5 lg:p-3">
      <div className="mx-auto flex min-h-screen w-full max-w-[1280px] overflow-hidden border-border bg-background sm:min-h-[calc(100vh-1.25rem)] sm:rounded-2xl sm:border lg:min-h-[calc(100vh-1.5rem)]">
        <div className="hidden md:block"><Sidebar active={active} setActive={setActive} /></div>

        {mobileOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setMobileOpen(false)} aria-hidden="true" />
            <div className="relative h-full shadow-2xl">
              <Sidebar active={active} setActive={setActive} close={() => setMobileOpen(false)} />
              <Button variant="icon" size="icon" className="absolute right-3 top-3 size-8" onClick={() => setMobileOpen(false)} aria-label="Close menu"><X className="size-4" /></Button>
            </div>
          </div>
        )}

        <main className="min-w-0 flex-1">
          <header className="grid h-[60px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b border-border px-4 sm:h-[64px] sm:px-6">
            <Button variant="ghost" size="icon" className="size-8 p-0 md:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu className="size-4" /></Button>
            <div className="hidden items-center gap-5 md:flex">
              <PanelLeftClose className="size-4 text-muted-foreground" strokeWidth={1.5} />
              <div className="flex min-w-0 items-center gap-2 text-sm">
                <span className="truncate text-muted-foreground">Acme Corp</span>
                <span className="text-muted-foreground">/</span>
                <span className="font-semibold text-foreground">{active}</span>
              </div>
            </div>
            <p className="min-w-0 truncate text-sm font-semibold md:hidden">{active}</p>
            <div className="flex items-center gap-3 sm:gap-4">
              <label className="relative hidden sm:block">
                <span className="sr-only">Search</span>
                <Command className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground opacity-0" />
                <input ref={searchRef} aria-label="Search dashboard" className="h-9 w-[180px] rounded-lg border-0 bg-input px-3 text-xs text-foreground outline-none ring-ring placeholder:text-muted-foreground focus:ring-1 lg:w-[272px]" />
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
      </div>
    </div>
  );
}
