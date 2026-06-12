import { ReactNode } from 'react';
import Image from 'next/image';

import { OhaengType, SipsinType } from '@/common/type/basicType';
import elementTreeSvg from '@/public/svg/element/목.svg';
import elementFireSvg from '@/public/svg/element/화.svg';
import elementEarthSvg from '@/public/svg/element/토.svg';
import elemenGoldSvg from '@/public/svg/element/금.svg';
import elementWaterSvg from '@/public/svg/element/수.svg';
import elementTreeDisableSvg from '@/public/svg/element/목_disable.svg';
import elementFireDisableSvg from '@/public/svg/element/화_disable.svg';
import elementEarthDisableSvg from '@/public/svg/element/토_disable.svg';
import elemenGoldDisableSvg from '@/public/svg/element/금_disable.svg';
import elementWaterDisableSvg from '@/public/svg/element/수_disable.svg';

/**
 * resource  나를 생함 (인성)
 * power     나를 극함 (관성)
 * output    내가 생함 (식상)
 * wealth    내가 극함 (재성)
 */
export const ohaeng: Record<
    OhaengType,
    {
        hanja: string;
        color: string;
        resource: OhaengType;
        power: OhaengType;
        output: OhaengType;
        wealth: OhaengType;
        icon: ReactNode;
        iconDisable: ReactNode;
    }
> = {
    목: {
        hanja: '木',
        color: '푸른',
        resource: '수',
        power: '금',
        output: '화',
        wealth: '토',
        icon: (
            <Image
                src={elementTreeSvg}
                alt="목 아이콘 활성"
                className="w-full h-full object-contain"
            />
        ),
        iconDisable: (
            <Image
                src={elementTreeDisableSvg}
                alt="목 아이콘 비활성"
                className="w-full h-full object-contain"
            />
        ),
    },

    화: {
        hanja: '火',
        color: '붉은',
        resource: '목',
        power: '수',
        output: '토',
        wealth: '금',
        icon: (
            <Image
                src={elementFireSvg}
                alt="화 아이콘 활성"
                className="w-full h-full object-contain"
            />
        ),
        iconDisable: (
            <Image
                src={elementFireDisableSvg}
                alt="화 아이콘 비활성"
                className="w-full h-full object-contain"
            />
        ),
    },
    토: {
        hanja: '土',
        color: '노란',
        resource: '화',
        power: '목',
        output: '금',
        wealth: '수',
        icon: (
            <Image
                src={elementEarthSvg}
                alt="토 아이콘 활성"
                className="w-full h-full object-contain"
            />
        ),
        iconDisable: (
            <Image
                src={elementEarthDisableSvg}
                alt="토 아이콘 비활성"
                className="w-full h-full object-contain"
            />
        ),
    },
    금: {
        hanja: '金',
        color: '하얀',
        resource: '토',
        power: '화',
        output: '수',
        wealth: '목',
        icon: (
            <Image
                src={elemenGoldSvg}
                alt="금 아이콘 활성"
                className="w-full h-full object-contain"
            />
        ),
        iconDisable: (
            <Image
                src={elemenGoldDisableSvg}
                alt="금 아이콘 비활성"
                className="w-full h-full object-contain"
            />
        ),
    },
    수: {
        hanja: '水',
        color: '검은',
        resource: '금',
        power: '토',
        output: '목',
        wealth: '화',
        icon: (
            <Image
                src={elementWaterSvg}
                alt="수 아이콘 활성"
                className="w-full h-full object-contain"
            />
        ),
        iconDisable: (
            <Image
                src={elementWaterDisableSvg}
                alt="목 아이콘 비활성"
                className="w-full h-full object-contain"
            />
        ),
    },
};

export const sipsin: Record<
    SipsinType,
    {
        group: string;
        key: 'self' | 'resource' | 'power' | 'output' | 'wealth';
    }
> = {
    비견: { group: '비겁', key: 'self' },
    겁재: { group: '비겁', key: 'self' },
    식신: { group: '식상', key: 'output' },
    상관: { group: '식상', key: 'output' },
    정재: { group: '재성', key: 'wealth' },
    편재: { group: '재성', key: 'wealth' },
    정관: { group: '관성', key: 'power' },
    편관: { group: '관성', key: 'power' },
    정인: { group: '인성', key: 'resource' },
    편인: { group: '인성', key: 'resource' },
};
