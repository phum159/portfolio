import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Static export needs this said out loud; see static-exports.md in the Next docs.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
