"use client"
import Link from 'next/link'
import { Fragment, useState } from 'react'
import Image from 'next/image'

import useLogout from '@/hooks/useLogout';
import { usePathname } from 'next/navigation';
import { BsBoxArrowLeft, BsChevronRight } from 'react-icons/bs';

const Menu = [
    {
        id: "1",
        title: "Dashboard",
        path: "/secure/dashboard",
        icon: "▦",
        children: []
    },
    {
        id: "2",
        title: "Profile",
        path: "/secure/profile",
        icon: "●",
        children: []
    },
    {
        id: "3",
        title: "Products",
        path: "/secure/products",
        icon: "◆",
        children: []
    },
    {
        id: "4",
        title: "Farmer/Partnership",
        path: "/secure/farmer",
        icon: "♣",
        children: [
            {
                id: "4.1",
                title: "Headline & Impact",
                path: "/secure/farmer/headline-impact",
                icon: "",
                children: []
            },
            {
                id: "4.2",
                title: "Stories from the garden",
                path: "/secure/farmer/stories-garden",
                icon: "",
                children: []
            },
            {
                id: "4.3",
                title: "Partnership Standards",
                path: "/secure/farmer/partnership-standards",
                icon: "",
                children: []
            },
        ]
    },
    {
        id: "5",
        title: "News",
        path: "/secure/news",
        icon: "▤",
        children: []
    },
    {
        id: "6",
        title: "Contact",
        path: "/secure/contact",
        icon: "✉",
        children: []
    },
    {
        id: "7",
        title: "Back to Website",
        path: "/home",
        icon: "↗",
        children: []
    },
]

const AdminSidebar = () => {
    const logout = useLogout()

    return (
        <aside className='flex h-full w-64 shrink-0 flex-col border-r border-white/10 bg-neutral-950 text-white shadow-xl'>
            <div className='relative'>
                <Image
                    alt='Kopi Tolaki'
                    src='/images/card.webp'
                    width={500}
                    height={300}
                    className='h-31 w-full object-cover opacity-75'
                    loading="eager"
                />
                <div className='absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/20 to-transparent' />
                <div className='absolute inset-x-0 bottom-0 px-5 pb-3'>
                    <p className='text-[9px] font-semibold uppercase tracking-[0.2em] text-amber-400'>Kopi Tolaki</p>
                    <p className='mt-0.5 text-sm font-bold text-white'>Administrator</p>
                </div>
            </div>
            <nav className='flex-1 overflow-y-auto px-3 py-4' aria-label='Navigasi admin'>
                {
                    Menu.map((item) => (
                        <SideBarItem key={item.id} item={item} />
                    ))
                }

            </nav>
            <div className='border-t border-white/8 p-3'>
                <button onClick={() => logout.mutate()} className='flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs font-semibold text-neutral-400 transition hover:bg-rose-500/10 hover:text-rose-300'>
                    <BsBoxArrowLeft className='text-base' />
                    <span>Keluar</span>
                </button>
            </div>
        </aside>
    )
}


interface MenuItem {
    id: string,
    title: string,
    path: string,
    icon: string,
    children: MenuItem[]
}

interface ItemProps {
    item: MenuItem,
    level?: number;
}


const SideBarItem = ({ item, level = 1 }: ItemProps) => {

    const pathname = usePathname()
    const isChildActive = item.children.some((child) => pathname === child.path)
    const [isShow, setIshow] = useState(isChildActive);
    const isActive = pathname === item.path

    return (
        <div className='mb-1' key={item.id} >

            {
                item.children && item.children.length > 0 ? (
                    <Fragment>
                        <button
                            onClick={() => {
                                setIshow(!isShow)
                            }}
                            className={`flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-left transition ${isChildActive ? 'bg-amber-400/10 text-amber-300' : 'text-neutral-400 hover:bg-white/5 hover:text-white'}`}
                        >
                            <div className='flex h-7 w-7 items-center justify-center rounded-md bg-white/5 text-sm'>{item.icon}</div>
                            <div className='flex w-full items-center text-xs font-semibold'>
                                <p className='flex-1'>{item.title}</p>
                                <BsChevronRight className={`text-[10px] transition ${isShow && 'rotate-90'}`} />
                            </div>
                        </button>

                        {
                            item.children.map((item) => (
                                <Fragment key={item.id}>
                                    {
                                        isShow && (
                                            <SideBarItem item={item} level={level + 1} />
                                        )
                                    }
                                </Fragment>
                            ))
                        }
                    </Fragment>
                ) : (
                    <>
                        <Link className='block' href={item.path}>
                            <button
                                className={`flex w-full cursor-pointer items-center gap-3 rounded-lg py-2.5 pr-3 text-left text-xs transition ${level > 1 ? 'pl-13' : 'pl-3'} ${isActive ? 'bg-amber-500 font-bold text-neutral-950 shadow-sm shadow-amber-950/20' : 'font-semibold text-neutral-400 hover:bg-white/5 hover:text-white'}`}
                            >
                                {level === 1 && <div className={`flex h-7 w-7 items-center justify-center rounded-md text-sm ${isActive ? 'bg-black/10' : 'bg-white/5'}`}>{item.icon}</div>}
                                {level > 1 && <span className={`h-1.5 w-1.5 rounded-full ${isActive ? 'bg-neutral-900' : 'bg-neutral-600'}`} />}
                                <div>{item.title}</div>
                            </button>
                        </Link>
                    </>
                )
            }

        </div>
    )
}

export default AdminSidebar
