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
      }
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
      }
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

    await prisma.organization.update({
      where: {
        orgName: newOrg.orgName
      },
      data: {
        adminUserIds: [...newOrg.adminUserIds,newUser.id]
      }
    });

    await prisma.user.update({
      where: {
        email: newUser.email
      },
      data: {
        organizationIds: [...newUser.organizationIds,newOrg.id]
      }
    });

    return new Response(JSON.stringify({ "message" : "Organization & Admin user successfully created."}), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error));
  } finally {
    await prisma.$disconnect();
  }
};
