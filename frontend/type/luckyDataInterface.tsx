import { CheonganType, JijiType, SipsinType } from './basicType';

export interface DaeunData {
    daeunNum: number;
    flowStr: '순행' | '역행';
    gan: CheonganType;
    jiji: JijiType;
    ganSipsin: SipsinType;
    jijiSipsin: SipsinType;
    woonsung: string;
    sinsal: string;
}

export interface SeunData {
    daeunNum: number;
    yearNum: number;
    gan: CheonganType;
    jiji: JijiType;
    ganSipsin: SipsinType;
    jijiSipsin: SipsinType;
    woonsung: string;
    sinsal: string;
}

export interface YearListData {
    year: number;
    daeunIdx: number;
    daeunGan: CheonganType;
    daeunJiji: JijiType;
    seunGan: CheonganType;
    seunJiji: JijiType;
}
