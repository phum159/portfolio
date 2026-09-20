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
    diagram: {
      chains: [
        {
          title: { th: "สายข้อมูล", en: "Data path" },
          stages: [
            {
              title: { th: "เซนเซอร์", en: "Sensors" },
              nodes: [
                { label: "SHT30", note: { th: "อุณหภูมิ ความชื้น", en: "Temperature, humidity" } },
                { label: "BH1750", note: { th: "ความสว่าง", en: "Ambient light" } },
                { label: "DS3231", note: { th: "นาฬิกาเรียลไทม์", en: "Real-time clock" } },
                { label: "LD2412", note: { th: "เรดาร์ตรวจจับคน", en: "Presence radar" } },
              ],
            },
            {
              title: { th: "อ่านและแพ็ก", en: "Read and pack" },
              via: "I2C / UART",
              nodes: [
                {
                  label: "STM32F103C8T6",
                  note: { th: "อ่านทุกตัว รวมเป็น JSON", en: "Reads them all, packs JSON" },
                  accent: "primary",
                },
              ],
            },
            {
              title: { th: "เกตเวย์", en: "Gateway" },
              via: "UART",
              nodes: [
                {
                  label: "ESP32",
                  note: { th: "งานเดียวคือ WiFi/MQTT", en: "WiFi and MQTT, nothing else" },
                  accent: "primary",
                },
              ],
            },
            {
              title: { th: "เซิร์ฟเวอร์", en: "Server" },
              via: "MQTT",
              nodes: [
                { label: "Mosquitto", note: { th: "โบรกเกอร์", en: "Broker" } },
                { label: "Home Assistant", note: { th: "แดชบอร์ดและออโตเมชัน", en: "Dashboard and automations" } },
                { label: "PostgreSQL", note: { th: "เก็บประวัติย้อนหลัง", en: "History" } },
              ],
            },
          ],
        },
        {
          title: { th: "สั่งไฟ", en: "Lighting" },
          stages: [
            { nodes: [{ label: "ESP32", note: { th: "เกตเวย์", en: "Gateway" } }] },
            {
              via: "ESP-NOW",
              nodes: [
                { label: "ESP32-C3 SuperMini", note: { th: "กล่องรีเลย์", en: "Relay box" } },
              ],
            },
            { via: "AC", nodes: [{ label: "Lamp", note: { th: "โคมไฟในห้อง", en: "Room light" }, accent: "output" }] },
          ],
        },
      ],
      notes: {
        th: [
          "ESP32 ไม่แตะเซนเซอร์เลย ปัญหาเครือข่ายจึงไม่กระทบจังหวะการอ่านค่า",
          "กล่องรีเลย์ใช้ ESP-NOW ไม่ใช่ MQTT เพราะตอบสนองเร็วกว่าและไม่ต้องรอ WiFi",
        ],
        en: [
          "The ESP32 never touches a sensor, so network trouble cannot disturb sampling.",
          "The relay box runs on ESP-NOW rather than MQTT: faster to respond, and it does not wait on WiFi.",
        ],
      },
    },
    body: {
      problem: {
        th: "อยากได้ระบบบ้านอัจฉริยะที่คุมได้เองทั้งหมด ไม่ต้องพึ่งคลาวด์ของผู้ผลิต และย้อนดูข้อมูลได้ โจทย์จริงคือทำให้ MCU ตัวเล็กอ่านเซนเซอร์หลายตัวได้นิ่ง แล้วส่งขึ้นระบบกลางในรูปแบบที่ Home Assistant เข้าใจโดยไม่ต้องตั้งค่าทีละตัว",
        en: "I wanted home automation I fully control, with no vendor cloud and history I can query. The real problem was keeping several sensors stable on one small MCU, then getting that data into Home Assistant in a shape it understands without registering every entity by hand.",
      },
      architecture: {
        th: "แบ่งงานตามความถนัดของชิป STM32F103 รับงานเรียลไทม์ อ่านเซนเซอร์ทุกตัวแล้วแพ็กเป็น JSON ส่งให้ ESP32 ทาง UART ส่วน ESP32 ทำงานเดียวคือ WiFi/MQTT ปัญหาเครือข่ายจึงไม่กระทบโค้ดที่คุยกับฮาร์ดแวร์ กล่องรีเลย์แยกใช้ ESP32-C3 รับคำสั่งผ่าน ESP-NOW ซึ่งเร็วกว่าและไม่ต้องรอ WiFi ฝั่งเซิร์ฟเวอร์รันเป็นชุด Docker",
        en: "Each chip does what it is good at. The STM32F103 handles the real-time side, reads every sensor and packs the values into JSON for the ESP32 over UART. The ESP32 does one job — WiFi and MQTT — so network trouble never reaches the hardware code. A separate ESP32-C3 relay box runs on ESP-NOW, and the server side is a Docker stack.",
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
        en: "It runs continuously in a real room: temperature, humidity, lux and presence on a live dashboard, the lamp driven from either the button or a phone, and everything logged so I can look at trends.",
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
      th: "เครื่องวัดส่วนสูงอัตโนมัติด้วยคลื่นอัลตราโซนิกและ ESP32 แทนการวัดด้วยไม้วัดที่ต้องอ่านค่าด้วยสายตา กดครั้งเดียวได้ผลในราว 7 วินาที คลาดเคลื่อนเฉลี่ย 0.59 เซนติเมตร",
      en: "An ultrasonic height meter built on an ESP32, replacing a ruler that someone has to read by eye. One press gives a reading in about 7 seconds, with a mean error of 0.59 cm.",
    },
    year: 2025,
    role: {
      th: "งานกลุ่ม — ผมรับผิดชอบการเขียนเฟิร์มแวร์ทั้งหมด และวางแผนว่าทั้งฮาร์ดแวร์และซอฟต์แวร์จะทำอะไรอย่างไร",
      en: "Team project — I owned the firmware, and planned how both the hardware and the software would work.",
    },
    tags: ["ESP32", "HC-SR04", "Ultrasonic", "I2C", "LCD", "C/C++"],
    cover: "/images/auto-height-meter/cover.webp",
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
        src: "/images/auto-height-meter/sensor-mount.webp",
        caption: {
          th: "เซนเซอร์ติดบนคานด้านบน ต้องเล็งให้ลำคลื่นพ้นโครงเสาลงไปถึงตัวคน",
          en: "The sensor sits on the top rail, aimed so its beam clears the frame on the way down.",
        },
      },
      {
        src: "/images/auto-height-meter/frame-install.webp",
        caption: {
          th: "โครงเสาเหล็กฉากแบบถอดประกอบได้ ระหว่างติดตั้ง",
          en: "The demountable slotted-angle frame during assembly.",
        },
      },
      {
        src: "/images/auto-height-meter/assembly.webp",
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
    links: [
      { label: "GitHub", href: "https://github.com/phum159/auto-height-meter" },
    ],
    demo: "auto-height-meter",
    diagram: {
      chains: [
        {
          stages: [
            {
              title: { th: "อินพุต", en: "Input" },
              nodes: [
                { label: "HC-SR04", note: { th: "ระยะจากคานถึงศีรษะ", en: "Rail-to-head distance" } },
                { label: "Push button", note: { th: "สั่งเริ่มวัด", en: "Starts a measurement" } },
              ],
            },
            {
              title: { th: "คำนวณ", en: "Compute" },
              via: "GPIO",
              nodes: [
                {
                  label: "NodeMCU ESP32",
                  note: { th: "ระยะอ้างอิงพื้น ลบ ระยะที่วัดได้", en: "Floor reference minus the reading" },
                  accent: "primary",
                },
              ],
            },
            {
              title: { th: "แจ้งผล", en: "Report" },
              via: "I2C / GPIO",
              nodes: [
                { label: "LCD 16×2", note: { th: "แสดงส่วนสูง", en: "Shows the height" }, accent: "output" },
                { label: "Buzzer", note: { th: "เสียงเริ่มและจบ", en: "Start and finish cue" } },
              ],
            },
          ],
        },
      ],
      notes: {
        th: [
          "ระยะอ้างอิงพื้นมาจากการคาลิเบรตทุกครั้งที่เปิดเครื่อง เพราะโครงถอดประกอบได้ ความสูงจึงไม่เท่าเดิม",
          "หนึ่งครั้งที่กดวัด เครื่องยิงหลายรอบแล้วเฉลี่ย ตัดค่าที่ผิดปกติทิ้ง",
        ],
        en: [
          "The floor reference is re-measured at every power-on, because the frame comes apart and never reassembles at the same height.",
          "One press fires several rounds, averages them and drops the outliers.",
        ],
      },
    },
    body: {
      problem: {
        th: "การวัดส่วนสูงด้วยไม้วัดต้องอ่านค่าด้วยสายตา ซึ่งคลาดเคลื่อนตามการกะระยะและท่าทางของผู้ถูกวัด และยิ่งช้าเมื่อต้องวัดต่อคิวกันหลายคน โจทย์คือทำเครื่องที่วัดเองได้ ให้เร็วขึ้นและแม่นขึ้น เป็นโครงงานรายวิชา ENCC0008 ชั้นปีที่ 1 มหาวิทยาลัยเทคโนโลยีมหานคร",
        en: "Measuring height with a ruler means reading a scale by eye, which drifts with how you judge the mark and how the person stands, and it slows down once there is a queue. The task was a device that measures on its own, faster and more accurately. A first-year ENCC0008 project at Mahanakorn University of Technology.",
      },
      architecture: {
        th: "HC-SR04 บนคานยิงคลื่นลงมาวัดระยะถึงศีรษะ ESP32 เอาไปลบออกจากระยะพื้นที่คาลิเบรตไว้ตอนเปิดเครื่อง ผลต่างคือส่วนสูง แล้วขึ้นจอ LCD มีปุ่มกดสั่งเริ่มวัด บัซเซอร์บอกเริ่มและจบ โครงเป็นเหล็กฉากถอดประกอบได้",
        en: "An HC-SR04 on the top rail measures down to the head. The ESP32 subtracts that from the floor reference captured at power-on, and the difference goes to the LCD. A button starts a measurement, a buzzer marks start and finish, and the slotted-angle frame comes apart for carrying.",
      },
      challenges: {
        th: [
          "ตอนแรกลำคลื่นของ HC-SR04 ไปกระทบโครงเสาก่อนจะถึงตัวคน ทำให้ได้ระยะของโครงแทนของศีรษะ แก้โดยคำนวณมุมแผ่ของลำคลื่นแล้วจัดตำแหน่งติดตั้งใหม่ ให้กรวยคลื่นพ้นโครงสร้างตลอดทาง",
          "ค่าที่อ่านได้บางครั้งเป็น 0 บางครั้งกระโดดไปมา แก้ด้วยการกรองสัญญาณ คือวัดหลายรอบต่อหนึ่งครั้งแล้วเฉลี่ย ตัดค่าที่ผิดปกติทิ้ง",
          "โครงเป็นแบบถอดประกอบได้ ทุกครั้งที่ประกอบใหม่ความสูงและความเอียงไม่เท่าเดิม จึงเขียนให้เครื่องคาลิเบรตหาระยะพื้นใหม่ทุกครั้งที่เปิดเครื่อง แทนที่จะฝังค่าคงที่ไว้ในโค้ด",
          "อุณหภูมิมีผลต่อความเร็วเสียง จึงมีผลต่อระยะที่คำนวณได้ รอบนี้ยังไม่ได้ชดเชย แต่ระบุไว้เป็นข้อจำกัดที่รู้ตัว ทางแก้คือเพิ่มเซนเซอร์อุณหภูมิมาปรับค่าความเร็วเสียงในสมการ",
        ],
        en: [
          "The beam was hitting the frame before it reached the person, so the reading was the structure rather than the head. Working out its spread angle and repositioning the sensor kept the cone clear all the way down.",
          "Readings occasionally came back as 0, or jumped around. Filtering fixed it: several rounds per measurement, averaged, with outliers dropped.",
          "The frame comes apart, so it never reassembles at exactly the same height or tilt. Rather than hard-coding a floor distance, the firmware re-calibrates the floor reference every time it powers on.",
          "Temperature changes the speed of sound, so it changes the computed distance. This build does not compensate; it is written up as a known limitation, with a temperature sensor as the fix.",
        ],
      },
      outcome: {
        th: "เทียบกับเครื่องวัดส่วนสูงมาตรฐานกับกลุ่มตัวอย่าง 10 คน คลาดเคลื่อนเฉลี่ย 0.59 ซม. (0.35%) และไม่มีครั้งไหนเกิน 1 ซม. ตัวเซนเซอร์เองวัดซ้ำ 100 ครั้งได้ส่วนเบี่ยงเบนมาตรฐานต่ำกว่า 0.2 ซม. หนึ่งครั้งที่กดวัดใช้เวลาราว 7 วินาที แบ่งเป็นนับถอยหลัง 3 วินาทีและเก็บค่า 3 วินาที เครื่องวัดได้ตั้งแต่ 50 ซม. ขึ้นไป ต่ำกว่านั้นจะรายงานว่าไม่พบคน ส่วนเพดานถูกจำกัดด้วยระยะต่ำสุดที่เซนเซอร์ยังอ่านได้ เพราะคานอยู่สูงราว 198 ซม. คนที่สูงมากจะเหลือช่องว่างถึงเซนเซอร์เพียงไม่กี่เซนติเมตร",
        en: "Against a standard stadiometer across ten people the mean error was 0.59 cm (0.35%), and no reading was out by more than 1 cm. The sensor itself held a standard deviation under 0.2 cm over 100 repeats. One press takes about 7 seconds — a 3 second countdown and 3 seconds of readings. It measures from 50 cm up, reporting nobody there below that, and the ceiling is set by how close the sensor can still read: the rail sits at around 198 cm, so a very tall person leaves only a few centimetres of air.",
      },
    },
  },

  {
    slug: "soil-nutrient-meter",
    title: {
      th: "เครื่องตรวจวัดแร่ธาตุและผสมปุ๋ยในดิน",
      en: "Soil Nutrient Analyser and Fertiliser Mixer",
    },
    summary: {
      th: "เครื่องสองส่วนที่ทำงานต่อกัน — หัววัดปักลงดินอ่านค่า N-P-K แล้วคำนวณว่าพืชที่จะปลูกยังขาดปุ๋ยเท่าไหร่ จากนั้นเครื่องผสมชั่งแม่ปุ๋ยสามถังตามสูตรที่ได้ ค่าที่วัดคลาดจากผลแล็บ N 6.09% P 9.49% K 5.18%",
      en: "A two-part machine: a probe reads N-P-K in the soil and works out what the crop is short of, then a mixer weighs the three base fertilisers to that recipe. Against laboratory results the readings were off by 6.09% (N), 9.49% (P) and 5.18% (K).",
    },
    year: 2025,
    featured: true,
    role: {
      th: "งานทีม 8 คน ที่วิทยาลัยเทคนิคร้อยเอ็ด — ผมรับผิดชอบการติดตั้งอุปกรณ์และพัฒนาระบบซอฟต์แวร์ร่วมกับอาจารย์ที่ปรึกษา และเป็นผู้นำเสนอผลงานต่อคณะกรรมการในเวทีประกวด",
      en: "Team of eight at Roi Et Technical College — I installed the hardware and developed the software together with our advisors, and presented the work to the judging panels at the competitions.",
    },
    tags: ["Raspberry Pi 5", "RS485", "NPK Sensor", "Load Cell", "ESP32", "Blynk", "IoT", "C/C++"],
    cover: "/images/soil-nutrient-meter/cover.webp",
    stack: ["C/C++ (Arduino IDE 2.0)", "Blynk (touchscreen UI)"],
    hardware: [
      {
        part: "RS485 Soil NPK Sensor",
        role: {
          th: "หัววัดที่ปักลงดิน อ่านค่าไนโตรเจน ฟอสฟอรัส และโพแทสเซียม ช่วงวัดสูงสุด 250 mg/kg",
          en: "The probe that goes into the ground, reading nitrogen, phosphorus and potassium, up to 250 mg/kg",
        },
        bus: "RS485",
      },
      {
        part: "USB to RS485 Converter",
        role: {
          th: "แปลงสัญญาณ RS485 จากหัววัดให้เข้าพอร์ต USB ของ Raspberry Pi",
          en: "Puts the probe's RS485 signal onto a USB port on the Raspberry Pi",
        },
        bus: "RS485 ↔ USB",
      },
      {
        part: "Raspberry Pi 5",
        role: {
          th: "สมองของชุดหัววัด อ่านค่าจากเซนเซอร์ คำนวณปริมาณปุ๋ยที่ต้องเติม และรันหน้าจอผู้ใช้",
          en: "The brain of the probe unit — reads the sensor, works out how much fertiliser to add, and runs the interface",
        },
        bus: "USB",
      },
      {
        part: "Touchscreen 7in",
        role: {
          th: "จอสัมผัสของชุดหัววัด เลือกชนิดพืช ป้อนขนาดพื้นที่ และอ่านผล",
          en: "Touchscreen on the probe unit: pick the crop, enter the plot size, read the result",
        },
        bus: "HDMI",
      },
      {
        part: "Power bank",
        role: {
          th: "จ่ายไฟให้ทั้งชุดหัววัด ทำให้หิ้วลงแปลงได้โดยไม่ต้องหาปลั๊ก",
          en: "Powers the whole probe unit, so it can be carried into a field with no mains nearby",
        },
        bus: "USB-C",
      },
      {
        part: "ESP32",
        role: {
          th: "ตัวควบคุมฝั่งเครื่องผสม อ่าน load cell สั่งจ่ายแม่ปุ๋ยแต่ละถัง และรับค่าที่ส่งมาจากชุดหัววัด",
          en: "Controller on the mixer side — reads the load cells, drives each hopper, and takes the figures sent from the probe unit",
        },
        bus: "WiFi",
      },
      {
        part: "Load cell x3",
        role: {
          th: "ชั่งน้ำหนักแม่ปุ๋ย N, P และ K แยกถังละตัว เพื่อจ่ายตามสูตรที่คำนวณไว้",
          en: "One per hopper, weighing the N, P and K base fertilisers as they are dispensed to the recipe",
        },
        bus: "—",
      },
    ],
    gallery: [
      {
        src: "/images/soil-nutrient-meter/probe-unit.webp",
        caption: {
          th: "ชุดหัววัด กล่องกันน้ำพร้อมจอสัมผัสบนแกนสเตนเลส มีที่เหยียบสำหรับปักหัววัดลงดิน",
          en: "The probe unit — a sealed enclosure with a touchscreen on a stainless shaft, with a foot plate for pushing the probe into the ground.",
        },
      },
      {
        src: "/images/soil-nutrient-meter/mixer.webp",
        caption: {
          th: "เครื่องผสมปุ๋ย ถังเก็บแม่ปุ๋ยสามถังด้านบน ไหลลงถังชั่งที่มี load cell แล้วเข้าเกลียวลำเลียงผสมลงถังรับ",
          en: "The mixer: three storage hoppers feed down into weighing hoppers on load cells, then into a common auger that blends the mix into the collection bin.",
        },
      },
      {
        src: "/images/soil-nutrient-meter/flowchart.webp",
        caption: {
          th: "ผังงานของโปรแกรม รับชนิดพืชและพื้นที่ปลูก เลือกวัดแบบหลายจุดแล้วเฉลี่ยหรือกรอกค่าเอง แล้วเรียกฟังก์ชันคำนวณปุ๋ยแยกตามชนิดพืช",
          en: "Program flow: take the crop type and plot size, either average several sample points or accept typed-in values, then call the per-crop functions that compute how much N, P and K to add.",
        },
      },
      {
        src: "/images/soil-nutrient-meter/usage-steps.webp",
        caption: {
          th: "คู่มือการใช้งาน ตั้งแต่ขั้นตอนเก็บและเตรียมตัวอย่างดิน หน้าจอ Blynk แต่ละหน้า ไปจนถึงการป้อนน้ำหนักด้วยคีย์แพดที่เครื่องผสม",
          en: "The usage manual: collecting and preparing the soil sample, each screen of the Blynk interface, and keying weights into the mixer by hand.",
        },
      },
      {
        src: "/images/soil-nutrient-meter/soil-lab-visit.webp",
        caption: {
          th: "เข้าพบกลุ่มวิเคราะห์ดิน สถานีพัฒนาที่ดินร้อยเอ็ด เพื่อส่งตัวอย่างดินตรวจและขอสูตรคำนวณปุ๋ย",
          en: "At the soil analysis group of the Roi Et Land Development Station, submitting samples for testing and asking for the fertiliser calculation formulas.",
        },
      },
      {
        src: "/images/soil-nutrient-meter/firmware.webp",
        caption: {
          th: "ระหว่างพัฒนาซอฟต์แวร์ ต่อชุดหัววัดเข้ากับโน้ตบุ๊กเพื่อไล่โค้ดและทดสอบการอ่านค่า",
          en: "Working on the software, with the probe unit tethered to a laptop for debugging and checking readings.",
        },
      },
      {
        src: "/images/soil-nutrient-meter/field-test.webp",
        caption: {
          th: "ทดสอบวัดจริงในแปลงที่ไถเตรียมดินไว้ อ่านค่าจากหน้าจอที่หัววัด",
          en: "Testing in a ploughed field, reading values off the probe unit's screen.",
        },
      },
      {
        src: "/images/soil-nutrient-meter/install.webp",
        caption: {
          th: "ระหว่างติดตั้งและเดินสายอุปกรณ์ในตัวเครื่อง",
          en: "Installing and wiring the hardware.",
        },
      },
      {
        src: "/images/soil-nutrient-meter/presentation.webp",
        caption: {
          th: "นำเสนอผลงานต่อคณะกรรมการในการประกวดสิ่งประดิษฐ์",
          en: "Presenting the invention to the judging panel.",
        },
      },
    ],
    awards: [
      {
        result: { th: "รางวัลระดับเหรียญเงิน", en: "Silver medal" },
        event: { th: "OVEC Innovation Award 2025", en: "OVEC Innovation Award 2025" },
        level: { th: "ระดับชาติ", en: "National" },
        category: {
          th: "ประเภทที่ 1 สิ่งประดิษฐ์ด้านนวัตกรรมและเทคโนโลยีการเกษตรอุตสาหกรรมสมัยใหม่",
          en: "Category 1: innovation and technology for modern agricultural industry",
        },
        date: { th: "23 มกราคม 2568", en: "23 January 2025" },
      },
      {
        result: { th: "รองชนะเลิศอันดับ 1 ระดับเหรียญทอง", en: "First runner-up, gold medal" },
        event: {
          th: "การประกวดสิ่งประดิษฐ์ของคนรุ่นใหม่",
          en: "Young Inventors Competition",
        },
        level: { th: "ระดับภาคตะวันออกเฉียงเหนือ", en: "Northeastern regional round" },
        date: { th: "11 ธันวาคม 2567", en: "11 December 2024" },
      },
      {
        result: { th: "รางวัล Honor Awards ระดับเหรียญทอง", en: "Honor Award, gold medal" },
        event: {
          th: "การประกวดสิ่งประดิษฐ์ของคนรุ่นใหม่",
          en: "Young Inventors Competition",
        },
        level: { th: "ระดับภาคตะวันออกเฉียงเหนือ", en: "Northeastern regional round" },
        date: { th: "11 ธันวาคม 2567", en: "11 December 2024" },
      },
      {
        result: { th: "ชนะเลิศ ระดับเหรียญทอง", en: "First place, gold medal" },
        event: {
          th: "การประกวดสิ่งประดิษฐ์ของคนรุ่นใหม่",
          en: "Young Inventors Competition",
        },
        level: { th: "ระดับอาชีวศึกษาจังหวัดร้อยเอ็ด", en: "Roi Et provincial round" },
        date: { th: "19 พฤศจิกายน 2567", en: "19 November 2024" },
      },
    ],
    demo: "soil-nutrient-meter",
    diagram: {
      chains: [
        {
          title: { th: "ชุดหัววัด", en: "Probe unit" },
          stages: [
            {
              title: { th: "หัววัด", en: "Probe" },
              nodes: [
                {
                  label: "RS485 Soil NPK",
                  note: { th: "ไนโตรเจน ฟอสฟอรัส โพแทสเซียม", en: "Nitrogen, phosphorus, potassium" },
                },
              ],
            },
            {
              title: { th: "ตัวแปลง", en: "Converter" },
              via: "RS485",
              nodes: [
                { label: "USB to RS485", note: { th: "ต่อเข้าพอร์ต USB", en: "Onto a USB port" } },
              ],
            },
            {
              title: { th: "คำนวณและแสดงผล", en: "Compute and display" },
              via: "USB",
              nodes: [
                {
                  label: "Raspberry Pi 5",
                  note: { th: "หาปุ๋ยที่ขาด แล้วขึ้นจอทัชสกรีน 7 นิ้ว", en: "Works out the shortfall, onto a 7-inch touchscreen" },
                  accent: "primary",
                },
                { label: "Power bank", note: { th: "ไฟเลี้ยงทั้งชุด", en: "Powers the unit" } },
              ],
            },
          ],
        },
        {
          title: { th: "เครื่องผสมปุ๋ย", en: "Fertiliser mixer" },
          stages: [
            {
              title: { th: "แม่ปุ๋ย", en: "Base fertilisers" },
              nodes: [{ label: "N / P / K", note: { th: "ถังเก็บสามถัง", en: "Three storage hoppers" } }],
            },
            {
              title: { th: "ชั่ง", en: "Weigh" },
              via: "WiFi",
              nodes: [
                { label: "ESP32", note: { th: "ตัวควบคุมเครื่องผสม", en: "Mixer controller" }, accent: "primary" },
                { label: "Load cell ×3", note: { th: "ถังละตัว จ่ายตามน้ำหนัก", en: "One per hopper, dispensing by weight" } },
              ],
            },
            {
              title: { th: "ผสม", en: "Blend" },
              nodes: [{ label: "Auger", note: { th: "เกลียวลำเลียงผสมรวม", en: "Common mixing auger" } }],
            },
            {
              title: { th: "ปลายทาง", en: "Out" },
              nodes: [{ label: "Bin", note: { th: "ปุ๋ยผสมเสร็จ", en: "Finished mix" }, accent: "output" }],
            },
          ],
        },
      ],
      notes: {
        th: [
          "สูตรคำนวณปุ๋ยขอมาจากกลุ่มวิเคราะห์ดิน สถานีพัฒนาที่ดินร้อยเอ็ด ไม่ได้คิดเอง",
          "ก่อนวัดต้องเตรียมตัวอย่าง ดิน 200 มล. ต่อน้ำ 100 มล. เพื่อให้ความชื้นเท่ากันทุกครั้ง",
          "เครื่องผสมมีโหมด Manual ที่คีย์แพด ป้อนน้ำหนักทีละถัง Ch.1-Ch.3 ได้เองโดยไม่ต้องรอค่าจากหัววัด",
        ],
        en: [
          "The fertiliser formula came from the soil analysis group at the Roi Et Land Development Station, not from us.",
          "Samples are prepared first — 200 ml of soil to 100 ml of water — so every reading starts from the same moisture.",
          "The mixer also has a manual keypad mode: key a weight per hopper, Ch.1 to Ch.3, with no probe involved.",
        ],
      },
    },
    body: {
      problem: {
        th: "ต้นทุนก้อนใหญ่ที่สุดของชาวนาคือปุ๋ยสูตรสำเร็จ ซึ่งซื้อง่ายแต่แพง และการใส่สูตรเดิมซ้ำ ๆ โดยไม่รู้ว่าดินขาดอะไร ทำให้แร่ธาตุบางตัวสะสมจนดินเสื่อม ถ้าเกษตรกรวัดดินเองแล้วผสมเฉพาะตัวที่ขาดได้ ก็ลดต้นทุนและรักษาดินไปพร้อมกัน",
        en: "A rice farmer's biggest input cost is ready-mixed fertiliser: easy to buy, expensive, and applied to the same formula year after year without knowing what the soil lacks, so some nutrients build up until the ground degrades. Measuring the soil and mixing only what is missing cuts cost and protects it.",
      },
      architecture: {
        th: "หัววัดอ่านค่า N-P-K ส่งผ่าน RS485 เข้า Raspberry Pi 5 ซึ่งเป็นทั้งตัวคำนวณและหน้าจอ ผู้ใช้เลือกชนิดพืชและขนาดพื้นที่บนทัชสกรีน 7 นิ้ว จะวัดหลายจุดให้เฉลี่ยหรือกรอกค่าเองก็ได้ แล้วเครื่องบอกว่าต้องเติม N, P, K กี่กิโลกรัม ทั้งชุดใช้ไฟจากแบตสำรอง หิ้วลงแปลงได้เลย ส่วนเครื่องผสมรับน้ำหนักไปชั่งจ่าย หรือป้อนเองที่คีย์แพดก็ได้",
        en: "The probe reads N-P-K over RS485 into a Raspberry Pi 5, which is both the calculator and the screen. You pick the crop and plot size on a 7-inch touchscreen, average several points or type in values, and it says how many kilograms of N, P and K to add. A power bank runs it, so it works in a field with no mains. The mixer weighs that out, or takes weights from its own keypad.",
      },
      challenges: {
        th: [
          "คำถามแรกคือจะรู้ได้ยังไงว่าค่าที่อ่านได้เชื่อถือได้ จึงส่งดินที่วัดไว้แล้วไปให้ห้องแล็บของสถานีพัฒนาที่ดินร้อยเอ็ดตรวจ แล้วเอามาเทียบกัน วัดซ้ำตัวอย่างละ 5 ครั้งใน 3 ชนิดดิน ได้ความคลาดเคลื่อนรวม N 6.09% P 9.49% K 5.18%",
          "คำถามที่สองคือพืชแต่ละชนิดต้องการ N-P-K เท่าไหร่ การเดาเองไม่มีน้ำหนักพอจะเอาไปแนะนำเกษตรกร จึงขอสูตรคำนวณจากกลุ่มวิเคราะห์ดินมาเขียนเป็นฟังก์ชันแยกตามชนิดพืช",
          "เซนเซอร์อ่านไม่ได้ถ้าดินแห้งเกินไป และเกณฑ์ความชื้นขั้นต่ำต่างกันตามชนิดดิน จากการไล่ทดสอบพบว่าดินเหนียวต้อง 50% ขึ้นไป ดินทราย 40% ดินร่วน 30% แทนที่จะปล่อยให้ผู้ใช้เจอค่าเพี้ยนหน้างาน จึงกำหนดขั้นตอนเตรียมตัวอย่างไว้ในคู่มือ คือตวงดิน 200 มล. เติมน้ำ 100 มล. ก่อนวัดทุกครั้ง",
          "ความคลาดเคลื่อนไม่ได้กระจายเท่ากันทุกกรณี ฟอสฟอรัสในดินทรายพลาดมากที่สุดที่ 10.46% ขณะที่ดินเหนียวพลาดเพียง 0.39-8.09% จึงระบุไว้เป็นจุดที่ต้องปรับปรุงต่อ แทนที่จะรายงานแต่ค่าเฉลี่ยรวม",
          "ระบบชั่งจ่ายปุ๋ยแม่นน้อยลงเมื่อจ่ายครั้งละน้อย ๆ ที่ 150 กรัมคลาดเคลื่อน 4.6% แต่พอเพิ่มเป็น 850 กรัมเหลือ 0% เฉลี่ยทั้งช่วงได้ 2.32% คิดเป็นประสิทธิภาพ 97.68%",
          "ถังผสมเป็นพลาสติกซึ่งทนปุ๋ยเคมีระยะยาวได้ไม่ดี และผู้ใช้ให้คะแนนความสะดวกในการเคลื่อนย้ายต่ำสุด ทั้งสองข้อบันทึกไว้เป็นข้อเสนอแนะสำหรับรุ่นถัดไป",
        ],
        en: [
          "How do we know the readings are trustworthy at all? We sent soil we had already measured to the laboratory at the Roi Et Land Development Station and compared. Five repeats per sample across three soil types gave overall errors of 6.09% (N), 9.49% (P) and 5.18% (K).",
          "Second: how much N-P-K does each crop need? Guessing carries no weight when you are advising farmers, so we asked the same group for their formula and implemented it as per-crop functions.",
          "The sensor cannot read soil that is too dry, and the threshold differs by type: clay needs 50% moisture, sand 40%, loam 30%. Rather than let users find that out through wrong numbers, the manual fixes the preparation — 200 ml of soil to 100 ml of water before every reading.",
          "The error is not spread evenly. Phosphorus in sandy soil was the worst case at 10.46%, while clay stayed between 0.39% and 8.09%. That is recorded as the thing to fix next, instead of reporting only the overall average.",
          "The weighing side is least accurate on small batches: 4.6% off at 150 g, falling to 0% by 850 g, averaging 2.32% across the range — 97.68% efficiency.",
          "The mixing tank is plastic, which does not last against chemical fertiliser, and users scored portability lowest. Both went into the report as recommendations for the next build.",
        ],
      },
      outcome: {
        th: "ผลประเมินประสิทธิภาพโดยรวมอยู่ในระดับมาก 3.99 ด้านความแม่นยำสูงสุด 4.33 และจ่ายแม่ปุ๋ยตรงตามสูตรครบ 100% ทุกน้ำหนักที่ทดสอบ จากนั้นให้เกษตรกรผู้ปลูกข้าวบ้านโนนรัง 15 ราย ใช้จริง ได้ความพึงพอใจ 4.38 สูงสุดที่การแสดงผลทันที 4.80 ต่ำสุดที่ความสะดวกในการเคลื่อนย้าย 4.07 ผลงานได้รางวัลระดับจังหวัด ภาค และชาติ รวมสี่รางวัล",
        en: "Overall efficiency was rated high at 3.99, accuracy best at 4.33, and the mixer hit the specified recipe 100% of the time at every batch size. Fifteen rice farmers at Ban Non Rang rated it 4.38 — real-time display highest at 4.80, portability lowest at 4.07. It won four awards, from provincial to national.",
      },
    },
  },

  {
    slug: "auto-lamp",
    title: {
      th: "PCB โคมไฟอัตโนมัติ",
      en: "Auto Lamp Control PCB",
    },
    summary: {
      th: "โคมไฟปลายเท้าเตียงที่สั่งจากมือถือและตั้งเวลาให้ดับเองได้ ออกแบบวงจรเองทั้งแผ่น ตั้งแต่ Schematic ใน EasyEDA จนสั่งผลิต PCB โดยมีไฟบ้านเดินอยู่บนบอร์ด",
      en: "A lamp at the foot of the bed, switched from a phone and able to turn itself off. The board is my own design end to end — EasyEDA schematic through to a fabricated PCB, with mains running across it.",
    },
    year: 2026,
    role: {
      th: "ทำคนเดียวทั้งหมด — ออกแบบวงจร วางลาย PCB และเขียนเฟิร์มแวร์",
      en: "Solo project — circuit design, PCB layout, and firmware.",
    },
    tags: ["ESP32-C3", "Blynk", "Relay", "PCB", "EasyEDA", "Mains", "C/C++"],
    cover: "/images/auto-lamp/cover.webp",
    stack: ["C/C++ (Arduino for ESP32)", "Blynk", "EasyEDA"],
    demo: "auto-lamp",
    hardware: [
      {
        part: "ESP32-C3 SuperMini ×1",
        role: {
          th: "ตัวควบคุมหลัก ต่อ WiFi รับคำสั่งจากแอป Blynk และขับรีเลย์ออกทาง GPIO5",
          en: "Main controller — joins WiFi, takes commands from the Blynk app, and drives the relay from GPIO5",
        },
        bus: "WiFi",
      },
      {
        part: "SONGLE SRD-05VDC-SL-C ×1",
        role: {
          th: "รีเลย์ 5V หน้าสัมผัสทน 10A 250VAC ตัดต่อไฟที่จ่ายให้โคมไฟ และแยกฝั่งไฟบ้านออกจากฝั่งลอจิก",
          en: "5 V relay rated 10 A at 250 VAC — switches the lamp's mains feed and keeps the mains side clear of the logic side",
        },
        bus: "GPIO5 (ผ่าน 2N2222A)",
      },
      {
        part: "2N2222A ×1",
        role: {
          th: "ทรานซิสเตอร์ขับคอยล์รีเลย์ เพราะขา GPIO จ่ายกระแสให้คอยล์ได้ไม่พอ",
          en: "Drives the relay coil — a GPIO pin cannot source enough current for it on its own",
        },
        bus: "—",
      },
      {
        part: "R1 470 Ω ×1",
        role: {
          th: "ตัวต้านทานอนุกรมระหว่าง GPIO5 กับขาเบส จำกัดกระแสที่ไหลออกจากขา MCU",
          en: "Series resistor between GPIO5 and the transistor base, limiting the current out of the MCU pin",
        },
        bus: "—",
      },
      {
        part: "R2 1 kΩ ×1",
        role: {
          th: "ตัวต้านทานดึงขาเบสลงกราวด์ กันทรานซิสเตอร์ติดเองตอนขา GPIO ยังลอยระหว่างบูต",
          en: "Pull-down on the base, so the transistor cannot switch on while the GPIO is still floating during boot",
        },
        bus: "—",
      },
      {
        part: "1N4007 ×1",
        role: {
          th: "ไดโอดคร่อมคอยล์รีเลย์ กินแรงดันย้อนกลับตอนคอยล์ถูกตัดวงจร",
          en: "Flyback diode across the relay coil, absorbing the kick when the coil switches off",
        },
        bus: "—",
      },
      {
        part: "Hi-Link HLK-PM01 ×1",
        role: {
          th: "โมดูลแปลงไฟบ้าน 100-240VAC เป็น 5V 0.6A ในตัว เลี้ยงทั้งบอร์ด ไม่ต้องมีอะแดปเตอร์แยก",
          en: "Converts 100–240 VAC to 5 V at 0.6 A on-board, so no separate adapter is needed",
        },
        bus: "AC in / 5V out",
      },
      {
        part: "Fuse ×1",
        role: {
          th: "ฟิวส์คั่นทางไฟขาเข้า ตัดวงจรเมื่อกระแสเกิน",
          en: "On the incoming mains, opening the circuit on overcurrent",
        },
        bus: "—",
      },
      {
        part: "MOV 14D471K ×1",
        role: {
          th: "วาริสเตอร์คร่อมไฟขาเข้าหลังฟิวส์ กินแรงดันกระชากจากไฟบ้านก่อนถึงภาคจ่ายไฟ",
          en: "Varistor across the mains after the fuse, clamping surges before they reach the supply",
        },
        bus: "—",
      },
      {
        part: "C1 100 µF ×1",
        role: {
          th: "กรองไฟเลี้ยงให้นิ่งตอนรีเลย์ดูด ซึ่งเป็นจังหวะที่กินกระแสกระชาก",
          en: "Bulk capacitor holding the rail steady through the current spike when the relay pulls in",
        },
        bus: "—",
      },
      {
        part: "C2 0.1 µF ×1",
        role: {
          th: "กรองสัญญาณรบกวนความถี่สูงที่ขาไฟเลี้ยง",
          en: "Decoupling capacitor for high-frequency noise on the supply rail",
        },
        bus: "—",
      },
      {
        part: "Terminal block 2P ×2",
        role: {
          th: "ขั้วต่อสายไฟเข้า (INPUT_AC) และสายออกไปโคมไฟ (OUTPUT_AC) อย่างละตัว",
          en: "One for the incoming mains (INPUT_AC), one for the run out to the lamp (OUTPUT_AC)",
        },
        bus: "—",
      },
    ],
    gallery: [
      {
        src: "/images/auto-lamp/board.webp",
        caption: {
          th: "บอร์ดที่ประกอบเสร็จ ฝั่งซ้ายเป็นไฟบ้านเข้า-ออกและรีเลย์ ฝั่งขวาเป็นภาคจ่ายไฟกับ ESP32-C3 แยกกันคนละโซน",
          en: "The assembled board: mains in and out plus the relay on the left, the supply and the ESP32-C3 on the right, kept in separate zones.",
        },
      },
      {
        src: "/images/auto-lamp/schematic.webp",
        caption: {
          th: "Schematic ใน EasyEDA ไฟบ้านผ่านฟิวส์และ MOV เข้า HLK-PM01 ส่วน GPIO5 ขับรีเลย์ผ่าน R1 470Ω เข้าเบสของ 2N2222A โดยมี R2 1kΩ ดึงเบสลงกราวด์",
          en: "The EasyEDA schematic: mains passes a fuse and an MOV into the HLK-PM01, while GPIO5 drives the relay through R1 470 Ω into the base of the 2N2222A, with R2 1 kΩ pulling that base to ground.",
        },
      },
      {
        src: "/images/auto-lamp/pcb-layout.webp",
        caption: {
          th: "การวางลาย ลายฝั่งไฟบ้าน (แดง-น้ำเงินเส้นหนา) เดินอยู่ครึ่งซ้าย แยกจากฝั่งลอจิกที่อยู่ครึ่งขวา",
          en: "The layout — the mains traces run across the left half, away from the logic on the right.",
        },
      },
      {
        src: "/images/auto-lamp/blynk-app.webp",
        caption: {
          th: "หน้าแอป Blynk มีปุ่มเปิด-ปิด ไฟสถานะ และช่องตั้งเวลาให้ไฟดับเอง",
          en: "The Blynk dashboard: an on/off button, a status light, and the time field for having the lamp switch itself off.",
        },
      },
    ],
    diagram: {
      chains: [
        {
          title: { th: "สายควบคุม", en: "Control path" },
          stages: [
            {
              title: { th: "ผู้ใช้", en: "User" },
              nodes: [{ label: "Blynk", note: { th: "ปุ่ม ตั้งเวลา สถานะ", en: "Button, timer, status" } }],
            },
            {
              title: { th: "ตัวควบคุม", en: "Controller" },
              via: "WiFi",
              nodes: [
                {
                  label: "ESP32-C3 SuperMini",
                  note: { th: "รับคำสั่งและจับเวลา", en: "Takes commands, keeps time" },
                  accent: "primary",
                },
              ],
            },
            {
              title: { th: "วงจรขับ", en: "Driver" },
              via: "GPIO5",
              nodes: [
                { label: "R1 470Ω", note: { th: "จำกัดกระแสขา MCU", en: "Limits MCU pin current" } },
                { label: "Q1 2N2222A", note: { th: "ขับคอยล์รีเลย์", en: "Drives the relay coil" } },
              ],
            },
            {
              title: { th: "ตัดต่อไฟ", en: "Switch" },
              via: "coil",
              nodes: [
                { label: "SRD-05VDC-SL-C", note: { th: "รีเลย์ 10A 250VAC", en: "Relay, 10 A at 250 VAC" } },
              ],
            },
            {
              title: { th: "ปลายทาง", en: "Load" },
              via: "AC",
              nodes: [{ label: "OUTPUT_AC", note: { th: "โคมไฟปลายเท้าเตียง", en: "The lamp" }, accent: "output" }],
            },
          ],
        },
        {
          title: { th: "ภาคจ่ายไฟ", en: "Supply" },
          stages: [
            { nodes: [{ label: "INPUT_AC", note: { th: "ไฟบ้าน 220V", en: "220 V mains" } }] },
            { via: "L", nodes: [{ label: "F1", note: { th: "ฟิวส์", en: "Fuse" } }] },
            { nodes: [{ label: "MOV 14D471K", note: { th: "กินไฟกระชาก", en: "Clamps surges" } }] },
            {
              nodes: [
                { label: "HLK-PM01", note: { th: "แปลงเป็น 5V บนบอร์ด", en: "To 5 V, on-board" }, accent: "primary" },
              ],
            },
            {
              via: "5V",
              nodes: [
                { label: "C1 100µF / C2 0.1µF", note: { th: "กรองไฟตอนรีเลย์ดูด", en: "Steady through the relay pull-in" } },
              ],
            },
          ],
        },
      ],
      notes: {
        th: [
          "R2 1kΩ ดึงขาเบสลงกราวด์ กันทรานซิสเตอร์ติดเองตอน GPIO ยังลอยระหว่างบูต",
          "1N4007 คร่อมคอยล์รีเลย์ กินแรงดันย้อนกลับตอนคอยล์ตัดวงจร",
          "รีเลย์เป็นตัวคั่นระหว่างฝั่งไฟบ้านกับฝั่งลอจิก ลายทองแดงสองฝั่งแยกกันบนแผ่น",
        ],
        en: [
          "R2 1 kΩ pulls the base to ground so the transistor stays off while the GPIO is still floating during boot.",
          "The 1N4007 across the coil absorbs the kick when it switches off.",
          "The relay is the boundary between mains and logic; the two sides are kept apart on the board.",
        ],
      },
    },
    body: {
      problem: {
        th: "เวลาจะนอนผมชอบเปิดไฟดวงเล็กไว้ทางปลายเท้า แล้วก็ขี้เกียจลุกไปปิด โจทย์เลยง่ายมาก คือปิดไฟจากบนเตียงหรือตั้งเวลาให้ดับเอง ที่เลือกทำวงจรเองแทนการซื้อปลั๊กอัจฉริยะ เพราะอยากได้ประสบการณ์ออกแบบบอร์ดจริง",
        en: "I like a small light on at the foot of the bed, then cannot be bothered to get up and switch it off. The brief was that simple. I built the circuit rather than buying a smart plug because I wanted the practice of designing a real board.",
      },
      architecture: {
        th: "ESP32-C3 SuperMini รับคำสั่งจากแอป Blynk ซึ่งมีปุ่มเปิด-ปิด ไฟสถานะ ช่องตั้งเวลาแบบนาฬิกา และตัวนับเวลาที่เหลือ จุดที่ตั้งใจออกแบบคือวางภาคจ่ายไฟ HLK-PM01 ไว้บนบอร์ดเลย ทั้งกล่องจึงใช้สายไฟเส้นเดียว ไม่ต้องมีอะแดปเตอร์แยก",
        en: "An ESP32-C3 SuperMini takes commands from the Blynk app: on/off button, status light, a clock-time field and a countdown. The deliberate part is putting the HLK-PM01 supply on the board itself, so the enclosure runs off one cable with no separate adapter.",
      },
      challenges: {
        th: [
          "ก่อนหน้านี้ผมต่อวงจรบนโฟโตบอร์ดอย่างเดียว งานนี้เป็นครั้งแรกที่ไล่ครบทั้งกระบวนการ ตั้งแต่เขียน Schematic เลือกอุปกรณ์ให้ตรงกับของที่หาซื้อได้ จับ footprint ให้ตรงตัวถังจริง จนวางลายส่งผลิต ต่างจากโฟโตบอร์ดตรงที่ผิดแล้วแก้ไม่ได้ ต้องตรวจให้จบก่อนส่ง",
          "รีเลย์แต่ละรุ่นไม่ได้ทำงานที่ลอจิกเดียวกัน บางตัวดูดเมื่อได้ลอจิก 1 บางตัวเมื่อได้ 0 รอบนี้เดาเอาเองเลยเสียเวลาไล่ปัญหา บทเรียนคือเขียนโค้ดสั้น ๆ สลับรีเลย์ยืนยันก่อนว่าใช้ลอจิกไหน แล้วค่อยต่อส่วนอื่น",
          "เป็นบอร์ดแรกที่ผมออกแบบเองแล้วมีไฟบ้านเดินอยู่บนแผ่น จึงต้องคิดเผื่อมากกว่างานไฟต่ำ ทั้งฟิวส์และ MOV ที่ต้นทาง การให้รีเลย์เป็นตัวคั่นฝั่งไฟบ้านกับฝั่งลอจิก และการเว้นระยะลายทองแดงให้พอ",
        ],
        en: [
          "My first time through the whole flow: schematic, picking library parts that match what I can actually buy, matching footprints to the real packages, then layout and fabrication. Unlike a breadboard there is no fixing it afterwards — a mistake means ordering again.",
          "Relays do not all switch on the same logic level — some pull in on a 1, some on a 0. I assumed instead of checking and lost time to it. Confirm it with a few lines that just toggle the relay before building anything on top.",
          "This was the first board I designed with mains running across it, which needs more care than a low-voltage circuit: a fuse and an MOV at the inlet, the mains side kept away from the logic side with the relay as the boundary, and enough clearance around the mains traces.",
        ],
      },
      outcome: {
        th: "ใช้งานจริงอยู่ที่ปลายเท้าเตียง สั่งเปิด-ปิดจากมือถือและตั้งเวลาให้ดับเองได้ตามที่ตั้งใจไว้ และได้แผ่น PCB ที่ออกแบบเองออกมาใช้งานได้จริงตั้งแต่เวอร์ชันแรก",
        en: "It is in use at the foot of the bed, switching from the phone and turning itself off on a timer as intended, and the PCB I designed worked from the first revision.",
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
   *     date: { th: "11 ธันวาคม 2567", en: "11 December 2024" },
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
