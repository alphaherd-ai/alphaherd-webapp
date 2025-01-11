import { NextRequest } from "next/server";
import prismaClient from "../../../../../../prisma"; 

export const POST = async (req: NextRequest) => {
    if (req.method !== "POST") {
        return new Response("Method not allowed", { status: 405 });
    }
    
    try {
        const url = new URL(req.url);
        const branchDetails = await req.json();
        const orgId = url.searchParams.get("orgId");
        console.log('details in api',branchDetails);
        let newBranch = await prismaClient.orgBranch.create({
        data: {
            ...branchDetails,
        },
        });
    
        return new Response(JSON.stringify({ "message": "Branch added successfully" }), {
        status: 201,
        headers: {
            "Content-Type": "application/json",
        },
        });
    } catch (error: any) {
        return new Response(JSON.stringify({ "message": error.message }), {
        status: 500,
        headers: {
            "Content-Type": "application/json",
        },
        });
    } finally {
        await prismaClient.$disconnect();
    }
}