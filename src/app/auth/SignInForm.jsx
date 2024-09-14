"use client"
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SignIn } from './auth.actions'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'



export const FormSchema  = z.object({
    email: z.string().email(),
    password: z.string().min(4),
})
const SignInForm =() => {
    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    })
    async function onSubmit(values) {
        const user = await SignIn(values);
        if(user.success){
            toast.success('Login Successfull')

            router.push('/dashboard')
        }else{
            toast.error(user.error);
        }
        
        console.log(values)
    }

    return(
        <Card className = 'min-w-[500px] shadow-xl'>
            <CardHeader>
                <CardTitle>Welcome Back!</CardTitle>
                <CardDescription>Sign in to continue</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <Form {...form}>
                    <form 
                        onSubmit={form.handleSubmit(onSubmit)} 
                        className='space-y-4'
                    >
                        <FormField
                            control = {form.control}
                            name="email"
                            render = {({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input 
                                            type = 'email'
                                            placeholder = 'Enter your email....'
                                            className="text-black rounded-[8px]"

                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control = {form.control}
                            name="password"
                            render = {({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input 
                                            type = 'password'
                                            placeholder = 'Enter your password....'
                                            className = "text-black rounded-[8px]"
                                            {...field}
                                            onChange={
                                                (e) => {
                                                    e.target.value.trim();
                                                    field.onChange(e);
                                                }
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button variant="link" className="text-sm" onClick={() => router.push('/auth/reset-password')} >Forgot Password?</Button>
                        <Button type="submit" className ="bg-black text-white w-full hover:text-black rounded-full">Sign In</Button>  
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
export default SignInForm