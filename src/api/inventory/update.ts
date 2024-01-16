// src/api/inventory/update.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDB } from '../../utils/index';
import prisma from '../../../prisma/index';

export default async function updateInventory(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'PUT') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { id } = req.query;

    try {
        await connectToDB();
        const inventory = await prisma.inventory.update({
            where: { id: String(id) },
            data: req.body,
        });
        res.status(200).json(inventory);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    } finally {
        await prisma.$disconnect();
    }
}
