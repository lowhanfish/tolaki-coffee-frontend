import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useDataStore } from '@/stores/dataStore'

interface CardNewsListProps {
    id?: string,
    title: string,
    file?: string | null,
    date: string
}

const CardNewsList = ({ id, title, file, date }: CardNewsListProps) => {
    const url = useDataStore((state) => state.url)
    const imageSrc = file
        ? file.startsWith('/') || file.startsWith('http')
            ? file
            : `${url}/uploads/news/${file}`
        : '/images/about.jpg'

    const content = (
        <div className='flex gap-3 group cursor-pointer'>
            <div className='w-20 h-16 shrink-0 relative rounded-lg overflow-hidden bg-neutral-100'>
                <Image
                    alt={title}
                    src={imageSrc}
                    fill
                    sizes='(max-width: 768px) 100vw, 80px'
                    className='object-cover group-hover:scale-105 transition duration-300'
                />
            </div>
            <div className='flex-1 min-w-0'>
                <p className='text-xs font-bold text-neutral-700 line-clamp-2 group-hover:text-amber-700 transition'>
                    {title}
                </p>
                <p className='text-[10px] text-neutral-400 pt-1'>{date}</p>
            </div>
        </div>
    )

    if (id) {
        return <Link href={`/news/detail?id=${id}`}>{content}</Link>
    }

    return content
}

export default CardNewsList
