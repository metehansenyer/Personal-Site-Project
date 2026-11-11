/**
 * Frontmatter schema of `src/content/project-translations/<locale>/<id>.mdx`. Strict: it holds
 * only the translatable text fields; everything else (banner, technologies, tools, dates,
 * order, draft, repoUrl, demoUrl) always comes from the canonical `projects` entry, so an
 * extra key fails the build instead of silently duplicating shared data.
 */
import { z } from 'astro/zod'

export const projectTranslationSchema = z.strictObject({
  /** Card title and browser title; also the detail page `<h1>` unless `heading` is set. */
  title: z.string(),
  /** Meta description and card text. */
  description: z.string(),
  /** Longer `<h1>` of the detail page. Not inherited from the canonical entry. */
  heading: z.string().optional(),
  /** Alt text of the banner; defaults to `site.project.bannerAlt` with the translated title. */
  bannerAlt: z.string().optional(),
  /** Closing sentence under the shared contact block. Not inherited from the canonical entry. */
  contactNote: z.string().optional(),
})

export type ProjectTranslationData = z.infer<typeof projectTranslationSchema>
