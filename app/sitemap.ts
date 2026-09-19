import type { MetadataRoute } from "next";
import { projects } from "@/content";
import { locales } from "@/lib/i18n";
import { site } from "@/lib/site";

// Static export needs this said out loud; see static-exports.md in the Next docs.
export const dynamic = "force-static";

/**
 * Every page, in both languages, with hreflang alternates so a search
 * engine knows the Thai and English versions are the same page.
 *
 * Static export writes this out as sitemap.xml at build time.
 */
const pages = ["", "/projects", "/skills", "/resume", "/certificates", "/about", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...pages, ...projects.map((p) => `/projects/${p.slug}`)];

  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${site.url}/${locale}${path}/`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${site.url}/${l}${path}/`]),
        ),
      },
    })),
  );
}
