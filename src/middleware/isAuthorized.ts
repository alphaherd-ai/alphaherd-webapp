import { NextMiddleware, NextRequest, NextResponse } from 'next/server';
import { decrypt } from '../../auth';


export const isAuthorized: NextMiddleware = async (request: NextRequest) => {
  try {
    const token = request.cookies.get('session')?.value;
    console.log(token)
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
    const requestHeaders = new Headers(request.headers);
    let tokenPayload = await decrypt(token!);

    requestHeaders.set('userid', tokenPayload.id);

    const response = NextResponse.next({
      request: {
        headers: requestHeaders
      }
    });
    return response
  }
  catch (err) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
}
