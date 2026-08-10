import Image from 'next/image'
import React from 'react'

interface CardNewsListProps {
    title: string,
    file: string,
    date: string
}


const CardNewsList = ({ title, file, date }: CardNewsListProps) => {
    return (
        <div className='flex gap-2'>
            <div className='w-25 relative rounded-lg overflow-hidden'>
                <Image
                    alt='Image News'
                    src={file}
                    fill
                    sizes='(max-widht:764px) 100vw, (max-width:1200px) 50vw, 33vw'
                    className='object-cover '
                />
            </div>
            <div className='flex-1'>
                <p className='text-[11px] font-bold text-neutral-700'>{title}</p>
                <p className='text-[8px] pt-2 line-clamp-2'>{date}</p>
            </div>
        </div>
    )
}

export default CardNewsList
