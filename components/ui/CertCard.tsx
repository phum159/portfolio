"use client";

import Image from "next/image";
import { useState } from "react";
import type { Certificate } from "@/content";
import { pick, t, type Locale } from "@/lib/i18n";
import Lightbox from "./Lightbox";

export default function CertCard({
  cert,
  locale,
}: {
  cert: Certificate;
  locale: Locale;
}) {
  const [open, setOpen] = useState(false);
  const title = pick(cert.title, locale);

  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-line bg-surface">
      {cert.image && (
        <>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={`${title} — ${t(locale, "certificates.enlarge")}`}
            className="group relative bg-background"
          >
            <Image
              src={cert.image}
              alt={title}
              width={800}
              height={600}
              /* object-contain, not cover: a certificate is a document meant to
                 be read, and cropping one to a band hides the award line. */
              className="h-52 w-full object-contain p-2"
            />
            <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background/70 font-mono text-xs text-accent opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              {t(locale, "certificates.enlarge")}
            </span>
          </button>

          {open && (
            <Lightbox
              src={cert.image}
              alt={title}
              closeLabel={t(locale, "certificates.close")}
              onClose={() => setOpen(false)}
            />
          )}
        </>
      )}
      <div className="flex flex-1 flex-col gap-1 p-4">
        <h2 className="font-semibold tracking-tight">{title}</h2>
        <p className="text-sm text-muted">
          {t(locale, "certificates.issuer")}: {pick(cert.issuer, locale)}
        </p>
        <p className="font-mono text-xs text-muted">{pick(cert.date, locale)}</p>
        {cert.href && (
          <a
            href={cert.href}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-2 text-sm text-accent underline underline-offset-4"
          >
            {t(locale, "certificates.verify")} →
          </a>
        )}
      </div>
    </article>
  );
}
