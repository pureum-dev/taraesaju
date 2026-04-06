/** type & interface*/
import { ColumnItem, RowItem } from '@/type/basicType';

interface SajuChartProps {
    columnData: ColumnItem[];
    rowData: RowItem[];
    hasSideHeader?: boolean;
}

const SajuChartComp = ({ columnData, rowData, hasSideHeader = true }: SajuChartProps) => {
    return (
        <div className="flex flex-col w-full">
            {rowData.map((rowItem, rowIdx) => {
                return (
                    <div key={rowItem.key} className={`flex flex-row items-stretch w-full `}>
                        {columnData.map((colItem, colIdx) => {
                            const isFirstRow = rowIdx === 1;
                            const isLastRow = rowIdx === rowData.length - 1;
                            const isFirstCol = hasSideHeader ? colIdx === 1 : colIdx === 0;
                            const isLastCol = colIdx === columnData.length - 1;

                            // 모서리 판별
                            const cornerRadiusClass = `
                                ${isFirstRow && isFirstCol ? 'rounded-tl-2xl' : ''}
                                ${isFirstRow && isLastCol ? 'rounded-tr-2xl' : ''}
                                ${isLastRow && isFirstCol ? 'rounded-bl-2xl' : ''}
                                ${isLastRow && isLastCol ? 'rounded-br-2xl' : ''}
                            `;

                            return hasSideHeader && colIdx === 0 ? (
                                <div
                                    key={`${colItem.key}_header`}
                                    className="flex items-center w-24 p-2 text-right text-sm"
                                >
                                    {colItem[rowItem.key]}
                                </div>
                            ) : (
                                <div
                                    key={`${colItem.key}_${rowItem.key}`}
                                    style={{
                                        width: hasSideHeader
                                            ? `calc((100% - 6rem) / ${columnData.length - 1})`
                                            : `calc(100% / ${columnData.length})`,
                                    }}
                                    className={`flex justify-center items-center min-w-20 p-2  text-sm text-center  
                                        ${cornerRadiusClass}
                                        ${isFirstRow && 'border-t'}
                                        ${rowIdx === 0 ? '' : 'border-r border-b'}
                                        ${rowIdx !== 0 && isFirstCol ? 'border-l' : ''}
                                        `}
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

export default SajuChartComp;
