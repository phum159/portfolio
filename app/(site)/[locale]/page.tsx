import Link from "next/link";
import Section from "@/components/ui/Section";
import ProjectCard from "@/components/ui/ProjectCard";
import { Chip } from "@/components/ui/Section";
import { allProjects, featuredProjects, profile, skillGroups } from "@/content";
import { isLocale, localePath, pick, t } from "@/lib/i18n";
import { notFound } from "next/navigation";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  // Fall back to the newest projects so the home page is never empty
  // while `featured` flags are still being decided.
  const featured = featuredProjects();
  const shown = featured.length > 0 ? featured : allProjects().slice(0, 2);

  return (
    <>
      <section className="mb-14">
        <p className="font-mono text-sm text-accent">{pick(profile.headline, locale)}</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">
          {pick(profile.name, locale)}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">{pick(profile.tagline, locale)}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={localePath(locale, "/projects")}
            className="rounded bg-accent px-4 py-2 text-sm text-accent-contrast"
          >
            {t(locale, "home.viewAll")}
          </Link>
          <Link
            href={localePath(locale, "/contact")}
            className="rounded border border-line px-4 py-2 text-sm"
          >
            {t(locale, "nav.contact")}
          </Link>
        </div>
      </section>

      <Section
        title={t(locale, "home.featured")}
        action={
          <Link
            href={localePath(locale, "/projects")}
            className="text-sm text-accent underline underline-offset-4"
          >
            {t(locale, "home.viewAll")} →
          </Link>
        }
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {shown.map((project) => (
            <ProjectCard key={project.slug} project={project} locale={locale} />
          ))}
        </div>
      </Section>

      <Section
        title={t(locale, "home.skillsPeek")}
        action={
          <Link
            href={localePath(locale, "/skills")}
            className="text-sm text-accent underline underline-offset-4"
          >
            {t(locale, "nav.skills")} →
          </Link>
        }
      >
        <ul className="flex flex-wrap gap-1.5">
          {skillGroups
            .flatMap((group) => group.items)
            .filter((skill) => skill.level >= 3)
            .map((skill) => (
              <li key={skill.name}>
                <Chip>{skill.name}</Chip>
              </li>
            ))}
        </ul>
      </Section>
    </>
  );
}
