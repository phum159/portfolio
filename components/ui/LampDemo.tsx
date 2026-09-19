"use client";

import { useEffect, useState } from "react";
import { t, type Locale } from "@/lib/i18n";

type Mode = "countdown" | "clock";

/**
 * Interactive demo for the Auto Lamp project page.
 *
 * It follows the real Blynk dashboard widget for widget — status LED and
 * button (V1), a countdown (V3), a time input (V3) and the current time
 * (V2) — against a lamp that actually lights up. Both ways of arming it are
 * here: a plain countdown, and a clock time with AM/PM. They resolve to the
 * same thing, an epoch time the lamp is due to switch off.
 *
 * This is a simulation and says so on screen. It is deliberately NOT wired
 * to the real device: the site is a public static export, so shipping a
 * Blynk auth token to it would hand every visitor control of hardware on a
 * home network.
 */
export default function LampDemo({ locale }: { locale: Locale }) {
  const [on, setOn] = useState(false);
  const [mode, setMode] = useState<Mode>("countdown");

  const [minutes, setMinutes] = useState(1);
  const [hour, setHour] = useState(1);
  const [minute, setMinute] = useState(0);
  const [pm, setPm] = useState(false);

  /** When the lamp is due to switch off, or null when nothing is armed. */
  const [scheduled, setScheduled] = useState<number | null>(null);
  /** Null until mounted: a clock rendered on the server would not match. */
  const [now, setNow] = useState<number | null>(null);

  // One ticker drives the clock and the countdown. State is only set from
  // the interval callback, never from the effect body.
  useEffect(() => {
    const id = setInterval(() => {
      const t = Date.now();
      setNow(t);
      setScheduled((due) => {
        if (due === null || t < due) return due;
        // The point of the feature: the lamp switches itself off.
        setOn(false);
        return null;
      });
    }, 250);
    return () => clearInterval(id);
  }, []);

  function arm() {
    let due: number;
    if (mode === "countdown") {
      due = Date.now() + minutes * 60_000;
    } else {
      const d = new Date();
      // 12-hour clock: 12 AM is hour 0, 12 PM is hour 12.
      d.setHours((hour % 12) + (pm ? 12 : 0), minute, 0, 0);
      // A time that has already gone today means the next one is tomorrow.
      if (d.getTime() <= Date.now()) d.setDate(d.getDate() + 1);
      due = d.getTime();
    }
    if (!on) setOn(true);
    setScheduled(due);
  }

  function toggle() {
    const next = !on;
    setOn(next);
    // Switching off by hand clears the schedule too, same as the device.
    if (!next) setScheduled(null);
  }

  const pad = (n: number) => String(n).padStart(2, "0");

  const clock =
    now === null
      ? "--:--:--"
      : (() => {
          const d = new Date(now);
          return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
        })();

  const countdown =
    scheduled === null || now === null
      ? "--:--:--"
      : (() => {
          const left = Math.max(0, Math.ceil((scheduled - now) / 1000));
          return `${pad(Math.floor(left / 3600))}:${pad(
            Math.floor((left % 3600) / 60),
          )}:${pad(left % 60)}`;
        })();

  const selectClass =
    "rounded border border-line bg-background px-2 py-1 font-mono text-sm text-foreground";

  return (
    <div className="grid gap-4 md:grid-cols-[1fr_19rem]">
      {/* ---- the lamp ---- */}
      <div className="relative flex min-h-72 items-end justify-center overflow-hidden rounded-lg border border-line bg-surface p-6">
        <svg
          viewBox="0 0 220 260"
          className="h-64 w-auto"
          role="img"
          aria-label={t(locale, on ? "demo.lampOn" : "demo.lampOff")}
        >
          <defs>
            <radialGradient id="lampGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--accent-alt)" stopOpacity="0.55" />
              <stop offset="100%" stopColor="var(--accent-alt)" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="lampCone" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent-alt)" stopOpacity="0.32" />
              <stop offset="100%" stopColor="var(--accent-alt)" stopOpacity="0" />
            </linearGradient>
          </defs>

          <g style={{ opacity: on ? 1 : 0, transition: "opacity 320ms ease" }}>
            <circle cx="110" cy="74" r="86" fill="url(#lampGlow)" />
            <path d="M62 86 L158 86 L206 236 L14 236 Z" fill="url(#lampCone)" />
          </g>

          <path
            d="M62 86 L158 86 L138 34 L82 34 Z"
            fill={on ? "var(--accent-alt)" : "var(--line-strong)"}
            stroke="var(--line-strong)"
            strokeWidth="2"
            strokeLinejoin="round"
            style={{ transition: "fill 320ms ease" }}
          />
          <ellipse
            cx="110"
            cy="88"
            rx="24"
            ry="7"
            fill="var(--accent-alt)"
            style={{ opacity: on ? 1 : 0.15, transition: "opacity 320ms ease" }}
          />

          <rect x="106" y="88" width="8" height="128" fill="var(--line-strong)" />
          <ellipse cx="110" cy="220" rx="46" ry="10" fill="var(--line-strong)" />
        </svg>

        <span className="absolute left-3 top-3 font-mono text-[10px] uppercase tracking-wider text-muted">
          {t(locale, "demo.simulation")}
        </span>
      </div>

      {/* ---- the Blynk-style panel ---- */}
      <div className="flex flex-col gap-3 rounded-lg border border-line bg-surface p-4">
        {/* LED */}
        <div className="flex items-center justify-between rounded border border-line px-3 py-2">
          <span className="font-mono text-xs text-muted">{t(locale, "demo.status")}</span>
          <span className="flex items-center gap-2">
            <span
              aria-hidden
              className="inline-block h-3 w-3 rounded-full border border-line-strong"
              style={{
                background: on ? "var(--accent-alt)" : "transparent",
                boxShadow: on ? "0 0 10px var(--accent-alt)" : "none",
                transition: "background 320ms ease, box-shadow 320ms ease",
              }}
            />
            <span className="font-mono text-xs">
              {t(locale, on ? "demo.onLabel" : "demo.offLabel")}
            </span>
          </span>
        </div>

        {/* BUTTON — V1 */}
        <button
          type="button"
          onClick={toggle}
          aria-pressed={on}
          className="rounded border border-line-strong px-3 py-3 font-mono text-sm transition-colors hover:border-accent"
          style={{
            background: on ? "var(--accent-alt)" : "transparent",
            color: on ? "var(--accent-contrast)" : "var(--foreground)",
          }}
        >
          {t(locale, on ? "demo.turnOff" : "demo.turnOn")}
        </button>

        {/* TIMER — V3 */}
        <div className="flex items-center justify-between rounded border border-line px-3 py-2">
          <span className="font-mono text-xs text-muted">{t(locale, "demo.countdown")}</span>
          <span className="font-mono text-sm text-accent">{countdown}</span>
        </div>

        {/* arming, either way */}
        <div className="rounded border border-line px-3 py-2">
          <div className="flex overflow-hidden rounded border border-line">
            {(["countdown", "clock"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                aria-pressed={mode === m}
                className={`flex-1 px-2 py-1 font-mono text-xs transition-colors ${
                  mode === m
                    ? "bg-accent text-accent-contrast"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {t(locale, m === "countdown" ? "demo.modeCountdown" : "demo.modeClock")}
              </button>
            ))}
          </div>

          {mode === "countdown" ? (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {[1, 5, 15, 30].map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMinutes(m)}
                  aria-pressed={minutes === m}
                  className={`rounded border px-2 py-1 font-mono text-xs transition-colors ${
                    minutes === m
                      ? "border-accent text-accent"
                      : "border-line text-muted hover:text-foreground"
                  }`}
                >
                  {m} {t(locale, "demo.minutes")}
                </button>
              ))}
            </div>
          ) : (
            <div className="mt-2 flex items-center gap-1">
              <select
                value={hour}
                onChange={(e) => setHour(Number(e.target.value))}
                aria-label={t(locale, "demo.hour")}
                className={selectClass}
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
                  <option key={h} value={h}>
                    {pad(h)}
                  </option>
                ))}
              </select>
              <span className="font-mono text-muted">:</span>
              <select
                value={minute}
                onChange={(e) => setMinute(Number(e.target.value))}
                aria-label={t(locale, "demo.minute")}
                className={selectClass}
              >
                {Array.from({ length: 60 }, (_, i) => i).map((m) => (
                  <option key={m} value={m}>
                    {pad(m)}
                  </option>
                ))}
              </select>
              <div className="ml-auto flex overflow-hidden rounded border border-line">
                {[false, true].map((isPm) => (
                  <button
                    key={String(isPm)}
                    type="button"
                    onClick={() => setPm(isPm)}
                    aria-pressed={pm === isPm}
                    className={`px-2 py-1 font-mono text-xs transition-colors ${
                      pm === isPm
                        ? "bg-accent text-accent-contrast"
                        : "text-muted hover:text-foreground"
                    }`}
                  >
                    {t(locale, isPm ? "demo.pm" : "demo.am")}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={scheduled === null ? arm : () => setScheduled(null)}
            className="mt-2 w-full rounded border border-line px-2 py-1.5 font-mono text-xs text-muted hover:border-accent hover:text-accent"
          >
            {t(
              locale,
              scheduled !== null
                ? "demo.clearTime"
                : mode === "countdown"
                  ? "demo.startTimer"
                  : "demo.setTime",
            )}
          </button>
        </div>

        {/* TIME — V2 */}
        <div className="flex items-center justify-between rounded border border-line px-3 py-2">
          <span className="font-mono text-xs text-muted">{t(locale, "demo.currentTime")}</span>
          <span className="font-mono text-sm">{clock}</span>
        </div>
      </div>
    </div>
  );
}
