import Image from 'next/image'
import icons from '@/app/data/icons'
import type { IconSlug } from '@/app/data/icons'

interface IconProps {
  slugs: IconSlug[]
}

export default function Icon({ slugs }: IconProps) {
  const validIcons = slugs.filter((slug) => {
    if (!(slug in icons)) {
      console.warn(`[Icon] unknown icon slug: ${slug}`)
      return false
    }
    return true
  })

  return (
    <div className="icon my-5 flex w-full flex-wrap items-center justify-center gap-[10px] bg-transparent">
      {validIcons.map((slug) => {
        const icon = icons[slug]
        return (
          <a
            key={slug}
            className="icon-link bg-transparent"
            href={icon.url}
            target="_blank"
            rel="noreferrer"
          >
            <Image
              className="icon-img bg-transparent transition-all hover:scale-110"
              src={icon.imgSrc}
              alt={icon.alt}
              width={40}
              height={40}
            />
          </a>
        )
      })}
    </div>
  )
}
