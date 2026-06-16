import Link from "next/link";

/** Lowercase mono wordmark with the beating-heart status dot. */
export function Wordmark({
  size = 16,
  href = "/",
}: {
  size?: number;
  href?: string | null;
}) {
  const dot = Math.round(size * 0.6);
  const inner = (
    <>
      <span
        aria-hidden="true"
        style={{
          width: dot,
          height: dot,
          borderRadius: "50%",
          background: "var(--blink)",
          boxShadow: "0 0 10px var(--blink)",
          animation: "beat var(--bpm-dur) ease-in-out infinite",
          flex: "none",
        }}
      />
      <span style={{ fontSize: size, fontWeight: 700, letterSpacing: "-0.02em" }}>
        highcortisol
        <span style={{ color: "var(--muted)", fontWeight: 400 }}>.xyz</span>
      </span>
    </>
  );

  const style: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 11,
    color: "inherit",
    textDecoration: "none",
  };

  if (!href) {
    return <span style={style}>{inner}</span>;
  }
  return (
    <Link href={href} style={style} aria-label="highcortisol.xyz — home">
      {inner}
    </Link>
  );
}
