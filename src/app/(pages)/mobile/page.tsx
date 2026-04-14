import mobileContent from '@/app/data/mobileContent';

/**
 * MobilePage Component
 * 
 * This component renders a notice page for mobile users.
 * It informs users that the mobile version is under development
 * and suggests using a desktop computer to access the site.
 * 
 * The content is managed through the mobileContent configuration
 * to support easy updates and potential internationalization.
 */
export default function MobilePage() {
  return (
    <main className="w-full h-full flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto px-4">
        <div className="bg-(--nav-background-color) rounded-(--border-radius-medium) p-6 shadow-lg text-center space-y-6">
          <h2 className="text-3xl font-bold text-(--text-color)">
            {mobileContent.title}
          </h2>
          <p className="text-(--text-color) text-lg">
            {mobileContent.description}
          </p>
          <p className="text-(--text-color) text-sm">
            {mobileContent.note}
          </p>
        </div>
      </div>
    </main>
  )
} 