import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllProjects, getProject, squadMeta } from "@/lib/projects";
import { getProjectContributors } from "@/lib/contributors";
import { SITE, abs } from "@/lib/site";
import { ContributorCard } from "@/components/contributors-grid";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const sm = squadMeta(p.squad);
  const title = p.title;
  const description = p.summary;
  return {
    title,
    description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title: `${p.title} — highcortisol.xyz`,
      description,
      url: abs(`/projects/${slug}`),
      siteName: SITE.name,
      locale: SITE.locale,
      type: "article",
      tags: p.tags,
    },
    twitter: { card: "summary_large_image", title, description },
    other: { "squad": sm.label },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const sm = squadMeta(p.squad);
  const contributors = getProjectContributors(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: p.title,
    description: p.summary,
    url: p.liveUrl ?? p.repoUrl,
    codeRepository: p.repoUrl,
    keywords: p.tags.join(", "),
    creator: { "@type": "Organization", name: "highcortisol.xyz", url: SITE.url },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(56px, 8vw, 100px) clamp(18px, 4vw, 32px)" }}>

        {/* Back */}
        <nav style={{ marginBottom: 40 }}>
          <Link
            href="/#projects"
            className="mono"
            style={{ fontSize: 12, letterSpacing: "0.1em", color: "var(--muted)", textDecoration: "none" }}
          >
            ← PROJECTS
          </Link>
        </nav>

        {/* Header */}
        <header style={{ marginBottom: "clamp(40px, 6vw, 72px)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", marginBottom: 18 }}>
            <span
              className="mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.08em",
                padding: "4px 10px",
                background: sm.bg,
                color: sm.fg,
                border: `1px solid ${sm.bd}`,
              }}
            >
              {sm.label}
            </span>
            <span className="mono" style={{ fontSize: 12, color: "var(--muted)", letterSpacing: "0.06em" }}>
              {p.month} 2026
            </span>
          </div>
          <h1
            style={{
              fontSize: "clamp(36px, 7vw, 80px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              textTransform: "uppercase",
              margin: "0 0 22px",
              lineHeight: 0.96,
            }}
          >
            {p.title}
          </h1>
          <p
            style={{
              fontSize: "clamp(16px, 2vw, 20px)",
              lineHeight: 1.55,
              color: "var(--muted)",
              maxWidth: "56ch",
              margin: 0,
            }}
          >
            {p.summary}
          </p>

          {/* Tags */}
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginTop: 20 }}>
            {p.tags.map((t) => (
              <span
                key={t}
                className="mono"
                style={{
                  fontSize: 11,
                  color: "var(--muted)",
                  border: "1px solid var(--border)",
                  padding: "3px 8px",
                  letterSpacing: "0.03em",
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Links */}
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 28 }}>
            {p.liveUrl && (
              <a
                href={p.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  padding: "13px 26px",
                  background: "var(--accent)",
                  color: "var(--accent-fg)",
                  textDecoration: "none",
                }}
              >
                LIVE DEMO ↗
              </a>
            )}
            <a
              href={p.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost"
              style={{
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.04em",
                padding: "13px 26px",
                background: "transparent",
                color: "var(--fg)",
                border: "1px solid var(--border)",
                textDecoration: "none",
              }}
            >
              VIEW CODE ↗
            </a>
          </div>
        </header>

        {/* Body */}
        {p.body && (
          <div
            className="prose"
            style={{ marginBottom: "clamp(40px, 6vw, 72px)" }}
            dangerouslySetInnerHTML={{ __html: renderMdxBody(p.body) }}
          />
        )}

        {/* Contributors */}
        {contributors.length > 0 && (
          <section style={{ borderTop: "1px solid var(--border)", paddingTop: "clamp(32px, 5vw, 56px)" }}>
            <h2
              className="mono"
              style={{
                fontSize: 12,
                letterSpacing: "0.1em",
                color: "var(--accent-text)",
                textTransform: "uppercase",
                margin: "0 0 20px",
              }}
            >
              CONTRIBUTORS · {contributors.length}
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
                gap: 1,
                background: "var(--border)",
                border: "1px solid var(--border)",
              }}
            >
              {contributors.map((c) => (
                <ContributorCard key={c.login} c={c} />
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}

/** Minimal markdown→HTML for project body (headings, paragraphs, code). */
function renderMdxBody(raw: string): string {
  return raw
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/^(?!<[h|u|o|p|c])(.+)$/gm, "<p>$1</p>")
    .replace(/<p><\/p>/g, "");
}
