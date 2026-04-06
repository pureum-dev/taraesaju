import { cheonganType, jijiType, divisionType, ohaengType, sipsinType } from '@/type/basicType';

export const cheongan: Record<
    cheonganType,
    {
        hanja: string;
        number: number;
        element: ohaengType;
        eumyang: '양' | '음';
    }
> = {
    갑: { hanja: '甲', number: 0, element: '목', eumyang: '양' },
    을: { hanja: '乙', number: 1, element: '목', eumyang: '음' },
    병: { hanja: '丙', number: 2, element: '화', eumyang: '양' },
    정: { hanja: '丁', number: 3, element: '화', eumyang: '음' },
    무: { hanja: '戊', number: 4, element: '토', eumyang: '양' },
    기: { hanja: '己', number: 5, element: '토', eumyang: '음' },
    경: { hanja: '庚', number: 6, element: '금', eumyang: '양' },
    신: { hanja: '辛', number: 7, element: '금', eumyang: '음' },
    임: { hanja: '壬', number: 8, element: '수', eumyang: '양' },
    계: { hanja: '癸', number: 9, element: '수', eumyang: '음' },
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
        hanja: string;
        number: number;
        startTime: string;
        endTime: string;
        element: ohaengType;
        eumyang: '양' | '음';
        isEumyangInverse: boolean;
        animal: string;
        jijanggan: cheonganType[];
        samjae: jijiType[];
    }
> = {
    자: {
        hanja: '子',
        number: 0,
        startTime: '23:00',
        endTime: '01:00',
        element: '수',
        eumyang: '양',
        isEumyangInverse: true,
        animal: '쥐',
        jijanggan: ['임', '계'],
        samjae: ['인', '묘', '진'],
    },
    축: {
        hanja: '丑',
        number: 1,
        startTime: '01:00',
        endTime: '03:00',
        element: '토',
        eumyang: '음',
        isEumyangInverse: false,
        animal: '소',
        jijanggan: ['계', '신', '기'],
        samjae: ['해', '자', '축'],
    },
    인: {
        hanja: '寅',
        number: 2,
        startTime: '03:00',
        endTime: '05:00',
        element: '목',
        eumyang: '양',
        isEumyangInverse: false,
        animal: '호랑이',
        jijanggan: ['무', '병', '갑'],
        samjae: ['신', '유', '술'],
    },
    묘: {
        hanja: '卯',
        number: 3,
        startTime: '05:00',
        endTime: '07:00',
        element: '목',
        eumyang: '음',
        isEumyangInverse: false,
        animal: '토끼',
        jijanggan: ['갑', '을'],
        samjae: ['사', '오', '미'],
    },
    진: {
        hanja: '辰',
        number: 4,
        startTime: '07:00',
        endTime: '09:00',
        element: '토',
        eumyang: '양',
        isEumyangInverse: false,
        animal: '용',
        jijanggan: ['을', '계', '무'],
        samjae: ['인', '묘', '진'],
    },
    사: {
        hanja: '巳',
        number: 5,
        startTime: '09:00',
        endTime: '11:00',
        element: '화',
        eumyang: '음',
        isEumyangInverse: true,
        animal: '뱀',
        jijanggan: ['무', '경', '병'],
        samjae: ['해', '자', '축'],
    },
    오: {
        hanja: '午',
        number: 6,
        startTime: '11:00',
        endTime: '13:00',
        element: '화',
        eumyang: '양',
        isEumyangInverse: true,
        animal: '말',
        jijanggan: ['병', '기', '정'],
        samjae: ['신', '유', '술'],
    },
    미: {
        hanja: '未',
        number: 7,
        startTime: '13:00',
        endTime: '15:00',
        element: '토',
        eumyang: '음',
        isEumyangInverse: false,
        animal: '양',
        jijanggan: ['정', '을', '기'],
        samjae: ['사', '오', '미'],
    },
    신: {
        hanja: '申',
        number: 8,
        startTime: '15:00',
        endTime: '17:00',
        element: '금',
        eumyang: '양',
        isEumyangInverse: false,
        animal: '원숭이',
        jijanggan: ['무', '임', '경'],
        samjae: ['인', '묘', '진'],
    },
    유: {
        hanja: '酉',
        number: 9,
        startTime: '17:00',
        endTime: '19:00',
        element: '금',
        eumyang: '음',
        isEumyangInverse: false,
        animal: '닭',
        jijanggan: ['경', '신'],
        samjae: ['해', '자', '축'],
    },
    술: {
        hanja: '戌',
        number: 10,
        startTime: '17:00',
        endTime: '21:00',
        element: '토',
        eumyang: '양',
        isEumyangInverse: false,
        animal: '개',
        jijanggan: ['신', '정', '무'],
        samjae: ['신', '유', '술'],
    },
    해: {
        hanja: '亥',
        number: 11,
        startTime: '21:00',
        endTime: '23:00',
        element: '수',
        eumyang: '음',
        isEumyangInverse: false,
        animal: '돼지',
        jijanggan: ['무', '갑', '임'],
        samjae: ['사', '오', '미'],
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

/**
 * resource  나를 생함 (인성)
 * power     나를 극함 (관성)
 * output    내가 생함 (식상)
 * wealth    내가 극함 (재성)
 */
export const ohaeng: Record<
    ohaengType,
    {
        color: string;
        resource: ohaengType;
        power: ohaengType;
        output: ohaengType;
        wealth: ohaengType;
    }
> = {
    목: { color: '푸른', resource: '수', power: '금', output: '화', wealth: '토' },
    화: { color: '붉은', resource: '목', power: '수', output: '토', wealth: '금' },
    토: { color: '노란', resource: '화', power: '목', output: '금', wealth: '수' },
    금: { color: '하얀', resource: '토', power: '화', output: '수', wealth: '목' },
    수: { color: '검은', resource: '금', power: '토', output: '목', wealth: '화' },
};

export const sipsin: Record<
    sipsinType,
    {
        group: string;
    }
> = {
    비견: { group: '비겁' },
    겁재: { group: '비겁' },
    식신: { group: '식상' },
    상관: { group: '식상' },
    정재: { group: '재성' },
    편재: { group: '재성' },
    정관: { group: '관성' },
    편관: { group: '관성' },
    정인: { group: '비겁' },
    편인: { group: '비겁' },
};

export const woonsung: Record<cheonganType, Record<jijiType, string>> = {
    갑: {
        자: '목욕',
        축: '관대',
        인: '건록',
        묘: '제왕',
        진: '쇠',
        사: '병',
        오: '사',
        미: '묘',
        신: '절',
        유: '태',
        술: '양',
        해: '장생',
    },
    을: {
        자: '병',
        축: '쇠',
        인: '제왕',
        묘: '건록',
        진: '관대',
        사: '목욕',
        오: '장생',
        미: '양',
        신: '태',
        유: '절',
        술: '묘',
        해: '사',
    },
    병: {
        자: '태',
        축: '양',
        인: '장생',
        묘: '목욕',
        진: '관대',
        사: '건록',
        오: '제왕',
        미: '쇠',
        신: '병',
        유: '사',
        술: '묘',
        해: '절',
    },
    정: {
        자: '절',
        축: '묘',
        인: '사',
        묘: '병',
        진: '쇠',
        사: '제왕',
        오: '건록',
        미: '관대',
        신: '목욕',
        유: '장생',
        술: '양',
        해: '태',
    },
    무: {
        자: '태',
        축: '양',
        인: '장생',
        묘: '목욕',
        진: '관대',
        사: '건록',
        오: '제왕',
        미: '쇠',
        신: '병',
        유: '사',
        술: '묘',
        해: '절',
    },
    기: {
        자: '절',
        축: '묘',
        인: '사',
        묘: '병',
        진: '쇠',
        사: '제왕',
        오: '건록',
        미: '관대',
        신: '목욕',
        유: '장생',
        술: '양',
        해: '태',
    },
    경: {
        자: '사',
        축: '묘',
        인: '절',
        묘: '태',
        진: '양',
        사: '장생',
        오: '목욕',
        미: '관대',
        신: '건록',
        유: '제왕',
        술: '쇠',
        해: '병',
    },
    신: {
        자: '장생',
        축: '양',
        인: '태',
        묘: '절',
        진: '묘',
        사: '사',
        오: '병',
        미: '쇠',
        신: '제왕',
        유: '건록',
        술: '관대',
        해: '목욕',
    },
    임: {
        자: '제왕',
        축: '쇠',
        인: '병',
        묘: '사',
        진: '묘',
        사: '절',
        오: '태',
        미: '양',
        신: '장생',
        유: '목욕',
        술: '관대',
        해: '건록',
    },
    계: {
        자: '건록',
        축: '관대',
        인: '목욕',
        묘: '장생',
        진: '양',
        사: '태',
        오: '절',
        미: '묘',
        신: '사',
        유: '병',
        술: '쇠',
        해: '제왕',
    },
};
