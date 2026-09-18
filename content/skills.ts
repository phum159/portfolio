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
          th: "เกตเวย์ WiFi/MQTT และกล่องรีเลย์ที่คุมผ่าน ESP-NOW ในระบบสมาร์ตโฮม",
          en: "WiFi/MQTT gateway and the ESP-NOW relay box in the smart home",
        },
      },
      { name: "Arduino (AVR)" },
    ],
  },
  {
    id: "languages",
    title: { th: "ภาษาโปรแกรม", en: "Languages" },
    items: [
      { name: "C", featured: true },
      { name: "C++", featured: true },
      { name: "Python" },
    ],
  },
  {
    id: "protocols",
    title: { th: "โปรโตคอลและการสื่อสาร", en: "Protocols & buses" },
    items: [
      { name: "I2C", featured: true },
      { name: "SPI", featured: true },
      { name: "UART", featured: true },
      { name: "MQTT", featured: true },
      { name: "ESP-NOW" },
      { name: "HTTP / REST" },
    ],
  },
  {
    id: "tools",
    title: { th: "เครื่องมือและซอฟต์แวร์", en: "Toolchain & software" },
    items: [
      { name: "STM32CubeMX / CubeIDE", featured: true },
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
      { name: "Logic analyzer" },
      { name: "Soldering / rework" },
      { name: "Breadboard prototyping" },
    ],
  },
];
