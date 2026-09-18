import type { SkillGroup } from "./types";

/**
 * The lab bench. Add a skill = add an item to the right group.
 * Add a new category = add a new group object.
 *
 * level: 1 tried it · 2 working knowledge · 3 comfortable · 4 go-to tool
 * (labels live in lib/i18n.ts under "skills.level.*")
 */
export const skillGroups: SkillGroup[] = [
  {
    id: "mcu",
    title: { th: "ไมโครคอนโทรลเลอร์และบอร์ด", en: "Microcontrollers & boards" },
    items: [
      {
        name: "STM32F1 (HAL / CubeMX)",
        level: 3,
        note: {
          th: "ใช้เป็นตัวหลักในระบบสมาร์ตโฮม",
          en: "The main MCU in my smart home build",
        },
      },
      { name: "ESP32 / ESP32-C3", level: 3 },
      { name: "Arduino (AVR)", level: 3 },
      { name: "Raspberry Pi", level: 2 },
    ],
  },
  {
    id: "languages",
    title: { th: "ภาษาโปรแกรม", en: "Languages" },
    items: [
      { name: "C", level: 3 },
      { name: "C++", level: 3 },
      { name: "Python", level: 3 },
      { name: "TypeScript / JavaScript", level: 2 },
      { name: "SQL", level: 2 },
    ],
  },
  {
    id: "protocols",
    title: { th: "โปรโตคอลและการสื่อสาร", en: "Protocols & buses" },
    items: [
      { name: "I2C", level: 3 },
      { name: "SPI", level: 3 },
      { name: "UART", level: 4 },
      { name: "MQTT", level: 3, note: { th: "ออกแบบ topic tree เอง", en: "Designed my own topic tree" } },
      { name: "ESP-NOW", level: 2 },
      { name: "HTTP / REST", level: 2 },
    ],
  },
  {
    id: "tools",
    title: { th: "เครื่องมือและซอฟต์แวร์", en: "Toolchain & software" },
    items: [
      { name: "STM32CubeMX / CubeIDE", level: 3 },
      { name: "PlatformIO", level: 2 },
      { name: "Git", level: 3 },
      { name: "Docker", level: 2 },
      { name: "Home Assistant", level: 3 },
      { name: "Linux (Ubuntu, ssh)", level: 2 },
    ],
  },
  {
    id: "bench",
    title: { th: "เครื่องมือวัดบนโต๊ะทำงาน", en: "Bench instruments" },
    items: [
      { name: "Digital multimeter", level: 3 },
      { name: "Logic analyzer", level: 3, note: { th: "ใช้ไล่ปัญหาบัส I2C/SPI", en: "For chasing I2C/SPI bus problems" } },
      { name: "Oscilloscope", level: 2 },
      { name: "Soldering / rework", level: 3 },
      { name: "Breadboard prototyping", level: 4 },
    ],
  },
];
