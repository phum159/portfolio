"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/content";
import { t, type Locale } from "@/lib/i18n";
import ProjectCard from "./ProjectCard";

/**
 * Tag filter + grid. The tag list is passed in, already derived from the
 * project data (see allTags() in content/index.ts), so adding a project
 * with a new tag makes the filter grow on its own.
 */
export default function ProjectBrowser({
  projects,
  tags,
  locale,
}: {
  projects: Project[];
  tags: string[];
  locale: Locale;
}) {
  const [active, setActive] = useState<string | null>(null);

  const visible = useMemo(
    () => (active ? projects.filter((p) => p.tags.includes(active)) : projects),
    [projects, active],
  );

  return (
    <>
      <ul className="mb-6 flex flex-wrap gap-2">
        <li>
          <FilterButton
            label={t(locale, "projects.all")}
            selected={active === null}
            onClick={() => setActive(null)}
          />
        </li>
        {tags.map((tag) => (
          <li key={tag}>
            <FilterButton
              label={tag}
              selected={active === tag}
              onClick={() => setActive(active === tag ? null : tag)}
            />
          </li>
        ))}
      </ul>

      {visible.length === 0 ? (
        <p className="text-muted">{t(locale, "projects.empty")}</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">
          {visible.map((project) => (
            <ProjectCard key={project.slug} project={project} locale={locale} headingLevel={2} />
          ))}
        </div>
      )}
    </>
  );
}

function FilterButton({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={
        selected
          ? "rounded border border-accent bg-accent px-2.5 py-1 font-mono text-xs text-accent-contrast"
          : "rounded border border-line bg-surface px-2.5 py-1 font-mono text-xs text-muted hover:text-foreground"
      }
    >
      {label}
    </button>
  );
}
