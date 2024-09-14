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
				userId: user.id,
			},
		});
		if (!task) {
			throw new Error("Error in creating task");
		}

		return { success: true, data: task };
	} catch (error) {
		console.error('Failed to create task:', error);
		return { success: false, error: error.message };
	}
};

export const getTasks = async () => {
    try {
        const sessionId = cookies().get(lucia.sessionCookieName)?.value;
        if (!sessionId) {
            throw new Error("Login please!");
        }
        const { user } = await lucia.validateSession(sessionId);
        if (!user) {
            throw new Error("Invalid Session");
        }
        const tasks = await prisma.task.findMany({
            where: {
                userId: user.id
            },
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