'use client'

import Image from 'next/image'
import React from 'react'
import { useDataStore } from '@/stores/dataStore'

interface StoriesCardProps {
    title?: string
    news?: string
    file?: string
}

const StoriesCard = ({ title, news, file }: StoriesCardProps) => {
    const url = useDataStore((state) => state.url)
    const imageSrc = file
        ? file.startsWith('/') || file.startsWith('http')
            ? file
            : `${url}/uploads/story-from-garden/${file}`
        : '/images/petani1.png'

    const cleanNews = news ? news.replace(/<[^>]*>?/gm, '') : 'Kisah inspiratif dari petani kopi Sulawesi Tenggara.'

    return (
        <div className='text-neutral-700 flex flex-col gap-2 rounded-xl border border-neutral-200 bg-white relative overflow-hidden shadow-sm transition hover:-translate-y-0.5 hover:shadow-md h-full'>
            <div className='relative h-44 w-full bg-neutral-100 overflow-hidden'>
                <Image
                    alt={title || 'Petani'}
                    src={imageSrc}
                    fill
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    className='object-cover transition duration-300 hover:scale-105'
                />
            </div>
            <div className='p-3 flex flex-col justify-between flex-1'>
                <div>
                    <p className='font-bold text-sm text-neutral-800 line-clamp-1'>{title || 'Pak Maryan, Konawe Selatan'}</p>
                    <p className='text-[12px] pt-1 text-neutral-500 italic line-clamp-3 leading-relaxed'>
                        &ldquo;{cleanNews}&rdquo;
                    </p>
                </div>
                <div className='pt-3 border-t border-neutral-100 mt-2'>
                    <span className='text-[10px] font-bold uppercase tracking-wider text-amber-800'>
                        Mitra Petani Kopi Tolaki
                    </span>
                </div>
            </div>
        </div>
    )
}

export default StoriesCard
