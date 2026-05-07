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
  children: React.ReactNode
}

export default function Button({ href, width, height, fontSize, newTab, children }: ButtonProps) {
  return (
    <Link href={href} target={newTab ? '_blank' : undefined}>
      <div
        className={`${width} ${height} ${fontSize} rounded-(--border-radius-large) border-2 border-solid border-(--text-color) bg-(--nav-background-color) py-4 text-center leading-8 text-(--text-color) transition-all duration-300 hover:bg-(--text-color) hover:text-(--nav-background-color)`}
      >
        {children}
      </div>
    </Link>
  )
}
