import { NextRequest } from "next/server";
import prismaClient from "../../../../../../prisma";
import { fetchDatabaseId } from "@/utils/fetchBranchDetails";

export const POST = async (req: NextRequest) => {
    if (req.method !== 'POST') {
        return new Response('Method not allowed', { status: 400 });
    }
    //console.log("create called");
    try {
        const body = await req.json();
        const databaseSectionId = await fetchDatabaseId(req);
        // Ensure name is a string, not an array or other type
        if (!body.name || typeof body.name !== 'string') {
            return new Response('Invalid data: name should be a string.', { status: 400 });
        }

        const species = await prismaClient.species.create({
            data: {
                name: body.name,
                breed:{
                    create:{
                        name:["Unknown"],
                        DatabaseSection:{
                            connect:{id:databaseSectionId}
                        }
                    }
                },
                DatabaseSection : {
                    connect : { id : databaseSectionId}
                },
               
            },
        });
        return new Response(JSON.stringify(species), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            }
        });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error }), { status: 500 });
    } finally {
        await prismaClient.$disconnect();
    }
};
