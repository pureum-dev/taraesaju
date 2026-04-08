import { OhaengType, SipsinType } from '@/type/basicType';

/**
 * resource  나를 생함 (인성)
 * power     나를 극함 (관성)
 * output    내가 생함 (식상)
 * wealth    내가 극함 (재성)
 */
export const ohaeng: Record<
    OhaengType,
    {
        color: string;
        resource: OhaengType;
        power: OhaengType;
        output: OhaengType;
        wealth: OhaengType;
    }
> = {
    목: { color: '푸른', resource: '수', power: '금', output: '화', wealth: '토' },
    화: { color: '붉은', resource: '목', power: '수', output: '토', wealth: '금' },
    토: { color: '노란', resource: '화', power: '목', output: '금', wealth: '수' },
    금: { color: '하얀', resource: '토', power: '화', output: '수', wealth: '목' },
    수: { color: '검은', resource: '금', power: '토', output: '목', wealth: '화' },
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
