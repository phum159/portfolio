import type { Profile } from "./types";

/**
 * Who you are. Everything marked TODO is a placeholder — replace it.
 */
export const profile: Profile = {
  // TODO: เช็คสะกดอังกฤษให้ตรงกับพาสปอร์ต/เอกสารราชการ
  name: { th: "ภัคภูมิ จันทวงค์", en: "Phakphum Chanthawong" },

  headline: {
    th: "วิศวกรระบบสมองกลฝังตัว",
    en: "Embedded Systems Engineer",
  },

  tagline: {
    th: "ออกแบบและเขียนเฟิร์มแวร์บน STM32 และ ESP32 ต่อเซนเซอร์ผ่าน I2C/SPI/UART แล้วส่งข้อมูลขึ้นระบบ IoT จริงด้วย MQTT",
    en: "I design and write firmware for STM32 and ESP32 — sensors over I2C/SPI/UART, data up to a real IoT stack over MQTT.",
  },

  bio: {
    // TODO: เขียนใหม่ด้วยภาษาของตัวเอง 2–3 ย่อหน้า
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

  // TODO: วางไฟล์ PDF ไว้ใน public/ ตามชื่อนี้ แล้วเอาคอมเมนต์บรรทัดล่างออก
  // ปุ่มดาวน์โหลดในหน้า Resume จะโผล่ขึ้นมาเองเมื่อบรรทัดนี้ถูกเปิดใช้งาน
  // resume: { th: "/resume-th.pdf", en: "/resume-en.pdf" },

  contacts: [
    // TODO: แก้เป็นข้อมูลจริงทั้งหมด
    { id: "email", label: "6811130010@mut.ac.th", href: "mailto:6811130010@mut.ac.th" },
    { id: "github", label: "github.com/your-github-username", href: "https://github.com/your-github-username" },
    { id: "linkedin", label: "linkedin.com/in/your-handle", href: "https://www.linkedin.com/in/your-handle" },
  ],
};
