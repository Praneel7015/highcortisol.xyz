import Link from "next/link";
import { getContributors } from "@/lib/contributors";
import { ContributorsGrid } from "@/components/contributors-grid";
import { Counter } from "@/components/counter";

export function ContributorsSection() {
  const contributors = getContributors();
  return (
    <section
      id="contributors"
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
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
            marginBottom: "clamp(26px, 4vw, 42px)",
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
            <span
              className="mono"
              style={{ fontSize: 14, letterSpacing: "0.1em", color: "var(--accent-text)" }}
            >
              /03
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
              Contributors.
            </h2>
          </div>
          <Link
            href="/contributors"
            className="mono btn-ghost"
            style={{
              fontSize: 12,
              letterSpacing: "0.06em",
              color: "var(--muted)",
              textDecoration: "none",
            }}
          >
            ALL HUMANS →
          </Link>
        </div>

        <ContributorsGrid contributors={contributors} />

        <div
          className="mono"
          style={{
            fontSize: 12,
            letterSpacing: "0.06em",
            color: "var(--muted)",
            marginTop: 18,
          }}
        >
          <Counter value={contributors.length} /> HUMANS · ONE LAWN · ZERO
          FRAMEWORK WARS
        </div>
      </div>
    </section>
  );
}
