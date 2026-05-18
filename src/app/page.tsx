/**
 * Home Page Component
 *
 * This component serves as the landing page of the portfolio website.
 * It provides a minimalist design with a centered layout and navigation buttons.
 *
 * Features:
 * - Clean and modern design
 * - Centered navigation layout
 * - Responsive button grid
 * - Custom typography and spacing
 */

import Button from './components/Button'

// Navigation button configuration
// Organized in a two-row layout for visual balance
const navigationButtons = [
  [
    { href: '/about', text: 'Ben Kimim?' },
    { href: '/portfolio', text: 'Portföy' },
  ],
  [{ href: '/contact', text: 'Bana Ulaşın' }],
]

export default function Home() {
  return (
    <main className="mx-auto flex min-h-svh w-full max-w-[90%] flex-col justify-center overflow-hidden sm:max-w-[80%] md:min-h-screen">
      {/* Main Title Section */}
      <div className="text-center">
        <div className="text-sm leading-7 tracking-[0.2em] text-(--text-color) sm:text-[1.25rem] md:text-[1.5rem] md:leading-[3.5rem] md:tracking-normal">
          METE
        </div>
        <div className="text-[clamp(3.8rem,15vw,4.75rem)] leading-[0.95] tracking-[-0.04em] text-(--text-color) md:text-[7.5rem] md:leading-[7.5rem] md:tracking-normal">
          BUYRUN
          <br />
          BENİM
        </div>
      </div>

      {/* Navigation Section */}
      <nav className="mt-8 flex flex-col gap-3 md:mt-0 md:block">
        {navigationButtons.map((row, rowIndex) => (
          <ul
            key={rowIndex}
            className="flex flex-col items-center justify-center gap-3 md:flex-row md:gap-0"
          >
            {row.map((button) => (
              <li
                key={button.href}
                className="w-full md:mx-auto md:mt-12 md:w-auto md:max-w-[27rem]"
              >
                <Button
                  href={button.href}
                  width="w-full"
                  height="h-12 md:h-16"
                  fontSize="text-base md:text-[2rem]"
                >
                  {button.text}
                </Button>
              </li>
            ))}
          </ul>
        ))}
      </nav>
    </main>
  )
}
