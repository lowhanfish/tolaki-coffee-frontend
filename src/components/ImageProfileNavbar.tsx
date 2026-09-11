'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { BsLockFill, BsFillPersonFill, BsFillGearFill } from "react-icons/bs";
import { useDataStore } from '@/stores/dataStore';
import useLogout from '@/hooks/useLogout';

const ImageProfileNavbar = () => {
    const url = useDataStore((state) => state.url);
    const isLogin = useDataStore((state) => state.isLogin);
    const profile = useDataStore((state) => state.profile);
    const [isShowDropDown, setIsShowDropDown] = useState<boolean>(false)
    const logOut = useLogout()
    const fallbackAvatarUrl = '/images/petani1.png'
    const avatarUrl = profile?.avatarUrl
        ? profile.avatarSource !== 'LOCAL'
            ? profile.avatarUrl
            : `${url}/uploads/profile/${profile.avatarUrl}`
        : fallbackAvatarUrl
    const isLocalAvatar = avatarUrl.startsWith(`${url}/`)

    return (
        <div className='h-full'>

            {/* <h1>Hy : <pre>{List} =</pre></h1> */}
            {
                isLogin == "authenticated" ? (
                    <>
                        <div className='flex h-full items-center gap-2'>
                            <button onClick={() => setIsShowDropDown(!isShowDropDown)} className='relative h-9 w-9 cursor-pointer overflow-hidden rounded-full border-2 border-white shadow-sm ring-1 ring-neutral-200'>

                                <Image
                                    alt='Profile Image'
                                    src={avatarUrl}
                                    fill
                                    className='object-cover'
                                    loading='eager'
                                    sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'
                                    unoptimized={isLocalAvatar}
                                    onError={(event) => {
                                        event.currentTarget.srcset = ''
                                        event.currentTarget.src = fallbackAvatarUrl
                                    }}
                                />
                            </button>
                            <div className='hidden text-left sm:block'>
                                <p className='text-[11px] font-bold text-neutral-700'>{profile?.name || 'Administrator'}</p>
                                <p className='text-[9px] text-neutral-400'>Pengelola konten</p>
                            </div>
                        </div>
                        {
                            isShowDropDown && (

                                <div className='relative w-full'>
                                    <div className='absolute right-0 top-2 z-30 w-44'>
                                        <ul className='rounded-xl border border-neutral-100 bg-white p-2 text-[11px] font-semibold text-neutral-600 shadow-xl'>
                                            <li className='cursor-pointer'>
                                                <div className='flex items-center gap-2 rounded-lg px-2 py-2 hover:bg-neutral-50'>
                                                    <BsFillPersonFill />
                                                    <p>Profile</p>
                                                </div>
                                            </li>
                                            <li className='cursor-pointer'>
                                                <div className='flex items-center gap-2 rounded-lg px-2 py-2 hover:bg-neutral-50'>
                                                    <BsFillGearFill />
                                                    <p>Settings</p>
                                                </div>
                                            </li>
                                            <li className='cursor-pointer'>
                                                <div onClick={() => logOut.mutate()} className='flex items-center gap-2 rounded-lg px-2 py-2 text-rose-600 hover:bg-rose-50'>
                                                    <BsLockFill />
                                                    <p>Logout</p>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>

                                </div>
                            )
                        }
                    </>
                ) : isLogin == "unauthenticated" ? (
                    <div className='flex gap-2 items-center h-full'>
                        <Link href="/login">
                            <button className='w-20 h-6 border border-white bg-linear-to-l from-amber-300 to-amber-500 rounded-2xl font-bold text-[10px] cursor-pointer flex justify-center items-center gap-2'>
                                <BsLockFill />
                                <p className='text-shadow-2xs'>Login</p>
                            </button>
                        </Link>
                    </div>
                ) : null
            }

        </div>
    )
}

export default ImageProfileNavbar
