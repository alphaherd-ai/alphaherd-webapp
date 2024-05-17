import prismaClient from '../../prisma';

export async function validateToken(token: string) {
    const user =await prismaClient.user.findUnique({
         where:{
                token:token   
            }
        } )
    if (!user) {
      return null;
    }
    return user;
  }