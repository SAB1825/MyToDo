"use server"
import { PrismaClient } from '@prisma/client';
import { lucia } from '@/lib/lucia';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

export const createTask = async (values) => {
	try {
		const sessionId = cookies().get(lucia.sessionCookieName)?.value;
		if (!sessionId) {
			throw new Error('You must be logged in to create a task');
		}

		const { user } = await lucia.validateSession(sessionId);
		if (!user) {
			throw new Error('Invalid session');
		}
        
		const task = await prisma.task.create({
			data: {
				title: values.title,
				description: values.description || '',
				scheduledTime: values.scheduledTime,
				priority: values.priority,
				userId: user.id,
			},
		});
		if (!task) {
			throw new Error("Error in creating task");
		}
		const tasks = await prisma.task.findMany({
			where: {
				completed: false
			}
		})
		return { success: true, data: tasks};
	} catch (error) {
		console.error('Failed to create task:', error);
		return { success: false, error: error.message };
	}
};

export const getTasks = async (searchQuery = '', priority = 'all', startDate, endDate) => {
	try {
		const sessionId = cookies().get(lucia.sessionCookieName)?.value;
		if (!sessionId) {
			throw new Error("Login please!");
		}
		const { user } = await lucia.validateSession(sessionId);
		if (!user) {
			throw new Error("Invalid Session");
		}
		const whereClause = {
			userId: user.id,
			completed: false,
			OR: [
				{ title: { contains: searchQuery, mode: 'insensitive' } },
				{ description: { contains: searchQuery, mode: 'insensitive' } },
			],
			scheduledTime: {
				gte: startDate,
				lte: endDate
			}
		};

		if (priority !== 'all') {
			whereClause.priority = priority;
		}
		
		const tasks = await prisma.task.findMany({
			where: whereClause,
			orderBy: {
				scheduledTime: 'asc'
			}
		});
		return { success: true, data: tasks };
	} catch (error) {
		console.error('Failed to get tasks:', error);
		return { success: false, error: error.message };
	}
}

export const CompletedTask = async (taskId) => {
	const task = await prisma.task.findUnique({
		where: {
			id: taskId
		}
	})
	if(!task){
		return {error: "No task Found"}
	}
	await prisma.task.update({
		where: {
			id: task.id
		},data: {
			completed: true
		}
	})
	return {success: true}
}

export const PriorityTask = async (priority) => {
	const sessionId = cookies().get(lucia.sessionCookieName)?.value;
	if (!sessionId) {
		throw new Error('You must be logged in to create a task');
	}
	
	const {user} = await lucia.validateSession(sessionId);
	if(priority === 'all'){
		const tasks = await prisma.task.findMany({
			where: {
				completed:false,
			}
	
		})
		return {success:true, data: tasks}

	}
	const tasks = await prisma.task.findMany({
		where: {
			completed:false,
			priority: priority,
		}

	})
	if(!tasks){
		return {error: "No task found"};
	}
	return {success:true, data: tasks}

}

export const TaskDelete = async(taskId) => {
	const task = await prisma.task.findUnique({
		where: {
			id: taskId
		}
	})
	if(!task) {
		return {error: "Task Not found!"}
	}
	await prisma.task.delete({
		where: {
			id: task.id
		}
	})
	return {success: true}
}

export const getCompletedTask = async () => {
	const tasks = await prisma.task.findMany({
		where: {
			completed: true
		}
	})
	if(!tasks){
		return {error: "No task found"}
	}
	return {success: true, data: tasks}
}

export const markAsNotCompleted = async (taskId) => {
	const task = await prisma.task.findUnique({
		where: {
			id: taskId
		}
	})
	await prisma.task.update({
		where: {
			id: task.id,
		},
		data: {
			completed: false
		}
	})

	const tasks = await getCompletedTask();
	return {success: true, data: tasks}


}