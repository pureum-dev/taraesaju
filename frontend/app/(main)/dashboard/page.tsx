'use client';

import { Fragment, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

/** lib */
import dayjs from 'dayjs';
import {
    UserRoundIcon,
    SunIcon,
    MoonIcon,
    CheckCircleIcon,
    CircleXIcon,
    MapPinnedIcon,
    FileTextIcon,
    MessageSquareTextIcon,
    PentagonIcon,
    CloverIcon,
    GhostIcon,
    ClubIcon,
} from 'lucide-react';
import { useDataStore } from '@/lib/store/useDataStore';
import { useModalStore } from '@/lib/store/useModalDataStore';

/** Custom */
import { cheongan } from '@/common/const/cheonganConst';
import { jiji } from '@/common/const/jijiConst';
import { ohaeng } from '@/common/const/ohaengConst';

import { getCSSVariable, makeTextColor } from '@/util/colorFunc';
import { checkOhaengStrength } from '@/server/service/ohaengDataServerService';
import { calculateCalendar } from '@/util/commonFunc';
import { makeBgColor, defaultTextColor, makeBgColorAlpha, makeColorName } from '@/util/colorFunc';

import SajuChartGroupComp from '@/component/SajuChartGroupComp';
import EchartComp from '@/lib/EchartComp';
import SubTitleComp from '@/component/SubTitleComp';
import SipsinChartComp from '@/component/SipsinChartComp';
import SectionContents from '@/component/SectionContents';
import ColumnButtonChartComp from '@/component/ColumnButtonChartComp';
import IljuCharacterComp from '@/component/IljuCharacterComp';
import ElementBoxComp from '@/component/ElementBoxComp';

/** type & interface*/
import { ColumnItem } from '@/type/basicType';
import { OhaengStrengthData } from '@/type/ohaengDataInterface';
import { birthDataInterface } from '@/service/birthDataService';
import { DaeunData, SeunData } from '@/type/luckyDataInterface';

interface ChartData {
    value: number;
    name: string;
    itemStyle?: Record<string, any>;
    emphasis?: Record<string, any>;
}

const SmallContents = ({ title, children }: { title: string; children: ReactNode }) => {
    return (
        <div className="flex flex-1 flex-col w-full min-h-32 py-2 px-4 border rounded-2xl">
            <div className="text-sm font-bold py-1 px-1 border-b border-dashed">{title}</div>
            <div className="flex-1 flex justify-center items-center w-full">{children}</div>
        </div>
    );
};

//함께하면 좋은 친구 궁합

export default function DashboardPage() {
    const profileData = useDataStore((state) => state.profileData);
    const data = useDataStore((state) => state.data);

    const profileList = useMemo<Record<string, any>[]>(() => {
        if (!profileData) return [];

        const calendar = calculateCalendar(profileData);
        const solarDate = calendar?.getSolarCalendar();
        const lunarDate = calendar?.getLunarCalendar();

        return [
            {
                title: '성별',
                icon: <UserRoundIcon className="w-4" />,
                value: <span>{`${profileData.gender === 'M' ? '남성' : '여성'}`}</span>,
                prerequisite: true,
            },
            {
                title: '양력',
                icon: <SunIcon className="w-4" />,
                value: (
                    <span>
                        <span>
                            {solarDate &&
                                `${solarDate.year}-${String(solarDate.month).padStart(2, '0')}-${String(solarDate.day).padStart(2, '0')}`}
                        </span>
                        <span className="hidden ml-2 lg:inline">{`${profileData.birthtime ?? ''}`}</span>
                    </span>
                ),
                prerequisite: true,
            },
            {
                title: `음력${profileData.calendarType === 'leap' ? '(윤달)' : ''}`,
                icon: <MoonIcon className="w-4" />,
                value: (
                    <span>
                        <span>
                            {lunarDate &&
                                `${lunarDate.year}-${String(lunarDate.month).padStart(2, '0')}-${String(lunarDate.day).padStart(2, '0')}`}
                        </span>
                        <span className="hidden ml-2 lg:inline">{`${profileData.birthtime ?? ''}`}</span>
                    </span>
                ),
                prerequisite: true,
            },
            /*{
                title: '보정값',
                icon: <SparkleIcon className="w-3.5" />,
                value: (
                    <div className="flex flex-col gap-0.5">
                        <span className="flex items-center gap-2 border-b border-gray-900 font-bold dark:border-gray-50">
                            <span>
                                {`${data.birthData.solYear}-${data.birthData.solMonth}-${data.birthData.solDay}`}
                            </span>
                            <span>{`${data.birthData.time}`}</span>
                        </span>
                        <span className="text-mint-600 font-bold dark:text-mint-400">
                            {`( 지역보정: ${Math.trunc(data.birthData.deltaMinutes)}분 ${
                                data.birthData.summertimeMinutes
                                    ? ', 서머타임: ' +
                                      Math.trunc(data.birthData.summertimeMinutes) +
                                      '분'
                                    : ''
                            } )`}
                        </span>
                    </div>
                ),
                prerequisite: !data.info.timeNone,
            },*/
            {
                title: `도시`,
                icon: <MapPinnedIcon className="w-4" />,
                value: (
                    <span>{`${profileData.location.geo_name}/${profileData.location.alternate_name}`}</span>
                ),
                prerequisite: true,
            },
        ];
    }, [profileData]);

    const elementChartData = useMemo(() => {
        const elementListData = data?.ohaengStrength.ohaeng ?? [];
        const indicatorDefault = ['목', '수', '금', '토', '화'];
        const indicatorList: number[] = [];
        elementListData.forEach((item) => {
            indicatorDefault.forEach((indicatorItem, indicatorIdx) => {
                if (indicatorItem === item.element) {
                    indicatorList[indicatorIdx] = item.percent;
                }
            });
        });

        return {
            radar: {
                radius: '75%',
                center: ['50%', '55%'],
                indicator: indicatorDefault.map((item) => ({ name: item, max: 100 })),
            },
            series: [
                {
                    type: 'radar',
                    data: [
                        {
                            value: indicatorList,
                        },
                    ],
                },
            ],
        };
    }, [data]);

    const sipsinChartData = useMemo(() => {
        const elementListData = data?.ohaengStrength.ohaeng ?? [];
        const indicatorDefault = ['비겁', '식상', '재성', '인성', '관성'];
        const indicator1List: any[] = [];
        const indicator2List: any[] = [];

        elementListData.forEach((item) => {
            const sipsinList = item.sipsinDataList;

            indicatorDefault.forEach((indicatorItem, indicatorIdx) => {
                if (indicatorItem === item.sipsinGroup) {
                    indicator1List[indicatorIdx] = {
                        name: sipsinList[0].name,
                        value: sipsinList[0].percent,
                    };
                    indicator2List[indicatorIdx] = {
                        name: sipsinList[1].name,
                        value: sipsinList[1].percent,
                    };
                }
            });
        });

        return {
            legend: {
                show: false,
            },
            grid: [
                {
                    top: 16,
                    bottom: 32,
                },
            ],
            yAxis: {
                type: 'category',
                data: indicatorDefault,
            },
            series: [
                {
                    name: 'sipsin1',
                    type: 'bar',
                    stack: 'total',
                    barWidth: 16,
                    data: indicator1List,
                    showBackground: true,
                },
                {
                    name: 'sipsin2',
                    type: 'bar',
                    stack: 'total',
                    data: indicator2List,
                },
            ],
        };
    }, [data]);

    const smallContList = useMemo(() => {
        return [
            {
                title: '사주 온도(조후)',
                children: (
                    <div>
                        <div className="text-xl text-center font-extrabold">차고 습함</div>
                        <div className="text-sm text-center">온기가 필요</div>
                    </div>
                ),
            },
            {
                title: '발달 오행',
                children: (
                    <div className="flex flex-row justify-center items-center gap-2">
                        <div className={`flex flex-row justify-center items-center w-16 h-16`}>
                            {ohaeng.금.icon}
                        </div>
                        <div className={`flex flex-row justify-center items-center w-16 h-16`}>
                            {ohaeng.수.icon}
                        </div>
                    </div>
                ),
            },
            {
                title: '현재 대운',
                children: (
                    <div className="flex flex-row justify-center items-center gap-2">
                        <div className={`flex flex-row justify-center items-center`}>
                            <ElementBoxComp name={'무'} type="gan" size="small" />
                        </div>
                        <div className={`flex flex-row justify-center items-center`}>
                            <ElementBoxComp name={'신'} type="jiji" size="small" />
                        </div>
                    </div>
                ),
            },
            { title: '신강/신약', children: <div></div> },
        ];
    }, []);

    return (
        <div className="flex flex-1 flex-col justify-start items-start w-full gap-4 p-8 md:flex-row md:items-stretch">
            <aside className="flex flex-col w-full gap-4 rounded-2xl md:w-1/3">
                <article className="flex flex-2 flex-col justify-center items-center w-full min-h-88  p-6 gap-4 border rounded-2xl">
                    <div className="flex flex-col items-center">
                        <IljuCharacterComp
                            gan={'신'} //{data.chartCol.day.gan}
                            jiji={'유'} //{data.chartCol.day.jiji}
                        />
                        <span className="truncate w-full text-center text-xl font-extrabold mt-2">
                            {profileData?.nickName}
                        </span>
                        <span>
                            {
                                '임신년 임자월 신유일 계사시' /*`${data.chartCol.day.gan}${data.chartCol.day.jiji} 일주 (${ohaeng[cheongan[data.chartCol.day.gan].element].color} ${jiji[data.chartCol.day.jiji].animal})`*/
                            }
                        </span>
                    </div>
                    <div className="flex justify-center items-center w-full">
                        <ul className="flex flex-row w-full gap-1.5 md:flex-col">
                            {profileList &&
                                profileList.map((profileItem, profileIdx) => {
                                    return (
                                        profileItem.prerequisite && (
                                            <Fragment key={profileIdx}>
                                                <li className="flex flex-col w-1/4 text-nowrap text-sm md:flex-row md:w-full">
                                                    <span className="flex items-center w-22 font-bold text-gray-700 dark:text-gray-300">
                                                        {profileItem.icon && (
                                                            <span className="flex justify-start items-center w-4 h-4 mr-1">
                                                                {profileItem.icon}
                                                            </span>
                                                        )}
                                                        {profileItem.title}
                                                    </span>
                                                    <span>{profileItem.value}</span>
                                                </li>
                                            </Fragment>
                                        )
                                    );
                                })}
                        </ul>
                    </div>
                    <div className="w-full mt-2">
                        <button className="w-full medium button-bg-primary">프로필 수정</button>
                    </div>
                </article>
                <article className="flex-1 w-full min-h-40 rounded-2xl border"></article>
            </aside>
            <section className="flex flex-col w-full gap-4 md:w-2/3">
                <article className="flex flex-1 flex-row w-full gap-4">
                    {smallContList.map((item: Record<string, any>, idx: number) => (
                        <SmallContents key={idx} title={item.title}>
                            {item.children}
                        </SmallContents>
                    ))}
                </article>
                <article className="flex flex-2 flex-row w-full gap-4">
                    <div className="flex flex-1 flex-row min-h-60 p-4 gap-4 border  rounded-2xl ">
                        <div className="flex flex-col justify-between items-center w-1/4 h-full py-2 border border-dashed rounded-2xl">
                            {data?.ohaengStrength.ohaeng.map((item, idx) => {
                                return (
                                    <div
                                        key={idx}
                                        className="flex justify-center items-center w-9 h-9"
                                    >
                                        {item.score
                                            ? ohaeng[item.element].icon
                                            : ohaeng[item.element].iconDisable}
                                    </div>
                                );
                            })}
                        </div>
                        <div className="w-3/4 h-full">
                            <EchartComp chartType={'radar'} option={elementChartData} />
                        </div>
                    </div>
                    <div className="flex-1 min-h-56 p-4 border  rounded-2xl">
                        <EchartComp chartType={'rank_bar'} option={sipsinChartData} />
                    </div>
                </article>
                <article className="flex-2 w-full">
                    <div className="min-h-57 border rounded-2xl "></div>
                </article>
            </section>
        </div>
    );
}
