import prismaClient from '../../../../../../../prisma';
import { NextRequest } from 'next/server';

export const GET = async (req: NextRequest) => {
  if (req.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');

    let records;

    switch (type) {
      case "communicationMode":
        records = await prismaClient.communicationMode.findMany();
        break;

      case "taxType":
        records = await prismaClient.taxType.findMany();
        break;

      case "animalSpecies":
        records = await prismaClient.animalSpecies.findMany();
        break;

      case "animalBreed":
        records = await prismaClient.animalBreed.findMany({
          include: {
            species: true
          }
        });
        break;

      case "itemType":
        records = await prismaClient.itemType.findMany();
        break;

      case "unit":
        records = await prismaClient.unit.findMany();
        break;

      default:
        return new Response('Invalid type', { status: 400 });
    }

    return new Response(JSON.stringify(records), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
    return new Response("Internal server error", { status: 500 });
  } finally {
    await prismaClient.$disconnect();
  }
};
