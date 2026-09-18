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

  const featured = featuredProjects();
  const shown = featured.length > 0 ? featured : allProjects().slice(0, 2);

  // Curated in content/skills.ts via `featured`, not ranked by a made-up score.
  const topSkills = skillGroups.flatMap((group) => group.items).filter((skill) => skill.featured);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl border border-line bg-surface/50 p-6 sm:p-10 shadow-xs">
        <div className="absolute top-0 right-0 -mt-6 -mr-6 h-40 w-40 rounded-full bg-accent/5 blur-3xl pointer-events-none" />
        
        {profile.availability && (
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-xs text-accent mb-6">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            {pick(profile.availability, locale)}
          </div>
        )}

        <p className="font-mono text-sm tracking-wider text-accent uppercase">
          {pick(profile.headline, locale)}
        </p>
        
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-foreground">
          {pick(profile.name, locale)}
        </h1>

        <p className="mt-4 max-w-2xl text-lg text-muted leading-relaxed">
          {pick(profile.tagline, locale)}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href={localePath(locale, "/projects")}
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-contrast shadow-sm hover:opacity-90 transition-opacity"
          >
            {t(locale, "home.viewAll")} →
          </Link>
          <Link
            href={localePath(locale, "/resume")}
            className="inline-flex items-center gap-2 rounded-lg border border-line bg-background px-5 py-2.5 text-sm font-semibold hover:bg-surface transition-colors"
          >
            {t(locale, "home.resumeCta")}
          </Link>
          <Link
            href={localePath(locale, "/contact")}
            className="inline-flex items-center gap-2 rounded-lg border border-line px-5 py-2.5 text-sm font-semibold text-muted hover:text-foreground hover:border-accent transition-colors"
          >
            {t(locale, "nav.contact")}
          </Link>
        </div>

        {/*
         * Hardware stack quick bar. Derived from content/skills.ts, never
         * typed out here -- the hard-coded version had drifted and was
         * claiming FreeRTOS, which is not a skill Phum has.
         */}
        <div className="mt-10 pt-6 border-t border-line/60 flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs text-muted mr-2">STACK:</span>
          {topSkills.map((skill) => (
            <Chip key={skill.name}>{skill.name}</Chip>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <Section
        title={t(locale, "home.featured")}
        action={
          <Link
            href={localePath(locale, "/projects")}
            className="group inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline underline-offset-4"
          >
            {t(locale, "home.viewAll")} <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        }
      >
        <div className="grid gap-6 sm:grid-cols-2">
          {shown.map((project) => (
            <ProjectCard key={project.slug} project={project} locale={locale} />
          ))}
        </div>
      </Section>

      {/* Skills / Lab Bench Peek */}
      <Section
        title={t(locale, "home.skillsPeek")}
        action={
          <Link
            href={localePath(locale, "/skills")}
            className="group inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline underline-offset-4"
          >
            {t(locale, "nav.skills")} <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        }
      >
        <div className="rounded-xl border border-line bg-surface/30 p-6">
          <ul className="flex flex-wrap gap-2">
            {topSkills.map((skill) => (
              <li key={skill.name}>
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-background px-3 py-1.5 font-mono text-xs text-foreground shadow-2xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {skill.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </div>
  );
}
