import { IBM_Plex_Sans_Thai, JetBrains_Mono } from "next/font/google";

/**
 * Shared by both root layouts (the redirect stub and the real site).
 * Exposed as CSS variables — see app/globals.css for how they are wired
 * into Tailwind's font-sans / font-mono.
 *
 * IBM Plex Sans Thai covers Thai *and* Latin, so one family handles both
 * languages without switching typeface mid-sentence.
 */
export const sans = IBM_Plex_Sans_Thai({
  variable: "--font-sans",
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
export const fontVariables = `${sans.variable} ${mono.variable}`;
