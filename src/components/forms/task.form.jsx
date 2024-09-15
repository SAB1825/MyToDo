"use client"
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Textarea } from '@/components/ui/textarea'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { X } from 'lucide-react' // Add this import for the close icon
import { createTask } from '@/lib/tasks.action'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from 'react' // Add this import

export const FormSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long"),
    description: z.string().optional(),
    scheduledTime: z.date(),
    priority: z.enum(["low", "medium", "high"]).default("medium"), // Add this line
})

const AddTaskForm = ({ onClose }) => { 
    const [isPriorityOpen, setIsPriorityOpen] = useState(false)
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: '',
            description: '',
            scheduledTime: new Date(),
            priority: 'medium', 
        }
    })
    
    async function onSubmit(values) {
        console.log(values)
        const result = await createTask(values);
        console.log(result);
        if (result.success) {
            toast.success("Task created successfully!");
            onClose();
        } else {
        toast.error(result.error || "Failed to create task");
        }
    }

    return (
        <Card className="min-w-[500px] shadow-xl bg-white relative"> 
            <Button
                onClick={onClose} 
                className="absolute top-2 right-2 p-2" 
                variant="ghost"
            >
                <X className="h-4 w-4" />
            </Button>
            <CardHeader className='justify-center'>
                <CardTitle>Create Your Task!</CardTitle>
                <CardDescription>Plan and schedule your tasks efficiently!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <Form {...form}>
                    <form 
                        onSubmit={form.handleSubmit(onSubmit)} 
                        className='space-y-4'
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input 
                                            placeholder="Enter task title..."
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
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description (Emojis allowed 😊)</FormLabel>
                                    <FormControl>
                                        <Textarea 
                                            placeholder="Enter task description..."
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
                            name="scheduledTime"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Scheduled Time</FormLabel>
                                    <FormControl>
                                        <Controller
                                            name="scheduledTime"
                                            control={form.control}
                                            render={({ field }) => (
                                                <DatePicker
                                                    selected={field.value}
                                                    onChange={(date) => field.onChange(date)}
                                                    showTimeSelect
                                                    timeFormat="HH:mm"
                                                    timeIntervals={15}
                                                    dateFormat="MMMM d, yyyy h:mm aa"
                                                    className="w-full p-2 border rounded-[8px] text-black"
                                                />
                                            )}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="priority"
                            render={({ field }) => (
                                <FormItem className="relative">
                                    <FormLabel>Priority</FormLabel>
                                    <Select 
                                        onValueChange={field.onChange} 
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="w-full p-2 border rounded-[8px] bg-white text-black">
                                                <SelectValue placeholder="Select priority" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="absolute bottom-full mb-1 bg-white">
                                            <SelectItem value="low" >Low</SelectItem>
                                            <SelectItem value="medium">Medium</SelectItem>
                                            <SelectItem value="high">High</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="bg-black text-white hover:text-black w-full rounded-full mt-4"> {/* Add mt-4 */}
                            Create Task
                        </Button>  
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default AddTaskForm