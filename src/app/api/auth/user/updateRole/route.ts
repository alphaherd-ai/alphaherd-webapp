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
      include: { userRoles: true },
    });

    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
    }

    // Step 2: Check if user has a role in the specified branch
    const userRole = user.userRoles.find(role => role.orgBranchId === branchId);
    if (!userRole) {
      return new Response(JSON.stringify({ message: 'User role in branch not found' }), { status: 404 });
    }

    // Step 3: Update the role
    const updatedUserRole = await prismaClient.orgBranchUserRole.update({
      where: { id: userRole.id },
      data: { role: newRole },
      include: { user: { include: { userRoles: true } } }, // Include the updated user with roles
    });
    
    console.log("Updated role:", updatedUserRole);
    return new Response(JSON.stringify({
      message: `User role updated successfully`,
      user: updatedUserRole.user, // Return the entire updated user
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
    

  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ message: error }), { status: 500 });
  }
};
