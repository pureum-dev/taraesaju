import { cheongan, jiji } from '@/common/const';
import { cheonganType, jijiType } from '@/type/basicType';
import { makeBgColor, textColor } from '@/util/colorFunc';

const ElementBoxComp = ({ name, type }: { name: string; type: 'gan' | 'jiji' }) => {
    return (
        <div
            className={`flex justify-center items-center relative w-20 h-20 rounded-2xl
            ${makeBgColor(name, type) ?? ''}
        `}
        >
            <span className={`text-4xl font-bold ${textColor(name, type)}`}>
                {name !== ''
                    ? type === 'gan'
                        ? cheongan[name as cheonganType].hanja
                        : jiji[name as jijiType].hanja
                    : '-'}
            </span>

            <div className={`absolute right-2.5 bottom-2.5 text-sm ${textColor(name, type)}`}>
                {name !== '' ? name : '-'}
            </div>
        </div>
    );
};

export default ElementBoxComp;
