import { NextRequest } from "next/server";
import prismaClient from "../../../../../../prisma";

export const DELETE = async (req: NextRequest) => {
    if (req.method !== 'DELETE') {
        return new Response('Method not allowed', { status: 405 });
    }

    try {
        const url = new URL(req.url);
        const serviceCategoryId = url.searchParams.get('id');

        // Validate and parse the service category ID
        if (!serviceCategoryId || isNaN(Number(serviceCategoryId))) {
            return new Response('Invalid data: ID should be a valid number.', { status: 400 });
        }

        const serviceCategoryIdNumber = Number(serviceCategoryId);

        // Delete the service category
        const deletedServiceCategory = await prismaClient.serviceCategory.delete({
            where: {
                id: serviceCategoryIdNumber,
            },
        });

        return new Response(JSON.stringify(deletedServiceCategory), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error while deleting service category:', error);
        return new Response(
            JSON.stringify({ error: 'Internal Server Error', details: error }),
            { status: 500 }
        );
    } finally {
        await prismaClient.$disconnect();
    }
};
