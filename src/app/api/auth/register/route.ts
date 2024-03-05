// src/api/inventory/create.ts
import { connectToDB } from '../../../../utils/index';
import prisma from '../../../../../prisma/index';
import bcrypt from 'bcrypt';
import type { User,Organisation } from "@prisma/client";

export const POST = async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    await connectToDB();
    const url = new URL(req.url);
    const orgId = url.searchParams.get('org_id');
    const role = url.searchParams.get('role');
    const {orgDetails,userDetails} = await req.json();
    const hashedPassword = await bcrypt.hash(userDetails.password, 10);
    if(orgId==null){    
        
            userDetails.role="Admin";
             const user= await prisma.user.create({
                data:{
                    ...userDetails,
                    hashedPassword
                },
             })
             const organisation= await prisma.organisation.create({
                data: {
                  ...orgDetails,
                  members: {
                    connect: {
                      id: user.id,
                    },
                  },
                },
              });
            return new Response(JSON.stringify({organisation,user}), {
              status: 201,
              headers: {
                'Content-Type': 'application/json',
              },
            });
    }else if(orgId!=null){
        try{
            userDetails.role=role;
            const user=await prisma.user.create({
                data:{
                    ...userDetails,
                    hashedPassword
                },
            });
            const organisation=await prisma.organisation.update({
                where:{id:orgId},
                data: {
                    members: {
                      connect: {
                        id: user.id,
                      },
                    },
                  },
            })
            return new Response(JSON.stringify({user}),{
                status:201,
                headers:{
                    'Content-Type':'application/json',
                },
            })
        }
        catch(error){
            console.error(error);
            return new Response(JSON.stringify(error));
        }
        
    }
      
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error));
  } finally {
    await prisma.$disconnect();
  }
};
