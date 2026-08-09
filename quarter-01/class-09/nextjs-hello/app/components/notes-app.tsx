"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type {
  Note,
  NoteCategory,
  SortKey,
  ViewFilter,
  ViewMode,
} from "../lib/types";
import { CATEGORIES } from "../lib/types";
import { createId, loadNotes, loadTheme, saveNotes, saveTheme } from "../lib/storage";
import { buildSampleNotes } from "../lib/sample-notes";
import type { ThemeMode } from "../lib/storage";
import type { NoteDraft } from "./note-editor";
import { Sidebar } from "./sidebar";
import { NoteCard } from "./note-card";
import { TrashCard } from "./trash-card";
import { NoteEditor } from "./note-editor";
import { EmptyState } from "./empty-state";
import { GridIcon, ListIcon, MenuIcon, SearchIcon, XIcon } from "./icons";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "updated", label: "Recently updated" },
  { value: "created", label: "Recently created" },
  { value: "title", label: "Title A–Z" },
];

const VIEW_TITLES: Record<ViewFilter["kind"], string> = {
  all: "All notes",
  pinned: "Pinned",
  trash: "Trash",
  category: "Category",
};

export function NotesApp() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [filter, setFilter] = useState<ViewFilter>({ kind: "all" });
  const [search, setSearch] = useState("");
  const [view, setView] = useState<ViewMode>("grid");
  const [sort, setSort] = useState<SortKey>("updated");
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [now, setNow] = useState(() => Date.now());
  const [editor, setEditor] = useState<{ open: boolean; note: Note | null }>({
    open: false,
    note: null,
  });

  /* ----- hydration (client-only) ----- */
  useEffect(() => {
    const stored = loadNotes();
    if (stored.length > 0) {
      setNotes(stored);
    } else {
      setNotes(buildSampleNotes(Date.now()));
    }
    const mode = loadTheme();
    setTheme(mode);
    document.documentElement.classList.toggle("dark", mode === "dark");
    setHydrated(true);
  }, []);

  /* ----- persistence ----- */
  useEffect(() => {
    if (hydrated) saveNotes(notes);
  }, [notes, hydrated]);

  /* ----- theme side-effect ----- */
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    saveTheme(theme);
  }, [theme]);

  /* ----- keep relative timestamps fresh ----- */
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(id);
  }, []);

  /* ----- counts for the sidebar ----- */
  const counts = useMemo(() => {
    const active = notes.filter((n) => n.deletedAt === null);
    const categories = Object.fromEntries(
      CATEGORIES.map((c) => [c, active.filter((n) => n.category === c).length]),
    ) as Record<NoteCategory, number>;
    return {
      all: active.length,
      pinned: active.filter((n) => n.pinned).length,
      trash: notes.length - active.length,
      categories,
    };
  }, [notes]);

  /* ----- derived: filtered + sorted list ----- */
  const visibleNotes = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = notes.filter((n) => {
      const inTrash = n.deletedAt !== null;
      const matchesView =
        filter.kind === "trash"
          ? inTrash
          : !inTrash &&
            (filter.kind === "all" ||
              (filter.kind === "pinned" && n.pinned) ||
              (filter.kind === "category" && n.category === filter.category));
      if (!matchesView) return false;
      if (!q) return true;
      return (
        n.title.toLowerCase().includes(q) ||
        n.content.toLowerCase().includes(q) ||
        n.category.toLowerCase().includes(q)
      );
    });

    const dir = sort === "title" ? 1 : -1;
    list = [...list].sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
      if (sort === "title") return a.title.localeCompare(b.title);
      const t = sort === "created" ? a.createdAt : a.updatedAt;
      return (t - (sort === "created" ? b.createdAt : b.updatedAt)) * dir;
    });
    return list;
  }, [notes, filter, search, sort]);

  /* ----- actions ----- */
  const openNew = useCallback(() => {
    setEditor({ open: true, note: null });
    setMobileNavOpen(false);
  }, []);

  const openEdit = useCallback((note: Note) => {
    setEditor({ open: true, note });
  }, []);

  const handleSave = useCallback(
    (draft: NoteDraft) => {
      const ts = Date.now();
      setNotes((prev) => {
        if (editor.note) {
          return prev.map((n) =>
            n.id === editor.note!.id
              ? { ...n, ...draft, updatedAt: ts }
              : n,
          );
        }
        const note: Note = {
          id: createId(),
          ...draft,
          createdAt: ts,
          updatedAt: ts,
          deletedAt: null,
        };
        return [note, ...prev];
      });
      setEditor({ open: false, note: null });
    },
    [editor.note],
  );

  const handleDeleteToTrash = useCallback((id: string) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, deletedAt: Date.now() } : n,
      ),
    );
    setEditor({ open: false, note: null });
  }, []);

  const handleRestore = useCallback((id: string) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, deletedAt: null } : n)),
    );
  }, []);

  const handleDeleteForever = useCallback((id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const handleTogglePin = useCallback((id: string) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, pinned: !n.pinned, updatedAt: Date.now() } : n,
      ),
    );
  }, []);

  const handleToggleTheme = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  /* ----- render helpers ----- */
  const title =
    filter.kind === "category" ? filter.category : VIEW_TITLES[filter.kind];
  const searching = search.trim().length > 0;
  const subtitle = searching
    ? `${visibleNotes.length} result${visibleNotes.length === 1 ? "" : "s"} for “${search.trim()}”`
    : `${visibleNotes.length} note${visibleNotes.length === 1 ? "" : "s"}`;

  const emptyState = useMemo(() => {
    if (visibleNotes.length > 0) return null;
    if (filter.kind === "trash")
      return {
        title: "Trash is empty",
        description: "Notes you delete land here. You can restore them anytime.",
        kind: "trash" as const,
      };
    if (searching)
      return {
        title: "Nothing matches",
        description: `No notes match “${search.trim()}”. Try a different word or clear the search.`,
        kind: "search" as const,
      };
    return {
      title: "No notes here yet",
      description:
        filter.kind === "pinned"
          ? "Pin your favorite notes to keep them at hand."
          : "Capture your first thought — it only takes a second.",
      kind: "empty" as const,
      actionLabel: filter.kind === "pinned" ? undefined : "Create your first note",
      onAction: filter.kind === "pinned" ? undefined : openNew,
    };
  }, [visibleNotes.length, filter.kind, searching, search, openNew]);

  return (
    <div className="flex h-full overflow-hidden bg-background text-foreground">
      <Sidebar
        filter={filter}
        onFilterChange={(f) => {
          setFilter(f);
          setMobileNavOpen(false);
        }}
        counts={counts}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onNewNote={openNew}
        mobileOpen={mobileNavOpen}
        onCloseMobile={() => setMobileNavOpen(false)}
      />

      <main className="relative flex min-w-0 flex-1 flex-col">
        {/* soft decorative glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-accent/10 blur-3xl"
        />

        {/* Header */}
        <header className="relative z-10 border-b border-border/70 bg-background/70 backdrop-blur-sm">
          <div className="flex flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Open menu"
                onClick={() => setMobileNavOpen(true)}
                className="cursor-pointer rounded-lg p-2 text-muted-fg hover:bg-muted hover:text-foreground lg:hidden"
              >
                <MenuIcon size={22} />
              </button>
              <div className="min-w-0">
                <h1 className="truncate font-serif text-2xl font-bold leading-tight text-foreground sm:text-[1.7rem]">
                  {title}
                </h1>
                <p className="text-sm text-muted-fg">{subtitle}</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              {/* Search */}
              <div className="relative flex-1">
                <SearchIcon
                  size={18}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-fg"
                />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search notes…"
                  aria-label="Search notes"
                  className="w-full rounded-xl border border-border bg-surface py-2.5 pl-10 pr-10 text-sm text-foreground shadow-soft placeholder:text-muted-fg/70 transition-colors duration-200 focus:border-accent focus:outline-none"
                />
                {search && (
                  <button
                    type="button"
                    aria-label="Clear search"
                    onClick={() => setSearch("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer rounded-md p-1 text-muted-fg hover:bg-muted hover:text-foreground"
                  >
                    <XIcon size={16} />
                  </button>
                )}
              </div>

              {/* Sort + view toggle */}
              <div className="flex items-center gap-2">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  aria-label="Sort notes"
                  className="h-11 cursor-pointer rounded-xl border border-border bg-surface px-3 text-sm font-medium text-foreground shadow-soft transition-colors duration-200 focus:border-accent focus:outline-none"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>

                <div
                  role="group"
                  aria-label="View mode"
                  className="flex h-11 items-center rounded-xl border border-border bg-surface p-1 shadow-soft"
                >
                  <button
                    type="button"
                    aria-pressed={view === "grid"}
                    aria-label="Grid view"
                    onClick={() => setView("grid")}
                    className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg transition-colors duration-200 ${
                      view === "grid"
                        ? "bg-accent-soft text-accent"
                        : "text-muted-fg hover:text-foreground"
                    }`}
                  >
                    <GridIcon size={17} />
                  </button>
                  <button
                    type="button"
                    aria-pressed={view === "list"}
                    aria-label="List view"
                    onClick={() => setView("list")}
                    className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg transition-colors duration-200 ${
                      view === "list"
                        ? "bg-accent-soft text-accent"
                        : "text-muted-fg hover:text-foreground"
                    }`}
                  >
                    <ListIcon size={17} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {emptyState ? (
            <EmptyState {...emptyState} />
          ) : filter.kind === "trash" ? (
            <div className="flex flex-col gap-3 p-4 sm:p-6 lg:p-8">
              {visibleNotes.map((note) => (
                <div key={note.id} className="animate-fade-in">
                  <TrashCard
                    note={note}
                    now={now}
                    onRestore={() => handleRestore(note.id)}
                    onDeleteForever={() => handleDeleteForever(note.id)}
                  />
                </div>
              ))}
            </div>
          ) : view === "grid" ? (
            <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:p-6 lg:p-8 xl:grid-cols-3 2xl:grid-cols-4">
              {visibleNotes.map((note, i) => (
                <div
                  key={note.id}
                  className="animate-note-in"
                  style={{ animationDelay: `${Math.min(i, 11) * 35}ms` }}
                >
                  <NoteCard
                    note={note}
                    view="grid"
                    now={now}
                    onOpen={() => openEdit(note)}
                    onPin={() => handleTogglePin(note.id)}
                    onTrash={() => handleDeleteToTrash(note.id)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3 p-4 sm:p-6 lg:p-8">
              {visibleNotes.map((note, i) => (
                <div
                  key={note.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${Math.min(i, 11) * 35}ms` }}
                >
                  <NoteCard
                    note={note}
                    view="list"
                    now={now}
                    onOpen={() => openEdit(note)}
                    onPin={() => handleTogglePin(note.id)}
                    onTrash={() => handleDeleteToTrash(note.id)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <NoteEditor
        open={editor.open}
        initial={editor.note}
        onClose={() => setEditor({ open: false, note: null })}
        onSave={handleSave}
        onDelete={handleDeleteToTrash}
      />
    </div>
  );
}
