import prismaClient from '../../../../../prisma';
import { NextRequest } from 'next/server';
import { fetchInventoryId } from '@/utils/fetchBranchDetails';

export const POST = async (req: NextRequest) => {
    if (req.method !== 'POST') {
        return new Response('Method not allowed', { status: 405 });
    }

    const body = await req.json();
    const inventoryId = await fetchInventoryId(req); // inventory id of reveiving branch
    const inventorySectionId = body?.transferInventoryId; // inventory id of transferring branch
    const transferringBranch = body?.transferStatus === 'Transfer To' ? body?.defaultBranchName : body?.transferBranchName;
    const receivingBranch = body?.transferStatus === 'Transfer To' ? body?.transferBranchName : body?.defaultBranchName;
    const totalQuantity = Number(body?.items.reduce((acc: any, item: any) => acc + item?.quantity, 0));

    try {

        await Promise.all(
            body?.items.map(async (item: any) => {
                const checkedProduct = await prismaClient.products.findFirst({
                    where: {
                        inventorySectionId: inventoryId,
                        itemName: item?.product?.itemName
                    }
                });

                if (checkedProduct) {
                    console.log('Product already exists');
                    const {
                        inventorySectionId,
                        id,
                        productId,
                        quantity,
                        ...otherData
                    } = item?.batch || {};

                   // console.log(quantity);
                    // Create product batch
                    const productBatch = await prismaClient.productBatch.create({
                        data: {
                            ...otherData,
                            quantity: item?.quantity,
                            productId: checkedProduct.id,
                            inventorySectionId: inventoryId,

                        }
                    });

                    // Update transferred's branch product total quantity 
                    await prismaClient.products.update({
                        where: {
                            id: checkedProduct.id,
                            inventorySectionId: inventoryId
                        },
                        data: {
                            totalQuantity: { increment: item?.quantity },
                            
                        }
                    });

                    //Update the product quantity from whose branch the product is transferred

                    await prismaClient.products.update({
                        where: {
                            id: productId,
                            inventorySectionId: inventorySectionId
                        },
                        data: {
                            totalQuantity: { decrement: item?.quantity },
                           
                        }
                    });


                    await prismaClient.productBatch.update({
                        where: {
                            id: id,
                        },
                        data: {
                            quantity: {
                                decrement:item?.quantity
                            }
                        }
                    })

                    
                } else {
                    console.log('Product created');

                    const {
                        id,
                        inventorySectionId,
                        ...otherData
                    } = item?.product;

                    // Create new product
                    const createdProduct = await prismaClient.products.create({
                        data: {
                            ...otherData,
                            totalQuantity: 0,
                            InventorySection: {
                                connect: {
                                    id: inventoryId
                                }
                            }
                        }
                    });

                    if (createdProduct) {
                        const {
                            inventorySectionId,
                            id,
                            productId,
                            quantity,
                            ...otherBatchData
                        } = item?.batch || {};

                        //console.log(quantity);

                        // Create product batch
                        const productBatch = await prismaClient.productBatch.create({
                            data: {
                                ...otherBatchData,
                                quantity: item?.quantity,
                                productId: createdProduct.id,
                                inventorySectionId: inventoryId
                            }
                        });

                        // Update product total quantity
                        await prismaClient.products.update({
                            where: {
                                id: createdProduct.id,
                                inventorySectionId: inventoryId
                            },
                            data: {
                                totalQuantity: {
                                    increment: item?.quantity
                                },
                              
                            }
                        });


                        await prismaClient.products.update({
                            where: {
                                id: productId,
                                inventorySectionId: inventorySectionId
                            },
                            data: {
                                totalQuantity: { decrement: item?.quantity },
                               
                            }
                        });


                        await prismaClient.productBatch.update({
                            where: {
                                id: id,
                            },
                            data: {
                                quantity: {
                                    decrement: item?.quantity
                                },

                            }
                        })

                        
                    }
                }
            })


        );

        const receivingBranchInventory = await prismaClient.inventoryTimeline.create({
            data: {
                stockChange: 'StockIN',
                invoiceType: 'Transfer',
                quantityChange: totalQuantity,
                inventoryType: 'Product',
                inventorySectionId: inventoryId,
                invoiceNo: body?.invoiceNumber,
                party:transferringBranch,
                deliveryStatus:body?.status,
            }
        })

        const transferringBranchInventory = await prismaClient.inventoryTimeline.create({
            data: {
                stockChange: 'StockOUT',
                invoiceType: 'Transfer',
                quantityChange: totalQuantity,
                inventoryType: 'Product',
                inventorySectionId: inventorySectionId,
                invoiceNo: body?.invoiceNumber,
                party:transferringBranch,
                deliveryStatus:body?.status,
            }
        })

        return new Response(
            JSON.stringify({ message: 'Transfer Successful' }),
            {
              status: 201, 
              headers: { 'Content-Type': 'application/json' } 
            }
          );
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify(error));
    } finally {
        await prismaClient.$disconnect();
    }
};
