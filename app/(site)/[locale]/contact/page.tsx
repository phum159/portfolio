import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/Section";
import { profile } from "@/content";
import { isLocale, t } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { title: t(locale, "contact.title") };
}

/**
 * Links only — no form. The site is a static export with no backend,
 * so there is nothing that could receive a POST.
 */
export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <PageHeader title={t(locale, "contact.title")} intro={t(locale, "contact.intro")} />

      <ul className="flex flex-col gap-3">
        {profile.contacts.map((contact) => {
          const external = contact.href.startsWith("http");
          return (
            <li key={contact.href}>
              <a
                href={contact.href}
                {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
                className="flex items-center gap-3 rounded-lg border border-line bg-surface px-4 py-3 hover:text-accent"
              >
                <span className="w-20 shrink-0 font-mono text-xs uppercase text-muted">
                  {contact.id}
                </span>
                <span className="break-all text-sm">{contact.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </>
  );
}
