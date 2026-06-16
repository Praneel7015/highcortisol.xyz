// Pure-CSS recreation of the mockup's background — drifting grid, aurora wash,
// a floating "neural core" (replaces the 2.8MB brain GIF), and CRT scanlines.
// Zero JS, zero image bytes, all GPU transforms. aria-hidden / non-interactive.

export function Background() {
  return (
    <>
      {/* drifting grid */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          backgroundImage:
            "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
          backgroundSize: "52px 52px, 52px 52px",
          animation: "gridDrift var(--grid-dur) linear infinite",
          maskImage:
            "radial-gradient(120% 90% at 50% 0%, #000 30%, transparent 88%)",
          WebkitMaskImage:
            "radial-gradient(120% 90% at 50% 0%, #000 30%, transparent 88%)",
        }}
      />
      {/* aurora */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: "-10%",
          zIndex: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(46% 46% at 78% 8%, var(--accent), transparent 60%)",
          opacity: "calc(0.10 + var(--veil) * 0.22)",
          filter: "blur(20px)",
          animation: "auroraShift 14s ease-in-out infinite",
          transition: "opacity 0.6s ease",
        }}
      />
      {/* floating neural core — outer glow */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: "46%",
          left: "58%",
          zIndex: 0,
          pointerEvents: "none",
          width: "min(80vw, 820px)",
          aspectRatio: "1 / 1",
          transform: "translate(-50%, -50%)",
          animation: "coreFloat 9s ease-in-out infinite",
          opacity: "calc(var(--core-op) * 0.9)",
          mixBlendMode: "var(--core-blend)" as React.CSSProperties["mixBlendMode"],
          background:
            "radial-gradient(circle at 50% 46%, color-mix(in srgb, var(--accent-text) 55%, transparent) 0%, color-mix(in srgb, var(--accent) 28%, transparent) 30%, color-mix(in srgb, var(--accent) 10%, transparent) 55%, transparent 70%)",
          filter: "blur(32px) saturate(1.8) hue-rotate(calc(var(--core-hue) - 78deg))",
        }}
      />
      {/* neural core — inner bright nucleus */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: "46%",
          left: "58%",
          zIndex: 0,
          pointerEvents: "none",
          width: "min(36vw, 380px)",
          aspectRatio: "1 / 1",
          transform: "translate(-50%, -50%)",
          animation: "coreFloat 9s ease-in-out infinite 1.5s",
          opacity: "calc(var(--core-op) * 1.2)",
          mixBlendMode: "var(--core-blend)" as React.CSSProperties["mixBlendMode"],
          background:
            "radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--accent-text) 70%, transparent) 0%, color-mix(in srgb, var(--accent-text) 30%, transparent) 40%, transparent 70%)",
          filter: "blur(16px) saturate(2)",
        }}
      />
      {/* neural core — concentric ring */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: "46%",
          left: "58%",
          zIndex: 0,
          pointerEvents: "none",
          width: "min(56vw, 580px)",
          aspectRatio: "1 / 1",
          transform: "translate(-50%, -50%)",
          animation: "coreFloat 12s ease-in-out infinite reverse",
          opacity: "calc(var(--core-op) * 0.6)",
          mixBlendMode: "var(--core-blend)" as React.CSSProperties["mixBlendMode"],
          background:
            "radial-gradient(circle at 50% 50%, transparent 44%, color-mix(in srgb, var(--accent) 40%, transparent) 48%, color-mix(in srgb, var(--accent) 15%, transparent) 54%, transparent 60%)",
          filter: "blur(8px)",
        }}
      />
      {/* CRT scanlines */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 80,
          pointerEvents: "none",
          background:
            "repeating-linear-gradient(0deg, transparent 0 2px, rgba(0,0,0,0.045) 2px 3px)",
          opacity: "calc(0.4 + var(--veil) * 0.5)",
          mixBlendMode: "multiply",
        }}
      />
    </>
  );
}
