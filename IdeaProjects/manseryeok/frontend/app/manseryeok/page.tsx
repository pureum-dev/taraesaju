'use client';

import { ChangeEvent, Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

/** lib */
import dayjs from 'dayjs';
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
import { cheongan, ohaeng, jiji, division24, woonsung } from '@/common/const';
import { makeBgColor, textColor } from '@/util/colorFunc';
import SajuChart from '@/component/SajuChart';
import ElementBoxComp from '@/component/ElementBoxComp';

/** type & interface*/
import { ColumnItem, jijiType, RowItem } from '@/type/basicType';
import { birthAllDataInterface, relationInterface } from '@/type/birthDataInterface';

/*const data: birthAllDataInterface = {
    chartCol: {
        year: {
            gan: '갑',
            jiji: '자',
            ganRelation: [
                {
                    name: '천간합',
                    isClose: true,
                    columnName: '년_월',
                },
            ],
            jijiRelation: [],
            woonsung: '-',
            sinsal: '',
        },
        month: {
            gan: '갑',
            jiji: '자',
            ganRelation: [
                {
                    name: '천간합',
                    isClose: true,
                    columnName: '년_월',
                },
            ],
            jijiRelation: [],
            woonsung: '장성',
            sinsal: '',
        },
        day: {
            gan: '갑',
            jiji: '자',
            ganRelation: [],
            jijiRelation: [],
            woonsung: '장성',
            sinsal: '',
        },
        time: {
            gan: '갑',
            jiji: '자',
            ganRelation: [],
            jijiRelation: [],
            woonsung: '장성',
            sinsal: '',
        },
    },
};*/

export default function ManseryeokPage() {
    const profileData = useDataStore((state) => state.profileData);
    const data = useDataStore((state) => state.data);

    const columnData = useMemo<ColumnItem[]>(() => {
        if (!data) return []; // data 없을 때 안전하게 처리

        return [
            {
                key: 'rowHeader',
                header: '',
                ganRealtion: '천간 합/충',
                ganSipsin: '천간십성',
                gan: '천간',
                jiji: '지지',
                jijiSipsin: '지지십성',
                jijiRealtion: '지지 합/충',
                jijanggan: '지장간',
                woonsung: '십이운성',
                sinsal: '십이신살',
            },
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

    const rowData = useMemo<RowItem[]>(() => {
        if (!data) return []; // data 없을 때 안전하게 처리

        return [
            {
                key: 'header',
                className: 'text-sm',
            },
            {
                key: 'ganRealtion',
                className: '',
                cellRender: (col) => {
                    const list: relationInterface[] = col.ganRelation ?? [];
                    return (
                        <div className="flex flex-col items-center">
                            {list.length !== 0
                                ? list.map((item, idx) => (
                                      <div key={idx} className="flex items-center">
                                          {item.name.includes('합') ? (
                                              <HeartIcon className="w-3 h-3 mr-0.5" />
                                          ) : (
                                              <ZapIcon className="w-3 h-3 mr-0.5" />
                                          )}
                                          {item.name}
                                      </div>
                                  ))
                                : '-'}
                        </div>
                    );
                },
            },
            {
                key: 'ganSipsin',
                className: '',
            },
            {
                key: 'gan',
                className: '',
                cellRender: (col) => {
                    return <ElementBoxComp name={col.gan ?? ''} type="gan" />;
                },
            },
            {
                key: 'jiji',
                className: '',
                cellRender: (col) => {
                    return <ElementBoxComp name={col.jiji ?? ''} type="jiji" />;
                },
            },

            {
                key: 'jijanggan',
                className: '',
                cellRender: (col) => {
                    const jijanggan = col.jiji ? jiji[col.jiji as jijiType].jijanggan : [];
                    return jijanggan ? (
                        jijanggan.map((item, idx) => (
                            <div
                                key={idx}
                                className={`flex justify-center items-center w-6 h-6 m-0.5 rounded-full font-bold ${makeBgColor(col.jiji, 'jiji')} ${textColor(col.jiji, 'jiji')}`}
                            >
                                {item}
                            </div>
                        ))
                    ) : (
                        <div></div>
                    );
                },
            },
            {
                key: 'jijiSipsin',
                className: '',
            },
            {
                key: 'jijiRealtion',
                className: '',
                cellRender: (col) => {
                    const list: relationInterface[] = col.jijiRealtion ?? [];
                    return (
                        <div className="flex flex-col items-center">
                            {list.length !== 0
                                ? list.map((item, idx) => (
                                      <div key={idx} className="flex items-center">
                                          {item.name.includes('합') ? (
                                              <HeartIcon className="w-3 h-3 mr-0.5" />
                                          ) : (
                                              <ZapIcon className="w-3 h-3 mr-0.5" />
                                          )}
                                          {item.name}
                                      </div>
                                  ))
                                : '-'}
                        </div>
                    );
                },
            },
            {
                key: 'woonsung',
                className: '',
            },
            {
                key: 'sinsal',
                className: '',
            },
        ];
    }, [data]);

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
                            <span className="mr-2 text-xl font-extrabold lg:mr-0"></span>
                            <span>{`${data.chartCol.day.gan}${data.chartCol.day.jiji} 일주 (${ohaeng[cheongan[data.chartCol.day.gan].element].color} ${jiji[data.chartCol.day.jiji].animal})`}</span>
                        </div>
                        <div className="flex flex-row items-center gap-6 lg:flex-col lg:w-full lg:items-start">
                            <ul className="flex flex-col gap-1.5 w-1/2 lg:w-full">
                                {/*infoList &&
                                    infoList.map((infoItem, infoIdx) => {
                                        return (
                                            infoItem.prerequisite && (
                                                <Fragment key={infoIdx}>
                                                    <li className="flex flex-wrap text-nowrap text-sm">
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
                                                </Fragment>
                                            )
                                        );
                                    })*/}
                            </ul>
                            <ul className="hidden flex-col gap-1.5 w-1/2 p-4 border-2 border-background rounded-xl md:flex lg:w-full">
                                {/*pointList &&
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
                                    })*/}
                            </ul>
                        </div>
                    </div>
                </article>
                {/* 사주 차트 */}
                <article className="w-full p-4 lg:w-2/3">
                    <SajuChart columnData={columnData} rowData={rowData} />
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
            {/*<section className="flex flex-col w-full gap-8 md:flex-row ">
                <article className="flex flex-col w-full h-full lg:w-1/2">
                    {subTitleDiv('오행 분석')}

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
                                    {elementTableData.map((item, idx) => {
                                        return (
                                            <div
                                                key={'row_' + idx}
                                                className={`flex w-full h-1/5 font-extrabold ${
                                                    idx !== elementTableData.length - 1 &&
                                                    'border-b'
                                                } ${
                                                    item.name === '목' &&
                                                    'text-greenmint-500 dark:text-greenmint-400'
                                                }
                                                ${
                                                    item.name === '화' &&
                                                    'text-coral-500 dark:text-coral-400'
                                                }
                                                ${
                                                    item.name === '토' &&
                                                    'text-lemon-500 dark:text-lemon-400'
                                                }
                                                ${
                                                    item.name === '금' &&
                                                    'text-gray-500 dark:text-gray-100'
                                                }
                                                ${
                                                    item.name === '수' &&
                                                    'text-gray-900 dark:text-gray-400'
                                                }`}
                                            >
                                                <div className="flex justify-center items-center w-1/2 h-full border-r ">
                                                    <span>
                                                        {item.name}
                                                        <span>{`(${
                                                            ELEMENT_HANJA[item.name]
                                                        })`}</span>
                                                    </span>
                                                </div>
                                                <div className="flex justify-center items-center w-1/2 h-full ">
                                                    {item.percent
                                                        ? item.percent.toFixed(1) + '%'
                                                        : '-'}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="flex flex-col w-full h-full border-l  ">
                                    {sipsinTableData.map((item, idx) => {
                                        return (
                                            <div
                                                key={'row_' + idx}
                                                className={`flex w-full h-1/10 ${
                                                    idx !== sipsinTableData.length - 1 && 'border-b'
                                                }  text-sm`}
                                            >
                                                <div className="flex justify-center items-center w-1/2 h-full border-r ">
                                                    <span>{item.name}</span>
                                                </div>
                                                <div className="flex justify-center items-center w-1/2 h-full ">
                                                    {item.percent
                                                        ? item.percent.toFixed(1) + '%'
                                                        : '-'}
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
                    {subTitleDiv('신살 분석')}
                    <div className="flex w-full h-90">
                        <DivChart columnData={sinsalColumnData} rowData={sinsalRowData} />
                    </div>
                </article>
            </section>*/}

            {/** 대운 */}
            {/*<section className="flex flex-col w-full">
                {subTitleDiv(`대운 - 대운 수 : ${data.daeunNum}`)}
                <div className="flex w-full h-100 ">
                    <ColumnButtonChart
                        columnData={daeunColumnData}
                        rowData={daeunRowData}
                        defaultColumn={targetDaeun}
                        type="daeun"
                        addEvent={addColumnClickEvent}
                    />
                </div>
            </section>*/}

            {/** 세운 */}
            {/*<section className="flex flex-col w-full">
                {subTitleDiv('세운')}
                <div className="flex w-full h-100">
                    <ColumnButtonChart
                        columnData={seunColumnData}
                        rowData={seunRowData}
                        defaultColumn={targetSeun}
                        type="seun"
                        addEvent={addColumnClickEvent}
                    />
                </div>
            </section>*/}
        </div>
    ) : (
        <div></div>
    );
}
