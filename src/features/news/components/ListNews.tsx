"use client"

import { useState } from 'react'
import CardNews from "@/components/items/CardNews"
import Pagination from "@/components/items/Pagination";
import { useQuery } from '@tanstack/react-query';
import { useDataStore } from '@/stores/dataStore';
import { fetchApi } from '@/lib/apiFetch';
import { NewsResponseListInterface } from '@/app/(secure)/secure/news/types';

const defaultList = [
    {
        id: "1",
        title: "Mendukung Petani Lokal, Menjaga Kualitas Kopi Tolaki",
        description: "Kami terus berkomitmen mendampingi petani kopi di Sulawesi Tenggara untuk menghasilkan kopi berkualitas tinggi dan berkelanjutan.",
        file: "/images/about.jpg",
        date: "2 Agustus 2026"
    },
    {
        id: "2",
        title: "Panen Kopi Berkualitas, Langkah Awal Rasa yang Istimewa",
        description: "Proses panen yang tepat waktu dan selektif menjadi kunci utama dalam menjaga cita rasa kopi terbaik.",
        file: "/images/about.jpg",
        date: "2 Agustus 2026"
    },
    {
        id: "3",
        title: "Kopi Tolaki Premium dengan Kemasan Baru",
        description: "Tampilan baru, rasa tetap istimewa. Nikmati pengalaman ngopi yang lebih berkesan.",
        file: "/images/about.jpg",
        date: "2 Agustus 2026"
    },
    {
        id: "4",
        title: "Pelatihan Petani: Tingkatkan Kualitas, Tingkatkan Kesejahteraan",
        description: "Kegiatan pelatihan rutin untuk petani mitra kami dalam budidaya kopi berkelanjutan.",
        file: "/images/about.jpg",
        date: "2 Agustus 2026"
    },
]

const ListNews = () => {
    const url = useDataStore((state) => state.url)
    const [page, setPage] = useState(1)
    const limit = 6

    const { data: response, isLoading } = useQuery({
        queryFn: () =>
            fetchApi<NewsResponseListInterface>(
                `${url}/news/read?skip=${(page - 1) * limit}&limit=${limit}`,
            ),
        queryKey: ['public-news', page, limit],
        staleTime: 60 * 1000,
        retry: 1,
    })

    const hasApiData = response?.data && response.data.length > 0
    const newsList = hasApiData ? response.data : defaultList
    const total = response?.total || defaultList.length

    return (
        <div>
            <div className='flex justify-between items-center pb-2'>
                <p className="text-xs text-neutral-500">Menampilkan {newsList.length} dari {total} artikel</p>
                <span className='rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800'>
                    Publikasi Resmi
                </span>
            </div>

            {isLoading ? (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2'>
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className='h-64 animate-pulse rounded-2xl bg-neutral-200' />
                    ))}
                </div>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2'>
                    {newsList.map((item: any) => (
                        <div key={item.id} className='col-span-1'>
                            <CardNews
                                id={item.id}
                                description={item.description}
                                title={item.title}
                                file={item.file}
                                date={item.createdAt ? new Date(item.createdAt).toLocaleDateString('id-ID') : item.date}
                            />
                        </div>
                    ))}
                </div>
            )}

            <div className='flex justify-center items-center pt-8'>
                <Pagination
                    total={total}
                    limit={limit}
                    page={page}
                    pageShow={5}
                    onPageChange={setPage}
                />
            </div>
        </div>
    )
}

export default ListNews
