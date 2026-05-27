'use client';

import { ReactNode, useCallback, useMemo, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

/** lib */
import { useDataStore } from '@/lib/store/useDataStore';

/** Custom */
import { ohaeng } from '@/common/const/ohaengConst';

import { calculateInitialIdx } from '@/util/commonFunc';

import EchartComp from '@/lib/EchartComp';
import ElementBoxComp from '@/component/ElementBoxComp';
import AsideContents from '@/component/AsideContents';

/** type & interface*/
import { OhaengStrengthData } from '@/type/ohaengDataInterface';

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
    const router = useRouter();
    const profileData = useDataStore((state) => state.profileData);
    const data = useDataStore((state) => state.data);

    const [elementListData, setElementListData] = useState<OhaengStrengthData[]>(
        () => data?.ohaengStrength.ohaeng ?? [],
    );

    const onChangeAdjustScore = useCallback(
        (adjustData: { isBalanced: boolean; ohaeng: OhaengStrengthData[] }) => {
            setElementListData(adjustData.ohaeng);
        },
        [],
    );

    const elementChartData = useMemo(() => {
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
    }, [elementListData]);

    const sipsinChartData = useMemo(() => {
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
    }, [elementListData]);

    const smallContList = useMemo(() => {
        const targetDaeunIdx =
            profileData && data
                ? calculateInitialIdx(profileData, data.daeun, data.seun).daeunIdx
                : 0;
        const targetDaeun = data ? data.daeun[targetDaeunIdx] : null;

        let overElement = elementListData.filter((item) => item.standard === '과다');
        console.log(elementListData);
        if (overElement.length === 0) {
            overElement =
                elementListData.length > 0
                    ? [
                          elementListData.reduce((prev, current) =>
                              prev.score > current.score ? prev : current,
                          ),
                      ]
                    : [];
        }
        return [
            {
                title: '사주 온도(조후)',
                children: (
                    <div>
                        <div className="text-lg text-center font-extrabold">
                            {data?.ohaengTemp.name}
                        </div>
                        <div className="text-sm text-center">온기가 필요</div>
                    </div>
                ),
            },
            {
                title: '발달 오행',
                children: (
                    <div className="flex flex-row justify-center items-center gap-2">
                        {overElement.map((item) => (
                            <div
                                key={item.element}
                                className={`flex flex-row justify-center items-center w-18 h-18`}
                            >
                                {ohaeng[item.element].icon}
                            </div>
                        ))}
                    </div>
                ),
            },
            {
                title: '현재 대운',
                children: targetDaeun && (
                    <div className="flex flex-row justify-center items-center gap-2">
                        <div className={`flex flex-row justify-center items-center`}>
                            <ElementBoxComp name={targetDaeun.gan} type="gan" size="small" />
                        </div>
                        <div className={`flex flex-row justify-center items-center`}>
                            <ElementBoxComp name={targetDaeun.jiji} type="jiji" size="small" />
                        </div>
                    </div>
                ),
            },
            {
                title: '신강/신약',
                children: (
                    <div className="text-lg text-center font-extrabold">
                        {data?.point.strength.strengthType}
                    </div>
                ),
            },
        ];
    }, [data, elementListData, profileData]);

    // useEffect
    useEffect(() => {
        if (data === null || profileData === null) {
            router.push('/');
        }
    }, [data, profileData]);

    return (
        data && (
            <div className="flex flex-1 flex-col justify-start items-start w-full gap-4 p-8 md:flex-row md:items-stretch">
                <AsideContents
                    profileData={profileData}
                    className="md:w-1/3"
                    data={data}
                    onChangeScore={onChangeAdjustScore}
                >
                    <div></div>
                </AsideContents>
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
        )
    );
}
