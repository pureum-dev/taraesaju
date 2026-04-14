/** lib */
import KoreanLunarCalendar from 'korean-lunar-calendar';

/** Type & Interface */
import { birthDataInterface } from '@/service/birthDataService';

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
