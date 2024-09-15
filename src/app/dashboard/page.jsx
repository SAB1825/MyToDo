import React from 'react'
import { getUser } from './actions'
import TaskList from '@/components/TaskList';
import { redirect } from 'next/navigation';

const Page = async () => {
    const user = await getUser();
    if (!user) {
        redirect('/auth');
    }

    return (
        <div className="min-h-screen flex flex-col p-8">
            <div className="bg-transparent p-8   w-full overflow-x-auto">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Tasks</h2>
                <TaskList />
            </div>
        </div>
    )
}

export default Page