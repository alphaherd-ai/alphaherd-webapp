import { NextRequest } from "next/server";
import prismaClient from "../../../../../../prisma";

export const DELETE = async (req: NextRequest) => {
    if (req.method !== 'DELETE') {
        return new Response('Method not allowed', { status: 405 });
    }

    try {
        const url = new URL(req.url);
        const speciesId = url.searchParams.get('id');

        // Validate and parse the species ID
        if (!speciesId || isNaN(Number(speciesId))) {
            return new Response('Invalid data: ID should be a valid number.', { status: 400 });
        }

        const speciesIdNumber = Number(speciesId);

        // Delete the species
        const deletedSpecies = await prismaClient.species.delete({
            where: {
                id: speciesIdNumber,
            },
        });

        return new Response(JSON.stringify(deletedSpecies), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error while deleting species:', error);
        return new Response(
            JSON.stringify({ error: 'Internal Server Error', details: error }),
            { status: 500 }
        );
    } finally {
        await prismaClient.$disconnect();
    }
};
