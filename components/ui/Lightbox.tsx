"use client";

import Image from "next/image";
import { useEffect } from "react";

/**
 * Full-size image overlay. Certificates are documents — the card can only
 * show a thumbnail, so this is what makes the small print readable.
 *
 * Closes on Escape, on a backdrop click, and on the close button. While
 * it is open the page behind it cannot scroll.
 */
export default function Lightbox({
  src,
  alt,
  closeLabel,
  onClose,
}: {
  src: string;
  alt: string;
  closeLabel: string;
  onClose: () => void;
}) {
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 p-4 backdrop-blur-sm"
    >
      <button
        type="button"
        onClick={onClose}
        autoFocus
        className="absolute right-4 top-4 rounded border border-line bg-surface px-3 py-1.5 font-mono text-xs text-muted hover:text-foreground"
      >
        {closeLabel} ✕
      </button>

      <Image
        src={src}
        alt={alt}
        width={2000}
        height={1500}
        // Stop the backdrop handler so clicking the image itself does not close it.
        onClick={(event) => event.stopPropagation()}
        className="max-h-full w-auto max-w-full rounded-lg border border-line object-contain"
      />
    </div>
  );
}
