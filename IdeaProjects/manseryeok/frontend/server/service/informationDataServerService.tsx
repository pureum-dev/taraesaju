/** Lib */
import dayjs from 'dayjs';

/** Type & Interface */
import { cheonganType, jijiType, sipsinType } from '@/type/basicType';

/** Custom */
import { cheongan, jiji } from '@/common/const';

export const createInfoData = () => {};

export const checkDuplication = (year: string, month: string, day: string, time: string | null) => {
    const result: {
        year: string;
        month: string;
        day: string;
        time: string;
    } = {
        year: '',
        month: '',
        day: '',
        time: '',
    };

    const stringArr = [year, month, day, time];
    const countMap = new Map<string, number>();
    stringArr.forEach((item) => {
        if (item != null) countMap.set(item, (countMap.get(item) || 0) + 1);
    });

    stringArr.forEach((item, idx) => {
        const dupCount = item != null ? countMap.get(item) : 0;

        if (item && dupCount && dupCount > 1) {
            const text = dupCount === 4 ? '사존' : dupCount === 3 ? '삼존' : '병존';
            const resultText = item.repeat(dupCount) + text;

            if (idx === 0) result.year = resultText;
            if (idx === 1) result.month = resultText;
            if (idx === 2) result.day = resultText;
            if (idx === 3) result.time = resultText;
        }
    });

    return result;
};

export const checkGongmang = (dayGan: cheonganType, dayJiji: jijiType) => {
    const defaultGan = '계'; // number = 9
    const distance = (cheongan[defaultGan].number - cheongan[dayGan].number + 10) % 10;

    const jijiNumber = jiji[dayJiji].number;
    const gongmang1Num = (jijiNumber + distance + 1) % 12;
    const gongmang2Num = (jijiNumber + distance + 2) % 12;

    const jijiKey = Object.keys(jiji);

    return [jijiKey[gongmang1Num], jijiKey[gongmang2Num]];
};

export const checkStrength = (sipsinData: {
    year: { gan: sipsinType; jiji: sipsinType };
    month: { gan: sipsinType; jiji: sipsinType };
    day: { gan: string; jiji: sipsinType };
    time: { gan: sipsinType; jiji: sipsinType } | null;
}) => {
    const powerList = ['비견', '겁재', '정인', '편인'];
    let score = 0;

    if (powerList.includes(sipsinData.year.gan)) score += 10;
    if (powerList.includes(sipsinData.year.jiji)) score += 10;
    if (powerList.includes(sipsinData.month.gan)) score += 10;
    if (powerList.includes(sipsinData.month.jiji)) score += 30;
    if (powerList.includes(sipsinData.day.jiji)) score += 15;
    if (sipsinData.time && powerList.includes(sipsinData.time.gan)) score += 10;
    if (sipsinData.time && powerList.includes(sipsinData.time.jiji)) score += 15;

    let strengthType = '';
    if (score >= 75) {
        strengthType = '태강';
    } else if (score >= 50) {
        strengthType = '신강';
    } else if (score >= 25) {
        strengthType = '신약';
    } else {
        strengthType = '태약';
    }

    return {
        score: score,
        strengthType: strengthType,
    };
};

export const checkSamJaeList = (yearJiji: jijiType) => {
    const samjaeList: jijiType[] = jiji[yearJiji].samjae;

    const standardYear = 1900;
    const standartJiji = '자'; // 0
    const limit = dayjs().subtract(2, 'years').year();

    const targetNum = jiji[samjaeList[0] as jijiType].number;
    const duration = (12 - (jiji[standartJiji].number - targetNum)) % 12;
    let targetYear = 0;

    for (let idx = (limit - standardYear) / 12; idx < idx * 10; idx++) {
        const aa = standardYear + duration + 12 * idx;
        if (aa >= limit) {
            targetYear = aa;
            break;
        }
    }

    return [targetYear, targetYear + 1, targetYear + 2];
};
