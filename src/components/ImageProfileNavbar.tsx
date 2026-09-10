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
                        <div className='flex gap-1 items-center h-full '>
                            <div onClick={() => setIsShowDropDown(!isShowDropDown)} className='h-10 w-10 rounded-full border border-white/50 relative overflow-hidden cursor-pointer'>

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
                            </div>
                            <p className='text-[12px]'>{profile?.name}</p>
                        </div>
                        {
                            isShowDropDown && (

                                <div className='relative w-full'>
                                    <div className='absolute'>
                                        <ul className='bg-white rounded-2xl font-semibold py-2 px-4 text-neutral-600 text-[12px]'>
                                            <li className='cursor-pointer'>
                                                <div className='flex items-center gap-2 py-1.5'>
                                                    <BsFillPersonFill />
                                                    <p>Profile</p>
                                                </div>
                                            </li>
                                            <li className='cursor-pointer'>
                                                <div className='flex items-center gap-2 py-1.5'>
                                                    <BsFillGearFill />
                                                    <p>Settings</p>
                                                </div>
                                            </li>
                                            <li className='cursor-pointer'>
                                                <div onClick={() => logOut.mutate()} className='flex items-center gap-2 py-1.5'>
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
