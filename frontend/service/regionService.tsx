import fetchConfig from '@/util/fetchConfig';
import { RegionJsonData } from '@/type/jsonDataInterface';

export const regionService = {
    getUserAttendanceApplication: (keyword: string) =>
        fetchConfig<RegionJsonData[]>({
            url: '/api/region',
            method: 'POST',
            body: { keyword: keyword },
        }),
};
