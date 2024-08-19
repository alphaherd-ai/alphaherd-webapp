import { connectToDB } from '../../../../../utils/index';
import prismaClient from '../../../../../../prisma';
import { fetchInventoryId } from '@/utils/fetchBranchDetails';
import {productSchema} from '@/schemas/inventory/productValidation'
import { NextRequest } from 'next/server';

export const POST=async(req: NextRequest,res:Response)=> {
  if (req.method !== 'POST') {
    return new Response('Method not allowed',{status:405});
} 
    try {
     
      const inventoryId = await fetchInventoryId(req);
      const {isApproved,...body} = await req.json();
      const validatedData = productSchema.safeParse(body);

      // if (!validatedData.success) {
      //   return new Response(JSON.stringify({ errors: validatedData.error.issues }), {
      //     status: 422,
      //   });
      // }
        console.log("Body of the API",body);
        body.totalQuantity=0;
        const product = await prismaClient.products.create({
            data: {
              ...body,
              isApproved:isApproved,
            InventorySection:{
              connect:{
                id:inventoryId
              }
            }
            },
            
        });
        
        console.log("API is working",product);
        
        return new Response(JSON.stringify(product), {
          status: 201,
          headers: {
              'Content-Type': 'application/json',
          },
      });
    } catch (error) {
      console.error(error)
      return new Response(JSON.stringify(error));
    } finally {
        await prismaClient.$disconnect();
    }
  }