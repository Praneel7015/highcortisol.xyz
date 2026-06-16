import Link from "next/link";
import { getProjectsBySquad, type ProjectWithBody } from "@/lib/projects";
import { Counter } from "@/components/counter";

function n2(order: number) {
  return String(order).padStart(2, "0");
}

function SquadColumn({
  squad,
  badge,
  title,
  blurb,
  projects,
}: {
  squad: "low" | "high";
  badge: string;
  title: string;
  blurb: string;
  projects: ProjectWithBody[];
}) {
  const text = squad === "low" ? "var(--low-text)" : "var(--high-text)";
  const bg = squad === "low" ? "var(--low-bg)" : "var(--high-bg)";
  const border = squad === "low" ? "var(--low-border)" : "var(--high-border)";
  return (
    <div
      className="hov-surface2"
      style={{
        position: "relative",
        background: "var(--surface)",
        padding: "clamp(30px, 4vw, 54px)",
        overflow: "hidden",
        borderLeft: squad === "high" ? "3px solid var(--high-border)" : undefined,
      }}
    >
      <span
        className="mono"
        style={{
          display: "inline-block",
          fontSize: 11,
          letterSpacing: "0.1em",
          padding: "5px 12px",
          background: bg,
          color: text,
          border: `1px solid ${border}`,
          marginBottom: 28,
        }}
      >
        ● {badge}
      </span>
      <h3
        style={{
          fontSize: "clamp(24px, 3vw, 34px)",
          fontWeight: squad === "low" ? 500 : 700,
          letterSpacing: "-0.02em",
          margin: "0 0 18px",
          lineHeight: 1.1,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: 16,
          lineHeight: 1.7,
          color: "var(--muted)",
          margin: "0 0 28px",
          maxWidth: "40ch",
          textWrap: "pretty",
        }}
      >
        {blurb}
      </p>
      <div
        className="mono"
        style={{
          fontSize: 12,
          letterSpacing: "0.06em",
          color: squad === "high" ? text : "var(--muted)",
          marginBottom: 16,
        }}
      >
        <Counter value={projects.length} /> PROJECTS
        {squad === "high" ? " · SHIPPING" : ""}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {projects.map((p) => (
          <Link
            key={p.slug}
            href={`/projects/${p.slug}`}
            className={`squad-link ${squad}`}
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 12,
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <span className="mono" style={{ fontSize: 12, color: text }}>
              /{n2(p.order)}
            </span>
            <span style={{ fontSize: 18, fontWeight: 500 }}>
              {p.title}{" "}
              <span className="mono" style={{ fontSize: 12, color: "var(--muted)" }}>
                ↗
              </span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function SquadSplit() {
  const low = getProjectsBySquad("low");
  const high = getProjectsBySquad("high");
  return (
    <section id="squads" className="reveal">
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
            marginBottom: "clamp(32px, 5vw, 52px)",
          }}
        >
          <span
            className="mono"
            style={{ fontSize: 14, letterSpacing: "0.1em", color: "var(--accent-text)" }}
          >
            /01
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
            The squads.
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
            gap: 1,
            background: "var(--border)",
            border: "1px solid var(--border)",
          }}
        >
          <SquadColumn
            squad="low"
            badge="LOW CORTISOL"
            title="Builds calm."
            blurb="Tools that lower the resting heart rate. Generous whitespace, slow easing, quiet defaults. The kind of software that doesn't ask for anything."
            projects={low}
          />
          <SquadColumn
            squad="high"
            badge="HIGH CORTISOL"
            title="Builds intense."
            blurb="Tools for when the deadline is now. Dense layouts, sharp motion, real-time everything. Built fast, on purpose, at volume."
            projects={high}
          />
        </div>
      </div>
    </section>
  );
}
