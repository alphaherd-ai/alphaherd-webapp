// src/api/inventory/create.ts
import { NextRequest } from 'next/server';
import prismaClient from '../../../../../../prisma';
import bcrypt from 'bcrypt';

export const POST = async (req: NextRequest) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const url = new URL(req.url);
    const { orgDetails, adminUserDetails, branchName } = await req.json();
    const hashedPassword = await bcrypt.hash(adminUserDetails.password, 10);
    // console.log("here here");
    let duplicateOrg = await prismaClient.organization.findUnique({
      where: {
        orgName: orgDetails.orgName
      },
      include: { adminUsers: true },
    });

    if (duplicateOrg != null) {
      // console.log(duplicateOrg)
      return new Response(JSON.stringify({ "message": "Organization name must be unique" }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    let duplicateAdminUser = await prismaClient.user.findUnique({ // to find users who have already signed in as admin
      where: {
        email: adminUserDetails.email,
        hashedPassword: {
          not: hashedPassword
        }
      },
      include: { adminOrganizations: true },
    });

    if (duplicateAdminUser != null) {
      return new Response(JSON.stringify({ "message": "Admin user already exists..." }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    delete adminUserDetails.password;
    adminUserDetails.hashedPassword = hashedPassword;

    let newOrg = await prismaClient.organization.create({
      data: orgDetails
    });

    let orgNewBranch = await prismaClient.orgBranch.create({
      data : {
        branchName,
        orgId: newOrg.id
      }
    })

    // console.log(orgNewBranch)

    adminUserDetails.orgBranchId = orgNewBranch.id;

    let newUser = await prismaClient.user.create({
      data: adminUserDetails
    });

    // console.log(newOrg,newUser);

    const orgBranchUserRole = await prismaClient.orgBranchUserRole.create({
      data: {
          orgBranchId : orgNewBranch.id,
          role : "Manager",
          userId : newUser.id
      }
  });

  // console.log(orgBranchUserRole)

  // console.log(orgBranchUserRole);

    await prismaClient.organization.update({
      where: {
        orgName: newOrg.orgName
      },
      data: {
        adminUsers: {
          connect: {
            id: newUser.id
          }
        }
      }
    });

    let dop = await prismaClient.organization.findUnique({
      where: {
        orgName: orgDetails.orgName
      },
      include: { adminUsers: true },
    });

    // console.log(dop?.adminUsers.length);

    return new Response(JSON.stringify({ "message" : "Organization & Admin user successfully created."}), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error : any) {
    // console.log(error);
    // console.log(typeof(error))
    return new Response(JSON.stringify({"message" : error.message}), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } finally {
    await prismaClient.$disconnect();
  }
};
