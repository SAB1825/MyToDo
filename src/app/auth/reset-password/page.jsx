"use client"
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { resetPasswordOTP } from '../auth.actions'

const ForgotPasswordSchema = z.object({
    email: z.string().email(),
})

const ForgotPasswordForm = () => {
    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(ForgotPasswordSchema),
        defaultValues: {
            email: '',
        }
    })

    async function onSubmit(values) {
        const res = await resetPasswordOTP(values.email);
        if(res.success){
            toast.success("Verification code sent successfully")
            const encodedEmail = encodeURIComponent(values.email);
            router.push(`/auth/reset-password/verify-code?email=${encodedEmail}`)
        }else{
            toast.error(res.error);
        }
        
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
        <Card className='w-[500px] top-1/2 left-1/2 shadow-xl'>
            <CardHeader>
                <CardTitle>Forgot Password</CardTitle>
                <CardDescription>Enter your email to reset your password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <Form {...form}>
                    <form 
                        onSubmit={form.handleSubmit(onSubmit)} 
                        className='space-y-4'
                    >
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input 
                                            type='email'
                                            placeholder='Enter your email....'
                                            className="text-black rounded-[8px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="bg-black text-white hover:text-black w-full rounded-full">Send Reset Code</Button>  
                    </form>
                </Form>
            </CardContent>
        </Card>
        </div>
    )
}

export default ForgotPasswordForm
