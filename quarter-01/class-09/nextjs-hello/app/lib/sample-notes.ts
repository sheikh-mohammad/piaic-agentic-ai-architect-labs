import type { Note } from "./types";
import { createId } from "./storage";

const MIN = 60_000;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;

/**
 * Starter notes shown on first launch so the app never feels empty.
 * Created with timestamps relative to "now".
 */
export function buildSampleNotes(now: number): Note[] {
  return [
    {
      id: createId(),
      title: "Welcome to NoteVault",
      content:
        "This is your personal space for capturing ideas.\n\n• Click any note to open it\n• Press the + button to create a new note\n• Pin important notes so they stay on top\n• Search across everything from the bar above\n\nEverything is stored locally in your browser — no accounts, no servers, no clutter.",
      category: "Personal",
      color: "amber",
      pinned: true,
      createdAt: now - 2 * DAY,
      updatedAt: now - 4 * HOUR,
      deletedAt: null,
    },
    {
      id: createId(),
      title: "Weekly Review — Monday",
      content:
        "Focus areas for the week:\n\n1. Ship the notes export feature\n2. Prepare slides for Thursday's demo\n3. Catch up on the design system audit\n\nRemember: review the backlog before the standup, not during.",
      category: "Work",
      color: "sky",
      pinned: true,
      createdAt: now - DAY,
      updatedAt: now - 26 * HOUR,
      deletedAt: null,
    },
    {
      id: createId(),
      title: "Product ideas worth exploring",
      content:
        "A running list that keeps growing:\n\n• Offline-first note sync for teams\n• A focus timer that pairs with a notebook\n• Highlight-to-quote from any note\n• Daily digest of yesterday's pins\n\nKeep the ones that survive two weeks; archive the rest.",
      category: "Ideas",
      color: "violet",
      pinned: false,
      createdAt: now - 3 * DAY,
      updatedAt: now - DAY,
      deletedAt: null,
    },
    {
      id: createId(),
      title: "UI/UX reading list",
      content:
        "What I'm working through this month:\n\n- Refactoring UI (Wroblewski)\n- Designing Interfaces — patterns for cards, empty states, and search\n- Laws of UX for the dashboard refresh\n\nTake notes on one chapter a week.",
      category: "Study",
      color: "emerald",
      pinned: false,
      createdAt: now - 5 * DAY,
      updatedAt: now - 2 * DAY,
      deletedAt: null,
    },
    {
      id: createId(),
      title: "A quiet Saturday",
      content:
        "Slow morning, coffee by the window, and a book I keep meaning to finish. Grateful for the quiet hours before the week picks up again.\n\nNote to self: plan more of these.",
      category: "Journal",
      color: "rose",
      pinned: false,
      createdAt: now - 6 * DAY,
      updatedAt: now - 6 * DAY,
      deletedAt: null,
    },
    {
      id: createId(),
      title: "Grocery list",
      content:
        "Oat milk\nEggs (free-range)\nSourdough\nSpinach\nA good dark chocolate\n\nMostly vibes, partially nutrition.",
      category: "Personal",
      color: "slate",
      pinned: false,
      createdAt: now - 8 * DAY,
      updatedAt: now - 8 * DAY,
      deletedAt: null,
    },
  ];
}
