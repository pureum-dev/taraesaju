import { cheongan } from '@/common/const/cheonganConst';
import { jiji } from '@/common/const/jijiConst';
import { ohaeng } from '@/common/const/ohaengConst';
import { CheonganType, JijiType } from '@/type/basicType';

export const makeColorName = (name: string, type: 'gan' | 'jiji') => {
    let _colorName = '';
    if (name != '') {
        const _element =
            type === 'gan'
                ? cheongan[name as CheonganType].element
                : jiji[name as JijiType].element;

        _colorName = name != '' ? ohaeng[_element].color : '';
    }

    return _colorName;
};

export const makeBgColor = (_colorName: string) => {
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

export const makeBgColorAlpha = (_colorName: string) => {
    switch (_colorName) {
        case '검은':
            return 'bg-gray-700/20';
        case '하얀':
            return 'bg-gray-200/20';
        case '푸른':
            return 'bg-greenmint-400/20 dark:bg-greenmint-500/20';
        case '붉은':
            return 'bg-coral-400/20 dark:bg-coral-500/20';
        case '노란':
            return 'bg-lemon-400/20 dark:bg-lemon-500/20';
        default:
            return '';
    }
};

export const makeTextColor = (_colorName: string) => {
    switch (_colorName) {
        case '검은':
            return 'text-gray-900';
        case '하얀':
            return 'text-gray-400';
        case '푸른':
            return 'text-greenmint-500 dark:text-greenmint-500';
        case '붉은':
            return 'text-coral-500 dark:text-coral-500';
        case '노란':
            return 'text-lemon-500 dark:text-lemon-500';
        default:
            return '';
    }
};

export const defaultTextColor = (_colorName: string) => {
    return _colorName === '검은' ? 'text-gray-50' : 'text-gray-900';
};

export const getCSSVariable = (varName: string): string => {
    return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
};
