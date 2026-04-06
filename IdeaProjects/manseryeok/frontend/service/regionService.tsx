import fetchConfig from '@/util/fetchConfig';
import { regionInterface } from '@/type/jsonDataInterface';

export const regionService = {
    getUserAttendanceApplication: (keyword: string) =>
        fetchConfig<regionInterface[]>({
            url: '/api/region',
            method: 'POST',
            body: { keyword: keyword },
        }),
};
