import Image from 'next/image'
import React from 'react'

interface HeaderPageProps {
    children?: React.ReactNode
}


const HeaderPage = ({ children }: HeaderPageProps) => {
    return (
        <div className='relative w-full h-64 md:h-109 flex items-center justify-center'>
            {children}

            <Image
                alt='Header Page'
                src={`/images/header_product1.webp`}
                fill
                className='object-cover'
            />

        </div>
    )
}

export default HeaderPage
