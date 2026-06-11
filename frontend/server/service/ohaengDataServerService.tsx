/** Custom */
import { ohaeng, sipsin } from '@/common/const/ohaengConst';
import { cheongan } from '@/common/const/cheonganConst';
import { jiji } from '@/common/const/jijiConst';
import { findSipsinList, checkSipsinData } from '@/server/service/sipsinDataServerService';
import { checkStrength } from '@/server/service/pointDataServerService';

/** Type & Interface */
import {
    CheonganType,
    JijiType,
    OhaengType,
    SipsinType,
    SipsinGroupType,
    ColumnKeyType,
    SeasonType,
} from '@/type/basicType';
import { BirthColumnData } from '@/type/birthDataInterface';
import { BirthColumnGroup } from '@/type/baseInterface';
import {
    OhaengStrengthEachData,
    OhaengStrengthData,
    OhaengTempData,
} from '@/type/ohaengDataInterface';

export const checkOhaengStrength = (
    data: BirthColumnGroup<BirthColumnData>,
    adjustScore: boolean,
): OhaengStrengthData => {
    const allScore = adjustScore ? (data.time ? 25 : 19) : data.time ? 8 : 6;
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
    const scoreList: OhaengStrengthEachData[] = ohaengList.map((item) => {
        const score = ohaengCountMap.get(item) ?? 0;

        const percent = score == 0 ? 0 : Math.round((score / allScore) * 10000) / 100;

        if (isBalanced && percent != 0 && (percent < 12.5 || percent > 25)) {
            isBalanced = false;
        }

        let standard = '';
        if (percent >= 35) {
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
        strengthType: checkStrength(data, adjustScore),
        ohaeng: scoreList,
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

export const checkOhaengTemp = (data: BirthColumnGroup<BirthColumnData>): OhaengTempData => {
    let temp: number = 0;
    let humidity: number = 0;
    let seasonTemp: number = 0;
    let seasonhumidity: number = 0;
    let timeTemp: number = 0;

    let season: SeasonType = '봄';
    let timeName: string = '';

    Object.entries(data).forEach(([key, value]) => {
        if (value) {
            const ganScore = adjustCheonganTempScore(value.gan);
            const jijiScore = adjustJijiTempScore(value.jiji, key as ColumnKeyType);

            if (key === 'month') {
                temp += ganScore.temp;
                seasonTemp = jijiScore.temp;
                seasonhumidity = jijiScore.humidity;
                humidity += ganScore.humidity;
                season = jijiScore.season;
            } else if (key === 'time') {
                temp += ganScore.temp;
                timeTemp = jijiScore.temp;
                humidity += ganScore.humidity + jijiScore.humidity;
                timeName = jijiScore.timeName;
            } else {
                temp += ganScore.temp + jijiScore.temp;
                humidity += ganScore.humidity + jijiScore.humidity;
            }
        }
    });

    const finalTemp = seasonTemp * 0.7 + timeTemp * 0.2 + temp * 0.1;
    const finalHumidity = seasonhumidity * 0.7 + humidity * 0.3;

    return {
        name: checkTempName(finalTemp) + ' ' + checkHumidityName(finalHumidity),
        temp: finalTemp,
        humidity: finalHumidity,
        season,
        timeName,
    };
};

export const adjustCheonganTempScore = (cheongan: CheonganType) => {
    switch (cheongan) {
        case '갑': //목,조
            return {
                temp: elementTempScore['목'].temp,
                humidity: elementTempScore['목'].humidity + tempScore['조'].humidity,
            };
        case '을': //목,습
            return {
                temp: elementTempScore['목'].temp,
                humidity: elementTempScore['목'].humidity + tempScore['습'].humidity,
            };
        case '병': //화,조
            return {
                temp: elementTempScore['화'].temp,
                humidity: elementTempScore['화'].humidity + tempScore['조'].humidity,
            };
        case '정': //화,습
            return {
                temp: elementTempScore['화'].temp,
                humidity: elementTempScore['화'].humidity + tempScore['습'].humidity,
            };
        case '무': //토,조
            return {
                temp: elementTempScore['토'].temp,
                humidity: elementTempScore['토'].humidity + tempScore['조'].humidity,
            };
        case '기': //토,습
            return {
                temp: elementTempScore['토'].temp,
                humidity: elementTempScore['토'].humidity + tempScore['습'].humidity,
            };
        case '경': //금,습
            return {
                temp: elementTempScore['금'].temp,
                humidity: elementTempScore['금'].humidity + tempScore['습'].humidity,
            };
        case '신': //금,조
            return {
                temp: elementTempScore['금'].temp,
                humidity: elementTempScore['금'].humidity + tempScore['조'].humidity,
            };
        case '임': //수,조
            return {
                temp: elementTempScore['수'].temp,
                humidity: elementTempScore['수'].humidity + tempScore['조'].humidity,
            };
        default: //'계' - 수,습
            return {
                temp: elementTempScore['수'].temp,
                humidity: elementTempScore['수'].humidity + tempScore['습'].humidity,
            };
    }
};

export const adjustJijiTempScore = (
    ji: JijiType,
    column: ColumnKeyType,
): {
    temp: number;
    humidity: number;
    season: SeasonType;
    timeName: string;
} => {
    const season = seasonScore(jiji[ji].number);
    const timeName = timeScore(ji);
    const addScore: number =
        column === 'month' ? season.temp : column === 'time' ? timeName.temp : 0;

    switch (ji) {
        case '자': //겨울,수,한,조
            return {
                temp: elementTempScore['수'].temp + tempScore['한'].temp + addScore,
                humidity: elementTempScore['수'].humidity + tempScore['조'].humidity,
                season: season.season,
                timeName: timeName.timeName,
            };
        case '축': //겨울,토,한,습
            return {
                temp: elementTempScore['토'].temp + tempScore['한'].temp + addScore,
                humidity: elementTempScore['토'].humidity + tempScore['습'].humidity,
                season: season.season,
                timeName: timeName.timeName,
            };
        case '인': //겨울,목,한,조
            return {
                temp: elementTempScore['목'].temp + tempScore['한'].temp + addScore,
                humidity: elementTempScore['목'].humidity + tempScore['습'].humidity,
                season: season.season,
                timeName: timeName.timeName,
            };
        case '묘': //봄,목,난,습
            return {
                temp: elementTempScore['목'].temp + tempScore['난'].temp + addScore,
                humidity: elementTempScore['목'].humidity + tempScore['습'].humidity,
                season: season.season,
                timeName: timeName.timeName,
            };
        case '진': //봄,토,습
            return {
                temp: elementTempScore['토'].temp + addScore,
                humidity: elementTempScore['토'].humidity + tempScore['습'].humidity,
                season: season.season,
                timeName: timeName.timeName,
            };
        case '사': //봄,화,난,조
            return {
                temp: elementTempScore['화'].temp + tempScore['난'].temp + addScore,
                humidity: elementTempScore['화'].humidity + tempScore['조'].humidity,
                season: season.season,
                timeName: timeName.timeName,
            };
        case '오': //여름,화,난,습
            return {
                temp: elementTempScore['화'].temp + tempScore['난'].temp + addScore,
                humidity: elementTempScore['화'].humidity + tempScore['습'].humidity,
                season: season.season,
                timeName: timeName.timeName,
            };
        case '미': //여름,토,조
            return {
                temp: elementTempScore['토'].temp + addScore,
                humidity: elementTempScore['토'].humidity + tempScore['조'].humidity,
                season: season.season,
                timeName: timeName.timeName,
            };
        case '신': //여름,금,난,습
            return {
                temp: elementTempScore['금'].temp + tempScore['난'].temp + addScore,
                humidity: elementTempScore['금'].humidity + tempScore['습'].humidity,
                season: season.season,
                timeName: timeName.timeName,
            };
        case '유': //가을,금,한,조
            return {
                temp: elementTempScore['금'].temp + tempScore['한'].temp + addScore,
                humidity: elementTempScore['금'].humidity + tempScore['조'].humidity,
                season: season.season,
                timeName: timeName.timeName,
            };
        case '술': //가을,토,조
            return {
                temp: elementTempScore['토'].temp + addScore,
                humidity: elementTempScore['토'].humidity + tempScore['조'].humidity,
                season: season.season,
                timeName: timeName.timeName,
            };
        case '해': //가을,수,한,습
            return {
                temp: elementTempScore['수'].temp + tempScore['한'].temp + addScore,
                humidity: elementTempScore['수'].humidity + tempScore['습'].humidity,
                season: season.season,
                timeName: timeName.timeName,
            };
        default:
            return { temp: 0, humidity: 0, season: season.season, timeName: timeName.timeName };
    }
};

export const checkNeedOhaeng = (
    ohaengStrength: { isBalanced: boolean; strengthType: string; ohaeng: OhaengStrengthEachData[] },
    ohaengTemp: OhaengTempData,
): OhaengType[] => {
    const needOhaengSet = new Set<OhaengType>();

    //1.조후확인
    const temp = ohaengTemp.temp;
    if (temp <= -8) needOhaengSet.add('화');
    else if (temp > 8) needOhaengSet.add('수');

    //2.억부확인
    const cycle: SipsinGroupType[] = ['비겁', '식상', '재성', '관성', '인성'];
    const strengthType = ohaengStrength.strengthType;
    const strengthMap = new Map<SipsinGroupType, OhaengStrengthEachData>();

    ohaengStrength.ohaeng.forEach((item) => {
        strengthMap.set(item.sipsinGroup as SipsinGroupType, item);
    });

    const muchSipsin: SipsinGroupType[] = [];
    cycle.forEach((item, idx) => {
        const current = strengthMap.get(item);
        const next = strengthMap.get(cycle[(idx + 1) % cycle.length]);

        if (current && next && current.percent >= 20 && next.percent < 12.5) {
            needOhaengSet.add(next.element);
            muchSipsin.push(item);
        }
    });

    if (strengthType === '태약' || strengthType === '신약') {
        const _self = strengthMap.get('비겁');
        const _resource = strengthMap.get('인성');

        if (_self && _self.percent < 12.5) {
            if (!muchSipsin.includes('식상')) needOhaengSet.add(_self.element);
        } else if (_resource && _resource.percent < 12.5) {
            if (!muchSipsin.includes('비겁')) needOhaengSet.add(_resource.element);
        }
    }

    return Array.from(needOhaengSet);
};

const elementTempScore = {
    목: { temp: 2, humidity: 2 },
    화: { temp: 4, humidity: -4 },
    토: { temp: 0, humidity: 0 },
    금: { temp: -2, humidity: -2 },
    수: { temp: -4, humidity: 4 },
};

const tempScore = {
    조: { temp: 0, humidity: -4 },
    습: { temp: 0, humidity: 4 },
    한: { temp: -4, humidity: 0 },
    난: { temp: 4, humidity: 0 },
};

const seasonScore = (monthNum: number): { season: SeasonType; temp: number } => {
    switch (monthNum) {
        case 0:
        case 1:
        case 2:
            return { season: '겨울', temp: -4 };
        case 3:
        case 4:
        case 5:
            return { season: '봄', temp: 2 };
        case 6:
        case 7:
        case 8:
            return { season: '여름', temp: 4 };
        default:
            return { season: '가을', temp: -2 };
    }
};

const timeScore = (jiji: JijiType): { timeName: string; temp: number } => {
    switch (jiji) {
        case '축':
        case '인':
            return { timeName: '새벽', temp: -1 };
        case '묘':
        case '진':
            return { timeName: '아침', temp: 0 };
        case '사':
            return { timeName: '오전', temp: 1 };
        case '오':
            return { timeName: '낮', temp: 2 };
        case '미':
        case '신':
            return { timeName: '오후', temp: 1 };
        case '유':
        case '술':
            return { timeName: '저녁', temp: -1 };
        default:
            return { timeName: '밤', temp: 2 };
    }
};

export const checkTempName = (score: number): string => {
    if (score <= -8) {
        return '춥고';
    } else if (score <= -4) {
        return '서늘하고';
    } else if (score <= 4) {
        return '온화하고';
    } else if (score <= 8) {
        return '따뜻하고';
    } else {
        return '뜨겁고';
    }
};

export const checkHumidityName = (score: number): string => {
    if (score <= -18) {
        return '메마른';
    } else if (score <= -6) {
        return '건조한';
    } else if (score <= 6) {
        return '쾌적한';
    } else if (score <= 18) {
        return '촉촉한';
    } else {
        return '습한';
    }
};
