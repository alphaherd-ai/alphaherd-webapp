import { connectToDB } from '../../../../../utils/index';
import prismaClient from '../../../../../../prisma';
import { fetchDatabaseId } from '@/utils/fetchBranchDetails';
import { PatientSchema } from '@/schemas/database/patientValidation';
import { NextRequest } from 'next/server';

export const POST = async (req: NextRequest) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }
  try {
    const databaseId = await fetchDatabaseId(req);
    let {clientData,clientId,...body} = await req.json();
    // const validatedData = PatientSchema.safeParse(body);

    // if (!validatedData.success) {
    //   return new Response(JSON.stringify({ errors: validatedData.error.issues }), {
    //     status: 422,
    //   });
    // }
    
    if(clientData!=null&&clientId===null){
      try{
        const client=await prismaClient.clients.create({
          data:{
            clientName: clientData.name,
            email: clientData.email,
            contact: clientData.contact,
            address: clientData.address,
            city: clientData.city?clientData.city[0].value:undefined,
            pinCode: clientData.pinCode,
            DatabaseSection:{
              connect:{
                id:databaseId
              }
            }
          }
        })
        console.log(client)
        clientId=client.id;
      }
      catch(error){
        console.error(error)
      }
    }

    const patient = await prismaClient.patients.create({
      data:{ 
        ...body,
        clients:{
          connect:{
            id:clientId
          }
        },
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
    await prismaClient.$disconnect();
  }
}
