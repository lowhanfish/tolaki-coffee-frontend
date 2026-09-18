'use client'
import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import CardNewsList from '@/components/items/CardNewsList'
import { useQuery } from '@tanstack/react-query';
import { useDataStore } from '@/stores/dataStore';
import { fetchApi } from '@/lib/apiFetch';
import { NewsResponseListInterface } from '@/app/(secure)/secure/news/types';

const KategoriList = [
    { id: "1", title: "Semua Kategori" },
    { id: "2", title: "Berita Perusahaan" },
    { id: "3", title: "Produk" },
    { id: "4", title: "Petani & Kemitraan" },
    { id: "5", title: "Edukasi Kopi" },
    { id: "6", title: "Event & Kegiatan" },
]

const fallbackNews = [
    {
        id: "1",
        title: "Mendukung Petani Lokal, Menjaga Kualitas Kopi Tolaki",
        file: "/images/about.jpg",
        date: "2 Agustus 2026"
    },
    {
        id: "2",
        title: "Panen Kopi Berkualitas, Langkah Awal Rasa yang Istimewa",
        file: "/images/about.jpg",
        date: "2 Agustus 2026"
    },
    {
        id: "3",
        title: "Kopi Tolaki Premium dengan Kemasan Baru",
        file: "/images/about.jpg",
        date: "2 Agustus 2026"
    },
    {
        id: "4",
        title: "Pelatihan Petani: Tingkatkan Kualitas, Tingkatkan Kesejahteraan",
        file: "/images/about.jpg",
        date: "2 Agustus 2026"
    },
]

const SideBarNews = () => {
    const url = useDataStore((state) => state.url)
    const [selectedCategory, setSelectedCategory] = useState("1")

    const { data: response } = useQuery({
        queryFn: () =>
            fetchApi<NewsResponseListInterface>(
                `${url}/news/read?skip=0&limit=5`,
            ),
        queryKey: ['sidebar-popular-news'],
        staleTime: 60 * 1000,
        retry: 1,
    })

    const popularList = response?.data && response.data.length > 0
        ? response.data.map((item: any) => ({
            id: item.id,
            title: item.title,
            file: item.file,
            date: item.createdAt ? new Date(item.createdAt).toLocaleDateString('id-ID') : 'Terbaru',
        }))
        : fallbackNews

    return (
        <div className='flex flex-col gap-4'>
            <div className='border border-neutral-200 bg-white rounded-2xl p-5 shadow-xs'>
                <p className='text-base font-bold text-neutral-800 pb-3'>Kategori</p>

                <div className='border border-neutral-300 h-10 rounded-xl relative flex items-center mb-4'>
                    <input
                        type="text"
                        placeholder="Cari kategori..."
                        className='w-full h-full rounded-xl px-3 pr-8 text-xs bg-transparent outline-hidden'
                    />
                    <FaSearch className='absolute right-3 text-neutral-400 text-xs' />
                </div>

                <div className='flex flex-col gap-2.5'>
                    {KategoriList.map((item) => (
                        <label key={item.id} className='flex items-center gap-2.5 cursor-pointer group'>
                            <input
                                type="radio"
                                name='category'
                                checked={selectedCategory === item.id}
                                onChange={() => setSelectedCategory(item.id)}
                                className='h-4 w-4 accent-amber-700 cursor-pointer'
                            />
                            <span className={`text-xs ${selectedCategory === item.id ? 'font-bold text-amber-800' : 'text-neutral-600 group-hover:text-neutral-900'} transition`}>
                                {item.title}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            <div className='border border-neutral-200 bg-white rounded-2xl p-5 shadow-xs'>
                <p className='text-base font-bold text-neutral-800 pb-3'>Berita Populer</p>

                <div className='flex flex-col gap-4 pt-1'>
                    {popularList.map((item) => (
                        <CardNewsList
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            file={item.file}
                            date={item.date}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SideBarNews
