import type { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { nonApiMiddleware } from './middleware/authMiddleware';
import { apiMiddleware } from './middleware/blockAPI';
import { isAuthorized } from './middleware/isAuthorized';

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  const url = request.nextUrl;
  if (!url.pathname.startsWith('/api')) {
    return nonApiMiddleware(request, event);
  }
  
  else
  await isAuthorized(request,event);
  return apiMiddleware(request, event);
}


export const config = {
  matcher: ['/api/database/:path*',
  '/api/finance/:path*',
  '/api/inventory/:path*',
  '/api/settings/:path*',
  '/((?!api|_next/static|_next/image|favicon.ico).*)','/'],
};
