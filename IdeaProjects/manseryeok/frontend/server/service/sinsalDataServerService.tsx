/** Custom */
import { jiji } from '@/common/const/jijiConst';

/** Type & Interface */
import { CheonganType, JijiType, ColumnKeyType } from '@/type/basicType';
import { BirthColumnData } from '@/type/birthDataInterface';
import { BirthColumnGroup, BirthColumnItem } from '@/type/baseInterface';
import { OhaengStrengthData } from '@/type/ohaengDataInterface';
import { cheongan } from '@/common/const/cheonganConst';
import { sinsal } from '@/common/const/sinsalConst';

export const check12Sinsal = (yearji: JijiType, targetji: JijiType) => {
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

export const checkSinsalData = (
    data: BirthColumnGroup<BirthColumnData>,
): BirthColumnGroup<BirthColumnItem<string[], string[]>> => {
    const list: ColumnKeyType[] = ['year', 'month', 'day'];
    if (data.time) list.push('time');

    const result: BirthColumnGroup<BirthColumnItem<string[], string[]>> = {
        year: { gan: [], jiji: [] },
        month: { gan: [], jiji: [] },
        day: { gan: [], jiji: [] },
        time: null,
    };

    const wangji = ['자', '오', '묘', '유'];
    const monthJiji: JijiType = data.month.jiji;
    const dayGan: CheonganType = data.day.gan;
    const dayJiji: JijiType = data.day.jiji;

    list.forEach((item: ColumnKeyType) => {
        if (data[item]) {
            const targetGan: CheonganType = data[item].gan;
            const targetJiji: JijiType = data[item].jiji;

            const ganSinsalList: string[] = [];
            let jijiSinsalList: string[] = [];

            //천간신살 - 일간기준
            jijiSinsalList = [...jijiSinsalList, ...sinsal[dayGan][targetJiji]];

            //일지 기준
            if (checkHwagaesal(dayJiji, targetJiji)) jijiSinsalList.push('화개살');

            if (checkDohwasal(dayJiji, targetJiji)) jijiSinsalList.push('도화살');

            if (checkYuckmasal(dayJiji, targetJiji)) jijiSinsalList.push('역마살');

            if (item === 'month' || item === 'time') {
                if (checkGwimungwansal(dayJiji, targetJiji)) jijiSinsalList.push('귀문관살');
                if (checkHyungsal(dayJiji, targetJiji)) jijiSinsalList.push('형살');
            }

            //월지 기준
            if (checkWoldeokguiin(monthJiji, targetGan)) {
                ganSinsalList.push('월덕귀인');
            }

            if (checkCheondukguiin(monthJiji, targetGan, targetJiji)) {
                if (wangji.includes(monthJiji)) {
                    jijiSinsalList.push('천덕귀인');
                } else {
                    ganSinsalList.push('천덕귀인');
                }
            }

            if (checkCheonuisung(monthJiji, targetJiji)) {
                jijiSinsalList.push('천의성');
            }

            if (item === 'day' || item === 'time') {
                if (checkGeubgagsal(monthJiji, targetJiji)) jijiSinsalList.push('급각살');
                if (checkHwangeundaesa(monthJiji, targetJiji)) jijiSinsalList.push('황은대사');
            }

            //전체 기둥
            if (checkGoigangsal(targetGan, targetJiji)) {
                ganSinsalList.push('괴강살');
                jijiSinsalList.push('괴강살');
            }

            if (checkHongyeomsal(targetGan, targetJiji)) {
                ganSinsalList.push('홍염살');
                jijiSinsalList.push('홍염살');
            }

            if (checkBaekhosal(dayGan, dayJiji) && checkBaekhosal(targetGan, targetJiji)) {
                ganSinsalList.push('백호살');
                jijiSinsalList.push('백호살');
            }

            if (checkHyunchimsal(cheongan[targetGan].hanja)) ganSinsalList.push('현침살');
            if (checkHyunchimsal(jiji[targetJiji].hanja)) jijiSinsalList.push('현침살');

            result[item] = {
                gan: ganSinsalList,
                jiji: jijiSinsalList,
            };
        }
    });

    return result;
};

/**
 * 일지 기준
 */

//화개살 - 일지 기준
export const checkHwagaesal = (defaultJiji: JijiType, targetJiji: JijiType): boolean => {
    switch (defaultJiji) {
        case '자':
        case '진':
        case '신':
            return targetJiji === '진';
        case '축':
        case '사':
        case '유':
            return targetJiji === '축';
        case '인':
        case '오':
        case '술':
            return targetJiji === '술';

        default:
            return targetJiji === '미';
    }
};

//도화살 - 일지 기준
export const checkDohwasal = (defaultJiji: JijiType, targetJiji: JijiType): boolean => {
    switch (defaultJiji) {
        case '자':
        case '진':
        case '신':
            return targetJiji === '유';
        case '축':
        case '사':
        case '유':
            return targetJiji === '오';
        case '인':
        case '오':
        case '술':
            return targetJiji === '묘';

        default:
            return targetJiji === '자';
    }
};

//역마살 - 일지 기준
export const checkYuckmasal = (defaultJiji: JijiType, targetJiji: JijiType): boolean => {
    switch (defaultJiji) {
        case '자':
        case '진':
        case '신':
            return targetJiji === '신';
        case '축':
        case '사':
        case '유':
            return targetJiji === '사';
        case '인':
        case '오':
        case '술':
            return targetJiji === '인';

        default:
            return targetJiji === '해';
    }
};

//귀문관살 - 일지 기준 월지와 시지 확인
export const checkGwimungwansal = (defaultJiji: JijiType, targetJiji: JijiType): boolean => {
    switch (defaultJiji) {
        case '자':
        case '진':
        case '신':
            return targetJiji === '신';
        case '축':
        case '사':
        case '유':
            return targetJiji === '사';
        case '인':
        case '오':
        case '술':
            return targetJiji === '인';

        default:
            return targetJiji === '해';
    }
};

//형살 - 일지 기준 월지와 시지 확인
export const checkHyungsal = (defaultJiji: JijiType, targetJiji: JijiType): boolean => {
    switch (defaultJiji) {
        case '자':
            return targetJiji === '묘';
        case '묘':
            return targetJiji === '자';
        case '축':
            return targetJiji === '미' || targetJiji === '술';
        case '미':
            return targetJiji === '축' || targetJiji === '술';
        case '술':
            return targetJiji === '축' || targetJiji === '미';
        case '인':
            return targetJiji === '신' || targetJiji === '사';
        case '사':
            return targetJiji === '인' || targetJiji === '신';
        case '신':
            return targetJiji === '사' || targetJiji === '인';
        case '진':
            return targetJiji === '진';
        case '오':
            return targetJiji === '오';
        case '유':
            return targetJiji === '유';
        case '해':
            return targetJiji === '해';
        default:
            return false;
    }
};

/**
 * 월지 기준
 */
//월덕귀인 - 월지 기준
export const checkWoldeokguiin = (defaultJiji: JijiType, targetGan: CheonganType) => {
    switch (defaultJiji) {
        case '자':
        case '진':
        case '신':
            return targetGan === '임';
        case '축':
        case '사':
        case '유':
            return targetGan === '경';
        case '인':
        case '오':
        case '술':
            return targetGan === '병';

        default:
            return targetGan === '갑';
    }
};

//천덕귀인 - 월지 기준
export const checkCheondukguiin = (
    defaultJiji: JijiType,
    targetGan: CheonganType,
    targetJiji: JijiType,
) => {
    switch (defaultJiji) {
        case '자':
            return targetJiji === '사'; //지지
        case '축':
            return targetGan === '경';
        case '인':
            return targetGan === '정';
        case '묘':
            return targetJiji === '신'; //지지
        case '진':
            return targetGan === '임';
        case '사':
            return targetGan === '신';
        case '오':
            return targetJiji === '해'; //지지
        case '미':
            return targetGan === '갑';
        case '신':
            return targetGan === '계';
        case '유':
            return targetJiji === '인'; //지지
        case '술':
            return targetGan === '병';
        default:
            return targetGan === '을';
    }
};

//천의성 - 월지 기준
export const checkCheonuisung = (defaultJiji: JijiType, targetJiji: JijiType) => {
    switch (defaultJiji) {
        case '자':
            return targetJiji === '해';
        case '축':
            return targetJiji === '자';
        case '인':
            return targetJiji === '축';
        case '묘':
            return targetJiji === '인';
        case '진':
            return targetJiji === '묘';
        case '사':
            return targetJiji === '진';
        case '오':
            return targetJiji === '사';
        case '미':
            return targetJiji === '오';
        case '신':
            return targetJiji === '미';
        case '유':
            return targetJiji === '신';
        case '술':
            return targetJiji === '유';
        default:
            return targetJiji === '술';
    }
};

//급각살 - 월지 기준 일지와 시지 확인
export const checkGeubgagsal = (defaultJiji: JijiType, targetJiji: JijiType) => {
    switch (defaultJiji) {
        case '인':
        case '묘':
        case '진':
            return targetJiji === '해' || targetJiji === '자';

        case '사':
        case '오':
        case '미':
            return targetJiji === '묘' || targetJiji === '미';

        case '신':
        case '유':
        case '술':
            return targetJiji === '인' || targetJiji === '술';

        default:
            return targetJiji === '진' || targetJiji === '축';
    }
};

//황은대사 - 월지 기준 일지와 시지 확인
export const checkHwangeundaesa = (defaultJiji: JijiType, targetJiji: JijiType) => {
    switch (defaultJiji) {
        case '자':
            return targetJiji === '신';
        case '축':
            return targetJiji === '미';
        case '인':
            return targetJiji === '술';
        case '묘':
            return targetJiji === '축';
        case '진':
            return targetJiji === '인';
        case '사':
            return targetJiji === '사';
        case '오':
            return targetJiji === '유';
        case '미':
            return targetJiji === '묘';
        case '신':
            return targetJiji === '자';
        case '유':
            return targetJiji === '오';
        case '술':
            return targetJiji === '해';
        default:
            return targetJiji === '진';
    }
};

/**
 * 전체 근접 지지 기준
 */
//원진살
export const checkWonjinsal = (defaultJiji: JijiType, targetJiji: JijiType) => {
    switch (defaultJiji) {
        case '자':
            return targetJiji === '미';
        case '축':
            return targetJiji === '오';
        case '인':
            return targetJiji === '유';
        case '묘':
            return targetJiji === '신';
        case '진':
            return targetJiji === '해';
        case '사':
            return targetJiji === '술';
        case '오':
            return targetJiji === '축';
        case '미':
            return targetJiji === '자';
        case '신':
            return targetJiji === '묘';
        case '유':
            return targetJiji === '인';
        case '술':
            return targetJiji === '사';
        default:
            return targetJiji === '진';
    }
};

/**
 * 전체 기둥 기준
 */
//괴강살
export const checkGoigangsal = (defaultGan: CheonganType, defaultJiji: JijiType) => {
    const targetColumn = defaultGan + defaultJiji;
    switch (targetColumn) {
        case '임진':
        case '경진':
        case '경술':
        case '무술':
            return true;
        default:
            return false;
    }
};

//홍염살
export const checkHongyeomsal = (defaultGan: CheonganType, defaultJiji: JijiType) => {
    const targetColumn = defaultGan + defaultJiji;
    switch (targetColumn) {
        case '경술':
        case '신유':
        case '임자':
        case '병인':
        case '정미':
        case '무진':
        case '갑오':
            return true;
        default:
            return false;
    }
};

//백호살 - 일주가 백호대살인 경우에만 다른 주 성립
export const checkBaekhosal = (defaultGan: CheonganType, defaultJiji: JijiType) => {
    const targetColumn = defaultGan + defaultJiji;
    switch (targetColumn) {
        case '갑진':
        case '을미':
        case '병술':
        case '정축':
        case '무진':
        case '임술':
        case '계축':
            return true;
        default:
            return false;
    }
};

//현침살
export const checkHyunchimsal = (targetHanja: string): boolean => {
    switch (targetHanja) {
        case '甲':
        case '辛':
        case '卯':
        case '午':
        case '未':
            return true;
        default:
            return false;
    }
};
