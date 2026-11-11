// Interface for contact page content structure
// Used to maintain type safety and centralize content management
interface ContactContent {
  title: string
  description: string
  footerText: string
}

// Content configuration for the contact page
// Contains all text content used in the contact section
// Including title, description, and footer message (the email lives in `lib/site.ts`)
export const contactContent: ContactContent = {
  title: 'İletişime Geçin',
  description:
    'Projeleriniz, işbirliği fırsatları veya herhangi bir soru için benimle iletişime geçebilirsiniz.',
  footerText: 'En kısa sürede size dönüş yapacağım.',
}
