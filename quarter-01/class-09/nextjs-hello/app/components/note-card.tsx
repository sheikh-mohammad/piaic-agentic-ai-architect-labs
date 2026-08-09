"use client";

import type { Note, ViewMode } from "../lib/types";
import { COLOR_STYLES } from "../lib/colors";
import { formatRelative, notePreview } from "../lib/format";
import { PinIcon, TrashIcon } from "./icons";

interface NoteCardProps {
  note: Note;
  view: ViewMode;
  now: number;
  onOpen: () => void;
  onPin: () => void;
  onTrash: () => void;
}

function Meta({ note, now }: { note: Note; now: number }) {
  const c = COLOR_STYLES[note.color];
  return (
    <div className="flex items-center gap-2">
      <span className="flex items-center gap-1.5 text-xs font-medium text-muted-fg">
        <span className={`h-2 w-2 rounded-full ${c.dot}`} aria-hidden="true" />
        {note.category}
      </span>
      <span
        className="text-xs text-muted-fg/80"
        title={new Date(note.updatedAt).toLocaleString()}
      >
        {formatRelative(note.updatedAt, now)}
      </span>
    </div>
  );
}

/** Icon-only action button; stops propagation so it never opens the note. */
function CardAction({
  label,
  onClick,
  className = "",
  filled = false,
  children,
}: {
  label: string;
  onClick: () => void;
  className?: string;
  filled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`cursor-pointer rounded-lg p-1.5 text-muted-fg transition-all duration-200 hover:bg-muted hover:text-foreground ${className}`}
    >
      {children}
    </button>
  );
}

export function NoteCard({
  note,
  view,
  now,
  onOpen,
  onPin,
  onTrash,
}: NoteCardProps) {
  const c = COLOR_STYLES[note.color];

  if (view === "list") {
    return (
      <article
        onClick={onOpen}
        className="group flex cursor-pointer items-center gap-4 rounded-xl border border-border bg-surface px-4 py-3.5 shadow-soft transition-all duration-200 hover:border-border/80 hover:shadow-lift"
      >
        <span
          className={`h-2.5 w-2.5 shrink-0 rounded-full ${c.dot}`}
          aria-hidden="true"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-3">
            <button
              type="button"
              onClick={onOpen}
              className="truncate text-left font-serif text-[1.05rem] font-semibold leading-snug text-foreground transition-colors duration-200 hover:text-accent"
            >
              {note.title}
            </button>
            {note.pinned && (
              <PinIcon
                size={14}
                filled
                className="shrink-0 text-accent"
                aria-label="Pinned"
              />
            )}
          </div>
          <p className="mt-0.5 truncate text-sm text-muted-fg">
            {notePreview(note.content, 90)}
          </p>
        </div>
        <div className="hidden shrink-0 items-center gap-2 md:flex">
          <Meta note={note} now={now} />
          <CardAction
            label={note.pinned ? "Unpin" : "Pin"}
            onClick={onPin}
            className={note.pinned ? "text-accent hover:text-accent" : ""}
          >
            <PinIcon size={16} filled={note.pinned} />
          </CardAction>
          <CardAction label="Move to trash" onClick={onTrash}>
            <TrashIcon size={16} />
          </CardAction>
        </div>
      </article>
    );
  }

  return (
    <article
      onClick={onOpen}
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-surface p-5 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:border-border/80 hover:shadow-lift"
    >
      <span
        className={`absolute inset-x-0 top-0 h-1 ${c.bar}`}
        aria-hidden="true"
      />
      <div className="flex items-center justify-between gap-2">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${c.chip}`}
        >
          {note.category}
        </span>
        <CardAction
          label={note.pinned ? "Unpin" : "Pin"}
          onClick={onPin}
          className={
            note.pinned
              ? "text-accent hover:text-accent"
              : "opacity-0 focus-visible:opacity-100 group-hover:opacity-100"
          }
        >
          <PinIcon size={16} filled={note.pinned} />
        </CardAction>
      </div>

      <button
        type="button"
        onClick={onOpen}
        className="mt-3 line-clamp-2 cursor-pointer text-left font-serif text-lg font-semibold leading-snug text-foreground transition-colors duration-200 hover:text-accent"
      >
        {note.title}
      </button>
      <p className="mt-1.5 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-fg">
        {notePreview(note.content)}
      </p>

      <div className="mt-4 flex items-center justify-between border-t border-border/70 pt-3">
        <Meta note={note} now={now} />
        <CardAction
          label="Move to trash"
          onClick={onTrash}
          className="opacity-0 focus-visible:opacity-100 group-hover:opacity-100"
        >
          <TrashIcon size={16} />
        </CardAction>
      </div>
    </article>
  );
}
