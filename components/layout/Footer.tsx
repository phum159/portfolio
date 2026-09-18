import { profile } from "@/content";
import { site } from "@/lib/site";
import { pick, t, type Locale } from "@/lib/i18n";

export default function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="mt-16 border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {pick(profile.name, locale)}
        </p>
        <p className="font-mono text-xs">
          {t(locale, "footer.builtWith")} Next.js ·{" "}
          <a href={site.repo} className="underline underline-offset-4 hover:text-foreground">
            {t(locale, "footer.source")}
          </a>
        </p>
      </div>
    </footer>
  );
}
