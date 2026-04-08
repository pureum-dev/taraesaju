/** Custom */
import { cheongan } from '@/common/const/cheonganConst';
import { jiji } from '@/common/const/jijiConst';
import { checkSipsinData, findSipsinList } from '@/server/service/sipsinDataServerService';

/** Type & Interface */
import { CheonganType, JijiType, OhaengType, SipsinType } from '@/type/basicType';
import { BirthColumnData } from '@/type/birthDataInterface';
import { BirthColumnGroup } from '@/type/baseInterface';
import { OhaengStrengthData } from '@/type/ohaengDataInterface';

export const checkOhaengStrength = (
    data: BirthColumnGroup<BirthColumnData>,
): OhaengStrengthData[] => {
    const allScore = 8; //adjustScore ? 32 : 8;
    const sipsinAllScore = 16; //adjustScore ? 64 : 16;
    const ohaengList: OhaengType[] = ['목', '화', '토', '금', '수'];

    const birthElementList: (CheonganType | JijiType)[] = [
        data.year.gan,
        data.year.jiji,
        data.month.gan,
        data.month.jiji,
        data.day.gan,
        data.day.jiji,
    ];

    if (data.time) {
        birthElementList.push(data.time.gan);
        birthElementList.push(data.time.jiji);
    }

    const ohaengCountMap = new Map<OhaengType, number>();
    const sipsinCountMap = new Map<SipsinType, number>();

    birthElementList.forEach((item) => {
        const element =
            item in cheongan
                ? cheongan[item as CheonganType].element
                : jiji[item as JijiType].element;

        const eumyang =
            item in cheongan
                ? cheongan[item as CheonganType].eumyang
                : jiji[item as JijiType].eumyang;

        const sipsin = checkSipsinData(data.day.gan, element, eumyang);

        ohaengCountMap.set(element, (ohaengCountMap.get(element) ?? 0) + 1);
        sipsinCountMap.set(sipsin, (sipsinCountMap.get(sipsin) ?? 0) + 1);
    });

    const scoreList: OhaengStrengthData[] = ohaengList.map((item) => {
        const count = ohaengCountMap.get(item) ?? 0;
        const percent = count == 0 ? 0 : Math.round((count / allScore) * 10000) / 100;

        let isBalanced = true;
        if (percent != 0 && (percent < 12.5 || percent > 25)) {
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
                sipsincount == 0 ? 0 : Math.round((sipsincount / sipsinAllScore) * 10000) / 100;

            return { name: sipsinItem, count: sipsincount, percent: sipsinPercent };
        });

        return {
            element: item,
            count: count,
            percent: percent,
            standard: standard,
            isBalanced: isBalanced,
            sipsinDataList: sipsinDataList,
        };
    });

    return scoreList;
};
