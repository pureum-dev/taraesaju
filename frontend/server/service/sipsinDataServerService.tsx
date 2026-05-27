/** Custom */
import { ohaeng } from '@/common/const/ohaengConst';
import { cheongan } from '@/common/const/cheonganConst';
import { jiji } from '@/common/const/jijiConst';

/** Type & Interface */
import { CheonganType, OhaengType, SipsinGroupType, SipsinType, JijiType } from '@/type/basicType';
import { BirthColumnItem } from '@/type/baseInterface';

export const columnSipsinData = (
    year: BirthColumnItem<CheonganType, JijiType>,
    month: BirthColumnItem<CheonganType, JijiType>,
    day: BirthColumnItem<CheonganType, JijiType>,
    time: BirthColumnItem<CheonganType, JijiType> | null,
) => {
    return {
        year: {
            gan: checkSipsinData(day.gan, cheongan[year.gan].element, cheongan[year.gan].eumyang),
            jiji: checkSipsinData(
                day.gan,
                jiji[year.jiji].element,
                jiji[year.jiji].isInvert
                    ? jiji[year.jiji].eumyang === '양'
                        ? '음'
                        : '양'
                    : jiji[year.jiji].eumyang,
            ),
        },
        month: {
            gan: checkSipsinData(day.gan, cheongan[month.gan].element, cheongan[month.gan].eumyang),
            jiji: checkSipsinData(
                day.gan,
                jiji[month.jiji].element,
                jiji[month.jiji].isInvert
                    ? jiji[month.jiji].eumyang === '양'
                        ? '음'
                        : '양'
                    : jiji[month.jiji].eumyang,
            ),
        },
        day: {
            gan: '-',
            jiji: checkSipsinData(
                day.gan,
                jiji[day.jiji].element,
                jiji[day.jiji].isInvert
                    ? jiji[day.jiji].eumyang === '양'
                        ? '음'
                        : '양'
                    : jiji[day.jiji].eumyang,
            ),
        },
        time: time
            ? {
                  gan: checkSipsinData(
                      day.gan,
                      cheongan[time.gan].element,
                      cheongan[time.gan].eumyang,
                  ),
                  jiji: checkSipsinData(
                      day.gan,
                      jiji[time.jiji].element,
                      jiji[time.jiji].isInvert
                          ? jiji[time.jiji].eumyang === '양'
                              ? '음'
                              : '양'
                          : jiji[time.jiji].eumyang,
                  ),
              }
            : null,
    };
};

export const checkSipsinData = (
    defaultGan: CheonganType,
    targetElement: OhaengType,
    targetEumyang: '양' | '음',
) => {
    let sipsin: SipsinType;
    const defaultElement = cheongan[defaultGan].element;
    const defaultYinYang = cheongan[defaultGan].eumyang;

    if (defaultElement === targetElement) {
        sipsin = defaultYinYang === targetEumyang ? '비견' : '겁재';
    } else {
        const targetOhaengObj = ohaeng[defaultElement];

        if (targetOhaengObj.resource === targetElement) {
            sipsin = defaultYinYang === targetEumyang ? '편인' : '정인';
        } else if (targetOhaengObj.power === targetElement) {
            sipsin = defaultYinYang === targetEumyang ? '편관' : '정관';
        } else if (targetOhaengObj.output === targetElement) {
            sipsin = defaultYinYang === targetEumyang ? '식신' : '상관';
        } else {
            sipsin = defaultYinYang === targetEumyang ? '편재' : '정재';
        }
    }

    return sipsin;
};

export const findSipsinList = (
    defaultElement: OhaengType,
    targetElement: OhaengType,
): {
    group?: SipsinGroupType;
    list: SipsinType[];
} => {
    if (defaultElement === targetElement) {
        return { group: '비겁', list: ['비견', '겁재'] };
    } else {
        const oheangData = ohaeng[defaultElement];
        const found = Object.entries(oheangData).find(([, value]) => value === targetElement);

        if (found) {
            const [key] = found;
            if (key === 'output') return { group: '식상', list: ['식신', '상관'] };
            if (key === 'wealth') return { group: '재성', list: ['정재', '편재'] };
            if (key === 'power') return { group: '관성', list: ['정관', '편관'] };
            if (key === 'resource') return { group: '인성', list: ['정인', '편인'] };
        }

        return { group: undefined, list: [] };
    }
};
