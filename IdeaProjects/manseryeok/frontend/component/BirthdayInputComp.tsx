'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

/** Lib */
import { Mars, Venus, Search } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';

import { useRegionStore } from '@/lib/store/useRegionStore';

/** Custom */
import { createBirthGapjaData } from '@/server/service/birthDataServerService';

/** Type & Interface */
import { regionInterface } from '@/service/regionService';
import { birthDataInterface } from '@/service/birthDataService';

const genderList = [
    { value: 'M', label: '남성', icon: <Mars size={15} className="mr-1" /> },
    { value: 'F', label: '여성', icon: <Venus size={15} className="mr-1" /> },
];

export default function BirthdayInputComp() {
    const router = useRouter();
    const searchParam = useSearchParams();
    const type = searchParam.get('type');

    const regionData = useRegionStore((state) => state.regionData);
    const resetRegionData = useRegionStore((state) => state.resetRegionData);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        control,
        formState: { errors },
    } = useForm<Omit<birthDataInterface, 'location'>>({
        defaultValues: {
            nickName: '',
            gender: 'M',
            calendarType: 'solar',
            birthtime: '',
            isNone: false,
            isDivideTime: false,
            birthLocation: '',
        },
    });

    const watchGender = watch('gender');

    useEffect(() => {
        return () => resetRegionData();
    }, []);

    useEffect(() => {
        if (regionData) {
            setValue('birthLocation', `${regionData.geo_name} / ${regionData.alternate_name}`);
        }
    }, [regionData, setValue]);

    const onFocusBirthLocate = (e: React.FocusEvent<HTMLInputElement>) => {
        e.preventDefault();
        router.push('/info/modal');
    };

    const onClickEvent = handleSubmit((data: Omit<birthDataInterface, 'location'>) => {
        if (!regionData) return;

        const request: birthDataInterface = {
            ...data,
            location: regionData as regionInterface,
        };

        if (type === 'chart') {
            createBirthGapjaData(request);
        } else {
        }
    });

    return (
        <div className="flex justify-center items-center w-full h-screen mx-auto p-8 md:max-w-160">
            <form className="flex flex-col items-start gap-5 w-full px-8 py-12 border border-gray-200 rounded-3xl">
                <label htmlFor="nickName" className="flex flex-col gap-1 w-full">
                    <span className="text-sm">닉네임</span>
                    <input
                        {...register('nickName', { required: true, maxLength: 80 })}
                        id="nickName"
                        type="text"
                        placeholder="닉네임을 입력해주세요."
                        className={`${errors.nickName && 'border-red-500 focus-visible:ring-2 focus-visible:ring-red-500'}`}
                    />
                    {errors.nickName?.type === 'required' && (
                        <p role="alert" className="text-alert">
                            닉네임을 입력해주세요
                        </p>
                    )}
                    {errors.nickName?.type === 'maxLength' && (
                        <p role="alert" className="text-alert">
                            닉네임은 80자 이하로 입력해주세요
                        </p>
                    )}
                </label>
                <label htmlFor="gender" className="flex flex-col gap-2 w-full">
                    <span className="text-sm">성별</span>
                    <Controller
                        name="gender"
                        control={control}
                        render={({ field }) => (
                            <div className="toggle-group w-full gap-1">
                                {genderList.map((item) => (
                                    <button
                                        key={item.value}
                                        type="button"
                                        onClick={() => field.onChange(item.value)}
                                        className={`flex flex-row justify-center items-center w-1/2 ${
                                            watchGender === item.value
                                                ? 'button-bg-primary stroke-background'
                                                : 'bg-gray-100'
                                        }`}
                                    >
                                        {item.icon}
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    />
                </label>

                <label htmlFor="birthday" className="flex flex-col gap-1 w-full">
                    <span className="text-sm">생년월일</span>
                    <div className="flex flex-row gap-2 w-full">
                        <select
                            id="calendarType"
                            className="w-1/4"
                            {...register('calendarType', { required: true })}
                        >
                            <option value="solar">양력</option>
                            <option value="lunar">음력</option>
                            <option value="leap">음력 윤달</option>
                        </select>
                        <div className="flex flex-col gap-1 w-3/4 ">
                            <input
                                {...register('birthday', { required: true })}
                                id="birthday"
                                type="date"
                                min="1900-01-01"
                                max="2050-12-31"
                                className={`w-full ${errors.birthday && 'border-red-500 focus-visible:ring-2 focus-visible:ring-red-500'}`}
                            />
                            {errors.birthday?.type === 'required' && (
                                <p role="alert" className="text-alert">
                                    생년월일을 입력해주세요
                                </p>
                            )}
                        </div>
                    </div>
                </label>
                <label htmlFor="birthtime" className="flex flex-col w-full gap-1">
                    <span className="text-sm">태어난 시간</span>
                    <div className="flex flex-row flex-wrap items-center w-full gap-4">
                        <div className="flex flex-col gap-1 w-68">
                            <input
                                {...register('birthtime', { required: true })}
                                id="birthtime"
                                type="time"
                                className={`w-full ${errors.birthtime && 'border-red-500 focus-visible:ring-2 focus-visible:ring-red-500'}`}
                            />
                            {errors.birthtime?.message && (
                                <p role="alert" className="text-alert">
                                    {errors.birthtime.message}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col gap-1">
                            <div className="flex flex-row items-center gap-4">
                                <div className="flex flex-row items-center">
                                    <input {...register('isNone')} type="checkbox" name="isNone" />
                                    <label htmlFor="isNone" className="text-full-ellipsis">
                                        시간 모름
                                    </label>
                                </div>
                                <div className="flex flex-row items-center">
                                    <input
                                        {...register('isDivideTime')}
                                        type="checkbox"
                                        name="isDivideTime"
                                    />
                                    <label htmlFor="isDivideTime" className="text-full-ellipsis">
                                        야/조자시 적용
                                    </label>
                                </div>
                            </div>
                            {errors.birthtime?.message && (
                                <p role="alert" className="text-transparent">
                                    {errors.birthtime.message}
                                </p>
                            )}
                        </div>
                    </div>
                </label>
                <label htmlFor="birthLocation" className="flex flex-col gap-1 w-full">
                    <span className="text-sm">태어난 장소</span>
                    <div className="relative">
                        <input
                            {...register('birthLocation', { required: true, maxLength: 80 })}
                            id="birthLocation"
                            type="text"
                            placeholder="태어난 장소를 입력해주세요."
                            onFocus={onFocusBirthLocate}
                            className={`w-full pl-12 ${errors.birthLocation && 'border-red-500 focus-visible:ring-2 focus-visible:ring-red-500'}`}
                        />
                        <div className="absolute top-1/2 left-0 translate-x-5 -translate-y-1/2">
                            <Search size={18} />
                        </div>
                    </div>
                    {errors.birthLocation?.type === 'required' && (
                        <p role="alert" className="text-alert">
                            태어난 장소를 입력해주세요
                        </p>
                    )}
                </label>

                <div className="w-full h-[1px] my-4 bg-gray-100"></div>
                <div className="flex flex-row w-full gap-4">
                    <button
                        type="submit"
                        className="flex flex-row justify-center items-center rounded-4xl w-full button-bg-primary large"
                        onClick={onClickEvent}
                    >
                        조회하기
                    </button>
                </div>
            </form>
        </div>
    );
}
