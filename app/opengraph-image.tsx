import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "highcortisol.xyz — two squads, one hormone";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
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
        {/* Grid bg */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(95,214,153,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(95,214,153,0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* Aurora glow */}
        <div
          style={{
            position: "absolute",
            top: -200,
            left: "30%",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(33,163,92,0.18) 0%, transparent 70%)",
          }}
        />
        {/* BPM badge */}
        <div
          style={{
            position: "absolute",
            top: 60,
            right: 72,
            display: "flex",
            alignItems: "baseline",
            gap: 8,
            color: "#5fd699",
          }}
        >
          <span style={{ fontSize: 56, fontWeight: 800, letterSpacing: "-0.04em" }}>58</span>
          <span style={{ fontSize: 14, letterSpacing: "0.1em", opacity: 0.7 }}>BPM</span>
        </div>
        {/* Flat ECG line */}
        <svg
          style={{ position: "absolute", top: 48, left: 72, width: 340, height: 80 }}
          viewBox="0 0 340 80"
        >
          <polyline
            points="0,40 40,40 55,40 65,10 75,65 85,40 120,40 135,40 145,18 155,60 165,40 200,40 340,40"
            fill="none"
            stroke="#5fd699"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
        {/* Main content */}
        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontSize: 13, letterSpacing: "0.1em", color: "#5fd699", display: "flex" }}>
            BIOMETRIC OS · APR—JUN 2026
          </div>
          <div
            style={{
              fontSize: 80,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              textTransform: "uppercase",
              color: "#f4f4f5",
              lineHeight: 0.9,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>highcortisol</span>
            <span style={{ color: "#5fd699" }}>.xyz</span>
          </div>
          <div
            style={{
              fontSize: 18,
              color: "#8e8e98",
              marginTop: 8,
              maxWidth: 560,
              display: "flex",
            }}
          >
            Two squads, one hormone. 7 builds, two nervous systems, one lawn.
          </div>
          <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
            <span
              style={{
                fontSize: 11,
                letterSpacing: "0.08em",
                padding: "5px 12px",
                background: "rgba(46,180,110,0.1)",
                color: "#5fd699",
                border: "1px solid rgba(46,180,110,0.34)",
                display: "flex",
              }}
            >
              LOW CORTISOL
            </span>
            <span
              style={{
                fontSize: 11,
                letterSpacing: "0.08em",
                padding: "5px 12px",
                background: "rgba(229,72,77,0.11)",
                color: "#ff8b8b",
                border: "1px solid rgba(229,72,77,0.36)",
                display: "flex",
              }}
            >
              HIGH CORTISOL
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
