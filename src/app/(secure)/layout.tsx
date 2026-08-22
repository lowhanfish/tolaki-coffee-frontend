'use client';

import { ReactNode } from 'react'
import AdminSidebar from '@/components/AdminSidebar'
import { IoIosMenu } from "react-icons/io";
import Image from 'next/image';
import Link from 'next/link';





interface ChildrensProps {
    children: ReactNode
}


const layout = ({ children }: ChildrensProps) => {
    return (


        <div className='w-full h-full flex flex-col text-neutral-800'>



            <div className='w-full h-full flex'>
                <AdminSidebar />

                <div className='flex-1 flex flex-col'>
                    <div className='h-17 bg-linear-to-l from-yellow-600 to-white items-center p-5 flex flex-row shadow-sm'>
                        <div className='flex-1 flex gap-2 items-center'>
                            <div className='rounded-full bg-amber-200 p-3 cursor-pointer shadow-sm'>
                                <IoIosMenu />
                            </div>
                            <p className='text-neutral-600 font-semibold text-[16px]'>Dashboard</p>
                        </div>
                        <div className='flex-1 flex gap-2 items-center justify-end'>
                            {/* <p className='text-white font-semibold text-[12px]'>Kiken SB</p> */}


                            <Image
                                alt='Image User'
                                src={`/images/user.png`}
                                width={39}
                                height={39}
                                className='object-center rounded-full border-2 border-white cursor-pointer'
                            />
                        </div>
                    </div>

                    <div className='flex-1 p-[7px_7px_0px_7px] overflow-scroll'>

                        <div className='bg-neutral-50/50 rounded-md p-[13px_13px_13px_13px]'>
                            {children}
                        </div>
                    </div>
                </div>

            </div>


        </div>
    )
}

export default layout
