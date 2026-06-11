'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

/** Lib */
import { Mars, Venus, Search } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';

import { useRegionStore } from '@/lib/store/useRegionStore';
import { useDataStore } from '@/lib/store/useDataStore';

/** Custom */
import LogoSvg from '@/public/svg/logo.svg';
import LogoDarkSvg from '@/public/svg/logo_dark.svg';

/** Type & Interface */
import { RegionJsonData } from '@/type/jsonDataInterface';
import { birthDataInterface, birthDataService } from '@/service/birthDataService';

const genderList = [
    { value: 'M', label: '남성', icon: <Mars size={15} className="mr-1" /> },
    { value: 'F', label: '여성', icon: <Venus size={15} className="mr-1" /> },
];

export default function BirthdayInputComp() {
    const router = useRouter();

    const RegionJsonData = useRegionStore((state) => state.RegionJsonData);
    const resetRegionJsonData = useRegionStore((state) => state.resetRegionJsonData);
    const { setProfileData, setData } = useDataStore();

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
            birthday: '',
            birthtime: '',
            isNone: false,
            isDivideTime: false,
            birthLocation: '',
        },
    });

    const watchGender = watch('gender');
    const watchIsNone = watch('isNone');

    const onFocusBirthLocate = (e: React.FocusEvent<HTMLInputElement>) => {
        e.preventDefault();
        router.push('/info/modal');
    };

    const onClickEvent = handleSubmit(async (data: Omit<birthDataInterface, 'location'>) => {
        if (!RegionJsonData) return;

        const request = {
            ...data,
            location: RegionJsonData as RegionJsonData,
        };
        const response = await birthDataService.getBirthData(request);
        if (response) {
            setProfileData(request);
            setData(response);
            router.push('/dashboard');
        }
    });

    useEffect(() => {
        return () => resetRegionJsonData();
    }, []);

    useEffect(() => {
        if (RegionJsonData) {
            setValue(
                'birthLocation',
                `${RegionJsonData.geo_name} / ${RegionJsonData.alternate_name}`,
            );
        }
    }, [RegionJsonData, setValue]);

    return (
        <div className="flex justify-center items-center w-full h-screen mx-auto p-8 md:max-w-160">
            <form className="flex flex-col items-start gap-5 w-full px-8 py-12 border rounded-3xl">
                <div className="flex flex-row justify-center items-center w-full">
                    {/* 라이트 모드일 때만 보임 */}
                    <Image src={LogoSvg} alt="logo" className="w-40 mr-4 dark:hidden" />

                    {/* 다크 모드일 때만 보임 */}
                    <Image src={LogoDarkSvg} alt="logo" className="hidden w-40 mr-4 dark:block" />
                </div>
                <label htmlFor="nickName" className="flex flex-col gap-1 w-full">
                    <span className="text-sm">닉네임</span>
                    <input
                        {...register('nickName', {
                            required: '닉네임을 입력해주세요.',
                            maxLength: {
                                value: 80,
                                message: '닉네임은 80자 이하로 입력해주세요.',
                            },
                        })}
                        id="nickName"
                        type="text"
                        placeholder="닉네임을 입력해주세요."
                        className={`${errors.nickName && 'border-red-500 focus-visible:ring-2 focus-visible:ring-red-500'}`}
                    />
                    {errors.nickName?.message && (
                        <p role="alert" className="text-alert ml-3">
                            {errors.nickName.message}
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
                                                : 'bg-gray-100 dark:bg-gray-800'
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
                                {...register('birthday', {
                                    required: '생년월일을 입력해주세요',
                                    min: {
                                        value: '1901-01-01',
                                        message:
                                            '1901년 ~ 2049년 사이의 생년월일만 입력할 수 있어요.',
                                    },
                                    max: {
                                        value: '2049-12-31',
                                        message:
                                            '1901년 ~ 2049년 사이의 생년월일만 입력할 수 있어요.',
                                    },
                                })}
                                id="birthday"
                                type="date"
                                min="1901-01-01"
                                max="2049-12-31"
                                className={`w-full ${errors.birthday && 'border-red-500 focus-visible:ring-2 focus-visible:ring-red-500'}`}
                            />
                            {errors.birthday?.message && (
                                <p role="alert" className="text-alert ml-3">
                                    {errors.birthday.message}
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
                                {...register('birthtime', {
                                    validate: {
                                        validTime: (value) => {
                                            if (!watchIsNone && !value) {
                                                return '태어난 시간을 입력해주세요';
                                            }
                                            return true;
                                        },
                                    },
                                })}
                                id="birthtime"
                                type="time"
                                className={`w-full ${errors.birthtime && 'border-red-500 focus-visible:ring-2 focus-visible:ring-red-500'}`}
                            />
                            {errors.birthtime?.message && (
                                <p role="alert" className="text-alert ml-3">
                                    {errors.birthtime.message}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col gap-1">
                            <div className="flex flex-row items-center gap-4">
                                <div className="flex flex-row items-center">
                                    <input {...register('isNone')} type="checkbox" id="isNone" />
                                    <label htmlFor="isNone" className="truncate">
                                        시간 모름
                                    </label>
                                </div>
                                <div className="flex flex-row items-center">
                                    <input
                                        {...register('isDivideTime')}
                                        type="checkbox"
                                        id="isDivideTime"
                                    />
                                    <label htmlFor="isDivideTime" className="truncate">
                                        야/조자시 적용
                                    </label>
                                </div>
                            </div>
                            {errors.birthtime?.message && (
                                <p role="alert" className="text-transparent ml-3">
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
                            {...register('birthLocation', {
                                required: '태어난 장소를 입력해주세요',
                                maxLength: 80,
                            })}
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
                    {errors.birthLocation?.message && (
                        <p role="alert" className="text-alert ml-3">
                            {errors.birthLocation.message}
                        </p>
                    )}
                </label>

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
