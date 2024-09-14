import { createTask } from '@/lib/tasks.action';
import { NextResponse } from 'next/server';

export async function POST(request) {
    const data = await request.json();
    const result = await createTask(data);
    return NextResponse.json(result);
}