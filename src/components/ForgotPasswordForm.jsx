"use client"
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { requestPasswordReset } from '@/app/auth/auth.actions'

const FormSchema = z.object({
  email: z.string().email(),
})

const ForgotPasswordForm = () => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
    }
  })

  async function onSubmit(values) {
    const response = await requestPasswordReset(values.email);
    if (response.success) {
      toast.success("Password reset link sent to your email!");
    } else {
      toast.error(response.error);
    }
  }

  return (
    <Card className='min-w-[500px] shadow-xl'>
      <CardHeader>
        <CardTitle>Forgot Password</CardTitle>
        <CardDescription>Enter your email to receive a password reset link</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
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
                </FormItem>
              )}
            />
            <Button type="submit" className="bg-black text-white w-full hover:text-black rounded-full">
              Send Reset Link
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default ForgotPasswordForm