'use client';

import { useMemo } from 'react';

/** Lib */
import ElementBoxComp from '@/component/ElementBoxComp';

/** Type & Interface */
import { ColumnItem, RowItem } from '@/type/basicType';

interface ColumnButtonChartProps {
    columnData: ColumnItem[];
    defaultColumn?: number;
    type: 'daeun' | 'seun';
    addEvent?: (idx: number, type: 'daeun' | 'seun') => void;
}

const tableCellClassName = 'flex justify-center items-center w-full min-w-20 p-2 ';

export default function ColumnButtonChartComp({
    columnData,
    defaultColumn,
    type,
    addEvent,
}: ColumnButtonChartProps) {
    const onClickColumn = (event: React.MouseEvent<HTMLElement>, index: number) => {
        event.preventDefault();

        if (addEvent) {
            addEvent(index, type);
        }
    };

    const rowData = useMemo<RowItem[]>(() => {
        const daeunRow = [
            {
                key: 'daeunNum',
            },
            {
                key: 'ganSipsin',
                className: 'text-sm',
            },
            {
                key: 'gan',
                className: '',
                cellRender: (col) => {
                    return (
                        col && (
                            <div className={`flex justify-center items-center w-full h-full p-2`}>
                                <ElementBoxComp name={col.gan ?? ''} type="gan" />
                            </div>
                        )
                    );
                },
            },
            {
                key: 'jiji',
                className: '',
                cellRender: (col) => {
                    return (
                        col && (
                            <div className={`flex justify-center items-center w-full h-full p-2`}>
                                <ElementBoxComp name={col.jiji ?? ''} type="jiji" />
                            </div>
                        )
                    );
                },
            },
            {
                key: 'jijiSipsin',
                className: 'text-sm',
            },
            {
                key: 'woonsung',
                className: 'text-sm',
            },
            {
                key: 'sinsal',
                className: 'text-sm',
            },
        ];

        const seunRow = [
            {
                key: 'yearNum',
                className: '',
            },
            {
                key: 'ganSipsin',
                className: 'text-sm',
            },
            {
                key: 'gan',
                className: '',
                cellRender: (col) => {
                    return (
                        col && (
                            <div className={`flex justify-center items-center w-full h-full p-2`}>
                                <ElementBoxComp name={col.gan ?? ''} type="gan" />
                            </div>
                        )
                    );
                },
            },
            {
                key: 'jiji',
                className: '',
                cellRender: (col) => {
                    return (
                        col && (
                            <div className={`flex justify-center items-center w-full h-full p-2`}>
                                <ElementBoxComp name={col.jiji ?? ''} type="jiji" />
                            </div>
                        )
                    );
                },
            },
            {
                key: 'jijiSipsin',
                className: 'text-sm',
            },
            {
                key: 'woonsung',
                className: 'text-sm',
            },
            {
                key: 'sinsal',
                className: 'text-sm',
            },
        ];

        return type === 'daeun' ? daeunRow : seunRow;
    }, [type]);

    return (
        <div className="flex flex-row-reverse overflow-auto w-full rounded-2xl border">
            {columnData.map((colItem, colIdx) => {
                return (
                    <div key={`col_${colIdx}`} className={`flex-1 min-w-28 `}>
                        <a
                            className={`flex flex-col w-full rounded-none ${colIdx !== 0 && 'border-r'} ${
                                colIdx === defaultColumn ? 'bg-mint-50 dark:bg-mint-900' : ''
                            }`}
                            onClick={(event) => onClickColumn(event, colIdx)}
                        >
                            {rowData.map((rowItem, rowIdx) => {
                                return rowIdx === 0 ? (
                                    <div
                                        key={`col_${colIdx}_row_${rowIdx}`}
                                        className={`${tableCellClassName} ${
                                            rowIdx === 0 &&
                                            colIdx === defaultColumn &&
                                            'text-mint-600 font-black'
                                        }`}
                                    >
                                        {colItem[rowItem.key] ?? '-'}
                                    </div>
                                ) : (
                                    <div
                                        key={`col_${colIdx}_row_${rowIdx}`}
                                        className={`border-t ${tableCellClassName} ${rowItem.className}`}
                                    >
                                        {rowItem.cellRender
                                            ? rowItem.cellRender(colItem)
                                            : (colItem[rowItem.key] ?? '-')}
                                    </div>
                                );
                            })}
                        </a>
                    </div>
                );
            })}
        </div>
    );
}
