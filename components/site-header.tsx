import { Wordmark } from "@/components/wordmark";

/** Minimal, non-sticky brand mark. Intentionally not a nav bar. */
export function SiteHeader() {
  return (
    <header
      style={{
        position: "relative",
        zIndex: 2,
        maxWidth: 1200,
        margin: "0 auto",
        padding: "20px clamp(18px, 4vw, 32px) 0",
      }}
    >
      <Wordmark size={16} />
    </header>
  );
}
