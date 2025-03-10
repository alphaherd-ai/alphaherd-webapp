// src/api/inventory/create.ts
import { NextRequest } from 'next/server';
import prismaClient from '../../../../../../prisma';
import bcrypt from 'bcrypt';

export const POST = async (req: NextRequest) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const url = new URL(req.url);
    const { orgDetails, adminUserDetails, branchDetails } = await req.json();
    const hashedPassword = await bcrypt.hash(adminUserDetails.password, 10);
    // console.log("here here");
    let duplicateOrg = await prismaClient.organization.findUnique({
      where: {
        orgName: orgDetails.orgName
      },
      include: { adminUsers: true },
    });

    if (duplicateOrg != null) {
      // console.log(duplicateOrg)
      return new Response(JSON.stringify({ "message": "Organization name must be unique" }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    let duplicateAdminUser = await prismaClient.user.findUnique({ // to find users who have already signed in as admin
      where: {
        email: adminUserDetails.email,
        hashedPassword: {
          not: hashedPassword
        }
      },
      include: { adminOrganizations: true },
    });

    if (duplicateAdminUser != null) {
      return new Response(JSON.stringify({ "message": "Admin user already exists..." }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    
    delete adminUserDetails.password;
    adminUserDetails.hashedPassword = hashedPassword;

    const newOrg = await prismaClient.organization.create({
      data: orgDetails
    });
    const orgNewBranch = await prismaClient.orgBranch.create({
      data : {
        ...branchDetails,
        orgId: newOrg.id
      }
    })

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
    await prismaClient.itemCategory.create({
      data: {
        name: defaultCategories,
        InventorySection: {
          connect: { id: inventorySection.id }
        }
      }
    })

    const defaultUnits = ['Boxes', 'Pieces', 'Vials', 'Units', 'Strips'];
    await prismaClient.itemUnit.create({
      data: {
        name: defaultUnits,
        InventorySection: {
          connect: { id: inventorySection.id }
        }
      }
    })

    const defaultTaxTypes = [0, 5, 12, 18, 28];
    await prismaClient.taxType.create({
      data: {
        name: defaultTaxTypes,
        InventorySection: {
          connect: { id: inventorySection.id }
        }
      }
    })

    const defaultServiceCategory = ['General Consultation', 'Follow Up', 'Surgery', 'Vaccination', 'Grooming', 'Boarding', 'Rescue'];
    await prismaClient.serviceCategory.create({
      data: {
        name: defaultServiceCategory,
        InventorySection: {
          connect: { id: inventorySection.id }
        }
      }
    })

    const defaultExpenseCategory = ['Rent', ' Payroll', 'Utilities', 'Transport', 'Medical Equipment', 'Repair and Maintenance', 'Other'];
    await prismaClient.expenseCategory.create({
      data: {
        name: defaultExpenseCategory,
        InventorySection: {
          connect: { id: inventorySection.id }
        }
      }
    })

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
    await prismaClient.reason.create({
      data: {
        name: defaultReason,
        InventorySection: {
          connect: { id: inventorySection.id }
        }
      }
    })

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



    // console.log(orgNewBranch)

    adminUserDetails.orgBranchId = orgNewBranch.id;

    const newUser = await prismaClient.user.create({
      data: adminUserDetails
    });

    // console.log(newOrg,newUser);



    await prismaClient.organization.update({
      where: {
        orgName: newOrg.orgName
      },
      data: {
        adminUsers: {
          connect: {
            id: newUser.id
          }
        }
      }
    });
    await prismaClient.orgBranchUserRole.create({
      data: {
          orgBranchId: orgNewBranch.id,
          userId: newUser.id,
          role: "Admin",
      },
    });





    return new Response(JSON.stringify({ "message": `Your organisation ${orgDetails.orgName} has been created successfully` }), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error: any) {
    // console.log(error);
    // console.log(typeof(error))
    return new Response(JSON.stringify({ "message": error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } finally {
    await prismaClient.$disconnect();
  }
};
