import { ReactNode } from 'react';

/** type */
interface sectionProps {
    title: string;
    subTitle?: string;
    titleSide?: ReactNode;
    icon?: ReactNode;
}

export default function SubTitleComp({ icon, title, titleSide, subTitle }: sectionProps) {
    return (
        <div className="flex flex-row justify-between items-center w-full mb-3.5">
            <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-1.5">
                    {icon && (
                        <div className="flex justify-center items-center w-6 h-6 p-1 border-1 border-gray-800 rounded-lg dark:border-gray-200">
                            {icon}
                        </div>
                    )}
                    <h3 className="text-xl font-extrabold">{title}</h3>
                </div>
                {subTitle && <span className=" text-gray-600 dark:text-gray-400">{subTitle}</span>}
            </div>
            {titleSide}
        </div>
    );
}
