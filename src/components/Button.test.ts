import { describe, it, expect } from 'vitest'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import Button from './Button.astro'

const base = { href: '/about', width: 'w-40', height: 'h-12', fontSize: 'text-lg' }

async function render(props: Record<string, unknown> = {}) {
  const container = await AstroContainer.create()
  return container.renderToString(Button, {
    props: { ...base, ...props },
    slots: { default: 'Hello' },
  })
}

describe('Button', () => {
  it('renders a link with href, slot content and size classes', async () => {
    const html = await render()
    expect(html).toContain('<a href="/about"')
    expect(html).toContain('Hello')
    expect(html).toContain('w-40')
    expect(html).toContain('h-12')
    expect(html).toContain('text-lg')
  })

  it('opens in a new tab only when newTab is set', async () => {
    expect(await render({ newTab: true })).toContain('target="_blank"')
    expect(await render()).not.toContain('target=')
    expect(await render({ newTab: false })).not.toContain('target=')
  })

  it('renders umami event and event-data attributes', async () => {
    const html = await render({
      umamiEvent: 'nav-click',
      umamiEventData: { page: 'about', position: 'top' },
    })
    expect(html).toContain('data-umami-event="nav-click"')
    expect(html).toContain('data-umami-event-page="about"')
    expect(html).toContain('data-umami-event-position="top"')
  })

  it('renders only the event name when there is no event data', async () => {
    const html = await render({ umamiEvent: 'click' })
    expect(html).toContain('data-umami-event="click"')
    expect(html).not.toContain('data-umami-event-')
  })

  it('renders no umami attributes when none are given', async () => {
    expect(await render()).not.toContain('data-umami')
  })

  it('ignores event data when there is no event name', async () => {
    expect(await render({ umamiEventData: { a: 'b' } })).not.toContain('data-umami')
  })
})
