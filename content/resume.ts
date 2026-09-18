import type { ResumeEntry } from "./types";

/**
 * Timeline entries for /resume. Order does not matter here — the page
 * groups them by `kind` in the order education → experience → activity.
 *
 * TODO: ทุกอย่างในไฟล์นี้เป็นตัวอย่าง แก้ให้เป็นข้อมูลจริง
 */
export const resumeEntries: ResumeEntry[] = [
  {
    kind: "education",
    period: { th: "2568 – ปัจจุบัน", en: "2025 – present" },
    title: { th: "วิศวกรรมคอมพิวเตอร์ (ปริญญาตรี)", en: "B.Eng. Computer Engineering" },
    org: { th: "มหาวิทยาลัยเทคโนโลยีมหานคร", en: "Mahanakorn University of Technology" },
    details: {
      th: ["TODO: เกรดเฉลี่ย / วิชาที่เกี่ยวข้อง เช่น Computer Architecture, Embedded Systems"],
      en: ["TODO: GPA / relevant coursework, e.g. Computer Architecture, Embedded Systems"],
    },
  },
  {
    kind: "experience",
    period: { th: "TODO", en: "TODO" },
    title: { th: "TODO: ตำแหน่ง", en: "TODO: role" },
    org: { th: "TODO: บริษัท/หน่วยงาน", en: "TODO: company" },
    details: {
      th: ["TODO: ทำอะไร ใช้เทคโนโลยีอะไร ผลลัพธ์เป็นอย่างไร"],
      en: ["TODO: what you did, with what, and what came out of it."],
    },
  },
  {
    kind: "activity",
    period: { th: "TODO", en: "TODO" },
    title: { th: "TODO: ชื่อกิจกรรม/การแข่งขัน", en: "TODO: activity or competition" },
    org: { th: "TODO: ผู้จัด", en: "TODO: organiser" },
  },
];
