import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/layout/Footer";
import Nav from "@/components/layout/Nav";
import { fontVariables } from "@/components/layout/Fonts";
import { profile } from "@/content";
import { isLocale, locales, pick } from "@/lib/i18n";
import { site } from "@/lib/site";
import "../../globals.css";

/**
 * Root layout for the site itself. Every page below it is rendered once
 * per locale at build time, which is what makes the whole thing a static
 * export with correct <html lang> per language.
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${pick(profile.name, locale)} — ${pick(profile.headline, locale)}`,
      template: `%s — ${pick(profile.name, locale)}`,
    },
    description: pick(profile.tagline, locale),
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
    },
    /*
     * Without these, pasting the link into LinkedIn, Facebook or Line
     * shows a bare URL. A portfolio exists to be shared, so it gets a card.
     */
    openGraph: {
      type: "website",
      url: `/${locale}`,
      siteName: pick(profile.name, locale),
      title: `${pick(profile.name, locale)} — ${pick(profile.headline, locale)}`,
      description: pick(profile.tagline, locale),
      locale: locale === "th" ? "th_TH" : "en_US",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: pick(profile.name, locale) }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${pick(profile.name, locale)} — ${pick(profile.headline, locale)}`,
      description: pick(profile.tagline, locale),
      images: ["/og.png"],
    },
  };
}

export default async function SiteLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale} className={`${fontVariables} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Nav locale={locale} />
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
