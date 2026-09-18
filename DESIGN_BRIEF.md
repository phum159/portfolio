# Design brief — for whoever styles this site

The foundation is done: routing, two languages, content model, static export
and the GitHub Pages deploy all work. **What is missing is the visual design.**
The current styling is deliberately plain — treat it as a wireframe, not a
starting aesthetic to preserve.

Owner: an embedded systems engineering student applying for internships and
junior roles. The audience is recruiters and engineers. The site should look
precise and technical, not decorative.

---

## Where you may work

| Area | Status |
|---|---|
| `components/ui/*`, `components/layout/*` | ✅ redesign freely |
| `app/globals.css` | ✅ this is where the design tokens live |
| Layout/markup inside any `app/**/page.tsx` | ✅ rearrange as needed |
| New components | ✅ add them under `components/` |
| `content/*` | ❌ do not edit — that is Phum's data |
| `lib/i18n.ts`, `lib/theme.ts`, `content/index.ts` | ❌ do not change existing signatures |
| Route folder names under `app/` | ❌ do not rename — they are the URLs |

---

## Rules that keep the foundation intact

1. **Never write a user-visible string in JSX.** Every label goes through
   `t(locale, "some.key")` from `lib/i18n.ts`. Need a new label? Add the key
   there with both `th` and `en`, then use it. TypeScript enforces both.
2. **Never read `content/*` files directly from a page.** Use the helpers
   exported by `@/content` (`allProjects`, `getProject`, `featuredProjects`,
   `allTags`, `resumeByKind`).
3. **Every component keeps taking `locale`** and resolving text with
   `pick(value, locale)`. Do not flatten a `Localized` value into a string
   inside content or props.
4. **No colour literals in components.** Use the semantic Tailwind classes
   wired to the tokens: `bg-background`, `bg-surface`, `text-foreground`,
   `text-muted`, `border-line`, `text-accent`, `bg-accent`,
   `text-accent-contrast`. Change the *values* in `app/globals.css`.
5. **Both themes must work.** Light and dark are defined in `app/globals.css`;
   `<html data-theme>` is the switch and a pre-paint script in
   `app/(site)/[locale]/layout.tsx` sets it. Do not replace that mechanism.
6. **Static export only.** No server actions, no API routes, no `next/image`
   loaders, no runtime data fetching. `npm run build` must keep producing `out/`.
7. **Thai and English are both first-class.** Thai text runs longer and taller
   than English — test both. The font (IBM Plex Sans Thai) covers both scripts;
   `font-mono` (JetBrains Mono) is Latin-only, so use it for part numbers,
   years, tags and bus names — never for Thai sentences.

---

## Component inventory

All props are already typed; these are the shapes you are styling.

**`components/layout/`**
- `Nav({ locale })` — sticky header, route list lives at the top of the file,
  labels come from i18n. Collapses to a button + panel below `md`.
- `Footer({ locale })`
- `LocaleSwitch({ locale })` — swaps the locale segment of the current URL.
- `ThemeToggle()` — reads/writes `<html data-theme>` via `lib/theme.ts`.

**`components/ui/`**
- `Section({ title, intro?, action?, children })` — the standard titled block.
- `PageHeader({ title, intro? })` — top of every page (exported from `Section.tsx`).
- `Chip({ children })` — small mono label for tags, buses, stack items.
- `ProjectCard({ project, locale })`
- `ProjectBrowser({ projects, tags, locale })` — client component; tag filter + grid.
- `SkillGroupCard({ group, locale })`
- `Timeline({ entries, locale })`
- `CertCard({ cert, locale })`

---

## Pages and what each one needs to communicate

| Route | Job |
|---|---|
| `/[locale]` | In five seconds: who he is, what he builds, and a way into the projects. |
| `/[locale]/projects` | Scannable grid, filterable by tag. |
| `/[locale]/projects/[slug]` | The real substance: problem → architecture → challenges → outcome, plus a hardware table. This page matters most — make the hardware table and the challenge list genuinely readable. |
| `/[locale]/skills` | Grouped bench inventory with a level per item. |
| `/[locale]/resume` | Timeline + a prominent PDF download. |
| `/[locale]/certificates` | Image gallery; some entries have no image yet. |
| `/[locale]/about` | Short bio, optional photo. |
| `/[locale]/contact` | Links only. There is no form and there must not be one — no backend exists. |

Some content is still `TODO` placeholder text. Design for the shape, not for
the current strings, and assume fields like `cover`, `gallery`, `photo` and
`links` are often absent — the components already guard for that, keep it
looking right when they are missing.

---

## Checks before calling it done

```bash
npm run build     # must succeed and write out/
npx eslint .      # must be clean
npx serve out     # walk every page in BOTH languages
```

- Check at 375px wide as well as desktop.
- Toggle light/dark on every page.
- Switch language mid-page — you must stay on the same page.
