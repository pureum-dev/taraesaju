/** Custom */
import { cheongan } from '@/common/const/cheonganConst';
import { jiji } from '@/common/const/jijiConst';
import { findSipsinList, checkSipsinData } from '@/server/service/sipsinDataServerService';

/** Type & Interface */
import { OhaengType, SipsinType } from '@/type/basicType';
import { BirthColumnData } from '@/type/birthDataInterface';
import { BirthColumnGroup } from '@/type/baseInterface';
import { OhaengStrengthData } from '@/type/ohaengDataInterface';

export const checkOhaengStrength = (
    data: BirthColumnGroup<BirthColumnData>,
    adjustScore: boolean,
): { isBalanced: boolean; ohaeng: OhaengStrengthData[] } => {
    const allScore = adjustScore ? 25 : 8;
    const ohaengList: OhaengType[] = ['목', '화', '토', '금', '수'];

    const ohaengCountMap = new Map<OhaengType, number>();
    const sipsinCountMap = new Map<SipsinType, number>();

    Object.entries(data).forEach(([key, value]) => {
        if (value) {
            const valueData = value as BirthColumnData;
            const ganScore = adjustScore ? checkScore(key, 'gan') : 1;
            const jijiScore = adjustScore ? checkScore(key, 'jiji') : 1;

            const ganData = cheongan[valueData.gan].element;
            const jijiData = jiji[valueData.jiji].element;
            const jijiMonthAdjust = jiji[valueData.jiji].seasonAdjustment;

            const ganSipsin = valueData.ganSipsin as SipsinType;
            const jijiSipsin = valueData.jijiSipsin as SipsinType;

            ohaengCountMap.set(ganData, (ohaengCountMap.get(ganData) ?? 0) + ganScore);
            sipsinCountMap.set(ganSipsin, (sipsinCountMap.get(ganSipsin) ?? 0) + ganScore);

            if (key === 'month' && jijiMonthAdjust) {
                jijiMonthAdjust.forEach((item) => {
                    const targetSipsin = checkSipsinData(
                        data.day.gan,
                        item.element,
                        jiji[valueData.jiji].eumyang,
                    );

                    ohaengCountMap.set(
                        item.element,
                        (ohaengCountMap.get(jijiData) ?? 0) + jijiScore * item.percent,
                    );
                    sipsinCountMap.set(
                        targetSipsin,
                        (sipsinCountMap.get(targetSipsin) ?? 0) + jijiScore * item.percent,
                    );
                });
            } else {
                ohaengCountMap.set(jijiData, (ohaengCountMap.get(jijiData) ?? 0) + jijiScore);
                sipsinCountMap.set(jijiSipsin, (sipsinCountMap.get(jijiSipsin) ?? 0) + jijiScore);
            }
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

        const sipsinData = findSipsinList(cheongan[data.day.gan].element, item);
        const sipsinList: SipsinType[] = sipsinData.list;
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
            sipsinGroup: sipsinData.group,
            sipsinDataList: sipsinDataList,
        };
    });

    return {
        isBalanced: isBalanced,
        ohaeng: scoreList,
    };
};

export const checkOhaengTemp = (
    data: BirthColumnGroup<BirthColumnData>,
): { name: string; temp: number; humidity: number } => {
    let temp = 0;
    let humidity = 0;

    Object.entries(data).forEach(([key, value]) => {
        if (value) {
            const ganScore = checkTempScore(value.gan, 'gan');
            const jijiScore = checkTempScore(value.jiji, 'jiji');

            if (key === 'month') {
                temp += ganScore.temp + jijiScore.temp * 1.5;
                humidity += ganScore.humidity + jijiScore.humidity * 1.5;
            } else {
                temp += ganScore.temp + jijiScore.temp;
                humidity += ganScore.humidity + jijiScore.humidity;
            }
        }
    });

    return {
        name: checkTempName(temp) + ' ' + checkHumidityName(humidity),
        temp,
        humidity,
    };
};

export const checkScore = (key: string, type: 'gan' | 'jiji'): number => {
    switch (key) {
        case 'year':
            return 2;
        case 'month':
            return type === 'gan' ? 3 : 6;
        case 'day':
            return 3;
        case 'time':
            return type === 'gan' ? 2 : 4;
        default:
            return 0;
    }
};

export const checkTempScore = (
    key: string,
    type: 'gan' | 'jiji',
): { temp: number; humidity: number } => {
    /**
     * 목: 온도 +3 습도: +3
     * 화: 온도 +8 습도: -8
     * 토: 온도 +0 (+-5)
     * 금: 온도 -3 습도 -3
     * 수: 온도 -8 습도 +8
     *
     * 조: -10
     * 습: +10
     * 한: -8
     * 난: +8
     *
     * 겨울: 온도 -8
     * 봄: 온도 +4
     * 여름: 온도 +8
     * 가을: 온도 -4
     */

    if (type === 'gan') {
        switch (key) {
            case '갑': //목(온: +3 / 습: +3),조(습: -8)
                return { temp: 3, humidity: -5 };
            case '을': //목(온: +3 / 습: +3),습(습: +8)
                return { temp: 3, humidity: 11 };
            case '병': //화(온: +8 / 습: -8),조(습: -8)
                return { temp: 8, humidity: -16 };
            case '정': //화(온: +8 / 습: -8),습(습: +8)
                return { temp: 8, humidity: 0 };
            case '무': //토(0),조(습: -8)
                return { temp: 0, humidity: -8 };
            case '기': //토(0),습(습: +8)
                return { temp: 0, humidity: 8 };
            case '경': //금(온: -3 / 습: -3),습(습: +8)
                return { temp: -3, humidity: 5 };
            case '신': //금(온: -3 / 습: -3),조(습: -8)
                return { temp: -3, humidity: -11 };
            case '임': //수(온: -8 / 습: 8),조(습: -8)
                return { temp: -8, humidity: 0 };
            case '계': //수(온: -8 / 습: 8),습(습: +8)
                return { temp: -8, humidity: 16 };
            default:
                return { temp: 0, humidity: 0 };
        }
    } else {
        switch (key) {
            case '자': //겨울(온:-8),수(온: -8 / 습: +8),한(온: -8),조(습: -8)
                return { temp: -24, humidity: 0 };
            case '축': //겨울(온:-8),토(0),한(온: -8),습(습: +8)
                return { temp: -16, humidity: 8 };
            case '인': //겨울(온:-8),목(온: +3 / 습: +3),한(온: -8),조(습: -8)
                return { temp: -13, humidity: -5 };
            case '묘': //봄(온: +4),목(온: +3 / 습: +3),난(온: +8),습(습: +8)
                return { temp: 15, humidity: 11 };
            case '진': //봄(온: +4),토(0),중립,습(습: +8)
                return { temp: 4, humidity: 8 };
            case '사': //봄(온: +4),화(온: +8 / 습: -8),난(온: +8),조(습: -8)
                return { temp: 20, humidity: -16 };
            case '오': //여름(온: +8),화(온: +8 / 습: -8),난(온: +8),습(습: +8)
                return { temp: 24, humidity: 0 };
            case '미': //여름(온: +8),토(0),중립,조(습: -8)
                return { temp: 8, humidity: -8 };
            case '신': //여름(온: +8),금(온: -3 / 습: -3),난(온: +8),습(습: +8)
                return { temp: 13, humidity: 5 };
            case '유': //가을(온: -4),금(온: -3 / 습: -3),한(온: -8),조(습: -8)
                return { temp: -15, humidity: -11 };
            case '술': //가을(온: -4),토(0),중립,조(습: -8)
                return { temp: -4, humidity: -8 };
            case '해': //가을(온: -4),수(온: -8 / 습: 8),한(온: -8),습(습: +8)
                return { temp: -20, humidity: 16 };
            default:
                return { temp: 0, humidity: 0 };
        }
    }
};

export const checkTempName = (score: number): string => {
    if (score <= -60) {
        return '춥고';
    } else if (score <= -20) {
        return '서늘하고';
    } else if (score <= 19) {
        return '온화하고';
    } else if (score <= 59) {
        return '따뜻하고';
    } else {
        return '뜨겁고';
    }
};

export const checkHumidityName = (score: number): string => {
    if (score <= -60) {
        return '메마른';
    } else if (score <= -20) {
        return '건조한';
    } else if (score <= 19) {
        return '쾌적한';
    } else if (score <= 59) {
        return '촉촉한';
    } else {
        return '습한';
    }
};
