import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 — signal lost",
};

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(56px, 8vw, 100px) clamp(18px, 4vw, 32px)",
        textAlign: "center",
      }}
    >
      <div
        className="mono"
        style={{ fontSize: 11, letterSpacing: "0.1em", color: "var(--muted)", marginBottom: 24 }}
      >
        ERROR_404
      </div>
      <h1
        style={{
          fontSize: "clamp(48px, 10vw, 120px)",
          fontWeight: 800,
          letterSpacing: "-0.04em",
          textTransform: "uppercase",
          margin: "0 0 16px",
          lineHeight: 0.9,
          color: "var(--blink)",
          animation: "ccpulse 2s ease-in-out infinite",
        }}
      >
        404
      </h1>
      <p
        className="mono"
        style={{ fontSize: 13, color: "var(--muted)", letterSpacing: "0.08em", marginBottom: 8 }}
      >
        &gt; signal lost
      </p>
      <p
        className="mono"
        style={{ fontSize: 13, color: "var(--muted)", letterSpacing: "0.08em", marginBottom: 40 }}
      >
        &gt; route not found in biometric index
      </p>
      <Link
        href="/"
        className="btn-primary"
        style={{
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: "0.04em",
          padding: "13px 28px",
          background: "var(--accent)",
          color: "var(--accent-fg)",
          textDecoration: "none",
        }}
      >
        RETURN TO BASE
      </Link>
    </div>
  );
}
