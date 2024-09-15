'use client'

import React, { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { format, formatDistanceToNow } from 'date-fns'; // Import formatDistanceToNow
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { CompletedTask, getTasks, PriorityTask, TaskDelete } from '@/lib/tasks.action'
import { Search } from "lucide-react"
import PriorityTab from "@/components/priorityTab"
import { RefreshCw } from 'lucide-react' // Import the refresh icon
import { Button } from "@/components/ui/button" // Import the Button component
import { MdDelete } from "react-icons/md";
const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('all');
    const [isLoading, setIsLoading] = useState(false); // New state for loading indicator

    const fetchTask = async (query = '', priority = 'all') => {
        setIsLoading(true); // Start loading
        const res = await getTasks(query, priority);
        if (res.success) {
            const taskArray = Object.values(res.data);
            setTasks(taskArray);
        } else {
            toast.error(res.error);
        }
        setIsLoading(false); // End loading
    };

    useEffect(() => {
        fetchTask(searchQuery, priorityFilter);
    }, [searchQuery, priorityFilter]);

    const handleRefresh = () => {
        fetchTask(searchQuery, priorityFilter);
    };

    const handlePriorityChange = async (priority) => {
        setPriorityFilter(priority);
    };

    const handleTaskCompletion = async (taskId) => {
        const res = await CompletedTask(taskId);
        if(res.success){
            setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
            toast.success("Task marked as completed");
        }else{
            toast.error(res.error)
        }
    };
    const handleDelete = async (taskId) => {
        const res = await TaskDelete(taskId);
        if(res.success){
            toast.success("task deleted ");
            fetchTask(searchQuery, priorityFilter);
        }else{
            toast.error(res.error)
        }
    }


    const lightColors = [
        'bg-red-100', 'bg-blue-100', 'bg-green-100', 'bg-yellow-100', 'bg-purple-100',
        'bg-pink-100', 'bg-indigo-100', 'bg-teal-100', 'bg-orange-100', 'bg-cyan-100'
    ];

    const priorityColors = {
        low: 'bg-green-200 text-green-800',
        medium: 'bg-yellow-200 text-yellow-800',
        high: 'bg-red-200 text-red-800'
    };

    return (
        <>
            <Toaster />
            <div className="flex justify-end items-center mb-4 space-x-4">
                <PriorityTab onPriorityChange={handlePriorityChange} />
                <Button 
                    onClick={handleRefresh} 
                    disabled={isLoading}
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                    {isLoading ? (
                        <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                        <RefreshCw className="h-4 w-4 mr-2" />
                    )}
                    Refresh
                </Button>
            </div>
            <div className="relative w-[200px] mb-4">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-white rounded-[500px] pl-8"
                />
            </div>
            {tasks.length === 0 ? (
                <p className="text-center text-gray-500">Hooray! You completed all task🥇</p>
            ): 
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                
                {tasks.map((task, index) => (
                    <Card key={task.id} className={`${lightColors[index % lightColors.length]} relative`}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <div>
                                <CardTitle className="text-sm font-medium">
                                    {task.title}
                                </CardTitle>
                                <Badge className={`mt-1 ${priorityColors[task.priority]}`}>
                                    {task.priority}
                                </Badge>
                            </div>
                            <Checkbox
                                checked={task.completed}
                                onCheckedChange={() => handleTaskCompletion(task.id)}
                            />
                        </CardHeader>
                        <CardContent>
                            <p className="text-xs text-muted-foreground">{task.description}</p>
                            <p className="text-xs text-muted-foreground mt-2">
                                {format(new Date(task.scheduledTime), "dd/MM/yyyy, HH:mm:ss")}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                                Created {formatDistanceToNow(new Date(task.createdAt))} ago
                            </p>
                        </CardContent>
                        <MdDelete 
                            className="absolute bottom-2 right-2 text-red-500 hover:text-red-700 cursor-pointer text-xl"
                            onClick = { () => {handleDelete(task.id)}}
                        />
                    </Card>
                ))}
            </div>
            }
        </>
    )
}

export default TaskList
