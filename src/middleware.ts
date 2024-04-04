import { NextResponse, NextRequest } from 'next/server'
import { decrypt, encrypt, updateSession } from '../auth';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {


  // here '/' means your public base path

  console.log("pathname: ",request.nextUrl.pathname)

  if(request.nextUrl.pathname!=="/auth/login" && request.nextUrl.pathname!=="/auth/orgSetup"){
    const session = request.cookies.get("session")?.value;
    console.log("session: ", session)
    if (!session) {
      return NextResponse.redirect(new URL('/alphaherd/auth/login', request.url))
      // Refresh the session so it doesn't expire
      // const parsed = await decrypt(session);
      // parsed.expires = new Date(Date.now() + 10 * 1000);
      // const res = new NextResponse();
      // res.cookies.set({
      //   name: "session",
      //   value: await encrypt(parsed),
      //   httpOnly: true,
      //   expires: parsed.expires,
      // });
      // return res;
    }
    // return await updateSession(request);
    // return NextResponse.redirect(new URL('/alphaherd/finance/overview', request.url))
  }
  // return await updateSession(request);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)','/']
}