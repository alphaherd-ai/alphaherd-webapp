// src/api/inventory/create.ts
import { connectToDB } from '../../../../utils/index';
import prismaClient from '../../../../../prisma';
import { Inventory, type ProductBatch } from "@prisma/client";
import { fetchInventoryId } from '@/utils/fetchBranchDetails';
import { check, validationResult } from 'express-validator';
import { NextRequest } from 'next/server';


export const POST = async (req: NextRequest,res:Response) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    
    
    const inventoryId = await fetchInventoryId(req);
    await connectToDB();
    const {objectId,inventoryType, stockStatus,invoiceType,...restOfBody } = await req.json();
    console.log(restOfBody);

    let createData: any = {
      ...restOfBody,
      expiry: new Date(restOfBody.expiry),
    };


    if (inventoryType===Inventory.Product) {

      createData.product = { connect: { id: objectId } };
      const allProducts = await prismaClient.productBatch.create({
        data: createData,
      });

      console.log({
        allProductsId:allProducts.id,
        stockChange:stockStatus,
        invoiceType:invoiceType,
        quantityChange:createData.quantity
      });
      
      const inventory= await prismaClient.inventoryTimeline.create({
        data:{ 
          stockChange:stockStatus,
          invoiceType:invoiceType,
          quantityChange:createData.quantity,
          productBatch:{
            connect:{
              id:allProducts.id
            }
          },
          InventorySection:{
            connect:{
              id:inventoryId
            }
          }
        }
      });
  
      return new Response(JSON.stringify({allProducts,inventory}), {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      

    } else if (objectId===Inventory.Service) {
      const allServices = await prismaClient.services.create({
        data: createData,
      });
      
      const inventory = await prismaClient.inventoryTimeline.create({
        data: {
          
          stockChange:stockStatus,
          invoiceType:invoiceType,
          service:{
            connect:{
              id:allServices.id
            }
          },
          InventorySection:{
            connect:{
              id:inventoryId
            }
          }
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
    await prismaClient.$disconnect();
  }
};
