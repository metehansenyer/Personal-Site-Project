# COMPLETED

Finished work, newest phase last. Open work: [TODO.md](./TODO.md). Plan: [PLAN.md](./PLAN.md).

## Phase 0 - Analysis and planning (lead)

- [x] Audited the Next.js codebase (routes, components, data layer, MDX pipeline, tooling, deploy)
- [x] Stack decision: Astro 7, static output, pure Astro components (no UI framework) - rationale in PLAN.md
- [x] Decided to move project metadata into an Astro content collection
- [x] Wrote PLAN.md / TODO.md / COMPLETED.md

## Phase 1 - Foundation (coder: Sonnet, reviewed by lead)

- [x] Removed Next.js / React dependencies and files (`next.config.ts`, `postcss.config.mjs`, `src/proxy.ts`, root layout, old home page, `not-found`, `sitemap.ts`)
- [x] Installed Astro 7.4, `@astrojs/mdx`, `@astrojs/markdown-remark`, `@astrojs/check`, `@tailwindcss/vite`, `@fontsource-variable/inter`, sharp, typescript-eslint, eslint-plugin-astro, prettier-plugin-astro
- [x] `astro.config.ts` (static output, MDX, Tailwind vite plugin, remote image domains), `tsconfig.json` (astro strict, `@/*` alias), scripts, `.gitignore`
- [x] `src/styles/global.css` (1:1 port + self-hosted Inter), `src/styles/markdown-overrides.css`
- [x] `src/layouts/BaseLayout.astro` (SEO/OG/Twitter meta, canonical, JSON-LD, Font Awesome kit, production-only Umami)
- [x] Data modules moved to `src/data/`, `src/lib/site.ts`
- [x] `Button.astro`, home page `src/pages/index.astro`; `pnpm build` and `pnpm check` green

Findings worth remembering:

- Astro 7 defaults to the Sätteri markdown processor, which has no rehype plugin support. We opt into
  the unified processor (`@astrojs/markdown-remark`) to keep GFM + `rehype-external-links`.
- `@astrojs/check` crashes with a beta `@emnapi/runtime`; pinned via `overrides` in `pnpm-workspace.yaml`.

## Phase 2A - Site chrome + static pages (coder: Sonnet, reviewed by lead)

- [x] `Header.astro` (desktop title row, mobile hamburger menu with a vanilla TS toggle and aria state)
- [x] `Navbar.astro`, `Footer.astro`
- [x] Nav order swap: pure logic in `src/lib/navOrder.ts`, blocking inline script in `NavOrderScript.astro`
      (built from `fn.toString()` of the pure functions - single implementation, no flicker, works without JS/storage)
- [x] `about.astro` (profile photo optimized to 1x/2x webp via `astro:assets`), `contact.astro`, `404.astro`

## Phase 2B - Content + portfolio (coder: Sonnet, reviewed by lead)

- [x] `src/content.config.ts`: `projects` collection, zod schema (`image()` banner, icon-slug enum, coerced date), case-preserving ids
- [x] 9 MDX files moved to `src/content/projects/` with frontmatter; `projects.ts` removed; banners moved to `src/assets/img/`
- [x] `mdx/Icon.astro`, `mdx/Callout.astro`; markdown links open in a new tab via `rehype-external-links`
- [x] `ProjectCard.astro`: one measuring script for all cards, CSS-only hover slide, graceful no-JS fallback
- [x] `portfolio/index.astro`, `portfolio/[repoName].astro` (OG/Twitter meta with optimized absolute banner URL)
- [x] `sitemap.xml.ts` (same URLs / lastmod / changefreq / priority as before)
- [x] `astro` icon added; Personal-Site-Project entry rewritten for the new stack
- [x] Markdown parity: Shiki highlighting and smartypants disabled (old site had neither)

## Phase 2C - Tooling + deploy (coder: Sonnet, reviewed by lead)

- [x] ESLint flat config (typescript-eslint + eslint-plugin-astro + prettier), `.astro` script blocks linted
- [x] Prettier ignores (`dist/`, `.astro/`, `coverage/`, MDX content - prettier can mangle JSX-in-MDX)
- [x] `vitest.config.mts` via Astro `getViteConfig`; Container API rendering proven with a throwaway test
- [x] Dockerfile: node build stage -> `nginx-unprivileged` static stage on port 3000; `docker/nginx.conf`
      (no directory redirects, real 404 status, gzip, immutable cache for `/_astro/*`, security headers)
- [x] `.dockerignore`, `docker-compose.yml` (Next env vars removed, Traefik labels untouched), redundant `.npmrc` removed
- [x] CI workflow and dependabot verified - no change needed

## Phase 2 review (lead)

- [x] `pnpm build` (14 pages), `pnpm check` green
- [x] Fixed: `vitest.config.mts` type error under `astro check`
- [x] Fixed: canonical / `og:url` had a trailing slash (old URLs had none)
- [x] Fixed: nav order swapped on typed URLs / external returns; now only on in-site nav-link clicks, like the old SPA
- [x] Pixel comparison against the old Next.js build, 9 routes x desktop (1440) + mobile (390):
      identical page heights everywhere; about / contact / home / 404 and mobile project pages are pixel-identical;
      remaining differences are sub-0.4% (image resampling) plus the intentionally rewritten Personal-Site-Project page
- [x] Browser behaviour check: nav swap + persistence, mobile menu, card tag overflow, no console errors
- [x] No framework runtime shipped: pages contain only small inline scripts, no JS bundles in `dist/_astro`

## Phase 3 - Integration (coder: Sonnet, reviewed by lead)

- [x] Tests: 60 tests in 4 files - `navOrder` logic (incl. a guard for the `toString()` serialization contract),
      `Icon`, `Callout`, `Button` rendered through the Astro Container API; `passWithNoTests` removed
- [x] Removed the legacy Next.js sources (`src/app/`), `scripts/validate-content.ts`, the unused placeholder image,
      the temporary lint / format / tsconfig ignores and the unused `@vitest/coverage-v8`
- [x] Tailwind class sorting in `.astro` files: `prettier-plugin-astro` pinned to `~0.14.1` (the Tailwind plugin
      does not understand the 1.x AST), Dependabot ignore added; build output byte-identical after re-formatting
- [x] Astro icon switched to a variant that is visible on the dark background
- [x] README.md and CLAUDE.md rewritten for the Astro stack

## Phase 4 - Lead QA

- [x] `pnpm check` (0 errors / warnings / hints), `pnpm test` (60 passed), `pnpm build` (14 pages) all green
- [x] Parity re-check against the old Next.js build, 9 routes x desktop + mobile: home, about, contact, 404 and
      the mobile project pages are pixel-identical; portfolio and desktop project pages differ by at most 0.22%
      of pixels (banner image resampling); the Personal-Site-Project page differs because its text was rewritten
- [x] Behaviour re-check in a browser: nav order swap + persistence, mobile menu, card tag overflow, no console errors
- [x] Build output: 4.4 MB `dist/`, zero `.js` files - pages carry only small inline scripts
- [x] Status codes on the preview server: known routes 200, unknown URL 404, `sitemap.xml` with 13 URLs
- [x] No `next` / `react` / `react-dom` left in `package.json`

## Deployment review (lead)

- [x] Read the official Dokploy docs and compared them with the repo's deploy setup
- [x] Removed the IPv6 `listen` line from `docker/nginx.conf` (nginx would refuse to start in a container
      without IPv6; unnecessary behind Traefik)
- [x] Canonical domain switched to `who.metehansenyer.dev` (config, `robots.txt`, sitemap, canonical / `og:url`, README, content)
- [x] `docker-compose.yml` removed (unused by a Dokploy Application; routing comes from the Domains tab)
- [x] `/healthz` endpoint in `docker/nginx.conf` for the Swarm health check; config re-tested with a local nginx
      against the real `dist/` (200s, no redirect on `/about`, real 404, immutable cache on `/_astro/*`)
- [x] README / CLAUDE.md / Personal-Site-Project content: hosting described as self-hosted Docker + Dokploy; `docker` icon added

## Tooling, CI and tests

- [x] Container API tests for `Header` (no headings, inert closed mobile nav, aria wiring), `BaseLayout` (SEO meta, noindex, JSON-LD, only the Umami third-party script) and `ProjectCard` (loading modes, link, mobile tag row)
- [x] `eslint-plugin-jsx-a11y` enabled through `astro.configs['jsx-a11y-recommended']` (no findings in the current code)
- [x] `package.json`: `private`, `type: module`, `engines.node >=22`; `rehype-external-links` moved to `dependencies`
- [x] `.gitignore` tidied (Next.js / Yarn-era entries removed)
- [x] nginx: `X-Frame-Options: DENY` and `Permissions-Policy` headers
- [x] CI: concurrency (cancels superseded PR runs) and a `docker` job that builds the image and runs `scripts/smoke-test.sh`

## Performance pass

- [x] Font Awesome kit script replaced with inline SVG icons (`FaIcon.astro` + `@fortawesome/free-*-svg-icons`; only the 8 used icons are built in, no render-blocking third-party script); `socialLinks.ts` now holds typed icon definitions
- [x] Technology icons self-hosted in `public/icons/tech/` (no jsDelivr / simpleicons / wikimedia / GitHub hotlinks); the broken zod.dev logo URL replaced by the simpleicons Zod logo
- [x] Markdown and Vercel icons are visible on the dark background (light `fill` in the local SVGs)
- [x] Accessibility: focus outlines and `user-select` fixed in earlier commits
- [x] Portfolio banners: first card `priority`, cards 2-3 eager, the rest lazy; overflow tech tags also reveal on keyboard focus (`group-focus-within`)

## Content management

- [x] Project schema (`lib/projectSchema.ts`, strict): `userName` replaced by optional `repoUrl`; added `demoUrl`, `heading`, `tools`, `draft`, `order`, `updatedDate`, `bannerAlt`, `contactNote`; the file name is only the URL segment now
- [x] `lib/projects.ts`: `getProjects()` (sorted by `order`, then release date; drafts only in dev) used by the portfolio page, the detail page paths and the sitemap (`lastmod` = `updatedDate ?? releaseDate`)
- [x] Detail page (`portfolio/[id].astro`, URLs unchanged) renders the `<h1>` from `heading ?? title`, the technology icons (`<Icon />` bound per page: `technologies` + `tools`), the shared `ProjectContact` block and GitHub / demo buttons from data; the 9 MDX files lost their `# h1`, icon slug lists and contact sections
- [x] Fixed the broken `LICENSE` links in `vlrgg-api.mdx` (now the GitHub licence URL)
- [x] `scripts/check-links.mjs` (`pnpm check:links`, run in CI after the build): resolves internal links, images, fragments and sitemap URLs like nginx and fails on broken ones
- [x] Page texts moved from `aboutContent.ts` / `contactContent.ts` / `notFoundContent.ts`, `routes.ts`, the pages and the components into the strict `site` collection (`src/content/site/tr.json`, `getSiteContent(locale)`); a second locale is now a new JSON file plus the locale code in `lib/locales.ts`
- [x] Tests for `getProjects`, the project and site schemas, `<Icon />` defaults, the footer / contact block and the link checker; rendered Turkish output of the 5 non-project pages is identical to before
