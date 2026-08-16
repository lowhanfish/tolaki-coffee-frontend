"use client"
import Image from 'next/image'
import { useState } from 'react'
import { BsChevronLeft, BsChevronRight, BsSearch, BsNutFill } from "react-icons/bs";

const ProductImageSection = () => {

    const [iconShow, setIconShow] = useState<boolean>(false)

    return (
        <div>
            <div className='w-full h-100 relative'>
                <Image
                    alt='Product Image'
                    src={`/images/kopi4.png`}
                    sizes='(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw'
                    fill
                    className='object-cover'
                    loading='eager'
                />

                <div className='absolute inset-0 bg-linear-to-r from-black/70 via-transparent to-black/70'>

                </div>

                <div className='absolute inset-0 flex'>
                    <button className='w-20 flex items-center justify-center cursor-pointer'>
                        <BsChevronLeft className='text-white text-[20px]' />
                    </button>
                    <div
                        className='
                        flex-1 flex items-center justify-center
                        cursor-pointer
                        
                    '
                        onMouseEnter={() => setIconShow(true)}
                        onMouseLeave={() => setIconShow(false)}
                    >
                        {iconShow && (
                            <BsSearch className='text-white text-[35px]' />
                        )}
                    </div>
                    <button className='w-20 flex items-center justify-center cursor-pointer'>
                        <BsChevronRight className='text-white text-[20px]' />
                    </button>
                </div>

                <div className='absolute bottom-5 flex gap-2 justify-center w-full text-white'>
                    <BsNutFill className='cursor-pointer text-amber-300' />
                    <BsNutFill className='cursor-pointer' />
                    <BsNutFill className='cursor-pointer' />
                </div>


            </div>




        </div>
    )
}

export default ProductImageSection
