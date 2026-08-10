import Image from 'next/image'
import React from 'react'

interface HeaderPageProps {
    image?: string,
    children?: React.ReactNode
}


const HeaderPage = ({ children, image = `/images/header_product1.webp` }: HeaderPageProps) => {
    return (
        <div className='relative w-full h-64 md:h-109 flex items-center justify-center'>
            {children}

            <Image
                alt='Header Page'
                src={image}
                fill
                className='object-cover'
            />

        </div>
    )
}

export default HeaderPage
