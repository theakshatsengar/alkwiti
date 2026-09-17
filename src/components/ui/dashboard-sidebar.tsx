import { useState, type ElementType } from "react";
import {
  Activity,
  Boxes,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  CircleUserRound,
  CreditCard,
  Hash,
  Inbox,
  KeyRound,
  LogOut,
  Search,
  Settings,
  UsersRound,
  Webhook,
} from "lucide-react";
import { Button } from "./button";

export type NavItemData = {
  id: string;
  title: string;
  icon: ElementType;
  badge?: number | string;
  shortcut?: string;
  children?: NavItemData[];
};

export type NavGroupData = {
  heading?: string;
  items: NavItemData[];
};

export const navGroups: NavGroupData[] = [
  {
    items: [
      { id: "search", title: "Search", icon: Search, shortcut: "⌘K" },
      { id: "home", title: "Home", icon: Boxes },
      { id: "inbox", title: "Inbox", icon: Inbox, badge: 12 },
      { id: "analytics", title: "Analytics", icon: Activity },
    ],
  },
  {
    heading: "Workspace",
    items: [
      {
        id: "projects",
        title: "Projects",
        icon: Boxes,
        children: [
          { id: "p-active", title: "Active", icon: Hash },
          { id: "p-archived", title: "Archived", icon: Hash },
        ],
      },
      { id: "calendar", title: "Calendar", icon: CalendarDays },
      {
        id: "team",
        title: "Team",
        icon: UsersRound,
        children: [
          { id: "t-design", title: "Designers", icon: Hash },
          { id: "t-eng", title: "Engineering", icon: Hash },
          { id: "t-product", title: "Product", icon: Hash },
        ],
      },
      {
        id: "customers",
        title: "Customers",
        icon: CircleUserRound,
        children: [
          { id: "c-enterprise", title: "Enterprise", icon: Hash },
          { id: "c-smb", title: "SMB", icon: Hash },
        ],
      },
      { id: "finance", title: "Finance", icon: CreditCard },
    ],
  },
  {
    heading: "Developers",
    items: [
      { id: "api", title: "API Keys", icon: KeyRound },
      { id: "webhooks", title: "Webhooks", icon: Webhook },
    ],
  },
];

const bottomItems: NavItemData[] = [
  { id: "settings", title: "Settings", icon: Settings, shortcut: "⌘," },
  { id: "logout", title: "Log out", icon: LogOut },
];

export const allSidebarItems = [...navGroups.flatMap((group) => group.items), ...bottomItems];

export function flattenNavItems(items: NavItemData[]): NavItemData[] {
  return items.flatMap((item) => [item, ...flattenNavItems(item.children ?? [])]);
}

function WorkspaceSwitcher({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (workspace: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const workspaces = ["Acme Corp", "Personal Workspace", "Client Sandbox"];

  return (
    <div className="relative mb-7">
      <Button
        variant="nav"
        size="default"
        onClick={() => setIsOpen((open) => !open)}
        className="h-auto px-2 py-0 hover:bg-accent"
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <span className="grid size-9 shrink-0 place-items-center rounded-md bg-primary text-sm font-semibold text-primary-foreground">
          {selected.charAt(0)}
        </span>
        <span className="min-w-0 flex-1 text-left leading-tight">
          <span className="block truncate text-sm font-semibold text-foreground">{selected}</span>
          <span className="mt-0.5 block truncate text-xs text-muted-foreground">Pro Plan</span>
        </span>
        <ChevronDown className={`size-3.5 shrink-0 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} strokeWidth={1.5} />
      </Button>

      {isOpen && (
        <>
          <button className="fixed inset-0 z-40 cursor-default" aria-label="Close workspace menu" onClick={() => setIsOpen(false)} />
          <div className="absolute left-0 top-12 z-50 w-full rounded-lg border border-border bg-card p-1 shadow-2xl" role="menu">
            {workspaces.map((workspace) => (
              <Button
                key={workspace}
                variant="nav"
                size="default"
                className={selected === workspace ? "bg-accent text-foreground" : undefined}
                onClick={() => {
                  onSelect(workspace);
                  setIsOpen(false);
                }}
                role="menuitem"
              >
                {workspace}
              </Button>
            ))}
            <div className="my-1 h-px bg-border" />
            <Button variant="nav" size="default" onClick={() => setIsOpen(false)}>
              <span className="mr-1 text-base leading-none">+</span> Create Workspace
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

function NavItem({
  item,
  activeId,
  onSelect,
  level = 0,
}: {
  item: NavItemData;
  activeId: string;
  onSelect: (item: NavItemData) => void;
  level?: number;
}) {
  const activeWithin = item.children?.some((child) => child.id === activeId) ?? false;
  const [isOpen, setIsOpen] = useState(activeWithin);
  const Icon = item.icon;
  const hasChildren = Boolean(item.children?.length);

  return (
    <div className="w-full">
      <Button
        variant="nav"
        size="default"
        onClick={() => hasChildren ? setIsOpen((open) => !open) : onSelect(item)}
        className={activeId === item.id ? "bg-accent text-foreground hover:bg-accent" : undefined}
        style={{ paddingLeft: `${12 + level * 12}px` }}
        aria-expanded={hasChildren ? isOpen : undefined}
        aria-current={activeId === item.id ? "page" : undefined}
      >
        <Icon className="mr-3 size-4 shrink-0" strokeWidth={1.5} />
        <span className="min-w-0 flex-1 truncate text-left">{item.title}</span>
        {item.shortcut && <kbd className="hidden rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground group-hover:inline-flex">{item.shortcut}</kbd>}
        {item.badge !== undefined && <span className="rounded-full bg-secondary px-1.5 py-0.5 text-[10px] text-secondary-foreground">{item.badge}</span>}
        {hasChildren && <ChevronRight className={`size-3.5 shrink-0 transition-transform ${isOpen ? "rotate-90" : ""}`} strokeWidth={1.5} />}
      </Button>
      {hasChildren && (
        <div className={`grid transition-[grid-template-rows,opacity] duration-200 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
          <div className="min-h-0 overflow-hidden">
            {item.children?.map((child) => (
              <NavItem key={child.id} item={child} activeId={activeId} onSelect={onSelect} level={level + 1} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function SidebarNav({
  activeId,
  onSelect,
  activeWorkspace,
  onWorkspaceSelect,
  className = "",
}: {
  activeId: string;
  onSelect: (item: NavItemData) => void;
  activeWorkspace: string;
  onWorkspaceSelect: (workspace: string) => void;
  className?: string;
}) {
  return (
    <aside className={`flex h-full w-[276px] shrink-0 flex-col border-r border-border bg-card px-3.5 py-5 sm:px-4 ${className}`}>
      <WorkspaceSwitcher selected={activeWorkspace} onSelect={onWorkspaceSelect} />
      <nav aria-label="Workspace navigation" className="flex min-h-0 flex-1 flex-col overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {navGroups.map((group, index) => (
          <div key={group.heading ?? "main"} className={index === 0 ? "" : "mt-5"}>
            {group.heading && <p className="mb-2 px-3 text-[11px] font-semibold uppercase text-muted-foreground/70">{group.heading}</p>}
            {group.items.map((item) => <NavItem key={item.id} item={item} activeId={activeId} onSelect={onSelect} />)}
          </div>
        ))}
        <div className="mt-auto border-t border-border pt-4">
          {bottomItems.map((item) => <NavItem key={item.id} item={item} activeId={activeId} onSelect={onSelect} />)}
        </div>
      </nav>
    </aside>
  );
}
