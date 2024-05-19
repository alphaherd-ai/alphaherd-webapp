import type { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { nonApiMiddleware } from './middleware/authMiddleware';
import { apiMiddleware } from './middleware/blockAPI';
import { isAuthorized } from './middleware/isAuthorized';
import { lastUsedBranch } from './utils/fetchBranchDetails';
import { getVerifyOrgandBranch } from './middleware/orgVerify';


export async function middleware(request: NextRequest, event: NextFetchEvent) {
  const url = request.nextUrl;
  const userId=request.headers.get('userid');
  console.log("this is the frontend url",url.href)
  const { searchParams } = new URL(url);
  const branchId = searchParams.get("orgBranchID")!;  
  if (!url.pathname.startsWith('/api')) {
    return nonApiMiddleware(request, event);
  }
  await getVerifyOrgandBranch(Number(userId),Number(branchId));
  return isAuthorized(request,event);
}


export const config = {
  matcher: ['/api/database/:path*',
  '/api/finance/:path*',
  '/api/inventory/:path*',
  '/api/settings/:path*',
  '/((?!api|_next/static|_next/image|favicon.ico).*)','/'],
};
