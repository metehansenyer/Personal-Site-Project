'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Project } from '@/app/data/projects'

/**
 * Project Banner Component
 * 
 * A client component that handles the project banner image display
 * with fallback to placeholder image on error.
 * 
 * Features:
 * - Error handling for failed image loads
 * - Automatic fallback to placeholder image
 * - Responsive image display
 * - Optimized loading with priority
 */

type Props = {
  project: Project
}

export default function ProjectBanner({ project }: Props) {
  const [imageSrc, setImageSrc] = useState(project.banner)

  return (
    <div className="relative rounded-lg overflow-hidden shadow-lg">
      <Image
        src={imageSrc}
        alt={`${project.title} banner`}
        width={1920}
        height={1080}
        priority
        className="object-contain w-full h-auto"
        onError={() => setImageSrc('/img/placeholder_img.png')}
      />
    </div>
  )
} 