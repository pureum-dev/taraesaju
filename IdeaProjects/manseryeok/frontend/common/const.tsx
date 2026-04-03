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

export const cheonganRelation: Record<
    cheonganType,
    {
        hap: cheonganType;
        hapName: string;
        hapElement: string;
        chung: cheonganType | '';
        chungName: string;
    }
> = {
    갑: { hap: '기', hapName: '갑기합', hapElement: '토', chung: '경', chungName: '갑경충' },
    을: { hap: '경', hapName: '을경합', hapElement: '금', chung: '신', chungName: '을신충' },
    병: { hap: '신', hapName: '병신합', hapElement: '수', chung: '임', chungName: '병임충' },
    정: { hap: '임', hapName: '정임합', hapElement: '목', chung: '계', chungName: '정계충' },
    무: { hap: '계', hapName: '무계합', hapElement: '화', chung: '', chungName: '' },
    기: { hap: '갑', hapName: '갑기합', hapElement: '토', chung: '', chungName: '' },
    경: { hap: '을', hapName: '을경합', hapElement: '금', chung: '갑', chungName: '갑경충' },
    신: { hap: '병', hapName: '병신합', hapElement: '수', chung: '을', chungName: '을신충' },
    임: { hap: '정', hapName: '정임합', hapElement: '목', chung: '병', chungName: '병임충' },
    계: { hap: '무', hapName: '무계합', hapElement: '화', chung: '정', chungName: '정계충' },
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

/**
 * 방합: 월지를 포함하여 세개 모두 있는 경우
 *
 * 삼합:
 * 1. 세개 모두 있는 경우 (충 있으면 깨짐, 위치 상관 없음)
 * 2. 왕지를 포함하여 2개 있는 경우 반합
 *
 * 육합: 바로 붙어있는 경우 (충이 있으면 깨짐)
 *
 * 삼형:
 * 1. 세개 모두 있는 경우 (위치 상관 없음)
 * 2. 두개만 있는 경우 반형
 *
 * 파 / 해 : 1. 바로 붙어있는 경우
 */
export const jijiRelation: Record<
    jijiType,
    {
        type: '왕지' | '묘지' | '생지';
        yukhap: jijiType;
        yukhapName: string;
        yukhapElement: string;
        samhap: jijiType[];
        samhapElement: string;
        samhapWangji: jijiType;
        banghap: jijiType[];
        banghapElement: string;
        chung: jijiType;
        chungName: string;
        samhyung: jijiType[];
        hyung: jijiType | '';
        hyungName: string;
        pa: jijiType;
        paName: string;
        hae: jijiType;
        haeName: string;
    }
> = {
    자: {
        type: '왕지',
        yukhap: '축',
        yukhapName: '자축육합',
        yukhapElement: '토',
        samhap: ['신', '자', '진'],
        samhapElement: '수',
        samhapWangji: '자',
        banghap: ['해', '자', '축'],
        banghapElement: '수',
        chung: '오',
        chungName: '자오충',
        samhyung: [],
        hyung: '묘',
        hyungName: '자묘형',
        pa: '유',
        paName: '자유파',
        hae: '미',
        haeName: '자미해',
    },
    축: {
        type: '묘지',
        yukhap: '자',
        yukhapName: '자축육합',
        yukhapElement: '토',
        samhap: ['사', '유', '축'],
        samhapElement: '금',
        samhapWangji: '유',
        banghap: ['해', '자', '축'],
        banghapElement: '수',
        chung: '미',
        chungName: '축미충',
        samhyung: ['축', '술', '미'],
        hyung: '',
        hyungName: '',
        pa: '진',
        paName: '축진파',
        hae: '오',
        haeName: '축오해',
    },
    인: {
        type: '생지',
        yukhap: '해',
        yukhapName: '인해육합',
        yukhapElement: '목',
        samhap: ['인', '오', '술'],
        samhapElement: '화',
        samhapWangji: '오',
        banghap: ['인', '묘', '진'],
        banghapElement: '목',
        chung: '신',
        chungName: '인신충',
        samhyung: ['인', '사', '신'],
        hyung: '',
        hyungName: '',
        pa: '해',
        paName: '인해파',
        hae: '사',
        haeName: '인사해',
    },
    묘: {
        type: '왕지',
        yukhap: '술',
        yukhapName: '묘술육합',
        yukhapElement: '화',
        samhap: ['해', '묘', '미'],
        samhapElement: '목',
        samhapWangji: '묘',
        banghap: ['인', '묘', '진'],
        banghapElement: '목',
        chung: '유',
        chungName: '묘유충',
        samhyung: [],
        hyung: '자',
        hyungName: '자묘형',
        pa: '오',
        paName: '묘오파',
        hae: '진',
        haeName: '묘진해',
    },
    진: {
        type: '묘지',
        yukhap: '유',
        yukhapName: '진유육합',
        yukhapElement: '금',
        samhap: ['신', '자', '진'],
        samhapElement: '수',
        samhapWangji: '자',
        banghap: ['인', '묘', '진'],
        banghapElement: '목',
        chung: '술',
        chungName: '진술충',
        samhyung: [],
        hyung: '진',
        hyungName: '진진자형',
        pa: '축',
        paName: '축진파',
        hae: '묘',
        haeName: '묘진해',
    },
    사: {
        type: '생지',
        yukhap: '신',
        yukhapName: '사신육합',
        yukhapElement: '수',
        samhap: ['사', '유', '축'],
        samhapElement: '금',
        samhapWangji: '유',
        banghap: ['사', '오', '미'],
        banghapElement: '화',
        chung: '해',
        chungName: '사해충',
        samhyung: ['인', '사', '신'],
        hyung: '',
        hyungName: '',
        pa: '신',
        paName: '신사파',
        hae: '인',
        haeName: '인사해',
    },
    오: {
        type: '왕지',
        yukhap: '미',
        yukhapName: '오미육합',
        yukhapElement: '화',
        samhap: ['인', '오', '술'],
        samhapElement: '화',
        samhapWangji: '오',
        banghap: ['사', '오', '미'],
        banghapElement: '화',
        chung: '자',
        chungName: '자오충',
        samhyung: [],
        hyung: '오',
        hyungName: '오오자형',
        pa: '묘',
        paName: '묘오파',
        hae: '축',
        haeName: '축오해',
    },
    미: {
        type: '묘지',
        yukhap: '오',
        yukhapName: '오미육합',
        yukhapElement: '화',
        samhap: ['해', '묘', '미'],
        samhapElement: '목',
        samhapWangji: '묘',
        banghap: ['사', '오', '미'],
        banghapElement: '화',
        chung: '축',
        chungName: '축미충',
        samhyung: ['축', '술', '미'],
        hyung: '',
        hyungName: '',
        pa: '술',
        paName: '술미파',
        hae: '자',
        haeName: '자미해',
    },
    신: {
        type: '생지',
        yukhap: '사',
        yukhapName: '사신육합',
        yukhapElement: '수',
        samhap: ['신', '자', '진'],
        samhapElement: '수',
        samhapWangji: '자',
        banghap: ['신', '유', '술'],
        banghapElement: '금',
        chung: '인',
        chungName: '인신충',
        samhyung: ['인', '사', '신'],
        hyung: '',
        hyungName: '',
        pa: '사',
        paName: '신사파',
        hae: '해',
        haeName: '신해해',
    },
    유: {
        type: '왕지',
        yukhap: '진',
        yukhapName: '진유육합',
        yukhapElement: '금',
        samhap: ['사', '유', '축'],
        samhapElement: '금',
        samhapWangji: '유',
        banghap: ['신', '유', '술'],
        banghapElement: '금',
        chung: '묘',
        chungName: '묘유충',
        samhyung: [],
        hyung: '유',
        hyungName: '유유자형',
        pa: '자',
        paName: '자유파',
        hae: '술',
        haeName: '유술해',
    },
    술: {
        type: '묘지',
        yukhap: '묘',
        yukhapName: '묘술육합',
        yukhapElement: '화',
        samhap: ['인', '오', '술'],
        samhapElement: '화',
        samhapWangji: '오',
        banghap: ['신', '유', '술'],
        banghapElement: '금',
        chung: '진',
        chungName: '진술충',
        samhyung: ['축', '술', '미'],
        hyung: '',
        hyungName: '',
        pa: '미',
        paName: '술미파',
        hae: '유',
        haeName: '유술해',
    },
    해: {
        type: '생지',
        yukhap: '인',
        yukhapName: '인해육합',
        yukhapElement: '목',
        samhap: ['해', '묘', '미'],
        samhapElement: '목',
        samhapWangji: '묘',
        banghap: ['해', '자', '축'],
        banghapElement: '수',
        chung: '사',
        chungName: '사해충',
        samhyung: [],
        hyung: '해',
        hyungName: '해해자형',
        pa: '인',
        paName: '인해파',
        hae: '신',
        haeName: '신해해',
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
