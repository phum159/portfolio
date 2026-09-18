/** Site-wide constants that are not "content" and not UI copy. */
export const site = {
  url: "https://phum159.github.io/portfolio",
  githubUser: "phum159",
  /** Repo holding this website, linked in the footer. */
  repo: "https://github.com/phum159/portfolio",
} as const;

/**
 * The path prefix the site is served under. Set in next.config.ts and
 * inlined at build time; "" when the site sits at a domain root.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Prefix a public-folder path with the basePath.
 *
 * Only for URLs built by hand — a raw <a href> to a PDF, a
 * window.location assignment. next/link and next/image already do this
 * themselves, so passing their hrefs through here would double the prefix.
 */
export function withBasePath(path: string): string {
  return `${basePath}${path}`;
}
