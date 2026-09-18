'use client'

import { useState } from 'react'
import { BsFillPencilFill, BsFillTrashFill, BsChatQuote } from "react-icons/bs";
import { FaGear } from "react-icons/fa6";
import Image from "next/image"
import Button from "@/components/items/Button"
import Modal from "@/components/items/Modal"
import Create, { StoryFormProps } from './components/create';
import Pagination from '@/components/items/Pagination';
import SelectListShow from '@/components/items/SelectListShow';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { useDataStore } from '@/stores/dataStore';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchApi } from '@/lib/apiFetch';
import useDebouncedSearch from '@/hooks/useDebouncedSeacrh';

interface StoryItem {
    id: string
    title: string
    news: string
    file: string
    createdAt: string
}

const Page = () => {
    const url = useDataStore((state) => state.url)
    const queryClient = useQueryClient()

    const [modal, SetModal] = useState<boolean>(false)
    const [modalCreate, SetModalCreate] = useState<boolean>(false)
    const [isUpdate, setIsUpdate] = useState<boolean>(false)
    const [selectedItem, setSelectedItem] = useState<StoryItem | null>(null)

    const [limit, setLimit] = useState<number>(8)
    const [skip, setSkip] = useState<number>(1)
    const [search, setSearch] = useState<string>("")
    const debouncedSearch = useDebouncedSearch(search)

    const [form, setForm] = useState<StoryFormProps>({
        title: '',
        news: '',
        file: null,
    })

    const { data: response, isLoading } = useQuery({
        queryFn: () =>
            fetchApi<{ total: number; data: StoryItem[] }>(
                `${url}/story-from-garden/read?search=${encodeURIComponent(debouncedSearch)}&skip=${(skip - 1) * limit}&limit=${limit}`,
            ),
        queryKey: ['stories-admin', skip, limit, debouncedSearch],
    })

    const stories = response?.data || []
    const total = response?.total || 0

    const deleteMutation = useMutation({
        mutationFn: (id: string) =>
            fetchApi(`${url}/story-from-garden/delete/${id}`, {
                method: 'DELETE',
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['stories-admin'] })
            queryClient.invalidateQueries({ queryKey: ['story-from-garden'] })
            SetModal(false)
            setSelectedItem(null)
        },
        onError: (err: any) => {
            alert(err?.message || 'Gagal menghapus cerita')
        },
    })

    const emptyForm = () => {
        setForm({
            title: '',
            news: '',
            file: null,
        })
        setSelectedItem(null)
        setIsUpdate(false)
    }

    const openCreateModal = () => {
        emptyForm()
        setIsUpdate(false)
        SetModalCreate(true)
    }

    const openEditModal = () => {
        if (!selectedItem) return
        setForm({
            id: selectedItem.id,
            title: selectedItem.title,
            news: selectedItem.news,
            file: null,
        })
        setIsUpdate(true)
        SetModal(false)
        SetModalCreate(true)
    }

    const handleDelete = () => {
        if (!selectedItem) return
        if (confirm(`Hapus cerita "${selectedItem.title}"?`)) {
            deleteMutation.mutate(selectedItem.id)
        }
    }

    return (
        <main className='space-y-3 pb-3'>
            <AdminPageHeader
                eyebrow='Petani & Kemitraan'
                title='Cerita dari Kebun'
                description='Kelola profil dan kisah inspiratif para petani mitra Kopi Tolaki.'
                icon={BsChatQuote}
                searchPlaceholder='Cari cerita petani...'
                search={search}
                setInputSearch={setSearch}
                onAdd={openCreateModal}
                addLabel='Tambah cerita'
            />

            <section className='rounded-xl border border-neutral-100 bg-white p-3 shadow-sm sm:p-4'>
                <div className='mb-4 flex items-center justify-between'>
                    <div>
                        <h2 className='text-sm font-bold text-neutral-800'>Cerita petani</h2>
                        <p className='text-[10px] text-neutral-400'>Wajah dan suara dari kebun kopi</p>
                    </div>
                    <span className='rounded-full bg-amber-50 px-2.5 py-1 text-[9px] font-bold text-amber-700'>
                        {total} cerita
                    </span>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-64 animate-pulse rounded-xl bg-neutral-100" />
                        ))}
                    </div>
                ) : stories.length === 0 ? (
                    <div className="py-12 text-center text-neutral-400 text-xs">
                        Belum ada cerita dari kebun. Klik &quot;Tambah cerita&quot; untuk menambahkan.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                        {stories.map((item) => {
                            const imageSrc = item.file
                                ? `${url}/uploads/story-from-garden/${item.file}`
                                : '/images/petani1.png'

                            return (
                                <article key={item.id} className='group relative overflow-hidden rounded-xl border border-neutral-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-amber-200 hover:shadow-md'>
                                    <div className='relative h-44 w-full overflow-hidden bg-neutral-100'>
                                        <Image
                                            alt={item.title}
                                            src={imageSrc}
                                            fill
                                            className='object-cover transition duration-300 group-hover:scale-105'
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    </div>
                                    <div className='p-4'>
                                        <p className='text-sm font-bold text-neutral-800 line-clamp-1'>{item.title}</p>
                                        <p className='mt-2 line-clamp-3 text-[10px] italic leading-5 text-neutral-500'>
                                            &ldquo;{item.news ? item.news.replace(/<[^>]*>?/gm, '') : ''}&rdquo;
                                        </p>
                                        <p className='mt-3 border-t border-neutral-100 pt-3 text-[9px] font-bold uppercase tracking-wider text-amber-700'>
                                            {new Date(item.createdAt).toLocaleDateString('id-ID')}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => {
                                            setSelectedItem(item)
                                            SetModal(true)
                                        }}
                                        aria-label='Atur cerita petani'
                                        className='absolute right-2 top-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-neutral-950/75 text-white shadow-sm backdrop-blur-sm transition hover:bg-amber-500 hover:text-neutral-950'>
                                        <FaGear className='text-xs' />
                                    </button>
                                </article>
                            )
                        })}
                    </div>
                )}

                <div className='mt-4 flex flex-col gap-3 border-t border-neutral-100 pt-4 sm:flex-row sm:items-center sm:justify-between'>
                    <Pagination
                        total={total}
                        limit={limit}
                        page={skip}
                        pageShow={5}
                        onPageChange={setSkip}
                    />
                    <div className='w-full sm:w-40'>
                        <SelectListShow
                            onChange={(val) => {
                                setLimit(Number(val))
                                setSkip(1)
                            }}
                            size='sm'
                        />
                    </div>
                </div>
            </section>

            <Modal size="xxs" openModal={modal} setOpenModal={SetModal} color="dark" title="Pengaturan">
                <div className="flex gap-2 flex-col py-5">
                    <Button color="warning" size="h-6" type="rounded" onClick={openEditModal}>
                        <div className="item-btn-warning text-[12px] flex items-center justify-center gap-2">
                            <BsFillPencilFill />
                            <p>Update</p>
                        </div>
                    </Button>
                    <Button color="danger" size="h-6" type="rounded" onClick={handleDelete}>
                        <div className="item-btn-danger text-[12px] flex items-center justify-center gap-2">
                            <BsFillTrashFill />
                            <p>Delete</p>
                        </div>
                    </Button>
                </div>
            </Modal>

            <Create
                modal={modalCreate}
                SetModal={SetModalCreate}
                form={form}
                setForm={setForm}
                emptyForm={emptyForm}
                isUpdate={isUpdate}
            />
        </main>
    )
}

export default Page
