import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectBrowser from "@/components/ui/ProjectBrowser";
import { PageHeader } from "@/components/ui/Section";
import { allProjects, allTags } from "@/content";
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
      <ProjectBrowser projects={allProjects()} tags={allTags()} locale={locale} />
    </>
  );
}
