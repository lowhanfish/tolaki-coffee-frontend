import Image from 'next/image'
import React from 'react'


const CardNewsList = () => {
    return (
        <div className='flex gap-2'>
            <div className='w-25 relative rounded-lg overflow-hidden'>
                <Image
                    alt='Image News'
                    src={`/images/petani1.png`}
                    fill
                    sizes='(max-widht:764px) 100vw, (max-width:1200px) 50vw, 33vw'
                    className='object-cover '
                />
            </div>
            <div className='flex-1'>
                <p className='text-[11px] font-bold text-neutral-700'>Mendukung Petani Lokal, Menjaga Kualitas Kopi Tolaki</p>
                <p className='text-[8px] pt-2'>7 Mei 2025</p>
            </div>
        </div>
    )
}

export default CardNewsList
