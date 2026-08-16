import Image from 'next/image'
import React from 'react'
import { BsFillCartCheckFill, BsCartPlusFill, BsFillStarFill, BsChevronLeft, BsChevronRight } from "react-icons/bs";

const ProductImageSection = () => {
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
            </div>



            <div className='
                absolute inset-0 
                bg-red-300
                flex
            '>
                <button className='w-10 flex items-center justify-center bg-blue-300'>
                    <BsChevronLeft className='' />
                </button>
                <div className='flex-1 flex items-center justify-center'>yyy</div>
                <button className='w-10 flex items-center justify-center bg-blue-300'>zzz</button>
            </div>
        </div>
    )
}

export default ProductImageSection
