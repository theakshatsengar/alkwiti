import { Link } from "@tanstack/react-router";
import {
  LayoutDashboard,
  TrendingUp,
  Receipt,
  Target,
  Settings,
  type LucideIcon,
} from "lucide-react";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/theme";
import { useAuth } from "@/lib/supabase/auth";
import { UserAvatar, SignOutButton } from "./user-menu";

export interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  { to: "/", label: "Overview", icon: LayoutDashboard },
  { to: "/revenue", label: "Revenue", icon: TrendingUp },
  { to: "/expenses", label: "Expenses", icon: Receipt },
  { to: "/goals", label: "Financial Goals", icon: Target },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar({
  collapsed = false,
  onNavigate,
}: {
  collapsed?: boolean;
  onNavigate?: () => void;
}) {
  const { resolved } = useTheme();
  const { user } = useAuth();
  // Logo depends on both collapse state and theme:
  //  - expanded: full lockup (logo-lightbg on light bg / logo-darkbg on dark bg)
  //  - collapsed: compact icon mark (o.png on light bg / oo.png on dark bg)
  const logoSrc = collapsed
    ? resolved === "dark"
      ? "/oo.png"
      : "/o.png"
    : resolved === "dark"
      ? "/logo-darkbg.png"
      : "/logo-lightbg.png";

  const displayName =
    (user?.user_metadata?.["full_name"] as string | undefined) ??
    (user?.user_metadata?.["name"] as string | undefined) ??
    user?.email ??
    "";
  const avatarUrl = user?.user_metadata?.["avatar_url"] as string | undefined;
  const initial = (displayName || "A").charAt(0).toUpperCase();

  return (
    <aside
      className={cn(
        "flex h-full shrink-0 flex-col border-r border-border bg-sidebar py-5",
        collapsed ? "w-[68px] px-2" : "w-[264px] px-3.5",
      )}
    >
      {/* Brand */}
      <div
        className={cn(
          "mb-8 flex items-center",
          collapsed ? "justify-center px-0" : "px-1",
        )}
      >
        <img
          src={logoSrc}
          alt="Alkwiti, Trade Without Borders"
          className={cn("w-auto", collapsed ? "h-11" : "h-16")}
        />
      </div>

      <nav aria-label="Dashboard navigation" className="flex min-h-0 flex-1 flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.to} className="group relative">
              <Link
                to={item.to}
                onClick={onNavigate}
                activeOptions={{ exact: item.to === "/" }}
                className={cn(
                  "flex items-center rounded-lg text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                  collapsed ? "size-11 justify-center" : "gap-3 px-3 py-2.5",
                )}
                activeProps={{
                  className:
                    "bg-brand/10 text-foreground [&_svg]:text-brand data-[status=active]:bg-brand/10",
                }}
              >
                <Icon className="size-[18px] shrink-0" strokeWidth={1.75} />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </Link>

              {/* Hover label — only when the rail is collapsed */}
              {collapsed && (
                <span
                  role="tooltip"
                  className="pointer-events-none absolute left-full top-1/2 z-50 ml-2 -translate-y-1/2 translate-x-1 whitespace-nowrap rounded-md border border-border bg-popover px-2.5 py-1.5 text-xs font-medium text-popover-foreground opacity-0 shadow-md transition-all duration-150 group-hover:translate-x-0 group-hover:opacity-100"
                >
                  {item.label}
                </span>
              )}
            </div>
          );
        })}
      </nav>

      {/* User + sign out */}
      {user ? (
        collapsed ? (
          <div className="mt-4 flex shrink-0 flex-col items-center gap-2 border-t border-border pt-4">
            <UserAvatar src={avatarUrl} initial={initial} className="size-9" />
            <SignOutButton
              trigger={
                <button
                  type="button"
                  title="Sign out"
                  aria-label="Sign out"
                  className="grid size-9 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <LogOut className="size-[18px]" strokeWidth={1.75} />
                </button>
              }
            />
          </div>
        ) : (
          <div className="mt-4 shrink-0 border-t border-border pt-4">
            <div className="flex items-center gap-2.5 px-1">
              <UserAvatar src={avatarUrl} initial={initial} className="size-9" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{displayName}</p>
                {user.email && (
                  <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                )}
              </div>
              <SignOutButton
                trigger={
                  <button
                    type="button"
                    title="Sign out"
                    aria-label="Sign out"
                    className="grid size-8 shrink-0 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    <LogOut className="size-4" strokeWidth={1.75} />
                  </button>
                }
              />
            </div>
          </div>
        )
      ) : (
        !collapsed && (
          <div className="mt-4 shrink-0 rounded-lg border border-border bg-background/60 px-3 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              Trade Without Borders
            </p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Founder financial command center.
            </p>
          </div>
        )
      )}
    </aside>
  );
}
