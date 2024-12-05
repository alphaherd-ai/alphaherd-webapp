// src/api/finance/create.ts
import { connectToDB } from '../../../../../../utils/index';
import prismaClient from '../../../../../../../prisma';
import { FinanceCreationType, Inventory, Stock } from '@prisma/client';
import { NextRequest } from 'next/server';
import { fetchFinanceId, fetchInventoryId } from '@/utils/fetchBranchDetails';
export const POST = async (req: NextRequest, { params }: { params: { type: FinanceCreationType } }) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const {newCreditedToken,...otherData}: any = await req.json();
    //console.log(otherData);
    const itemData=otherData.items.create;
    const allItemsData=itemData.map((data:any) => ({
      productId: data.productId,
      quantity: data.quantity,  
      sellingPrice:data.sellingPrice,
      taxAmount:data.taxAmount,
      name:data.name,
      discount:data.discount,
      productBatchId:data.productBatchId
}));
    const inventoryId=await fetchInventoryId(req);
    const financeId=await fetchFinanceId(req);
    const [purchases,items]= await prismaClient.$transaction([
      prismaClient.purchases.create({
        data: {
          ...otherData,
          items:{
            create:
              allItemsData
          },
          type: params.type,
          FinanceSection:{
            connect:{
              id:financeId
            }
          }
        },
      }),
      prismaClient.items.createMany({
        data: allItemsData,
      }),
      prismaClient.distributors.update({
        where:{
          id:Number(otherData.distributorId),
        },
        data:{
          invoiceNo:{
            push:otherData.invoiceNo
          }
        }
      })
    ]);
   
    
    const finance = await prismaClient.financeTimeline.create({
      data: {
        type: params.type,
        purchases: { connect: { id: purchases.id } },
        createdAt: new Date(),
        FinanceSection:{
          connect:{
            id:financeId
          }
        }
      },
    });

    if (params.type === FinanceCreationType.Purchase_Invoice) {
      if(newCreditedToken >= 0){
        await prismaClient.distributors.update({
          where:{
            id:Number(otherData.distributorId),
          },
          data:{
            creditedToken:newCreditedToken
          }
        })
      }
      await Promise.all(
        otherData.items.create.map(async (item: any) => {
          // console.log("these are the items",item)
          const batch = await prismaClient.productBatch.create({
            data: {
               quantity:item.quantity,
               batchNumber:item.batchNumber,
               expiry:item.expiry,
               costPrice:item.costPrice,
               sellingPrice:item.sellingPrice,
               distributors:item.distributors,
              product:{
                connect:{id: item.productId }
              },
              InventorySection:{
                connect:{id:inventoryId}
              }
            }
        });
       
          await prismaClient.$transaction([
             prismaClient.items.updateMany({
              where:{
                purchasesId:purchases.id,
                productId:item.productId
              },
              data:{
                productBatchId:batch?.id
              }
            }),
            prismaClient.products.update({
              where:{
                id:item.productId,
                inventorySectionId:inventoryId
              },
              data:{
                totalQuantity:{
                  increment:item.quantity
                }
              }
            }),
           prismaClient.inventoryTimeline.create({
              data: {
                stockChange:Stock.StockIN,
                quantityChange: item.quantity,
                invoiceType:FinanceCreationType.Purchase_Invoice,
                invoiceNo:otherData?.invoiceNo,
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
            })
          ])
        })
      );
    } else if (params.type === FinanceCreationType.Purchase_Return) {
      if(otherData.status.includes('Debited')){
        await prismaClient.distributors.update({
          where:{
            id:Number(otherData.distributorId),
          },
          data:{
            creditedToken:{
              increment:otherData.totalCost
            }
          }
        })
      }
      await Promise.all(
        otherData.items.create.map(async (item: any) => {
          const batch=await prismaClient.productBatch.findUnique({
            where:{
              id:Number(item.productBatchId),
              inventorySectionId:inventoryId
            }
          })
          await prismaClient.$transaction([
            prismaClient.productBatch.update({
              where: { id: batch?.id ,inventorySectionId:inventoryId},
              data: {
                quantity: {
                  decrement: item.quantity,
                },
              },
            }),
            prismaClient.products.update({
              where:{
                id:item.productId,
                inventorySectionId:inventoryId
              },
              data:{
                totalQuantity:{
                  decrement:item.quantity
                }
              }
            }),
  
            prismaClient.inventoryTimeline.create({
              data: {
                stockChange:Stock.StockOUT,
                quantityChange: item.quantity,
                invoiceType:FinanceCreationType.Purchase_Return,
                invoiceNo:otherData?.invoiceNo,
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
            })
          ])
        })
      );
    }

    return new Response(JSON.stringify({ purchases, finance,items }), {
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
