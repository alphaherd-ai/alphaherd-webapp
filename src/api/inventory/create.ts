// src/api/inventory/create.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDB } from '../../utils/index';
import prisma from '../../../prisma/index';

export default async function createInventory(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        await connectToDB();
        const inventory = await prisma.inventory.create({
            data: {
                ...req.body,
                expiry: new Date(req.body.expiry), // Convert string to Date object
            },
        });
        res.status(201).json(inventory);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    } finally {
        await prisma.$disconnect();
    }
}
