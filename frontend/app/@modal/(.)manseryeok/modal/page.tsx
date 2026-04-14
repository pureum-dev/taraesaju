'use client';
import { useMemo } from 'react';

/** Lib */
import KoreanLunarCalendar from 'korean-lunar-calendar';

/** Custom */
import BasicModalComp from '../../_component/BasicModalComp';

import { useModalStore } from '@/lib/store/useModalDataStore';

const arr = [
    {
        title: '사주 구성 총평',
        text: '사주팔자의 기본 구성(천간/지지), 오행의 균형(과다/부족), 일주와 월주의 관계, 합과 충, 병존 등을 분석하여 타고난 운명과 주요 특징을 총평해 주세요.',
    },
    {
        title: '사주의 특징',
        text: '이 사주의 타고난 성향과 내면의 갈등, 성향적 모순, 타고난 기질, 성격적 특징과 인간관계에서 주의해햐하는 상황을 상세히 분석해 주세요.',
    },
    {
        title: '사주의 장·단점',
        text: '이 사주의 장점과 타고난 기질 중에서 가장 강력한 무기와 반드시 개발해야 할 재능을 상세히 알려주세요. 그리고 단점으로 고쳐야 할 점, 내면의 모순, 인생에서 반복되는 실수 패턴을 팩트 폭행 수준으로 솔직하게 짚어주세요.',
    },
    {
        title: '대운 분석',
        text: '10년 주기로 바뀌는 대운의 흐름을 분석하고, 현재 내가 어떤 대운의 시기에 와 있는지, 앞으로의 전성기는 언제인지 알려주세요.',
    },
    {
        title: '세운 분석',
        text: '올해를 기점으로 향후 3~5년간의 운 흐름을 분석해 주세요. 특히 이 사주에서 승부수를 던져야 할 시기와 자중해야 할 시기를 구분해 주세요.',
    },
    {
        title: '영역별 맞춤 분석 (직업/재물/애정/건강)',
        textList: [
            '👜직업: 조직 생활, 프리랜서, 사업 중 무엇이 맞는지와 추천 직업군 3가지를 순위별로 제시해 주세요.',
            '💰재물: 돈이 모이는 방식과 재테크 시 주의점, 일생 중 가장 풍요로운 시기를 알려주세요.',
            '💖애정: 연애 스타일과 배우자 인연, 결혼 생활의 모습 및 주의 사항을 분석해 주세요.',
            '🏥건강: 오행의 과다/부족에 따른 취약 장기와 관리법을 추천해 주세요.',
        ],
    },
    {
        title: '신살 분석',
        text: '사주에 있는 주요 신살(역마, 도화, 화개 등)과 주의해야 할 신살을 풀이해 주세요.',
    },
    {
        title: '사주 조언',
        text: '사주의 특징점을 바탕으로 이 사주의 인생 조언을 세 문장 이내로 요약해 주세요.',
    },
];

export default function ManseryeokModal() {
    const modalData = useModalStore((state) => state.modalData);

    // useCallback
    const onClickCopyText = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const copyText: string | undefined = document.getElementById('promptArea')?.innerText;

        // 클립보드 API를 사용하여 복사 실행
        if (copyText) {
            navigator.clipboard
                .writeText(copyText)
                .then(() => {
                    alert('프롬프트 복사가 완료되었습니다.');
                })
                .catch((err) => {
                    // 실패했을 때 에러 처리
                    console.error('복사 실패!', err);
                });
        }
    };

    // useMemo
    const profileComp = useMemo(() => {
        if (modalData) {
            const calendar = new KoreanLunarCalendar();
            const splitBirthday = modalData.profileData.birthday
                .split('-')
                .map((item) => Number(item));

            if (modalData.profileData.calendarType === 'solar') {
                calendar.setSolarDate(splitBirthday[0], splitBirthday[1], splitBirthday[2]);
            } else {
                calendar.setLunarDate(
                    splitBirthday[0],
                    splitBirthday[1],
                    splitBirthday[2],
                    modalData.profileData.calendarType === 'leap',
                );
            }

            const solarDate = calendar.getSolarCalendar();

            const dupArr = [
                modalData.data?.chartCol.year.ganDuplication,
                modalData.data?.chartCol.year.jijiDuplication,
                modalData.data?.chartCol.month.ganDuplication,
                modalData.data?.chartCol.month.jijiDuplication,
                modalData.data?.chartCol.day.ganDuplication,
                modalData.data?.chartCol.day.jijiDuplication,
                modalData.data?.chartCol.time?.ganDuplication,
                modalData.data?.chartCol.time?.jijiDuplication,
            ];

            const dupSet = new Set<string>();
            dupArr.forEach((item) => item && dupSet.add(item));

            const pointList = [...dupSet];
            modalData.elementListData.forEach((item) => {
                if (item.percent >= 37.5) pointList.push(`${item.element} 과다`);
                else if (item.percent === 0) pointList.push(`${item.element} 부족`);
            });

            const sinsalSet = new Set<string>([
                ...modalData.data?.sinsal.year.gan,
                ...modalData.data?.sinsal.year.jiji,
                ...modalData.data?.sinsal.month.gan,
                ...modalData.data?.sinsal.month.jiji,
                ...modalData.data?.sinsal.day.gan,
                ...modalData.data?.sinsal.day.jiji,
                ...modalData.data?.sinsal.time?.gan,
                ...modalData.data?.sinsal.time?.jiji,
            ]);

            const currentDaeun = modalData.data.daeun[modalData.daeunIdx];

            return (
                modalData && (
                    <ul className="flex flex-col gap-1">
                        <li>
                            <span>생년월일(양력): </span>
                            <span>{`${solarDate.year}-${solarDate.month}-${solarDate.day}`}</span>
                        </li>
                        <li>
                            <span>성별: </span>
                            <span>{modalData.profileData.gender === 'M' ? '남성' : '여성'}</span>
                        </li>
                        <li>
                            <span>사주 팔자(만세력 기준): </span>
                            <span>
                                {`${modalData.data.chartCol.year.gan}${modalData.data.chartCol.year.jiji}년`}
                                {` ${modalData.data.chartCol.month.gan}${modalData.data.chartCol.month.jiji}월`}
                                {` ${modalData.data.chartCol.day.gan}${modalData.data.chartCol.day.jiji}일`}
                                {modalData.data.chartCol.time &&
                                    ` ${modalData.data.chartCol.time.gan}${modalData.data.chartCol.time.jiji}시`}
                            </span>
                        </li>
                        <li>
                            <span>사주 특징: </span>
                            {pointList.map(
                                (item, idx) =>
                                    item && (
                                        <span
                                            key={`dup_${idx}`}
                                        >{`${item} ${idx === pointList.length - 1 ? '' : ', '}`}</span>
                                    ),
                            )}
                        </li>
                        <li>
                            <span>주요 신살: </span>
                            {[...sinsalSet].map(
                                (item, idx) =>
                                    item && (
                                        <span
                                            key={`sinsal_${idx}`}
                                        >{`${item} ${idx === sinsalSet.size - 1 ? '' : ', '}`}</span>
                                    ),
                            )}
                        </li>
                        <li>
                            <span>현재 대운 (대운 수: {modalData.data.daeun[0].daeunNum}): </span>
                            <span>{`${currentDaeun.gan}${currentDaeun.jiji}대운`}</span>
                        </li>
                    </ul>
                )
            );
        }
    }, [modalData]);

    // return
    return (
        <BasicModalComp
            isSave={false}
            header={
                <div className="flex flex-row justify-between">
                    <div className="font-bold text-lg">통합 사주 분석 요청 프롬프트</div>
                    <button className="small button-bg-primary" onClick={onClickCopyText}>
                        전체 복사
                    </button>
                </div>
            }
        >
            <div id={'promptArea'} className="flex flex-col gap-6">
                <div>
                    <div className="mb-2 font-bold">{`[시스템 설정]`}</div>
                    <div>
                        아래 제공하는 정보를 오행과 십신의 원칙을 기반으로 심층적으로 해석해 주세요.
                        제공되는 정보는 입춘을 기준으로 출생지 반영하여 시간 보정을 완료해 사주를
                        구성한 내용입니다. 전문 용어는 한글로 쉽게 풀이하고 이모티콘과 숫자 소제목을
                        활용하여 가독성을 높여주세요.
                    </div>
                </div>
                <div>
                    <div className="mb-2 font-bold">{`[사용자 정보]`}</div>
                    {profileComp}
                </div>
                <div>
                    <div className="mb-2 font-bold">{`[요청 상세 구조]`}</div>
                    <ul className="flex flex-col gap-3">
                        {arr.map((item, idx) => (
                            <li key={item.title} className="flex flex-col gap-1">
                                <div>
                                    <span className="mr-2">{`${idx + 1}. ${item.title}:`}</span>
                                    {item.text ? (
                                        <span>{item.text}</span>
                                    ) : (
                                        item.textList &&
                                        item.textList.map((textItem, textIdx) => (
                                            <div key={`sub_${textIdx}`} className="ml-2">
                                                {textItem}
                                            </div>
                                        ))
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </BasicModalComp>
    );
}
