import { DivisionJsonData } from '@/common/type/jsonDataInterface';
import { CheonganType, JijiType, OhaengType, SipsinType } from '@/common/type/basicType';
import { BirthColumnGroup, BirthColumnItem } from '@/common/type/baseInterface';
import { OhaengStrengthData, OhaengTempData } from '@/common/type/ohaengDataInterface';
import { DaeunData, SeunData, YearListData } from '@/common/type/luckyDataInterface';

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
    compatibleSaju: string[];
}

export interface BirthAllData {
    chartCol: BirthColumnGroup<BirthColumnData>;
    point: BirthPointData;
    ohaengStrength: OhaengStrengthData;
    ohaengTemp: OhaengTempData;
    needOhaeng: OhaengType[];
    yearOhaeng: YearListData[];
    sinsal: BirthColumnGroup<BirthColumnItem<string[], string[]>>;
    daeun: DaeunData[];
    seun: SeunData[][];
}
