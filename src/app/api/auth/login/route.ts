import bcrypt from 'bcrypt';
import { decrypt, encrypt } from '../../../../../auth';
import { cookies } from 'next/headers';
import prismaClient from '../../../../../prisma';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const { searchParams } = new URL(req.url!);
  const userInviteString = searchParams.get("userInviteString");

  console.log(userInviteString)

  try {
    const { email, password } = await req.json();

    // adminOrganizations Organization[]
    // orgBranchId        Int?
    // userRoles          OrgBranchUserRole[]

    let user = await prismaClient.user.findUnique({
      where: { email },
      include: {
        adminOrganizations: {
          select: {
            id: true,
            orgName: true,
            address:true
          }
        },
        userRoles: {}
      }
    });

    const organization = await prismaClient.organization.findUnique({
      where: { id: 1 },
      include: {
        orgBranches: {},
        adminUsers: {}
      }
    })

    console.log(organization);
    
    if (!user) {
      return new Response(JSON.stringify({ "message": 'User not found' }), { status: 404 });
    }

    const validPassword = await bcrypt.compare(password, user.hashedPassword);

    if (!validPassword) {
      return new Response(JSON.stringify({ "message": 'Invalid password' }), { status: 401 });
    }
    const session = await encrypt({ id: user.id }, "10h");

    // Save the session in a cookie
    cookies().set("session", session, {
      httpOnly: true, // Cookie is accessible only through HTTP(S) requests
      secure: process.env.NODE_ENV === 'production', // Cookie is sent only over HTTPS in production
      sameSite: 'strict', // Cookie is not sent in cross-site requests
      maxAge: 60 * 60 * 24 * 7, // Cookie expires in 7 days
      path: '/', // Cookie is accessible from all paths in the domain
    });
    if (userInviteString) {
      const { branchId, role, email } = await decrypt(userInviteString);

    
         const orgBranchUserRole = await prismaClient.orgBranchUserRole.findFirst({
        where: {
          userId: user.id,
          orgBranchId: branchId
        }
      });

      console.log(orgBranchUserRole)

      if (!orgBranchUserRole) {
        const orgBranch = await prismaClient.orgBranch.findUnique({
          where: {
            id: branchId
          }
        });
  
        console.log(user);
        await prismaClient.orgBranchUserRole.create({
          data: {
            orgBranchId: Number(orgBranch?.id),
            userId: user!.id,
            role: role
          }
        });

    //     await prismaClient.orgBranch.update({
    //       where: {
    //         id: Number(orgBranch?.id),
    //       },
    //       data: {
    //         assignedUsers: {
    //           connect: {
    //             id: Number(user.id),  
    //           },
    //         },
    //       },
    //     });
        

    //   await prismaClient.user.update({
    //     where: {
    //         email
    //     },
    //     data: {
    //         orgBranchId : Number(branchId)
    //     }
    // });
    
      }

      console.log(branchId, role, email);

      user = await prismaClient.user.findUnique({
        where: { email },
        include: {
          adminOrganizations: {
            select: {
              id: true,
              orgName: true,
              address:true
            }
          },
          userRoles: {}
        }
      });
    }

    return new Response(JSON.stringify({ user }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error: any) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ "message": error.message }), { status: 500 });
  }
};