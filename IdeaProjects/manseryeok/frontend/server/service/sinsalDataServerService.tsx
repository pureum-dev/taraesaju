/** Lib */
import dayjs, { Dayjs } from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

import KoreanLunarCalendar from 'korean-lunar-calendar';

/** Type & Interface */
import { cheonganType, jijiType, divisionType } from '@/type/basicType';
import { regionInterface } from '@/service/regionService';
import { birthDataInterface } from '@/service/birthDataService';

/** Custom */
import { cheongan, jiji, division24 } from '@/common/const';

export const check12Sinsal = (yearji: jijiType, targetji: jijiType) => {
    const sinsalList: string[] = [
        '지살',
        '년살',
        '월살',
        '망신살',
        '장성살',
        '반안살',
        '역마살',
        '육해살',
        '화개살',
        '겁살',
        '재살',
        '천살',
    ];

    let plusNum = 0;
    switch (yearji) {
        case '해':
        case '묘':
        case '미':
            plusNum = 1;
            break;
        case '인':
        case '오':
        case '술':
            plusNum = 10;
            break;
        case '사':
        case '유':
        case '축':
            plusNum = 7;
            break;
        default:
            plusNum = 4;
    }

    const number = jiji[targetji].number % 12;
    return sinsalList[number];
};
