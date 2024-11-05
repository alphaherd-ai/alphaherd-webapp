import { NextRequest } from "next/server";
import prismaClient from "../../../../../../prisma";

export const POST = async (req: NextRequest) => {
    if (req.method !== 'POST') {
        return new Response('Method not allowed', { status: 405 });
    }

    try {
        const body = await req.json();
const speciesName = body.speciesName;
const breedName = body.name;

if (!speciesName || typeof speciesName !== 'string') {
    return new Response('Species name is required and should be a string.', { status: 400 });
}

if (!breedName || typeof breedName !== 'string') {
    return new Response('Breed name is required and should be a string.', { status: 400 });
}

        // Find the Species by name
        const species = await prismaClient.species.findUnique({
            where: { name: speciesName },
        });

        console.log("species is :",species)
        if (!species) {
            return new Response('Species not found', { status: 404 });
        }

        // Create the Breed with the connected Species ID
        const breed = await prismaClient.breed.create({
            data: {
                name: breedName,
                species: {
                    connect: { id: species.id }
                }
            }
        });
 
        return new Response(JSON.stringify(breed), {
            status: 201,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.log('Error creating breed:', error);
        return new Response(JSON.stringify({ error }), { status: 500 });
    } finally {
        await prismaClient.$disconnect();
    }
};
