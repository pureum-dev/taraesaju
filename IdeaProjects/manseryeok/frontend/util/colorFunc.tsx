import { cheongan, jiji, ohaeng } from '@/common/const';
import { cheonganType, jijiType } from '@/type/basicType';

export const makeColorName = (name: string, type: 'gan' | 'jiji') => {
    let _colorName = '';
    if (name != '') {
        const _element =
            type === 'gan'
                ? cheongan[name as cheonganType].element
                : jiji[name as jijiType].element;

        _colorName = name != '' ? ohaeng[_element].color : '';
    }

    return _colorName;
};

export const makeBgColor = (name: string, type: 'gan' | 'jiji') => {
    const _colorName = makeColorName(name, type);

    switch (_colorName) {
        case '검은':
            return 'bg-gray-700';
        case '하얀':
            return 'bg-gray-200';
        case '푸른':
            return 'bg-greenmint-400 dark:bg-greenmint-500';
        case '붉은':
            return 'bg-coral-400 dark:bg-coral-500';
        case '노란':
            return 'bg-lemon-400 dark:bg-lemon-500';
        default:
            return '';
    }
};

export const textColor = (name: string, type: 'gan' | 'jiji') => {
    const _colorName = makeColorName(name, type);
    return _colorName === '검은' ? 'text-gray-50' : 'text-gray-900';
};
