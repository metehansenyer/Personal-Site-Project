/**
 * Test helper: the real `src/content/site/<locale>.json`, parsed and validated with the site
 * schema, without the Astro content layer (whose data store is empty under Vitest).
 */
import { readFileSync } from 'node:fs'
import { siteSchema, type SiteContent } from '@/lib/siteSchema'
import type { Locale } from '@/lib/locales'

export function loadSiteContent(locale: Locale = 'tr'): SiteContent {
  const file = new URL(`../content/site/${locale}.json`, import.meta.url)
  return siteSchema.parse(JSON.parse(readFileSync(file, 'utf8')))
}

/** Value for `vi.mock('astro:content', ...)` so `getSiteContent()` works in tests. */
export const astroContentMock = {
  getEntry: async (collection: string, id: string) =>
    collection === 'site' ? { id, data: loadSiteContent(id as Locale) } : undefined,
}
