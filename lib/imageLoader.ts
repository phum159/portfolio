/**
 * Custom image loader for the static export.
 *
 * `images.unoptimized` does NOT apply basePath, so every <Image src="/...">
 * would point at the domain root and 404 on GitHub Pages. A custom loader
 * is the supported way to handle images in a static export, and it lets
 * the prefix be applied in exactly one place instead of at every call site.
 *
 * Width and quality are ignored: nothing resizes these files, the browser
 * gets the original.
 */
export default function imageLoader({ src }: { src: string }): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return src.startsWith("/") ? `${basePath}${src}` : src;
}
