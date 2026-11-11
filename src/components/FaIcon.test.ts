import { describe, it, expect } from 'vitest'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { faHeart, faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import FaIcon from './FaIcon.astro'

async function render(props: Record<string, unknown>) {
  const container = await AstroContainer.create()
  return container.renderToString(FaIcon, { props })
}

describe('FaIcon', () => {
  it('renders a decorative inline svg with the icon viewBox and path', async () => {
    const html = await render({ icon: faHeart })
    const [width, height, , , path] = faHeart.icon
    expect(html).toContain('<svg')
    expect(html).toContain('aria-hidden="true"')
    expect(html).toContain('focusable="false"')
    expect(html).toContain(`viewBox="0 0 ${width} ${height}"`)
    expect(html).toContain('fill="currentColor"')
    expect(html).toContain(`d="${path}"`)
  })

  it('sizes the svg like Font Awesome (1em high, inline, -0.125em baseline offset, not clamped by max-width)', async () => {
    const html = await render({ icon: faGithub })
    expect(html).toContain('height:1em')
    expect(html).toContain('display:inline-block')
    expect(html).toContain('vertical-align:-0.125em')
    expect(html).toContain('max-width:none')
  })

  it('applies extra classes', async () => {
    const html = await render({ icon: faHeart, class: 'animate-pulse text-red-500' })
    expect(html).toMatch(/class="[^"]*animate-pulse text-red-500/)
  })

  it('does not flip by default and mirrors horizontally with flip', async () => {
    expect(await render({ icon: faGraduationCap })).not.toContain('scaleX(-1)')
    expect(await render({ icon: faGraduationCap, flip: true })).toContain('transform:scaleX(-1)')
  })
})
