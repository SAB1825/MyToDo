import { lucia } from "@/lib/lucia"
import prisma from "@/lib/prisma";
import { cookies } from "next/headers"


export const getUser = async () => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value || null;
    if(!sessionId) return null;
    const { user, session } = await lucia.validateSession(sessionId);
    console.log('The user:' , user);
    try {
        if(session && session.fresh){
            const sessionCookie = await lucia.createSessionCookie(session.id);
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

            if(!session){
                const sessionCookie = await lucia.createBlankSessionCookie();
                cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes); 
            }
        }
    } catch (error) {
        console.log(error.message);
    }
    const dbUser = await prisma.user.findUnique({
        where: {
            id: user?.id
        },
        select: {
            name:true,
            email: true,
            picture: true,
        }
    })
    return dbUser;
}