/** Lib */
import dayjs, { Dayjs } from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import objectSupport from 'dayjs/plugin/objectSupport';

import KoreanLunarCalendar from 'korean-lunar-calendar';

/** Custom */
import { cheongan, jiji, division24, woonsung } from '@/common/const';
import { columnRelation } from '@/server/service/relationDataServerService';
import { check12Sinsal } from '@/server/service/sinsalDataServerService';
import { checkSipsinData, columnSipsinData } from '@/server/service/sipsinDataServerService';
import { checkDuplication } from '@/server/service/informationDataServerService';

/** Data */
import division24Json from '@/server/data/division24.json';

/** Type & Interface */
import { cheonganType, jijiType, divisionType } from '@/type/basicType';
import { regionInterface, divisionInterface } from '@/type/jsonDataInterface';
import {
    correctBirthDayInterface,
    correctTargetDivisionInterface,
    birthColumnInterface,
    birthAllDataInterface,
    birthChartColInterface,
} from '@/type/birthDataInterface';
import { birthDataInterface } from '@/service/birthDataService';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(objectSupport);

export const createAllBirthData = (birthDate: birthDataInterface): birthAllDataInterface | null => {
    const chartCol: birthChartColInterface | null = createBirthChartColData(birthDate);

    if (chartCol) {
        return {
            chartCol: chartCol ?? null,
        };
    } else {
        return null;
    }
};

export const createBirthChartColData = (
    birthDate: birthDataInterface,
): birthChartColInterface | null => {
    let correctBirth: correctBirthDayInterface;

    // 시간 있는 경우 시간 보정
    if (birthDate.birthtime && birthDate.birthtime !== '') {
        const birthDateTime = birthDate.birthday + 'T' + birthDate.birthtime;
        correctBirth = correctBirthDay(birthDateTime, birthDate.location, birthDate.isDivideTime);
    } else {
        correctBirth = {
            date: birthDate.birthday,
            time: null,
            deltaMinutes: 0,
            summertimeMinutes: 0,
            isCalculateDate: false,
        };
    }

    // 양력 보정
    const solarBirthDate = createSolarBirthData(correctBirth.date, birthDate.calendarType);
    const solarBirth = dayjs(
        `${solarBirthDate.year}-${solarBirthDate.month}-${solarBirthDate.day}`,
        'YYYY-MM-DD',
    );

    const yearDivision = calculateYearDivision(solarBirth);
    const targetYear = yearDivision?.targetYear;
    const targetDivision = yearDivision?.targetDivision;

    if (targetYear && targetDivision) {
        const _yearColumn = calculateYearColumn(targetYear);
        const _monthColumn = calculateMonthColumn(solarBirth, _yearColumn.gan, targetDivision);
        const _dayColumn = calculateDayColumn(solarBirth);
        const _timeColumn = correctBirth.time
            ? calculateTimeColumn(
                  correctBirth.date,
                  correctBirth.time,
                  _dayColumn.gan,
                  correctBirth.isCalculateDate,
              )
            : null;

        const _columnRelation = columnRelation(_yearColumn, _monthColumn, _dayColumn, _timeColumn);
        const _columnSipsin = columnSipsinData(_yearColumn, _monthColumn, _dayColumn, _timeColumn);
        const _columnCheonDuplication = checkDuplication(
            _yearColumn.gan,
            _monthColumn.gan,
            _dayColumn.gan,
            _timeColumn ? _timeColumn.gan : null,
        );
        const _columnJijiDuplication = checkDuplication(
            _yearColumn.jiji,
            _monthColumn.jiji,
            _dayColumn.jiji,
            _timeColumn ? _timeColumn.jiji : null,
        );

        return {
            year: {
                ..._yearColumn,
                ..._columnRelation.year,
                woonsung: woonsung[_yearColumn.gan][_yearColumn.jiji],
                sinsal: null,
                ganSipsin: _columnSipsin.year.gan,
                jijiSipsin: _columnSipsin.year.jiji,
                ganDuplication: _columnCheonDuplication.year,
                jijiDuplication: _columnJijiDuplication.year,
            },
            month: {
                ..._monthColumn,
                ..._columnRelation.month,
                woonsung: woonsung[_monthColumn.gan][_monthColumn.jiji],
                sinsal: check12Sinsal(_yearColumn.jiji, _monthColumn.jiji),
                ganSipsin: _columnSipsin.month.gan,
                jijiSipsin: _columnSipsin.month.jiji,
                ganDuplication: _columnCheonDuplication.month,
                jijiDuplication: _columnJijiDuplication.month,
            },
            day: {
                ..._dayColumn,
                ..._columnRelation.day,
                woonsung: woonsung[_dayColumn.gan][_dayColumn.jiji],
                sinsal: check12Sinsal(_yearColumn.jiji, _dayColumn.jiji),
                ganSipsin: null,
                jijiSipsin: _columnSipsin.day.jiji,
                ganDuplication: _columnCheonDuplication.day,
                jijiDuplication: _columnJijiDuplication.day,
            },
            time:
                _timeColumn && _columnRelation.time
                    ? {
                          ..._timeColumn,
                          ..._columnRelation.time,
                          woonsung: woonsung[_timeColumn.gan][_timeColumn.jiji],
                          sinsal: check12Sinsal(_yearColumn.jiji, _timeColumn.jiji),
                          ganSipsin: _columnSipsin.time ? _columnSipsin.time.gan : null,
                          jijiSipsin: _columnSipsin.time ? _columnSipsin.time.jiji : null,
                          ganDuplication: _columnCheonDuplication.time,
                          jijiDuplication: _columnJijiDuplication.time,
                      }
                    : null,
        };
    }

    return null;
};

export const correctBirthDay = (
    birthDateTime: string,
    region: regionInterface,
    isDivideTime: boolean,
): correctBirthDayInterface => {
    const zoned = dayjs.tz(birthDateTime, region.timezone);

    // DST 보정 - 기준점 (썸머타임이 보통 없는 1월 1일의 오프셋과 현재 오프셋 비교 해서 썸머타임 계산)
    const januaryOffset = dayjs.tz(`${zoned.year()}-01-01`, region.timezone).utcOffset();
    const summertimeMinutes = (zoned.utcOffset() - januaryOffset) * -1;

    // UTC offset → 표준 자오선 / 경도 보정
    const utcOffset = zoned.utcOffset() / 60; // minutes → hours
    const standardMeridian = utcOffset * 15;
    const deltaMinutes = (region.longitude - standardMeridian) * 4;

    const finalMinutes = deltaMinutes + summertimeMinutes;

    // 태양시 계산
    const solarTime = zoned.add(finalMinutes, 'minute');
    let date = solarTime.format('YYYY-MM-DD');
    const time = solarTime.format('HH:mm');

    /**
     * 야자시 / 조자시 적용
     * 1. 전통방식: 자시에 해당하는 경우 다음날로 처리
     * 2. 야/조자시 적용: 00시 기준 이전이면 전날 00시 이후면 다음날 처리
     */

    //전통방식인 경우 적용
    let isCalculateDate = false;
    if (!isDivideTime) {
        const yajasiStartTime = dayjs(
            `${date}T${jiji['자'].startTime}`,
            'YYYY-MM-DDTHH:mm',
        ).subtract(1, 'days');
        const yajasiEndTime = dayjs(`${date}T00:00`, 'YYYY-MM-DDTHH:mm');

        if (solarTime.isSameOrAfter(yajasiStartTime) && solarTime.isBefore(yajasiEndTime)) {
            isCalculateDate = true;
            date = solarTime.add(1, 'days').format('YYYY-MM-DD');
        }
    }

    return {
        date: date,
        time: time,
        deltaMinutes: finalMinutes,
        summertimeMinutes: summertimeMinutes,
        isCalculateDate: isCalculateDate,
    };
};

export const createSolarBirthData = (
    birthday: string,
    calendarType: 'solar' | 'lunar' | 'leap',
) => {
    const calendar = new KoreanLunarCalendar();

    const splitBirthday = birthday.split('-').map((item) => Number(item));

    if (calendarType === 'solar') {
        calendar.setSolarDate(splitBirthday[0], splitBirthday[1], splitBirthday[2]);
    } else {
        calendar.setLunarDate(
            splitBirthday[0],
            splitBirthday[1],
            splitBirthday[2],
            calendarType === 'leap',
        );
    }

    return calendar.getSolarCalendar();
};

/** 보정연도 및 절기데이터 */
export const calculateYearDivision = (solarBirth: Dayjs): correctTargetDivisionInterface | null => {
    const targetSpringDate = division24Json.filter((item) => {
        return item.sol_year === String(solarBirth.year()) && item.date_name === '입춘';
    });

    const targetSpringday = dayjs(`${targetSpringDate[0].locdate}`, 'YYYYMMDD');

    let targetYear = solarBirth.year();
    if (solarBirth.isBefore(targetSpringday)) targetYear -= 1;

    const targetDivision: divisionInterface[] = division24Json.filter(
        (item) => item.sol_year === String(targetYear) && item.is_beginning,
    );

    return {
        targetYear: targetYear,
        targetDivision: targetDivision,
    };
};

/**
 * 년주계산
 */
export const calculateYearColumn = (targetYear: number): birthColumnInterface => {
    const standardDate = dayjs('1900-01-01', 'YYYY-mm-dd');
    const standardYear = standardDate.year();
    const standardGan = '경'; // number = 6
    const standardJi = '자'; // number = 1

    const distanceStandard = targetYear - standardYear;
    const yearCheongan = Object.entries(cheongan).find(
        ([key, value]) => value.number === (cheongan[standardGan].number + distanceStandard) % 10,
    )?.[0];

    const yearJiji = Object.entries(jiji).find(
        ([key, value]) => value.number === (jiji[standardJi].number + distanceStandard) % 12,
    )?.[0];

    return {
        gan: yearCheongan as cheonganType,
        jiji: yearJiji as jijiType,
    };
};

/**
 * 월주계산
 */
export const calculateMonthColumn = (
    solarBirth: Dayjs,
    yearCheongan: cheonganType,
    targetDivision: divisionInterface[],
): birthColumnInterface => {
    let divisionName: string = '대설';

    for (let idx = 0; idx < targetDivision.length; idx++) {
        const item = targetDivision[idx];
        const targetDay = dayjs(item.locdate, 'YYYYMMDD');

        if (idx !== targetDivision.length - 1) {
            const after = targetDivision[idx + 1];
            const afterDay = dayjs(after.locdate, 'YYYYMMDD');

            if (solarBirth.isSameOrAfter(targetDay) && solarBirth.isBefore(afterDay)) {
                divisionName = item.date_name;
                break;
            }
        }
    }

    const defaultMonthCheongan = findMonthCheongan(yearCheongan);
    const monthJiji = division24[divisionName as divisionType].jiji;
    const distance = (12 + jiji[monthJiji].number) % 12;
    const monthGan = Object.entries(cheongan).find(
        ([key, value]) => value.number === (cheongan[defaultMonthCheongan].number + distance) % 10,
    )?.[0];

    return {
        gan: monthGan as cheonganType,
        jiji: monthJiji,
    };
};

/**
 * 일주계산
 */
export const calculateDayColumn = (solarBirth: Dayjs): birthColumnInterface => {
    const standardDate = dayjs('1900-01-01', 'YYYY-mm-dd');
    const standardGan = '갑'; // number = 0
    const standardJi = '술'; // number = 10
    const diffDays = solarBirth.startOf('day').diff(standardDate.startOf('day'), 'day') + 1;

    const dayGan = Object.entries(cheongan).find(
        ([key, value]) => value.number === (10 + cheongan[standardGan].number + diffDays) % 10,
    )?.[0];

    const dayJiji = Object.entries(jiji).find(
        ([key, value]) => value.number === (12 + jiji[standardJi].number + diffDays) % 12,
    )?.[0];

    return {
        gan: dayGan as cheonganType,
        jiji: dayJiji as jijiType,
    };
};

/**
 * 시주계산
 */
export const calculateTimeColumn = (
    date: string,
    time: string | null,
    dayCheongan: cheonganType,
    isCalculateDate: boolean,
): birthColumnInterface => {
    const birthDateTime = dayjs(`${date}T${time}`, 'YYYY-MM-DDTHH:mm');

    const timeJiji = isCalculateDate
        ? '자'
        : Object.entries(jiji).find(([key, value]) => {
              let startDateTime = dayjs(`${date}T${value.startTime}`, 'YYYY-MM-DDTHH:mm');
              const endDateTime = dayjs(`${date}T${value.endTime}`, 'YYYY-MM-DDTHH:mm');

              if (key === '자') {
                  startDateTime = startDateTime.subtract(1, 'days');
              }

              return (
                  birthDateTime.isSameOrAfter(startDateTime) && birthDateTime.isBefore(endDateTime)
              );
          })?.[0];

    const timeGan = findTimeCheongan(dayCheongan, timeJiji as jijiType);

    return {
        gan: timeGan as cheonganType,
        jiji: timeJiji as jijiType,
    };
};

export const findMonthCheongan = (yearCheongan: cheonganType) => {
    switch (yearCheongan) {
        case '갑':
        case '기':
            return '병';

        case '을':
        case '경':
            return '무';

        case '병':
        case '신':
            return '경';

        case '정':
        case '임':
            return '임';

        default:
            return '갑';
    }
};

export const findTimeCheongan = (dayCheongan: cheonganType, timeJiji: jijiType) => {
    const cheonganArr: string[] = Object.keys(cheongan);

    switch (dayCheongan) {
        case '갑':
        case '기':
            return cheonganArr[jiji[timeJiji].number % 10];
        case '을':
        case '경':
            return cheonganArr[(2 + jiji[timeJiji].number) % 10];
        case '병':
        case '신':
            return cheonganArr[(4 + jiji[timeJiji].number) % 10];
        case '정':
        case '임':
            return cheonganArr[(6 + jiji[timeJiji].number) % 10];
        default:
            return cheonganArr[(8 + jiji[timeJiji].number) % 10];
    }
};
