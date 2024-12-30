/**
 * Not Found Handler Component
 * 
 * This component handles the default 404 (Not Found) route in Next.js.
 * It redirects users to the custom 404 page when they try to access non-existent routes.
 * 
 * Features:
 * - Automatic redirection to custom 404 page
 * - Consistent error handling across the application
 * - Integration with Next.js routing system
 */

import { redirect } from 'next/navigation'

export default function NotFound() {
  redirect('/404')
}