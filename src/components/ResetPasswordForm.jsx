"use client"
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { resetPassword } from './auth.actions'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

const FormSchema = z.object({
  password: z.string().min(4),
  confirmPassword: z.string().min(4),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ['confirmPassword']
})

const ResetPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    }
  })

  async function onSubmit(values) {
    if (!token) {
      toast.error("Invalid reset token");
      return;
    }
    const response = await resetPassword(token, values.password);
    if (response.success) {
      toast.success("Password reset successfully!");
      router.push('/auth/signin');
    } else {
      toast.error(response.error);
    }
  }

  return (
    <Card className='min-w-[500px] shadow-xl'>
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>Enter your new password</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input 
                      type='password'
                      placeholder='Enter new password....'
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
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <Input 
                      type='password'
                      placeholder='Confirm new password....'
                      className="text-black rounded-[8px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="bg-black text-white w-full hover:text-black rounded-full">
              Reset Password
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default ResetPasswordForm