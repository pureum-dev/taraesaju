/** Custom */
import fetchConfig from '@/common/util/fetchConfig';

/** Type & Interface */
import { RegionJsonData } from '@/common/type/jsonDataInterface';
import { BirthAllData } from '@/common/type/birthDataInterface';

export interface birthDataInterface {
    nickName: string;
    gender: 'M' | 'F';
    calendarType: 'solar' | 'lunar' | 'leap';
    birthday: string;
    birthtime: string | null;
    isNone: boolean;
    isDivideTime: boolean;
    birthLocation: string;
    location: RegionJsonData;
}

export const birthDataService = {
    getBirthData: (req: birthDataInterface) =>
        fetchConfig<BirthAllData>({
            url: '/api/info',
            method: 'POST',
            body: req,
        }),
};
