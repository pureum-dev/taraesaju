/** lib */
import dayjs from 'dayjs';
import KoreanLunarCalendar from 'korean-lunar-calendar';

/** Type & Interface */
import { birthDataInterface } from '@/client/birthDataService';
import { DaeunData, SeunData } from '@/common/type/luckyDataInterface';

export const calculateCalendar = (profileData: birthDataInterface) => {
    const calendar = new KoreanLunarCalendar();
    const splitBirthday = profileData.birthday.split('-').map((item) => Number(item));

    if (profileData.calendarType === 'solar') {
        calendar.setSolarDate(splitBirthday[0], splitBirthday[1], splitBirthday[2]);
    } else {
        calendar.setLunarDate(
            splitBirthday[0],
            splitBirthday[1],
            splitBirthday[2],
            profileData.calendarType === 'leap',
        );
    }
    return calendar;
};

export const calculateInitialIdx = (
    profileData: birthDataInterface,
    daeun: DaeunData[],
    seun: SeunData[][],
) => {
    let daeunIdx = 0;
    let seunIdx = 0;

    const _calender = calculateCalendar(profileData);
    if (_calender) {
        const solarDate = _calender.getSolarCalendar();
        const currentYear = dayjs().year();
        const diff = currentYear - solarDate.year + 1;

        for (let idx = 0; idx < daeun.length; idx++) {
            if (idx === daeun.length - 1 && daeun[idx].daeunNum <= diff) {
                daeunIdx = idx;
                break;
            } else if (daeun[idx].daeunNum <= diff && diff < daeun[idx + 1].daeunNum) {
                daeunIdx = idx;
                break;
            }
        }

        const targetSeun = daeunIdx ? seun[daeunIdx] : [];
        for (let idx = 0; idx < targetSeun.length; idx++) {
            if (targetSeun[idx].yearNum && currentYear === targetSeun[idx].yearNum) {
                seunIdx = idx;
                break;
            }
        }
    }

    return {
        daeunIdx: daeunIdx,
        seunIdx: seunIdx,
    };
};
