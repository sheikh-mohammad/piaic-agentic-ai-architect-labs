"use client";

import { useState } from "react";
import type { Note } from "../lib/types";
import { COLOR_STYLES } from "../lib/colors";
import { formatRelative, notePreview } from "../lib/format";
import { RestoreIcon, TrashIcon } from "./icons";

interface TrashCardProps {
  note: Note;
  now: number;
  onRestore: () => void;
  onDeleteForever: () => void;
}

export function TrashCard({ note, now, onRestore, onDeleteForever }: TrashCardProps) {
  const [confirm, setConfirm] = useState(false);
  const c = COLOR_STYLES[note.color];

  return (
    <div className="flex items-center gap-4 rounded-xl border border-border bg-surface px-4 py-3.5 shadow-soft transition-all duration-200 hover:shadow-lift">
      <span
        className={`h-2.5 w-2.5 shrink-0 rounded-full ${c.dot} opacity-50`}
        aria-hidden="true"
      />
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-serif text-[1.05rem] font-semibold leading-snug text-muted-fg">
          {note.title}
        </h3>
        <p className="mt-0.5 truncate text-sm text-muted-fg/70">
          {notePreview(note.content, 90)}
        </p>
      </div>
      <span className="hidden shrink-0 text-xs text-muted-fg/70 sm:block">
        deleted {note.deletedAt ? formatRelative(note.deletedAt, now) : ""}
      </span>
      <div className="flex shrink-0 items-center gap-1.5">
        <button
          type="button"
          onClick={onRestore}
          className="flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium text-muted-fg transition-colors duration-200 hover:bg-muted hover:text-foreground"
        >
          <RestoreIcon size={16} />
          Restore
        </button>
        <button
          type="button"
          onClick={() => {
            if (!confirm) {
              setConfirm(true);
              return;
            }
            onDeleteForever();
          }}
          className={`flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors duration-200 ${
            confirm
              ? "bg-destructive text-white"
              : "text-muted-fg hover:bg-muted hover:text-destructive"
          }`}
        >
          <TrashIcon size={16} />
          {confirm ? "Delete forever?" : "Delete"}
        </button>
      </div>
    </div>
  );
}
