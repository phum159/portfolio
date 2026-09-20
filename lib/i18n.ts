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

  /* Shared by every clickable photo: certificates, covers and galleries. */
  "image.enlarge": { th: "ดูภาพเต็ม", en: "View full size" },
  "image.close": { th: "ปิด", en: "Close" },

  /* Interactive demo on the Auto Lamp project page. */
  "demo.title": { th: "ลองเล่นดู", en: "Try it" },
  "demo.intro.auto-lamp": {
    th: "หน้าจำลองที่ยกวิดเจ็ตมาจากแอป Blynk ของจริง กดเปิด-ปิดเอง หรือให้ไฟดับเองก็ได้ ทั้งแบบนับถอยหลังและแบบตั้งเวลาเป็นนาฬิกา",
    en: "A stand-in built from the same widgets as the real Blynk dashboard: switch the lamp by hand, or have it switch itself off — on a countdown or at a set clock time.",
  },
  "demo.intro.auto-height-meter": {
    th: "หน้าจำลองการใช้งานจริง เปิดเครื่องให้คาลิเบรตหาระยะพื้น เลื่อนตั้งความสูงของผู้ถูกวัด แล้วกดวัด เครื่องจะเก็บค่า 3 วินาทีแล้วเฉลี่ยขึ้นจอ",
    en: "A stand-in for using the real thing: switch on to calibrate the floor reference, set how tall the subject is, then measure — it samples for three seconds and averages the result onto the display.",
  },
  "demo.intro.soil-nutrient-meter": {
    th: "ภาพจำลองการใช้งานทั้งสองส่วนของเครื่อง เพื่อให้เห็นว่าเครื่องถูกสั่งงานอย่างไรตั้งแต่ปักหัววัดจนปุ๋ยผสมเสร็จ ตัวเลขบนหน้านี้เป็นค่าสมมติสำหรับประกอบภาพ ไม่ใช่ผลวัดจากเครื่องจริง",
    en: "A walkthrough of both halves of the machine, from the probe going in to the finished blend, so you can see how it is actually driven. The figures here are illustrative rather than readings from the real unit.",
  },
  "demo.simulation": { th: "จำลอง", en: "Simulation" },
  "demo.status": { th: "สถานะ", en: "LED" },
  "demo.onLabel": { th: "ติด", en: "ON" },
  "demo.offLabel": { th: "ดับ", en: "OFF" },
  "demo.turnOn": { th: "เปิดไฟ", en: "Turn on" },
  "demo.turnOff": { th: "ปิดไฟ", en: "Turn off" },
  "demo.lampOn": { th: "โคมไฟกำลังติด", en: "The lamp is on" },
  "demo.lampOff": { th: "โคมไฟดับอยู่", en: "The lamp is off" },
  "demo.countdown": { th: "เหลืออีก", en: "Timer" },
  "demo.timeInput": { th: "ตั้งเวลาดับ", en: "Time input" },
  "demo.currentTime": { th: "เวลาปัจจุบัน", en: "Time" },
  "demo.hour": { th: "ชั่วโมง", en: "Hour" },
  "demo.minute": { th: "นาที", en: "Minute" },
  "demo.am": { th: "AM", en: "AM" },
  "demo.pm": { th: "PM", en: "PM" },
  "demo.modeCountdown": { th: "นับถอยหลัง", en: "Countdown" },
  "demo.modeClock": { th: "ตั้งเวลา", en: "Clock" },
  "demo.minutes": { th: "นาที", en: "min" },
  "demo.startTimer": { th: "เริ่มนับถอยหลัง", en: "Start" },
  "demo.setTime": { th: "ตั้งเวลานี้", en: "Set" },
  "demo.clearTime": { th: "ยกเลิก", en: "Clear" },

  /* Interactive demo on the Automatic Height Meter project page. */
  "hm.rig": { th: "เสาเครื่องวัด", en: "The rig" },
  "hm.console": { th: "จอแสดงผล", en: "Display" },
  "hm.power": { th: "สวิตช์เปิด-ปิดเครื่อง", en: "Power switch" },
  "hm.measure": { th: "กดวัด", en: "Measure" },
  "hm.buzzer": { th: "บัซเซอร์", en: "Buzzer" },
  "hm.subject": { th: "ความสูงจริงของผู้ถูกวัด", en: "Subject's real height" },
  "hm.hint": {
    th: "เปิดเครื่องเพื่อคาลิเบรตหาระยะพื้นก่อน แล้วจึงกดวัดได้",
    en: "Switch on to calibrate the floor reference first, then measure.",
  },
  "hm.stateOff": { th: "ปิดเครื่องอยู่ — สับสวิตช์เพื่อเริ่ม", en: "Powered down — flip the switch to start." },
  "hm.stateCalib": {
    th: "ผู้ถูกวัดต้องออกจากใต้เสาก่อน เครื่องกำลังยิงคลื่นลงพื้นเพื่อหาระยะอ้างอิง",
    en: "Nobody under the sensor: it is pinging the floor to capture the reference distance.",
  },
  "hm.stateReady": { th: "ได้ระยะพื้นแล้ว เชิญผู้ถูกวัดเข้ามายืน", en: "Floor captured — the subject can step in." },
  "hm.stateMeasuring": { th: "กำลังยิงคลื่นลงหัว เก็บค่าซ้ำเพื่อเฉลี่ย", en: "Pinging the top of the head, collecting repeats to average." },
  "hm.stateDone": { th: "วัดเสร็จแล้ว กดวัดซ้ำได้", en: "Done — measure again whenever you like." },
  "hm.calcFloor": { th: "ระยะถึงพื้น (คาลิเบรตตอนเปิดเครื่อง)", en: "Floor reference (calibrated at power-on)" },
  "hm.calcEcho": { th: "ระยะที่ยิงกลับมาจากศีรษะ (เฉลี่ย 10 ค่า)", en: "Echo off the head (mean of 10)" },
  "hm.error": { th: "คลาดจากความสูงจริง", en: "Off by" },

  /* Interactive demo on the Soil Nutrient Analyser project page. */
  "sm.probe": { th: "เครื่องตรวจวัดแร่ธาตุ", en: "Nutrient analyser" },
  "sm.formula": { th: "สูตรปุ๋ยที่แนะนำ", en: "Suggested grade" },
  "sm.formulaWhy": {
    th: "เป็นสูตรที่หาซื้อได้ทั่วไปและให้ธาตุที่ดินแปลงนี้ขาด",
    en: "a grade sold everywhere that carries what this plot is short of",
  },
  "sm.mixDone": { th: "ผสมเสร็จแล้ว ได้ปุ๋ยรวม", en: "Blended, total" },
  "sm.mixer": { th: "เครื่องผสมปุ๋ย", en: "Fertiliser mixer" },
  "sm.takeReading": { th: "วัดจุดนี้", en: "Read this point" },
  "sm.noSamples": { th: "ยังไม่มีจุดที่วัด — กดวัดหลาย ๆ จุดทั่วแปลง", en: "No points yet — take readings across the plot." },
  "sm.mean": { th: "เฉลี่ยจากทุกจุด", en: "mean of all points" },
  "sm.clear": { th: "ล้างค่าที่วัดไว้", en: "Clear samples" },
  "sm.mixIdle": {
    th: "ป้อนน้ำหนักแม่ปุ๋ยแต่ละถังแล้วกดเริ่มผสม — เครื่องจริงกรอกค่านี้ให้เองจากสูตรของสถานีพัฒนาที่ดิน หรือป้อนเองที่คีย์แพดก็ได้",
    en: "Key a weight into each hopper and start. The real machine fills these in from the Land Development Station's formula, or takes them from its keypad.",
  },
  "sm.crop": { th: "ชนิดพืช", en: "Crop" },
  "sm.area": { th: "ขนาดพื้นที่", en: "Plot size" },
  "sm.areaUnit": { th: "หน่วยพื้นที่", en: "Unit" },
  "sm.count": { th: "จำนวนการวัด", en: "Points taken" },
  "sm.times": { th: "ครั้ง", en: "" },
  "sm.noLive": { th: "ยังไม่มีค่า — กดวัดจุดนี้", en: "No reading yet — take one." },
  "sm.save": { th: "บันทึก", en: "Save point" },
  "sm.compute": { th: "ประมวลผล", en: "Compute" },
  "sm.planNote": {
    th: "ค่าเป้าหมายของพืชแต่ละชนิดในหน้านี้เป็นตัวอย่างเพื่อให้เห็นภาพ ของจริงใช้สูตรที่ขอมาจากสถานีพัฒนาที่ดินร้อยเอ็ด",
    en: "The per-crop targets here are stand-ins to show the shape of it; the real machine uses the formula from the Roi Et Land Development Station.",
  },
  "sm.probing": { th: "กำลังปักหัววัดลงดิน...", en: "Probe going in…" },
  "sm.send": { th: "ส่งค่าไปเครื่องผสม", en: "Send to the mixer" },
  "sm.awaiting": {
    th: "รอรับค่าจากเครื่องวัด — วัดอย่างน้อยหนึ่งจุดแล้วกดส่งค่า",
    en: "Waiting on the analyser — take at least one reading, then send.",
  },
  "sm.received": { th: "รับค่ามาแล้ว", en: "Received" },
  "sm.mixFilling": {
    th: "แม่ปุ๋ยไหลจากถังเก็บด้านบนลงถังชั่ง load cell ไต่ขึ้นจนถึงน้ำหนักที่ตั้งไว้",
    en: "Stock is falling from the storage hoppers; the load cells climb to the weight asked for.",
  },
  "sm.mixDischarging": {
    th: "ถังชั่งเปิดพร้อมกัน ปุ๋ยไหลลงถังรวมด้านล่าง ค่าบนถังชั่งลดลงจนหมด",
    en: "The weighing hoppers open together and drain into the single bin below.",
  },
  "sm.startMix": { th: "เริ่มผสม", en: "Start mixing" },
  "sm.resetMix": { th: "เริ่มใหม่", en: "Reset" },

  "hm.reference": {
    th: "ของจริงคลาดเฉลี่ย 0.59 ซม. เทียบเครื่องวัดมาตรฐาน",
    en: "the real unit averaged 0.59 cm against a stadiometer",
  },

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
