// Pure-CSS background layers plus the original animated brain GIF.
// The GIF (Anatomography CC BY-SA) is filtered via CSS to match the
// current theme/mode accent colour — no JS, no canvas.
// aria-hidden / non-interactive throughout.

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

      {/* floating brain — anatomical GIF, colourised to match accent */}
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
          opacity: "var(--core-op, 0.55)",
          transition: "opacity 0.6s ease",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brain.gif"
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            mixBlendMode: "var(--core-blend, screen)" as React.CSSProperties["mixBlendMode"],
            filter:
              "invert(var(--core-invert, 1)) sepia(0.55) saturate(2.6) hue-rotate(var(--core-hue, 78deg)) brightness(1.12)",
          }}
        />
      </div>

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
