import { ReactNode } from 'react';
import SubTitleComp from './SubTitleComp';

/** type */
interface sectionProps {
    title: string;
    subTitle?: string;
    titleSide?: ReactNode;
    icon?: ReactNode;
    className?: string;
    children?: ReactNode;
}

const SectionContents = ({
    icon,
    title,
    titleSide,
    subTitle,
    className,
    children,
}: sectionProps) => {
    return (
        <div className="flex flex-col w-full">
            <SubTitleComp title={title} subTitle={subTitle} titleSide={titleSide} icon={icon} />
            <div
                className={`flex flex-col grow gap-2 w-full p-6 rounded-2xl bg-gray-100 dark:bg-gray-900 ${className}`}
            >
                {children}
            </div>
        </div>
    );
};

SectionContents.displayName = 'SectionContents';
export default SectionContents;
