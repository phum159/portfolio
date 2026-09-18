"use client";

import Link from "next/link";
import { useEffect } from "react";
import { defaultLocale, isLocale, localeLabel, locales } from "@/lib/i18n";

/**
 * "/" is not a real page — it just forwards to /th or /en.
 *
 * Static export has no server, so this cannot be a redirect() or
 * middleware; it has to happen in the browser. Order of preference:
 *   1. the language the visitor chose last time (localStorage)
 *   2. the browser's own language
 *   3. defaultLocale
 *
 * The visible links are the no-JavaScript fallback and are also what a
 * crawler follows.
 */
export default function RootRedirect() {
  useEffect(() => {
    let target: string = defaultLocale;

    try {
      const saved = window.localStorage.getItem("locale");
      if (saved && isLocale(saved)) target = saved;
      else if (navigator.language.toLowerCase().startsWith("en")) target = "en";
    } catch {
      // private mode / blocked storage: fall through to defaultLocale
      if (navigator.language.toLowerCase().startsWith("en")) target = "en";
    }

    window.location.replace(`/${target}/`);
  }, []);

  return (
    <main className="flex flex-1 items-center justify-center p-8">
      <nav className="flex flex-col items-center gap-4">
        <p className="font-mono text-sm opacity-60">Redirecting…</p>
        <ul className="flex gap-4">
          {locales.map((locale) => (
            <li key={locale}>
              <Link href={`/${locale}`} className="underline underline-offset-4">
                {localeLabel[locale]}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}
