import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "../../../../../auth";
import prismaClient from '../../../../../prisma';

export const GET = async (req: NextRequest) => {
    // Initialize base URL without any trailing slashes
    const baseURL = process.env.CUSTOMCONNSTR_NEXT_PUBLIC_API_BASE_PATH?.replace(/\/+$/, '') || '';

    try {
        if (req.method !== 'GET') {
            return new Response('Method not allowed', { status: 405 });
        }

        const { searchParams } = new URL(req.url!);
        const userInviteString = searchParams.get("userInviteString");

        if (!userInviteString) {
            return NextResponse.json({ message: "No Invite String Found" }, { status: 400 });
        }

        const { branchId, role, email } = await decrypt(userInviteString);
        
        const user = await prismaClient.user.findUnique({
            where: { email }
        });

        let redirectPath;
        if (!user) {
            redirectPath = `/auth/user/register?userInviteString=${userInviteString}`;
        } else {
            const existingRole = await prismaClient.orgBranchUserRole.findFirst({
                where: {
                    orgBranchId: Number(branchId),
                    userId: user.id,
                }
            });

            if (existingRole) {
                redirectPath = '/auth/login';
            } else {
                await prismaClient.orgBranchUserRole.create({
                    data: {
                        orgBranchId: Number(branchId),
                        userId: user.id,
                        role: role
                    }
                });
                redirectPath = `/auth/login?userInviteString=${userInviteString}`;
            }
        }

        // Construct the full redirect URL
        const redirectURL = `${baseURL}${redirectPath}`;
        return NextResponse.redirect(redirectURL);
    } catch (error) {
        console.error('Invite acceptance error:', error);
        return NextResponse.json(
            { message: error instanceof Error ? error.message : 'Failed to process invitation' },
            { status: 500 }
        );
    }
}
