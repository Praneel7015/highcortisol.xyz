import Link from "next/link";
import { Wordmark } from "@/components/wordmark";
import { ThemeToggle } from "@/components/theme-toggle";
import { SITE } from "@/lib/site";

const linkStyle: React.CSSProperties = {
  color: "var(--muted)",
  textDecoration: "none",
};

export function SiteFooter() {
  return (
    <footer style={{ position: "relative", zIndex: 2, borderTop: "1px solid var(--border)" }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "46px clamp(18px, 4vw, 32px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
          flexWrap: "wrap",
        }}
      >
        <Wordmark size={16} />

        <nav
          aria-label="Footer"
          className="mono"
          style={{
            display: "flex",
            gap: 18,
            fontSize: 12,
            letterSpacing: "0.05em",
            flexWrap: "wrap",
          }}
        >
          <Link href="/about" className="btn-ghost" style={linkStyle}>
            ABOUT
          </Link>
          <Link href="/contributors" className="btn-ghost" style={linkStyle}>
            CONTRIBUTORS
          </Link>
          <a
            href={SITE.org}
            target="_blank"
            rel="noreferrer"
            className="btn-ghost"
            style={linkStyle}
          >
            ORG ↗
          </a>
          <a
            href={SITE.profile}
            target="_blank"
            rel="noreferrer"
            className="btn-ghost"
            style={linkStyle}
          >
            @PRANEEL7015 ↗
          </a>
        </nav>

        <div
          className="mono"
          style={{
            fontSize: 12,
            letterSpacing: "0.05em",
            color: "var(--muted)",
            display: "flex",
            alignItems: "center",
            gap: 18,
            flexWrap: "wrap",
          }}
        >
          <span>calm and intense, shipped on the lawn.</span>
          <ThemeToggle />
          <span>© 2026 · APR—NOV</span>
        </div>
      </div>
    </footer>
  );
}
