import { describe, it, expect } from 'vitest'
import { existsSync, readFileSync } from 'node:fs'
import icons from './icons'

describe('icon registry', () => {
  it('has no placeholder entries and only name/url/imgSrc fields', () => {
    expect(Object.keys(icons)).not.toContain('template')
    for (const icon of Object.values(icons)) {
      expect(Object.keys(icon).sort()).toEqual(['imgSrc', 'name', 'url'])
      expect(icon.url).toMatch(/^https:\/\//)
      expect(icon.imgSrc).toMatch(/^\/icons\/tech\/[\w-]+\.(svg|png)$/)
    }
  })

  it('self-hosts every icon as a real image file under public/', () => {
    for (const [slug, icon] of Object.entries(icons)) {
      const file = new URL(`../../public${icon.imgSrc}`, import.meta.url)
      expect(existsSync(file), `${slug}: ${icon.imgSrc} is missing`).toBe(true)
      const bytes = readFileSync(file)
      expect(bytes.length, `${slug} is empty`).toBeGreaterThan(0)
      if (icon.imgSrc.endsWith('.svg')) {
        expect(bytes.toString('utf8', 0, 100), `${slug} is not an SVG`).toMatch(/^\s*(<svg|<\?xml)/)
      } else {
        expect(bytes.subarray(1, 4).toString('latin1'), `${slug} is not a PNG`).toBe('PNG')
      }
    }
  })
})
