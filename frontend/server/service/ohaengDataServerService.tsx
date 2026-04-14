/** Custom */
import { cheongan } from '@/common/const/cheonganConst';
import { jiji } from '@/common/const/jijiConst';
import { findSipsinList } from '@/server/service/sipsinDataServerService';

/** Type & Interface */
import { OhaengType, SipsinType } from '@/type/basicType';
import { BirthColumnData } from '@/type/birthDataInterface';
import { BirthColumnGroup } from '@/type/baseInterface';
import { OhaengStrengthData } from '@/type/ohaengDataInterface';

export const checkOhaengStrength = (
    data: BirthColumnGroup<BirthColumnData>,
    adjustScore: boolean,
): { isBalanced: boolean; ohaeng: OhaengStrengthData[] } => {
    const allScore = adjustScore ? 32 : 8;
    const ohaengList: OhaengType[] = ['목', '화', '토', '금', '수'];

    const ohaengCountMap = new Map<OhaengType, number>();
    const sipsinCountMap = new Map<SipsinType, number>();

    Object.entries(data).forEach(([key, value]) => {
        if (value) {
            const valueData = value as BirthColumnData;
            const ganData = cheongan[valueData.gan].element;
            const jijiData = jiji[valueData.jiji].element;

            const ganSipsin = valueData.ganSipsin as SipsinType;
            const jijiSipsin = valueData.jijiSipsin as SipsinType;

            const ganScore = adjustScore ? checkScore(key, 'gan') : 1;
            const jijiScore = adjustScore ? checkScore(key, 'jiji') : 1;

            ohaengCountMap.set(ganData, (ohaengCountMap.get(ganData) ?? 0) + ganScore);
            ohaengCountMap.set(jijiData, (ohaengCountMap.get(jijiData) ?? 0) + jijiScore);
            sipsinCountMap.set(ganSipsin, (sipsinCountMap.get(ganSipsin) ?? 0) + ganScore);
            sipsinCountMap.set(jijiSipsin, (sipsinCountMap.get(jijiSipsin) ?? 0) + jijiScore);
        }
    });

    let isBalanced = true;
    const scoreList: OhaengStrengthData[] = ohaengList.map((item) => {
        const score = ohaengCountMap.get(item) ?? 0;
        const percent = score == 0 ? 0 : Math.round((score / allScore) * 10000) / 100;

        if (isBalanced && percent != 0 && (percent < 12.5 || percent > 25)) {
            isBalanced = false;
        }

        let standard = '';
        if (percent >= 37.5) {
            standard = '과다';
        } else if (percent >= 25.0) {
            standard = '적정';
        } else if (percent >= 12.5) {
            standard = '미약';
        } else {
            standard = '결핍';
        }

        const sipsinList: SipsinType[] = findSipsinList(cheongan[data.day.gan].element, item);
        const sipsinDataList = sipsinList?.map((sipsinItem) => {
            const sipsincount = sipsinCountMap.get(sipsinItem) ?? 0;
            const sipsinPercent =
                sipsincount == 0 ? 0 : Math.round((sipsincount / allScore) * 10000) / 100;

            return { name: sipsinItem, count: sipsincount, percent: sipsinPercent };
        });

        return {
            element: item,
            score: score,
            percent: percent,
            standard: standard,
            sipsinDataList: sipsinDataList,
        };
    });

    return {
        isBalanced: isBalanced,
        ohaeng: scoreList,
    };
};

export const checkScore = (key: string, type: 'gan' | 'jiji'): number => {
    switch (key) {
        case 'year':
            return 3;
        case 'month':
            return type === 'gan' ? 4 : 8;
        case 'day':
            return 4;
        case 'time':
            return 3;
        default:
            return 0;
    }
};
