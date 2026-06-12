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
        <div className="flex flex-row justify-between items-center w-full pb-2 border-b border-dashed mb-4">
            <div className="flex flex-col flex-1 gap-0.5 ">
                <div className="flex items-center gap-1.5">
                    {icon && <div className="flex justify-center items-center w-4 h-4">{icon}</div>}
                    <h3 className="font-extrabold">{title}</h3>
                </div>
                {subTitle && (
                    <span className="pt-2 text-gray-600 dark:text-gray-400">{subTitle}</span>
                )}
            </div>
            <div>{titleSide}</div>
        </div>
    );
}
