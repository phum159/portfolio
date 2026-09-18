import type { Project } from "./types";

/**
 * ═══════════════════════════════════════════════════════════════════
 *  HOW TO ADD A PROJECT
 *  1. Copy the TEMPLATE object at the bottom of this file.
 *  2. Paste it into the `projects` array and give it a unique `slug`.
 *  3. Fill in th + en for every text field (TypeScript will complain
 *     if you forget one).
 *  4. `npm run build` — the card, the tag filter and the detail pages
 *     at /th/projects/<slug> and /en/projects/<slug> appear by themselves.
 *  No other file needs to change. Ever.
 *
 *  This site is public: never put IP addresses, hostnames, VPN
 *  addresses, usernames, passwords or API keys in here.
 * ═══════════════════════════════════════════════════════════════════
 */

export const projects: Project[] = [
  {
    slug: "smart-home-iot",
    title: {
      th: "ระบบสมาร์ตโฮม STM32 + ESP32",
      en: "Smart Home IoT System (STM32 + ESP32)",
    },
    summary: {
      th: "ระบบบ้านอัจฉริยะที่ทำเองทั้งสาย ตั้งแต่เฟิร์มแวร์อ่านเซนเซอร์บน STM32 ส่งต่อให้ ESP32 เป็นเกตเวย์ MQTT ไปจนถึง Home Assistant และฐานข้อมูลที่รันบนเซิร์ฟเวอร์ของตัวเอง",
      en: "An end-to-end smart home: STM32 firmware reading the sensors, an ESP32 acting as a pure MQTT gateway, and Home Assistant plus a database on a server I run myself.",
    },
    year: 2025,
    role: {
      th: "ทำคนเดียวทั้งหมด — ออกแบบวงจร เขียนเฟิร์มแวร์ และวางระบบฝั่งเซิร์ฟเวอร์",
      en: "Solo project — circuit design, firmware, and the server side.",
    },
    tags: ["STM32", "ESP32", "MQTT", "I2C", "SPI", "UART", "ESP-NOW", "Home Assistant", "Docker"],
    featured: true,
    // cover: "/images/smart-home/cover.jpg", // TODO: ใส่รูปหน้าปก
    stack: [
      "C (STM32 HAL)",
      "STM32CubeMX",
      "Arduino / ESP-IDF",
      "MQTT",
      "Home Assistant",
      "Docker",
      "PostgreSQL",
    ],
    hardware: [
      {
        part: "STM32F103C8T6",
        role: {
          th: "อ่านเซนเซอร์ทั้งหมด ขับจอ และแพ็กข้อมูลเป็น JSON",
          en: "Reads every sensor, drives the display, packs readings into JSON",
        },
        bus: "UART to ESP32",
      },
      {
        part: "ESP32",
        role: {
          th: "เกตเวย์ WiFi/MQTT ล้วน ไม่แตะเซนเซอร์เอง",
          en: "Pure WiFi/MQTT gateway — it never touches a sensor directly",
        },
        bus: "WiFi / UART / ESP-NOW",
      },
      {
        part: "ESP32-C3 SuperMini",
        role: {
          th: "กล่องรีเลย์คุมไฟ รับคำสั่งผ่าน ESP-NOW ไม่ต่อ MQTT ตรง",
          en: "Relay box for the lamp, commanded over ESP-NOW instead of MQTT",
        },
        bus: "ESP-NOW",
      },
      {
        part: "SHT30",
        role: { th: "อุณหภูมิและความชื้น", en: "Temperature and humidity" },
        bus: "I2C 0x44",
      },
      {
        part: "BH1750",
        role: { th: "ความสว่าง (lux)", en: "Ambient light (lux)" },
        bus: "I2C 0x23",
      },
      {
        part: "DS3231",
        role: { th: "นาฬิกาเรียลไทม์", en: "Real-time clock" },
        bus: "I2C 0x68",
      },
      {
        part: "LD2412",
        role: { th: "เรดาร์ตรวจจับคนและระยะ", en: "mmWave presence + distance radar" },
        bus: "UART",
      },
      {
        part: "ST7735",
        role: { th: "จอแสดงค่าที่ตัวกล่อง", en: "On-device status display" },
        bus: "SPI",
      },
    ],
    links: [
      // TODO: ใส่ลิงก์ repo จริง
      // { label: "GitHub", href: "https://github.com/your-github-username/smarthome" },
    ],
    body: {
      problem: {
        th: "อยากได้ระบบบ้านอัจฉริยะที่ควบคุมได้เองทั้งหมด ไม่ต้องพึ่งคลาวด์ของผู้ผลิต และเก็บข้อมูลย้อนหลังได้ โจทย์จริงคือทำอย่างไรให้ไมโครคอนโทรลเลอร์ตัวเล็กอ่านเซนเซอร์หลายตัวพร้อมกันได้นิ่ง แล้วส่งข้อมูลขึ้นระบบกลางในรูปแบบที่ Home Assistant เข้าใจ โดยไม่ต้องตั้งค่าเอนทิตีทีละตัว",
        en: "I wanted home automation I fully control — no vendor cloud — with history I can query later. The real problem was keeping several sensors on one small MCU stable, then getting that data into Home Assistant in a shape it understands without hand-registering every entity.",
      },
      architecture: {
        th: "แบ่งหน้าที่ตามความถนัดของชิป: STM32F103 รับงานเรียลไทม์ อ่าน SHT30, BH1750 และ DS3231 ผ่าน I2C อ่านเรดาร์ LD2412 ผ่าน UART ขับจอ ST7735 ผ่าน SPI แล้วรวมค่าทั้งหมดเป็น JSON ส่งให้ ESP32 ทาง UART ส่วน ESP32 ทำหน้าที่เดียวคือเป็นเกตเวย์ WiFi/MQTT เพื่อให้แก้ปัญหาเครือข่ายได้โดยไม่กระทบโค้ดที่คุยกับฮาร์ดแวร์ กล่องรีเลย์แยกใช้ ESP32-C3 รับคำสั่งผ่าน ESP-NOW ซึ่งตอบสนองเร็วและไม่ต้องพึ่ง WiFi ฝั่งเซิร์ฟเวอร์รันเป็นชุด Docker — Home Assistant, โบรกเกอร์ Mosquitto และ PostgreSQL สำหรับเก็บประวัติ",
        en: "Each chip does what it is good at. The STM32F103 handles the real-time side: SHT30, BH1750 and DS3231 over I2C, the LD2412 radar over UART, an ST7735 over SPI, then packs everything into JSON and hands it to the ESP32 over UART. The ESP32 does exactly one job — WiFi and MQTT — so network trouble never reaches the hardware code. A separate ESP32-C3 relay box is driven over ESP-NOW, which responds fast and does not depend on WiFi. The server side is a Docker stack: Home Assistant, a Mosquitto broker, and PostgreSQL for history.",
      },
      challenges: {
        th: [
          "ออกแบบโครงสร้าง MQTT topic และ discovery payload เองทั้งหมด เพื่อให้ Home Assistant สร้างเอนทิตีอัตโนมัติ และไม่เกิดเอนทิตีซ้ำเมื่อแฟลชเฟิร์มแวร์ใหม่",
          "แยกหน้าที่ระหว่าง STM32 กับ ESP32 ให้ชัด หลังพบว่าการให้ ESP32 อ่านเซนเซอร์เองทำให้จังหวะการอ่านไม่นิ่ง",
          "ไล่ปัญหาปุ่มกดบนบอร์ดจริงที่พฤติกรรมไม่ตรงกับที่เข้าใจตอนแรก ต้องวัดที่ขาจริงจึงพบว่าสวิตช์สองตัวเป็นคนละชนิดกัน (ค้างตำแหน่ง กับ กดติดปล่อยดับ)",
          "ถอดโมดูลวัดพลังงานออกจากดีไซน์กลางทาง แล้วต้องตามเคลียร์ข้อมูลเก่าที่ค้างอยู่ในระบบกลาง ไม่ให้เหลือเอนทิตีผี",
          "ตั้งออโตเมชันไฟห้องนอนโดยใช้ทั้งค่าความสว่างและการตรวจจับคน ให้ไฟไม่ดับใส่หน้าตอนนั่งนิ่ง ๆ",
        ],
        en: [
          "Designed the MQTT topic tree and the discovery payloads myself so Home Assistant auto-creates entities and does not duplicate them after a re-flash.",
          "Split responsibilities cleanly between the STM32 and the ESP32 after finding that letting the ESP32 read sensors made sampling jittery.",
          "Chased a button that did not behave as expected; probing the actual pins showed the two switches were different types — one latching, one momentary.",
          "Dropped the power-metering module mid-design, which meant hunting down stale retained state so no ghost entities were left behind.",
          "Tuned the bedroom lighting automation on both lux and presence so the light never cuts out while someone is sitting still.",
        ],
      },
      outcome: {
        th: "ระบบทำงานต่อเนื่องในห้องจริง อุณหภูมิ ความชื้น ความสว่าง และการตรวจจับคนขึ้นแดชบอร์ดแบบเรียลไทม์ ควบคุมไฟได้ทั้งจากปุ่มที่ตัวกล่องและจากมือถือ พร้อมเก็บข้อมูลย้อนหลังลงฐานข้อมูลเพื่อดูแนวโน้มได้",
        en: "It runs continuously in a real room: temperature, humidity, lux and presence land on a live dashboard, the lamp can be driven from the physical button or from a phone, and everything is logged to a database so I can look at trends.",
      },
    },
  },

  /* ------------------------------------------------------------------
   * TEMPLATE — ก๊อปทั้งบล็อกนี้ไปวางด้านบน แล้วแก้ให้เป็นของโปรเจกต์ใหม่
   * - ลบ featured ออกได้ถ้ายังไม่อยากให้ขึ้นหน้าแรก
   * - ฟิลด์ที่มี ? ใน types.ts ตัดทิ้งทั้งบรรทัดได้
   * ------------------------------------------------------------------ */
  {
    slug: "auto-height-meter",
    title: {
      th: "เครื่องวัดความสูงอัตโนมัติ",
      en: "Automatic Height Measuring Device",
    },
    summary: {
      th: "TODO: สรุปสั้น ๆ 1–2 บรรทัด ว่าทำอะไร ใช้อะไรทำ",
      en: "TODO: one or two lines — what it does and what it is built from.",
    },
    year: 2025,
    tags: ["Arduino", "Sensor"],
    stack: ["TODO"],
    hardware: [{ part: "TODO", role: { th: "TODO", en: "TODO" }, bus: "TODO" }],
    body: {
      problem: {
        th: "TODO: โจทย์คืออะไร ทำไมต้องทำ",
        en: "TODO: what problem it solves.",
      },
      architecture: {
        th: "TODO: ระบบประกอบด้วยอะไร ต่อกันอย่างไร",
        en: "TODO: how the pieces fit together.",
      },
      challenges: {
        th: ["TODO: ปัญหาที่เจอข้อแรก และวิธีแก้"],
        en: ["TODO: first thing that went wrong, and how you fixed it."],
      },
      outcome: {
        th: "TODO: ผลลัพธ์ ใช้งานได้แค่ไหน",
        en: "TODO: how well it ended up working.",
      },
    },
  },
];
