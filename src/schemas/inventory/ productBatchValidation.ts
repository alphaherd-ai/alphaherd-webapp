import {z} from 'zod';
import { Stock } from '@prisma/client';

const StockOption = z.enum([Stock.StockIN, Stock.StockOUT]);


export const ProductBatchSchema = z.object({
  date: z.date(),
  quantity: z.number().int().min(1), 
  maxQuantity: z.number().int().min(1),
  batchNumber: z.string().min(1),
  expiry: z.string().date(),
  costPrice: z.number().min(1),
  sellingPrice: z.number().min(1),
  stockStatus: StockOption,
  distributors: z.string().optional(),
  invoiceType:z.string().min(1),
  productId: z.number().int(),
});
