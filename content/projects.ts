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
    year: 2026,
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


  {
    slug: "auto-height-meter",
    title: {
      th: "เครื่องวัดความสูงอัตโนมัติ",
      en: "Automatic Digital Height Meter",
    },
    summary: {
      th: "เครื่องวัดส่วนสูงอัตโนมัติด้วยคลื่นอัลตราโซนิกและ ESP32 แทนการวัดด้วยไม้วัดที่ต้องอ่านค่าด้วยสายตา วัดเสร็จในเวลาเฉลี่ย 7.7 วินาที คลาดเคลื่อนเฉลี่ย 0.59 เซนติเมตร",
      en: "An ultrasonic height meter built on an ESP32, replacing a ruler that someone has to read by eye. A measurement takes 7.7 seconds on average, with a mean error of 0.59 cm.",
    },
    year: 2025,
    role: {
      th: "งานกลุ่ม — ผมรับผิดชอบการเขียนเฟิร์มแวร์ทั้งหมด และวางแผนว่าทั้งฮาร์ดแวร์และซอฟต์แวร์จะทำอะไรอย่างไร",
      en: "Team project — I owned the firmware, and planned how both the hardware and the software would work.",
    },
    tags: ["ESP32", "HC-SR04", "Ultrasonic", "I2C", "LCD", "C/C++"],
    cover: "/images/auto-height-meter/cover.jpg",
    stack: ["C/C++ (Arduino for ESP32)", "LiquidCrystal_I2C", "Wire (I2C)"],
    hardware: [
      {
        part: "NodeMCU ESP32",
        role: {
          th: "หน่วยควบคุมหลัก คำนวณส่วนสูงและคุมลำดับการทำงาน",
          en: "Main controller — computes the height and drives the measurement sequence",
        },
        bus: "—",
      },
      {
        part: "HC-SR04",
        role: {
          th: "วัดระยะจากเซนเซอร์ถึงศีรษะด้วยคลื่นอัลตราโซนิก",
          en: "Ultrasonic distance from the sensor down to the top of the head",
        },
        bus: "GPIO (Trig / Echo)",
      },
      {
        part: "LCD 16×2",
        role: {
          th: "แสดงค่าส่วนสูงและสถานะการทำงาน",
          en: "Shows the measured height and the current state",
        },
        bus: "I2C",
      },
      {
        part: "Push button",
        role: { th: "ปุ่มสั่งเริ่มวัด", en: "Starts a measurement" },
        bus: "GPIO",
      },
      {
        part: "Buzzer",
        role: {
          th: "เสียงแจ้งสถานะ ทั้งตอนเริ่มวัดและวัดเสร็จ",
          en: "Audible cue for start and finish",
        },
        bus: "GPIO",
      },
      {
        part: "Rocker switch",
        role: { th: "สวิตช์เปิด-ปิดเครื่อง", en: "Main power switch" },
        bus: "Power",
      },
    ],
    gallery: [
      {
        src: "/images/auto-height-meter/sensor-mount.jpg",
        caption: {
          th: "เซนเซอร์ติดบนคานด้านบน ต้องเล็งให้ลำคลื่นพ้นโครงเสาลงไปถึงตัวคน",
          en: "The sensor sits on the top rail, aimed so its beam clears the frame on the way down.",
        },
      },
      {
        src: "/images/auto-height-meter/frame-install.jpg",
        caption: {
          th: "โครงเสาเหล็กฉากแบบถอดประกอบได้ ระหว่างติดตั้ง",
          en: "The demountable slotted-angle frame during assembly.",
        },
      },
      {
        src: "/images/auto-height-meter/assembly.jpg",
        caption: {
          th: "ระหว่างประกอบและเดินสายไฟ",
          en: "Building and wiring the unit.",
        },
      },
      {
        src: "/images/auto-height-meter/wiring-diagram.webp",
        caption: {
          th: "ผังการต่อวงจร ESP32 เข้ากับเซนเซอร์ จอ ปุ่ม และบัซเซอร์",
          en: "Wiring of the ESP32 to the sensor, display, button and buzzer.",
        },
      },
    ],
    body: {
      problem: {
        th: "การวัดส่วนสูงแบบเดิมใช้ไม้วัดแล้วอ่านค่าด้วยสายตา ซึ่งคลาดเคลื่อนได้จากการกะระยะและท่าทางของผู้ถูกวัด และยิ่งช้าเมื่อต้องวัดหลายคนติดต่อกัน โจทย์คือทำเครื่องที่วัดได้เองโดยไม่ต้องมีคนคอยอ่านค่า ให้เร็วขึ้นและคลาดเคลื่อนน้อยลง เป็นโครงงานในรายวิชา ENCC0008 Engineering Innovation and Design ชั้นปีที่ 1 สถาบันวิศวกรรมศาสตร์และเทคโนโลยีอุตสาหกรรม มหาวิทยาลัยเทคโนโลยีมหานคร",
        en: "Measuring height the usual way means reading a scale by eye, which drifts with how you judge the mark and with how the person is standing — and it gets slow once there is a queue. The task was a device that measures on its own, faster and with less error. Built for ENCC0008 Engineering Innovation and Design, first year, Faculty of Engineering and Industrial Technology, Mahanakorn University of Technology.",
      },
      architecture: {
        th: "เซนเซอร์อัลตราโซนิก HC-SR04 ติดอยู่บนคานด้านบนของโครงเสา ยิงคลื่นลงมาวัดระยะจากเซนเซอร์ถึงศีรษะ ESP32 นำระยะนั้นไปลบออกจากระยะอ้างอิงถึงพื้นที่ได้จากการคาลิเบรตตอนเปิดเครื่อง ผลต่างคือส่วนสูง แล้วส่งไปแสดงบนจอ LCD ผ่านบัส I2C โดยมีปุ่มกดสั่งเริ่มวัด และบัซเซอร์คอยบอกว่าเริ่มวัดแล้วและวัดเสร็จแล้ว ตัวโครงเป็นเสาเหล็กฉากเจาะรู ถอดประกอบและขนย้ายได้",
        en: "An HC-SR04 on the top rail of the frame fires downward and measures the distance to the top of the head. The ESP32 subtracts that from a floor reference captured during start-up calibration; the difference is the height, which goes out to a 16×2 LCD over I2C. A push button starts a measurement and a buzzer marks start and finish. The frame is slotted angle iron, so the whole thing comes apart and can be carried.",
      },
      challenges: {
        th: [
          "ตอนแรกลำคลื่นของ HC-SR04 ไปกระทบโครงเสาก่อนจะถึงตัวคน ทำให้ได้ระยะของโครงแทนของศีรษะ แก้โดยคำนวณมุมแผ่ของลำคลื่นแล้วจัดตำแหน่งติดตั้งใหม่ ให้กรวยคลื่นพ้นโครงสร้างตลอดทาง",
          "ค่าที่อ่านได้บางครั้งเป็น 0 บางครั้งกระโดดไปมา แก้ด้วยการกรองสัญญาณ คือวัดหลายรอบต่อหนึ่งครั้งแล้วเฉลี่ย ตัดค่าที่ผิดปกติทิ้ง",
          "โครงเป็นแบบถอดประกอบได้ ทุกครั้งที่ประกอบใหม่ความสูงและความเอียงไม่เท่าเดิม จึงเขียนให้เครื่องคาลิเบรตหาระยะพื้นใหม่ทุกครั้งที่เปิดเครื่อง แทนที่จะฝังค่าคงที่ไว้ในโค้ด",
          "อุณหภูมิมีผลต่อความเร็วเสียง จึงมีผลต่อระยะที่คำนวณได้ รอบนี้ยังไม่ได้ชดเชย แต่ระบุไว้เป็นข้อจำกัดที่รู้ตัว ทางแก้คือเพิ่มเซนเซอร์อุณหภูมิมาปรับค่าความเร็วเสียงในสมการ",
        ],
        en: [
          "The HC-SR04 beam was hitting the frame before it reached the person, so the reading was the structure rather than the head. Working out the beam's spread angle and repositioning the sensor kept the cone clear of the structure all the way down.",
          "Readings occasionally came back as 0, or jumped around. Filtering fixed it: several rounds per measurement, averaged, with outliers dropped.",
          "The frame comes apart, so it never reassembles at exactly the same height or tilt. Rather than hard-coding a floor distance, the firmware re-calibrates the floor reference every time it powers on.",
          "Temperature changes the speed of sound, and therefore the computed distance. This build does not compensate for it; it is documented as a known limitation, with a temperature sensor feeding the speed-of-sound term as the fix.",
        ],
      },
      outcome: {
        th: "ทดสอบกับกลุ่มตัวอย่าง 10 คน เทียบกับเครื่องวัดส่วนสูงมาตรฐาน ได้ค่าคลาดเคลื่อนเฉลี่ย 0.59 เซนติเมตร คิดเป็นความผิดพลาดเฉลี่ย 0.35 เปอร์เซ็นต์ และไม่มีครั้งไหนคลาดเกิน 1 เซนติเมตร ใช้เวลาเฉลี่ย 7.72 วินาทีต่อการวัดหนึ่งครั้ง ส่วนตัวเซนเซอร์เองทดสอบที่ระยะ 10–200 เซนติเมตร มีความผิดพลาดไม่เกิน 3 เปอร์เซ็นต์ และเมื่อวัดซ้ำ 100 ครั้งได้ส่วนเบี่ยงเบนมาตรฐานต่ำกว่า 0.2 เซนติเมตรทุกระยะ ช่วงที่ใช้งานได้จริงอยู่ที่ประมาณ 50–196 เซนติเมตร",
        en: "Against a standard stadiometer across 10 people, the mean error was 0.59 cm (0.35%), and no single reading was off by more than 1 cm. A measurement takes 7.72 seconds on average. The sensor alone, tested from 10 to 200 cm, stayed within 3% error, and 100 repeat readings at each distance held a standard deviation below 0.2 cm. Usable range in practice is roughly 50–196 cm.",
      },
    },
  },

  /* ------------------------------------------------------------------
   * TEMPLATE — ก๊อปบล็อกข้างล่างนี้ไปวางด้านบน (ในอาร์เรย์) แล้วแก้ให้เป็น
   * ของโปรเจกต์ใหม่ อย่าลืมเอาเครื่องหมายคอมเมนต์ออกด้วย
   * - ใส่ featured: true ถ้าอยากให้ขึ้นหน้าแรก
   * - ฟิลด์ที่มี ? ใน types.ts ตัดทิ้งทั้งบรรทัดได้
   *
   * {
   *   slug: "my-project",
   *   title: { th: "ชื่อไทย", en: "English name" },
   *   summary: { th: "สรุปสั้น ๆ", en: "Short summary." },
   *   year: 2026,
   *   tags: ["STM32", "PID"],
   *   cover: "/images/my-project/cover.jpg",
   *   stack: ["C"],
   *   hardware: [{ part: "STM32F103", role: { th: "ตัวคุมหลัก", en: "Main MCU" }, bus: "I2C" }],
   *   gallery: [{ src: "/images/my-project/1.jpg", caption: { th: "คำบรรยาย", en: "Caption" } }],
   *   awards: [{
   *     result: { th: "รองชนะเลิศอันดับ 1", en: "Second runner-up" },
   *     event: { th: "ชื่อการประกวด", en: "Competition name" },
   *     level: { th: "ระดับภาค", en: "Regional" },
   *     category: { th: "ประเภทที่ 1 สิ่งประดิษฐ์ด้าน...", en: "Category 1: ..." },
   *     date: "2026",
   *   }],
   *   links: [{ label: "GitHub", href: "https://github.com/..." }],
   *   body: {
   *     problem: { th: "โจทย์คืออะไร", en: "What problem it solves." },
   *     architecture: { th: "ระบบทำงานอย่างไร", en: "How it works." },
   *     challenges: { th: ["ปัญหาและวิธีแก้"], en: ["What went wrong and how it was fixed."] },
   *     outcome: { th: "ผลลัพธ์", en: "How it turned out." },
   *   },
   * },
   * ------------------------------------------------------------------ */
];
