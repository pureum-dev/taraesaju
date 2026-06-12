'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

/** lib */
import {
    CheckCircleIcon,
    CircleXIcon,
    PentagonIcon,
    CloverIcon,
    GhostIcon,
    ClubIcon,
} from 'lucide-react';
import { useDataStore } from '@/common/lib/store/useDataStore';

/** Custom */
import { jiji } from '@/common/const/jijiConst';
import { ohaeng } from '@/common/const/ohaengConst';

import { getCSSVariable } from '@/common/util/colorFunc';
import { calculateInitialIdx } from '@/common/util/commonFunc';

import SajuChartGroupComp from '@/common/component/SajuChartGroupComp';
import EchartComp from '@/common/lib/EchartComp';
import SubTitleComp from '@/common/component/SubTitleComp';
import SipsinChartComp from '@/common/component/SipsinChartComp';
import SectionContents from '@/common/component/SectionContents';
import ColumnButtonChartComp from '@/common/component/ColumnButtonChartComp';
import AsideContents from '@/common/component/AsideContents';

/** type & interface*/
import { ColumnItem } from '@/common/type/basicType';
import { OhaengStrengthEachData } from '@/common/type/ohaengDataInterface';
import { OheangChangeInterface } from '@/client/ohaengDataService';

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

export default function ManseryeokPage() {
    const router = useRouter();
    const profileData = useDataStore((state) => state.profileData);
    const data = useDataStore((state) => state.data);

    const [isElementBalance, setIsElementBalance] = useState<boolean>(
        () => data?.ohaengStrength.isBalanced ?? false,
    );
    const [elementListData, setElementListData] = useState<OhaengStrengthEachData[]>(
        () => data?.ohaengStrength.ohaeng ?? [],
    );
    const [targetDaeun, setTargetDaeun] = useState(() =>
        data && profileData ? calculateInitialIdx(profileData, data.daeun, data.seun).daeunIdx : 0,
    );
    const [targetSeun, setTargetSeun] = useState(() =>
        data && profileData ? calculateInitialIdx(profileData, data.daeun, data.seun).seunIdx : 0,
    );

    const onChangeAdjustScore = useCallback((adjustData: OheangChangeInterface) => {
        setElementListData(adjustData.ohaengStrength.ohaeng);
        setIsElementBalance(adjustData.ohaengStrength.isBalanced);
    }, []);

    const onClickAddColumn = useCallback((index: number, type: 'daeun' | 'seun') => {
        if (type === 'daeun') {
            setTargetDaeun(index);
            setTargetSeun(0);
        } else {
            setTargetSeun(index);
        }
    }, []);

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
                value: <span>{`${data.ohaengStrength.strengthType}사주`}</span>,
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
        const elementList: OhaengStrengthEachData[] = elementListData ?? [];

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
            router.push('/');
        }
    }, [data, profileData]);

    return (
        data && (
            <div className="flex flex-1 flex-col justify-start items-start w-full gap-8 p-8  md:items-stretch">
                <section className="flex flex-col gap-4 md:flex-row">
                    <AsideContents
                        profileData={profileData}
                        className="md:w-1/3"
                        data={data}
                        onChangeScore={onChangeAdjustScore}
                    >
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
                    </AsideContents>
                    <article className="flex flex-col w-full gap-8 md:gap-4 md:w-2/3">
                        {/* 사주 차트 */}
                        <div className="w-full">
                            <SajuChartGroupComp columnData={columnData} />
                        </div>
                        {/** 내 사주 한 줄 요약 */}
                        <div className="overflow-hidden flex justify-start items-center w-full h-20 p-6 bg-mint-400 rounded-2xl dark:bg-mint-700">
                            <ul className="flex flex-wrap flex-row gap-2 text-sm rounded-2xl">
                                <SajuKeyword>
                                    {data.chartCol.day.gan + data.chartCol.day.jiji + '일주'}
                                </SajuKeyword>
                                <SajuKeyword>
                                    {data.ohaengStrength.strengthType + '사주'}
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
                            <SectionContents title={'오행 분석'} icon={<PentagonIcon />}>
                                <div className="flex flex-col w-full h-90">
                                    <div className="flex grow">
                                        <div className="w-1/2 h-full">
                                            <EchartComp chartType={'pie'} data={elementChartData} />
                                        </div>
                                        <div className="flex justify-center items-center w-1/2 h-full bg-mint-50 border border-background rounded-2xl dark:bg-mint-900">
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
