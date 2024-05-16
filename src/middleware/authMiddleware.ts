import { NextMiddleware, NextRequest, NextResponse } from 'next/server';

export const nonApiMiddleware: NextMiddleware = async (request: NextRequest) => {
  console.log("pathname: ", request.nextUrl.pathname);

  if (!request.nextUrl.pathname.startsWith("/auth")) {
    const session = request.cookies.get("session")?.value;
    console.log("session: ", session);
    if (!session) {
      return NextResponse.redirect(new URL('/alphaherd/auth/login', request.url));
    }
  }

  return NextResponse.next(); 
};