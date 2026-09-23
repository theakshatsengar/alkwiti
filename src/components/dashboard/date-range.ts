import { subDays, subMonths, startOfDay, endOfDay } from "date-fns";

export type RangePreset = "30d" | "90d" | "6m" | "12m" | "all";

export interface DateRange {
  start: Date;
  end: Date;
}

export const RANGE_PRESETS: { value: RangePreset; label: string }[] = [
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
  { value: "6m", label: "Last 6 months" },
  { value: "12m", label: "Last 12 months" },
  { value: "all", label: "All time" },
];

/**
 * Resolve a preset to an absolute range. `now` defaults to the latest data
 * date passed in (so presets track the data, not the wall clock — useful with
 * sample data). Returns null for "all".
 */
export function resolveRange(preset: RangePreset, anchor: Date): DateRange | null {
  const end = endOfDay(anchor);
  switch (preset) {
    case "30d":
      return { start: startOfDay(subDays(anchor, 30)), end };
    case "90d":
      return { start: startOfDay(subDays(anchor, 90)), end };
    case "6m":
      return { start: startOfDay(subMonths(anchor, 6)), end };
    case "12m":
      return { start: startOfDay(subMonths(anchor, 12)), end };
    case "all":
      return null;
  }
}

/** The immediately-preceding range of equal length (for period comparison). */
export function previousRange(range: DateRange): DateRange {
  const spanMs = range.end.getTime() - range.start.getTime();
  return {
    start: new Date(range.start.getTime() - spanMs),
    end: new Date(range.start.getTime() - 1),
  };
}
