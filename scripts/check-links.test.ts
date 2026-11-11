import { describe, it, expect } from 'vitest'
import { checkBuild, extractRefs, pageUrl, parseRef, resolveFile } from './check-links.mjs'

const files = new Set([
  'index.html',
  'about/index.html',
  'portfolio/index.html',
  'portfolio/demo/index.html',
  '404.html',
  'favicon.ico',
  '_astro/app.css',
])

describe('pageUrl', () => {
  it('maps built files to the URLs nginx serves them at', () => {
    expect(pageUrl('index.html')).toBe('/')
    expect(pageUrl('about/index.html')).toBe('/about')
    expect(pageUrl('portfolio/demo/index.html')).toBe('/portfolio/demo')
    expect(pageUrl('404.html')).toBe('/404.html')
  })
})

describe('resolveFile (nginx try_files $uri $uri/index.html $uri.html)', () => {
  it('serves files as is, directories through index.html, and .html without the extension', () => {
    expect(resolveFile('/', files)).toBe('index.html')
    expect(resolveFile('/about', files)).toBe('about/index.html')
    expect(resolveFile('/about/', files)).toBe('about/index.html')
    expect(resolveFile('/favicon.ico', files)).toBe('favicon.ico')
    expect(resolveFile('/_astro/app.css', files)).toBe('_astro/app.css')
    expect(resolveFile('/404', files)).toBe('404.html')
  })
  it('returns null for missing files', () => {
    expect(resolveFile('/portfolio/LICENSE', files)).toBeNull()
    expect(resolveFile('/nope/', files)).toBeNull()
    expect(resolveFile('/_astro/', files)).toBeNull()
  })
})

describe('parseRef', () => {
  const origin = 'https://example.dev'
  it('skips mailto, tel, data and other hosts', () => {
    for (const url of [
      'mailto:a@b.c',
      'tel:123',
      'data:image/png;base64,AA',
      'https://other.dev/x',
    ]) {
      expect(parseRef(url, '/about', origin)).toEqual({ skip: true })
    }
  })
  it('resolves relative links against the page URL without trailing slash', () => {
    expect(parseRef('LICENSE', '/portfolio/demo', origin)).toMatchObject({
      pathname: '/portfolio/LICENSE',
    })
    expect(parseRef('../about', '/portfolio/demo', origin)).toMatchObject({
      pathname: '/about',
    })
    expect(parseRef('/about', '/portfolio/demo', origin)).toMatchObject({ pathname: '/about' })
  })
  it('treats links to the site own origin as internal and splits the fragment', () => {
    expect(parseRef('https://example.dev/about#team', '/', origin)).toEqual({
      skip: false,
      pathname: '/about',
      fragment: 'team',
    })
  })
})

describe('extractRefs', () => {
  it('collects href, src and srcset URLs and ids, ignoring scripts, styles and comments', () => {
    const html = `<!-- <a href="/commented"> -->
      <a class="[&>svg]:x" href="/about?x=1#a" id="top-link">x</a>
      <img src="/i.png" srcset="/a.webp 640w, /b.webp 980w">
      <h2 id="sec">t</h2><a name="old">o</a>
      <script>var s = '<a href="/in-script">'</script>
      <script src="/s.js"></script>`
    const { refs, ids } = extractRefs(html)
    expect(refs.map((r: { url: string }) => r.url)).toEqual([
      '/about?x=1#a',
      '/i.png',
      '/a.webp',
      '/b.webp',
      '/s.js',
    ])
    expect([...ids]).toEqual(['top-link', 'sec', 'old'])
  })
})

describe('checkBuild', () => {
  const pages: Record<string, string> = {
    'index.html': '<a href="/about">a</a><a href="/portfolio/demo#intro">d</a><a href="#">top</a>',
    'about/index.html':
      '<a href="/">h</a><a href="mailto:x@y.z">m</a><a href="https://o.dev/">o</a>',
    'portfolio/index.html': '<a href="/portfolio/demo">d</a>',
    'portfolio/demo/index.html':
      '<h2 id="intro">i</h2><a href="LICENSE">bad</a><a href="#missing">bad</a>',
    '404.html': '<a href="/">home</a>',
    'favicon.ico': '',
    '_astro/app.css': '',
  }
  const run = () => checkBuild({ files: Object.keys(pages), read: (f: string) => pages[f] })

  it('reports relative links that resolve to missing files and missing fragments', () => {
    const problems = run()
    expect(problems.map((p: { page: string; link: string }) => [p.page, p.link])).toEqual([
      ['/portfolio/demo', 'LICENSE'],
      ['/portfolio/demo', '#missing'],
    ])
  })

  it('accepts a page that links only to existing targets and fragments', () => {
    const only: Record<string, string> = {
      ...pages,
      'portfolio/demo/index.html': '<h2 id="intro">i</h2><a href="#intro">ok</a>',
    }
    expect(checkBuild({ files: Object.keys(only), read: (f: string) => only[f] })).toEqual([])
  })

  it('checks sitemap URLs', () => {
    const withMap: Record<string, string> = {
      ...pages,
      'index.html': '',
      'portfolio/demo/index.html': '',
      'sitemap.xml': '<loc>https://example.dev/about</loc><loc>https://example.dev/gone</loc>',
    }
    const problems = checkBuild({
      files: Object.keys(withMap),
      read: (f: string) => withMap[f],
      origin: 'https://example.dev',
    })
    expect(problems.map((p: { link: string }) => p.link)).toEqual(['https://example.dev/gone'])
  })
})
