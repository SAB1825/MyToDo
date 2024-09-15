"use client"
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { getCompletedTask, markAsNotCompleted, TaskDelete } from '@/lib/tasks.action';
import { format, formatDistanceToNow } from 'date-fns';
import React, { useEffect, useState } from 'react'
import { MdDelete } from 'react-icons/md';
import { toast } from 'sonner';

const CompletedPage = () => {
  const [tasks, setTasks] = useState([]);
  const fetchTask = async () => {
    const res = await getCompletedTask();
    const taskArray = Object.values(res.data)
    setTasks(taskArray)
    console.log(res)
  }
  useEffect(() => {
    fetchTask()
  }, [])

  const handleTaskCompletion = async (taskId) => {
    const res = await markAsNotCompleted(taskId);
    if(res.success){
      toast.success("Task marked as Not completed")
      const taskArray = Object.values(res.data);
      setTasks(taskArray);
      fetchTask();
    }else{
      toast.error(res.error)
    }
    
  }
  const handleDelete = async (taskId) => {
    const res = await TaskDelete(taskId);
    if(res.success){
        toast.success("task deleted ");
        fetchTask();
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
      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">No Completed Task found!</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task, index) => (
            <Card 
              key={task.id} 
              className={`${lightColors[index % lightColors.length]} relative transition-transform transform hover:scale-105`}
            >
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
                  {task.scheduledTime ? format(new Date(task.scheduledTime), "dd/MM/yyyy, HH:mm:ss") : 'No scheduled time'}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                                Created {formatDistanceToNow(new Date(task.createdAt))} ago
                            </p>
              </CardContent>
              <MdDelete 
                className="absolute bottom-2 right-2 text-red-500 hover:text-red-700 cursor-pointer text-xl"
                onClick={() => { handleDelete(task.id) }}
              />
            </Card>
          ))}
        </div>
      )}
    </>
  )
}

export default CompletedPage;
