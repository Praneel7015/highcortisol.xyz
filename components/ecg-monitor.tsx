"use client";

import { useEffect, useRef } from "react";
import {
  useMode,
  useReading,
  useReduce,
  useTheme,
  setMode,
  statusFor,
  deltaFor,
} from "@/lib/vitals";

const DPR = () => Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 2);

export function EcgMonitor() {
  const mode = useMode();
  const theme = useTheme();
  const reduce = useReduce();
  const reading = useReading();

  const waveRef = useRef<HTMLCanvasElement>(null);
  const gaugeRef = useRef<HTMLCanvasElement>(null);
  const raf = useRef<number | null>(null);
  const drawRef = useRef<(t: number) => void>(() => {});
  const loopRef = useRef<(t: number) => void>(() => {});

  // latest state for the rAF loop without re-binding it every frame
  const modeRef = useRef(mode);
  const reduceRef = useRef(reduce);
  const colors = useRef({ line: "#5fd699", grid: "#23232a" });
  modeRef.current = mode;
  reduceRef.current = reduce;

  // refresh canvas colors from the live CSS tokens whenever theme/mode flips
  useEffect(() => {
    const cs = getComputedStyle(document.documentElement);
    colors.current = {
      line: cs.getPropertyValue("--accent-text").trim() || "#5fd699",
      grid: cs.getPropertyValue("--border").trim() || "#23232a",
    };
  }, [theme, mode]);

  useEffect(() => {
    const fit = (cvs: HTMLCanvasElement) => {
      const dpr = DPR();
      const r = cvs.getBoundingClientRect();
      const w = Math.round(r.width * dpr);
      const h = Math.round(r.height * dpr);
      if (w && (cvs.width !== w || cvs.height !== h)) {
        cvs.width = w;
        cvs.height = h;
      }
    };

    const drawWave = (cvs: HTMLCanvasElement, time: number) => {
      const w = cvs.width;
      const h = cvs.height;
      if (!w) return;
      const { line, grid } = colors.current;
      const high = modeRef.current === "high";
      const reduced = reduceRef.current;
      const dpr = DPR();
      const ctx = cvs.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      const mid = h * 0.52;
      ctx.lineWidth = 1;
      ctx.strokeStyle = grid;
      ctx.globalAlpha = 0.5;
      ctx.beginPath();
      ctx.moveTo(0, mid);
      ctx.lineTo(w, mid);
      ctx.stroke();
      ctx.globalAlpha = 0.2;
      const ticks = 28;
      for (let i = 0; i <= ticks; i++) {
        const x = (i / ticks) * w;
        ctx.beginPath();
        ctx.moveTo(x, mid - 4 * dpr);
        ctx.lineTo(x, mid + 4 * dpr);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      const yAt = (frac: number, ph: number) => {
        const u = frac * (high ? 16 : 8) - ph;
        if (high) {
          const f = u - Math.floor(u);
          const s = Math.exp(-((f - 0.5) * (f - 0.5)) / (2 * 0.0018));
          const d =
            -0.22 * Math.exp(-((f - 0.4) * (f - 0.4)) / (2 * 0.0009)) -
            0.22 * Math.exp(-((f - 0.6) * (f - 0.6)) / (2 * 0.0009));
          return s + d;
        }
        return 0.55 * Math.sin(u) + 0.22 * Math.sin(u * 2.3 + 0.5);
      };
      const amp = (high ? 0.4 : 0.14) * h;
      const ph = reduced ? 1.7 : time * 0.001 * (high ? 2.6 : 0.9);
      const N = Math.max(80, Math.floor(w / (2 * dpr)));
      ctx.beginPath();
      for (let i = 0; i <= N; i++) {
        const x = (i / N) * w;
        const y = mid - yAt(i / N, ph) * amp;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = line;
      ctx.lineWidth = 2 * dpr;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.shadowColor = line;
      ctx.shadowBlur = high ? 12 * dpr : 4 * dpr;
      ctx.stroke();
      ctx.shadowBlur = 0;
      if (!reduced) {
        const sp = (time * 0.00018) % 1;
        const sy = mid - yAt(sp, ph) * amp;
        ctx.fillStyle = line;
        ctx.shadowColor = line;
        ctx.shadowBlur = 16 * dpr;
        ctx.beginPath();
        ctx.arc(sp * w, sy, 3.5 * dpr, 0, 7);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    };

    const drawGauge = (cvs: HTMLCanvasElement, time: number) => {
      const w = cvs.width;
      const h = cvs.height;
      if (!w) return;
      const { line: acc, grid } = colors.current;
      const high = modeRef.current === "high";
      const reduced = reduceRef.current;
      const ctx = cvs.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h * 0.96;
      const r = Math.min(w * 0.44, h * 0.86);
      const lw = Math.max(5, r * 0.16);
      ctx.lineCap = "round";
      ctx.lineWidth = lw;
      ctx.strokeStyle = grid;
      ctx.globalAlpha = 0.55;
      ctx.beginPath();
      ctx.arc(cx, cy, r, Math.PI, 0, true);
      ctx.stroke();
      ctx.globalAlpha = 1;
      const target = high ? 0.85 : 0.2;
      const wob = reduced ? 0 : Math.sin(time * 0.003) * (high ? 0.05 : 0.02);
      const val = Math.max(0.03, Math.min(0.97, target + wob));
      const ang = Math.PI * (1 - val);
      ctx.strokeStyle = acc;
      ctx.shadowColor = acc;
      ctx.shadowBlur = high ? 14 : 6;
      ctx.beginPath();
      ctx.arc(cx, cy, r, Math.PI, ang, true);
      ctx.stroke();
      ctx.shadowBlur = 0;
      const nx = cx + Math.cos(ang) * r;
      const ny = cy + Math.sin(ang) * r;
      ctx.fillStyle = acc;
      ctx.shadowColor = acc;
      ctx.shadowBlur = high ? 12 : 5;
      ctx.beginPath();
      ctx.arc(nx, ny, lw * 0.62, 0, 7);
      ctx.fill();
      ctx.shadowBlur = 0;
    };

    drawRef.current = (time: number) => {
      if (waveRef.current) {
        fit(waveRef.current);
        drawWave(waveRef.current, time || 0);
      }
      if (gaugeRef.current) {
        fit(gaugeRef.current);
        drawGauge(gaugeRef.current, time || 0);
      }
    };
    const loop = (time: number) => {
      drawRef.current(time || 0);
      if (!reduceRef.current) raf.current = requestAnimationFrame(loop);
      else raf.current = null;
    };
    loopRef.current = loop;

    raf.current = requestAnimationFrame(loop);
    const onResize = () => drawRef.current(performance.now());
    window.addEventListener("resize", onResize);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = null;
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // repaint a static frame when state changes; restart the loop if it had
  // stopped (e.g. the user just turned reduced-motion off).
  useEffect(() => {
    drawRef.current(performance.now());
    if (!reduce && raf.current == null) {
      raf.current = requestAnimationFrame(loopRef.current);
    }
  }, [mode, theme, reduce, reading]);

  const high = mode === "high";
  const statusBg = high ? "var(--high-bg)" : "var(--low-bg)";
  const statusFg = high ? "var(--high-text)" : "var(--low-text)";
  const statusBd = high ? "var(--high-border)" : "var(--low-border)";
  const segOn = (active: boolean) => (active ? "var(--accent-fg)" : "var(--muted)");

  return (
    <div
      style={{
        position: "relative",
        border: "1px solid var(--border)",
        background: "color-mix(in srgb, var(--surface) 92%, transparent)",
        padding: "clamp(20px, 2.4vw, 28px)",
        boxShadow:
          "0 30px 80px -40px #000, inset 0 0 0 1px color-mix(in srgb, var(--accent) calc(var(--veil) * 22%), transparent)",
      }}
    >
      {/* corner brackets */}
      {(
        [
          { top: -1, left: -1, bt: true, bl: true },
          { top: -1, right: -1, bt: true, br: true },
          { bottom: -1, left: -1, bb: true, bl: true },
          { bottom: -1, right: -1, bb: true, br: true },
        ] as const
      ).map((c, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "top" in c ? c.top : undefined,
            bottom: "bottom" in c ? c.bottom : undefined,
            left: "left" in c ? c.left : undefined,
            right: "right" in c ? c.right : undefined,
            width: 18,
            height: 18,
            borderTop: "bt" in c ? "2px solid var(--accent)" : undefined,
            borderBottom: "bb" in c ? "2px solid var(--accent)" : undefined,
            borderLeft: "bl" in c ? "2px solid var(--accent)" : undefined,
            borderRight: "br" in c ? "2px solid var(--accent)" : undefined,
          }}
        />
      ))}
      {/* inner moving scanline */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", inset: 1, overflow: "hidden", pointerEvents: "none" }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: 90,
            background:
              "linear-gradient(180deg, transparent, color-mix(in srgb, var(--accent) 16%, transparent), transparent)",
            animation: "scan var(--scan-dur) linear infinite",
          }}
        />
      </div>

      <div style={{ position: "relative" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <span
            className="mono"
            style={{ fontSize: 12, letterSpacing: "0.16em", color: "var(--muted)" }}
          >
            CORTISOL MONITOR
          </span>
          <span
            className="mono"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              fontSize: 11,
              letterSpacing: "0.08em",
              padding: "5px 11px",
              background: statusBg,
              color: statusFg,
              border: `1px solid ${statusBd}`,
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "currentColor",
                animation: "ccpulse var(--bpm-dur) ease-in-out infinite",
              }}
            />
            {statusFor(mode)}
          </span>
        </div>

        <canvas
          ref={waveRef}
          aria-hidden="true"
          style={{ width: "100%", height: 150, display: "block" }}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gap: 18,
            alignItems: "center",
            margin: "14px 0 20px",
            borderTop: "1px solid var(--border)",
            paddingTop: 18,
          }}
        >
          <canvas
            ref={gaugeRef}
            aria-hidden="true"
            style={{ width: 104, height: 60, display: "block" }}
          />
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 9 }}>
              <span
                className="mono"
                style={{
                  fontSize: 42,
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  color: "var(--accent-text)",
                  lineHeight: 1,
                }}
              >
                {reading}
              </span>
              <span className="mono" style={{ fontSize: 13, color: "var(--muted)" }}>
                nmol/L
              </span>
            </div>
            <div
              className="mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.08em",
                color: statusFg,
                marginTop: 6,
              }}
            >
              {deltaFor(mode)}
            </div>
          </div>
        </div>

        {/* big cortisol mode toggle (lives in the hero, per spec) */}
        <div
          role="group"
          aria-label="Cortisol mode"
          style={{
            position: "relative",
            height: 50,
            border: "1px solid var(--border)",
            background: "var(--bg)",
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 3,
              left: 3,
              height: 42,
              width: "calc(50% - 4px)",
              background: "var(--accent)",
              transition: "transform var(--dur) var(--ease)",
              transform: `translateX(${high ? "100%" : "0%"})`,
              boxShadow:
                "0 0 20px color-mix(in srgb, var(--accent) calc(40% + var(--veil) * 40%), transparent)",
            }}
          />
          <div
            className="mono"
            style={{
              position: "relative",
              display: "flex",
              height: "100%",
              fontSize: 13,
              letterSpacing: "0.08em",
            }}
          >
            <button
              type="button"
              onClick={() => setMode("low")}
              aria-pressed={!high}
              style={{
                flex: 1,
                background: "none",
                border: "none",
                cursor: "pointer",
                color: segOn(!high),
              }}
            >
              LOW CORTISOL
            </button>
            <button
              type="button"
              onClick={() => setMode("high")}
              aria-pressed={high}
              style={{
                flex: 1,
                background: "none",
                border: "none",
                cursor: "pointer",
                color: segOn(high),
              }}
            >
              HIGH CORTISOL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
