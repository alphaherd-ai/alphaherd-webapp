// src/api/finance/create.ts
import { connectToDB } from '../../../../../../utils/index';
import prismaClient from '../../../../../../../prisma';
import { FinanceSalesType, Inventory, Stock } from '@prisma/client/edge';
import { NextRequest } from 'next/server';
import { fetchFinanceId, fetchInventoryId } from '@/utils/fetchBranchDetails';

export const POST = async (req: NextRequest, { params }: { params: { type: FinanceSalesType } }) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const body: any = await req.json();
    const inventoryId=await fetchInventoryId(req);
    const financeId=await fetchFinanceId(req);
    console.log(financeId)
    
    const sales = await prismaClient.sales.create({
      data: {
        ...body,
        type: params.type,
        FinanceSection:{
          connect:{
            id:financeId
          }
        }
      },
    });

    const items = await prismaClient.items.createMany({
      data: body.items.create,
    });

    const finance = await prismaClient.financeTimeline.create({
      data: {
        type: params.type,
        sale: { connect: { id: sales.id } },
        createdAt: new Date(),
        FinanceSection:{
          connect:{
            id:financeId
          }
        }
      },
    });

    if (params.type === FinanceSalesType.Invoice) {
      await Promise.all(
        body.items.create.map(async (item: any) => {
          console.log(item)
          const batch=await prismaClient.productBatch.findUnique({
            where:{
              id:Number(item.productBatchId),
              inventorySectionId:inventoryId
            }
          })
          const updatedBatch = await prismaClient.productBatch.update({
            where: { id: batch?.id ,inventorySectionId:inventoryId},
            data: {
              quantity: {
                decrement: item.quantity,
              },
            },
          });
          const updatedProduct =await prismaClient.products.update({
            where:{
              id:item.productId,
              inventorySectionId:inventoryId
            },
            data:{
              totalQuantity:{
                decrement:item.quantity
              }
            }
          });

         const inventory= await prismaClient.inventoryTimeline.create({
            data: {
              stockChange:Stock.StockOUT,
              quantityChange: item.quantity,
              invoiceType:"Sales_Invoice",
              inventoryType:Inventory.Product,
              productBatch:{
                connect:{
                  id:batch?.id
                }
              },
              InventorySection:{
                connect:{
                  id:inventoryId
                }
              }
            },
          });
        })
      );
      
    } else if (params.type === FinanceSalesType.Return) {
      await Promise.all(
        body.items.create.map(async (item: any) => {
          const batch=await prismaClient.productBatch.findUnique({
            where:{
              id:Number(item.productBatchId),
              inventorySectionId:inventoryId
            }
          })
          const updatedBatch = await prismaClient.productBatch.update({
            where: { id: batch?.id ,inventorySectionId:inventoryId},
            data: {
              quantity: {
                increment: item.quantity,
              },
            },
          });
          const updatedProduct =await prismaClient.products.update({
            where:{
              id:item.productId,
              inventorySectionId:inventoryId
            },
            data:{
              totalQuantity:{
                increment:item.quantity
              }
            }
          });

          const inventory= await prismaClient.inventoryTimeline.create({
            data: {
              stockChange:Stock.StockIN,
              quantityChange: item.quantity,
              invoiceType:"Sales_Return",
              inventoryType:Inventory.Product,
              productBatch:{
                connect:{
                  id:batch?.id
                }
              },
              InventorySection:{
                connect:{
                  id:inventoryId
                }
              }
            },
          });
        })
      );
    }

    return new Response(JSON.stringify({ sales, finance }), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error), { status: 500 });
  } finally {
    await prismaClient.$disconnect();
  }
};
