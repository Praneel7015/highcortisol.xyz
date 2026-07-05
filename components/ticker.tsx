const WORDS = [
  "LOW CORTISOL // CALM BUILDS",
  "HIGH CORTISOL // INTENSE SHIPS",
  "9 PROJECTS",
  "APR—JUL 2026",
  "MERGE FAST · REVIEW FASTER",
  "ON THE LAWN",
];
const SEP = "  ◆  ";
const RUN = SEP + WORDS.join(SEP) + SEP;

export function Ticker() {
  return (
    <div
      aria-hidden="true"
      style={{
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        background: "var(--surface)",
        overflow: "hidden",
        padding: "13px 0",
      }}
    >
      <div
        className="mono"
        style={{
          display: "flex",
          width: "max-content",
          animation: "marquee var(--tick-dur) linear infinite",
          fontSize: 13,
          letterSpacing: "0.16em",
          color: "var(--muted)",
        }}
      >
        <span style={{ flex: "none" }}>{RUN}</span>
        <span style={{ flex: "none" }}>{RUN}</span>
      </div>
    </div>
  );
}
