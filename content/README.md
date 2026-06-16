# Content model

Everything on the site that isn't fetched live from GitHub lives here as flat
files. **Adding a project is one file** — drop an `.mdx` into
`content/projects/`, fill the frontmatter, and it shows up in the squad split,
the projects "vitals" list, the timeline, the sitemap, the contributor fetch,
and gets its own `/projects/<slug>` detail page with a generated OG image.

## `content/projects/*.mdx`

Frontmatter is validated with [Zod](https://zod.dev) in `lib/projects.ts`. A
build will **fail loudly** if a file is malformed — that's intentional.

```yaml
---
title: "flowforge"                 # display name (we render it lowercase)
slug: "flowforge"                  # URL slug; must match the filename
squad: "high"                      # "low" | "high"  → green | red
month: "MAY"                       # "APR" | "MAY" | "JUN"  (drives ordering + timeline)
order: 1                           # sort order within the list
summary: "One-line description shown on cards and in the squad split."
repoUrl: "https://github.com/Praneel7015/flowforge"   # required
liveUrl: "https://flowforge-ten.vercel.app"           # optional — renders a LIVE ↗ link
bpm: 188                           # optional flourish; defaults by squad (high≈180, low≈58)
tags: ["ai", "ci/cd", "low-code"]  # optional mono tag chips
contributors:                      # optional override of the auto-fetched list
  add: ["github-login"]            #   force-include these logins on this project
  exclude: ["some-bot"]            #   drop these logins from this project
  roles:                           #   label a person on this project
    github-login: "Design"
---

Long-form MDX write-up goes here. Standard markdown + JSX.
```

### Field reference

| field          | type                        | required | notes                                            |
| -------------- | --------------------------- | -------- | ------------------------------------------------ |
| `title`        | string                      | ✅       | rendered lowercase to match the design voice     |
| `slug`         | string                      | ✅       | unique; matches filename; used in the URL        |
| `squad`        | `"low"` \| `"high"`         | ✅       | low → green, high → red                          |
| `month`        | `"APR"` \| `"MAY"` \| `"JUN"` | ✅      | also feeds the timeline                          |
| `order`        | number                      | ✅       | ascending sort                                   |
| `summary`      | string                      | ✅       | card + meta description                          |
| `repoUrl`      | url                         | ✅       | drives the GitHub contributor fetch              |
| `liveUrl`      | url                         | —        | shows a `LIVE ↗` link when present               |
| `bpm`          | number                      | —        | vitals flourish; derived from squad if omitted   |
| `tags`         | string[]                    | —        | mono chips on the project row + detail page      |
| `contributors` | object                      | —        | per-project `add` / `exclude` / `roles` override |

## `content/contributors.generated.json`

Built by `npm run fetch:contributors` (also runs automatically in `prebuild`).
It reads every project's `repoUrl`, pulls each repo's GitHub contributor list,
de-dupes by login, merges known alias accounts, derives each person's squad(s)
as the **union** of the squads of the projects they shipped, and caches names +
avatars. **Never edit it by hand** — edit a project's `contributors` override or
the alias/seed map in `lib/github.ts` instead, then re-run the fetch.

Set `GITHUB_TOKEN` (read-only, public scope) to avoid the 60 req/hr
unauthenticated rate limit. If the fetch fails, the committed JSON is used as-is.
