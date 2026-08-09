"use client";

import type { NoteCategory, ViewFilter } from "../lib/types";
import { CATEGORIES } from "../lib/types";
import { CATEGORY_COLOR, COLOR_STYLES } from "../lib/colors";
import type { ThemeMode } from "../lib/storage";
import {
  ArchiveIcon,
  FileTextIcon,
  MoonIcon,
  NoteIcon,
  PinIcon,
  PlusIcon,
  SunIcon,
  XIcon,
} from "./icons";

interface NavCounts {
  all: number;
  pinned: number;
  trash: number;
  categories: Record<NoteCategory, number>;
}

interface SidebarProps {
  filter: ViewFilter;
  onFilterChange: (filter: ViewFilter) => void;
  counts: NavCounts;
  theme: ThemeMode;
  onToggleTheme: () => void;
  onNewNote: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

function NavItem({
  active,
  onClick,
  icon,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  count?: number;
}) {
  return (
    <button
      type="button"
      aria-current={active ? "page" : undefined}
      onClick={onClick}
      className={`flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-200 ${
        active
          ? "bg-accent-soft text-foreground"
          : "text-muted-fg hover:bg-muted hover:text-foreground"
      }`}
    >
      <span className={active ? "text-accent" : ""}>{icon}</span>
      <span className="flex-1 text-left">{label}</span>
      {count !== undefined && (
        <span
          className={`rounded-full px-2 py-0.5 text-xs tabular-nums ${
            active
              ? "bg-accent/15 text-accent"
              : "bg-muted text-muted-fg"
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
}

export function Sidebar({
  filter,
  onFilterChange,
  counts,
  theme,
  onToggleTheme,
  onNewNote,
  mobileOpen,
  onCloseMobile,
}: SidebarProps) {
  const content = (
    <div className="flex h-full flex-col">
      {/* Brand */}
      <div className="flex items-center justify-between px-4 pb-2 pt-5">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-amber-400 text-white shadow-soft">
            <NoteIcon size={18} />
          </span>
          <div>
            <p className="font-serif text-lg font-bold leading-none text-foreground">
              NoteVault
            </p>
            <p className="mt-0.5 text-[11px] uppercase tracking-[0.18em] text-muted-fg">
              Notebook
            </p>
          </div>
        </div>
        <button
          type="button"
          aria-label="Close menu"
          onClick={onCloseMobile}
          className="cursor-pointer rounded-lg p-2 text-muted-fg hover:bg-muted hover:text-foreground lg:hidden"
        >
          <XIcon size={20} />
        </button>
      </div>

      {/* New note */}
      <div className="px-4 py-3">
        <button
          type="button"
          onClick={onNewNote}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-white shadow-soft transition-all duration-200 hover:brightness-105 hover:shadow-lift active:scale-[0.98]"
        >
          <PlusIcon size={18} />
          New note
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-4" aria-label="Views">
        <NavItem
          active={filter.kind === "all"}
          onClick={() => onFilterChange({ kind: "all" })}
          icon={<FileTextIcon size={18} />}
          label="All notes"
          count={counts.all}
        />
        <NavItem
          active={filter.kind === "pinned"}
          onClick={() => onFilterChange({ kind: "pinned" })}
          icon={<PinIcon size={18} />}
          label="Pinned"
          count={counts.pinned}
        />
        <NavItem
          active={filter.kind === "trash"}
          onClick={() => onFilterChange({ kind: "trash" })}
          icon={<ArchiveIcon size={18} />}
          label="Trash"
          count={counts.trash}
        />

        <p className="px-3 pb-1 pt-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-fg">
          Categories
        </p>
        {CATEGORIES.map((cat) => (
          <NavItem
            key={cat}
            active={
              filter.kind === "category" && filter.category === cat
            }
            onClick={() => onFilterChange({ kind: "category", category: cat })}
            icon={
              <span
                className={`block h-3 w-3 rounded-full ${COLOR_STYLES[CATEGORY_COLOR[cat]].dot}`}
                aria-hidden="true"
              />
            }
            label={cat}
            count={counts.categories[cat]}
          />
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-border/70 px-4 py-4">
        <button
          type="button"
          onClick={onToggleTheme}
          className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-fg transition-colors duration-200 hover:bg-muted hover:text-foreground"
        >
          {theme === "dark" ? <SunIcon size={18} /> : <MoonIcon size={18} />}
          {theme === "dark" ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 animate-fade-in bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={onCloseMobile}
        />
      )}
      <aside
        aria-label="Sidebar"
        className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] transform border-r border-border bg-background transition-transform duration-300 ease-out lg:static lg:z-auto lg:w-64 lg:transform-none lg:border-r lg:bg-transparent ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {content}
      </aside>
    </>
  );
}
