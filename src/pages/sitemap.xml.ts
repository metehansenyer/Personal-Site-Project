/**
 * Sitemap endpoint (static, built to /sitemap.xml).
 *
 * Static routes come from `src/data/routes.ts`, project pages from the `projects`
 * content collection. `changefreq` / `priority` are omitted on purpose (ignored by Google).
 * `lastmod` is only set for projects, using the release date as a lower bound of the real
 * modification date (the content has no `updatedDate` field); static routes have none.
 */
import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import { routes } from '@/data/routes'
import { SITE_URL } from '@/lib/site'

interface Entry {
  url: string
  lastModified?: Date
}

const escapeXml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

export const GET: APIRoute = async () => {
  const staticEntries: Entry[] = routes.map((route) => ({
    url: route.path === '/' ? SITE_URL : `${SITE_URL}${route.path}`,
  }))

  // Newest first (deterministic; collection order depends on the file system).
  const projects = (await getCollection('projects')).sort(
    (a, b) => b.data.releaseDate.getTime() - a.data.releaseDate.getTime(),
  )
  const projectEntries: Entry[] = projects.map((project) => ({
    url: `${SITE_URL}/portfolio/${project.id}`,
    lastModified: project.data.releaseDate,
  }))

  const body = [...staticEntries, ...projectEntries]
    .map((entry) =>
      [
        '<url>',
        `<loc>${escapeXml(entry.url)}</loc>`,
        entry.lastModified ? `<lastmod>${entry.lastModified.toISOString()}</lastmod>` : '',
        '</url>',
      ]
        .filter(Boolean)
        .join('\n'),
    )
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`

  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } })
}
