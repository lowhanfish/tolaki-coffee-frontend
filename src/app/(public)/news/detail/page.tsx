'use client'

import { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import HeaderPage from '@/components/HeaderPage'
import SideBarNews from '@/features/news/components/SideBarNews'
import { BsArrowLeft, BsCalendar3, BsPerson } from 'react-icons/bs'
import { useQuery } from '@tanstack/react-query'
import { useDataStore } from '@/stores/dataStore'
import { fetchApi } from '@/lib/apiFetch'
import { NewsResponseInterface } from '@/app/(secure)/secure/news/types'

const defaultNews = {
    title: 'Mendukung Petani Lokal, Menjaga Kualitas Kopi Tolaki',
    description: 'Kami terus berkomitmen mendampingi petani kopi di Sulawesi Tenggara untuk menghasilkan kopi berkualitas tinggi dan berkelanjutan.',
    news: '<p>Kopi Tolaki tumbuh di tanah subur Sulawesi Tenggara dengan kearifan lokal yang diwariskan turun-temurun. Sejak masa panen hingga proses pengolahan pasca panen, kami bermitra erat bersama kelompok tani untuk memastikan standar mutu terbaik.</p><p>Melalui pelatihan berkelanjutan, bibit unggul, dan fasilitas penjemuran modern, kesejahteraan para petani mitra kami meningkat seiring dengan tingginya apresiasi pencinta kopi terhadap cita rasa otentik kopi Sulawesi Tenggara.</p>',
    file: '/images/about.jpg',
    createdAt: new Date().toISOString(),
    source: 'Kopi Tolaki Editorial',
}

const NewsDetailContent = () => {
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    const url = useDataStore((state) => state.url)

    const { data: apiNews, isLoading } = useQuery({
        queryFn: () => fetchApi<NewsResponseInterface>(`${url}/news/readOne/${id}`),
        queryKey: ['news-detail', id],
        enabled: Boolean(id),
    })

    const news: any = apiNews || defaultNews
    const imageSrc = news.file
        ? news.file.startsWith('/') || news.file.startsWith('http')
            ? news.file
            : `${url}/uploads/news/${news.file}`
        : '/images/about.jpg'

    return (
        <div className='bg relative min-h-screen'>
            <HeaderPage height='h-20' image='/images/header_product2.webp'>
                <div className='z-2 flex flex-col items-center justify-center text-white'>
                    <p className='text-3xl font-bold md:text-5xl'>Kabar & Cerita</p>
                    <p className='mt-1 text-xs md:text-sm text-white/80'>Artikel seputar kopi dan kabar mitra petani kami</p>
                </div>
            </HeaderPage>

            <div className='mx-auto max-w-7xl px-4 py-8 md:px-8 xl:px-16 text-neutral-800'>
                <Link href='/news' className='inline-flex items-center gap-2 text-xs font-semibold text-amber-800 hover:underline mb-6'>
                    <BsArrowLeft />
                    <span>Kembali ke Semua Berita</span>
                </Link>

                <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
                    {/* Konten Artikel */}
                    <article className='lg:col-span-8 rounded-2xl border border-neutral-100 bg-white p-6 md:p-8 shadow-sm space-y-4'>
                        <span className='rounded-full bg-amber-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-800'>
                            Berita Utama
                        </span>
                        <h1 className='text-2xl md:text-3xl font-bold text-neutral-800 leading-snug'>
                            {news.title}
                        </h1>

                        <div className='flex flex-wrap items-center gap-4 text-xs text-neutral-400 border-y border-neutral-100 py-3'>
                            <div className='flex items-center gap-1.5'>
                                <BsCalendar3 />
                                <span>{new Date(news.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                            </div>
                            <div className='flex items-center gap-1.5'>
                                <BsPerson />
                                <span>{news.source || 'Tim Redaksi Kopi Tolaki'}</span>
                            </div>
                        </div>

                        <div className='relative h-64 sm:h-96 w-full overflow-hidden rounded-xl bg-neutral-100'>
                            <Image
                                alt={news.title}
                                src={imageSrc}
                                fill
                                className='object-cover'
                                priority
                            />
                        </div>

                        <div
                            className='prose prose-amber max-w-none text-xs sm:text-sm leading-7 text-neutral-700 pt-3 space-y-3'
                            dangerouslySetInnerHTML={{ __html: news.news }}
                        />
                    </article>

                    {/* Sidebar Berita Populer */}
                    <aside className='lg:col-span-4'>
                        <SideBarNews />
                    </aside>
                </div>
            </div>
        </div>
    )
}

const Page = () => {
    return (
        <Suspense fallback={<div className='min-h-screen flex items-center justify-center'>Memuat artikel...</div>}>
            <NewsDetailContent />
        </Suspense>
    )
}

export default Page
