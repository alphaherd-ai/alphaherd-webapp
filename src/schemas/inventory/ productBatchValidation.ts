import {z} from 'zod';
import { Stock } from '@/client';

const StockOption = z.enum([Stock.StockIN, Stock.StockOUT]);


export const ProductBatchSchema = z.object({
  quantity: z.number().int().min(1), 
  batchNumber: z.string().min(1),
  expiry: z.string().regex(
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}[+-]\d{2}:\d{2}$/,
    "Invalid ISO 8601 datetime format"
  ),
  costPrice: z.number().min(1),
  sellingPrice: z.number().min(1),
  stockStatus: StockOption,
  distributors: z.string().optional(),
  invoiceType:z.string().min(1),
  productId: z.number().int(),
});
