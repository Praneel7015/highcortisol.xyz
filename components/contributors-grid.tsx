import Image from "next/image";
import {
  type Contributor,
  type ContributorSquad,
  ringFor,
} from "@/lib/contributors";

function squadTag(squad: ContributorSquad) {
  if (squad === "low") return { text: "LOW", color: "var(--low-text)" };
  if (squad === "high") return { text: "HIGH", color: "var(--high-text)" };
  return { text: "LOW // HIGH", color: "var(--accent-text)" };
}

export function ContributorCard({ c }: { c: Contributor }) {
  const tag = squadTag(c.squad);
  return (
    <a
      href={c.htmlUrl}
      target="_blank"
      rel="noreferrer"
      className="hov-surface2"
      style={{
        display: "flex",
        gap: 14,
        alignItems: "center",
        padding: 22,
        background: "var(--surface)",
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <span
        aria-hidden={c.avatarUrl ? undefined : "true"}
        style={{
          flex: "none",
          width: 52,
          height: 52,
          borderRadius: "50%",
          background: ringFor(c.squad),
          padding: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow:
            c.squad === "both"
              ? "0 0 14px color-mix(in srgb, var(--high-text) 30%, transparent)"
              : `0 0 14px color-mix(in srgb, ${
                  c.squad === "low" ? "var(--low-text)" : "var(--high-text)"
                } 35%, transparent)`,
      }}
      >
        {c.avatarUrl ? (
          <Image
            src={c.avatarUrl}
            alt={`${c.name} (@${c.handle})`}
            width={48}
            height={48}
            style={{ borderRadius: "50%", display: "block" }}
          />
        ) : (
          <span
            className="mono"
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: "var(--surface-2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              fontWeight: 600,
              color: "var(--fg)",
            }}
          >
            {c.initials}
          </span>
        )}
      </span>
      <span style={{ minWidth: 0 }}>
        <span
          style={{
            display: "block",
            fontSize: 15,
            fontWeight: 600,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {c.name}
        </span>
        <span
          className="mono"
          style={{ display: "block", fontSize: 11, color: "var(--muted)", marginTop: 2 }}
        >
          @{c.handle}
        </span>
        <span
          className="mono"
          style={{
            display: "inline-block",
            fontSize: 10,
            letterSpacing: "0.08em",
            color: tag.color,
            marginTop: 6,
          }}
        >
          {tag.text}
          {c.role ? ` · ${c.role.toUpperCase()}` : ""}
        </span>
      </span>
    </a>
  );
}

export function ContributorsGrid({ contributors }: { contributors: Contributor[] }) {
  return (
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
  );
}
