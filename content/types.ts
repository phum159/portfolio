/**
 * Content contract for the whole site.
 *
 * Everything a human reads lives in `content/*.ts` and is typed here.
 * Pages and components never hard-code copy — they receive these objects.
 *
 * Rule of thumb: if you can read it on screen and it is about Phum,
 * it belongs in `content/`. If it is a button label or a section heading,
 * it belongs in `lib/i18n.ts`.
 */

export const locales = ["th", "en"] as const;
export type Locale = (typeof locales)[number];

/** Every human-readable string exists in both languages. */
export type Localized<T = string> = Record<Locale, T>;

/** A link rendered as a button or chip (repo, demo, video, datasheet...). */
export interface LinkItem {
  label: string;
  href: string;
}

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

/** One row of the hardware table on a project page. */
export interface HardwareItem {
  /** Part number as printed on the chip/module, e.g. "STM32F103C8T6". */
  part: string;
  /** What it does in this build. */
  role: Localized;
  /** How it is wired, e.g. "I2C 0x44", "UART 256000", "SPI". */
  bus?: string;
}

export interface GalleryItem {
  /** Path under /public, e.g. "/images/smart-home/bench.jpg". */
  src: string;
  caption?: Localized;
}

/**
 * A competition result earned by a project.
 *
 * This is for the award attached to the invention itself. The scan of the
 * certificate belongs in `content/certificates.ts`, and a line on the CV
 * timeline belongs in `content/resume.ts` with kind "activity" — the same
 * win can legitimately appear in all three.
 */
export interface Award {
  /** What was won, e.g. "รองชนะเลิศอันดับ 1" / "Second runner-up". */
  result: Localized;
  /** Competition name, e.g. "การประกวดสิ่งประดิษฐ์ของคนรุ่นใหม่". */
  event: Localized;
  /** How far it went: institute, regional, national, international. */
  level?: Localized;
  /** The category entered, when the competition has several. */
  category?: Localized;
  /**
   * Display date. Localized because Thai uses the Buddhist era:
   * { th: "11 ธันวาคม 2567", en: "11 December 2024" }.
   */
  date: Localized;
  /** Results announcement or event page, if there is one. */
  href?: string;
}

/* ------------------------------------------------------------------ */
/* Architecture diagrams                                               */
/* ------------------------------------------------------------------ */

/**
 * One box. `label` is the part or product name and stays untranslated —
 * "STM32F103C8T6" reads the same in both languages.
 */
export interface DiagramNode {
  label: string;
  /** A few words on what it does here. Keep it to one line. */
  note?: Localized;
  /**
   * Emphasis. "primary" is the thing doing the work (the MCU, the server);
   * "output" is what the build ultimately drives. Everything else is plain
   * so the two that matter actually stand out.
   */
  accent?: "primary" | "output";
}

/**
 * A column. Boxes in the same stage are peers — four sensors feeding one
 * MCU is one stage of four nodes, not four stages.
 */
export interface DiagramStage {
  /** Caption above the column, e.g. "เซนเซอร์" / "Sensors". */
  title?: Localized;
  /**
   * Label on the arrow coming INTO this stage: "I2C", "UART", "MQTT".
   * Ignored on the first stage of a chain, which has nothing before it.
   */
  via?: string;
  nodes: DiagramNode[];
}

/** One left-to-right flow. A project can have more than one. */
export interface DiagramChain {
  title?: Localized;
  stages: DiagramStage[];
}

export interface Diagram {
  chains: DiagramChain[];
  /** Things a box-and-arrow picture cannot show, e.g. why a resistor is there. */
  notes?: Localized<string[]>;
}

/**
 * Adding a project = appending one of these to `content/projects.ts`.
 * Routing, the card grid, the tag filter and the detail page all derive
 * from this array — no other file needs to change.
 */
export interface Project {
  /** URL segment: /th/projects/<slug>. Lowercase, kebab-case, unique. */
  slug: string;
  title: Localized;
  /** One or two lines. Used on cards and as the page description. */
  summary: Localized;
  /** Used for sorting (newest first) and shown on the card. */
  year: number;
  /** What Phum personally did, when the project had other people in it. */
  role?: Localized;
  /** Free-form tags. The filter on /projects is built from these. */
  tags: string[];
  /** Show on the home page. */
  featured?: boolean;
  /** Path under /public. */
  cover?: string;
  gallery?: GalleryItem[];
  /** Competition results this project won. */
  awards?: Award[];
  links?: LinkItem[];
  hardware?: HardwareItem[];
  /** Software side: languages, frameworks, tools. */
  stack?: string[];
  /**
   * Opt in to an interactive demo rendered on the project page. This is
   * code rather than copy, so it is a fixed union: adding a value means
   * adding the matching component to the registry in the project page.
   */
  demo?: "auto-lamp" | "auto-height-meter";
  /** Block diagram shown above the architecture write-up. */
  diagram?: Diagram;
  /** The write-up, kept as structured fields instead of a blob of HTML. */
  body: {
    problem: Localized;
    architecture: Localized;
    /** Bullet list — the interesting part for an interviewer. */
    challenges: Localized<string[]>;
    outcome: Localized;
  };
}

/* ------------------------------------------------------------------ */
/* Skills / lab bench                                                  */
/* ------------------------------------------------------------------ */

/**
 * A tool, language or instrument. Deliberately no proficiency rating:
 * a self-assigned "level" is unverifiable and invites an interviewer to
 * argue with the number instead of reading the projects, which are the
 * real evidence.
 */
export interface Skill {
  name: string;
  /** Optional one-liner, e.g. "used on the smart home gateway". */
  note?: Localized;
  /** Show in the short list on the home page. */
  featured?: boolean;
}

export interface SkillGroup {
  id: string;
  title: Localized;
  items: Skill[];
}

/* ------------------------------------------------------------------ */
/* Resume                                                              */
/* ------------------------------------------------------------------ */

export type ResumeKind = "education" | "experience" | "activity";

export interface ResumeEntry {
  kind: ResumeKind;
  /**
   * Free text so "2023 – present" and "Jun 2025" both work.
   * Optional: better to leave it off than to guess at a date.
   */
  period?: Localized;
  title: Localized;
  org: Localized;
  /** Bullet points describing what happened. */
  details?: Localized<string[]>;
}

/* ------------------------------------------------------------------ */
/* Certificates                                                        */
/* ------------------------------------------------------------------ */

export interface Certificate {
  id: string;
  title: Localized;
  issuer: Localized;
  /** Display date, Localized for the same Buddhist-era reason as Award. */
  date: Localized;
  /** Scan or photo under /public. */
  image?: string;
  /** Verification / credential URL. */
  href?: string;
}

/* ------------------------------------------------------------------ */
/* Profile                                                             */
/* ------------------------------------------------------------------ */

export interface ContactLink {
  /** Used to pick an icon in the UI. */
  id: "email" | "github" | "linkedin" | "phone" | "line" | "other";
  label: string;
  /** Full href including scheme: "mailto:", "tel:", "https:". */
  href: string;
}

export interface Profile {
  name: Localized;
  /** What he is right now, e.g. "Computer Engineering Student". */
  headline: Localized;
  /** Availability, shown as a status pill, e.g. "ready for a 2027 internship". */
  availability?: Localized;
  /** One sentence for the hero. */
  tagline: Localized;
  /** A few paragraphs for /about. */
  bio: Localized<string[]>;
  location: Localized;
  photo?: string;
  /**
   * Resume PDFs under /public, one per language. Leave this out until the
   * files actually exist — the download button is only rendered when it is
   * set, so an unset value is better than a button that 404s.
   */
  resume?: Localized<string>;
  contacts: ContactLink[];
}
