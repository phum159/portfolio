import { locales, type Locale, type Localized } from "@/content/types";

export { locales };
export type { Locale, Localized };

export const defaultLocale: Locale = "th";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Pick the right language out of a `Localized` value. */
export function pick<T>(value: Localized<T>, locale: Locale): T {
  return value[locale];
}

/** Build an in-site href: localePath("en", "/projects") -> "/en/projects". */
export function localePath(locale: Locale, path = "/"): string {
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean}`;
}

/**
 * Swap the locale segment of the current path, keeping the user on the
 * same page: switchLocale("/th/projects/smart-home/", "en")
 *   -> "/en/projects/smart-home/"
 */
export function switchLocale(pathname: string, next: Locale): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length && isLocale(parts[0])) {
    parts[0] = next;
  } else {
    parts.unshift(next);
  }
  return `/${parts.join("/")}`;
}

/** Human name of each language, in that language. */
export const localeLabel: Record<Locale, string> = {
  th: "ไทย",
  en: "English",
};

/**
 * All UI chrome (nav labels, buttons, section headings).
 *
 * Add new strings HERE, not inside JSX — that keeps both languages
 * complete, because TypeScript requires every key to have th + en.
 */
const strings = {
  "nav.home": { th: "หน้าแรก", en: "Home" },
  "nav.projects": { th: "โปรเจกต์", en: "Projects" },
  "nav.skills": { th: "ทักษะ", en: "Skills" },
  "nav.resume": { th: "ประวัติ", en: "Resume" },
  "nav.certificates": { th: "ใบรับรอง", en: "Certificates" },
  "nav.about": { th: "เกี่ยวกับผม", en: "About" },
  "nav.contact": { th: "ติดต่อ", en: "Contact" },

  "nav.menu": { th: "เมนู", en: "Menu" },
  "nav.close": { th: "ปิด", en: "Close" },

  "home.featured": { th: "โปรเจกต์เด่น", en: "Featured projects" },
  "home.viewAll": { th: "ดูโปรเจกต์ทั้งหมด", en: "View all projects" },
  "home.skillsPeek": { th: "ทักษะเด่นบนโต๊ะแล็บ", en: "Lab Bench Highlights" },
  "home.resumeCta": { th: "ดูประวัติ", en: "View Resume" },

  "projects.title": { th: "โปรเจกต์", en: "Projects" },
  "projects.intro": {
    th: "โปรเจกต์ที่ลงมือทำเองหรือมีส่วนร่วมในด้านต่าง ๆ",
    en: "Projects I've built myself or contributed to, across different areas.",
  },
  "projects.all": { th: "ทั้งหมด", en: "All" },
  "projects.empty": { th: "ยังไม่มีโปรเจกต์ในหมวดนี้", en: "No projects with this tag yet." },
  "projects.year": { th: "ปี", en: "Year" },
  "projects.role": { th: "บทบาท", en: "Role" },
  "projects.readMore": { th: "อ่านรายละเอียด", en: "Read more" },
  "projects.back": { th: "กลับไปหน้าโปรเจกต์", en: "Back to projects" },

  "project.problem": { th: "โจทย์", en: "Problem" },
  "project.architecture": { th: "สถาปัตยกรรม", en: "Architecture" },
  "project.challenges": { th: "ปัญหาที่เจอและวิธีแก้", en: "Challenges & fixes" },
  "project.outcome": { th: "ผลลัพธ์", en: "Outcome" },
  "project.hardware": { th: "ฮาร์ดแวร์", en: "Hardware" },
  "project.stack": { th: "เทคโนโลยีที่ใช้", en: "Stack" },
  "project.links": { th: "ลิงก์", en: "Links" },
  "project.awards": { th: "รางวัลที่ได้รับ", en: "Awards" },
  "project.awardLevel": { th: "ระดับ", en: "Level" },
  "project.awardCategory": { th: "ประเภท", en: "Category" },
  "project.gallery": { th: "ภาพประกอบ", en: "Gallery" },
  "project.part": { th: "อุปกรณ์", en: "Part" },
  "project.partRole": { th: "หน้าที่", en: "Role" },
  "project.bus": { th: "การเชื่อมต่อ", en: "Interface" },

  "skills.title": { th: "ทักษะและเครื่องมือ", en: "Skills & lab bench" },
  "skills.intro": {
    th: "สิ่งที่ใช้งานจริงบนโต๊ะทำงาน ไม่ใช่แค่เคยอ่านผ่าน",
    en: "What I actually use on the bench, not just things I have read about.",
  },

  "resume.title": { th: "ประวัติ", en: "Resume" },
  "resume.download": { th: "ดาวน์โหลด PDF", en: "Download PDF" },
  "resume.education": { th: "การศึกษา", en: "Education" },
  "resume.experience": { th: "ประสบการณ์", en: "Experience" },
  "resume.activity": { th: "กิจกรรมและการแข่งขัน", en: "Activities & competitions" },

  "certificates.title": { th: "ใบรับรอง", en: "Certificates" },
  "certificates.intro": {
    th: "ใบรับรอง อบรม และกิจกรรมที่เข้าร่วม",
    en: "Certificates, training and events I took part in.",
  },
  "certificates.issuer": { th: "ผู้ออกให้", en: "Issued by" },
  "certificates.verify": { th: "ตรวจสอบ", en: "Verify" },
  "certificates.empty": { th: "กำลังทยอยเพิ่ม", en: "Coming soon." },

  "about.title": { th: "เกี่ยวกับผม", en: "About me" },
  "about.location": { th: "ที่อยู่", en: "Based in" },

  "contact.title": { th: "ติดต่อ", en: "Contact" },
  "contact.intro": {
    th: "สนใจร่วมงานหรืออยากคุยเรื่องโปรเจกต์ ทักมาได้เลย",
    en: "Open to internships and junior roles — feel free to reach out.",
  },

  "footer.builtWith": { th: "สร้างด้วย", en: "Built with" },
  "footer.source": { th: "ซอร์สโค้ดของเว็บนี้", en: "Source of this site" },

  "common.loading": { th: "กำลังโหลด…", en: "Loading…" },
  "common.notFound": { th: "ไม่พบหน้าที่ต้องการ", en: "Page not found" },
  "common.backHome": { th: "กลับหน้าแรก", en: "Back home" },
} as const satisfies Record<string, Localized>;

export type StringKey = keyof typeof strings;

/** t("en", "nav.projects") -> "Projects" */
export function t(locale: Locale, key: StringKey): string {
  return strings[key][locale];
}
