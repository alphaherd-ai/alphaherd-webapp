import { connectToDB } from '../../../../utils/index';
import prisma from '../../../../../prisma/index';
import { Inventory,Role, type ProductBatch } from "@prisma/client";
import { fetchInventoryId } from '@/utils/fetchBranchDetails';


export const POST=async(req: Request )=> {
  if (req.method !== 'POST') {
    return new Response('Method not allowed',{status:405});
} 
    try {
      const {userRole,...body} = await req.json();
      const permission= await prisma.permissions.findUnique({
        where:{
          role:userRole
        }
      })
      if(permission){
        await prisma.permissions.update({
          where:{
            role:userRole
          },
          data:{
            ...body
          }
        })
      }else{
        const newPermissions= await prisma.permissions.create({
          data:{
            ...body,
            role:userRole
          }
        })
      }
      return new Response(JSON.stringify(permission), {
        status: 201,
        headers: {
            'Content-Type': 'application/json',
        },
    });
    } catch (error) {
      console.error(error)
      return new Response(JSON.stringify(error));
    } finally {
        await prisma.$disconnect();
    }
  }