import {
    checkOhaengStrength,
    checkOhaengTemp,
    checkNeedOhaeng,
} from '@/server/service/ohaengDataServerService';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const ohaengStrength = checkOhaengStrength(body.data, body.adjustScore);
        const ohaengTemp = checkOhaengTemp(body.data);
        const needOhaeng = checkNeedOhaeng(ohaengStrength, ohaengTemp);

        const result = { ohaengStrength, ohaengTemp, needOhaeng };

        return Response.json(result);
    } catch (err: any) {
        return Response.json({ error: err.message }, { status: 500 });
    }
}
