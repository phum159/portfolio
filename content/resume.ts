import type { ResumeEntry } from "./types";

/**
 * Timeline entries for /resume. Order does not matter here — the page
 * groups them by `kind` in the order education → experience → activity,
 * and a group with no entries is skipped entirely.
 *
 * That is why there is no "experience" entry yet: an empty section reads
 * better than a section full of TODO. Add one the moment there is a real
 * internship or job to put in it — see the commented templates below.
 */
export const resumeEntries: ResumeEntry[] = [
  {
    kind: "education",
    period: { th: "2568 – ปัจจุบัน", en: "2025 – present" },
    title: {
      th: "วิศวกรรมคอมพิวเตอร์ (ปริญญาตรี)",
      en: "B.Eng. Computer Engineering",
    },
    org: {
      th: "สถาบันวิศวกรรมศาสตร์และเทคโนโลยีอุตสาหกรรม มหาวิทยาลัยเทคโนโลยีมหานคร",
      en: "Faculty of Engineering and Industrial Technology, Mahanakorn University of Technology",
    },
    // TODO: เพิ่มเกรดเฉลี่ยและรายวิชาที่เกี่ยวข้องถ้าอยากใส่ เช่น
    // details: {
    //   th: ["เกรดเฉลี่ย X.XX", "วิชาที่เกี่ยวข้อง: ..."],
    //   en: ["GPA X.XX", "Relevant coursework: ..."],
    // },
  },

  /* ------------------------------------------------------------------
   * เอาคอมเมนต์ออกแล้วกรอกข้อมูล เมื่อมีประสบการณ์ทำงานหรือฝึกงาน
   *
   * {
   *   kind: "experience",
   *   period: { th: "มิ.ย. – ส.ค. 2570", en: "Jun – Aug 2027" },
   *   title: { th: "นักศึกษาฝึกงาน ฝ่ายเฟิร์มแวร์", en: "Firmware Intern" },
   *   org: { th: "ชื่อบริษัท", en: "Company name" },
   *   details: {
   *     th: ["ทำอะไร ใช้เทคโนโลยีอะไร ได้ผลลัพธ์อย่างไร"],
   *     en: ["What you did, with what, and what came of it."],
   *   },
   * },
   *
   * และสำหรับกิจกรรมหรือการแข่งขัน ใช้ kind: "activity"
   *
   * {
   *   kind: "activity",
   *   period: { th: "ก.พ. 2569", en: "Feb 2026" },
   *   title: { th: "ชื่อกิจกรรม/การประกวด", en: "Activity or competition" },
   *   org: { th: "ผู้จัด", en: "Organiser" },
   * },
   * ------------------------------------------------------------------ */
];
