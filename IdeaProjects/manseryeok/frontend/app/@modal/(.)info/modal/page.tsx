'use client';

import { useMemo, useRef, useState } from 'react';

/** Lib */
import { Search } from 'lucide-react';
import { useRegionStore } from '@/lib/store/useRegionStore';

/** Custom */
import BasicModalComp from '../../_component/BasicModalComp';

/** Type & Interface */
import { RegionJsonData } from '@/type/jsonDataInterface';
import { regionService } from '@/service/regionService';
import { useRouter } from 'next/navigation';

export default function InfoModal() {
    const router = useRouter();
    const { setRegionJsonData } = useRegionStore();

    const inputRef = useRef<HTMLInputElement | null>(null);

    const [regionList, setRegionList] = useState<RegionJsonData[]>([]);
    const [resultMessage, setResultMessage] = useState<string | null>(null);

    const onClickSearchEvent = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!inputRef.current) return;

        const value = inputRef.current.value;
        const res: RegionJsonData[] = await regionService.getUserAttendanceApplication(value);

        if (res.length > 0) {
            setRegionList(res);
            setResultMessage(null);
        } else {
            setResultMessage('검색 결과가 없습니다.');
        }
    };

    const onClickEachRegion = (e: React.MouseEvent<HTMLAnchorElement>, data: RegionJsonData) => {
        e.preventDefault();

        setRegionJsonData(data);
        router.back();
    };

    const headerComp = useMemo(() => {
        return (
            <form role="search">
                <div className="relative">
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="태어난 장소를 입력해주세요."
                        className="w-full pr-12"
                    />
                    <button
                        className="absolute top-1/2 right-0 -translate-x-1 -translate-1/2 flex flex-row gap-1 rounded-2xl button-bg-primary small"
                        onClick={onClickSearchEvent}
                    >
                        <Search size={18} />
                        검색하기
                    </button>
                </div>
            </form>
        );
    }, []);

    return (
        <BasicModalComp isSave={false} header={headerComp}>
            <div className="w-full h-80 overflow-y-auto">
                <ul className="flex flex-col w-full">
                    {regionList.length > 0 ? (
                        regionList.map((item, idx) => {
                            return (
                                <li key={idx} className="w-full">
                                    <a
                                        className=" w-full medium rounded-xl"
                                        onClick={(e) => onClickEachRegion(e, item)}
                                    >{`${item.geo_name} / ${item.alternate_name}`}</a>
                                </li>
                            );
                        })
                    ) : (
                        <li className="text-center text-sm text-gray-300">
                            {resultMessage ?? '태어난 장소를 모르는 경우 서울을 입력해주세요.'}
                        </li>
                    )}
                </ul>
            </div>
        </BasicModalComp>
    );
}
