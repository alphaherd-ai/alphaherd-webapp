import {z} from 'zod';

export const DistributorSchema=z.object({
    distributorName: z.string().trim().min(1), 
  email: z.string().email(), 
  contact: z.string().min(10).max(13), 
  gstinNo: z.string().min(1), 
  panNo: z.string().min(1),
  address: z.string().trim().min(1),
  city: z.string().trim().min(1), 
  pinCode: z.string().min(6).max(6), 
})