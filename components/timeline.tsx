const MONTHS = [
  { label: "APRIL", note: "3 builds · the split begins" },
  { label: "MAY", note: "4 builds · both squads warm" },
  { label: "JUNE", note: "1 build · shipping daily" },
  { label: "JULY", note: "1 build · still climbing" },
  { label: "NOW", note: "still on the lawn" },
];

export function Timeline() {
  return (
    <section
      id="team"
      className="reveal"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "clamp(56px, 8vw, 118px) clamp(18px, 4vw, 32px)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 16,
            marginBottom: "clamp(26px, 4vw, 42px)",
          }}
        >
          <span
            className="mono"
            style={{ fontSize: 14, letterSpacing: "0.1em", color: "var(--accent-text)" }}
          >
            /04
          </span>
          <h2
            style={{
              fontSize: "clamp(28px, 4.5vw, 48px)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            The team.
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "clamp(32px, 5vw, 64px)",
            alignItems: "start",
          }}
        >
          <p
            style={{
              fontSize: "clamp(18px, 2.2vw, 26px)",
              lineHeight: 1.45,
              letterSpacing: "-0.01em",
              margin: 0,
              textWrap: "pretty",
            }}
          >
            We started as one chat that couldn&apos;t agree on a pace. So we
            stopped agreeing.{" "}
            <span style={{ color: "var(--low-text)" }}>Low Cortisol</span> takes
            the long, calm builds;{" "}
            <span style={{ color: "var(--high-text)" }}>High Cortisol</span> takes
            the 24-hour sprints. Four months in, the split is the whole point.
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              background: "var(--border)",
              border: "1px solid var(--border)",
            }}
          >
            {MONTHS.map((m) => (
              <div
                key={m.label}
                className="hov-surface2"
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  gap: 16,
                  padding: "18px 20px",
                  background: "var(--surface)",
                }}
              >
                <span
                  className="mono"
                  style={{ fontSize: 13, letterSpacing: "0.1em", color: "var(--fg)" }}
                >
                  {m.label}
                </span>
                <span className="mono" style={{ fontSize: 12, color: "var(--muted)" }}>
                  {m.note}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
