import type { SkillGroup } from "@/content";
import { pick, type Locale } from "@/lib/i18n";

export default function SkillGroupCard({
  group,
  locale,
}: {
  group: SkillGroup;
  locale: Locale;
}) {
  return (
    <section className="rounded-lg border border-line bg-surface p-4">
      <h2 className="mb-3 font-semibold tracking-tight">{pick(group.title, locale)}</h2>
      <ul className="flex flex-col gap-2.5">
        {group.items.map((skill) => (
          <li key={skill.name} className="flex flex-col gap-1">
            <span className="font-mono text-sm">{skill.name}</span>
            {skill.note && (
              <p className="text-xs text-muted">{pick(skill.note, locale)}</p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
