import notFoundContent from '@/app/data/notFoundContent'

/**
 * NotFoundPage Component
 *
 * This component renders the 404 (Not Found) page.
 * It is displayed when users try to access non-existent routes.
 *
 * The content is managed through the notFoundContent configuration
 * to support easy updates and potential internationalization.
 */
export default function NotFoundPage() {
  return (
    <main className="mx-auto w-full px-4 py-8">
      <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-6">
        <h1 className="text-4xl font-bold text-(--text-color) md:text-6xl">
          {notFoundContent.title}
        </h1>
        <p className="text-center text-xl text-(--text-color) opacity-70 md:text-2xl">
          {notFoundContent.description}
        </p>
      </div>
    </main>
  )
}
