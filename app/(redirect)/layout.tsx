import type { Metadata } from "next";
import { fontVariables } from "@/components/layout/Fonts";
import { defaultLocale } from "@/lib/i18n";
import "../globals.css";

/**
 * Root layout for the language-picker stub at "/" only.
 *
 * The real site has its own root layout in app/(site)/[locale]/layout.tsx,
 * which is what lets each language set <html lang> correctly.
 */
export const metadata: Metadata = {
  title: "Portfolio",
  robots: { index: false },
};

export default function RedirectLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang={defaultLocale} className={`${fontVariables} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
