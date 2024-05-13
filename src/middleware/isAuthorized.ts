import  { NextMiddleware, NextRequest, NextResponse } from 'next/server';

  
export const isAuthorized: NextMiddleware = async (request: NextRequest) => {
  const token = request.cookies.get('session')?.value;
  const requestHeaders= new Headers(request.headers);
  if(token)
  requestHeaders.set('token',token);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders
    }
  })

  return response
}
