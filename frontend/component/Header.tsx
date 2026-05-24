'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const list = [
    { name: '대시보드', key: 'dashboard' },
    { name: '만세력', key: 'manseryeok' },
];

export default function Header() {
    const pathName = usePathname();
    console.log(pathName);

    return (
        <div className="flex flex-row justify-end items-center w-full">
            <ul className="flex flex-row justify-start">
                <li className={pathName === '/' + list[0].key ? `bg-background` : 'bg-gray-100'}>
                    <div className="h-full py-2 px-6 rounded-bl-none rounded-br-2xl rounded-t-none bg-gray-100"></div>
                </li>
                {list.map((item, idx) => {
                    return (
                        <li key={item.key} className={`rounded-t-2xl bg-background`}>
                            <Link
                                href={`/${item.key}`}
                                className={`py-2 px-6 rounded-t-2xl ${idx === 0 ? 'rounded-none rounded-br-2xl' : idx === list.length - 1 ? 'rounded-none rounded-bl-2xl' : ''} ${'/' + item.key === pathName ? 'bg-background' : 'bg-gray-100'}`}
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
