import { NextResponse, type NextFetchEvent, type NextRequest } from 'next/server';
import { nonApiMiddleware } from './middleware/authMiddleware';
import { isAuthorized } from './middleware/isAuthorized';
import next from 'next';


export async function middleware(request: NextRequest, event: NextFetchEvent) {
  const url = request.nextUrl;
  if(url.pathname.startsWith('/auth')) {
    return NextResponse.next();
  }
  if (!url.pathname.startsWith('/api')) {
    return nonApiMiddleware(request, event);
  }
  // return isAuthorized(request);
  // return isAuthorized(request);
}


