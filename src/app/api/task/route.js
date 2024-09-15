import { NextResponse } from 'next/server';
import { getUser } from '@/app/dashboard/actions';
import { getTasks } from '@/lib/tasks.action';

export async function GET() {
    const user = await getUser();
    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const tasks = await getTasks(user.id);
    return NextResponse.json(tasks);
}