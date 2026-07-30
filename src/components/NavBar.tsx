'use client'
import { useState } from 'react'
import Image from 'next/image'
import { BsLockFill, BsPersonFillAdd, BsList, BsArrowLeftSquareFill } from "react-icons/bs";
import Link from 'next/link';


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
                <div className='col-span-3'>
                    <div className='flex gap-2'>
                        <button className='w-20 h-6 border border-white bg-linear-to-l from-amber-300 to-amber-500 rounded-2xl font-bold text-[10px] cursor-pointer flex justify-center items-center gap-2'>
                            <BsLockFill />
                            <p className='text-shadow-2xs'>Login</p>
                        </button>
                        {/* <button className='w-20 h-6 border border-white bg-linear-to-l from-red-300 to-red-500 rounded-2xl font-bold text-[10px] cursor-pointer flex justify-center items-center gap-2'>
                            <BsPersonFillAdd />
                            <p className='text-shadow-2xs'>Register</p>
                        </button> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

const MobileNavbar = () => {

    const [isShow, setIsShow] = useState(false)

    return (
        <div className='static flex'>
            <div onClick={() => { setIsShow(!isShow) }} className='absolute z-2 text-black top-5 left-5 cursor-pointer'>
                <BsList className='text-white text-[38px]' />
            </div>
            {
                isShow && (
                    <div className='fixed h-full w-70 z-9 bg-white/50 backdrop-blur-md border-5 border-white/20 '>
                        <button onClick={() => { setIsShow(!isShow) }} className='absolute -right-15 top-1 rounded-full flex justify-center items-center'>
                            {/* <p className='opacity-70'>❌</p> */}
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
                                        <Link className='cursor-pointer' href={item.path}>
                                            <p className='text-neutral-800 text-[16px] font-bold'>{item.title}</p>
                                        </Link>
                                    </li>

                                ))
                            }
                        </ul>


                    </div>

                )
            }




        </div>
    )
}

export default NavBar
