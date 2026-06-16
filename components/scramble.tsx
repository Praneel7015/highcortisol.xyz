"use client";

import { useEffect, useRef } from "react";

const CHARS = "▓▒░▌▐<>/\\=+*#01XZ";

/**
 * Decode/scramble-in text effect. Renders the final text on the server (so
 * no-JS and reduced-motion users get clean text), then scrambles → resolves
 * on mount when motion is allowed.
 */
export function Scramble({
  text,
  delay = 0,
  className,
  style,
}: {
  text: string;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let iv: ReturnType<typeof setInterval> | null = null;
    const startT = setTimeout(() => {
      iv = setInterval(() => {
        let out = "";
        for (let i = 0; i < text.length; i++) {
          const c = text[i];
          if (c === " ") {
            out += " ";
            continue;
          }
          out += i < frame ? c : CHARS[(Math.random() * CHARS.length) | 0];
        }
        el.textContent = out;
        frame += 0.55;
        if (frame >= text.length) {
          if (iv) clearInterval(iv);
          el.textContent = text;
        }
      }, 36);
    }, delay);

    return () => {
      clearTimeout(startT);
      if (iv) clearInterval(iv);
      if (el) el.textContent = text;
    };
  }, [text, delay]);

  return (
    <span ref={ref} className={className} style={style}>
      {text}
    </span>
  );
}
