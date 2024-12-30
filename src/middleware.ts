/**
 * Middleware Module
 * 
 * This module handles request processing before they reach the page components.
 * It provides mobile device detection and routing functionality.
 * 
 * Features:
 * - Mobile device detection using User-Agent
 * - Automatic redirection to mobile page for mobile devices
 * - Project repository name handling for portfolio pages
 * - Path-based routing configuration
 */

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// List of mobile User-Agent patterns
// Used to identify requests coming from mobile devices
const MOBILE_USER_AGENTS = [
  /Android/i,
  /webOS/i,
  /iPhone/i,
  /iPad/i,
  /iPod/i,
  /BlackBerry/i,
  /Windows Phone/i,
  /Mobile/i,
]

// Check if the request is from a mobile device
// Returns true if the User-Agent matches any mobile pattern
function isMobileDevice(userAgent: string): boolean {
  return MOBILE_USER_AGENTS.some((regex) => regex.test(userAgent))
}

// Main middleware function
// Processes each request before it reaches the page components
export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  // Handle mobile device redirection
  if (!request.nextUrl.pathname.startsWith('/mobile')) {
    const userAgent = request.headers.get('user-agent') || ''
    const isMobile = isMobileDevice(userAgent)
  
    // Redirect mobile users to the mobile page
    if (isMobile) {
      return NextResponse.redirect(new URL('/mobile', request.url))
    }
  }

  // Handle portfolio project routing
  if (request.nextUrl.pathname.startsWith('/portfolio/')) {
    const projectRepoName = request.nextUrl.pathname.split('/').pop()
    response.headers.set('x-project-repo-name', projectRepoName || '')
  }

  return response
}

// Middleware configuration
// Defines which paths should be processed by the middleware
export const config = {
  matcher: [
    // Match portfolio project pages
    '/portfolio/:projectRepoName*',
    // Match all pages except specific paths
    '/((?!mobile|_next/static|_next/image|favicon.ico).*)',
  ],
} 