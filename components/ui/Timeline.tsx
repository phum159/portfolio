import type { ResumeEntry } from "@/content";
import { pick, type Locale } from "@/lib/i18n";

export default function Timeline({
  entries,
  locale,
}: {
  entries: ResumeEntry[];
  locale: Locale;
}) {
  if (entries.length === 0) return null;

  return (
    <ol className="flex flex-col gap-6 border-l border-line pl-5">
      {entries.map((entry, i) => (
        <li key={`${entry.kind}-${i}`} className="relative">
          <span
            aria-hidden
            className="absolute -left-[26px] top-2 h-2 w-2 rounded-full bg-accent"
          />
          <p className="font-mono text-xs text-muted">{pick(entry.period, locale)}</p>
          <h3 className="mt-1 font-semibold tracking-tight">{pick(entry.title, locale)}</h3>
          <p className="text-sm text-muted">{pick(entry.org, locale)}</p>
          {entry.details && (
            <ul className="mt-2 list-disc pl-5 text-sm">
              {pick(entry.details, locale).map((detail, j) => (
                <li key={j}>{detail}</li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ol>
  );
}
