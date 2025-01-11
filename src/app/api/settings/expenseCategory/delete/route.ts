import { NextRequest } from "next/server";
import prismaClient from "../../../../../../prisma";

export const DELETE = async (req: NextRequest) => {
    if (req.method !== 'DELETE') {
        return new Response('Method not allowed', { status: 405 });
    }

    try {
        const url = new URL(req.url);
        const categoryId = url.searchParams.get('id');

        // Validate and parse the category ID
        if (!categoryId || isNaN(Number(categoryId))) {
            return new Response('Invalid data: ID should be a valid number.', { status: 400 });
        }

        const categoryIdNumber = Number(categoryId);

        // Delete the expense category
        const deletedCategory = await (prismaClient as any).expenseCategory.delete({
            where: {
                id: categoryIdNumber,
            },
        });

        return new Response(JSON.stringify(deletedCategory), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error while deleting expense category:', error);
        return new Response(
            JSON.stringify({ error: 'Internal Server Error', details: error }),
            { status: 500 }
        );
    } finally {
        await prismaClient.$disconnect();
    }
};
