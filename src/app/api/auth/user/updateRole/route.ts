import { NextRequest, NextResponse } from 'next/server';
import prismaClient from '../../../../../../prisma';


export const POST = async (req: NextRequest) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { email, branchId, newRole } = await req.json();

    // Step 1: Find the user by email
    const user = await prismaClient.user.findUnique({
      where: { email },
      include: { userRoles: true }, // Include roles of the user
    });

    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
    }

    // Step 2: Find the user's role in the given branch
    const userRole = await prismaClient.orgBranchUserRole.findFirst({
      where: { userId: user.id, orgBranchId: branchId },
    });

    if (!userRole) {
      return new Response(JSON.stringify({ message: 'User role in branch not found' }), { status: 404 });
    }

    // Step 3: Update the role in OrgBranchUserRole table
    await prismaClient.orgBranchUserRole.update({
      where: { id: userRole.id },
      data: { role: newRole }, // Set the new role
    });

    return new Response(JSON.stringify({ message: 'User role updated successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }
};
