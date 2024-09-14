import TabSwitcher from '@/components/tabSwitcher';
import React from 'react'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm';
import { getUser } from '../dashboard/actions';
import { redirect } from 'next/navigation';
import GoogleButton from '@/components/GoogleButton';
const Auth = async() => {
  const user = await getUser();
  if(user){
    return redirect('/dashboard')
  }
  return (
    <div className='relative flex w-full h-screen bg-white'>
        <div className='max-w-3xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-black'>
            <GoogleButton />
            <TabSwitcher SignInTab = {<SignInForm />} SignUpTab={<SignUpForm />}/>
        </div>
    </div>
  )
}
export default Auth;
