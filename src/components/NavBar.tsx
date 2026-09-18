'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { BsLockFill, BsPersonFillAdd, BsList, BsArrowLeftSquareFill, BsBag } from "react-icons/bs";
import Link from 'next/link';
import ImageProfileNavbar from './ImageProfileNavbar';
import { useCartStore } from '@/stores/cartStore';

const Menu = [
    { id: 1, title: "Home", path: "/home" },
    { id: 2, title: "Profile", path: "/profile" },
    { id: 3, title: "Product", path: "/product" },
    { id: 4, title: "Farmer/Partnership", path: "/partner" },
    { id: 5, title: "News", path: "/news" },
    { id: 6, title: "Contact", path: "/contact" },
]

const NavBar = () => {
    return (
        <>
            <div className='hidden lg:block'>
                <DesktopNavbar />
            </div>
            <div className='block lg:hidden'>
                <MobileNavbar />
            </div>
        </>
    )
}

const DesktopNavbar = () => {
    const totalItems = useCartStore((state) => state.getTotalItems());
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className='absolute top-0 z-2 w-full'>
            <div className='grid grid-cols-12 w-full h-20 items-center justify-center py-2 px-1 md:px-10'>
                <div className='col-span-3 flex justify-end w-full '>
                    <Image
                        alt='Icon App'
                        src={`/images/logo_light.png`}
                        width={100}
                        height={10}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        priority
                        loading="eager"
                        style={{ width: '60%', height: 'auto' }}
                    />
                </div>
                <div className='col-span-6 w-full flex justify-center items-center'>
                    <ul className='flex gap-1'>
                        {
                            Menu.map((item) => (
                                <li className='flex w-full cursor-pointer' key={item.id}>
                                    <Link href={item.path}>
                                        <p className='
                                        px-5 py-2 
                                        border-b-2 border-transparent 
                                        hover:border-amber-400
                                        font-bold text-[14px]
                                        transition-colors duration-200
                                    '>
                                            {item.title}
                                        </p>
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>

                <div className='col-span-3 h-full flex items-center justify-end gap-3'>
                    <Link
                        href="/cart"
                        aria-label="Keranjang Belanja"
                        className='relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/40 shadow-sm backdrop-blur-md transition hover:bg-amber-100 hover:text-amber-800'
                    >
                        <BsBag className='text-lg text-neutral-800' />
                        {mounted && totalItems > 0 && (
                            <span className='absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-600 text-[10px] font-bold text-white shadow'>
                                {totalItems}
                            </span>
                        )}
                    </Link>
                    <ImageProfileNavbar />
                </div>
            </div>
        </div>
    )
}

const MobileNavbar = () => {
    const [isShow, setIsShow] = useState(false)
    const totalItems = useCartStore((state) => state.getTotalItems());
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className='static flex'>
            <div onClick={() => { setIsShow(!isShow) }} className='absolute z-2 text-black top-5 left-5 cursor-pointer'>
                <BsList className='text-white text-[38px]' />
            </div>

            <Link
                href="/cart"
                aria-label="Keranjang Belanja"
                className='absolute right-5 top-5 z-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/40 shadow-sm backdrop-blur-md transition hover:bg-amber-100'
            >
                <BsBag className='text-lg text-neutral-800' />
                {mounted && totalItems > 0 && (
                    <span className='absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-600 text-[10px] font-bold text-white shadow'>
                        {totalItems}
                    </span>
                )}
            </Link>

            {
                isShow && (
                    <div className='fixed h-full w-70 z-9 bg-white/50 backdrop-blur-md border-5 border-white/20 '>
                        <button onClick={() => { setIsShow(!isShow) }} className='absolute -right-15 top-1 rounded-full flex justify-center items-center'>
                            <BsArrowLeftSquareFill className='text-[50px] opacity-50' />
                        </button>
                        <div className='flex justify-center items-center w-full pt-5 pb-5 border-dashed border-b border-black/20'>
                            <Image
                                alt='Icon App'
                                src={`/images/logo_dark.png`}
                                width={100}
                                height={10}
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                priority
                                loading="eager"
                                style={{ width: '60%', height: 'auto' }}
                            />
                        </div>
                        <ul>
                            {
                                Menu.map((item, index) => (
                                    <li key={index} className='border-dashed border-b border-black/20 px-5 py-3'>
                                        <Link className='cursor-pointer' href={item.path} onClick={() => setIsShow(false)}>
                                            <p className='text-neutral-800 text-[16px] font-bold'>{item.title}</p>
                                        </Link>
                                    </li>
                                ))
                            }
                            <li className='border-dashed border-b border-black/20 px-5 py-3'>
                                <Link className='flex items-center justify-between' href="/cart" onClick={() => setIsShow(false)}>
                                    <p className='text-amber-800 text-[16px] font-bold'>Keranjang Belanja</p>
                                    {mounted && totalItems > 0 && (
                                        <span className='rounded-full bg-amber-600 px-2 py-0.5 text-xs text-white'>
                                            {totalItems}
                                        </span>
                                    )}
                                </Link>
                            </li>
                        </ul>
                    </div>
                )
            }
        </div>
    )
}

export default NavBar
