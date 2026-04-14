import { DivisionType, JijiType } from '@/type/basicType';

export const division24: Record<
    DivisionType,
    {
        type: '절기' | '중기';
        jiji: JijiType;
        month: number;
    }
> = {
    입춘: {
        type: '절기',
        jiji: '인',
        month: 2,
    },
    우수: {
        type: '중기',
        jiji: '인',
        month: 2,
    },
    경칩: {
        type: '절기',
        jiji: '묘',
        month: 3,
    },
    춘분: {
        type: '중기',
        jiji: '묘',
        month: 3,
    },
    청명: {
        type: '절기',
        jiji: '진',
        month: 4,
    },
    곡우: {
        type: '중기',
        jiji: '진',
        month: 4,
    },
    입하: {
        type: '절기',
        jiji: '사',
        month: 5,
    },
    소만: {
        type: '중기',
        jiji: '사',
        month: 5,
    },
    망종: {
        type: '절기',
        jiji: '오',
        month: 6,
    },
    하지: {
        type: '중기',
        jiji: '오',
        month: 6,
    },
    소서: {
        type: '절기',
        jiji: '미',
        month: 7,
    },
    대서: {
        type: '중기',
        jiji: '미',
        month: 7,
    },
    입추: {
        type: '절기',
        jiji: '신',
        month: 8,
    },
    처서: {
        type: '중기',
        jiji: '신',
        month: 8,
    },
    백로: {
        type: '절기',
        jiji: '유',
        month: 9,
    },
    추분: {
        type: '중기',
        jiji: '유',
        month: 9,
    },
    한로: {
        type: '절기',
        jiji: '술',
        month: 10,
    },
    상강: {
        type: '중기',
        jiji: '술',
        month: 10,
    },
    입동: {
        type: '절기',
        jiji: '해',
        month: 11,
    },
    소설: {
        type: '중기',
        jiji: '해',
        month: 11,
    },
    대설: {
        type: '절기',
        jiji: '자',
        month: 12,
    },
    동지: {
        type: '중기',
        jiji: '자',
        month: 12,
    },
    소한: {
        type: '절기',
        jiji: '축',
        month: 1,
    },
    대한: {
        type: '중기',
        jiji: '축',
        month: 1,
    },
};
