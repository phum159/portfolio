import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Section, { PageHeader } from "@/components/ui/Section";
import Timeline from "@/components/ui/Timeline";
import { profile, resumeByKind } from "@/content";
import { isLocale, pick, t } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/resume">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { title: t(locale, "resume.title") };
}

export default async function ResumePage({ params }: PageProps<"/[locale]/resume">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const sections = [
    { key: "resume.education", entries: resumeByKind("education") },
    { key: "resume.experience", entries: resumeByKind("experience") },
    { key: "resume.activity", entries: resumeByKind("activity") },
  ] as const;

  return (
    <>
      <PageHeader title={t(locale, "resume.title")} />

      {profile.resume && (
        <a
          href={pick(profile.resume, locale)}
          download
          className="mb-10 inline-block rounded bg-accent px-4 py-2 text-sm text-accent-contrast"
        >
          {t(locale, "resume.download")} ↓
        </a>
      )}

      {sections.map(
        (section) =>
          section.entries.length > 0 && (
            <Section key={section.key} title={t(locale, section.key)}>
              <Timeline entries={section.entries} locale={locale} />
            </Section>
          ),
      )}
    </>
  );
}
