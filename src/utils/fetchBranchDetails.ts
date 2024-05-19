import prismaClient from '../../prisma';
export const lastUsedBranch = async (url:string) => {
    const { searchParams } = new URL(url);
    const branchId = searchParams.get("orgBranchID")!;  
    console.log("here's the branch id",branchId)
    return branchId;
}

export const fetchBranchDetailsById = async (branchId: Number) => {
    console.log("Here's the branch id",branchId)
    const url = new URL(`${process.env.NEXT_PUBLIC_API_BASE_PATH} + "/api/details/branch"`);
    url.searchParams.append('branchId', String(branchId));
    console.log("Here's the url",url)
    const resp = await fetch(url, {
        method: 'GET',
        credentials: 'include',
    });
    if(resp.ok){
        return (await resp.json());
    }
    else{ 
        console.error(Error)
        throw new Error("Something went wrong");
    }
}

export const fetchInventoryId = async (url:string) => {
    const branchId = await lastUsedBranch(url!);
    
    console.log("here's the final branchID",branchId)
    if (!branchId) {
        throw new Error("Branch ID not found in session");
    }
    const orgBranch=await fetchBranchDetailsById(Number(branchId));
    console.log(orgBranch)
    const inventorySection = await prismaClient.inventorySection.findUnique({
        where: {
            branchId: Number(branchId),
        }
    });
    if (!inventorySection && orgBranch) {
        await prismaClient.inventorySection.create({
            data: {
                name: "Inventory-" + orgBranch.branchName,
                quantity: 1,
                branch: {
                    connect: { id: Number(branchId) }
                }
            }
        })
    }

    return inventorySection?.id;
}


export const fetchFinanceId = async (url:string) => {
    const branchId = lastUsedBranch(url!)
    if (!branchId) {
        throw new Error("Branch ID not found in session");
    }

    const financeSection = await prismaClient.financeSection.findUnique({
        where: {
            branchId: Number(branchId)
        }
    });

    return financeSection?.id;
}

export const fetchDatabaseId = async (url:string) => {
    const branchId = lastUsedBranch(url!);
    if (!branchId) {
        throw new Error("Branch ID not found in session");
    }

    const databaseSection = await prismaClient.databaseSection.findUnique({
        where: {
            branchId: Number(branchId)
        }
    });

    return databaseSection?.id;
}