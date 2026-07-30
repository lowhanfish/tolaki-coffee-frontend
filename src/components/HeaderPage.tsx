import Image from 'next/image'
import React from 'react'


const HeaderPage = () => {
    return (
        <div className='relative w-full h-64 md:h-137 flex items-center justify-center'>
            <div className='z-2 flex flex-col items-center justify-center'>
                <p className='text-[45px]'>Anoa Coffee</p>
                <p className='-mt-2'>Pelajari tentang kami</p>
            </div>
            <Image
                alt='Header Page'
                src={`/images/header_page.webp`}
                fill
                className='object-cover'
            />

        </div>
    )
}

export default HeaderPage
