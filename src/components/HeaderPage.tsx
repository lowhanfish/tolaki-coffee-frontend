import Image from 'next/image'
import React from 'react'

interface HeaderPageProps {
    height?: string,
    children?: React.ReactNode
    image?: string,
}


const HeaderPage = ({ height = "md:h-109", children, image = `/images/header_product1.webp` }: HeaderPageProps) => {
    return (
        <div className={`relative w-full h-64 ${height} flex items-center justify-center`}>
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
