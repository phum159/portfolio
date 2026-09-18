"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeLabel, locales, switchLocale, type Locale } from "@/lib/i18n";

/**
 * Swaps the locale segment of the current URL, so the visitor stays on
 * the page they were reading, and remembers the choice for "/".
 */
export default function LocaleSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname() || `/${locale}`;

  return (
    <div className="flex items-center gap-1 text-sm">
      {locales.map((target, i) => (
        <span key={target} className="flex items-center gap-1">
          {i > 0 && <span className="text-line select-none">/</span>}
          <Link
            href={switchLocale(pathname, target)}
            hrefLang={target}
            aria-current={target === locale ? "true" : undefined}
            onClick={() => {
              try {
                window.localStorage.setItem("locale", target);
              } catch {
                /* storage blocked — the switch still works for this visit */
              }
            }}
            className={
              target === locale
                ? "font-medium text-accent"
                : "text-muted hover:text-foreground"
            }
          >
            {localeLabel[target]}
          </Link>
        </span>
      ))}
    </div>
  );
}
