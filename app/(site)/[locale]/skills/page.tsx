import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SkillGroupCard from "@/components/ui/SkillGroupCard";
import { PageHeader } from "@/components/ui/Section";
import { skillGroups } from "@/content";
import { isLocale, t } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/skills">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { title: t(locale, "skills.title") };
}

export default async function SkillsPage({ params }: PageProps<"/[locale]/skills">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <PageHeader title={t(locale, "skills.title")} intro={t(locale, "skills.intro")} />
      <div className="grid gap-5 sm:grid-cols-2">
        {skillGroups.map((group) => (
          <SkillGroupCard key={group.id} group={group} locale={locale} />
        ))}
      </div>
    </>
  );
}
