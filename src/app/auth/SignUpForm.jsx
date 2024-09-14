"use client"
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SignUp } from './auth.actions'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'


export const FormSchema  = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(4),
    confirmPassword: z.string().min(4),
}).refine(data => data.password === data.confirmPassword,{
    message: "Passwords not match",
    path: ['confirmPassword']
})
const SignUpForm =() => {
    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        }
    })
    async function onSubmit(values) {
            const response = await SignUp(values);
            console.log(response);
            if (response.success) {
                toast.success("Created Successfully!")
                // Encode the email to handle special characters in URLs
                const encodedEmail = encodeURIComponent(values.email);
                router.push(`/auth/verify-email?email=${encodedEmail}`)
            } else {
                toast.error(response.error)
            }
        
    }

    return(
        <Card className = 'min-w-[500px] shadow-xl'>
            <CardHeader>
                <CardTitle>Register your account !</CardTitle>
                <CardDescription>To continue please register</CardDescription>
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
                            name="name"
                            render = {({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input 
                                            type = 'name'
                                            placeholder = 'Enter your name....'
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
                        <FormField
                            control = {form.control}
                            name="confirmPassword"
                            render = {({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input 
                                            type = 'password'
                                            placeholder = 'Confirm password....'
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
                        <Button type="submit" className ="bg-black text-white hover:text-black w-full rounded-full">Sign Up</Button>  
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
export default SignUpForm