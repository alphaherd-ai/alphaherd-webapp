import { getSession } from "../../auth"
import { connectToDB } from './index';
import prismaClient from '../../prisma';

export const lastUsedBranch = async () => {
    const session = await getSession();
    return 1;
}

export const fetchBranchDetailsById = async (branchId: Number) => {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_BASE_PATH} + "/api/details/branch"`);
    url.searchParams.append('branchId', String(branchId));
    const resp = await fetch(url, {
        method: 'GET',
        credentials: 'include', // Include cookies in the request
    });
    if(resp.ok){
        return (await resp.json());
    }
    else{
        throw new Error("Something went wrong");
    }
}

export const fetchInventoryId = async () => {
    const branchId = await lastUsedBranch();

    if (!branchId) {
        throw new Error("Branch ID not found in session");
    }
    const orgBranch = await prismaClient.orgBranch.findUnique({
        where: {
            id: branchId
        }
    })
    const inventorySection = await prismaClient.inventorySection.findUnique({
        where: {
            branchId: branchId,
        }
    });
    if (!inventorySection && orgBranch) {
        await prismaClient.inventorySection.create({
            data: {
                name: "Inventory-" + orgBranch.branchName,
                quantity: 1,
                branch: {
                    connect: { id: branchId }
                }
            }
        })
    }

    return inventorySection?.id;
}


export const fetchFinanceId = async () => {
    const branchId = await lastUsedBranch();
    if (!branchId) {
        throw new Error("Branch ID not found in session");
    }

    const financeSection = await prismaClient.financeSection.findUnique({
        where: {
            branchId: branchId
        }
    });

    return financeSection?.id;
}

export const fetchDatabaseId = async () => {
    const branchId = await lastUsedBranch();
    if (!branchId) {
        throw new Error("Branch ID not found in session");
    }

    const databaseSection = await prismaClient.databaseSection.findUnique({
        where: {
            branchId: branchId
        }
    });

    return databaseSection?.id;
}