import { NextResponse } from 'next/server';

export async function POST({ keyword }: { keyword: string }) {
    try {
        if (!keyword) {
            return Response.json([]);
        }

        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            keyword
        )}&format=json&addressdetails=1&limit=10`;

        const res = await fetch(url, {
            headers: {
                'User-Agent': 'tarea',
            },
        });

        const data = await res.json();

        return Response.json(
            data.map((item: any) => ({
                name: item.display_name,
                lat: item.lat,
                lon: item.lon,
            }))
        );
    } catch (err: any) {
        return Response.json({ error: err.message }, { status: 500 });
    }
}
