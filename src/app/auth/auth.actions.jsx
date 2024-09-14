"use server"

import { sendVerificationEmail } from "@/lib/email";
import { googleOautClient } from "@/lib/googleOauth";
import { lucia } from "@/lib/lucia";
import prisma from "@/lib/prisma"
import { generateCodeVerifier, generateState } from "arctic";
import bcrypt from "bcryptjs"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const SignUp = async (values) => {
    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                email: values.email.toLowerCase()
            }
        })
        
        if (existingUser) {
            console.log("User already exists");
            return { error: 'User already exists', success: false };
        }
        
        const hashedPassword = (await bcrypt.hash(values.password, 10));
        const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
        const user = await prisma.user.create({
            data: {
                email: values.email.toLowerCase(),
                name: values.name,
                hashedPassword: hashedPassword,
                isVerified: false,
                code: randomCode
                
            }
        });     
        console.log("User created:", user);
        const emailResponse = await sendVerificationEmail(user.email, randomCode);
        if (emailResponse.error) {
            return { error: 'Failed to send verification email: ' + emailResponse.error, success: false };
        }
        const session = await lucia.createSession(user.id, {});
        const sessionCookie = await lucia.createSessionCookie(session.id);
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)        
        return { success: true, message: 'Please check your email to verify your account.' };
    } catch (error) {
        console.error("SignUp error:", error);
        return { error: 'Something went wrong: ' + error.message, success: false };
    }
}

export const SignIn = async (values) => {
    const user = await prisma.user.findUnique({
        where: {
            email: values.email
        }
    })
    if(!user || !user.hashedPassword){
        return {error: "Invalid Credentials"};
    }
    
    const passwordMatch = await bcrypt.compare(values.password, user.hashedPassword);
    if(!passwordMatch){
        return {success: false, error: 'Invalid Password'}
    }
    const session = await lucia.createSession(user.id, {});
    const sessionCookie = await lucia.createSessionCookie(session.id);
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    return {success:true}
}

export const verifyOTP = async (otp, email) => {
    const user = await prisma.user.findFirst({
        where: {
            email: email,
        }
    })
    
    if (user.code !== otp) {
        return { error: "Invalid Code" }
    }
    
    await prisma.user.update({
        where: { id: user.id },
        data: { isVerified: true, code: null }
    })
    
    return { success: true }
}
export const ResendCode = async (email) => {
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    await prisma.user.update({
        where: {
            email: email
        },
        data: {
            code: newCode
        }
    })
    await sendVerificationEmail(email, newCode);
    return { success: true }
}
export const resetPasswordOTP = async(email) =>{
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        }
    })
    if(!user){
        return {error: "No User found!"}
    }
    
    const passwordOtp = Math.floor(100000 + Math.random() * 900000).toString();
    await prisma.user.update({
        where: {
            email: user.email
        },
        data : {
            resetPasswordCode: passwordOtp,
            isResetPassword: false

        }

    })
    await sendVerificationEmail(email, passwordOtp);
    return { success: true }
}
export const verifyResetPasswordOTP = async (otp , email) => {
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        }
    })
    if (user.resetPasswordCode.trim() !== otp.trim()) {
        return { error: "Invalid Code from user" };
    }
    await prisma.user.update({
        where: { id: user.id },
        data: {  resetPasswordCode: null, isResetPassword: true }
    })
    
    return { success: true }

}
export const PasswordReset = async (values, email) => {
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    if(!user.isResetPassword){
        return {error: "Please verify first"}
    }
    const newHashedPassword = await bcrypt.hash(values.password, 10);
    const previousPass = await bcrypt.compare(values.password, user.hashedPassword);
    if(previousPass){
        return {error: "Don't use same password"}
    }
    await prisma.user.update({
        where: {
            email: user.email,
        },data: {
            hashedPassword: newHashedPassword
        }
    })
    return {success: true}
}

export const logOut = async () => {
    const sessionCookie = await lucia.createBlankSessionCookie();
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    return redirect('/auth')
}
export const getGoogleOauthConsentUrl = async () => {
    try {
        const state = generateState();
        const codeVerifier = generateCodeVerifier();

        cookies().set('codeVerifier', codeVerifier, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
        });
        cookies().set('state', state, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
        });
        const authUrl = await googleOautClient.createAuthorizationURL(state, codeVerifier, {
            scopes: ['https://www.googleapis.com/auth/userinfo.profile', 'openid', 'email']
        });
        return { success: true, url: authUrl.toString() };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

