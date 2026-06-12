import fetchConfig from '@/common/util/fetchConfig';
import { RegionJsonData } from '@/common/type/jsonDataInterface';

export const regionService = {
    getUserAttendanceApplication: (keyword: string) =>
        fetchConfig<RegionJsonData[]>({
            url: '/api/region',
            method: 'POST',
            body: { keyword: keyword },
        }),
};
