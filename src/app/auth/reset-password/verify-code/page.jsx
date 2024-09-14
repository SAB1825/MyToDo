"use client"
import React, { useState } from 'react'
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  } from "@/components/ui/input-otp"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useRouter, useSearchParams } from 'next/navigation'
import { verifyResetPasswordOTP } from '../../auth.actions'

const VerifyEmail = () => {
  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  const router = useRouter()
  const [otp, setOtp] = useState("")

  const handleComplete = (value) => {
    setOtp(value)
  }
  
  const onSubmit = async () => {
    
    const res = await verifyResetPasswordOTP(otp, email);
    if(res.success){
      toast.success("Verification successfull");
        const encodedEmail = encodeURIComponent(email);
        router.push(`/auth/new-password?email=${encodedEmail}`)
    }else{
      toast.error(res.error)
    }
    
  }
  // const onCodeSubmit =async () => {
  //   console.log(otp)
  //   const res = await ResendCode(email);
  //   if(res.success){
  //     toast.success("New Code sent");
  //   }else{
  //     toast.error(res.error)
  //   }
  // }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Verify your email!</CardTitle>
          <CardDescription>Enter the six-digit code sent to your email.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2 flex flex-col items-center">
            <InputOTP 
              maxLength={6} 
              value={otp} 
              onChange={setOtp}
              onComplete={handleComplete}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <Button variant="link" className="text-sm" >Resend code</Button>
          </div>
          <Button 
            className="w-full bg-black text-white rounded-full hover:text-black"
            onClick={onSubmit}
          >
            Verify Email
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default VerifyEmail
