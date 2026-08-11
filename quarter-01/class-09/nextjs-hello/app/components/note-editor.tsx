"use client";

import { useEffect, useRef, useState } from "react";
import type { Note, NoteCategory, NoteColor } from "../lib/types";
import { CATEGORIES, NOTE_COLORS } from "../lib/types";
import { COLOR_STYLES } from "../lib/colors";
import { CheckIcon, PinIcon, TrashIcon, XIcon } from "./icons";

export interface NoteDraft {
  title: string;
  content: string;
  category: NoteCategory;
  color: NoteColor;
  pinned: boolean;
}

interface NoteEditorProps {
  open: boolean;
  initial: Note | null;
  onClose: () => void;
  onSave: (draft: NoteDraft) => void;
  onDelete: (id: string) => void;
}

export function NoteEditor({
  open,
  initial,
  onClose,
  onSave,
  onDelete,
}: NoteEditorProps) {
  // Initialized from `initial` on mount. The parent renders this component
  // with a changing `key` per open session, so it remounts fresh every time.
  const [title, setTitle] = useState(initial?.title ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [category, setCategory] = useState<NoteCategory>(
    initial?.category ?? "Personal",
  );
  const [color, setColor] = useState<NoteColor>(initial?.color ?? "amber");
  const [pinned, setPinned] = useState(initial?.pinned ?? false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);

  // Focus the title field when the dialog opens.
  useEffect(() => {
    if (!open) return;
    const t = requestAnimationFrame(() => titleRef.current?.focus());
    return () => cancelAnimationFrame(t);
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const isEditing = initial !== null;

  const handleSave = () => {
    onSave({
      title: title.trim() || "Untitled note",
      content,
      category,
      color,
      pinned,
    });
  };

  const handleDelete = () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    if (initial) onDelete(initial.id);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label={isEditing ? "Edit note" : "New note"}
    >
      <div
        className="absolute inset-0 animate-fade-in bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative flex max-h-[92vh] w-full max-w-2xl animate-pop-in flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-modal">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b border-border/70 px-6 py-4">
          <h2 className="font-serif text-xl font-semibold text-foreground">
            {isEditing ? "Edit note" : "New note"}
          </h2>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="cursor-pointer rounded-lg p-2 text-muted-fg transition-colors duration-200 hover:bg-muted hover:text-foreground"
          >
            <XIcon size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 space-y-5 overflow-y-auto px-6 py-5">
          <div>
            <label
              htmlFor="note-title"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Title
            </label>
            <input
              id="note-title"
              ref={titleRef}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your note a title…"
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5 font-serif text-lg font-medium text-foreground placeholder:text-muted-fg/60 transition-colors duration-200 focus:border-accent focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="note-content"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Content
            </label>
            <textarea
              id="note-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write whatever is on your mind…"
              rows={7}
              className="w-full resize-y rounded-xl border border-border bg-background px-4 py-3 text-[15px] leading-relaxed text-foreground placeholder:text-muted-fg/60 transition-colors duration-200 focus:border-accent focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <fieldset className="min-w-0 flex-1">
              <legend className="mb-1.5 text-sm font-medium text-foreground">
                Category
              </legend>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => {
                  const selected = category === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setCategory(cat)}
                      className={`cursor-pointer rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-200 ${
                        selected
                          ? "bg-accent text-white shadow-soft"
                          : "bg-muted text-muted-fg hover:bg-muted/70 hover:text-foreground"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <fieldset>
              <legend className="mb-1.5 text-sm font-medium text-foreground">
                Color
              </legend>
              <div className="flex flex-wrap gap-2">
                {NOTE_COLORS.map((c) => {
                  const selected = color === c;
                  return (
                    <button
                      key={c}
                      type="button"
                      aria-label={`${c} color`}
                      aria-pressed={selected}
                      title={c}
                      onClick={() => setColor(c)}
                      className={`relative h-7 w-7 cursor-pointer rounded-full ${COLOR_STYLES[c].dot} transition-transform duration-200 hover:scale-110 focus-visible:outline-2`}
                    >
                      {selected && (
                        <span className="absolute inset-0 flex items-center justify-center text-white">
                          <CheckIcon size={14} />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 border-t border-border/70 px-6 py-4">
          <div className="flex items-center gap-2">
            {isEditing && (
              <button
                type="button"
                onClick={handleDelete}
                className={`flex cursor-pointer items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200 ${
                  confirmDelete
                    ? "bg-destructive text-white"
                    : "text-muted-fg hover:bg-muted hover:text-destructive"
                }`}
              >
                <TrashIcon size={16} />
                {confirmDelete ? "Confirm delete?" : "Move to trash"}
              </button>
            )}
            <button
              type="button"
              aria-pressed={pinned}
              onClick={() => setPinned((v) => !v)}
              className={`flex cursor-pointer items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors duration-200 ${
                pinned
                  ? "bg-accent-soft text-accent"
                  : "text-muted-fg hover:bg-muted hover:text-foreground"
              }`}
            >
              <PinIcon size={16} filled={pinned} />
              {pinned ? "Pinned" : "Pin"}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-xl px-4 py-2.5 text-sm font-medium text-muted-fg transition-colors duration-200 hover:bg-muted hover:text-foreground"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="cursor-pointer rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-all duration-200 hover:brightness-105 hover:shadow-lift active:scale-[0.98]"
            >
              {isEditing ? "Save changes" : "Create note"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
