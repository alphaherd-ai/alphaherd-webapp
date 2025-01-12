import { NextRequest } from "next/server";
import prismaClient from "../../../../../../prisma";

export const DELETE = async (req: NextRequest) => {
    if (req.method !== 'DELETE') {
        return new Response('Method not allowed', { status: 405 });
    }

    try {
        const url = new URL(req.url);
        const paymentTypeId = url.searchParams.get('id');

        // Validate and parse the paymentType ID
        if (!paymentTypeId || isNaN(Number(paymentTypeId))) {
            return new Response('Invalid data: ID should be a valid number.', { status: 400 });
        }

        const paymentTypeIdNumber = Number(paymentTypeId);

        // Delete the paymentType
        const deletedpaymentType = await prismaClient.paymentMethod.delete({
            where: {
                id: paymentTypeIdNumber,
            },
        });

        return new Response(JSON.stringify(deletedpaymentType), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error while deleting paymentType:', error);
        return new Response(
            JSON.stringify({ error: 'Internal Server Error', details: error }),
            { status: 500 }
        );
    } finally {
        await prismaClient.$disconnect();
    }
};
