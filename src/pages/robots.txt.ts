/**
 * robots.txt endpoint (static, built to /robots.txt). The Sitemap URL follows `SITE_URL`.
 */
import type { APIRoute } from 'astro'
import { SITE_URL } from '@/lib/site'

export const GET: APIRoute = () =>
  new Response(`User-agent: *\nAllow: /\n\n# Sitemap\nSitemap: ${SITE_URL}/sitemap.xml\n`, {
    headers: { 'Content-Type': 'text/plain' },
  })
