// middleware/apiMiddleware.ts
import { NextMiddleware, NextRequest, NextResponse } from 'next/server';
import { decrypt } from '../../auth'; // Assume you have a function to verify JWT

export const isAuthorized: NextMiddleware = async (request: NextRequest) => {
  const authHeader = request.headers.get('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = await decrypt(token);
    if (!decoded || !decoded.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
  } catch (error) {
    console.error('API Authentication Error:', error);
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.next();
};