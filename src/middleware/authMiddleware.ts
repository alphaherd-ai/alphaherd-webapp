import { NextMiddleware, NextRequest, NextResponse } from 'next/server';
import { decrypt } from '../../auth';

export const nonApiMiddleware: NextMiddleware = async (request: NextRequest) => {
  console.log("pathname: ", request.nextUrl.pathname);

  if (!request.nextUrl.pathname.startsWith("/auth")) {
    const session = request.cookies.get("session")?.value;
    
    
    console.log("session: ", session);
    if (!session) {
      return new Response(JSON.stringify({ "message": 'Not Authorized' }), { status: 401 });
    }
  }

  return NextResponse.next(); 
};