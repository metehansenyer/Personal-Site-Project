import Link from 'next/link'

/**
 * Button Component
 *
 * A reusable button component that wraps Next.js Link component.
 * Used throughout the application for consistent navigation buttons.
 *
 * Features:
 * - Customizable width, height, and font size through props
 * - Consistent hover and animation effects
 * - Accessible through keyboard navigation
 */

interface ButtonProps {
  href: string
  width: string
  height: string
  fontSize: string
  newTab?: boolean
  umamiEvent?: string
  umamiEventData?: Record<string, string>
  children: React.ReactNode
}

export default function Button({
  href,
  width,
  height,
  fontSize,
  newTab,
  umamiEvent,
  umamiEventData,
  children,
}: ButtonProps) {
  const umamiProps = umamiEvent
    ? {
        'data-umami-event': umamiEvent,
        ...Object.fromEntries(
          Object.entries(umamiEventData ?? {}).map(([k, v]) => [`data-umami-event-${k}`, v]),
        ),
      }
    : {}

  return (
    <Link
      href={href as never}
      target={newTab ? '_blank' : undefined}
      {...umamiProps}
      className={`${width} ${height} ${fontSize} inline-flex items-center justify-center rounded-(--border-radius-large) border-2 border-solid border-(--text-color) bg-(--nav-background-color) px-4 text-center leading-none text-(--text-color) transition-all duration-300 hover:bg-(--text-color) hover:text-(--nav-background-color)`}
    >
      {children}
    </Link>
  )
}
