#!/usr/bin/env node
/**
 * Internal link checker for the static build.
 *
 * Walks `dist/**\/*.html`, collects every `href` / `src` / `srcset` reference and verifies that
 * internal ones resolve to a file the way nginx serves them (`docker/nginx.conf`:
 * `try_files $uri $uri/index.html $uri.html`, no redirects), and that `#fragment`s exist as
 * ids on the target page. Links to other hosts, `mailto:`, `tel:`, `data:` and `javascript:`
 * are ignored. Absolute links to the site's own origin (read from `dist/sitemap.xml`, or the
 * `SITE_URL` env var) count as internal. Also checks every `<loc>` of the sitemap.
 *
 * Usage: `node scripts/check-links.mjs [dist-dir]` (default `dist`; run after `pnpm build`).
 * Exits 1 and lists page + broken link for each problem.
 *
 * The logic is exported (pure functions over strings and a set of file paths) for the unit
 * tests in `scripts/check-links.test.ts`; the CLI part only runs when executed directly.
 */
import { readdirSync, readFileSync, existsSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const BASE = 'http://internal.invalid'

/** All files below `dir` as `/`-separated paths relative to it. */
export function listFiles(dir) {
  const out = []
  const walk = (d) => {
    for (const entry of readdirSync(d, { withFileTypes: true })) {
      const full = join(d, entry.name)
      if (entry.isDirectory()) walk(full)
      else out.push(relative(dir, full).split(sep).join('/'))
    }
  }
  walk(dir)
  return out
}

/** URL path a built HTML file is served at: `about/index.html` -> `/about`, `index.html` -> `/`. */
export function pageUrl(file) {
  if (file === 'index.html') return '/'
  if (file.endsWith('/index.html')) return '/' + file.slice(0, -'/index.html'.length)
  return '/' + file
}

const decodeEntities = (s) =>
  s
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')

const TAG =
  /<([a-zA-Z][\w-]*)((?:\s+[^\s"'>/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'>]+))?)*)\s*\/?>/g
const ATTR = /\s([^\s"'>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g

/** Iterates over the attributes of a tag's attribute string. */
function* attributes(attrString) {
  for (const m of attrString.matchAll(ATTR)) {
    yield [m[1].toLowerCase(), decodeEntities(m[2] ?? m[3] ?? m[4] ?? '')]
  }
}

/**
 * Applies `pattern` -> `replacement` repeatedly until the string stops changing.
 * @param {string} input
 * @param {RegExp} pattern
 * @param {string} replacement
 */
export function replaceUntilStable(input, pattern, replacement) {
  let current = input
  let previous
  do {
    previous = current
    current = current.replace(pattern, replacement)
  } while (current !== previous)
  return current
}

/**
 * Extracts the references of an HTML document: every `href` / `src` / `srcset` URL and the
 * set of ids (`id`, `<a name>`). Script and style bodies and comments are ignored.
 * @param {string} html
 * @returns {{ refs: { tag: string, attr: string, url: string }[], ids: Set<string> }}
 */
export function extractRefs(html) {
  // Not sanitization (the result is only scanned for attributes, never output), but repeat
  // each removal until nothing changes so nested / overlapping constructs cannot survive.
  let stripped = replaceUntilStable(html, /<!--[\s\S]*?-->/g, '')
  stripped = replaceUntilStable(stripped, /(<script\b[^>]*>)[\s\S]*?(<\/script\b[^>]*>)/gi, '$1$2')
  stripped = replaceUntilStable(stripped, /(<style\b[^>]*>)[\s\S]*?(<\/style\b[^>]*>)/gi, '$1$2')
  const refs = []
  const ids = new Set()
  for (const [, tag, attrString] of stripped.matchAll(TAG)) {
    for (const [name, value] of attributes(attrString)) {
      if (name === 'id' && value) ids.add(value)
      else if (name === 'name' && tag.toLowerCase() === 'a' && value) ids.add(value)
      else if (name === 'href' || name === 'src') refs.push({ tag, attr: name, url: value.trim() })
      else if (name === 'srcset') {
        for (const candidate of value.split(',')) {
          const url = candidate.trim().split(/\s+/)[0]
          if (url) refs.push({ tag, attr: name, url })
        }
      }
    }
  }
  return { refs, ids }
}

/**
 * Resolves a URL path to the file nginx would serve for it (`try_files $uri $uri/index.html
 * $uri.html`), or `null` when none exists.
 * @param {string} pathname absolute, percent-decoded path (`/about`, `/_astro/x.css`)
 * @param {Set<string>} files built files, relative to dist
 */
export function resolveFile(pathname, files) {
  const p = pathname.replace(/^\/+/, '')
  const candidates = [p, `${p}/index.html`, `${p}.html`]
  // `/` -> index.html, `/about/` -> about/index.html (a directory path never matches as a file)
  if (p === '' || p.endsWith('/')) return files.has(`${p}index.html`) ? `${p}index.html` : null
  return candidates.find((c) => files.has(c)) ?? null
}

/**
 * Classifies and resolves one reference found on `pagePath`.
 * @returns {{ skip: true } | { skip?: false, pathname: string, fragment: string }}
 */
export function parseRef(url, pagePath, origin) {
  if (/^(mailto|tel|data|javascript|sms|blob):/i.test(url)) return { skip: true }
  let resolved
  try {
    resolved = new URL(url, BASE + pagePath)
  } catch {
    return { skip: false, pathname: url, fragment: '', invalid: true }
  }
  if (resolved.origin !== BASE) {
    if (origin && resolved.origin === origin) {
      resolved = new URL(resolved.pathname + resolved.search + resolved.hash, BASE)
    } else return { skip: true }
  }
  let pathname = resolved.pathname
  let fragment = resolved.hash.replace(/^#/, '')
  try {
    pathname = decodeURIComponent(pathname)
    fragment = decodeURIComponent(fragment)
  } catch {
    /* keep the raw values */
  }
  return { skip: false, pathname, fragment }
}

/**
 * Checks all pages of a build.
 * @param {{ files: string[], read: (file: string) => string, origin?: string }} build
 * @returns {{ page: string, link: string, problem: string }[]}
 */
export function checkBuild({ files, read, origin }) {
  const fileSet = new Set(files)
  const pages = files.filter((f) => f.endsWith('.html'))
  const docs = new Map()
  const doc = (file) => {
    if (!docs.has(file)) docs.set(file, extractRefs(read(file)))
    return docs.get(file)
  }

  const problems = []
  for (const file of pages) {
    const path = pageUrl(file)
    for (const { url } of doc(file).refs) {
      const ref = parseRef(url, path, origin)
      if (ref.skip) continue
      if (ref.invalid) {
        problems.push({ page: path, link: url, problem: 'invalid URL' })
        continue
      }
      const target = resolveFile(ref.pathname, fileSet)
      if (!target) {
        problems.push({ page: path, link: url, problem: `no file for ${ref.pathname}` })
        continue
      }
      if (ref.fragment && target.endsWith('.html')) {
        const lower = ref.fragment.toLowerCase()
        if (lower !== 'top' && !doc(target).ids.has(ref.fragment)) {
          problems.push({
            page: path,
            link: url,
            problem: `no element with id "${ref.fragment}" on ${pageUrl(target)}`,
          })
        }
      }
    }
  }

  if (fileSet.has('sitemap.xml')) {
    for (const [, loc] of read('sitemap.xml').matchAll(/<loc>([^<]*)<\/loc>/g)) {
      const ref = parseRef(decodeEntities(loc), '/sitemap.xml', origin)
      if (ref.skip || !resolveFile(ref.pathname, fileSet)) {
        problems.push({ page: '/sitemap.xml', link: loc, problem: 'sitemap URL does not resolve' })
      }
    }
  }
  return problems
}

/** Origin of the built site: `SITE_URL` env, else the first `<loc>` of the sitemap. */
export function detectOrigin(files, read) {
  if (process.env.SITE_URL) return new URL(process.env.SITE_URL).origin
  if (!files.includes('sitemap.xml')) return undefined
  const loc = read('sitemap.xml').match(/<loc>([^<]*)<\/loc>/)?.[1]
  return loc ? new URL(loc).origin : undefined
}

function main() {
  const dist = process.argv[2] ?? 'dist'
  if (!existsSync(dist)) {
    console.error(`check-links: "${dist}" does not exist. Run \`pnpm build\` first.`)
    process.exit(2)
  }
  const files = listFiles(dist)
  const read = (file) => readFileSync(join(dist, file), 'utf8')
  const problems = checkBuild({ files, read, origin: detectOrigin(files, read) })
  const pageCount = files.filter((f) => f.endsWith('.html')).length

  if (problems.length > 0) {
    console.error(`check-links: ${problems.length} broken internal link(s) in ${dist}/\n`)
    for (const { page, link, problem } of problems) {
      console.error(`  ${page}\n    ${link}  ->  ${problem}`)
    }
    process.exit(1)
  }
  console.log(`check-links: ${pageCount} pages checked, no broken internal links.`)
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) main()
