// Build-time GitHub contributor fetch.
//
// Reads every project's `repoUrl` from content/projects/*.mdx, pulls each repo's
// contributor list, de-dupes by login, merges known alias accounts, derives each
// person's squad(s) as the UNION of the squads of the projects they shipped, and
// caches name + avatar + profile. Writes content/contributors.generated.json.
//
// Run: `node scripts/fetch-contributors.mjs`  (also wired into `prebuild`).
// Set GITHUB_TOKEN (read-only/public) to lift the 60 req/hr anon rate limit.
// On total failure it preserves the existing JSON so a build never breaks.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const PROJECTS_DIR = path.join(ROOT, "content", "projects");
const OUT = path.join(ROOT, "content", "contributors.generated.json");

// Alias accounts → canonical login (lowercased keys). The same human committing
// under two GitHub accounts collapses into one card.
const ALIAS = {
  nikbytesized: "nikhil-yn-aix",
};

// Never surface these (bots, automation). Logins ending in [bot] are auto-dropped.
const GLOBAL_EXCLUDE = new Set(["actions-user", "dependabot", "web-flow"]);

const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || "";
const HEADERS = {
  "User-Agent": "highcortisol-build",
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
};

function canonical(login) {
  return ALIAS[login.toLowerCase()] || login;
}

function isExcluded(login) {
  const l = login.toLowerCase();
  return l.endsWith("[bot]") || GLOBAL_EXCLUDE.has(l);
}

async function gh(url) {
  const res = await fetch(url, { headers: HEADERS });
  if (res.status === 202) {
    // GitHub is computing stats — wait once and retry.
    await new Promise((r) => setTimeout(r, 1500));
    return gh(url);
  }
  if (!res.ok) {
    const err = new Error(`${res.status} ${res.statusText} for ${url}`);
    err.status = res.status;
    throw err;
  }
  return res.json();
}

function parseRepo(repoUrl) {
  const m = repoUrl.match(/github\.com\/([^/]+)\/([^/#?]+)/i);
  if (!m) return null;
  return { owner: m[1], repo: m[2].replace(/\.git$/, "") };
}

async function repoContributors(owner, repo) {
  try {
    const data = await gh(
      `https://api.github.com/repos/${owner}/${repo}/contributors?per_page=100`,
    );
    if (Array.isArray(data) && data.length) {
      return data.map((c) => ({
        login: c.login,
        contributions: c.contributions || 0,
        avatar_url: c.avatar_url,
        html_url: c.html_url,
      }));
    }
  } catch (e) {
    if (e.status !== 404 && e.status !== 204) throw e;
  }
  // Fallback: derive authors from commit history (handles empty/204/404 repos).
  try {
    const commits = await gh(
      `https://api.github.com/repos/${owner}/${repo}/commits?per_page=100`,
    );
    const seen = new Map();
    for (const c of commits) {
      const a = c.author;
      if (!a || !a.login) continue;
      const cur = seen.get(a.login) || {
        login: a.login,
        contributions: 0,
        avatar_url: a.avatar_url,
        html_url: a.html_url,
      };
      cur.contributions += 1;
      seen.set(a.login, cur);
    }
    return [...seen.values()];
  } catch {
    return [];
  }
}

async function userProfile(login) {
  try {
    const u = await gh(`https://api.github.com/users/${login}`);
    return { name: u.name || login, avatar_url: u.avatar_url, html_url: u.html_url };
  } catch {
    return null;
  }
}

function initials(name, login) {
  const src = (name && /[A-Za-z]/.test(name) ? name : login).trim();
  const words = src.split(/[\s_-]+/).filter(Boolean);
  const letters =
    words.length > 1
      ? words[0][0] + words[1][0]
      : src.replace(/[^A-Za-z0-9]/g, "").slice(0, 2);
  return letters.toUpperCase();
}

function deriveSquad(set) {
  const low = set.has("low");
  const high = set.has("high");
  if (low && high) return "both";
  return high ? "high" : "low";
}

async function main() {
  const files = fs.readdirSync(PROJECTS_DIR).filter((f) => f.endsWith(".mdx"));
  const projects = files.map((f) => {
    const { data } = matter(fs.readFileSync(path.join(PROJECTS_DIR, f), "utf8"));
    return data;
  });

  // login → aggregate
  const people = new Map();
  const ensure = (login) => {
    const key = canonical(login);
    if (!people.has(key)) {
      people.set(key, {
        login: key,
        contributions: 0,
        squads: new Set(),
        projects: new Set(),
        avatar_url: null,
        html_url: null,
        role: undefined,
      });
    }
    return people.get(key);
  };

  for (const p of projects) {
    const parsed = parseRepo(p.repoUrl || "");
    if (!parsed) continue;
    const override = p.contributors || {};
    const exclude = new Set(
      (override.exclude || []).map((s) => canonical(s).toLowerCase()),
    );
    const roles = override.roles || {};

    let list = await repoContributors(parsed.owner, parsed.repo);

    // forced add (designers, non-committers)
    for (const login of override.add || []) {
      if (!list.some((c) => canonical(c.login) === canonical(login))) {
        list.push({ login, contributions: 0, avatar_url: null, html_url: null });
      }
    }

    for (const c of list) {
      if (isExcluded(c.login)) continue;
      const key = canonical(c.login);
      if (exclude.has(key.toLowerCase())) continue;
      const rec = ensure(key);
      rec.contributions += c.contributions;
      rec.squads.add(p.squad);
      rec.projects.add(p.slug);
      if (!rec.avatar_url && c.avatar_url) rec.avatar_url = c.avatar_url;
      if (!rec.html_url && c.html_url) rec.html_url = c.html_url;
      // role: match by canonical or raw login (case-insensitive)
      for (const [rk, rv] of Object.entries(roles)) {
        if (canonical(rk).toLowerCase() === key.toLowerCase() && !rec.role) {
          rec.role = rv;
        }
      }
    }
    console.log(
      `  ${parsed.owner}/${parsed.repo} (${p.squad}) → ${list
        .map((c) => c.login)
        .join(", ")}`,
    );
  }

  // enrich with profile (canonical login's real name/avatar)
  const out = [];
  for (const rec of people.values()) {
    const prof = await userProfile(rec.login);
    const name = prof?.name || rec.login;
    out.push({
      login: rec.login,
      name,
      handle: rec.login,
      avatarUrl: prof?.avatar_url || rec.avatar_url || null,
      htmlUrl: prof?.html_url || rec.html_url || `https://github.com/${rec.login}`,
      contributions: rec.contributions,
      projects: [...rec.projects].sort(),
      squad: deriveSquad(rec.squads),
      role: rec.role,
      initials: initials(name, rec.login),
    });
  }

  out.sort(
    (a, b) => b.contributions - a.contributions || a.name.localeCompare(b.name),
  );

  const payload = {
    generatedAt: new Date().toISOString(),
    source: token ? "github-api (auth)" : "github-api (anon)",
    count: out.length,
    contributors: out,
  };

  fs.writeFileSync(OUT, JSON.stringify(payload, null, 2) + "\n");
  console.log(
    `\n✓ wrote ${out.length} contributors → content/contributors.generated.json`,
  );
  for (const c of out) {
    console.log(
      `   ${c.handle.padEnd(16)} ${c.squad.padEnd(5)} ${c.contributions
        .toString()
        .padStart(3)}  [${c.projects.join(", ")}]`,
    );
  }
}

main().catch((err) => {
  console.error("\n✗ contributor fetch failed:", err.message);
  if (fs.existsSync(OUT)) {
    console.error("  keeping existing content/contributors.generated.json");
    process.exit(0);
  }
  // No cache to fall back on — fail the build so it's noticed.
  process.exit(1);
});
