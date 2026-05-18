import { vi, describe, it, expect, afterEach } from 'vitest'
import icons, { generateIconsHtml } from '@/app/data/icons'

// ---------------------------------------------------------------------------
// Internal helper: mirrors processMarkdown from markdown.ts so we can test
// the pipeline in isolation without touching the file system.
// ---------------------------------------------------------------------------
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeStringify from 'rehype-stringify'

async function processMarkdown(content: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(content)
  return result.toString()
}

// Mirrors the icon-replacement logic from getMarkdownContent.
async function processWithIcons(content: string): Promise<string> {
  const regex = /\{icons:\s*\[(.*?)\]\}/g
  const matches = Array.from(content.matchAll(regex))
  const rawSlugs = matches
    .map((match) => match[1].split(',').map((s) => s.trim()))
    .flat()

  type IconSlug = keyof typeof icons
  const validSlugs = rawSlugs.filter((slug): slug is IconSlug => {
    if (!(slug in icons)) {
      console.warn(`[markdown] unknown icon slug: ${slug}`)
      return false
    }
    return true
  })

  const iconsHtml = generateIconsHtml(validSlugs)
  const replaced = content.replace(regex, iconsHtml)
  return processMarkdown(replaced)
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('processMarkdown — plain markdown round-trips', () => {
  it('renders an h1 heading', async () => {
    const html = await processMarkdown('# Hello World')
    expect(html).toContain('<h1>Hello World</h1>')
  })

  it('renders a paragraph', async () => {
    const html = await processMarkdown('A simple paragraph.')
    expect(html).toContain('<p>A simple paragraph.</p>')
  })

  it('renders an unordered list', async () => {
    const html = await processMarkdown('- alpha\n- beta\n- gamma')
    expect(html).toContain('<ul>')
    expect(html).toContain('<li>alpha</li>')
    expect(html).toContain('<li>gamma</li>')
  })
})

describe('processMarkdown — GFM extensions', () => {
  it('renders a GFM table with thead and tbody', async () => {
    const md = '| Name | Value |\n|------|-------|\n| foo  | 42    |'
    const html = await processMarkdown(md)
    expect(html).toContain('<table>')
    expect(html).toContain('<thead>')
    expect(html).toContain('<tbody>')
    expect(html).toContain('<th>Name</th>')
    expect(html).toContain('<td>42</td>')
  })

  it('adds target="_blank" and rel attributes to external links', async () => {
    const html = await processMarkdown('[Example](https://example.com)')
    expect(html).toContain('target="_blank"')
    expect(html).toContain('rel="noopener noreferrer"')
    expect(html).toContain('href="https://example.com"')
  })
})

describe('processMarkdown — callout blocks', () => {
  it('emits <pre><code class="language-IMPORTANT"> for IMPORTANT fenced blocks', async () => {
    const md = '```IMPORTANT\nRead this carefully.\n```'
    const html = await processMarkdown(md)
    // The callout is CSS-driven: the pipeline produces a code element with the
    // language class; the template stylesheet applies the colored border.
    expect(html).toContain('<pre>')
    expect(html).toContain('class="language-IMPORTANT"')
    expect(html).toContain('Read this carefully.')
  })

  it('emits language-WARNING class for WARNING fenced blocks', async () => {
    const md = '```WARNING\nBe careful.\n```'
    const html = await processMarkdown(md)
    expect(html).toContain('class="language-WARNING"')
  })

  it('emits language-NOTE class for NOTE fenced blocks', async () => {
    const md = '```NOTE\nJust a note.\n```'
    const html = await processMarkdown(md)
    expect(html).toContain('class="language-NOTE"')
  })
})

describe('icon replacement', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('replaces {icons: [typescript, nextjs]} with anchor+img HTML for both icons', async () => {
    const html = await processWithIcons('{icons: [typescript, nextjs]}')
    // Should contain links and images for both icons
    expect(html).toContain(icons.typescript.url)
    expect(html).toContain(icons.typescript.imgSrc)
    expect(html).toContain(icons.nextjs.url)
    expect(html).toContain(icons.nextjs.imgSrc)
    // The raw syntax should not appear literally
    expect(html).not.toContain('{icons:')
  })

  it('wraps icons in a div.icon container', async () => {
    const html = await processWithIcons('{icons: [python]}')
    // generateIconsHtml wraps output in <div class="icon">; rehypeRaw preserves it
    expect(html).toContain('class="icon"')
  })

  it('silently drops an unknown slug and emits a console.warn', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const html = await processWithIcons('{icons: [definitely-not-a-real-slug]}')
    // The broken slug must not appear in the rendered HTML
    expect(html).not.toContain('definitely-not-a-real-slug')
    // A warning must have been emitted
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('definitely-not-a-real-slug'),
    )
  })

  it('handles a mix of valid and unknown slugs without throwing', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const html = await processWithIcons('{icons: [typescript, bad-slug, nextjs]}')
    // Valid icons still render
    expect(html).toContain(icons.typescript.url)
    expect(html).toContain(icons.nextjs.url)
    // Bad slug does not appear
    expect(html).not.toContain('bad-slug')
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('bad-slug'))
  })
})

describe('processMarkdown — HTML passthrough', () => {
  it('preserves raw HTML (allowDangerousHtml + rehypeRaw)', async () => {
    const html = await processMarkdown(
      '<div class="icon"><a href="https://example.com">icon</a></div>',
    )
    expect(html).toContain('<div class="icon">')
    expect(html).toContain('href="https://example.com"')
  })
})
