import { getAllProjects, MONTHS, type Month } from "@/lib/projects";

const MONTH_COPY: Record<Month, { label: string; note: string }> = {
  APR: { label: "APRIL", note: "the split begins" },
  MAY: { label: "MAY", note: "both squads warm" },
  JUN: { label: "JUNE", note: "shipping daily" },
  JUL: { label: "JULY", note: "the weekend challenges" },
  AUG: { label: "AUGUST", note: "hackathon season" },
  SEP: { label: "SEPTEMBER", note: "agents everywhere" },
  OCT: { label: "OCTOBER", note: "still climbing" },
  NOV: { label: "NOVEMBER", note: "still climbing" },
};

/** One row per month that actually shipped something, counted from content/. */
function timelineRows() {
  const projects = getAllProjects();
  const rows = MONTHS.flatMap((m) => {
    const n = projects.filter((p) => p.month === m).length;
    if (!n) return [];
    const { label, note } = MONTH_COPY[m];
    return [{ label, note: `${n} build${n === 1 ? "" : "s"} · ${note}` }];
  });
  return [...rows, { label: "NOW", note: "still on the lawn" }];
}

export function Timeline() {
  const rows = timelineRows();
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
            the 24-hour sprints. Seven months in, the split is the whole point.
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
            {rows.map((m) => (
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
