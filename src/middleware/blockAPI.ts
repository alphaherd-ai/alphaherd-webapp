import { NextMiddleware, NextRequest, NextResponse, NextFetchEvent } from 'next/server';
import { parseCookie } from '../utils/parseCookie';
import { validateToken } from '@/utils/validateToken';

  
export const apiMiddleware: NextMiddleware = async (request: NextRequest) => {
    const headers = request.headers;
    const cookieHeaderValue = headers.get('cookie');
    const sessionCookie = parseCookie(cookieHeaderValue || '');
    const token = sessionCookie.session;
    console.log("this is the token from API: ",token)
    if (!token) {
        console.log("hello this is blocked")
        return new Response(JSON.stringify({ "message": 'Not Authorized' }), { status: 401 });
    }
    const user =await validateToken(token);
    if(!user){
        console.log("hello this is blocked")
        return new Response(JSON.stringify({ "message": 'Not Authorized' }), { status: 401 });
    }
  
    console.log('not blocked!!')
  
    return NextResponse.next();
  };
  