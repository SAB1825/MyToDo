"use client"
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { PasswordReset, resetPasswordOTP } from '../auth.actions'

const newPasswordSchema = z.object({
    password: z.string().min(4),
    confirmPassword: z.string().min(4),
}).refine(data => data.password === data.confirmPassword,{
    message: "Passwords not match",
    path: ['confirmPassword']
})

const ForgotPasswordForm =  () => {
    
    const searchParams = useSearchParams()
    const email = searchParams.get('email')
    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(newPasswordSchema),
        defaultValues: {
            password: '',
            confirmPassword: ''
        }
    })

    async function onSubmit(values) {
        const res = await PasswordReset(values ,email);
        if(res.success){
            toast.success("Password Change successfully")
            
            router.push(`/auth`)
        }else{
            toast.error(res.error);
        }
        
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
        <Card className='w-[500px] top-1/2 left-1/2 shadow-xl'>
            <CardHeader>
                <CardTitle>Password Reset</CardTitle>
                <CardDescription>Enter your new password!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <Form {...form}>
                    <form 
                        onSubmit={form.handleSubmit(onSubmit)} 
                        className='space-y-4'
                    >
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input 
                                            type='password'
                                            placeholder='password'
                                            className="text-black rounded-[8px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input 
                                            type='password'
                                            placeholder='Confirm password'
                                            className="text-black rounded-[8px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="bg-black text-white hover:text-black w-full rounded-full">Change Password</Button>  
                    </form>
                </Form>
            </CardContent>
        </Card>
        </div>
    )
}

export default ForgotPasswordForm
