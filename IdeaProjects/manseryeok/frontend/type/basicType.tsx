export type ColumnItem = Record<string, any> & { key: string; header?: string };
export type RowItem = {
    key: string;
    className?: string;
    cellRender?: (col: ColumnItem) => React.ReactNode;
};

export type ColumnKeyType = 'year' | 'month' | 'day' | 'time';
export type OhaengType = '목' | '화' | '토' | '금' | '수';
export type CheonganType = '갑' | '을' | '병' | '정' | '무' | '기' | '경' | '신' | '임' | '계';
export type JijiType =
    | '자'
    | '축'
    | '인'
    | '묘'
    | '진'
    | '사'
    | '오'
    | '미'
    | '신'
    | '유'
    | '술'
    | '해';

export type DivisionType =
    | '입춘'
    | '우수'
    | '경칩'
    | '춘분'
    | '청명'
    | '곡우'
    | '입하'
    | '소만'
    | '망종'
    | '하지'
    | '소서'
    | '대서'
    | '입추'
    | '처서'
    | '백로'
    | '추분'
    | '한로'
    | '상강'
    | '입동'
    | '소설'
    | '대설'
    | '동지'
    | '소한'
    | '대한';

export type SipsinType =
    | '비견'
    | '겁재'
    | '식신'
    | '상관'
    | '정재'
    | '편재'
    | '정관'
    | '편관'
    | '정인'
    | '편인';
