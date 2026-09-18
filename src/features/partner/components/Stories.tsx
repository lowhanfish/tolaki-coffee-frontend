'use client'

import React from 'react'
import StoriesCard from './stories/StoriesCard'
import { useQuery } from '@tanstack/react-query'
import { useDataStore } from '@/stores/dataStore'
import { fetchApi } from '@/lib/apiFetch'

const defaultStories = [
    {
        title: 'Pak Maryan, Konawe Selatan',
        news: 'Kemangi—aroma wangi dari kebun kami adalah hasil dari kesabaran merawat bumi.',
        file: '/images/petani1.png',
    },
    {
        title: 'Ibu Fatimah, Kolaka Timur',
        news: 'Kopi Tolaki memberi harapan baru bagi perempuan pemetik kopi di desa kami.',
        file: '/images/petani1.png',
    },
    {
        title: 'Pak La Ode, Buton Utara',
        news: 'Bimbingan teknik sangrai dan pasca-panen membuat nilai jual kopi kami naik berlipat.',
        file: '/images/petani1.png',
    },
]

const Stories = () => {
    const url = useDataStore((state) => state.url)

    const { data: response } = useQuery<{ total: number; data: any[] }>({
        queryFn: () => fetchApi(`${url}/story-from-garden/read`),
        queryKey: ['public-stories'],
    })

    const stories = response?.data && response.data.length > 0
        ? response.data.slice(0, 3)
        : defaultStories

    return (
        <div className='text-neutral-700'>
            <div className='grid gap-4 grid-cols-1 lg:grid-cols-4 items-stretch'>
                <div className='col-span-1 flex flex-col justify-center'>
                    <p className='title-header-3'>Cerita dari Kebun</p>
                    <p className='text-[13px] mt-2 lg:pr-2 leading-relaxed text-neutral-500'>
                        Kopi Tolaki hadir dari semangat petani lokal
                        Sulawesi Tenggara yang diwariskan turun-temurun dengan cinta pada tanah dan tradisi.
                    </p>
                </div>

                {stories.map((item, idx) => (
                    <div key={item.id || idx} className='col-span-1'>
                        <StoriesCard
                            title={item.title}
                            news={item.news}
                            file={item.file}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Stories
