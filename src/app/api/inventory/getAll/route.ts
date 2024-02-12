// src/api/inventory/getAll.ts
import { connectToDB } from '../../../../utils/index';
import prisma from '../../../../../prisma/index';
import type { Product } from "@prisma/client";

export const GET=async(req: Request)=> {
    if (req.method !== 'GET') {
        return new Response('Method not allowed',{status:405});
    }
    try {
        await connectToDB();
        const inventory = await prisma.inventory.findMany({
            include: {
                allProducts: true,
                allServices:true
            }
        });
        
        return new Response(JSON.stringify(inventory), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
      return new Response("Internal server error",{status:500});
    } finally {
        await prisma.$disconnect();
    }
  }
  
