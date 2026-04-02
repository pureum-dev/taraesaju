import { cheonganType, jijiType, divisionType } from '@/type/basicType';

export const cheongan: Record<
    cheonganType,
    {
        number: number;
        element: string;
        eumyang: '양' | '음';
    }
> = {
    갑: { number: 0, element: '목', eumyang: '양' },
    을: { number: 1, element: '목', eumyang: '음' },
    병: { number: 2, element: '화', eumyang: '양' },
    정: { number: 3, element: '화', eumyang: '음' },
    무: { number: 4, element: '토', eumyang: '양' },
    기: { number: 5, element: '토', eumyang: '음' },
    경: { number: 6, element: '금', eumyang: '양' },
    신: { number: 7, element: '금', eumyang: '음' },
    임: { number: 8, element: '수', eumyang: '양' },
    계: { number: 9, element: '수', eumyang: '음' },
};

export const jiji: Record<
    jijiType,
    {
        number: number;
        startTime: string;
        endTime: string;
        element: string;
        eumyang: '양' | '음';
        isEumyangInverse: boolean;
        animal: string;
        jijanggan: string[];
    }
> = {
    자: {
        number: 0,
        startTime: '23:00',
        endTime: '01:00',
        element: '수',
        eumyang: '양',
        isEumyangInverse: true,
        animal: '쥐',
        jijanggan: ['임', '계'],
    },
    축: {
        number: 1,
        startTime: '01:00',
        endTime: '03:00',
        element: '토',
        eumyang: '음',
        isEumyangInverse: false,
        animal: '소',
        jijanggan: ['계', '신', '기'],
    },
    인: {
        number: 2,
        startTime: '03:00',
        endTime: '05:00',
        element: '목',
        eumyang: '양',
        isEumyangInverse: false,
        animal: '호랑이',
        jijanggan: ['무', '병', '갑'],
    },
    묘: {
        number: 3,
        startTime: '05:00',
        endTime: '07:00',
        element: '목',
        eumyang: '음',
        isEumyangInverse: false,
        animal: '토끼',
        jijanggan: ['갑', '을'],
    },
    진: {
        number: 4,
        startTime: '07:00',
        endTime: '09:00',
        element: '토',
        eumyang: '양',
        isEumyangInverse: false,
        animal: '용',
        jijanggan: ['을', '계', '무'],
    },
    사: {
        number: 5,
        startTime: '09:00',
        endTime: '11:00',
        element: '화',
        eumyang: '음',
        isEumyangInverse: true,
        animal: '뱀',
        jijanggan: ['무', '경', '병'],
    },
    오: {
        number: 6,
        startTime: '11:00',
        endTime: '13:00',
        element: '화',
        eumyang: '양',
        isEumyangInverse: true,
        animal: '말',
        jijanggan: ['병', '기', '정'],
    },
    미: {
        number: 7,
        startTime: '13:00',
        endTime: '15:00',
        element: '토',
        eumyang: '음',
        isEumyangInverse: false,
        animal: '양',
        jijanggan: ['정', '을', '기'],
    },
    신: {
        number: 8,
        startTime: '15:00',
        endTime: '17:00',
        element: '금',
        eumyang: '양',
        isEumyangInverse: false,
        animal: '원숭이',
        jijanggan: ['무', '임', '경'],
    },
    유: {
        number: 9,
        startTime: '17:00',
        endTime: '19:00',
        element: '금',
        eumyang: '음',
        isEumyangInverse: false,
        animal: '닭',
        jijanggan: ['경', '신'],
    },
    술: {
        number: 10,
        startTime: '17:00',
        endTime: '21:00',
        element: '토',
        eumyang: '양',
        isEumyangInverse: false,
        animal: '개',
        jijanggan: ['신', '정', '무'],
    },
    해: {
        number: 11,
        startTime: '21:00',
        endTime: '23:00',
        element: '수',
        eumyang: '음',
        isEumyangInverse: false,
        animal: '돼지',
        jijanggan: ['무', '갑', '임'],
    },
};

export const division24: Record<
    divisionType,
    {
        type: '절기' | '중기';
        jiji: jijiType;
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
