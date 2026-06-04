'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Project } from '@/app/data/projects'
import icons from '@/app/data/icons'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

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

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

type Props = {
  project: Project
  priority?: boolean
}

export default function ProjectCard({ project, priority = false }: Props) {
  const [src, setSrc] = useState(project.banner)
  const [isHovered, setIsHovered] = useState(false)
  const [splitIndex, setSplitIndex] = useState(0)
  const measureRef = useRef<HTMLDivElement>(null)

  // Measure which tags fit in the actual rendered row instead of guessing
  // from character count — the heuristic broke on font / padding / column-width changes.
  useIsoLayoutEffect(() => {
    const container = measureRef.current
    if (!container) return

    const compute = () => {
      const tags = container.querySelectorAll<HTMLElement>('[data-measure-tag]')
      const containerWidth = container.clientWidth
      let count = 0
      for (const tag of tags) {
        if (tag.offsetLeft + tag.offsetWidth <= containerWidth) count++
        else break
      }
      setSplitIndex(count)
    }

    compute()
    const ro = new ResizeObserver(compute)
    ro.observe(container)
    return () => ro.disconnect()
  }, [project.technologies])

  const visibleTechs = project.technologies.slice(0, splitIndex)
  const remainingTechs = project.technologies.slice(splitIndex)
  const hasRemainingTechs = remainingTechs.length > 0

  return (
    <div
      className="block h-auto sm:h-[320px] md:h-[450px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/portfolio/${project.repoName}`} className="block h-full">
        <article className="flex h-full cursor-pointer flex-col overflow-hidden rounded-lg bg-(--nav-background-color) shadow-lg transition-transform hover:scale-[1.02]">
          <div className="relative h-44 shrink-0 sm:h-32 md:h-48">
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

          <div className="flex flex-1 flex-col p-4 sm:p-4 md:h-[calc(450px-12rem)] md:p-6">
            <div className="min-h-0 flex-1">
              <h2 className="mb-2 line-clamp-2 overflow-hidden text-base font-bold text-ellipsis text-(--text-color) sm:text-lg md:mb-4 md:h-14 md:text-2xl">
                {project.title}
              </h2>

              <p className="mb-3 line-clamp-3 text-xs text-(--text-color) opacity-90 sm:text-sm md:mb-4 md:line-clamp-4 md:text-base">
                {project.description}
              </p>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5 md:hidden">
              {project.technologies.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="bg-background inline-block shrink-0 rounded-full px-2 py-1 text-[0.65rem] leading-none whitespace-nowrap sm:text-xs"
                >
                  {icons[tech].name}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="bg-background inline-block shrink-0 rounded-full px-2 py-1 text-[0.65rem] leading-none whitespace-nowrap sm:text-xs">
                  +{project.technologies.length - 3}
                </span>
              )}
            </div>

            <div className="relative hidden overflow-hidden md:block">
              {/* Invisible row of all tags — sets the row's intrinsic height and
                  is measured to decide how many fit before overflowing. */}
              <div
                ref={measureRef}
                aria-hidden="true"
                className="pointer-events-none invisible flex gap-2 whitespace-nowrap"
              >
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    data-measure-tag=""
                    className="bg-background inline-block rounded-full px-3 py-1 text-sm"
                  >
                    {icons[tech].name}
                  </span>
                ))}
              </div>

              <div className="absolute inset-0 flex gap-2 whitespace-nowrap">
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
                      {icons[tech].name}
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
                        {icons[tech].name}
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
