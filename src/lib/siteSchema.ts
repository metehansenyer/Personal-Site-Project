/**
 * Schema of the `site` data collection (`src/content/site/<locale>.json`): every user-visible
 * string that is not project content. One file per locale; all of them must satisfy this
 * schema, which is strict so a typo in a key fails the build.
 *
 * Strings that contain `{name}` placeholders are filled with `format()` from `lib/format.ts`.
 */
import { z } from 'astro/zod'

const text = z.string().min(1)

const pageRoute = z.strictObject({
  /** Navigation link label. */
  label: text,
  /** Text shown in the Header and the page's `<h1>`. */
  title: text,
  /** Page name used in the browser title (`<name> | <site name>`). */
  metaTitle: text,
  /** Meta description. */
  description: text,
})

export const siteSchema = z.strictObject({
  /** `<html lang>` value. */
  lang: text,
  /** Open Graph locale (`og:locale`). */
  ogLocale: text,
  /** Default meta description (pages without their own). */
  description: text,
  jsonLd: z.strictObject({
    jobTitle: text,
    affiliation: text,
  }),
  routes: z.strictObject({
    home: z.strictObject({ label: text }),
    about: pageRoute,
    portfolio: pageRoute,
    contact: pageRoute.extend({ homeLabel: text }),
  }),
  home: z.strictObject({
    /** Small line above the headline. */
    eyebrow: text,
    /** Headline lines. */
    headline: z.array(text).min(1),
  }),
  about: z.strictObject({
    location: text,
    education: text,
    aboutMe: text,
    aboutTitle: text,
    technologiesTitle: text,
    noTechnologies: text,
    /** `{name}` = site owner's name. */
    photoAlt: text,
  }),
  contact: z.strictObject({
    heading: text,
    description: text,
    footer: text,
  }),
  notFound: z.strictObject({
    title: text,
    description: text,
  }),
  portfolio: z.strictObject({
    empty: text,
  }),
  header: z.strictObject({
    openMenu: text,
    closeMenu: text,
  }),
  languageSwitcher: z.strictObject({
    /** Accessible name of the language switcher group (`aria-label`). */
    label: text,
  }),
  footer: z.strictObject({
    /** Tokens: `{author}` (link) and `{heart}` (icon). */
    credit: text,
    /** Token: `{umami}` (link). */
    analytics: text,
    analyticsLink: text,
  }),
  project: z.strictObject({
    /** `{title}` = project title. Used when a project has no `bannerAlt`. */
    bannerAlt: text,
    viewOnGithub: text,
    viewDemo: text,
    /** Shown at the top of a project page whose text exists only in the default locale. */
    fallbackNotice: text,
    callouts: z.strictObject({
      important: text,
      warning: text,
      note: text,
    }),
    /** Closing contact block shown on every project page. */
    contact: z.strictObject({
      heading: text,
      intro: text,
      emailLabel: text,
    }),
  }),
})

export type SiteContent = z.infer<typeof siteSchema>
