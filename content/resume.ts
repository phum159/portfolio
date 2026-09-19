import type { ResumeEntry } from "./types";

/**
 * Timeline entries for /resume. Order within a `kind` is the order they
 * are listed here, so education runs newest first. The page groups by
 * kind in the order education → experience → activity, and a group with
 * no entries is skipped entirely.
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
    details: {
      th: ["เกรดเฉลี่ย 4.00"],
      en: ["GPA 4.00"],
    },
  },
  {
    kind: "education",
    period: { th: "2565 – 2567", en: "2022 – 2024" },
    title: {
      th: "ประกาศนียบัตรวิชาชีพ (ปวช.) สาขาเทคนิคคอมพิวเตอร์",
      en: "Vocational Certificate in Computer Technology",
    },
    org: {
      th: "วิทยาลัยเทคนิคร้อยเอ็ด",
      en: "Roi Et Technical College",
    },
    details: {
      th: ["เกรดเฉลี่ย 3.87"],
      en: ["GPA 3.87"],
    },
  },
  {
    kind: "education",
    period: { th: "2562 – 2564", en: "2019 – 2021" },
    title: {
      th: "มัธยมศึกษาตอนต้น",
      en: "Lower Secondary School",
    },
    org: {
      th: "โรงเรียนเตรียมอุดมศึกษาพัฒนาการ ร้อยเอ็ด",
      en: "Triam Udom Suksa Pattanakarn Roi Et School",
    },
    details: {
      th: ["ห้องเรียนพิเศษ Gifted", "เกรดเฉลี่ย 3.91"],
      en: ["Gifted programme", "GPA 3.91"],
    },
  },

  {
    kind: "activity",
    period: { th: "2567 – 2568", en: "2024 – 2025" },
    title: {
      th: "การประกวดสิ่งประดิษฐ์ — เครื่องตรวจวัดแร่ธาตุและผสมปุ๋ยในดิน",
      en: "Invention competitions — Soil Nutrient Analyser and Fertiliser Mixer",
    },
    org: {
      th: "สำนักงานคณะกรรมการการอาชีวศึกษา",
      en: "Office of the Vocational Education Commission",
    },
    details: {
      th: [
        "ชนะเลิศ เหรียญทอง ระดับอาชีวศึกษาจังหวัดร้อยเอ็ด (19 พฤศจิกายน 2567)",
        "รองชนะเลิศอันดับ 1 เหรียญทอง และ Honor Awards เหรียญทอง ระดับภาคตะวันออกเฉียงเหนือ (11 ธันวาคม 2567)",
        "เหรียญเงิน ระดับชาติ OVEC Innovation Award 2025 (23 มกราคม 2568)",
        "รับผิดชอบการติดตั้งอุปกรณ์ พัฒนาซอฟต์แวร์ และนำเสนอผลงานต่อคณะกรรมการ",
      ],
      en: [
        "First place, gold medal, Roi Et provincial round (19 November 2024)",
        "First runner-up gold medal and an Honor Award gold medal, Northeastern regional round (11 December 2024)",
        "Silver medal, national OVEC Innovation Award 2025 (23 January 2025)",
        "Installed the hardware, developed the software, and presented the work to the judges",
      ],
    },
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
