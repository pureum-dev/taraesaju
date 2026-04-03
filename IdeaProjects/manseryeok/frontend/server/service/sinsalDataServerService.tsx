/** Lib */
import dayjs, { Dayjs } from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

import { DateTime } from 'luxon';
import KoreanLunarCalendar from 'korean-lunar-calendar';

/** Type & Interface */
import { cheonganType, jijiType, divisionType } from '@/type/basicType';
import { regionInterface } from '@/service/regionService';
import { birthDataInterface } from '@/service/birthDataService';

/** Custom */
import { cheongan, jiji, division24 } from '@/common/const';

/** Data */
import division24Json from '@/server/data/division24.json';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
