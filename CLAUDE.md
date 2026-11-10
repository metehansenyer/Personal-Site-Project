# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Astro dev server on http://localhost:4321
pnpm build        # Static production build into dist/
pnpm preview      # Serve dist/ locally (runs as a daemon: `astro preview status` / `astro preview stop`)
pnpm typecheck    # astro check (types for .astro, .ts and content)
pnpm lint         # ESLint check (lint:fix to auto-fix)
pnpm format       # Prettier write (format:check is read-only)
pnpm check        # typecheck + lint + format:check (what CI runs first)
pnpm test         # Vitest, one run (test:watch for watch mode)
```

Package manager: **pnpm** (v12, see `packageManager` in `package.json`). Do not use npm or yarn. Node 22+.
CI (`.github/workflows/ci.yml`) runs `pnpm check`, `pnpm test`, `pnpm build`.

## Astro 7 is newer than most training data

Check the installed packages (`node_modules/astro`, `node_modules/@astrojs/*`) or the official docs instead of guessing APIs. Things that differ from older Astro:

- The default markdown processor is **Sätteri**, which has no remark/rehype plugin support. `astro.config.ts` opts into the unified processor: `markdown.processor: unified({...})` from `@astrojs/markdown-remark` (GFM on, smartypants off, Shiki off, `rehype-external-links` so markdown links open in a new tab). `.mdx` files inherit it.
- `pnpm-workspace.yaml` pins `@emnapi/runtime` through `overrides`. This is required: `astro check` crashes with the beta `@emnapi/runtime` that would otherwise be resolved. Do not remove it. The same file allows install scripts for `esbuild` and `sharp` (`allowBuilds`).
- The Container API is imported as `experimental_AstroContainer` from `astro/container`.

## Architecture

Static site: `output: 'static'`, pure Astro components, **no UI framework** (no React/Preact/Svelte). Interactivity is a few small vanilla TS `<script>` blocks. No database, no API routes, no runtime server.

### Routing (`src/pages/`)

File-based: `index.astro` (`/`), `about.astro`, `contact.astro`, `404.astro`, `portfolio/index.astro`, `portfolio/[repoName].astro` (one page per content-collection entry via `getStaticPaths`), `sitemap.xml.ts` (endpoint; static routes from `src/data/routes.ts` plus one URL per project). `public/robots.txt` and `public/favicon.ico` are static assets. 14 pages are built in total.

### Layout (`src/layouts/BaseLayout.astro`)

Wraps every page: `<head>` SEO (title, description, canonical, Open Graph, Twitter, JSON-LD), Font Awesome kit script, global CSS, production-only Umami script, and the site chrome. Props (all optional): `title`, `description`, `ogType`, `ogImage` (absolute URL), `twitterCard` (`summary` | `summary_large_image`), `pageTitle` (text in the Header), `showChrome` (default `true`; the home page passes `false` to hide Header/Navbar/Footer). Canonical / `og:url` have no trailing slash (the pathname is stripped).

### Components (`src/components/`)

`Header` (desktop title row + mobile hamburger menu, toggled by a vanilla script via `aria-expanded` and swapping each element's `data-closed` / `data-open` class lists), `Navbar`, `Footer`, `Button` (link-button with `href`, `width`, `height`, `fontSize`, `newTab`, `umamiEvent`, `umamiEventData` -> `data-umami-event*` attributes), `ProjectCard` (one measuring script for all cards decides how many tech tags fit; hover slide is CSS-only), `NavOrderScript`, and `mdx/Icon`, `mdx/Callout`.

### Nav order (`src/lib/navOrder.ts` + `src/components/NavOrderScript.astro`)

The three nav pages (`/about`, `/portfolio`, `/contact`) keep a user-specific order in `sessionStorage` (`nav-order`); clicking a nav link records the current path (`nav-prev-path`) and on the next page load the two entries swap. Pure logic (`normalizePath`, `parseStoredOrder`, `swapOrder`, `getNavItems`, `DEFAULT_ORDER`) lives in `navOrder.ts` and is unit tested. `NavOrderScript.astro` emits a **blocking inline script placed right after the nav markup** (so there is no flicker) that is built from `fn.toString()` of those pure functions.

**toString() contract:** `normalizePath`, `parseStoredOrder` and `swapOrder` must stay self-contained plain-ES functions: no imports, module-level values, or calls to each other (everything comes in via parameters), because the serialized source runs without module scope. `navOrder.test.ts` rebuilds each one with `new Function` to enforce this; if that test fails after an edit, you referenced something from outside the function.

### Data layer (`src/data/`, `src/lib/`)

Static TypeScript: `routes.ts` (nav labels, titles, sitemap metadata; single source of truth), `icons.ts` (technology icon registry keyed by slug, e.g. `typescript`, `astro`; `generateAboutTechnologies()` for the About page; exports `IconSlug`), `aboutContent.ts`, `contactContent.ts`, `socialLinks.ts`, `notFoundContent.ts`. `src/lib/site.ts` exports `SITE_URL` / `SITE_NAME` (`SITE_URL` comes from `astro.config.ts` `site`, overridable with the `SITE_URL` env var at build time, default `https://who.metehansenyer.tech`).

### Content collection (`src/content.config.ts`, `src/content/projects/*.mdx`)

One `.mdx` per portfolio project. The entry id is the exact, case-sensitive file name without extension; it is both the URL segment (`/portfolio/<id>`) and the GitHub repo name. Frontmatter is validated at build time with zod:

| Field          | Type                                                              |
| -------------- | ----------------------------------------------------------------- |
| `userName`     | string, GitHub owner of the repo                                  |
| `title`        | string                                                            |
| `description`  | string                                                            |
| `banner`       | image (`image()`; relative path into `src/assets/img/`)           |
| `technologies` | array of icon slugs (enum built from the keys of `data/icons.ts`) |
| `releaseDate`  | date (coerced; used for sorting and sitemap `lastmod`)            |

An unknown icon slug or missing field fails the build, so there is no separate content validation script.

The detail page renders the MDX body inside `.markdown-body` (`github-markdown-css` dark theme, then `src/styles/markdown-overrides.css`, which must come after it) and passes `components={{ Icon, Callout }}`, so MDX files use them without importing:

- `<Icon slugs={['typescript', 'astro']} />` renders linked technology icons (`mdx/Icon.astro`; unknown slugs are skipped with a `console.warn`; plain `<img>` of remote SVGs).
- `<Callout type="important" | "warning" | "note">...</Callout>` renders a highlighted block with a coloured left border and a Turkish label (`mdx/Callout.astro`).

Prettier ignores `src/content/**/*.mdx` on purpose (its MDX formatter can mangle JSX).

### Styling

Tailwind CSS v4 through `@tailwindcss/vite` (configured in `astro.config.ts`; no `tailwind.config.*`). `src/styles/global.css` holds `@import 'tailwindcss'`, the self-hosted Inter font (`@fontsource-variable/inter`) and the CSS variables (`--background-color`, `--text-color`, `--nav-background-color`, ...) used as `bg-(--nav-background-color)` etc. Prettier sorts Tailwind classes in `.astro` files with `prettier-plugin-tailwindcss`; this only works with `prettier-plugin-astro` **0.14.x** (pinned `~0.14.1`; 1.x has a different AST the Tailwind plugin does not understand, and Dependabot ignores `>= 1.0.0`). Do not bump it until the Tailwind plugin supports 1.x. Classes inside `data-open` / `data-closed` attributes and JS strings are not sorted; they are applied by script via `classList`.

Images in `src/assets/img/` go through `astro:assets` (`<Image>`, `getImage`, optimized at build with sharp). Technology icons are remote SVGs from jsDelivr (and simpleicons for Astro) in plain `<img>` tags; `image.domains` in `astro.config.ts` only matters for `astro:assets` remote images.

### Tests

Vitest (`vitest.config.mts` uses Astro's `getViteConfig`, so `.astro` files and the `@/` alias work). Tests are `src/**/*.test.ts`: `lib/navOrder.test.ts` (pure logic + the toString contract) and `components/**` tests that render components with the Container API:

```ts
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
const container = await AstroContainer.create()
const html = await container.renderToString(Button, { props: { ... }, slots: { default: 'Hello' } })
```

### Deploy

`Dockerfile`: node build stage (`pnpm build`, optional `SITE_URL` build arg) -> `nginxinc/nginx-unprivileged` serving `dist/` on port 3000 with `docker/nginx.conf` (no directory redirects, real 404 status with `/404.html`, gzip, immutable cache for `/_astro/*`). `docker-compose.yml` has Traefik labels; leave them alone. The site is also Vercel-ready (static output).

## Adding a project

1. Add a banner image to `src/assets/img/`.
2. Create `src/content/projects/<repoName>.mdx` (file name = repo name, case-sensitive) with the frontmatter above; copy an existing file as a reference. Banner path is relative, e.g. `../../assets/img/<file>.png`.
3. Run `pnpm build` (validates the frontmatter). The project then appears on `/portfolio`, gets `/portfolio/<repoName>`, and is added to the sitemap.

## Adding a technology icon

Add an entry to the `icons` object in `src/data/icons.ts` with `name`, `url`, `imgSrc`, `alt`. The key is the slug used in MDX frontmatter `technologies`, in `<Icon slugs={[...]} />`, and in `aboutContent.ts`. Pick an image that is visible on the dark (`#1f2937` / `#374151`) background and returns an SVG over HTTP.
