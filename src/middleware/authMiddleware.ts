import { NextMiddleware, NextRequest, NextResponse } from 'next/server';
import { decrypt } from '../../auth';

export const nonApiMiddleware: NextMiddleware = async (request: NextRequest) => {
  console.log("pathname: ", request.nextUrl.pathname);

  if (!request.nextUrl.pathname.startsWith("/auth")) {
    const session = request.cookies.get("session")?.value;
    if(session){
      let tokenPayload = await decrypt(session!);
      const userId = tokenPayload.id;
      console.log('this is the user id',userId)
      const requestHeaders = new Headers(request.headers);
      console.log("here is the user id",requestHeaders.get("userId"))
    }
    
    console.log("session: ", session);
    if (!session) {
      return NextResponse.redirect(new URL('/alphaherd/auth/login', request.url));
    }
  }

  return NextResponse.next(); 
};