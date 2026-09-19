import { site } from "@/lib/site";
import type { Profile } from "./types";

/**
 * Who you are.
 */
export const profile: Profile = {
  name: { th: "ภัคภูมิ จันทวงค์", en: "Pakaphum Juntawong" },

  headline: {
    th: "นักศึกษาวิศวกรรมคอมพิวเตอร์",
    en: "Computer Engineering Student",
  },

  availability: {
    th: "พร้อมฝึกงาน ปี 2027",
    en: "Available for a 2027 internship",
  },

  tagline: {
    th: "สนใจงานด้านระบบสมองกลฝังตัว เฟิร์มแวร์ และ IoT",
    en: "Interested in embedded systems, firmware and IoT",
  },

  bio: {
    th: [
      "ผมเป็นนักศึกษาสาขาวิศวกรรมคอมพิวเตอร์ที่สนใจงานระดับล่างของระบบ — การอ่านดาต้าชีต ต่อวงจรบนเบรดบอร์ด แล้วไล่ดูสัญญาณด้วยลอจิกอนาไลเซอร์จนกว่ามันจะทำงานถูก",
      "งานที่ผมชอบที่สุดคืองานที่ต้องเชื่อมโลกฮาร์ดแวร์กับซอฟต์แวร์เข้าด้วยกัน เช่นระบบสมาร์ตโฮมที่ผมทำเอง ซึ่งมีตั้งแต่เฟิร์มแวร์บน STM32 ไปจนถึงโบรกเกอร์ MQTT และฐานข้อมูลบนเซิร์ฟเวอร์",
      "ตอนนี้กำลังมองหาที่ฝึกงาน/ทำงานสาย Embedded หรือ IoT ที่ได้แตะฮาร์ดแวร์จริง",
    ],
    en: [
      "I am a computer engineering student drawn to the low level of the stack — reading datasheets, wiring things on a breadboard, and probing the bus with a logic analyzer until it behaves.",
      "The work I enjoy most sits where hardware meets software: my smart home system runs all the way from STM32 firmware up to an MQTT broker and a database on a server I administer myself.",
      "I am looking for an internship or junior role in embedded or IoT where I get to touch real hardware.",
    ],
  },

  location: { th: "กรุงเทพฯ ประเทศไทย", en: "Bangkok, Thailand" },

  // TODO: วางรูปไว้ที่ public/images/profile.jpg แล้วเปิดบรรทัดนี้
  // photo: "/images/profile.jpg",

  // ปิดไว้จนกว่าจะมีไฟล์จริง: ปุ่มจะถูกเรนเดอร์ก็ต่อเมื่อฟิลด์นี้ถูกตั้งค่า
  // วาง resume-th.pdf และ resume-en.pdf ไว้ใน public/ แล้วเปิดบรรทัดล่างนี้
  // resume: { th: "/resume-th.pdf", en: "/resume-en.pdf" },

  contacts: [
    { id: "email", label: "pakaphum1080@gmail.com", href: "mailto:pakaphum1080@gmail.com" },
    { id: "github", label: `github.com/${site.githubUser}`, href: `https://github.com/${site.githubUser}` },
    {
      id: "linkedin",
      label: "linkedin.com/in/pakaphum-juntawong",
      href: "https://www.linkedin.com/in/pakaphum-juntawong",
    },
  ],
};
