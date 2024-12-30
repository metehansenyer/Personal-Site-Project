import notFoundContent from '@/app/data/notFoundContent';

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
    <main className="w-full h-fullmx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-[var(--text-color)]">
          {notFoundContent.title}
        </h1>
        <p className="text-xl md:text-2xl text-[var(--text-color)] opacity-70 text-center">
          {notFoundContent.description}
        </p>
      </div>
    </main>
  )
}