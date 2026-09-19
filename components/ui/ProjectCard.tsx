import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content";
import { localePath, pick, t, type Locale } from "@/lib/i18n";
import { Chip } from "./Section";

export default function ProjectCard({
  project,
  locale,
  headingLevel = 3,
}: {
  project: Project;
  locale: Locale;
  /**
   * 3 under a Section heading (the home page), 2 when the cards are the
   * first thing below the page title (/projects). Skipping a level is a
   * screen-reader problem, not a styling one, so it is not a class.
   */
  headingLevel?: 2 | 3;
}) {
  const Heading = `h${headingLevel}` as "h2" | "h3";
  const href = localePath(locale, `/projects/${project.slug}`);

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-line bg-surface transition-all duration-200 hover:border-accent/60 hover:shadow-md">
      {project.cover ? (
        <div className="overflow-hidden bg-surface/80 border-b border-line">
          <Image
            src={project.cover}
            alt=""
            width={800}
            height={450}
            className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="flex h-32 w-full items-center justify-center border-b border-line bg-surface/50 font-mono text-xs text-muted">
          [NO_IMAGE_COVER]
        </div>
      )}

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-baseline justify-between gap-3">
          <Heading className="font-semibold tracking-tight text-lg">
            <Link href={href} className="hover:text-accent transition-colors">
              {pick(project.title, locale)}
            </Link>
          </Heading>
          <span className="font-mono text-xs text-muted bg-background border border-line px-2 py-0.5 rounded">
            {project.year}
          </span>
        </div>

        {project.awards && project.awards.length > 0 && (
          <p className="font-mono text-xs text-accent-alt">
            {pick(project.awards[0].result, locale)} ·{" "}
            {pick(project.awards[0].event, locale)}
          </p>
        )}

        <p className="text-sm text-muted line-clamp-2">{pick(project.summary, locale)}</p>

        <ul className="mt-auto flex flex-wrap gap-1.5 pt-3 border-t border-line/40">
          {project.tags.slice(0, 5).map((tag) => (
            <li key={tag}>
              <Chip>{tag}</Chip>
            </li>
          ))}
        </ul>

        <div className="pt-1">
          <Link href={href} className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline underline-offset-4">
            {t(locale, "projects.readMore")} →
          </Link>
        </div>
      </div>
    </article>
  );
}
