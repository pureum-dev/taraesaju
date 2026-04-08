import { ReactNode, useMemo, useState } from 'react';

/** lib */
import { ZapIcon, HeartIcon } from 'lucide-react';

/** Custom */
import { jiji } from '@/common/const/jijiConst';
import { makeBgColor, textColor, makeBgColorAlpha } from '@/util/colorFunc';
import SajuChartComp from './SajuChartComp';
import ElementBoxComp from '@/component/ElementBoxComp';

/** type & interface*/
import { ColumnItem, JijiType, RowItem } from '@/type/basicType';
import { BirthAllData, Relation } from '@/type/birthDataInterface';

interface SajuChartGroupProps {
    columnData: ColumnItem[];
    hasSideHeader?: boolean;
    children?: ReactNode;
}

const checkList = [
    {
        key: 'sipsin',
        name: '십신',
    },
    {
        key: 'relation',
        name: '합/충',
    },
    {
        key: 'woonsung',
        name: '십이운성',
    },
    {
        key: 'sinsal',
        name: '십이신살',
    },
];

const sideHeaderOrder = [
    'ganRealtion',
    'ganSipsin',
    'gan',
    'jiji',
    'jijiSipsin',
    'jijiRealtion',
    'jijanggan',
    'woonsung',
    'sinsal',
] as const;

const sideHeaderMap = {
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
};

const SajuChartGroupComp = ({
    columnData,
    hasSideHeader = true,
    children,
}: SajuChartGroupProps) => {
    const [checkSideHeader, setCheckSideHeader] = useState<string[]>([
        'sipsin',
        'relation',
        'woonsung',
        'sinsal',
    ]);

    const onChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;

        setCheckSideHeader((prev) => {
            if (checked) {
                return [...prev, name];
            } else {
                return prev.filter((item) => item !== name);
            }
        });
    };

    const defaultRowMap = useMemo<Record<string, RowItem>>(() => {
        return {
            ganRealtion: {
                key: 'ganRealtion',
                className: '',
                cellRender: (col) => {
                    const list: Relation[] = col.ganRelation ?? [];
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
            ganSipsin: {
                key: 'ganSipsin',
                className: '',
            },
            gan: {
                key: 'gan',
                className: '',
                cellRender: (col) => {
                    const bgColor =
                        col.ganDuplication !== '' ? makeBgColorAlpha(col.gan, 'gan') : '';
                    return (
                        <div
                            className={`flex justify-center items-center w-full h-full p-2 ${bgColor}`}
                        >
                            <ElementBoxComp name={col.gan ?? ''} type="gan" />
                        </div>
                    );
                },
            },
            jiji: {
                key: 'jiji',
                className: '',
                cellRender: (col) => {
                    const bgColor =
                        col.jijiDuplication !== '' ? makeBgColorAlpha(col.jiji, 'jiji') : '';
                    return (
                        <div
                            className={`flex justify-center items-center w-full h-full p-2 ${bgColor}`}
                        >
                            <ElementBoxComp name={col.jiji ?? ''} type="jiji" />
                        </div>
                    );
                },
            },
            jijanggan: {
                key: 'jijanggan',
                className: '',
                cellRender: (col) => {
                    const jijanggan = col.jiji ? jiji[col.jiji as JijiType].jijanggan : [];
                    return jijanggan ? (
                        jijanggan.map((item, idx) => (
                            <div
                                key={idx}
                                className={`flex justify-center items-center w-6 h-6 m-0.5 rounded-full font-bold ${makeBgColor(item, 'gan')} ${textColor(item, 'gan')}`}
                            >
                                {item}
                            </div>
                        ))
                    ) : (
                        <div></div>
                    );
                },
            },
            jijiSipsin: {
                key: 'jijiSipsin',
                className: '',
            },
            jijiRealtion: {
                key: 'jijiRealtion',
                className: '',
                cellRender: (col) => {
                    const list: Relation[] = col.jijiRealtion ?? [];
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
            woonsung: {
                key: 'woonsung',
                className: '',
            },
            sinsal: {
                key: 'sinsal',
                className: '',
            },
        };
    }, []);

    const sideHeader = useMemo<ColumnItem>(() => {
        const result: ColumnItem = {
            key: 'rowHeader',
            header: '',
        };

        sideHeaderOrder.forEach((key) => {
            if (
                (key.includes('Sipsin') && checkSideHeader.includes('sipsin')) ||
                (key.includes('Realtion') && checkSideHeader.includes('relation')) ||
                (key === 'woonsung' && checkSideHeader.includes('woonsung')) ||
                (key === 'sinsal' && checkSideHeader.includes('sinsal')) ||
                key === 'gan' ||
                key === 'jiji' ||
                key === 'jijanggan' // 항상 표시
            ) {
                result[key] = sideHeaderMap[key];
            }
        });

        return result;
    }, [checkSideHeader]);

    const chartColumn = useMemo<ColumnItem[]>(() => {
        if (!hasSideHeader) return columnData;

        return [sideHeader, ...columnData];
    }, [columnData, sideHeader, hasSideHeader]);

    const chartRow = useMemo<RowItem[]>(() => {
        const resulList: RowItem[] = [
            {
                key: 'header',
                className: 'text-sm',
            },
        ];

        sideHeaderOrder.forEach((key) => {
            if (
                (key.includes('Sipsin') && checkSideHeader.includes('sipsin')) ||
                (key.includes('Realtion') && checkSideHeader.includes('relation')) ||
                (key === 'woonsung' && checkSideHeader.includes('woonsung')) ||
                (key === 'sinsal' && checkSideHeader.includes('sinsal')) ||
                key === 'gan' ||
                key === 'jiji' ||
                key === 'jijanggan' // 항상 표시
            ) {
                resulList.push(defaultRowMap[key]);
            }
        });

        return resulList;
    }, [checkSideHeader]);

    return (
        <div className="flex flex-col">
            <ul className="flex flex-row justify-end items-center gap-6 mb-4">
                {checkList.map((item: Record<string, string>, idx: number) => (
                    <li key={idx} className="flex flex-row items-center">
                        <input
                            type="checkbox"
                            id={item.key}
                            name={item.key}
                            checked={checkSideHeader.includes(item.key)}
                            onChange={onChangeCheckbox}
                        />
                        <label htmlFor={item.key}>{item.name}</label>
                    </li>
                ))}
            </ul>
            <div className="flex flex-row justify-start items-center">
                <SajuChartComp
                    columnData={chartColumn}
                    rowData={chartRow}
                    hasSideHeader={hasSideHeader}
                />
                {children}
            </div>
        </div>
    );
};

export default SajuChartGroupComp;
