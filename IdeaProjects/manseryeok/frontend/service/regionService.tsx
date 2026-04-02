import fetchConfig from '@/util/fetchConfig';

export interface regionInterface {
    alternate_name: string;
    geo_name: string;
    geonameid: number;
    latitude: number;
    longitude: number;
    timezone: string;
}

export const regionService = {
    getUserAttendanceApplication: (keyword: string) =>
        fetchConfig<regionInterface[]>({
            url: '/api/region',
            method: 'POST',
            body: { keyword: keyword },
        }),
};
