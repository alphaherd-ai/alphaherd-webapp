import { NextRequest } from "next/server";
import prismaClient from "../../../../../../prisma";

export const DELETE = async (req: NextRequest) => {
    if (req.method !== 'DELETE') {
        return new Response('Method not allowed', { status: 405 });
    }

    try {
        const url = new URL(req.url);
        const unitId = url.searchParams.get('id');

        // Validate and parse the unit ID
        if (!unitId || isNaN(Number(unitId))) {
            return new Response('Invalid data: ID should be a valid number.', { status: 400 });
        }

        const unitIdNumber = Number(unitId);

        // Delete the item unit
        const deletedUnit = await prismaClient.itemUnit.delete({
            where: {
                id: unitIdNumber,
            },
        });

        return new Response(JSON.stringify(deletedUnit), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error while deleting item unit:', error);
        return new Response(
            JSON.stringify({ error: 'Internal Server Error', details: error }),
            { status: 500 }
        );
    } finally {
        await prismaClient.$disconnect();
    }
};
