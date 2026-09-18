# Design brief — for whoever styles this site

The foundation is done: routing, two languages, content model, static export
and the GitHub Pages deploy all work. The **theme** is now decided too — see
"The theme" below — but most pages have not been designed against it yet.
Plain-looking pages are wireframes, not an aesthetic to preserve.

Owner: an embedded systems engineering student applying for internships and
junior roles. The audience is recruiters and engineers. The site should look
precise and technical, not decorative.

---

## The theme: "SSD1306" OLED panel

The site is styled as a monochrome OLED display module — the kind of part
that shows up in the projects themselves. The reference is the SSD1306.

- **True black** (`#000000`) everywhere. Not near-black. An unlit OLED pixel
  is black, and that is what makes the cyan read as emitted light.
- **Cyan `#00e5ff`** is the one accent: links, active state, focus, anything
  the eye should land on. Used sparingly it glows; used everywhere it is noise.
- **Amber `#facc15`** (`accent-alt`) is the secondary accent, for status and
  warnings — the "yellow rows" of a two-colour SSD1306. Rare by design.
- **Panels** are `surface` (`#060c18`), barely lifted off black; the borders
  do the structural work, not the fill.
- **Monospace is the voice of the machine.** Part numbers, buses, tags, years,
  register-ish labels, section numbering — all `font-mono`. Prose is `font-sans`.
- **Textures**, already global in `app/globals.css`: a faint 16px pixel grid
  behind everything and a scanline overlay across the viewport. Do not add
  more of either, and do not re-implement them per component.
- **Glow utilities** are available: `glow-accent`, `glow-accent-alt`,
  `text-glow`. They are the only blessed way to make something emit light.

**Dark only.** There is no light mode and no theme toggle — do not add
`prefers-color-scheme` blocks, a `[data-theme]` switch, or a toggle button.

**Restraint is the brief.** The look should read as a well-made instrument,
not a hacker-movie prop. In particular, do NOT add fake live telemetry
(uptime counters, heap meters, tick counts), simulated oscilloscope traces,
or a fake serial console. They are dishonest on a page whose job is to
represent a real person's real work, and an embedded engineer reading this
site will spot invented numbers immediately.

---

## Where you may work

| Area | Status |
|---|---|
| `components/ui/*`, `components/layout/*` | ✅ redesign freely |
| `app/globals.css` | ✅ this is where the design tokens live |
| Layout/markup inside any `app/**/page.tsx` | ✅ rearrange as needed |
| New components | ✅ add them under `components/` |
| `content/*` | ❌ do not edit — that is Phum's data |
| `lib/i18n.ts`, `content/index.ts` | ❌ do not change existing signatures |
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
   `text-muted`, `border-line`, `border-line-strong`, `text-accent`,
   `bg-accent`, `text-accent-contrast`, `text-accent-alt`. Change the
   *values* in `app/globals.css`.
5. **Never invent content.** Skills, part numbers, years, metrics and
   statuses come from `content/` and nothing else. If a section needs a list
   of technologies, derive it from `skillGroups` or a project's `tags` —
   never type the list into JSX. This site is used to apply for jobs; a
   fabricated skill is a problem in an interview, not a design detail.
6. **Static export only.** No server actions, no API routes, no `next/image`
   loaders, no runtime data fetching. `npm run build` must keep producing `out/`.
7. **Thai and English are both first-class.** Thai text runs longer and taller
   than English — test both. `font-sans` is Inter for Latin with IBM Plex Sans
   Thai behind it, so mixed sentences resolve per glyph. `font-mono`
   (JetBrains Mono) is Latin-only: use it for part numbers, years, tags and
   bus names, never for a Thai sentence. Thai stacks vowels and tone marks
   above and below the baseline, so avoid tight line-height and heavy
   overlays on Thai text.

---

## Component inventory

All props are already typed; these are the shapes you are styling.

**`components/layout/`**
- `Nav({ locale })` — sticky header, route list lives at the top of the file,
  labels come from i18n. Collapses to a button + panel below `md`.
- `Footer({ locale })`
- `LocaleSwitch({ locale })` — swaps the locale segment of the current URL.

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
- Switch language mid-page — you must stay on the same page.
- Read a Thai paragraph closely: tone marks must not be clipped by the
  scanline overlay or a tight line-height.
