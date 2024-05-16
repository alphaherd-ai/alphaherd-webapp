import prisma from '../../prisma';

export async function validateToken(token: string) {
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