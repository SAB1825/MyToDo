import { NextResponse } from 'next/server';
import { completeTask } from '@/app/dashboard/actions';

export async function POST(request) {
    const { taskId, undo } = await request.json();
    try {
        const result = await completeTask(taskId, undo);
        return NextResponse.json(result);
    } catch (error) {
        console.error("Error updating task:", error);
        return NextResponse.json({ error: error.message || "Failed to update task" }, { status: 500 });
    }
}