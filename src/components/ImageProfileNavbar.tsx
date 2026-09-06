'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { BsLockFill, BsPersonFillAdd, BsList, BsArrowLeftSquareFill } from "react-icons/bs";
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';

const readData = async (url: string): Promise<any> => {
    const res = await fetch(url, {
        method: 'GET',
        credentials: 'include'
    })

    if (!res.ok) throw new Error(`Error : ${res.status}`)
    return res.json()
}

const ImageProfileNavbar = () => {



    var { data: List, isLoading, isError, error } = useQuery({
        queryFn: () => readData('http://localhost:3001/profile/me'),
        queryKey: ['MyProfile']
    })






    const [isLogin, setIsLogin] = useState<boolean>(false)
    return (
        <div className='h-full'>

            {/* <h1>Hy : <pre>{List} =</pre></h1> */}
            {
                isLogin ? (
                    <div className='flex gap-1 items-center h-full '>
                        <div className='h-10 w-10 rounded-full border border-white/50 relative overflow-hidden cursor-pointer'>

                            <Image
                                alt='Profile Image'
                                src={'/images/petani1.png'}
                                fill
                                className='object-cover'
                                loading='eager'
                                sizes='(max-widht:64-px) 100vw, (max-widht:1024px) 50vw, 25vw'
                            />
                        </div>
                        <p className='text-[12px]'>Kiken</p>
                    </div>
                ) : (
                    <div className='flex gap-2 items-center h-full'>
                        <Link href="/login">
                            <button className='w-20 h-6 border border-white bg-linear-to-l from-amber-300 to-amber-500 rounded-2xl font-bold text-[10px] cursor-pointer flex justify-center items-center gap-2'>
                                <BsLockFill />
                                <p className='text-shadow-2xs'>Login</p>
                            </button>
                        </Link>
                    </div>
                )
            }

        </div>
    )
}

export default ImageProfileNavbar
