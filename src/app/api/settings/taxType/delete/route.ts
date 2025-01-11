import { NextRequest } from "next/server";
import prismaClient from "../../../../../../prisma";

export const DELETE = async (req: NextRequest) => {
    if (req.method !== 'DELETE') {
        return new Response('Method not allowed', { status: 405 });
    }

    try {
        const url = new URL(req.url);
        const taxTypeId = url.searchParams.get('id');

        // Validate and parse the taxType ID
        if (!taxTypeId || isNaN(Number(taxTypeId))) {
            return new Response('Invalid data: ID should be a valid number.', { status: 400 });
        }

        const taxTypeIdNumber = Number(taxTypeId);

        // Delete the taxType
        const deletedTaxType = await prismaClient.taxType.delete({
            where: {
                id: taxTypeIdNumber,
            },
        });

        return new Response(JSON.stringify(deletedTaxType), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error while deleting taxType:', error);
        return new Response(
            JSON.stringify({ error: 'Internal Server Error', details: error }),
            { status: 500 }
        );
    } finally {
        await prismaClient.$disconnect();
    }
};
