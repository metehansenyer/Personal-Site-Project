# TODO

Open work only. Finished items move to [COMPLETED.md](./COMPLETED.md). Plan: [PLAN.md](./PLAN.md).

Legend: `[ ]` open, `[~]` in progress, `[!]` blocked / needs rework

## Phase 1 - Foundation

- [~] Remove Next.js/React deps and files (`next.config.ts`, `postcss.config.mjs`, `src/proxy.ts`, `src/app/layout.tsx`, ...)
- [~] Install Astro 7 + mdx + tailwind vite plugin + fontsource Inter + check/lint/format/test deps
- [~] `astro.config.ts`, `tsconfig.json`, `package.json` scripts, `.gitignore`
- [~] `src/styles/global.css`, `src/layouts/BaseLayout.astro` (meta, OG, JSON-LD, FA kit, Umami)
- [~] Move data modules to `src/data/`, `src/lib/site.ts`
- [~] Home page (`src/pages/index.astro`) + minimal `Button.astro`; `pnpm build` green

## Phase 2A - Site chrome + static pages

- [ ] `Header.astro` (desktop title, mobile menu toggle script)
- [ ] `Navbar.astro` + nav-order swap (`src/lib/navOrder.ts` + inline script, sessionStorage)
- [ ] `Footer.astro`
- [ ] `about.astro` (optimized profile photo), `contact.astro`, `404.astro`

## Phase 2B - Content + portfolio

- [ ] `src/content.config.ts` projects collection (zod schema, `image()` banner, icon slug enum)
- [ ] Move 9 MDX files to `src/content/projects/` with frontmatter; banners to `src/assets/img/`
- [ ] `mdx/Icon.astro`, `mdx/Callout.astro`, external-link handling for markdown anchors
- [ ] `ProjectCard.astro` (tag overflow measurement + hover script)
- [ ] `portfolio/index.astro`, `portfolio/[repoName].astro` (OG/Twitter meta, banner fallback)
- [ ] `sitemap.xml.ts`
- [ ] Add `astro` icon; update Personal-Site-Project entry to describe the new stack

## Phase 2C - Tooling + deploy

- [ ] ESLint flat config (typescript-eslint + eslint-plugin-astro + prettier)
- [ ] Prettier config with `prettier-plugin-astro` + tailwind plugin
- [ ] `vitest.config.ts` via `getViteConfig`
- [ ] Dockerfile (multi-stage, nginx static) + `docker/nginx.conf` + docker-compose + `.dockerignore`
- [ ] CI workflow, dependabot ignore rules

## Phase 3 - Integration

- [ ] Tests: Icon, Callout (Container API), navOrder logic
- [ ] Remove `scripts/validate-content.ts` and leftover `src/app/`
- [ ] Rewrite README.md and CLAUDE.md for the Astro stack
- [ ] `pnpm check && pnpm test && pnpm build` green

## Phase 4 - Lead QA

- [ ] Code review of all coder output
- [ ] Browser parity check (desktop + mobile) against the old Next.js site
- [ ] JS payload / build output inspection
- [ ] Final docs update, push
