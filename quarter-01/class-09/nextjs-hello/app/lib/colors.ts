import type { NoteCategory, NoteColor } from "./types";

/** Stable accent per category, used for nav dots and default note color. */
export const CATEGORY_COLOR: Record<NoteCategory, NoteColor> = {
  Personal: "amber",
  Work: "sky",
  Ideas: "violet",
  Study: "emerald",
  Journal: "rose",
};

/**
 * Static Tailwind class strings per accent color (must be full literals
 * so the Tailwind scanner can pick them up).
 */
export const COLOR_STYLES: Record<
  NoteColor,
  { dot: string; chip: string; bar: string }
> = {
  amber: {
    dot: "bg-amber-500",
    chip: "bg-amber-100 text-amber-900 dark:bg-amber-400/15 dark:text-amber-200",
    bar: "bg-amber-400",
  },
  rose: {
    dot: "bg-rose-500",
    chip: "bg-rose-100 text-rose-900 dark:bg-rose-400/15 dark:text-rose-200",
    bar: "bg-rose-400",
  },
  sky: {
    dot: "bg-sky-500",
    chip: "bg-sky-100 text-sky-900 dark:bg-sky-400/15 dark:text-sky-200",
    bar: "bg-sky-400",
  },
  emerald: {
    dot: "bg-emerald-500",
    chip:
      "bg-emerald-100 text-emerald-900 dark:bg-emerald-400/15 dark:text-emerald-200",
    bar: "bg-emerald-400",
  },
  violet: {
    dot: "bg-violet-500",
    chip: "bg-violet-100 text-violet-900 dark:bg-violet-400/15 dark:text-violet-200",
    bar: "bg-violet-400",
  },
  slate: {
    dot: "bg-slate-500",
    chip: "bg-slate-100 text-slate-800 dark:bg-slate-400/15 dark:text-slate-200",
    bar: "bg-slate-400",
  },
};
