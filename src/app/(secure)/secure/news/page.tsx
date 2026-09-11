'use client'

import { useState } from 'react'

import { BsCalendar3, BsFillPencilFill, BsFillTrashFill, BsNewspaper, BsPerson } from "react-icons/bs";
import { FaMagnifyingGlass, FaGear } from "react-icons/fa6";

import Image from "next/image"
import Button from "@/components/items/Button"
import Modal from "@/components/items/Modal"
import Create from './components/create';
import Pagination from '@/components/items/Pagination';
import SelectListShow from '@/components/items/SelectListShow';
import { useDataStore } from '@/stores/dataStore';
import { useQuery } from '@tanstack/react-query';
import { fetchApi } from '@/lib/apiFetch';
import { NewsResponseListInterface } from "./types"
import AdminPageHeader from '@/components/admin/AdminPageHeader';


const Page = () => {

    const url = useDataStore(state => state.url)

    const test = () => {
        alert("Hy saya di click")
    }

    const [modal, SetModal] = useState<boolean>(false)
    const [modalCreate, SetModalCreate] = useState<boolean>(false)


    const pageShow = 5
    const [limit, setLimit] = useState<number>(8)
    const [skip, setSkip] = useState<number>(1)
    const search = ""

    const { data: Data, isLoading } = useQuery({
        queryFn: () => fetchApi<NewsResponseListInterface>(`${url}/news/read?search=${encodeURIComponent(search)}&skip=${(skip - 1)}&limit=${limit}`),
        queryKey: ["product-admin", skip, limit]
    })

    const total = Data?.total ?? 0

    return (
        <main className='space-y-3 pb-3'>
            <AdminPageHeader
                eyebrow='Publikasi'
                title='Berita & Artikel'
                description='Kelola informasi, kabar petani, dan cerita terbaru dari Kopi Tolaki.'
                icon={BsNewspaper}
                searchPlaceholder='Cari berita...'
                onAdd={() => SetModalCreate(!modalCreate)}
                addLabel='Tulis berita'
            />

            <section className='rounded-xl border border-neutral-100 bg-white p-3 shadow-sm sm:p-4'>
                <div className='mb-4 flex items-center justify-between'>
                    <div><h2 className='text-sm font-bold text-neutral-800'>Semua publikasi</h2><p className='text-[10px] text-neutral-400'>Artikel yang telah ditambahkan ke website</p></div>
                    <span className='rounded-full bg-amber-50 px-2.5 py-1 text-[9px] font-bold text-amber-700'>{total} artikel</span>
                </div>

                {isLoading ? (
                    <div className='grid grid-cols-1 gap-3 xl:grid-cols-2'>
                        {[...Array(4)].map((_, index) => <div key={index} className='h-32 animate-pulse rounded-xl bg-neutral-100' />)}
                    </div>
                ) : (
                <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
                    {
                        Data?.data.map((item, index) => (
                            <article key={index} className='group relative flex min-h-32 overflow-hidden rounded-xl border border-neutral-100 bg-white shadow-sm transition hover:border-amber-200 hover:shadow-md'>
                                        <div className='relative w-32 shrink-0 overflow-hidden bg-neutral-100 sm:w-40'>
                                            <Image
                                                className='object-cover transition duration-300 group-hover:scale-105'
                                                alt={item.title}
                                                src={`${url}/uploads/news/${item.file}`}
                                                fill
                                                loading="eager"
                                                sizes='100vw, 50vw, 25vw'
                                            />
                                        </div>
                                        <div className='min-w-0 flex-1 p-4 pr-11'>
                                            <span className='rounded-full bg-amber-50 px-2 py-1 text-[8px] font-bold uppercase tracking-wider text-amber-700'>Berita</span>
                                            <p className='mt-2 line-clamp-2 text-sm font-bold leading-snug text-neutral-800'>{item.title}</p>

                                            <div className='mt-3 flex flex-wrap gap-x-4 gap-y-1 border-t border-neutral-100 pt-3'>
                                                <div className='flex items-center gap-1.5 text-[10px] text-neutral-400'><BsCalendar3 /><span>20 Nov 2026</span></div>
                                                <div className='flex items-center gap-1.5 text-[10px] text-neutral-400'><BsPerson /><span>Kiken SB</span></div>
                                            </div>
                                        </div>

                                    <button
                                        onClick={() => SetModal(!modal)}
                                        aria-label={`Atur ${item.title}`}
                                        className='absolute right-3 top-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-neutral-100 text-neutral-500 transition hover:bg-amber-500 hover:text-neutral-950'>
                                        <FaGear className='text-xs' />
                                    </button>
                            </article>

                        ))
                    }
                </div>
                )}

                <div className='mt-4 flex flex-col gap-3 border-t border-neutral-100 pt-4 sm:flex-row sm:items-center sm:justify-between'>
                    <Pagination
                        total={total}
                        limit={Number(limit)}
                        pageShow={pageShow}
                        page={skip}
                        onPageChange={setSkip}
                    />
                    <div className='w-full sm:w-40'>
                    <SelectListShow
                        onChange={(val) => {
                            setLimit(val as number)
                            setSkip(1)
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
