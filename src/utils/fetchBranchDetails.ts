import { NextRequest } from 'next/server';
import prismaClient from '../../prisma';

export const fetchBranchDetailsById = async (branchId: Number) => {
    // console.log("Here's the branch id",branchId)
    const url = new URL(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/details/branch`);
    url.searchParams.append('branchId', String(branchId));
    // console.log("Here's the url",url)
    const resp = await fetch(url, {
        method: 'GET',
        credentials: 'include'
    });
    if(resp.ok){
        return (await resp.json());
    }
    else{ 
        console.error(Error)
        throw new Error("Something went wrong");
    }
}

export const fetchInventoryId = async (request:NextRequest) => {
    const url = request.nextUrl;
    const { searchParams } = new URL(url);
    console.log(searchParams);
    const branchId = searchParams.get("branchId")!;  
    
    console.log("here's the final branchID",branchId)
    if (!branchId) {
        throw new Error("Branch ID not found in request");
    }
    const orgBranch=await prismaClient.orgBranch.findUnique({
        where: {
            id : Number(branchId)
        },
        cacheStrategy:{ttl:30}
    });
    console.log(orgBranch)
    let inventorySection = await prismaClient.inventorySection.findUnique({
        where: {
            branchId: Number(branchId),
        },
        cacheStrategy: { ttl: 60 },
    });
    if (!inventorySection && orgBranch) {
        console.log("here");
       inventorySection= await prismaClient.inventorySection.create({
            data: {
                name: "Inventory-" + orgBranch.branchName,
                quantity: 1,
                branchId: Number(branchId)
            }
        })
    }
    console.log(inventorySection?.id, "hererer")
    return inventorySection?.id;
}


export const fetchFinanceId = async (request:NextRequest) => {
    const url = request.nextUrl;
    const { searchParams } = new URL(url);
    // console.log(searchParams);
    const branchId = searchParams.get("branchId")!;  
    
    // console.log("here's the final branchID",branchId)
    if (!branchId) {
        throw new Error("Branch ID not found in request");
    }
    const orgBranch=await prismaClient.orgBranch.findUnique({
        where: {
            id : Number(branchId)
        },
        cacheStrategy:{ttl:30}
    });
    // console.log(orgBranch)

    let financeSection = await prismaClient.financeSection.findUnique({
        where: {
            branchId: Number(branchId)
        },
        cacheStrategy: { ttl: 60 },
    });
    if (!financeSection && orgBranch) {
       financeSection= await prismaClient.financeSection.create({
            data: {
                name: "Finance-" + orgBranch.branchName,
                branchId: Number(branchId),
                amount:1
            }
        })
    }

    return financeSection?.id;
}

export const 
fetchDatabaseId = async (request:NextRequest) => {
    const url = request.nextUrl;
    const { searchParams } = new URL(url);
    // console.log(searchParams);
    const branchId = searchParams.get("branchId")!;  
    
    // console.log("here's the final branchID",branchId)
    
    if (!branchId) {
        throw new Error("Branch ID not found in request");
    }
    const orgBranch=await prismaClient.orgBranch.findUnique({
        where: {
            id : Number(branchId)
        },
        cacheStrategy:{ttl:30}
    });
    // console.log(orgBranch)
    let databaseSection = await prismaClient.databaseSection.findUnique({
        where: {
            branchId: Number(branchId)
        },
        cacheStrategy: { ttl: 60 },
    });
    if(!databaseSection&&orgBranch){
       databaseSection= await prismaClient.databaseSection.create({
            data: {
                name: "Database-" + orgBranch.branchName,
                branchId: Number(branchId),
               type:"type1"
            }
        })
    }

    return databaseSection?.id;
}