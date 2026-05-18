/**
 * Build-time content validator
 *
 * Catches silent breakage modes:
 * - Missing markdown files for projects
 * - Missing banner images for projects
 * - Unknown icon slugs in markdown {icons: [...]} blocks
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

type IconSlug = keyof typeof icons
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

// ── 1. Markdown files exist ───────────────────────────────────────────────────

console.log('\nChecking markdown files…')
for (const project of projects) {
  const mdPath = path.join(PROJECTS_DIR, `${project.repoName}.md`)
  if (!fs.existsSync(mdPath)) {
    fail(`Missing markdown file: src/app/data/projects/${project.repoName}.md`, {
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

// ── 3. Icon slugs in markdown files ──────────────────────────────────────────

console.log('Checking icon slugs in markdown files…')
const iconBlockRegex = /\{icons:\s*\[(.*?)\]\}/g

const mdFiles = fs
  .readdirSync(PROJECTS_DIR)
  .filter((f) => f.endsWith('.md'))
  .map((f) => path.join(PROJECTS_DIR, f))

for (const mdFile of mdFiles) {
  const content = fs.readFileSync(mdFile, 'utf8')
  const matches = Array.from(content.matchAll(iconBlockRegex))
  const fileName = path.relative(ROOT, mdFile)

  for (const match of matches) {
    const slugs = match[1].split(',').map((s) => s.trim()).filter(Boolean)
    for (const slug of slugs) {
      if (!knownSlugs.has(slug)) {
        fail(`Unknown icon slug "${slug}" in {icons: [...]} block`, { file: fileName })
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
