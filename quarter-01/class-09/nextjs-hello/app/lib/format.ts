/** Human-friendly relative time, e.g. "just now", "5m ago", "3d ago". */
export function formatRelative(ts: number, now: number): string {
  const diff = Math.max(0, now - ts);
  const min = Math.floor(diff / 60_000);
  if (min < 1) return "just now";
  if (min < 60) return `${min}m ago`;
  const hours = Math.floor(min / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

/** Absolute short date, e.g. "Aug 9". */
export function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

/** First meaningful line of a note, truncated for card previews. */
export function notePreview(content: string, maxChars = 140): string {
  const text = content
    .replace(/[#>*`~-]/g, "")
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
    .join(" ")
    .trim();
  if (!text) return "No content yet";
  return text.length > maxChars ? `${text.slice(0, maxChars).trimEnd()}…` : text;
}

/** Render plain text with newlines preserved, trimmed to a few lines. */
export function shortLines(content: string, maxLines = 3): string {
  return content.split(/\r?\n/).slice(0, maxLines).join("\n").trim();
}
