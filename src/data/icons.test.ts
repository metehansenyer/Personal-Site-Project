import { describe, it, expect } from 'vitest'
import icons from './icons'

describe('icon registry', () => {
  it('has no placeholder entries and only name/url/imgSrc fields', () => {
    expect(Object.keys(icons)).not.toContain('template')
    for (const icon of Object.values(icons)) {
      expect(Object.keys(icon).sort()).toEqual(['imgSrc', 'name', 'url'])
      expect(icon.url).toMatch(/^https:\/\//)
      expect(icon.imgSrc).toMatch(/^https:\/\//)
    }
  })
})
