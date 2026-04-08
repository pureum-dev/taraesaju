export interface DivisionJsonData {
    id: number;
    sol_year: string;
    sol_month: string;
    date_name: string;
    is_holiday: string;
    kst: string;
    locdate: string;
    sun_longitude: number;
    is_beginning: boolean;
}

export interface RegionJsonData {
    alternate_name: string;
    geo_name: string;
    geonameid: number;
    latitude: number;
    longitude: number;
    timezone: string;
}
