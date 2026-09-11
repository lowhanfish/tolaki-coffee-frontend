'use client'

import { useState } from 'react'

import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { FaGear } from "react-icons/fa6";
import { FaMagnifyingGlass } from "react-icons/fa6";

import Button from "@/components/items/Button"
import Modal from "@/components/items/Modal"
import Create from './components/create';
import Pagination from '@/components/items/Pagination';
import SelectListShow from '@/components/items/SelectListShow';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { BsAward, BsCalendar3, BsCoin, BsPerson } from 'react-icons/bs';


const Page = () => {


    const test = () => {
        alert("Hy saya di click")
    }

    const [modal, SetModal] = useState<boolean>(false)
    const [modalCreate, SetModalCreate] = useState<boolean>(false)
    const [, setPageShow] = useState<number | string>(8)

    return (
        <main className='space-y-3 pb-3'>
            <AdminPageHeader eyebrow='Petani & Kemitraan' title='Standar Kemitraan' description='Kelola prinsip kerja sama yang menjaga mutu, keadilan, dan keberlanjutan.' icon={BsAward} searchPlaceholder='Cari standar...' onAdd={() => SetModalCreate(!modalCreate)} addLabel='Tambah standar' />

            <section className='rounded-xl border border-neutral-100 bg-white p-3 shadow-sm sm:p-4'>
                <div className='mb-4 flex items-center justify-between'><div><h2 className='text-sm font-bold text-neutral-800'>Prinsip kemitraan</h2><p className='text-[10px] text-neutral-400'>Nilai yang diterapkan dalam kerja sama dengan petani</p></div><span className='rounded-full bg-sky-50 px-2.5 py-1 text-[9px] font-bold text-sky-700'>6 standar</span></div>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                    {
                        [...Array(6)].map((_, index) => (
                                <article key={index} className='relative flex min-h-31 overflow-hidden rounded-xl border border-neutral-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-amber-200 hover:shadow-md'>
                                    <div className='flex w-20 shrink-0 items-center justify-center bg-linear-to-br from-amber-500 to-amber-700 text-2xl text-white'>
                                        <BsCoin />
                                    </div>
                                    <div className='flex-1 p-4 pr-11'>
                                        <p className='text-sm font-bold text-neutral-800'>Harga yang adil</p>
                                        <p className='mt-1 text-[10px] leading-relaxed text-neutral-400'>Komitmen terhadap nilai jual yang layak dan transparan.</p>
                                        <div className='mt-3 flex flex-wrap gap-x-3 gap-y-1 border-t border-neutral-100 pt-3'>
                                            <div className='flex items-center gap-1.5 text-[9px] text-neutral-400'><BsCalendar3 /><span>20 Nov 2026</span></div>
                                            <div className='flex items-center gap-1.5 text-[9px] text-neutral-400'><BsPerson /><span>Kiken SB</span></div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => SetModal(!modal)}
                                        aria-label='Atur standar kemitraan'
                                        className='absolute right-3 top-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-neutral-100 text-neutral-400 transition hover:bg-amber-500 hover:text-neutral-950'>
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
