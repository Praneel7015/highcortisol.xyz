import { SITE } from "@/lib/site";
import { EcgMonitorLazy } from "@/components/ecg-monitor-lazy";
import { Scramble } from "@/components/scramble";
import { Counter } from "@/components/counter";
import { LiveBpm, LiveStatus } from "@/components/live";

const readoutCell: React.CSSProperties = {
  background: "var(--surface)",
  padding: "14px 16px",
};
const readoutLabel: React.CSSProperties = {
  fontSize: 10,
  letterSpacing: "0.12em",
  color: "var(--muted)",
  marginBottom: 6,
};
const readoutValue: React.CSSProperties = {
  fontSize: 24,
  fontWeight: 600,
};

export function Hero() {
  return (
    <header
      id="home"
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding:
          "clamp(28px, 4vw, 56px) clamp(18px, 4vw, 32px) clamp(40px, 5vw, 72px)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "clamp(28px, 4vw, 56px)",
          alignItems: "center",
        }}
      >
        <div>
          <div
            className="mono"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              fontSize: 12,
              letterSpacing: "0.14em",
              color: "var(--muted)",
              border: "1px solid var(--border)",
              padding: "7px 13px",
              marginBottom: 30,
            }}
          >
            <span style={{ color: "var(--accent-text)" }}>SYS://</span>
            {SITE.period}
            <span
              aria-hidden="true"
              style={{
                width: 7,
                height: 14,
                background: "var(--accent-text)",
                animation: "caret 1s steps(1) infinite",
              }}
            />
          </div>

          <h1
            style={{
              fontSize: "clamp(46px, 9vw, 108px)",
              fontWeight: 800,
              lineHeight: 0.9,
              letterSpacing: "-0.045em",
              textTransform: "uppercase",
              margin: "0 0 26px",
            }}
          >
            <Scramble
              text="Two squads."
              delay={0}
              style={{
                display: "block",
                animation: "rgbsplit 0.42s steps(2) infinite",
              }}
            />
            <Scramble
              text="One hormone."
              delay={220}
              style={{
                display: "block",
                color: "var(--accent-text)",
                animation: "rgbsplit 0.42s steps(2) infinite 0.1s",
              }}
            />
          </h1>

          <p
            style={{
              fontSize: "clamp(16px, 1.7vw, 20px)",
              lineHeight: 1.55,
              color: "var(--muted)",
              maxWidth: "46ch",
              margin: "0 0 32px",
              textWrap: "pretty",
            }}
          >
            Cortisol is the stress hormone. We build at both ends of it —{" "}
            <span style={{ color: "var(--low-text)" }}>Low&nbsp;Cortisol</span>{" "}
            ships calm,{" "}
            <span style={{ color: "var(--high-text)" }}>High&nbsp;Cortisol</span>{" "}
            ships intense. Same collective, opposite nervous systems.
          </p>

          <div
            style={{
              display: "flex",
              gap: 13,
              flexWrap: "wrap",
              alignItems: "center",
              marginBottom: 34,
            }}
          >
            <a
              href="#projects"
              className="btn-primary"
              style={{
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "0.02em",
                padding: "14px 26px",
                background: "var(--accent)",
                color: "var(--accent-fg)",
                textDecoration: "none",
              }}
            >
              SEE THE WORK →
            </a>
            <a
              href={SITE.org}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost"
              style={{
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "0.02em",
                padding: "14px 26px",
                background: "transparent",
                color: "var(--fg)",
                border: "1px solid var(--border)",
                textDecoration: "none",
              }}
            >
              GITHUB ↗
            </a>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 1,
              background: "var(--border)",
              border: "1px solid var(--border)",
              maxWidth: 420,
            }}
          >
            <div style={readoutCell}>
              <div className="mono" style={readoutLabel}>
                HEART RATE
              </div>
              <div
                className="mono"
                style={{ ...readoutValue, color: "var(--accent-text)" }}
              >
                <LiveBpm />
              </div>
            </div>
            <div style={readoutCell}>
              <div className="mono" style={readoutLabel}>
                STATE
              </div>
              <div
                className="mono"
                style={{
                  ...readoutValue,
                  color: "var(--accent-text)",
                  animation: "rgbsplit 0.5s steps(2) infinite",
                }}
              >
                <LiveStatus />
              </div>
            </div>
            <div style={readoutCell}>
              <div className="mono" style={readoutLabel}>
                BUILDS
              </div>
              <Counter value={7} className="mono" style={readoutValue} />
            </div>
          </div>
        </div>

        <EcgMonitorLazy />
      </div>
    </header>
  );
}
