import { ReactNode } from 'react';

interface tooltipValue {
    children: ReactNode;
}

export default function TooltipComp({ children }: tooltipValue) {
    return (
        <div className="flex flex-row justify-center items-center absolute top-full left-full p-4 text-nowrap bg-background rounded-xl shadow-lg z-30 text-sm opacity-0 invisible transition-all group-hover:opacity-100 group-hover:visible">
            {children}
        </div>
    );
}
