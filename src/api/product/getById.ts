import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDB } from '../../utils/index';
import prisma from '../../../prisma/index';

export default async function getProductById(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    try {
        await connectToDB();
        const product = await prisma.product.findUnique({
            where: { id: String(id) },
        });
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ error: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    } finally {
        await prisma.$disconnect();
    }
}
