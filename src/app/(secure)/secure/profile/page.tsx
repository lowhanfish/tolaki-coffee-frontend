"use client"

import { useState } from 'react'
import ItemList from '@/components/items/ItemList'
import Create from './components/create';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { BsBuilding, BsCheckCircle, BsQuote } from 'react-icons/bs';



const data = [
    {
        id: "1",
        brand: "Kopi Tolaki",
        quotes: "Dari Daerah Untuk Dunia",
        des: "Kopi Tolaki hadir dari semangat petani lokal Sulawesi Tenggara yang diwariskan turun-temurun. Kami mengumpulkan biji kopi terbaik dari berbagai daerah, lalu mengolahnya dengan standar tinggi untuk menghaslikan cita rasa yang khas, konsisten, dan membanggakan.",
        val: `
            Lorem ipsum dolor sit amet, minim laborum id mollit nulla. Mollit ut tempor ut est labore enim pariatur. Do sunt culpa minim tempor dolore id veniam veniam voluptate id. In ut minim elit voluptate occaecat dolore mollit. Id deserunt aliquip irure in non in fugiat in nostrud ea.
            Culpa veniam ullamco eu deserunt ut enim veniam in esse nostrud eiusmod enim. Aliqua elit ad incididunt voluptate nisi occaecat nulla fugiat tempor sunt. Do dolore dolore consequat nulla fugiat duis dolore minim. Mollit in tempor quis duis sint velit minim cillum proident esse. In consectetur minim nulla est in do mollit nisi ad est consectetur. Et dolore velit minim ut ut et velit ad in non.
            Occaecat esse quis esse velit incididunt consequat nisi eu tempor sed. Cupidatat in pariatur dolor culpa incididunt ut cupidatat. Ut laboris enim nostrud laborum quis commodo nulla in dolore deserunt. Tempor magna sunt incididunt magna qui nostrud proident pariatur aute cupidatat esse. Nisi sunt elit excepteur officia laboris cupidatat ad veniam ullamco qui ad.
        `,
        img: "/images/about.png"
    },

]


const Page = () => {

    const [modalCreate, SetModalCreate] = useState<boolean>(false)
    return (
        <main className='space-y-3 pb-3'>
            <AdminPageHeader
                eyebrow='Identitas Brand'
                title='Profil Kopi Tolaki'
                description='Kelola cerita, pesan, dan identitas utama yang dikenalkan kepada pengunjung.'
                icon={BsBuilding}
                onAdd={() => SetModalCreate(!modalCreate)}
                addLabel='Perbarui profil'
            />

            <section className='grid grid-cols-1 gap-3 xl:grid-cols-12'>
                <article className='overflow-hidden rounded-xl border border-neutral-100 bg-white shadow-sm xl:col-span-5'>
                    <div className='bg-linear-to-br from-amber-50 to-white p-4'>
                        <ItemList title='Image' type='image' image={data[0].img} />
                    </div>
                    <div className='border-t border-neutral-100 p-5'>
                        <p className='text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-700'>Nama brand</p>
                        <h2 className='mt-1 text-2xl font-bold text-neutral-800'>{data[0].brand}</h2>
                        <div className='mt-3 flex items-center gap-2 text-xs font-semibold text-emerald-700'><BsCheckCircle /><span>Profil aktif di website</span></div>
                    </div>
                </article>

                <div className='space-y-3 xl:col-span-7'>
                    <article className='relative overflow-hidden rounded-xl bg-amber-600 p-5 text-white shadow-sm'>
                        <BsQuote className='absolute -right-2 -top-4 text-8xl text-white/10' />
                        <p className='text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-100'>Pesan utama</p>
                        <p className='relative mt-3 text-xl font-bold leading-snug'>“{data[0].quotes}”</p>
                    </article>
                    <article className='rounded-xl border border-neutral-100 bg-white p-5 shadow-sm'>
                        <p className='text-sm font-bold text-neutral-800'>Tentang brand</p>
                        <p className='mt-3 text-xs leading-6 text-neutral-500'>{data[0].des}</p>
                    </article>
                    <article className='rounded-xl border border-neutral-100 bg-white p-5 shadow-sm'>
                        <p className='text-sm font-bold text-neutral-800'>Cerita lengkap</p>
                        <p className='mt-3 whitespace-pre-line text-xs leading-6 text-neutral-500'>{data[0].val}</p>
                    </article>
                </div>
            </section>


            <Create
                modal={modalCreate}
                SetModal={SetModalCreate}
            />



        </main>
    )
}

export default Page
