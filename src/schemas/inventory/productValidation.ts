import { z } from 'zod';

export const productSchema = z.object({
  itemName: z.string().min(1).max(40),
  hsnCode: z.string().min(1).max(40),
  category: z.string().min(1).max(40),
  description: z.string().min(1).max(100),
  minStock: z.number().int().min(1).max(10000),
  maxStock:z.number().int().min(1).max(10000),
  totalQuantity: z.number().int().min(1).max(10000),
});
