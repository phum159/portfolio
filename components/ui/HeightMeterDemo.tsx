"use client";

import { useEffect, useState } from "react";
import { t, type Locale } from "@/lib/i18n";

type Phase = "off" | "calibrating" | "ready" | "measuring" | "done";

/** Frame geometry, in centimetres, matching the real rig. */
const RAIL_CM = 200;
/** Usable range the real unit was characterised over. */
const MIN_CM = 50;
const MAX_CM = 196;

const CALIB_MS = 1600;
const MEASURE_MS = 5000;
const SAMPLES = 10;

/* Drawing space. The floor sits at FLOOR_Y and the rail at RAIL_Y, so one
   centimetre is (FLOOR_Y - RAIL_Y) / RAIL_CM pixels. */
const RAIL_Y = 26;
const FLOOR_Y = 286;
const PX_PER_CM = (FLOOR_Y - RAIL_Y) / RAIL_CM;
const yFor = (cm: number) => FLOOR_Y - cm * PX_PER_CM;

/** Gaussian-ish noise, mean 0, roughly the given standard deviation. */
function noise(sd: number) {
  return (Math.random() + Math.random() + Math.random() - 1.5) * sd;
}

/**
 * One echo: the distance from the sensor down to the top of the subject's
 * head. This is the only thing the sensor ever measures — the height is
 * arithmetic the firmware does afterwards.
 *
 * The real sensor held a standard deviation below 0.2 cm over 100 repeats.
 */
function echo(subjectCm: number) {
  return RAIL_CM - subjectCm + noise(0.27);
}

/**
 * Interactive demo for the Automatic Height Meter.
 *
 * Two panels, the way the machine is actually laid out: the frame with the
 * sensor on the top rail, and the operator's side — rocker switch, measure
 * button and the 16×2 LCD.
 *
 * A simulation, not the real device. The numbers it produces follow the
 * error figures measured in the project rather than being invented.
 */
export default function HeightMeterDemo({ locale }: { locale: Locale }) {
  const [phase, setPhase] = useState<Phase>("off");
  const [subject, setSubject] = useState(170);
  /** Raw text of the number box, so typing "1" on the way to "170" is allowed. */
  const [subjectText, setSubjectText] = useState("170");
  const [floorRef, setFloorRef] = useState<number | null>(null);
  /** Readings for the run in progress, generated up front and revealed over time. */
  const [plan, setPlan] = useState<number[]>([]);
  const [revealed, setRevealed] = useState(0);
  /** Mean echo of the run, kept so the subtraction can be shown on screen. */
  const [echoAvg, setEchoAvg] = useState<number | null>(null);
  const [result, setResult] = useState<number | null>(null);
  const [startedAt, setStartedAt] = useState(0);
  const [beeping, setBeeping] = useState(false);

  const busy = phase === "calibrating" || phase === "measuring";
  const onMat = phase === "ready" || phase === "measuring" || phase === "done";
  /* Calibration bounces off the floor; a measurement bounces off the head. */
  const echoY = phase === "calibrating" ? FLOOR_Y : yFor(subject);

  // Drives both timed phases. Every state change happens in the interval
  // callback, never in the effect body.
  useEffect(() => {
    if (!busy) return;
    const id = setInterval(() => {
      const t = Date.now() - startedAt;

      if (phase === "calibrating") {
        if (t >= CALIB_MS) {
          setFloorRef(RAIL_CM + noise(0.42));
          setPhase("ready");
          setBeeping(false);
        }
        return;
      }

      setRevealed(Math.min(SAMPLES, Math.floor(t / (MEASURE_MS / SAMPLES))));
      if (t >= MEASURE_MS) {
        if (plan.length) {
          // What the firmware does: floor reference minus the measured echo.
          const mean = plan.reduce((a, b) => a + b, 0) / plan.length;
          setEchoAvg(mean);
          setResult((floorRef ?? RAIL_CM) - mean);
        }
        setPhase("done");
        setBeeping(true);
      }
    }, 100);
    return () => clearInterval(id);
  }, [busy, phase, startedAt, plan, floorRef]);

  // Clears the finish beep without ever setting state from the effect body.
  useEffect(() => {
    if (!beeping || phase !== "done") return;
    const id = setTimeout(() => setBeeping(false), 600);
    return () => clearTimeout(id);
  }, [beeping, phase]);

  function togglePower() {
    if (phase === "off") {
      // Power-on always re-measures the floor: the frame comes apart, so it
      // never reassembles at exactly the same height.
      setFloorRef(null);
      setResult(null);
      setEchoAvg(null);
      setPlan([]);
      setRevealed(0);
      setStartedAt(Date.now());
      setBeeping(true);
      setPhase("calibrating");
    } else {
      setPhase("off");
      setFloorRef(null);
      setResult(null);
      setEchoAvg(null);
      setPlan([]);
      setRevealed(0);
      setBeeping(false);
    }
  }

  function setHeight(cm: number) {
    setSubject(cm);
    setSubjectText(String(cm));
  }

  /** Accept anything mid-typing; only move the figure when it is in range. */
  function typeHeight(raw: string) {
    setSubjectText(raw);
    const n = Number(raw);
    if (Number.isFinite(n) && n >= MIN_CM && n <= MAX_CM) setSubject(n);
  }

  /** On blur, snap whatever is in the box back into the usable range. */
  function commitHeight() {
    const n = Number(subjectText);
    const clamped = Number.isFinite(n) && subjectText.trim() !== ""
      ? Math.min(MAX_CM, Math.max(MIN_CM, Math.round(n)))
      : subject;
    setHeight(clamped);
  }

  function measure() {
    if (phase !== "ready" && phase !== "done") return;
    setPlan(Array.from({ length: SAMPLES }, () => echo(subject)));
    setRevealed(0);
    setResult(null);
    setEchoAvg(null);
    setStartedAt(Date.now());
    setBeeping(true);
    setPhase("measuring");
  }

  /* ---- what the 16x2 module shows ---- */
  const pad = (s: string) => s.padEnd(16, " ").slice(0, 16);
  let line1 = "";
  let line2 = "";
  if (phase === "calibrating") {
    line1 = "CALIBRATING";
    line2 = "FLOOR REF...";
  } else if (phase === "ready") {
    line1 = "READY";
    line2 = `FLOOR ${(floorRef ?? RAIL_CM).toFixed(0)} cm`;
  } else if (phase === "measuring") {
    const left = Math.max(0, Math.ceil((MEASURE_MS - (revealed * MEASURE_MS) / SAMPLES) / 1000));
    line1 = `MEASURING ${left}s`;
    line2 = `SAMPLES ${String(revealed).padStart(2, "0")}/${SAMPLES}`;
  } else if (phase === "done" && result !== null) {
    line1 = "HEIGHT";
    line2 = `${result.toFixed(1)} cm`;
  }

  const error = result === null ? null : Math.abs(result - subject);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* ---------- panel 1: the frame ---------- */}
      <div className="rounded-lg border border-line bg-surface p-4">
        <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-muted">
          {t(locale, "hm.rig")}
        </p>

        <svg viewBox="0 0 220 310" className="h-72 w-full" role="img" aria-label={t(locale, "hm.rig")}>
          {/* uprights and top rail */}
          <rect x="34" y={RAIL_Y} width="8" height={FLOOR_Y - RAIL_Y} fill="var(--line-strong)" />
          <rect x="178" y={RAIL_Y} width="8" height={FLOOR_Y - RAIL_Y} fill="var(--line-strong)" />
          <rect x="34" y={RAIL_Y - 8} width="152" height="8" fill="var(--line-strong)" />

          {/* HC-SR04 on the rail */}
          <rect
            x="94"
            y={RAIL_Y}
            width="32"
            height="14"
            rx="2"
            fill={phase === "off" ? "var(--line-strong)" : "var(--accent)"}
            style={{ transition: "fill 300ms ease" }}
          />

          {/* the pulse travelling down, drawn only while something is measuring */}
          {busy && (
            <g stroke="var(--accent)" strokeWidth="2" opacity="0.8">
              {[0, 1, 2].map((i) => (
                <line key={i} x1="110" y1={RAIL_Y + 20} x2="110" y2={RAIL_Y + 20}>
                  <animate
                    attributeName="y1"
                    values={`${RAIL_Y + 18};${echoY - 10}`}
                    dur="1s"
                    begin={`${i * 0.33}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="y2"
                    values={`${RAIL_Y + 30};${echoY}`}
                    dur="1s"
                    begin={`${i * 0.33}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.9;0"
                    dur="1s"
                    begin={`${i * 0.33}s`}
                    repeatCount="indefinite"
                  />
                </line>
              ))}
            </g>
          )}

          {/*
            Nobody stands under the sensor while it calibrates — the reading
            it wants is the floor. They step in once that is captured.
          */}
          {onMat && (
            <g fill="var(--muted)" opacity="0.85" style={{ transition: "opacity 300ms ease" }}>
              <circle cx="110" cy={yFor(subject) + 11} r="11" />
              <rect x="101" y={yFor(subject) + 22} width="18" height={subject * PX_PER_CM - 22} rx="8" />
            </g>
          )}

          {/* measured height, once there is one */}
          {result !== null && (
            <g>
              <line
                x1="150"
                y1={yFor(result)}
                x2="196"
                y2={yFor(result)}
                stroke="var(--accent-alt)"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
              <text x="150" y={yFor(result) - 6} fill="var(--accent-alt)" fontSize="11" fontFamily="monospace">
                {result.toFixed(1)} cm
              </text>
            </g>
          )}

          {/* floor */}
          <rect x="14" y={FLOOR_Y} width="192" height="4" fill="var(--line-strong)" />
        </svg>

        <p className="mt-1 min-h-8 font-mono text-[11px] leading-snug text-muted">
          {phase === "off" && t(locale, "hm.stateOff")}
          {phase === "calibrating" && t(locale, "hm.stateCalib")}
          {phase === "ready" && t(locale, "hm.stateReady")}
          {phase === "measuring" && t(locale, "hm.stateMeasuring")}
          {phase === "done" && t(locale, "hm.stateDone")}
        </p>

        <label className="mt-2 block">
          <span className="font-mono text-[11px] text-muted">{t(locale, "hm.subject")}</span>
          <div className="mt-1 flex items-center gap-2">
            <input
              type="range"
              min={MIN_CM}
              max={MAX_CM}
              value={subject}
              disabled={busy}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full accent-[color:var(--accent)]"
            />
            <input
              type="number"
              min={MIN_CM}
              max={MAX_CM}
              value={subjectText}
              disabled={busy}
              onChange={(e) => typeHeight(e.target.value)}
              onBlur={commitHeight}
              aria-label={t(locale, "hm.subject")}
              className="w-20 rounded border border-line bg-background px-2 py-1 text-right font-mono text-sm text-foreground"
            />
            <span className="font-mono text-xs text-muted">cm</span>
          </div>
        </label>
      </div>

      {/* ---------- panel 2: display and controls ---------- */}
      <div className="flex flex-col gap-3 rounded-lg border border-line bg-surface p-4">
        <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
          {t(locale, "hm.console")}
        </p>

        {/* 16x2 character module */}
        <div
          className="rounded border border-line-strong p-3 font-mono text-sm leading-relaxed"
          style={{
            background: phase === "off" ? "#04121a" : "#0d3b2e",
            color: phase === "off" ? "#0e243d" : "#7CFFB2",
            textShadow: phase === "off" ? "none" : "0 0 6px rgba(124,255,178,0.5)",
            transition: "background 300ms ease, color 300ms ease",
          }}
          aria-live="polite"
        >
          <pre className="m-0 whitespace-pre">{pad(line1)}</pre>
          <pre className="m-0 whitespace-pre">{pad(line2)}</pre>
        </div>

        {/* rocker switch */}
        <div className="flex items-center justify-between rounded border border-line px-3 py-2">
          <span className="font-mono text-xs text-muted">{t(locale, "hm.power")}</span>
          <button
            type="button"
            onClick={togglePower}
            role="switch"
            aria-checked={phase !== "off"}
            className="flex overflow-hidden rounded border border-line-strong font-mono text-xs"
          >
            <span className={`px-2 py-1 ${phase === "off" ? "bg-line-strong text-foreground" : "text-muted"}`}>
              OFF
            </span>
            <span
              className={`px-2 py-1 ${phase !== "off" ? "bg-accent text-accent-contrast" : "text-muted"}`}
            >
              ON
            </span>
          </button>
        </div>

        {/* measure button + buzzer */}
        <button
          type="button"
          onClick={measure}
          disabled={phase !== "ready" && phase !== "done"}
          className="rounded border border-line-strong px-3 py-3 font-mono text-sm transition-colors enabled:hover:border-accent disabled:opacity-40"
        >
          {t(locale, "hm.measure")}
        </button>

        <div className="flex items-center justify-between rounded border border-line px-3 py-2">
          <span className="font-mono text-xs text-muted">{t(locale, "hm.buzzer")}</span>
          <span
            aria-hidden
            className="inline-block h-3 w-3 rounded-full border border-line-strong"
            style={{
              background: beeping ? "var(--accent-alt)" : "transparent",
              boxShadow: beeping ? "0 0 10px var(--accent-alt)" : "none",
              transition: "background 150ms ease, box-shadow 150ms ease",
            }}
          />
        </div>

        {/* the arithmetic the firmware does, spelled out */}
        <div className="rounded border border-line px-3 py-2 font-mono text-[11px] text-muted">
          {result === null || echoAvg === null || floorRef === null ? (
            t(locale, "hm.hint")
          ) : (
            <dl className="flex flex-col gap-1">
              <Row label={t(locale, "hm.calcFloor")} value={`${floorRef.toFixed(1)} cm`} />
              <Row label={t(locale, "hm.calcEcho")} value={`${echoAvg.toFixed(1)} cm`} />
              <div className="mt-1 border-t border-line pt-1">
                <Row
                  label={`${floorRef.toFixed(1)} − ${echoAvg.toFixed(1)}`}
                  value={`${result.toFixed(1)} cm`}
                  strong
                />
              </div>
              <Row
                label={t(locale, "hm.error")}
                value={`${error!.toFixed(2)} cm`}
              />
              <p className="mt-1 leading-snug opacity-70">{t(locale, "hm.reference")}</p>
            </dl>
          )}
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className={strong ? "text-foreground" : ""}>{label}</dt>
      <dd className={strong ? "text-accent-alt" : "text-accent"}>{value}</dd>
    </div>
  );
}
