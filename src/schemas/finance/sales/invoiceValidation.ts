import { z } from 'zod';

const FinanceCreationType = z.enum(['Return']); 

export const salesReturnSchema = z.object({
  customer: z.string().optional(), 
  notes: z.string().optional(), 
  subTotal: z.number().min(0),
  invoiceNo: z.string().min(4), 
  dueDate: z.string().regex(
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}[+-]\d{2}:\d{2}$/,
    "Invalid ISO 8601 datetime format"
  ), 
  shipping: z.number().min(0), 
  adjustment: z.number().optional(),
  totalCost: z.number().min(0), 
  overallDiscount: z.number().optional(),
  totalQty: z.number().int().min(0), 
  status: z.string(), 
  type: FinanceCreationType, 
  items: z.object({
    create: z.array(
      z.object({
        productId: z.string().optional(), 
        productBatchId: z.string().optional(),
        quantity: z.number().int().min(1),
      })
    ),
  }),
});
