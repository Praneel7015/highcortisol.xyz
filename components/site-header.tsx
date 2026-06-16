import { Wordmark } from "@/components/wordmark";
import { ThemeToggle } from "@/components/theme-toggle";

/** Minimal brand mark + theme toggle. Intentionally not a nav bar. */
export function SiteHeader() {
  return (
    <header
      style={{
        position: "relative",
        zIndex: 2,
        maxWidth: 1200,
        margin: "0 auto",
        padding: "20px clamp(18px, 4vw, 32px) 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
      }}
    >
      <Wordmark size={16} />
      <ThemeToggle />
    </header>
  );
}
