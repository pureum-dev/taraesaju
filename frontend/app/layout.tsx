import type { Metadata } from 'next';

/** CSS */
import '@/style/globals.css';

export const metadata: Metadata = {
    title: 'Tarae Saju',
    description: 'Manseryeok Website',
    icons: {
        icon: [
            /*{ url: '/images/favicon/favicon.ico', type: 'image/x-icon' },
            { url: '/images/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
            { url: '/images/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
            {
                url: '/images/favicon/android-chrome-192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                url: '/images/favicon/android-chrome-512x512.png',
                sizes: '512x512',
                type: 'image/png',
            },*/
        ],
        apple: /*[{ url: '/images/favicon/apple-touch-icon.png', sizes: '180x180' }],*/ [],
    },
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
                <main className="bg-background">
                    {children}
                    {modal}
                </main>
            </body>
        </html>
    );
}
