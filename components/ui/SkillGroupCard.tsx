import type { SkillGroup, SkillLevel } from "@/content";
import { pick, t, type Locale, type StringKey } from "@/lib/i18n";

const levelKey: Record<SkillLevel, StringKey> = {
  1: "skills.level.1",
  2: "skills.level.2",
  3: "skills.level.3",
  4: "skills.level.4",
};

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
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-sm">{skill.name}</span>
              <span
                className="font-mono text-xs text-muted"
                title={t(locale, levelKey[skill.level])}
              >
                {t(locale, levelKey[skill.level])}
              </span>
            </div>
            {skill.note && (
              <p className="text-xs text-muted">{pick(skill.note, locale)}</p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
