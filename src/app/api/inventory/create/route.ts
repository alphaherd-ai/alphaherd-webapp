// src/api/inventory/create.ts
import { connectToDB } from '../../../../utils/index';
import prismaClient from '../../../../../prisma';
import { Inventory, type ProductBatch } from "@prisma/client";
import { fetchInventoryId } from '@/utils/fetchBranchDetails';
import { check, validationResult } from 'express-validator';
import initMiddleware from '@/lib/init-middleware';
import validateMiddleware from '@/lib/validate-middleware';

const validateBody = initMiddleware(
  validateMiddleware([
    check('first_name').isLength({ min: 1, max: 40 }),
    check('day').isInt({ min: 1, max: 31 }),
    check('gender').isIn(['male', 'female']),
    check('mobile_phone').isMobilePhone(['th-TH']),
    check('boolean').isBoolean(),
  ], validationResult)
);

export const POST = async (req: NextRequest,res:Response) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    await validateBody(req, res);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return new Response(JSON.stringify({errors:errors.array()}), {
        status: 422,
      });  
    }
    const inventoryId = await fetchInventoryId(req);
    
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
