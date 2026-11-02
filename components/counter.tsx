"use client";

import { useEffect, useRef, useState } from "react";

/** Counts up to `value` once it scrolls into view. Calm under reduced-motion. */
export function Counter({
  value,
  className,
  style,
}: {
  value: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const ran = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // reset on the next frame, not synchronously inside the effect
    const reset = requestAnimationFrame(() => setDisplay(reduce ? value : 0));
    if (reduce) return () => cancelAnimationFrame(reset);

    const run = () => {
      if (ran.current) return;
      ran.current = true;
      const start = performance.now();
      const dur = 900;
      const step = (t: number) => {
        const p = Math.min(1, (t - start) / dur);
        setDisplay(Math.round(value * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(step);
        else setDisplay(value);
      };
      requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            run();
            io.disconnect();
          }
        });
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      cancelAnimationFrame(reset);
      io.disconnect();
    };
  }, [value]);

  return (
    <span ref={ref} className={className} style={style}>
      {display}
    </span>
  );
}
