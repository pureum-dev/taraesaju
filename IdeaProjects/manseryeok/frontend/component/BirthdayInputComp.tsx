'use client';

import { useRouter } from 'next/navigation';

/** Lib */
import { Mars, Venus, Search, FileText } from 'lucide-react';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';

/** Custom */
import { timeList, divideTimeList } from '@/common/const';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

type Inputs = {
    example: string;
    exampleRequired: string;
    nickName: string;
    gender: 'M' | 'F';
    calendarType: 'solar' | 'lunar' | 'leap';
    birthday: Date;
    birthtime: string;
    isNone: boolean;
    isDivideTime: boolean;
    birthLocation: string;
};

const genderList = [
    { value: 'M', label: '남성', icon: <Mars size={15} className="mr-1" /> },
    { value: 'F', label: '여성', icon: <Venus size={15} className="mr-1" /> },
];

export default function BirthdayInputComp() {
    const router = useRouter();
    const searchParam = useSearchParams();
    const type = searchParam.get('type');

    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors },
    } = useForm<Inputs>({
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
    const watchIsNone = watch('isNone');
    const watchIsDivideTime = watch('isDivideTime');
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

    const [birthTimeList, setBirthTimeList] = useState(timeList);

    useEffect(() => {
        if (watchIsDivideTime) {
            setBirthTimeList(divideTimeList);
        } else {
            setBirthTimeList(timeList);
        }
    }, [watchIsDivideTime]);

    const onFocusBirthLocate = (e: React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault();
        router.push('/info/modal');
    };

    const onClickEvent = useCallback(() => {
        if (type) {
        }
    }, [type]);

    return (
        <div className="flex justify-center items-center w-full h-screen mx-auto p-8 md:max-w-160">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col items-start gap-5 w-full px-8 py-12 border border-gray-200 rounded-3xl"
            >
                <label htmlFor="nickName" className="flex flex-col gap-2 w-full">
                    <span className="text-sm">닉네임</span>
                    <input
                        id="nickName"
                        type="text"
                        placeholder="닉네임을 입력해주세요."
                        {...register('nickName', { required: true, maxLength: 80 })}
                    />
                </label>
                <label htmlFor="gender" className="flex flex-col gap-2 w-full">
                    <span className="text-sm">성별</span>
                    <Controller
                        name="gender"
                        control={control}
                        render={({ field }) => (
                            <div className="toggle-group w-full gap-2">
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

                <label htmlFor="birthday" className="flex flex-col gap-2 w-full">
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
                        <input
                            id="birthday"
                            type="date"
                            className="w-3/4"
                            {...register('birthday', { required: true, maxLength: 80 })}
                        />
                    </div>
                </label>
                <label htmlFor="birthtime" className="flex flex-col w-full gap-2">
                    <span className="text-sm">태어난 시간</span>
                    <div className="flex flex-row flex-wrap items-center w-full gap-4">
                        <select
                            id="birthtime"
                            className="flex-1"
                            {...register('birthtime', { required: true })}
                            disabled={watchIsNone}
                        >
                            <option value="">--시간을 선택해주세요.--</option>
                            {birthTimeList.map((item) => (
                                <option key={item.key} value={item.key}>
                                    {item.label + ' / ' + item.startTime + ' ~ ' + item.endTime}
                                </option>
                            ))}
                        </select>

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
                    </div>
                </label>
                <label htmlFor="birthLocation" className="flex flex-col gap-2 w-full">
                    <span className="text-sm">태어난 장소</span>
                    <div className="relative">
                        <input
                            id="birthLocation"
                            type="text"
                            placeholder="태어난 장소를 입력해주세요."
                            className="w-full pl-12"
                            onFocus={onFocusBirthLocate}
                            {...register('birthLocation', { required: true, maxLength: 80 })}
                        />
                        <div className="absolute top-1/2 left-0 translate-x-4 -translate-y-1/2">
                            <Search size={18} />
                        </div>
                    </div>
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
