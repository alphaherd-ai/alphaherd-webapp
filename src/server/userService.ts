import prismaClient from '../../prisma';
import bcrypt from 'bcrypt';

export const userService = {
    authenticate,
  };
  
  async function authenticate(email: string, password: string) {
    const user = await prismaClient.user.findUnique({
        where: { email },
      });
  
      if (!user) {
        return null;
      }
  
      const validPassword = await bcrypt.compare(password, user.hashedPassword);
  
      if (!validPassword) {
        return null;
      }
    return user;
}