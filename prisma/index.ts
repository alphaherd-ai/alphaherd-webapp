import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const prismaClient = new PrismaClient().$extends(withAccelerate());

export default prismaClient