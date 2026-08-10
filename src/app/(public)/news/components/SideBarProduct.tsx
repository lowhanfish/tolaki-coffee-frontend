"use client"

import { useState } from 'react'

import { BsChevronRight } from "react-icons/bs";

const SideBarProduct = () => {

    return (
        <div>
            <p className='text-[22px] font-bold'>Product</p>
            <div className='bg-white shadow-sm p-3 rounded-md mt-4'>
                <div className='py-1 pb-5 border-b border-neutral-300'>
                    <div className='flex items-center cursor-pointer py-2'>
                        <div className='flex-1 pb-2 text-[15px] font-semibold text-neutral-600'>
                            <span>Kategori</span>
                        </div>
                        <BsChevronRight className='text-[16px] items-end' />
                    </div>
                    <div className='flex flex-col gap-1.5'>
                        <label className='flex items-center gap-2 cursor-pointer'>
                            <input
                                type="radio"
                                name='gender'
                                className='h-5 w-5 accent-amber-600 cursor-pointer'
                            />
                            <span className='text-[12px] font-semibold text-neutral-600 '>Biji Kopi</span>
                        </label>
                        <label className='flex items-center gap-2 cursor-pointer'>
                            <input
                                type="radio"
                                name='gender'
                                className='h-5 w-5 accent-amber-600 cursor-pointer'
                            />
                            <span className='text-[12px] font-semibold text-neutral-600 '>Kopi Bubuk</span>
                        </label>
                    </div>
                </div>

                <div className='py-1 pb-5 border-b border-neutral-300'>
                    <div className='flex items-center cursor-pointer py-2'>
                        <div className='flex-1 pb-2 text-[15px] font-semibold text-neutral-600'>
                            <span>Jenis Roasting</span>
                        </div>
                        <BsChevronRight className='text-[16px] items-end' />
                    </div>
                    <div className='flex flex-col gap-1.5'>
                        <label className='flex items-center gap-2 cursor-pointer'>
                            <input
                                type="radio"
                                name='gender'
                                className='h-5 w-5 accent-amber-600 cursor-pointer'
                            />
                            <span className='text-[12px] font-semibold text-neutral-600 '>Light</span>
                        </label>
                        <label className='flex items-center gap-2 cursor-pointer'>
                            <input
                                type="radio"
                                name='gender'
                                className='h-5 w-5 accent-amber-600 cursor-pointer'
                            />
                            <span className='text-[12px] font-semibold text-neutral-600 '>Medium</span>
                        </label>
                        <label className='flex items-center gap-2 cursor-pointer'>
                            <input
                                type="radio"
                                name='gender'
                                className='h-5 w-5 accent-amber-600 cursor-pointer'
                            />
                            <span className='text-[12px] font-semibold text-neutral-600 '>Dark</span>
                        </label>
                    </div>
                </div>



            </div>

        </div>
    )
}

export default SideBarProduct
