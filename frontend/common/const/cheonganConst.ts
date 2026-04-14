import { CheonganType, OhaengType } from '@/type/basicType';

export const cheongan: Record<
    CheonganType,
    {
        hanja: string;
        number: number;
        element: OhaengType;
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
    CheonganType,
    {
        hap: CheonganType;
        hapName: string;
        hapElement: string;
        chung: CheonganType | '';
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
