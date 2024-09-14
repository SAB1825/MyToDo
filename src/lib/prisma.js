import { PrismaClient } from "@prisma/client";

const client = new PrismaClient({
    log: process.env.NODE_ENV === 'development'  ? ['error', 'warn'] : ['error']

})

const globalForPrisma = global;

if(!globalForPrisma.prisma) {
    globalForPrisma.prisma = client;
}

export default globalForPrisma.prisma;
if(process.env.NODE_ENV === 'production') globalForPrisma.prisma = client;