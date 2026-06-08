import { createAllBirthData } from '@/server/service/birthDataServerService';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const result = createAllBirthData(body);

        return Response.json(result);
    } catch (err: any) {
        return Response.json({ error: err.message }, { status: 500 });
    }
}
