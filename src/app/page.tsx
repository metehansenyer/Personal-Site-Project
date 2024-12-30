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
    { href: '/portfolio', text: 'Portföy' }
  ],
  [
    { href: '/contact', text: 'Bana Ulaşın' }
  ]
]

export default function Home() {
  return (
    <main className="w-[80%] h-full mx-auto flex flex-col justify-center overflow-hidden">
      {/* Main Title Section */}
      <div className="text-center">
        <div className="text-[1.5rem] leading-[3.5rem] text-[var(--text-color)]">
          METE
        </div>
        <div className="text-[7.5rem] leading-[7.5rem] text-[var(--text-color)]">
          BUYRUN
          <br />
          BENİM
        </div>
      </div>

      {/* Navigation Section */}
      <nav>
        {navigationButtons.map((row, rowIndex) => (
          <ul key={rowIndex} className="flex justify-center">
            {row.map((button) => (
              <li key={button.href} className="mx-auto mt-12">
                <Button 
                  href={button.href} 
                  width="w-[27rem]" 
                  height="h-16" 
                  fontSize="text-[2rem]"
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
