"use client";

import { useSyncExternalStore } from "react";
import { getTheme, setTheme, subscribeTheme } from "@/lib/theme";

/**
 * Flips <html data-theme>, which app/globals.css reads.
 * The theme itself lives in the DOM, not in React state, so the value
 * set by the pre-paint init script and the value React renders can
 * never disagree.
 */
export default function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribeTheme,
    getTheme,
    () => null, // during prerender there is no DOM to ask
  );

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle dark mode"
      className="rounded border border-line px-2 py-1 font-mono text-xs text-muted hover:text-foreground"
    >
      {theme === "dark" ? "☾" : "☀"}
    </button>
  );
}
