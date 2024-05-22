// src/api/inventory/getAll.ts
import { connectToDB } from '../../../../utils/index';
import prismaClient from '../../../../../prisma/index';
import { fetchInventoryId } from '@/utils/fetchBranchDetails';
import type { ProductBatch } from "@prisma/client";
import { NextRequest } from 'next';


export const GET=async(req: NextRequest)=> {
    if (req.method !== 'GET') {
        return new Response('Method not allowed',{status:405});
    }
    try {
        
        
        const inventoryId=await fetchInventoryId(req)
        const inventory = await prismaClient.inventoryTimeline.findMany({
             where:{
               inventorySectionId:inventoryId
             },
            include: {
                productBatch: {
                    include:{
                        product:true
                    }
                },
                service:true
            }
        });
        
        return new Response(JSON.stringify(inventory), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error(error)
      return new Response("Internal server error",{status:500});
    } finally {
        await prismaClient.$disconnect();
    }
  }
  
