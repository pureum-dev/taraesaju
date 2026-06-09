/** Custom */
import fetchConfig from '@/util/fetchConfig';

/** Type & Interface */
import { BirthColumnGroup } from '@/type/baseInterface';
import { BirthColumnData } from '@/type/birthDataInterface';
import { OhaengType } from '@/type/basicType';
import { OhaengStrengthData, OhaengTempData } from '@/type/ohaengDataInterface';

export interface OheangChangeInterface {
    ohaengStrength: OhaengStrengthData;
    ohaengTemp: OhaengTempData;
    needOhaeng: OhaengType[];
}

export const oheangDataService = {
    getOheangData: (req: { data: BirthColumnGroup<BirthColumnData>; adjustScore: boolean }) =>
        fetchConfig<OheangChangeInterface>({
            url: '/api/ohaeng',
            method: 'POST',
            body: req,
        }),
};
