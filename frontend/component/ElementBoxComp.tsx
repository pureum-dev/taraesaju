import { cheongan } from '@/common/const/cheonganConst';
import { jiji } from '@/common/const/jijiConst';
import { CheonganType, JijiType } from '@/type/basicType';
import { makeBgColor, defaultTextColor, makeColorName } from '@/util/colorFunc';

const ElementBoxComp = ({
    name,
    type,
    size,
}: {
    name: string;
    type: 'gan' | 'jiji';
    size?: 'medium' | 'small';
}) => {
    const colorName = makeColorName(name, type);

    return (
        <div
            className={`flex justify-center items-center relative rounded-2xl
            ${makeBgColor(colorName) ?? ''}
            ${size === 'small' ? 'w-16 h-16' : 'w-20 h-20'}
        `}
        >
            <span
                className={` font-bold ${defaultTextColor(colorName)} ${size === 'small' ? 'text-3xl' : 'text-4xl'}`}
            >
                {name !== ''
                    ? type === 'gan'
                        ? cheongan[name as CheonganType].hanja
                        : jiji[name as JijiType].hanja
                    : '-'}
            </span>

            {name !== '' && (
                <div
                    className={`absolute  ${defaultTextColor(colorName)} ${size === 'small' ? 'text-xs right-2 bottom-2' : 'text-sm right-2.5 bottom-2.5 '}`}
                >
                    {name}
                </div>
            )}
        </div>
    );
};

export default ElementBoxComp;
