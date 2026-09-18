'use client'

import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import { useDataStore } from '@/stores/dataStore'
import { fetchApi } from '@/lib/apiFetch'
import {
    PiCoffeeDuotone,
    PiEnvelopeDuotone,
    PiHandshakeDuotone,
    PiMapPinLineDuotone,
    PiPhoneDuotone,
    PiPlantDuotone,
    PiQuotesFill,
} from 'react-icons/pi'

interface CompanyProfile {
    brand: string
    quotes: string
    description: string
    detail: string
    email?: string | null
    phone?: string | null
    address?: string | null
    file?: string | null
}

interface CompanyProfileResponse {
    data?: CompanyProfile[]
}

const defaultProfile: CompanyProfile = {
    brand: 'Kopi Tolaki',
    quotes: 'Menghadirkan Cita Rasa Otentik Tanah Tolaki untuk Nusantara',
    description: 'Kopi Tolaki adalah gerakan bersama untuk mengangkat potensi biji kopi lokal Sulawesi Tenggara ke panggung nasional dan internasional. Kami memadukan kearifan tradisi leluhur masyarakat Tolaki dengan teknologi pemrosesan kopi modern yang ramah lingkungan.',
    detail: '<p>Berawal dari kepedulian terhadap para petani kopi di pelosok Sulawesi Tenggara yang memiliki tanaman kopi warisan namun kesulitan akses pasar dan standar pengolahan pasca panen, Kopi Tolaki hadir mendampingi dari penanaman, pemeliharaan, petik merah selektif, hingga sangrai presisi.</p><p>Setiap cangkir Kopi Tolaki menyuarakan jerih payah, kebanggaan, dan harapan para petani mitra kami demi masa depan yang lebih bermartabat dan berkelanjutan.</p>',
    email: 'info@kopitolaki.id',
    phone: '+62 812-3456-7890',
    address: 'Kendari, Sulawesi Tenggara, Indonesia',
    file: null,
}

const pillars = [
    {
        icon: <PiCoffeeDuotone className='primary-color text-[50px]' />,
        title: 'Kualitas Premium',
        desc: 'Biji kopi pilihan dipetik merah secara selektif dan diproses dengan standar tinggi.',
    },
    {
        icon: <PiPlantDuotone className='primary-color text-[50px]' />,
        title: 'Ramah Lingkungan',
        desc: 'Pertanian berkelanjutan yang menjaga ekosistem dan kekayaan alam Sulawesi Tenggara.',
    },
    {
        icon: <PiHandshakeDuotone className='primary-color text-[50px]' />,
        title: 'Kemitraan Adil',
        desc: 'Hubungan transparan bersama petani agar kesejahteraan dapat tumbuh secara setara.',
    },
]

const ContentProfile = () => {
    const url = useDataStore((state) => state.url)

    const { data: response, isLoading } = useQuery<CompanyProfileResponse>({
        queryFn: () => fetchApi(`${url}/company-profile/read`),
        queryKey: ['public-company-profile'],
    })

    const profile = response?.data?.[0] || defaultProfile
    const imageSrc = profile.file ? `${url}/uploads/company/${profile.file}` : null

    if (isLoading) {
        return (
            <div className='animate-pulse space-y-6'>
                <div className='h-72 rounded-2xl bg-neutral-200' />
                <div className='h-56 rounded-2xl bg-neutral-200' />
            </div>
        )
    }

    return (
        <div className='text-neutral-700'>
            <section>
                <p className='title-header-3'>Tentang Anoa Coffee</p>
                <div className='grid grid-cols-1 items-stretch gap-6 pt-3 lg:grid-cols-12 lg:gap-10'>
                    <div className='relative col-span-1 min-h-72 overflow-hidden rounded-2xl border border-neutral-200 bg2 lg:col-span-5'>
                        {imageSrc ? (
                            <Image
                                alt={profile.brand}
                                src={imageSrc}
                                fill
                                sizes='(max-width: 1024px) 100vw, 42vw'
                                className='object-cover'
                            />
                        ) : (
                            <Image
                                alt='Logo Anoa Coffee'
                                src='/images/logo_dark.png'
                                fill
                                sizes='(max-width: 1024px) 100vw, 42vw'
                                className='object-contain p-14'
                            />
                        )}
                        <div className='absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/45 to-transparent' />
                        <p className='absolute bottom-4 left-5 text-[10px] font-bold uppercase tracking-[0.18em] text-white'>
                            Kopi asli Sulawesi Tenggara
                        </p>
                    </div>

                    <div className='col-span-1 flex flex-col justify-center lg:col-span-7'>
                        <p className='title-text color-main'>SIAPA KAMI</p>
                        <h2 className='mt-1 text-[32px] font-bold leading-tight text-neutral-800'>{profile.brand}</h2>
                        <p className='mt-4 text-[13px] leading-7 text-neutral-600 sm:text-sm'>{profile.description}</p>
                        <blockquote className='relative mt-6 border-l-4 border-amber-600 bg-white/40 px-5 py-4'>
                            <PiQuotesFill className='absolute right-4 top-3 text-3xl text-amber-700/15' />
                            <p className='relative text-base font-semibold italic leading-relaxed text-neutral-700'>
                                “{profile.quotes}”
                            </p>
                            <footer className='mt-2 text-[10px] font-bold uppercase tracking-wider text-amber-800'>
                                {profile.brand}
                            </footer>
                        </blockquote>
                    </div>
                </div>
            </section>

            <section className='mt-12 border-t border-neutral-300 pt-10'>
                <p className='title-text color-main'>PERJALANAN KAMI</p>
                <div className='mt-2 grid grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-12'>
                    <div>
                        <h2 className='title-header-3 text-neutral-800'>Berakar dari Tradisi, Tumbuh Bersama Petani</h2>
                        <div
                            className='mt-3 text-[13px] leading-7 text-neutral-600 sm:text-sm [&>p+p]:mt-3'
                            dangerouslySetInnerHTML={{ __html: profile.detail }}
                        />
                    </div>
                    <div className='relative min-h-72 overflow-hidden rounded-2xl border border-neutral-200 shadow-sm lg:min-h-80'>
                        <Image
                            src='/images/about.jpg'
                            alt='Petani Kopi Tolaki'
                            fill
                            sizes='(max-width: 1024px) 100vw, 50vw'
                            className='object-cover'
                        />
                        <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent' />
                        <div className='absolute bottom-5 left-5 text-white'>
                            <p className='text-[10px] font-bold uppercase tracking-wider text-amber-300'>Dari Kebun ke Cangkir</p>
                            <p className='mt-1 text-sm font-semibold'>Cerita dari tanah Sulawesi Tenggara</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className='mt-12 rounded-2xl bg1 px-5 py-8 lg:px-8'>
                <p className='title-text color-main'>NILAI-NILAI KAMI</p>
                <h2 className='title-header-3 text-neutral-800'>Prinsip di Setiap Proses</h2>
                <p className='mt-1 text-[13px] text-neutral-500'>Dari kebun hingga produk sampai ke tangan Anda, tiga nilai ini selalu menjadi kompas kami.</p>

                <div className='mt-5 grid grid-cols-1 md:grid-cols-3'>
                    {pillars.map((pillar, index) => (
                        <div
                            key={pillar.title}
                            className={`flex flex-col items-center px-5 py-6 text-center ${index === 1 ? 'border-y border-neutral-300 md:border-x md:border-y-0' : ''}`}
                        >
                            {pillar.icon}
                            <p className='mt-2 text-sm font-bold text-neutral-700'>{pillar.title}</p>
                            <p className='mt-1 max-w-xs text-[12px] leading-relaxed text-neutral-500'>{pillar.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className='mt-12'>
                <div className='rounded-2xl border border-neutral-300 bg2 p-5 lg:p-8'>
                    <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
                        <div>
                            <p className='title-text color-main'>HUBUNGI KAMI</p>
                            <h2 className='title-header-3 text-neutral-800'>Mari Terhubung</h2>
                            <p className='mt-2 text-[12px] leading-relaxed text-neutral-500'>Punya pertanyaan tentang produk atau ingin bertumbuh bersama kami? Kami senang mendengarnya.</p>
                        </div>

                        <div className='grid grid-cols-1 gap-3 sm:grid-cols-3 lg:col-span-2'>
                            <a href={`mailto:${profile.email || 'info@kopitolaki.id'}`} className='rounded-xl border border-neutral-300 bg-white/50 p-4 transition hover:bg-white'>
                                <PiEnvelopeDuotone className='text-2xl text-amber-700' />
                                <p className='mt-4 text-[10px] font-bold uppercase tracking-wider text-neutral-400'>Email</p>
                                <p className='mt-1 break-all text-[12px] font-semibold text-neutral-700'>{profile.email || 'info@kopitolaki.id'}</p>
                            </a>
                            <a href={`tel:${(profile.phone || '+6281234567890').replace(/[\s\-]/g, '')}`} className='rounded-xl border border-neutral-300 bg-white/50 p-4 transition hover:bg-white'>
                                <PiPhoneDuotone className='text-2xl text-emerald-700' />
                                <p className='mt-4 text-[10px] font-bold uppercase tracking-wider text-neutral-400'>Telepon / WA</p>
                                <p className='mt-1 text-[12px] font-semibold text-neutral-700'>{profile.phone || '+62 812-3456-7890'}</p>
                            </a>
                            <div className='rounded-xl border border-neutral-300 bg-white/50 p-4'>
                                <PiMapPinLineDuotone className='text-2xl text-sky-700' />
                                <p className='mt-4 text-[10px] font-bold uppercase tracking-wider text-neutral-400'>Lokasi</p>
                                <p className='mt-1 text-[12px] font-semibold leading-relaxed text-neutral-700'>{profile.address || 'Kendari, Sulawesi Tenggara'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ContentProfile
