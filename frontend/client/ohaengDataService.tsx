/** Custom */
import fetchConfig from '@/common/util/fetchConfig';

/** Type & Interface */
import { BirthColumnGroup } from '@/common/type/baseInterface';
import { BirthColumnData } from '@/common/type/birthDataInterface';
import { OhaengType } from '@/common/type/basicType';
import { OhaengStrengthData, OhaengTempData } from '@/common/type/ohaengDataInterface';

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
