import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "../../auth";
import prismaClient from "../../prisma";

export async function checkIfOrgAdmin(request: NextRequest) {
    try {
        const token = request.cookies.get('session')?.value;
        console.log("token", token)
        if (!token) {
            return new Response(JSON.stringify({ "message": 'Not Authorized' }), { status: 401 });
        }
        let tokenPayload = await decrypt(token!);
        console.log(tokenPayload);
        const url = request.nextUrl;
        const userId = tokenPayload.id;
        console.log("this is the frontend url", url.href);
        const { searchParams } = new URL(url);
        const orgId = searchParams.get("orgId")!;
        console.log("here in orgVerify", userId, orgId);
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set("userId", String(userId));
        const user = await prismaClient.user.findUnique({
            where: { id: userId },
            include: {
                adminOrganizations: true
            }
        });
        const isAdmin = user?.adminOrganizations.find((org) => org.id === Number(orgId));
        console.log(requestHeaders);

        if(isAdmin){
            return NextResponse.next({
                request: {
                    headers: requestHeaders,
                }
            });
        }
        else{
            return new Response(JSON.stringify({ "message": 'Not Authorized' }), { status: 401 });
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}