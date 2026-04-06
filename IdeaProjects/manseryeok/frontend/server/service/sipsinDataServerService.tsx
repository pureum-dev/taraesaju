/** Type & Interface */
import { cheonganType, ohaengType, sipsinType } from '@/type/basicType';
import { birthColumnInterface } from '@/type/birthDataInterface';

/** Custom */
import { ohaeng, cheongan, jiji } from '@/common/const';

export const columnSipsinData = (
    year: birthColumnInterface,
    month: birthColumnInterface,
    day: birthColumnInterface,
    time: birthColumnInterface | null,
) => {
    return {
        year: {
            gan: checkSipsinData(day.gan, cheongan[year.gan].element, cheongan[year.gan].eumyang),
            jiji: checkSipsinData(day.gan, jiji[year.jiji].element, jiji[year.jiji].eumyang),
        },
        month: {
            gan: checkSipsinData(day.gan, cheongan[month.gan].element, cheongan[month.gan].eumyang),
            jiji: checkSipsinData(day.gan, jiji[month.jiji].element, jiji[month.jiji].eumyang),
        },
        day: {
            gan: '-',
            jiji: checkSipsinData(day.gan, jiji[day.jiji].element, jiji[day.jiji].eumyang),
        },
        time: time
            ? {
                  gan: checkSipsinData(
                      day.gan,
                      cheongan[time.gan].element,
                      cheongan[time.gan].eumyang,
                  ),
                  jiji: checkSipsinData(day.gan, jiji[time.jiji].element, jiji[time.jiji].eumyang),
              }
            : null,
    };
};

export const checkSipsinData = (
    defaultGan: cheonganType,
    targetElement: ohaengType,
    targetYinYang: '양' | '음',
) => {
    let sipsin: sipsinType;
    const defaultElement = cheongan[defaultGan].element;
    const defaultYinYang = cheongan[defaultGan].eumyang;

    if (defaultElement === targetElement) {
        sipsin = defaultYinYang === targetYinYang ? '비견' : '겁재';
    } else {
        const targetOhaengObj = ohaeng[defaultElement];

        if (targetOhaengObj.resource === targetElement) {
            sipsin = defaultYinYang === targetYinYang ? '정인' : '편인';
        } else if (targetOhaengObj.power === targetElement) {
            sipsin = defaultYinYang === targetYinYang ? '정관' : '편관';
        } else if (targetOhaengObj.output === targetElement) {
            sipsin = defaultYinYang === targetYinYang ? '식신' : '상관';
        } else {
            sipsin = defaultYinYang === targetYinYang ? '정재' : '편재';
        }
    }

    return sipsin;
};
