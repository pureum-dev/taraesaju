import fetchConfig from '@/util/fetchConfig';
import { regionInterface } from '@/service/regionService';

export interface birthDataInterface {
    nickName: string;
    gender: 'M' | 'F';
    calendarType: 'solar' | 'lunar' | 'leap';
    birthday: string;
    birthtime: string;
    isNone: boolean;
    isDivideTime: boolean;
    birthLocation: string;
    location: regionInterface;
}

export const regionService = {
    getUserAttendanceApplication: (keyword: string) =>
        fetchConfig<regionInterface[]>({
            url: '/api/region',
            method: 'POST',
            body: { keyword: keyword },
        }),
};
