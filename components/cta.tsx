import { SITE } from "@/lib/site";

export function Cta() {
  return (
    <section
      className="reveal"
      style={{
        position: "relative",
        borderTop: "1px solid var(--border)",
        background: "var(--surface)",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(60% 120% at 50% 0%, color-mix(in srgb, var(--accent) calc(8% + var(--veil) * 16%), transparent), transparent 70%)",
        }}
      />
      <div
        style={{
          position: "relative",
          maxWidth: 1200,
          margin: "0 auto",
          padding: "clamp(56px, 8vw, 100px) clamp(18px, 4vw, 32px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 26,
        }}
      >
        <h2
          style={{
            fontSize: "clamp(32px, 6vw, 72px)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            textTransform: "uppercase",
            margin: 0,
            lineHeight: 0.94,
            animation: "rgbsplit 0.5s steps(2) infinite",
          }}
        >
          Ship on the lawn
          <br />
          with us.
        </h2>
        <p
          style={{
            fontSize: 17,
            color: "var(--muted)",
            maxWidth: "48ch",
            margin: 0,
            lineHeight: 1.55,
          }}
        >
          Calm or intense — pick your nervous system. We merge fast and review
          faster.
        </p>
        <div style={{ display: "flex", gap: 13, flexWrap: "wrap", justifyContent: "center" }}>
          <a
            href={SITE.org}
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
            style={{
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.02em",
              padding: "15px 30px",
              background: "var(--accent)",
              color: "var(--accent-fg)",
              textDecoration: "none",
            }}
          >
            JOIN ON GITHUB ↗
          </a>
          <a
            href={`mailto:${SITE.email}`}
            className="btn-ghost"
            style={{
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.02em",
              padding: "15px 30px",
              background: "transparent",
              color: "var(--fg)",
              border: "1px solid var(--border)",
              textDecoration: "none",
            }}
          >
            {SITE.email}
          </a>
        </div>
      </div>
    </section>
  );
}
