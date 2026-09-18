"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import LocaleSwitch from "./LocaleSwitch";
import ThemeToggle from "./ThemeToggle";
import { localePath, t, type Locale, type StringKey } from "@/lib/i18n";

/**
 * The route list. Adding a page = adding one entry here plus the page
 * file itself; labels come from lib/i18n.ts, never from this file.
 */
const routes: { path: string; key: StringKey }[] = [
  { path: "/projects", key: "nav.projects" },
  { path: "/skills", key: "nav.skills" },
  { path: "/resume", key: "nav.resume" },
  { path: "/certificates", key: "nav.certificates" },
  { path: "/about", key: "nav.about" },
  { path: "/contact", key: "nav.contact" },
];

export default function Nav({ locale }: { locale: Locale }) {
  const pathname = usePathname() || "";
  const [open, setOpen] = useState(false);

  const isActive = (path: string) => pathname.startsWith(localePath(locale, path));

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center gap-4 px-4 py-3">
        <Link
          href={localePath(locale)}
          className="font-mono text-sm font-semibold tracking-tight"
        >
          {t(locale, "nav.home")}
        </Link>

        <nav className="ml-auto hidden md:block" aria-label="Main">
          <ul className="flex items-center gap-5 text-sm">
            {routes.map((route) => (
              <li key={route.path}>
                <Link
                  href={localePath(locale, route.path)}
                  aria-current={isActive(route.path) ? "page" : undefined}
                  className={
                    isActive(route.path)
                      ? "text-accent"
                      : "text-muted hover:text-foreground"
                  }
                >
                  {t(locale, route.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-3 md:ml-0">
          <LocaleSwitch locale={locale} />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="rounded border border-line px-2 py-1 font-mono text-xs md:hidden"
          >
            {open ? t(locale, "nav.close") : t(locale, "nav.menu")}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-line md:hidden" aria-label="Main (mobile)">
          <ul className="mx-auto max-w-5xl px-4 py-2">
            {routes.map((route) => (
              <li key={route.path}>
                <Link
                  href={localePath(locale, route.path)}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-sm"
                >
                  {t(locale, route.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
