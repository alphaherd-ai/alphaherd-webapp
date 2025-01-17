import {z} from 'zod';

export const PatientSchema =z.object({
  patientName: z.string().trim().min(1),
  clientId: z.number().int().optional(), 
  species: z.string().trim().min(1), 
  breed: z.string().optional(), 
  dateOfBirth: z.string().date(), 
  age: z.number().int().min(0), 
  gender: z.enum(['Male', 'Female', 'Other']),
  inPatient: z.boolean(), 
})


