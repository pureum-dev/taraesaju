'use client';

import { ChangeEvent, Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

/** lib */
import dayjs from 'dayjs';
import KoreanLunarCalendar from 'korean-lunar-calendar';
import {
    UserRoundIcon,
    SunIcon,
    MoonIcon,
    SparkleIcon,
    ZapIcon,
    HeartIcon,
    CheckCircleIcon,
    CircleXIcon,
    MapPinnedIcon,
    FileTextIcon,
    MessageSquareTextIcon,
} from 'lucide-react';
import { useDataStore } from '@/lib/store/useDataStore';

/** Custom */
import { cheongan } from '@/common/const/cheonganConst';
import { jiji } from '@/common/const/jijiConst';
import { ohaeng } from '@/common/const/ohaengConst';
import SajuChartGroupComp from '@/component/SajuChartGroupComp';
import EchartComp from '@/lib/EchartComp';
import SubTitleComp from '@/component/SubTitleComp';
import SipsinChartComp from '@/component/SipsinChartComp';

/** type & interface*/
import { CheonganType, ColumnItem, JijiType, RowItem } from '@/type/basicType';
import ColumnButtonChartComp from '@/component/ColumnButtonChartComp';

export default function ManseryeokPage() {
    const profileData = useDataStore((state) => state.profileData);
    const data = useDataStore((state) => state.data);

    const [isAdjustElement, setIsAdjustment] = useState(false);
    const [elementChartData, setElementChartData] = useState([]);
    const [targetDaeun, setTargetDaeun] = useState(0);
    const [targetSeun, setTargetSeun] = useState(0);

    const onChangeAdjustScore = () => {};

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

        const solarDate = calendar.getSolarCalendar();
        const lunarDate = calendar.getLunarCalendar();

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
                        <span>{`${solarDate.year}-${solarDate.month}-${solarDate.day}`}</span>
                        <span className="hidden ml-2 lg:inline">{`${profileData.birthtime}`}</span>
                    </span>
                ),
                prerequisite: true,
            },
            {
                title: `음력${profileData.calendarType === 'leap' ? '(윤달)' : ''}`,
                icon: <MoonIcon className="w-4" />,
                value: (
                    <span>
                        <span>{`${lunarDate.year}-${lunarDate.month}-${lunarDate.day}`}</span>
                        <span className="hidden ml-2 lg:inline">{`${profileData.birthtime}`}</span>
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
                key: idx,
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
                key: idx,
                ...item,
            };
        });

        return columnList;
    }, [data, targetDaeun]);

    const addColumnClickEvent = useCallback(() => {}, []);

    console.log(data);

    return data ? (
        <div className="flex flex-col w-full p-8 gap-8">
            {/**  상단 인적 정보 + 사주 차트 **/}
            <section className="flex flex-col gap-8 lg:flex-row lg:justify-between">
                {/* 기본 정보 */}
                <article className="flex flex-wrap flex-row items-start gap-8 py-6 px-4 bg-gray-100 rounded-2xl lg:flex-col lg:w-1/3 lg:items-center dark:bg-gray-900">
                    <div
                        className={`flex justify-center items-center w-32 h-32 p-2 rounded-full bg-white md:w-36 md:h-36 md:p-3 `}
                    >
                        <Image
                            src={`/svg/character/${
                                data.chartCol.day.gan + data.chartCol.day.jiji
                            }.svg`}
                            width={140}
                            height={140}
                            alt="일주 동물 이미지"
                            unoptimized
                        />
                    </div>
                    <div className="flex grow flex-col lg:w-full">
                        <div className="flex flex-row items-baseline mb-4 lg:flex-col lg:items-center lg:mb-6">
                            <span className="mr-2 text-xl font-extrabold lg:mr-0">
                                {profileData?.nickName}
                            </span>
                            <span>{`${data.chartCol.day.gan}${data.chartCol.day.jiji} 일주 (${ohaeng[cheongan[data.chartCol.day.gan].element].color} ${jiji[data.chartCol.day.jiji].animal})`}</span>
                        </div>
                        <div className="flex flex-row items-center gap-6 lg:flex-col lg:w-full lg:items-start">
                            <ul className="flex flex-col gap-1.5 w-1/2 lg:w-full">
                                {profileList &&
                                    profileList.map((profileItem, profileIdx) => {
                                        return (
                                            profileItem.prerequisite && (
                                                <Fragment key={profileIdx}>
                                                    <li className="flex flex-wrap text-nowrap text-sm">
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
                            <ul className="hidden flex-col gap-1.5 w-1/2 p-4 border-2 border-background rounded-xl md:flex lg:w-full">
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
                        </div>
                    </div>
                </article>
                {/* 사주 차트 */}
                <article className="w-full p-4 lg:w-2/3">
                    <SajuChartGroupComp columnData={columnData} />
                </article>
            </section>
            {/** 내 사주 한 줄 요약 */}
            {/*<SectionContents
                icon={<FileTextIcon />}
                title={`사주 한 줄 요약`}
                titleSide={
                    <button
                        className="flex flex-nowrap gap-2 medium bg-primary"
                        onClick={onClickCopyPrompt}
                    >
                        <MessageSquareTextIcon className="w-4" />
                        AI용 프롬프트 복사
                    </button>
                }
                className="flex flex-col w-full bg-gray-100 dark:bg-gray-900"
            >
                <ul className="flex flex-wrap flex-row gap-2 w-full font-bold rounded-2xl">
                    <SajuKeyword>
                        {data.chartCol.day.solartermData.name +
                            data.chartCol.day.earthyBranchesData.name +
                            '일주'}
                    </SajuKeyword>
                    <SajuKeyword>{data.strength.strengthType + '사주'}</SajuKeyword>
                    <SajuKeyword>
                        {data.ohaeng.hasAllElements ? '오행 균형(오행구족)' : '오행 불균형'}
                    </SajuKeyword>
                    {mainElementList.length > 0 &&
                        mainElementList.map((item, idx) => (
                            <SajuKeyword key={'main_element_' + idx}>
                                {item.name + item.standard}
                            </SajuKeyword>
                        ))}
                    {data.point.duplication.solarterm.length > 0 &&
                        data.point.duplication.solarterm.map((item: string, idx: number) => (
                            <SajuKeyword key={'sol_dup_' + idx}>{item}</SajuKeyword>
                        ))}
                    {data.point.duplication.earthyBranches.length > 0 &&
                        data.point.duplication.earthyBranches.map((item: string, idx: number) => (
                            <SajuKeyword key={'sol_dup_' + idx}>{item}</SajuKeyword>
                        ))}
                    {uniqueSinsalList.length > 0 &&
                        uniqueSinsalList.map((item, idx) => (
                            <SajuKeyword key={'sinsal_' + idx}>{item}</SajuKeyword>
                        ))}
                </ul>
            </SectionContents>*/}

            {/** 오행 / 십성 */}
            <section className="flex flex-col w-full gap-8 lg:flex-row ">
                <article className="flex flex-col w-full h-full lg:w-1/2">
                    <SubTitleComp text={'오행 분석'} />

                    <div className="flex flex-col w-full h-90">
                        <div className="flex justify-end pb-3">
                            <div className="flex flex-nowrap items-center">
                                <input
                                    type="checkbox"
                                    id="adjustScore"
                                    name="adjustScore"
                                    checked={isAdjustElement}
                                    onChange={onChangeAdjustScore}
                                />
                                <label htmlFor="adjustScore">궁성 보정</label>
                            </div>
                        </div>
                        <div className="flex grow">
                            <div className="w-1/2 h-full">
                                <EchartComp chartType={'pie'} data={elementChartData} />
                            </div>
                            <div className="flex justify-center items-center w-1/2 h-full border rounded-2xl ">
                                <div className="flex flex-col w-full h-full">
                                    {data.ohaengStrength.map((item, idx) => {
                                        return (
                                            <div
                                                key={idx}
                                                className={`flex w-full h-1/5  ${
                                                    idx !== data.ohaengStrength.length - 1 &&
                                                    'border-b'
                                                }`}
                                            >
                                                <div className="flex flex-1 justify-center items-center h-full border-r ">
                                                    <span>
                                                        {item.element}
                                                        <span>{``}</span>
                                                    </span>
                                                </div>
                                                <div className="flex flex-1 justify-center items-center h-full border-r text-sm">
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
                                                                    className={`flex flex-row w-full h-1/2 ${sipsinIdx === 0 && 'border-b'}`}
                                                                >
                                                                    <div className="flex flex-1 justify-center items-center border-r">
                                                                        {sipsinItem?.name}
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
                </article>
                <article className="flex flex-col w-full h-full lg:w-1/2">
                    <SubTitleComp text={'신살 분석'} />
                    <div className="flex w-full h-90">
                        {<SipsinChartComp columnData={sinsalColumnData} />}
                    </div>
                </article>
            </section>

            {/** 대운 */}
            <section className="flex flex-col w-full">
                <SubTitleComp text={`대운 - 대운 수 : ${data?.daeun[0].daeunNum}`} />
                <div className="flex w-full">
                    <ColumnButtonChartComp
                        columnData={daeunColumnData}
                        defaultColumn={targetDaeun}
                        type="daeun"
                        addEvent={addColumnClickEvent}
                    />
                </div>
            </section>

            {/** 세운 */}
            <section className="flex flex-col w-full">
                <SubTitleComp text={`세운`} />
                <div className="flex w-full">
                    <ColumnButtonChartComp
                        columnData={seunColumnData}
                        defaultColumn={targetSeun}
                        type="seun"
                        addEvent={addColumnClickEvent}
                    />
                </div>
            </section>
        </div>
    ) : (
        <div></div>
    );
}
