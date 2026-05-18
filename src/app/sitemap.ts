import type { MetadataRoute } from 'next'
import { routes } from './data/routes'
import { projects } from './data/projects'
import { SITE_URL } from './lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = routes.map((route) => ({
    url: route.path === '/' ? SITE_URL : `${SITE_URL}${route.path}`,
    changeFrequency: route.sitemap.changeFrequency,
    priority: route.sitemap.priority,
  }))

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${SITE_URL}/portfolio/${project.repoName}`,
    lastModified: project.releaseDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...projectRoutes]
}
