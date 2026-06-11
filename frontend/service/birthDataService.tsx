/** Custom */
import fetchConfig from '@/util/fetchConfig';

/** Type & Interface */
import { RegionJsonData } from '@/type/jsonDataInterface';
import { BirthAllData } from '@/type/birthDataInterface';

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
