import Header from '@/common/component/Header';

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
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
