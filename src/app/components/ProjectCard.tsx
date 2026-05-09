import Image from 'next/image'
import Link from 'next/link'
import { Project } from '@/app/data/projects'
import { useState } from 'react'

/**
 * ProjectCard Component
 *
 * A card component that displays project information in the portfolio grid.
 * Each card is a clickable link that leads to the project's detail page.
 *
 * Features:
 * - Displays project banner image
 * - Shows project title and description
 * - Includes technology tags with desktop hover animation
 * - Responsive design with consistent styling
 */

type Props = {
  project: Project
  priority?: boolean
}

export default function ProjectCard({ project, priority = false }: Props) {
  const [src, setSrc] = useState(project.banner)
  const [isHovered, setIsHovered] = useState(false)

  // Sabit genişlik değerleri (padding dahil)
  const TAG_PADDING = 24 // px-3 (sol ve sağ padding)
  const TAG_GAP = 8 // gap-2
  const CONTAINER_WIDTH = 320 // Container genişliği

  // Tag'lerin toplam genişliğini hesapla ve sığanları belirle
  const calculateVisibleTags = () => {
    let currentWidth = 0
    let visibleCount = 0

    for (const tech of project.technologies) {
      // Her karakteri yaklaşık 8px olarak hesapla
      const tagWidth = tech.length * 8 + TAG_PADDING

      // Gap'i de ekleyerek toplam genişliği hesapla
      if (currentWidth + tagWidth + (visibleCount > 0 ? TAG_GAP : 0) <= CONTAINER_WIDTH) {
        currentWidth += tagWidth + (visibleCount > 0 ? TAG_GAP : 0)
        visibleCount++
      } else {
        break
      }
    }

    return visibleCount
  }

  const visibleCount = calculateVisibleTags()
  const visibleTechs = project.technologies.slice(0, visibleCount)
  const remainingTechs = project.technologies.slice(visibleCount)
  const hasRemainingTechs = remainingTechs.length > 0

  return (
    <div
      className="block h-[280px] sm:h-[320px] md:h-[450px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/portfolio/${project.repoName}`} className="block h-full">
        <article className="flex h-full cursor-pointer flex-col overflow-hidden rounded-lg bg-(--nav-background-color) shadow-lg transition-transform hover:scale-[1.02]">
          <div className="relative h-24 shrink-0 sm:h-32 md:h-48">
            <Image
              src={src}
              alt={`${project.title} banner`}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
              priority={priority}
              loading={priority ? 'eager' : 'lazy'}
              onError={() => setSrc('/img/placeholder_img.png')}
            />
          </div>

          <div className="flex min-h-0 flex-1 flex-col p-3 sm:p-4 md:h-[calc(450px-12rem)] md:p-6">
            <div className="min-h-0 flex-1">
              <h2 className="mb-2 line-clamp-2 overflow-hidden text-base font-bold text-ellipsis text-(--text-color) sm:text-lg md:mb-4 md:h-14 md:text-2xl">
                {project.title}
              </h2>

              <p className="mb-3 line-clamp-5 text-xs text-(--text-color) opacity-90 sm:text-sm md:mb-4 md:line-clamp-4 md:text-base">
                {project.description}
              </p>
            </div>

            <div className="mt-3 flex flex-nowrap gap-1.5 overflow-hidden md:hidden">
              {project.technologies
                .slice(0, project.technologies.length > 2 ? 1 : 2)
                .map((tech) => (
                  <span
                    key={tech}
                    className="bg-background inline-block shrink-0 rounded-full px-2 py-1 text-[0.65rem] leading-none whitespace-nowrap sm:text-xs"
                  >
                    {tech}
                  </span>
                ))}
              {project.technologies.length > 2 && (
                <span className="bg-background inline-block shrink-0 rounded-full px-2 py-1 text-[0.65rem] leading-none whitespace-nowrap sm:text-xs">
                  +{project.technologies.length - 1}
                </span>
              )}
            </div>

            <div className="relative hidden overflow-hidden md:block">
              <div className="flex gap-2 whitespace-nowrap">
                <div
                  className={`flex gap-2 transition-all duration-700 ease-in-out ${
                    hasRemainingTechs && isHovered
                      ? '-translate-x-full opacity-0'
                      : 'translate-x-0 opacity-100'
                  }`}
                >
                  {visibleTechs.map((tech) => (
                    <span
                      key={tech}
                      className="bg-background inline-block rounded-full px-3 py-1 text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {hasRemainingTechs && (
                  <div
                    className={`absolute left-0 flex gap-2 transition-all duration-700 ease-in-out ${
                      isHovered ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
                    }`}
                  >
                    {remainingTechs.map((tech) => (
                      <span
                        key={tech}
                        className="bg-background inline-block rounded-full px-3 py-1 text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </article>
      </Link>
    </div>
  )
}
