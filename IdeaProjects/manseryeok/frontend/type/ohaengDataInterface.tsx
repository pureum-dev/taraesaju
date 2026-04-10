import { OhaengType, SipsinType } from '@/type/basicType';

export interface SipsinStrengthData {
    name: SipsinType;
    count: number;
    percent: number;
}

export interface OhaengStrengthData {
    element: OhaengType;
    score: number;
    percent: number;
    standard: string;
    isBalanced: boolean;
    sipsinDataList: SipsinStrengthData[];
}
