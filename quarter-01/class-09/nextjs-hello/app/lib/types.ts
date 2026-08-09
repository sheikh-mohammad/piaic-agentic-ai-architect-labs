export const CATEGORIES = [
  "Personal",
  "Work",
  "Ideas",
  "Study",
  "Journal",
] as const;

export type NoteCategory = (typeof CATEGORIES)[number];

export const NOTE_COLORS = [
  "amber",
  "rose",
  "sky",
  "emerald",
  "violet",
  "slate",
] as const;

export type NoteColor = (typeof NOTE_COLORS)[number];

export interface Note {
  id: string;
  title: string;
  content: string;
  category: NoteCategory;
  color: NoteColor;
  pinned: boolean;
  createdAt: number;
  updatedAt: number;
  /** Set when the note is moved to trash; null when active. */
  deletedAt: number | null;
}

export type ViewMode = "grid" | "list";
export type SortKey = "updated" | "created" | "title";

export type ViewFilter =
  | { kind: "all" }
  | { kind: "pinned" }
  | { kind: "trash" }
  | { kind: "category"; category: NoteCategory };
