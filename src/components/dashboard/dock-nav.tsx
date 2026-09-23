import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { cn } from "@/lib/utils";
import type { NavItem } from "./sidebar";

/**
 * macOS Dock-style magnification for the collapsed sidebar rail.
 *
 * We track the cursor's Y position within the rail. Each icon scales based on
 * how close the cursor is to its center — the nearest icon grows most and its
 * neighbours taper off smoothly, exactly like the Dock. A spring gives the
 * motion its soft, physical feel.
 */

// Base hit-area size (matches the collapsed `size-11` = 44px), the max scaled
// size at the cursor, and how far (px) the magnification reaches.
// Kept intentionally subtle: a small, visible lift rather than a big zoom.
const BASE = 44;
const MAX = 52;
const INFLUENCE = 64;

function DockItem({
  item,
  mouseY,
  onNavigate,
}: {
  item: NavItem;
  mouseY: MotionValue<number>;
  onNavigate?: (() => void) | undefined;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const Icon = item.icon;

  // Distance from the cursor to this icon's vertical center.
  const distance = useTransform(mouseY, (y) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return INFLUENCE + 1;
    const center = bounds.top + bounds.height / 2;
    return y - center;
  });

  // Map distance → size, then smooth it with a spring.
  const sizeTarget = useTransform(distance, [-INFLUENCE, 0, INFLUENCE], [BASE, MAX, BASE]);
  const size = useSpring(sizeTarget, { mass: 0.1, stiffness: 170, damping: 14 });

  // Icon glyph scales proportionally with the button — a gentle lift only.
  const iconScale = useTransform(size, [BASE, MAX], [1, 1.18]);

  return (
    <div ref={ref} className="group relative flex justify-center">
      <Link
        to={item.to}
        onClick={onNavigate}
        activeOptions={{ exact: item.to === "/" }}
        aria-label={item.label}
        className="group/link flex items-center justify-center text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        activeProps={{ className: "text-brand" }}
      >
        <motion.span
          style={{ width: size, height: size }}
          className="grid shrink-0 place-items-center rounded-xl transition-colors group-hover/link:bg-accent group-[.active]/link:bg-brand/10"
        >
          <motion.span style={{ scale: iconScale }} className="grid place-items-center">
            <Icon className="size-[18px] shrink-0" strokeWidth={1.75} />
          </motion.span>
        </motion.span>
      </Link>

      {/* Hover label */}
      <span
        role="tooltip"
        className="pointer-events-none absolute left-full top-1/2 z-50 ml-1 -translate-y-1/2 translate-x-1 whitespace-nowrap rounded-md border border-border bg-popover px-2.5 py-1.5 text-xs font-medium text-popover-foreground opacity-0 shadow-md transition-all duration-150 group-hover:translate-x-0 group-hover:opacity-100"
      >
        {item.label}
      </span>
    </div>
  );
}

export function DockNav({
  items,
  onNavigate,
}: {
  items: NavItem[];
  onNavigate?: (() => void) | undefined;
}) {
  // Far away by default so nothing is magnified until the cursor enters.
  const mouseY = useMotionValue(Number.POSITIVE_INFINITY);

  return (
    <nav
      aria-label="Dashboard navigation"
      onMouseMove={(e) => mouseY.set(e.clientY)}
      onMouseLeave={() => mouseY.set(Number.POSITIVE_INFINITY)}
      className={cn("flex min-h-0 flex-1 flex-col items-center gap-1")}
    >
      {items.map((item) => (
        <DockItem key={item.to} item={item} mouseY={mouseY} onNavigate={onNavigate} />
      ))}
    </nav>
  );
}
