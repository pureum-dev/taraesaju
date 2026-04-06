import { regionInterface, divisionInterface } from '@/type/jsonDataInterface';
import { cheonganType, jijiType, sipsinType } from '@/type/basicType';

export interface correctBirthDayInterface {
    date: string;
    time: string | null;
    deltaMinutes: number;
    summertimeMinutes: number;
    isCalculateDate: boolean;
}

export interface correctTargetDivisionInterface {
    targetYear: number;
    targetDivision: divisionInterface[];
}

export interface relationInterface {
    name: string;
    isClose: boolean;
    columnName: string;
}

export interface relationDataInterface {
    ganRelation: relationInterface[];
    jijiRelation: relationInterface[];
}

export interface birthColumnInterface {
    gan: cheonganType;
    jiji: jijiType;
}

export interface birthColumnDataInterface extends birthColumnInterface, relationDataInterface {
    ganSipsin: sipsinType | null;
    jijiSipsin: sipsinType | null;
    ganDuplication: string | null;
    jijiDuplication: string | null;
    woonsung: string | null;
    sinsal: string | null;
}

export interface birthChartColInterface {
    year: birthColumnDataInterface;
    month: birthColumnDataInterface;
    day: birthColumnDataInterface;
    time: birthColumnDataInterface | null;
}

export interface birthAllDataInterface {
    chartCol: birthChartColInterface;
}
