import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";
import { Lucia } from "lucia";

const prisma = new PrismaClient;
const adapter = new PrismaAdapter(prisma.session, prisma.user)
export const lucia = new Lucia(adapter,{
    sessionCookie: {
        name: 'mytodo-cookie',
        expires: false,
        attributes: {
            secure: process.env.NODE_ENV === 'production'
        }
    }
})