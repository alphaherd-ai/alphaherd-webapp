import { NextMiddleware, NextRequest, NextResponse } from 'next/server';
import { decrypt } from '../../auth';
import { getVerifyOrgandBranch } from './orgVerify';
import { redirect } from 'next/navigation';
import { checkIfOrgAdmin } from '@/utils/checkIfOrgAdmin';


export const isAuthorized = async (request: NextRequest) => {
  try {

    console.log("Inside is Authorized");

    console.log(request.nextUrl.pathname);

    if (request.nextUrl.pathname.startsWith("/api/auth/admin/orgEdit") || request.nextUrl.pathname==="/api/auth/admin/branch") {
      return checkIfOrgAdmin(request);
    }

    if (request.nextUrl.pathname.startsWith("/api/auth") || (request.nextUrl.pathname.startsWith("/api/settings/invite") && request.method=="GET")) {
      console.log("INSIDE NOT CHECK FOR TOKEN");
      return NextResponse.next();
    }
    const token = request.cookies.get('session')?.value;
    console.log("token", token)
    if (!token) {
      return new Response(JSON.stringify({ "message": 'Not Authorized' }), { status: 401 });
    }
    let tokenPayload = await decrypt(token!);
    console.log(tokenPayload);
    const url = request.nextUrl;
    const userId = tokenPayload.id;
    console.log("this is the frontend url", url.href)
    const { searchParams } = new URL(url);
    const branchId = searchParams.get("branchId")!;
    return await getVerifyOrgandBranch(Number(userId),Number(branchId),request);
  }
  catch (err) {
    return new Response(JSON.stringify({ "message": 'Not Authorized' }), { status: 401 });
  }
}
