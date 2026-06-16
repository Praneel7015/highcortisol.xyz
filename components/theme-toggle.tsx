"use client";

import { useTheme, setTheme } from "@/lib/vitals";

/** LIGHT / DARK segmented control. Lives in the footer (the site has no nav). */
export function ThemeToggle() {
  const theme = useTheme();
  const seg = (active: boolean) =>
    active ? "var(--fg)" : "var(--muted)";

  return (
    <div
      role="group"
      aria-label="Color theme"
      style={{
        position: "relative",
        width: 138,
        height: 34,
        border: "1px solid var(--border)",
        background: "var(--surface)",
        flex: "none",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 3,
          left: 3,
          width: 65,
          height: 26,
          background: "var(--surface-2)",
          border: "1px solid var(--border)",
          transition: "transform 0.28s var(--ease)",
          transform: `translateX(${theme === "dark" ? 67 : 0}px)`,
        }}
      />
      <div
        className="mono"
        style={{
          position: "relative",
          display: "flex",
          height: "100%",
          fontSize: 11,
          letterSpacing: "0.06em",
        }}
      >
        <button
          type="button"
          onClick={() => setTheme("light")}
          aria-pressed={theme === "light"}
          style={{
            flex: 1,
            background: "none",
            border: "none",
            cursor: "pointer",
            color: seg(theme === "light"),
          }}
        >
          LIGHT
        </button>
        <button
          type="button"
          onClick={() => setTheme("dark")}
          aria-pressed={theme === "dark"}
          style={{
            flex: 1,
            background: "none",
            border: "none",
            cursor: "pointer",
            color: seg(theme === "dark"),
          }}
        >
          DARK
        </button>
      </div>
    </div>
  );
}
