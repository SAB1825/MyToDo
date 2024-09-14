import { googleOautClient } from "@/lib/googleOauth";
import { lucia } from "@/lib/lucia";
import prisma from "@/lib/prisma";
import { SaveAll } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { date } from "zod";

export async function GET(req, res) {
    const url = req.nextUrl
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');

    if(!code || !state){
        console.log('NO code or State');
        return new Response('Invalid request', {status: 400});
    }

    const codeVerifier = cookies().get('codeVerifier')?.value
    const savedState = cookies().get('state')?.value

    if(!codeVerifier || !savedState){
        console.log('No codeVerifier or saved state');
        return new Response('Invalid request', {status: 400});
    }
    if(state !== savedState){
        console.log('State are not matching');
        return new Response('Invalid request', {status: 400});
    }
    const { accessToken } = await googleOautClient.validateAuthorizationCode(code, codeVerifier)
    const googleResponse = await fetch('https://www.googleapis.com/oauth2/v1/userinfo', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
    const googleData = await googleResponse.json();
     if (typeof googleData.id !== 'string' ||
        typeof googleData.email !== 'string' ||
        typeof googleData.name !== 'string' ||
        typeof googleData.picture !== 'string') {
        throw new Error('Invalid Google data structure');
    }
    let userId = '';
    // if the email exists in our record, we can create a cookie for them and sign them in
    // if the email doesn't exist, we create a new user, then craete cookie to sign them in
    const existingUser = await prisma.user.findUnique({
        where:{
            email: googleData.email
        }
    })
    if(existingUser) {
        userId = existingUser.id
    }else{
        const user = await prisma.user.create({
            data: {
                name: googleData.name,
                email: googleData.email,
                picture: googleData.picture,

            }
        })
        userId = user.id
    }
    const session = await lucia.createSession(userId,{})
    const sessionCookie = await lucia.createSessionCookie(session.id)
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    return redirect('/dashboard')
}