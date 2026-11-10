# PLAN - Next.js -> Astro infrastructure migration

Living document. Owner: team lead (planner/supervisor). Coders: sub-agents.
Status of individual tasks lives in [TODO.md](./TODO.md) and [COMPLETED.md](./COMPLETED.md).

## 1. Goal

Replace the Next.js 16 + React 19 foundation with a lighter, faster stack while keeping
the site visually and functionally identical. The redesign (new UI, lighter animations,
theme options) is a **later** project - this migration only prepares the ground for it.

## 2. Stack decision

| Area          | Before                                     | After                                                          |
| ------------- | ------------------------------------------ | -------------------------------------------------------------- |
| Framework     | Next.js 16 (App Router, standalone server) | **Astro 7** (`output: 'static'`)                               |
| UI layer      | React 19 (client components everywhere)    | **Pure Astro components + small vanilla TS `<script>`s**       |
| Content       | `projects.ts` + `.mdx` + next-mdx-remote   | **Astro content collection** (MDX with typed frontmatter)      |
| Styling       | Tailwind v4 via PostCSS                    | Tailwind v4 via `@tailwindcss/vite`                            |
| Images        | `next/image` (runtime optimizer)           | `astro:assets` (build-time optimization, sharp)                |
| Font          | `next/font/google` (Inter)                 | `@fontsource-variable/inter` (self-hosted)                     |
| Sitemap       | `app/sitemap.ts`                           | `src/pages/sitemap.xml.ts` endpoint (same URL)                 |
| Type check    | `tsc --noEmit`                             | `astro check`                                                  |
| Lint / format | eslint-config-next, prettier               | typescript-eslint + eslint-plugin-astro, prettier-plugin-astro |
| Tests         | vitest + react-dom/server                  | vitest + Astro Container API                                   |
| Runtime       | Node server (`server.js`) in Docker        | Static files served by nginx in Docker (also Vercel-ready)     |

### Why pure Astro (no Preact / Svelte / React / Vue)

The whole site has four pieces of interactivity:

1. Mobile menu open/close toggle
2. Nav button order swap persisted in `sessionStorage`
3. Project card tech-tag overflow measurement + hover slide
4. Image `onerror` fallback to a placeholder

None of these need a component runtime, reactive state tree, or hydration. Each is
10-40 lines of vanilla TypeScript in an Astro `<script>`. Any UI framework would add a
runtime (3 KB Preact - 45 KB React) plus hydration cost for zero benefit. If the future
redesign needs a genuinely stateful widget, an island (Svelte or Preact) can be added to
that single component in minutes - Astro does not lock this decision.

### Why a content collection instead of `projects.ts`

Project metadata moves into the frontmatter of each MDX file. A zod schema validates
it at build time (icon slugs via enum, banner via `image()`), which makes
`scripts/validate-content.ts` redundant. Adding a project becomes: one `.mdx` file + one
banner image.

## 3. Constraints / parity rules

- Same URLs: `/`, `/about`, `/portfolio`, `/portfolio/<repoName>`, `/contact`, `/404`, `/sitemap.xml`, `/robots.txt`.
- Same visuals: Tailwind classes, CSS variables and markdown styles are carried over 1:1.
- Same SEO: titles, descriptions, OpenGraph/Twitter tags, JSON-LD, `lang="tr"`.
- Same analytics: Umami script (production only) and all `data-umami-event*` attributes.
- Font Awesome kit script stays for now (replacing it with inline SVG is in the backlog).
- Package manager stays pnpm. No npm/yarn.
- Astro 7 is newer than most training data - coders must consult the installed
  package / official docs instead of guessing APIs.

## 4. Target structure

```
astro.config.ts
src/
  assets/img/            banners + profile photo (optimized at build)
  components/            *.astro (Button, Header, Navbar, Footer, ProjectCard, mdx/Icon, mdx/Callout)
  content/projects/      *.mdx with frontmatter
  content.config.ts      collection schema
  data/                  icons.ts, routes.ts, socialLinks.ts, aboutContent.ts, ...
  layouts/BaseLayout.astro
  lib/                   site.ts, navOrder.ts (pure logic, unit tested)
  pages/                 index, about, contact, 404, portfolio/index, portfolio/[repoName], sitemap.xml.ts
  styles/                global.css, markdown-overrides.css
public/                  favicon.ico, robots.txt, img/placeholder_img.png
docker/nginx.conf
```

## 5. Phases

| Phase | Scope                                                                                                  | Mode     |
| ----- | ------------------------------------------------------------------------------------------------------ | -------- |
| 0     | Analysis, stack decision, plan docs                                                                    | lead     |
| 1     | Foundation: remove Next, install Astro + all deps, configs, BaseLayout, global CSS, home page builds   | 1 coder  |
| 2A    | Site chrome + static pages: Header/Navbar/Footer/Button, nav-order script, about, contact, 404         | parallel |
| 2B    | Content: collection schema, MDX migration, Icon/Callout, portfolio list + detail, ProjectCard, sitemap | parallel |
| 2C    | Tooling + deploy: ESLint, Prettier, vitest setup, CI, Dockerfile + nginx, dependabot                   | parallel |
| 3     | Integration: tests, README + CLAUDE.md rewrite, dead file cleanup, full `pnpm check/test/build`        | 1 coder  |
| 4     | Lead QA: code review, browser parity check against the old site, fixes                                 | lead     |

File ownership is disjoint between 2A / 2B / 2C so they can run in the same working tree.
Only Phase 1 and Phase 3 may change dependencies in `package.json`.

## 6. Acceptance criteria

- `pnpm check`, `pnpm test`, `pnpm build` all pass.
- No `next`, `react`, `react-dom` in `package.json`.
- Built pages ship no framework runtime JS (only small inline/module scripts).
- Every route renders and matches the old site in a desktop + mobile viewport.
- Docker image serves the static build; unknown URLs return the 404 page with status 404.

## 7. Backlog (after this migration - not in scope)

- New interface design, lighter animations, theme options (light/dark/...).
- Replace Font Awesome kit JS with inline SVG icons.
- Astro view transitions (`ClientRouter`) for page navigation.
- Self-host devicon SVGs instead of loading from jsDelivr.
- Accessibility pass (focus outlines are currently disabled globally, `user-select: none`).
