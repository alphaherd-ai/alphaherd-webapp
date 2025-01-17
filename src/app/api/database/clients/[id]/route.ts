import { fetchDatabaseId } from '@/utils/fetchBranchDetails';
import prismaClient from '../../../../../../prisma';
import { ClientSchema } from '@/schemas/database/clientValidation';
import { NextRequest } from 'next/server';

export const GET = async (req: NextRequest,
    { params }: { params: { id: number; } }) => {
    if (req.method !== 'GET') {
        return new Response('Method not allowed', { status: 405 });
    }
    try {
        const databaseId = await fetchDatabaseId(req);
        const client = await prismaClient.clients.findUnique({
            where: { id: Number(params.id), databaseSectionId: databaseId },
            include: {
                patients: {
                    orderBy: {
                        date: "desc"
                    }
                }
            }
        });

        return new Response(JSON.stringify(client), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            },
        });


    } catch (error) {
        return new Response("Internal server error", { status: 500 });
    } finally {
        await prismaClient.$disconnect();
    }
}


export const PUT = async (
    req: NextRequest,
    { params }: { params: { id: number } }
) => {
    try {
        // Parse and validate the request body
        //console.log("i am in the route.ts,put section");

        const body = await req.json();
        // const validatedData = ClientSchema.safeParse(body);

        // if (!validatedData.success) {
        //     return new Response(JSON.stringify({ errors: validatedData.error.issues }), {
        //         status: 422,
        //         headers: { 'Content-Type': 'application/json' },
        //     });
        // }

        // Fetch database section ID (ensure this function is reliable)
        const databaseId = await fetchDatabaseId(req);
        //console.log('Database ID:', databaseId);


        if (!databaseId) {
            return new Response(JSON.stringify({ error: 'Database ID not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Ensure params.id is valid
        const clientId = Number(params.id);
        if (isNaN(clientId)) {
            return new Response(JSON.stringify({ error: 'Invalid client ID' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Update the client data
        const client = await prismaClient.clients.update({
            where: {
                id: clientId,
                databaseSectionId: databaseId, // Ensure this condition is valid
            },
            data: body, // Use validated data
        });

        return new Response(JSON.stringify(client), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error: any) {
        console.error('Error updating client:', error.message || error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    } finally {
        await prismaClient.$disconnect();
    }
};


export const DELETE = async (req: NextRequest, { params }: { params: { id: number } }) => {


    if (req.method !== 'DELETE') {
        return new Response('Method not allowed', { status: 405 });
    }




    try {
        const databaseId = await fetchDatabaseId(req);
        await prismaClient.clients.update({
            where: { id: Number(params.id), databaseSectionId: databaseId },
            data: {
                isDeleted: true
            }
        });

        return new Response(`Client with id: ${Number(params.id)} deleted successfully`, { status: 200 });
    } catch (error) {
        console.error(error);  // Log the error for debugging
        return new Response("Internal server error", { status: 500 });
    } finally {
        await prismaClient.$disconnect();
    }
};
