# TODO

Open work only. Finished items move to [COMPLETED.md](./COMPLETED.md). Plan: [PLAN.md](./PLAN.md).

Legend: `[ ]` open, `[~]` in progress, `[!]` blocked / needs rework

The infrastructure migration (Phases 0-4) is complete. What is left needs the owner or a real host.

## Needs the owner / a real host

- [ ] Docker image was never built (no Docker daemon in the dev sandbox). Build it and smoke test on a real
      host: `/`, `/about` (no redirect), an unknown URL (404 page + status 404), `/_astro/*` cache headers.
      `docker/nginx.conf` itself was tested with a local nginx against a fake `dist/`.
- [ ] Owner decision: Traefik labels in `docker-compose.yml` use two router names (`my-app` for the rule,
      `app` for the entrypoint) and no explicit `loadbalancer.server.port`. Left untouched on purpose.
      The container still listens on 3000.
- [ ] If the site is deployed on Vercel: confirm the project's framework preset switches to Astro
      (output directory `dist`).

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
