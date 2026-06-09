import { ReactNode } from 'react';
import { CircleQuestionMark } from 'lucide-react';

import TooltipComp from './TooltipComp';

export default function TooltipIconComp({
    className,
    children,
}: {
    className?: string;
    children: ReactNode;
}) {
    return (
        <span
            className={`relative group flex flex-row justify-center items-center w-4 h-4 ${className}`}
        >
            <CircleQuestionMark className="fill-mint-500 stroke-background" />
            <TooltipComp>{children}</TooltipComp>
        </span>
    );
}
