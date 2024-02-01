import { connectToDB } from '../../../../utils/index';
import prisma from '../../../../../prisma/index';
import { Product } from '@prisma/client';

export const POST = async (req: Request) => {
    if (req.method !== 'POST') {
        return new Response('Method not allowed', { status: 405 });
    }
    try {
        await connectToDB();
        const { category, distributors } = await req.json();

        const filterOptions: { category?: string; distributors?: string; } = {};
        if (category) filterOptions.category = String(category);
        if (distributors) filterOptions.distributors = String(distributors);
        

        const filteredProducts: Product[] = await prisma.product.findMany({
            where: filterOptions,
        });

        return new Response(JSON.stringify(filteredProducts), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error('Error filtering products:', error);
        return new Response('Internal server error', { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};
