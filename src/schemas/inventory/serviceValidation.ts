import {z} from 'zod'

export const ServiceSchema=z.object({
    name: z.string().trim().min(1),
    providers: z.string().array(), 
    sacCode: z.string().min(1), 
    linkProducts: z.array(
      z.object({
        label: z.string().min(1),
        value: z.number().int()
      })
    ), 
    serviceCharge: z.number().int().min(0), 
    tax: z.number().optional(), 
    category: z.string().optional(),
    description: z.string().trim().optional(), 
  });