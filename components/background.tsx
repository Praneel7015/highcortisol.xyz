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
      {/* floating neural core */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: "48%",
          left: "50%",
          zIndex: 0,
          pointerEvents: "none",
          width: "min(70vw, 720px)",
          aspectRatio: "1 / 1",
          transform: "translate(-50%, -50%)",
          animation: "coreFloat 9s ease-in-out infinite",
          opacity: "var(--core-op)",
          mixBlendMode: "var(--core-blend)" as React.CSSProperties["mixBlendMode"],
          background:
            "radial-gradient(circle at 50% 46%, color-mix(in srgb, var(--accent-text) 42%, transparent) 0%, color-mix(in srgb, var(--accent) 18%, transparent) 34%, transparent 60%), radial-gradient(circle at 50% 50%, transparent 48%, color-mix(in srgb, var(--accent) 22%, transparent) 50%, transparent 58%)",
          filter:
            "blur(26px) saturate(1.5) hue-rotate(calc(var(--core-hue) - 78deg))",
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
