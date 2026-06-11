/** Lib */
import dayjs from 'dayjs';

/** Custom */
import { cheongan, cheonganRelation } from '@/common/const/cheonganConst';
import { jiji, jijiRelation } from '@/common/const/jijiConst';
import { ohaeng } from '@/common/const/ohaengConst';

/** Type & Interface */
import { CheonganType, JijiType, SipsinType } from '@/type/basicType';
import { BirthColumnGroup } from '@/type/baseInterface';
import { BirthColumnData, BirthPointData } from '@/type/birthDataInterface';

export const createInfoData = (data: BirthColumnGroup<BirthColumnData>): BirthPointData => {
    return {
        gongmang: checkGongmang(data.day.gan, data.day.jiji),
        samjae: checkSamJaeList(data.year.jiji),
        deukryung: isDeuk(data.month.jijiSipsin as SipsinType),
        deukji: isDeuk(data.day.jijiSipsin as SipsinType),
        compatibleSaju: checkCompatibleSaju(data),
    };
};

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

export const checkGongmang = (dayGan: CheonganType, dayJiji: JijiType): JijiType[] => {
    const defaultGan = '계'; // number = 9
    const distance = (cheongan[defaultGan].number - cheongan[dayGan].number + 10) % 10;

    const jijiNumber = jiji[dayJiji].number;
    const gongmang1Num = (jijiNumber + distance + 1) % 12;
    const gongmang2Num = (jijiNumber + distance + 2) % 12;

    const jijiKey: string[] = Object.keys(jiji);

    return [jijiKey[gongmang1Num] as JijiType, jijiKey[gongmang2Num] as JijiType];
};

export const checkStrength = (
    data: BirthColumnGroup<BirthColumnData>,
    adjustScore: boolean,
): string => {
    const allScore = adjustScore ? (data.time ? 100 : 70) : data.time ? 75 : 50;
    let score = 0;
    const powerList = ['비견', '겁재', '정인', '편인'];

    if (powerList.includes(data.year.ganSipsin as SipsinType)) score += 10;
    if (powerList.includes(data.year.jijiSipsin as SipsinType)) score += 10;
    if (powerList.includes(data.month.ganSipsin as SipsinType)) score += 10;
    if (powerList.includes(data.day.jijiSipsin as SipsinType)) score += adjustScore ? 15 : 10;
    if (data.time && powerList.includes(data.time.ganSipsin as SipsinType)) score += 10;
    if (data.time && powerList.includes(data.time.jijiSipsin as SipsinType))
        score += adjustScore ? 15 : 10;

    //월지 조후 구분
    if (adjustScore) {
        const seasonAdjustment = jiji[data.month.jiji].seasonAdjustment;
        if (seasonAdjustment) {
            const ilgan = cheongan[data.day.gan].element;
            seasonAdjustment.forEach((item) => {
                if (item.element === ilgan || item.element === ohaeng[ilgan].resource) {
                    score += 30 * item.percent;
                }
            });
        } else {
            if (powerList.includes(data.month.jijiSipsin as SipsinType)) score += 30;
        }
    } else {
        if (powerList.includes(data.month.jijiSipsin as SipsinType)) score += 10;
    }

    const percent = (score / allScore) * 100;
    let strengthType = '';
    if (percent >= 75) {
        strengthType = '태강';
    } else if (percent >= 50) {
        strengthType = '신강';
    } else if (percent >= 25) {
        strengthType = '신약';
    } else {
        strengthType = '태약';
    }

    return strengthType;
};

export const checkCompatibleSaju = (data: BirthColumnGroup<BirthColumnData>) => {
    const dayGan = cheongan[data.day.gan];

    const targetGan = cheonganRelation[data.day.gan].hap;
    const targetGanData = cheongan[targetGan];
    const targetGanResource = ohaeng[dayGan.element].resource;
    const targetYukhap = jijiRelation[data.day.jiji].yukhap;

    return Object.entries(jiji)
        .filter(([key, value]) => {
            const isYukhap = key === targetYukhap;

            const isCompatibleElement =
                value.element === dayGan.element || value.element === targetGanResource;

            const isSameEumyang = value.eumyang === targetGanData.eumyang;

            return isYukhap || (isSameEumyang && isCompatibleElement);
        })
        .map(([key]) => `${targetGan}${key}`);
};

/** 삼재 */
export const checkSamJaeList = (yearJiji: JijiType): number[] => {
    const samjaeList: JijiType[] = jiji[yearJiji].samjae;

    const standardYear = 1900;
    const standartJiji = '자'; // 0
    const limit = dayjs().subtract(2, 'years').year();

    const targetNum = jiji[samjaeList[0]].number;
    const duration = (12 - (jiji[standartJiji].number - targetNum)) % 12;
    let targetYear = 0;

    for (let idx = Math.floor((limit - standardYear) / 12); idx < idx * 10; idx++) {
        const aa = standardYear + duration + 12 * idx;
        if (aa >= limit) {
            targetYear = aa;
            break;
        }
    }

    return [targetYear, targetYear + 1, targetYear + 2];
};

/**
 * 득령 계산
 */
export const isDeuk = (targetSipsin: SipsinType): boolean => {
    switch (targetSipsin) {
        case '비견':
        case '겁재':
        case '정인':
        case '편인':
            return true;
        default:
            return false;
    }
};
