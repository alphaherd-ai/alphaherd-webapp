import { NextRequest, NextResponse } from 'next/server';
import prismaClient from '../../../../../../prisma';

export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const branchId = searchParams.get('branchId');

    if (!userId || !branchId) {
        return new NextResponse('Missing userId or branchId', { status: 400 });
    }

    try {
        // Check if the user exists
        const user = await prismaClient.user.findUnique({
            where: {
                id: Number(userId),
            },
        });

        if (!user) {
            return new NextResponse('User not found', { status: 404 });
        }

        // Delete related records in OrgBranchUserRole table
        const deleted=await prismaClient.orgBranchUserRole.deleteMany({
            where: {
                userId: Number(userId),
                orgBranchId: Number(branchId),
            },
        });
        if(!deleted){
            return new NextResponse('Error deleting user roles', { status: 500 });
        }
        // // Delete the user
        // await prismaClient.user.delete({
        //     where: {
        //         id: Number(userId),
        //     },
        // });

        return new NextResponse('User deleted successfully', { status: 200 });
    } catch (error) {
        console.log(error);
        return new NextResponse('Error deleting user', { status: 500 });
    }
}