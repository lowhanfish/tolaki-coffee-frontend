import Image from 'next/image'
import React from 'react'
import { BsArrowRight } from "react-icons/bs";


interface CardNewsProps {
    id: string,
    title: string,
    description: string,
    file: string
}

const CardNews = ({ id, title, description, file }: CardNewsProps) => {
    return (
        <div className='relative rounded-2xl overflow-hidden'>

            <div className='relative w-full h-45'>
                <Image
                    alt='Image News'
                    src={file}
                    fill
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    className='object-cover'
                    loading="eager"
                />
            </div>
            <p>{title}</p>
            <p>{description}</p>
        </div>
    )
}

export default CardNews
