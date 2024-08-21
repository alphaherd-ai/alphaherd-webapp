import { connectToDB } from '../../../../../../utils/index';
import prismaClient from '../../../../../../../prisma';
import { Inventory, type ProductBatch } from "@prisma/client";
import { fetchInventoryId } from '@/utils/fetchBranchDetails';
import { ProductBatchSchema } from '@/schemas/inventory/ productBatchValidation';
import { NextRequest } from 'next/server';

export const POST = async (req: NextRequest) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { isApproved,stockStatus, productId, invoiceType, ...body } = await req.json();
    const data = { stockStatus, productId, invoiceType, ...body };
    // const validatedData = ProductBatchSchema.safeParse(data);

    // if (!validatedData.success) {
    //   return new Response(JSON.stringify({ errors: validatedData.error.issues }), {
    //     status: 422,
    //   });
    // }

    const inventoryId = await fetchInventoryId(req);
    const quantity = body.quantity ?? 0;

    const result = await prismaClient.$transaction(async (prisma) => {
      const product = prisma.products.update({
        where: { id: productId, inventorySectionId: inventoryId },
        data: { totalQuantity: { increment: quantity },
      },
      });

      const productBatch = prisma.productBatch.create({
        data: {
          ...body,
          productId,
          inventorySectionId: inventoryId,
          isApproved:isApproved
        },
      });

      const inventory = prisma.inventoryTimeline.create({
        data: {
          stockChange: stockStatus,
          invoiceType: invoiceType,
          quantityChange: quantity,
          inventoryType: Inventory.Product,
          inventorySectionId: inventoryId,
          isApproved:isApproved
        },
      });

      const [updatedProduct, createdProductBatch, createdInventory] = await Promise.all([product, productBatch, inventory]);

      await prisma.inventoryTimeline.update({
        where: { id: createdInventory.id },
        data: {
          productBatch: {
            connect: {
              id: createdProductBatch.id,
            },
          },
          isApproved:isApproved
        },
      });

      return { productBatch: createdProductBatch, inventory: createdInventory };
    });

    return new Response(JSON.stringify(result), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
