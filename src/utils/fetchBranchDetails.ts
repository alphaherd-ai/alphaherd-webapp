import { getSession } from "../../auth"
import { connectToDB } from './index';
import prisma from '../../prisma/index';

export const lastUsedBranch = async () => {
    const session = await getSession();
    return 1;
}

export const fetchInventoryId = async () => {
    const branchId = await lastUsedBranch();

    if (!branchId) {
        throw new Error("Branch ID not found in session");
    }
    const orgBranch=await prisma.orgBranch.findUnique({
        where:{
            id:branchId
        }
    })
    const inventorySection = await prisma.inventorySection.findUnique({
        where: {
            branchId: branchId, 
        }
    });
    if(!inventorySection&&orgBranch){
        await prisma.inventorySection.create({
            data:{
               name:"Inventory-"+orgBranch.branchName,
               quantity:1,
               branch: {
                connect: { id: branchId }
            }
            }
        })
    }

    return inventorySection?.id;
}


export const fetchFinanceId= async ()=>{
    const branchId= await lastUsedBranch();
    if(!branchId){
        throw new Error("Branch ID not found in session");
    }

    const financeSection = await prisma.financeSection.findUnique({
        where:{
            branchId:branchId
        }
    });

    return financeSection?.id;
}

export const fetchDatabaseId= async ()=>{
    const branchId= await lastUsedBranch();
    if(!branchId){
        throw new Error("Branch ID not found in session");
    }

    const databaseSection = await prisma.databaseSection.findUnique({
        where:{
            branchId:branchId
        }
    });

    return databaseSection?.id;
}