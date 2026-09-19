import type { Diagram as DiagramData, DiagramNode } from "@/content";
import { pick, type Locale } from "@/lib/i18n";

/**
 * Block diagram for a project's architecture.
 *
 * A paragraph makes the reader rebuild the signal path in their head. This
 * draws it: stages run left to right, boxes inside a stage are peers, and
 * the arrow between two stages is labelled with what actually carries the
 * data — I2C, UART, MQTT, mains.
 *
 * Laid out with flex rather than a fixed SVG so it stacks top-to-bottom on
 * a phone instead of shrinking to unreadable. The arrow glyph flips with
 * the axis for the same reason.
 */
export default function Diagram({
  data,
  locale,
}: {
  data: DiagramData;
  locale: Locale;
}) {
  return (
    <figure className="mb-6 flex flex-col gap-6 overflow-x-auto rounded-lg border border-line bg-surface p-4">
      {data.chains.map((chain, ci) => (
        <div key={ci}>
          {chain.title && (
            <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-muted">
              {pick(chain.title, locale)}
            </p>
          )}

          <div className="flex flex-col items-stretch gap-2 md:flex-row md:items-center">
            {chain.stages.map((stage, si) => (
              <div key={si} className="contents">
                {si > 0 && <Connector label={stage.via} />}

                <div className="flex flex-col gap-2">
                  {stage.title && (
                    <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
                      {pick(stage.title, locale)}
                    </p>
                  )}
                  {stage.nodes.map((node) => (
                    <Box key={node.label} node={node} locale={locale} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {data.notes && (
        <figcaption className="flex flex-col gap-1 border-t border-line pt-3 text-xs text-muted">
          {pick(data.notes, locale).map((note, i) => (
            <span key={i}>{note}</span>
          ))}
        </figcaption>
      )}
    </figure>
  );
}

function Box({ node, locale }: { node: DiagramNode; locale: Locale }) {
  const border =
    node.accent === "primary"
      ? "border-accent/70"
      : node.accent === "output"
        ? "border-[color:var(--accent-alt)]/70"
        : "border-line-strong";
  const label =
    node.accent === "primary"
      ? "text-accent"
      : node.accent === "output"
        ? "text-accent-alt"
        : "text-foreground";

  return (
    <div className={`min-w-36 rounded border ${border} bg-background px-3 py-2`}>
      <p className={`font-mono text-xs ${label}`}>{node.label}</p>
      {node.note && (
        <p className="mt-0.5 text-[11px] leading-snug text-muted">{pick(node.note, locale)}</p>
      )}
    </div>
  );
}

/** The arrow between two stages, carrying the name of the link. */
function Connector({ label }: { label?: string }) {
  return (
    <div className="flex shrink-0 items-center justify-center gap-1 py-1 text-muted md:flex-col md:px-1 md:py-0">
      <span aria-hidden className="font-mono text-sm leading-none md:hidden">
        ↓
      </span>
      <span aria-hidden className="hidden font-mono text-sm leading-none md:inline">
        →
      </span>
      {label && (
        <span className="font-mono text-[10px] leading-none whitespace-nowrap">{label}</span>
      )}
    </div>
  );
}
