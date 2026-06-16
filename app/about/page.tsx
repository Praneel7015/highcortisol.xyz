import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "The story of how one chat that couldn't agree on a pace split into two squads and started shipping.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About — highcortisol.xyz",
    description: "The biometric OS origin story.",
    url: `${SITE.url}/about`,
    siteName: SITE.name,
    locale: SITE.locale,
    type: "website",
  },
};

const TIMELINE = [
  {
    month: "APR",
    label: "The split begins",
    body: "One group chat, two shipping speeds. We stopped arguing about pace and started treating it as a feature. Low Cortisol took the long, deliberate builds. High Cortisol took the 24-hour sprints.",
  },
  {
    month: "MAY",
    label: "Both squads warm",
    body: "Three more projects dropped across both squads. The biometric metaphor locked in — low BPM for slow and steady, 180+ BPM for the overnight hauls.",
  },
  {
    month: "JUN",
    label: "Shipping daily",
    body: "Two more builds. The portfolio site itself became a project. We rendered the whole thing as a biometric OS because that felt more honest than a grid of logos.",
  },
  {
    month: "NOW",
    label: "Still on the lawn",
    body: "Seven builds shipped. Five contributors. The next hackathon is already on the calendar.",
  },
];

export default function AboutPage() {
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(56px, 8vw, 100px) clamp(18px, 4vw, 32px)" }}>

      <header style={{ marginBottom: "clamp(48px, 7vw, 88px)" }}>
        <span className="mono" style={{ fontSize: 14, letterSpacing: "0.1em", color: "var(--accent-text)", display: "block", marginBottom: 12 }}>
          /about
        </span>
        <h1
          style={{
            fontSize: "clamp(36px, 7vw, 80px)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            textTransform: "uppercase",
            margin: "0 0 24px",
            lineHeight: 0.96,
          }}
        >
          The lawn.
        </h1>
        <p
          style={{
            fontSize: "clamp(17px, 2vw, 22px)",
            lineHeight: 1.55,
            color: "var(--muted)",
            maxWidth: "52ch",
            margin: 0,
          }}
        >
          We started as one chat that couldn&apos;t agree on a pace. So we
          stopped agreeing.{" "}
          <span style={{ color: "var(--low-text)" }}>Low Cortisol</span> takes
          the long, calm builds.{" "}
          <span style={{ color: "var(--high-text)" }}>High Cortisol</span> takes
          the 24-hour sprints. Four months in, the split is the whole point.
        </p>
      </header>

      {/* What is cortisol */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "clamp(32px, 5vw, 64px)",
          marginBottom: "clamp(56px, 8vw, 100px)",
          borderTop: "1px solid var(--border)",
          paddingTop: "clamp(40px, 6vw, 72px)",
        }}
      >
        <div>
          <h2
            style={{
              fontSize: "clamp(22px, 3vw, 34px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              margin: "0 0 16px",
            }}
          >
            Why cortisol?
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.65, color: "var(--muted)", margin: 0 }}>
            Cortisol is the body&apos;s stress hormone. High means fight-or-flight — that frantic 3 AM deploy energy.
            Low means deep focus — the long Saturday afternoon when the code just flows.
            Both produce great software. Neither is wrong. We just wanted a name
            that made the difference legible.
          </p>
        </div>
        <div>
          <h2
            style={{
              fontSize: "clamp(22px, 3vw, 34px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              margin: "0 0 16px",
            }}
          >
            The biometric OS
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.65, color: "var(--muted)", margin: 0 }}>
            The portfolio renders as an operating system monitoring two nervous
            systems simultaneously. ECG traces, BPM counters, cortisol readings.
            LOW mode is calm. HIGH mode raises the BPM to 180, tightens the
            animations, and turns the accent red. Same data, different affect.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section>
        <h2
          style={{
            fontSize: "clamp(22px, 3vw, 34px)",
            fontWeight: 700,
            letterSpacing: "-0.025em",
            textTransform: "uppercase",
            margin: "0 0 clamp(24px, 4vw, 40px)",
          }}
        >
          Timeline.
        </h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            background: "var(--border)",
            border: "1px solid var(--border)",
          }}
        >
          {TIMELINE.map((t) => (
            <div
              key={t.month}
              className="hov-surface2"
              style={{
                display: "grid",
                gridTemplateColumns: "80px minmax(0, 1fr)",
                gap: "clamp(20px, 3vw, 40px)",
                padding: "clamp(20px, 3vw, 32px) 24px",
                background: "var(--surface)",
                alignItems: "start",
              }}
            >
              <div>
                <div className="mono" style={{ fontSize: 13, letterSpacing: "0.1em", color: "var(--accent-text)" }}>
                  {t.month}
                </div>
                <div className="mono" style={{ fontSize: 11, color: "var(--muted)", marginTop: 4, letterSpacing: "0.04em" }}>
                  2026
                </div>
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.label}</div>
                <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.55, margin: 0 }}>{t.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
