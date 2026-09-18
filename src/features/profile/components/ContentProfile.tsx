'use client'

import React from 'react'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import { useDataStore } from '@/stores/dataStore'
import { fetchApi } from '@/lib/apiFetch'
import { PiMapPinLineDuotone, PiEnvelopeDuotone, PiPhoneDuotone, PiCoffeeDuotone, PiPlantDuotone, PiHandshakeDuotone } from 'react-icons/pi'

const defaultProfile = {
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
        icon: <PiCoffeeDuotone className='text-[30px] text-amber-700' />,
        title: 'Kualitas Premium',
        desc: 'Biji kopi pilihan dipetik merah secara selektif, diproses dengan standar spesialti internasional.',
        bg: 'bg-amber-50 border-amber-100',
    },
    {
        icon: <PiPlantDuotone className='text-[30px] text-emerald-700' />,
        title: 'Ramah Lingkungan',
        desc: 'Pertanian berkelanjutan yang menjaga ekosistem hutan dan keanekaragaman hayati Sulawesi Tenggara.',
        bg: 'bg-emerald-50 border-emerald-100',
    },
    {
        icon: <PiHandshakeDuotone className='text-[30px] text-sky-700' />,
        title: 'Kemitraan Adil',
        desc: 'Harga yang adil dan transparan bagi petani mitra agar kesejahteraan tumbuh bersama.',
        bg: 'bg-sky-50 border-sky-100',
    },
]

const ContentProfile = () => {
    const url = useDataStore((state) => state.url)

    const { data: response, isLoading } = useQuery<any>({
        queryFn: () => fetchApi(`${url}/company-profile/read`),
        queryKey: ['public-company-profile'],
    })

    const profile = response?.data?.[0] || defaultProfile
    const imageSrc = profile.file
        ? `${url}/uploads/company/${profile.file}`
        : null

    if (isLoading) {
        return (
            <div className='space-y-6 animate-pulse'>
                <div className='h-52 bg-neutral-200 rounded-2xl' />
                <div className='h-32 bg-neutral-200 rounded-2xl' />
                <div className='h-48 bg-neutral-200 rounded-2xl' />
            </div>
        )
    }

    return (
        <div className='space-y-12 text-neutral-800'>

            {/* ── Section 1: Identity — logo + brand name + description ── */}
            <div className='flex flex-col md:flex-row gap-8 items-center md:items-start'>
                <div className='shrink-0'>
                    <div className='relative h-36 w-36 rounded-full overflow-hidden border-4 border-amber-200 shadow-lg bg-amber-50'>
                        {imageSrc ? (
                            <Image alt={profile.brand} src={imageSrc} fill className='object-contain p-3' />
                        ) : (
                            <Image alt='Logo' src='/images/logo_dark.png' fill className='object-contain p-4' />
                        )}
                    </div>
                </div>
                <div className='flex-1 text-center md:text-left space-y-3'>
                    <p className='text-xs font-semibold uppercase tracking-[0.2em] text-amber-700'>
                        Profil Perusahaan
                    </p>
                    <h1 className='text-3xl sm:text-4xl font-bold text-neutral-900 leading-tight'>
                        {profile.brand}
                    </h1>
                    <p className='text-sm text-neutral-500 leading-relaxed max-w-xl mx-auto md:mx-0'>
                        {profile.description}
                    </p>
                </div>
            </div>

            {/* ── Section 2: Quote pull-out ── */}
            <blockquote className='border-l-4 border-amber-600 pl-6 py-2'>
                <p className='text-lg sm:text-xl font-semibold italic text-neutral-700 leading-snug'>
                    &ldquo;{profile.quotes}&rdquo;
                </p>
                <footer className='mt-2 text-xs font-bold uppercase tracking-wider text-amber-700'>
                    — {profile.brand}
                </footer>
            </blockquote>

            {/* ── Section 3: Editorial image + story ── */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-center'>
                <div className='relative h-72 lg:h-96 rounded-2xl overflow-hidden shadow-md'>
                    <Image
                        src='/images/about.jpg'
                        alt='Petani Kopi Tolaki'
                        fill
                        className='object-cover'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
                    <span className='absolute bottom-4 left-4 text-xs text-white/80 font-semibold uppercase tracking-widest'>
                        Dari Kebun ke Cangkir
                    </span>
                </div>
                <div className='space-y-4'>
                    <p className='text-xs font-semibold uppercase tracking-[0.2em] text-amber-700'>
                        Perjalanan Kami
                    </p>
                    <h2 className='text-2xl font-bold text-neutral-800 leading-snug'>
                        Berakar dari Tradisi,<br />Tumbuh Bersama Petani
                    </h2>
                    <div
                        className='text-sm leading-7 text-neutral-600 [&>p+p]:mt-4'
                        dangerouslySetInnerHTML={{ __html: profile.detail }}
                    />
                </div>
            </div>

            {/* ── Section 4: Values pillars ── */}
            <div>
                <p className='text-xs font-semibold uppercase tracking-[0.2em] text-amber-700 mb-5'>
                    Nilai-Nilai Kami
                </p>
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-5'>
                    {pillars.map((p, i) => (
                        <div
                            key={i}
                            className={`border rounded-2xl p-5 space-y-2 ${p.bg}`}
                        >
                            <div className='h-11 w-11 flex items-center justify-center rounded-xl bg-white/80 border border-white shadow-sm'>
                                {p.icon}
                            </div>
                            <p className='font-bold text-sm text-neutral-800 pt-1'>{p.title}</p>
                            <p className='text-xs text-neutral-500 leading-relaxed'>{p.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Section 5: Contact ── */}
            <div className='border-t border-neutral-200 pt-8'>
                <p className='text-xs font-semibold uppercase tracking-[0.2em] text-amber-700 mb-5'>
                    Hubungi Kami
                </p>
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
                    <a
                        href={`mailto:${profile.email || 'info@kopitolaki.id'}`}
                        className='flex items-start gap-3 group'
                    >
                        <div className='shrink-0 mt-0.5 h-9 w-9 flex items-center justify-center rounded-lg bg-amber-50 group-hover:bg-amber-100 transition-colors'>
                            <PiEnvelopeDuotone className='text-amber-700 text-lg' />
                        </div>
                        <div>
                            <p className='text-[10px] font-bold uppercase tracking-wider text-neutral-400'>Email</p>
                            <p className='text-xs font-semibold text-neutral-700 break-all'>
                                {profile.email || 'info@kopitolaki.id'}
                            </p>
                        </div>
                    </a>

                    <a
                        href={`tel:${(profile.phone || '+6281234567890').replace(/[\s\-]/g, '')}`}
                        className='flex items-start gap-3 group'
                    >
                        <div className='shrink-0 mt-0.5 h-9 w-9 flex items-center justify-center rounded-lg bg-emerald-50 group-hover:bg-emerald-100 transition-colors'>
                            <PiPhoneDuotone className='text-emerald-700 text-lg' />
                        </div>
                        <div>
                            <p className='text-[10px] font-bold uppercase tracking-wider text-neutral-400'>Telepon / WA</p>
                            <p className='text-xs font-semibold text-neutral-700'>
                                {profile.phone || '+62 812-3456-7890'}
                            </p>
                        </div>
                    </a>

                    <div className='flex items-start gap-3'>
                        <div className='shrink-0 mt-0.5 h-9 w-9 flex items-center justify-center rounded-lg bg-sky-50'>
                            <PiMapPinLineDuotone className='text-sky-700 text-lg' />
                        </div>
                        <div>
                            <p className='text-[10px] font-bold uppercase tracking-wider text-neutral-400'>Lokasi</p>
                            <p className='text-xs font-semibold text-neutral-700'>
                                {profile.address || 'Kendari, Sulawesi Tenggara'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ContentProfile
