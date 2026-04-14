import type { Metadata } from 'next';
import '@/style/globals.css';

export const metadata: Metadata = {
    title: 'Tarae Saju',
    description: 'Manseryeok Website',
};

export default function RootLayout({
    children,
    modal,
}: Readonly<{
    children: React.ReactNode;
    modal: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <body>
                <main>
                    {children}
                    {modal}
                </main>
            </body>
        </html>
    );
}
