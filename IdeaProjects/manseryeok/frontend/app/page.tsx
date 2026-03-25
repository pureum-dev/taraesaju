import Link from 'next/link';
import Image from 'next/image';

/** Lib */
import { CalendarDays, FileText } from 'lucide-react';

/** custom */
import LogoSvg from '@/public/svg/logo.svg';

export default function Home() {
    return (
        <div className="flex justify-center items-center w-full h-screen mx-auto p-8 md:max-w-160 ">
            <div className="flex flex-col items-start gap-10 w-full px-8 py-12 border border-gray-200 rounded-3xl">
                <div className="flex flex-row justify-center items-center w-full">
                    <Image src={LogoSvg} alt="logo" className="w-40 mr-4" />
                </div>
                <div className="flex flex-row w-full gap-4">
                    <Link
                        href={'/info?type=chart'}
                        className="flex flex-row justify-center items-center large w-1/2 h-20 button-bg-primary"
                    >
                        <CalendarDays fontSize={14} className="mr-1" />
                        만세력 보기
                    </Link>
                    <Link
                        href={'/info?type=explanation'}
                        className="flex flex-row justify-center items-center large w-1/2 h-20 button-bg-secondary"
                    >
                        <FileText fontSize={14} className="mr-1" />
                        사주 원국 해설
                    </Link>
                </div>
            </div>
        </div>
    );
}
