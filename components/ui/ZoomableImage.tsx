"use client";

import Image from "next/image";
import { useState } from "react";
import { t, type Locale } from "@/lib/i18n";
import Lightbox from "./Lightbox";

/**
 * A photo that opens full size when clicked.
 *
 * The grid thumbnails are capped in height, which is fine for a machine
 * shot but useless for a flowchart or a poster — those only become
 * readable at full size. Same job as the certificate cards, so it shares
 * the same Lightbox.
 *
 * The button hugs the image (`w-fit`) rather than filling its column, so
 * the hover hint sits over the photo instead of over empty space beside it.
 */
export default function ZoomableImage({
  src,
  alt,
  width,
  height,
  locale,
  className,
  wrapperClassName,
  priority,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  locale: Locale;
  /** Applied to the <Image> itself. */
  className?: string;
  /** Applied to the button that wraps it — margins and spacing go here. */
  wrapperClassName?: string;
  priority?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const enlarge = t(locale, "image.enlarge");

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={alt ? `${alt} — ${enlarge}` : enlarge}
        className={`group relative mx-auto block w-fit cursor-zoom-in ${wrapperClassName ?? ""}`}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={className}
          priority={priority}
        />
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-lg bg-background/70 font-mono text-xs text-accent opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
          {enlarge}
        </span>
      </button>

      {open && (
        <Lightbox
          src={src}
          alt={alt}
          closeLabel={t(locale, "image.close")}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
