import { ImageResponse } from "next/og";
import { getProject } from "@/lib/projects";

export const alt = "Project — highcortisol.xyz";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProjectOgImage({ params }: Props) {
  const { slug } = await params;
  const p = getProject(slug);

  const isHigh = p?.squad === "high";
  const accentColor = isHigh ? "#ff8b8b" : "#5fd699";
  const accentBg = isHigh ? "rgba(229,72,77,0.11)" : "rgba(46,180,110,0.1)";
  const accentBorder = isHigh ? "rgba(229,72,77,0.36)" : "rgba(46,180,110,0.34)";
  const glowColor = isHigh ? "rgba(229,72,77,0.2)" : "rgba(33,163,92,0.18)";
  const bpm = p?.bpm ?? (isHigh ? 180 : 58);
  const label = isHigh ? "HIGH CORTISOL" : "LOW CORTISOL";
  const title = p?.title ?? "Project";
  const summary = p?.summary ?? "";
  const month = p?.month ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#08080a",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "60px 72px",
          fontFamily: "monospace",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `linear-gradient(${accentColor}0a 1px, transparent 1px), linear-gradient(90deg, ${accentColor}0a 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
        {/* Aurora */}
        <div
          style={{
            position: "absolute",
            top: -200,
            left: "25%",
            width: 700,
            height: 700,
            borderRadius: "50%",
            background: `radial-gradient(ellipse, ${glowColor} 0%, transparent 70%)`,
          }}
        />
        {/* BPM */}
        <div
          style={{
            position: "absolute",
            top: 60,
            right: 72,
            display: "flex",
            alignItems: "baseline",
            gap: 8,
            color: accentColor,
          }}
        >
          <span style={{ fontSize: 64, fontWeight: 800, letterSpacing: "-0.04em" }}>{bpm}</span>
          <span style={{ fontSize: 14, letterSpacing: "0.1em", opacity: 0.7 }}>BPM</span>
        </div>
        {/* ECG */}
        <svg
          style={{ position: "absolute", top: 48, left: 72, width: 300, height: 72 }}
          viewBox="0 0 300 72"
        >
          <polyline
            points={
              isHigh
                ? "0,36 20,36 30,36 38,4 46,68 54,36 72,36 82,36 90,12 98,58 106,36 140,36 300,36"
                : "0,36 40,36 55,36 65,10 75,62 85,36 120,36 300,36"
            }
            fill="none"
            stroke={accentColor}
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
        {/* Content */}
        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ display: "flex", gap: 12 }}>
            <span
              style={{
                fontSize: 11,
                letterSpacing: "0.08em",
                padding: "4px 10px",
                background: accentBg,
                color: accentColor,
                border: `1px solid ${accentBorder}`,
                display: "flex",
              }}
            >
              {label}
            </span>
            {month && (
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  padding: "4px 10px",
                  background: "transparent",
                  color: "#8e8e98",
                  border: "1px solid #23232a",
                  display: "flex",
                }}
              >
                {month} 2026
              </span>
            )}
          </div>
          <div
            style={{
              fontSize: title.length > 16 ? 64 : 80,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              textTransform: "uppercase",
              color: "#f4f4f5",
              lineHeight: 0.92,
              display: "flex",
            }}
          >
            {title}
          </div>
          {summary && (
            <div style={{ fontSize: 17, color: "#8e8e98", maxWidth: 600, display: "flex", marginTop: 6 }}>
              {summary.length > 100 ? summary.slice(0, 100) + "…" : summary}
            </div>
          )}
          <div style={{ fontSize: 13, color: "#5e5e68", letterSpacing: "0.04em", display: "flex", marginTop: 8 }}>
            highcortisol.xyz
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
