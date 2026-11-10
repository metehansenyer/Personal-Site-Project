# syntax=docker/dockerfile:1

# ---- Stage 1: build the static site ----
FROM node:24-slim AS build
WORKDIR /app
RUN corepack enable pnpm

# Install dependencies first (cached unless the manifests change). Dev dependencies are
# required: Astro, Tailwind and friends are devDependencies/build tools.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

# Optional canonical site URL (sitemap, canonical links, OpenGraph). When empty, astro.config.ts
# falls back to its default, so unset the variable instead of passing an empty string.
ARG SITE_URL
RUN if [ -n "$SITE_URL" ]; then export SITE_URL; else unset SITE_URL; fi; pnpm build

# ---- Stage 2: serve /app/dist with unprivileged nginx on port 3000 ----
FROM nginxinc/nginx-unprivileged:alpine AS runner
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /app/dist
EXPOSE 3000
# The base image already runs as the unprivileged "nginx" user and starts nginx in the foreground.
