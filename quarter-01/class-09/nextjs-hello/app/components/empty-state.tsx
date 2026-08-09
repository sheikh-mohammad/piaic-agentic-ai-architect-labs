"use client";

import { InboxIcon, PlusIcon, SearchXIcon } from "./icons";

interface EmptyStateProps {
  title: string;
  description: string;
  kind: "empty" | "search" | "trash";
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  title,
  description,
  kind,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex animate-fade-in flex-col items-center justify-center px-6 py-20 text-center">
      <div
        className={`flex h-16 w-16 items-center justify-center rounded-2xl shadow-soft ${
          kind === "trash"
            ? "bg-muted text-muted-fg"
            : "bg-accent-soft text-accent"
        }`}
      >
        {kind === "search" ? (
          <SearchXIcon size={28} />
        ) : kind === "trash" ? (
          <InboxIcon size={28} />
        ) : (
          <InboxIcon size={28} />
        )}
      </div>
      <h3 className="mt-6 font-serif text-2xl font-semibold text-foreground">
        {title}
      </h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-fg">
        {description}
      </p>
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-6 flex cursor-pointer items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-all duration-200 hover:brightness-105 hover:shadow-lift active:scale-[0.98]"
        >
          <PlusIcon size={16} />
          {actionLabel}
        </button>
      )}
    </div>
  );
}
