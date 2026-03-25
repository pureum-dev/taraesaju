'use client';

import { useRef, useState } from 'react';

/** Lib */
import { Search } from 'lucide-react';

/** Custom */
import BasicModalComp from '../../_component/BasicModalComp';
import fetchConfig from '@/util/fetchConfig';

interface regionInterface {
    alternate_name: string;
    geo_name: string;
    geonameid: number;
    latitude: number;
    longitude: number;
    timezone: string;
}

export default function InfoModal() {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const [regionList, setRegionList] = useState<regionInterface[]>([]);

    const onClickSearchEvent = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!inputRef.current) return;

        const value = inputRef.current.value;
        const res: regionInterface[] = await fetchConfig({
            url: '/api/region',
            method: 'POST',
            body: { keyword: value },
        });

        setRegionList(res);
    };

    const onClickEachRegion = (e: React.MouseEvent<HTMLAnchorElement>, data: regionInterface) => {
        e.preventDefault();
    };

    return (
        <BasicModalComp isSave={false}>
            <form className="min-w-96">
                <div className="relative">
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="태어난 장소를 입력해주세요."
                        className="w-full pr-12"
                    />
                    <button
                        className="absolute top-1/2 right-0 -translate-x-1 -translate-1/2 flex flex-row gap-1 rounded-2xl button-bg-secondary small"
                        onClick={onClickSearchEvent}
                    >
                        <Search size={18} />
                        검색하기
                    </button>
                </div>
            </form>
            <ul className="flex flex-col flex-1 w-full my-4 py-4 bg-gray-50 rounded-2xl">
                {regionList.map((item, idx) => {
                    return (
                        <li key={idx} className="w-full">
                            <a
                                className=" w-full medium rounded-xl"
                                onClick={(e) => onClickEachRegion(e, item)}
                            >{`${item.geo_name} / ${item.alternate_name}`}</a>
                        </li>
                    );
                })}
            </ul>
        </BasicModalComp>
    );
}
