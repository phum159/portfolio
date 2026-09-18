/**
 * Post-build fix for Next.js 16 static exports.
 *
 * Next's client prefetches per-route RSC payloads from flat, dot-joined URLs:
 *     /th/__next.!KHNpdGUp.$d$locale.__PAGE__.txt
 * but `output: "export"` writes them as nested directories:
 *     out/th/__next.!KHNpdGUp/$d$locale/__PAGE__.txt
 *
 * On a real Next server the router maps between the two. A dumb static host
 * (GitHub Pages) cannot, so every page logs a pile of 404s and prefetching
 * silently does nothing. This copies each nested file to the flat name the
 * browser actually asks for. Originals are left in place.
 *
 * Verify it is still needed after a Next upgrade: build, serve `out/`, open a
 * page and check the console. If there are no 404s, delete this script and the
 * `postbuild` entry in package.json.
 */
import { readdir, copyFile } from "node:fs/promises";
import { join } from "node:path";

const OUT = "out";
const SEGMENT_DIR_PREFIX = "__next.!";

/** All files under `dir`, as path segments relative to `dir`. */
async function walk(dir, prefix = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const next = [...prefix, entry.name];
    if (entry.isDirectory()) {
      files.push(...(await walk(join(dir, entry.name), next)));
    } else {
      files.push(next);
    }
  }
  return files;
}

/** Find every `__next.!*` directory in the export and flatten what is inside. */
async function flatten(dir) {
  let copied = 0;
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;

    if (entry.name.startsWith(SEGMENT_DIR_PREFIX)) {
      const segmentDir = join(dir, entry.name);
      for (const parts of await walk(segmentDir)) {
        const flatName = [entry.name, ...parts].join(".");
        await copyFile(join(segmentDir, ...parts), join(dir, flatName));
        copied += 1;
      }
    } else {
      copied += await flatten(join(dir, entry.name));
    }
  }
  return copied;
}

const copied = await flatten(OUT);
console.log(`flatten-segments: wrote ${copied} prefetch payload(s)`);
