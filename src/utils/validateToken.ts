import { connectToDB } from '../utils/index';
import prisma from '../../prisma/index';

export async function validateToken(token: string) {
    await connectToDB();
    const user =await prisma.user.findUnique({
         where:{
                token:token   
            }
        } )
    if (!user) {
      return null;
    }
    return user;
  }