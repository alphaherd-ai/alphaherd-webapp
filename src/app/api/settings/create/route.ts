import { NextRequest } from "next/server";
import prismaClient from "../../../../../prisma";

export const POST = async(req: NextRequest) => {
        if (req.method !== 'POST') {
        return new Response('Method not allowed', { status: 405 });
        }
        try {
        const body = await req.json();
        const paymentMethod = await prismaClient.paymentMethod.create({
            data: {
            ...body,
            },
        });
        return new Response(JSON.stringify(paymentMethod), {
            status: 201,
            headers: {
            'Content-Type': 'application/json',
            },
        });
        } catch (error) {
        console.error(error);
        return new Response(JSON.stringify(error));
        } finally {
        await prismaClient.$disconnect();
        }
}