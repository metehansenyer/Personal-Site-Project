/**
 * Content collections.
 *
 * `projects`: one MDX file per portfolio project in `src/content/projects/`.
 * The entry id is the exact, case-sensitive file name without extension - it is both the
 * URL segment (`/portfolio/<repoName>`) and the GitHub repository name.
 */
import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'
import icons from '@/data/icons'

const iconSlugs = Object.keys(icons) as [keyof typeof icons, ...(keyof typeof icons)[]]

const projects = defineCollection({
  loader: glob({
    pattern: '*.mdx',
    base: './src/content/projects',
    // The default generator slugifies (lower-cases) ids; keep the file name as is.
    generateId: ({ entry }) => entry.replace(/\.mdx$/, ''),
  }),
  schema: ({ image }) =>
    z.object({
      /** GitHub user / organisation that owns the repository. */
      userName: z.string(),
      title: z.string(),
      description: z.string(),
      banner: image(),
      technologies: z.array(z.enum(iconSlugs)),
      releaseDate: z.coerce.date(),
    }),
})

export const collections = { projects }
