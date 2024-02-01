// src/api/inventory/create.ts
import { connectToDB } from '../../../../utils/index';
import prisma from '../../../../../prisma/index';
import type { Product } from "@prisma/client";

export const POST=async(req: Request)=> {
    if (req.method !== 'POST') {
        return new Response('Method not allowed',{status:405});
    } 

    try {
        await connectToDB();
        const body=await req.json();
        const inventory = await prisma.inventory.create({
            data: {
                ...body,
                expiry: new Date(body.expiry), 
            },
        });
        return new Response(JSON.stringify(inventory), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
      return new Response(JSON.stringify(error));
    } finally {
        await prisma.$disconnect();
    }
  }
