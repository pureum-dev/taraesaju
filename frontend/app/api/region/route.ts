/** Data */
import region from '@/server/data/region.json';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const keyword = body.keyword?.toLowerCase().trim();

        if (!keyword) {
            return Response.json([]);
        }

        const result = region.filter((item: any, idx: number) => {
            return (
                item.geo_name?.toLowerCase().includes(keyword) ||
                item.alternate_name?.toLowerCase().includes(keyword)
            );
        });

        return Response.json(result);
    } catch (err: any) {
        return Response.json({ error: err.message }, { status: 500 });
    }
}
