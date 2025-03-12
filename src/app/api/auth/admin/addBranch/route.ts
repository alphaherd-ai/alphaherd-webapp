import { NextRequest } from "next/server";
import prismaClient from "../../../../../../prisma";

export const POST = async (req: NextRequest) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const url = new URL(req.url);
    const { branchDetails, userId } = await req.json();
    const orgId = url.searchParams.get("orgId");
    let orgNewBranch = await prismaClient.orgBranch.create({
      data: {
        ...branchDetails,
      },
    });

    //creating finance database and other sections for it
    const financeSection = await prismaClient.financeSection.create({
      data: {
        name: "Finance-" + orgNewBranch.branchName,
        branchId: orgNewBranch.id,
        amount: 1
      }
    })

    const databaseSection = await prismaClient.databaseSection.create({
      data: {
        name: "Database-" + orgNewBranch.branchName,
        branchId: orgNewBranch.id,
        type: "type`",
      }
    })

    const inventorySection = await prismaClient.inventorySection.create({
      data: {
        name: "Inventory-" + orgNewBranch.branchName,
        branchId: orgNewBranch.id,
        quantity: 1
      }
    })

    const defaultCategories = ['Pet food', 'Medicine', 'Supplements', 'Pet Accessories', 'Equipment'];
    for (const category of defaultCategories) {
      await prismaClient.itemCategory.create({
        data: {
          name: [category],
          InventorySection: {
            connect: { id: inventorySection.id }
          }
        }
      });
    }

    const defaultUnits = ['Boxes', 'Pieces', 'Vials', 'Units', 'Strips'];
    for (const unit of defaultUnits) {
      await prismaClient.itemUnit.create({
        data: {
          name: [unit],
          InventorySection: {
            connect: { id: inventorySection.id }
          }
        }
      });
    }

    const defaultTaxTypes = [0, 5, 12, 18, 28];
    for (const tax of defaultTaxTypes) {
      await prismaClient.taxType.create({
        data: {
          name: [tax],
          InventorySection: {
            connect: { id: inventorySection.id }
          }
        }
      });
    }

    const defaultServiceCategory = ['General Consultation', 'Follow Up', 'Surgery', 'Vaccination', 'Grooming', 'Boarding', 'Rescue'];
    for (const service of defaultServiceCategory) {
      await prismaClient.serviceCategory.create({
        data: {
          name: [service],
          InventorySection: {
            connect: { id: inventorySection.id }
          }
        }
      });

      const defaultExpenseCategory = ['Rent', ' Payroll', 'Utilities', 'Transport', 'Medical Equipment', 'Repair and Maintenance', 'Other'];
      for (const expense of defaultExpenseCategory) {
        await prismaClient.expenseCategory.create({
          data: {
            name: [expense],
            InventorySection: {
              connect: { id: inventorySection.id }
            }
          }
        });
      }

      const defaultPaymentMethod = ['Cash', 'UPI', 'Netbanking'];
      //making a loop for each method
      defaultPaymentMethod.forEach(async (method) => {
        await prismaClient.paymentMethod.create({
          data: {
            name: method,
            FinanceSection: {
              connect: { id: financeSection.id }
            }
          }
        })
      })

      const defaultLocationCategory = 'Main Warehouse';
      await prismaClient.location.create({
        data: {
          name: defaultLocationCategory,
          InventorySection: {
            connect: { id: inventorySection.id }
          }
        }
      })

      const defaultReason = ['Damaged', 'Expired', 'Wrong Item', 'Quality Issues'];
      for (const reason of defaultReason) {
        await prismaClient.reason.create({
          data: {
            name: [reason],
            InventorySection: {
              connect: { id: inventorySection.id }
            }
          }
        });
      }

      const defaultSpeciesandBreed = [
        { name: 'Dog', breed: ['Unknown', 'Labrador Retriever', 'German Shepherd', 'Golden Retriever', 'Beagle', 'Pug', 'Indian Mastiff', 'Husky', 'Dashshund', 'Shi Tzu'] },
        { name: 'Cat', breed: ['Unknown', 'Domestic Short Hair', 'Bombay', 'Himalayan', 'Persian', 'Bengal', 'Siamese'] },
        { name: 'Fish', breed: ['Unknown'] },
        { name: 'Rabbit', breed: ['Unknown'] },
        { name: 'Bird', breed: ['Unknown'] },
        { name: 'Turtle', breed: ['Unknown'] },
        { name: 'Horse', breed: ['Unknown'] },
        { name: 'Unknow', breed: ['Unknown'] }
      ];

      await Promise.all(
        defaultSpeciesandBreed.map(async (speciesData) => {
          const species = await prismaClient.species.create({
            data: {
              name: speciesData.name,
              databaseSectionId: databaseSection.id,
              breed: {
                create: speciesData.breed.map((breedName) => ({
                  name: [breedName],
                  databaseSectionId: databaseSection.id,
                })),
              },
            },
          });
        })
      );
    }

    await prismaClient.orgBranchUserRole.create({
      data: {
        orgBranchId: orgNewBranch.id,
        userId: userId,
        role: "Admin",
      },
    });
    return new Response(JSON.stringify({ "message": "Branch added successfully", "orgBranch": orgNewBranch }), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ "message": error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } finally {
    await prismaClient.$disconnect();
  }
}