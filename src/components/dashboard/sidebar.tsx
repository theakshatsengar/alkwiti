import { Link } from "@tanstack/react-router";
import {
  LayoutDashboard,
  TrendingUp,
  Receipt,
  Target,
  Settings,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/theme";

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
  // Per brand guide: logo-lightbg = dark wordmark (for light bg),
  // logo-darkbg = light wordmark (for dark bg). Pick by the sidebar background.
  const logoSrc = resolved === "dark" ? "/logo-darkbg.png" : "/logo-lightbg.png";

  return (
    <aside
      className={cn(
        "flex h-full shrink-0 flex-col border-r border-border bg-sidebar py-5",
        collapsed ? "w-[68px] px-2" : "w-[264px] px-3.5",
      )}
    >
      {/* Brand */}
      <div className={cn("mb-7 flex items-center", collapsed ? "justify-center" : "px-2")}>
        <img
          src={logoSrc}
          alt="Alkwiti, Trade Without Borders"
          className={cn("w-auto", collapsed ? "h-8" : "h-10")}
        />
      </div>

      <nav aria-label="Dashboard navigation" className="flex min-h-0 flex-1 flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              activeOptions={{ exact: item.to === "/" }}
              title={collapsed ? item.label : undefined}
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
          );
        })}
      </nav>

      {!collapsed && (
        <div className="mt-4 shrink-0 rounded-lg border border-border bg-background/60 px-3 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            Trade Without Borders
          </p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            Founder financial command center.
          </p>
        </div>
      )}
    </aside>
  );
}
