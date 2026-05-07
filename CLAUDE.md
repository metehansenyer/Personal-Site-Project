# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # Start development server at localhost:3000
pnpm build      # Production build
pnpm start      # Start production server
pnpm lint       # Run ESLint
```

Package manager is **pnpm** (v10.33.0). Do not use npm or yarn.

## Architecture

This is a Next.js 16 personal portfolio site (App Router, TypeScript, Tailwind CSS v4).

### Routing

- `src/app/page.tsx` — home page
- `src/app/(pages)/` — all other pages (about, contact, portfolio, mobile, 404)
- `src/app/(pages)/portfolio/[projectRepoName]/` — dynamic project detail pages
- `src/proxy.ts` — Next.js middleware (note: named export `proxy`, not default `middleware`) that redirects mobile User-Agents to `/mobile` and sets `x-project-repo-name` header for portfolio routes

### Data Layer

All content is managed via TypeScript files in `src/app/data/`:

- `projects.ts` — `Project[]` array with `repoName` used as the URL slug and the markdown filename key
- `icons.ts` — maps technology name strings to HTML icon markup (used in markdown via `{icons: [Tech1, Tech2]}` syntax)
- `aboutContent.ts`, `contactContent.ts`, `mobileContent.ts`, `notFoundContent.ts`, `socialLinks.ts` — static page content

### Project Pages (Markdown Pipeline)

Each project has a corresponding `.md` file in `src/app/data/projects/`. The `getMarkdownContent()` function in `src/app/lib/markdown.ts` reads the markdown, replaces `{icons: [...]}` placeholders with generated HTML, runs it through the unified/remark/rehype pipeline (GFM + raw HTML support), then injects the result into `src/app/data/projects/template.html`.

To add a new project:
1. Add entry to `projects` array in `src/app/data/projects.ts` (the `repoName` field becomes the URL path and must match the `.md` filename)
2. Create `src/app/data/projects/<repoName>.md`
3. Add banner image to `public/img/`

### Styling

- Tailwind CSS v4 imported via `@import "tailwindcss"` in `globals.css` (no `tailwind.config.js`)
- CSS custom properties defined in `:root` in `globals.css` drive the dark theme — use `var(--text-color)`, `var(--background-color)`, etc. rather than hardcoded colors
- Font Awesome icons loaded via CDN `<Script>` with `strategy="beforeInteractive"` in the root layout

### Layout Shell

`src/app/layout.tsx` wraps all pages with `Header`, `Navbar`, `Footer`, `Analytics` (Vercel), and `SpeedInsights` (Vercel). The `<main>` tag in the layout is the flex-grow container; page components render their own inner `<main>` for content-specific layout.
