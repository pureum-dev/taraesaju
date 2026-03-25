'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';

export default function BasicModalComp({
    children,
    isSave = true,
    onClickSave,
    onClickClose,
}: {
    children: ReactNode;
    isSave: boolean;
    onClickSave?: () => void;
    onClickClose?: () => void;
}) {
    const router = useRouter();

    const onClickSaveEvent = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (onClickSave) {
            onClickSave();
        }
    };

    const onClickCloseEvent = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (onClickClose) {
            onClickClose();
        }

        router.back();
    };

    return (
        <div className="absolute top-0 left-0 w-full h-dvh bg-gray-900/30">
            <div className="absolute top-1/2 left-1/2 -translate-1/2 flex flex-col bg-background px-6 py-8 w-auto min-w-80 max-w-[calc(100% - 8rem)] min-h-1/2 max-h-4/5 rounded-3xl">
                <div className="flex flex-1 flex-col">{children}</div>
                <div className="flex flex-row justify-end w-full gap-3">
                    <button className="medium button-outline-primary" onClick={onClickCloseEvent}>
                        닫기
                    </button>
                    {isSave && (
                        <button className="medium button-bg-primary" onClick={onClickSaveEvent}>
                            저장
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
