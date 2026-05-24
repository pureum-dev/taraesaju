'use client';

import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
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

import SajuChartGroupComp from '@/component/SajuChartGroupComp';
import EchartComp from '@/lib/EchartComp';
import SubTitleComp from '@/component/SubTitleComp';
import SipsinChartComp from '@/component/SipsinChartComp';
import SectionContents from '@/component/SectionContents';
import ColumnButtonChartComp from '@/component/ColumnButtonChartComp';
import IljuCharacterComp from '@/component/IljuCharacterComp';

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

const SajuKeyword = ({ children }: { children?: React.ReactNode }) => {
    return (
        <li className="py-1 px-4 rounded-2xl border border-background text-background text-nowrap">
            {'#'}
            {children}
        </li>
    );
};

const calculateInitialIdx = (
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

export default function ManseryeokPage() {
    const router = useRouter();
    const profileData = useDataStore((state) => state.profileData);
    const data = useDataStore((state) => state.data);
    const setModalData = useModalStore((state) => state.setModalData);

    const [isAdjustElement, setIsAdjustment] = useState(true);
    const [isElementBalance, setIsElementBalance] = useState<boolean>(
        () => data?.ohaengStrength.isBalanced ?? false,
    );
    const [elementListData, setElementListData] = useState<OhaengStrengthData[]>(
        () => data?.ohaengStrength.ohaeng ?? [],
    );
    const [targetDaeun, setTargetDaeun] = useState(() =>
        data && profileData ? calculateInitialIdx(profileData, data.daeun, data.seun).daeunIdx : 0,
    );
    const [targetSeun, setTargetSeun] = useState(() =>
        data && profileData ? calculateInitialIdx(profileData, data.daeun, data.seun).seunIdx : 0,
    );

    // useCallback
    const onChangeAdjustScore = useCallback(() => {
        if (data) {
            const ohaengStrength = checkOhaengStrength(data.chartCol, !isAdjustElement);
            setElementListData(ohaengStrength.ohaeng);
            setIsElementBalance(ohaengStrength.isBalanced);
            setIsAdjustment((prev) => !prev);
        }
    }, [data, isAdjustElement]);

    const onClickAddColumn = useCallback((index: number, type: 'daeun' | 'seun') => {
        if (type === 'daeun') {
            setTargetDaeun(index);
            setTargetSeun(0);
        } else {
            setTargetSeun(index);
        }
    }, []);

    const onClickCopyPrompt = () => {
        if (profileData && data) {
            setModalData({
                profileData: profileData,
                data: data,
                elementListData: elementListData,
                isElementBalance: isElementBalance,
                daeunIdx: calculateInitialIdx(profileData, data?.daeun, data?.seun).daeunIdx,
            });

            router.push('/manseryeok/modal');
        }
    };

    // useMemo
    const columnData = useMemo<ColumnItem[]>(() => {
        if (!data) return []; // data 없을 때 안전하게 처리

        return [
            {
                key: 'time',
                header: '시주',
                ...data.chartCol.time,
            },
            {
                key: 'day',
                header: '일주',
                ...data.chartCol.day,
            },
            {
                key: 'month',
                header: '월주',
                ...data.chartCol.month,
            },
            {
                key: 'year',
                header: '연주',
                ...data.chartCol.year,
            },
        ];
    }, [data]);

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

    const pointList = useMemo<Record<string, any>[]>(() => {
        if (!data) return [];

        return [
            {
                title: '공망',
                icon: null,
                value: (
                    <span>{`${jiji[data.point.gongmang[0]].hanja} (${data.point.gongmang[0]}), ${jiji[data.point.gongmang[1]].hanja} (${data.point.gongmang[1]})`}</span>
                ),
                prerequisite: true,
            },
            {
                title: '신강/신약',
                icon: null,
                value: <span>{`${data.point.strength.strengthType}사주`}</span>,
                prerequisite: true,
            },
            {
                title: '득령 | 득지',
                icon: null,
                value: (
                    <span className="flex items-center gap-1">
                        {data.point.deukryung ? (
                            <CheckCircleIcon className="w-4 text-mint-500 stroke-mint-500" />
                        ) : (
                            <CircleXIcon className="w-4 text-gray-300 stroke-gray-300" />
                        )}
                        |
                        {data.point.deukji ? (
                            <CheckCircleIcon className="w-4 text-mint-500 stroke-mint-500" />
                        ) : (
                            <CircleXIcon className="w-4 text-gray-300 stroke-gray-300" />
                        )}
                    </span>
                ),
                prerequisite: true,
            },
            {
                title: '삼재연도',
                icon: null,
                value: (
                    <span className="flex items-center gap-1">
                        {data.point.samjae ? data.point.samjae.join(', ') : '-'}
                    </span>
                ),
                prerequisite: true,
            },
        ];
    }, [data]);

    const sinsalColumnData = useMemo<ColumnItem[]>(() => {
        if (!data) return []; // data 없을 때 안전하게 처리

        return [
            {
                key: 'time',
                header: '시주',
                ...data.sinsal.time,
            },
            {
                key: 'day',
                header: '일주',
                ...data.sinsal.day,
            },
            {
                key: 'month',
                header: '월주',
                ...data.sinsal.month,
            },
            {
                key: 'year',
                header: '연주',
                ...data.sinsal.year,
            },
        ];
    }, [data]);

    const daeunColumnData = useMemo<ColumnItem[]>(() => {
        if (!data) return []; // data 없을 때 안전하게 처리

        const daeunList = [...data.daeun];
        const columnList = daeunList.map((item, idx) => {
            return {
                key: String(idx),
                ...item,
            };
        });

        return columnList;
    }, [data]);

    const seunColumnData = useMemo<ColumnItem[]>(() => {
        if (!data) return []; // data 없을 때 안전하게 처리

        const seunList = [...data.seun[targetDaeun]];
        const columnList = seunList.map((item, idx) => {
            return {
                key: String(idx),
                ...item,
            };
        });

        return columnList;
    }, [data, targetDaeun]);

    const elementChartData = useMemo(() => {
        const elementList: OhaengStrengthData[] = elementListData ?? [];

        //오행 배열 구하기
        const ohaengChartArr: ChartData[] = elementList.map((item) => {
            let colorVar = '';
            let emphasisColorVar = '';

            switch (ohaeng[item.element].color) {
                case '검은':
                    colorVar = `--color-gray-800`;
                    emphasisColorVar = `--color-gray-600`;
                    break;
                case '하얀':
                    colorVar = `--color-gray-200`;
                    emphasisColorVar = `--color-gray-300`;
                    break;
                case '붉은':
                    colorVar = `--color-coral-500`;
                    emphasisColorVar = `--color-coral-400`;
                    break;
                case '푸른':
                    colorVar = `--color-greenmint-500`;
                    emphasisColorVar = `--color-greenmint-400`;
                    break;
                default:
                    colorVar = `--color-lemon-500`;
                    emphasisColorVar = `--color-lemon-400`;
                    break;
            }

            return {
                value: item.score,
                name: item.element,
                itemStyle: {
                    color: getCSSVariable(`${colorVar}`),
                },
                emphasis: {
                    itemStyle: {
                        color: getCSSVariable(`${emphasisColorVar}`),
                    },
                },
            };
        });

        return ohaengChartArr;
    }, [elementListData]);

    const summaryData = useMemo(() => {
        const dupArr = [
            data?.chartCol.year.ganDuplication,
            data?.chartCol.year.jijiDuplication,
            data?.chartCol.month.ganDuplication,
            data?.chartCol.month.jijiDuplication,
            data?.chartCol.day.ganDuplication,
            data?.chartCol.day.jijiDuplication,
            data?.chartCol.time?.ganDuplication,
            data?.chartCol.time?.jijiDuplication,
        ];

        const dupSet = new Set<string>();
        dupArr.forEach((item) => item && dupSet.add(item));

        const pointList = [...dupSet];
        elementListData.forEach((item) => {
            if (item.percent >= 37.5) pointList.push(`${item.element} 과다`);
            else if (item.percent === 0) pointList.push(`${item.element} 부족`);
        });

        return (
            data && (
                <>
                    {pointList.map(
                        (item, idx) => item && <SajuKeyword key={`${idx}`}>{item}</SajuKeyword>,
                    )}
                </>
            )
        );
    }, [data, elementListData]);

    // useEffect
    useEffect(() => {
        if (data === null || profileData === null) {
            router.back();
        }
    }, [data, profileData]);

    return (
        data && (
            <div className="flex flex-1 flex-col justify-start items-start w-full gap-8 p-8  md:items-stretch">
                <section className="flex flex-col gap-4 md:flex-row">
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
                            <div className="w-full">
                                <button className="w-full medium button-bg-primary">
                                    프로필 수정
                                </button>
                            </div>
                        </article>
                        <article className="flex-1 w-full min-h-40 rounded-2xl border">
                            <ul className="flex flex-col gap-1.5 w-full p-6  ">
                                {pointList &&
                                    pointList.map((infoItem, infoIdx) => {
                                        return (
                                            infoItem.prerequisite && (
                                                <li key={infoIdx} className="flex text-sm">
                                                    <span className="flex items-center w-22 font-bold text-gray-700 dark:text-gray-300">
                                                        {infoItem.icon && (
                                                            <span className="flex justify-start items-center w-4 h-4 mr-1">
                                                                {infoItem.icon}
                                                            </span>
                                                        )}
                                                        {infoItem.title}
                                                    </span>
                                                    <span>{infoItem.value}</span>
                                                </li>
                                            )
                                        );
                                    })}
                            </ul>
                        </article>
                    </aside>
                    <article className="flex flex-col w-full gap-8 md:gap-4 md:w-2/3">
                        {/* 사주 차트 */}
                        <div className="w-full">
                            <SajuChartGroupComp columnData={columnData} />
                        </div>
                        {/** 내 사주 한 줄 요약 */}
                        <div className="overflow-hidden flex justify-start items-center w-full h-20 p-6 bg-mint-400 rounded-2xl">
                            <ul className="flex flex-wrap flex-row gap-2 text-sm rounded-2xl">
                                <SajuKeyword>
                                    {data.chartCol.day.gan + data.chartCol.day.jiji + '일주'}
                                </SajuKeyword>
                                <SajuKeyword>
                                    {data.point.strength.strengthType + '사주'}
                                </SajuKeyword>
                                <SajuKeyword>
                                    {isElementBalance ? '오행 균형(오행구족)' : '오행 불균형'}
                                </SajuKeyword>
                                {summaryData}
                            </ul>
                        </div>
                    </article>
                </section>
                <section className="flex flex-col w-full gap-8">
                    {/** 오행 / 십성 */}
                    <article className="flex flex-col w-full gap-8 lg:flex-row ">
                        <div className="flex flex-col w-full h-full lg:w-1/2">
                            <SectionContents
                                title={'오행 분석'}
                                icon={<PentagonIcon />}
                                titleSide={
                                    <div className="flex items-center text-sm">
                                        <input
                                            type="checkbox"
                                            id="adjustScore"
                                            name="adjustScore"
                                            checked={isAdjustElement}
                                            onChange={onChangeAdjustScore}
                                        />
                                        <label htmlFor="adjustScore">궁성 보정</label>
                                    </div>
                                }
                            >
                                <div className="flex flex-col w-full h-90">
                                    <div className="flex grow">
                                        <div className="w-1/2 h-full">
                                            <EchartComp chartType={'pie'} data={elementChartData} />
                                        </div>
                                        <div className="flex justify-center items-center w-1/2 h-full bg-mint-50 border border-background rounded-2xl ">
                                            <div className="flex flex-col w-full h-full">
                                                {elementListData.map((item, idx) => {
                                                    return (
                                                        <div
                                                            key={idx}
                                                            className={`flex w-full h-1/5 border-background  ${
                                                                idx !==
                                                                    elementListData.length - 1 &&
                                                                'border-b'
                                                            }`}
                                                        >
                                                            <div
                                                                className={`flex flex-1 justify-center items-center h-full border-r border-background `}
                                                            >
                                                                <div className="w-12 h-12">
                                                                    {ohaeng[item.element].icon}
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-1 justify-center items-center h-full border-r border-background  text-sm">
                                                                {item.percent
                                                                    ? item.percent.toFixed(1) + '%'
                                                                    : '-'}
                                                            </div>
                                                            <div className="flex flex-2 flex-col h-full">
                                                                {item.sipsinDataList.map(
                                                                    (sipsinItem, sipsinIdx) => {
                                                                        return (
                                                                            <div
                                                                                key={sipsinIdx}
                                                                                className={`flex flex-row w-full h-1/2 border-background  ${sipsinIdx === 0 && 'border-b'}`}
                                                                            >
                                                                                <div className="flex flex-1 justify-center items-center border-background  text-sm border-r">
                                                                                    {
                                                                                        sipsinItem?.name
                                                                                    }
                                                                                </div>
                                                                                <div className="flex flex-1 justify-center items-center text-sm">
                                                                                    {sipsinItem.percent
                                                                                        ? sipsinItem.percent.toFixed(
                                                                                              1,
                                                                                          ) + '%'
                                                                                        : '-'}
                                                                                </div>
                                                                            </div>
                                                                        );
                                                                    },
                                                                )}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SectionContents>
                        </div>
                        <div className="flex flex-col w-full h-full lg:w-1/2">
                            <SectionContents title={'신살 분석'} icon={<GhostIcon />}>
                                <div className="flex w-full h-90">
                                    <SipsinChartComp columnData={sinsalColumnData} />
                                </div>
                            </SectionContents>
                        </div>
                    </article>
                    {/** 대운 */}
                    <article className="flex flex-col w-full">
                        <SubTitleComp
                            title={`대운 - 대운 수 : ${data?.daeun[0].daeunNum}`}
                            icon={<CloverIcon />}
                        />
                        <div className="flex w-full">
                            <ColumnButtonChartComp
                                columnData={daeunColumnData}
                                defaultColumn={targetDaeun}
                                type="daeun"
                                addEvent={onClickAddColumn}
                            />
                        </div>
                    </article>
                    {/** 세운 */}
                    <article className="flex flex-col w-full">
                        <SubTitleComp title={`세운`} icon={<ClubIcon />} />
                        <div className="flex w-full">
                            <ColumnButtonChartComp
                                columnData={seunColumnData}
                                defaultColumn={targetSeun}
                                type="seun"
                                addEvent={onClickAddColumn}
                            />
                        </div>
                    </article>
                </section>
            </div>
        )
    );
}
