import React from 'react'
import { getUser } from './actions'
import Image from 'next/image';
import LogOutButton from '@/components/LogOutButton';
import { redirect } from 'next/navigation';

const page = async () => {
    const user = await getUser();
    if(!user){
        return redirect('/auth')
    }
  return (
    <div className="min-h-screen  flex items-center justify-center">
            <div className=" bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                {user.picture && (
                    <Image src={user.picture} alt={`${user.name}'s profile picture`} width={64} height={64} className="rounded-full" />
                )}
                <h1 className="text-3xl font-bold mb-4 text-gray-800">Welcome {user.name}</h1>
                <h3 className="text-lg text-gray-600 mb-4">Your email is {user.email}</h3>
                <LogOutButton>Sign Out</LogOutButton>
            </div>
        </div>
  )
}

export default page
