import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

const urlish = z
  .string()
  .regex(/^https?:\/\/.+/i, "must be an http(s) URL");

const ContributorsOverride = z
  .object({
    add: z.array(z.string()).optional(),
    exclude: z.array(z.string()).optional(),
    roles: z.record(z.string(), z.string()).optional(),
  })
  .optional();

export const ProjectFrontmatter = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  squad: z.enum(["low", "high"]),
  month: z.enum(["APR", "MAY", "JUN", "JUL"]),
  order: z.number(),
  summary: z.string().min(1),
  repoUrl: urlish,
  liveUrl: urlish.optional(),
  bpm: z.number().optional(),
  tags: z.array(z.string()).default([]),
  contributors: ContributorsOverride,
});

export type Squad = "low" | "high";
export type Month = "APR" | "MAY" | "JUN" | "JUL";
export type ProjectMeta = z.infer<typeof ProjectFrontmatter> & { bpm: number };
export type ProjectWithBody = ProjectMeta & { body: string };

/** Resting / spiking defaults when a project doesn't pin its own bpm. */
export function defaultBpm(squad: Squad): number {
  return squad === "high" ? 180 : 58;
}

export function squadMeta(squad: Squad) {
  return squad === "low"
    ? {
        label: "LOW CORTISOL",
        bg: "var(--low-bg)",
        fg: "var(--low-text)",
        bd: "var(--low-border)",
      }
    : {
        label: "HIGH CORTISOL",
        bg: "var(--high-bg)",
        fg: "var(--high-text)",
        bd: "var(--high-border)",
      };
}

function readFile(slug: string): ProjectWithBody {
  const full = path.join(PROJECTS_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(full, "utf8");
  const { data, content } = matter(raw);
  const parsed = ProjectFrontmatter.safeParse(data);
  if (!parsed.success) {
    throw new Error(
      `Invalid frontmatter in content/projects/${slug}.mdx:\n` +
        parsed.error.issues
          .map((i) => `  • ${i.path.join(".") || "(root)"}: ${i.message}`)
          .join("\n"),
    );
  }
  const fm = parsed.data;
  if (fm.slug !== slug) {
    throw new Error(
      `Slug mismatch: ${slug}.mdx declares slug "${fm.slug}". Rename one to match.`,
    );
  }
  return {
    ...fm,
    bpm: fm.bpm ?? defaultBpm(fm.squad),
    body: content.trim(),
  };
}

let _cache: ProjectWithBody[] | null = null;

export function getAllProjects(): ProjectWithBody[] {
  if (_cache) return _cache;
  const slugs = fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
  _cache = slugs.map(readFile).sort((a, b) => a.order - b.order);
  return _cache;
}

export function getProjectSlugs(): string[] {
  return getAllProjects().map((p) => p.slug);
}

export function getProject(slug: string): ProjectWithBody | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}

export function getProjectsBySquad(squad: Squad): ProjectWithBody[] {
  return getAllProjects().filter((p) => p.squad === squad);
}
