import { IBM_Plex_Sans_Thai, Inter, JetBrains_Mono } from "next/font/google";

/**
 * Shared by both root layouts (the redirect stub and the real site).
 * Exposed as CSS variables — see app/globals.css for how they are wired
 * into Tailwind's font-sans / font-mono.
 *
 * Two sans families on purpose: Inter matches the theme but has no Thai
 * glyphs, so Thai falls through to IBM Plex Sans Thai via the font-family
 * chain in globals.css. Each script gets a face designed for it, and the
 * browser picks per glyph.
 *
 * JetBrains Mono is Latin-only. Use it for part numbers, buses, tags and
 * years — never for a Thai sentence, which would fall back to whatever
 * the OS happens to have.
 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const thai = IBM_Plex_Sans_Thai({
  variable: "--font-thai",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

/** Put on <html> by every root layout. */
export const fontVariables = `${inter.variable} ${thai.variable} ${mono.variable}`;
