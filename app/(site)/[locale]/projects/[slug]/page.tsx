import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Section, { Chip, PageHeader } from "@/components/ui/Section";
import Diagram from "@/components/ui/Diagram";
import HeightMeterDemo from "@/components/ui/HeightMeterDemo";
import LampDemo from "@/components/ui/LampDemo";
import ZoomableImage from "@/components/ui/ZoomableImage";
import { getProject, projects } from "@/content";
import { isLocale, localePath, locales, pick, t } from "@/lib/i18n";

/**
 * One static page per project per language, generated straight from
 * content/projects.ts. Add a project there and its page appears here.
 */
export function generateStaticParams() {
  return locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/projects/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!isLocale(locale) || !project) return {};
  return {
    title: pick(project.title, locale),
    description: pick(project.summary, locale),
  };
}

export default async function ProjectPage({
  params,
}: PageProps<"/[locale]/projects/[slug]">) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const project = getProject(slug);
  if (!project) notFound();

  return (
    <article>
      <Link
        href={localePath(locale, "/projects")}
        className="mb-6 inline-block text-sm text-muted hover:text-foreground"
      >
        ← {t(locale, "projects.back")}
      </Link>

      <PageHeader
        title={pick(project.title, locale)}
        intro={pick(project.summary, locale)}
      />

      <dl className="mb-10 flex flex-wrap gap-x-8 gap-y-2 text-sm">
        <div>
          <dt className="font-mono text-xs text-muted">{t(locale, "projects.year")}</dt>
          <dd>{project.year}</dd>
        </div>
        {project.role && (
          <div className="max-w-md">
            <dt className="font-mono text-xs text-muted">{t(locale, "projects.role")}</dt>
            <dd>{pick(project.role, locale)}</dd>
          </div>
        )}
      </dl>

      {/*
       * Awards sit above the fold on purpose: for a competition entry
       * that result is the headline, not a footnote at the end.
       */}
      {project.awards && project.awards.length > 0 && (
        <ul className="mb-10 flex flex-col gap-3">
          {project.awards.map((award, i) => (
            <li
              key={i}
              className="rounded-lg border border-line-strong bg-surface p-4"
            >
              <p className="font-semibold text-accent-alt">
                {pick(award.result, locale)}
              </p>
              <p className="mt-1 text-sm">{pick(award.event, locale)}</p>
              <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-muted">
                <span>{pick(award.date, locale)}</span>
                {award.level && (
                  <span>
                    {t(locale, "project.awardLevel")}: {pick(award.level, locale)}
                  </span>
                )}
                {award.category && (
                  <span>
                    {t(locale, "project.awardCategory")}:{" "}
                    {pick(award.category, locale)}
                  </span>
                )}
              </p>
              {award.href && (
                <a
                  href={award.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-2 inline-block text-sm text-accent underline underline-offset-4"
                >
                  {t(locale, "certificates.verify")} ↗
                </a>
              )}
            </li>
          ))}
        </ul>
      )}

      {project.cover && (
        <ZoomableImage
          src={project.cover}
          alt={pick(project.title, locale)}
          width={1600}
          height={900}
          locale={locale}
          wrapperClassName="mb-10"
          /* Photos come in both orientations, so bound the height and let
             the width follow rather than forcing a fixed aspect ratio --
             a portrait shot in a 16:9 box is either a sliver or a tower. */
          className="max-h-[30rem] w-auto max-w-full rounded-lg border border-line"
          priority
        />
      )}

      {/*
       * Interactive demos are code, so they live in a registry here rather
       * than in content/. A project opts in with `demo` in projects.ts.
       */}
      {project.demo && (
        <Section
          title={t(locale, "demo.title")}
          intro={t(locale, project.demo === "auto-lamp" ? "demo.intro" : "demo.introHeight")}
        >
          {project.demo === "auto-lamp" ? (
            <LampDemo locale={locale} />
          ) : (
            <HeightMeterDemo locale={locale} />
          )}
        </Section>
      )}

      <Prose title={t(locale, "project.problem")} text={pick(project.body.problem, locale)} />
      <Section title={t(locale, "project.architecture")}>
        {project.diagram && <Diagram data={project.diagram} locale={locale} />}
        <p className="leading-relaxed">{pick(project.body.architecture, locale)}</p>
      </Section>

      <Section title={t(locale, "project.challenges")}>
        <ul className="flex list-disc flex-col gap-2 pl-5 leading-relaxed">
          {pick(project.body.challenges, locale).map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </Section>

      <Prose title={t(locale, "project.outcome")} text={pick(project.body.outcome, locale)} />

      {project.hardware && project.hardware.length > 0 && (
        <Section title={t(locale, "project.hardware")}>
          <div className="overflow-x-auto rounded-lg border border-line">
            <table className="w-full min-w-[32rem] text-left text-sm">
              <thead className="bg-surface font-mono text-xs text-muted">
                <tr>
                  <th className="px-3 py-2">{t(locale, "project.part")}</th>
                  <th className="px-3 py-2">{t(locale, "project.partRole")}</th>
                  <th className="px-3 py-2">{t(locale, "project.bus")}</th>
                </tr>
              </thead>
              <tbody>
                {project.hardware.map((item) => (
                  <tr key={item.part} className="border-t border-line align-top">
                    <td className="px-3 py-2 font-mono text-xs">{item.part}</td>
                    <td className="px-3 py-2">{pick(item.role, locale)}</td>
                    <td className="px-3 py-2 font-mono text-xs text-muted">
                      {item.bus ?? "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      )}

      {project.stack && project.stack.length > 0 && (
        <Section title={t(locale, "project.stack")}>
          <ul className="flex flex-wrap gap-1.5">
            {project.stack.map((item) => (
              <li key={item}>
                <Chip>{item}</Chip>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {project.gallery && project.gallery.length > 0 && (
        <Section title={t(locale, "project.gallery")}>
          <div className="grid gap-4 sm:grid-cols-2">
            {project.gallery.map((shot) => (
              <figure key={shot.src}>
                <ZoomableImage
                  src={shot.src}
                  alt={shot.caption ? pick(shot.caption, locale) : ""}
                  width={800}
                  height={600}
                  locale={locale}
                  className="max-h-96 w-auto max-w-full rounded-lg border border-line"
                />
                {shot.caption && (
                  <figcaption className="mt-2 text-xs text-muted">
                    {pick(shot.caption, locale)}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </Section>
      )}

      {project.links && project.links.length > 0 && (
        <Section title={t(locale, "project.links")}>
          <ul className="flex flex-wrap gap-3">
            {project.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="rounded border border-line px-3 py-1.5 text-sm hover:text-accent"
                >
                  {link.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </article>
  );
}

function Prose({ title, text }: { title: string; text: string }) {
  return (
    <Section title={title}>
      <p className="leading-relaxed">{text}</p>
    </Section>
  );
}

