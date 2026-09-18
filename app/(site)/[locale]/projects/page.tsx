import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectBrowser from "@/components/ui/ProjectBrowser";
import { PageHeader } from "@/components/ui/Section";
import { allProjects } from "@/content";
import { isLocale, t } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/projects">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { title: t(locale, "projects.title") };
}

export default async function ProjectsPage({ params }: PageProps<"/[locale]/projects">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <PageHeader title={t(locale, "projects.title")} intro={t(locale, "projects.intro")} />
      {/*
       * Tag filter is off for now -- only one real project exists, so a
       * row of tag buttons is just clutter. Once there are enough
       * projects to make filtering useful, switch this back to:
       *   import { allProjects, allTags } from "@/content";
       *   <ProjectBrowser projects={allProjects()} tags={allTags()} locale={locale} />
       * allTags() already derives its list from content/projects.ts, so
       * no other change is needed to bring the filter back.
       */}
      <ProjectBrowser projects={allProjects()} tags={[]} locale={locale} />
    </>
  );
}
