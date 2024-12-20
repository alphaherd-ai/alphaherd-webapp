import { NextRequest } from "next/server";
import prismaClient from "../../../../../../prisma";
import { fetchInventoryId } from "@/utils/fetchBranchDetails";

export const POST = async (req: NextRequest) => {

    
    if (req.method !== 'POST') {
        return new Response('Method not allowed', { status: 405 }); // Use 405 for method not allowed
    }

    try {
        const inventoryId = await fetchInventoryId(req);
        const body = await req.json();
        console.log("Request body:", body);
console.log("Fetched Inventory ID:", inventoryId);


        // Validate body data
        if (!body.name || typeof body.name !== 'string') {
            return new Response('Invalid data: name should be a non-empty string.', { status: 400 });
        }

        // Create location record
        const itemCategory = await prismaClient.location
        .create({
            data: {
                ...body,
                InventorySection: {
                    connect: {id: inventoryId}
                },
            },
        });

        console.log("location in create ", itemCategory);

        return new Response(JSON.stringify(itemCategory), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error while creating location:', error);
        return new Response(
            JSON.stringify({ error: 'Internal Server Error', details: error }),
            { status: 500 }
        );
    } finally {
        await prismaClient.$disconnect();
    }
};
