import { NextMiddleware, NextRequest, NextResponse } from 'next/server';
import { decrypt } from '../../auth';
import prismaClient from '../../prisma';
export const nonApiMiddleware: NextMiddleware = async (request: NextRequest) => {
  const session = request.cookies.get("session")?.value;
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/_next")) return NextResponse.next();
  if (!session) {
    const loginPath = `${process.env.NEXT_PUBLIC_API_BASE_PATH}/auth/login`;
    if (request.nextUrl.pathname !== '/auth/login') {
      return NextResponse.redirect(loginPath);
    }else{
      return NextResponse.next();
    }
  }
  
  try {
    const decryptedSession = await decrypt(session);
    if(!decryptedSession.id){
      const loginPath = `${process.env.NEXT_PUBLIC_API_BASE_PATH}/auth/login`;
      if (request.nextUrl.pathname !== '/auth/login') {
        return NextResponse.redirect(loginPath);
      }else{
        return NextResponse.next();
      }
    }
    const user = await prismaClient.user.findUnique({
      where: { id: decryptedSession.id },
    });
  
    if (!user) {
      const loginPath = `${process.env.NEXT_PUBLIC_API_BASE_PATH}/auth/login`;
      if (request.nextUrl.pathname !== '/auth/login') {
        return NextResponse.redirect(loginPath);
      }else{
        return NextResponse.next();
      }
    }
  } catch (error) {
    console.error('Error:', error);
    const loginPath = `${process.env.NEXT_PUBLIC_API_BASE_PATH}/auth/login`;
    if (request.nextUrl.pathname !== '/auth/login') {
      return NextResponse.redirect(loginPath);
    }else{
      return NextResponse.next();
    }
  }

  return NextResponse.next(); 
};
