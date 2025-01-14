import { NextRequest } from "next/server";
import prismaClient from "../../../../../../prisma";

export const DELETE = async (req: NextRequest) => {
    if (req.method !== 'DELETE') {
        return new Response('Method not allowed', { status: 405 });
    }

    try {
        const url = new URL(req.url);
        const reasonId = url.searchParams.get('id');

        // Validate and parse the reason ID
        if (!reasonId || isNaN(Number(reasonId))) {
            return new Response('Invalid data: ID should be a valid number.', { status: 400 });
        }

        const reasonIdNumber = Number(reasonId);

        // Delete the reason
        const deletedReason = await prismaClient.reason.delete({
            where: {
                id: reasonIdNumber,
            },
        });

        return new Response(JSON.stringify(deletedReason), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error while deleting reason:', error);
        return new Response(
            JSON.stringify({ error: 'Internal Server Error', details: error }),
            { status: 500 }
        );
    } finally {
        await prismaClient.$disconnect();
    }
};
