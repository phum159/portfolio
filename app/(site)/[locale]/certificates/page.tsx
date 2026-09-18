import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CertCard from "@/components/ui/CertCard";
import { PageHeader } from "@/components/ui/Section";
import { certificates } from "@/content";
import { isLocale, t } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/certificates">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { title: t(locale, "certificates.title") };
}

export default async function CertificatesPage({
  params,
}: PageProps<"/[locale]/certificates">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <PageHeader
        title={t(locale, "certificates.title")}
        intro={t(locale, "certificates.intro")}
      />
      {certificates.length === 0 ? (
        <p className="text-muted">{t(locale, "certificates.empty")}</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">
          {certificates.map((cert) => (
            <CertCard key={cert.id} cert={cert} locale={locale} />
          ))}
        </div>
      )}
    </>
  );
}
