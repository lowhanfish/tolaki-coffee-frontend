import React from 'react'
import AdminPageHeader from '@/components/admin/AdminPageHeader'
import { BsEnvelope, BsInbox } from 'react-icons/bs'

const page = () => {
    return (
        <main className='space-y-3 pb-3'>
            <AdminPageHeader
                eyebrow='Komunikasi'
                title='Pesan Masuk'
                description='Lihat dan kelola pesan yang dikirim pengunjung melalui halaman kontak.'
                icon={BsEnvelope}
                searchPlaceholder='Cari pesan...'
            />

            <section className='rounded-xl border border-neutral-100 bg-white p-5 shadow-sm'>
                <div className='flex items-center justify-between border-b border-neutral-100 pb-4'>
                    <div><h2 className='text-sm font-bold text-neutral-800'>Kotak masuk</h2><p className='mt-0.5 text-[10px] text-neutral-400'>Pesan terbaru dari pengunjung website</p></div>
                    <span className='rounded-full bg-neutral-100 px-2.5 py-1 text-[9px] font-bold text-neutral-500'>0 pesan</span>
                </div>
                <div className='flex min-h-72 flex-col items-center justify-center text-center'>
                    <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-2xl text-amber-700 ring-1 ring-amber-100'><BsInbox /></div>
                    <h3 className='mt-4 text-sm font-bold text-neutral-700'>Belum ada pesan masuk</h3>
                    <p className='mt-1 max-w-sm text-[11px] leading-relaxed text-neutral-400'>Pesan baru dari formulir kontak akan tampil dan dapat dikelola dari halaman ini.</p>
                </div>
            </section>
        </main>
    )
}

export default page
