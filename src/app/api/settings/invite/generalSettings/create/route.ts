import { NextRequest } from "next/server";
import prismaClient from '../../../../../../../prisma';

export const POST = async (req: NextRequest) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const body = await req.json();
    const { type, data } = body;

    let createdRecord;

    switch (type) {
      case "communicationMode":
        createdRecord = await prismaClient.communicationMode.create({
          data: {
            ...data
          }
        });
        break;

        // case "paymentMethod":
        //   createdRecord = await prismaClient.communicationMode.create({
        //     data: {
        //       ...data
        //     }
        //   });
        //   break;

      case "taxType":
        createdRecord = await prismaClient.taxType.create({
          data: {
            ...data
          }
        });
        break;

      case "animalSpecies":
        createdRecord = await prismaClient.animalSpecies.create({
          data: {
            ...data
          }
        });
        break;

      case "animalBreed":
        createdRecord = await prismaClient.animalBreed.create({
          data: {
            ...data,
            species: {
              connect: {
                id: data.speciesId
              }
            }
          }
        });
        break;

      case "itemType":
        createdRecord = await prismaClient.itemType.create({
          data: {
            ...data
          }
        });
        break;

      case "unit":
        createdRecord = await prismaClient.unit.create({
          data: {
            ...data
          }
        });
        break;

      default:
        return new Response('Invalid type', { status: 400 });
    }

    return new Response(JSON.stringify(createdRecord), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to create record", details: error }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } finally {
    await prismaClient.$disconnect();
  }
};
