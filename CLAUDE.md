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
pnpm check        # typecheck + lint (incl. jsx-a11y) + format:check (what CI runs first)
pnpm test         # Vitest, one run (test:watch for watch mode)
pnpm check:links  # internal link checker over dist/ (run after pnpm build)
```

Package manager: **pnpm** (v12, see `packageManager` in `package.json`). Do not use npm or yarn. Node 22+.
CI (`.github/workflows/ci.yml`) has two jobs: `verify` runs `pnpm check`, `pnpm test`, `pnpm build`, `pnpm check:links`; `docker` builds the image, starts it and runs `scripts/smoke-test.sh` against it. A newer run on the same ref cancels the older one for pull requests only. Locally: `docker build -t site . && docker run -d -p 3000:3000 --name site site && bash scripts/smoke-test.sh` (then `docker rm -f site`).

## Astro 7 is newer than most training data

Check the installed packages (`node_modules/astro`, `node_modules/@astrojs/*`) or the official docs instead of guessing APIs. Things that differ from older Astro:

- The default markdown processor is **Sätteri**, which has no remark/rehype plugin support. `astro.config.ts` opts into the unified processor: `markdown.processor: unified({...})` from `@astrojs/markdown-remark` (GFM on, smartypants off, Shiki off, `rehype-external-links` so markdown links open in a new tab). `.mdx` files inherit it.
- `pnpm-workspace.yaml` pins `@emnapi/runtime` through `overrides`. This is required: `astro check` crashes with the beta `@emnapi/runtime` that would otherwise be resolved. Do not remove it. The same file allows install scripts for `esbuild` and `sharp` (`allowBuilds`).
- The Container API is imported as `experimental_AstroContainer` from `astro/container`.

## Architecture

Static site: `output: 'static'`, pure Astro components, **no UI framework** (no React/Preact/Svelte). Interactivity is a few small vanilla TS `<script>` blocks. No database, no API routes, no runtime server.

### Languages (Turkish default, English under `/en`)

Two locales, listed in `src/lib/locales.ts` (`LOCALES`, `DEFAULT_LOCALE = 'tr'`). Turkish stays at the original un-prefixed URLs and never redirects; English lives under `/en` (`/en`, `/en/about`, `/en/portfolio`, `/en/contact`, `/en/portfolio/<id>`). Static output only: no Accept-Language redirect, no client-side auto redirect.

- **Routing:** every page exists once, as `src/pages/[...locale]/<page>.astro`. Its `getStaticPaths` (`localeStaticPaths()` from `lib/i18n.ts`) yields `params.locale` = `undefined` for Turkish (matches `/about`) and `'en'` (matches `/en/about`), plus `props.locale`. The page declares `interface Props { locale: Locale }`, calls `getSiteContent(locale)` and passes `locale` to `BaseLayout`. No page logic is duplicated per locale. Astro's own `i18n` config is deliberately **not** enabled: for a static site with an un-prefixed default locale it would add nothing we use (no `Astro.currentLocale`, no middleware) but brings redirect / fallback machinery; `lib/i18n.ts` does the little that is needed.
- **URL helpers (`src/lib/i18n.ts`, pure, unit tested):** `getLocaleFromPath`, `stripLocale` (`/en/about` -> `/about`, `/en` -> `/`), `localizePath` (`localizePath('/about', 'en')` -> `/en/about`; default locale un-prefixed; English home is `/en`), `getAlternates(pathname)` (the same page in every locale), `localeStaticPaths()`. Always build internal links with `localizePath(path, locale)`, never by hand.
- **404:** nginx serves the single `/404.html` for every missing URL (also under `/en/`), so `404.astro` is one page: Turkish header/nav, the message in every locale (Turkish first, each paragraph with its own `lang`), `noindex`, no switcher, no JS.
- **Adding a locale:** add the code and its names to `locales.ts`, a `src/content/site/<code>.json`, and optionally project translations under `src/content/project-translations/<code>/`. Routes, sitemap, hreflang, switcher and nav order follow `LOCALES`; `lib/navOrder.ts` derives the prefixes to strip from it.

### Routing (`src/pages/`)

File-based: `[...locale]/index.astro` (`/` and `/en`), `[...locale]/about.astro`, `[...locale]/contact.astro`, `[...locale]/portfolio/index.astro`, `[...locale]/portfolio/[id].astro` (one page per project and locale via `getStaticPaths`; `id` is the entry id = file name, so URLs are `/portfolio/<file name>` and `/en/portfolio/<file name>`), `404.astro` (one shared page), `sitemap.xml.ts` (endpoint; every static route from `src/data/routes.ts` and every project from `getProjects()` once per locale, each `<url>` with `xhtml:link rel="alternate" hreflang` entries for all locales plus `x-default` = the Turkish URL; no changefreq/priority, `lastmod` only for projects = `updatedDate ?? releaseDate`), `robots.txt.ts` (endpoint; Sitemap line built from `SITE_URL`). `public/favicon.ico` is a static asset. 27 pages are built in total (13 Turkish + 13 English + 404; 13 = 4 pages + 9 projects).

### Layout (`src/layouts/BaseLayout.astro`)

Wraps every page: `<head>` SEO (title, description, canonical, Open Graph, Twitter, JSON-LD), global CSS, production-only Umami script, and the site chrome. Props (all optional): `title`, `description` (default: `description` of the site content), `locale` (default `tr`; selects the site content, `<html lang>`, `og:locale`, JSON-LD texts), `ogType`, `ogImage` (absolute URL; default is `src/assets/img/home_page.png` via `getImage`, PNG 1200 wide) with `ogImageWidth` / `ogImageHeight`, `pageTitle` (text in the Header), `showChrome` (default `true`; the home page passes `false` to hide Header/Navbar/Footer), `noindex` (robots noindex, no canonical / `og:url`, no hreflang, no language switcher; used by 404), `jsonLd` (emit the Person JSON-LD; home and about only). The layout loads the site content once and hands the strings to Header / Navbar / Footer as props. Twitter tags are always emitted (`summary_large_image`). Canonical / `og:url` have no trailing slash (the pathname is stripped) and are the page's own URL in its own locale. Every indexable page also gets `<link rel="alternate" hreflang>` for each locale plus `x-default` (the Turkish URL) and `og:locale:alternate`. The language switcher is rendered in the Header (desktop and mobile) or, on the chrome-less home page, in the top-right corner. Page titles are built with `documentTitle(page)` from `lib/site.ts` (`<page> | Metehan Şenyer`).

### Components (`src/components/`)

`LanguageSwitcher` (`TR | EN` links to the same page in every locale: `role="group"` labelled by `languageSwitcher.label`, each link with `lang` / `hreflang` / the language's own name as `aria-label`, `aria-current="true"` on the current one; plain links outside `[data-nav-list]`, so switching language never touches the nav order), `Header` (takes `navLabels`, `labels` and an optional `switcher` prop; desktop title row with the switcher next to the site name + mobile hamburger menu with the switcher between title and button, toggled by a vanilla script via `aria-expanded` and swapping each element's `data-closed` / `data-open` class lists), `Navbar` (`navLabels` prop), `Footer` (`labels` prop; sentences are `{token}` templates), `ProjectContact` (shared closing contact block of a project page), `FaIcon` (inline SVG for a Font Awesome Free icon definition: `<FaIcon icon={faHeart} class="..." flip />`; 1em high, `currentColor`, `aria-hidden`), `Button` (link-button with `href`, `width`, `height`, `fontSize`, `newTab`, `umamiEvent`, `umamiEventData` -> `data-umami-event*` attributes), `ProjectCard` (takes `bannerAlt`, the localized `href` and `contentLang` (set when the card shows fallback Turkish text) props; one measuring script for all cards decides how many tech tags fit; hover slide is CSS-only), `NavOrderScript`, and `mdx/Icon`, `mdx/Callout`. Components never read the content collection themselves; pages and the layout fetch the strings and pass them down, so components render in Container API tests without Astro's content store.

### Nav order (`src/lib/navOrder.ts` + `src/components/NavOrderScript.astro`)

The three nav pages (`/about`, `/portfolio`, `/contact`) keep a user-specific order in `sessionStorage` (`nav-order`); clicking a nav link records the current path (`nav-prev-path`) and on the next page load the two entries swap. Stored and recorded paths are **locale-independent** (`/about`, never `/en/about`): the script maps the current URL and every link `href` through `stripLocalePrefix` first, so one order is shared by both languages and survives a language switch. Pure logic (`normalizePath`, `stripLocalePrefix`, `parseStoredOrder`, `swapOrder`, `getNavItems`, `DEFAULT_ORDER`, `LOCALE_PREFIXES`) lives in `navOrder.ts` and is unit tested. `NavOrderScript.astro` emits a **blocking inline script placed right after the nav markup** (so there is no flicker) that is built from `fn.toString()` of those pure functions.

**toString() contract:** `normalizePath`, `stripLocalePrefix`, `parseStoredOrder` and `swapOrder` must stay self-contained plain-ES functions: no imports, module-level values, or calls to each other (everything comes in via parameters), because the serialized source runs without module scope. `navOrder.test.ts` rebuilds each one with `new Function` to enforce this; if that test fails after an edit, you referenced something from outside the function.

### Data layer (`src/data/`, `src/lib/`)

Static TypeScript for language-independent data: `routes.ts` (paths, `key`, `showInNav`, `getRoute(path)` that throws on unknown paths, `RouteLabels` type; single source of truth, also used by the home buttons and sitemap), `icons.ts` (technology icon registry keyed by slug, e.g. `typescript`, `astro`; `generateAboutTechnologies()`; exports `IconSlug`), `profile.ts` (`aboutTechnologies`, the About page slug list), `socialLinks.ts`. `src/lib/site.ts` exports `SITE_URL` / `SITE_NAME` / `CONTACT_EMAIL` / `documentTitle` (`SITE_URL` is `import.meta.env.SITE`, i.e. `astro.config.ts` `site`, overridable with the `SITE_URL` env var at build time, default `https://who.metehansenyer.dev`; it throws if `site` is unset).

`src/lib/`: `content.ts` (`getSiteContent(locale = 'tr')`, the typed accessor of the `site` collection, and `getRouteLabels()`), `siteSchema.ts` (strict zod schema of the site texts), `projectSchema.ts` (strict zod schema of the project frontmatter), `projectTranslationSchema.ts` (strict zod schema of the translation frontmatter), `projects.ts` (`getProjects(locale)`, `localizeProjects`, `renderProject`, `sortProjects`, `lastModified`, `getBannerAlt`), `i18n.ts` (URL helpers, see Languages), `mdxComponents.ts` (`createMdxComponents()`, see below), `format.ts` (`format()` fills `{name}` placeholders, `splitTemplate()` splits at tokens), `locales.ts` (`LOCALES`, `DEFAULT_LOCALE`, `LOCALE_NAMES`, `LOCALE_LABELS`). `src/lib/site.ts` also exports `absoluteUrl(path)`.

`scripts/check-links.mjs` (`pnpm check:links`) walks `dist/**/*.html`, resolves every internal `href` / `src` / `srcset` the way nginx serves it (`$uri`, `$uri/index.html`, `$uri.html`), checks `#fragment`s against ids on the target page and the sitemap URLs, and exits 1 listing page + broken link. Run it after `pnpm build`; its logic is unit tested in `scripts/check-links.test.ts`.

### Site texts (`src/content/site/<locale>.json`)

Every user-visible string that is not project content (page meta titles/descriptions, nav labels, About / Contact / 404 / home texts, Header / Footer / Callout / button labels, aria-labels, JSON-LD job title, `<html lang>`, `og:locale`, the shared project contact block) lives in the `site` data collection: one JSON file per locale, validated by `lib/siteSchema.ts` (`z.strictObject`, so an unknown or missing key fails the build). `tr.json` and `en.json` exist; `en.json` must have exactly the key structure of `tr.json` and the same `{placeholders}` per string (`lib/content.test.ts` checks both). Strings with `{name}` placeholders are filled with `format()` (e.g. `project.bannerAlt` = `{title} banner`); `footer.*` sentences are split with `splitTemplate()` so markup can sit at the tokens. **Do not hard-code visible text in components or pages: add a key to the schema and to every locale file.** Names that are not translated (`SITE_NAME`, `CONTACT_EMAIL`, social link names) stay in `lib/site.ts` / `socialLinks.ts`. Adding a locale: see Languages.

**Adding / changing a UI text:** edit `src/lib/siteSchema.ts` (add or rename the key), then **both** `src/content/site/tr.json` and `src/content/site/en.json` (same key, same `{placeholders}`), then use it from the page / component via the `content` object passed down as a prop. `pnpm check` and the parity tests in `lib/content.test.ts` fail if one locale is missing a key or a placeholder. The English home headline is `home.headline` (short words, it must fit the big-type layout). Link targets are never texts: use `localizePath()`.

Tests cannot use the content store (it is empty under Vitest): `src/test/siteContent.ts` loads and validates the real JSON file (`loadSiteContent()`) and exports `astroContentMock` for `vi.mock('astro:content', ...)` in tests that render `BaseLayout`.

### Content collections (`src/content.config.ts`: `projects`, `projectTranslations`, `site`)

`src/content/projects/*.mdx` is the **canonical** entry of a portfolio project (Turkish text plus all data). One `.mdx` per project. The entry id is the exact, case-sensitive file name without extension and is the URL segment (`/portfolio/<id>`); it is **not** assumed to be the repo name (see `repoUrl`). Frontmatter is validated at build time by `lib/projectSchema.ts` (strict: an unknown or misspelled key fails the build):

| Field          | Type                                                                                                    |
| -------------- | ------------------------------------------------------------------------------------------------------- |
| `title`        | string; card title, browser title, header text, and the `<h1>` unless `heading` is set                  |
| `heading`      | optional string; longer `<h1>` of the detail page (falls back to `title`)                               |
| `description`  | string; meta description and card text                                                                  |
| `banner`       | image (`image()`; relative path into `src/assets/img/`)                                                 |
| `bannerAlt`    | optional string; default alt is `site.project.bannerAlt` (`<title> banner`)                             |
| `technologies` | array of icon slugs (enum built from the keys of `data/icons.ts`); card tags and first detail icons     |
| `tools`        | array of icon slugs, default `[]`; further icons on the detail page, after `technologies`               |
| `releaseDate`  | date (coerced; sorting and sitemap `lastmod` fallback)                                                  |
| `updatedDate`  | optional date; sitemap `lastmod` = `updatedDate ?? releaseDate`                                         |
| `order`        | optional number; projects with `order` sort first (ascending), the rest by `releaseDate` descending     |
| `draft`        | boolean, default `false`; drafts are left out of production builds (grid, pages, sitemap), shown in dev |
| `repoUrl`      | optional URL; the GitHub button renders only when set                                                   |
| `demoUrl`      | optional URL; adds a live demo button (`demo-view-click` umami event)                                   |
| `contactNote`  | optional string; project-specific closing sentence shown under the shared contact block                 |

Always get the project list from `getProjects(locale)` (`lib/projects.ts`: merged with the translation, sorted, drafts filtered) instead of `getCollection('projects')`.

**Translations (`projectTranslations`):** `src/content/project-translations/<locale>/<id>.mdx` (entry id `<locale>/<id>`, `<id>` = the canonical file name, case-sensitive). Strict frontmatter (`lib/projectTranslationSchema.ts`) with only the translatable text fields: `title` and `description` (required), `heading`, `bannerAlt`, `contactNote` (optional); the MDX body is the translated body. Everything else (banner, technologies, tools, dates, order, draft, repoUrl, demoUrl) always comes from the canonical entry; an extra key fails the build. `getProjects(locale)` returns `LocalizedProject` views: canonical `data` with the five text fields overridden by the translation, `locale`, `contentLocale`, `translated` (false = fallback) and `bodyEntry` (the entry whose body is rendered with `renderProject()`). `heading`, `bannerAlt` and `contactNote` are **not** inherited from the Turkish entry (they are Turkish text): without them in the translation the page uses `title`, `<title> banner` and no contact note. A translation file whose `<id>` has no canonical project, or whose folder is not a configured non-default locale, fails every build with a message naming the file.

**Fallback:** a project without a translation still gets `/en/portfolio/<id>`. It shows the Turkish content, `<article lang="tr">` (callout labels and the contact block then also come from the Turkish site texts), and a localized notice (`project.fallbackNotice`) at the top of the article; its card on `/en/portfolio` shows the Turkish title/description with `lang="tr"`. The 404 and sitemap are unaffected.

The detail page (`pages/portfolio/[id].astro`) renders, inside one `.markdown-body` article (`github-markdown-css` dark theme, then `src/styles/markdown-overrides.css`, which must come after it): the `<h1>` (`heading ?? title`), the MDX body, then the shared `ProjectContact` block (heading, intro, email from `CONTACT_EMAIL`, LinkedIn from `socialLinks`, optional `contactNote`). So **MDX bodies contain no `# h1`, no contact section and no repeated icon list**. The GitHub and demo buttons sit below the article. The page passes `components={createMdxComponents(project.data, articleContent)}` (the site texts of the body's language), so MDX files use these without importing:

- `<Icon />` renders the page's project icons: `technologies` then `tools` (de-duplicated). `<Icon slugs={['typescript', 'astro']} />` with explicit slugs still works (`mdx/Icon.astro`; unknown slugs are skipped with a `console.warn`; plain `<img>` of the self-hosted files). The default is bound per page in `lib/mdxComponents.ts` with `createComponent` / `renderComponent` from `astro/compiler-runtime`; `Icon.astro` itself defaults to an empty list.
- `<Callout type="important" | "warning" | "note">...</Callout>` renders a highlighted block with a coloured left border; the label comes from the site content (bound per page the same way). The labels of the `IMPORTANT` / `WARNING` / `NOTE` code-fence callouts come from the CSS variables `--callout-*` that the page sets on the article.

Prettier ignores `src/content/**/*.mdx` on purpose (its MDX formatter can mangle JSX).

### Styling

Tailwind CSS v4 through `@tailwindcss/vite` (configured in `astro.config.ts`; no `tailwind.config.*`). `src/styles/global.css` holds `@import 'tailwindcss'`, the self-hosted Inter font (`@fontsource-variable/inter`) and the CSS variables (`--background-color`, `--text-color`, `--nav-background-color`, ...) used as `bg-(--nav-background-color)` etc. Prettier sorts Tailwind classes in `.astro` files with `prettier-plugin-tailwindcss`; this only works with `prettier-plugin-astro` **0.14.x** (pinned `~0.14.1`; 1.x has a different AST the Tailwind plugin does not understand, and Dependabot ignores `>= 1.0.0`). Do not bump it until the Tailwind plugin supports 1.x. Classes inside `data-open` / `data-closed` attributes and JS strings are not sorted; they are applied by script via `classList`.

Images in `src/assets/img/` go through `astro:assets` (`<Image>`, `getImage`, optimized at build with sharp). Technology icons are self-hosted files in `public/icons/tech/` (devicon / simpleicons SVGs, a few PNG logos) referenced as `/icons/tech/<file>` in plain `<img>` tags, not through `astro:assets`, so `image.domains` is not configured. UI icons (location, mail, social links, heart) are Font Awesome Free definitions from `@fortawesome/free-solid-svg-icons` / `free-brands-svg-icons` rendered as inline SVG by `FaIcon.astro` (no kit script, no icon font); `socialLinks.ts` stores the icon definitions, not class strings. Only the icons that are imported end up in the build.

### Tests

Vitest (`vitest.config.mts` uses Astro's `getViteConfig`, so `.astro` files and the `@/` alias work). Tests are `src/**/*.test.ts` and `scripts/**/*.test.ts`: `lib/navOrder.test.ts` (pure logic, locale mapping + the toString contract), `lib/endpoints.test.ts` (robots/sitemap incl. draft filter and `updatedDate`, `astro:content` mocked), `lib/projects.test.ts` (ordering, drafts, translation merge / fallback / orphan failure), `lib/i18n.test.ts` (URL helpers), `lib/projectTranslationSchema.test.ts` (strict translation frontmatter, translations folder layout), `components/LanguageSwitcher.test.ts`, `lib/projectSchema.test.ts` (strict frontmatter), `lib/content.test.ts` (site content per locale, key / placeholder parity between locales), `lib/mdxComponents.test.ts` (`<Icon />` defaults), `scripts/check-links.test.ts` (link resolution), and `components/**` / `layouts/BaseLayout.test.ts` tests that render components with the Container API (Header a11y wiring, ProjectCard loading modes and tag row, BaseLayout SEO / hreflang / JSON-LD / scripts per locale; `vi.stubEnv('PROD', true)` switches on the production-only Umami script):

```ts
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
const container = await AstroContainer.create()
const html = await container.renderToString(Button, { props: { ... }, slots: { default: 'Hello' } })
```

### Deploy

`Dockerfile`: node build stage (`pnpm build`, optional `SITE_URL` build arg) -> `nginxinc/nginx-unprivileged` serving `dist/` on port 3000 with `docker/nginx.conf` (no directory redirects, real 404 status with `/404.html`; `/en` is served as `dist/en/index.html` by `try_files $uri $uri/index.html`, exactly like `/about`, so the English URLs needed no nginx change, gzip, immutable cache for `/_astro/*`, `X-Content-Type-Options`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`; no CSP, no HSTS because TLS terminates at Traefik). No `location` may define its own `add_header`, or it loses the server-level headers. `/healthz` returns `200 ok` (no access log) for health checks. `scripts/smoke-test.sh [base-url]` asserts the behaviour above against a running server (200s, no redirect on `/about`, `/en`, `/en/about`, 404 page + status also for `/en/does-not-exist`, `/healthz`, immutable `/_astro/*`, security headers); it is not part of the image.

Hosting: self-hosted on **Dokploy** as an _Application_ (not Compose; there is no compose file in the repo).

- Build type: Dockerfile, Dockerfile path `Dockerfile`, context `.`.
- Auto deploy on push to `main`.
- Domain `who.metehansenyer.dev` is configured in the Dokploy Domains tab (routing and HTTPS come from there) with **Container Port 3000**, which must match `listen 3000` in `docker/nginx.conf`.
- The Swarm health check uses the `/healthz` endpoint.

## Adding a project

(The Turkish canonical entry first; the English translation follows the recipe in "Translating a project". A project without a translation is still published at `/en/portfolio/<id>` with the Turkish text and a notice.)

1. Add a banner image to `src/assets/img/`.
2. Create `src/content/projects/<id>.mdx` (the file name is the URL segment, case-sensitive) with the frontmatter above; copy an existing file as a reference. Set `repoUrl` (and `demoUrl`) explicitly; the file name is not used as the repo name. Banner path is relative, e.g. `../../assets/img/<file>.png`. List the icons once in `technologies` / `tools` and write `<Icon />` in the body; do not add an h1 or a contact section (both come from the page). Use `draft: true` while a project is unfinished.
3. Run `pnpm build` (validates the frontmatter) and `pnpm check:links`. The project then appears on `/portfolio`, gets `/portfolio/<id>`, and is added to the sitemap.

## Translating a project

Recipe for `src/content/project-translations/en/<id>.mdx` (reference: `KOU-Not-Bilgi-Sistemi-CLI.mdx`; compare it with `src/content/projects/KOU-Not-Bilgi-Sistemi-CLI.mdx`):

1. File name = the canonical file name exactly (case-sensitive), in the locale folder (`en/`). A name without a canonical project fails the build.
2. Copy the canonical file. In the frontmatter keep **only** `title`, `description` and, if the canonical file has them, `heading` and `contactNote`; translate their values. Delete `banner`, `technologies`, `tools`, `releaseDate`, `updatedDate`, `order`, `draft`, `repoUrl`, `demoUrl` (the schema is strict: they fail the build, and they always come from the canonical entry). Add `bannerAlt` only if the canonical file has one.
3. Translate the body: all prose, headings (keep the leading emoji), table headers and cells, list items, `<Callout>` text. Keep exactly as they are: the structure and heading order, `<Icon />` (and its props), `<Callout type="...">` (the type is not text), code blocks, shell commands, file names, identifiers, URLs, product names, the author name. Do not add an `# h1` or a contact section (the page adds them in the page's language).
4. Natural English, same tone, not word by word. "KOU Not Bilgi Sistemi" is the project's name and stays.
5. `pnpm build` (validates the frontmatter and fails for an orphan), then open `/en/portfolio/<id>`: no fallback notice, `<html lang="en">`, no `lang="tr"` on the article. `pnpm check:links` must pass.

Existing files: `src/content/project-translations/en/KOU-Not-Bilgi-Sistemi-CLI.mdx`. Missing translations are fine: the page falls back to Turkish with a notice.

## Adding a technology icon

Save the logo (prefer SVG, from devicon (MIT) or simpleicons (CC0); PNG only when no SVG exists) as `public/icons/tech/<slug>.<ext>` and add an entry to the `icons` object in `src/data/icons.ts` with `name` (also used as the img alt text), `url`, `imgSrc: '/icons/tech/<slug>.<ext>'`. Slugs that share a logo may point at the same file. The key is the slug used in MDX frontmatter `technologies`, in `<Icon slugs={[...]} />`, and in `data/profile.ts` (About page list). Pick an image that is visible on the dark (`#1f2937` / `#374151`) background; for a black logo, add a light `fill` (e.g. `#d1d5db`) to the local SVG (as done for `markdown.svg` and `vercel.svg`). Do not hotlink remote images.
