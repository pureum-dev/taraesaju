import { DivisionJsonData } from '@/type/jsonDataInterface';
import { CheonganType, JijiType, OhaengType, SipsinType } from '@/type/basicType';
import { BirthColumnGroup, BirthColumnItem } from '@/type/baseInterface';
import { OhaengStrengthData, OhaengTempData } from '@/type/ohaengDataInterface';
import { DaeunData, SeunData, YearListData } from '@/type/luckyDataInterface';

export interface CorrectBirthDay {
    date: string;
    time: string | null;
    deltaMinutes: number;
    summertimeMinutes: number;
    isCalculateDate: boolean;
}

export interface CorrectTargetDivision {
    targetYear: number;
    targetDivision: DivisionJsonData[];
}

export interface Relation {
    name: string;
    isClose: boolean;
    columnName: string;
}

export interface BirthColumnData {
    gan: CheonganType;
    jiji: JijiType;
    ganRelation: Relation[];
    jijiRelation: Relation[];
    ganSipsin: SipsinType | null;
    jijiSipsin: SipsinType | null;
    ganDuplication: string | null;
    jijiDuplication: string | null;
    woonsung: string | null;
    sinsal: string | null;
}

export interface BirthPointData {
    gongmang: JijiType[];
    samjae: number[];
    deukryung: boolean;
    deukji: boolean;
}

export interface BirthAllData {
    chartCol: BirthColumnGroup<BirthColumnData>;
    point: BirthPointData;
    ohaengStrength: { isBalanced: boolean; strengthType: string; ohaeng: OhaengStrengthData[] };
    ohaengTemp: OhaengTempData;
    yearOhaeng: YearListData[];
    sinsal: BirthColumnGroup<BirthColumnItem<string[], string[]>>;
    daeun: DaeunData[];
    seun: SeunData[][];
}
