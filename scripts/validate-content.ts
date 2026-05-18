/**
 * Build-time content validator
 *
 * Catches silent breakage modes:
 * - Missing MDX files for projects
 * - Missing banner images for projects
 * - Unknown icon slugs in MDX <Icon slugs={[...]} /> components
 * - Unknown icon slugs in Project.technologies[]
 *
 * Exit 0 on success, exit 1 on any failure.
 */

import fs from 'fs'
import path from 'path'
import { projects } from '../src/app/data/projects'
import icons from '../src/app/data/icons'

const ROOT = path.resolve(__dirname, '..')
const PROJECTS_DIR = path.join(ROOT, 'src', 'app', 'data', 'projects')
const PUBLIC_DIR = path.join(ROOT, 'public')

const knownSlugs = new Set<string>(Object.keys(icons))

interface Failure {
  project?: string
  file?: string
  message: string
}

const failures: Failure[] = []
let checks = 0

// ── Helper ────────────────────────────────────────────────────────────────────

function fail(message: string, context: { project?: string; file?: string } = {}): void {
  failures.push({ ...context, message })
}

function pass(): void {
  checks++
}

// ── 1. MDX files exist ────────────────────────────────────────────────────────

console.log('\nChecking MDX files…')
for (const project of projects) {
  const mdxPath = path.join(PROJECTS_DIR, `${project.repoName}.mdx`)
  if (!fs.existsSync(mdxPath)) {
    fail(`Missing MDX file: src/app/data/projects/${project.repoName}.mdx`, {
      project: project.repoName,
    })
  } else {
    pass()
  }
}

// ── 2. Banner images exist ────────────────────────────────────────────────────

console.log('Checking banner images…')
for (const project of projects) {
  // banner is a public-root-relative path like /img/foo.png
  const absoluteBannerPath = path.join(PUBLIC_DIR, project.banner)
  if (!fs.existsSync(absoluteBannerPath)) {
    fail(`Missing banner image: public${project.banner}`, { project: project.repoName })
  } else {
    pass()
  }
}

// ── 3. Icon slugs in MDX files ────────────────────────────────────────────────

console.log('Checking icon slugs in MDX files…')
// Matches <Icon slugs={['a', 'b', 'c']} /> or <Icon slugs={["a", "b"]} />
// Note: using non-dotall regex with [\s\S] for broader TS target compatibility
const iconJsxRegex = /<Icon\s+slugs=\{(\[[\s\S]*?\])\}\s*\/>/g

const mdxFiles = fs
  .readdirSync(PROJECTS_DIR)
  .filter((f) => f.endsWith('.mdx'))
  .map((f) => path.join(PROJECTS_DIR, f))

for (const mdxFile of mdxFiles) {
  const content = fs.readFileSync(mdxFile, 'utf8')
  const matches = Array.from(content.matchAll(iconJsxRegex))
  const fileName = path.relative(ROOT, mdxFile)

  for (const match of matches) {
    // Extract slug strings from the array literal e.g. ['typescript', 'nextjs']
    const arrayLiteral = match[1]
    const slugMatches = Array.from(arrayLiteral.matchAll(/['"]([^'"]+)['"]/g))
    const slugs = slugMatches.map((m) => m[1])

    for (const slug of slugs) {
      if (!knownSlugs.has(slug)) {
        fail(`Unknown icon slug "${slug}" in <Icon slugs={[...]} />`, { file: fileName })
      } else {
        pass()
      }
    }
  }
}

// ── 4. Project.technologies[] slugs ──────────────────────────────────────────

console.log('Checking Project.technologies[] slugs…')
for (const project of projects) {
  for (const slug of project.technologies) {
    if (!knownSlugs.has(slug as string)) {
      fail(`Unknown technology slug "${slug}" in project.technologies`, {
        project: project.repoName,
      })
    } else {
      pass()
    }
  }
}

// ── Summary ───────────────────────────────────────────────────────────────────

const totalChecks = checks + failures.length
console.log(`\n${'─'.repeat(60)}`)
console.log(`Content validation: ${totalChecks} checks, ${failures.length} failure(s)`)
console.log('─'.repeat(60))

if (failures.length === 0) {
  console.log('✓ All checks passed.\n')
  process.exit(0)
} else {
  for (const f of failures) {
    const ctx = [f.project && `project=${f.project}`, f.file && `file=${f.file}`]
      .filter(Boolean)
      .join(', ')
    console.error(`✗ ${f.message}${ctx ? `  [${ctx}]` : ''}`)
  }
  console.error(`\n${failures.length} failure(s) found. Fix the above issues and re-run.\n`)
  process.exit(1)
}
