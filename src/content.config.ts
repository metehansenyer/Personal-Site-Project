/**
 * Content collections.
 *
 * `projects`: one MDX file per portfolio project in `src/content/projects/`. The entry id is
 * the exact, case-sensitive file name without extension and is the URL segment
 * (`/portfolio/<id>`). It is not assumed to be the repository name: see `repoUrl`.
 *
 * `projectTranslations`: translations of the project texts, `src/content/project-translations/
 * <locale>/<id>.mdx` (entry id `<locale>/<id>`). Only the translatable fields; `lib/projects.ts`
 * merges them onto the canonical `projects` entry and fails the build for an orphan file.
 *
 * `site`: page texts, one JSON file per locale in `src/content/site/` (`tr.json`, ...).
 * The entry id is the locale code.
 */
import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { projectSchema } from '@/lib/projectSchema'
import { projectTranslationSchema } from '@/lib/projectTranslationSchema'
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

const projectTranslations = defineCollection({
  loader: glob({
    pattern: '*/*.mdx',
    base: './src/content/project-translations',
    generateId: ({ entry }) => entry.replace(/\.mdx$/, ''),
  }),
  schema: projectTranslationSchema,
})

const site = defineCollection({
  loader: glob({
    pattern: '*.json',
    base: './src/content/site',
    generateId: ({ entry }) => entry.replace(/\.json$/, ''),
  }),
  schema: siteSchema,
})

export const collections = { projects, projectTranslations, site }
