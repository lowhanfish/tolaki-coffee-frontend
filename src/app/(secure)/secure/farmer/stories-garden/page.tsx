'use client'

import { useState } from 'react'

import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { FaGear } from "react-icons/fa6";
import { FaMagnifyingGlass } from "react-icons/fa6";

import Image from "next/image"
import Button from "@/components/items/Button"
import Modal from "@/components/items/Modal"
import Create from './components/create';
import Pagination from '@/components/items/Pagination';
import SelectListShow from '@/components/items/SelectListShow';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { BsChatQuote } from 'react-icons/bs';


const Page = () => {


    const test = () => {
        alert("Hy saya di click")
    }

    const [modal, SetModal] = useState<boolean>(false)
    const [modalCreate, SetModalCreate] = useState<boolean>(false)
    const [, setPageShow] = useState<number | string>(8)

    return (
        <main className='space-y-3 pb-3'>
            <AdminPageHeader eyebrow='Petani & Kemitraan' title='Cerita dari Kebun' description='Kelola profil dan kisah inspiratif para petani mitra Kopi Tolaki.' icon={BsChatQuote} searchPlaceholder='Cari cerita petani...' onAdd={() => SetModalCreate(!modalCreate)} addLabel='Tambah cerita' />

            <section className='rounded-xl border border-neutral-100 bg-white p-3 shadow-sm sm:p-4'>
                <div className='mb-4 flex items-center justify-between'><div><h2 className='text-sm font-bold text-neutral-800'>Cerita petani</h2><p className='text-[10px] text-neutral-400'>Wajah dan suara dari kebun kopi</p></div><span className='rounded-full bg-amber-50 px-2.5 py-1 text-[9px] font-bold text-amber-700'>8 cerita</span></div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    {
                        [...Array(8)].map((_, index) => (
                                <article key={index} className='group relative overflow-hidden rounded-xl border border-neutral-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-amber-200 hover:shadow-md'>
                                    <div className='relative h-44 w-full overflow-hidden bg-neutral-100'>
                                        <Image
                                            alt='Petani'
                                            src={`/images/petani1.png`}
                                            fill
                                            className='object-cover transition duration-300 group-hover:scale-105'
                                            loading="eager"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    </div>
                                    <div className='p-4'>
                                        <p className='text-sm font-bold text-neutral-800'>Pak Maryan</p>
                                        <p className='mt-2 line-clamp-3 text-[10px] italic leading-5 text-neutral-500'>“Kemangi—aroma wangi dari kebun kami adalah hasil dari kesabaran merawat bumi.”</p>
                                        <p className='mt-3 border-t border-neutral-100 pt-3 text-[9px] font-bold uppercase tracking-wider text-amber-700'>Konawe Selatan</p>
                                    </div>

                                    <button
                                        onClick={() => SetModal(!modal)}
                                        aria-label='Atur cerita petani'
                                        className='absolute right-2 top-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-neutral-950/75 text-white shadow-sm backdrop-blur-sm transition hover:bg-amber-500 hover:text-neutral-950'>
                                        <FaGear className='text-xs' />
                                    </button>
                                </article>
                        ))
                    }
                </div>

                <div className='mt-4 flex flex-col gap-3 border-t border-neutral-100 pt-4 sm:flex-row sm:items-center sm:justify-between'>
                        <Pagination total={999} limit={5} />
                    <div className='w-full sm:w-40'>
                        <SelectListShow
                            onChange={(val) => {
                                setPageShow(val)
                            }}
                            size='sm' />
                    </div>
                </div>
            </section>




            <Modal size="xxs" openModal={modal} setOpenModal={SetModal} color="dark" title="Config">
                <div className="flex gap-2 flex-col py-5">
                    <Button color="primary" size="h-6" type="rounded">
                        <div className="item-btn-primary text-[12px]">
                            <FaMagnifyingGlass />
                            <p className="">Detail</p>
                        </div>
                    </Button>
                    <Button color="warning" size="h-6" type="rounded">
                        <div className="item-btn-warning text-[12px]">
                            <BsFillPencilFill />
                            <p className="">Update</p>
                        </div>
                    </Button>
                    <Button color="danger" size="h-6" type="rounded" onClick={test}>
                        <div className="item-btn-danger text-[12px]">
                            <BsFillTrashFill />
                            <p className="">Delete</p>
                        </div>
                    </Button>
                </div>
            </Modal>


            <Create
                modal={modalCreate}
                SetModal={SetModalCreate}
            />





        </main>
    )
}

export default Page
