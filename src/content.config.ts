/**
 * Content collections.
 *
 * `projects`: one MDX file per portfolio project in `src/content/projects/`. The entry id is
 * the exact, case-sensitive file name without extension and is the URL segment
 * (`/portfolio/<id>`). It is not assumed to be the repository name: see `repoUrl`.
 *
 * `site`: page texts, one JSON file per locale in `src/content/site/` (`tr.json`, ...).
 * The entry id is the locale code.
 */
import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { projectSchema } from '@/lib/projectSchema'
import { siteSchema } from '@/lib/siteSchema'

const projects = defineCollection({
  loader: glob({
    pattern: '*.mdx',
    base: './src/content/projects',
    // The default generator slugifies (lower-cases) ids; keep the file name as is.
    generateId: ({ entry }) => entry.replace(/\.mdx$/, ''),
  }),
  schema: ({ image }) => projectSchema(image),
})

const site = defineCollection({
  loader: glob({
    pattern: '*.json',
    base: './src/content/site',
    generateId: ({ entry }) => entry.replace(/\.json$/, ''),
  }),
  schema: siteSchema,
})

export const collections = { projects, site }
