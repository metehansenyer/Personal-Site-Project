# TODO

Open work only. Finished items move to [COMPLETED.md](./COMPLETED.md). Plan: [PLAN.md](./PLAN.md).

Legend: `[ ]` open, `[~]` in progress, `[!]` blocked / needs rework

## Phase 3 - Integration

- [ ] Tests: Icon, Callout (Container API), navOrder logic; then drop `passWithNoTests` from `vitest.config.mts`
- [ ] Remove `scripts/validate-content.ts` and leftover `src/app/`
- [ ] Remove the `TODO(phase-3)` ignores for `src/app/` / `scripts/` (eslint, prettier, tsconfig); remove unused `public/img/placeholder_img.png`
- [ ] Tailwind class sorting is a silent no-op inside `.astro` with `prettier-plugin-astro` 1.x - evaluate pinning `~0.14.1` (or another fix), then re-format `src/**/*.astro`
- [ ] Astro icon (devicon `astro-original.svg`) is barely visible on the dark background - pick a visible variant
- [ ] Rewrite README.md and CLAUDE.md for the Astro stack
- [ ] `pnpm check && pnpm test && pnpm build` green

## Phase 4 - Lead QA

- [ ] Final code review of all coder output (Phase 2 review done, see COMPLETED.md)
- [ ] Re-run the browser parity check after Phase 3
- [ ] Docker image was never built (no daemon in the sandbox): build + smoke test `docker/nginx.conf` on a real host
- [ ] Owner decision: Traefik labels in `docker-compose.yml` use two router names (`my-app` rule, `app` entrypoint) and no explicit `loadbalancer.server.port` (container still listens on 3000)
- [ ] JS payload / build output inspection
- [ ] Final docs update, push
