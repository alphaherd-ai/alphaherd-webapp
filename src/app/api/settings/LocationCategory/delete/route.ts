import { NextRequest } from "next/server";
import prismaClient from "../../../../../../prisma";

export const DELETE = async (req: NextRequest) => {
    if (req.method !== 'DELETE') {
        return new Response('Method not allowed', { status: 405 }); // Use 405 for method not allowed
    }

    try {
        const url = new URL(req.url);
        const locationId = url.searchParams.get('id');

        // Validate and parse the location ID
        if (!locationId || isNaN(Number(locationId))) {
            return new Response('Invalid data: ID should be a valid number.', { status: 400 });
        }

        // Convert the ID to a number
        const locationIdNumber = Number(locationId);

        // Delete the location record
        const deletedLocation = await prismaClient.location.delete({
            where: {
                id: locationIdNumber,
            },
        });

        console.log("Deleted location:", deletedLocation);

        return new Response(JSON.stringify(deletedLocation), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error while deleting location:', error);
        return new Response(
            JSON.stringify({ error: 'Internal Server Error', details: error }),
            { status: 500 }
        );
    } finally {
        await prismaClient.$disconnect();
    }
};
