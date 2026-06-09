import Link from 'next/link';
import { headers } from 'next/headers';
import Header from '@/component/Header';

export default function MainLayout({
    children,
    modal,
}: Readonly<{
    children: React.ReactNode;
    modal: React.ReactNode;
}>) {
    const pathUrl = headers();
    return (
        <>
            <div className="flex flex-col justify-start items-start w-full min-h-dvh p-4 bg-gray-100 dark:bg-gray-950">
                <Header />
                <div className="flex flex-col flex-1 w-full justify-start items-start rounded-3xl bg-background">
                    {children}
                </div>
            </div>
        </>
    );
}
