// src/api/finance/create.ts
import { connectToDB } from '../../../../../../utils/index';
import prismaClient from '../../../../../../../prisma';
import { FinanceCreationType, Inventory, Stock } from '@prisma/client/edge';
import { NextRequest } from 'next/server';
import { fetchFinanceId, fetchInventoryId } from '@/utils/fetchBranchDetails';




export const POST = async (req: NextRequest, { params }: { params: { type: FinanceCreationType } }) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const {newCreditedToken,...otherBody}: any = await req.json();
    //console.log(body.items);
    const inventoryId = await fetchInventoryId(req);
    const financeId = await fetchFinanceId(req);
    // console.log(financeId);
    //console.log("Here's the client id",clientId)
    //console.log(newCreditedToken,otherBody);
    const [sales, items,client] = await prismaClient.$transaction([


      prismaClient.sales.create({
        data: {
          ...otherBody,
         
          type: params.type,
          FinanceSection: {
            connect: {
              id: financeId,
            },
          },
        },
      }),
      prismaClient.items.createMany({
        data: otherBody.items.create,
      }),
      prismaClient.clients.update({
        where: {
          id: Number(otherBody.clientId)
        },
        data: {
          invoiceNo: {
            push: otherBody.invoiceNo
          }
        }
      })
    ]);
//  console.log("sales done",sales)
    const finance = await prismaClient.financeTimeline.create({
      data: {
        type: params.type,
        sale: { connect: { id: sales.id } },
        createdAt: new Date(),
        FinanceSection: {
          connect: {
            id: financeId,
          },
        },
      },
    });

    if (params.type === FinanceCreationType.Sales_Invoice) {
      if(newCreditedToken>=0){
        await prismaClient.clients.update({
          where:{
            id:Number(otherBody.clientId)
          },
          data:{
            creditedToken:newCreditedToken
          }
        })
      }
      await Promise.all(
        otherBody.items.create.map(async (item: any) => {
          if(item.itemType==='product'){
            const batch = await prismaClient.productBatch.findUnique({
              where: {
                id: Number(item.productBatchId),
                inventorySectionId: inventoryId,
              },
              cacheStrategy: { ttl: 60 },
            });
  
            await prismaClient.$transaction([
              prismaClient.productBatch.update({
                where: { id: batch?.id, inventorySectionId: inventoryId },
                data: {
                  quantity: {
                    decrement: item.quantity,
                  },
                },
              }),
              prismaClient.products.update({
                where: {
                  id: item.productId,
                  inventorySectionId: inventoryId,
                },
                data: {
                  totalQuantity: {
                    decrement: item.quantity,
                  },
                },
              }),
              prismaClient.inventoryTimeline.create({
                data: {
                  stockChange: Stock.StockOUT,
                  quantityChange: item.quantity,
                  invoiceType: "Sales_Invoice",
                  invoiceNo: otherBody?.invoiceNo,
                  party:client.clientName,
                  inventoryType: Inventory.Product,
                  productBatch: {
                    connect: {
                      id: batch?.id,
                    },
                  },
                  InventorySection: {
                    connect: {
                      id: inventoryId,
                    },
                  },
                },
              }),
            ]);
          }
          else{
            const batch = await prismaClient.services.findUnique({
              where: {
                id: Number(item.serviceId),
                inventorySectionId: inventoryId,
              },
              cacheStrategy: { ttl: 60 },
            });

            await prismaClient.$transaction([
              prismaClient.inventoryTimeline.create({
                data: {
                  stockChange: Stock.StockOUT,
                  party:client.clientName,
                  quantityChange: item.quantity,
                  invoiceType: "Sales_Invoice",
                  invoiceNo: otherBody?.invoiceNo,
                  inventoryType: Inventory.Service,
                  service: {
                    connect: {
                      id: batch?.id,
                    },
                  },
                  InventorySection: {
                    connect: {
                      id: inventoryId,
                    },
                  },
                },
              }),
            ]);
          }
          
        })
      );
    } else if (params.type === FinanceCreationType.Sales_Return) {
      if(otherBody.status.includes('Credited')){
        
        await prismaClient.clients.update({
          where:{
            id:Number(otherBody.clientId),
          },
          data:{
            creditedToken:{
              increment:otherBody.totalCost
            }
          }
        })
      }
      await Promise.all(
        otherBody.items.create.map(async (item: any) => {
          if (item.itemType === 'product') {
            const batch = await prismaClient.productBatch.findUnique({
              where: {
                id: Number(item.productBatchId),
                inventorySectionId: inventoryId,
              },
              cacheStrategy: { ttl: 60 },
            });

            await prismaClient.$transaction([
              prismaClient.productBatch.update({
                where: { id: batch?.id, inventorySectionId: inventoryId },
                data: {
                  quantity: {
                    increment: item.quantity,
                  },
                },
              }),
              prismaClient.products.update({
                where: {
                  id: item.productId,
                  inventorySectionId: inventoryId,
                },
                data: {
                  totalQuantity: {
                    increment: item.quantity,
                  },
                },
              }),
              prismaClient.inventoryTimeline.create({
                data: {
                  stockChange: Stock.StockIN,
                  quantityChange: item.quantity,
                  invoiceType: "Sales_Return",
                  invoiceNo: otherBody?.invoiceNo,
                  party:client.clientName,
                  inventoryType: Inventory.Product,
                  productBatch: {
                    connect: {
                      id: batch?.id,
                    },
                  },
                  InventorySection: {
                    connect: {
                      id: inventoryId,
                    },
                  },
                },
              }),
            ]);
          }
          else{
            const batch = await prismaClient.services.findUnique({
              where: {
                id: Number(item.serviceId),
                inventorySectionId: inventoryId,
              },
              cacheStrategy: { ttl: 60 },
            });

            await prismaClient.$transaction([
              prismaClient.inventoryTimeline.create({
                data: {
                  stockChange: Stock.StockIN,
                  party:client.clientName,
                  quantityChange: item.quantity,
                  invoiceType: "Sales_Return",
                  invoiceNo: otherBody?.invoiceNo,
                  inventoryType: Inventory.Service,
                  service: {
                    connect: {
                      id: batch?.id,
                    },
                  },
                  InventorySection: {
                    connect: {
                      id: inventoryId,
                    },
                  },
                },
              }),
            ]);
          }

        })
      );
    }
    //console.log(finance);
    return new Response(JSON.stringify({
      sales
    , finance }), {
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
