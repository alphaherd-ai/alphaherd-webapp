import { getSession } from "../../auth"
import { connectToDB } from './index';
import prisma from '../../prisma/index';

export const lastUsedBranch = async () => {
    const session = await getSession();
    return session?.user.orgBranchId;
}

export const fetchInventoryId = async () => {
    const branchId = await lastUsedBranch();

    if (!branchId) {
        throw new Error("Branch ID not found in session");
    }

    const inventorySection = await prisma.inventorySection.findUnique({
        where: {
            branchId: branchId, 
        }
    });

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