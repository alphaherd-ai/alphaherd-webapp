import type { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { nonApiMiddleware } from './middleware/authMiddleware';
import { apiMiddleware } from './middleware/blockAPI';
import { isAuthorized } from './middleware/isAuthorized';
import { getVerifyOrgandBranch } from './middleware/orgVerify';


export async function middleware(request: NextRequest, event: NextFetchEvent) {
  const url = request.nextUrl;
  console.log("INSIDE MIDDLEWARE");
  console.log(request.url);
  if (!url.pathname.startsWith('/api')) {
    return nonApiMiddleware(request, event);
  }
  console.log("Going to is authorized");
  return isAuthorized(request);
}
export const config = {
  matcher: ['/api/database/:path',
  '/api/finance/:path*',
  '/api/inventory/:path*',
  '/api/settings/:path*',
  '/((?!api|_next/static|_next/image|favicon.ico).*)','/'],
};
