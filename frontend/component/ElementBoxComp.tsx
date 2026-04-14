import { cheongan } from '@/common/const/cheonganConst';
import { jiji } from '@/common/const/jijiConst';
import { CheonganType, JijiType } from '@/type/basicType';
import { makeBgColor, defaultTextColor, makeColorName } from '@/util/colorFunc';

const ElementBoxComp = ({ name, type }: { name: string; type: 'gan' | 'jiji' }) => {
    const colorName = makeColorName(name, type);

    return (
        <div
            className={`flex justify-center items-center relative w-20 h-20 rounded-2xl
            ${makeBgColor(colorName) ?? ''}
        `}
        >
            <span className={`text-4xl font-bold ${defaultTextColor(colorName)}`}>
                {name !== ''
                    ? type === 'gan'
                        ? cheongan[name as CheonganType].hanja
                        : jiji[name as JijiType].hanja
                    : '-'}
            </span>

            {name !== '' && (
                <div
                    className={`absolute right-2.5 bottom-2.5 text-sm ${defaultTextColor(colorName)}`}
                >
                    {name}
                </div>
            )}
        </div>
    );
};

export default ElementBoxComp;
