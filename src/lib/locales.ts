/**
 * Locales of the site. Turkish is the default and lives at the un-prefixed URLs.
 *
 * Adding a locale: add its code here and a `src/content/site/<code>.json` file (validated by
 * `lib/siteSchema.ts`; `lib/content.test.ts` fails if a listed locale has no file). Project
 * files and routing for the new locale are the only other places that need new files.
 */
export const LOCALES = ['tr'] as const

export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'tr'
