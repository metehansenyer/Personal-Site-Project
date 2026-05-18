/**
 * Proxy Module
 *
 * This module handles request processing before pages render.
 * - Adds metadata for portfolio project detail pages
 */

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Main proxy function
// Processes each request before it reaches the page components
export function proxy(request: NextRequest) {
  const response = NextResponse.next()

  // Handle portfolio project routing
  if (request.nextUrl.pathname.startsWith('/portfolio/')) {
    const projectRepoName = request.nextUrl.pathname.split('/').pop()
    response.headers.set('x-project-repo-name', projectRepoName || '')
  }

  return response
}

// Proxy configuration
// Defines which paths should be processed by the proxy
export const config = {
  matcher: ['/portfolio/:projectRepoName*'],
}
