"use client";

import { useState } from "react";
import Link from "next/link";

export interface ProjectVM {
  n: string;
  slug: string;
  title: string;
  month: string;
  squad: "low" | "high";
  summary: string;
  tags: string[];
  liveUrl?: string;
  repoUrl: string;
  label: string;
  bg: string;
  fg: string;
  bd: string;
}

type Filter = "all" | "low" | "high";

export function ProjectsSection({ projects }: { projects: ProjectVM[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const shown =
    filter === "all" ? projects : projects.filter((p) => p.squad === filter);

  const chip = (f: Filter) =>
    filter === f
      ? { background: "var(--accent)", color: "var(--accent-fg)", borderColor: "var(--accent)" }
      : { background: "transparent", color: "var(--muted)", borderColor: "var(--border)" };

  return (
    <section
      id="projects"
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
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 24,
            flexWrap: "wrap",
            marginBottom: "clamp(26px, 4vw, 42px)",
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
            <span
              className="mono"
              style={{ fontSize: 14, letterSpacing: "0.1em", color: "var(--accent-text)" }}
            >
              /02
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
              Projects.
            </h2>
          </div>
          <div className="mono" role="group" aria-label="Filter projects by squad" style={{ display: "flex", gap: 8, fontSize: 12, letterSpacing: "0.06em" }}>
            {(["all", "low", "high"] as Filter[]).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                style={{
                  padding: "8px 16px",
                  cursor: "pointer",
                  borderWidth: 1,
                  borderStyle: "solid",
                  transition: "all var(--dur) var(--ease)",
                  ...chip(f),
                }}
              >
                {f.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div style={{ borderBottom: "1px solid var(--border)" }}>
          {shown.map((p) => (
            <div
              key={p.slug}
              className="proj-row"
              style={{
                position: "relative",
                display: "grid",
                gridTemplateColumns: "76px minmax(0, 1fr) auto",
                gap: "clamp(16px, 3vw, 40px)",
                alignItems: "start",
                padding: "var(--gap-row) 14px",
                borderTop: "1px solid var(--border)",
                overflow: "hidden",
              }}
            >
              <div
                aria-hidden="true"
                className="data-bar"
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: 3,
                  background: p.fg,
                }}
              />
              <div className="mono" style={{ lineHeight: 1.3 }}>
                <div style={{ fontSize: 15, color: "var(--accent-text)" }}>/{p.n}</div>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--muted)",
                    letterSpacing: "0.06em",
                    marginTop: 4,
                  }}
                >
                  {p.month}
                </div>
              </div>
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 12,
                    flexWrap: "wrap",
                    marginBottom: 8,
                  }}
                >
                  <h3 style={{ fontSize: "clamp(20px, 2.4vw, 28px)", fontWeight: 700, letterSpacing: "-0.02em", margin: 0 }}>
                    <Link
                      href={`/projects/${p.slug}`}
                      className="btn-ghost"
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      {p.title}
                    </Link>
                  </h3>
                  <span
                    className="mono"
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.08em",
                      padding: "3px 9px",
                      background: p.bg,
                      color: p.fg,
                      border: `1px solid ${p.bd}`,
                    }}
                  >
                    {p.label}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: 15,
                    lineHeight: 1.5,
                    color: "var(--muted)",
                    margin: "0 0 12px",
                    maxWidth: "60ch",
                    textWrap: "pretty",
                  }}
                >
                  {p.summary}
                </p>
                <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
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
              </div>
              <div
                className="mono"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  alignItems: "flex-end",
                  fontSize: 12,
                  letterSpacing: "0.04em",
                }}
              >
                {p.liveUrl ? (
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="link-live"
                    style={{ color: "var(--accent-text)", textDecoration: "none", whiteSpace: "nowrap" }}
                  >
                    LIVE ↗
                  </a>
                ) : null}
                <a
                  href={p.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="link-code"
                  style={{ color: "var(--fg)", textDecoration: "none", whiteSpace: "nowrap" }}
                >
                  CODE ↗
                </a>
                <Link
                  href={`/projects/${p.slug}`}
                  className="link-code"
                  style={{ color: "var(--muted)", textDecoration: "none", whiteSpace: "nowrap" }}
                >
                  DETAILS →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
