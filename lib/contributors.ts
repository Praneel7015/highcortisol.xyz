import generated from "@/content/contributors.generated.json";

export type ContributorSquad = "low" | "high" | "both";

export interface Contributor {
  login: string;
  name: string;
  handle: string;
  avatarUrl: string | null;
  htmlUrl: string;
  contributions: number;
  projects: string[];
  squad: ContributorSquad;
  role?: string;
  initials: string;
}

interface ContributorsFile {
  generatedAt: string;
  source: string;
  count: number;
  contributors: Contributor[];
}

const data = generated as ContributorsFile;

export function getContributors(): Contributor[] {
  return data.contributors;
}

export function getContributorsMeta(): { generatedAt: string; source: string } {
  return { generatedAt: data.generatedAt, source: data.source };
}

/** Everyone who shipped a given project, ordered by contributions. */
export function getProjectContributors(slug: string): Contributor[] {
  return data.contributors
    .filter((c) => c.projects.includes(slug))
    .sort((a, b) => b.contributions - a.contributions);
}

/** Ring color for a contributor avatar. `both` → green→red split gradient. */
export function ringFor(squad: ContributorSquad): string {
  if (squad === "low") return "var(--low-text)";
  if (squad === "high") return "var(--high-text)";
  return "conic-gradient(from 220deg, var(--low-text), var(--high-text) 55%, var(--low-text))";
}
