import type { NextFetchEvent, NextRequest } from 'next/server';
import { nonApiMiddleware } from './middleware/authMiddleware';
import { isAuthorized } from './middleware/isAuthorized';


export async function middleware(request: NextRequest, event: NextFetchEvent) {
  const url = request.nextUrl;
  if (!url.pathname.startsWith('/api')) {
    return nonApiMiddleware(request, event);
  }
  // return isAuthorized(request);
}


