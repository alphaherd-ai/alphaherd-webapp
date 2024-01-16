// src/api/inventory/getById.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDB } from '../../utils/index';
import prisma from '../../../prisma/index';

export default async function getInventoryById(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    try {
        await connectToDB();
        const inventory = await prisma.inventory.findUnique({
            where: { id: String(id) },
        });
        if (inventory) {
            res.status(200).json(inventory);
        } else {
            res.status(404).json({ error: "Inventory record not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    } finally {
        await prisma.$disconnect();
    }
}
