import fetchConfig from '@/util/fetchConfig';
import { RegionJsonData } from '@/type/jsonDataInterface';

export interface birthDataInterface {
    nickName: string;
    gender: 'M' | 'F';
    calendarType: 'solar' | 'lunar' | 'leap';
    birthday: string | null;
    birthtime: string | null;
    isNone: boolean;
    isDivideTime: boolean;
    birthLocation: string;
    location: RegionJsonData;
}

export const regionService = {
    getUserAttendanceApplication: (keyword: string) =>
        fetchConfig<RegionJsonData[]>({
            url: '/api/region',
            method: 'POST',
            body: { keyword: keyword },
        }),
};
