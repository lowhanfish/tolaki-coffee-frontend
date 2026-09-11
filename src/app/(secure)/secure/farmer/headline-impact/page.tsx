'use client'

import { useState } from 'react'

import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { GiPlantRoots, GiMountainRoad } from "react-icons/gi";
import { FaPeopleRoof, FaGear } from "react-icons/fa6";
import { FaMagnifyingGlass } from "react-icons/fa6";

import Button from "@/components/items/Button"
import Modal from "@/components/items/Modal"
import Create from './components/create';
import Pagination from '@/components/items/Pagination';
import SelectListShow from '@/components/items/SelectListShow';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { BsGeoAlt } from 'react-icons/bs';


const Page = () => {


    const test = () => {
        alert("Hy saya di click")
    }

    const [modal, SetModal] = useState<boolean>(false)
    const [modalCreate, SetModalCreate] = useState<boolean>(false)
    const [, setPageShow] = useState<number | string>(8)

    return (
        <main className='space-y-3 pb-3'>
            <AdminPageHeader eyebrow='Petani & Kemitraan' title='Headline & Dampak' description='Kelola wilayah kemitraan dan ringkasan dampak Kopi Tolaki bagi petani.' icon={FaPeopleRoof} searchPlaceholder='Cari wilayah...' onAdd={() => SetModalCreate(!modalCreate)} addLabel='Tambah wilayah' />

            <section className='rounded-xl border border-neutral-100 bg-white p-3 shadow-sm sm:p-4'>
                <div className='mb-4 flex items-center justify-between'><div><h2 className='text-sm font-bold text-neutral-800'>Wilayah binaan</h2><p className='text-[10px] text-neutral-400'>Ringkasan dampak pada setiap wilayah</p></div><span className='rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-bold text-emerald-700'>8 wilayah</span></div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    {
                        [...Array(8)].map((_, index) => (
                                <article key={index} className='relative overflow-hidden rounded-xl border border-neutral-100 bg-linear-to-br from-white to-amber-50/60 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-amber-200 hover:shadow-md'>
                                    <div className='mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100 text-amber-700'><BsGeoAlt /></div>
                                    <p className='text-sm font-bold text-neutral-800'>Konawe Selatan</p>
                                    <div className='mt-3 space-y-2 border-t border-neutral-100 pt-3'>
                                        <div className='flex items-center gap-3'>
                                            <FaPeopleRoof className='text-base text-amber-700' />
                                            <p className='text-[10px] text-neutral-500'><span className='text-xs font-bold text-neutral-700'>120</span> Petani</p>
                                        </div>
                                        <div className='flex items-center gap-3'>
                                            <GiPlantRoots className='text-base text-emerald-600' />
                                            <p className='text-[10px] text-neutral-500'><span className='text-xs font-bold text-neutral-700'>55</span> Hektare</p>
                                        </div>
                                        <div className='flex items-center gap-3'>
                                            <GiMountainRoad className='text-base text-sky-600' />
                                            <p className='text-[10px] text-neutral-500'><span className='text-xs font-bold text-neutral-700'>500–1000</span> Mdpl</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => SetModal(!modal)}
                                        aria-label='Atur wilayah'
                                        className='absolute right-3 top-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-white text-neutral-400 shadow-sm ring-1 ring-neutral-100 transition hover:bg-amber-500 hover:text-neutral-950'>
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
