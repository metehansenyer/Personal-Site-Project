import { describe, it, expect } from 'vitest'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import Callout from './Callout.astro'

async function render(type: 'important' | 'warning' | 'note', content: string) {
  const container = await AstroContainer.create()
  return container.renderToString(Callout, { props: { type }, slots: { default: content } })
}

describe('Callout - type: important', () => {
  it('renders the label', async () => {
    expect(await render('important', 'Some important text')).toContain('ⓘ ÖNEMLİ')
  })
  it('applies the important border color class', async () => {
    expect(await render('important', 'x')).toContain('border-[var(--important-color)]')
  })
  it('renders children content', async () => {
    expect(await render('important', 'Read this carefully.')).toContain('Read this carefully.')
  })
})

describe('Callout - type: warning', () => {
  it('renders the label', async () => {
    expect(await render('warning', 'Be careful.')).toContain('⚠️ UYARI')
  })
  it('applies the warning border color class', async () => {
    expect(await render('warning', 'Be careful.')).toContain('border-[var(--warning-color)]')
  })
})

describe('Callout - type: note', () => {
  it('renders the label', async () => {
    expect(await render('note', 'Just a note.')).toContain('ⓘ NOT')
  })
  it('applies the note border color class', async () => {
    expect(await render('note', 'Just a note.')).toContain('border-[var(--note-color)]')
  })
})

describe('Callout - structure', () => {
  it('renders a left border div wrapping content', async () => {
    const html = await render('note', 'Content here')
    expect(html).toContain('border-l-[6px]')
    expect(html).toContain('Content here')
  })
  it("does not leak other types' colors", async () => {
    const html = await render('note', 'x')
    expect(html).not.toContain('--important-color')
    expect(html).not.toContain('--warning-color')
  })
})
