'use client'

import { useState } from 'react'

import { BsFillPencilFill, BsFillTrashFill, } from "react-icons/bs";
import { FaMagnifyingGlass, FaGear } from "react-icons/fa6";
import { BsBoxSeam, BsBoxes, BsCurrencyDollar } from 'react-icons/bs';

import Image from "next/image"
import Button from "@/components/items/Button"
import Modal from "@/components/items/Modal"
import Create from './components/create';
import Pagination from '@/components/items/Pagination';
import SelectListShow from '@/components/items/SelectListShow';
import AdminPageHeader from '@/components/admin/AdminPageHeader';






const List = [
    { id: 3, title: "Arabica Coffee", subtitle: "Medium Roast (200gr)", stock: 12, price: 85000, vol: "Pack", img: "/images/kopi3.png" },
    { id: 1, title: "Tubruk Robusta", subtitle: "Medium Roast (200gr)", stock: 12, price: 85000, vol: "Pack", img: "/images/kopi1.png" },
    { id: 4, title: "Kopi Tolaki", subtitle: "Medium Roast (200gr)", stock: 12, price: 85000, vol: "Pack", img: "/images/kopi4.png" },
    { id: 2, title: "Tolaki Robusta", subtitle: "Medium Roast (200gr)", stock: 12, price: 85000, vol: "Pack", img: "/images/kopi2.png" },
]


const Page = () => {


    const test = () => {
        alert("Hy saya di click")
    }

    const [modal, SetModal] = useState<boolean>(false)
    const [modalCreate, SetModalCreate] = useState<boolean>(false)
    const [, setPageShow] = useState<number | string>(8)

    return (
        <main className='space-y-3 pb-3'>
            <AdminPageHeader
                eyebrow='Katalog'
                title='Kelola Produk'
                description='Atur produk kopi, harga, dan ketersediaan stok dalam satu tempat.'
                icon={BsBoxSeam}
                searchPlaceholder='Cari produk...'
                onAdd={() => SetModalCreate(!modalCreate)}
                addLabel='Tambah produk'
            />

            <section className='grid grid-cols-1 gap-3 sm:grid-cols-3'>
                <div className='flex items-center gap-3 rounded-xl border border-neutral-100 bg-white p-4 shadow-sm'>
                    <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-700'><BsBoxSeam /></div>
                    <div><p className='text-[10px] text-neutral-400'>Total produk</p><p className='text-lg font-bold text-neutral-800'>{List.length}</p></div>
                </div>
                <div className='flex items-center gap-3 rounded-xl border border-neutral-100 bg-white p-4 shadow-sm'>
                    <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700'><BsBoxes /></div>
                    <div><p className='text-[10px] text-neutral-400'>Total stok</p><p className='text-lg font-bold text-neutral-800'>{List.reduce((sum, item) => sum + item.stock, 0)} pack</p></div>
                </div>
                <div className='flex items-center gap-3 rounded-xl border border-neutral-100 bg-white p-4 shadow-sm'>
                    <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50 text-sky-700'><BsCurrencyDollar /></div>
                    <div><p className='text-[10px] text-neutral-400'>Rentang harga</p><p className='text-sm font-bold text-neutral-800'>Rp85.000</p></div>
                </div>
            </section>

            <section className='rounded-xl border border-neutral-100 bg-white p-3 shadow-sm sm:p-4'>
                <div className='mb-4 flex items-center justify-between'>
                    <div><h2 className='text-sm font-bold text-neutral-800'>Daftar produk</h2><p className='text-[10px] text-neutral-400'>Katalog produk yang tampil di website</p></div>
                    <span className='rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-bold text-emerald-700'>{List.length} aktif</span>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    {
                        List.map((item, index) => (
                            <article key={index} className='group relative overflow-hidden rounded-xl border border-neutral-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-amber-200 hover:shadow-md'>
                                        <div className='relative h-42 w-full overflow-hidden bg-amber-50'>
                                            <Image
                                                alt={item.title}
                                                src={item.img}
                                                fill
                                                className='object-cover transition duration-300 group-hover:scale-105'
                                                loading="eager"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                        </div>
                                        <div className='p-4'>
                                            <p className='text-sm font-bold text-neutral-800'>{item.title}</p>
                                            <p className='mt-1 text-[10px] text-neutral-400'>{item.subtitle}</p>
                                            <div className='mt-3 flex items-end justify-between border-t border-neutral-100 pt-3'>
                                                <div><p className='text-[9px] uppercase tracking-wider text-neutral-400'>Harga</p><p className='text-xs font-bold text-amber-700'>Rp {item.price.toLocaleString('id-ID')}</p></div>
                                                <span className='rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-bold text-emerald-700'>{item.stock} {item.vol}</span>
                                            </div>
                                        </div>

                                    <button
                                        onClick={() => SetModal(!modal)}
                                        aria-label={`Atur ${item.title}`}
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
