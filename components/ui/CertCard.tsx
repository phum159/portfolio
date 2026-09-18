import Image from "next/image";
import type { Certificate } from "@/content";
import { pick, t, type Locale } from "@/lib/i18n";

export default function CertCard({
  cert,
  locale,
}: {
  cert: Certificate;
  locale: Locale;
}) {
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-line bg-surface">
      {cert.image && (
        <Image
          src={cert.image}
          alt={pick(cert.title, locale)}
          width={800}
          height={600}
          className="h-44 w-full object-cover"
        />
      )}
      <div className="flex flex-1 flex-col gap-1 p-4">
        <h2 className="font-semibold tracking-tight">{pick(cert.title, locale)}</h2>
        <p className="text-sm text-muted">
          {t(locale, "certificates.issuer")}: {pick(cert.issuer, locale)}
        </p>
        <p className="font-mono text-xs text-muted">{cert.date}</p>
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
