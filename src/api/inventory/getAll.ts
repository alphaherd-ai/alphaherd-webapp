// src/api/inventory/getAll.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDB } from '../../utils/index';
import prisma from '../../../prisma/index';

export default async function getAllInventory(req: NextApiRequest, res: NextApiResponse) {
    try {
        await connectToDB();
        const inventory = await prisma.inventory.findMany();
        res.status(200).json(inventory);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    } finally {
        await prisma.$disconnect();
    }
}
