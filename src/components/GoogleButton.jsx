'use client'

import React from 'react'
import { Button } from './ui/button'
import { FaGoogle } from "react-icons/fa6";
import { redirect } from 'next/navigation';
import { toast } from 'sonner';
import { getGoogleOauthConsentUrl } from '@/app/auth/auth.actions';
const googleButton =  () => {
  return (
    <Button 
        onClick = {async () => {
            const res = await getGoogleOauthConsentUrl();
            if(res.url){
                window.location.href =res.url;

            }else{
                toast.error(res.error)
            }
        }}
        className = "w-full mb-3"><FaGoogle className='mr-2 '
    />
        Continue with Google
    </Button>
  )
}
export default googleButton
