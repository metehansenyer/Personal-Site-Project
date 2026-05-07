import mobileContent from '@/app/data/mobileContent'

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
    <main className="flex h-full w-full items-center justify-center">
      <div className="mx-auto w-full max-w-2xl px-4">
        <div className="space-y-6 rounded-(--border-radius-medium) bg-(--nav-background-color) p-6 text-center shadow-lg">
          <h2 className="text-3xl font-bold text-(--text-color)">{mobileContent.title}</h2>
          <p className="text-lg text-(--text-color)">{mobileContent.description}</p>
          <p className="text-sm text-(--text-color)">{mobileContent.note}</p>
        </div>
      </div>
    </main>
  )
}
