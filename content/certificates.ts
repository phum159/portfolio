import type { Certificate } from "./types";

/**
 * Certificates, training, competitions.
 * Put the scan in public/images/certs/ and point `image` at it.
 * An empty array is fine — the page shows a placeholder message.
 *
 * TODO: แทนที่ตัวอย่างด้านล่างด้วยใบจริง
 */
export const certificates: Certificate[] = [
  {
    id: "example-cert",
    title: { th: "TODO: ชื่อใบรับรอง", en: "TODO: certificate name" },
    issuer: { th: "TODO: ผู้ออกให้", en: "TODO: issuer" },
    date: "2025",
    // image: "/images/certs/example.jpg",
    // href: "https://example.com/verify/xxxx",
  },
];
