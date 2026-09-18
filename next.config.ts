import type { NextConfig } from "next";

/**
 * Static export for GitHub Pages (user site: <username>.github.io).
 *
 * - `output: "export"`  -> `npm run build` writes plain HTML/CSS/JS into `out/`
 * - `trailingSlash`     -> emits `/th/about/index.html`, which is what Pages serves
 * - `images.unoptimized`-> the Next image optimizer needs a server; Pages has none
 *
 * NOTE: this is a *user site*, so the site lives at the domain root and needs no
 * basePath. If this ever moves to a project repo (username.github.io/portfolio),
 * add `basePath` + `assetPrefix` here and nothing else has to change.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
