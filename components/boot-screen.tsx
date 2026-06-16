"use client";

import { useEffect, useRef, useState } from "react";

const LINES = [
  "> initializing biometric interface ...",
  "> calibrating cortisol sensors ....... OK",
  "> two squads detected: LOW // HIGH",
  "> linking 7 repositories ............. OK",
  "> system online.",
];
const TOTAL = LINES.join("").length;

type Phase = "running" | "leaving" | "done";

export function BootScreen() {
  const [text, setText] = useState("");
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<Phase>("running");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const finish = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setProgress(100);
    setPhase("leaving");
    timers.current.push(setTimeout(() => setPhase("done"), 720));
  };

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      setPhase("done");
      return;
    }

    let li = 0;
    let ci = 0;
    let acc = "";
    let done = 0;

    const tick = () => {
      if (li >= LINES.length) {
        timers.current.push(setTimeout(finish, 120));
        return;
      }
      const line = LINES[li];
      acc += line[ci] ?? "";
      setText(acc + "█");
      done++;
      setProgress(Math.min(100, Math.round((done / TOTAL) * 100)));
      ci++;
      if (ci >= line.length) {
        acc += "\n";
        li++;
        ci = 0;
        timers.current.push(setTimeout(tick, 22));
      } else {
        timers.current.push(setTimeout(tick, 4));
      }
    };
    tick();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finish();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      timers.current.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (phase === "done") return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="System boot sequence"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "var(--bg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: phase === "leaving" ? 0 : 1,
        transition: "opacity 0.7s cubic-bezier(0.7, 0, 0.3, 1)",
      }}
    >
      <div style={{ width: "min(560px, 86vw)" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 22,
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: 11,
              height: 11,
              borderRadius: "50%",
              background: "var(--blink)",
              boxShadow: "0 0 12px var(--blink)",
              animation: "ccpulse 1s ease-in-out infinite",
            }}
          />
          <span
            className="mono"
            style={{
              fontSize: 13,
              letterSpacing: "0.18em",
              color: "var(--muted)",
            }}
          >
            HIGHCORTISOL.XYZ // BIOMETRIC OS
          </span>
        </div>
        <pre
          className="mono"
          style={{
            fontSize: 13,
            lineHeight: 1.85,
            color: "var(--accent-text)",
            margin: 0,
            minHeight: 148,
            whiteSpace: "pre-wrap",
            textShadow:
              "0 0 8px color-mix(in srgb, var(--accent-text) 50%, transparent)",
          }}
        >
          {text}
        </pre>
        <div
          style={{
            marginTop: 20,
            height: 3,
            background: "var(--surface-2)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background: "var(--accent)",
              boxShadow: "0 0 12px var(--accent)",
              transition: "width 0.25s linear",
            }}
          />
        </div>
        <div style={{ marginTop: 18, textAlign: "right" }}>
          <button
            type="button"
            onClick={finish}
            className="mono btn-ghost"
            style={{
              fontSize: 11,
              letterSpacing: "0.1em",
              color: "var(--muted)",
              background: "transparent",
              border: "1px solid var(--border)",
              padding: "7px 14px",
              cursor: "pointer",
            }}
          >
            SKIP →
          </button>
        </div>
      </div>
    </div>
  );
}
