import type { Metadata } from "next";
import { getContributors, getContributorsMeta } from "@/lib/contributors";
import { SITE } from "@/lib/site";
import { ContributorsGrid } from "@/components/contributors-grid";

export const metadata: Metadata = {
  title: "Contributors",
  description: "Every human who shipped on the lawn. Low Cortisol and High Cortisol squads.",
  alternates: { canonical: "/contributors" },
  openGraph: {
    title: "Contributors — highcortisol.xyz",
    description: "Every human who shipped on the lawn.",
    url: `${SITE.url}/contributors`,
    siteName: SITE.name,
    locale: SITE.locale,
    type: "website",
  },
};

export default function ContributorsPage() {
  const contributors = getContributors();
  const meta = getContributorsMeta();
  const low = contributors.filter((c) => c.squad === "low");
  const high = contributors.filter((c) => c.squad === "high");

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(56px, 8vw, 100px) clamp(18px, 4vw, 32px)" }}>

      {/* Header */}
      <header style={{ marginBottom: "clamp(40px, 6vw, 72px)" }}>
        <span className="mono" style={{ fontSize: 14, letterSpacing: "0.1em", color: "var(--accent-text)", display: "block", marginBottom: 12 }}>
          /contributors
        </span>
        <h1
          style={{
            fontSize: "clamp(36px, 7vw, 80px)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            textTransform: "uppercase",
            margin: "0 0 16px",
            lineHeight: 0.96,
          }}
        >
          The humans.
        </h1>
        <p style={{ fontSize: 17, color: "var(--muted)", maxWidth: "48ch", margin: 0, lineHeight: 1.55 }}>
          {contributors.length} contributors across two squads. One lawn. Zero framework wars.
        </p>
        <p className="mono" style={{ fontSize: 11, color: "var(--muted)", marginTop: 10, letterSpacing: "0.04em" }}>
          Last synced from GitHub: {new Date(meta.generatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </p>
      </header>

      {/* Both-squad call-out */}
      {contributors.filter((c) => c.squad === "both").length > 0 && (
        <section style={{ marginBottom: "clamp(40px, 5vw, 60px)" }}>
          <h2 className="mono" style={{ fontSize: 12, letterSpacing: "0.1em", color: "var(--accent-text)", margin: "0 0 16px", textTransform: "uppercase" }}>
            LOW // HIGH · BOTH SQUADS
          </h2>
          <ContributorsGrid contributors={contributors.filter((c) => c.squad === "both")} />
        </section>
      )}

      {/* Low squad */}
      <section style={{ marginBottom: "clamp(40px, 5vw, 60px)" }}>
        <h2 className="mono" style={{ fontSize: 12, letterSpacing: "0.1em", color: "var(--low-text)", margin: "0 0 16px", textTransform: "uppercase" }}>
          LOW CORTISOL · {low.length} HUMANS
        </h2>
        <ContributorsGrid contributors={contributors.filter((c) => c.squad === "low")} />
      </section>

      {/* High squad */}
      <section>
        <h2 className="mono" style={{ fontSize: 12, letterSpacing: "0.1em", color: "var(--high-text)", margin: "0 0 16px", textTransform: "uppercase" }}>
          HIGH CORTISOL · {high.length} HUMANS
        </h2>
        <ContributorsGrid contributors={contributors.filter((c) => c.squad === "high")} />
      </section>
    </div>
  );
}
