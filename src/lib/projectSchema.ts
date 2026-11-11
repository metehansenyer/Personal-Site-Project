/**
 * Frontmatter schema of `src/content/projects/*.mdx`. Strict: an unknown or misspelled key
 * fails the build. `image` is Astro's `image()` schema helper from the collection definition.
 */
import { z } from 'astro/zod'
import type { ImageFunction } from 'astro:content'
import icons from '@/data/icons'

const iconSlugs = Object.keys(icons) as [keyof typeof icons, ...(keyof typeof icons)[]]
const iconSlug = z.enum(iconSlugs)

export const projectSchema = (image: ImageFunction) =>
  z.strictObject({
    /** Card title and browser title; also the detail page `<h1>` unless `heading` is set. */
    title: z.string(),
    /** Longer `<h1>` of the detail page. */
    heading: z.string().optional(),
    /** Meta description and card text. */
    description: z.string(),
    banner: image(),
    /** Alt text of the banner; defaults to `site.project.bannerAlt` ("<title> banner"). */
    bannerAlt: z.string().optional(),
    /** Card tags and the first icons of the detail page `<Icon />`. */
    technologies: z.array(iconSlug),
    /** Further icons of `<Icon />` on the detail page (after `technologies`). */
    tools: z.array(iconSlug).default([]),
    releaseDate: z.coerce.date(),
    /** Sitemap `lastmod` = `updatedDate ?? releaseDate`. */
    updatedDate: z.coerce.date().optional(),
    /** Projects with an `order` come first (ascending); the rest follow by release date. */
    order: z.number().optional(),
    /** Drafts are left out of production builds but show up in `pnpm dev`. */
    draft: z.boolean().default(false),
    /** Source repository. Omit for private / unpublished projects (no GitHub button). */
    repoUrl: z.url().optional(),
    /** Live site. The detail page shows a demo button when set. */
    demoUrl: z.url().optional(),
    /** Project-specific closing sentence under the shared contact block. */
    contactNote: z.string().optional(),
  })
