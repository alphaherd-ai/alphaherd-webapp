// src/pages/api/schedule.js
import initializeScheduling from '@/lib/initializeScheduling';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, res: NextResponse) => {
    if (req.method !== 'GET') {
      return new Response('Method not allowed',{status:405});
    }

  try {
    await initializeScheduling();
    console.log("started")
    return new Response("Initialized Scheduling", {
        status: 201,
        headers: {
            'Content-Type': 'application/json',
        },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error));
  }
}
