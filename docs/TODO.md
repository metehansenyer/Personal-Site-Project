# TODO

Open work only. Finished items move to [COMPLETED.md](./COMPLETED.md). Plan: [PLAN.md](./PLAN.md).

Legend: `[ ]` open, `[~]` in progress, `[!]` blocked / needs rework

The infrastructure migration (Phases 0-4) is complete. What is left needs the owner or a real host.

## Deployment (Dokploy) - needs the owner

Hosting: Dokploy **Application**, **Dockerfile** build type, auto deploy on push to `main`, domain
`who.metehansenyer.dev` set in the Dokploy Domains tab.

- [ ] Before merging to `main`: the Dokploy domain's **Container Port must be 3000** (the nginx image listens
      on 3000, same as the old Next.js container). Dockerfile path `Dockerfile`, context `.`, no build stage.
- [ ] First deploy is the first real build of the Docker image (no Docker daemon in the dev sandbox). After it,
      check `/`, `/about` (no redirect), an unknown URL (404 page + status 404), `/healthz` and `/_astro/*`
      cache headers.
- [ ] After the first successful deploy: paste the health check + update config into Dokploy
      (Advanced -> Cluster Settings -> Swarm Settings):
      Health Check `{"Test":["CMD","wget","-q","--spider","http://127.0.0.1:3000/healthz"],"Interval":30000000000,"Timeout":5000000000,"StartPeriod":10000000000,"Retries":3}`
      Update Config `{"Parallelism":1,"Delay":10000000000,"FailureAction":"rollback","Order":"start-first"}`
      Use `127.0.0.1`, not `localhost` (nginx listens on IPv4 only). Tested with GNU wget only; the image's
      busybox wget should behave the same. A broken health check takes the domain down - if the site
      disappears after saving, clear the Health Check field.
- [ ] If `who.metehansenyer.tech` is still reachable, redirect it to `.dev` in Dokploy (Advanced -> Redirects).
- [ ] Optional: deploy only after CI passes (turn Auto Deploy off, call Dokploy's deploy API from the CI
      workflow) or build the image in CI and deploy from a registry - the docs recommend the latter for production.

- [ ] Content-Security-Policy: now feasible (the only third-party request is the Umami script), but Astro inlines
      small scripts whose hashes change per build, so it needs hashes/nonces or an external-scripts-only build.
      A wrong CSP breaks the live site; test it in report-only mode first.
- [ ] Dockerfile `HEALTHCHECK`: see the health check warning above (a broken check takes the domain down).
- [ ] Pin base images (`node`, `nginxinc/nginx-unprivileged`) and GitHub Actions by digest / commit SHA.
- [ ] Brotli / precompressed assets (needs an nginx build with the brotli module or `gzip_static` + a build step).
- [ ] Smaller favicon set: `public/favicon.ico` is 67 KB; add an SVG favicon + `apple-touch-icon`.

## Backlog (next project: redesign)

- [ ] New interface design, lighter animations, theme options (light / dark / ...)
- [ ] Astro view transitions (`ClientRouter`) for page navigation
- [ ] Syntax highlighting for code blocks (Shiki is disabled for parity with the old site)
- [ ] `Callout.astro`: fail with a clear message on an invalid `type`
- [ ] Unpin `prettier-plugin-astro` (`~0.14.1`) once `prettier-plugin-tailwindcss` supports its 1.x AST
