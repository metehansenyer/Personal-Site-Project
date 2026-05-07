# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server (Next.js with Turbopack)
pnpm build        # Production build
pnpm lint         # ESLint check
pnpm lint:fix     # ESLint auto-fix
pnpm format       # Prettier format (writes)
pnpm format:check # Prettier check (read-only)
pnpm check        # lint + format:check combined
```

Package manager: **pnpm** (v10.33.4). Do not use npm or yarn.

## Architecture

### Routing
Next.js App Router under `src/app/`. Pages live in `src/app/(pages)/` using a route group that avoids URL segments. The middleware (`src/proxy.ts`) redirects mobile User-Agents to `/mobile` before any page renders.

### Data layer
All content is static TypeScript — no database, no API routes:
- `src/app/data/projects.ts` — the canonical list of portfolio projects (`Project[]`). Adding a new project here is all that's needed to make it appear on the portfolio page.
- `src/app/data/icons.ts` — tech icon registry keyed by slug (e.g. `typescript`, `nextjs`). `generateIconsHtml()` turns a list of slugs into inline HTML; `generateAboutTechnologies()` returns typed objects for the About page.
- `src/app/data/aboutContent.ts`, `contactContent.ts`, `socialLinks.ts`, etc. — page-specific static copy.

### Project detail pages
`/portfolio/[projectRepoName]` is a dynamic route. It:
1. Looks up the project in `projects.ts` by `repoName`.
2. Reads the corresponding Markdown file from `src/app/data/projects/<repoName>.md`.
3. Processes it through `src/app/lib/markdown.ts` (remark → rehype pipeline with GFM support).
4. Injects the HTML into `src/app/data/projects/template.html` at the `<!-- CONTENT -->` placeholder.

Icon syntax in Markdown files: `{icons: [typescript, nextjs, tailwindcss]}` — the markdown processor replaces this with rendered icon links before HTML conversion.

Custom callout blocks in Markdown use fenced code blocks with language tags `IMPORTANT`, `WARNING`, or `NOTE`; the template CSS styles these with colored left borders.

### Styling
Tailwind CSS v4 (PostCSS plugin). Prettier is configured with `prettier-plugin-tailwindcss` for class sorting. No separate `tailwind.config.*` file — v4 uses `postcss.config.mjs`.

### Adding a project
1. Add an entry to `projects` array in `src/app/data/projects.ts`.
2. Create `src/app/data/projects/<repoName>.md` (use existing `.md` files as reference).
3. Add a banner image to `public/img/`.

### Adding a technology icon
Add an entry to the `icons` object in `src/app/data/icons.ts` with `name`, `url`, `imgSrc`, and `alt`. The key becomes the slug used in Markdown files and About page data.
