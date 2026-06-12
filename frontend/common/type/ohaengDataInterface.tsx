import { OhaengType, SipsinGroupType, SipsinType, SeasonType } from '@/common/type/basicType';

export interface SipsinStrengthData {
    name: SipsinType;
    count: number;
    percent: number;
}

export interface OhaengStrengthEachData {
    element: OhaengType;
    score: number;
    percent: number;
    standard: string;
    sipsinGroup?: SipsinGroupType;
    sipsinDataList: SipsinStrengthData[];
}

export interface OhaengStrengthData {
    isBalanced: boolean;
    strengthType: string;
    ohaeng: OhaengStrengthEachData[];
}

export interface OhaengTempData {
    name: string;
    temp: number;
    humidity: number;
    season: SeasonType;
    timeName: string;
}
