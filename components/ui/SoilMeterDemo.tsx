"use client";

import { useEffect, useState } from "react";
import { pick, t, type Locale } from "@/lib/i18n";

type MixPhase = "idle" | "filling" | "discharging" | "done";

/** A plausible starting point for a plot, before any scatter. */
const BASE = { n: 1.12, p: 45, k: 40 };

/**
 * Crops and the nutrient level each one is aiming at.
 *
 * Stand-in figures. The machine itself uses the fertiliser formula the team
 * obtained from the Roi Et Land Development Station; this page is a mock-up
 * of how the machine is driven, not a reproduction of that formula.
 */
const CROPS = {
  rice: { name: { th: "ข้าว", en: "Rice" }, target: { n: 1.4, p: 55, k: 60 } },
  corn: { name: { th: "ข้าวโพด", en: "Maize" }, target: { n: 1.5, p: 60, k: 70 } },
  cane: { name: { th: "อ้อย", en: "Sugarcane" }, target: { n: 1.8, p: 50, k: 85 } },
} as const;
type CropId = keyof typeof CROPS;

/** Kilograms per rai for one unit of shortfall, per nutrient. */
const RATE = { n: 10, p: 0.25, k: 0.2 };

/** 1 rai = 4 ngan = 400 square wah. */
const AREA_UNITS = {
  rai: { name: { th: "ไร่", en: "rai" }, rai: 1 },
  ngan: { name: { th: "งาน", en: "ngan" }, rai: 0.25 },
  wah: { name: { th: "ตารางวา", en: "sq. wah" }, rai: 0.0025 },
} as const;
type AreaUnit = keyof typeof AREA_UNITS;

/**
 * Ready-mixed grades a farmer can actually buy in Thailand, with the N-P-K
 * share printed on the sack. Whichever nutrients come out short, the panel
 * suggests a grade that carries them.
 */
const FORMULAS = [
  { grade: "46-0-0", name: { th: "ยูเรีย", en: "Urea" }, npk: [46, 0, 0] },
  { grade: "18-46-0", name: { th: "ไดแอมโมเนียมฟอสเฟต", en: "DAP" }, npk: [18, 46, 0] },
  { grade: "15-15-15", name: { th: "สูตรเสมอ", en: "Balanced" }, npk: [15, 15, 15] },
  { grade: "16-20-0", name: { th: "สูตรนาข้าว", en: "Paddy grade" }, npk: [16, 20, 0] },
  { grade: "0-0-60", name: { th: "โพแทสเซียมคลอไรด์", en: "Muriate of potash" }, npk: [0, 0, 60] },
] as const;
type Formula = (typeof FORMULAS)[number];

const CHANNELS = ["N", "P", "K"] as const;
type Channel = (typeof CHANNELS)[number];

const PROBE_MS = 900;
const FILL_MS = 2800;
const DUMP_MS = 2200;

/** A reading at one point, scattered a little the way real ground is. */
function readingAt(value: number) {
  const scatter = (Math.random() + Math.random() + Math.random() - 1.5) * 0.07 * value;
  return Math.max(0, value + scatter);
}

/**
 * Pick a grade that carries whatever came out short.
 *
 * Grades are scored on how much of the shortfall they actually supply, the
 * best few are kept, and one of those is chosen at random, so pressing the
 * button again can land on a different sack that would do the same job.
 */
function suggestFormula(plan: { n: number; p: number; k: number }): Formula {
  const need = [plan.n, plan.p, plan.k];
  const total = need.reduce((a, b) => a + b, 0);
  if (total <= 0) return FORMULAS[2];

  const scored = FORMULAS.map((f) => ({
    f,
    score: need.reduce((acc, want, i) => acc + (want / total) * f.npk[i], 0),
  })).sort((a, b) => b.score - a.score);

  const shortlist = scored.filter((s) => s.score >= scored[0].score * 0.75);
  return shortlist[Math.floor(Math.random() * shortlist.length)].f;
}

/**
 * Interactive mock-up of the Soil Nutrient Analyser and Fertiliser Mixer.
 *
 * Two panels, the two halves of the machine. On the left the probe goes into
 * the sample a point at a time, each reading is saved, and the recommendation
 * is worked out from the running mean -- the loop the program's flow chart
 * describes. Sending the result across releases the mixer, where stock falls
 * from the three storage hoppers into the weighing hoppers and then drops
 * into the single collection bin below.
 *
 * The figures are illustrative. This exists to show how the machine is
 * driven, not to stand in for its measurements.
 */
export default function SoilMeterDemo({ locale }: { locale: Locale }) {
  /* ---- analyser ---- */
  const [probing, setProbing] = useState(false);
  const [probeStarted, setProbeStarted] = useState(0);
  const [samples, setSamples] = useState<{ n: number; p: number; k: number }[]>([]);
  /** The reading on screen, before it is saved as a point. */
  const [live, setLive] = useState<{ n: number; p: number; k: number } | null>(null);
  const [crop, setCrop] = useState<CropId>("rice");
  const [area, setArea] = useState(1);
  const [unit, setUnit] = useState<AreaUnit>("rai");
  const [plan, setPlan] = useState<{ n: number; p: number; k: number } | null>(null);
  const [formula, setFormula] = useState<Formula | null>(null);
  const [sent, setSent] = useState<{ n: number; p: number; k: number } | null>(null);

  /* ---- mixer ---- */
  const [targets, setTargets] = useState<Record<Channel, number>>({ N: 300, P: 200, K: 150 });
  const [mix, setMix] = useState<MixPhase>("idle");
  const [mixStarted, setMixStarted] = useState(0);
  const [weighed, setWeighed] = useState<Record<Channel, number>>({ N: 0, P: 0, K: 0 });
  const [bin, setBin] = useState(0);

  const count = samples.length;
  const avg =
    count === 0
      ? null
      : {
          n: samples.reduce((a, s) => a + s.n, 0) / count,
          p: samples.reduce((a, s) => a + s.p, 0) / count,
          k: samples.reduce((a, s) => a + s.k, 0) / count,
        };

  /* The probe is down for a moment before a reading lands. */
  useEffect(() => {
    if (!probing) return;
    const id = setInterval(() => {
      if (Date.now() - probeStarted < PROBE_MS) return;
      setLive({ n: readingAt(BASE.n), p: readingAt(BASE.p), k: readingAt(BASE.k) });
      setProbing(false);
    }, 60);
    return () => clearInterval(id);
  }, [probing, probeStarted]);

  /* Fill the weighing hoppers, then tip them into the bin. */
  useEffect(() => {
    if (mix !== "filling" && mix !== "discharging") return;
    const id = setInterval(() => {
      const elapsed = Date.now() - mixStarted;

      if (mix === "filling") {
        // Staggered, the way three gates opening one after another behave.
        const at = (i: number) => Math.min(1, Math.max(0, (elapsed - i * 350) / FILL_MS));
        setWeighed({ N: targets.N * at(0), P: targets.P * at(1), K: targets.K * at(2) });
        if (elapsed >= FILL_MS + 700) {
          setMixStarted(Date.now());
          setMix("discharging");
        }
        return;
      }

      const left = Math.max(0, 1 - elapsed / DUMP_MS);
      setWeighed({ N: targets.N * left, P: targets.P * left, K: targets.K * left });
      setBin((targets.N + targets.P + targets.K) * (1 - left));
      if (elapsed >= DUMP_MS) setMix("done");
    }, 70);
    return () => clearInterval(id);
  }, [mix, mixStarted, targets]);

  function probe() {
    if (probing) return;
    setProbeStarted(Date.now());
    setProbing(true);
  }

  /** The flow chart's "add this point": accumulate, then clear the display. */
  function savePoint() {
    if (!live) return;
    setSamples((prev) => [...prev, live]);
    setLive(null);
    setPlan(null);
    setFormula(null);
  }

  function clearAll() {
    setSamples([]);
    setLive(null);
    setPlan(null);
    setFormula(null);
    setSent(null);
  }

  /** Shortfall against the crop's target, scaled by the plot size. */
  function compute() {
    if (!avg) return;
    const rai = area * AREA_UNITS[unit].rai;
    const target = CROPS[crop].target;
    const next = {
      n: Math.max(0, target.n - avg.n) * RATE.n * rai,
      p: Math.max(0, target.p - avg.p) * RATE.p * rai,
      k: Math.max(0, target.k - avg.k) * RATE.k * rai,
    };
    setPlan(next);
    setFormula(suggestFormula(next));
  }

  function sendToMixer() {
    if (!avg || !plan) return;
    setSent(avg);
    setTargets({
      N: Math.round(plan.n * 1000),
      P: Math.round(plan.p * 1000),
      K: Math.round(plan.k * 1000),
    });
    resetMix();
  }

  function startMix() {
    setWeighed({ N: 0, P: 0, K: 0 });
    setBin(0);
    setMixStarted(Date.now());
    setMix("filling");
  }

  function resetMix() {
    setMix("idle");
    setWeighed({ N: 0, P: 0, K: 0 });
    setBin(0);
  }

  const total = targets.N + targets.P + targets.K;
  const busyMix = mix === "filling" || mix === "discharging";

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* ================= analyser ================= */}
      <div className="flex flex-col gap-3 rounded-lg border border-line bg-surface p-4">
        <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
          {t(locale, "sm.probe")}
        </p>

        <svg viewBox="0 0 220 200" className="h-40 w-full" role="img" aria-label={t(locale, "sm.probe")}>
          <rect x="60" y="150" width="100" height="42" rx="3" fill="var(--line-strong)" />
          <rect x="64" y="156" width="92" height="32" rx="2" fill="#2a1d12" />

          <g
            style={{
              transform: `translateY(${probing ? 30 : 0}px)`,
              transition: `transform ${PROBE_MS / 2}ms ease-in-out`,
            }}
          >
            <rect x="78" y="10" width="64" height="30" rx="3" fill="var(--line-strong)" />
            <rect
              x="84"
              y="15"
              width="52"
              height="20"
              rx="2"
              fill={probing ? "var(--accent)" : "#0d3b2e"}
              style={{ transition: "fill 300ms ease" }}
            />
            <line x1="92" y1="10" x2="86" y2="-4" stroke="var(--line-strong)" strokeWidth="3" />
            <line x1="128" y1="10" x2="134" y2="-4" stroke="var(--line-strong)" strokeWidth="3" />
            <rect x="107" y="40" width="6" height="110" fill="var(--muted)" opacity="0.7" />
            <path d="M107 150 L113 150 L110 162 Z" fill="var(--accent)" />
          </g>
        </svg>

        {/* crop and plot size, the way the app asks for them */}
        <div className="grid grid-cols-2 gap-2">
          <label className="flex flex-col gap-1">
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
              {t(locale, "sm.crop")}
            </span>
            <select
              value={crop}
              onChange={(e) => {
                setCrop(e.target.value as CropId);
                setPlan(null);
                setFormula(null);
              }}
              className="rounded border border-line bg-background px-2 py-1 font-mono text-xs text-foreground"
            >
              {(Object.keys(CROPS) as CropId[]).map((id) => (
                <option key={id} value={id}>
                  {pick(CROPS[id].name, locale)}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1">
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
              {t(locale, "sm.areaUnit")}
            </span>
            <select
              value={unit}
              onChange={(e) => {
                setUnit(e.target.value as AreaUnit);
                setPlan(null);
                setFormula(null);
              }}
              className="rounded border border-line bg-background px-2 py-1 font-mono text-xs text-foreground"
            >
              {(Object.keys(AREA_UNITS) as AreaUnit[]).map((id) => (
                <option key={id} value={id}>
                  {pick(AREA_UNITS[id].name, locale)}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
            {t(locale, "sm.area")}
          </span>
          <div className="ml-auto flex items-center overflow-hidden rounded border border-line">
            <button
              type="button"
              onClick={() => {
                setArea((a) => Math.max(1, a - 1));
                setPlan(null);
                setFormula(null);
              }}
              aria-label="minus"
              className="px-3 py-1 font-mono text-sm text-muted hover:text-accent"
            >
              &minus;
            </button>
            <span className="min-w-12 bg-background px-3 py-1 text-center font-mono text-sm">{area}</span>
            <button
              type="button"
              onClick={() => {
                setArea((a) => Math.min(999, a + 1));
                setPlan(null);
                setFormula(null);
              }}
              aria-label="plus"
              className="px-3 py-1 font-mono text-sm text-muted hover:text-accent"
            >
              +
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={probe}
          disabled={probing}
          className="rounded border border-line-strong px-3 py-3 font-mono text-sm transition-colors enabled:hover:border-accent disabled:opacity-50"
        >
          {probing ? t(locale, "sm.probing") : t(locale, "sm.takeReading")}
        </button>

        {/* what the probe is showing right now */}
        <div className="rounded border border-line px-3 py-2 font-mono text-[11px]">
          {live ? (
            <dl className="flex flex-col gap-0.5">
              <Row label="Nitrogen" value={`${live.n.toFixed(2)} %`} tone="text-accent-alt" />
              <Row label="Phosphorus" value={`${live.p.toFixed(2)} mg/kg`} tone="text-accent" />
              <Row label="Potassium" value={`${live.k.toFixed(2)} mg/kg`} tone="text-accent-alt" />
            </dl>
          ) : (
            <span className="text-muted">{t(locale, "sm.noLive")}</span>
          )}
        </div>

        <div className="flex items-center justify-between rounded border border-line px-3 py-2 font-mono text-[11px] text-muted">
          <span>{t(locale, "sm.count")}</span>
          <span className="text-accent">
            {count} {t(locale, "sm.times")}
          </span>
        </div>

        {avg && (
          <dl className="rounded border border-line px-3 py-2 font-mono text-[11px]">
            {(["n", "p", "k"] as const).map((key) => (
              <Row
                key={key}
                label={`${key.toUpperCase()} ${t(locale, "sm.mean")}`}
                value={avg[key].toFixed(key === "n" ? 2 : 1)}
                tone="text-accent"
              />
            ))}
          </dl>
        )}

        {/* the app's four buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={savePoint}
            disabled={!live}
            className="rounded border border-line-strong px-2 py-2 font-mono text-xs transition-colors enabled:hover:border-accent disabled:opacity-40"
          >
            {t(locale, "sm.save")}
          </button>
          <button
            type="button"
            onClick={clearAll}
            disabled={count === 0 && !live}
            className="rounded border border-line px-2 py-2 font-mono text-xs text-muted transition-colors enabled:hover:border-accent enabled:hover:text-accent disabled:opacity-40"
          >
            {t(locale, "sm.clear")}
          </button>
          <button
            type="button"
            onClick={compute}
            disabled={count === 0}
            className="rounded border border-line-strong px-2 py-2 font-mono text-xs transition-colors enabled:hover:border-accent disabled:opacity-40"
          >
            {t(locale, "sm.compute")}
          </button>
          <button
            type="button"
            onClick={sendToMixer}
            disabled={!plan}
            className="rounded border border-line-strong px-2 py-2 font-mono text-xs transition-colors enabled:hover:border-accent disabled:opacity-40"
          >
            {t(locale, "sm.send")}
          </button>
        </div>

        {plan && (
          <dl className="rounded border border-line px-3 py-2 font-mono text-[11px]">
            <Row label="Add to N" value={`${plan.n.toFixed(1)} kg`} tone="text-accent-alt" />
            <Row label="Add to P" value={`${plan.p.toFixed(1)} kg`} tone="text-accent" />
            <Row label="Add to K" value={`${plan.k.toFixed(1)} kg`} tone="text-accent-alt" />
          </dl>
        )}
      </div>

      {/* ================= mixer ================= */}
      <div className="flex flex-col gap-3 rounded-lg border border-line bg-surface p-4">
        <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
          {t(locale, "sm.mixer")}
        </p>

        <svg viewBox="0 0 300 250" className="h-52 w-full" role="img" aria-label={t(locale, "sm.mixer")}>
          {[0, 1, 2].map((i) => {
            const cx = 55 + i * 95;
            const ch = CHANNELS[i];
            const frac = targets[ch] ? Math.min(1, weighed[ch] / targets[ch]) : 0;
            return (
              <g key={ch}>
                {/* storage hopper, always holding stock */}
                <rect x={cx - 30} y={6} width={60} height={30} fill="var(--line-strong)" />
                <path d={`M${cx - 30} 36 L${cx + 30} 36 L${cx + 7} 54 L${cx - 7} 54 Z`} fill="var(--line-strong)" />
                <rect x={cx - 27} y={10} width={54} height={24} fill="var(--accent)" opacity="0.28" />
                <text x={cx} y={26} textAnchor="middle" fontSize="13" fontFamily="monospace" fill="var(--foreground)">
                  {ch}
                </text>

                <line
                  x1={cx}
                  y1={54}
                  x2={cx}
                  y2={84}
                  stroke={mix === "filling" ? "var(--accent)" : "var(--line)"}
                  strokeWidth="3"
                  strokeDasharray="4 4"
                >
                  {mix === "filling" && (
                    <animate attributeName="stroke-dashoffset" values="8;0" dur="0.4s" repeatCount="indefinite" />
                  )}
                </line>

                {/* weighing hopper on its load cell */}
                <rect x={cx - 28} y={84} width={56} height={44} fill="none" stroke="var(--line-strong)" strokeWidth="2" />
                <rect x={cx - 26} y={126 - 40 * frac} width={52} height={40 * frac} fill="var(--accent)" opacity="0.55" />
                <path d={`M${cx - 28} 128 L${cx + 28} 128 L${cx + 7} 146 L${cx - 7} 146 Z`} fill="var(--line-strong)" />
                <text x={cx} y={162} textAnchor="middle" fontSize="11" fontFamily="monospace" fill="var(--accent)">
                  {weighed[ch].toFixed(0)} g
                </text>

                <line
                  x1={cx}
                  y1={146}
                  x2={150}
                  y2={186}
                  stroke={mix === "discharging" ? "var(--accent-alt)" : "var(--line)"}
                  strokeWidth="3"
                  strokeDasharray="4 4"
                >
                  {mix === "discharging" && (
                    <animate attributeName="stroke-dashoffset" values="8;0" dur="0.4s" repeatCount="indefinite" />
                  )}
                </line>
              </g>
            );
          })}

          <rect x="105" y="186" width="90" height="56" fill="none" stroke="var(--line-strong)" strokeWidth="2" />
          <rect
            x="107"
            y={240 - 52 * (total ? Math.min(1, bin / total) : 0)}
            width={86}
            height={52 * (total ? Math.min(1, bin / total) : 0)}
            fill="var(--accent-alt)"
            opacity="0.5"
          />
          <text x="150" y="216" textAnchor="middle" fontSize="12" fontFamily="monospace" fill="var(--accent-alt)">
            {bin.toFixed(0)} g
          </text>
        </svg>

        {/* the grade a farmer would buy for this shortfall */}
        {formula && (
          <div className="rounded border border-line-strong px-3 py-2">
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
              {t(locale, "sm.formula")}
            </p>
            <p className="mt-1 font-mono text-lg text-accent-alt">{formula.grade}</p>
            <p className="font-mono text-[11px] leading-snug text-muted">
              {pick(formula.name, locale)} — {t(locale, "sm.formulaWhy")}
            </p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-2">
          {CHANNELS.map((ch, i) => (
            <label key={ch} className="flex flex-col gap-1">
              <span className="font-mono text-[10px] text-muted">
                Ch.{i + 1} · {ch}
              </span>
              <input
                type="number"
                min={0}
                max={99999}
                value={targets[ch]}
                disabled={busyMix}
                onChange={(e) => setTargets((prev) => ({ ...prev, [ch]: Math.max(0, Number(e.target.value)) }))}
                aria-label={`Ch.${i + 1} ${ch}`}
                className="w-full rounded border border-line bg-background px-2 py-1 text-right font-mono text-xs text-foreground"
              />
            </label>
          ))}
        </div>

        <div className="rounded border border-line px-3 py-2 font-mono text-[11px] text-muted">
          {!sent && t(locale, "sm.awaiting")}
          {sent && mix === "idle" && (
            <>
              {t(locale, "sm.received")}: N {sent.n.toFixed(2)}% · P {sent.p.toFixed(1)} · K {sent.k.toFixed(1)} mg/kg
              <p className="mt-1 leading-snug opacity-70">{t(locale, "sm.mixIdle")}</p>
            </>
          )}
          {mix === "filling" && t(locale, "sm.mixFilling")}
          {mix === "discharging" && t(locale, "sm.mixDischarging")}
          {mix === "done" && (
            <>
              {t(locale, "sm.mixDone")}: <span className="text-accent-alt">{total.toFixed(0)} g</span>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={mix === "idle" ? startMix : resetMix}
          disabled={!sent || busyMix}
          className="rounded border border-line-strong px-3 py-3 font-mono text-sm transition-colors enabled:hover:border-accent disabled:opacity-40"
        >
          {t(locale, mix === "idle" ? "sm.startMix" : "sm.resetMix")}
        </button>
      </div>
    </div>
  );
}

function Row({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="text-muted">{label}</dt>
      <dd className={tone}>{value}</dd>
    </div>
  );
}
