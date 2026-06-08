'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const list = [
    { name: '대시보드', key: 'dashboard' },
    { name: '만세력', key: 'manseryeok' },
];

export default function Header() {
    const pathName = usePathname();

    return (
        <div className="flex flex-row justify-end items-center w-full">
            <ul className="flex flex-row justify-start mr-6">
                {list.map((item, idx) => {
                    return (
                        <li key={item.key} className={`rounded-t-2xl bg-background`}>
                            <Link
                                href={`/${item.key}`}
                                className={`py-2 px-6 rounded-t-2xl ${idx === 0 ? 'rounded-none rounded-br-2xl' : idx === list.length - 1 ? 'rounded-none rounded-bl-2xl' : ''} ${'/' + item.key === pathName ? 'bg-background' : 'bg-gray-50 dark:bg-gray-800'}`}
                            >
                                {item.name}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
