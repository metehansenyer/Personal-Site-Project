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
