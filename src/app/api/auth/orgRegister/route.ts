// src/api/inventory/create.ts
import { connectToDB } from '../../../../utils/index';
import prisma from '../../../../../prisma/index';
import bcrypt from 'bcrypt';
import type { User } from "@prisma/client";

export const POST = async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    await connectToDB();
    const url = new URL(req.url);
    const { orgDetails, adminUserDetails } = await req.json();
    const hashedPassword = await bcrypt.hash(adminUserDetails.password, 10);
    console.log("here here");
    let duplicateOrg = await prisma.organization.findUnique({
      where: {
        orgName: orgDetails.orgName
      },
      include: { adminUsers: true },
    });

    if (duplicateOrg != null) {
      console.log(duplicateOrg)
      return new Response(JSON.stringify({ "message": "Organization name must be unique" }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    let duplicateAdminUser = await prisma.user.findUnique({ // to find users who have already signed in as admin
      where: {
        email: adminUserDetails.email,
        hashedPassword: {
          not: hashedPassword
        }
      },
      include: { adminOrganizations: true },
    });

    if (duplicateAdminUser != null) {
      return new Response(JSON.stringify({ "message": "Admin user already exists... Enter the correct password in password fields." }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    delete adminUserDetails.password;
    adminUserDetails.hashedPassword = hashedPassword;

    let newOrg = await prisma.organization.create({
      data: orgDetails
    });

    let newUser = await prisma.user.create({
      data: adminUserDetails
    });

    console.log(newOrg,newUser);

    await prisma.organization.update({
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

    let dop = await prisma.organization.findUnique({
      where: {
        orgName: orgDetails.orgName
      },
      include: { adminUsers: true },
    });

    console.log(dop?.adminUsers.length);

    return new Response(JSON.stringify({ "message" : "Organization & Admin user successfully created."}), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error : any) {
    console.log(error);
    console.log(typeof(error))
    return new Response(JSON.stringify({"message" : error.message}), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } finally {
    await prisma.$disconnect();
  }
};
