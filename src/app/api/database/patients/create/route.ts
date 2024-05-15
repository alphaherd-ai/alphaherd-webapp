import { connectToDB } from '../../../../../utils/index';
import prisma from '../../../../../../prisma/index';
import { fetchDatabaseId } from '@/utils/fetchBranchDetails';
import type { Patients } from "@prisma/client";
import { PatientSchema } from '@/schemas/database/patientValidation';

export const POST = async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }
  try {
    const databaseId = await fetchDatabaseId();
    const body = await req.json();
    const validatedData = PatientSchema.safeParse(body);

    if (!validatedData.success) {
      return new Response(JSON.stringify({ errors: validatedData.error.issues }), {
        status: 422,
      });
    }
    await connectToDB();

    const patient = await prisma.patients.create({
      data:{ 
        ...body,
      DatabaseSection:{
        connect:{
          id:databaseId
        }
      }
      }
    });

    return new Response(JSON.stringify( patient ), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify(error));
  } finally {
    await prisma.$disconnect();
  }
}
