import type { SkillGroup } from "./types";

/**
 * The lab bench. Add a skill = add an item to the right group.
 * Add a new category = add a new group object.
 *
 * There is no proficiency rating on purpose — see the Skill type.
 * `featured: true` puts an item in the short list on the home page;
 * keep that list to things the projects actually demonstrate.
 *
 * `note` is for one line of evidence, not a claim. If you cannot point
 * at where you used something, it is better to leave the note off — or
 * to remove the skill.
 */
export const skillGroups: SkillGroup[] = [
  {
    id: "mcu",
    title: { th: "ไมโครคอนโทรลเลอร์และบอร์ด", en: "Microcontrollers & boards" },
    items: [
      {
        name: "STM32F1 (HAL / CubeMX)",
        featured: true,
        note: {
          th: "ตัวหลักของระบบสมาร์ตโฮม อ่านเซนเซอร์และขับจอ",
          en: "The main MCU in the smart home build — sensors and display",
        },
      },
      {
        name: "ESP32 / ESP32-C3",
        featured: true,
        note: {
          th: "ใช้เป็นเกตเวย์ MQTT และเป็นตัวคุมหลักของเครื่องวัดความสูง",
          en: "MQTT gateway in one project, main controller in the height meter",
        },
      },
      { name: "Arduino (AVR)" },
      { name: "Raspberry Pi" },
    ],
  },
  {
    id: "languages",
    title: { th: "ภาษาโปรแกรม", en: "Languages" },
    items: [
      { name: "C", featured: true },
      { name: "C++", featured: true },
      { name: "Python" },
      { name: "TypeScript / JavaScript" },
      { name: "SQL" },
    ],
  },
  {
    id: "protocols",
    title: { th: "โปรโตคอลและการสื่อสาร", en: "Protocols & buses" },
    items: [
      { name: "I2C", featured: true },
      { name: "SPI", featured: true },
      { name: "UART", featured: true },
      {
        name: "MQTT",
        featured: true,
        note: {
          th: "ออกแบบ topic tree และ discovery payload เองทั้งหมด",
          en: "Designed the topic tree and discovery payloads myself",
        },
      },
      { name: "ESP-NOW" },
      { name: "HTTP / REST" },
    ],
  },
  {
    id: "tools",
    title: { th: "เครื่องมือและซอฟต์แวร์", en: "Toolchain & software" },
    items: [
      { name: "STM32CubeMX / CubeIDE", featured: true },
      { name: "PlatformIO" },
      { name: "Git" },
      { name: "Docker", featured: true },
      {
        name: "Home Assistant",
        note: {
          th: "วางระบบและเขียนออโตเมชันเองบนเซิร์ฟเวอร์ของตัวเอง",
          en: "Set up and wrote the automations on a server I run myself",
        },
      },
      { name: "PostgreSQL" },
      { name: "Linux (Ubuntu, ssh)" },
    ],
  },
  {
    id: "bench",
    title: { th: "เครื่องมือวัดบนโต๊ะทำงาน", en: "Bench instruments" },
    items: [
      { name: "Digital multimeter" },
      {
        name: "Logic analyzer",
        note: { th: "ใช้ไล่ปัญหาบัส I2C/SPI", en: "For chasing I2C/SPI bus problems" },
      },
      { name: "Oscilloscope" },
      { name: "Soldering / rework" },
      { name: "Breadboard prototyping" },
    ],
  },
];
