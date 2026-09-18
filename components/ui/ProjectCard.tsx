import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content";
import { localePath, pick, t, type Locale } from "@/lib/i18n";
import { Chip } from "./Section";

export default function ProjectCard({
  project,
  locale,
}: {
  project: Project;
  locale: Locale;
}) {
  const href = localePath(locale, `/projects/${project.slug}`);

  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-line bg-surface">
      {project.cover && (
        <Image
          src={project.cover}
          alt=""
          width={800}
          height={450}
          className="h-40 w-full object-cover"
        />
      )}

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-semibold tracking-tight">
            <Link href={href} className="hover:text-accent">
              {pick(project.title, locale)}
            </Link>
          </h3>
          <span className="font-mono text-xs text-muted">{project.year}</span>
        </div>

        <p className="text-sm text-muted">{pick(project.summary, locale)}</p>

        <ul className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {project.tags.slice(0, 5).map((tag) => (
            <li key={tag}>
              <Chip>{tag}</Chip>
            </li>
          ))}
        </ul>

        <Link href={href} className="text-sm text-accent underline underline-offset-4">
          {t(locale, "projects.readMore")} →
        </Link>
      </div>
    </article>
  );
}
