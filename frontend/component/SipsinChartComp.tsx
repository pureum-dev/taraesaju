'use client';

import { useMemo } from 'react';
import { RowItem } from '@/type/basicType';

interface DivChartProps {
    columnData: Record<string, any>[];
}

const SipsinChartComp = ({ columnData }: DivChartProps) => {
    const sinsalRowData = useMemo<RowItem[]>(() => {
        return [
            {
                key: 'header',
                className: 'text-sm',
            },
            {
                key: 'gan',
                className: '',
                cellRender: (col) => {
                    const list: string[] = col && col.gan ? col.gan : [];
                    return (
                        <div className="flex flex-col">
                            {list.length !== 0
                                ? list.map((item, idx) => <div key={idx}>{item}</div>)
                                : '-'}
                        </div>
                    );
                },
            },
            {
                key: 'jiji',
                className: '',
                cellRender: (col) => {
                    const list: string[] = col && col.jiji ? col.jiji : [];
                    return (
                        <div className="flex flex-col">
                            {list.length !== 0
                                ? list.map((item, idx) => <div key={idx}>{item}</div>)
                                : '-'}
                        </div>
                    );
                },
            },
        ];
    }, []);

    return (
        <div className="flex flex-col w-full h-full rounded-2xl border ">
            {sinsalRowData.map((rowItem, rowIdx) => {
                return (
                    <div
                        key={rowItem.key}
                        style={{
                            height:
                                rowIdx === 0
                                    ? '3rem'
                                    : `calc((100% - 3rem) / ${sinsalRowData.length - 1})`,
                        }}
                        className={`flex flex-row items-center w-full ${
                            rowIdx !== sinsalRowData.length - 1 && 'border-b'
                        } `}
                    >
                        {columnData.map((colItem, colIdx) => {
                            return (
                                <div
                                    key={`${colItem.key}_${rowItem.key}`}
                                    style={{ width: `calc(100% / ${columnData.length})` }}
                                    className={`flex justify-center items-center min-w-20 h-full p-2 ${
                                        colIdx !== columnData.length - 1 && 'border-r'
                                    }  text-center ${rowItem.className}`}
                                >
                                    {rowItem.cellRender
                                        ? rowItem.cellRender(colItem)
                                        : (colItem[rowItem.key] ?? '-')}
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};

export default SipsinChartComp;
