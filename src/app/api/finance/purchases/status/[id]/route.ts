import prismaClient from '../../../../../../../prisma';
import { NextRequest } from 'next/server';
import { fetchFinanceId } from '@/utils/fetchBranchDetails';

export const PUT = async (req: NextRequest, { params }: { params: { id: number } }) => {
  if (req.method !== 'PUT') {
    return new Response('Method not allowed', { status: 405 });
  }


  try {
    const financeId = await fetchFinanceId(req);
    const body = await req.json();
    const status = body.status;
    const purchases = await prismaClient.purchases.update({
      where: { id: Number(params.id), financeSectionId: financeId },
      data: {
        status: status,
      },
    });
    if (status === 'Cancelled') {
      await Promise.all([
        await prismaClient.recordTransaction.updateMany({
          where: {
            purchasesId: Number(params.id),
          },
          data: {
            moneyChange: 'Cancelled',
          },
        }),
        await prismaClient.transactions.updateMany({
          where: {
            invoiceLink: purchases.invoiceNo,
          },
          data: {
            moneyChange: 'Cancelled',
          }
        })
      ])



      if (purchases.type==='Purchase_Invoice') {
        const items = await prismaClient.items.findMany({
          where: {
            purchasesId: purchases.id
          }
        })
        if (items) {
          //console.log(items);
          items.map(async (item) => {
            const quantity = item.quantity;
            if (item.productBatchId !== null && item.productId != null && quantity !== null) {
              await Promise.all([
                await prismaClient.productBatch.update({
                  where: {
                    id: item.productBatchId,
                  },
                  data: {
                    quantity: {
                      decrement: quantity
                    }
                  }
                }),
                await prismaClient.products.update({
                  where: {
                    id: item.productId,
                  },
                  data: {
                    totalQuantity: {
                      decrement: quantity
                    }
                  }
                })
              ])

            }
          })
        }
      }


      if (purchases.type==='Purchase_Return') {
        const items = await prismaClient.items.findMany({
          where: {
            purchasesId: purchases.id
          }
        })
        if (items) {
          //console.log(items);
          items.map(async (item) => {
            const quantity = item.quantity;
            if (item.productBatchId !== null && item.productId != null && quantity !== null) {
              await Promise.all([
                await prismaClient.productBatch.update({
                  where: {
                    id: item.productBatchId,
                  },
                  data: {
                    quantity: {
                      increment: quantity
                    }
                  }
                }),
                await prismaClient.products.update({
                  where: {
                    id: item.productId,
                  },
                  data: {
                    totalQuantity: {
                      increment: quantity
                    }
                  }
                })
              ])

            }
          })
        }
      }


    }

    return new Response(JSON.stringify(purchases), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error)
    return new Response('Internal server error', { status: 500 });
  } finally {
    await prismaClient.$disconnect();
  }
};