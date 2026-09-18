import type { ReactNode } from "react";

/**
 * A titled block. Every page is built out of these so headings stay
 * consistent — restyle once here instead of on every page.
 */
export default function Section({
  title,
  intro,
  action,
  children,
}: {
  title: string;
  intro?: string;
  /** Optional element on the right of the heading, e.g. a "view all" link. */
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="mb-12">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        {action}
      </div>
      {intro && <p className="mb-6 max-w-2xl text-muted">{intro}</p>}
      {children}
    </section>
  );
}

/** Page-level heading, used once at the top of each page. */
export function PageHeader({ title, intro }: { title: string; intro?: string }) {
  return (
    <header className="mb-10">
      <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      {intro && <p className="mt-3 max-w-2xl text-muted">{intro}</p>}
    </header>
  );
}

/** Small inline label — tags, buses, years. */
export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded border border-line bg-surface px-2 py-0.5 font-mono text-xs text-muted">
      {children}
    </span>
  );
}
