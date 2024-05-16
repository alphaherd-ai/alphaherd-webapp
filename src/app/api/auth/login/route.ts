import bcrypt from 'bcrypt';
import { encrypt } from '../../../../../auth';
import { cookies } from 'next/headers';
import prisma from '../../../../../prisma';
import { redirect } from 'next/navigation';

export const POST = async (req: Request) => {

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
    // lastUsedBranch     OrgBranch?          @relation(fields: [orgBranchId], references: [id])
    // userRoles          OrgBranchUserRole[]

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        adminOrganizations: {
          select: {
            id: true,
            orgName : true
          }
        },
        lastUsedBranch: {},
        userRoles: {}
      }
    });

    const organization = await prisma.organization.findUnique({
      where: {id : 1},
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
    const session = await encrypt({ id : user.id },"10h");

    // Save the session in a cookie
    cookies().set("session", session, {
      httpOnly: true, // Cookie is accessible only through HTTP(S) requests
      secure: process.env.NODE_ENV === 'production', // Cookie is sent only over HTTPS in production
      sameSite: 'strict', // Cookie is not sent in cross-site requests
      maxAge: 60 * 60 * 24 * 7, // Cookie expires in 7 days
      path: '/', // Cookie is accessible from all paths in the domain
    });

    if(!userInviteString){
      return new Response(JSON.stringify({ user }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ "message": 'Internal server error' }), { status: 500 });
  }
  finally{
    console.log(userInviteString)
    if(userInviteString){
      console.log("here")
      redirect(process.env.NEXT_PUBLIC_API_BASE_PATH + "/api/settings/invite?userInviteString=" + userInviteString);
    }
  }
};
