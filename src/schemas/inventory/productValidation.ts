import { z } from 'zod';

export const productSchema = z.object({
  itemName: z.string().min(1).max(40),
  hsnCode: z.string().min(1).max(40),
  category: z.string().optional(),
  providers:z.string().array(),
  description: z.string().min(1).max(1000),
  minStock: z.number().int().min(1).max(10000),
  maxStock:z.number().int().min(1).max(10000),
  tax:z.string().optional()
});
