// Interface for contact page content structure
// Used to maintain type safety and centralize content management
interface ContactContent {
  title: string
  description: string
  email: string
  footerText: string
}

// Content configuration for the contact page
// Contains all text content used in the contact section
// Including title, description, contact email, and footer message
export const contactContent: ContactContent = {
  title: 'İletişime Geçin',
  description: 'Projeleriniz, işbirliği fırsatları veya herhangi bir soru için benimle iletişime geçebilirsiniz.',
  email: 'mthansnyr@gmail.com',
  footerText: 'En kısa sürede size dönüş yapacağım.'
} 