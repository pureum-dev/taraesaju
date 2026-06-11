'use client';

import { Fragment, ReactNode, useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

/** lib */
import { UserRoundIcon, SunIcon, MoonIcon, MapPinnedIcon } from 'lucide-react';
import { useModalStore } from '@/lib/store/useModalDataStore';

/** Custom */
import { calculateCalendar } from '@/util/commonFunc';
import IljuCharacterComp from '@/component/IljuCharacterComp';
import TooltipIconComp from '@/component/TooltipIconComp';

/** type & interface*/
import { birthDataInterface } from '@/service/birthDataService';
import { BirthAllData } from '@/type/birthDataInterface';
import { oheangDataService, OheangChangeInterface } from '@/service/ohaengDataService';

/** type */
interface AsideProps {
    className?: string;
    profileData: birthDataInterface | null;
    data: BirthAllData;
    children: ReactNode;
    onChangeScore: (data: OheangChangeInterface) => void;
}

export default function AsideContents({
    className,
    profileData,
    data,
    children,
    onChangeScore,
}: AsideProps) {
    const router = useRouter();
    const setModalData = useModalStore((state) => state.setModalData);
    const resetModalData = useModalStore((state) => state.resetModalData);

    const [isAdjustElement, setIsAdjustment] = useState(true);
    const [ohaengStrength, setOhaengStrength] = useState(() => data?.ohaengStrength);

    // useCallback
    const onChangeAdjustScore = useCallback(async () => {
        if (data) {
            const response = await oheangDataService.getOheangData({
                data: data.chartCol,
                adjustScore: !isAdjustElement,
            });

            if (response) {
                setIsAdjustment((prev) => !prev);
                setOhaengStrength(response.ohaengStrength);

                if (onChangeScore) onChangeScore(response);
            }
        }
    }, [data, isAdjustElement, onChangeScore]);

    const onClickCopyPrompt = () => {
        if (profileData && data) {
            setModalData({
                profileData: profileData,
                data: data,
                elementListData: ohaengStrength.ohaeng,
                isElementBalance: ohaengStrength.isBalanced,
            });

            router.push('/manseryeok/modal');
        }
    };

    const onClickChangeProfile = () => {
        if (confirm('프로필을 변경하시겠습니까?')) {
            resetModalData();
            router.push('/');
        }
    };

    const profileList = useMemo<Record<string, any>[]>(() => {
        if (!profileData) return [];

        const calendar = calculateCalendar(profileData);
        const solarDate = calendar?.getSolarCalendar();
        const lunarDate = calendar?.getLunarCalendar();

        return [
            {
                title: '성별',
                icon: <UserRoundIcon className="w-4" />,
                value: <span>{`${profileData.gender === 'M' ? '남성' : '여성'}`}</span>,
                prerequisite: true,
            },
            {
                title: '양력',
                icon: <SunIcon className="w-4" />,
                value: (
                    <span>
                        <span>
                            {solarDate &&
                                `${solarDate.year}-${String(solarDate.month).padStart(2, '0')}-${String(solarDate.day).padStart(2, '0')}`}
                        </span>
                        <span className="hidden ml-2 lg:inline">{`${profileData.birthtime ?? ''}`}</span>
                    </span>
                ),
                prerequisite: true,
            },
            {
                title: `음력${profileData.calendarType === 'leap' ? '(윤달)' : ''}`,
                icon: <MoonIcon className="w-4" />,
                value: (
                    <span>
                        <span>
                            {lunarDate &&
                                `${lunarDate.year}-${String(lunarDate.month).padStart(2, '0')}-${String(lunarDate.day).padStart(2, '0')}`}
                        </span>
                        <span className="hidden ml-2 lg:inline">{`${profileData.birthtime ?? ''}`}</span>
                    </span>
                ),
                prerequisite: true,
            },
            /*{
                title: '보정값',
                icon: <SparkleIcon className="w-3.5" />,
                value: (
                    <div className="flex flex-col gap-0.5">
                        <span className="flex items-center gap-2 border-b border-gray-900 font-bold dark:border-gray-50">
                            <span>
                                {`${data.birthData.solYear}-${data.birthData.solMonth}-${data.birthData.solDay}`}
                            </span>
                            <span>{`${data.birthData.time}`}</span>
                        </span>
                        <span className="text-mint-600 font-bold dark:text-mint-400">
                            {`( 지역보정: ${Math.trunc(data.birthData.deltaMinutes)}분 ${
                                data.birthData.summertimeMinutes
                                    ? ', 서머타임: ' +
                                      Math.trunc(data.birthData.summertimeMinutes) +
                                      '분'
                                    : ''
                            } )`}
                        </span>
                    </div>
                ),
                prerequisite: !data.info.timeNone,
            },*/
            {
                title: `도시`,
                icon: <MapPinnedIcon className="w-4" />,
                value: (
                    <span>{`${profileData.location.geo_name}/${profileData.location.alternate_name}`}</span>
                ),
                prerequisite: true,
            },
        ];
    }, [profileData]);

    return (
        <aside className={`flex flex-col w-full gap-4 rounded-2xl md:w-1/3 ${className}`}>
            <article className="flex flex-2 flex-col justify-center items-center w-full p-6 gap-4 border rounded-2xl">
                <div className="flex justify-end items-center w-full text-sm">
                    <input
                        type="checkbox"
                        id="adjustScore"
                        name="adjustScore"
                        checked={isAdjustElement}
                        onChange={onChangeAdjustScore}
                    />
                    <label htmlFor="adjustScore" className="flex flex-row items-center">
                        <span>계절 및 위치 보정</span>
                        <TooltipIconComp className="ml-1">
                            <span>
                                계절을 상징하는 월지와 시간을 상징하는 시지에 추가점수를 주어 오행을
                                보정
                            </span>
                        </TooltipIconComp>
                    </label>
                </div>
                <div className="flex flex-col items-center">
                    <IljuCharacterComp gan={data.chartCol.day.gan} jiji={data.chartCol.day.jiji} />
                    <span className="truncate w-full text-center text-xl font-extrabold mt-2">
                        {profileData?.nickName}
                    </span>
                    <div className="flex flex-row gap-1 text-sm">
                        {(Object.keys(data.chartCol) as Array<keyof typeof data.chartCol>).map(
                            (item) => {
                                return (
                                    data.chartCol[item] && (
                                        <div key={item}>
                                            <span>{data.chartCol[item].gan}</span>
                                            <span>{data.chartCol[item].jiji}</span>
                                            <span>
                                                {item === 'year'
                                                    ? '년'
                                                    : item === 'month'
                                                      ? '월'
                                                      : item === 'day'
                                                        ? '일'
                                                        : '시'}
                                            </span>
                                        </div>
                                    )
                                );
                            },
                        )}
                    </div>
                </div>
                <div className="flex justify-center items-center w-full">
                    <ul className="flex flex-row w-full gap-1.5 md:flex-col">
                        {profileList &&
                            profileList.map((profileItem, profileIdx) => {
                                return (
                                    profileItem.prerequisite && (
                                        <Fragment key={profileIdx}>
                                            <li className="flex flex-col w-1/4 text-nowrap text-sm md:flex-row md:w-full">
                                                <span className="flex items-center w-22 font-bold text-gray-700 dark:text-gray-300">
                                                    {profileItem.icon && (
                                                        <span className="flex justify-start items-center w-4 h-4 mr-1">
                                                            {profileItem.icon}
                                                        </span>
                                                    )}
                                                    {profileItem.title}
                                                </span>
                                                <span>{profileItem.value}</span>
                                            </li>
                                        </Fragment>
                                    )
                                );
                            })}
                    </ul>
                </div>
                <div className="flex flex-col w-full gap-1">
                    <button
                        className="w-full medium button-bg-secondary"
                        onClick={onClickCopyPrompt}
                    >
                        AI프롬프트
                    </button>
                    <button
                        className="w-full medium button-bg-primary"
                        onClick={onClickChangeProfile}
                    >
                        프로필 수정
                    </button>
                </div>
            </article>
            <article className="flex-1 w-full min-h-30 rounded-2xl border">{children}</article>
        </aside>
    );
}
