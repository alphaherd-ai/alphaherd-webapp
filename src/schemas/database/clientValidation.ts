import {z} from 'zod';

export const ClientSchema=z.object({
    clientName: z.string().trim().min(1), 
  email: z.string().email(), 
  contact: z.string().min(10).max(13), 
  address: z.string().trim().min(1),
  city: z.string().optional(),
  pinCode: z.string().min(6).max(6), 
})