import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/Section";
import { profile } from "@/content";
import { isLocale, pick, t } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { title: t(locale, "about.title") };
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <PageHeader title={t(locale, "about.title")} />

      <div className="flex flex-col gap-8 sm:flex-row">
        {profile.photo && (
          <Image
            src={profile.photo}
            alt={pick(profile.name, locale)}
            width={240}
            height={240}
            className="h-40 w-40 shrink-0 rounded-lg border border-line object-cover"
          />
        )}

        <div className="max-w-2xl">
          {pick(profile.bio, locale).map((paragraph, i) => (
            <p key={i} className="mb-4 leading-relaxed">
              {paragraph}
            </p>
          ))}

          <p className="mt-6 text-sm text-muted">
            <span className="font-mono text-xs">{t(locale, "about.location")}:</span>{" "}
            {pick(profile.location, locale)}
          </p>
        </div>
      </div>
    </>
  );
}
