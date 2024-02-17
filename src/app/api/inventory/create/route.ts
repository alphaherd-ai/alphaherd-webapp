// src/api/inventory/create.ts
import { connectToDB } from '../../../../utils/index';
import prisma from '../../../../../prisma/index';
import type { Product } from "@prisma/client";

export const POST = async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    await connectToDB();
    const { productId, allServicesId, stockStatus,invoiceType,...restOfBody } = await req.json();
    console.log(restOfBody);

    let createData: any = {
      ...restOfBody,
      expiry: new Date(restOfBody.expiry),
    };

    if (productId) {
      createData.product = { connect: { id: productId } };
      const allProducts = await prisma.allProducts.create({
        data: createData,
      });
      
      const inventory= await prisma.inventory.create({
        data:{
          allProductsId:allProducts.id,
          stockChange:stockStatus,
          invoiceType:invoiceType,
          quantityChange:createData.quantity
        }
      });
  
      return new Response(JSON.stringify({allProducts,inventory}), {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      

    } else if (allServicesId) {
      const allServices = await prisma.allServices.create({
        data: createData,
      });
      
      const inventory = await prisma.inventory.create({
        data: {
          allServicesId:allServices.id,
          stockChange:stockStatus,
          invoiceType:invoiceType,
          
        }
      });
  
      return new Response(JSON.stringify({allServices,inventory}), {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

   
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error));
  } finally {
    await prisma.$disconnect();
  }
};
