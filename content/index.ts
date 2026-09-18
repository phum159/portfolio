/**
 * Single entry point for content. Pages import from "@/content" only —
 * they never reach into the individual files or loop over the raw arrays.
 */
import { certificates } from "./certificates";
import { profile } from "./profile";
import { projects } from "./projects";
import { resumeEntries } from "./resume";
import { skillGroups } from "./skills";
import type { Project, ResumeKind } from "./types";

export { certificates, profile, projects, resumeEntries, skillGroups };
export * from "./types";

/** Newest first — the order projects should be displayed in. */
export function allProjects(): Project[] {
  return [...projects].sort((a, b) => b.year - a.year);
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function featuredProjects(): Project[] {
  return allProjects().filter((p) => p.featured);
}

export function projectsByTag(tag: string): Project[] {
  return allProjects().filter((p) => p.tags.includes(tag));
}

/** Every tag used by at least one project, most used first, then A–Z. */
export function allTags(): string[] {
  const counts = new Map<string, number>();
  for (const project of projects) {
    for (const tag of project.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([tag]) => tag);
}

export function resumeByKind(kind: ResumeKind) {
  return resumeEntries.filter((entry) => entry.kind === kind);
}
