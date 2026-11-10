# TODO

Open work only. Finished items move to [COMPLETED.md](./COMPLETED.md). Plan: [PLAN.md](./PLAN.md).

Legend: `[ ]` open, `[~]` in progress, `[!]` blocked / needs rework

The infrastructure migration (Phases 0-4) is complete. What is left needs the owner or a real host.

## Deployment (Dokploy) - needs the owner

Hosting: Dokploy **Application**, **Dockerfile** build type, auto deploy on push to `main`, domain set in the
Dokploy Domains tab. Checked against the official Dokploy docs (domains, build type, auto deploy,
zero downtime, rollbacks, going to production).

- [ ] Owner decision: canonical domain. The owner named `who.metehansenyer.dev`, the code still says
      `who.metehansenyer.tech` (`astro.config.ts`, `src/lib/site.ts`, `public/robots.txt`, README,
      Personal-Site-Project content, `package.json` name). Canonical / `og:url` / sitemap follow this value.
- [ ] Owner decision: delete `docker-compose.yml`. A Dokploy Application gets its routing from the Domains
      tab (Dokploy writes the Traefik config itself), so the compose file and its inconsistent labels are unused.
- [ ] Before merging to `main`: the Dokploy domain's **Container Port must stay 3000** (the nginx image listens
      on 3000, same as the old Next.js container). Dockerfile path `Dockerfile`, context `.`, no build stage.
- [ ] First deploy is the first real build of the Docker image (no Docker daemon in the dev sandbox). After it,
      check `/`, `/about` (no redirect), an unknown URL (404 page + status 404) and `/_astro/*` cache headers.
- [ ] Optional: Swarm health check + `start-first` update with automatic rollback (Advanced -> Cluster Settings).
      The image is alpine without curl, so the docs' curl example needs `wget` instead.
- [ ] Optional: deploy only after CI passes (turn Auto Deploy off, call Dokploy's deploy API from the CI
      workflow) or build the image in CI and deploy from a registry - the docs recommend the latter for production.
- [ ] README still says the site is hosted on Vercel - fix once the domain question is answered.

## Backlog (next project: redesign)

- [ ] New interface design, lighter animations, theme options (light / dark / ...)
- [ ] Replace the Font Awesome kit script with inline SVG icons (last render-blocking third-party script)
- [ ] Markdown and Vercel technology icons are black and nearly invisible on the dark background
      (same as on the old site) - switch to visible variants or handle it with theming
- [ ] Astro view transitions (`ClientRouter`) for page navigation
- [ ] Self-host the devicon SVGs instead of loading them from jsDelivr
- [ ] Accessibility pass: focus outlines are disabled globally, `user-select: none` on the whole page
- [ ] Syntax highlighting for code blocks (Shiki is disabled for parity with the old site)
- [ ] `Callout.astro`: fail with a clear message on an invalid `type`
- [ ] Unpin `prettier-plugin-astro` (`~0.14.1`) once `prettier-plugin-tailwindcss` supports its 1.x AST
- [ ] Tidy Next-era entries in `.gitignore` (`/build`, `.pnp`, `.yarn`)
