'use client'

import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { BsArrowRight } from "react-icons/bs";
import { FaCalendarAlt } from "react-icons/fa";
import { useDataStore } from '@/stores/dataStore';

interface CardNewsProps {
    id: string,
    title: string,
    description: string,
    file?: string | null,
    date?: string,
}

const CardNews = ({ id, title, description, file, date }: CardNewsProps) => {
    const url = useDataStore((state) => state.url)
    const imageSrc = file
        ? file.startsWith('/') || file.startsWith('http')
            ? file
            : `${url}/uploads/news/${file}`
        : '/images/about.jpg'

    const detailLink = `/news/detail?id=${id}`

    return (
        <div className='relative rounded-2xl overflow-hidden border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md'>
            <p className='absolute z-3 bg-amber-500/90 text-white text-[10px] font-bold ml-2 mt-2 py-1 px-3 rounded-full shadow'>
                BERITA PERUSAHAAN
            </p>
            <Link href={detailLink}>
                <div className='relative w-full h-48 cursor-pointer overflow-hidden bg-neutral-100'>
                    <Image
                        alt={title}
                        src={imageSrc}
                        fill
                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                        className='object-cover transition duration-300 hover:scale-105'
                    />
                    <div className='absolute z-3 bottom-2 left-2 flex gap-2 items-center'>
                        <FaCalendarAlt className='text-[13px] text-amber-300' />
                        <p className='text-white text-[11px] font-medium'>{date || 'Terbaru'}</p>
                    </div>
                    <div className='bg-linear-to-t from-black/80 via-black/20 to-transparent w-full h-full absolute'></div>
                </div>
            </Link>
            <div className='p-4'>
                <Link href={detailLink}>
                    <p className='font-bold text-sm text-neutral-800 line-clamp-1 hover:text-amber-800 transition'>{title}</p>
                </Link>
                <p className='text-[12px] pt-1 text-neutral-500 line-clamp-2 leading-relaxed'>{description}</p>

                <Link href={detailLink}>
                    <button className="
                        w-full py-2 mt-4  
                        rounded-xl 
                        cursor-pointer 
                        flex items-center justify-center gap-2 
                        bg-neutral-100 text-neutral-700
                        hover:bg-amber-600 hover:text-white
                        transition text-xs font-bold
                    ">
                        <span>Selengkapnya</span>
                        <BsArrowRight />
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default CardNews
