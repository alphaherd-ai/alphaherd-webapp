import { PrismaClient } from '@/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare global {
  var : undefined | ReturnType<typeof prismaClientSingleton>
}

const  = globalThis. ?? prismaClientSingleton()

export default 

if (process.env.NODE_ENV !== 'production') globalThis. = 