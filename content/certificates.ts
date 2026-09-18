import type { Certificate } from "./types";

/**
 * Certificates, training and competition results, newest first.
 * Put the scan in public/images/certs/ and point `image` at it.
 *
 * A competition win can also be attached to the project that won it —
 * see `awards` in content/projects.ts. This page is the evidence
 * (the certificate itself); that field is the claim on the project.
 */
export const certificates: Certificate[] = [
  {
    id: "agoda-tech-camp-day-2026",
    title: {
      th: "Agoda Tech Camp Day",
      en: "Agoda Tech Camp Day",
    },
    issuer: {
      th: "Agoda",
      en: "Agoda",
    },
    date: { th: "17 กรกฎาคม 2569", en: "17 July 2026" },
    image: "/images/certs/agoda-tech-camp-day.jpg",
  },
  {
    id: "ovec-innovation-award-2025-silver",
    title: {
      th: "รางวัลระดับเหรียญเงิน — เครื่องตรวจวัดแร่ธาตุและผสมปุ๋ยในดิน",
      en: "Silver medal — Soil Nutrient Analyser and Fertiliser Mixer",
    },
    issuer: {
      th: "สำนักงานคณะกรรมการการอาชีวศึกษา ร่วมกับ สำนักงานการวิจัยแห่งชาติ และ สกสว. — OVEC Innovation Award 2025",
      en: "Office of the Vocational Education Commission, with NRCT and TSRI — OVEC Innovation Award 2025",
    },
    date: { th: "23 มกราคม 2568", en: "23 January 2025" },
    image: "/images/certs/ovec-innovation-silver.jpg",
  },
  {
    id: "vec-35-regional-gold-runner-up",
    title: {
      th: "รองชนะเลิศอันดับ 1 ระดับเหรียญทอง — เครื่องตรวจวัดแร่ธาตุและผสมปุ๋ยในดิน",
      en: "First runner-up, gold medal — Soil Nutrient Analyser and Fertiliser Mixer",
    },
    issuer: {
      th: "สำนักงานคณะกรรมการการอาชีวศึกษา — ระดับภาคตะวันออกเฉียงเหนือ",
      en: "Office of the Vocational Education Commission — Northeastern regional round",
    },
    date: { th: "11 ธันวาคม 2567", en: "11 December 2024" },
    image: "/images/certs/vec-regional-gold-runner-up.webp",
  },
  {
    id: "vec-35-regional-honor-gold",
    title: {
      th: "รางวัล Honor Awards ระดับเหรียญทอง — เครื่องตรวจวัดแร่ธาตุและผสมปุ๋ยในดิน",
      en: "Honor Award, gold medal — Soil Nutrient Analyser and Fertiliser Mixer",
    },
    issuer: {
      th: "สำนักงานคณะกรรมการการอาชีวศึกษา — ระดับภาคตะวันออกเฉียงเหนือ",
      en: "Office of the Vocational Education Commission — Northeastern regional round",
    },
    date: { th: "11 ธันวาคม 2567", en: "11 December 2024" },
    image: "/images/certs/vec-regional-honor-gold.webp",
  },
  {
    id: "vec-35-provincial-gold",
    title: {
      th: "ชนะเลิศ ระดับเหรียญทอง — เครื่องตรวจวัดแร่ธาตุและผสมปุ๋ยในดิน",
      en: "First place, gold medal — Soil Nutrient Analyser and Fertiliser Mixer",
    },
    issuer: {
      th: "สำนักงานคณะกรรมการการอาชีวศึกษา — ระดับอาชีวศึกษาจังหวัดร้อยเอ็ด",
      en: "Office of the Vocational Education Commission — Roi Et provincial round",
    },
    date: { th: "19 พฤศจิกายน 2567", en: "19 November 2024" },
    image: "/images/certs/vec-provincial-gold.webp",
  },

  {
    id: "rmuti-digital-circuit-bronze-2567",
    title: {
      th: "รางวัลระดับเหรียญทองแดง — ทักษะการต่อวงจรดิจิทัล นับเลข 2 หลัก",
      en: "Bronze medal — Digital logic build, two-digit counter",
    },
    issuer: {
      th: "มหาวิทยาลัยเทคโนโลยีราชมงคลอีสาน วิทยาเขตขอนแก่น — ระดับภาคตะวันออกเฉียงเหนือ",
      en: "Rajamangala University of Technology Isan, Khon Kaen Campus — Northeastern regional round",
    },
    date: { th: "4 กรกฎาคม 2567", en: "4 July 2024" },
    image: "/images/certs/rmuti-digital-circuit-bronze.jpg",
  },

  /* ------------------------------------------------------------------
   * TEMPLATE — ก๊อปบล็อกข้างล่างไปวางด้านบน (เรียงใหม่สุดขึ้นก่อน)
   * แล้วเอาเครื่องหมายคอมเมนต์ออก
   *
   * {
   *   id: "some-unique-id",
   *   title: {
   *     th: "ได้รางวัลอะไร — ชื่อผลงาน",
   *     en: "What was won — project name",
   *   },
   *   issuer: {
   *     th: "หน่วยงานที่ออกให้ — ระดับอะไร",
   *     en: "Issuing organisation — which round",
   *   },
   *   date: { th: "11 ธันวาคม 2567", en: "11 December 2024" },
   *   image: "/images/certs/ชื่อไฟล์.webp",
   *   href: "https://ลิงก์ประกาศผล",   // ถ้ามี ตัดทิ้งได้
   * },
   * ------------------------------------------------------------------ */
];
