import {z} from 'zod'

export const ServiceSchema=z.object({
    name: z.string().trim().min(1),
    providers: z.string().optional(), 
    sellingPrice: z.number().int().min(0),
    sacCode: z.string().min(1), 
    linkProducts: z.array(z.number().int()), 
    serviceCost: z.number().int().min(0), 
    serviceCharge: z.number().int().min(0), 
    tax: z.number().optional(), 
    category: z.string().optional(),
    description: z.string().trim().optional(), 
  });