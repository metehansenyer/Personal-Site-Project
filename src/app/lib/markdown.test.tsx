/**
 * MDX Component Tests
 *
 * Tests for the Icon and Callout React components that replaced
 * the old markdown.ts regex/string-injection pipeline.
 *
 * Uses react-dom/server renderToString for snapshot-style assertions
 * without requiring a full DOM environment.
 */

import { describe, it, expect, vi, afterEach } from 'vitest'
import { renderToString } from 'react-dom/server'
import icons from '@/app/data/icons'
import type { IconSlug } from '@/app/data/icons'
import Icon from '@/app/components/mdx/Icon'
import Callout from '@/app/components/mdx/Callout'

// ---------------------------------------------------------------------------
// Icon component tests
// ---------------------------------------------------------------------------

describe('Icon component — known slugs', () => {
  it('renders an anchor and img for a single known slug', () => {
    const html = renderToString(<Icon slugs={['typescript' as IconSlug]} />)
    expect(html).toContain(icons.typescript.url)
    expect(html).toContain(icons.typescript.imgSrc)
    expect(html).toContain(icons.typescript.alt)
  })

  it('renders multiple icons for multiple known slugs', () => {
    const html = renderToString(<Icon slugs={['typescript', 'nextjs'] as IconSlug[]} />)
    expect(html).toContain(icons.typescript.url)
    expect(html).toContain(icons.nextjs.url)
    expect(html).toContain(icons.typescript.imgSrc)
    expect(html).toContain(icons.nextjs.imgSrc)
  })

  it('wraps icons in a container div', () => {
    const html = renderToString(<Icon slugs={['python' as IconSlug]} />)
    expect(html).toContain('<div')
    expect(html).toContain(icons.python.url)
  })

  it('renders anchor with target="_blank" and rel="noreferrer"', () => {
    const html = renderToString(<Icon slugs={['react' as IconSlug]} />)
    expect(html).toContain('target="_blank"')
    expect(html).toContain('rel="noreferrer"')
  })

  it('renders an empty container when given an empty slugs array', () => {
    const html = renderToString(<Icon slugs={[]} />)
    expect(html).not.toContain('<a')
  })
})

describe('Icon component — unknown slugs', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('skips unknown slugs and emits a console.warn', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    // Cast to satisfy TypeScript — we are testing invalid input
    const html = renderToString(<Icon slugs={['definitely-not-a-real-slug' as IconSlug]} />)
    expect(html).not.toContain('definitely-not-a-real-slug')
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('definitely-not-a-real-slug'))
  })

  it('renders valid icons and skips invalid ones in a mixed array', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const html = renderToString(
      <Icon slugs={['typescript', 'bad-slug', 'nextjs'] as IconSlug[]} />,
    )
    expect(html).toContain(icons.typescript.url)
    expect(html).toContain(icons.nextjs.url)
    expect(html).not.toContain('bad-slug')
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('bad-slug'))
  })
})

// ---------------------------------------------------------------------------
// Callout component tests
// ---------------------------------------------------------------------------

describe('Callout component — type: important', () => {
  it('renders the IMPORTANT label', () => {
    const html = renderToString(<Callout type="important">Some important text</Callout>)
    expect(html).toContain('ⓘ ÖNEMLİ')
  })

  it('applies the important border color class', () => {
    const html = renderToString(<Callout type="important">Some important text</Callout>)
    expect(html).toContain('border-[var(--important-color)]')
  })

  it('renders children content', () => {
    const html = renderToString(<Callout type="important">Read this carefully.</Callout>)
    expect(html).toContain('Read this carefully.')
  })
})

describe('Callout component — type: warning', () => {
  it('renders the WARNING label', () => {
    const html = renderToString(<Callout type="warning">Be careful.</Callout>)
    expect(html).toContain('⚠️ UYARI')
  })

  it('applies the warning border color class', () => {
    const html = renderToString(<Callout type="warning">Be careful.</Callout>)
    expect(html).toContain('border-[var(--warning-color)]')
  })
})

describe('Callout component — type: note', () => {
  it('renders the NOTE label', () => {
    const html = renderToString(<Callout type="note">Just a note.</Callout>)
    expect(html).toContain('ⓘ NOT')
  })

  it('applies the note border color class', () => {
    const html = renderToString(<Callout type="note">Just a note.</Callout>)
    expect(html).toContain('border-[var(--note-color)]')
  })
})

describe('Callout component — structure', () => {
  it('renders a left border div wrapping content', () => {
    const html = renderToString(<Callout type="note">Content here</Callout>)
    expect(html).toContain('border-l-[6px]')
    expect(html).toContain('Content here')
  })
})
