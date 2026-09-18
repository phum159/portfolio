import type { NextConfig } from "next";

/**
 * Static export for GitHub Pages.
 *
 * The repo is a *project* repo (github.com/phum159/portfolio), so the site
 * is served from https://phum159.github.io/portfolio — everything has to
 * be prefixed with that path or the CSS, JS and images all 404.
 *
 * `basePath` covers next/link and next/image automatically. Anything that
 * builds a URL by hand (a raw <a href> to a file in /public, a
 * window.location assignment) must use withBasePath() from lib/site.ts —
 * which is why the value is also exported to the client as an env var.
 *
 * If this ever moves to a user site (phum159.github.io), set
 * NEXT_PUBLIC_BASE_PATH="" and nothing else has to change.
 *
 * - `output: "export"`  -> `npm run build` writes plain HTML/CSS/JS into `out/`
 * - `trailingSlash`     -> emits `/th/about/index.html`, which is what Pages serves
 * - custom image loader -> Pages has no image optimizer, and it applies basePath
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/portfolio";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  // A custom loader, not `unoptimized`: unoptimized images ignore basePath
  // and would 404. See lib/imageLoader.ts.
  images: { loader: "custom", loaderFile: "./lib/imageLoader.ts" },
  basePath,
  assetPrefix: basePath || undefined,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
