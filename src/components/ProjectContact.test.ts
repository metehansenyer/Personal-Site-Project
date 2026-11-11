import { describe, it, expect } from 'vitest'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import ProjectContact from './ProjectContact.astro'
import { socialLinks } from '@/data/socialLinks'
import { CONTACT_EMAIL } from '@/lib/site'
import { loadSiteContent } from '@/test/siteContent'

const labels = loadSiteContent().project.contact

async function render(note?: string) {
  const container = await AstroContainer.create()
  return container.renderToString(ProjectContact, { props: { labels, note } })
}

describe('ProjectContact', () => {
  it('renders heading, intro, email and LinkedIn links from site data', async () => {
    const html = await render()
    const linkedIn = socialLinks.find((l) => l.name === 'LinkedIn')!
    expect(html).toContain(`<h2>${labels.heading}</h2>`)
    expect(html).toContain(labels.intro)
    expect(html).toContain(`href="mailto:${CONTACT_EMAIL}"`)
    expect(html).toContain(`href="${linkedIn.url}"`)
    expect(html).toContain('@metehansenyer')
    expect(html).toContain('target="_blank"')
  })

  it('renders the project note only when given', async () => {
    expect(await render()).not.toMatch(/<\/ul>\s*<p>/)
    expect(await render('Talk to me!')).toContain('<p>Talk to me!</p>')
  })
})
